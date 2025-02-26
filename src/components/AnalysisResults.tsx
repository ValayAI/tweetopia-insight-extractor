
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Share2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface AnalysisResultsProps {
  summary: string;
  tldr: string;
}

export function AnalysisResults({ summary, tldr }: AnalysisResultsProps) {
  const { toast } = useToast();

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied to clipboard",
        description: "The summary has been copied to your clipboard.",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full max-w-2xl space-y-4 animate-fadeIn">
      <Card className="glass glass-hover p-6">
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
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  // Share functionality to be implemented
                  toast({
                    title: "Coming soon",
                    description: "Share functionality will be available soon.",
                  });
                }}
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">{tldr}</p>
        </div>
      </Card>

      <Card className="glass glass-hover p-6">
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
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  // Share functionality to be implemented
                  toast({
                    title: "Coming soon",
                    description: "Share functionality will be available soon.",
                  });
                }}
              >
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
