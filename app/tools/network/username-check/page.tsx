import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import UsernameCheckClient from "@/components/tools/network/username-check-client";

const TITLE = "Username Availability Checker | Toolzium";
const DESCRIPTION = "Check if a username is available across 30+ social platforms instantly. Search Twitter, Instagram, GitHub, TikTok, Reddit and more simultaneously.";
const PATH = "/tools/network/username-check";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Username Check",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <UsernameCheckClient />
    </>
  );
}
