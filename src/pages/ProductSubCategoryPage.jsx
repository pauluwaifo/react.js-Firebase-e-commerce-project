import { useContext } from "react";
import { parsePath, useParams } from "react-router-dom";
import AppContext from "../contexts/appContext";
import { Link } from "react-router-dom";

function ProductSubCategoryPage() {
  const { category } = useParams();
  const { productData } = useContext(AppContext);
  const path = parsePath(category).pathname;

  const categoryPage = productData.map((item, i) => {
    if (path.toLowerCase() === item.category.toLowerCase()) {
      return (
        <section key={i}>
          <div className="carousel-card w-12_9r" key={i}>
            <div className="carousel-img">
              {item.url.length > 0 ? (
                <img
                  src={`../${item.url[0].img}`}
                  alt="product-img"
                  width={"100%"}
                  height={"100%"}
                />
              ) : null}
            </div>
            <div className="carousel-text">
              <span className="px-1 fl-b-100 al-l">{item.name}</span>
              <span className="px-1 fl-b-100 fs-1 fw-bold al-l">
                ${item.price}
              </span>
              <label className="fl-b-100">
                <ion-icon name="star"></ion-icon>
                <ion-icon name="star"></ion-icon>
                <ion-icon name="star"></ion-icon>
                <ion-icon name="star"></ion-icon>
                <ion-icon name="star-half"></ion-icon>
              </label>
            </div>
            <Link
              className={`_crd_btn ${item.qty < 1 ? "disabled" : null}`}
              to={item.qty < 1 ? "" : `/product_/${item.id}`}
            >
              {item.qty < 1 ? "SOLD OUT" : "VIEW ITEM"}
            </Link>
          </div>
        </section>
      );
    }
    return null;
  });

  return (
    <div className="container mt-9">
      <div className="row g-3">
        <div className="col-lg-3">
          <div className="bg-white shadow rounded-1 p-3">
            {/* LINK AND CATEGORY INFO */}
            <ul className="b-l_">
              <li>
                <Link to={"/home"}>HOME</Link>
              </li>
              <li className="mx-1">&gt;</li>
              <li>{path.toUpperCase()}</li>
            </ul>
            <p>SOMETHING HERE</p>
          </div>
        </div>
        <div className="col-lg-9 col-sm-12">
          <div className="bg-white shadow rounded-1 p-3 d-flex f-wrap">
            {categoryPage}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductSubCategoryPage;
