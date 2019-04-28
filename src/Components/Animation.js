import React from "react";
import Lottie from "react-lottie";
import animationData from "./lotties/animation-w250-h250.json";

class Animation extends React.Component {
  render() {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
    };

    return (
      <div>
        <Lottie options={defaultOptions} height={150} width={150} />
      </div>
    );
  }
}

export default Animation;
