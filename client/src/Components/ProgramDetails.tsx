import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import YouTube from "react-youtube";
import { BrowserView, MobileView } from "react-device-detect";
import { RouteComponentProps, Redirect } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import axios from "axios";
import { API } from "../config";
import Footer from "./Footer";
import { format } from "date-fns";
import ReactGA from "react-ga";
interface Istate {
  data: any;
  loading: boolean;
  notFound: boolean;
}

type TParams = { id: string; program: string };

const ProgramDetails = ({ match, history }: RouteComponentProps<TParams>) => {
  let isCancelled = false;
  const program = match.params.program;
  const id = match.params.id;

  const [state, setState] = React.useState<Istate>({
    data: null,
    loading: true,
    notFound: false,
  });

  React.useEffect(() => {
    ReactGA.pageview(`/programdetails`);
    window.scrollTo(0, 0);

    const fetchData = async () => {
      try {
        const response = await axios.get(`${API}/${program}?Tid=${id}`);

        ReactGA.event({
          category: "Program",
          action: `User visited ${response.data.Title}`,
        });
        if (!isCancelled) {
          setState({
            ...state,
            data: response.data[0],
            loading: false,
          });
        }
      } catch (error) {
        if (!isCancelled) {
          setState({
            ...state,
            notFound: true,
            loading: false,
          });
        }
      }
    };

    fetchData();

    return () => {
      isCancelled = true;
    };
  }, []);

  const handleRegister = (link: any) => {
    var ga = ReactGA.ga();
    ga("register", "clicked", `${state.data.Title}`);
    window.open(link);
  };
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
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="home"
        >
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
          <div className="event-section">
            <div className="e-sec-1">
              <div
                onClick={() => {
                  history.push("/programs");
                }}
                className="back-btn no-mobile"
              >
                <i className="fas fa-arrow-left"></i> &nbsp; Back
              </div>
              <div className="e-content">
                <p className="heading-4">{state.data.Title}</p>
                <div className="c-grey">
                  <ReactMarkdown
                    className="reactMarkdown"
                    escapeHtml={true}
                    source={state.data.Description}
                    parserOptions={{ commonmark: true }}
                  />

                  <div></div>
                </div>

                {state.data.YoutubeVideoID ? (
                  <div className="video-holder">
                    <BrowserView>
                      <YouTube
                        className="video-i"
                        videoId={state.data.YoutubeVideoID}
                        opts={{
                          height: "300",
                          width: "640",
                          playerVars: {},
                        }}
                      />
                    </BrowserView>

                    <MobileView>
                      <YouTube
                        videoId={state.data.YoutubeVideoID}
                        opts={{
                          height: "150",
                          width: "300",
                          playerVars: {
                            autoplay: 1,
                          },
                        }}
                      />
                    </MobileView>
                  </div>
                ) : null}
              </div>
            </div>
            <div className="e-sec-2">
              <div className="e-list">
                {state.data.Date && (
                  <div className="e-item">
                    {program == "workshops" || program == "theaters" ? (
                      <p className="t-def">Date</p>
                    ) : program == "courses" ? (
                      <p className="t-def">Start Date</p>
                    ) : (
                      <p className="t-def">Deadline</p>
                    )}
                    <p className="c-grey-m">
                      {format(new Date(state.data.Date), "do MMM yyyy")}
                    </p>
                  </div>
                )}
                {state.data.TimeSpan && (
                  <div className="e-item">
                    <p className="t-def">Time</p>

                    <p className="c-grey-m">{state.data.TimeSpan}</p>
                  </div>
                )}
                {state.data.Duration && (
                  <div className="e-item">
                    <p className="t-def">Duration</p>

                    <p className="c-grey-m">{state.data.Duration}</p>
                  </div>
                )}
                {state.data.Venue && (
                  <div className="e-item">
                    <p className="t-def">Venue</p>

                    <p className="c-grey-m">{state.data.Venue}</p>
                  </div>
                )}
                {state.data.Fee ? (
                  <div className="e-item">
                    {program == "theaters" ? (
                      <p className="t-def">Cost</p>
                    ) : (
                      <p className="t-def">Fee</p>
                    )}
                    <p className="c-grey-m">
                      {state.data.Fee ? "₹" + state.data.Fee : "Free"}
                    </p>
                  </div>
                ) : null}
                <br />
                {state.data.Mentor && state.data.Mentor.length > 0 ? (
                  <div className="e-item">
                    <div className="center">
                      {state.data.Mentor.length > 1 ? (
                        <p className="t-def">Experts</p>
                      ) : (
                        <p className="t-def">Expert</p>
                      )}
                    </div>
                    <div className="mentors">
                      {state.data.Mentor.map((e: any, i: any) => (
                        <div key={i} className="mentor">
                          <div>
                            <img
                              className="mentor-image"
                              src={e.MentorImage.formats.small.url}
                              alt={e.Name}
                            />
                          </div>
                          <div>
                            <p className="mentor-name">{e.Name}</p>
                            <p className="mentor-description">
                              {e.Description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
                <div className="e-item">
                  {state.data.RegistrationLink && (
                    <div
                      className="c-btn m-btn spread"
                      onClick={() =>
                        handleRegister(state.data.RegistrationLink)
                      }
                    >
                      Register
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        <Redirect to="/error" />
      )}

      <Footer />
    </div>
  );
};

export default ProgramDetails;
