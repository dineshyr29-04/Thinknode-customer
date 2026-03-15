import { createContext, useState } from 'react';

export const NavbarContext = createContext();

export function NavbarProvider({ children }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <NavbarContext.Provider value={{ isExpanded, setIsExpanded }}>
      {children}
    </NavbarContext.Provider>
  );
}
