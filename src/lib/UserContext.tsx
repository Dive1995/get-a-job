import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { onAuthStateChanged } from "firebase/auth";
import { User } from "./Types"; // assuming you have a User type
import { auth } from "./config/firebaseConfig";

type ContextType = {
  user: User | null;
  loading: boolean;
};

const AuthContext = createContext<ContextType | undefined>(undefined);

type Props = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user data exists in localStorage and set it as the initial user state
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser)); // Initialize state with localStorage data
      setLoading(false); // No need to wait for auth state change if it's already in localStorage
    }

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // Store user details locally if needed
        const userData = {
          uid: firebaseUser.uid,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
          email: firebaseUser.email,
        };
        localStorage.setItem("user", JSON.stringify(userData)); // Store user in localStorage
        setUser(firebaseUser); // Update state with user info
      } else {
        console.log("No current user");
        localStorage.removeItem("user"); // Clear user data on logout
        setUser(null); // Set state to null
      }
      setLoading(false); // Done loading
    });

    return () => unsubscribe(); // Cleanup on component unmount
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Here’s the fix for the `useAuth` hook:
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
