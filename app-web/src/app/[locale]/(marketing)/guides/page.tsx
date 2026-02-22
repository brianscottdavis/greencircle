import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "~/i18n/navigation";
import { HydrateClient } from "~/trpc/server";
import { Button } from "~/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { MarketingLayout } from "../_components/MarketingLayout";

const GUIDE_KEYS = [
  "generalWaste",
  "recycling",
  "greenWaste",
  "foodScraps",
  "bulkyItems",
  "hazardousWaste",
  "eWaste",
  "textiles",
] as const;

type Props = { params: Promise<{ locale: string }> };

export default async function GuidesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("guides");

  return (
    <HydrateClient>
      <MarketingLayout>
        <main className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <h1 className="text-3xl font-bold text-emerald-900">{t("title")}</h1>
            <p className="mt-2 text-emerald-800/80">{t("description")}</p>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {GUIDE_KEYS.map((key) => (
                <Card key={key}>
                  <CardHeader>
                    <CardTitle>{t(`items.${key}.title`)}</CardTitle>
                    <CardDescription>{t(`items.${key}.description`)}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
            <div className="mt-8">
              <Button asChild>
                <Link href="/">{t("backToHome")}</Link>
              </Button>
            </div>
          </div>
        </main>
      </MarketingLayout>
    </HydrateClient>
  );
}
