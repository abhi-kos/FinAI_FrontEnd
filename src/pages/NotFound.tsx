
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="mb-6 text-6xl font-bold text-teal">404</div>
        <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
        <p className="text-muted-foreground mb-6 max-w-md">
          We couldn't find the page you were looking for. It might have been moved or deleted.
        </p>
        <Link to="/">
          <Button>
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
