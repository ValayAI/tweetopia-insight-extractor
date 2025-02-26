import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Share2, ThumbsUp, ThumbsDown, Minus, BarChart2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import type { AnalysisData } from "@/types/analysis";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export function AnalysisResults({ summary, tldr, sentiment, engagement }: AnalysisData) {
  const { toast } = useToast();

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied to clipboard",
        description: "The content has been copied to your clipboard.",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  const getSentimentIcon = (type: "positive" | "negative" | "neutral") => {
    switch (type) {
      case "positive":
        return <ThumbsUp className="h-4 w-4 text-green-500" />;
      case "negative":
        return <ThumbsDown className="h-4 w-4 text-red-500" />;
      default:
        return <Minus className="h-4 w-4 text-yellow-500" />;
    }
  };
  
  const CardFeature = ({
    icon,
    title,
    children,
    className,
  }: {
    icon: React.ReactNode;
    title: string;
    children: React.ReactNode;
    className?: string;
  }) => {
    return (
      <Card className={cn(
        "group/feature relative overflow-hidden",
        "transition-all duration-300 ease-in-out",
        "border border-neutral-200 dark:border-neutral-800",
        className
      )}>
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100/50 dark:from-neutral-800/50 to-transparent pointer-events-none" />
        
        <div className="p-6 relative z-10">
          <div className="mb-4 text-neutral-600 dark:text-neutral-400">
            {icon}
          </div>
          <div className="text-lg font-bold mb-2 relative group-hover/feature:translate-x-2 transition-all duration-200">
            <div className="absolute left-0 inset-y-0 -ml-6 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
            <span className="text-neutral-800 dark:text-neutral-100">
              {title}
            </span>
          </div>
          <div className="relative z-10">
            {children}
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="w-full max-w-2xl space-y-4 animate-fadeIn">
      <CardFeature
        icon={<Copy className="h-6 w-6" />}
        title="TL;DR"
        className="bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-950/50 dark:to-purple-950/50"
      >
        <p className="text-sm text-muted-foreground">{tldr}</p>
      </CardFeature>

      <CardFeature
        icon={<ThumbsUp className="h-6 w-6" />}
        title="Sentiment Analysis"
        className="bg-gradient-to-br from-green-50/50 to-emerald-50/50 dark:from-green-950/50 dark:to-emerald-950/50"
      >
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              {getSentimentIcon(sentiment.overall)}
              <span className="text-sm font-medium capitalize">{sentiment.overall}</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Positive</span>
                <span>{sentiment.breakdown.positive}%</span>
              </div>
              <Progress value={sentiment.breakdown.positive} className="bg-muted h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Neutral</span>
                <span>{sentiment.breakdown.neutral}%</span>
              </div>
              <Progress value={sentiment.breakdown.neutral} className="bg-muted h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Negative</span>
                <span>{sentiment.breakdown.negative}%</span>
              </div>
              <Progress value={sentiment.breakdown.negative} className="bg-muted h-2" />
            </div>
          </div>

          {sentiment.highlightedTweets.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Highlighted Tweets</h4>
              <div className="space-y-2">
                {sentiment.highlightedTweets.map((tweet, index) => (
                  <div key={index} className="text-sm p-3 rounded-md bg-background/50">
                    <div className="flex items-center gap-2 mb-1">
                      {getSentimentIcon(tweet.sentiment)}
                      <span className="text-xs text-muted-foreground">
                        Sentiment Score: {tweet.score}
                      </span>
                    </div>
                    <p className="text-muted-foreground">{tweet.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardFeature>

      <CardFeature
        icon={<BarChart2 className="h-6 w-6" />}
        title="Engagement Insights"
        className="bg-gradient-to-br from-purple-50/50 to-pink-50/50 dark:from-purple-950/50 dark:to-pink-950/50"
      >
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <BarChart2 className="h-5 w-5 text-muted-foreground" />
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-md bg-background/50">
              <h4 className="text-sm font-medium mb-2">Most Engaging Tweet</h4>
              <p className="text-sm text-muted-foreground mb-2">{engagement.mostEngaging.text}</p>
              <p className="text-xs text-muted-foreground">{engagement.mostEngaging.comparisonMetric}</p>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Top Performing Tweets</h4>
              {engagement.topTweets.map((tweet, index) => (
                <div key={index} className="p-3 rounded-md bg-background/50">
                  <p className="text-sm text-muted-foreground mb-2">{tweet.text}</p>
                  <div className="flex gap-4 text-xs text-muted-foreground">
                    <span>❤️ {tweet.likes}</span>
                    <span>🔄 {tweet.retweets}</span>
                    <span>💬 {tweet.replies}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardFeature>

      <CardFeature
        icon={<Copy className="h-6 w-6" />}
        title="Key Takeaways"
        className="bg-gradient-to-br from-amber-50/50 to-yellow-50/50 dark:from-amber-950/50 dark:to-yellow-950/50"
      >
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(summary)}
              >
                <Copy className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="space-y-2 text-sm text-muted-foreground">
            {summary.split("\n").map((point, index) => (
              <p key={index}>{point}</p>
            ))}
          </div>
        </div>
      </CardFeature>
    </div>
  );
}
