import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import axios from 'axios';
import PrimaryBtn from '../Buttons/primaryBtn';
import "../styles/filter.css"

function Filter({ onFilterChange }) {
  const [show, setShow] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(new Set());

  const apiUrl = process.env.REACT_APP_API_URL;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Fetch categories from the backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${apiUrl}/categories`); // Your categories endpoint
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Handle category selection
  const handleFilter = (categoryId) => {
    const newSelectedCategories = new Set(selectedCategories);
    if (newSelectedCategories.has(categoryId)) {
      newSelectedCategories.delete(categoryId); // Deselect if already selected
    } else {
      newSelectedCategories.add(categoryId); // Select the category
    }
    setSelectedCategories(newSelectedCategories);
    onFilterChange(Array.from(newSelectedCategories)); // Pass selected categories back to parent

    handleClose(); // Close the offcanvas after selecting a category
  };

  return (
    <>
      <PrimaryBtn variant="primary" onClick={handleShow} label="Filter Categories" />
      <Offcanvas show={show} onHide={handleClose} placement="end" className="filter" style={{ width: '300px' }}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title><h3>Filter by Category</h3></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul>
            {categories.map((category) => (
              <li key={category._id}>
                <Button
                  variant={selectedCategories.has(category._id) ? 'primary' : 'link'}
                  onClick={() => handleFilter(category._id)}
                >
                  {category.category}
                </Button>
              </li>
            ))}
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Filter;
