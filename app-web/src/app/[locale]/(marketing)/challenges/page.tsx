"use client";

import { useTranslations } from "next-intl";
import { useSession } from "next-auth/react";
import { Link } from "~/i18n/navigation";
import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { MarketingLayout } from "../_components/MarketingLayout";

export default function ChallengesPage() {
  const t = useTranslations("challenges");
  const { status } = useSession();
  const isLoggedIn = status === "authenticated";

  const { data: challenges, isLoading } = api.challenge.listPublic.useQuery();
  const { data: participations } = api.challenge.listMine.useQuery(undefined, {
    enabled: isLoggedIn,
  });
  const utils = api.useUtils();
  const joinMutation = api.challenge.join.useMutation({
    onSuccess: () => utils.challenge.listMine.invalidate(),
  });

  const joinedIds = new Set(participations?.map((p) => p.challengeId) ?? []);

  return (
    <MarketingLayout>
      <main className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold text-emerald-900">{t("title")}</h1>
          <p className="mt-2 text-emerald-800/80">{t("description")}</p>

          {isLoading ? (
            <p className="mt-8 text-emerald-800/80">{t("loading")}</p>
          ) : !challenges?.length ? (
            <Card className="mt-8">
              <CardContent className="pt-6">
                <p className="text-emerald-800/80">{t("noChallenges")}</p>
              </CardContent>
            </Card>
          ) : (
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {challenges.map((c) => {
                const hasJoined = joinedIds.has(c.id);
                return (
                  <Card key={c.id}>
                    <CardHeader>
                      <CardTitle>{c.title}</CardTitle>
                      <CardDescription>{c.description ?? t("joinDefault")}</CardDescription>
                      <span className="mt-2 inline-block rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-800">
                        {c.status}
                      </span>
                      {isLoggedIn && (
                        <div className="mt-4">
                          {hasJoined ? (
                            <span className="text-sm font-medium text-emerald-700">
                              {t("joined")}
                            </span>
                          ) : (
                            <Button
                              size="sm"
                              onClick={() => joinMutation.mutate({ challengeId: c.id })}
                              disabled={joinMutation.isPending}
                            >
                              {t("join")}
                            </Button>
                          )}
                        </div>
                      )}
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          )}

          <div className="mt-8 flex gap-4">
            {isLoggedIn ? (
              <>
                <Button asChild>
                  <Link href="/challenges/my">{t("myChallenges")}</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/">{t("backToHome")}</Link>
                </Button>
              </>
            ) : (
              <>
                <Button asChild>
                  <Link href="/login">{t("signInToJoin")}</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/">{t("backToHome")}</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </main>
    </MarketingLayout>
  );
}
