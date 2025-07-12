import { useState } from "react";
import { LuLock, LuMail, LuUserRound } from "react-icons/lu";
import { useForm } from "react-hook-form";

import Button from "../ui/Button";
import Spinner from "../ui/Spinner";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import {
  emailValidation,
  firstNameValidation,
  lastNameValidation,
  passwordValidation,
} from "../utils/helper";

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { isUserLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSignUp = async ({ firstName, lastName, email, password }) => {
    try {
      const resultAction = await dispatch(
        signupUser({ firstName, lastName, email, password }),
      );

      if (signupUser.fulfilled.match(resultAction)) {
        navigate("/home");
      } else {
        console.error(resultAction.payload || "Sign Up Error");
        toast.error(resultAction.payload || "Error while signing up");
      }
    } catch (error) {
      console.error(error?.message);
      toast.error(error?.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleSignUp)}
      className="mt-2 flex w-full flex-col items-center lg:w-[90%]"
    >
      <div className="flex w-full flex-col lg:flex-row lg:gap-4">
        <div className="flex-1 text-end">
          <div className="my-2 flex w-full items-center gap-2 rounded-sm bg-white px-2 py-2 lg:rounded-md lg:px-4">
            <LuUserRound className="text-slate-500 lg:text-xl" />
            <input
              id="firstName"
              type="text"
              placeholder="First Name"
              disabled={isUserLoading}
              {...register("firstName", firstNameValidation)}
              className="h-6 text-sm text-slate-600 placeholder:text-slate-400 focus:outline-none lg:h-8 lg:text-base lg:placeholder:text-base"
            />
          </div>
          {errors?.firstName?.message && (
            <p className="ml-auto text-[0.6rem] text-red-400 lg:text-xs">
              {errors?.firstName?.message}
            </p>
          )}
        </div>
        <div className="flex-1 text-end">
          <div className="my-2 flex w-full items-center gap-2 rounded-sm bg-white px-2 py-2 lg:rounded-md lg:px-4">
            <LuUserRound className="text-slate-500 lg:text-xl" />
            <input
              id="lastName"
              type="text"
              placeholder="Last Name"
              disabled={isUserLoading}
              {...register("lastName", lastNameValidation)}
              className="h-6 text-sm text-slate-600 placeholder:text-slate-400 focus:outline-none lg:h-8 lg:text-base lg:placeholder:text-base"
            />
          </div>
          {errors?.lastName?.message && (
            <p className="ml-auto text-[0.6rem] text-red-400 lg:text-xs">
              {errors?.lastName?.message}
            </p>
          )}
        </div>
      </div>

      <div className="my-2 flex w-full items-center gap-2 rounded-sm bg-white px-2 py-2 lg:rounded-md lg:px-4">
        <LuMail className="text-slate-500 lg:text-xl" />
        <input
          id="email"
          type="text"
          placeholder="Email"
          disabled={isUserLoading}
          {...register("email", emailValidation)}
          className="h-6 flex-1 text-sm text-slate-600 placeholder:text-slate-400 focus:outline-none lg:h-8 lg:text-base lg:placeholder:text-base"
        />
      </div>
      {errors?.email?.message && (
        <p className="ml-auto text-[0.6rem] text-red-400 lg:text-xs">
          {errors?.email?.message}
        </p>
      )}

      <div className="my-2 flex w-full items-center gap-2 rounded-sm bg-white px-2 py-2 lg:rounded-md lg:px-4">
        <LuLock className="text-slate-500 lg:text-xl" />
        <input
          id="password"
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          disabled={isUserLoading}
          {...register("password", passwordValidation)}
          className="h-6 flex-1 text-sm text-slate-600 placeholder:text-slate-400 focus:outline-none lg:h-8 lg:text-base lg:placeholder:text-base"
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
      <Button btnType="submit" className="mt-2">
        {isUserLoading ? <Spinner /> : "Sign Up"}
      </Button>
    </form>
  );
}
