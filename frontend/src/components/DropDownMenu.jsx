import { motion } from "framer-motion";

import Button from "../ui/Button";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import Spinner from "../ui/Spinner";
import { dropDownMenuData } from "../../public/data/dropDownMenuData";

export default function DropDownMenu({ setShowDialog }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isUserLoading } = useSelector((store) => store.user);

  const handleLogout = async () => {
    try {
      const requestAction = await dispatch(logoutUser());

      if (logoutUser.fulfilled.match(requestAction)) {
        navigate("/login");
        setShowDialog(false);
      } else {
        console.error(requestAction.payload || "Error while logging out");
        toast.error(requestAction.payload || "Error while logging out");
      }
    } catch (error) {
      console.error(error?.message);
      toast.error(error?.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15 }}
      style={{ translateX: "50%" }}
      className="absolute right-1/2 top-8 z-10 w-32 items-start rounded-md bg-slate-100 px-3 py-2 text-center shadow-[3px_3px_15px_0_rgba(0,0,0,0.3)] lg:w-auto lg:px-6 lg:py-4 lg:text-left"
    >
      <div className="absolute left-0 right-0 bg-transparent lg:-top-2 lg:h-2"></div>

      <p className="pt-2 text-sm font-light text-slate-600 lg:text-lg">
        Hello, <span className="font-bold capitalize">{user?.firstName}</span>
      </p>
      <hr className="mb-2 mt-1 w-full border-slate-300" />
      {dropDownMenuData.map((item) => (
        <p
          key={item.name}
          onClick={() => {
            navigate(item.to);
            setShowDialog(false);
          }}
          className="my-1 cursor-pointer rounded-md p-2 text-sm font-light text-slate-600 hover:bg-slate-200 hover:font-medium hover:text-slate-800 lg:text-base"
        >
          {item.name}
        </p>
      ))}
      <hr className="my-2 w-full border-slate-300" />
      <Button type="small" onClick={handleLogout}>
        {isUserLoading ? <Spinner /> : <span>Logout</span>}
      </Button>
    </motion.div>
  );
}
