"use client";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PortableText } from "@portabletext/react";
import { CallRex } from "./CallRex";
import { Agent } from "http";
import { FloatingAgent } from "./FloatingAgent.tsx/Agent";
type HeroSection2Props = {
  enabled: boolean;
  title: string;
  subtitle: string;
  backgroundColor?: string;
  primaryCta: { label: string; url: string };
  secondaryCta: {
    label: string;
    phoneNumber?: string;
    rexAgentImage?: { asset: { url: string } };
  };
  video?: string;
  videoThumbnail?: {
    asset: { url: string };
  };
};

export function HeroSection2(props: HeroSection2Props) {
  const {
    enabled,
    title,
    subtitle,
    primaryCta,
    secondaryCta,
    video,
    videoThumbnail,
    // backgroundColor = "#ffffff00",
  } = props;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const handlePlayPause = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  if (!enabled) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const openAgentPopup = () => {
    const agentPopup = document.getElementById("agentPopup");
    const agentButton = document.getElementById("agentButton");

    if (agentPopup && agentButton) {
      agentPopup.style.display = "block";
      agentButton.classList.add("noFloat");
    } else {
      console.warn("Rex widget not ready yet. Retrying...");
      setTimeout(openAgentPopup, 500);
    }
  };

  useEffect(() => {
    
    let script: HTMLScriptElement | null = null;

    const removeExistingWidgetElements = () => {
      document.getElementById("review-widget")?.append();
    };

    const runScript = () => {
      removeExistingWidgetElements();

      document.getElementById("rex-widget-script")?.remove();

      script = document.createElement("script");
      script.src =
        "https://fanciful-faun-02a7f0.netlify.app/index.js?agentId=agent_0498e1599d6ea9e13d09657f79";
      script.id = "rex-widget-script";
      script.async = false;
      script.defer = false;

      script.onload = () => {
        console.log("REX widget script loaded");
        if ((window as any).createReviewWidget) {
          (window as any).createReviewWidget();
          setScriptLoaded(true);
        } else {
          console.error("createReviewWidget not found after load");
        }
      };

      script.onerror = () => {
        console.error("Failed to load REX widget script");
      };

      document.body.appendChild(script);
    };

    runScript();

    return () => {
      script?.remove();
      removeExistingWidgetElements();
    };
  }, []);


  const serializers = {
    marks: {
      purple: ({ children }) => (
        <span style={{ color: "#6524EB" }}>{children}</span>
      ),
      strong: ({ children }) => <strong>{children}</strong>,
      break: ({ children }) => (
        <>
          {children}
          <br />
        </>
      ),
    },
  };

  return (
    <div>
      <div className="StartMain">
        <div>
          <img src="images/Ellipse 1.png" alt="Ellipse 1" />
          <img src="images/Ellipse 2.png" alt="Ellipse 2" />
          <img src="images/Ellipse 5.png" alt="Ellipse 5" />
          <img src="images/Ellipse 3.png" alt="Ellipse 3" />
          <img src="images/Ellipse 4.png" alt="Ellipse 4" />
          <img src="images/Ellipse 6.png" alt="Ellipse 6" />
          <img src="images/Ellipse 7.png" alt="Ellipse 7" />
          <img src="images/Ellipse 8.png" alt="Ellipse 8" />
          <img src="images/Ellipse 9.png" alt="Ellipse 9" />
          <img src="images/Ellipse 10.png" alt="Ellipse 10" />
          <img src="images/Ellipse 11.png" alt="Ellipse 11" />
        </div>
      </div>
      <section className=" relative  pt-28 md:pt-32 pb-16 md:pb-15  overflow-hidden bg-transparent dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div>
              <motion.h1
                variants={itemVariants}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6 leading-tight heroText"
              >
                <PortableText value={title} components={serializers} />
              </motion.h1>
              <motion.p
                variants={itemVariants}
                className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6 md:mb-8 leading-relaxed"
              >
                <PortableText value={subtitle} components={serializers} />
              </motion.p>
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 items-center"
              >
            
                <div className=" HeroSectionButton">
                  <a
                    className="flex flex-wrap justify-center items-center gap-4 inline-block p-2 rounded-[80px]"
                    style={{ background: "#6524eb" }}
                    href={primaryCta.url || "#"}
                    target={primaryCta.openInNewTab ? "_blank" : "_self"}
                  >
                    <div className="inline-flex items-center bg-[#6524eb] text-white rounded-[80px] px-6 py-0.5 border border-dashed border-white">
                      <div className="flex flex-col text-start">
                        <span className="text FreeTrial">
                          <PortableText
                            value={primaryCta.label}
                            components={serializers}
                          />
                        </span>
                      </div>
                    </div>
                  </a>
                </div>

                <div className="call-rex-button" onClick={openAgentPopup}>
                  <div className="button-content">
                    <div className="text">
                      <span>
                        <PortableText
                          value={secondaryCta.label}
                          components={serializers}
                        />
                      </span>
                      <strong>{secondaryCta.phoneNumber}</strong>
                    </div>
                    <img
                      src={
                        secondaryCta.rexAgentImage?.asset.url ||
                        "/images/Rex-Agent.png"
                      }
                      alt="REX"
                      className="avatar"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
            <motion.div className="relative m-auto mt-8 lg:mt-0">
              <div className="iframe-container relative w-[660px] h-[362px]">
                <video
                  ref={videoRef}
                  width="660"
                  height="362"
                  src={video?.asset?.url || "/images/videoplayback.mp4"}
                  poster={videoThumbnail?.asset?.url || "/images/thumbnail.png"}
                  onClick={handlePlayPause}
                  className="w-full h-full cursor-pointer rounded"
                />
                {!isPlaying && (
                  <button
                    onClick={handlePlayPause}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
                  >
                    <div className="play-video">
                      <svg
                        width="24"
                        height="24"
                        fill="white"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      {/* <FloatingAgent /> */}
    </div>
  );
}
