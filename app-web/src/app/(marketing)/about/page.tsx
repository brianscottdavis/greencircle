import Link from "next/link";
import { HydrateClient } from "~/trpc/server";
import { Button } from "~/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { MarketingLayout } from "../_components/MarketingLayout";

export default function AboutPage() {
  return (
    <HydrateClient>
      <MarketingLayout>
        <main className="py-16 px-4">
          <div className="container mx-auto max-w-3xl">
            <h1 className="text-3xl font-bold text-emerald-900">About GreenCircle</h1>
            <p className="mt-4 text-lg text-emerald-800/90">
              GreenCircle helps local community members understand, monitor, and improve waste management practices. 
              We blend educational content, gamified participation, and actionable workflows for residents and council administrators.
            </p>
            <p className="mt-4 text-emerald-800/80">
              The platform supports booking bulky pickups, reporting contamination or missed services, 
              joining community challenges, and staying informed with local announcements—even with limited connectivity.
            </p>
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
