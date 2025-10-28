import axios from 'axios';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
 
interface User {
  id: string;
  email: string;
  firstName:string,
  lastName:string,
  accessToken:string
 
}
 
interface AuthContextType {
  user: User | null;
    loading: boolean
  logout: () => void;
  login: () => void;
}
 
const AuthContext = createContext<AuthContextType | undefined>(undefined);
 
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
 
// Merged AuthProvider and its logic into a single file
 export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
 // const [isAuthenticated,setIsAuthenticated]=useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
 
  useEffect(() => {
    // Axios call to check for a valid session on component mount
    login()
  }, []);
 
  const logout = async () => {
    try {
      const resp = await axios.post(
        "https://localhost:7183/User/logout",
        {},
        { withCredentials: true }
      );
     
      if(resp.data) {
        setUser(null);
 
      console.log("logout");
      navigate("/login");
      }
     
 
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
 
 
 
  const login = () => {
    axios.get("https://localhost:7183/User/me", { withCredentials: true })
      .then(res => {
        setUser(res.data);
        console.log(res);
       
      })
      .catch(err => {
        console.error("Failed to fetch user:", err);
        setUser(null);
     
      })
      .finally(() => {
        setLoading(false);
      });
  }
 
  return (
    <AuthContext.Provider value={{ user, logout, login,loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};