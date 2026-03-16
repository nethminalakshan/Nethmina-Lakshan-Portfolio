import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import AppRoutes from "./routes/AppRoutes";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();

  return (
    <div className="page" id="top">
      <Navbar />
      <main key={location.pathname} className="pageMain">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
}

export default App;
