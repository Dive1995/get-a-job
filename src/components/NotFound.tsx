import { Link } from "react-router-dom";
import { Button } from "./ui/button";

function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center space-y-3">
        <p className="text-8xl font-bold">404</p>
        <h1 className="text-2xl font-bold">Page Not found</h1>
        <Link to={"/"}>
          <Button>Back to Home</Button>
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
