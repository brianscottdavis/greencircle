"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { Link } from "~/i18n/navigation";
import { Dialog, Transition } from "@headlessui/react";

import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";

interface GooglePlace {
  place_id: string;
  formatted_address: string;
  name?: string;
  address_components?: Array<{
    long_name: string;
    short_name: string;
    types: string[];
  }>;
}

interface GooglePlacesApiResponse {
  results: GooglePlace[];
  status: string;
}

function parsePlaceToAddress(place: GooglePlace): {
  addressLine1: string;
  suburb: string;
  postcode: string;
  zone?: string;
} {
  let addressLine1 = "";
  let suburb = "";
  let postcode = "";
  let zone = "";

  if (place.address_components?.length) {
    const streetNumber =
      place.address_components.find((c) => c.types.includes("street_number"))
        ?.long_name ?? "";
    const route =
      place.address_components.find((c) => c.types.includes("route"))
        ?.long_name ?? "";
    addressLine1 = `${streetNumber} ${route}`.trim();
    suburb =
      place.address_components.find((c) => c.types.includes("locality"))
        ?.long_name ?? "";
    postcode =
      place.address_components.find((c) => c.types.includes("postal_code"))
        ?.long_name ?? "";
    zone =
      place.address_components.find((c) =>
        c.types.includes("administrative_area_level_1"),
      )?.short_name ?? "";
  } else {
    const parts = place.formatted_address?.split(", ") ?? [];
    addressLine1 = parts[0] ?? "";
    if (parts.length >= 2) suburb = parts[1] ?? "";
    if (parts.length >= 3) {
      const statePostMatch = /^([A-Z]{2,3})\s+(\d{3,5})$/.exec(parts[2] ?? "");
      if (statePostMatch) {
        zone = statePostMatch[1] ?? "";
        postcode = statePostMatch[2] ?? "";
      }
    }
  }

  return {
    addressLine1: addressLine1 || (place.formatted_address ?? ""),
    suburb,
    postcode,
    zone: zone || undefined,
  };
}

type HouseholdToEdit = {
  id: string;
  addressLine1: string;
  suburb: string;
  postcode: string;
};

