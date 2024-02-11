import banner_small_load from "../assets/banner-small-load.jpg";

function PercentOff() {
  return (
    <>
      
      <div className="col-6">
        <div className="shadow">
          <img className="rounded-1" src={banner_small_load} alt="banner" width={"100%"} />
        </div>
      </div>
      <div className="col-6 ">
        <div className="shadow">
          <img className="rounded-1" src={banner_small_load} alt="banner" width={"100%"} />
        </div>
      </div>
    </>
  );
}

export default PercentOff;
