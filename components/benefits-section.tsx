import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Clock, DollarSign, Smile, Shield } from "lucide-react";
import { PortableText } from "@portabletext/react";
type BenefitSectionProps = {
  data: {
    enabled:boolean,
    title: string;
    introText: string;
    features: {
      svgIcon: string;
      title: string;
      description: string;
    }[];
    seeTheDifference: {
      heading: string;
      bulletPoints: string[];
    };
  };
};

export function BenefitsSection({ data }: BenefitSectionProps) {
    if (!data.enabled) return null;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { title, introText, features, seeTheDifference } = data;
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };
  const serializers = {
    marks: {
      purple: ({ children }: { children: React.ReactNode }) => (
        <span style={{ color: "#6524EB" }}>
          {children}
        </span>
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
    <section id="benefits" className="py-20 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight"
          >
            <PortableText value={title} components={serializers} />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            {introText}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-8"
          >
            {features?.map((feature, index) => (
              <motion.div
                key={feature.title || index}
                variants={itemVariants}
                className="flex gap-4"
                whileHover={{ x: 5, transition: { duration: 0.2 } }}
              >
                <div className="bg-[#6524EB] dark:bg-[#6524EB] rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 custom-div">
                  {/* Render SVG icon dynamically */}
                  <div
                    dangerouslySetInnerHTML={{
                      __html: feature.svgIcon,
                    }}
                    className="h-6 w-6 text-white dark:text-[#6524EB]"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-[#6524EB] to-[#6524EB] rounded-2xl p-8 shadow-xl overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-4">
                  {seeTheDifference.heading}
                </h3>
                <ul className="space-y-3 text-white">
                  {seeTheDifference.bulletPoints?.map((point, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="bg-white/20 rounded-full p-1 custom-div">
                        <svg
                          className="h-4 w-4 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <motion.div
                className="absolute bottom-0 left-0 w-40 h-40 bg-purple-400 rounded-full opacity-20 z-0 "
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
                className="absolute top-0 right-0 w-64 h-64 bg-purple-500 rounded-full opacity-30 z-0"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
