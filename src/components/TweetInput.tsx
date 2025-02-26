
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { MessageCircle } from "lucide-react";

interface TweetInputProps {
  onAnalyze: (url: string) => void;
  isLoading: boolean;
}

export function TweetInput({ onAnalyze, isLoading }: TweetInputProps) {
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onAnalyze(url.trim());
    }
  };

  return (
    <Card className="w-full max-w-2xl glass glass-hover p-6 animate-fadeIn">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center space-x-2">
          <MessageCircle className="w-5 h-5 text-muted-foreground" />
          <p className="text-sm font-medium">Enter Tweet Thread URL</p>
        </div>
        <Input
          type="url"
          placeholder="https://twitter.com/username/status/123456789"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full bg-white/50 dark:bg-black/50"
        />
        <Button 
          type="submit" 
          className="w-full"
          disabled={isLoading || !url.trim()}
        >
          {isLoading ? "Analyzing..." : "Analyze Thread"}
        </Button>
      </form>
    </Card>
  );
}
