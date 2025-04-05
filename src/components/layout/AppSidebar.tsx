
import { 
  Terminal, 
  Newspaper, 
  Star, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  ArrowUp 
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

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

const AppSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  
  // Recent searches data
  const recentSearches = [
    "Compare HDFC Bank vs ICICI Bank performance",
    "Latest earnings for Reliance Industries",
    "Saudi Aramco market share analysis",
    "Debt to equity ratios in UAE banking sector"
  ];
  
  const menuItems = [
    { icon: <Terminal size={20} />, label: "Console", to: "/" },
    { icon: <Newspaper size={20} />, label: "News Feed", to: "/news" },
    { icon: <Star size={20} />, label: "Favorites", to: "/favorites" },
    { icon: <Settings size={20} />, label: "Settings", to: "/settings" },
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
        {menuItems.map((item) => (
          <SidebarItem
            key={item.to}
            icon={item.icon}
            label={item.label}
            to={item.to}
            active={location.pathname === item.to}
            collapsed={collapsed}
          />
        ))}
        
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
      
      <div className="p-2 border-t border-sidebar-border">
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
