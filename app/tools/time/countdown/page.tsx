import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import BirthdayCountdownClient from "@/components/tools/time/birthday-countdown-client";

const TITLE = "Countdown | Toolzium";
const DESCRIPTION = "Free online countdown tool with instant calculation and privacy.";
const PATH = "/tools/time/countdown";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Countdown",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <BirthdayCountdownClient />
    </>
  );
}
