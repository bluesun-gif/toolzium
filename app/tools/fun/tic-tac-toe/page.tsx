import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import TicTacToeClient from "@/components/tools/fun/tic-tac-toe-client";

export const metadata = buildMetadata({
  title: "Tic Tac Toe with AI",
  description: "Tic Tac Toe game with 2-Player mode & AI opponent (Easy, Medium, Unbeatable Minimax). Win line highlights, audio feedback, score tracking.",
  path: "/tools/fun/tic-tac-toe",
  keywords: ["mode", "easy", "with", "opponent", "unbeatable", "highlights", "medium", "line", "audio", "game", "player", "minimax"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Tic Tac Toe with AI",
    description: "Tic Tac Toe game with 2-Player mode & AI opponent (Easy, Medium, Unbeatable Minimax). Win line highlights, audio feedback, score tracking.",
    path: "/tools/fun/tic-tac-toe",
    categoryName: "Fun",
    categoryPath: "/tools/fun",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <TicTacToeClient />
    </div>
  );
}
