
import { cn } from "@/lib/utils";
import { useState } from "react";
import { ThumbsUp, ThumbsDown, Info } from "lucide-react";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

interface ChatMessageProps {
  isUser: boolean;
  content: string;
  timestamp: string;
  sources?: string[];
}

const ChatMessage = ({ isUser, content, timestamp, sources }: ChatMessageProps) => {
  const [expanded, setExpanded] = useState(false);
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null);
  
  // Only truncate AI messages that are longer than a certain limit
  const messageLimit = 300;
  const isTruncated = !isUser && !expanded && content.length > messageLimit;
  const displayContent = isTruncated ? content.slice(0, messageLimit) + '...' : content;
  
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
          <div className="mt-2 flex justify-between items-center">
            <div className="text-xs text-muted-foreground">{timestamp}</div>
            
            <div className="flex items-center space-x-1">
              {sources && sources.length > 0 && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Info size={14} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="text-xs">
                        <div className="font-semibold mb-1">Sources:</div>
                        <ul className="list-disc pl-4">
                          {sources.map((source, i) => (
                            <li key={i}>{source}</li>
                          ))}
                        </ul>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              
              <Button 
                variant="ghost" 
                size="icon" 
                className={cn(
                  "h-6 w-6", 
                  feedback === "up" && "text-teal"
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
                  feedback === "down" && "text-negative"
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
