import { useNavbar } from '../context/NavbarContext';

export default function MainContent({ children }) {
  const { isExpanded } = useNavbar();

  return (
    <div
      className={`transition-all duration-300 ease-in-out mt-16 lg:mt-0 full-bleed parallax-surface min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 ${
        isExpanded ? 'lg:ml-64' : 'lg:ml-20'
      }`}
    >
      {children}
    </div>
  );
}
