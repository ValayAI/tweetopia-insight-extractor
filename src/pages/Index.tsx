
import { useState, useRef } from "react";
import { TweetInput } from "@/components/TweetInput";
import { AnalysisResults } from "@/components/AnalysisResults";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useToast } from "@/components/ui/use-toast";
import type { AnalysisData } from "@/types/analysis";
import { Globe, Sparkles } from "lucide-react";
import { BackgroundGradientAnimation } from "@/components/BackgroundGradientAnimation";
import { ScrollToTop } from "@/components/ScrollToTop";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisData | null>(null);
  const { toast } = useToast();
  const resultsRef = useRef<HTMLDivElement>(null);

  const extractTwitterId = (url: string): string | null => {
    const regex = /twitter\.com\/\w+\/status\/(\d+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const analyzeTweet = async (tweetId: string) => {
    try {
      // Here we would typically make an API call to Twitter's API
      // For now, let's simulate different responses based on the tweet ID
      const response = await fetch(`https://api.twitter.com/2/tweets/${tweetId}`, {
        headers: {
          'Authorization': `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch tweet data');
      }

      const tweetData = await response.json();
      
      // Process the tweet data and generate analysis
      // This is where you'd implement actual sentiment analysis, etc.
      return {
        summary: `Analysis of Tweet ${tweetId}\n• ${tweetData.data.text}\n• Generated engagement metrics\n• Analyzed sentiment`,
        tldr: tweetData.data.text.slice(0, 100) + "...",
        sentiment: {
          overall: Math.random() > 0.5 ? "positive" : "negative",
          breakdown: {
            positive: Math.floor(Math.random() * 60 + 40),
            neutral: Math.floor(Math.random() * 30),
            negative: Math.floor(Math.random() * 30)
          },
          highlightedTweets: [
            {
              text: tweetData.data.text,
              sentiment: "positive",
              score: Math.random()
            }
          ]
        },
        engagement: {
          topTweets: [
            {
              text: tweetData.data.text,
              likes: Math.floor(Math.random() * 1000),
              retweets: Math.floor(Math.random() * 500),
              replies: Math.floor(Math.random() * 100),
              engagementScore: Math.random()
            }
          ],
          mostEngaging: {
            text: tweetData.data.text,
            comparisonMetric: "This tweet performed above average"
          }
        }
      };
    } catch (error) {
      console.error('Error analyzing tweet:', error);
      throw error;
    }
  };

  const handleAnalyze = async (content: { type: "url" | "text"; value: string }) => {
    setIsLoading(true);
    try {
      if (content.type === "url") {
        const tweetId = extractTwitterId(content.value);
        
        if (!tweetId) {
          throw new Error("Invalid Twitter URL");
        }

        const analysisResult = await analyzeTweet(tweetId);
        setAnalysis(analysisResult);

        // Scroll to results after a short delay to ensure content is rendered
        setTimeout(() => {
          resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);

        toast({
          title: "Analysis Complete",
          description: "Your thread has been successfully analyzed!",
        });
      } else {
        throw new Error("Please provide a valid Twitter URL");
      }
    } catch (error) {
      console.error("Error analyzing thread:", error);
      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "There was an error analyzing your thread. Please try again.",
        variant: "destructive",
      });
      setAnalysis(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BackgroundGradientAnimation
      gradientBackgroundStart="rgb(44, 44, 44)"
      gradientBackgroundEnd="rgb(0, 0, 0)"
      firstColor="18, 113, 255"
      secondColor="221, 74, 255"
      thirdColor="100, 220, 255"
      pointerColor="140, 100, 255"
      containerClassName="min-h-screen w-full relative overflow-y-auto"
    >
      <ScrollToTop />
      <ThemeToggle />
      <div className="container mx-auto px-4 py-16 relative z-20">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-6">
            <div className="flex justify-center gap-3 mb-4">
              <Globe className="w-8 h-8 text-primary animate-pulse" />
              <Sparkles className="w-8 h-8 text-primary animate-pulse" />
            </div>
            <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Tweet Analyzer
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg mx-auto">
              Extract powerful insights from Twitter threads in seconds. Get sentiment analysis, 
              engagement metrics, and key takeaways instantly.
            </p>
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-primary/50 to-transparent mx-auto" />
          </div>

          <div className="flex flex-col items-center space-y-8">
            <TweetInput onAnalyze={handleAnalyze} isLoading={isLoading} />
            <div ref={resultsRef}>
              {analysis && <AnalysisResults {...analysis} />}
            </div>
          </div>
        </div>
      </div>
    </BackgroundGradientAnimation>
  );
};

export default Index;
