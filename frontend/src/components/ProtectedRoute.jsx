import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../ui/Loader";

export default function ProtectedRoute({ children }) {
  const { user, isUserLoading, userError } = useSelector((store) => store.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !isUserLoading) {
      navigate("/login");
      return;
    }
  }, [user, isUserLoading, navigate]);

  if (userError) console.error(userError);

  if (isUserLoading) return <Loader />;

  return <div>{children}</div>;
}
