import React, { useState } from "react";
import axios from "axios";

const FoodUpload = () => {
  const [foodData, setFoodData] = useState({
    name: "",
    price: "",
    restaurant: "",
    image: null
  });

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFoodData({ ...foodData, image: e.target.files[0] });
    } else {
      setFoodData({ ...foodData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", foodData.name);
    formData.append("price", foodData.price);
    formData.append("restaurant", foodData.restaurant);
    formData.append("image", foodData.image);

    try {
      const res = await axios.post("http://localhost:5000/add-food", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      console.log("✅ Food uploaded successfully:", res.data);
    } catch (error) {
      console.error("❌ Error uploading food:", error);
    }
  };

  return (
    <div>
      <h2>Upload Food Item</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="text" name="name" placeholder="Food Name" onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price" onChange={handleChange} required />
        <input type="text" name="restaurant" placeholder="Restaurant" onChange={handleChange} required />
        <input type="file" name="image" accept="image/*" onChange={handleChange} required />
        <button type="submit">Upload Food</button>
      </form>
    </div>
  );
};

export default FoodUpload;
