"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PortableText } from "@portabletext/react";
type HeroSection2Props = {
  enabled: boolean;
  title: string;
  subtitle: string;
  primaryCta: { label: string; url: string };
  secondaryCta: {
    label: string;
    rexAgentImage?: { asset: { url: string } };
  };
  video?: string;
};

export function HeroSection2(props: HeroSection2Props) {
  const { enabled, title, subtitle, primaryCta, secondaryCta, video } = props;

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

  const runScript = () => {
    console.log("hello");
    const script = document.createElement("script");
    script.src = "https://cheery-concha-c34d2b.netlify.app";
    script.async = true;
    document.body.appendChild(script);
  };

  const serializers = {
    marks: {
      purple: ({ children }) => (
        <span style={{ color: "rgb(147 51 234 / var(--tw-text-opacity, 1))" }}>
          {children}
        </span>
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
          {/* floating ellipses (assuming these images are static assets, so keep as is) */}
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
      <section className="pt-28 md:pt-32 pb-16 md:pb-15 mb-5 md:mb-5 overflow-hidden bg-transparent dark:bg-gray-950">
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
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6 leading-tight"
              >
                <PortableText value={title} components={serializers} />
              </motion.h1>
              <motion.p
                variants={itemVariants}
                className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6 md:mb-8 leading-relaxed"
              >
                {subtitle}
              </motion.p>
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button
                  className="bg-purple-600 hover:bg-purple-700 text-white text-base md:text-lg px-6 md:px-8 py-5 md:py-6"
                  onClick={() => {
                    if (primaryCta.url) window.open(primaryCta.url, "_blank");
                  }}
                >
                  {primaryCta.label}
                </Button>
                <Button
                  variant="outline"
                  className="RexButton"
                  onClick={runScript}
                >
                  <div className="rexControl">
                    <h5>{secondaryCta.label}</h5>
                    <div className="rexAgent">
                      <img
                        src={
                          secondaryCta.rexAgentImage?.asset.url ||
                          "/images/Rex-Agent.png"
                        }
                        alt="REX"
                      />
                    </div>
                  </div>
                </Button>
              </motion.div>
            </div>

            <motion.div
              className="relative m-auto mt-8 lg:mt-0"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.5,
                y: {
                  duration: 6,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  ease: "easeInOut",
                },
              }}
              whileInView={{ y: [0, -10, 0] }}
              viewport={{ once: false }}
            >
              <div className="iframe-container relative">
                <video width="660" height="362" controls>
                  <source
                    src={video?.asset?.url || "/images/videoplayback.mp4"}
                    type="video/mp4"
                  />
                </video>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
