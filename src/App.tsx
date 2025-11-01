import { useState } from "react";
import { Outlet } from "react-router-dom";
import { IconSearch } from "@tabler/icons-react";

const App = () => {
  const [unit, setUnit] = useState("C");

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50 to-gray-100 text-gray-900 p-8 md:p-16 lg:px-32 relative overflow-hidden">
      {/* Decorative background shapes */}
      <div className="-z-10 absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-20 right-10 w-64 h-64 bg-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-300 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-200 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-center mb-10 space-y-4 sm:space-y-0">
          <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>

          <div className="flex items-center space-x-4 w-full sm:w-auto">
            {/* Search Bar */}
            <div className="relative grow sm:grow-0">
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 w-full sm:w-64 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
              <IconSearch className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            </div>

            {/* C/F Toggle */}
            <div className="flex items-center bg-gray-200 rounded-full p-1">
              <button
                onClick={() => setUnit("C")}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  unit === "C"
                    ? "bg-white text-gray-900 shadow"
                    : "text-gray-600"
                }`}
              >
                °C
              </button>
              <button
                onClick={() => setUnit("F")}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  unit === "F"
                    ? "bg-white text-gray-900 shadow"
                    : "text-gray-600"
                }`}
              >
                °F
              </button>
            </div>
          </div>
        </header>

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default App;
