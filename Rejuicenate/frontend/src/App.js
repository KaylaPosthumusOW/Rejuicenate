import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Importing pages
import Homepage from "./pages/homepage";
import BrowseJuices from "./pages/browseJuices";
import LogIn from "./pages/logIn";
import PersonalInfo from "./pages/personalInfo";
import SignUp from "./pages/signUp";
import AddJuice from "./pages/addJuice";
import AddCategory from "./pages/addCategory";
import JuiceRecipe from "./pages/recipe";
import { UserProvider } from "./context/UserContext";
import ProfilePage from "./pages/profile";
import Friends from "./pages/friends";


import ReviewPage from "./adminPages/reviewPage";
import UserPage from "./adminPages/userAdmin";
import EditJuices from "./adminPages/editJuice";
import AdminAddJuice from "./adminPages/addJuice";

function App() {
  return (
    <UserProvider >
      <Router>
        
        {/* Defining Routes for different pages */}
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/browseJuices" element={<BrowseJuices />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/personalInfo" element={<PersonalInfo />} />
          <Route path="/addJuice" element={<AddJuice />} />
          <Route path="/addCategory" element={<AddCategory />} />
          <Route path="/signUp" index element={<SignUp />} />
          <Route path="/juiceRecipe/:juiceId" element={<JuiceRecipe />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/friends" element={<Friends />} />


          <Route path="/admin/addJuice" element={<AdminAddJuice />} />
          <Route path="/admin/reviews" element={<ReviewPage />} />
          <Route path="/admin/users" element={<UserPage />} />
          <Route path="/admin/editJuices" element={<EditJuices />} />
        </Routes>
    </Router>
    </UserProvider>
    
  );
}

export default App;
