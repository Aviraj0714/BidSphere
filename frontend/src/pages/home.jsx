import CreateEarnHome from "../components/home/createearn";
import HeroHome from "../components/home/herohome";
import LiveHome from "../components/home/livehome";
import ProcessHome from "../components/home/mainhome";
import UpcomingHome from "../components/home/upcomminghome";

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
