import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { routing } from "@/src/i18n/routing";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import queryClient from "@/src/_lib/react-qyery";
import "../globals.css";
import LocaleProviders from "@/src/_components/local-providers/LocaleProviders";
type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  const messages = (await import(`@/src/messages/${locale}.json`)).default;

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body>
        <LocaleProviders locale={locale} messages={messages}>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </LocaleProviders>
      </body>
    </html>
  );
}
