import { createContext, useContext, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import firebaseConfig from "../../firebaseInfo/firebaseConfig";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  onAuthStateChanged(auth, (user) => {
    setIsAuthenticated(true);
    setCurrentUser(user);
  });

  const value = {
    currentUser,
    isAuthenticated,
    login: (email, password) =>
      signInWithEmailAndPassword(auth, email, password),
    logout: () => {
      setIsAuthenticated(false);
      signOut(auth);
    },
    register: (email, password) =>
      createUserWithEmailAndPassword(auth, email, password),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
