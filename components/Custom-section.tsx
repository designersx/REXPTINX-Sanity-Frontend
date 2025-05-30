import React from "react";
import Lottie from "@lottielab/lottie-player/react";

const CustomSection: React.FC = () => {
  const features = [
    {
      icon: "↻",
      text: "Seamless Automation",
    },
    {
      icon: "🕒",
      text: "Real-Time Data Sync",
    },
    {
      icon: "⚙️",
      text: "Customizable Solutions",
    },
  ];
  return (
    <>
      <div>
        <h2
          style={{
            marginBottom: "8px",
            fontWeight: "600",
            fontSize: "2rem",
            color: "#1c1c1e",
            textAlign: "center",
          }}
        >
          <span style={{color:"#6524EB"}}>Integrates</span> with
        </h2>
        <p
          style={{
            marginTop: 0,
            marginBottom: "24px",
            fontSize: "1rem",
            color: "#4a5568",
            textAlign: "center",
          }}
        >
          Seamlessly integrate with your favorite tools
        </p>
      </div>
      <div className="LottiesFile">
        <Lottie
          src="https://cdn.lottielab.com/l/8QspPNfHmrqQXp.json"
          autoplay
        />
      </div>
      {/* Features section below Lottie */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "40px",
          fontSize: "1rem",
          color: "#4a5568",
          alignItems: "center",
          marginBottom: "4rem",
          paddingTop: "20px",
          maxWidth: "600px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {features.map((feature, idx) => (
          <React.Fragment key={idx}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                whiteSpace: "nowrap",
              }}
            >
              <span style={{ fontSize: "1.5rem" }}>{feature.icon}</span>
              <span>{feature.text}</span>
            </div>
            {idx < features.length - 1 && (
              <div
                style={{
                  height: "20px",
                  borderRight: "1px solid #ccc",
                  marginLeft: "20px",
                  marginRight: "20px",
                }}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default CustomSection;
