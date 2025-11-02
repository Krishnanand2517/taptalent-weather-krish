import UnitToggle from "./UnitToggle";
import SearchBar from "./SearchBar";

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
        <SearchBar />
        <UnitToggle />
      </div>
    </header>
  );
};

export default Header;
