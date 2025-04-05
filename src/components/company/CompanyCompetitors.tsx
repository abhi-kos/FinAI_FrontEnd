
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ChartContainer, 
  ChartLegend, 
  ChartLegendContent, 
  ChartTooltip, 
  ChartTooltipContent
} from "@/components/ui/chart";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer
} from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mockCompetitorsData } from "./mockData";

interface CompanyCompetitorsProps {
  companyId: string;
}

interface CompetitorData {
  companyId: string;
  companyName: string;
  competitors: {
    id: string;
    name: string;
    marketCap: number;
    revenue: number;
    netIncome: number;
    eps: number;
    peRatio: number;
    priceToSales: number;
    debtToEquity: number;
    operatingMargin: number;
    color: string;
  }[];
  performanceChart: {
    date: string;
    [key: string]: string | number;
  }[];
  revenueGrowthChart: {
    year: string;
    [key: string]: string | number;
  }[];
}

const CompanyCompetitors = ({ companyId }: CompanyCompetitorsProps) => {
  const [competitorsData, setCompetitorsData] = useState<CompetitorData | null>(null);
  
  useEffect(() => {
    // In a real app, this would be an API call
    const data = mockCompetitorsData.find(d => d.companyId === companyId) || null;
    
    setTimeout(() => {
      setCompetitorsData(data);
    }, 500);
  }, [companyId]);
  
  if (!competitorsData) {
    return <div className="flex justify-center items-center h-64">Loading competitor data...</div>;
  }
  
  const companyName = competitorsData.companyName;
  const competitors = competitorsData.competitors;
  
  // Create chart configs for each competitor
  const chartConfig: Record<string, { label: string; color: string }> = {};
  competitors.forEach(comp => {
    chartConfig[comp.id] = {
      label: comp.name,
      color: comp.color
    };
  });
  
  const formatLargeNumber = (num: number) => {
    if (num >= 1e12) return (num / 1e12).toFixed(2) + 'T';
    if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K';
    return num.toString();
  };
  
  // Find the company's own data for comparison
  const companyData = competitors.find(c => c.id === companyId);
  
  const renderPerformanceChart = () => (
    <LineChart data={competitorsData.performanceChart}>
      <CartesianGrid strokeDasharray="3 3" vertical={false} />
      <XAxis dataKey="date" />
      <YAxis 
        tickFormatter={(value) => `${value}%`}
        domain={['auto', 'auto']}
      />
      <ChartTooltip content={<ChartTooltipContent />} />
      {competitors.map((comp) => (
        <Line
          key={comp.id}
          type="monotone"
          dataKey={comp.id}
          stroke={comp.color}
          strokeWidth={comp.id === companyId ? 3 : 1.5}
          dot={false}
          activeDot={{ r: 6, fill: comp.color }}
        />
      ))}
    </LineChart>
  );

  const renderRevenueGrowthChart = () => (
    <LineChart data={competitorsData.revenueGrowthChart}>
      <CartesianGrid strokeDasharray="3 3" vertical={false} />
      <XAxis dataKey="year" />
      <YAxis 
        tickFormatter={(value) => `${value}%`}
        domain={['auto', 'auto']}
      />
      <ChartTooltip content={<ChartTooltipContent />} />
      {competitors.map((comp) => (
        <Line
          key={comp.id}
          type="monotone"
          dataKey={comp.id}
          stroke={comp.color}
          strokeWidth={comp.id === companyId ? 3 : 1.5}
          activeDot={{ r: 6, fill: comp.color }}
        />
      ))}
    </LineChart>
  );
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-2">{companyName} Competitive Analysis</h2>
      
      {/* Stock Performance Comparison Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Stock Performance Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height="100%">
                {renderPerformanceChart()}
              </ResponsiveContainer>
              <ChartLegend>
                <ChartLegendContent />
              </ChartLegend>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
      
      {/* Revenue Growth YoY Comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Revenue Growth Y/Y Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height="100%">
                {renderRevenueGrowthChart()}
              </ResponsiveContainer>
              <ChartLegend>
                <ChartLegendContent />
              </ChartLegend>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
      
      {/* Key Financial Metrics Comparison Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Key Financial Metrics Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead className="text-right">Market Cap</TableHead>
                  <TableHead className="text-right">Revenue</TableHead>
                  <TableHead className="text-right">Net Income</TableHead>
                  <TableHead className="text-right">EPS</TableHead>
                  <TableHead className="text-right">P/E Ratio</TableHead>
                  <TableHead className="text-right">P/S Ratio</TableHead>
                  <TableHead className="text-right">Debt/Equity</TableHead>
                  <TableHead className="text-right">Op. Margin</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {competitors.map((comp) => (
                  <TableRow key={comp.id} className={comp.id === companyId ? "bg-accent" : undefined}>
                    <TableCell className="font-medium">{comp.name}</TableCell>
                    <TableCell className="text-right">{formatLargeNumber(comp.marketCap)}</TableCell>
                    <TableCell className="text-right">{formatLargeNumber(comp.revenue)}</TableCell>
                    <TableCell className="text-right">{formatLargeNumber(comp.netIncome)}</TableCell>
                    <TableCell className="text-right">${comp.eps.toFixed(2)}</TableCell>
                    <TableCell className="text-right">{comp.peRatio.toFixed(2)}</TableCell>
                    <TableCell className="text-right">{comp.priceToSales.toFixed(2)}</TableCell>
                    <TableCell className="text-right">{comp.debtToEquity.toFixed(2)}</TableCell>
                    <TableCell className="text-right">{(comp.operatingMargin * 100).toFixed(2)}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      {/* Competitive Analysis Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Competitive Analysis Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            {companyName} {companyData?.marketCap === Math.max(...competitors.map(c => c.marketCap)) 
              ? `leads the sector with a market capitalization of ${formatLargeNumber(companyData.marketCap)}, showing its dominant position.` 
              : `has a market capitalization of ${formatLargeNumber(companyData?.marketCap || 0)}, ranking ${
                [...competitors].sort((a, b) => b.marketCap - a.marketCap).findIndex(c => c.id === companyId) + 1
              } among its main competitors.`
            }
          </p>
          <p className="mb-4">
            {companyData?.operatingMargin && companyData.operatingMargin > 0.15 
              ? `With an operating margin of ${(companyData.operatingMargin * 100).toFixed(2)}%, ${companyName} demonstrates strong operational efficiency compared to the industry average.`
              : `${companyName}'s operating margin of ${(companyData?.operatingMargin || 0 * 100).toFixed(2)}% indicates room for operational improvements compared to top performers in the sector.`
            }
          </p>
          <p>
            {companyData?.peRatio && companyData.peRatio < 20 
              ? `The company's P/E ratio of ${companyData.peRatio.toFixed(2)} suggests it may be undervalued compared to peers, presenting a potential investment opportunity.`
              : `With a P/E ratio of ${companyData?.peRatio?.toFixed(2) || 'N/A'}, ${companyName} is valued at a premium compared to some competitors, reflecting market expectations for future growth.`
            }
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanyCompetitors;
