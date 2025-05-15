import { signInWithPopup } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { GoogleAuthProvider } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeftCircle } from "lucide-react";
import { auth } from "@/lib/config/firebaseConfig";

const provider = new GoogleAuthProvider();

const LoginPage = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      //   const userDetailsToSave = {
      //     name: user.displayName,
      //     photo: user.photoURL,
      //     uid: user.uid,
      //   };

      console.log("Logged in user:", user);
      navigate(`/applications`);
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="bg-card text-card-foreground w-full max-w-sm rounded-2xl shadow-xl p-8 space-y-6 border">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-semibold">Welcome 👋</h1>
          <p className="text-muted-foreground text-sm">Sign in to continue</p>
        </div>
        <Button
          variant="outline"
          className="w-full gap-2"
          onClick={handleGoogleLogin}>
          <img src="/google.png" className="w-6 h-6" />
          Sign in with Google
        </Button>
        <div className="flex items-center justify-center text-gray-500">
          <Link to={"/"} className="flex gap-2">
            <ArrowLeftCircle />
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
