
import { useState } from "react";
import { Filter, Calendar, X, ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import NewsCard, { NewsItem } from "./NewsCard";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

// Mock news data
const mockNews: NewsItem[] = [
  {
    id: "1",
    title: "TCS Wins Major Cloud Contract with European Bank",
    summary: "Tata Consultancy Services has secured a $50 million deal with a leading European bank for cloud transformation services.",
    content: "Tata Consultancy Services has secured a $50 million deal with a leading European bank for cloud transformation services. The five-year contract will involve migrating the bank's legacy systems to a cloud-based platform, implementing advanced security protocols, and providing ongoing maintenance.\n\nThis marks TCS's largest European banking deal this year and strengthens its position in the financial services sector. The company's shares rose 3% following the announcement.\n\n\"This partnership demonstrates our deep expertise in cloud transformation for the banking sector,\" said the TCS CEO in a statement. \"We're committed to helping financial institutions modernize their infrastructure while maintaining the highest standards of security and compliance.\"",
    source: "Financial Times",
    publishedAt: "2023-06-15T09:30:00Z",
    url: "https://example.com/news/1",
    sentiment: "positive",
    tickers: ["TCS.NS", "BANK.EU"]
  },
  {
    id: "2",
    title: "Oil Prices Drop Amid Increased Production",
    summary: "Global oil prices fell by 4% today as major producers announced plans to increase output, affecting energy stocks across markets.",
    content: "Global oil prices fell by 4% today as major producers announced plans to increase output, affecting energy stocks across markets. Brent crude dropped to $72 per barrel, its lowest point in three months.\n\nThe decision by OPEC+ members to boost production beyond previously agreed limits surprised analysts who had expected extended production cuts due to weak demand forecasts. Saudi Arabia and UAE led the push for increased output.\n\nThe news sent shockwaves through energy markets, with major oil companies seeing their stocks decline. Middle Eastern markets were particularly affected, with Saudi Arabia's Tadawul index down 1.7% and energy stocks leading the losses.\n\nAnalysts predict continued pressure on oil prices if demand doesn't increase to match the higher supply, potentially leading to further market adjustments in coming weeks.",
    source: "Bloomberg",
    publishedAt: "2023-06-14T16:45:00Z",
    url: "https://example.com/news/2",
    sentiment: "negative",
    tickers: ["BRENT", "XOM", "2222.SR"]
  },
  {
    id: "3",
    title: "HDFC Bank Expands Rural Banking Initiative",
    summary: "HDFC Bank is launching 500 new branches focused on rural and semi-urban areas, aiming to increase financial inclusion.",
    content: "HDFC Bank is launching 500 new branches focused on rural and semi-urban areas, aiming to increase financial inclusion. The expansion is part of the bank's strategy to tap into underserved markets and extend its retail banking services.\n\nThe new branches will offer specialized agricultural loans, microfinance options, and digital banking services tailored for rural customers. The bank plans to complete this expansion within the next 18 months.\n\n\"Financial inclusion is not just a corporate social responsibility for us but a significant business opportunity,\" said the bank's retail banking head. \"Rural India represents the next frontier of growth for the banking sector.\"\n\nAnalysts view this move positively, noting that establishing physical presence in rural areas could give HDFC Bank an advantage over digital-only competitors. The bank's stock remained stable following the announcement.",
    source: "Economic Times",
    publishedAt: "2023-06-13T11:20:00Z",
    url: "https://example.com/news/3",
    sentiment: "positive",
    tickers: ["HDFCBANK.NS"]
  },
  {
    id: "4",
    title: "Dubai Property Market Shows Signs of Cooling",
    summary: "After two years of rapid growth, Dubai's real estate market is showing signs of stabilization with price increases slowing to 2% quarterly.",
    content: "After two years of rapid growth, Dubai's real estate market is showing signs of stabilization with price increases slowing to 2% quarterly. This represents a significant cooling compared to the double-digit growth seen in previous quarters.\n\nThe slowdown affects primarily luxury properties in prime locations, while affordable housing segments continue to see healthy demand. Industry experts suggest this indicates a market maturation rather than a concerning downturn.\n\nDevelopers are adjusting their strategies, with some delaying new project launches and others offering more flexible payment plans. Major real estate companies listed on the Dubai Financial Market showed mixed performance in response to the news.\n\n\"We're seeing a natural correction after an exceptional growth period,\" noted a senior property consultant. \"This actually creates a healthier, more sustainable market in the long term.\"",
    source: "Gulf Business",
    publishedAt: "2023-06-12T08:15:00Z",
    url: "https://example.com/news/4",
    sentiment: "neutral",
    tickers: ["EMAAR.DU", "DAMAC.DU"]
  },
  {
    id: "5",
    title: "Reliance Industries Reports Lower Refining Margins",
    summary: "Reliance Industries announced lower-than-expected refining margins for Q1, impacting overall profitability despite growth in retail and digital services.",
    content: "Reliance Industries announced lower-than-expected refining margins for Q1, impacting overall profitability despite growth in retail and digital services. The company's gross refining margin (GRM) fell to $9.5 per barrel, down from $12.2 in the previous quarter.\n\nThe decline is attributed to global oversupply of refined products and narrowing differentials between light and heavy crude. Analysts had projected GRMs of around $10.8 per barrel.\n\nWhile the refining segment underperformed, Reliance's retail business saw 18% year-on-year growth and Jio Platforms continued its strong performance with subscriber additions exceeding targets.\n\n\"The current refining environment is challenging, but we expect improvements in the second half of the year as seasonal demand picks up,\" said the company's CFO during the earnings call. The stock dropped 2.5% following the announcement.",
    source: "Reuters",
    publishedAt: "2023-06-11T14:30:00Z",
    url: "https://example.com/news/5",
    sentiment: "negative",
    tickers: ["RELIANCE.NS"]
  }
];

const NewsFeed = () => {
  const [sentiment, setSentiment] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  
  const sentimentData = {
    "all": mockNews.length,
    "positive": mockNews.filter(n => n.sentiment === "positive").length,
    "negative": mockNews.filter(n => n.sentiment === "negative").length,
    "neutral": mockNews.filter(n => n.sentiment === "neutral").length
  };
  
  const filteredNews = mockNews.filter(news => {
    // Filter by sentiment
    if (sentiment !== "all" && news.sentiment !== sentiment) return false;
    
    // Filter by search term
    if (searchTerm && !news.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !news.summary.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    
    // Filter by active filters
    if (activeFilters.length > 0 && 
        !(news.tickers?.some(ticker => activeFilters.includes(ticker)) || 
          activeFilters.includes(news.source))) return false;
    
    return true;
  });
  
  const handleFilterAdd = (filter: string) => {
    if (!activeFilters.includes(filter)) {
      setActiveFilters([...activeFilters, filter]);
    }
  };
  
  const handleFilterRemove = (filter: string) => {
    setActiveFilters(activeFilters.filter(f => f !== filter));
  };
  
  const clearAllFilters = () => {
    setActiveFilters([]);
    setSearchTerm("");
    setSentiment("all");
  };
  
  return (
    <div className="h-full flex flex-col">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">News Feed</h1>
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search news..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-60"
          />
          
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="h-9">
                <Filter size={16} className="mr-2" />
                Filters
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-3">
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-medium mb-1.5">Sources</h4>
                  <div className="space-y-1.5">
                    {["Bloomberg", "Reuters", "Financial Times", "Economic Times"].map(source => (
                      <Button
                        key={source}
                        variant="outline"
                        size="sm"
                        className="w-full justify-start text-xs h-7"
                        onClick={() => handleFilterAdd(source)}
                      >
                        {source}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-1.5">Tickers</h4>
                  <div className="grid grid-cols-2 gap-1.5">
                    {["TCS.NS", "HDFCBANK.NS", "RELIANCE.NS", "BRENT"].map(ticker => (
                      <Button
                        key={ticker}
                        variant="outline"
                        size="sm"
                        className="justify-start text-xs h-7"
                        onClick={() => handleFilterAdd(ticker)}
                      >
                        {ticker}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-1.5">Date Range</h4>
                  <Button variant="outline" size="sm" className="w-full justify-start text-xs h-7">
                    <Calendar size={14} className="mr-2" />
                    Select dates
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <Tabs value={sentiment} onValueChange={setSentiment} className="w-auto">
          <TabsList>
            <TabsTrigger value="all" className="relative">
              All
              <Badge variant="secondary" className="ml-1 text-xs">
                {sentimentData.all}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="positive" className="relative">
              <div className="flex items-center">
                <ChevronUp size={14} className="mr-1 text-positive" />
                Positive
                <Badge variant="secondary" className="ml-1 text-xs">
                  {sentimentData.positive}
                </Badge>
              </div>
            </TabsTrigger>
            <TabsTrigger value="negative" className="relative">
              <div className="flex items-center">
                <ChevronDown size={14} className="mr-1 text-negative" />
                Negative
                <Badge variant="secondary" className="ml-1 text-xs">
                  {sentimentData.negative}
                </Badge>
              </div>
            </TabsTrigger>
          </TabsList>
        </Tabs>
        
        {(activeFilters.length > 0 || searchTerm || sentiment !== "all") && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearAllFilters}
            className="h-8 text-xs"
          >
            Clear all filters
          </Button>
        )}
      </div>
      
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {activeFilters.map(filter => (
            <Badge key={filter} variant="secondary" className="pl-2 h-6">
              {filter}
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => handleFilterRemove(filter)} 
                className="h-4 w-4 ml-1 hover:bg-transparent"
              >
                <X size={12} />
              </Button>
            </Badge>
          ))}
        </div>
      )}
      
      <div className="flex-1 overflow-y-auto pr-2 -mr-2">
        {filteredNews.length > 0 ? (
          filteredNews.map(news => (
            <NewsCard key={news.id} news={news} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <div className="text-4xl mb-4">📰</div>
            <h3 className="text-lg font-medium mb-2">No news matches your filters</h3>
            <p className="text-muted-foreground mb-4">Try adjusting your search or filters</p>
            <Button variant="outline" onClick={clearAllFilters}>
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsFeed;
