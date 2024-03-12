import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AppContext from "../contexts/appContext";

function Nav() {
  const isAuth = false;
  const { cart } = useContext(AppContext);
  const [scaleNo, setScaleNo] = useState(1);

  const totalQty = cart.reduce(
    (accumulator, item) => accumulator + item.qty,
    0
  );

  useEffect(() => {
    setTimeout(() => {
      setScaleNo(1);
    }, 200);
    setScaleNo(1.2);
  }, [totalQty]);

  return (
    <div className="container-fluid bg-white border my-nav">
      <div className="tp_nv ">
        <div className="menu">
          {/* about and contact links */}
          <div>
            {/* contact */}
            <Link to="/">Contact</Link>
            {/* About */}
            <Link to="/">About</Link>
          </div>
          {/* userName, signIn signUp */}
          <div>
            {isAuth ? (
              <Link to="/">
                <span className="icon">
                  <ion-icon name="person"></ion-icon>
                </span>
                <span>User</span>
                <svg
                  className="icon"
                  width="20"
                  height="20"
                  viewBox="0 0 28 18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </Link>
            ) : (
              <>
                <Link to="/signin">SignIn</Link>
                <Link to="/signup">SignUp</Link>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="horizontal-divider"></div>
      <div className="bt_nv">
        <div className="logo">
          <button className="cat_ry">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="icon"
              width="23"
              height="20"
            >
              <path d="M64 384h384v-42.666H64V384zm0-106.666h384v-42.667H64v42.667zM64 128v42.665h384V128H64z" />
            </svg>
          </button>
          <div className="logo-img">
            <Link to={"/"}>
              {/* <h3 className="fw-bold m-0 p-0">LOGO</h3> */}
              <img
                src={logo}
                alt="logo"
                width={"80%"}
                className="d-inline-block"
              />
            </Link>
          </div>
        </div>
        <div className=" search">
          <div>
            <form className="form" action="submit">
              <input
                className="search"
                type="Search"
                placeholder="Search products, brands and categories"
              />
              <div className="p-0 m-0">
                <button>
                <svg xmlns="http://www.w3.org/2000/svg" width={24} viewBox="0 0 512 512"><path d="M443.5 420.2L336.7 312.4c20.9-26.2 33.5-59.4 33.5-95.5 0-84.5-68.5-153-153.1-153S64 132.5 64 217s68.5 153 153.1 153c36.6 0 70.1-12.8 96.5-34.2l106.1 107.1c3.2 3.4 7.6 5.1 11.9 5.1 4.1 0 8.2-1.5 11.3-4.5 6.6-6.3 6.8-16.7.6-23.3zm-226.4-83.1c-32.1 0-62.3-12.5-85-35.2-22.7-22.7-35.2-52.9-35.2-84.9 0-32.1 12.5-62.3 35.2-84.9 22.7-22.7 52.9-35.2 85-35.2s62.3 12.5 85 35.2c22.7 22.7 35.2 52.9 35.2 84.9 0 32.1-12.5 62.3-35.2 84.9-22.7 22.7-52.9 35.2-85 35.2z"/></svg>
                </button>
              </div>
            </form>
          </div>
        </div>
        {/* cart */}
        <div className="cart">
          <Link className="flex" to="/cart">
            <svg
              className="icon"
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              viewBox="0 0 512 512"
            >
              <ellipse
                transform="rotate(-1.057 159.995 423.97) scale(.99997)"
                cx="160"
                cy="424"
                rx="24"
                ry="24"
              />
              <ellipse
                transform="matrix(.02382 -.9997 .9997 .02382 -48.51 798.282)"
                cx="384.5"
                cy="424"
                rx="24"
                ry="24"
              />
              <path d="M463.8 132.2c-.7-2.4-2.8-4-5.2-4.2L132.9 96.5c-2.8-.3-6.2-2.1-7.5-4.7-3.8-7.1-6.2-11.1-12.2-18.6-7.7-9.4-22.2-9.1-48.8-9.3-9-.1-16.3 5.2-16.3 14.1 0 8.7 6.9 14.1 15.6 14.1s21.3.5 26 1.9c4.7 1.4 8.5 9.1 9.9 15.8 0 .1 0 .2.1.3.2 1.2 2 10.2 2 10.3l40 211.6c2.4 14.5 7.3 26.5 14.5 35.7 8.4 10.8 19.5 16.2 32.9 16.2h236.6c7.6 0 14.1-5.8 14.4-13.4.4-8-6-14.6-14-14.6H188.9c-2 0-4.9 0-8.3-2.8-3.5-3-8.3-9.9-11.5-26l-4.3-23.7c0-.3.1-.5.4-.6l277.7-47c2.6-.4 4.6-2.5 4.9-5.2l16-115.8c.2-.8.2-1.7 0-2.6z" />
            </svg>
            Cart
            <div className="cr_ct" style={{ transform: `scale(${scaleNo})` }}>
              {totalQty}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Nav;
