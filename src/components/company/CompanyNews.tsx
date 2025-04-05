
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { mockNewsData } from "./mockData";

interface CompanyNewsProps {
  companyId: string;
}

interface NewsItem {
  id: string;
  title: string;
  source: string;
  date: string;
  excerpt: string;
  url: string;
  sentiment: "positive" | "negative" | "neutral";
  category: string;
  isEarningsRelated: boolean;
  isInsiderTrade: boolean;
}

const CompanyNews = ({ companyId }: CompanyNewsProps) => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // In a real app, this would be an API call
    const newsForCompany = mockNewsData.filter(news => news.companyId === companyId);
    
    setTimeout(() => {
      setNews(newsForCompany);
      setLoading(false);
    }, 500);
  }, [companyId]);
  
  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "bg-emerald-100 text-emerald-800 hover:bg-emerald-100";
      case "negative":
        return "bg-rose-100 text-rose-800 hover:bg-rose-100";
      case "neutral":
      default:
        return "bg-amber-100 text-amber-800 hover:bg-amber-100";
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };
  
  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading news...</div>;
  }
  
  if (news.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <p className="text-lg font-medium">No recent news found</p>
          <p className="text-muted-foreground">Check back later for updates</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        {news.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex gap-2 mb-2 flex-wrap">
                <Badge variant="secondary" className={getSentimentColor(item.sentiment)}>
                  {item.sentiment.charAt(0).toUpperCase() + item.sentiment.slice(1)}
                </Badge>
                
                {item.isEarningsRelated && (
                  <Badge variant="outline">Earnings</Badge>
                )}
                
                {item.isInsiderTrade && (
                  <Badge variant="outline">Insider Trading</Badge>
                )}
                
                {item.category && (
                  <Badge variant="outline">{item.category}</Badge>
                )}
              </div>
              
              <CardTitle className="text-lg">
                <a 
                  href={item.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:underline flex items-start"
                >
                  {item.title}
                  <ExternalLink className="inline-block ml-2 h-4 w-4 flex-shrink-0" />
                </a>
              </CardTitle>
              
              <CardDescription className="flex items-center justify-between">
                <span>{item.source}</span>
                <span>{formatDate(item.date)}</span>
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <p>{item.excerpt}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CompanyNews;
