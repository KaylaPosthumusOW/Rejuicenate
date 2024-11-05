import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PersonalOne from "../components/personal1";
import PersonalTwo from "../components/personal2";
import PersonalThree from "../components/personal3";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import "../styles/personalInfo.css";
import { useUser } from '../context/UserContext';
import Footer from "../components/footer";

function PersonalInfo() {
  const [currentStep, setCurrentStep] = useState(1);
  const { user } = useUser();
  const navigate = useNavigate();

  const apiUrl = process.env.REACT_APP_API_URL;

  const [personalInfo, setPersonalInfo] = useState({
    userId: user ? user._id : "",
    age: "",
    gender: "",
    occupation: "",
    weight: "",
    height: "",
    activityLevel: "",
    stressLevel: "",
    allergies: "",
    medications: "",
    healthGoals: "",
    fastDuration: "",
    motivation: "",
    healthConditions: "",
  });

  useEffect(() => {
    if (user) {
      setPersonalInfo((prev) => ({
        ...prev,
        userId: user._id || prev.userId,
      }));
    }
  }, [user]);

  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategoriesChange = (newCategories) => {
    setSelectedCategories(newCategories);
  };

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Personal Info to Submit:", personalInfo);

    const requiredFields = ['userId', 'age', 'gender', 'occupation', 'weight', 'height', 'activityLevel', 'fastDuration', 'motivation', 'healthGoals'];
    const missingFields = requiredFields.filter(field => !personalInfo[field]);

    if (missingFields.length > 0) {
      console.error("Missing required fields:", missingFields);
      return;
    }

    try {
      const response = await axios.post(`${apiUrl}/personalInfo/add`, personalInfo);
      console.log("Personal information saved successfully:", response.data);

      // Navigate to home page after successful save
      navigate('/homepage');
    } catch (error) {
      console.error("Error saving personal information:", error.response?.data || error.message);
    }
  };

  const animationProps = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  };

  return (
    <>
    <div className="personal-container">
      <AnimatePresence>
        {currentStep === 1 && (
          <motion.div key="personal-one" {...animationProps}>
            <PersonalOne
              onNext={handleNext}
              handleInputChange={handleInputChange}
              personalInfo={personalInfo}
            />
          </motion.div>
        )}
        {currentStep === 2 && (
          <motion.div key="personal-two" {...animationProps}>
            <PersonalTwo
              onNext={handleNext}
              onPrevious={handlePrevious}
              handleInputChange={handleInputChange}
              onCategoriesChange={handleCategoriesChange}
              personalInfo={personalInfo}
            />
          </motion.div>
        )}
        {currentStep === 3 && (
          <motion.div key="personal-three" {...animationProps}>
            <PersonalThree
              onNext={handleSubmit} 
              onPrevious={handlePrevious}
              handleInputChange={handleInputChange}
              personalInfo={personalInfo}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    
    <Footer />
    </>
  );
}

export default PersonalInfo;
