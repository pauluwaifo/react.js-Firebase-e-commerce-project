import React, { useContext } from "react";
import product_load from "../assets/product-img-loading.jpg";
import { Link } from "react-router-dom";
import AppContext from "../contexts/appContext";
import cat_1 from "../assets/category_images/cat_1.jpg"
import cat_2 from "../assets/category_images/cat_2.jpg"
import cat_3 from "../assets/category_images/cat_3.jpg"
import cat_4 from "../assets/category_images/cat_4.jpg"
import cat_5 from "../assets/category_images/cat_5.jpg"
import cat_6 from "../assets/category_images/cat_6.jpg"


function CategoryCard() {
  const { productData } = useContext(AppContext);
  
  const filterData = productData.filter(
    (item, index, array) =>
      array.findIndex((elem) => elem.category === item.category) === index
  );
  return (
    <>
      <div className="col-12">
         {/* HEADER */}
         <div className={`w-100 bg-primary py-3 px-2`}>
          <h5 className="al-c p-0 m-0 fw-bold">Trending Categories</h5>
        </div>
        <div className="cat-container py-2 bg-white shadow">
           {/* Accessories */}
           <div className="cat-card al-c">
                <Link to={`/accessories`}>
                  <img
                    className="rounded-1"
                    src={cat_2}
                    alt="category-img"
                    width={"100%"}
                  />
                </Link>
                <p>ACCESSORIES</p>
              </div>
              {/* apparel */}
              <div className="cat-card al-c">
                <Link to={`/apparel`}>
                  <img
                    className="rounded-1"
                    src={cat_1}
                    alt="category-img"
                    width={"100%"}
                  />
                </Link>
                <p>APPAREL</p>
              </div>
              <div className="cat-card al-c">
                <Link to={`/office`}>
                  <img
                    className="rounded-1"
                    src={cat_4}
                    alt="category-img"
                    width={"100%"}
                  />
                </Link>
                <p>OFFICE</p>
              </div>
              <div className="cat-card al-c">
                <Link to={`/drinkware`}>
                  <img
                    className="rounded-1"
                    src={cat_3}
                    alt="category-img"
                    width={"100%"}
                  />
                </Link>
                <p>DRINKWARE</p>
              </div>
              <div className="cat-card al-c">
                <Link to={`/bags`}>
                  <img
                    className="rounded-1"
                    src={cat_5}
                    alt="category-img"
                    width={"100%"}
                  />
                </Link>
                <p>BAGS</p>
              </div>
              <div className="cat-card al-c">
                <Link to={`/fashion`}>
                  <img
                    className="rounded-1"
                    src={cat_6}
                    alt="category-img"
                    width={"100%"}
                  />
                </Link>
                <p>FASHION</p>
              </div>
        </div>
      </div>
    </>
  );
}

export default CategoryCard;
