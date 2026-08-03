"use client";

import React, { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Smile, Search, Copy, Grid3x3 } from "lucide-react";
import { ActionButton, CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

// Simplified emoji database for demonstration
const EMOJI_DB = [
  // Smileys
  { emoji: "😀", name: "grinning face", category: "Smileys" },
  { emoji: "😁", name: "beaming face", category: "Smileys" },
  { emoji: "😂", name: "face with tears of joy", category: "Smileys" },
  { emoji: "🤣", name: "rolling on the floor laughing", category: "Smileys" },
  { emoji: "😃", name: "grinning face with big eyes", category: "Smileys" },
  { emoji: "😄", name: "grinning face with smiling eyes", category: "Smileys" },
  { emoji: "😅", name: "grinning face with sweat", category: "Smileys" },
  { emoji: "😆", name: "grinning squinting face", category: "Smileys" },
  { emoji: "😉", name: "winking face", category: "Smileys" },
  { emoji: "😊", name: "smiling face with smiling eyes", category: "Smileys" },
  { emoji: "😋", name: "face savoring food", category: "Smileys" },
  { emoji: "😎", name: "smiling face with sunglasses", category: "Smileys" },
  { emoji: "😍", name: "smiling face with heart-eyes", category: "Smileys" },
  { emoji: "😘", name: "face blowing a kiss", category: "Smileys" },
  { emoji: "🥰", name: "smiling face with hearts", category: "Smileys" },
  { emoji: "🤔", name: "thinking face", category: "Smileys" },
  { emoji: "😐", name: "neutral face", category: "Smileys" },
  { emoji: "🙄", name: "face with rolling eyes", category: "Smileys" },
  { emoji: "😏", name: "smirking face", category: "Smileys" },
  { emoji: "😔", name: "pensive face", category: "Smileys" },
  { emoji: "😴", name: "sleeping face", category: "Smileys" },
  { emoji: "😷", name: "face with medical mask", category: "Smileys" },
  { emoji: "🤢", name: "nauseated face", category: "Smileys" },
  { emoji: "🤮", name: "face vomiting", category: "Smileys" },
  { emoji: "🥺", name: "pleading face", category: "Smileys" },
  { emoji: "😭", name: "loudly crying face", category: "Smileys" },
  { emoji: "😱", name: "face screaming in fear", category: "Smileys" },
  { emoji: "🤯", name: "exploding head", category: "Smileys" },
  { emoji: "🤬", name: "face with symbols on mouth", category: "Smileys" },
  { emoji: "🥳", name: "partying face", category: "Smileys" },

  // People
  { emoji: "👋", name: "waving hand", category: "People" },
  { emoji: "🤚", name: "raised back of hand", category: "People" },
  { emoji: "🖐️", name: "hand with fingers splayed", category: "People" },
  { emoji: "✋", name: "raised hand", category: "People" },
  { emoji: "🖖", name: "vulcan salute", category: "People" },
  { emoji: "👌", name: "OK hand", category: "People" },
  { emoji: "✌️", name: "victory hand", category: "People" },
  { emoji: "🤞", name: "crossed fingers", category: "People" },
  { emoji: "🤟", name: "love-you gesture", category: "People" },
  { emoji: "🤘", name: "sign of the horns", category: "People" },
  { emoji: "🤙", name: "call me hand", category: "People" },
  { emoji: "👈", name: "backhand index pointing left", category: "People" },
  { emoji: "👉", name: "backhand index pointing right", category: "People" },
  { emoji: "👆", name: "backhand index pointing up", category: "People" },
  { emoji: "👇", name: "backhand index pointing down", category: "People" },
  { emoji: "👍", name: "thumbs up", category: "People" },
  { emoji: "👎", name: "thumbs down", category: "People" },
  { emoji: "✊", name: "raised fist", category: "People" },
  { emoji: "👊", name: "oncoming fist", category: "People" },
  { emoji: "🤛", name: "left-facing fist", category: "People" },
  { emoji: "🤜", name: "right-facing fist", category: "People" },
  { emoji: "👏", name: "clapping hands", category: "People" },
  { emoji: "🙌", name: "raising hands", category: "People" },
  { emoji: "👐", name: "open hands", category: "People" },
  { emoji: "🤲", name: "palms up together", category: "People" },
  { emoji: "🤝", name: "handshake", category: "People" },
  { emoji: "🙏", name: "folded hands", category: "People" },
  { emoji: "✍️", name: "writing hand", category: "People" },
  { emoji: "💅", name: "nail polish", category: "People" },
  { emoji: "🤳", name: "selfie", category: "People" },

  // Animals
  { emoji: "🐶", name: "dog face", category: "Animals" },
  { emoji: "🐱", name: "cat face", category: "Animals" },
  { emoji: "🐭", name: "mouse face", category: "Animals" },
  { emoji: "🐹", name: "hamster face", category: "Animals" },
  { emoji: "🐰", name: "rabbit face", category: "Animals" },
  { emoji: "🦊", name: "fox face", category: "Animals" },
  { emoji: "🐻", name: "bear face", category: "Animals" },
  { emoji: "🐼", name: "panda face", category: "Animals" },
  { emoji: "🐨", name: "koala", category: "Animals" },
  { emoji: "🐯", name: "tiger face", category: "Animals" },
  { emoji: "🦁", name: "lion face", category: "Animals" },
  { emoji: "🐮", name: "cow face", category: "Animals" },
  { emoji: "🐷", name: "pig face", category: "Animals" },
  { emoji: "🐸", name: "frog face", category: "Animals" },
  { emoji: "🐵", name: "monkey face", category: "Animals" },
  { emoji: "🦍", name: "gorilla", category: "Animals" },
  { emoji: "🦧", name: "orangutan", category: "Animals" },
  { emoji: "🐔", name: "chicken", category: "Animals" },
  { emoji: "🐧", name: "penguin", category: "Animals" },
  { emoji: "🐦", name: "bird", category: "Animals" },
  { emoji: "🐤", name: "baby chick", category: "Animals" },
  { emoji: "🦆", name: "duck", category: "Animals" },
  { emoji: "🦅", name: "eagle", category: "Animals" },
  { emoji: "🦉", name: "owl", category: "Animals" },
  { emoji: "🦇", name: "bat", category: "Animals" },
  { emoji: "🐺", name: "wolf", category: "Animals" },
  { emoji: "🐗", name: "boar", category: "Animals" },
  { emoji: "🐴", name: "horse face", category: "Animals" },
  { emoji: "🦄", name: "unicorn", category: "Animals" },
  { emoji: "🐝", name: "honeybee", category: "Animals" },

  // Food
  { emoji: "🍎", name: "red apple", category: "Food" },
  { emoji: "🍏", name: "green apple", category: "Food" },
  { emoji: "🍐", name: "pear", category: "Food" },
  { emoji: "🍊", name: "tangerine", category: "Food" },
  { emoji: "🍋", name: "lemon", category: "Food" },
  { emoji: "🍌", name: "banana", category: "Food" },
  { emoji: "🍉", name: "watermelon", category: "Food" },
  { emoji: "🍇", name: "grapes", category: "Food" },
  { emoji: "🍓", name: "strawberry", category: "Food" },
  { emoji: "🍈", name: "melon", category: "Food" },
  { emoji: "🍒", name: "cherries", category: "Food" },
  { emoji: "🍑", name: "peach", category: "Food" },
  { emoji: "🥭", name: "mango", category: "Food" },
  { emoji: "🍍", name: "pineapple", category: "Food" },
  { emoji: "🥥", name: "coconut", category: "Food" },
  { emoji: "🥝", name: "kiwi fruit", category: "Food" },
  { emoji: "🍅", name: "tomato", category: "Food" },
  { emoji: "🥑", name: "avocado", category: "Food" },
  { emoji: "🍆", name: "eggplant", category: "Food" },
  { emoji: "🥔", name: "potato", category: "Food" },
  { emoji: "🥕", name: "carrot", category: "Food" },
  { emoji: "🌽", name: "ear of corn", category: "Food" },
  { emoji: "🌶️", name: "hot pepper", category: "Food" },
  { emoji: "🥒", name: "cucumber", category: "Food" },
  { emoji: "🥬", name: "leafy green", category: "Food" },
  { emoji: "🥦", name: "broccoli", category: "Food" },
  { emoji: "🧄", name: "garlic", category: "Food" },
  { emoji: "🧅", name: "onion", category: "Food" },
  { emoji: "🍄", name: "mushroom", category: "Food" },
  { emoji: "🥜", name: "peanuts", category: "Food" },

  // Travel
  { emoji: "🚗", name: "automobile", category: "Travel" },
  { emoji: "🚕", name: "taxi", category: "Travel" },
  { emoji: "🚙", name: "sport utility vehicle", category: "Travel" },
  { emoji: "🚌", name: "bus", category: "Travel" },
  { emoji: "🚎", name: "trolleybus", category: "Travel" },
  { emoji: "🏎️", name: "racing car", category: "Travel" },
  { emoji: "🚓", name: "police car", category: "Travel" },
  { emoji: "🚑", name: "ambulance", category: "Travel" },
  { emoji: "🚒", name: "fire engine", category: "Travel" },
  { emoji: "🚐", name: "minibus", category: "Travel" },
  { emoji: "🚚", name: "delivery truck", category: "Travel" },
  { emoji: "🚛", name: "articulated lorry", category: "Travel" },
  { emoji: "🚜", name: "tractor", category: "Travel" },
  { emoji: "🛴", name: "kick scooter", category: "Travel" },
  { emoji: "🚲", name: "bicycle", category: "Travel" },
  { emoji: "🛵", name: "motor scooter", category: "Travel" },
  { emoji: "🏍️", name: "motorcycle", category: "Travel" },
  { emoji: "🛺", name: "auto rickshaw", category: "Travel" },
  { emoji: "🚨", name: "police car light", category: "Travel" },
  { emoji: "🚆", name: "train", category: "Travel" },
  { emoji: "✈️", name: "airplane", category: "Travel" },
  { emoji: "🚁", name: "helicopter", category: "Travel" },
  { emoji: "🚀", name: "rocket", category: "Travel" },
  { emoji: "🛸", name: "flying saucer", category: "Travel" },
  { emoji: "⛵", name: "sailboat", category: "Travel" },
  { emoji: "🚤", name: "speedboat", category: "Travel" },
  { emoji: "🚢", name: "ship", category: "Travel" },
  { emoji: "🗺️", name: "world map", category: "Travel" },
  { emoji: "🗿", name: "moai", category: "Travel" },
  { emoji: "🗽", name: "Statue of Liberty", category: "Travel" },

  // Activities
  { emoji: "⚽", name: "soccer ball", category: "Activities" },
  { emoji: "🏀", name: "basketball", category: "Activities" },
  { emoji: "🏈", name: "american football", category: "Activities" },
  { emoji: "⚾", name: "baseball", category: "Activities" },
  { emoji: "🥎", name: "softball", category: "Activities" },
  { emoji: "🎾", name: "tennis", category: "Activities" },
  { emoji: "🏐", name: "volleyball", category: "Activities" },
  { emoji: "🏉", name: "rugby football", category: "Activities" },
  { emoji: "🥏", name: "flying disc", category: "Activities" },
  { emoji: "🎱", name: "pool 8 ball", category: "Activities" },
  { emoji: "🪀", name: "yo-yo", category: "Activities" },
  { emoji: "🏓", name: "ping pong", category: "Activities" },
  { emoji: "🏸", name: "badminton", category: "Activities" },
  { emoji: "🏒", name: "ice hockey", category: "Activities" },
  { emoji: "🏑", name: "field hockey", category: "Activities" },
  { emoji: "🥍", name: "lacrosse", category: "Activities" },
  { emoji: "🏏", name: "cricket game", category: "Activities" },
  { emoji: "🥊", name: "boxing glove", category: "Activities" },
  { emoji: "🥋", name: "martial arts uniform", category: "Activities" },
  { emoji: "🥅", name: "goal net", category: "Activities" },
  { emoji: "⛳", name: "flag in hole", category: "Activities" },
  { emoji: "⛸️", name: "ice skate", category: "Activities" },
  { emoji: "🎣", name: "fishing pole", category: "Activities" },
  { emoji: "🤿", name: "diving mask", category: "Activities" },
  { emoji: "🎽", name: "running shirt", category: "Activities" },
  { emoji: "🎿", name: "skis", category: "Activities" },
  { emoji: "🛷", name: "sled", category: "Activities" },
  { emoji: "🥌", name: "curling stone", category: "Activities" },
  { emoji: "🎯", name: "direct hit", category: "Activities" },
  { emoji: "🎮", name: "video game", category: "Activities" },

  // Objects
  { emoji: "⌚", name: "watch", category: "Objects" },
  { emoji: "📱", name: "mobile phone", category: "Objects" },
  { emoji: "📲", name: "mobile phone with arrow", category: "Objects" },
  { emoji: "💻", name: "laptop", category: "Objects" },
  { emoji: "⌨️", name: "keyboard", category: "Objects" },
  { emoji: "🖥️", name: "desktop computer", category: "Objects" },
  { emoji: "🖨️", name: "printer", category: "Objects" },
  { emoji: "🖱️", name: "computer mouse", category: "Objects" },
  { emoji: "🖲️", name: "trackball", category: "Objects" },
  { emoji: "🕹️", name: "joystick", category: "Objects" },
  { emoji: "🗜️", name: "clamp", category: "Objects" },
  { emoji: "💽", name: "computer disk", category: "Objects" },
  { emoji: "💾", name: "floppy disk", category: "Objects" },
  { emoji: "💿", name: "optical disk", category: "Objects" },
  { emoji: "📀", name: "dvd", category: "Objects" },
  { emoji: "📼", name: "videocassette", category: "Objects" },
  { emoji: "📷", name: "camera", category: "Objects" },
  { emoji: "📸", name: "camera with flash", category: "Objects" },
  { emoji: "📹", name: "video camera", category: "Objects" },
  { emoji: "🎥", name: "movie camera", category: "Objects" },
  { emoji: "📽️", name: "film projector", category: "Objects" },
  { emoji: "🎞️", name: "film frames", category: "Objects" },
  { emoji: "📞", name: "telephone receiver", category: "Objects" },
  { emoji: "☎️", name: "telephone", category: "Objects" },
  { emoji: "📟", name: "pager", category: "Objects" },
  { emoji: "📠", name: "fax machine", category: "Objects" },
  { emoji: "📺", name: "television", category: "Objects" },
  { emoji: "📻", name: "radio", category: "Objects" },
  { emoji: "🎙️", name: "studio microphone", category: "Objects" },
  { emoji: "🎚️", name: "level slider", category: "Objects" },

  // Symbols
  { emoji: "❤️", name: "red heart", category: "Symbols" },
  { emoji: "🧡", name: "orange heart", category: "Symbols" },
  { emoji: "💛", name: "yellow heart", category: "Symbols" },
  { emoji: "💚", name: "green heart", category: "Symbols" },
  { emoji: "💙", name: "blue heart", category: "Symbols" },
  { emoji: "💜", name: "purple heart", category: "Symbols" },
  { emoji: "🤎", name: "brown heart", category: "Symbols" },
  { emoji: "🖤", name: "black heart", category: "Symbols" },
  { emoji: "🤍", name: "white heart", category: "Symbols" },
  { emoji: "💔", name: "broken heart", category: "Symbols" },
  { emoji: "❣️", name: "heavy heart exclamation", category: "Symbols" },
  { emoji: "💕", name: "two hearts", category: "Symbols" },
  { emoji: "💞", name: "revolving hearts", category: "Symbols" },
  { emoji: "💓", name: "beating heart", category: "Symbols" },
  { emoji: "💗", name: "growing heart", category: "Symbols" },
  { emoji: "💖", name: "sparkling heart", category: "Symbols" },
  { emoji: "💘", name: "heart with arrow", category: "Symbols" },
  { emoji: "💝", name: "heart with ribbon", category: "Symbols" },
  { emoji: "💟", name: "heart decoration", category: "Symbols" },
  { emoji: "☮️", name: "peace symbol", category: "Symbols" },
  { emoji: "✝️", name: "latin cross", category: "Symbols" },
  { emoji: "☪️", name: "star and crescent", category: "Symbols" },
  { emoji: "🕉️", name: "om", category: "Symbols" },
  { emoji: "☸️", name: "wheel of dharma", category: "Symbols" },
  { emoji: "✡️", name: "star of David", category: "Symbols" },
  { emoji: "🔯", name: "dotted six-pointed star", category: "Symbols" },
  { emoji: "🕎", name: "menorah", category: "Symbols" },
  { emoji: "☯️", name: "yin yang", category: "Symbols" },
  { emoji: "☦️", name: "orthodox cross", category: "Symbols" },
  { emoji: "🛐", name: "place of worship", category: "Symbols" },

  // Flags
  { emoji: "🏁", name: "chequered flag", category: "Flags" },
  { emoji: "🚩", name: "triangular flag", category: "Flags" },
  { emoji: "🎌", name: "crossed flags", category: "Flags" },
  { emoji: "🏴", name: "black flag", category: "Flags" },
  { emoji: "🏳️", name: "white flag", category: "Flags" },
  { emoji: "🏳️‍🌈", name: "rainbow flag", category: "Flags" },
  { emoji: "🏳️‍⚧️", name: "transgender flag", category: "Flags" },
  { emoji: "🏴‍☠️", name: "pirate flag", category: "Flags" },
  { emoji: "🇺🇳", name: "flag: United Nations", category: "Flags" },
  { emoji: "🇺🇸", name: "flag: United States", category: "Flags" },
  { emoji: "🇬🇧", name: "flag: United Kingdom", category: "Flags" },
  { emoji: "🇨🇦", name: "flag: Canada", category: "Flags" },
  { emoji: "🇦🇺", name: "flag: Australia", category: "Flags" },
  { emoji: "🇩🇪", name: "flag: Germany", category: "Flags" },
  { emoji: "🇫🇷", name: "flag: France", category: "Flags" },
  { emoji: "🇮🇹", name: "flag: Italy", category: "Flags" },
  { emoji: "🇪🇸", name: "flag: Spain", category: "Flags" },
  { emoji: "🇯🇵", name: "flag: Japan", category: "Flags" },
  { emoji: "🇰🇷", name: "flag: South Korea", category: "Flags" },
  { emoji: "🇨🇳", name: "flag: China", category: "Flags" },
  { emoji: "🇮🇳", name: "flag: India", category: "Flags" },
  { emoji: "🇧🇷", name: "flag: Brazil", category: "Flags" },
  { emoji: "🇲🇽", name: "flag: Mexico", category: "Flags" },
  { emoji: "🇿🇦", name: "flag: South Africa", category: "Flags" },
  { emoji: "🇳🇬", name: "flag: Nigeria", category: "Flags" },
  { emoji: "🇪🇬", name: "flag: Egypt", category: "Flags" },
  { emoji: "🇸🇦", name: "flag: Saudi Arabia", category: "Flags" },
  { emoji: "🇦🇪", name: "flag: United Arab Emirates", category: "Flags" },
  { emoji: "🇹🇷", name: "flag: Turkey", category: "Flags" },
  { emoji: "🇷🇺", name: "flag: Russia", category: "Flags" }
];

const CATEGORIES = ["Smileys", "People", "Animals", "Food", "Travel", "Activities", "Objects", "Symbols", "Flags"];

export function EmojiPickerClient() {
  const [search, setSearch] = useState("");
  const [recent, setRecent] = useState<{ emoji: string; name: string }[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("emoji-picker-recent");
    if (saved) {
      try {
        setRecent(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse recent emojis", e);
      }
    }
  }, []);

  const saveRecent = (item: { emoji: string; name: string }) => {
    const updated = [item, ...recent.filter(r => r.emoji !== item.emoji)].slice(0, 20);
    setRecent(updated);
    localStorage.setItem("emoji-picker-recent", JSON.stringify(updated));
  };

  const handleCopy = (item: { emoji: string; name: string }) => {
    navigator.clipboard.writeText(item.emoji);
    toast.success(`Copied ${item.emoji} to clipboard!`);
    saveRecent(item);
  };

  const filteredEmojis = search.trim()
    ? EMOJI_DB.filter(e => e.name.toLowerCase().includes(search.toLowerCase()) || e.emoji.includes(search))
    : EMOJI_DB;

  const grouped = search.trim()
    ? { "Search Results": filteredEmojis }
    : CATEGORIES.reduce((acc, cat) => {
        acc[cat] = EMOJI_DB.filter(e => e.category === cat);
        return acc;
      }, {} as Record<string, typeof EMOJI_DB>);

  return (
    <div className="space-y-6">
      <ToolPageHeader
        icon={Smile}
        title="Emoji Picker & Search"
        description="Search, discover, and copy emojis from various categories instantly."
      />

      <GlassCard>
        <CardHeader>
          <CardTitle>Find Emojis</CardTitle>
          <CardDescription>Search by keyword or browse through categories.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search emojis (e.g. smile, heart, flag)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardContent>
      </GlassCard>

      {recent.length > 0 && !search.trim() && (
        <GlassCard>
          <CardHeader>
            <CardTitle>Recently Used</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {recent.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleCopy(item)}
                  title={item.name}
                  className="text-3xl p-2 hover:bg-muted rounded-md transition-colors"
                >
                  {item.emoji}
                </button>
              ))}
            </div>
          </CardContent>
        </GlassCard>
      )}

      <div className="space-y-6">
        {Object.entries(grouped).map(([category, emojis]) => {
          if (emojis.length === 0) return null;
          return (
            <GlassCard key={category}>
              <CardHeader>
                <CardTitle>{category}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-2">
                  {emojis.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleCopy(item)}
                      title={item.name}
                      className="text-3xl aspect-square flex items-center justify-center hover:bg-muted rounded-md transition-colors"
                    >
                      {item.emoji}
                    </button>
                  ))}
                </div>
              </CardContent>
            </GlassCard>
          );
        })}
        
        {search.trim() && filteredEmojis.length === 0 && (
          <GlassCard>
            <CardContent className="py-12 text-center text-muted-foreground">
              No emojis found matching "{search}".
            </CardContent>
          </GlassCard>
        )}
      </div>
    </div>
  );
}
