import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import axios from 'axios';
import PrimaryBtn from '../Buttons/primaryBtn';

function Filter() {
  const [show, setShow] = useState(false);
  const [categories, setCategories] = useState([]); // State to hold categories

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Fetch categories from the backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5001/categories'); // Update with your categories endpoint
        setCategories(response.data); // Assuming response.data is an array of categories
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <>
      <PrimaryBtn variant="primary" onClick={handleShow} label="Filter Categories">
      </PrimaryBtn>

      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filter by Category</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul>
            {categories.map((category) => (
              <li key={category._id}>
                <Button variant="link" onClick={() => handleFilter(category._id)}>
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

// Function to handle filtering by category
const handleFilter = (categoryId) => {
  // Implement your filtering logic here
  console.log("Filtering by category ID:", categoryId);
};

export default Filter;
