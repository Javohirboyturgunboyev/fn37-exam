import  { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toggleLike } from "../redux/likeSlice";
import { FaHeart, FaRegHeart } from "react-icons/fa";

function Statistika() {
  const [products, setProducts] = useState([]);
  const likedProducts = useSelector((state) => state.likes.likedProducts);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleNavigate(product) {
    navigate(`/fullproduct/${product.id}`, { state: { product } });
  }

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products?limit=30")
      .then((response) => setProducts(response.data.products))
      .catch((error) => console.error("Mahsulotlarni olishda xatolik:", error));
  }, []);

  const likedItems = products.filter((product) => likedProducts.includes(product.id));

  function calculateDiscountPrice(price, discountPercentage) {
    return (price - (price * discountPercentage) / 100).toFixed(2);
  }

  function calculateMonthlyPayment(price) {
    return (price / 12).toFixed(2);
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Yoqtirilgan Mahsulotlar</h1>
      {likedItems.length === 0 ? (
        <p className="text-center text-gray-500">Hali hech qanday mahsulot yoqtirilmagan.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {likedItems.map((product) => {
            const isLiked = likedProducts.includes(product.id);
            return (
              <div
                key={product.id}
                className="bg-gray-100 shadow-md rounded-xl overflow-hidden relative p-2"
              >
                <button
                  onClick={() => dispatch(toggleLike(product.id))}
                  className="absolute z-50 top-2 right-2 text-red-500 text-xl"
                >
                  {isLiked ? <FaHeart /> : <FaRegHeart />}
                </button>

                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full rounded-xl h-48 object-cover"
                />

                <div
                  onClick={() => handleNavigate(product)}
                  className="p-4 bg-gray-200 cursor-pointer hover:bg-gray-300 transition"
                >
                  <p className="text-gray-600 text-sm">
                    {product.description.slice(0, 60)}...
                  </p>
                  <p className="text-md text-gray-700">
                    <span className="font-semibold">
                      {calculateMonthlyPayment(product.price)} so‘m/oy
                    </span>
                  </p>

                  <p className="text-lg text-gray-500 line-through font-semibold mt-2">
                    {product.price} so`m
                  </p>
                  <p className="text-lg text-gray-800 font-semibold">
                    {calculateDiscountPrice(product.price, 10)} so`m{" "}
                    <span className="text-sm">(-10%)</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Statistika;
