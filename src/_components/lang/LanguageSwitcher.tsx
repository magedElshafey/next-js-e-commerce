"use client";
import Image from "next/image";
import { usePathname, useRouter } from "@/src/i18n/navigation";
import { useLocale } from "next-intl";
import { useQueryClient } from "@tanstack/react-query";
const LanguageSwitcher = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const isLoginPages =
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/forget-password";
  const switchLanguage = () => {
    const newLocale = locale === "ar" ? "en" : "ar";
    router.push(pathname, { locale: newLocale });
    queryClient.resetQueries();
    queryClient.invalidateQueries();
  };
  return (
    <>
      {isLoginPages ? (
        <button
          onClick={switchLanguage}
          className={`fixed bottom-6 right-6 z-50 flex-center gap-2 p-2 rounded-md bg-white/90 backdrop-blur-sm text-gray-700 hover:bg-white shadow-md border border-gray-200 transition-all `}
        >
          <Image
            alt="language-flag"
            src={locale === "ar" ? "/images/us.png" : "/images/ksa.png"}
            width={20}
            height={20}
          />
        </button>
      ) : (
        <div>lang</div>
      )}
    </>
  );
};

export default LanguageSwitcher;
