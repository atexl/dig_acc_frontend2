
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff, FiLock, FiMail } from "react-icons/fi";
import { motion, useMotionValue, useTransform } from "framer-motion"
// import users from '../data/users.json';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});
    await new Promise((resolve) => setTimeout(resolve, 500));

    //   try {
    //     const { email, password } = formData;
    //     const res = await fetch("http://localhost:3000/login", {
    //       method: "POST",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify({ email, password }),
    //     });
    //     const data = await res.json();

    //     if (!res.ok) {
    //       // show error on the page
    //       setErrors({ submit: data?.message || "Invalid credentials" });
    //       return;
    //     }

    //     // on success navigate to home
    //     navigate("/home");
    //   } catch (error) {
    //     console.error("Login failed", error);
    //     setErrors({ submit: "Login failed. Please try again." });
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };


    try {
      const resp = await fetch('/users.json');
      const users = resp.ok ? await resp.json() : [];
      const { email, password } = formData;
      const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
      if (!user || user.password !== password) {
        setErrors({ submit: "Invalid email or password" });
        return;
      }

      localStorage.setItem("currentUser", JSON.stringify({ id: user.id, email: user.email, name: user.name }));


      navigate("/home");
    } catch (error) {
      console.error("Login failed", error);
      setErrors({ submit: "Login failed. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const strength = password.length === 0 ? 0 : Math.min(4, (password.length >= 8) + /[A-Z]/.test(password) + /[0-9]/.test(password) + /[^A-Za-z0-9]/.test(password))
  const colors = ["bg-neutral-200", "bg-rose-300", "bg-amber-300", "bg-sky-300", "bg-emerald-300"]
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-100 flex items-center justify-center p-4">

      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        <div className="md:w-2/3 bg-linear-to-br from-indigo-700  via-sky-600 to-emerald-500 p-12 flex flex-col justify-center items-center text-white relative overflow-hidden rounded-2xl shadow-2xl">

          {/* Subtle glow / overlay */}
          <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px] mix-blend-overlay pointer-events-none"></div>

          {/* Main content */}
          <h2 className="text-4xl font-extrabold mb-4 text-center drop-shadow-lg">
            Diversified Industries
          </h2>

          <p className="text-center text-lg opacity-90 max-w-sm leading-relaxed">
            Accelerating Growth Across Industries with Data, Intelligence & Innovation
          </p>

          {/* Cards row */}
          <div className="mt-10 w-full flex flex-row gap-6 justify-center items-stretch">
            {[
              { title: "Data", desc: "Fuel every decision with precision" },
              { title: "Intelligence", desc: " Power transformation through AI" },
              { title: "Growth", desc: "Deliver results at scale" },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white/15 hover:bg-white/25 transition-all duration-300 backdrop-blur-md rounded-xl p-5 w-40 text-center shadow-md hover:shadow-xl hover:scale-105"
              >
                <h3 className="text-base font-semibold mb-1">{item.title}</h3>
                <p className="text-xs opacity-90">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Decorative gradient orbs */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-orange-700/30 rounded-full blur-3xl"></div>
        </div>



        <div className="md:w-1/2 p-8 md:p-12">
          <div className="text-center mb-8">
            <img
              src="https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600"

              alt="DIG Logo"
              className="w-16 h-16 mx-auto mb-4 rounded-full hover:scale-110 transition-transform duration-300"
            />
            <h1 className="text-md font-bold text-gray-800">Log In to Discover Your Next Product Experience</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {errors.submit && <p className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-200 animate-fadeIn">{errors.submit}</p>}

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiMail className="text-gray-400" />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
                className={`block w-full pl-10 pr-3 py-2.5 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300`}
                placeholder="Email address"
              />
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiLock className="text-gray-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                disabled={isLoading}
                onChange={handleChange}
                className={`block w-full pl-10 pr-10 py-2.5 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300`}
                placeholder="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? <FiEyeOff className="text-gray-400" /> : <FiEye className="text-gray-400" />}
              </button>
              {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
            </div>


            <button
              type="submit"

              disabled={isLoading}
              className="w-full bg-linear-to-tr from-indigo-700  via-sky-600 to-emerald-500 text-white py-2.5 rounded-lg font-medium hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300"
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 mx-auto" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <FiLock className="text-white" />
                  <span>Login</span>
                </span>
              )}
            </button>
              {/* <div className="h-1.5 rounded-full bg-neutral-100 overflow-hidden mb-4">
                  <div className={`${colors[strength]} h-full`}
                  style={{width:`${(strength/4)* 100}%`}}></div>
              </div> */}

            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-400"></div>
              </div>
              <div className="relative flex justify-center text-sm my-4">
                <span className="px-2 bg-white text-black">Or continue with</span>
              </div>
            </div>
            <button
              type="button"
              disabled={isLoading}
              className="w-full bg-linear-to-tr from-indigo-700  via-sky-600 to-emerald-500 text-white py-2.5 rounded-lg font-medium hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300"
            >
              {/* {isLoading ? (
                <svg className="animate-spin h-5 w-5 mx-auto" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              ) : ( */}
              Login With SSO
              {/* )} */}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
