"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

export function TestimonialsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [activeIndex, setActiveIndex] = useState(0)

  const testimonials = [
    {
      name: "Sarah Johnson",
      position: "CEO, TechStart Inc.",
      content:
        "Implementing rexpt's AI receptionist has been a game-changer for our business. Our calls are handled professionally 24/7, and the AI's ability to understand context is remarkable. It's like having a full-time receptionist at a fraction of the cost.",
      rating: 5,
      image: "/professional-woman-short-hair.png",
    },
    {
      name: "Michael Chen",
      position: "Founder, Innovate Solutions",
      content:
        "We were skeptical about an AI handling our important client calls, but rexpt has exceeded our expectations. The voice sounds completely natural, and clients often don't realize they're speaking with an AI. It's saved us countless hours and improved our response time.",
      rating: 5,
      image: "/asian-professional-glasses.png",
    },
    {
      name: "Emily Rodriguez",
      position: "Office Manager, Legal Partners",
      content:
        "As a law firm, we need to ensure every call is handled with care and confidentiality. The rexpt AI receptionist has been perfect for our needs, accurately routing calls and capturing important information. I can't imagine going back to our old system.",
      rating: 5,
      image: "/latina-professional-woman.png",
    },
  ]

  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section id="testimonials" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight"
          >
            What Our <span className="text-purple-600 dark:text-purple-400">Clients Say</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Discover how businesses are transforming their communication with our AI receptionist.
          </motion.p>
        </div>

        <div ref={ref} className="relative max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12"
          >
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-shrink-0">
                <motion.img
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  src={testimonials[activeIndex].image}
                  alt={testimonials[activeIndex].name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-purple-100 dark:border-purple-800"
                />
              </div>
              <div>
                <div className="flex mb-4">
                  {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <motion.p
                  key={activeIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-gray-700 dark:text-gray-200 text-lg italic mb-6"
                >
                  "{testimonials[activeIndex].content}"
                </motion.p>
                <motion.div
                  key={`name-${activeIndex}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {testimonials[activeIndex].name}
                  </h4>
                  <p className="text-purple-600 dark:text-purple-400">{testimonials[activeIndex].position}</p>
                </motion.div>
              </div>
            </div>
          </motion.div>

          <div className="flex justify-center mt-8 gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevTestimonial}
              className="bg-white dark:bg-gray-800 rounded-full p-3 shadow-md hover:bg-purple-50 dark:hover:bg-gray-700 transition-colors"
            >
              <ChevronLeft className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </motion.button>
            <div className="flex gap-2 items-center">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-3 w-3 rounded-full transition-colors ${
                    index === activeIndex ? "bg-purple-600 dark:bg-purple-400" : "bg-purple-200 dark:bg-purple-800"
                  }`}
                />
              ))}
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextTestimonial}
              className="bg-white dark:bg-gray-800 rounded-full p-3 shadow-md hover:bg-purple-50 dark:hover:bg-gray-700 transition-colors"
            >
              <ChevronRight className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  )
}
