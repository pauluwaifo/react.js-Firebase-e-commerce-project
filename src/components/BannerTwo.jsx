import { Link } from "react-router-dom";
import CountDownTimer from "./CountDownTimer";

function BannerTwo() {
  return (
    <>
      <div className="col-12">
        <div className="launch_day px-5 py-4">
          <div className="row">
            <div className="col-sm-12 col-lg-6 al-c">
              <span className="d-inline-block bg-danger p-2 text-white fs-1">
                Launch Day Sales
              </span>
              <h2 className="fw-bolder m-0 mt-1"> Up To 50% Discount</h2>
              <h2 className="fw-bolder m-0"> Check it Out</h2>

              <CountDownTimer />

              <Link className="fw-bold mt-4" to={`/view`}>
                Shop Now{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  width={"20"}
                  height={"20"}
                  fill="black"
                  className="svg-icn"
                >
                  <path d="M295.6 163.7c-5.1 5-5.1 13.3-.1 18.4l60.8 60.9H124.9c-7.1 0-12.9 5.8-12.9 13s5.8 13 12.9 13h231.3l-60.8 60.9c-5 5.1-4.9 13.3.1 18.4 5.1 5 13.2 5 18.3-.1l82.4-83c1.1-1.2 2-2.5 2.7-4.1.7-1.6 1-3.3 1-5 0-3.4-1.3-6.6-3.7-9.1l-82.4-83c-4.9-5.2-13.1-5.3-18.2-.3z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BannerTwo;
