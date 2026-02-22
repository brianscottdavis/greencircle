import Link from "next/link";
import { HydrateClient } from "~/trpc/server";
import { auth } from "~/server/auth";
import { Button } from "~/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { MarketingLayout } from "./_components/MarketingLayout";

export default async function MarketingPage() {
  const session = await auth();

  return (
    <HydrateClient>
      <MarketingLayout>
        <main>
          {/* Hero - Tailwind Plus style */}
          <section className="relative flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-emerald-700 to-emerald-900 px-4 py-24 text-white sm:py-32">
            <div className="container relative flex flex-col items-center gap-8 text-center">
              <img
                src="/emblem.png"
                alt=""
                className="max-h-20 w-auto sm:max-h-28"
                aria-hidden
              />
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                <span className="text-emerald-300">Green</span>
                <span className="text-emerald-50">Circle</span>
              </h1>
              <p className="max-w-2xl text-lg text-emerald-100 sm:text-xl">
                Community Waste &amp; Sustainability
              </p>
              <p className="max-w-xl text-emerald-200/90">
                Understand, monitor, and improve waste management in your local community. Book pickups, join challenges, and track your impact.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {session?.user ? (
                  <Button asChild size="lg">
                    <Link href="/dashboard">Go to Dashboard</Link>
                  </Button>
                ) : (
                  <>
                    <Button asChild variant="secondary" size="lg" className="bg-white text-emerald-800 hover:bg-emerald-50">
                      <Link href="/login">Sign in</Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white/10">
                      <Link href="/register">Register</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </section>

          {/* Features - shadcn Card */}
          <section className="py-16 px-4 md:px-6">
            <div className="container mx-auto max-w-6xl">
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-2xl font-bold text-emerald-900 md:text-3xl">
                  How it works
                </h2>
                <p className="mt-2 text-emerald-800/80">
                  From collection schedules to community challenges, everything you need in one place.
                </p>
              </div>
              <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle>Collection Guidance</CardTitle>
                    <CardDescription>
                      See your upcoming collections, tailored instructions, and downloadable guides to avoid contamination.
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Book & Track Services</CardTitle>
                    <CardDescription>
                      Request bulky pickups, report missed services, and track status updates with proof-of-service photos.
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Community Challenges</CardTitle>
                    <CardDescription>
                      Join challenges like &quot;Plastic-Free Week,&quot; log progress, and see your contribution to neighbourhood goals.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-emerald-50 py-16 px-4">
            <div className="container mx-auto max-w-2xl text-center">
              <h2 className="text-xl font-bold text-emerald-900">Ready to get started?</h2>
              <p className="mt-2 text-emerald-800/80">
                Create an account to access your household dashboard and local services.
              </p>
              {!session?.user && (
                <Button asChild size="lg" className="mt-6">
                  <Link href="/register">Create account</Link>
                </Button>
              )}
            </div>
          </section>
        </main>
      </MarketingLayout>
    </HydrateClient>
  );
}
