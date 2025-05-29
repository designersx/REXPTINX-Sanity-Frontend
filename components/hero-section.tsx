"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PhoneCall, MessageSquare, Bot } from "lucide-react";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
// Defining the structure for chat messages
export interface ChatMessage {
  sender: "bot" | "user";
  text: string;
  svgIcon: string; // SVG Icon for each message
}

export interface Cta {
  label: string;
  url: string;
}

export interface HeroSectionProps {
  enabled: boolean;
  title: string;
  subtitle: string;
  chatPreview: ChatMessage[];
  primaryCta: Cta;
  secondaryCta: Cta;
  svgIcon: string;
}
export function HeroSection({
  enabled,
  title,
  subtitle,
  chatPreview,
  primaryCta,
  secondaryCta,
  svgIcon,
}: HeroSectionProps) {
  if (!enabled) return null;
  const serializers = {
    marks: {
      purple: ({ children }) => (
        <span style={{ color: "#6524EB" }}>
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

  return (
    <section className="pt-28 md:pt-32 pb-16 md:pb-20 overflow-hidden bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* LEFT SIDE */}
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
              <Link
                href={primaryCta.url || "#"}
                target={primaryCta.url ? "_blank" : "_self"}
              >
                <Button
                  as="a"
                  className="bg-purple-600 hover:bg-purple-700 text-white text-base md:text-lg px-6 md:px-8 py-5 md:py-6"
                  role="link"
                >
                  {primaryCta.label}
                </Button>
              </Link>

              <Link
                href={secondaryCta.url || "#"}
                target={secondaryCta.url ? "_blank" : "_self"}
              >
                <Button
                  as="a"
                  variant="outline"
                  className="border-purple-600 dark:border-purple-400 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/50 text-base md:text-lg px-6 md:px-8 py-5 md:py-6"
                  role="link"
                >
                  {secondaryCta.label}
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* RIGHT SIDE CHAT PREVIEW */}
          <motion.div
            className="relative mt-8 lg:mt-0"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            whileInView={{ y: [0, -10, 0] }}
            viewport={{ once: false }}
            transition={{
              y: {
                duration: 6,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                ease: "easeInOut",
              },
            }}
          >
            <div className="relative bg-gradient-to-br from-purple-100 to-purple-50 dark:from-purple-900/30 dark:to-purple-800/20 rounded-2xl p-4 md:p-6 shadow-xl">
              <div className="absolute -top-4 -left-4 bg-purple-600 text-white p-2 md:p-3 rounded-full">
                <div
                  className="h-6 w-6"
                  dangerouslySetInnerHTML={{ __html: svgIcon }}
                />
              </div>
              <div className="space-y-4 md:space-y-6">
                {chatPreview?.map((msg, i) => (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    className={`flex items-start gap-3 max-w-md ${
                      msg.sender === "user" ? "ml-auto flex-row-reverse" : ""
                    }`}
                  >
                    {/* Dynamically inject SVG */}
                    <div
                      className={`${
                        msg.sender === "user"
                          ? "ml-auto bg-gray-400 dark:bg-gray-500"
                          : "bg-purple-600"
                      } p-1.5 md:p-2 rounded-full`}
                      dangerouslySetInnerHTML={{ __html: msg.svgIcon }}
                      style={{ color: "#fff" }}
                    ></div>
                    <div
                      className={`p-3 md:p-4 rounded-lg shadow-md ${
                        msg.sender === "bot"
                          ? "bg-white dark:bg-gray-800 rounded-tl-none"
                          : "bg-gray-100 dark:bg-gray-700 rounded-tr-none ml-auto"
                      }`}
                    >
                      <p className="text-sm md:text-base text-gray-800 dark:text-gray-200">
                        {msg.text}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* PURPLE BLOBS */}
            <motion.div
              className="absolute -bottom-6 md:-bottom-10 -right-6 md:-right-10 bg-purple-100 dark:bg-purple-800/30 rounded-full h-24 md:h-40 w-24 md:w-40 z-[-1]"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
            <motion.div
              className="absolute -top-6 md:-top-10 -left-6 md:-left-10 bg-purple-200 dark:bg-purple-700/30 rounded-full h-16 md:h-24 w-16 md:w-24 z-[-1]"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
