import { Metadata } from "next";
import CryptoDcaClient from "@/components/tools/finance/crypto-dca-client";

export const metadata: Metadata = {
  title: "Crypto Dollar-Cost-Averaging (DCA) & Profit Calculator | Toolzium",
  description:
    "Calculate compound returns and projected portfolio value when dollar-cost-averaging into Bitcoin, Ethereum, and Solana.",
};

export default function CryptoDcaPage() {
  return <CryptoDcaClient />;
}
