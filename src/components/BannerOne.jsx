import banner_load from "../assets/banner-load.jpg";
import brand_banner from "/banner_images/brand_banner.jpg";





function BannerOne() {
  return (
    <div className="col-12">
      <div className="shadow">
        <img src={brand_banner} alt="brand-banner" width={"100%"}/>
      </div>
      
    </div>
  );
}

export default BannerOne;
