// import { useContext, useState, useEffect } from "react";
// import { BackgroundContext } from "../context/BackgroundContext";
// import { toast } from "react-toastify";

// const API_LOGIN = import.meta.env.VITE_ADMIN_LOGIN;
// const API_REGISTER = import.meta.env.VITE_ADMIN_REGISTER;

// export default function LoginPageAdmin({ onLogin }) {
//   const [isRegister, setIsRegister] = useState(false);
//   const { setToken } = useContext(BackgroundContext);

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     user_id: "",
//     password: "",
//     mobileNumber: "",
//     role: "player",
//   });

//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   // ✅ AUTO LOGIN
//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     if (token) {
//       setToken(token);
//       onLogin({
//         name: "Player",
//         role: "Player",
//       });
//     }
//   }, []);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       if (isRegister) {
//         // ✅ REGISTER API
//         const res = await fetch(API_REGISTER, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             name: form.name,
//             email: form.email,
//             user_id: form.user_id,
//             password: form.password,
//             mobileNumber: form.mobileNumber,
//           }),
//         });

//         const data = await res.json();

//         if (data.status !== 1) {
//           throw new Error(data.message || "Registration failed");
//         }

// toast.success("Registration Successful 🎉");        setIsRegister(false);
//       } else {
//         // ✅ LOGIN API
//         const res = await fetch(API_LOGIN, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             user_id: form.user_id,
//             password: form.password,
//           }),
//         });

//         const data = await res.json();

//         if (data.status !== 1) {
//           throw new Error(data.message || "Login failed");
//         }

//         // ✅ SAVE TOKEN
//         localStorage.setItem("token", data.data.token);

//         // ✅ SAVE USER
//         const userData = {
//           name: form.user_id,
//           role: "Player",
//           user_id: form.user_id,
//         };

//         localStorage.setItem("user", JSON.stringify(userData));

//         setToken(data.data.token);
//               toast.success("Login Successful 🚀");


//         // ✅ REDIRECT
//         onLogin(userData);
//       }
//     } catch (err) {
// toast.error(err.message || "Something went wrong ❌");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
//   <div className="auth-container w-full max-w-md md:max-w-2xl">
//     <div className="auth-box flex flex-col md:flex-row overflow-hidden">
      
//       {/* Form */}
//       <div className="auth-form-box w-full md:w-1/2 p-4 md:p-8">
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <h2 className="text-xl md:text-2xl font-bold">
//             {isRegister ? "Create Account" : "Sign In"}
//           </h2>
//           <p className="text-gray-500 text-sm md:text-base">
//             {isRegister
//               ? "Create your admin account"
//               : "Login to your dashboard"}
//           </p>

//           {error && <p className="auth-error text-red-500">{error}</p>}

//           {isRegister && (
//             <>
//               <input
//                 name="name"
//                 placeholder="Name"
//                 onChange={handleChange}
//                 required
//                 className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//               />
//               <input
//                 name="email"
//                 placeholder="Email"
//                 onChange={handleChange}
//                 required
//                 className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//               />
//               <input
//                 name="mobileNumber"
//                 placeholder="Mobile Number"
//                 onChange={handleChange}
//                 required
//                 className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//               />
//             </>
//           )}

//           <input
//             name="user_id"
//             placeholder="User ID"
//             onChange={handleChange}
//             required
//             className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />

//           <input
//             name="password"
//             type="password"
//             placeholder="Password"
//             onChange={handleChange}
//             required
//             className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
//           >
//             {loading ? "Please wait..." : isRegister ? "Register" : "Login"}
//           </button>
//         </form>
//       </div>

//       {/* Overlay */}
//       <div className="auth-overlay hidden md:flex md:w-1/2 items-center justify-center p-4">
//         <div className="auth-overlay-panel text-center">
//           {isRegister ? (
//             <>
//               <h2 className="text-lg md:text-xl font-bold">Welcome Back 👋</h2>
//               <p className="text-sm md:text-base">Already have an account?</p>
//               <button
//                 onClick={() => setIsRegister(false)}
//                 className="mt-2 px-4 py-1 border rounded-md hover:bg-gray-200 transition"
//               >
//                 Login
//               </button>
//             </>
//           ) : (
//             <>
//               <h2 className="text-lg md:text-xl font-bold">Hello, Welcome! 🚀</h2>
//               <p className="text-sm md:text-base">Don't have an account?</p>
//               <button
//                 onClick={() => setIsRegister(true)}
//                 className="mt-2 px-4 py-1 border rounded-md hover:bg-gray-200 transition"
//               >
//                 Register
//               </button>
//             </>
//           )}
//         </div>
//       </div>

