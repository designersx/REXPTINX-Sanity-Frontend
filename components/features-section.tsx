"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { PhoneCall, Calendar, MessageSquare, Bot, Headphones, Brain } from "lucide-react"

export function FeaturesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const features = [
    {
      icon: <PhoneCall className="h-6 w-6 text-purple-600" />,
      title: "Call Handling",
      description: "Automatically answer and manage incoming calls with natural voice responses.",
    },
    {
      icon: <Calendar className="h-6 w-6 text-purple-600" />,
      title: "Appointment Scheduling",
      description: "Book appointments and manage your calendar without human intervention.",
    },
    {
      icon: <MessageSquare className="h-6 w-6 text-purple-600" />,
      title: "Message Routing",
      description: "Intelligently route messages to the right person or department.",
    },
    {
      icon: <Bot className="h-6 w-6 text-purple-600" />,
      title: "Custom AI Agents",
      description: "Create personalized AI agents tailored to your business needs.",
    },
    {
      icon: <Headphones className="h-6 w-6 text-purple-600" />,
      title: "Human-like Voice",
      description: "Natural-sounding voices that create a seamless caller experience.",
    },
    {
      icon: <Brain className="h-6 w-6 text-purple-600" />,
      title: "Intelligent Responses",
      description: "Context-aware responses that understand and address caller needs.",
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight"
          >
            Powerful Features for Your <span className="text-purple-600">Virtual Receptionist</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Our AI receptionist comes equipped with everything you need to handle calls professionally and efficiently.
          </motion.p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300"
              whileHover={{ y: -5, scale: 1.02, transition: { duration: 0.2 } }}
            >
              <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
