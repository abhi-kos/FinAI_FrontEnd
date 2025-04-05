
import React from "react";
import { X, FileText, BarChart, Newspaper, FileArchive, ExternalLink, Database, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface Source {
  id: string;
  title: string;
  type: "SEC Filing" | "Transcript" | "Market Data" | "News" | "Internal" | "Web";
  url?: string;
}

interface SourcesPanelProps {
  sources: Source[];
  confidence?: number;
  onClose: () => void;
}

const SourcesPanel: React.FC<SourcesPanelProps> = ({ sources, confidence, onClose }) => {
  // Get the icon based on source type
  const getSourceIcon = (type: string) => {
    switch (type) {
      case "SEC Filing":
        return <FileArchive size={16} />;
      case "Transcript":
        return <FileText size={16} />;
      case "Market Data":
        return <BarChart size={16} />;
      case "News":
        return <Newspaper size={16} />;
      case "Internal":
        return <Database size={16} />;
      case "Web":
        return <ExternalLink size={16} />;
      default:
        return <FileText size={16} />;
    }
  };
  
  // Get confidence level text and color
  const getConfidenceDetails = (score?: number) => {
    if (!score) return { text: "Unknown", color: "bg-gray-400" };
    
    if (score >= 0.9) return { text: "Very High", color: "bg-green-600" };
    if (score >= 0.75) return { text: "High", color: "bg-green-500" };
    if (score >= 0.6) return { text: "Moderate", color: "bg-yellow-500" };
    return { text: "Low", color: "bg-orange-500" };
  };
  
  const confidenceDetails = getConfidenceDetails(confidence);
  
  return (
    <div className="w-1/3 border-l border-border bg-card/50 overflow-hidden flex flex-col">
      <div className="flex items-center justify-between p-3 border-b border-border">
        <h3 className="font-medium">Sources & Confidence</h3>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={onClose}>
          <X size={16} />
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {/* AI Confidence Meter */}
        <div className="p-3 bg-card rounded-lg border border-border">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium flex items-center gap-1">
              <Info size={14} />
              AI Confidence
            </h4>
            <span className="text-sm font-medium">{confidenceDetails.text}</span>
          </div>
          <Progress 
            value={confidence ? confidence * 100 : 0} 
            className="h-2"
            indicatorClassName={confidenceDetails.color}
          />
          <p className="text-xs text-muted-foreground mt-2">
            Based on data quality, source reliability, and information consistency
          </p>
        </div>
        
        {/* Sources List */}
        <div className="space-y-1">
          <h4 className="text-sm font-medium px-1">Research Sources ({sources.length})</h4>
          <div className="space-y-1">
            {sources.map(source => (
              <div key={source.id} className="flex items-center p-2 bg-card rounded-lg border border-border">
                <div className="mr-2 text-muted-foreground">
                  {getSourceIcon(source.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{source.title}</p>
                  <p className="text-xs text-muted-foreground">{source.type}</p>
                </div>
                {source.url && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-7 w-7" 
                    asChild
                  >
                    <a href={source.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink size={14} />
                    </a>
                  </Button>
                )}
              </div>
            ))}
            
            {sources.length === 0 && (
              <div className="p-4 text-center text-muted-foreground text-sm">
                No sources available for this conversation
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SourcesPanel;
