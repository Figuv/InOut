import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [globalData, setGlobalData] = useState(null);

  const storeGlobalData = (data) => {
    setGlobalData(data);
  };

  return (
    <AppContext.Provider value={{ globalData, storeGlobalData }}>
      {children}
    </AppContext.Provider>
  );
};
