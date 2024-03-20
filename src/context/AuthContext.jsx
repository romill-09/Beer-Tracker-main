import React, { useContext, useState, useEffect } from "react";
import { auth } from "../config/firebase";


const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [updateCurrentUser, setCurretnUser] = useState()
  const [loading, setLoading] = useState(true)

  function signup(userName, password) {
    return auth.createUserwithUserNameAndPassword(userName, password);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChange((user) => {
      setCurretnUser(user)
      setLoading(false)
    })

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
  };
  return (
  <AuthContext.Provider value={value}>
    {!loading && childdren}
  </AuthContext.Provider>
  )
}
