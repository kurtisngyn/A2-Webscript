// Importing tools and dependencies
import { useState, useEffect } from "react";
// Importing CSS files for dynamic styling
import m from './AddCandyModalContent.module.css';
import ACM from '../pages/AllCandies.module.css';

function AddCandyModalContent({ onClose, onCandyAdded }) {
    const [dbCategories, setDbCategories] = useState([]);
    const [category, setCategory] = useState("");
    const [name, setName] = useState("");
    const [image, setImage] = useState("");

    // Fetch categories from the server when the component is first rendered
    useEffect(() => {
        fetch("http://localhost:3000/categories")
            .then((response) => response.json()) // Convert to readable JSON format
            .then(responseJSON => {
                // Set the list of categories in the component's state
                setDbCategories(responseJSON);
                if (responseJSON.length > 0) {
                    // Set the first category as the default selected category
                    setCategory(responseJSON[0].id);
                }
            });
    }, []);

    // Function to handle form submission
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        // Create a FormData object to send the form data to the server
        const formData = new FormData();
        formData.append("category_id", category);
        formData.append("name", name);
        formData.append("image", image);

        // Send a request to the server to add a new candy
        const candyAPIRequest = await fetch("http://localhost:3000/candies", {
            method: "POST",
            body: formData,
        });

        const candyResult = await candyAPIRequest.json();

        // Close the modal and refresh the candies list
        onClose();
        onCandyAdded();

        console.log(candyResult); // Log the result for debugging
    };

    return (
        // Returning a container with unique CSS styling
        <div className={m["modal-container"]}>
    <div className={`${m["modal-content"]} ${ACM["candy-card"]}`}>
        <h3>Add a New Candy</h3>
        <form onSubmit={handleFormSubmit} className={ACM["form-group"]} encType="multipart/form-data">
            <label htmlFor="candyCategory">Category:</label>
            <select
                name="category"
                id="category"
                value={category}
                onChange={(event) => { setCategory(event.target.value); }}
            >
                {dbCategories && dbCategories.map((category) => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                ))}
            </select>

            <label htmlFor="candyName">Name:</label>
            <input
                type="text"
                name="name"
                id="candyName"
                value={name}
                onChange={(event) => { setName(event.target.value); }}
            />

            <label htmlFor="image">Image</label>
            <input 
                type="file" 
                name="image" 
                id="image" 
                onChange={(e) => setImage(e.target.files[0])} 
            />

            {/* Button Container */}
            <div className={m['spacer']}>
                <button className={m['close-button']} type="button" onClick={onClose}>Close</button>
                <button className={m['add-button']} type="submit">Add Candy</button>
            </div>
        </form>
    </div>
</div>

    );
}

// Exporting it so it can be used elsewhere
export default AddCandyModalContent;
