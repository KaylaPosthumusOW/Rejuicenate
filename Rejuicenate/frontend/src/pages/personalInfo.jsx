import { useState, useEffect } from "react";
import PersonalOne from "../components/personal1";
import PersonalTwo from "../components/personal2";
import PersonalThree from "../components/personal3";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import "../styles/personalInfo.css";
import { useUser } from '../context/UserContext';

function PersonalInfo() {
  const [currentStep, setCurrentStep] = useState(1);
  const { user } = useUser();

  const [personalInfo, setPersonalInfo] = useState({
    userId: user ? user._id : "", // Initialize userId from context
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

  // Update userId when user changes
  useEffect(() => {
    if (user) {
      setPersonalInfo((prev) => ({
        ...prev,
        userId: user._id || prev.userId, // Only update if user._id exists
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

  // Handle changes to input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    console.log("Personal Info to Submit:", personalInfo); // Log personalInfo before submission

    // Simple validation to check if required fields are filled
    const requiredFields = ['userId', 'age', 'gender', 'occupation', 'weight', 'height', 'activityLevel', 'fastDuration', 'motivation', 'healthGoals'];
    const missingFields = requiredFields.filter(field => personalInfo[field] === undefined || personalInfo[field] === "");

    if (missingFields.length > 0) {
      console.error("Missing required fields:", missingFields);
      return; // Exit if any required field is missing
    }

    try {
      const response = await axios.post("http://localhost:5001/personalInfo/add", personalInfo); // Send personalInfo including userId
      console.log("Personal information saved successfully:", response.data);
      handleNext(); // Move to the next step after successful submission
    } catch (error) {
      console.error("Error saving personal information:", error.response.data);
    }
  };

  const animationProps = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: {
      duration: 0.5, // Half-second duration for smooth fading
      ease: "easeInOut", // Smooth easing curve
    },
  };

  return (
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
              onNext={handleSubmit} // Submit on the final step
              onPrevious={handlePrevious}
              handleInputChange={handleInputChange}
              personalInfo={personalInfo}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default PersonalInfo;
