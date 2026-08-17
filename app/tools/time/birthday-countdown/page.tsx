import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import BirthdayCountdownClient from "@/components/tools/time/birthday-countdown-client";

const TITLE = "Birthday Countdown | Toolzium";
const DESCRIPTION = "Live countdown to your next birthday with fun facts and age calculator.";
const PATH = "/tools/time/birthday-countdown";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Birthday Countdown",
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
