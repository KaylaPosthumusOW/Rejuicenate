import React, { useState, useEffect } from "react"; 
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import '../styles/addJuice.css';
import PrimaryBtn from "../Buttons/primaryBtn";

function AddJuiceComponent() {
  const [juiceName, setJuiceName] = useState('');
  const [ingredients, setIngredients] = useState(['']); 
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [instructions, setInstructions] = useState(['']); 
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state to disable form during submission

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5001/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Handler to add a new empty field for ingredients or instructions
  const addNewField = (setFunction, fieldArray) => {
    setFunction([...fieldArray, '']);
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('juiceName', juiceName);
    formData.append('ingredients', JSON.stringify(ingredients)); 
    formData.append('instructions', JSON.stringify(instructions)); 
    formData.append('category_id', selectedCategory);
    formData.append('image', image); 

    try {
      const response = await axios.post('http://localhost:5001/juices/add', formData);
      console.log('Juice added:', response.data);

      // Reset the form after successful submission
      setJuiceName('');
      setIngredients(['']);
      setInstructions(['']);
      setSelectedCategory('');
      setImage('');
    } catch (error) {
      console.error('Error adding juice:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form">
        <h2>Add the New Juice Recipe</h2>
        <p>Contribute to our collection of delicious and nutritious juice recipes by filling out the form below.</p>
        
              
        <Form  onSubmit={handleSubmit}>
          {/* Juice Name */}
          <Form.Group className="mb-3">
            <Form.Label>Juice Name</Form.Label>
            <Form.Control
              type="text"
              style={{ border: '2px solid #397051' }}
              value={juiceName}
              onChange={(e) => setJuiceName(e.target.value)}
              placeholder="Enter a catchy name for your juice"
              required
            />
          </Form.Group>

          {/* Ingredients Section */}
          <Form.Group className="mb-3">
            <Form.Label>Ingredients</Form.Label>
            {ingredients.map((ingredient, index) => (
              <div key={index} className="mb-2">
                <Form.Control
                  type="text"
                  style={{ border: '2px solid #397051' }}
                  value={ingredient}
                  onChange={(e) => {
                    const newIngredients = [...ingredients];
                    newIngredients[index] = e.target.value;
                    setIngredients(newIngredients);
                  }}
                  placeholder={`Ingredient ${index + 1}`}
                  required
                />
              </div>
            ))}
            <Button variant="outline-secondary" className="addButton" onClick={() => addNewField(setIngredients, ingredients)}>
            <small>+ Add Ingredient</small> 
            </Button>
          </Form.Group>

          {/* Instructions Section */}
          <Form.Group className="mb-3">
            <Form.Label>Instructions</Form.Label>
            {instructions.map((instruction, index) => (
              <div key={index} className="mb-2">
                <Form.Control
                  type="text"
                  value={instruction}
                  style={{ border: '2px solid #397051' }}
                  onChange={(e) => {
                    const newInstructions = [...instructions];
                    newInstructions[index] = e.target.value;
                    setInstructions(newInstructions);
                  }}
                  placeholder={`Step ${index + 1}`}
                  required
                />
              </div>
            ))}
            <Button variant="outline-secondary" className="addButton" onClick={() => addNewField(setInstructions, instructions)}>
             <small>+ Add Instruction</small> 
            </Button>
          </Form.Group>

          {/* Category Dropdown */}
          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Control
              as="select"
              value={selectedCategory}
              style={{ border: '2px solid #397051' }}
              onChange={(e) => setSelectedCategory(e.target.value)}
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.category}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          {/* Image Upload */}
          <Form.Group className="mb-3">
            <Form.Label>Upload Image</Form.Label>
            <Form.Control type="file" onChange={(e) => setImage(e.target.files[0])} style={{ border: '2px solid #397051' }} />
          </Form.Group>

          {/* Submit Button */}
          <PrimaryBtn variant="primary" label="Submit" type="submit" disabled={loading}>
          </PrimaryBtn>
        </Form>
    </div>
  );
}

export default AddJuiceComponent;
