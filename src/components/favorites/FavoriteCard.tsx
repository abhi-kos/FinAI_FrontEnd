
import { useState } from "react";
import { ExternalLink, Star, TrendingUp, TrendingDown, ChevronDown, ChevronUp, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

export interface FavoriteItem {
  id: string;
  name: string;
  ticker: string;
  price: number;
  change: number;
  changePercent: number;
  currency: string;
  market: string;
  sector?: string;
  sentiment?: "positive" | "neutral" | "negative";
  recentNews?: {
    title: string;
    url: string;
  }[];
}

interface FavoriteCardProps {
  item: FavoriteItem;
  onRemove: (id: string) => void;
}

const FavoriteCard = ({ item, onRemove }: FavoriteCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const { toast } = useToast();
  
  const handleRemove = () => {
    onRemove(item.id);
    toast({
      title: "Removed from favorites",
      description: `${item.name} has been removed from your favorites.`,
    });
  };
  
  const formatPrice = (price: number, currency: string) => {
    const formatter = new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2
    });
    return formatter.format(price);
  };

  const getSentimentColor = (sentiment: string | undefined) => {
    switch (sentiment) {
      case "positive":
        return "bg-emerald-100 text-emerald-800 hover:bg-emerald-100";
      case "negative":
        return "bg-rose-100 text-rose-800 hover:bg-rose-100";
      case "neutral":
      default:
        return "bg-amber-100 text-amber-800 hover:bg-amber-100";
    }
  };
  
  return (
    <Card className={cn(
      "transition-all duration-200 h-full flex flex-col",
      expanded ? "shadow-md" : "hover:shadow-sm"
    )}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <CardTitle className="text-base truncate">{item.name}</CardTitle>
              {item.sector && (
                <Badge variant="outline" className="text-xs">
                  {item.sector}
                </Badge>
              )}
            </div>
            <CardDescription className="truncate">{item.ticker} • {item.market}</CardDescription>
          </div>
          <Button variant="ghost" size="icon" className="flex-shrink-0 ml-2" onClick={handleRemove}>
            <Star className="h-[1.2rem] w-[1.2rem] fill-primary" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1">
        <div className="flex justify-between items-center">
          <div className="text-lg font-semibold break-words min-w-0 mr-2 text-price">
            {formatPrice(item.price, item.currency)}
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className={cn(
              "flex items-center text-xs font-medium whitespace-nowrap",
              item.change >= 0 ? "text-positive" : "text-negative"
            )}>
              {item.change >= 0 ? (
                <TrendingUp className="mr-1 h-3 w-3" />
              ) : (
                <TrendingDown className="mr-1 h-3 w-3" />
              )}
              {item.change >= 0 ? "+" : ""}{item.change.toFixed(2)} ({item.changePercent.toFixed(2)}%)
            </div>
            
            {item.sentiment && (
              <Badge variant="secondary" className={getSentimentColor(item.sentiment)}>
                {item.sentiment.charAt(0).toUpperCase() + item.sentiment.slice(1)}
              </Badge>
            )}
          </div>
        </div>
        
        {expanded && (
          <div className="mt-4 border-t border-border pt-3">
            <Tabs defaultValue="news" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-2">
                <TabsTrigger value="news">News</TabsTrigger>
                <TabsTrigger value="info">Info</TabsTrigger>
              </TabsList>
              
              <TabsContent value="news" className="space-y-2 max-h-[150px] overflow-y-auto pr-2">
                {item.recentNews && item.recentNews.length > 0 ? (
                  <ul className="space-y-2">
                    {item.recentNews.map((news, i) => (
                      <li key={i} className="text-sm">
                        <a href={news.url} target="_blank" rel="noopener noreferrer" className="flex items-start hover:underline">
                          <ExternalLink className="h-3.5 w-3.5 mt-1 mr-1.5 flex-shrink-0" />
                          <span className="break-words">{news.title}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">No recent news available.</p>
                )}
              </TabsContent>
              
              <TabsContent value="info">
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-1 text-sm">
                    <div className="text-muted-foreground">Currency:</div>
                    <div className="overflow-hidden text-ellipsis">{item.currency}</div>
                    <div className="text-muted-foreground">Market:</div>
                    <div className="overflow-hidden text-ellipsis">{item.market}</div>
                    {item.sector && (
                      <>
                        <div className="text-muted-foreground">Sector:</div>
                        <div className="overflow-hidden text-ellipsis">{item.sector}</div>
                      </>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between pt-0 mt-auto">
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-xs px-0"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? (
            <>
              <ChevronUp className="h-3.5 w-3.5 mr-1" />
              Show less
            </>
          ) : (
            <>
              <ChevronDown className="h-3.5 w-3.5 mr-1" />
              Show more
            </>
          )}
        </Button>
        
        <div className="flex gap-2">
          <Link to={`/company/${item.id}`}>
            <Button variant="outline" size="sm" className="text-xs h-7">
              <div className="flex items-center">
                View Details
                <ArrowRight className="h-3.5 w-3.5 ml-1" />
              </div>
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default FavoriteCard;
