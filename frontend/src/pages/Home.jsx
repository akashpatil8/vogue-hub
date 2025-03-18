import AddBanner from "../components/AddBanner";
import Carousal from "../components/Carousal";
import CTA from "../components/CTA";
import Services from "../components/Services";

export default function Home() {
  return (
    <>
      <Carousal />
      <Services />
      <AddBanner />
      <CTA />
    </>
  );
}
