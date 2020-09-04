import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

import Logo from "../Assets/Images/Logo.png";
import Facebook from "../Assets/Images/facebook.svg";
import Instagram from "../Assets/Images/instagram-sketched.svg";
import Twitter from "../Assets/Images/twitter.svg";
import LinkedIn from "../Assets/Images/linkedin.svg";
import { API } from "../config";
import ReactGA from "react-ga";
import Youtube from "../Assets/Images/youtube.svg";
interface Props {}

const Footer = (props: Props) => {
  const [state, setState] = React.useState({
    message: "",
    loading: false,
  });
  const { handleSubmit, reset, register, errors } = useForm({
    defaultValues: {
      email: "",
    },
  });
  const onSubmit = async (values: any) => {
    ReactGA.event({
      category: "Subscription Click",
      action: "User pressed subscribe button",
    });
    const { email }: any = values;
    console.log(email);
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    const body = JSON.stringify({
      Email: email,
    });
    setState({
      loading: true,
      message: "Submitting",
    });
    try {
      const response = await axios.post(`${API}/subscriptions`, body, config);
      reset();
      if (response.status === 200) {
        setState({
          loading: false,
          message: "Thanks for subscribing",
        });
      }
    } catch (error) {
      setState({
        loading: false,
        message: "Error occured",
      });
    }

    setTimeout(() => {
      setState({
        ...state,
        message: "",
      });
    }, 1800);
  };

  return (
    <>
      <div className="footer">
        <div className="footer-cont">
          <div>
            <img className="footer-logo" src={Logo} alt="Logo-img" />
          </div>
          <div className="subscribe">
            <p className="subs-text">Subscribe to receive Program Updates</p>
            <div className="sub-cont">
              <div className="btn-sub">
                <input
                  className="sub-in"
                  type="text"
                  name="email"
                  placeholder="Email"
                  ref={register({
                    required: "Required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "invalid email address",
                    },
                  })}
                />
              </div>
              <div className="btn-sub">
                <button onClick={handleSubmit(onSubmit)} className="sub-btn">
                  Subscribe
                </button>
              </div>
            </div>
            <p className="subs-text tn">
              {errors.email && errors.email.message}
            </p>
            {state.message && <p className="subs-text tn">{state.message}</p>}
          </div>
          <div className="social-media">
            <div>
              <a target="_blank" href="https://www.facebook.com/HistoryDiaries">
                <img
                  className="social-icon"
                  src={Facebook}
                  alt="facebook-icon"
                />
              </a>
              <a
                target="_blank"
                href="https://www.instagram.com/historydiaries_/"
              >
                <img
                  className="social-icon"
                  src={Instagram}
                  alt="instagram-icon"
                />
              </a>
              <a target="_blank" href="https://twitter.com/HistoryDiaries">
                <img className="social-icon" src={Twitter} alt="twitter-icon" />
              </a>
              <a
                target="_blank"
                href=" https://www.linkedin.com/company/historydiaries/"
              >
                <img
                  className="social-icon"
                  src={LinkedIn}
                  alt="linkedin-icon"
                />
              </a>
              <a
                target="_blank"
                href=" https://www.youtube.com/channel/UCX2ohO31f1kYNINWT0EYYgw"
              >
                <img className="social-icon" src={Youtube} alt="youtube-icon" />
              </a>
            </div>{" "}
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
