import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import { useDispatch } from "react-redux";
import { addOrder } from "../../redux/slices/orderSlice";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

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

  const handleFormSubmit = ({ name, mobile, street, city, state, postal }) => {
    if (cartItems.length === 0) return toast.error("Please add items to cart");
    const itemIds = cartItems.map((item) => item._id);

    const backendData = {
      name,
      mobile,
      shippingAddress: `${street}, ${city}, ${state}, ${postal}`,
      paymentStatus: "pending",
      totalPrice: total,
      orderItems: itemIds,
    };

    dispatch(addOrder(backendData));

    navigate("/checkout/payment");
  };

  return (
    <section>
      <h2 className="text-2xl font-semibold">Address</h2>
      <hr className="my-2 lg:my-4" />
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="my-4 flex flex-col gap-4 lg:mt-8 lg:max-w-[50%]"
      >
        <input
          type="text"
          placeholder="Full Name"
          className="rounded border border-gray-300 p-2"
          {...register("name", {
            required: "Name is required",
            minLength: {
              value: 3,
              message: "Name must be at least 3 characters",
            },
          })}
        />
        {errors?.name?.message && (
          <p className="-my-2 ml-auto text-[0.6rem] text-red-400 lg:text-xs">
            {errors?.name?.message}
          </p>
        )}
        <input
          type="text"
          placeholder="Mobile Number"
          className="rounded border border-gray-300 p-2"
          {...register("mobile", {
            required: "Mobile number is required",
          })}
        />
        {errors?.mobile?.message && (
          <p className="-my-2 ml-auto text-[0.6rem] text-red-400 lg:text-xs">
            {errors?.mobile?.message}
          </p>
        )}
        <input
          type="text"
          placeholder="Street Address"
          className="rounded border border-gray-300 p-2"
          {...register("street", {
            required: "Street address is required",
          })}
        />
        {errors?.street?.message && (
          <p className="-my-2 ml-auto text-[0.6rem] text-red-400 lg:text-xs">
            {errors?.street?.message}
          </p>
        )}
        <input
          type="text"
          placeholder="City"
          className="rounded border border-gray-300 p-2"
          {...register("city")}
        />
        <input
          type="text"
          placeholder="State/Province/Region"
          className="rounded border border-gray-300 p-2"
          {...register("state", { required: "State is required" })}
        />
        {errors?.state?.message && (
          <p className="-my-2 ml-auto text-[0.6rem] text-red-400 lg:text-xs">
            {errors?.state?.message}
          </p>
        )}
        <input
          type="text"
          placeholder="Postal Code"
          className="rounded border border-gray-300 p-2"
          {...register("postal", {
            required: "Postal code is required",
          })}
        />
        {errors?.postal?.message && (
          <p className="-my-2 ml-auto text-[0.6rem] text-red-400 lg:text-xs">
            {errors?.postal?.message}
          </p>
        )}
        <Button btnType="submit">Continue</Button>
      </form>
    </section>
  );
}
