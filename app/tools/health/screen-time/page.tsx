import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ScreenTimeClient from "@/components/tools/health/screen-time-client";

const TITLE = "Screen Time Calculator | Toolzium";
const DESCRIPTION = "Track and analyze your daily screen time across different devices and apps.";
const PATH = "/tools/health/screen-time";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Screen Time Calculator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <ScreenTimeClient />
    </>
  );
}