//     </div>
//   </div>
// </div>
//   );
// }


import { useContext, useState, useEffect } from "react";
import { BackgroundContext } from "../context/BackgroundContext";
import { toast } from "react-toastify";

const API_LOGIN = import.meta.env.VITE_ADMIN_LOGIN;
const API_REGISTER = import.meta.env.VITE_ADMIN_REGISTER;

export default function LoginPageAdmin({ onLogin }) {
  const [isRegister, setIsRegister] = useState(false);
  const { setToken } = useContext(BackgroundContext);

  const [form, setForm] = useState({
    name: "",
    email: "",
    user_id: "",
    password: "",
    mobileNumber: "",
    role: "player",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // AUTO LOGIN
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
      onLogin({
        name: "Player",
        role: "Player",
      });
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isRegister) {
        const res = await fetch(API_REGISTER, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            user_id: form.user_id,
            password: form.password,
            mobileNumber: form.mobileNumber,
          }),
        });

        const data = await res.json();
        if (data.status !== 1) throw new Error(data.message || "Registration failed");

        toast.success("Registration Successful 🎉");
        setIsRegister(false);
      } else {
        const res = await fetch(API_LOGIN, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: form.user_id,
            password: form.password,
          }),
        });

        const data = await res.json();
        if (data.status !== 1) throw new Error(data.message || "Login failed");

        localStorage.setItem("token", data.data.token);
        const userData = { name: form.user_id, role: "Player", user_id: form.user_id };
        localStorage.setItem("user", JSON.stringify(userData));
        setToken(data.data.token);
        toast.success("Login Successful 🚀");

        onLogin(userData);
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
      <div className="w-full max-w-2xl">
        <div className="flex flex-col md:flex-row bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden">
          
          {/* Form */}
          <div className="w-full md:w-1/2 p-6 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-2xl font-bold text-blue-700">
                {isRegister ? "Create Account" : "Sign In"}
              </h2>
              <p className="text-gray-500">{isRegister ? "Create your admin account" : "Login to your dashboard"}</p>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              {isRegister && (
                <>
                  <input name="name" placeholder="Name" onChange={handleChange} required
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
                  <input name="email" placeholder="Email" onChange={handleChange} required
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
                  <input name="mobileNumber" placeholder="Mobile Number" onChange={handleChange} required
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
                </>
              )}

              <input name="user_id" placeholder="User ID" onChange={handleChange} required
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
              <input name="password" type="password" placeholder="Password" onChange={handleChange} required
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />

              <button type="submit" disabled={loading}
                className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                {loading ? "Please wait..." : isRegister ? "Register" : "Login"}
              </button>
            </form>

            {/* Mobile Toggle */}
            <div className="md:hidden text-center mt-4">
              {isRegister ? (
                <>
                  <p className="text-sm">Already have an account?</p>
                  <button onClick={() => setIsRegister(false)}
                    className="mt-2 px-4 py-1 border rounded-md hover:bg-gray-200 transition">
                    Login
                  </button>
                </>
              ) : (
                <>
                  <p className="text-sm">Don't have an account?</p>
                  <button onClick={() => setIsRegister(true)}
                    className="mt-2 px-4 py-1 border rounded-md hover:bg-gray-200 transition">
                    Register
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Overlay for Desktop */}
          <div className="hidden md:flex md:w-1/2 items-center justify-center bg-gradient-to-br from-blue-600 to-blue-400 text-white p-6">
            <div className="text-center">
              {isRegister ? (
                <>
                  <h2 className="text-xl font-bold">Welcome Back 👋</h2>
                  <p className="mt-2">Already have an account?</p>
                  <button onClick={() => setIsRegister(false)}
                    className="mt-4 px-6 py-2 bg-white text-blue-600 rounded-full hover:bg-gray-200 transition">
                    Login
                  </button>
                </>
              ) : (
                <>
                  <h2 className="text-xl font-bold">Hello, Welcome! 🚀</h2>
                  <p className="mt-2">Don't have an account?</p>
                  <button onClick={() => setIsRegister(true)}
                    className="mt-4 px-6 py-2 bg-white text-blue-600 rounded-full hover:bg-gray-200 transition">
                    Register
                  </button>
                </>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}