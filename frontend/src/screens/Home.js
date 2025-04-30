import React, { useEffect, useState } from 'react';
import '../styles.css'; // Correct path for styles

const Home = () => {
  const [foods, setFoods] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [restaurant, setRestaurant] = useState("");
  const [image, setImage] = useState(null);

  // Fetch food data from the backend
  useEffect(() => {
    fetch("http://localhost:5000/foods")
      .then((res) => res.json())
      .then((data) => setFoods(data))
      .catch((err) => console.log(err));
  }, []);

  // Function to handle food item submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("restaurant", restaurant);
    formData.append("image", image);

    const response = await fetch("http://localhost:5000/add-food", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const addedFood = await response.json();
      setFoods([...foods, addedFood]);
      setName("");
      setPrice("");
      setRestaurant("");
      setImage(null);
    }
  };

  // Function to handle deleting a food item
  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:5000/delete-food/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setFoods(foods.filter((food) => food._id !== id));
    } else {
      console.log("❌ Failed to delete food item");
    }
  };

  // Calculate the total cost
  const totalCost = foods.reduce((sum, food) => sum + food.price, 0);

  return (
    <div className="container">
      <h1>🍽 Food Menu</h1>

      {/* Add Food Item Form */}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          placeholder="Food Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Restaurant"
          value={restaurant}
          onChange={(e) => setRestaurant(e.target.value)}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />
        <button type="submit">Add Food</button>
      </form>

      {/* Display Food List with Images */}
      <ul>
        {foods.map((food) => (
          <li key={food._id}>
            {food.image && (
              <img
                src={`http://localhost:5000${food.image}`}
                alt={food.name}
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
            )}
            <span>{food.name} - ₹{food.price} ({food.restaurant})</span>
            <button className="delete-btn" onClick={() => handleDelete(food._id)}>❌</button>
          </li>
        ))}
      </ul>

      {/* Show Total Cost */}
      <h2>Total Cost: ₹{totalCost}</h2>
    </div>
  );
};

export default Home;
