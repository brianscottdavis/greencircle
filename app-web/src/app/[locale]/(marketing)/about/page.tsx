import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "~/i18n/navigation";
import { HydrateClient } from "~/trpc/server";
import { Button } from "~/components/ui/button";
import { MarketingLayout } from "../_components/MarketingLayout";

type Props = { params: Promise<{ locale: string }> };

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");

  return (
    <HydrateClient>
      <MarketingLayout>
        <main className="py-16 px-4">
          <div className="container mx-auto max-w-3xl">
            <h1 className="text-3xl font-bold text-emerald-900">{t("title")}</h1>
            <p className="mt-4 text-lg text-emerald-800/90">{t("para1")}</p>
            <p className="mt-4 text-emerald-800/80">{t("para2")}</p>
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
