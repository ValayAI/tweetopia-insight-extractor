
import { useState } from "react";
import { TweetInput } from "@/components/TweetInput";
import { AnalysisResults } from "@/components/AnalysisResults";
import { ThemeToggle } from "@/components/ThemeToggle";
import { OptionalFeatures } from "@/components/OptionalFeatures";
import { useToast } from "@/components/ui/use-toast";

interface AnalysisData {
  summary: string;
  tldr: string;
}

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
        });
      } else {
        setAnalysis({
          summary: "• Analysis from pasted text\n• Key point 1: Custom content analysis\n• Key point 2: Text-based insights extraction\n• Key point 3: Direct content processing",
          tldr: "Direct text analysis provides custom insights from pasted content, enabling flexible thread analysis without URLs.",
        });
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
    <div className="min-h-screen w-full bg-gradient-to-b from-background to-secondary">
      <ThemeToggle />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">Tweet Analyzer</h1>
            <p className="text-lg text-muted-foreground">
              Extract insights from Twitter threads in seconds
            </p>
          </div>

          <div className="flex flex-col items-center space-y-8">
            <TweetInput onAnalyze={handleAnalyze} isLoading={isLoading} />
            {analysis && <AnalysisResults {...analysis} />}
          </div>

          <div>
            <div className="text-center mb-2">
              <h2 className="text-2xl font-semibold">Optional Features</h2>
              <p className="text-muted-foreground">
                Discover more powerful analysis tools
              </p>
            </div>
            <OptionalFeatures />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
