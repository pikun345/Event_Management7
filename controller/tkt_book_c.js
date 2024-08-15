const asynchandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const see_attende = asynchandler(async (req, res) => {
    const { evnt_id } = req.params;

    // Check if the evnt_id is provided
    if (!evnt_id) {
        res.status(400);
        throw new Error("Event ID is required");
    }

    try {
        // Perform a join operation across the tickets, user_info, and event tables
        const [rows] = await global.db.execute(
            `SELECT u.Name as user_name, e.title as event_title, e.location as event_location
             FROM tickets t
             JOIN user_info u ON t.user_id = u.user_id
             JOIN event e ON t.evnt_id = e.evnt_id
             WHERE t.evnt_id = ?`,
            [evnt_id]
        );

        // Check if any records were found
        if (rows.length > 0) {
            res.status(200).json(rows);
        } else {
            res.status(404);
            throw new Error("No attendees found for this event");
        }
    } catch (err) {
        console.log("Error:", err);
        res.status(500).send("Internal Server Error");
    }
});





const purchase_ticket = asynchandler(async (req, res) => {
    const { ticket_id, evnt_id, user_id, ticket_type, price, purchase_date } = req.body;

    // Check if all required fields are provided
    if (!ticket_id || !evnt_id || !user_id || !ticket_type || !price || !purchase_date) {
        res.status(400);
        throw new Error("Ticket ID, Event ID, User ID, Ticket Type, Price, and Purchase Date are required fields");
    }

    try {
        // Insert the new ticket into the tickets table
        const [result] = await global.db.execute(
            'INSERT INTO tickets (ticket_id, evnt_id, user_id, ticket_type, price, purchase_date, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [ticket_id, evnt_id, user_id, ticket_type, price, purchase_date, 'active']
        );

        // Check if the insertion was successful
        if (result.affectedRows > 0) {
            res.status(201).json({
                ticket_id, 
                evnt_id,
                user_id,
                ticket_type,
                price,
                purchase_date,
                status: 'active'
            });
        } else {
            res.status(400);
            throw new Error("Ticket purchase failed");
        }
    } catch (err) {
        console.log("Error:", err);
        res.status(500).send("Internal Server Error");
    }
});


const cancel_ticket = asynchandler(async (req, res) => {
    const { ticket_id } = req.params;
    console.log("tkt id=",ticket_id);
    // Check if the ticket_id is provided
    if (!ticket_id) {
        res.status(400);
        throw new Error("Ticket ID is required");
       
    }
console.log("tkt id=",ticket_id);
    try {
        // Update the ticket status to "cancelled"
        const [result] = await global.db.execute(
            'UPDATE tickets SET status = ? WHERE ticket_id = ?',
            ['cancelled', ticket_id]
        );

        // Check if the update was successful
        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Ticket cancelled successfully' });
        } else {
            res.status(404);
            throw new Error("Ticket not found");
        }
    } catch (err) {
        console.log("Error:", err);
        res.status(500).send("Internal Server Error");
    }
});



module.exports = { purchase_ticket,cancel_ticket,see_attende};
