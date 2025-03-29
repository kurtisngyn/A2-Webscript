// Importing dependencies
import { useState, useEffect } from "react";
import React from 'react';

// Importing components
import AddCandyModal from '../components/AddCandyModal';
import CandiesFilter from "../components/CandiesFilter";
import DeleteCandyModal from "../components/DeleteCandyModal";
import UpdateCandyModal from "../components/UpdateCandyModal";

// Importing styling
import ACM from '../pages/AllCandies.module.css';

function AllCandies() {
    // State to store candies data
    const [candies, setCandies] = useState([]);

    // Function to fetch candies from the API
    const fetchCandies = async () => {
        // Fetch candies from the backend API
        fetch('http://localhost:3000/candies/')
            .then(response => response.json()) // Convert response to JSON
            .then(data => setCandies(data));  // Update state with fetched data
    };

    // Function to update candies state when candies are filtered
    const handleUpdatedCandies = (candiesArray) => {
        setCandies(candiesArray);
    };

    // Fetch candies when the component mounts
    useEffect(() => {
        fetchCandies();
    }, []);

    return (
        <div className={ACM['candies-container']}>
            {/* Filter and Add Candy Buttons Section */}
            <div className={ACM['button-container']}>
                <AddCandyModal onCandyAdded={fetchCandies} />
                <CandiesFilter updateCandies={handleUpdatedCandies} />
            </div>

            {/* Candies display grid */}
            <div className={ACM['candies-grid']}>
                {candies.map(candy => {
                    return (
                        <div key={candy.id} className={ACM['candy-card']}>
                            {/* Candy image with alt tags */}
                            <img 
                                src={`http://localhost:3000/images/${candy.image_name}`} 
                                alt={`${candy.name} - ${candy.category}`} 
                            />
                            {/* Name of the candy */}
                            <h5>{candy.name}</h5>
                          
                            {/* Category name */}
                            <p>{candy.category}</p>
                            <br />
                            {/* Update candy modal */}
                            <UpdateCandyModal onCandyUpdated={fetchCandies} candy={candy} />
                            {/* Delete candy modal */}
                            <DeleteCandyModal onCandyDeleted={fetchCandies} candy={candy} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default AllCandies;
