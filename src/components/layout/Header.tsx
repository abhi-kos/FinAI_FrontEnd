
import { Search, Bell, User } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // In a real app, this would trigger the search functionality
      toast({
        title: "Search initiated",
        description: `Searching for: ${searchQuery}`,
      });
    }
  };
  
  return (
    <div className="h-16 border-b border-border bg-card flex items-center justify-between px-4">
      <div className="flex-1 max-w-2xl">
        <form onSubmit={handleSearch} className="relative">
          <Input
            type="text"
            placeholder="Search companies, news, or ask a question..."
            className="pl-10 pr-4 h-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          {searchQuery && (
            <Button 
              type="submit" 
              variant="ghost" 
              size="sm" 
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 px-2"
            >
              Search
            </Button>
          )}
        </form>
      </div>
      
      <div className="flex items-center gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full"></span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="end">
            <div className="p-3 border-b border-border">
              <h3 className="font-medium">Notifications</h3>
            </div>
            <div className="py-2">
              <div className="px-3 py-2 hover:bg-muted transition-colors">
                <div className="text-sm font-medium">Market update</div>
                <div className="text-xs text-muted-foreground">S&P 500 up 1.2% today</div>
                <div className="text-xs text-muted-foreground mt-1">10m ago</div>
              </div>
              <div className="px-3 py-2 hover:bg-muted transition-colors">
                <div className="text-sm font-medium">News alert</div>
                <div className="text-xs text-muted-foreground">New earnings report for AAPL</div>
                <div className="text-xs text-muted-foreground mt-1">1h ago</div>
              </div>
            </div>
            <div className="p-2 border-t border-border">
              <Button variant="ghost" size="sm" className="w-full">View all</Button>
            </div>
          </PopoverContent>
        </Popover>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon">
              <User size={20} />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-0" align="end">
            <div className="p-3 border-b border-border">
              <h3 className="font-medium">Account</h3>
              <p className="text-xs text-muted-foreground mt-1">user@example.com</p>
            </div>
            <div className="py-2">
              <Button variant="ghost" className="w-full justify-start px-3 py-1.5 h-9">Profile</Button>
              <Button variant="ghost" className="w-full justify-start px-3 py-1.5 h-9">Settings</Button>
              <Button variant="ghost" className="w-full justify-start px-3 py-1.5 h-9">Sign out</Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default Header;
