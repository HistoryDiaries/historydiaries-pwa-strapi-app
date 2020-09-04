import React from "react";
import Join from "../Assets/Images/join.svg";
import Footer from "./Footer";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import axios from "axios";
import { API } from "../config";
import ReactGA from "react-ga";

interface Props {}
interface Istate {
  message: string;
  loading: boolean;
  data: any;
  fLoading: boolean;
  notFound: boolean;
}
const Contact = (props: Props) => {
  ReactGA.pageview("/reach");
  const [state, setState] = React.useState<Istate>({
    message: "",
    loading: false,
    data: null,
    fLoading: true,
    notFound: false,
  });
  const { handleSubmit, reset, register, errors } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      idea: "",
    },
  });

  const onSubmit = async (values: any) => {
    ReactGA.event({
      category: "Idea",
      action: `User submitted Idea`,
    });
    const { name, email, idea, phone }: any = values;
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    const body = JSON.stringify({
      Name: name,
      Idea: idea,
      Phone: phone,
      Email: email,
    });
    setState({
      ...state,
      loading: true,
      message: "Submitting",
    });
    try {
      const response = await axios.post(`${API}/ideas`, body, config);
      reset();
      if (response.status === 200) {
        setState({
          ...state,
          loading: false,
          message: "Thanks for leaving the message",
        });
      }
    } catch (error) {
      setState({
        ...state,
        loading: false,
        message: "Error occurred",
      });
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 200 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
    >
      <div className="home">
        <div className="banner h-1">
          <div className="banner-cont">
            <p className="banner-text t2">We'd love to hear from you</p>
            <div className="w-1">
              <p className="t-3">
                Whether you have a question about what we do, or you got an idea
                to share, or anything else, our team is ready to answer.
              </p>
            </div>
          </div>
        </div>
        <div className="center">
          <p className="heading-3 mt-3"> Leave a message</p>
        </div>
        <div className="idea">
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-item">
              <label htmlFor="name">Name</label>
              <br />
              <input
                type="text"
                name="name"
                ref={register({
                  required: "Required",
                })}
              />
              <p className="c-red"> {errors.name && errors.name.message}</p>
            </div>
            <div className="form-item">
              <label htmlFor="email">Email Address</label>
              <br />
              <input
                type="text"
                name="email"
                ref={register({
                  required: "Required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "invalid email address",
                  },
                })}
              />
              <p className="c-red"> {errors.email && errors.email.message}</p>
            </div>
            <div className="form-item">
              <label htmlFor="phone">Phone Number</label>
              <br />
              <input
                type="text"
                name="phone"
                ref={register({
                  required: "Required",
                  pattern: {
                    value: /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/i,
                    message: "invalid phone number",
                  },
                })}
              />
              <p className="c-red"> {errors.phone && errors.phone.message}</p>
            </div>
            <div className="form-item">
              <label htmlFor="phone">Write your message</label>
              <br />
              <textarea
                name="idea"
                ref={register({
                  required: "Required",
                })}
              />
              <p className="c-red"> {errors.idea && errors.idea.message}</p>
            </div>
            <div className="btn-cont">
              <button className="n-btn c-btn m-btn submit-btn">Submit</button>
            </div>
          </form>
          <div className="center">
            {state.message ? <p>{state.message}</p> : null}
          </div>
        </div>
        <div className="center">
          <p className="heading-3 mt-3"> Contact Us</p>
        </div>
        <div className="center">
          <div className="contact">
            <img className="join-icon" src={Join} alt="join-icon" />
            <p>E-mail: historydiaries2016@gmail.com </p>
            <p>Phone: +91 95600 54260</p>

            {/* <div className="address center">
                <div> Address here..</div>
              </div> */}
          </div>
        </div>
      </div>

      <Footer />
    </motion.div>
  );
};

export default Contact;
