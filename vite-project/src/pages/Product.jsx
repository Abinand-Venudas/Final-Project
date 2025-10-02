import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let response = await axios.get("http://localhost:5000/products"); 

        if (response.data.success) {
          setProducts(response.data.productData);
        } else {
          setError(response.data.message || "Failed to fetch products");
        }
      } catch (err) {
        setError("Error fetching products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p className="text-center text-lg">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <Link 
          key={`product.id/${product._id}`}
          to={`/products`}  
          className="block">

          <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition">
            <img
              src={product.image || "https://via.placeholder.com/300"}
              alt={product.name}
              className="w-full h-48 object-cover"/>

            <div className="p-4">
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-green-600 font-bold mt-2">₹{product.price}</p>
            </div>
          </div>
        </Link>
      ))}

     <div className="flex justify-center mt-6">
  <Link to="/" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
    back to home
  </Link>
</div>

    </div>
    
  );
};

export default Product;
