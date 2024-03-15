import React, { createContext, useState, useEffect } from "react";
export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState("");
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const updateUser = (newUser) => {
    setUser(newUser);
    localStorage.setItem("user", newUser);
  };
  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
