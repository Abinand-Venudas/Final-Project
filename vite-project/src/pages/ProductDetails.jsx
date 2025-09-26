import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // 👈 import useNavigate

const ProductDetails = () => {
  const { id } = useParams(); // product ID from URL
  const navigate = useNavigate(); // 👈 hook for navigation
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        let response = await fetch(`http://localhost:5000/products/${id}`);
        let data = await response.json();

        if (data.success) {
          setProduct(data.productData);
        } else {
          setError(data.message || "Failed to fetch product");
        }
      } catch (err) {
        setError("Error fetching product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <img
          src={product.image || "https://via.placeholder.com/400"}
          alt={product.name}
          className="w-full h-64 object-cover"
        />
        <div className="p-4">
          <h2 className="text-2xl font-bold">{product.name}</h2>
          <p className="text-gray-600 mt-2">{product.description}</p>
          <p className="text-green-600 font-bold mt-4">₹{product.price}</p>
          <p className="text-gray-500 mt-2">In Stock: {product.stocks || "N/A"}</p>
          <p className="text-sm text-gray-400 mt-2">
            Features: {product.specification}
          </p>

          {/* 👇 Back Button */}
          <button
            onClick={() => navigate("/products")}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            ← Back to Products
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
