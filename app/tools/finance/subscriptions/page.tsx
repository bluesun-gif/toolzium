import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import SubscriptionsClient from "@/components/tools/finance/subscriptions-client";

const TITLE = "Subscription Tracker | Toolzium";
const DESCRIPTION = "Track your recurring subscriptions, monitor monthly costs, and manage billing dates.";
const PATH = "/tools/finance/subscriptions";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Subscription Tracker",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <SubscriptionsClient />
    </>
  );
}
