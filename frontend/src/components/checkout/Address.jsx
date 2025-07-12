import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import { useDispatch } from "react-redux";
import { addOrder } from "../../redux/slices/orderSlice";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { LuBuilding2, LuPhone, LuUserRound } from "react-icons/lu";
import {
  firstNameValidation,
  mobileValidate,
  pinCodeValidation,
} from "../../utils/helper";
import { FaRegAddressBook } from "react-icons/fa";
import { PiLetterCirclePBold } from "react-icons/pi";
import { GrLocation } from "react-icons/gr";

export default function Address() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    state: { total, cartItems },
  } = useLocation();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const handleFormSubmit = async ({
    name,
    mobile,
    address,
    city,
    state,
    pin,
  }) => {
    if (cartItems.length === 0) return toast.error("Please add items to cart");

    const itemIds = cartItems.map((item) => item._id);

    const backendData = {
      name,
      mobile,
      shippingAddress: `${address}, ${city}, ${state}, ${pin}`,
      totalPrice: total,
      orderItems: itemIds,
    };

    const resultAction = await dispatch(addOrder(backendData));

    if (addOrder.fulfilled.match(resultAction)) {
      navigate("/checkout/payment");
    } else {
      console.error(resultAction.payload || "Error while placing order");
      toast.error(resultAction.payload || "Error while placing order");
    }
  };

  return (
    <section className="mb-4 mt-2 gap-4 lg:flex">
      <aside className="lg:flex-1">
        <h2 className="text-2xl font-semibold">Address</h2>
        <hr className="my-2" />
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="my-4 flex w-full flex-col gap-4 lg:mt-8 lg:max-w-[50%]"
        >
          <InputComponent
            placeholder="Full Name"
            id="name"
            icon={<LuUserRound className="text-slate-500 lg:text-xl" />}
            register={register("name", firstNameValidation)}
            error={errors?.name?.message}
          />
          <InputComponent
            placeholder="Mobile"
            id="mobile"
            icon={<LuPhone className="text-slate-500 lg:text-xl" />}
            register={register("mobile", mobileValidate)}
            error={errors?.mobile?.message}
          />
          <InputComponent
            placeholder="Address"
            id="address"
            icon={<FaRegAddressBook className="text-slate-500 lg:text-xl" />}
            register={register("address", {
              required: "Address is required.",
              minLength: { value: 5, message: "Address is short" },
            })}
            error={errors?.address?.message}
          />
          <InputComponent
            placeholder="City"
            id="city"
            icon={<LuBuilding2 className="text-slate-500 lg:text-xl" />}
            register={register("city", { required: "City is required." })}
            error={errors?.city?.message}
          />
          <InputComponent
            placeholder="State"
            id="state"
            icon={<GrLocation className="text-slate-500 lg:text-xl" />}
            register={register("state", { required: "State is required." })}
            error={errors?.state?.message}
          />
          <InputComponent
            placeholder="Pin code"
            id="pin"
            icon={<PiLetterCirclePBold className="text-slate-500 lg:text-xl" />}
            register={register("pin", pinCodeValidation)}
            error={errors?.pin?.message}
          />
        </form>
      </aside>
      <div className="w-[1px] bg-[#e5e7eb]"></div>
      <aside className="lg:w-[35%]">
        <h2 className="text-2xl font-semibold">Order Summary</h2>
        <hr className="my-2" />
        <div className="flex max-h-[225px] flex-col gap-2 overflow-auto lg:mt-8">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between rounded border border-gray-300 p-1"
            >
              <div className="flex items-center gap-2">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="h-[40px] w-[25px] rounded-sm object-cover"
                />
                <p className="text-xs">{item.name}</p>
              </div>
              <p className="text-sm font-semibold">₹{item.price}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between rounded border border-gray-300 p-2 font-semibold">
          <p>Total</p>
          <p>₹{total}</p>
        </div>
        <div className="pt-4">
          <Button
            type="large"
            btnType="submit"
            onClick={handleSubmit(handleFormSubmit)}
          >
            Proceed to Payment
          </Button>
        </div>
      </aside>
    </section>
  );
}

const InputComponent = ({
  icon,
  register,
  type = "text",
  disabled = false,
  placeholder = "",
  id = "",
  error = "",
}) => {
  return (
    <div className="mb-1">
      <div className="flex w-full items-center gap-2 rounded-sm border-[1px] border-slate-300 bg-white px-2 py-2 focus:outline-1 lg:rounded-md lg:px-4">
        {icon}
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          {...register}
          className="h-6 text-sm text-slate-600 placeholder:text-slate-400 focus:outline-none lg:h-8 lg:text-base lg:placeholder:text-base"
        />
      </div>
      {error && (
        <p className="ml-auto text-[0.6rem] text-red-400 lg:text-xs">{error}</p>
      )}
    </div>
  );
};
