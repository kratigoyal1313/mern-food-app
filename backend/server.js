const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Serve static files for images
app.use('/uploads', express.static('uploads'));

// ✅ Setup Multer for file uploads
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// ✅ Define Food Schema
const FoodSchema = new mongoose.Schema({
  name: String,
  price: Number,
  restaurant: String,
  image: String // ✅ Ensure image field is here
});
const Food = mongoose.model('Food', FoodSchema);

// ✅ Route to Add Food with Image Upload
app.post('/add-food', upload.single('image'), async (req, res) => {
  try {
    const food = new Food({
      name: req.body.name,
      price: req.body.price,
      restaurant: req.body.restaurant,
      image: req.file ? `/uploads/${req.file.filename}` : null // ✅ Save image path
    });
    await food.save();
    res.status(201).send(food);
  } catch (error) {
    res.status(500).send({ message: '❌ Error adding food', error });
  }
});

// ✅ Get All Foods
app.get('/foods', async (req, res) => {
  const foods = await Food.find();
  res.send(foods);
});

const fs = require('fs'); // ✅ Import File System module

// ✅ DELETE API: Remove food item + delete image from uploads folder
app.delete('/delete-food/:id', async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);

    if (!food) {
      return res.status(404).send({ message: "❌ Food item not found" });
    }

    // ✅ Remove image file if exists
    if (food.image) {
      const imagePath = `.${food.image}`; // Path to the image file
      fs.unlink(imagePath, (err) => {
        if (err) console.log("⚠️ Failed to delete image file:", err);
      });
    }

    // ✅ Delete food from DB
    await Food.findByIdAndDelete(req.params.id);
    res.send({ message: "✅ Food item deleted successfully!" });

  } catch (error) {
    res.status(500).send({ message: "❌ Error deleting food", error });
  }
});
const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: "YOUR_KEY_ID",
  key_secret: "YOUR_KEY_SECRET",
});

app.post("/create-order", async (req, res) => {
  const options = {
    amount: req.body.amount * 100, // Amount in paise
    currency: "INR",
    receipt: "order_rcptid_11",
  };
  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: "Payment Failed" });
  }
});

// ✅ Start Server
app.listen(5000, () => console.log('Server running on port 5000'));
