import { Outlet } from "react-router-dom";
import Header from "./components/Header";

const App = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50 to-gray-100 text-gray-900 p-8 md:p-16 lg:px-32 relative overflow-hidden">
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
