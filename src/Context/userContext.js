import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export default function UserContextProvider({ children }) {
  const [UserToken, setUserToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setUserToken(token);
    }
  }, []);


  const handleLogin = (token) => {
    localStorage.setItem('accessToken', token);
    setUserToken(token);
  };

  return (
    <UserContext.Provider value={{ UserToken, setUserToken, handleLogin }}>
      {children}
    </UserContext.Provider>
  );
}
