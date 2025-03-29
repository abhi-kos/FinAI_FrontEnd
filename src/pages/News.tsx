
import MainLayout from "@/components/layout/MainLayout";
import NewsFeed from "@/components/news/NewsFeed";

const News = () => {
  return (
    <MainLayout>
      <div className="h-full">
        <NewsFeed />
      </div>
    </MainLayout>
  );
};

export default News;
