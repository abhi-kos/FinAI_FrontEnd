
import MainLayout from "@/components/layout/MainLayout";
import FavoritesView from "@/components/favorites/FavoritesView";

const Favorites = () => {
  return (
    <MainLayout>
      <div className="h-full max-w-7xl mx-auto px-4 w-full overflow-hidden">
        <FavoritesView />
      </div>
    </MainLayout>
  );
};

export default Favorites;
