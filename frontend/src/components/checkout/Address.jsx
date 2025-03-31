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
    <section className="mb-4 mt-2 gap-4 lg:flex">
      <aside className="lg:flex-1">
        <h2 className="text-2xl font-semibold">Address</h2>
        <hr className="my-2" />
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="my-4 flex w-full flex-col gap-4 lg:mt-8 lg:max-w-[50%]"
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
