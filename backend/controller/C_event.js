const asynchandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const create = asynchandler(async (req, res) => {
    const {
        evnt_id,
        title,
        description,
        start_datetime,
        location,
        organizer_id,
        ticket_info, // Expecting an array of objects here
        category
    } = req.body;

    // Check if all required fields are provided
    if (
        !evnt_id ||
        !title ||
        !description ||
        !start_datetime ||
        !location ||
        !organizer_id ||
        !ticket_info ||
        !category
    ) {
        res.status(400);
        throw new Error("All fields are required");
    }

    try {
        // Check if an event with the same evnt_id, start_datetime, and location already exists
        const [rows] = await global.db.execute(
            'SELECT * FROM event WHERE evnt_id = ? AND start_datetime = ? AND location = ?',
            [evnt_id, start_datetime, location]
        );
        console.log("Rows:", rows);

        // If rows are found, the event already exists
        if (rows.length > 0) {
            res.status(400);
            throw new Error("An event with the same id, start date and time, and location already exists");
        }

        // Convert the ticket_info array to a JSON string
        const ticketInfoJSON = JSON.stringify(ticket_info);

        // Insert the new event into the database
        const [result] = await global.db.execute(
            'INSERT INTO event (evnt_id, title, description, start_datetime, location, organizer_id, ticket_info, category) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', 
            [evnt_id, title, description, start_datetime, location, organizer_id, ticketInfoJSON, category]
        );
        console.log("Insert Result:", result);

        // Check if the insertion was successful
        if (result.affectedRows > 0) {
            res.status(201).json({
                evnt_id,
                title,
                description,
                start_datetime,
                location,
                organizer_id,
                ticket_info, // Return the original array, not the JSON string
                category
            });
        } else {
            res.status(400);
            throw new Error("Event creation failed");
        }
    } catch (err) {
        console.log("Error:", err);
        res.status(500).send("Internal Server Error");
    }
});


const search_by_name = asynchandler(async (req, res) => {
    try {
        const [rows] = await global.db.execute('SELECT * FROM event WHERE title = ?', [req.params.title]);
        if (rows.length > 0) {
            res.status(200).json(rows);
        } else {
            res.status(404).json({ message: 'No events found with the specified title' });
        }
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Internal Server Error");
    }
});

const search_by_loc = asynchandler(async (req, res) => {
    try {
        const [rows] = await global.db.execute('SELECT * FROM event WHERE location = ?', [req.params.location]);
        if (rows.length > 0) {
            res.status(200).json(rows);
        } else {
            res.status(404).json({ message: 'No events found at the specified location' });
        }
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Internal Server Error");
    }
});

const search_by_date = asynchandler(async (req, res) => {
    try {
        const [rows] = await global.db.execute('SELECT * FROM event WHERE start_datetime = ?', [req.params.start_datetime]);
        if (rows.length > 0) {
            res.status(200).json(rows);
        } else {
            res.status(404).json({ message: 'No events found for the specified date and time' });
        }
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Internal Server Error");
    }
});

const search_by_category = asynchandler(async (req, res) => {
    try {
        const [rows] = await global.db.execute('SELECT * FROM event WHERE category = ?', [req.params.category]);
        if (rows.length > 0) {
            res.status(200).json(rows);
        } else {
            res.status(404).json({ message: 'No events found for the specified category' });
        }
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Internal Server Error");
    }
});

const all_Events = asynchandler(async (req, res) => {
    try {
        const [rows] = await global.db.execute('SELECT * FROM event');
        if (rows.length > 0) {
            res.status(200).json(rows);
        } else {
            res.status(404).json({ message: 'No events found' });
        }
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Internal Server Error");
    }
});

const update_event_by_id = asynchandler(async (req, res) => {
    const { evnt_id } = req.params;
    const {
        title,
        description,
        start_datetime,
        location,
        organizer_id,
        ticket_info,
        category
    } = req.body;

    try {
        const [result] = await global.db.execute(
            'UPDATE event SET title = ?, description = ?, start_datetime = ?, location = ?, organizer_id = ?, ticket_info = ?, category = ? WHERE evnt_id = ?',
            [title, description, start_datetime, location, organizer_id, JSON.stringify(ticket_info), category, evnt_id]
        );

        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Event not found' });
        } else {
            res.status(200).json({ message: 'Event updated successfully' });
        }
    } catch (err) {
        console.log("Error:", err);
        res.status(500).send("Internal Server Error");
    }
});

const delete_evnt_by_id = asynchandler(async (req, res) => {
    const { evnt_id } = req.params;

    try {
        console.log("Deleting event with ID:", evnt_id);

        const [result] = await global.db.execute('DELETE FROM event WHERE evnt_id = ?', [evnt_id]);

        console.log("Delete Result:", result);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Event not found' });
        } else {
            return res.status(200).json({ message: 'Event deleted successfully' });
        }
    } catch (error) {
        console.error("Error deleting event:", error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});




module.exports = {create,search_by_name,search_by_loc,search_by_date,search_by_category,all_Events,update_event_by_id,delete_evnt_by_id};
