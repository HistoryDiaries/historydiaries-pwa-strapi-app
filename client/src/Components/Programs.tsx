import React from "react";
import Footer from "./Footer";
import { motion } from "framer-motion";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import FadeIn from "react-fade-in";
import Empty from "../Assets/Images/amusement-park.svg";
import { API } from "../config";
import ReactGA from "react-ga";

interface Props {}
interface Istate {
  workshops: Array<object>;
  courses: Array<object>;
  contests: Array<object>;
  theaters: Array<object>;
  loading: boolean;
  message: string;
  latestBanner: any;
  current: string;
}
const PastPrograms = (props: Props) => {
  const [items, setItems] = React.useState({
    list: [
      {
        name: "Workshops",
        state: false,
      },
      {
        name: "Theaters",
        state: false,
      },
      {
        name: "Contests",
        state: false,
      },
      {
        name: "Courses",
        state: false,
      },
    ],
  });
  ReactGA.pageview("/programs");
  let isCancelled = false;
  const setSlider = (index: number): string => {
    const dupList = items.list;
    dupList.map((e) => (e.state = false));
    dupList[index].state = true;

    setItems({
      list: dupList,
    });

    return dupList[index].name;
  };
  const [state, setState] = React.useState<Istate>({
    workshops: [],
    courses: [],
    contests: [],
    theaters: [],
    loading: true,
    message: "",
    latestBanner: null,
    current: "Workshops",
  });

  React.useEffect(() => {
    const current = sessionStorage.getItem("prevSessionHD") || "Workshops";

    const fetchData = async () => {
      const workshops = axios.get(`${API}/workshops?_sort=createdAt:DESC`);
      const courses = axios.get(`${API}/courses?_sort=createdAt:DESC`);
      const contests = axios.get(`${API}/contests?_sort=createdAt:DESC`);
      const theater = axios.get(`${API}/theaters?_sort=createdAt:DESC`);

      try {
        const res = await axios.all([workshops, courses, contests, theater]);
        const itemIndex: number = items.list.findIndex(
          (e) => e.name == current
        );
        setSlider(itemIndex);
        let tempIndex;
        switch (itemIndex) {
          case 0:
            tempIndex = 0;
            break;
          case 1:
            tempIndex = 3;
            break;
          case 2:
            tempIndex = 2;
            break;
          case 3:
            tempIndex = 1;
            break;
          default:
            tempIndex = 0;
        }
        console.log(itemIndex, tempIndex);
        if (!isCancelled) {
          setState({
            ...state,
            workshops: res[0].data,
            courses: res[1].data,
            contests: res[2].data,
            theaters: res[3].data,
            latestBanner:
              res[tempIndex].data.length > 0 ? res[tempIndex].data[0] : null,
            loading: false,
            current,
          });
        }
      } catch (error) {
        setState({
          ...state,
          loading: false,
          current,
          message: "Fetch Failed",
        });
      }
    };

    fetchData();
    return () => {
      isCancelled = true;
    };
  }, []);

  const itemRef = React.useRef(null);

  const handleItemClick = (index: number) => {
    const ItemName = setSlider(index);

    if (ItemName === "Workshops") {
      setState({
        ...state,
        current: "Workshops",
        latestBanner: state.workshops.length > 0 ? state.workshops[0] : null,
      });
      sessionStorage.setItem("prevSessionHD", "Workshops");
    }
    if (ItemName === "Contests") {
      setState({
        ...state,
        current: "Contests",
        latestBanner: state.contests.length > 0 ? state.contests[0] : null,
      });
      sessionStorage.setItem("prevSessionHD", "Contests");
    }
    if (ItemName === "Courses") {
      setState({
        ...state,
        current: "Courses",
        latestBanner: state.courses.length > 0 ? state.courses[0] : null,
      });
      sessionStorage.setItem("prevSessionHD", "Courses");
    }
    if (ItemName === "Theaters") {
      setState({
        ...state,
        current: "Theaters",
        latestBanner: state.theaters.length > 0 ? state.theaters[0] : null,
      });
      sessionStorage.setItem("prevSessionHD", "Theaters");
    }
  };

  const EventCard = (data: any, type: string) => {
    return (
      <div key={data._id} className="e-card">
        <div className="e-card-sec1">
          <div>
            <img
              className="event-image"
              src={data.Banner.url}
              alt={data.Title}
            />
          </div>
          <p className="card-title">{data.Title}</p>
          <p className="card-details">{data.Summary}</p>
        </div>
        <div className="e-card-sec-2">
          <div className="btn-cont">
            <div className="view-more-btn">
              <Link
                onClick={() => {
                  ReactGA.event({
                    category: "View More",
                    action: `User clicked view more ${data.Tid}`,
                  });
                }}
                to={`/program/${type}/${data.Tid}`}
              >
                View more
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const workshop = () => {
    return (
      <>
        {state.loading ? (
          <div className="loader"></div>
        ) : state.workshops.length > 0 ? (
          state.workshops.map((e, i) => EventCard(e, "workshops"))
        ) : (
          <div className="icon-manage">
            <div>
              <img className="empty" src={Empty} alt="empty" />
            </div>

            <div className="mt-2">
              <p>No workshops. Check again later</p>
            </div>
          </div>
        )}
      </>
    );
  };
  const course = () => {
    return (
      <>
        {state.loading ? (
          <div className="loader"></div>
        ) : state.courses.length > 0 ? (
          state.courses.map((e, i) => EventCard(e, "courses"))
        ) : (
          <div className="icon-manage">
            <div>
              <img className="empty" src={Empty} alt="empty" />
            </div>

            <div className="mt-2">
              <p>No courses. Check again later</p>
            </div>
          </div>
        )}
      </>
    );
  };
  const contest = () => {
    return (
      <>
        {state.loading ? (
          <div className="loader"></div>
        ) : state.contests.length > 0 ? (
          state.contests.map((e, i) => EventCard(e, "contests"))
        ) : (
          <div className="icon-manage">
            <div>
              <img className="empty" src={Empty} alt="empty" />
            </div>

            <div className="mt-2">
              <p>No contests. Check again later</p>
            </div>
          </div>
        )}
      </>
    );
  };
  const theater = () => {
    return (
      <>
        {state.loading ? (
          <div className="loader"></div>
        ) : state.theaters.length > 0 ? (
          state.theaters.map((e, i) => EventCard(e, "theaters"))
        ) : (
          <div className="icon-manage">
            <div>
              <img className="empty" src={Empty} alt="empty" />
            </div>

            <div className="mt-2">
              <p>No theaters. Check again later</p>
            </div>
          </div>
        )}
      </>
    );
  };

  const switchRenderer = (current: string) => {
    switch (current) {
      case "Workshops":
        return workshop();
      case "Theaters":
        return theater();
      case "Courses":
        return course();
      case "Contests":
        return contest();
      default:
        return <Redirect to="/error" />;
    }
  };

  if (state.message) return <Redirect to="/error" />;
  return (
    <motion.div
      initial={{ opacity: 0, y: 200 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
    >
      <p className="heading-3 roll no-desktop">Programs</p>
      <div className="e-container">
        <div className="card-dialouge">
          <div className="list-items">
            {items.list.map((e, i) => (
              <div
                ref={itemRef}
                onClick={() => handleItemClick(i)}
                key={i}
                className={e.state ? "e-item e-active" : "e-item"}
              >
                {e.name}
              </div>
            ))}
          </div>
          <div className="e-banner">
            {state.loading ? (
              <div className="cont-holder">
                <h1 className="white">Programs</h1>
              </div>
            ) : state.current == "Workshops" ? (
              <div className="cont-holder">
                <h1 className="white">Workshops</h1>
                <div className="w-2">
                  <p className="t-3">
                    <i>
                      It is never too late to learn a new skill. Join our
                      workshops covering a diverse array of topics like theatre,
                      fine arts, storytelling, and a lot more to enhance your
                      skillset.
                    </i>
                  </p>
                </div>
              </div>
            ) : state.current == "Contests" ? (
              <div className="cont-holder">
                <h1 className="white">Contests</h1>
                <div className="w-2">
                  <p className="t-3">
                    <i>
                      A chance for you to play with your knowledge and skill.
                      Participate in a variety of contests to bring the best in
                      you.
                    </i>
                  </p>
                </div>
              </div>
            ) : state.current == "Courses" ? (
              <div className="cont-holder">
                <h1 className="white">Courses</h1>
                <div className="w-2">
                  <p className="t-3">
                    <i>
                      We bring to you new courses to learn skills like Creative
                      Thinking and Complex Problem Solving or develop mindsets
                      of curiosity, open-mindedness. All the courses are
                      designed by our in-house team of experts and have been
                      recommended by educators from leading schools.
                    </i>
                  </p>
                </div>
              </div>
            ) : (
              <div className="cont-holder">
                <h1 className="white">Theaters</h1>
                <div className="w-2">
                  <p className="t-3">
                    <i>
                      History curriculum-based theater shows for school
                      students. Embark with us on an experiential journey
                      through the events, people, and developments of the past.
                    </i>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        {state.loading ? null : (
          <div className="center">
            <FadeIn>
              <div className="heading-2 mt-3">{state.current}</div>
            </FadeIn>
          </div>
        )}
      </div>
      <div className="card-holder">{switchRenderer(state.current)}</div>
      <Footer />
    </motion.div>
  );
};

export default PastPrograms;
