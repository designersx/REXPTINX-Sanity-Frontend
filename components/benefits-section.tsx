"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Clock, DollarSign, Smile, Shield } from "lucide-react"

export function BenefitsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const benefits = [
    {
      icon: <Clock className="h-6 w-6 text-purple-600 dark:text-purple-400" />,
      title: "24/7 Availability",
      description: "Never miss a call, even outside business hours. Our AI receptionist works around the clock.",
    },
    {
      icon: <DollarSign className="h-6 w-6 text-purple-600 dark:text-purple-400" />,
      title: "Cost Effective",
      description: "Save up to 80% compared to traditional receptionist services with no compromise on quality.",
    },
    {
      icon: <Smile className="h-6 w-6 text-purple-600 dark:text-purple-400" />,
      title: "Improved Customer Experience",
      description: "Provide instant responses and solutions to callers, enhancing satisfaction and loyalty.",
    },
    {
      icon: <Shield className="h-6 w-6 text-purple-600 dark:text-purple-400" />,
      title: "Secure & Reliable",
      description: "Enterprise-grade security with 99.9% uptime guarantee for your peace of mind.",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

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
  }

  return (
    <section id="benefits" className="py-20 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight"
          >
            Why Choose <span className="text-purple-600 dark:text-purple-400">rexpt</span> AI Receptionist?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Transform your business communications with our cutting-edge AI technology.
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
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex gap-4"
                whileHover={{ x: 5, transition: { duration: 0.2 } }}
              >
                <div className="bg-purple-100 dark:bg-purple-900/30 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{benefit.description}</p>
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
            <div className="relative bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl p-8 shadow-xl overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-4">See the Difference</h3>
                <ul className="space-y-3 text-white">
                  <li className="flex items-center gap-2">
                    <div className="bg-white/20 rounded-full p-1">
                      <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>Reduce missed calls by 100%</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="bg-white/20 rounded-full p-1">
                      <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>Cut operational costs by up to 80%</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="bg-white/20 rounded-full p-1">
                      <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>Increase customer satisfaction by 60%</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="bg-white/20 rounded-full p-1">
                      <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>Free up 15+ hours per week for your team</span>
                  </li>
                </ul>
              </div>

              <motion.div
                className="absolute top-0 right-0 w-64 h-64 bg-purple-500 rounded-full opacity-30 z-0"
                animate={{
                  scale: [1, 1.2, 1],
                  x: [0, 10, 0],
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              />
              <motion.div
                className="absolute bottom-0 left-0 w-40 h-40 bg-purple-400 rounded-full opacity-20 z-0"
                animate={{
                  scale: [1, 1.3, 1],
                  x: [0, -10, 0],
                  y: [0, 10, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