export default function ProfileHouseholdPage() {
  const [addOpen, setAddOpen] = useState(false);
  const [editingHousehold, setEditingHousehold] = useState<HouseholdToEdit | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<GooglePlace[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [formAddressLine1, setFormAddressLine1] = useState("");
  const [formSuburb, setFormSuburb] = useState("");
  const [formPostcode, setFormPostcode] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const DEBOUNCE_MS = 350;
  const MIN_QUERY_LENGTH = 3;
  const dialogOpen = addOpen || !!editingHousehold;
  const closeDialog = () => {
    setAddOpen(false);
    setEditingHousehold(null);
    setSearchQuery("");
    setSearchResults([]);
    setShowResults(false);
  };
  const openAdd = () => {
    setFormAddressLine1("");
    setFormSuburb("");
    setFormPostcode("");
    setAddOpen(true);
  };
  const openEdit = (m: { household: { id: string; addressLine1: string; suburb: string | null; postcode: string | null } }) => {
    setEditingHousehold({
      id: m.household.id,
      addressLine1: m.household.addressLine1,
      suburb: m.household.suburb ?? "",
      postcode: m.household.postcode ?? "",
    });
    setFormAddressLine1(m.household.addressLine1);
    setFormSuburb(m.household.suburb ?? "");
    setFormPostcode(m.household.postcode ?? "");
    setSearchQuery("");
    setSearchResults([]);
    setShowResults(false);
  };

  const utils = api.useUtils();
  const { data: memberships, isLoading } = api.household.listMine.useQuery();
  const createMutation = api.household.create.useMutation({
    onSuccess: async () => {
      await utils.household.listMine.invalidate();
      closeDialog();
    },
    onError: (err) => alert(err.message),
  });
  const updateMutation = api.household.update.useMutation({
    onSuccess: async () => {
      await utils.household.listMine.invalidate();
      closeDialog();
    },
    onError: (err) => alert(err.message),
  });

  const runSearch = async (query: string) => {
    const trimmed = query.trim();
    if (trimmed.length < MIN_QUERY_LENGTH) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }
    setIsSearching(true);
    setSearchResults([]);
    setShowResults(false);
    try {
      const response = await fetch(
        `/api/google-places?query=${encodeURIComponent(trimmed)}`,
      );
      const data = (await response.json()) as GooglePlacesApiResponse;
      if (data.status === "OK" && data.results?.length) {
        setSearchResults(data.results);
        setShowResults(true);
      } else {
        setShowResults(true);
        setSearchResults([]);
      }
    } catch {
      setShowResults(true);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    if (searchQuery.trim().length < MIN_QUERY_LENGTH) {
      setSearchResults([]);
      setShowResults(false);
      setIsSearching(false);
      return;
    }
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      void runSearch(searchQuery);
      debounceRef.current = null;
    }, DEBOUNCE_MS);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [searchQuery]);

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/profile">← Back</Link>
          </Button>
          <h1 className="text-2xl font-bold text-emerald-900">Household</h1>
        </div>
        <Button size="sm" onClick={openAdd}>
          Add household
        </Button>
      </div>

      {isLoading ? (
        <p className="text-emerald-800/80">Loading…</p>
      ) : !memberships?.length ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-emerald-800/80">No households linked yet.</p>
            <p className="mt-2 text-sm text-emerald-800/70">
              Add your address to create service requests and manage bookings.
            </p>
            <Button className="mt-4" onClick={openAdd}>
              Add household
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {memberships.map((m) => (
            <Card key={m.id}>
              <CardHeader className="flex flex-row items-start justify-between space-y-0">
                <div>
                  <CardTitle className="text-base">
                    {m.household.addressLine1}
                    {m.household.suburb ? `, ${m.household.suburb}` : ""}
                    {m.household.postcode ? ` ${m.household.postcode}` : ""}
                  </CardTitle>
                  <p className="text-sm text-emerald-800/80">
                    {m.isPrimary ? "Primary address" : "Member"}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openEdit(m)}
                >
                  Edit
                </Button>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}

      <Transition.Root show={dialogOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeDialog}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30" />
          </Transition.Child>
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md rounded-xl border border-emerald-200 bg-white p-6 shadow-lg">
                <Dialog.Title className="text-lg font-semibold text-emerald-900">
                  {editingHousehold ? "Edit household" : "Add household"}
                </Dialog.Title>
                <Dialog.Description className="mt-1 text-sm text-emerald-800/80">
                  {editingHousehold
                    ? "Update the address details or search for a new address."
                    : "Search for your address or enter details manually. The first address will be set as your primary."}
                </Dialog.Description>
                <form
                  className="mt-6 space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const addressLine1 = formAddressLine1.trim();
                    const suburb = formSuburb.trim() || undefined;
                    const postcode = formPostcode.trim() || undefined;

                    if (!addressLine1) return;
                    if (editingHousehold) {
                      updateMutation.mutate({
                        householdId: editingHousehold.id,
                        addressLine1,
                        suburb,
                        postcode,
                      });
                    } else {
                      createMutation.mutate({ addressLine1, suburb, postcode });
                    }
                  }}
                >
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-emerald-900">
                      Search address (Google)
                    </label>
                    <Input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Type address (min 3 characters)..."
                      className="w-full"
                      autoComplete="off"
                    />
                    {isSearching && (
                      <p className="text-xs text-emerald-800/70">Searching…</p>
                    )}
                    {showResults && searchResults.length > 0 && (
                      <div className="max-h-36 overflow-y-auto rounded-lg border border-emerald-200 bg-emerald-50/50">
                        {searchResults.map((place) => (
                          <button
                            key={place.place_id}
                            type="button"
                            onClick={() => {
                              const addr = parsePlaceToAddress(place);
                              setFormAddressLine1(addr.addressLine1);
                              setFormSuburb(addr.suburb);
                              setFormPostcode(addr.postcode);
                              setShowResults(false);
                              setSearchQuery("");
                              setSearchResults([]);
                            }}
                            className="w-full p-2 text-left text-sm hover:bg-emerald-100"
                          >
                            <div className="font-medium text-emerald-900">
                              {place.name ?? "Address"}
                            </div>
                            <div className="text-xs text-emerald-800/80">
                              {place.formatted_address}
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                    {showResults && searchResults.length === 0 && !isSearching && (
                      <p className="text-xs text-emerald-800/70">
                        No addresses found. Try a different search or enter manually below.
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-emerald-900">
                      Street address
                    </label>
                    <Input
                      value={formAddressLine1}
                      onChange={(e) => setFormAddressLine1(e.target.value)}
                      name="addressLine1"
                      placeholder="e.g. 123 Main Street"
                      required
                      className="w-full"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-emerald-900">
                        Suburb
                      </label>
                      <Input
                        value={formSuburb}
                        onChange={(e) => setFormSuburb(e.target.value)}
                        name="suburb"
                        placeholder="e.g. Greentown"
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-emerald-900">
                        Postcode
                      </label>
                      <Input
                        value={formPostcode}
                        onChange={(e) => setFormPostcode(e.target.value)}
                        name="postcode"
                        placeholder="e.g. 2000"
                        className="w-full"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-3 pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={closeDialog}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={
                        createMutation.isPending || updateMutation.isPending
                      }
                    >
                      {editingHousehold
                        ? updateMutation.isPending
                          ? "Saving…"
                          : "Save"
                        : createMutation.isPending
                          ? "Adding…"
                          : "Add household"}
                    </Button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}
