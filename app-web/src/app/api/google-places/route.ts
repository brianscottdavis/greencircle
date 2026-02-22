import { type NextRequest, NextResponse } from "next/server";
import { env } from "~/env";

interface GooglePlacesResponse {
  results: Array<{
    place_id: string;
    formatted_address: string;
    name?: string;
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
    };
    address_components: Array<{
      long_name: string;
      short_name: string;
      types: string[];
    }>;
  }>;
  status: string;
  error_message?: string;
}

interface GoogleGeocodingResponse {
  results: Array<{
    place_id: string;
    formatted_address: string;
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
    };
    address_components: Array<{
      long_name: string;
      short_name: string;
      types: string[];
    }>;
  }>;
  status: string;
  error_message?: string;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json(
      { error: "Query parameter is required" },
      { status: 400 },
    );
  }

  const apiKey = env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        error: "Google API not configured",
        details: "GOOGLE_PLACES_API_KEY environment variable is missing",
      },
      { status: 500 },
    );
  }

  try {
    // Step 1: Try Google Geocoding API first (best for addresses)
    // components=country:AU restricts results to Australian addresses
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(query)}&components=country:AU&key=${apiKey}`;
    const geocodeResponse = await fetch(geocodeUrl, {
      headers: { "Content-Type": "application/json" },
    });

    if (geocodeResponse.ok) {
      const geocodeData =
        (await geocodeResponse.json()) as GoogleGeocodingResponse;

      if (
        geocodeData.status === "OK" &&
        geocodeData.results &&
        geocodeData.results.length > 0
      ) {
        const convertedResults = geocodeData.results.map((result) => ({
          place_id: result.place_id,
          formatted_address: result.formatted_address,
          name: result.formatted_address,
          geometry: {
            location: {
              lat: result.geometry.location.lat,
              lng: result.geometry.location.lng,
            },
          },
          address_components: result.address_components,
        }));

        return NextResponse.json({
          results: convertedResults,
          status: "OK",
          source: "geocoding",
        });
      }
    }

    // Step 2: If geocoding fails, try Places API for establishments
    // region=au biases results to Australia
    const placesUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&region=au&key=${apiKey}&types=establishment`;
    const placesResponse = await fetch(placesUrl, {
      headers: { "Content-Type": "application/json" },
    });

    if (placesResponse.ok) {
      const placesData = (await placesResponse.json()) as GooglePlacesResponse;

      if (
        placesData.status === "OK" &&
        placesData.results &&
        placesData.results.length > 0
      ) {
        return NextResponse.json({
          ...placesData,
          source: "places",
        });
      }
    }

    // Step 3: If both fail, try broader Places search
    const broadPlacesUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&region=au&key=${apiKey}`;
    const broadPlacesResponse = await fetch(broadPlacesUrl, {
      headers: { "Content-Type": "application/json" },
    });

    if (broadPlacesResponse.ok) {
      const broadPlacesData =
        (await broadPlacesResponse.json()) as GooglePlacesResponse;

      if (
        broadPlacesData.status === "OK" &&
        broadPlacesData.results &&
        broadPlacesData.results.length > 0
      ) {
        return NextResponse.json({
          ...broadPlacesData,
          source: "broad_places",
        });
      }
    }

    return NextResponse.json({
      results: [],
      status: "ZERO_RESULTS",
      message:
        "No addresses found for your search query after trying multiple search methods",
      source: "none",
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to search addresses",
        details:
          error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 },
    );
  }
}
