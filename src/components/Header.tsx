import { IconSearch } from "@tabler/icons-react";
import UnitToggle from "./UnitToggle";

interface HeaderProps {
  pageName: string;
}

const Header = ({ pageName }: HeaderProps) => {
  return (
    <header className="flex flex-col sm:flex-row justify-between items-center mb-10 space-y-4 sm:space-y-0">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
        {pageName}
      </h1>

      <div className="flex items-center space-x-4 w-full sm:w-auto">
        {/* Search Bar */}
        <div className="relative grow sm:grow-0">
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 w-full sm:w-64 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-neutral-800"
          />
          <IconSearch className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
        </div>

        <UnitToggle />
      </div>
    </header>
  );
};

export default Header;
