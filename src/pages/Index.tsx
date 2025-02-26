
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

  const handleAnalyze = async (content: { type: "url" | "text"; value: string }) => {
    setIsLoading(true);
    try {
      // Mock API call - Replace with actual API integration
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // Simulate different analysis based on input type
      if (content.type === "url") {
        setAnalysis({
          summary: "• Thread from URL analysis\n• Key point 1: AI tools can boost efficiency by 40%\n• Key point 2: Integration with existing workflows is crucial\n• Key point 3: Training and adaptation period is necessary",
          tldr: "AI tools significantly boost productivity when properly integrated into existing workflows, though they require initial training and adaptation.",
          sentiment: {
            overall: "positive",
            breakdown: {
              positive: 65,
              neutral: 25,
              negative: 10
            },
            highlightedTweets: [
              {
                text: "AI-powered automation has revolutionized our workflow, cutting processing time by 40%! 🚀",
                sentiment: "positive",
                score: 0.92
              },
              {
                text: "Initial setup can be challenging, but the long-term benefits are worth it.",
                sentiment: "negative",
                score: -0.3
              }
            ]
          },
          engagement: {
            topTweets: [
              {
                text: "AI tools have helped us achieve a 40% reduction in processing time while maintaining accuracy.",
                likes: 1200,
                retweets: 450,
                replies: 89,
                engagementScore: 0.95
              },
              {
                text: "Here's a step-by-step guide to integrating AI tools into your existing workflow:",
                likes: 800,
                retweets: 350,
                replies: 45,
                engagementScore: 0.85
              }
            ],
            mostEngaging: {
              text: "AI tools have helped us achieve a 40% reduction in processing time while maintaining accuracy.",
              comparisonMetric: "This tweet received 5x more engagement than the thread average"
            }
          }
        });

        // Scroll to results after a short delay to ensure content is rendered
        setTimeout(() => {
          resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }

      toast({
        title: "Analysis Complete",
        description: "Your thread has been successfully analyzed!",
      });
    } catch (error) {
      console.error("Error analyzing thread:", error);
      toast({
        title: "Analysis Failed",
        description: "There was an error analyzing your thread. Please try again.",
        variant: "destructive",
      });
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
