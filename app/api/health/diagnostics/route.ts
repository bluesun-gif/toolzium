import { NextResponse } from "next/server";
import { ToolsData, TOTAL_TOOLS_COUNT } from "@/data/tools";

export async function GET() {
  const startTime = Date.now();

  const categoriesCount = ToolsData.length;
  const toolsCount = ToolsData.reduce((acc, cat) => acc + cat.items.length, 0);

  const healthData = {
    status: "healthy",
    timestamp: new Date().toISOString(),
    latencyMs: Date.now() - startTime,
    brand: "Toolzium",
    domain: "https://toolzium.com",
    telemetry: {
      ga4MeasurementId: "G-1R1QGX9XS1",
      gtmId: "GTM-KRV3TG75",
      spaRouteTracking: "enabled",
    },
    seo: {
      sitemap: "https://toolzium.com/sitemap.xml",
      robots: "https://toolzium.com/robots.txt",
      indexNowEndpoint: "https://toolzium.com/api/seo/indexnow",
      categoriesCount,
      toolsCount,
      totalToolsConfigured: TOTAL_TOOLS_COUNT,
    },
    features: {
      aiPolyglotTranslator: "active",
      dynamicOpenGraphEngine: "active",
      embedWidgetGenerator: "active",
      smartSearchScorer: "active",
      offlineServiceWorker: "active",
    },
  };

  return NextResponse.json(healthData, {
    status: 200,
    headers: {
      "Cache-Control": "no-store, max-age=0",
    },
  });
}
