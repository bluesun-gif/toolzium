import { Metadata } from "next";
import AiContractorAgreementClient from "@/components/tools/office/ai-contractor-agreement-client";

export const metadata: Metadata = {
  title: "AI Independent Contractor Agreement Studio | Toolzium",
  description:
    "Draft custom contractor agreements, IP work-for-hire clauses, payment terms, and confidentiality terms powered by live AI.",
};

export default function AiContractorAgreementPage() {
  return <AiContractorAgreementClient />;
}
