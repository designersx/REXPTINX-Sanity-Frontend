"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { PhoneCall, MessageSquare, Bot } from "lucide-react"

export function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
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
        damping: 10,
      },
    },
  }

  return (
    <section className="pt-32 pb-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div>
            <motion.div variants={itemVariants}>
              <Image
                src="/images/logo.png"
                alt="rexpt - The AI Receptionist Service"
                width={300}
                height={100}
                className="mb-8"
              />
            </motion.div>
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
            >
              Your AI Receptionist for <span className="text-purple-600">Human-like</span> Conversations
            </motion.h1>
            <motion.p variants={itemVariants} className="text-xl text-gray-600 mb-8 leading-relaxed">
              Create AI agents that handle inbound calls with natural voice and intelligent responses. Never miss a call
              again.
            </motion.p>
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white text-lg px-8 py-6">
                Start Free Trial
              </Button>
              <Button
                variant="outline"
                className="border-purple-600 text-purple-600 hover:bg-purple-50 text-lg px-8 py-6"
              >
                Watch Demo
              </Button>
            </motion.div>
          </div>

          <motion.div
            className="relative"
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
            <div className="relative bg-gradient-to-br from-purple-100 to-purple-50 rounded-2xl p-6 shadow-xl">
              <div className="absolute -top-4 -left-4 bg-purple-600 text-white p-3 rounded-full">
                <PhoneCall size={24} />
              </div>
              <div className="space-y-6">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="flex items-start gap-3 max-w-md"
                >
                  <div className="bg-purple-600 p-2 rounded-full">
                    <Bot size={20} className="text-white" />
                  </div>
                  <div className="bg-white p-4 rounded-lg rounded-tl-none shadow-md">
                    <p className="text-gray-800">"Hello! This is rexpt AI assistant. How may I help you today?"</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1.1 }}
                  className="flex items-start gap-3 max-w-md ml-auto"
                >
                  <div className="bg-gray-100 p-4 rounded-lg rounded-tr-none shadow-md">
                    <p className="text-gray-800">"I'd like to schedule a meeting with Sarah for tomorrow."</p>
                  </div>
                  <div className="bg-gray-400 p-2 rounded-full">
                    <MessageSquare size={20} className="text-white" />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1.4 }}
                  className="flex items-start gap-3 max-w-md"
                >
                  <div className="bg-purple-600 p-2 rounded-full">
                    <Bot size={20} className="text-white" />
                  </div>
                  <div className="bg-white p-4 rounded-lg rounded-tl-none shadow-md">
                    <p className="text-gray-800">
                      "I see Sarah has availability at 10 AM or 2 PM tomorrow. Which time works better for you?"
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>

            <motion.div
              className="absolute -bottom-10 -right-10 bg-purple-100 rounded-full h-40 w-40 z-[-1]"
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
              className="absolute -top-10 -left-10 bg-purple-200 rounded-full h-24 w-24 z-[-1]"
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
  )
}
