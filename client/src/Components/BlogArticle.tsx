import React from "react";
import Footer from "./Footer";
import { Link, RouteChildrenProps, Redirect } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { API } from "../config";
import { stat } from "fs";
import { format } from "date-fns";
import ReactGA from "react-ga";
import Sandbox from "../Assets/Images/sandbox.svg";
interface Istate {
  data: any;
  loading: boolean;
  notFound: boolean;
}
type TParams = { id: string };
const BlogArticle = ({ match }: RouteChildrenProps<TParams>) => {
  let isCancelled = false;
  const id = match?.params.id;

  const [state, setState] = React.useState<Istate>({
    data: null,
    loading: true,
    notFound: false,
  });

  React.useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 200);

    const getData = async () => {
      try {
        const response = await axios.get(`${API}/blogs?Tid=${id}`);
        ReactGA.pageview(`/${response.data.Title}`);
        ReactGA.event({
          category: "Blog",
          action: `User visited ${response.data.Title}`,
        });
        if (!isCancelled) {
          setState({
            ...state,
            loading: false,
            data: response.data[0],
          });
        }
      } catch (error) {
        setState({
          ...state,
          loading: false,
          notFound: true,
        });
      }
    };

    getData();

    return () => {
      isCancelled = true;
    };
  }, []);

  if (state.notFound) return <Redirect to="/error" />;
  return (
    <div>
      {state.loading ? (
        <div className="loading-screen">
          <div className="loader-holder">
            <div className="loader"></div>
          </div>
        </div>
      ) : state.data ? (
        <>
          {" "}
          <div className="home">
            <div className="center">
              <div className="banner-holder">
                <LazyLoadImage
                  alt={"blog"}
                  effect="blur"
                  className="banner-image mod"
                  src={state.data.Banner.url} // use normal <img> attributes as props
                />
              </div>
            </div>

            <div className="blog-title">
              <p>{state.data.Title}</p>
            </div>
            {state.data.Author && (
              <div className="center author">
                <div>
                  {" "}
                  <img
                    className="author-image"
                    src={state.data.Author.Image[0].formats.small.url}
                    alt=""
                  />
                </div>
                <div className="authorName">
                  <div>{state.data.Author.Name}</div>
                </div>
              </div>
            )}
            <div className="date center mt-1">
              <i className="fa fa-calendar m-a" aria-hidden="true"></i> &nbsp;
              &nbsp;
              <p>
                {format(new Date(state.data.createdAt), "do MMM yyyy HH:MM")}
              </p>
            </div>
            <div className="blog-content-2">
              <ReactMarkdown
                className="reactMarkdown  "
                source={state.data.Content}
              />
            </div>
          </div>
          <div className="center">
            <div className="more-article">
              <div>
                <Link
                  onClick={() => {
                    ReactGA.event({
                      category: "Read more article",
                      action: `User Clicked Read More articles`,
                    });
                  }}
                  to="/blog"
                  className="ma-btn"
                >
                  Read More Articles
                </Link>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="icon-manage more-mar">
          <div>
            <img className="empty" src={Sandbox} alt="empty" />
          </div>

          <div className="mt-2">
            <p>No article found.</p>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default BlogArticle;
