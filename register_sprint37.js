const fs = require('fs');
const path = require('path');

const toolsPath = path.join(__dirname, 'data/tools.ts');
let content = fs.readFileSync(toolsPath, 'utf8');

const sprint37Tools = [
  {
    category: "Developer",
    tool: {
      title: "CSS Typography & Text Effect Generator",
      url: "/tools/dev/css-typography",
      description: "Visual CSS typography generator. Text shadow 3D, WebKit text-stroke, gradients, uppercase/lowercase, letter spacing, presets.",
      popular: true,
    }
  },
  {
    category: "Health",
    tool: {
      title: "Stair Climbing & Step Workout Calorie Calculator",
      url: "/tools/health/stair-climbing-calorie",
      description: "Calculate calories burned during stair climbing, step-ups, and StairMaster ergometer workouts by flights of stairs or duration.",
      popular: true,
    }
  },
  {
    category: "Calculators",
    tool: {
      title: "Loan Amortization Schedule & Payment Calculator",
      url: "/tools/finance/loan-amortization",
      description: "Calculate monthly loan payment and full itemized amortization breakdown table with extra monthly principal payment payoff savings.",
      popular: true,
    }
  },
  {
    category: "Fun",
    tool: {
      title: "Connect 4 AI Challenge Game",
      url: "/tools/fun/connect4-ai",
      description: "Interactive 7x6 Connect 4 grid game with AI opponent (Easy, Medium, Minimax Smart AI) and 2-player Pass & Play mode.",
      popular: true,
    }
  },
  {
    category: "Productivity",
    tool: {
      title: "Eisenhower Prioritization Matrix Workspace",
      url: "/tools/productivity/eisenhower-workspace",
      description: "Interactive Eisenhower task prioritization workspace. Do First, Schedule, Delegate, and Eliminate quadrants with category filters.",
      popular: true,
    }
  },
  {
    category: "Image",
    tool: {
      title: "Color Contrast Matrix Exporter",
      url: "/tools/image/contrast-matrix-export",
      description: "Generate and export accessible design system color contrast matrices. 3 to 8 palette colors, WCAG AA/AAA ratings, SVG download.",
      popular: true,
    }
  },
  {
    category: "Office",
    tool: {
      title: "Consulting Services Agreement Generator",
      url: "/tools/office/consulting-agreement",
      description: "Generate formal Consulting Services and Client Engagement Contracts. Hourly rate/fixed fee/retainer terms, scope, print view.",
      popular: true,
    }
  },
  {
    category: "Date & Time",
    tool: {
      title: "REM Sleep Cycle & Wakeup Alarm Calculator",
      url: "/tools/time/rem-sleep-alarm",
      description: "Calculate optimal bedtime and wake-up alarm times based on 90-minute REM sleep cycles and 14-minute sleep onset latency.",
      popular: true,
    }
  },
  {
    category: "Travel",
    tool: {
      title: "Travel Budget Multi-Currency Comparison Sheet",
      url: "/tools/travel/travel-budget-sheet",
      description: "Multi-currency travel expense comparison and trip budgeting sheet. Flight, accommodation, food, and activity breakdown.",
      popular: true,
    }
  },
  {
    category: "Utilities",
    tool: {
      title: "Diceware Wordlist Passphrase Generator",
      url: "/tools/util/diceware-password",
      description: "Generate ultra-secure, human-memorable Diceware passphrases (e.g. correct-horse-battery-staple) with entropy bits calculations.",
      popular: true,
    }
  }
];

sprint37Tools.forEach(({ category, tool }) => {
  const catRegex = new RegExp(`(title:\\s*["']` + category + `["'][\\s\\S]*?items:\\s*\\[)([\\s\\S]*?)(\\]\\s*,\\s*\\})`);
  const match = content.match(catRegex);
  if (match) {
    const formattedTool = `      {
        title: "${tool.title}",
        url: "${tool.url}",
        description:
          "${tool.description}",
        popular: true,
      },`;
    
    if (!content.includes(tool.url)) {
      const newItems = match[2] + '\n' + formattedTool;
      content = content.replace(match[0], match[1] + newItems + match[3]);
      console.log('Added:', tool.url);
    }
  } else {
    console.error('Category not found:', category);
  }
});

fs.writeFileSync(toolsPath, content, 'utf8');
console.log('Successfully registered Sprint 37 tools!');
