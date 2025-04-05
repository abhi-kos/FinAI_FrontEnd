
import { useState } from "react";
import { Plus, Search, Star, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FavoriteCard, { FavoriteItem } from "./FavoriteCard";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

// Mock data for favorites with sectors
const mockFavorites: FavoriteItem[] = [
  {
    id: "1",
    name: "Tata Consultancy Services",
    ticker: "TCS.NS",
    price: 3850.25,
    change: 72.30,
    changePercent: 1.92,
    currency: "INR",
    market: "NSE",
    sector: "Technology",
    sentiment: "positive",
    recentNews: [
      {
        title: "TCS Wins Major Cloud Contract with European Bank",
        url: "https://example.com/news/1"
      },
      {
        title: "TCS Q3 Results: Profit Rises 8% YoY, Beats Estimates",
        url: "https://example.com/news/6"
      }
    ]
  },
  {
    id: "2",
    name: "HDFC Bank",
    ticker: "HDFCBANK.NS",
    price: 1650.80,
    change: 15.45,
    changePercent: 0.94,
    currency: "INR",
    market: "NSE",
    sector: "Finance",
    sentiment: "neutral",
    recentNews: [
      {
        title: "HDFC Bank Expands Rural Banking Initiative",
        url: "https://example.com/news/3"
      }
    ]
  },
  {
    id: "3",
    name: "Reliance Industries",
    ticker: "RELIANCE.NS",
    price: 2450.15,
    change: -43.20,
    changePercent: -1.73,
    currency: "INR",
    market: "NSE",
    sector: "Energy",
    sentiment: "negative",
    recentNews: [
      {
        title: "Reliance Industries Reports Lower Refining Margins",
        url: "https://example.com/news/5"
      }
    ]
  },
  {
    id: "4",
    name: "Saudi Aramco",
    ticker: "2222.SR",
    price: 30.25,
    change: -0.45,
    changePercent: -1.47,
    currency: "SAR",
    market: "Tadawul",
    sector: "Energy",
    sentiment: "neutral",
    recentNews: [
      {
        title: "Saudi Aramco Plans $10B Investment in Petrochemicals",
        url: "https://example.com/news/7"
      }
    ]
  },
  {
    id: "5",
    name: "Emirates NBD",
    ticker: "ENBD.DU",
    price: 17.80,
    change: 0.35,
    changePercent: 2.01,
    currency: "AED",
    market: "DFM",
    sector: "Finance",
    sentiment: "positive",
    recentNews: [
      {
        title: "Emirates NBD Q2 Profit Surges on Loan Growth",
        url: "https://example.com/news/8"
      }
    ]
  },
  {
    id: "6",
    name: "Microsoft",
    ticker: "MSFT",
    price: 378.92,
    change: 5.67,
    changePercent: 1.52,
    currency: "USD",
    market: "NASDAQ",
    sector: "Technology",
    sentiment: "positive"
  },
  {
    id: "7",
    name: "Apple",
    ticker: "AAPL",
    price: 175.85,
    change: -2.15,
    changePercent: -1.21,
    currency: "USD",
    market: "NASDAQ",
    sector: "Technology",
    sentiment: "neutral"
  },
  {
    id: "8",
    name: "Johnson & Johnson",
    ticker: "JNJ",
    price: 152.30,
    change: 0.78,
    changePercent: 0.51,
    currency: "USD",
    market: "NYSE",
    sector: "Healthcare",
    sentiment: "positive"
  }
];

// Mock data for search results
const mockSearchResults: FavoriteItem[] = [
  {
    id: "9",
    name: "Infosys Ltd",
    ticker: "INFY.NS",
    price: 1520.45,
    change: 25.60,
    changePercent: 1.71,
    currency: "INR",
    market: "NSE",
    sector: "Technology"
  },
  {
    id: "10",
    name: "First Abu Dhabi Bank",
    ticker: "FAB.AD",
    price: 14.20,
    change: 0.15,
    changePercent: 1.07,
    currency: "AED",
    market: "ADX",
    sector: "Finance"
  },
  {
    id: "11",
    name: "Qatar National Bank",
    ticker: "QNBK.QA",
    price: 19.80,
    change: -0.25,
    changePercent: -1.25,
    currency: "QAR",
    market: "QSE",
    sector: "Finance"
  },
  {
    id: "12",
    name: "Pfizer Inc",
    ticker: "PFE",
    price: 28.45,
    change: 0.32,
    changePercent: 1.14,
    currency: "USD",
    market: "NYSE",
    sector: "Healthcare"
  }
];

const FavoritesView = () => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>(mockFavorites);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<FavoriteItem[]>([]);
  const [searchDialogOpen, setSearchDialogOpen] = useState(false);
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    
    if (term.trim() === "") {
      setSearchResults([]);
      return;
    }
    
    // Filter mock search results based on the search term
    // In a real app, this would be an API call
    const results = mockSearchResults.filter(
      item => item.name.toLowerCase().includes(term.toLowerCase()) || 
             item.ticker.toLowerCase().includes(term.toLowerCase())
    );
    
    setSearchResults(results);
  };
  
  const handleRemoveFavorite = (id: string) => {
    setFavorites(favorites.filter(item => item.id !== id));
  };
  
  const handleAddFavorite = (item: FavoriteItem) => {
    // Check if already in favorites
    if (!favorites.some(fav => fav.id === item.id)) {
      setFavorites([...favorites, item]);
    }
    setSearchDialogOpen(false);
    setSearchTerm("");
    setSearchResults([]);
  };
  
  // Get unique sectors from favorites
  const sectors = ['All', ...Array.from(new Set(favorites.map(item => item.sector || 'Uncategorized')))];
  
  // Filter favorites based on search term and selected sector
  const filteredFavorites = favorites.filter(item => {
    const matchesSearch = searchTerm.trim() === "" || 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.ticker.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSector = !selectedSector || selectedSector === 'All' || 
      item.sector === selectedSector || 
      (!item.sector && selectedSector === 'Uncategorized');
    
    return matchesSearch && matchesSector;
  });
  
  return (
    <div className="h-full flex flex-col">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Favorites</h1>
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Filter favorites..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-60"
          />
          
          <Dialog open={searchDialogOpen} onOpenChange={setSearchDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus size={16} className="mr-2" />
                Add Favorite
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add to Favorites</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <Input
                  placeholder="Search companies or tickers..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="mb-4"
                  autoFocus
                />
                
                <ScrollArea className="h-[300px] pr-4">
                  {searchResults.length > 0 ? (
                    <div className="space-y-2">
                      {searchResults.map(item => (
                        <div 
                          key={item.id} 
                          className="flex items-center justify-between p-3 border border-border rounded-md hover:bg-muted"
                        >
                          <div>
                            <div className="font-medium">{item.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {item.ticker} • {item.market}
                              {item.sector && (
                                <span> • {item.sector}</span>
                              )}
                            </div>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleAddFavorite(item)}
                            className="h-8"
                          >
                            <Star size={14} className="mr-1" />
                            Add
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : searchTerm ? (
                    <div className="text-center py-8 text-muted-foreground">
                      No results found for "{searchTerm}"
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      Search for companies or tickers to add them to your favorites
                    </div>
                  )}
                </ScrollArea>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      {/* Sector filters */}
      <div className="mb-6 overflow-x-auto pb-2">
        <div className="flex space-x-2">
          {sectors.map(sector => (
            <Button
              key={sector}
              variant={selectedSector === sector || (!selectedSector && sector === 'All') ? "default" : "outline"}
              onClick={() => setSelectedSector(sector === 'All' ? null : sector)}
              size="sm"
              className="whitespace-nowrap"
            >
              {sector}
            </Button>
          ))}
        </div>
      </div>
      
      {searchTerm && (
        <div className="mb-4 flex items-center">
          <span className="text-sm text-muted-foreground mr-2">
            Showing results for "{searchTerm}"
          </span>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setSearchTerm("")}
            className="h-6 p-0"
          >
            <X size={14} className="mr-1" />
            Clear
          </Button>
        </div>
      )}
      
      {filteredFavorites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
          {filteredFavorites.map(item => (
            <FavoriteCard
              key={item.id}
              item={item}
              onRemove={handleRemoveFavorite}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <div className="text-4xl mb-4">⭐</div>
          <h3 className="text-lg font-medium mb-2">
            {searchTerm || selectedSector ? "No favorites match your filters" : "No favorites yet"}
          </h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm || selectedSector
              ? "Try different filters" 
              : "Start by adding companies or indices to your watchlist"}
          </p>
          {(searchTerm || selectedSector) ? (
            <Button variant="outline" onClick={() => {setSearchTerm(""); setSelectedSector(null);}}>
              Clear filters
            </Button>
          ) : (
            <Button onClick={() => setSearchDialogOpen(true)}>
              <Plus size={16} className="mr-2" />
              Add your first favorite
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default FavoritesView;
