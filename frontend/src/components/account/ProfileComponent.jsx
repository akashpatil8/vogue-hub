import toast from "react-hot-toast";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { HiMiniPencil } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { LuMail, LuPhone, LuUserRound } from "react-icons/lu";

import Button from "../../ui/Button";
import Spinner from "../../ui/Spinner";
import profileIcon from "../../../public/assets/profile-icon.png";

import { updateUser, uploadProfilePicture } from "../../redux/slices/userSlice";

export default function ProfileComponent() {
  const dispatch = useDispatch();
  const [previewImage, setPreviewImage] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);

  const { user, isUserDataUpdating, isUserProfilePictureLoading } = useSelector(
    (store) => store.user,
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      mobile: user.mobile,
    },
  });

  const handleProfileSave = async ({ firstName, lastName, mobile }) => {
    try {
      const resultAction = await dispatch(
        updateUser({ firstName, lastName, mobile }),
      );

      if (updateUser.fulfilled.match(resultAction)) {
        toast.success("Profile saved successfully!");
      } else {
        console.error(resultAction.payload || "Error while saving profile");
        toast.error(resultAction.payload || "Error while saving profile");
      }
    } catch (error) {
      console.error(error?.message);
      toast.error(error?.message);
    }
  };

  const handleOnChangeImage = (e) => {
    setProfilePicture(e.target.files[0]);

    const image = URL.createObjectURL(e.target.files[0]);
    setPreviewImage(image);
  };

  const handleSaveProfilePicture = async () => {
    const formData = new FormData();
    formData.append("file", profilePicture);

    const resultAction = await dispatch(uploadProfilePicture(formData));

    if (uploadProfilePicture.fulfilled.match(resultAction)) {
      toast.success("Profile picture saved successfully!");
    } else {
      console.error(resultAction.payload || "Error while saving profile");
      toast.error(resultAction.payload || "Error while saving profile");
    }
    document.getElementById("my_modal_2").close();
    setPreviewImage(null);
  };

  return (
    <form
      onSubmit={handleSubmit(handleProfileSave)}
      className="mt-2 flex w-[60%] flex-col items-center"
    >
      {/* Dialog for image upload */}
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box flex flex-col">
          <h3 className="text-lg font-bold">Please select profile picture</h3>
          <div className="avatar mx-auto my-6">
            <div className="w-44 rounded-full">
              <img src={previewImage || profileIcon} />
            </div>
          </div>
          <div className="mb-5">
            <input
              onChange={handleOnChangeImage}
              type="file"
              className="file-input w-full max-w-xs"
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSaveProfilePicture}>
              {isUserProfilePictureLoading ? "Loading" : "Upload"}
            </Button>

            <Button
              onClick={() => document.getElementById("my_modal_2").close()}
            >
              Close
            </Button>
          </div>
        </div>
      </dialog>

      <div className="avatar mb-8">
        <div className="w-24 rounded-full ring ring-slate-400 ring-offset-2 ring-offset-base-100">
          <button
            //Opens the dialog for image upload
            onClick={() => document.getElementById("my_modal_2").showModal()}
            type="button"
            className="absolute bottom-0 right-0 rounded-full border-[1px] border-slate-500 bg-slate-200 p-1"
          >
            <HiMiniPencil className="text-xs text-slate-500 lg:text-sm" />
          </button>
          <img
            src={
              user.imageUrl
                ? `http://127.0.0.1:4000/uploads/${user.imageUrl}`
                : profileIcon
            }
          />
        </div>
      </div>

      <div className="flex w-full gap-4">
        <div className="my-2 flex w-full items-center gap-2 rounded-sm bg-slate-200 px-2 py-2 lg:rounded-md lg:px-4">
          <LuUserRound className="text-slate-500 lg:text-xl" />
          <input
            id="firstName"
            type="text"
            placeholder="First Name"
            disabled={isUserDataUpdating}
            {...register("firstName", {
              required: "This field is required",
            })}
            className="h-6 bg-inherit text-sm text-slate-800 placeholder:text-slate-500 focus:outline-none lg:h-8 lg:text-base lg:placeholder:text-base"
          />
          {errors?.firstName?.message && (
            <p className="ml-auto text-[0.6rem] text-red-400 lg:text-xs">
              {errors?.firstName?.message}
            </p>
          )}
        </div>
        <div className="my-2 flex w-full items-center gap-2 rounded-sm bg-slate-200 px-2 py-2 lg:rounded-md lg:px-4">
          <LuUserRound className="text-slate-500 lg:text-xl" />
          <input
            id="lastName"
            type="text"
            placeholder="Last Name"
            disabled={isUserDataUpdating}
            {...register("lastName", {
              required: "This field is required",
            })}
            className="h-6 bg-inherit text-sm text-slate-800 placeholder:text-slate-500 focus:outline-none lg:h-8 lg:text-base lg:placeholder:text-base"
          />
          {errors?.lastName?.message && (
            <p className="ml-auto text-[0.6rem] text-red-400 lg:text-xs">
              {errors?.lastName?.message}
            </p>
          )}
        </div>
      </div>
      <div className="my-2 flex w-full items-center gap-2 rounded-sm bg-slate-200 px-2 py-2 lg:rounded-md lg:px-4">
        <LuPhone className="text-slate-500 lg:text-xl" />
        <input
          id="mobile"
          type="text"
          placeholder="Mobile Number"
          disabled={isUserDataUpdating}
          {...register("mobile", { required: "This field is required" })}
          className="h-6 bg-inherit text-sm text-slate-800 placeholder:text-slate-500 focus:outline-none lg:h-8 lg:text-base lg:placeholder:text-base"
        />
        {errors?.mobile?.message && (
          <p className="ml-auto text-[0.6rem] text-red-400 lg:text-xs">
            {errors?.mobile?.message}
          </p>
        )}
      </div>
      <div className="mb-4 mt-2 flex w-full items-center gap-2 rounded-sm bg-slate-200 px-2 py-2 lg:rounded-md lg:px-4">
        <LuMail className="text-slate-500 lg:text-xl" />
        <input
          id="email"
          type="text"
          placeholder={user?.email}
          disabled={true}
          {...register("email")}
          className="h-6 cursor-not-allowed bg-inherit text-sm text-slate-800 placeholder:text-slate-500 focus:outline-none lg:h-8 lg:text-base lg:placeholder:text-base"
        />
        {errors?.email?.message && (
          <p className="ml-auto text-[0.6rem] text-red-400 lg:text-xs">
            {errors?.email?.message}
          </p>
        )}
      </div>

      <Button btnType="submit">
        {isUserDataUpdating ? <Spinner /> : "Save"}
      </Button>
    </form>
  );
}
