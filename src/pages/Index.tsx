
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import ChatInterface from "@/components/chat/ChatInterface";

interface LocationState {
  searchQuery?: string;
}

const Index = () => {
  const location = useLocation();
  const state = location.state as LocationState;
  
  useEffect(() => {
    // Handle incoming search query if present
    if (state?.searchQuery) {
      // In a real implementation, you would send this query to the ChatInterface
      console.log("Search query received:", state.searchQuery);
      
      // Clear the state after handling the query
      window.history.replaceState({}, document.title);
    }
  }, [state?.searchQuery]);

  return (
    <MainLayout>
      <div className="h-full flex flex-col max-w-7xl mx-auto w-full">
        <ChatInterface />
      </div>
    </MainLayout>
  );
};

export default Index;
