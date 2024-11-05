import React, { useState } from "react";
import axios from "axios";
import NavBar from "../components/navbar";

function AddCategory() {
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState(""); // Add description state
  const [dietaryMods, setDietaryMods] = useState("");
  const [generalRecs, setGeneralRecs] = useState("");

  const apiUrl = process.env.REACT_APP_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/categories/add`, {
        category,
        description, // Include description in the request
        dietaryMods,
        generalRecs,
      });
      alert("Category added successfully!");
      // Clear form fields after successful submission
      setCategory("");
      setDescription("");
      setDietaryMods("");
      setGeneralRecs("");
    } catch (error) {
      console.error("Error adding category:", error);
      alert("Failed to add category. Please try again.");
    }
  };

  return (
    <div>
      <NavBar />
      <div>
        <h2>Add Health Information</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Category Name:
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Enter category name"
              required
            />
          </label>
          <br />

          <label>
            Description:
            <input
              type="text"
              value={description} // Use description state
              onChange={(e) => setDescription(e.target.value)} // Update description state
              placeholder="Enter category description"
              required
            />
          </label>
          <br />

          <label>
            Dietary Modifications:
            <textarea
              value={dietaryMods}
              onChange={(e) => setDietaryMods(e.target.value)}
              placeholder="Enter dietary modifications"
              required
            />
          </label>
          <br />

          <label>
            General Recommendations:
            <textarea
              value={generalRecs}
              onChange={(e) => setGeneralRecs(e.target.value)}
              placeholder="Enter general recommendations"
              required
            />
          </label>
          <br />

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default AddCategory;
