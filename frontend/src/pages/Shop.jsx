import { useDispatch, useSelector } from "react-redux";
import { productsData } from "../redux/slices/productsSlice";
import toast from "react-hot-toast";
import { useCallback, useEffect } from "react";

import P from "../ui/P";
import ProductsContainer from "../components/ProductContainer";
import Loader from "../ui/Loader";
import NavigationBar from "../components/NavigationBar";

const variants = {
  initial: { translateY: -30, opacity: 0 },
  final: (time) => ({
    translateY: 0,
    opacity: 1,
    transition: { duration: 0.3, delay: time },
  }),
};

export default function Shop() {
  const dispatch = useDispatch();
  const { products, isProductsLoading } = useSelector(
    (store) => store.products,
  );

  const fetchProducts = useCallback(async () => {
    if (products !== null) return;
    try {
      const resultAction = await dispatch(productsData());

      if (!productsData.fulfilled.match(resultAction)) {
        console.error(resultAction.payload || "Login Error");
        toast.error(resultAction.payload || "Error while logging");
      }
    } catch (error) {
      console.error(error?.message);
    }
  }, [dispatch, products]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <main className="mx-4 flex-1 rounded-md px-2 py-4 lg:m-0 lg:rounded-lg lg:px-[8%]">
      <NavigationBar to="/home" name="Home" itemCount={products?.length} />

      {isProductsLoading && <Loader />}
      {!isProductsLoading && products?.length === 0 && (
        <P variants={variants} custom={0.4}>
          No items to display in the shop
        </P>
      )}
      {!isProductsLoading && products?.length !== 0 && (
        <ProductsContainer items={products} />
      )}
    </main>
  );
}
