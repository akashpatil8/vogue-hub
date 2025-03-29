import { Outlet } from "react-router-dom";

export default function Checkout() {
  return (
    <main className="flex flex-1 flex-col px-[5%] pt-4 lg:px-[8%]">
      <Outlet />
    </main>
  );
}
