import { useEffect, useState } from "react";
import signupImage from "../assets/Images/signup-background.svg";
import teamworkImage from "../assets/Images/teamwork.svg";
import { FaLock, FaTimes } from "react-icons/fa";
import { FaEnvelopeOpen } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store";
axios.defaults.withCredentials = true;

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const dispatch = useDispatch();
  const isLoggedin = useSelector((state) => state.isLoggedin);
  const userType = useSelector((state) => state.userType);

  useEffect(() => {
    // Redirect user to appropriate dashboard if already logged in
    if (isLoggedin) {
      if (userType === "student") {
        navigate("/dashboard_std");
      } else if (userType === "lecturer") {
        navigate("/dashboard_lec");
      } else if (userType === "admin") {
        navigate("/admin");
      }
    }
  }, [isLoggedin, userType, navigate]);

  // const sendRequest = async () =>{

  //   try{
  //     const res = await axios.post('http://localhost:4000/api/user/login', { email, password })
  //     console.log("res",res)
  //     const data = await res.data;
  //     console.log(data.msg)
  //     return data.msg

  //   }catch (err){
  //     console.log("error",err)
  //     return err.response.data.error;
  //   }

  // }

  // const handleLogin =  (e) => {
  //   e.preventDefault();
  //   if (isRegistering) return; // Prevent multiple submissions
  //   setIsRegistering(true);
  //   if (email === '' || password === '') {
  //     toast.error('All fields are required');
  //   } else {

  //     sendRequest().then((data)=> (
  //     setType(data.msg)
  //     )).then((data) => {
  //       console.log(data);
  //       toast.success("Login success");
  //         if (type === 'student') {
  //           setTimeout(() => {
  //             navigate('/dashboard_std');
  //           }, 1000);
  //         } else if (type === 'lecturer') {
  //           setTimeout(() => {
  //             navigate('/dashboard_lec');
  //           }, 1000);
  //         } else {
  //           setTimeout(() => {
  //             navigate('/admin');
  //           }, 1000);
  //         }
  //     }).catch(err => {
  //       toast.error(err.response.data.error);
  //     });

  //       }

  //       setTimeout(() => {
  //         setIsRegistering(false);
  //       }, 1800);

  //     }

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   if (isRegistering) return; // Prevent multiple submissions
  //   setIsRegistering(true);
  //   if (email === '' || password === '') {
  //     toast.error('All fields are required');
  //   } else {
  //     sendRequest().then((data) => {
  //       console.log(data);
  //     }).catch(err => {
  //       console.log("err",err)
  //     })
  //       // .then((data) => {
  //       //   // console.log(data.msg);
  //       //   // setType(data.msg); // Set the type here
  //       //   toast.success("Login success");
  //       //   if (data.msg === 'student') {
  //       //     setTimeout(() => {
  //       //       navigate('/dashboard_std');
  //       //     }, 1000);
  //       //   } else if (data.msg === 'lecturer') {
  //       //     setTimeout(() => {
  //       //       navigate('/dashboard_lec');
  //       //     }, 1000);
  //       //   } else {
  //       //     setTimeout(() => {
  //       //       navigate('/admin');
  //       //     }, 1000);
  //       //   }
  //       // })
  //       // .catch(err => {
  //       //   console.log(err)
  //       //   // toast.error(err.response.data.error);
  //       // })

  //   }
  //   setTimeout(() => {
  //     setIsRegistering(false);
  //   }, 1600);
  // };

  // useEffect(() => {
  //   // If user is already logged in, redirect to appropriate dashboard
  //   if (isLoggedin) {
  //     // Assuming you have stored user type in Redux store as well
  //     const userType = useSelector(state => state.auth.userType);
  //     if (userType === 'student') {
  //       navigate('/dashboard_std');
  //     } else if (userType === 'lecturer') {
  //       navigate('/dashboard_lec');
  //     } else {
  //       navigate('/admin');
  //     }
  //   }
  // }, [isLoggedin, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (isRegistering) return;
    setIsRegistering(true);
    if (email === "" || password === "") {
      toast.error("All fields are required");
    } else {
      try {
        const res = await axios.post(
          "http://localhost:4000/api/user/login",
          { email, password },
          { withCredentials: true, credentials: "include" }
        );
        const data = await res.data;
        console.log(data.msg);
        toast.success(data.msg);
        dispatch(authActions.login({ userType: `${data.msg}` }));
        if (data.msg === "student") {
          setTimeout(() => {
            navigate("/dashboard_std");
          }, 1000);
        } else if (data.msg === "lecturer") {
          setTimeout(() => {
            navigate("/dashboard_lec");
          }, 1000);
        } else {
          setTimeout(() => {
            navigate("/admin");
          }, 1000);
        }
      } catch (err) {
        toast.error(err.response.data.error);
      }
    }

    setTimeout(() => {
      setIsRegistering(false);
    }, 1600);
  };

  const handleBack = () => {
    navigate("/");
  };

  const gotoSignup = () => {
    navigate("/signup");
  };

  const gotoForgot = () => {
    navigate("/forgotpassword");
  };

  return (
    <div
      className=" bg-gradient-to-r from-[#F28383] from-10% via-[#9D6CD2] to-[#481EDC] to-90%
    flex items-center justify-center h-screen "
    >
      <div className="max-w-[960px] relative bg-black bg-opacity-50 grid grid-cols-1 md:grid-cols-2 items-center p-5 rounded-2xl gap-10 md:gap-20">
        <div className="relative hidden md:block">
          <img src={signupImage} alt="" />
          <img src={teamworkImage} alt="" className="absolute top-36" />
        </div>
        <div className="max-w-80 grid gap-5">
          <button
            onClick={handleBack}
            className="text-gray-300 text-2xl absolute top-3 right-3 hover:bg-blue-400 hover:text-white hover:rounded-full hover:p-1 "
          >
            <FaTimes />
          </button>
          <h1 className="text-5xl font-bold text-white">Login</h1>
          <p className="text-white text-opacity-70">
            Crafting instructions for computers to execute tasks and solve
            problems efficiently
          </p>
          <form
            action=""
            className="space-y-6 text-white"
            onSubmit={handleLogin}
          >
            <div className="relative">
              <div className="absolute top-1 left-1 bg-white bg-opacity-40 rounded-full p-2 flex items-center justify-center text-blue-300">
                <FaEnvelopeOpen />
              </div>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email Address"
                className="w-80 bg-white bg-opacity-30 py-2 px-12 rounded-full focus:bg-black focus:bg-opacity-50 focus:outline-none focus:ring-1 focus:ring-sky-500  focus:drop-shadow-lg"
              />
            </div>
            <div className="relative">
              <div className="absolute top-1 left-1 bg-white bg-opacity-40 rounded-full p-2 flex items-center justify-center text-blue-300">
                <FaLock />
              </div>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                className="w-80 bg-white bg-opacity-30 py-2 px-12 rounded-full focus:bg-black focus:bg-opacity-50 focus:outline-none focus:ring-1 focus:ring-sky-500  focus:drop-shadow-lg"
              />
            </div>
            <button className="bg-gradient-to-r from-blue-400 to-cyan-200 w-80 font-semibold rounded-full py-2">
              Sign In
            </button>
          </form>
          <ToastContainer
            position="top-right"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition:Bounce
          />
          <div className="text-white text-opacity-70 border-t border-white border-opacity-40 pt-4 space-y-4 text-sm">
            <p>
              Don`t have an account?{" "}
              <a
                onClick={gotoSignup}
                className="text-blue-600 font-semibold cursor-pointer"
              >
                Sign up
              </a>
            </p>
            <p>
              {/* Forgot password?{" "}
              <Link  className="text-blue-600 font-semibold cursor-pointer" to = '/forgot'>
                Reset password
              </Link> */}
              Forgot my password?{" "}
              <a
                onClick={gotoForgot}
                className="text-blue-600 font-semibold cursor-pointer"
              >
                Forgot password
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
