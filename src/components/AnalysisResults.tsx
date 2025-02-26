import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Share2, ThumbsUp, ThumbsDown, Minus, BarChart2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import type { AnalysisData } from "@/types/analysis";
import { Progress } from "@/components/ui/progress";

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

  return (
    <div className="w-full max-w-2xl space-y-4 animate-fadeIn">
      {/* TL;DR Section */}
      <Card className="glass glass-hover p-6 relative overflow-hidden border-t-4 border-t-blue-500/50">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent" />
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">TL;DR</h3>
            <div className="space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(tldr)}
              >
                <Copy className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">{tldr}</p>
        </div>
      </Card>

      {/* Sentiment Analysis Section */}
      <Card className="glass glass-hover p-6 relative overflow-hidden border-t-4 border-t-green-500/50">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-transparent" />
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Sentiment Analysis</h3>
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
      </Card>

      {/* Engagement Metrics Section */}
      <Card className="glass glass-hover p-6 relative overflow-hidden border-t-4 border-t-purple-500/50">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent" />
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Engagement Insights</h3>
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
      </Card>

      {/* Key Takeaways Section */}
      <Card className="glass glass-hover p-6 relative overflow-hidden border-t-4 border-t-amber-500/50">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-transparent" />
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Key Takeaways</h3>
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
      </Card>
    </div>
  );
}
