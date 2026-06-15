const dotenv = require("dotenv")
dotenv.config();

const express = require("express")
const app = express()

const mongoose = require("mongoose");

const helmet = require("helmet");
const compression = require("compression");
const cors = require("cors");

// middleware
app.use(helmet());
app.use(compression());
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());


//routes
const authRoutes = require("./routes/authRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const projectRoutes = require("./routes/projectRoutes");
const testimonialRoutes = require("./routes/testimonialRoutes");
const contactRoutes = require("./routes/contactRoutes");

const HOST = '127.0.0.1'
const PORT = process.env.PORT || 5000;

const connection = require("./config/db")

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/contacts", contactRoutes);

app.get("/",(req,res)=>{
    res.send("<h1>home page </h1>")
})

app.use((err, req, res, next) => {
  console.error("ERROR:", err);
  res.status(500).json({ 
    message: err.message,
  });
});


app.listen(PORT,HOST,()=>{
    console.log(`server is running on http://${HOST}:${PORT}`);
    
})