import { useTranslations } from "next-intl";
const HomePage = () => {
  const t = useTranslations("Home");

  return <h1>{t("title")}</h1>;
};

export default HomePage;
