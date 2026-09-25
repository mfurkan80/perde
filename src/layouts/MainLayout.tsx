import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

const MainLayout = () => {
  return (
    <div className="bg-gray-950 text-white min-h-screen flex flex-col">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-6 w-full flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
