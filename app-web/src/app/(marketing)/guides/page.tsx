import Link from "next/link";
import { HydrateClient } from "~/trpc/server";
import { Button } from "~/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { MarketingLayout } from "../_components/MarketingLayout";

const GUIDES = [
  { title: "General waste", description: "What goes in your red lid bin. No recyclables, no food scraps, no hazardous items." },
  { title: "Recycling", description: "Clean paper, cardboard, plastic bottles, glass, steel, aluminium. Rinse and flatten." },
  { title: "Green waste", description: "Garden clippings, leaves, small branches. No plastic bags or soil." },
  { title: "Food scraps", description: "Compostable organics. Use council-approved caddy liners or newspaper." },
  { title: "Bulky items", description: "Furniture, mattresses, whitegoods. Book a collection or take to the tip." },
] as const;

export default function GuidesPage() {
  return (
    <HydrateClient>
      <MarketingLayout>
        <main className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <h1 className="text-3xl font-bold text-emerald-900">Sorting guides</h1>
            <p className="mt-2 text-emerald-800/80">
              Quick reference for what goes where. Avoid contamination fines by sorting correctly.
            </p>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {GUIDES.map((g) => (
                <Card key={g.title}>
                  <CardHeader>
                    <CardTitle>{g.title}</CardTitle>
                    <CardDescription>{g.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
            <div className="mt-8">
              <Button asChild>
                <Link href="/">Back to home</Link>
              </Button>
            </div>
          </div>
        </main>
      </MarketingLayout>
    </HydrateClient>
  );
}
