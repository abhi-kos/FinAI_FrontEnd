
import { useState } from "react";
import { ChevronDown, ChevronUp, Share, Bookmark, BookmarkCheck, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  source: string;
  publishedAt: string;
  url: string;
  sentiment: "positive" | "negative" | "neutral";
  tickers?: string[];
}

interface NewsCardProps {
  news: NewsItem;
}

const NewsCard = ({ news }: NewsCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const [saved, setSaved] = useState(false);
  const { toast } = useToast();
  
  const handleToggleSave = () => {
    setSaved(!saved);
    toast({
      title: saved ? "Removed from favorites" : "Added to favorites",
      description: `"${news.title}" has been ${saved ? "removed from" : "added to"} your favorites.`,
    });
  };
  
  const handleShare = () => {
    navigator.clipboard.writeText(news.url);
    toast({
      title: "Link copied",
      description: "News link has been copied to your clipboard.",
    });
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  return (
    <div className={cn(
      "bg-card rounded-lg border border-border p-4 mb-4 transition-all",
      expanded ? "shadow-md" : "hover:shadow-sm"
    )}>
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center">
          <div className="text-sm text-muted-foreground mr-2">{news.source}</div>
          <div className="text-xs text-muted-foreground">{formatDate(news.publishedAt)}</div>
        </div>
        
        {news.sentiment !== "neutral" && (
          <div className={cn(
            "text-xs font-medium flex items-center px-2 py-1 rounded",
            news.sentiment === "positive" 
              ? "bg-positive/10 text-positive" 
              : "bg-negative/10 text-negative"
          )}>
            {news.sentiment === "positive" ? (
              <><ChevronUp size={14} /> Bullish</>
            ) : (
              <><ChevronDown size={14} /> Bearish</>
            )}
          </div>
        )}
      </div>
      
      <h3 className="text-base font-semibold mb-1">{news.title}</h3>
      
      {news.tickers && news.tickers.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2">
          {news.tickers.map((ticker) => (
            <span 
              key={ticker} 
              className="text-xs px-1.5 py-0.5 bg-muted rounded font-medium"
            >
              {ticker}
            </span>
          ))}
        </div>
      )}
      
      <p className="text-sm text-muted-foreground mb-3">
        {expanded ? news.content : news.summary}
      </p>
      
      <div className="flex items-center justify-between">
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-xs px-2 h-7"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Show less" : "Read more"}
        </Button>
        
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={handleToggleSave}
          >
            {saved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={handleShare}
          >
            <Share size={16} />
          </Button>
          
          <a 
            href={news.url} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
            >
              <ExternalLink size={16} />
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
