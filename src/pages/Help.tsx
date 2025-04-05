
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

const Help = () => {
  const [helpRequest, setHelpRequest] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!helpRequest.trim()) {
      toast.error("Please enter your help request");
      return;
    }

    setSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      toast.success("Help request submitted successfully");
      setHelpRequest("");
      setSubmitting(false);
    }, 1000);
  };

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto px-4 py-8 w-full">
        <h1 className="text-3xl font-bold mb-6">Help Center</h1>
        
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Submit a Help Request</CardTitle>
              <CardDescription>
                Describe your issue or question in detail, and our team will get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent>
                <Textarea
                  placeholder="How can we help you today?"
                  className="min-h-32"
                  value={helpRequest}
                  onChange={(e) => setHelpRequest(e.target.value)}
                />
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button type="submit" disabled={submitting}>
                  {submitting ? "Submitting..." : "Submit Request"}
                </Button>
              </CardFooter>
            </form>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-1">How do I add companies to my favorites?</h3>
                <p className="text-muted-foreground text-sm">
                  Navigate to a company page and click the star icon, or use the search function to find and star companies.
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-1">Can I export financial data?</h3>
                <p className="text-muted-foreground text-sm">
                  Yes, on company detail pages, look for the export button to download data in CSV format.
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-1">How do I customize my watchlist?</h3>
                <p className="text-muted-foreground text-sm">
                  Click on the watchlist in the sidebar, then use the edit button to add or remove stocks.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Help;
