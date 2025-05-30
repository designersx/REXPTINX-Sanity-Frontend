"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { PortableText } from "@portabletext/react";
import {
  PhoneCall,
  Calendar,
  MessageSquare,
  Bot,
  Headphones,
  Brain,
} from "lucide-react";

type Feature = {
  enabled: boolean;
  title: string;
  description: string;
  svgIcon: string;
};

type Props = {
  sectionTitle: string;
  sectionSubtitle: string;
  features: Feature[];
  backgroundColor?: string;
};

export function FeaturesSection({
  enabled,
  sectionTitle,
  sectionSubtitle,
  features,
  backgroundColor = "#F9FAFB",
}: Props) {
  if (!enabled) return null;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

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
    <section
      id="features"
      className="py-20 bg-gray-50 dark:bg-gray-900 relative z-1"
      style={{ backgroundColor: backgroundColor }}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight"
          >
            <PortableText value={sectionTitle} components={serializers} />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            {sectionSubtitle}
          </motion.p>
        </div>

        {/* Feature Cards */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features?.map((feat, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300"
              whileHover={{ y: -5, scale: 1.02, transition: { duration: 0.2 } }}
            >
              <div
                className="bg-[#6524EB] dark:bg-[#6524EB]900/30 rounded-full w-12 h-12 flex items-center justify-center mb-4"
                dangerouslySetInnerHTML={{ __html: feat.svgIcon }}
                style={{ color: "white" }}
              ></div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {feat.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feat.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
