
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { MessageCircle, Link as LinkIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface TweetInputProps {
  onAnalyze: (content: { type: "url" | "text"; value: string }) => void;
  isLoading: boolean;
}

export function TweetInput({ onAnalyze, isLoading }: TweetInputProps) {
  const [url, setUrl] = useState("");
  const [text, setText] = useState("");
  const [activeTab, setActiveTab] = useState<"url" | "text">("url");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const value = activeTab === "url" ? url.trim() : text.trim();
    if (value) {
      onAnalyze({ type: activeTab, value });
    }
  };

  const isValidInput = activeTab === "url" ? url.trim() : text.trim();

  return (
    <Card className="w-full max-w-2xl glass glass-hover p-6 animate-fadeIn">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center space-x-2">
          <MessageCircle className="w-5 h-5 text-muted-foreground" />
          <p className="text-sm font-medium">Analyze Twitter Thread</p>
        </div>

        <Tabs defaultValue="url" className="w-full" onValueChange={(value) => setActiveTab(value as "url" | "text")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="url" className="flex items-center gap-2">
              <LinkIcon className="h-4 w-4" />
              Thread URL
            </TabsTrigger>
            <TabsTrigger value="text" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              Paste Text
            </TabsTrigger>
          </TabsList>

          <TabsContent value="url" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="url">Twitter Thread URL</Label>
              <Input
                id="url"
                type="url"
                placeholder="https://twitter.com/username/status/123456789"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full bg-white/50 dark:bg-black/50"
              />
            </div>
          </TabsContent>

          <TabsContent value="text" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="text">Thread Content</Label>
              <Textarea
                id="text"
                placeholder="Paste the tweet thread content here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="min-h-[150px] w-full bg-white/50 dark:bg-black/50 resize-none"
              />
            </div>
          </TabsContent>
        </Tabs>

        <Button 
          type="submit" 
          className="w-full"
          disabled={isLoading || !isValidInput}
        >
          {isLoading ? (
            <>
              <span className="animate-pulse">Analyzing</span>
              <span className="animate-pulse">...</span>
            </>
          ) : (
            "Analyze Thread"
          )}
        </Button>
      </form>
    </Card>
  );
}
