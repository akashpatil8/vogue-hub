import { ClipLoader } from "react-spinners";

export default function Spinner({ type }) {
  if (type === "dark") return <ClipLoader color="black[700]" size={20} />;

  return <ClipLoader color="lightgray" size={20} />;
}
