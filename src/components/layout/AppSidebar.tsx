
import { 
  Terminal, 
  Newspaper, 
  Star, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  ArrowUp,
  LineChart,
  HelpCircle
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  active: boolean;
  collapsed: boolean;
}

const SidebarItem = ({ icon, label, to, active, collapsed }: SidebarItemProps) => {
  return (
    <Link to={to}>
      <Button 
        variant="ghost" 
        className={cn(
          "w-full justify-start mb-1 relative",
          active ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground hover:bg-sidebar-accent/50",
          collapsed ? "px-3" : "px-3"
        )}
      >
        <div className="flex items-center">
          <div className="mr-2">{icon}</div>
          {!collapsed && <span>{label}</span>}
        </div>
        {active && <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-teal rounded-r-md" />}
      </Button>
    </Link>
  );
};

// Mock watchlist data
const watchlistItems = [
  { symbol: "AAPL", name: "Apple Inc.", price: 187.68, change: 1.25 },
  { symbol: "MSFT", name: "Microsoft Corp.", price: 415.32, change: -0.78 },
  { symbol: "AMZN", name: "Amazon.com Inc.", price: 176.54, change: 2.45 },
  { symbol: "GOOGL", name: "Alphabet Inc.", price: 156.87, change: 0.34 },
  { symbol: "META", name: "Meta Platforms Inc.", price: 453.21, change: -1.42 }
];

const AppSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [watchlistOpen, setWatchlistOpen] = useState(false);
  const location = useLocation();
  
  // Recent searches data
  const recentSearches = [
    "Compare HDFC Bank vs ICICI Bank performance",
    "Latest earnings for Reliance Industries",
    "Saudi Aramco market share analysis",
    "Debt to equity ratios in UAE banking sector"
  ];
  
  const mainMenuItems = [
    { icon: <Terminal size={20} />, label: "Console", to: "/" },
    { icon: <Newspaper size={20} />, label: "News Feed", to: "/news" },
    { icon: <Star size={20} />, label: "Favorites", to: "/favorites" },
  ];

  return (
    <div 
      className={cn(
        "h-screen bg-sidebar flex flex-col border-r border-sidebar-border transition-all duration-300",
        collapsed ? "w-16" : "w-56"
      )}
    >
      <div className="p-4 border-b border-sidebar-border flex items-center">
        {!collapsed && (
          <div className="text-sidebar-foreground font-bold text-xl mr-2">GreyFIN</div>
        )}
        {collapsed && (
          <div className="text-sidebar-foreground font-bold text-xl mx-auto">G</div>
        )}
      </div>
      
      <div className="flex-1 py-4 px-2 overflow-y-auto scrollbar-hide">
        {/* Main menu items */}
        {mainMenuItems.map((item) => (
          <SidebarItem
            key={item.to}
            icon={item.icon}
            label={item.label}
            to={item.to}
            active={location.pathname === item.to}
            collapsed={collapsed}
          />
        ))}
        
        {/* Watchlist Section - New Addition */}
        <div className="mt-6 mb-2 px-1">
          <Collapsible 
            open={watchlistOpen && !collapsed} 
            onOpenChange={setWatchlistOpen} 
            className="w-full"
          >
            <CollapsibleTrigger asChild>
              <Button 
                variant="ghost" 
                className={cn(
                  "w-full justify-start mb-2 relative",
                  watchlistOpen && !collapsed ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground hover:bg-sidebar-accent/50",
                )}
              >
                <div className="flex items-center">
                  <div className="mr-2"><LineChart size={20} /></div>
                  {!collapsed && <span>Watchlist</span>}
                </div>
                {!collapsed && (
                  <div className="ml-auto">
                    {watchlistOpen ? 
                      <ChevronLeft size={16} /> : 
                      <ChevronRight size={16} />
                    }
                  </div>
                )}
              </Button>
            </CollapsibleTrigger>
            
            <CollapsibleContent className="space-y-2">
              {!collapsed && watchlistItems.map((item) => (
                <div 
                  key={item.symbol} 
                  className="flex items-center justify-between px-2 py-1 text-xs rounded hover:bg-sidebar-accent/30 cursor-pointer"
                >
                  <div className="flex flex-col">
                    <span className="font-medium">{item.symbol}</span>
                    <span className="text-sidebar-foreground/70 text-[10px] truncate max-w-32">{item.name}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="font-medium">${item.price}</span>
                    <span className={item.change >= 0 ? "text-green-500" : "text-red-500"}>
                      {item.change > 0 ? "+" : ""}{item.change}%
                    </span>
                  </div>
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>
        </div>
        
        {/* Recent Searches Section */}
        {!collapsed && (
          <div className="mt-6 px-2">
            <div className="flex items-center gap-2 mb-2">
              <ArrowUp size={14} className="text-sidebar-foreground/70" />
              <h3 className="text-xs font-medium text-sidebar-foreground/70">Recent Searches</h3>
            </div>
            <div className="space-y-1">
              {recentSearches.map((search, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  className="w-full h-7 text-xs justify-start truncate text-sidebar-foreground"
                  onClick={() => {
                    // We'll handle this later with context or state management
                    console.log("Selected search:", search);
                  }}
                >
                  {search}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Footer with Settings and Help - Moved to bottom */}
      <div className="p-2 border-t border-sidebar-border mt-auto">
        <div className="flex items-center justify-between mb-2">
          {/* Settings Button */}
          <Link to="/settings">
            <Button 
              variant="ghost" 
              size="icon" 
              className={cn(
                "text-sidebar-foreground hover:bg-sidebar-accent/50",
                location.pathname === "/settings" && "bg-sidebar-accent text-sidebar-accent-foreground"
              )}
            >
              <Settings size={20} />
              {!collapsed && <span className="ml-2">Settings</span>}
            </Button>
          </Link>
          
          {/* Help Button */}
          <Link to="/help">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-sidebar-foreground hover:bg-sidebar-accent/50"
            >
              <HelpCircle size={20} />
              {!collapsed && <span className="ml-2">Help</span>}
            </Button>
          </Link>
        </div>
        
        {/* Collapse Toggle Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex justify-center text-sidebar-foreground hover:bg-sidebar-accent/50"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>
    </div>
  );
};

export default AppSidebar;
