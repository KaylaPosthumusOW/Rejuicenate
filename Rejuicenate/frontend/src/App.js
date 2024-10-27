import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import BasicExample from "./components/navbar";
import Homepage from "./pages/homepage";
import BrowseJuices from "./pages/browseJuices";
import LogIn from "./pages/logIn";
import PersonalInfo from "./pages/personalInfo";
import SignUp from "./pages/signUp";
import AddJuice from "./pages/addJuice";
import AddCategory from "./pages/addCategory";
import JuiceRecipe from "./pages/recipe";
import ProfilePage from "./pages/profile";
import Friends from "./pages/friends";
import ReviewPage from "./adminPages/reviewPage";
import UserPage from "./adminPages/userAdmin";
import EditJuices from "./adminPages/editJuice";
import AdminAddJuice from "./adminPages/addJuice";
import { UserProvider } from "./context/UserContext";
import TrackProgress from "./pages/trackProgress";

function App() {
  return (
    <UserProvider>
      <Router>
        <BasicExample /> {/* Navbar remains fixed at the top */}
        <div className="content-container">
          <AnimatedRoutes /> {/* Route transitions will occur here */}
        </div>
      </Router>
    </UserProvider>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <div> {/* Ensure padding aligns with navbar height */}
        <Routes location={location} key={location.key}>
          <Route path="/" element={<PageTransition><Homepage /></PageTransition>} />
          <Route path="/browseJuices" element={<PageTransition><BrowseJuices /></PageTransition>} />
          <Route path="/login" element={<PageTransition><LogIn /></PageTransition>} />
          <Route path="/personalInfo" element={<PageTransition><PersonalInfo /></PageTransition>} />
          <Route path="/addJuice" element={<PageTransition><AddJuice /></PageTransition>} />
          <Route path="/addCategory" element={<PageTransition><AddCategory /></PageTransition>} />
          <Route path="/signUp" element={<PageTransition><SignUp /></PageTransition>} />
          <Route path="/juiceRecipe/:juiceId" element={<JuiceTransition><JuiceRecipe /></JuiceTransition>} />
          <Route path="/profile" element={<PageTransition><ProfilePage /></PageTransition>} />
          <Route path="/friends" element={<PageTransition><Friends /></PageTransition>} />
          <Route path="/trackProgress" element={<PageTransition><TrackProgress /></PageTransition>} />


          <Route path="/admin/addJuice" element={<PageTransition><AdminAddJuice /></PageTransition>} />
          <Route path="/admin/reviews" element={<PageTransition><ReviewPage /></PageTransition>} />
          <Route path="/admin/users" element={<PageTransition><UserPage /></PageTransition>} />
          <Route path="/admin/editJuices" element={<PageTransition><EditJuices /></PageTransition>} />
        </Routes>
      </div>
    </AnimatePresence>
  );
}


function JuiceTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="page-transition"
    >
      {children}
    </motion.div>
  );
}

function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}  // Start 100px down
      animate={{ y: 0, opacity: 1 }}    // Move to original position
      exit={{ y: -100, opacity: 0 }}    // Move 100px up when exiting
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="page-transition"
    >
      {children}
    </motion.div>
  );
}

export default App;
