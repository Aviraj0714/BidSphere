import CreateEarnHome from "../";
import HeroHome from "../components/home/HeroHome";
import LiveHome from "../components/home/LiveHome";
import ProcessHome from "../components/home/ProcessHome";
import UpcomingHome from "../components/home/UpcomingHome";

import { register } from "swiper/element/bundle";
// Register Swiper custom elements
register();

const Home = () => {
  return (
    <>
      <HeroHome />
      <div className="container py-5">
        <LiveHome />
        <UpcomingHome />
        <ProcessHome />
        <div className="text-white mt-5">
          <CreateEarnHome />
        </div>
      </div>
    </>
  );
};

export default Home;
