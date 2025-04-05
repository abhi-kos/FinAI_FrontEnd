
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import CompanyOverview from "@/components/company/CompanyOverview";
import CompanyCompetitors from "@/components/company/CompanyCompetitors";
import CompanyNews from "@/components/company/CompanyNews";
import CompanySentiment from "@/components/company/CompanySentiment";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const CompanyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate("/favorites");
  };
  
  return (
    <MainLayout>
      <div className="h-full">
        <Tabs 
          defaultValue="overview" 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full"
        >
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleBack}
                className="flex items-center"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Favorites
              </Button>
              <h1 className="text-2xl font-bold">Company Analysis</h1>
            </div>
            <TabsList className="flex-shrink-0">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="competitors">Competitors</TabsTrigger>
              <TabsTrigger value="news">News</TabsTrigger>
              <TabsTrigger value="sentiment">Sentiment</TabsTrigger>
            </TabsList>
          </div>
          
          <ScrollArea className="h-[calc(100vh-12rem)] pr-2">
            <div className="pr-4 pb-6">
              <TabsContent value="overview" className="mt-0">
                <CompanyOverview companyId={id || ""} />
              </TabsContent>
              
              <TabsContent value="competitors" className="mt-0">
                <CompanyCompetitors companyId={id || ""} />
              </TabsContent>
              
              <TabsContent value="news" className="mt-0">
                <CompanyNews companyId={id || ""} />
              </TabsContent>
              
              <TabsContent value="sentiment" className="mt-0">
                <CompanySentiment companyId={id || ""} />
              </TabsContent>
            </div>
          </ScrollArea>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default CompanyDetail;
