import { useState } from "react";
import ProfileComponent from "../components/account/ProfileComponent";
import OrdersComponent from "../components/account/OrdersComponent";
import AddressComponent from "../components/account/AddressComponent";
import PaymentComponent from "../components/account/PaymentComponent";
import FAQComponent from "../components/account/FAQComponent";

const accountMenuData = [
  { name: "Profile", component: <ProfileComponent /> },
  { name: "Orders", component: <OrdersComponent /> },
  { name: "Address", component: <AddressComponent /> },
  { name: "Payment", component: <PaymentComponent /> },
  { name: "FAQ", component: <FAQComponent /> },
];

export default function Account() {
  const [selectedMenu, setSelectedMenu] = useState("Profile");

  const selectedMenuComponent = accountMenuData.find(
    (item) => item.name === selectedMenu,
  )?.component;

  return (
    <main className="flex flex-1 flex-col items-center justify-center px-[5%] pt-4 lg:px-[8%]">
      <div className="flex h-full w-full items-center justify-start">
        <ul className="flex w-[30%] flex-col items-end gap-4 text-right">
          {accountMenuData.map((item) => (
            <li key={item.name} className="w-[50%]">
              <button
                onClick={() => setSelectedMenu(item.name)}
                className={`btn w-full rounded-md border-none text-right text-lg ${selectedMenu === item.name ? "bg-slate-200 font-medium text-slate-800" : "bg-white font-normal text-slate-600 hover:bg-slate-100"}`}
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
        <div className="divider divider-horizontal"></div>
        <div className="flex-1">{selectedMenuComponent}</div>
      </div>
    </main>
  );
}
