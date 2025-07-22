import React, { useState, useRef } from "react";

export default function App() {
  const [isLogin, setIsLogin] = useState(false);
  const signupName = useRef();
  const signupEmail = useRef();
  const signupPassword = useRef();
  const signupCheckbox = useRef();

  const loginEmail = useRef();
  const loginPassword = useRef();

  const handleSignup = (e) => {
    e.preventDefault();
    const name = signupName.current.value.trim();
    const email = signupEmail.current.value.trim();
    const password = signupPassword.current.value.trim();
    const checked = signupCheckbox.current.checked;

    if (name && email && password && checked) {
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userPassword", password);
      setIsLogin(true);
    } else {
      alert("Iltimos, barcha maydonlarni to‘ldiring va rozilik belgilang!");
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const email = loginEmail.current.value.trim();
    const password = loginPassword.current.value.trim();

    const savedEmail = localStorage.getItem("userEmail");
    const savedPassword = localStorage.getItem("userPassword");

    if (email && password) {
      if (email === savedEmail && password === savedPassword) {
        window.location.href = "/home"; // yoki boshqa sahifa
      } else {
        alert("Email yoki parol noto‘g‘ri.");
      }
    } else {
      alert("Iltimos, barcha maydonlarni to‘ldiring!");
    }
  };

  return (
    <div className="mt-[150px] flex items-center justify-center">
      <div className="relative w-[350px] sm:w-[400px] h-[500px] bg-white rounded-xl overflow-hidden shadow-xl">
        {/* Tabs */}
        <div className="flex">
          <button
            className={`w-1/2 py-3 font-semibold transition-all ${
              !isLogin ? "bg-blue-500 text-white" : "bg-gray-100"
            }`}
            onClick={() => setIsLogin(false)}
          >
            Signup
          </button>
          <button
            className={`w-1/2 py-3 font-semibold transition-all ${
              isLogin ? "bg-blue-500 text-white" : "bg-gray-100"
            }`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
        </div>

        {/* Forms container */}
        <div
          className={`absolute top-12 w-[200%] flex transition-transform duration-500 ease-in-out ${
            isLogin ? "-translate-x-1/2" : "translate-x-0"
          }`}
          style={{ height: "calc(100% - 48px)" }}
        >
          {/* Signup */}
          <form
            onSubmit={handleSignup}
            className="w-1/2 px-8 pt-10 pb-4 flex flex-col gap-4"
          >
            <h2 className="text-2xl font-bold text-center">Create Account</h2>
            <input
              type="text"
              ref={signupName}
              placeholder="Full name"
              className="border p-2 rounded"
            />
            <input
              type="email"
              ref={signupEmail}
              placeholder="Email address"
              className="border p-2 rounded"
            />
            <input
              type="password"
              ref={signupPassword}
              placeholder="Password"
              className="border p-2 rounded"
            />
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" ref={signupCheckbox} />
              I agree to the terms and conditions
            </label>
            <button
              type="submit"
              className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600 transition"
            >
              Signup
            </button>
          </form>

          {/* Login */}
          <form
            onSubmit={handleLogin}
            className="w-1/2 px-8 pt-10 pb-4 flex flex-col gap-4"
          >
            <h2 className="text-2xl font-bold text-center">Welcome Back</h2>
            <input
              type="email"
              ref={loginEmail}
              placeholder="Email address"
              className="border p-2 rounded"
            />
            <input
              type="password"
              ref={loginPassword}
              placeholder="Password"
              className="border p-2 rounded"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600 transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
