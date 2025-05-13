"use client";
import ROUTES from "@/routes/routes";
import Logout from "@/services/api/logout";
import checkMe from "@/services/api/check-me";
import { usePathname, useRouter } from "next/navigation";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

// Định nghĩa kiểu dữ liệu cho AuthContext
interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

// Tạo context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ROUTES_PRIVATE = [ROUTES.admin, ROUTES.cart, ROUTES.profile];
// Provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const pathname = usePathname();
  const routes = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await checkMe();
        setUser(response.data);
      } catch {
        setUser(null);
      }
    };

    fetchUser();
  },[]);

  // Hàm login
  const login = (userData: User) => {
    setUser(userData);
  };

  // Hàm logout
  const logout = async () => {
    await Logout();
    setUser(null);
    if (ROUTES_PRIVATE.some((path) => pathname.startsWith(path))) {
      routes.push(ROUTES.login);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook để sử dụng AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
