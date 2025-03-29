
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
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

export interface FavoriteItem {
  id: string;
  name: string;
  ticker: string;
  price: number;
  change: number;
  changePercent: number;
  currency: string;
  market: string;
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
  
  return (
    <Card className={cn(
      "transition-all duration-200",
      expanded ? "shadow-md" : "hover:shadow-sm"
    )}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-base">{item.name}</CardTitle>
            <CardDescription>{item.ticker} • {item.market}</CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={handleRemove}>
            <Star className="h-[1.2rem] w-[1.2rem] fill-primary" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div className="text-xl font-semibold">
            {formatPrice(item.price, item.currency)}
          </div>
          <div className={cn(
            "flex items-center text-sm font-medium",
            item.change >= 0 ? "text-positive" : "text-negative"
          )}>
            {item.change >= 0 ? (
              <TrendingUp className="mr-1 h-4 w-4" />
            ) : (
              <TrendingDown className="mr-1 h-4 w-4" />
            )}
            {item.change >= 0 ? "+" : ""}{item.change.toFixed(2)} ({item.changePercent.toFixed(2)}%)
          </div>
        </div>
        
        {expanded && item.recentNews && (
          <div className="mt-4 border-t border-border pt-3">
            <div className="text-sm font-medium mb-2">Recent News</div>
            <ul className="space-y-2">
              {item.recentNews.map((news, i) => (
                <li key={i} className="text-sm hover:underline">
                  <a href={news.url} target="_blank" rel="noopener noreferrer" className="flex items-start">
                    <ExternalLink className="h-3.5 w-3.5 mt-1 mr-1.5 flex-shrink-0" />
                    <span>{news.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between pt-0">
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
          <Link to="/news">
            <Button variant="outline" size="sm" className="text-xs h-7">
              News
            </Button>
          </Link>
          <Link to="/">
            <Button variant="outline" size="sm" className="text-xs h-7">
              <div className="flex items-center">
                Ask AI
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
