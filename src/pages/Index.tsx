
import { useState } from "react";
import { TweetInput } from "@/components/TweetInput";
import { AnalysisResults } from "@/components/AnalysisResults";
import { ThemeToggle } from "@/components/ThemeToggle";

interface AnalysisData {
  summary: string;
  tldr: string;
}

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisData | null>(null);

  const handleAnalyze = async (url: string) => {
    setIsLoading(true);
    try {
      // Mock API call - Replace with actual API integration
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setAnalysis({
        summary: "• The thread discusses AI's impact on productivity\n• Key point 1: AI tools can boost efficiency by 40%\n• Key point 2: Integration with existing workflows is crucial\n• Key point 3: Training and adaptation period is necessary",
        tldr: "AI tools significantly boost productivity when properly integrated into existing workflows, though they require initial training and adaptation.",
      });
    } catch (error) {
      console.error("Error analyzing tweet:", error);
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
        </div>
      </div>
    </div>
  );
};

export default Index;
