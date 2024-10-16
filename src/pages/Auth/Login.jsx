import React from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { base_url } from "../../utils/url";
import { colors } from "../../constants/data";
import { useContext } from "react";
import { AppContext } from "../../context";
import { Button, Page } from "../../components";
import toast from "react-hot-toast";
import { call } from "../../utils/helper";

const Login = () => {
  const { user, setUser } = useContext(AppContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState({ isVisible: false, value: "" });
  const [toggleBtn, setToggleBtn] = useState(false);

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword({ ...password, value });
    }
  };

  const togglePassword = () =>
    setPassword((prev) => ({ ...prev, isVisible: !prev.isVisible }));

  const handleSubmit = async (e) => {
    setToggleBtn(true);
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password.value);
      console.log("formData", formData);
      const response = await call("/admin/login", "POST", formData);
      localStorage.setItem("user_detail", JSON.stringify(response?.data));
      setUser(response.data);
      toast.success(response?.message, { duration: 2000 });
      setToggleBtn(false);
    } catch (error) {
      toast.error(error?.message, { duration: 2000 });
      setToggleBtn(false);
    }
  };

  return (
    <Page
      title="Login"
      containerStyles="!h-screen !w-screen flex justify-center items-center"
    >
      <main className="w-full max-w-sm mx-4">
        <section className="w-full px-6 pt-6 bg-white border rounded-lg shadow-2xl pb-9">
          <h1 className="mb-6 text-xl font-bold leading-tight text-center text-blue-600">
            Copify <br /> Administrator
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <input
                type="email"
                name="email"
                id="email"
                onChange={handleChange}
                value={email}
                className="block w-full px-4 py-3 text-xs font-medium text-gray-900 bg-gray-100 rounded-md outline-none focus:ring-blue-500 focus:border-blue-500 caret-blue-400"
                placeholder="Email"
                required={true}
              />
            </div>
            <div className="flex items-center w-full mb-1 overflow-hidden text-xs font-medium text-gray-900 bg-gray-100 rounded-md focus:ring-blue-500 focus:border-blue-500">
              <input
                type={password.isVisible ? "text" : "password"}
                name="password"
                id="password"
                onChange={handleChange}
                value={password.value}
                className="w-full px-4 py-3 text-gray-900 bg-gray-100 outline-none caret-blue-400"
                placeholder="Password"
                required={true}
              />
              <div className="w-10 text-lg text-blue-500">
                {password.isVisible ? (
                  <AiFillEyeInvisible
                    onClick={togglePassword}
                    className="cursor-pointer"
                  />
                ) : (
                  <AiFillEye
                    onClick={togglePassword}
                    className="cursor-pointer"
                  />
                )}
              </div>
            </div>
            <div className="w-full text-right text-[11px] font-medium mb-3 mt-2">
              <Link
                to={"/forgot-password"}
                className="hover:text-blue-400 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
            <Button
              isLoading={toggleBtn}
              type="submit"
              title={toggleBtn ? "Logging in" : "Login"}
              extraStyles={toggleBtn ? "!py-2 !w-full" : "!py-3 !w-full"}
            />
          </form>
        </section>
      </main>
    </Page>
  );
};

export default Login;
