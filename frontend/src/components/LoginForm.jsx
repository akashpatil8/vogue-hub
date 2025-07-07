import { useState } from "react";
import { useForm } from "react-hook-form";
import { LuLock, LuMail } from "react-icons/lu";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

import Button from "../ui/Button";

import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/slices/userSlice";
import Spinner from "../ui/Spinner";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { emailValidation, passwordValidation } from "../utils/helper";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { isUserLoading } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "test@gmail.com", password: "Test@123" },
  });

  const handleLogin = async ({ email, password }) => {
    try {
      const resultAction = await dispatch(loginUser({ email, password }));

      if (loginUser.fulfilled.match(resultAction)) {
        navigate("/");
      } else {
        console.error(resultAction.payload || "Login Error");
        toast.error(resultAction.payload || "Error while logging");
      }
    } catch (error) {
      console.error(error?.message);
      toast.error(error?.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleLogin)}
      className="mt-2 flex w-full flex-col items-center lg:w-[65%]"
    >
      <div className="my-2 flex w-full items-center gap-2 rounded-sm bg-white px-2 py-2 lg:gap-4 lg:rounded-md lg:px-4">
        <LuMail className="text-slate-500 lg:text-xl" />
        <input
          id="email"
          type="text"
          placeholder="Email"
          disabled={isUserLoading}
          {...register("email", emailValidation)}
          className="h-6 text-sm text-slate-600 placeholder:text-slate-400 focus:outline-none lg:h-8 lg:text-base lg:placeholder:text-base"
        />
      </div>
      {errors?.email?.message && (
        <p className="ml-auto text-[0.6rem] text-red-400 lg:text-xs">
          {errors?.email?.message}
        </p>
      )}
      <div className="my-2 flex w-full items-center gap-2 rounded-sm bg-white px-2 py-2 lg:gap-4 lg:rounded-md lg:px-4">
        <LuLock className="text-slate-500 lg:text-xl" />
        <input
          id="password"
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          disabled={isUserLoading}
          {...register("password", passwordValidation)}
          className="h-6 text-sm text-slate-600 placeholder:text-slate-400 focus:outline-none lg:h-8 lg:text-base lg:placeholder:text-base"
        />
        <div className="ml-auto cursor-pointer duration-300 hover:scale-110">
          {showPassword ? (
            <FaRegEyeSlash
              onClick={() => setShowPassword(false)}
              className="text-sm text-slate-500 lg:text-xl"
            />
          ) : (
            <FaRegEye
              onClick={() => setShowPassword(true)}
              className="text-sm text-slate-500 lg:text-xl"
            />
          )}
        </div>
      </div>
      {errors?.password?.message && (
        <p className="ml-auto text-[0.6rem] text-red-400 lg:text-xs">
          {errors?.password?.message}
        </p>
      )}
      <div className="my-1 flex w-full items-center justify-between">
        <div className="flex items-center">
          <input
            type="checkbox"
            name="rememberMe"
            id="remember-me"
            className="mr-2 accent-slate-800"
          />
          <label
            htmlFor="remember-me"
            className="text-xs text-slate-400 lg:text-sm"
          >
            Remember me
          </label>
        </div>
        <button className="text-xs text-slate-400 lg:text-sm">
          Forget password?
        </button>
      </div>
      <Button btnType="submit" className="mt-2">
        {isUserLoading ? <Spinner /> : "Login"}
      </Button>
    </form>
  );
}
