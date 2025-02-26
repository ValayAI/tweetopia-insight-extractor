
"use client";

import DisplayCards from "@/components/ui/display-cards";
import { BarChart2, MessageCircle, Sparkles } from "lucide-react";

const featureCards = [
  {
    icon: <MessageCircle className="size-4 text-purple-300" />,
    title: "Sentiment Analysis",
    description: "Analyze the emotional tone and context of threads. Detect positive, negative, or neutral sentiment with AI-powered analysis, helping you understand public perception and emotional responses.",
    date: "Optional Feature",
    iconClassName: "text-purple-500",
    titleClassName: "text-purple-500",
    className:
      "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <BarChart2 className="size-4 text-amber-300" />,
    title: "Engagement Insights",
    description: "Get detailed metrics about likes, retweets, and replies. Understand which parts of threads resonate most with audiences and identify peak engagement patterns.",
    date: "Optional Feature",
    iconClassName: "text-amber-500",
    titleClassName: "text-amber-500",
    className:
      "[grid-area:stack] translate-x-12 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <Sparkles className="size-4 text-rose-300" />,
    title: "Coming Soon",
    description: "Advanced analytics, custom exports, and team collaboration features. Stay tuned for more powerful tools to enhance your Twitter thread analysis.",
    date: "Stay tuned",
    iconClassName: "text-rose-500",
    titleClassName: "text-rose-500",
    className:
      "[grid-area:stack] translate-x-24 translate-y-20 hover:translate-y-10",
  },
];

function OptionalFeatures() {
  return (
    <div className="flex min-h-[400px] w-full items-center justify-center py-20">
      <div className="w-full max-w-3xl">
        <DisplayCards cards={featureCards} />
      </div>
    </div>
  );
}

export { OptionalFeatures };
