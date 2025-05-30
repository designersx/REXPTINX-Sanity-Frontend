import React from "react";
import Lottie from "@lottielab/lottie-player/react";
import { PortableText } from "@portabletext/react";

type Feature = {
  svgIcon: string;
  text: string;
};

type CustomSectionProps = {
  enabled: boolean;
  backgroundColor?: string;
  title: any;
  subtitle: string;
  lottieUrl: string;
  features: Feature[];
};

const CustomSection: React.FC<CustomSectionProps> = ({
  enabled,
  backgroundColor = "#ffffff",
  title,
  subtitle,
  lottieUrl,
  features,
}) => {
  if (!enabled) return null;

  const serializers = {
    marks: {
      purple: ({ children }: { children: React.ReactNode }) => (
        <span style={{ color: "#6524EB" }}>{children}</span>
      ),
      strong: ({ children }: { children: React.ReactNode }) => (
        <strong>{children}</strong>
      ),
      break: ({ children }: { children: React.ReactNode }) => (
        <>
          {children}
          <br />
        </>
      ),
    },
  };

  return (
    <section className=" py-20"style={{ backgroundColor }}>
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
          <PortableText value={title} components={serializers} />
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
          {subtitle}
        </p>
      </div>

      <div className="LottiesFile">
        <Lottie src={lottieUrl} autoplay />
      </div>

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
        {features?.map((feature, idx) => (
          <React.Fragment key={idx}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                whiteSpace: "nowrap",
              }}
            >
              <span
                dangerouslySetInnerHTML={{ __html: feature.svgIcon }}
                style={{
                  display: "inline-block",
                  width: "24px",
                  height: "24px",
                }}
              />
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
    </section>
  );
};

export default CustomSection;
