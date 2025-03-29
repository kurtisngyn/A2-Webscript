const express = require("express");
const db = require("../db");
const upload = require("../storage");

const candiesRouter = express.Router();

// Get all candies with optional filtering by categories
candiesRouter.get("/", (req, res) => {
    // Get the categories query parameter
    const categories = req.query.categories;

    let sql = `
    SELECT candies.*, categories.name AS category
    FROM candies
    JOIN categories ON candies.category_id=categories.id`;

    const queryParams = [];

    if (categories) {
        // Filter candies by category IDs
        sql += ` WHERE categories.id IN (?)`;
        if (Array.isArray(categories)) {
            queryParams.push(...categories);
        } else {
            queryParams.push(categories);
        }
    }

    db.query(sql, [queryParams], (err, results) => {
        if (err) {
            // Send error response if there's an error
            res.status(500).send(err);
            return;
        }
        // Send the candies as JSON response
        res.json(results);
    });
});

// Add a new candy
candiesRouter.post("/", upload.single("image"), (req, res) => {
    // Get category ID and name from request body
    const { category_id, name } = req.body;
    // Get the filename of the uploaded image
    const image_name = req.file.filename;

    const addCandySQL = `INSERT INTO candies (category_id, name, image_name) VALUES (?,?,?)`;
    db.query(addCandySQL, [category_id, name, image_name], (err, results) => {
        if (err) {
            console.log(err);
            // Send error response if there's an error
            return res.status(500).send("An error has occurred!");
        }
        // Send success response
        res.status(200).json({ message: "Candy added successfully!" });
    });
});

// Delete a candy by ID
candiesRouter.delete("/:id", (req, res) => {
    // Get the candy ID from the request parameters
    const id = req.params.id;
    const sql = `DELETE FROM candies WHERE id = ? LIMIT 1`;
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.log(err);
            // Send error response if there's an error
            res.status(500).send("Internal Server Error");
            return;
        }
        
        // Check if a row was actually deleted
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Candy not found" });
        }

        // Send success response if deletion is successful
        res.status(200).json({ message: "Candy Removed" });
    });
});


// Update a candy by ID
candiesRouter.put("/:id", upload.single("image"), (req, res) => {
    // Get the candy ID from the request parameters
    const { id } = req.params;
    // Get category ID and name from request body
    const { category_id, name } = req.body;

    let updateCandySQL = `UPDATE candies SET name = ?, category_id = ?`;

    const queryParams = [name, category_id];

    if (req.file) {
        // Update the image name if a new image is uploaded
        updateCandySQL += `, image_name = ?`;
        queryParams.push(req.file.filename);
    }

    updateCandySQL += ` WHERE id = ? LIMIT 1`;
    queryParams.push(id);

    db.query(updateCandySQL, queryParams, (err, results) => {
        if (err) {
            console.log(err);
            // Send error response if there's an error
            return res.status(500).send("Internal Server Error");
        }
        // Send success response
        res.json({ message: "Candy updated successfully!" });
    });
});

module.exports = candiesRouter;
