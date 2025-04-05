
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent
} from "@/components/ui/chart";
import { 
  Area, 
  AreaChart, 
  ResponsiveContainer, 
  XAxis, 
  YAxis,
  CartesianGrid
} from "recharts";
import { FavoriteItem } from "../favorites/FavoriteCard";
import { mockCompanyData } from "./mockData";

interface CompanyOverviewProps {
  companyId: string;
}

type CompanyDetails = FavoriteItem & { 
  description?: string;
  marketCap?: number;
  eps?: number;
  revenue?: number;
  netIncome?: number;
  peRatio?: number;
  dividendYield?: number;
  yearFounded?: number;
  employees?: number;
  ceo?: string;
  headquarters?: string;
  stockChartData?: {
    date: string;
    price: number;
    volume: number;
  }[];
  keyMetrics?: {
    title: string;
    value: string | number;
    change?: number;
    changePercentage?: number;
  }[];
};

const CompanyOverview = ({ companyId }: CompanyOverviewProps) => {
  const [company, setCompany] = useState<CompanyDetails | null>(null);

  useEffect(() => {
    // In a real app, this would be an API call
    const companyData = mockCompanyData.find(c => c.id === companyId) || null;
    
    setTimeout(() => {
      setCompany(companyData as CompanyDetails);
    }, 500);
  }, [companyId]);

  if (!company) {
    return <div className="flex justify-center items-center h-64">Loading company data...</div>;
  }

  const formatLargeNumber = (num: number) => {
    if (num >= 1e12) return (num / 1e12).toFixed(2) + 'T';
    if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K';
    return num.toString();
  };

  const chartConfig = {
    price: {
      label: "Price",
      color: "#10b981",
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Company Profile Card */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Company Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold">{company.name}</h2>
                <p className="text-muted-foreground">{company.ticker} • {company.market}</p>
              </div>
              <div className="text-right">
                <div className="text-xl font-semibold">
                  {new Intl.NumberFormat(undefined, {
                    style: 'currency',
                    currency: company.currency,
                    minimumFractionDigits: 2
                  }).format(company.price)}
                </div>
                <div className={company.change >= 0 ? "text-positive" : "text-negative"}>
                  {company.change >= 0 ? "+" : ""}{company.change.toFixed(2)} ({company.changePercent.toFixed(2)}%)
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <p>{company.description}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {company.headquarters && (
                  <div>
                    <p className="text-sm text-muted-foreground">Headquarters</p>
                    <p className="font-medium">{company.headquarters}</p>
                  </div>
                )}
                
                {company.yearFounded && (
                  <div>
                    <p className="text-sm text-muted-foreground">Founded</p>
                    <p className="font-medium">{company.yearFounded}</p>
                  </div>
                )}
                
                {company.ceo && (
                  <div>
                    <p className="text-sm text-muted-foreground">CEO</p>
                    <p className="font-medium">{company.ceo}</p>
                  </div>
                )}
                
                {company.employees && (
                  <div>
                    <p className="text-sm text-muted-foreground">Employees</p>
                    <p className="font-medium">{company.employees.toLocaleString()}</p>
                  </div>
                )}
                
                {company.sector && (
                  <div>
                    <p className="text-sm text-muted-foreground">Sector</p>
                    <p className="font-medium">{company.sector}</p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Key Financials Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Key Financials</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {company.marketCap && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Market Cap</span>
                  <span className="font-medium">{formatLargeNumber(company.marketCap)}</span>
                </div>
              )}
              
              {company.revenue && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Revenue (TTM)</span>
                  <span className="font-medium">{formatLargeNumber(company.revenue)}</span>
                </div>
              )}
              
              {company.netIncome && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Net Income (TTM)</span>
                  <span className="font-medium">{formatLargeNumber(company.netIncome)}</span>
                </div>
              )}
              
              {company.eps && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">EPS (TTM)</span>
                  <span className="font-medium">{company.eps.toFixed(2)}</span>
                </div>
              )}
              
              {company.peRatio && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">P/E Ratio</span>
                  <span className="font-medium">{company.peRatio.toFixed(2)}</span>
                </div>
              )}
              
              {company.dividendYield && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Dividend Yield</span>
                  <span className="font-medium">{company.dividendYield.toFixed(2)}%</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Stock Chart */}
      {company.stockChartData && company.stockChartData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Stock Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ChartContainer config={chartConfig}>
                <ResponsiveContainer width="99%" height="100%">
                  <AreaChart 
                    data={company.stockChartData} 
                    margin={{ top: 10, right: 10, left: 0, bottom: 5 }}
                  >
                    <defs>
                      <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis 
                      dataKey="date" 
                      tickLine={false}
                      axisLine={false}
                      tick={{ fontSize: 10 }}
                      tickFormatter={(value) => value}
                      interval="preserveStartEnd"
                      minTickGap={30}
                    />
                    <YAxis 
                      tickLine={false}
                      axisLine={false}
                      tick={{ fontSize: 10 }}
                      domain={['auto', 'auto']}
                      tickFormatter={(value) => `$${value}`}
                      width={35}
                    />
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area 
                      type="monotone" 
                      dataKey="price" 
                      stroke="#10b981" 
                      fillOpacity={1} 
                      fill="url(#colorPrice)" 
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Key Metrics Cards */}
      {company.keyMetrics && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {company.keyMetrics.map((metric, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">{metric.title}</p>
                <div className="mt-1 flex items-center justify-between">
                  <p className="text-xl font-bold text-wrap-anywhere overflow-hidden">{metric.value}</p>
                  {metric.change !== undefined && (
                    <div className={`text-xs ${metric.change >= 0 ? "text-positive" : "text-negative"}`}>
                      {metric.change >= 0 ? "+" : ""}{metric.change}
                      {metric.changePercentage && ` (${metric.changePercentage}%)`}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompanyOverview;
