
export interface SentimentAnalysis {
  overall: "positive" | "negative" | "neutral";
  breakdown: {
    positive: number;
    neutral: number;
    negative: number;
  };
  highlightedTweets: {
    text: string;
    sentiment: "positive" | "negative";
    score: number;
  }[];
}

export interface EngagementMetrics {
  topTweets: {
    text: string;
    likes: number;
    retweets: number;
    replies: number;
    engagementScore: number;
  }[];
  mostEngaging: {
    text: string;
    comparisonMetric: string;
  };
}

export interface AnalysisData {
  summary: string;
  tldr: string;
  sentiment: SentimentAnalysis;
  engagement: EngagementMetrics;
}
