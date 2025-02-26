
import { useState } from "react";
import { TweetInput } from "@/components/TweetInput";
import { AnalysisResults } from "@/components/AnalysisResults";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useToast } from "@/components/ui/use-toast";
import type { AnalysisData } from "@/types/analysis";
import { Globe, Sparkles } from "lucide-react";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisData | null>(null);
  const { toast } = useToast();

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
      } else {
        // ... similar mock data for text input analysis
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
    <div className="min-h-screen w-full relative">
      {/* Background gradient with pattern */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-background to-secondary opacity-80"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <ThemeToggle />
      <div className="container mx-auto px-4 py-16 relative">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-6">
            <div className="flex justify-center gap-3 mb-4">
              <Globe className="w-8 h-8 text-primary animate-pulse" />
              <Sparkles className="w-8 h-8 text-primary animate-pulse" />
            </div>
            <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
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
            {analysis && <AnalysisResults {...analysis} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
