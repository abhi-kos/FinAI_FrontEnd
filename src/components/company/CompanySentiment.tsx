
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
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
  Tooltip,
  Legend,
  ResponsiveContainer
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
    const data = mockSentimentData.find(d => d.companyId === companyId) || null;
    
    setTimeout(() => {
      setSentimentData(data as SentimentData);
    }, 500);
  }, [companyId]);
  
  if (!sentimentData) {
    return <div className="flex justify-center items-center h-64">Loading sentiment data...</div>;
  }
  
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
  
  // Fixed formatter to display percentages in the 0-100% range
  const pieChartTooltipFormatter = (value: number) => {
    // The value is already in decimal form (0.xx), so just multiply by 100
    return `${(value * 100).toFixed(1)}%`;
  };
  
  const renderLegendItems = () => {
    return (
      <div className="grid grid-cols-1 gap-2 mt-4">
        {sentimentData.sentimentDistribution.map((entry, index) => (
          <div key={index} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-sm" 
              style={{ backgroundColor: entry.color }} 
            />
            <span className="text-xs">{entry.name}: {pieChartTooltipFormatter(entry.value)}</span>
          </div>
        ))}
      </div>
    );
  };

  // Custom formatter for the sentiment by source chart
  const sourceTooltipFormatter = (value: number, name: string) => {
    return [`${value}%`, name];
  };
  
  return (
    <div className="space-y-6 pb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Sentiment Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-row items-center justify-between h-[210px]">
              <div className="w-1/2 h-full">
                <PieChart width={150} height={150}>
                  <Pie
                    data={sentimentData.sentimentDistribution}
                    cx={75}
                    cy={75}
                    innerRadius={0}
                    outerRadius={60}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {sentimentData.sentimentDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={pieChartTooltipFormatter} 
                    contentStyle={{ backgroundColor: "white", borderRadius: "8px", border: "1px solid #e2e8f0" }}
                  />
                </PieChart>
              </div>
              <div className="w-1/2">
                {renderLegendItems()}
              </div>
            </div>
          </CardContent>
        </Card>
        
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
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Sentiment by Source</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={sentimentData.sentimentBySource}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 40
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="source" 
                  angle={-45} 
                  textAnchor="end" 
                  height={70}
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  width={55}
                  tick={{ fontSize: 12 }}
                  label={{ 
                    value: 'Percentage', 
                    angle: -90, 
                    position: 'insideLeft',
                    style: { textAnchor: 'middle' }
                  }} 
                />
                <Tooltip 
                  formatter={sourceTooltipFormatter}
                  contentStyle={{ 
                    backgroundColor: "white", 
                    borderRadius: "8px", 
                    border: "1px solid #e2e8f0",
                    fontSize: "12px"
                  }}
                  itemStyle={{ padding: "2px 0" }}
                />
                <Legend 
                  wrapperStyle={{ 
                    paddingTop: "10px", 
                    fontSize: "12px" 
                  }} 
                />
                <Bar dataKey="positive" stackId="a" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="neutral" stackId="a" fill="#f59e0b" />
                <Bar dataKey="negative" stackId="a" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
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
