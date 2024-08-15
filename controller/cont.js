const asynchandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = asynchandler(async (req, res) => {
    const {
        user_id,
        Name,
        email,
        Ph,
        password,
        social_login_id,
        social_login_provider,
        role,
        Event_Type,
        notification
    } = req.body;

    // Check if all required fields are provided
    if (!Name || !email || !Ph || !password || !Event_Type) {
        res.status(400);
        throw new Error("Name, email, phone number, password, and Event_Type are required fields");
    }

    try {
        // Check if the user already exists by email
        const [rows] = await global.db.execute('SELECT * FROM user_info WHERE email = ?', [email]);
        console.log("Rows:", rows);

        // If rows are found, the user already exists
        if (rows.length > 0) {
            res.status(400);
            throw new Error("User already exists");
        }
        const hashpsswrd=await bcrypt.hash(password,10);
        // Insert the new user into the database
        const [result] = await global.db.execute(
            'INSERT INTO user_info (user_id,Name, email, Ph, password, social_login_id, social_login_provider, role, registration_date, Event_Type, notification) VALUES (?,?, ?, ?, ?, ?, ?, ?, NOW(), ?, ?)', 
            [user_id,Name, email, Ph, hashpsswrd, social_login_id, social_login_provider, role, Event_Type, notification]
        );
        console.log("Insert Result:", result);

        // Check if the insertion was successful
        if (result.affectedRows > 0) {
            res.status(201).json({
                user_id, // This assumes you have auto_increment on user_id
                Name,
                email,
                Ph,
                role,
                Event_Type,
                notification
            });
        } else {
            res.status(400);
            throw new Error("User registration failed");
        }
    } catch (err) {
        console.log("Error:", err);
        res.status(500).send("Internal Server Error");
    }
});

const login = asynchandler(async (req, res) => {
    const { user_id, email, password: inputPassword, Event_Type } = req.body;

    // Check if all required fields are provided
    if (!user_id || !Event_Type || !email || !inputPassword) {
        res.status(400).json({ message: "All fields are required" });
        return;
    }

    try {
        // Fetch the user based on user_id and email
        const [rows] = await global.db.execute('SELECT * FROM user_info WHERE user_id = ? AND email = ?', [user_id, email]);

        // Check if the user exists and if the password is correct
        if (rows.length === 0 || !(await bcrypt.compare(inputPassword, rows[0].password))) {
            res.status(401).json({ message: "Invalid email or password" });
            return;
        }

        // If the credentials are correct, return user data excluding the password
        const { password: _, ...userWithoutPassword } = rows[0];
        res.status(200).json(userWithoutPassword);

    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

const adminlogin = asynchandler(async (req, res) => {
    const { user_id, email, password: inputPassword } = req.body;

    // Check if all required fields are provided
    if (!user_id  || !email || !inputPassword) {
        res.status(400).json({ message: "All fields are required" });
        return;
    }

    try {
        // Fetch the user based on user_id and email
        const [rows] = await global.db.execute('SELECT * FROM user_info WHERE user_id = ? AND email = ?', [user_id, email]);

        // Check if the user exists and if the password is correct
        if (rows.length === 0 || !(await bcrypt.compare(inputPassword, rows[0].password))) {
            res.status(401).json({ message: "Invalid email or password" });
            return;
        }

        // Generate a token containing the user_id
        const token = jwt.sign(
            { user_id: rows[0].user_id },
            process.env.ACCESS_TOKEN_SECRET, // Use a strong secret key stored in environment variables
            { expiresIn: '1h' } // Set token expiration time as needed
        );

        // Return the generated token
        res.status(200).json({ token });

    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


const current = asynchandler(async (req, res) => {
    const [rows] = await global.db.execute('SELECT * FROM event_mang');
    console.log(rows); 
    console.log("jiii"); 
    res.status(200).json(rows); 
});

// const currentbyId = asynchandler(async (req, res) => {
//     const [rows] = await global.db.execute('SELECT * FROM event WHERE id = ?', [req.params.id]);
//     res.status(200).json(rows[0]);
// });

// const currentbyRole = asynchandler(async (req, res) => {
//     const [rows] = await global.db.execute('SELECT * FROM event WHERE role = ?', [req.params.role]);
//     res.status(200).json(rows);
// });

// const updtbyId = asynchandler(async (req, res) => {
//     const { id } = req.params;
//     const { name, email, phone, role, ADD, password } = req.body;
//     const [result] = await global.db.execute(
//         'UPDATE event SET name = ?, email = ?, phone = ?, role = ?, ADD = ?, password = ? WHERE id = ?',
//         [name, email, phone, role, ADD, password, id]
//     );
//     if (result.affectedRows === 0) {
//         res.status(404).json({ error: 'User not found' });
//     } else {
//         res.status(200).json({ message: 'User updated successfully' });
//     }
// });

// const dltbyId = asynchandler(async (req, res) => {
//     const { id } = req.params;
//     const [result] = await global.db.execute('DELETE FROM event WHERE id = ?', [id]);
//     if (result.affectedRows === 0) {
//         res.status(404).json({ error: 'User not found' });
//     } else {
//         res.status(200).json({ message: 'User deleted successfully' });
//     }
// });

module.exports = { register, login,adminlogin,current};
