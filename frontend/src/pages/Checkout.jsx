import { Outlet, useLocation } from "react-router-dom";
const data = ["Cart", "Address", "Payment"];

export default function Checkout() {
  const { pathname } = useLocation();

  return (
    <main className="flex flex-1 flex-col px-[5%] pt-4 lg:px-[8%]">
      <ul className="mx-auto mb-2 flex text-xs lg:mt-2">
        {data.map((item, index) => {
          return (
            <>
              <li
                key={index}
                className={`${
                  pathname.includes(item.toLowerCase())
                    ? "scale-110 font-medium text-slate-700 duration-100"
                    : "text-gray-400"
                }`}
              >
                {item}
              </li>
              {index < data.length - 1 && (
                <span className="mx-2 text-gray-400">-------</span>
              )}
            </>
          );
        })}
      </ul>
      <Outlet />
    </main>
  );
}
