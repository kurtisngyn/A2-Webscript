const express = require("express");
const categoriesRouter = express.Router();
const db = require("../db");

// Route to get all categories
categoriesRouter.get("/", (req, res) => {
    // SQL query to fetch all categories from the database
    const sql = "SELECT * FROM categories";

    // Execute the query
    db.query(sql, (err, results) => {
        // If there's an error, send back an error message
        if (err) {
            res.status(500).send(err);
            return;
        }
        // Send back the results in JSON format
        res.json(results);
    });
});

// Export the router to be used elsewhere
module.exports = categoriesRouter;
