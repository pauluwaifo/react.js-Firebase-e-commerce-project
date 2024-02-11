import React, { useContext } from "react";
import product_load from "../assets/product-img-loading.jpg";
import { Link } from "react-router-dom";
import AppContext from "../contexts/appContext";

function CategoryCard() {
  const { productData } = useContext(AppContext);
  const filterData =productData.filter((item, index, array) =>
  array.findIndex((elem) => elem.category === item.category) === index
);
  return (
    <>
      <div className="col-12">
        <div className="cat-container py-2 bg-white rounded-1 shadow">
          {filterData.map((item, i) => {
            return (
              <div className="cat-card al-c" key={i}>
                  <Link to={`/category/${item.category}`}>
                    <img
                      className="rounded-1"
                      src={product_load}
                      alt="category-img"
                      width={"100%"}
                    />
                  </Link>
                    {item.category.toUpperCase()}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default CategoryCard;
