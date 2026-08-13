import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import CountdownTimerClient from "@/components/tools/time/countdown-timer-client";

export const metadata = buildMetadata({
  title: "Countdown Timer",
  description: "Online countdown timer for events, meetings, and Pomodoro technique. Customizable timer with alarm sound. Track time remaining for deadlines and important dates.",
  path: "/tools/time/countdown",
  keywords: ["technique", "with", "events", "countdown", "sound", "online", "alarm", "customizable", "pomodoro", "meetings", "timer"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Countdown Timer",
    description: "Online countdown timer for events, meetings, and Pomodoro technique. Customizable timer with alarm sound. Track time remaining for deadlines and important dates.",
    path: "/tools/time/countdown",
    categoryName: "Time",
    categoryPath: "/tools/time",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <CountdownTimerClient />
    </div>
  );
}
