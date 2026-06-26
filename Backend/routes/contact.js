app.post("/api/contact",async(req,res)=>{
    console.log("===== CONTACT ROUTE HIT =====");
        console.log(req.body);
    try{

        const {name,email,subject,message}=req.body;

        await transporter.sendMail({

            from:process.env.EMAIL_USER,

            to:process.env.EMAIL_USER,

            replyTo:email,

            subject:`Portfolio Contact : ${subject}`,

            html:`

            <h2>New Portfolio Message</h2>

            <hr>

            <p><b>Name:</b> ${name}</p>

            <p><b>Email:</b> ${email}</p>

            <p><b>Subject:</b> ${subject}</p>

            <p><b>Message:</b></p>

            <p>${message}</p>

            `

        });

        res.json({

            success:true

        });

    }

    catch(err){

        console.log(err);

        res.status(500).json({

            success:false

        });

    }

});