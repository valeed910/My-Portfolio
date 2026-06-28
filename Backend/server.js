require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);
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
        const { data, error } = await resend.emails.send({
            from: "Portfolio <onboarding@resend.dev>",
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
        
        if (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: error.message
            });
}       

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