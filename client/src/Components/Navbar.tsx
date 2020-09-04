import React from "react";
import Logo from "../Assets/Images/Logo.png";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
interface Props {}

const Navbar = (props: Props) => {
  const handleMenu = React.useRef(null);
  const [menu, setMenu] = React.useState(false);
  const handleClick = (e: any, handleMenu: any) => {
    handleMenu.current.classList.toggle("change");
    setMenu(!menu);
  };
  const [showMore, setShowMore] = React.useState(false);
  return (
    <>
      <div className="navbar">
        <Link to="/">
          <div className="brand">
            <img className="logo" src={Logo} alt="Logo-Icon" />
            History Diaries
          </div>
        </Link>

        <div className="nav-items no-mobile">
          <div className="nav-item aboutus">
            <div className="dropdown">
              <p>
                <Link
                  onClick={() => {
                    sessionStorage.removeItem("prevSessionHD");
                  }}
                  className="color-secondary"
                  to="/"
                >
                  About Us
                </Link>
              </p>
              <div className="dropdown-content">
                <div className="h-item">
                  <p className="in-item">
                    <HashLink
                      onClick={() => {
                        sessionStorage.removeItem("prevSessionHD");
                      }}
                      to="/#our-story"
                    >
                      Our Story
                    </HashLink>
                  </p>
                </div>
                <div className="h-item">
                  <p className="in-item">
                    <HashLink
                      onClick={() => {
                        sessionStorage.removeItem("prevSessionHD");
                      }}
                      to="/#our-impact"
                    >
                      Our Impact
                    </HashLink>
                  </p>
                </div>

                <div className="h-item">
                  <p className="in-item">
                    <HashLink
                      onClick={() => {
                        sessionStorage.removeItem("prevSessionHD");
                      }}
                      to="/#core-team"
                    >
                      Core Team
                    </HashLink>
                  </p>
                </div>
                <div className="h-item">
                  <p className="in-item">
                    <HashLink
                      onClick={() => {
                        sessionStorage.removeItem("prevSessionHD");
                      }}
                      to="/#testimonials"
                    >
                      Testimonials
                    </HashLink>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="nav-item">
            <Link
              onClick={() => {
                sessionStorage.removeItem("prevSessionHD");
              }}
              className="color-secondary"
              to="/programs"
            >
              Programs
            </Link>
          </div>
          <div className="nav-item">
            <Link
              onClick={() => {
                sessionStorage.removeItem("prevSessionHD");
              }}
              to="/reach"
            >
              Reach Us
            </Link>
          </div>
          <div className="nav-item">
            <span>
              <Link
                onClick={() => {
                  sessionStorage.removeItem("prevSessionHD");
                }}
                className="n-btn"
                to="/blog"
              >
                Blog
              </Link>
            </span>
          </div>
        </div>
        <div className="no-desktop v-center ">
          <div
            className="menu "
            ref={handleMenu}
            onClick={(e) => handleClick(e, handleMenu)}
          >
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
          </div>
        </div>
      </div>
      {menu && (
        <div className="mobile-menu no-desktop">
          <div className="nav-items-mobile">
            <div className="slider-in">
              <div className="m-nav-item">
                <Link
                  onClick={(e) => {
                    handleClick(e, handleMenu);
                    sessionStorage.removeItem("prevSessionHD");
                  }}
                  className="color-secondary"
                  to="/"
                >
                  About Us
                </Link>{" "}
                &nbsp;{" "}
                <i
                  onClick={() => {
                    setShowMore(!showMore);
                    sessionStorage.removeItem("prevSessionHD");
                  }}
                  className="fa fa-angle-down"
                  aria-hidden="true"
                ></i>
              </div>
              {showMore && (
                <div className="show-more">
                  <div>
                    {" "}
                    <HashLink
                      onClick={() => {
                        sessionStorage.removeItem("prevSessionHD");
                      }}
                      to="/#our-story"
                    >
                      Our Story
                    </HashLink>
                  </div>
                  <div>
                    {" "}
                    <HashLink
                      onClick={() => {
                        sessionStorage.removeItem("prevSessionHD");
                      }}
                      to="/#our-impact"
                    >
                      Our Impact
                    </HashLink>
                  </div>

                  <div>
                    {" "}
                    <HashLink
                      onClick={() => {
                        sessionStorage.removeItem("prevSessionHD");
                      }}
                      to="/#core-team"
                    >
                      Core Team
                    </HashLink>
                  </div>
                  <div>
                    {" "}
                    <HashLink
                      onClick={() => {
                        sessionStorage.removeItem("prevSessionHD");
                      }}
                      to="/#testimonials"
                    >
                      Testimonials
                    </HashLink>
                  </div>
                </div>
              )}
            </div>

            <div
              onClick={(e) => {
                handleClick(e, handleMenu);
                sessionStorage.removeItem("prevSessionHD");
              }}
              className="m-nav-item"
            >
              <Link to="/programs"> Programs</Link>
            </div>
            <div
              onClick={(e) => {
                handleClick(e, handleMenu);
                sessionStorage.removeItem("prevSessionHD");
              }}
              className="m-nav-item"
            >
              <Link to="/reach"> Reach Us</Link>
            </div>
            <div
              onClick={(e) => {
                handleClick(e, handleMenu);
                sessionStorage.removeItem("prevSessionHD");
              }}
              className="m-nav-item m-btn"
            >
              <span>
                <Link className="m-n-btn" to="/blog">
                  Blog
                </Link>
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
