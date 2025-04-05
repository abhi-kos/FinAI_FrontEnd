
import { cn } from "@/lib/utils";
import { useState } from "react";
import { ThumbsUp, ThumbsDown, Info, ExternalLink } from "lucide-react";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Source {
  id: string;
  title: string;
  type: string;
  url?: string;
}

interface ChatMessageProps {
  isUser: boolean;
  content: string;
  timestamp: string;
  sources?: Source[];
  confidence?: number;
}

const ChatMessage = ({ isUser, content, timestamp, sources, confidence }: ChatMessageProps) => {
  const [expanded, setExpanded] = useState(false);
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null);
  
  // Only truncate AI messages that are longer than a certain limit
  const messageLimit = 300;
  const isTruncated = !isUser && !expanded && content.length > messageLimit;
  const displayContent = isTruncated ? content.slice(0, messageLimit) + '...' : content;
  
  // Get confidence level label and color
  const getConfidenceLabel = (score?: number) => {
    if (!score) return { text: "Unknown", color: "bg-gray-400" };
    
    if (score >= 0.9) return { text: "Very High", color: "bg-green-500" };
    if (score >= 0.75) return { text: "High", color: "bg-green-400" };
    if (score >= 0.6) return { text: "Moderate", color: "bg-yellow-400" };
    return { text: "Low", color: "bg-orange-400" };
  };
  
  const confidenceDetails = confidence ? getConfidenceLabel(confidence) : null;
  
  return (
    <div className={cn(
      "flex mb-4",
      isUser ? "justify-end" : "justify-start"
    )}>
      <div className={cn(
        "max-w-[80%] rounded-lg p-4",
        isUser 
          ? "bg-primary text-primary-foreground rounded-tr-none" 
          : "bg-card text-card-foreground rounded-tl-none border border-border"
      )}>
        <div className="whitespace-pre-wrap">{displayContent}</div>
        
        {isTruncated && (
          <Button 
            variant="link" 
            className="px-0 h-auto text-xs mt-1" 
            onClick={() => setExpanded(true)}
          >
            Show more
          </Button>
        )}
        
        {!isUser && (
          <div className="mt-2 flex flex-wrap justify-between items-center gap-y-2">
            <div className="flex items-center gap-2">
              <div className="text-xs text-muted-foreground">{timestamp}</div>
              
              {confidenceDetails && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className={cn(
                        "flex items-center gap-1 px-2 py-0.5 rounded-full text-xs",
                        confidenceDetails.color
                      )}>
                        <Info size={10} />
                        {confidenceDetails.text}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">AI confidence level based on data quality and sources</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              
              {sources && sources.length > 0 && (
                <Badge variant="outline" className="text-xs">
                  {sources.length} {sources.length === 1 ? 'source' : 'sources'}
                </Badge>
              )}
            </div>
            
            <div className="flex items-center space-x-1">
              <Button 
                variant="ghost" 
                size="icon" 
                className={cn(
                  "h-6 w-6", 
                  feedback === "up" && "text-green-500"
                )}
                onClick={() => setFeedback("up")}
              >
                <ThumbsUp size={14} />
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon" 
                className={cn(
                  "h-6 w-6", 
                  feedback === "down" && "text-red-500"
                )}
                onClick={() => setFeedback("down")}
              >
                <ThumbsDown size={14} />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
