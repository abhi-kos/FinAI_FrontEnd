
import React from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RecentSearchesProps {
  searches: string[];
  onSelectSearch: (search: string) => void;
}

const RecentSearches: React.FC<RecentSearchesProps> = ({ searches, onSelectSearch }) => {
  if (searches.length === 0) return null;
  
  return (
    <div className="px-4 py-2 border-t border-border bg-muted/30">
      <div className="flex items-center gap-2 mb-1">
        <ArrowUp size={14} className="text-muted-foreground" />
        <h3 className="text-sm font-medium text-muted-foreground">Recent Searches</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {searches.map((search, index) => (
          <Button
            key={index}
            variant="ghost"
            size="sm"
            className="h-7 text-xs truncate max-w-[250px] justify-start"
            onClick={() => onSelectSearch(search)}
          >
            {search}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default RecentSearches;
