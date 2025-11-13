import { useTranslations } from "next-intl";
const AppStatusFooter = () => {
  const t = useTranslations("Footer");
  return (
    <footer className="relative z-10 mt-10 text-sm text-gray-500">
      © {new Date().getFullYear()} {t("abazeer")}
    </footer>
  );
};

export default AppStatusFooter;
