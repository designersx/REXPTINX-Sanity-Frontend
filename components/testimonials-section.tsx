"use client";
import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import Image from "next/image";
import { TestimonialData } from "@/app/page";
import { PortableText } from "@portabletext/react";
type Props = {
  sectionTitle: string;
  sectionSubtitle: string;
  testimonials: TestimonialData[];
  backgroundColor?: string;
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

export function TestimonialsSection({
  sectionTitle,
  sectionSubtitle,
  testimonials,
  backgroundColor = "#f9fafb",
}: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => setActiveIndex((i) => (i + 1) % testimonials.length);
  const prev = () =>
    setActiveIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

  return (
    <section
      id="testimonials"
      className="py-20 bg-gray-50 dark:bg-gray-900"
      style={{
        backgroundColor: !document.documentElement.classList.contains("dark")
          ? backgroundColor
          : undefined,
      }}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            ref={ref}
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

        <div className="relative max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12"
          >
            <div className="flex flex-col md:flex-row gap-8 items-center">
              {/* Avatar */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex-shrink-0"
              >
                <motion.img
                  src={testimonials[activeIndex].authorImageUrl}
                  alt={testimonials[activeIndex].name || ""}
                  className="w-20 h-20 rounded-full object-cover border-4 border-purple-100 dark:border-purple-800"
                />
              </motion.div>

              {/* Text */}
              <div>
                {/* Stars */}
                <div className="flex mb-4">
                  {Array.from({
                    length: testimonials[activeIndex].rating,
                  })?.map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>

                {/* Quote */}
                <motion.p
                  key={`quote-${activeIndex}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-gray-700 dark:text-gray-200 text-lg italic mb-6"
                >
                  "{testimonials[activeIndex].content}"
                </motion.p>

                {/* Name & role */}
                <motion.div
                  key={`author-${activeIndex}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {testimonials[activeIndex].name}
                  </h4>
                  <p className="text-[#6524EB] dark:text-[#6524EB]">
                    {testimonials[activeIndex].position}
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Controls */}
          <div className="flex justify-center mt-8 gap-4">
            <motion.button
              onClick={prev}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-white dark:bg-gray-800 rounded-full p-3 shadow-md hover:bg-[#6524EB] dark:hover:bg-white transition-colors"
            >
              <ChevronLeft className="h-6 w-6 text-[#6524EB] dark:text-[#6524EB] hover:text-white transition-colors" />
            </motion.button>

            <div className="flex gap-2 items-center">
              {testimonials?.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-3 w-3 rounded-full transition-colors ${
                    idx === activeIndex
                      ? "bg-[#6524EB] dark:bg-[#6524EB]"
                      : "bg-[#6524EB] dark:bg-[#6524EB]"
                  }`}
                />
              ))}
            </div>

            <motion.button
              onClick={next}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-white dark:bg-gray-800 rounded-full p-3 shadow-md hover:bg-[#6524EB] dark:hover:bg-white transition-colors"
            >
              <ChevronRight className="h-6 w-6 text-[#6524EB] dark:text-[#6524EB] hover:text-white transition-colors" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
