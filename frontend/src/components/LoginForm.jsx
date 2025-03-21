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
    defaultValues: { email: "akash@gmail.com", password: "Akash123" },
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
      className="mt-2 flex flex-col items-center lg:w-[65%]"
    >
      <div className="my-2 flex w-full items-center gap-2 rounded-sm bg-white px-2 py-2 lg:gap-4 lg:rounded-md lg:px-4">
        <LuMail className="text-slate-500 lg:text-xl" />
        <input
          id="email"
          type="text"
          placeholder="Email"
          disabled={isUserLoading}
          {...register("email", { required: "This field is required" })}
          className="h-6 text-sm text-slate-600 placeholder:text-slate-400 focus:outline-none lg:h-8 lg:text-base lg:placeholder:text-base"
        />
        {errors?.email?.message && (
          <p className="ml-auto text-[0.6rem] text-red-400 lg:text-xs">
            {errors?.email?.message}
          </p>
        )}
      </div>

      <div className="my-2 flex w-full items-center gap-2 rounded-sm bg-white px-2 py-2 lg:gap-4 lg:rounded-md lg:px-4">
        <LuLock className="text-slate-500 lg:text-xl" />
        <input
          id="password"
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          disabled={isUserLoading}
          {...register("password", { required: "This field is required" })}
          className="h-6 text-sm text-slate-600 placeholder:text-slate-400 focus:outline-none lg:h-8 lg:text-base lg:placeholder:text-base"
        />
        <div className="ml-auto cursor-pointer duration-300 hover:scale-110">
          {errors?.password?.message ? (
            <p className="ml-auto text-[0.6rem] text-red-400 lg:text-xs">
              {errors?.password?.message}
            </p>
          ) : showPassword ? (
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
      <Button type="simple">Forgot password?</Button>
      <Button btnType="submit">{isUserLoading ? <Spinner /> : "Login"}</Button>
    </form>
  );
}
