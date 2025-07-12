import { format } from "date-fns";
import toast from "react-hot-toast";
import { BsBoxSeam } from "react-icons/bs";
import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../redux/slices/orderSlice";

export default function OrdersComponent() {
  const dispatch = useDispatch();
  const { orders, isOrdersLoading } = useSelector((store) => store.orders);

  const fetchOrders = useCallback(async () => {
    try {
      const ordersResultAction = await dispatch(getOrders());

      if (!getOrders.fulfilled.match(ordersResultAction)) {
        console.error(
          ordersResultAction.payload || "Error while fetching cart",
        );
        toast.error(ordersResultAction.payload || "Error while fetching cart");
      }
    } catch (error) {
      console.error(error.message);
      toast.error(error.message);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <ul className="flex flex-col gap-2">
      {/* If orders are loading */}
      {isOrdersLoading &&
        Array.from({ length: 3 }, (_, i) => (
          <div key={i} className="w-full rounded-md border-[1px] p-4">
            <div className="mb-2 flex items-center gap-3">
              <div className="h-8 w-8 animate-pulse rounded-full bg-slate-200" />
              <div>
                <div className="mb-1 h-4 w-20 animate-pulse rounded-sm bg-slate-200" />
                <div className="h-3 w-24 animate-pulse rounded-sm bg-slate-200" />
              </div>
            </div>
            <div className="h-24 w-full animate-pulse rounded-sm bg-slate-200" />
          </div>
        ))}

      {/* If there are no orders */}
      {orders?.length === 0 && !isOrdersLoading && (
        <h1 className="h-full text-xl">No orders to display</h1>
      )}

      {/* If orders are present */}
      {orders?.length > 0 &&
        !isOrdersLoading &&
        orders?.map((order) =>
          order.orderItems?.map((item) => (
            <li
              key={`${order?.id}-${item._id}`}
              className="rounded-md border-[1px] p-4"
            >
              <div className="flex items-center gap-3">
                <div className="grid h-8 w-8 place-content-center rounded-full bg-slate-800">
                  <BsBoxSeam color="#fff" />
                </div>
                <div>
                  {order.isOrderDeliverd ? (
                    <p className="-mb-0.5 font-semibold text-green-700">
                      Delivered
                    </p>
                  ) : (
                    <p className="-mb-0.5 font-semibold text-slate-800">
                      Ordered
                    </p>
                  )}
                  <p className="text-xs text-slate-400">
                    On {format(order.createdAt, "eee, dd MMM yyyy")}
                  </p>
                </div>
              </div>
              <div className="mt-3 flex cursor-pointer gap-4 rounded-md bg-slate-100/70 p-4 hover:bg-slate-200">
                <div className="h-18 w-12">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="h-full w-full rounded-md bg-cover"
                  />
                </div>
                <div>
                  <h1 className="mb-1 text-sm font-semibold">{item.brand}</h1>
                  <p className="mb-1 text-sm text-slate-800">{item.name}</p>
                  <p className="text-sm text-slate-800">Size: {item.size}</p>
                </div>
              </div>
              {order.isOrderDeliverd && (
                <div className="mt-2 flex items-center gap-3 bg-slate-100/70 p-4">
                  <div className="h-2 w-2 rounded-full bg-slate-500" />
                  <p className="text-sm text-slate-500">
                    {exchangeReturnWindowStatus(order.deliveryDate)}
                  </p>
                </div>
              )}
            </li>
          )),
        )}
    </ul>
  );
}

const exchangeReturnWindowStatus = (date) => {
  const deliveryDate = new Date(date); // convert string to Date object
  const exchangeDate = new Date(
    deliveryDate.getTime() + 14 * 24 * 60 * 60 * 1000,
  ); // add 14 days
  const currentDate = new Date();

  if (exchangeDate >= currentDate) {
    return `Exchange/Return window will close on ${format(exchangeDate, "eee, dd MMM yyyy")}`;
  } else {
    return `Exchange/Return window closed on ${format(exchangeDate, "eee, dd MMM yyyy")}`;
  }
};
