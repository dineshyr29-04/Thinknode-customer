import { createContext, useState, useContext, useMemo } from 'react';

const NavbarContext = createContext();

export function NavbarProvider({ children }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const value = useMemo(() => ({ isExpanded, setIsExpanded }), [isExpanded]);

  return (
    <NavbarContext.Provider value={value}>
      {children}
    </NavbarContext.Provider>
  );
}

export function useNavbar() {
  const context = useContext(NavbarContext);
  if (!context) throw new Error('useNavbar must be used within a NavbarProvider');
  return context;
}
