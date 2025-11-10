import LanguageSwitcher from "@/src/_components/lang/LanguageSwitcher";

type Props = {
  children: React.ReactNode;
};

export default async function MainLayout({ children }: Props) {
  return (
    <main>
      <LanguageSwitcher />
      {children}
    </main>
  );
}
