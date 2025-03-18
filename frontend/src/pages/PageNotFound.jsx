import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";

import error404 from "../../public/assets/404-error.jpg";

export default function PageNotFound() {
  const navigate = useNavigate();
  return (
    <main className="h-screen w-screen px-[8%] py-16">
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 rounded-sm px-2 text-slate-800 capitalize focus:ring-1 focus:ring-gray-800 focus:outline-none"
      >
        <GoArrowLeft size={22} />
        <span>Home</span>
      </button>
      <div className="flex h-[70%] items-center justify-center">
        <img
          src={error404}
          alt="error-img"
          className="mx-auto my-auto h-[80%]"
        />
      </div>
    </main>
  );
}
