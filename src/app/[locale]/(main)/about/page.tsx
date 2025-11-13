import { generatePageMetadata } from "@/_lib/meta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const metadata = generatePageMetadata(locale, "About");
  return metadata;
}
const AboutPage = () => {
  return <div>AboutPage</div>;
};

export default AboutPage;
