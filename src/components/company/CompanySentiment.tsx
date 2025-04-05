
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent
} from "@/components/ui/chart";
import { 
  AreaChart, 
  Area, 
  BarChart,
  Bar,
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer,
  Tooltip,
  Legend
} from "recharts";
import { mockSentimentData } from "./mockData";

interface CompanySentimentProps {
  companyId: string;
}

interface SentimentData {
  companyId: string;
  companyName: string;
  currentSentiment: "positive" | "neutral" | "negative";
  sentimentScore: number;
  sentimentHistory: {
    date: string;
    score: number;
    volume: number;
  }[];
  sentimentDistribution: {
    name: string;
    value: number;
    color: string;
  }[];
  sentimentBySource: {
    source: string;
    positive: number;
    neutral: number;
    negative: number;
  }[];
  keyTopics: {
    topic: string;
    weight: number;
    sentiment: "positive" | "neutral" | "negative";
  }[];
  sentimentSummary: string;
}

const CompanySentiment = ({ companyId }: CompanySentimentProps) => {
  const [sentimentData, setSentimentData] = useState<SentimentData | null>(null);
  
  useEffect(() => {
    // In a real app, this would be an API call
    const data = mockSentimentData.find(d => d.companyId === companyId) || null;
    
    setTimeout(() => {
      setSentimentData(data as SentimentData);
    }, 500);
  }, [companyId]);
  
  if (!sentimentData) {
    return <div className="flex justify-center items-center h-64">Loading sentiment data...</div>;
  }
  
  // Define chart configs
  const sentimentHistoryConfig = {
    score: {
      label: "Sentiment Score",
      color: "#8B5CF6",
    },
  };
  
  const getSentimentLabel = (score: number) => {
    if (score >= 75) return "Very Positive";
    if (score >= 60) return "Positive";
    if (score >= 40) return "Neutral";
    if (score >= 25) return "Negative";
    return "Very Negative";
  };
  
  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "text-emerald-600";
      case "negative":
        return "text-rose-600";
      case "neutral":
      default:
        return "text-amber-600";
    }
  };
  
  // Custom Label Component for the Pie Chart
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }: any) => {
    // Only show labels for values that are significant enough (e.g., > 5%)
    if (percent < 0.05) return null;
    
    const radius = outerRadius * 0.8;
    const RADIAN = Math.PI / 180;
    const x = cx + radius * Math.cos(-midAngle * RADIAN) * 1.2;
    const y = cy + radius * Math.sin(-midAngle * RADIAN) * 1.2;
    
    return (
      <text 
        x={x} 
        y={y} 
        fill="#333333" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        className="text-xs"
      >
        {`${name} ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  
  return (
    <div className="space-y-6 pb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sentiment Score Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Overall Sentiment</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="text-5xl font-bold mb-2">{sentimentData.sentimentScore}</div>
            <div className={`text-lg font-medium ${getSentimentColor(sentimentData.currentSentiment)}`}>
              {getSentimentLabel(sentimentData.sentimentScore)}
            </div>
          </CardContent>
        </Card>
        
        {/* Sentiment Distribution Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Sentiment Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[210px] w-full flex items-center justify-center">
              <PieChart width={200} height={200}>
                <Pie
                  data={sentimentData.sentimentDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {sentimentData.sentimentDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => `${(value as number * 100).toFixed(0)}%`} 
                  contentStyle={{ backgroundColor: "white", borderRadius: "8px", border: "1px solid #e2e8f0" }}
                />
              </PieChart>
            </div>
          </CardContent>
        </Card>
        
        {/* Key Topics Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Key Topics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sentimentData.keyTopics.map((topic, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">{topic.topic}</span>
                    <span className={getSentimentColor(topic.sentiment)}>
                      {topic.sentiment.charAt(0).toUpperCase() + topic.sentiment.slice(1)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${
                        topic.sentiment === "positive" ? "bg-emerald-500" : 
                        topic.sentiment === "negative" ? "bg-rose-500" : "bg-amber-500"
                      }`}
                      style={{ width: `${topic.weight}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Sentiment History Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Sentiment Trend Over Time</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="h-60 sm:h-80 w-full">
            <ChartContainer config={sentimentHistoryConfig} className="w-full h-full">
              <AreaChart 
                width={500} 
                height={300}
                data={sentimentData.sentimentHistory}
                margin={{ top: 10, right: 30, left: 0, bottom: 30 }}
              >
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" />
                <YAxis domain={[0, 100]} width={50} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#8B5CF6" 
                  fillOpacity={1}
                  fill="url(#colorScore)" 
                />
              </AreaChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
      
      {/* Sentiment by Source */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Sentiment by Source</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="h-60 sm:h-80 w-full">
            <BarChart
              width={500}
              height={300}
              data={sentimentData.sentimentBySource}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="source" />
              <YAxis width={50} />
              <Tooltip />
              <Legend />
              <Bar dataKey="positive" stackId="a" fill="#10b981" />
              <Bar dataKey="neutral" stackId="a" fill="#f59e0b" />
              <Bar dataKey="negative" stackId="a" fill="#ef4444" />
            </BarChart>
          </div>
        </CardContent>
      </Card>
      
      {/* Sentiment Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Sentiment Analysis Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-base">{sentimentData.sentimentSummary}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanySentiment;
