import { useState } from "react";
import { LuLock } from "react-icons/lu";
import { useForm } from "react-hook-form";
import { BASE_URL } from "../utils/constants";
import { passwordValidation } from "../utils/helper";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

import axios from "axios";
import Button from "../ui/Button";
import Spinner from "../ui/Spinner";
import toast from "react-hot-toast";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isResetPasswordLoading, setIsResetPasswordLoading] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");

  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm();

  const password = watch("password");

  const handleResetPasswordSubmit = async ({ password }) => {
    setIsResetPasswordLoading(true);
    try {
      const res = await axios.post(BASE_URL + "/reset-password", {
        password,
        token,
      });

      if (res.status !== 200) {
        throw new Error(res);
      }

      toast.success(res?.data?.message);
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      console.error(error?.response?.data?.message || error?.message);
      toast.error(error?.response?.data?.message || error?.message);
    } finally {
      setIsResetPasswordLoading(false);
    }
  };

  return (
    <main className="flex h-screen items-center justify-center">
      <div className="w-[90%] rounded-lg bg-slate-100 p-4 md:w-[70%] lg:w-[30%] lg:py-12 xl:w-[25%]">
        <img
          src="https://ik.imagekit.io/akashpatil8/Voguehub/logo-dark.png?updatedAt=1751910271703"
          alt="logo"
          className="mx-auto"
        />
        <h4 className="mt-8 text-center text-2xl">Enter your new password</h4>
        <p className="mb-8 mt-3 text-center font-light text-slate-400">
          Your new password must be different from <br /> previous used password
        </p>
        <form onSubmit={handleSubmit(handleResetPasswordSubmit)}>
          <div className="mb-2 flex w-full items-center gap-2 rounded-sm bg-white px-2 py-2 lg:gap-4 lg:rounded-md lg:px-4">
            <LuLock className="text-slate-500 lg:text-xl" />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              disabled={isResetPasswordLoading}
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
            <p className="mb-2 ml-auto text-[0.6rem] text-red-400 lg:text-xs">
              {errors?.password?.message}
            </p>
          )}
          <div className="mb-2 flex w-full items-center gap-2 rounded-sm bg-white px-2 py-2 lg:gap-4 lg:rounded-md lg:px-4">
            <LuLock className="text-slate-500 lg:text-xl" />
            <input
              id="password"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Password"
              disabled={isResetPasswordLoading}
              {...register("confirmPassword", {
                ...passwordValidation,
                validate: (value) =>
                  value === password || "Passwords did not match",
              })}
              className="h-6 text-sm text-slate-600 placeholder:text-slate-400 focus:outline-none lg:h-8 lg:text-base lg:placeholder:text-base"
            />
            <div className="ml-auto cursor-pointer duration-300 hover:scale-110">
              {showConfirmPassword ? (
                <FaRegEyeSlash
                  onClick={() => setShowConfirmPassword(false)}
                  className="text-sm text-slate-500 lg:text-xl"
                />
              ) : (
                <FaRegEye
                  onClick={() => setShowConfirmPassword(true)}
                  className="text-sm text-slate-500 lg:text-xl"
                />
              )}
            </div>
          </div>
          {errors?.confirmPassword?.message && (
            <p className="mb-2 ml-auto text-[0.6rem] text-red-400 lg:text-xs">
              {errors?.confirmPassword?.message}
            </p>
          )}
          <Button btnType="submit" className="mt-3">
            {isResetPasswordLoading ? <Spinner /> : "Submit"}
          </Button>
        </form>
      </div>
    </main>
  );
}
