
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

const SettingsView = () => {
  const [language, setLanguage] = useState("english");
  const [timeZone, setTimeZone] = useState("utc+0");
  const [currency, setCurrency] = useState("usd");
  const [notifications, setNotifications] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(false);
  const [mobileAlerts, setMobileAlerts] = useState(true);
  
  const { toast } = useToast();
  
  const handleSavePreferences = () => {
    toast({
      title: "Preferences saved",
      description: "Your settings have been updated successfully.",
    });
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
      <Tabs defaultValue="preferences" className="mb-6">
        <TabsList className="grid grid-cols-4 w-full max-w-md">
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
        </TabsList>
        
        <TabsContent value="preferences" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
              <CardDescription>
                Customize your GreyFIN experience with these settings.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="arabic">Arabic</SelectItem>
                      <SelectItem value="hindi">Hindi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="timezone">Time Zone</Label>
                  <Select value={timeZone} onValueChange={setTimeZone}>
                    <SelectTrigger id="timezone">
                      <SelectValue placeholder="Select time zone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utc+0">UTC (GMT)</SelectItem>
                      <SelectItem value="utc+3">Gulf Standard Time (UTC+3)</SelectItem>
                      <SelectItem value="utc+5.5">India Standard Time (UTC+5:30)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="currency">Default Currency</Label>
                  <Select value={currency} onValueChange={setCurrency}>
                    <SelectTrigger id="currency">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usd">USD ($)</SelectItem>
                      <SelectItem value="inr">INR (₹)</SelectItem>
                      <SelectItem value="aed">AED (د.إ)</SelectItem>
                      <SelectItem value="sar">SAR (ر.س)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Display Settings</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="market-hours">Show 24-hour market data</Label>
                    <p className="text-sm text-muted-foreground">
                      Display performance across all global trading hours
                    </p>
                  </div>
                  <Switch id="market-hours" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="shariah">Show Shariah compliance indicators</Label>
                    <p className="text-sm text-muted-foreground">
                      Mark stocks that meet Islamic investment criteria
                    </p>
                  </div>
                  <Switch id="shariah" defaultChecked />
                </div>
              </div>
              
              <Separator />
              
              <Button onClick={handleSavePreferences}>Save preferences</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure how you want to receive updates and alerts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="notifications">Allow notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive alerts about important market events and updates
                  </p>
                </div>
                <Switch 
                  id="notifications" 
                  checked={notifications} 
                  onCheckedChange={setNotifications} 
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-alerts">Email alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive important updates via email
                  </p>
                </div>
                <Switch 
                  id="email-alerts" 
                  checked={emailAlerts} 
                  onCheckedChange={setEmailAlerts}
                  disabled={!notifications}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="mobile-alerts">Mobile alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive push notifications on your mobile device
                  </p>
                </div>
                <Switch 
                  id="mobile-alerts" 
                  checked={mobileAlerts} 
                  onCheckedChange={setMobileAlerts}
                  disabled={!notifications}
                />
              </div>
              
              <Separator />
              
              <Button onClick={handleSavePreferences}>Save notification settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Manage your account details and subscription
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-muted-foreground">Account settings would go here</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="privacy">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>
                Control your data and privacy preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-muted-foreground">Privacy settings would go here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="mt-6 text-xs text-muted-foreground">
        <p>Information provided by GreyFIN is for research purposes and not investment advice.</p>
        <p>Always consult a licensed advisor before making investment decisions.</p>
      </div>
    </div>
  );
};

export default SettingsView;
