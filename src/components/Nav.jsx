import logo from "../assets/logos.png";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <div className="container-fluid bg-white border my-nav">
      <div className=" logo">
        <div className="logo-img">
          <Link to={'/home'}>
            <h3 className="fw-bold m-0 p-0">LOGO</h3>
          </Link>
        </div>
        <div className="country">
          <div></div>
        </div>
      </div>
      <div className="p-2 search">
        <div>
          <form className="form" action="submit">
            <input
              className="search"
              type="Search"
              placeholder="Search products, brands and categories"
            />
            <div className="p-0 m-0">
              <button>
                <ion-icon name="search"></ion-icon>
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className=" menu">
        <div>
          <Link to="/">
            <span className="icon">
              <ion-icon name="person"></ion-icon>
            </span>
            <span>Account</span>
            <svg
              className="icon"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
           
          </Link>
        </div>
        <div>
          <Link to="/">
            <span>Contact</span>
          </Link>
        </div>
        <div>
          <Link className="flex" to="/">
            <span className="icon">
              <ion-icon name="ios-cart"></ion-icon>
            </span>
            Cart
          </Link>
        </div>
        <div className="vertical-divider"></div>
        <div className="img-container">
          <div className="img-placeholder"></div>
        </div>
      </div>
    </div>
  );
}

export default Nav;
