import { memo } from "react";
import { useTranslations } from "next-intl";
interface AnimatedTitleProps {
  title: string;
}

const AnimatedTitle: React.FC<AnimatedTitleProps> = ({ title }) => {
  const t = useTranslations();

  return (
    <h1 className="text-3xl md:text-5xl font-extrabold mb-4 text-orangeColor tracking-wide animate-title-pop">
      {t(title)}
    </h1>
  );
};

export default memo(AnimatedTitle);
