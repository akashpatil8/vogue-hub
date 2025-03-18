export default function TabButton({ selected, children, onClick, tabName }) {
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-sm py-2 text-[0.7rem] transition-colors duration-300 hover:bg-slate-300 focus:outline-none focus:ring-[1px] focus:ring-gray-400 lg:rounded-md lg:py-4 lg:text-base ${selected === tabName && "bg-slate-600 font-semibold text-slate-100 hover:bg-slate-600"}`}
    >
      {children}
    </button>
  );
}
