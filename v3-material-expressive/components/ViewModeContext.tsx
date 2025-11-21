
import React, { createContext, useContext, useState, useEffect } from 'react';

interface ViewModeContextType {
  isRecruiterMode: boolean;
  toggleMode: () => void;
}

const ViewModeContext = createContext<ViewModeContextType | undefined>(undefined);

export const ViewModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isRecruiterMode, setIsRecruiterMode] = useState(false);

  const toggleMode = () => {
    setIsRecruiterMode(prev => !prev);
  };

  return (
    <ViewModeContext.Provider value={{ isRecruiterMode, toggleMode }}>
      {children}
    </ViewModeContext.Provider>
  );
};

export const useViewMode = () => {
  const context = useContext(ViewModeContext);
  if (!context) throw new Error("useViewMode must be used within a ViewModeProvider");
  return context;
};
