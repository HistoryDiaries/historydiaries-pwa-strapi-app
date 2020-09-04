import React from "react";
import Rellax from "rellax";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import ReactGA from "react-ga";
import Vision from "../Assets/Images/idea.svg";
import Mission from "../Assets/Images/goal.svg";
import Footer from "./Footer";
import Testimonial from "./Testimonial";
import Scroll from "../Assets/Images/heart.svg";
import Partners from "./Partners";
import MediaMentions from "./MediaMentions";
import p1 from "../Assets/Images/team/Ankit.jpg";
import p2 from "../Assets/Images/team/Mohit.jpg";
import p3 from "../Assets/Images/team/Swati.png";
interface Props {}
interface Person {
  name: string;
  image: string;
  des: string;
  desc: string;
}

interface Istate {
  show: boolean;
  state: Person;
}
const Home = (props: Props) => {
  ReactGA.event({
    category: "USER",
    action: "AT HOME",
  });

  ReactGA.pageview("/homepage");
  const [showModal, setModal] = React.useState<Istate | any>({
    state: null,
    show: false,
  });
  const handleScrollerClick = () => {
    window.scrollTo(500, 850);
  };
  const [showMore, setShowMore] = React.useState(false);
  React.useEffect(() => {
    new Rellax(".rellax");
  }, []);
  const team = [
    {
      name: "Swati Mittal",
      image: p3,
      des: "Co-Founder, Creative Head",
      desc: `With over 5+ years of experience of working with students on life skills, Swati co-founded and has been working with  History Diaries for her love for Education and Art. She is also a Bharatnatyam dancer, trained under Guru Smt. Sindhu Mishra and has been performing at national and international platforms. She is an Engineer and worked in the IT Sector for a few years until she could find her passion and follow it at History Diaries. She was associated with Govt. Of India for the cultural programs 
      being organized for honorable President and Honourable Prime Minister of India.
      She is also a mentor with Niti Aayog for Atal Tinkering Labs.
      `,
    },
    {
      name: "Ankit Narayan",
      image: p1,
      des: "Co-Founder, Strategy",
      desc: `Watching a theater show on the life of Kabir by Shekhar Sen followed by a conversation with a friend made Ankit realize the significance of History and how it needs to be made more engaging for school students. He then joined hands with Swati to start History Diaries. He brings the experience of working with schools and strategic inputs to the HD team. Along with his contribution at HD, Ankit Co-Founded a Career Guidance start-up for school students.  Ankit is an IIT-Delhi and  Super - 30 Alumnus who loves Hindi literature, Theater, and Hindustani Classical Music.`,
    },
    {
      name: "Mohit Choudhary",
      image: p2,
      des: "Product Head",
      desc: `Mohit is a seeker who is passionate about working on and for the roots, which he believes lie in History. His journey in education space and community development started from his early college days. Having an experience of 4+ years in Instructional Design, he is an avid reader who is always looking for ways to create engaging and relevant stuff for students. Mohit is a Computer Science graduate from IIT Delhi, who wishes to use his engineering skills to integrate Tech and History.`,
    },
  ];

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
      >
        <div className="rellax no-mobile circle" data-rellax-speed="7"></div>
        <div className="home">
          <div className="banner master">
            <div className="banner-cont">
              <div className="stroke">
                <p className="banner-text">
                  "History Diaries" is an initiative to revamp the current
                  pedagogical system of history through theatre, classroom
                  investigative sessions, tours, drama.
                </p>
              </div>
              <div className="center">
                <div className="c-btn">
                  <Link
                    onClick={() => {
                      ReactGA.event({
                        category: "Home Upcomming Events",
                        action:
                          "User pressed upcomming events button in home page",
                      });
                    }}
                    className="c-white "
                    to="/programs"
                  >
                    Upcoming Events
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="center">
            <div className="scroller" onClick={handleScrollerClick}>
              {" "}
              <div>
                <i className="fa fa-angle-down" aria-hidden="true"></i>
              </div>
            </div>
          </div>

          {/* Content section */}

          <div className="section-main">
            {/* <div className="section s-1">
              <div className="subsection s-1">
                <img className="vision-icon" src={Vision} alt="Vision-Icon" />
              </div>
              <div className="subsection s-2">
                <p className="heading">Vision.</p>
                <div className="content">
                  <p className="text-1">
                    <p className="heading-4 cen">
                      “Building compassionate generations by connecting self to
                      history”
                    </p>
                  </p>
                </div>
              </div>
            </div> */}
            {/* <div className="section s-1 mt-4">
              <div className="subsection s-3">
                <img className="mission-icon" src={Mission} alt="Vision-Icon" />
              </div>
              <div className="subsection s-2">
                <div className="content">
                  <p className="heading">Mission.</p>
                  <p className="text-1">
                    <p className="heading-4 cen">
                      {" "}
                      “Making history Interesting, Engaging and Relevant”
                    </p>
                  </p>
                </div>
              </div>
            </div> */}
          </div>
        </div>
        <div id="our-story">
          <div className="center">
            <p className="heading ft-size-2 noborder">Our Story</p>
          </div>
          <div className="our-story">
            <div className="s-image">
              <img className="story-icon" src={Scroll} alt="story-icon" />
            </div>
            <div className="story-content">
              <p className="c-grey mt-2 fs2">
                Our journey started after having a small discussion with an 8th
                grader who said, History is one subject that he hates but on the
                contrary he likes watching history-based movies, listening to
                stories of the past, exploring monuments and getting exposed to
                cultural content. We could relate to him as we had felt the same
                when we were in school. We felt the disconnect between what a
                child reads in books and what the child experiences. To bridge
                this gap and make History{" "}
                <strong className="strong">Interesting</strong> and{" "}
                <strong className="strong">Experiential</strong> for students we
                came up with a history-curriculum based Theatre where we pick a
                theme from their history curriculum and make a theatre play
                around it. Since our foundation, we have staged 6 plays for
                schools in Delhi-NCR.
                <br />
              </p>
              {showMore && (
                <p className="c-grey mt-2 fs2">
                  But making history interesting out of the classroom wasn’t
                  enough. We wanted to take this impact to the classrooms so
                  that it could be sustained. And we started using
                  Drama-In-History -Education to build classroom sessions. This
                  helped us catching student attention in the classroom and make
                  this subject Engaging for students. Not just the in-class
                  sessions but, engaging with the primary evidence of past which
                  are well-preserved in the museums, helped them engage with
                  their subject better.
                  <br />
                  <br />
                  Still making history Interesting and{" "}
                  <strong className="strong">Engaging</strong>&nbsp;wasn’t
                  enough as there was this question of “Why study history ?” in
                  minds of students. They used to ask us about the relevance of
                  studying history which raised a lot of unanswered questions in
                  our minds. We started our research to connect all these dots
                  and worked around the “Thinking” that the study of history
                  develops that doesn’t only define what’s significant to look
                  into the past but also, ‘How’ to look at it. It talks about
                  Evidence Vs Interpretations, Contextualisation, Multiple
                  Perspectives, Changes and Continuities, and forming
                  Judgements. The thinking skills, which are highly relevant to
                  resolve the matters of the present society. Hence, we started
                  working with school students and teachers, developing these
                  skills through research-based history projects. And it helped
                  us achieving the third paradigm of making history{" "}
                  <strong className="strong">Relevant</strong> in schools.
                </p>
              )}
              <div className="center">
                <div
                  className="view-more-btn"
                  onClick={() => {
                    const change = !showMore;
                    setShowMore(change);
                  }}
                >
                  {!showMore ? "Show more" : "Show less"}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="our-impact" className="data-section">
          <div className="center">
            <p className="heading ft-size-2 noborder">Our Impact</p>
          </div>
          <div className="data-row">
            <div className="data-cont">
              <div className="data">4500+</div>
              <div>
                <p className="sub-data">Students</p>
              </div>
            </div>
            <div className="data-cont">
              <div className="data">150+</div>
              <div>
                <p className="sub-data">Teachers</p>
              </div>
            </div>

            <div className="data-cont">
              <div className="data">25+</div>
              <div>
                <p className="sub-data">Schools</p>
              </div>
            </div>
            <div className="data-cont">
              <div className="data">30+</div>
              <div>
                <p className="sub-data">Events</p>
              </div>
            </div>
          </div>
        </div>
        <div id="core-team" className="team-section">
          <div className="center">
            <p className="heading color-white">Core Team</p>
          </div>
          <div className="team-profile">
            {team.map((p, index) => (
              <div key={index} className="team-mate">
                <div>
                  <img
                    onClick={() => {
                      setModal({
                        ...showModal,
                        show: true,
                        state: p,
                      });
                    }}
                    className="team-image"
                    src={p.image}
                    alt={p.name}
                  />
                </div>
                <div>
                  <p className="mt-1 name">{p.name}</p>
                  <p className="mt-1">{p.des}</p>
                </div>
              </div>
            ))}
            <Modal
              ariaHideApp={false}
              isOpen={showModal.show}
              contentLabel="Modal"
            >
              <div className="modal-cont">
                <div className="right-push">
                  <div
                    className="c-btn trim cross"
                    onClick={() =>
                      setModal({
                        ...showModal,
                        show: !showModal.show,
                      })
                    }
                  >
                    ×
                  </div>
                </div>
                <p className="heading-4">
                  {showModal.state && showModal.state.name}
                </p>
                <p className="c-grey">
                  {showModal.state && showModal.state.desc}
                </p>
              </div>
            </Modal>
          </div>
        </div>

        <div id="testimonials" className="t-section">
          <div className="center">
            <p className="heading ft-size-2 noborder">Testimonials</p>
          </div>
          <Testimonial />
        </div>
        <div className="p-section">
          <div className="center">
            <p className="heading ft-size-2 noborder">Partners</p>
          </div>
          <Partners />
        </div>
      </motion.div>
      <div className="center lk">
        <p className="heading ft-size-2 noborder">Media Mention</p>
      </div>
      <div className="center">
        <div className="media-sec">
          <MediaMentions />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
