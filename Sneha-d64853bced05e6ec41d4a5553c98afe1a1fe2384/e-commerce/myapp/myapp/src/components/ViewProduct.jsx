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
      <div className="product">
        <div className="products-items">
          {/* Header Row */}
          <div className="product-row product-header">
            <p>Image</p>
            <p>Product Name</p>
            <p>Description</p>
            <p>Price</p>
            <p>Remove</p>
          </div>
          <hr />

          {/* Product Rows */}
          {product.map((val) => {
            return (
              <div key={val._id}>
                <div className="product-row">
                  <img src={val.image} alt="" />
                  <p>{val.productname}</p>
                  <p>{val.description}</p>
                  <p>₹{val.price}</p>
                  <p
                    className="cross"
                    onClick={() => {
                      delValue(val._id);
                    }}
                  >
                    ❌
                  </p>
                </div>
                <hr />
              </div>
            );
          })}
        </div>
      </div>

      {/* Inline Styling for alignment */}
      <style jsx>{`
        .products-items {
          width: 90%;
          margin: auto;
        }

        .product-row {
          display: grid;
          grid-template-columns: 120px 1fr 2fr 100px 80px;
          align-items: center;
          text-align: center;
          gap: 10px;
          padding: 10px 0;
        }

        .product-header {
          font-weight: bold;
          border-bottom: 2px solid #333;
        }

        .product-row img {
          width: 80px;
          height: 80px;
          object-fit: cover;
          border-radius: 8px;
        }

        .cross {
          color: red;
          font-weight: bold;
          cursor: pointer;
        }

        .cross:hover {
          transform: scale(1.2);
        }
      `}</style>
    </div>
  );
};

export default ViewProduct;
