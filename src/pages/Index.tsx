
import MainLayout from "@/components/layout/MainLayout";
import ChatInterface from "@/components/chat/ChatInterface";

const Index = () => {
  return (
    <MainLayout>
      <div className="h-full flex flex-col">
        <ChatInterface />
      </div>
    </MainLayout>
  );
};

export default Index;
