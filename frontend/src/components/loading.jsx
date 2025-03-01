import { VscLoading } from "react-icons/vsc";
//import "./Loading.css"; // Import CSS for animations

function Loading(props) {
  return (
    <div
      className={`position-relative text-white text-center d-flex flex-column gap-3 align-items-center justify-content-center ${
        props?.width === "sidebar" ? "vh-50" : "vh-100"
      }`}
    >
      <VscLoading size={110} className="text-primary rotating-clockwise" />
      <VscLoading size={70} className="text-primary rotating-counter" />
    </div>
  );
}

export default Loading;
