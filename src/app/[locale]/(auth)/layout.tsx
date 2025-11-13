import RightSide from "./_components/_layout/RightSide";
import LeftSide from "./_components/_layout/LeftSide";
import LanguageSwitcher from "@/_components/lang/LanguageSwitcher";
type Props = {
  children: React.ReactNode;
};

export default async function AuthLayout({ children }: Props) {
  return (
    <>
      <main className="flex flex-col-reverse md:flex-row gap-4 sm:gap-5 md:gap-6 lg:gap-7 xl:gap-8 2xl:gap-9 items-center">
        <RightSide />
        <div className="w-full md:w-1/2">
          <LeftSide />
          <div>{children}</div>
        </div>
      </main>
      <LanguageSwitcher />
    </>
  );
}
