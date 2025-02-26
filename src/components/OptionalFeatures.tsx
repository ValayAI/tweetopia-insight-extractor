
"use client";

import DisplayCards from "@/components/ui/display-cards";
import { BarChart2, MessageCircle } from "lucide-react";

const featureCards = [
  {
    icon: <MessageCircle className="size-4 text-purple-300" />,
    title: "Sentiment Analysis",
    description: "Uses NLP to analyze thread tone and emotion. Processes tweets to determine overall sentiment (positive ✅, negative ❌, neutral 🟡), provides percentage breakdowns, and highlights emotionally charged tweets. Leverages AI for deep text analysis and sentiment scoring.",
    date: "Optional Feature",
    iconClassName: "bg-purple-800",
    titleClassName: "text-purple-500",
    className:
      "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <BarChart2 className="size-4 text-amber-300" />,
    title: "Engagement Insights",
    description: "Ranks tweets by engagement using likes, retweets, and replies. Identifies top performing tweets, highlights the most engaging content, and provides detailed engagement breakdowns comparing tweet performance within threads.",
    date: "Optional Feature",
    iconClassName: "bg-amber-800",
    titleClassName: "text-amber-500",
    className:
      "[grid-area:stack] translate-x-16 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  }
];

function OptionalFeatures() {
  return (
    <div className="flex w-full items-center justify-center">
      <div className="w-full max-w-3xl">
        <DisplayCards cards={featureCards} />
      </div>
    </div>
  );
}

export { OptionalFeatures };
