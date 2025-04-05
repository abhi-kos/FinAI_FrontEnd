
import { useState, useRef, useEffect } from "react";
import { Send, Mic, X, PaperclipIcon, ExternalLink, Filter, FileText, BarChart, Newspaper, FileArchive, Info, Database, ArrowDown, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ChatMessage from "./ChatMessage";
import { cn } from "@/lib/utils";
import RecentSearches from "./RecentSearches";
import SourcesPanel from "./SourcesPanel";

interface Message {
  id: string;
  isUser: boolean;
  content: string;
  timestamp: string;
  confidence?: number;
  sources?: {
    id: string;
    title: string;
    type: "SEC Filing" | "Transcript" | "Market Data" | "News" | "Internal" | "Web";
    url?: string;
  }[];
}

interface Attachment {
  id: string;
  name: string;
  type: string;
}

type SourceType = "Deep Web" | "Internal" | "External" | "SEC Filings" | "Transcripts" | "Market Data" | "News and Media";

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
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [sourceDropdownOpen, setSourceDropdownOpen] = useState(false);
  const [selectedSources, setSelectedSources] = useState<SourceType[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([
    "Compare HDFC Bank vs ICICI Bank performance",
    "Latest earnings for Reliance Industries",
    "Saudi Aramco market share analysis",
    "Debt to equity ratios in UAE banking sector"
  ]);
  const [showSourcesPanel, setShowSourcesPanel] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  
  const handleAddAttachment = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFile = e.target.files[0];
      if (newFile) {
        setAttachments([...attachments, {
          id: Date.now().toString(),
          name: newFile.name,
          type: newFile.type
        }]);
      }
    }
  };
  
  const removeAttachment = (id: string) => {
    setAttachments(attachments.filter(attachment => attachment.id !== id));
  };
  
  const toggleSourceOption = (source: SourceType) => {
    if (selectedSources.includes(source)) {
      setSelectedSources(selectedSources.filter(s => s !== source));
    } else {
      setSelectedSources([...selectedSources, source]);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if ((!inputValue.trim() && attachments.length === 0) || isLoading) return;
    
    // Store search in recent searches
    if (inputValue.trim()) {
      setRecentSearches(prev => [inputValue, ...prev.slice(0, 4)]);
    }
    
    const userMessage: Message = {
      id: Date.now().toString(),
      isUser: true,
      content: inputValue,
      timestamp: formatTime(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);
    setShowSourcesPanel(true);
    
    // Simulate AI response (In a real app, this would be an API call)
    setTimeout(() => {
      let aiResponse: Message;
      
      if (inputValue.toLowerCase().includes("tcs") || inputValue.toLowerCase().includes("company")) {
        aiResponse = {
          id: (Date.now() + 1).toString(),
          isUser: false,
          content: "Tata Consultancy Services (TCS) is showing strong growth this quarter. Their revenue is up by 8.2% year-over-year and they've announced a new partnership with Microsoft for cloud services. \n\nTheir current stock price is ₹3,850 with a P/E ratio of 29.8.",
          timestamp: formatTime(),
          confidence: 0.87,
          sources: [
            { id: "1", title: "Q3 Financial Report", type: "SEC Filing", url: "#" },
            { id: "2", title: "Recent Press Release (Jan 2023)", type: "News", url: "#" },
            { id: "3", title: "NSE Market Data", type: "Market Data", url: "#" }
          ]
        };
      } else if (inputValue.toLowerCase().includes("market") || inputValue.toLowerCase().includes("trend")) {
        aiResponse = {
          id: (Date.now() + 1).toString(),
          isUser: false,
          content: "The Indian markets are showing a positive trend today. Nifty 50 is up by 1.3% and Sensex has gained 450 points. The banking sector is performing particularly well with HDFC Bank and ICICI Bank leading the gains.\n\nIn Middle Eastern markets, Saudi's Tadawul index is up 0.8%, continuing its recovery from last week's dip.",
          timestamp: formatTime(),
          confidence: 0.92,
          sources: [
            { id: "4", title: "NSE Live Data", type: "Market Data", url: "#" },
            { id: "5", title: "Tadawul Market Report", type: "Market Data", url: "#" },
            { id: "6", title: "Sector Analysis", type: "Internal", url: "#" }
          ]
        };
      } else {
        aiResponse = {
          id: (Date.now() + 1).toString(),
          isUser: false,
          content: "I understand you're asking about financial information. Could you provide more specifics about which company, market, or financial concept you'd like to explore? I can help with stock analysis, market trends, or explain financial concepts.",
          timestamp: formatTime(),
          confidence: 0.75,
          sources: [
            { id: "7", title: "GreyFIN Knowledge Base", type: "Internal", url: "#" }
          ]
        };
      }
      
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
      setAttachments([]);
      setSelectedSources([]);
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
    setShowSourcesPanel(false);
  };
  
  const setSuggestedQuery = (query: string) => {
    setInputValue(query);
  };

  const toggleSourcesPanel = () => {
    setShowSourcesPanel(!showSourcesPanel);
  };
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-2 border-b border-border">
        <h2 className="text-lg font-medium">AI Financial Research Assistant</h2>
        <div className="flex items-center gap-2">
          {showSourcesPanel && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={toggleSourcesPanel}
              className="flex items-center gap-1"
            >
              <Info size={16} />
              {showSourcesPanel ? "Hide Sources" : "Show Sources"}
            </Button>
          )}
          <Button variant="ghost" size="sm" onClick={clearChat}>
            Clear Chat
          </Button>
        </div>
      </div>
      
      <div className="flex flex-1 overflow-hidden">
        <div className={cn(
          "flex-1 flex flex-col overflow-hidden transition-all duration-300",
          showSourcesPanel ? "w-2/3" : "w-full"
        )}>
          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4 pb-4">
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  isUser={message.isUser}
                  content={message.content}
                  timestamp={message.timestamp}
                  sources={message.sources}
                  confidence={message.confidence}
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
          
          {/* Recent searches */}
          <RecentSearches 
            searches={recentSearches} 
            onSelectSearch={setSuggestedQuery} 
          />
          
          {/* Input area */}
          <div className="p-4 border-t border-border">
            <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
              <div className="flex items-center space-x-2">
                <div className="relative flex-1">
                  <div className="flex flex-wrap gap-1 p-2 bg-background rounded-md border border-input min-h-[44px]">
                    {/* Attachments */}
                    {attachments.map(attachment => (
                      <div 
                        key={attachment.id}
                        className="flex items-center bg-muted px-2 py-0.5 rounded text-xs"
                      >
                        <span className="truncate max-w-[150px]">{attachment.name}</span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-4 w-4 ml-1"
                          onClick={() => removeAttachment(attachment.id)}
                        >
                          <X size={12} />
                        </Button>
                      </div>
                    ))}
                    <Input
                      value={inputValue}
                      onChange={handleInputChange}
                      placeholder="Research a company, analyze markets, or ask a financial question..."
                      className="flex-1 border-0 focus-visible:ring-0 focus-visible:outline-none bg-transparent px-0"
                      disabled={isLoading}
                    />
                  </div>
                  
                  {/* Hidden file input */}
                  <input 
                    type="file" 
                    className="hidden" 
                    ref={fileInputRef}
                    onChange={handleFileChange}
                  />
                </div>
                
                {/* Attachment button */}
                <Button 
                  type="button" 
                  variant="outline" 
                  size="icon" 
                  onClick={handleAddAttachment}
                  disabled={isLoading}
                >
                  <PaperclipIcon size={18} />
                </Button>
                
                {/* Source selector */}
                <div className="relative">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => setSourceDropdownOpen(!sourceDropdownOpen)}
                    disabled={isLoading}
                    className={cn(selectedSources.length > 0 && "border-primary text-primary")}
                  >
                    <Database size={18} />
                  </Button>
                  
                  {sourceDropdownOpen && (
                    <div className="absolute bottom-full mb-2 right-0 w-64 bg-card border border-border rounded-md shadow-md p-2 z-10">
                      <div className="font-medium mb-1 px-2">Select Sources</div>
                      
                      <div className="space-y-1">
                        {[
                          { label: "Deep Web", icon: <ExternalLink size={14} /> },
                          { label: "Internal", icon: <Database size={14} /> },
                          { label: "External", icon: <ExternalLink size={14} /> },
                          { label: "SEC Filings", icon: <FileArchive size={14} /> },
                          { label: "Transcripts", icon: <FileText size={14} /> },
                          { label: "Market Data", icon: <BarChart size={14} /> },
                          { label: "News and Media", icon: <Newspaper size={14} /> },
                        ].map(source => (
                          <Button
                            key={source.label}
                            variant="ghost"
                            size="sm"
                            className={cn(
                              "w-full justify-start", 
                              selectedSources.includes(source.label as SourceType) && "bg-accent"
                            )}
                            onClick={() => toggleSourceOption(source.label as SourceType)}
                          >
                            <div className="flex items-center">
                              <div className="mr-2">{source.icon}</div>
                              <span>{source.label}</span>
                            </div>
                          </Button>
                        ))}
                      </div>
                      
                      <div className="flex justify-between mt-2 pt-2 border-t border-border">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedSources([])}
                        >
                          Clear
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => setSourceDropdownOpen(false)}
                        >
                          Apply
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Send button */}
                <Button type="submit" size="icon" disabled={!inputValue.trim() && attachments.length === 0 || isLoading}>
                  <Send size={18} />
                </Button>
                
                {/* Voice input button */}
                <Button type="button" variant="outline" size="icon" disabled={isLoading}>
                  <Mic size={18} />
                </Button>
              </div>
              
              {/* Research type bubbles */}
              <div className="flex flex-wrap gap-2">
                <div className="text-xs text-muted-foreground mr-2 flex items-center">Research with:</div>
                {[
                  { label: "SEC Filings", icon: <FileArchive size={14} /> },
                  { label: "Transcripts", icon: <FileText size={14} /> },
                  { label: "Market Data", icon: <BarChart size={14} /> },
                  { label: "News and Media", icon: <Newspaper size={14} /> },
                ].map((bubble) => (
                  <Button
                    key={bubble.label}
                    variant={selectedSources.includes(bubble.label as SourceType) ? "default" : "outline"}
                    size="sm"
                    className="h-7 text-xs flex items-center gap-1"
                    onClick={() => toggleSourceOption(bubble.label as SourceType)}
                  >
                    {bubble.icon}
                    {bubble.label}
                  </Button>
                ))}
              </div>
              
              {/* Example queries */}
              <div className="mt-1">
                <p className="text-xs text-muted-foreground">Try asking about:</p>
                <div className="mt-1 flex flex-wrap gap-2">
                  {["Compare Indian banks P/E ratios", "Analyze Saudi Aramco Q2 earnings", "Calculate DCF for Tesla", "Regulatory changes in UAE banking"].map((suggestion) => (
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
            </form>
          </div>
        </div>
        
        {/* Sources panel (right side) */}
        {showSourcesPanel && (
          <SourcesPanel 
            sources={messages.filter(m => !m.isUser && m.sources).flatMap(m => m.sources || [])}
            confidence={messages.length > 1 ? messages[messages.length - 1]?.confidence : undefined}
            onClose={toggleSourcesPanel}
          />
        )}
      </div>
    </div>
  );
};

export default ChatInterface;
