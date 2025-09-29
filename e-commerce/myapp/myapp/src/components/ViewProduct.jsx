import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import axios from "axios";

const ViewProduct = () => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    products();
  }, []);

  const products = async () => {
    try {
      const res = await axios.get("http://localhost:3005/view/product");
      setProduct(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const delValue = (id) => {
    axios.delete("http://localhost:3005/remove/product/" + id).then((res) => {
      alert(res.data);
      window.location.reload();
    });
  };

  return (
    <div>
      <AdminNavbar /><br /><br /><br />
     <div className="products-container">
    {product.map((val) => (
      <div className="product-card" key={val._id}>
        <img src={val.image} alt={val.productname} />
        <h3>{val.productname}</h3>
        <p className="description">{val.description}</p>
        <p className="price">₹{val.price}</p>
        <button
          className="remove-btn"
          onClick={() => delValue(val._id)}
        >
          ❌ Remove
        </button>
      </div>
    ))}
  </div>

  <style jsx>{`
    .products-container {
      width: 90%;
      margin: auto;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 20px;
      padding: 20px 0;
    }

    .product-card {
      background: #fff;
      border: 1px solid #ddd;
      border-radius: 12px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
      padding: 15px;
      text-align: center;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .product-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    }

    .product-card img {
      width: 100%;
      height: 160px;
      object-fit: cover;
      border-radius: 8px;
      margin-bottom: 10px;
    }

    .product-card h3 {
      font-size: 1.1rem;
      margin: 8px 0;
    }

    .description {
      font-size: 0.9rem;
      color: #555;
      min-height: 40px;
    }

    .price {
      font-weight: bold;
      color: #2a9d8f;
      margin: 10px 0;
    }

    .remove-btn {
      background: #ff4d4d;
      color: white;
      border: none;
      padding: 8px 12px;
      border-radius: 6px;
      cursor: pointer;
      font-weight: bold;
      transition: background 0.2s ease;
    }

    .remove-btn:hover {
      background: #e60000;
    }
  `}</style>
    </div>
  );
};

export default ViewProduct;
