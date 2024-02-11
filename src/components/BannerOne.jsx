import banner_load from "../assets/banner-load.jpg";
import banner_1 from "../assets/banner-1.jpg";
import banner_2 from "../assets/banner-2.jpg";
import banner_3 from "../assets/banner-3.jpg";
import banner_4 from "../assets/banner-4.jpg";





function BannerOne() {
  return (
    <>
      <div className="col-6">
        <div className="shadow">
          <img className="rounded-1" src={banner_1} alt="img" width={"100%"} />
        </div>
      </div>
      <div className="col-6">
        <div className="row g-2">
          <div className="col-6">
            <div className="shadow">
              <img className="rounded-1" src={banner_2} alt="img" width={"100%"} />
            </div>
          </div>
          <div className="col-6">
            <div className="shadow">
              <img className="rounded-1" src={banner_3} alt="img" width={"100%"} />
            </div>
          </div>
          <div className="col-6">
            <div className="shadow">
              <img className="rounded-1" src={banner_4} alt="img" width={"100%"} />
            </div>
          </div>
          <div className="col-6">
            <div className="shadow">
              <img className="rounded-1" src={banner_load} alt="img" width={"100%"} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BannerOne;
