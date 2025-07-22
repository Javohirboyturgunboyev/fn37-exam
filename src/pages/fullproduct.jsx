import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { toast } from "react-hot-toast";

function FullProduct() {
  const { id } = useParams(); 
  const location = useLocation();
  const dispatch = useDispatch();

  console.log(id);
  

  const [product, setProduct] = useState(location.state?.product || null);
  const [loading, setLoading] = useState(!product);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedMonths, setSelectedMonths] = useState(3);

  useEffect(() => {
    if (!product) {
      setLoading(true);
      fetch(`https://dummyjson.com/products/${id}`)
        .then((res) => {
          if (!res.ok) throw new Error("Serverdan ma'lumot olishda xatolik");
          return res.json();
        })
        .then((data) => {
          setProduct(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [id, product]);
  

  if (loading) return <p className="text-center text-gray-500">⏳ Yuklanmoqda...</p>;
  if (error) return <p className="text-center text-red-500">❌ Xatolik: {error}</p>;
  if (!product) return <p className="text-center text-gray-500">Mahsulot topilmadi</p>;

  const handleAddToCart = () => {
    const cartItem = { ...product, quantity };
    dispatch(addToCart(cartItem));
    toast.success(`${product.title} (${quantity} dona) savatchaga qo‘shildi!`);
  };

  const increaseQuantity = () => {
    if (quantity < product.stock) setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const calculateDiscountPrice = (price, discountPercentage) => 
    (price - (price * discountPercentage) / 100).toFixed(2);

  const calculateInstallments = (price, months) => 
    (price / months).toFixed(2);

  const discountedPrice = calculateDiscountPrice(product.price, product.discountPercentage);

  return (
    <div className="container mx-auto p-6 bg-gradient-to-br text-white rounded-xl shadow-lg">
    <h1 className="text-3xl font-bold text-center text-green-400">{product.title}</h1>

    <div className="flex w-full flex-col lg:flex-row gap-8 mt-8">
      <div className="flex w-full flex-col gap-6 lg:w-1/3">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-72 md:h-96 rounded-lg shadow-xl border-4 border-green-400"
        />
        <div className="flex gap-2 justify-center overflow-x-auto">
          {product.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Image ${index}`}
              className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg shadow-md cursor-pointer transition-transform hover:scale-110 border-2 border-green-300"
            />
          ))}
        </div>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={decreaseQuantity}
            className="px-5 py-2 bg-gray-700 text-xl rounded-lg hover:bg-red-500 transition-all"
          >
            -
          </button>
          <span className="text-lg text-black font-semibold">{quantity}</span>
          <button
            onClick={increaseQuantity}
            className="px-5 py-2 bg-gray-700 text-xl rounded-lg hover:bg-green-500 transition-all"
          >
            +
          </button>
          <span className="text-sm text-gray-400">
            ({product.stock} dona mavjud)
          </span>
        </div>
      </div>

      <div className="w-full lg:w-1/2 space-y-5">
        <p className="text-gray-400">{product.description}</p>
        <div className="flex flex-col gap-2">
          <p className="text-lg line-through text-gray-400 ">{product.price} so`m</p>
          <p className="text-xl rounded-md px-60 pt-5 pb-5 py-1 bg-gray-500 font-bold">
            {discountedPrice} so`m (-{product.discountPercentage}%)
          </p>
          <p className="text-sm text-gray-400">{product.availabilityStatus}</p>
          <p className="text-sm text-gray-400"> {product.shippingInformation}</p>
          <p className="text-sm text-gray-400"> {product.returnPolicy}</p>
          <p className="text-sm"><strong>Brand:</strong> {product.brand}</p>
          <p className="text-sm"><strong>Category:</strong> {product.category}</p>
          <p className="text-green-400 cursor-pointer">⭐{product.rating} / 5</p>
        </div>

        <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold text-green-400">Oylik to‘lov:</h3>
          <div className="flex items-center gap-4 mt-3">
            <select
              value={selectedMonths}
              onChange={(e) => setSelectedMonths(Number(e.target.value))}
              className="p-2 border rounded-md bg-gray-800 text-white"
            >
              {[3, 6, 9, 12, 24].map((month) => (
                <option key={month} value={month}>
                  {month} oy
                </option>
              ))}
            </select>
            <span className="text-lg font-semibold text-green-400">
              {calculateInstallments(discountedPrice * quantity, selectedMonths)} so`m / oy
            </span>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <button className="w-full sm:w-auto px-6 py-3 rounded-md bg-green-500 text-white hover:bg-blue-400">
              Buy Now
            </button>
            <button
              className="w-full sm:w-auto px-6 py-3 bg-blue-400 rounded-md hover:bg-green-500"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  );
}

export default FullProduct;
