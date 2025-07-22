import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeFromCart,
  decreaseQuantity,
  clearCart,
} from "../redux/cartSlice";
import { toggleLike } from "../redux/likeSlice";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaShoppingCart } from "react-icons/fa";
const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const likedProducts = useSelector((state) => state.likes.likedProducts);

  const calculateTotalPrice = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const handleBuyNow = (item) => {
    navigate("/checkout", { state: { product: item } });
  };

  return (
    <div className="p-4 flex w-full h-full ">
      <div className="w-full h-full" >
        <h2 className="text-xl font-bold mb-4">Savatcha</h2>

        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full w-full">
            <p className="text-gray-500 text-lg font-semibold">
              🛒 Savatchangiz hozircha bo‘sh
            </p>
            <p className="text-gray-400 text-sm">
              Xarid qilishni boshlash uchun mahsulot qo‘shing
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cartItems.map((item) => {
              const isLiked = likedProducts.includes(item.id);

              return (
                <div
                  key={item.id}
                  className="bg-gray-100 shadow-md rounded-xl overflow-hidden relative"
                >
                  <button
                    onClick={() => dispatch(toggleLike(item.id))}
                    className="absolute top-2 right-2 text-red-500 text-xl"
                  >
                    {isLiked ? <FaHeart /> : <FaRegHeart />}
                  </button>

                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full rounded-xl h-48 object-cover"
                  />

                  <div className="p-4 bg-gray-200 cursor-pointer h-full">
                    <p className="text-gray-600 text-sm">
                      {item.description.slice(0, 60)}...
                    </p>
                    <p className="text-lg text-gray-800 font-semibold">
                      {item.price} so`m
                    </p>

                    <div className="flex items-center gap-2 mt-2">
                      <button
                        className="px-3 py-1 bg-gray-300 rounded-md"
                        onClick={() => dispatch(decreaseQuantity(item.id))}
                      >
                        -
                      </button>
                      <span className="text-lg">{item.quantity}</span>
                      <button
                        className="px-3 py-1 bg-gray-300 rounded-md"
                        onClick={() =>
                          dispatch(addToCart({ ...item, quantity: 1 }))
                        }
                      >
                        +
                      </button>
                    </div>

                    <div className="mt-2 flex gap-2">
                      <button
                        className="w-full px-3 py-2 bg-red-500 text-white rounded-md flex items-center justify-center gap-2"
                        onClick={() => dispatch(removeFromCart(item.id))}
                      >
                        <FaTrash /> O`chirish
                      </button>

                      <button
                        className="w-full px-3 py-2 bg-green-500 text-white rounded-md flex items-center justify-center gap-2"
                        onClick={() => handleBuyNow(item)}
                      >
                        <FaShoppingCart /> Sotib olish
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="mt-6 p-4 w-3/12">
          <p className="text-xl font-semibold">
            Umumiy narx:{" "}
            <span className="text-gray-500">{calculateTotalPrice()} so‘m</span>
          </p>
          <button
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md"
            onClick={() => dispatch(clearCart())}
          >
            Savatchani tozalash
          </button>
          <button
            className="mt-4 px-4 py-2 bg-green-500  text-white rounded-md"
            onClick={() => handleBuyNow(item)}
          >
            <FaShoppingCart /> Sotib olish
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
