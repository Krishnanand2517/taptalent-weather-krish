import { Outlet } from "react-router-dom";
import Header from "./components/Header";

const App = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50 to-gray-100 text-gray-900 p-8 md:p-16 lg:px-32 relative overflow-hidden">
      {/* Decorative background shapes */}
      <div className="-z-10 absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-20 right-10 w-64 h-64 bg-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-300 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-200 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        <Header />

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default App;
