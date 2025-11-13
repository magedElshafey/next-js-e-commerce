import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import LocaleProviders from "@/_components/local-providers/LocaleProviders";
import { getDefaultSiteMeta, buildMetadata } from "@/_lib/meta";
import "../globals.css";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = (await import(`@/messages/${locale}.json`)).default;
  const siteMeta = getDefaultSiteMeta(messages);

  const metadata = buildMetadata({}, siteMeta);

  return metadata;
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  const messages = (await import(`@/messages/${locale}.json`)).default;
  if (!hasLocale(routing.locales, locale)) notFound();

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body>
        <LocaleProviders locale={locale} messages={messages}>
          {children}
        </LocaleProviders>
      </body>
    </html>
  );
}
