"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { PhoneCall, MessageSquare, Bot } from "lucide-react"

export function HeroSection2() {
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
    
 <div>
 <div className="StartMain">
                
                <div>
                    {/* floating ellipses */}
                    <img src='images/Ellipse 1.png' alt='Ellipse 1' />
                    <img src='images/Ellipse 2.png' alt='Ellipse 2' />
                    <img src='images/Ellipse 5.png' alt='Ellipse 5' />
                    <img src='images/Ellipse 3.png' alt='Ellipse 3' />
                    <img src='images/Ellipse 4.png' alt='Ellipse 4' />
                    <img src='images/Ellipse 6.png' alt='Ellipse 6' />
                    <img src='images/Ellipse 7.png' alt='Ellipse 7' />
                    <img src='images/Ellipse 8.png' alt='Ellipse 8' />
                    <img src='images/Ellipse 9.png' alt='Ellipse 9' />
                    <img src='images/Ellipse 10.png' alt='Ellipse 10' />
                    <img src='images/Ellipse 11.png' alt='Ellipse 11' />
                </div>
            </div>
    <section className="pt-28 md:pt-32 pb-16 md:pb-15  mb-5 md:mb-5 overflow-hidden bg-transparent dark:bg-gray-950">
      
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
              Launch Your   <span className="text-purple-600 dark:text-purple-400">AI Receptionist</span>{" "}
              with Rexpt.in
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6 md:mb-8 leading-relaxed"
            >
              Engage leads by voice, automate bookings & reminders, and unlock actionable call analytics
            </motion.p>
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white text-base md:text-lg px-6 md:px-8 py-5 md:py-6">
                 &nbsp;&nbsp;Start Free Trial &nbsp;&nbsp;
              </Button>
              <Button
                variant="outline"
                className="border-purple-600 dark:border-purple-400 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/50 text-base md:text-lg px-6 md:px-8 py-5 md:py-6"
              >
                &nbsp;&nbsp; Call Rex &nbsp;&nbsp;
              </Button>
            </motion.div>
          </div>

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
            <div className="relative dark:to-purple-800/20 ">
             
             <iframe className=" rounded-2xl  shadow-xl" width="660" height="362" src="https://www.youtube.com/embed/RyNJghrvrKs?si=-57zLnxZjneMuVSA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
             
            </div>

            
            
          </motion.div>
        </motion.div>
      </div>
    </section>
    </div>

  )
}