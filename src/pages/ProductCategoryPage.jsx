import { useContext, useState, useEffect } from "react";
import { parsePath, useParams } from "react-router-dom";
import AppContext from "../contexts/appContext";
import { Link } from "react-router-dom";
import StarRating from "../components/StarRating";
import AddToCartScreen from "../components/AddToCartScreen";

function ProductCategoryPage() {
  const { category } = useParams();
  const { productData, loading } = useContext(AppContext);
  const path = parsePath(category).pathname;
  const [priceRange, setPriceRange] = useState(null);
  const [isBrand, setIsBrand] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState([]);
  const [brandSearchFilter, setBrandSearchFilter] = useState(null);
  const [display, setDisplay] = useState("none");
  const [itemId, setItemId] = useState(null);

  // FILTERED DATA FOR ITEMS SUB CATEGORY
  const uniqueSubcategories = [];
  const filterSubcategory = productData.filter((item) => {
    if (path.toLowerCase() === item.category.toLowerCase()) {
      if (!uniqueSubcategories.includes(item.subcategory)) {
        uniqueSubcategories.push(item.subcategory);
        return true;
      }
    }
    return false;
  });
  // FILTERED DATA FOR ITEMS SUB CATEGORY
  const uniqueBrand = [];
  const filterBrand = productData.filter((item) => {
    if (path.toLowerCase() === item.category.toLowerCase()) {
      if (item.brand && !uniqueBrand.includes(item.brand)) {
        uniqueBrand.push(item.brand);
        return true;
      }
    }
    return false;
  });

  // FILTER BRAND

  useEffect(() => {
    window.scrollTo(0, 0);
    if (filterBrand.length > 0) {
      setIsBrand(true);
    }
  }, [selectedBrand, priceRange]);

  const handleSelectedBrand = (item) => {
    // Check if the item's brand is already in brandFilter
    if (selectedBrand.includes(item.brand)) {
      // Remove the item with the matching brand
      const updatedFilter = selectedBrand.filter(
        (filterItem) => filterItem !== item.brand
      );
      setSelectedBrand(updatedFilter);
    } else {
      // Add the item's brand to brandFilter
      setSelectedBrand([...selectedBrand, item.brand]);
    }
  };

  // CAMEL CASE MY WORD
  function camelCase(inputString) {
    const spaceSeparatedString = inputString.replace(/-/g, " ");
    const camelCaseString = spaceSeparatedString.replace(
      /\s+([a-z])/g,
      (_, group) => group.toUpperCase()
    );
    return camelCaseString.charAt(0).toUpperCase() + camelCaseString.slice(1);
  }

  // PRICE RANGE FILTER
  const filteredItems = productData.filter((item) => {
    if (path.toLowerCase() === item.category.toLowerCase()) {
      const applySelectedBrand =
        selectedBrand.length > 0 ? selectedBrand.includes(item.brand) : true;

      const applyPriceFilter = (min, max) => {
        if (item.variants && item.variants.length > 0) {
          return item.variants.some((variant) => {
            const priceInRange =
              variant.price && variant.price >= min && variant.price <= max;
            const sizePriceInRange = variant.sizes
              ? variant.sizes.some(
                  (size) => size.price >= min && size.price <= max
                )
              : false;

            return selectedBrand.length > 0
              ? applySelectedBrand && (priceInRange || sizePriceInRange)
              : priceInRange || sizePriceInRange;
          });
        }

        const itemPriceInRange = item.discountPrice
          ? item.discountPrice >= min && item.discountPrice <= max
          : item.price >= min && item.price <= max;

        return selectedBrand.length > 0
          ? applySelectedBrand && itemPriceInRange
          : itemPriceInRange;
      };

      switch (priceRange) {
        case "2":
          return applyPriceFilter(0, 2000);
        case "2/5":
          return applyPriceFilter(2000, 5000);
        case "5/10":
          return applyPriceFilter(5000, 10000);
        case "10/20":
          return applyPriceFilter(10000, 20000);
        case "20/40":
          return applyPriceFilter(20000, 40000);
        case "40":
          return applyPriceFilter(40000, Number.MAX_SAFE_INTEGER);
        default:
          return applySelectedBrand;
      }
    }
  });

  // RETURN DATA
  const categoryPage = filteredItems.map((item, i) => {
    if (path.toLowerCase() === item.category.toLowerCase()) {
      return (
        // CARD
        <section key={i} className="mt-2">
          <div className="carousel-card w-12_9r">
            <Link to={item.qty < 1 ? "" : `/product_/${item.id}`}>
              <div className="" key={i}>
                {/* CARD IMAGE */}
                <div className="carousel-img">
                  {item.url.length > 0 ? (
                    <img
                      src={
                        !loading && item.url[0].img
                          ? `../${item.url[0].img}`
                          : loadImg
                      }
                      alt="product-img"
                      width={"100%"}
                      height={"100%"}
                    />
                  ) : null}
                </div>
                {/* CARD TEXT */}
                <div className="carousel-text_ct">
                  <StarRating />
                  {/* ITEM NAME */}
                  <span className="fl-b-100 al-l d-block">{item.name}</span>
                  {/* ITEM BRAND */}
                  <span className="d-inline-block fs-p6 text-black-70">
                    Brand
                  </span>
                  <span className="fl-b-100 al-l mx-2 fs-p6 text-danger d-inline-block bg-danger-10 px-2 ">
                    {item.brand}
                  </span>

                  {/* DISCOUNT PRICE AND ORIGINAL PRICE */}
                  <section className="border-tb mt-1 py-1 b-color-grey-l">
                    {/* DISCOUNT PRICE */}

                    <span className="d-block fs-1 al-l fs-1 fw-bold rounded-2 mt-1">
                      {item.discountPrice && `₦${item.discountPrice}`}
                    </span>
                    {/* ITEM PRICE */}
                    <span
                      className={`al-l fw-bold d-inline-block rounded-2 ${
                        item.discountPrice ? `_dcp` : `fs-1`
                      }`}
                    >
                      {item.variants && item.variants.length > 0 ? (
                        <>
                          {(() => {
                            const allPrices = item.variants.flatMap(
                              (variant) => {
                                if (variant.sizes) {
                                  return variant.sizes.map(
                                    (size) => size.price
                                  );
                                } else if (variant.price) {
                                  return [parseFloat(variant.price)];
                                }
                                return [];
                              }
                            );

                            const minPrice = Math.min(...allPrices);
                            const maxPrice = Math.max(...allPrices);

                            return (
                              <span>
                                {`₦${minPrice.toFixed(0)} - ₦${maxPrice.toFixed(
                                  0
                                )}`}
                              </span>
                            );
                          })()}
                        </>
                      ) : (
                        `₦${item.price}`
                      )}
                    </span>
                    {/* DISCOUNT PERCENTAGE CALCULATOR */}
                    {item.discountPrice && (
                      <span className=" text-primary bg-primary-10 d-inline-block fs-p7 px-1 mx-1">
                        {(() => {
                          if (
                            item.price <= 0 ||
                            item.discountPrice <= 0 ||
                            item.discountPrice >= item.Price
                          ) {
                            console.error("Invalid input values");
                            return null;
                          }

                          const discountAmount =
                            item.price - item.discountPrice;
                          const discountPercentage =
                            (discountAmount / item.price) * 100;

                          return `${Math.floor(discountPercentage)}% OFF`;
                        })()}
                      </span>
                    )}
                  </section>
                </div>
              </div>
            </Link>
            {/* CARD BUTTON */}
            <div className="px-1 mt-3 my-1">
              <button
                onClick={(e) => (setDisplay("block"), setItemId(item.id))}
                className={`_crd_btn ${item.qty < 1 ? "disabled" : null}`}
              >
                {item.qty < 1 ? "SOLD OUT" : "ADD TO CART"}
              </button>
            </div>
          </div>
        </section>
      );
    }
    return null;
  });

  return (
    <div className="container mt-14">
      <div className="row g-3">
        {/* ADD TO CART SCREEN POP UP */}
        {<AddToCartScreen itemId={itemId} setDisplay={setDisplay} display={display}/>}
        {/* END ADD TO CART SCREEN POP UP */}
        <div className="col-lg-3">
          <div className="bg-white shadow rounded-1 ovy-auto px-3 py-3">
            {/* LINK AND CATEGORY INFO */}
            <ul className="b-l_">
              <li>
                <Link to={"/"}>HOME</Link>
              </li>
              <li className="mx-1">&gt;</li>
              <li>{path.toUpperCase()}</li>
            </ul>
            {/* sub category links */}
            <div className="mt-3">
              {/* CATEGORY NAME */}
              <p className="m-0 p-0">{path.toUpperCase()}</p>

              {/* HORIZONTAL DIVIDER */}
              <div className="horizontal-divider mt-1"></div>

              {/* SUBCATEGORY LINKS */}
              <div className="mt-2">
                {filterSubcategory.map((item, i) => (
                  <Link
                    key={i}
                    className="px-3 mt-1 d-block fw-normal fs-p9 ct_link"
                    to={`/${item.category}/${item.subcategory}`}
                  >
                    {camelCase(item.subcategory)}
                  </Link>
                ))}
              </div>
            </div>
            {/* RANGE FILTER BUTTON HEAD */}
            <p className="mt-4 my-1">FILTER</p>
            <div className="horizontal-divider"></div>

            {/* PRICE RANGE FILTER */}
            <div className="d-flex ali-center mt-3">
              <p className="p-0 mx-2 m-0">Price</p>
              <div className="horizontal-divider fl-b-30"></div>
            </div>
            {/* PRICE RANGE FILTER BUTTONS */}
            <div className="mx-3">
              {/* DISPLAY ALL PRICES */}
              <section className="ali-c d-flex mt-1">
                <input
                  type="radio"
                  name="price"
                  checked={priceRange == null}
                  onChange={() => setPriceRange(null)}
                />
                <label className="fs-p8 mx-2 p-0">All</label>
              </section>
              {/* UNDER 2000 */}
              <section className="ali-c d-flex mt-1">
                <input
                  onClick={() => setPriceRange("2")}
                  type="radio"
                  name="price"
                />
                <label className="fs-p8 mx-2 p-0">Under ₦2000</label>
              </section>
              {/* 2000 - 5000 */}
              <section className="ali-c d-flex mt-1">
                <input
                  onClick={() => setPriceRange("2/5")}
                  type="radio"
                  name="price"
                />
                <label className="fs-p8 mx-2 p-0"> ₦2000 - ₦5000</label>
              </section>
              {/* 5000 - 10000 */}
              <section className="ali-c d-flex mt-1">
                <input
                  onClick={() => setPriceRange("5/10")}
                  type="radio"
                  name="price"
                />
                <label className="fs-p8 mx-2 p-0"> ₦5000 - ₦10,000</label>
              </section>
              {/* 10000 - 20000 */}
              <section className="ali-c d-flex mt-1">
                <input
                  onClick={() => setPriceRange("10/20")}
                  type="radio"
                  name="price"
                />
                <label className="fs-p8 mx-2 p-0">₦10,000 - ₦20,000</label>
              </section>
              {/* 20000 - 40000 */}
              <section className="ali-c d-flex mt-1">
                <input
                  onClick={() => setPriceRange("20/40")}
                  type="radio"
                  name="price"
                />
                <label className="fs-p8 mx-2 p-0">₦20,000 - ₦40,000</label>
              </section>
              {/* ABOVE 40000 and above */}
              <section className="ali-c d-flex mt-1">
                <input
                  onClick={() => setPriceRange("40")}
                  type="radio"
                  name="price"
                />
                <label className="fs-p8 mx-2 p-0">Above ₦40,000</label>
              </section>
            </div>

            {/* BRAND FILTER */}
            <div className="d-flex ali-center mt-3">
              <p className="p-0 mx-2 m-0">Brand</p>
              <div className="horizontal-divider fl-b-30"></div>
            </div>
            {/* BRAND RANGE FILTER */}
            <input
              className=" mx-2 rounded-2 border outline-none px-2 fs-p9"
              placeholder="Search.."
              type="search"
              onChange={(e) => setBrandSearchFilter(e.target.value)}
            />
            <div className="mx-3 h-m ovy-auto sd_mn">
              {filterBrand
                .filter((item, i) =>
                  brandSearchFilter
                    ? item.brand.includes(brandSearchFilter.replace(" ", ""))
                    : true
                )
                .map((item) => (
                  <section key={item.id} className="ali-c d-flex mt-1">
                    <input
                      key={item.id}
                      onChange={() => (
                        setPriceRange(null), handleSelectedBrand(item)
                      )}
                      type="checkbox"
                      name="brand"
                      checked={selectedBrand.includes(item.brand)}
                    />
                    <label className="fs-p8 mx-2 p-0">{item.brand}</label>
                  </section>
                ))}
            </div>
          </div>
        </div>
        <div className="col-lg-9 col-sm-12">
          <div className="bg-white shadow rounded-1 p-3 d-flex f-wrap">
            {filteredItems.length > 0 ? (
              categoryPage
            ) : (
              <span className="fl-b-100 al-c p-5">ITEM(S) DOES NOT EXIST</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCategoryPage;
