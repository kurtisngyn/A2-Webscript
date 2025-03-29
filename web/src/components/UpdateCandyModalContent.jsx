// Importing necessary tools and dependencies
import React, { useState, useEffect } from "react";
// Importing styles
import ACM from '../pages/AllCandies.module.css';
import updateCandyModalContentCSS from './UpdateCandyModalContent';

// Defining the UpdateCandyModalContent component
function UpdateCandyModalContent({ onCandyUpdated, candy, onClose }) {
    // State variables for form fields
    const [category, setCategory] = useState(candy.category_id);
    const [dbCategories, setDbCategories] = useState([]);
    const [name, setName] = useState(candy.name);
    const [image, setImage] = useState(null);

    // Handling form submission
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();

        formData.append("category_id", category);
        formData.append("name", name);
        formData.append("image", image);

        // API source from database based on the unique candy ID
        const candyResponse = await fetch(`http://localhost:3000/candies/${candy.id}`, {
            method: "PUT", // PUT method for updating candy details
            body: formData,
        });

        onCandyUpdated(); // Refresh candies list after update
        onClose(); // Close the modal
    };

    useEffect(() => {
        // Fetching categories from API from our database
        fetch("http://localhost:3000/categories")
            .then((res) => res.json()) // Convert response to readable JSON
            .then((data) => {
                setDbCategories(data); // Update state with fetched categories
                if (data.length > 0 && !category) {
                    setCategory(data[0].id); // Default to the first category if none is selected
                }
            });
    }, []);

    return (
        <div className={updateCandyModalContentCSS['modal-content']}>
        <h3>Edit Candy</h3>
        {/* Form for updating candy details */}
        <form onSubmit={handleFormSubmit} encType="multipart/form-data">
            <div>
                <div className={updateCandyModalContentCSS['form-group']}>
                    {/* Category selection */}
                    <label htmlFor="category">Category</label>
                    <select
                        name="category"
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        {dbCategories && dbCategories.map((category) => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div>
                <div className={updateCandyModalContentCSS['form-group']}>
                    {/* Candy name input */}
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
            </div>
            <div>
                <div className={updateCandyModalContentCSS['form-group']}>
                    {/* Image upload */}
                    <label>Current Image</label>
                    <img 
                        src={`http://localhost:3000/images/${candy.image_name}`} 
                        alt="Current" 
                        className={updateCandyModalContentCSS['image']}  // Updated to use the new CSS module class
                    />
                    <label htmlFor="image">Upload New Image</label>
                    <input
                        type="file"
                        name="image"
                        id="image"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </div>
            </div>
            <div>
                {/* Save button with unique styling */}
                <button className={updateCandyModalContentCSS.button} type="submit">Save</button>
            </div>
        </form>
        {/* Close button */}
        <button className={updateCandyModalContentCSS['close-button']} onClick={onClose}>&times;</button>
    </div>
    
    );
}

export default UpdateCandyModalContent;
