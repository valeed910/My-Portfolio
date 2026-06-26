require("dotenv").config();

const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Add this
app.get("/", (req, res) => {
    res.send("THIS IS MY NEW BACKEND 123456");
});
app.post("/api/contact", async (req, res) => {

    console.log("POST /api/contact HIT");

    try {

        const { name, email, subject, message } = req.body;

        if (!name || !email || !subject || !message) {

            return res.status(400).json({
                success: false,
                message: "Please fill all fields."
            });

        }

        await transporter.sendMail({

            from: process.env.EMAIL_USER,

            to: process.env.EMAIL_USER,

            replyTo: email,

            subject: `Portfolio Contact - ${subject}`,

            html: `
                <h2>New Portfolio Message</h2>

                <p><b>Name:</b> ${name}</p>

                <p><b>Email:</b> ${email}</p>

                <p><b>Subject:</b> ${subject}</p>

                <p><b>Message:</b></p>

                <p>${message}</p>
            `

        });

        res.json({
            success: true
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            success: false
        });

    }

});

const PORT = process.env.PORT || 5000;
app.get("/test", (req, res) => {
    res.send("TEST ROUTE WORKING");
});
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});