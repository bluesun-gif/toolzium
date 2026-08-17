import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import AnimalQuizClient from "@/components/tools/fun/animal-quiz-client";

const TITLE = "Animal Quiz | Toolzium";
const DESCRIPTION = "Free online animal quiz tool with instant calculation and privacy.";
const PATH = "/tools/fun/animal-quiz";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Animal Quiz",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <AnimalQuizClient />
    </>
  );
}
