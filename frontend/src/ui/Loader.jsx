import React from "react";
import { PulseLoader } from "react-spinners";

export default function Loader() {
  return (
    <div className="flex h-screen items-center justify-center">
      <PulseLoader color="lightgray" />
    </div>
  );
}
