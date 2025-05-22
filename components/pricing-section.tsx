"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Check, X } from "lucide-react"

export function PricingSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [isYearly, setIsYearly] = useState(false)

  // Pricing data
  const pricingTiers = [
    {
      name: "Mini",
      monthlyPrice: 99,
      description: "Perfect for small businesses with basic needs",
      features: [
        "1 AI Receptionist agent",
        "100 minutes/month",
        "Business hours availability",
        "Email notifications",
        "Basic call routing",
        "Standard voice options",
      ],
      notIncluded: ["Custom voice options", "Advanced analytics", "CRM integration"],
      buttonText: "Get Started",
      highlighted: false,
    },
    {
      name: "Pro",
      monthlyPrice: 499,
      description: "Ideal for growing businesses with moderate call volume",
      features: [
        "5 AI Receptionist agents",
        "1,000 minutes/month",
        "24/7 availability",
        "Email & SMS notifications",
        "Advanced call routing",
        "Calendar integration",
        "Custom voice options",
        "Basic analytics",
      ],
      notIncluded: ["Full CRM integration", "Custom workflows", "Dedicated account manager"],
      buttonText: "Get Started",
      highlighted: true,
    },
    {
      name: "Business",
      monthlyPrice: 999,
      description: "For businesses with high call volumes and complex needs",
      features: [
        "15 AI Receptionist agents",
        "5,000 minutes/month",
        "24/7 availability",
        "Priority support",
        "Advanced analytics",
        "Full CRM integration",
        "Custom workflows",
        "Custom voice options",
        "API access",
      ],
      notIncluded: ["Dedicated account manager", "Custom implementation"],
      buttonText: "Get Started",
      highlighted: false,
    },
    {
      name: "Enterprise",
      monthlyPrice: null,
      description: "Custom solutions for large organizations with specific requirements",
      features: [
        "Unlimited AI Receptionist agents",
        "Custom minute packages",
        "24/7 availability",
        "Priority support",
        "Advanced analytics",
        "Full CRM integration",
        "Custom workflows",
        "Custom voice options",
        "API access",
        "Dedicated account manager",
        "Custom implementation",
        "SLA guarantees",
      ],
      notIncluded: [],
      buttonText: "Contact Sales",
      highlighted: false,
    },
  ]

  // Calculate price with yearly discount if applicable
  const calculatePrice = (monthlyPrice) => {
    if (monthlyPrice === null) return "Custom"
    const price = isYearly ? monthlyPrice * 0.8 : monthlyPrice
    return `$${price}`
  }

  // Format price for display
  const formatPrice = (tier) => {
    if (tier.monthlyPrice === null) return "Custom"
    const price = isYearly ? tier.monthlyPrice * 0.8 : tier.monthlyPrice
    return `$${price}`
  }

  return (
    <section id="pricing" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight"
          >
            Simple, <span className="text-purple-600">Transparent</span> Pricing
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8"
          >
            Choose the plan that fits your business needs. All plans include a 14-day free trial.
          </motion.p>

          {/* Billing Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center justify-center mb-12"
          >
            <span className={`text-lg ${!isYearly ? "text-purple-600 font-semibold" : "text-gray-600"}`}>Monthly</span>
            <div className="relative mx-4 h-6 w-12 cursor-pointer" onClick={() => setIsYearly(!isYearly)}>
              <div className="absolute inset-0 rounded-full bg-gray-300"></div>
              <motion.div
                className="absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-md"
                animate={{ x: isYearly ? 24 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
              <div className={`absolute inset-0 rounded-full ${isYearly ? "bg-purple-600" : "bg-gray-300"}`}></div>
            </div>
            <div className="flex items-center">
              <span className={`text-lg ${isYearly ? "text-purple-600 font-semibold" : "text-gray-600"}`}>Yearly</span>
              {isYearly && (
                <span className="ml-2 bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  Save 20%
                </span>
              )}
            </div>
          </motion.div>
        </div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
              className={`rounded-xl overflow-hidden h-full flex flex-col ${
                tier.highlighted
                  ? "bg-gradient-to-b from-purple-600 to-purple-700 text-white shadow-xl transform md:-translate-y-4"
                  : "bg-white border border-gray-200 text-gray-800"
              }`}
            >
              <div className="p-6 flex-grow">
                <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-4xl font-bold">{formatPrice(tier)}</span>
                  <span className="ml-2 opacity-80">
                    {tier.monthlyPrice !== null ? `/${isYearly ? "year" : "month"} per agent` : ""}
                  </span>
                </div>
                <p className={`mb-6 ${tier.highlighted ? "text-purple-100" : "text-gray-600"}`}>{tier.description}</p>
                <Button
                  className={`w-full py-6 ${
                    tier.highlighted
                      ? "bg-white text-purple-600 hover:bg-gray-100"
                      : "bg-purple-600 text-white hover:bg-purple-700"
                  }`}
                >
                  {tier.buttonText}
                </Button>
              </div>
              <div className={`p-6 ${tier.highlighted ? "bg-purple-800/30" : "bg-gray-50"} flex-grow`}>
                <p className={`font-medium mb-4 ${tier.highlighted ? "text-white" : "text-gray-700"}`}>
                  What's included:
                </p>
                <ul className="space-y-3 mb-6">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div
                        className={`rounded-full p-1 mt-0.5 ${
                          tier.highlighted ? "bg-purple-500/30 text-white" : "bg-purple-100 text-purple-600"
                        }`}
                      >
                        <Check className="h-4 w-4" />
                      </div>
                      <span className={`${tier.highlighted ? "text-purple-100" : "text-gray-600"}`}>{feature}</span>
                    </li>
                  ))}
                </ul>

                {tier.notIncluded.length > 0 && (
                  <>
                    <p className={`font-medium mb-4 ${tier.highlighted ? "text-white/80" : "text-gray-500"}`}>
                      Not included:
                    </p>
                    <ul className="space-y-3">
                      {tier.notIncluded.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div
                            className={`rounded-full p-1 mt-0.5 ${
                              tier.highlighted ? "bg-purple-500/20 text-white/70" : "bg-gray-200 text-gray-500"
                            }`}
                          >
                            <X className="h-4 w-4" />
                          </div>
                          <span className={`${tier.highlighted ? "text-white/70" : "text-gray-500"}`}>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600">
            Need a custom solution?{" "}
            <a href="#contact" className="text-purple-600 font-medium hover:underline">
              Contact our sales team
            </a>{" "}
            for personalized pricing.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
