"use client";

import Link from "next/link";
import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { MarketingLayout } from "../_components/MarketingLayout";

export default function ChallengesPage() {
  const { data: challenges, isLoading } = api.challenge.listPublic.useQuery();

  return (
    <MarketingLayout>
      <main className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold text-emerald-900">Community challenges</h1>
          <p className="mt-2 text-emerald-800/80">
            Join neighbourhood challenges, log your progress, and contribute to community goals.
          </p>

          {isLoading ? (
            <p className="mt-8 text-emerald-800/80">Loading challenges…</p>
          ) : !challenges?.length ? (
            <Card className="mt-8">
              <CardContent className="pt-6">
                <p className="text-emerald-800/80">No active challenges yet. Check back soon.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {challenges.map((c) => (
                <Card key={c.id}>
                  <CardHeader>
                    <CardTitle>{c.title}</CardTitle>
                    <CardDescription>{c.description ?? "Join and earn points."}</CardDescription>
                    <span className="mt-2 inline-block rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-800">
                      {c.status}
                    </span>
                  </CardHeader>
                </Card>
              ))}
            </div>
          )}

          <div className="mt-8 flex gap-4">
            <Button asChild>
              <Link href="/login">Sign in to join challenges</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">Back to home</Link>
            </Button>
          </div>
        </div>
      </main>
    </MarketingLayout>
  );
}
