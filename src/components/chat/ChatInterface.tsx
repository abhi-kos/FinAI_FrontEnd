
import { useState, useRef, useEffect } from "react";
import { Send, Mic, X, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ChatMessage from "./ChatMessage";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  isUser: boolean;
  content: string;
  timestamp: string;
  sources?: string[];
}

const formatTime = () => {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      isUser: false,
      content: "Welcome to GreyFIN Research Assistant. How can I help you with financial research today?",
      timestamp: formatTime(),
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim() || isLoading) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      isUser: true,
      content: inputValue,
      timestamp: formatTime()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);
    
    // Simulate AI response (In a real app, this would be an API call)
    setTimeout(() => {
      let aiResponse: Message;
      
      if (inputValue.toLowerCase().includes("tcs") || inputValue.toLowerCase().includes("company")) {
        aiResponse = {
          id: (Date.now() + 1).toString(),
          isUser: false,
          content: "Tata Consultancy Services (TCS) is showing strong growth this quarter. Their revenue is up by 8.2% year-over-year and they've announced a new partnership with Microsoft for cloud services. \n\nTheir current stock price is ₹3,850 with a P/E ratio of 29.8.",
          timestamp: formatTime(),
          sources: ["Q3 Financial Report", "Recent Press Release (Jan 2023)", "NSE Market Data"]
        };
      } else if (inputValue.toLowerCase().includes("market") || inputValue.toLowerCase().includes("trend")) {
        aiResponse = {
          id: (Date.now() + 1).toString(),
          isUser: false,
          content: "The Indian markets are showing a positive trend today. Nifty 50 is up by 1.3% and Sensex has gained 450 points. The banking sector is performing particularly well with HDFC Bank and ICICI Bank leading the gains.\n\nIn Middle Eastern markets, Saudi's Tadawul index is up 0.8%, continuing its recovery from last week's dip.",
          timestamp: formatTime(),
          sources: ["NSE Live Data", "Tadawul Market Report", "Sector Analysis"]
        };
      } else {
        aiResponse = {
          id: (Date.now() + 1).toString(),
          isUser: false,
          content: "I understand you're asking about financial information. Could you provide more specifics about which company, market, or financial concept you'd like to explore? I can help with stock analysis, market trends, or explain financial concepts.",
          timestamp: formatTime()
        };
      }
      
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };
  
  const clearChat = () => {
    setMessages([
      {
        id: "welcome-new",
        isUser: false,
        content: "Chat cleared. How can I help with your financial research today?",
        timestamp: formatTime(),
      }
    ]);
  };
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-2 border-b border-border">
        <h2 className="text-lg font-medium">AI Research Assistant</h2>
        <Button variant="ghost" size="sm" onClick={clearChat}>
          Clear Chat
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4 pb-4">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              isUser={message.isUser}
              content={message.content}
              timestamp={message.timestamp}
              sources={message.sources}
            />
          ))}
          
          {isLoading && (
            <div className="flex justify-start mb-4">
              <div className="max-w-[80%] rounded-lg p-4 bg-card border border-border rounded-tl-none">
                <div className="flex space-x-2 items-center h-6">
                  <div className="w-2 h-2 rounded-full bg-muted-foreground animate-pulse"></div>
                  <div className="w-2 h-2 rounded-full bg-muted-foreground animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                  <div className="w-2 h-2 rounded-full bg-muted-foreground animate-pulse" style={{ animationDelay: "0.4s" }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <div className="p-4 border-t border-border">
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <Input
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Type a company name or ask a question..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button type="submit" size="icon" disabled={!inputValue.trim() || isLoading}>
            <Send size={18} />
          </Button>
          <Button type="button" variant="outline" size="icon" disabled={isLoading}>
            <Mic size={18} />
          </Button>
        </form>
        
        <div className="mt-3">
          <p className="text-xs text-muted-foreground">Try asking about:</p>
          <div className="mt-1 flex flex-wrap gap-2">
            {["TCS performance", "Market trends", "P/E ratio", "Banking sector"].map((suggestion) => (
              <Button
                key={suggestion}
                variant="outline"
                size="sm"
                className="h-7 text-xs"
                onClick={() => setInputValue(suggestion)}
                disabled={isLoading}
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
