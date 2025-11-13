import ScrollToTopButton from "@/_components/scroll-to-top/ScrollToTop";

type Props = {
  children: React.ReactNode;
};

export default async function MainLayout({ children }: Props) {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTopButton />
      <main className="grow py-2 flex flex-col">{children}</main>
    </div>
  );
}
