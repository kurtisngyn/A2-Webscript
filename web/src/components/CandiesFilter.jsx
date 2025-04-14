import { useState, useEffect } from 'react';

// Importing candies filter component CSS
import CFC from '../components/CandiesFilter.module.css';

function CandiesFilter({ updateCandies }) {
    // Setting up state to store the list of categories from the database
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // Fetching the categories from the server
        fetch("http://localhost:3000/categories")
            .then((response) => response.json()) // Convert response to JSON
            .then(data => {
                setCategories(data); // Update state with fetched categories
            });
        // Empty dependency array = runs once when component mounts
    }, []);

    // Function to handle form submission when filters are applied
    const handleFilterSubmit = (event) => {
        // Prevent default form submission behavior
        event.preventDefault();

        // Create a FormData object to get the selected categories
        const filterFormData = new FormData(event.target);
        const selectedCategories = filterFormData.getAll("categories");

        const queryStringArray = selectedCategories.map((id) => `categories=${id}`);
        const queryString = queryStringArray.join("&");

        // Fetch filtered candies from the server based on the selected categories
        fetch(`http://localhost:3000/candies?${queryString}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt-token')}`
            }
        })
        
            .then((response) => response.json())
            .then((data) => {
                updateCandies(data);
            });
        
    };

    return (
        // Container for the filter section, styled with CSS module
        <div className={CFC['filters-container']}>
            <form onSubmit={handleFilterSubmit}>
                <h4>Categories</h4>
                {/* Mapping through the list of categories to create checkboxes */}
                {categories.map(category => {
                    return (
                        <label key={category.id}>
                            <input type="checkbox" name="categories" value={category.id} />
                            {category.name}
                        </label>
                    );
                })}
                {/* Submit button to apply the selected filters */}
                <input type="submit" value="Apply" />
            </form>
        </div>
    );
}

// Exporting it so it can be used elsewhere
export default CandiesFilter;
