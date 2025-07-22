import  { useEffect, useState } from "react";
import Carousel from "../components/carusel";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { toggleLike } from "../redux/likeSlice";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [count, setCount] = useState(10);

  const dispatch = useDispatch();
  const likedProducts = useSelector((state) => state.likes.likedProducts);
  const navigate = useNavigate();

  function hendalNavi(product) {
    navigate(`/fullproduct/${product.id}`, { state: { product } });
  }

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products/categories")
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Kategoriya olishda xatolik:", error));
  }, []);

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products?limit=${count}`)
      .then((response) => setProducts(response.data.products))
      .catch((error) => console.error("Mahsulotlarni olishda xatolik:", error));
  }, [count]);
  function handleCount() {
    setCount((prevCount) => prevCount + 10);
  }

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  const calculateDiscountPrice = (price, discountPercentage) => {
    return (price - (price * discountPercentage) / 100).toFixed(2);
  };
  const calculateMonthlyPayment = (price) => {
    return (price / 3).toFixed(2);
  };

  return (
    <div>
      <ul className="flex gap-4 overflow-x-auto whitespace-nowrap items-start mb-4 scrollbar-hide p-2">
        <li
          className={`px-4 py-2 cursor-pointer transition ${
            selectedCategory === "" ? "bg-[#7F4DFF] rounded-md text-white" : ""
          }`}
          onClick={() => setSelectedCategory("")}
        >
          All Products
        </li>
        {categories.map((category) => (
          <li
            key={category.slug}
            className={`px-4 py-2 cursor-pointer transition ${
              selectedCategory === category.slug ? "bg-[#7F4DFF] rounded-md text-white" : ""
            }`}
            onClick={() => setSelectedCategory(category.slug)}
          >
            {category.name}
          </li>
        ))}
      </ul>

      <Carousel products={products} />

      <div>
        <h2 className="text-2xl font-bold mb-6 text-center mt-10">Products</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 ">
          {products
            .filter((product) =>
              selectedCategory ? product.category === selectedCategory : true
            )
            .map((product) => {
              const isLiked = likedProducts.includes(product.id);
              return (
                <div
                  key={product.id}
                  className="bg-gray-300 shadow-md rounded-xl overflow-hidden relative "
                >
                  <button
                    onClick={() => dispatch(toggleLike(product.id))}
                    className="absolute z-50 top-2 right-2  rounded-md text-white text-xl"
                  >
                    {isLiked ? <FaHeart /> : <FaRegHeart />}
                  </button>

                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full rounded-xl h-48 object-cover"
                  />

                  <div
                    onClick={() => hendalNavi(product)}
                    className="p-4 flex flex-col justify-start gap-2 items-start bg-gray-200 cursor-pointer h-full"
                  >
                    <p className="text-gray-600 text-sm">
                      {product.description.slice(0, 60)}...
                    </p>
                    <p className="text-md text-gray-900">
                      <span className="font-bold text-2xl">
                        {calculateMonthlyPayment(product.price)} so`m/oy
                      </span>
                    </p>

                    <p className="text-lg text-gray-500 line-through font-semibold mt-2line-through">
                      {product.price} so`m
                    </p>
                    <p className="text-sm rounded-xl px-5 py-2  bg-[#7F4DFF]  text-white font-semibold ">
                      {calculateDiscountPrice(product.price, 10)} so`m{" "}
                      <span className="text-sm">(-10%)</span>
                    </p>
                  </div>
                </div>
              );
            })}
        </div>

        <button
          onClick={handleCount}
          className="bg-gray-900 w-full rounded-4xl p-5 text-2xl text-green-300 mt-10 hover:text-blue-500"
        >
         Show 10 more...
        </button>
      </div>
    </div>
  );
}

export default Home;
