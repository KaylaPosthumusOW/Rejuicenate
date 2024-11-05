import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import BasicExample from "./components/navbar"; // Assuming this will now include admin links
import Homepage from "./pages/homepage";
import BrowseJuices from "./pages/browseJuices";
import LogIn from "./pages/logIn";
import PersonalInfo from "./pages/personalInfo";
import SignUp from "./pages/signUp";
import AddJuice from "./pages/addJuice";
import AddCategory from "./pages/addCategory";
import JuiceRecipe from "./pages/recipe";
import ProfilePage from "./pages/profile";
import ReviewPage from "./adminPages/reviewPage";
import UserPage from "./adminPages/userAdmin";
import EditJuices from "./adminPages/editJuice";
import AdminAddJuice from "./adminPages/addJuice";
import { UserProvider } from "./context/UserContext"; 
import TrackProgress from "./pages/trackProgress";
import PrivateRoute from "./components/privateRoute";
import AdminContainer from "./components/adminContainer"; // Import your AdminContainer

function App() {
  return (
    <UserProvider>
      <Router>
        <BasicExample />
        <div className="content-container">
          <AnimatedRoutes />
        </div>
      </Router>
    </UserProvider>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <div>
        <Routes location={location} key={location.key}>
          {/* User Routes */}
          <Route path="/" element={<PageTransition><SignUp /></PageTransition>} />

          {/* Additional Routes */}
          <Route path="/homepage" element={<PageTransition><Homepage /></PageTransition>} />
          <Route path="/browseJuices" element={<PageTransition><BrowseJuices /></PageTransition>} />
          <Route path="/login" element={<PageTransition><LogIn /></PageTransition>} />
          <Route path="/personalInfo" element={<PageTransition><PersonalInfo /></PageTransition>} />
          <Route path="/addJuice" element={<PageTransition><AddJuice /></PageTransition>} />
          <Route path="/addCategory" element={<PageTransition><AddCategory /></PageTransition>} />
          <Route path="/signUp" element={<PageTransition><SignUp /></PageTransition>} />
          <Route path="/juiceRecipe/:juiceId" element={<JuiceTransition><JuiceRecipe /></JuiceTransition>} />
          <Route path="/profile" element={<PageTransition><ProfilePage /></PageTransition>} />
          <Route path="/trackProgress" element={<PageTransition><TrackProgress /></PageTransition>} />

          {/* Admin Routes Wrapped in AdminContainer */}
          <Route 
            path="/admin/addJuice" 
            element={
              <PrivateRoute adminOnly={true}>
                <AdminContainer><PageTransition><AdminAddJuice /></PageTransition></AdminContainer>
              </PrivateRoute>
            } 
          />
          <Route 
            path="/admin/reviews" 
            element={
              <PrivateRoute adminOnly={true}>
                <AdminContainer><PageTransition><ReviewPage /></PageTransition></AdminContainer>
              </PrivateRoute>
            } 
          />
          <Route 
            path="/admin/users" 
            element={
              <PrivateRoute adminOnly={true}>
                <AdminContainer><PageTransition><UserPage /></PageTransition></AdminContainer>
              </PrivateRoute>
            } 
          />
          <Route 
            path="/admin/editJuices" 
            element={
              <PrivateRoute adminOnly={true}>
                <AdminContainer><PageTransition><EditJuices /></PageTransition></AdminContainer>
              </PrivateRoute>
            } 
          />
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
      initial={{ y: 100, opacity: 0 }} 
      animate={{ y: 0, opacity: 1 }} 
      exit={{ y: -100, opacity: 0 }}  
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="page-transition"
    >
      {children}
    </motion.div>
  );
}

export default App;
