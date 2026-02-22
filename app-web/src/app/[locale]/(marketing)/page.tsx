import { getTranslations, setRequestLocale } from "next-intl/server";
import { HydrateClient } from "~/trpc/server";
import { auth } from "~/server/auth";
import { Button } from "~/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { MarketingLayout } from "./_components/MarketingLayout";
import { Link } from "~/i18n/navigation";

type Props = { params: Promise<{ locale: string }> };

export default async function MarketingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const session = await auth();
  const t = await getTranslations("home");
  const tCommon = await getTranslations("common");

  return (
    <HydrateClient>
      <MarketingLayout>
        <main>
          {/* Hero - Tailwind Plus style */}
          <section className="relative flex flex-col items-center justify-center overflow-hidden px-4 py-24 text-white sm:py-32">
            <img
              src="/killari-hotaru-aK859Jaekls-unsplash.jpg"
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              aria-hidden
            />
            <div className="absolute inset-0 bg-gradient-to-b from-emerald-700/90 to-emerald-900/90" />
            <div className="container relative z-10 flex flex-col items-center gap-8 text-center">
              <span className="text-4xl font-bold tracking-tight sm:text-5xl">
                <span className="text-emerald-200">Green</span>
                <span className="text-white">Circle</span>
              </span>
              <p className="max-w-2xl text-lg text-emerald-100 sm:text-xl">
                {t("tagline")}
              </p>
              <p className="max-w-xl text-emerald-200/90">{t("description")}</p>
              <div className="flex flex-wrap justify-center gap-4">
                {session?.user ? (
                  <Button asChild size="lg">
                    <Link href="/dashboard">{t("goToDashboard")}</Link>
                  </Button>
                ) : (
                  <>
                    <Button asChild variant="secondary" size="lg" className="bg-white text-emerald-800 hover:bg-emerald-50">
                      <Link href="/login">{tCommon("signIn")}</Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white/10">
                      <Link href="/register">{tCommon("register")}</Link>
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
                  {t("howItWorks")}
                </h2>
                <p className="mt-2 text-emerald-800/80">{t("howItWorksDesc")}</p>
              </div>
              <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle>{t("collectionGuidance")}</CardTitle>
                    <CardDescription>{t("collectionGuidanceDesc")}</CardDescription>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>{t("bookTrackServices")}</CardTitle>
                    <CardDescription>{t("bookTrackServicesDesc")}</CardDescription>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>{t("communityChallenges")}</CardTitle>
                    <CardDescription>{t("communityChallengesDesc")}</CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-emerald-50 py-16 px-4">
            <div className="container mx-auto max-w-2xl text-center">
              <h2 className="text-xl font-bold text-emerald-900">{t("readyToStart")}</h2>
              <p className="mt-2 text-emerald-800/80">{t("readyToStartDesc")}</p>
              {!session?.user && (
                <Button asChild size="lg" className="mt-6">
                  <Link href="/register">{t("createAccount")}</Link>
                </Button>
              )}
            </div>
          </section>
        </main>
      </MarketingLayout>
    </HydrateClient>
  );
}
