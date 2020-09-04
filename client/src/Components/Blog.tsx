import React from "react";
import Footer from "./Footer";
import { Link, Redirect } from "react-router-dom";
import { motion } from "framer-motion";
import FadeIn from "react-fade-in";
import axios from "axios";
import format from "date-fns/format";
import { API } from "../config";
import Sandbox from "../Assets/Images/sandbox.svg";
import ReactGA from "react-ga";
interface Props {}

interface Istate {
  data: Array<any>;
  loading: boolean;
  message: string;
  latestArticle: any;
  page: number;
  getLoading: boolean;
  moreMessage: string;
}
const Blog = (props: Props) => {
  ReactGA.pageview("/blog");

  const [state, setState] = React.useState<Istate>({
    data: [],
    loading: true,
    message: "",
    latestArticle: null,
    page: 0,
    getLoading: false,
    moreMessage: "",
  });

  React.useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 200);
  }, []);
  React.useEffect(() => {
    let isCancelled = false;
    const getData = async () => {
      try {
        const response = await axios.get(
          `${API}/blogs?_sort=createdAt:DESC&_start=${state.page}&_limit=5`
        );
        if (!isCancelled) {
          setState({
            ...state,
            loading: false,
            data: response.data,
            latestArticle: response.data[0],
          });
        }
      } catch (error) {
        setState({
          ...state,
          loading: false,
          message: "Error Occurred",
        });
      }
    };

    getData();

    return () => {
      isCancelled = true;
    };
  }, []);

  const handleLoadMore = async () => {
    const page = state.page;
    const startFrom = (page + 1) * 5;
    console.log("start", startFrom);
    try {
      setState({
        ...state,
        getLoading: true,
      });
      const response = await axios.get(
        `${API}/blogs?_sort=createdAt:DESC&_start=${startFrom}&_limit=5`
      );
      console.log(response);
      if (response.data.length > 0) {
        setState({
          ...state,
          data: [...state.data, ...response.data],
          getLoading: false,
          page: startFrom,
        });
      } else {
        setState({
          ...state,
          getLoading: false,
          moreMessage: "No more articles",
        });
      }
    } catch (error) {
      setState({
        ...state,
        getLoading: false,
        moreMessage: "Error Occurred",
      });
    }
  };

  if (state.message) return <Redirect to="/error" />;
  return (
    <motion.div
      initial={{ opacity: 0, y: 200 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
    >
      <div className="home mt-b">
        <div className="banner h-1">
          <div className="banner-cont">
            <p className="banner-text t2">{"History Diaries Blog"}</p>
            <div className="w-2">
              <p className="t-3">
                <i>
                  “The more that you read, the more things you will know. The
                  more that you learn, the more places you’ll go.” – Dr. Seuss
                </i>
              </p>
            </div>
            <div className="w-2">
              <p className="t-3">
                Explore this space to read about things from History, Culture,
                Art, and Education.
              </p>
            </div>
          </div>
        </div>
        <div className="blog-list">
          {state.loading ? (
            <div className="center">
              {" "}
              <div className="loader"></div>{" "}
            </div>
          ) : state.data.length > 0 ? (
            <>
              <FadeIn>
                {state.data.map((e, i) => (
                  <div key={i} className="blog-item">
                    <div className="blog-image">
                      <img
                        className="blog-list-image"
                        src={e.Banner.url}
                        alt={e.Banner.Tittle}
                      />
                    </div>
                    <div className="blog-content">
                      <div className="blog-list-title">
                        <Link to={`/blog/${e.Tid}`}>
                          <p>{e.Title}</p>
                        </Link>
                      </div>
                      <div className="blog-list-description">{e.Summary}</div>
                      <div className="blog-list-date mt-1">
                        <i className="fa fa-clock m-a" aria-hidden="true"></i>
                        &nbsp;&nbsp;
                        <div>
                          {format(new Date(e.createdAt), "do MMM yyyy")}
                        </div>
                        &nbsp;&nbsp;
                        <div>{format(new Date(e.createdAt), "HH:MM")}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </FadeIn>
              {!(
                state.page == 0 && state.data.length >= 5
              ) ? null : state.getLoading ? (
                <div className="center">
                  {" "}
                  <div className="loader"></div>{" "}
                </div>
              ) : (
                <div className="center">
                  <p className="loadmore" onClick={handleLoadMore}>
                    Load More
                  </p>
                </div>
              )}
              <div className="center">
                <div>
                  {state.moreMessage.length > 0 ? (
                    <p>{state.moreMessage}</p>
                  ) : null}
                </div>
              </div>
            </>
          ) : (
            <div className="icon-manage">
              <div>
                <img className="empty" src={Sandbox} alt="empty" />
              </div>

              <div className="mt-2">
                <p>No articles published.</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </motion.div>
  );
};

export default Blog;
