
import MainLayout from "@/components/layout/MainLayout";
import FavoritesView from "@/components/favorites/FavoritesView";

const Favorites = () => {
  return (
    <MainLayout>
      <div className="h-full">
        <FavoritesView />
      </div>
    </MainLayout>
  );
};

export default Favorites;
