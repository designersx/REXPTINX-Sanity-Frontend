"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Check, X, ChevronDown, ChevronUp } from "lucide-react"

export function PricingSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [isYearly, setIsYearly] = useState(false)
  const [expandedTier, setExpandedTier] = useState<number | null>(null)

  // Toggle expanded tier
  const toggleTier = (index: number) => {
    setExpandedTier(expandedTier === index ? null : index)
  }

  // Updated pricing data with separate monthly and yearly prices
  const pricingTiers = [
    {
      name: "Mini",
      monthlyPrice: 119,
      yearlyPrice: 99,
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
      monthlyPrice: 599,
      yearlyPrice: 499,
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
      yearlyPrice: 799,
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
      yearlyPrice: null,
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

  // Format price for display
  const formatPrice = (tier) => {
    const price = isYearly ? tier.yearlyPrice : tier.monthlyPrice
    if (price === null) return "Custom"
    return `$${price}`
  }

  // Calculate savings percentage
  const calculateSavings = (tier) => {
    if (tier.monthlyPrice === null || tier.yearlyPrice === null) return null
    const monthlyCostForYear = tier.monthlyPrice * 12
    const yearlyCost = tier.yearlyPrice * 12
    const savings = ((monthlyCostForYear - yearlyCost) / monthlyCostForYear) * 100
    return Math.round(savings)
  }

  return (
    <section id="pricing" className="py-20 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight"
          >
            Simple, <span className="text-purple-600 dark:text-purple-400">Transparent</span> Pricing
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8"
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
            <span
              className={`text-lg ${!isYearly ? "text-purple-600 dark:text-purple-400 font-semibold" : "text-gray-600 dark:text-gray-400"}`}
            >
              Monthly
            </span>
            <div
              className="relative mx-4 h-7 w-14 cursor-pointer"
              onClick={() => setIsYearly(!isYearly)}
              role="switch"
              aria-checked={isYearly}
              aria-label={`Switch to ${isYearly ? "monthly" : "yearly"} billing`}
            >
              <div
                className={`absolute inset-0 rounded-full cursor-pointer transition-colors duration-300 ${
                  isYearly
                    ? "bg-purple-600 dark:bg-purple-500 hover:bg-purple-700 dark:hover:bg-purple-400"
                    : "bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600"
                }`}
                aria-hidden="true"
              ></div>
              <motion.div
                className="absolute top-1 left-1 h-5 w-5 rounded-full bg-white shadow-md z-10"
                animate={{ x: isYearly ? 28 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </div>
            <div className="flex items-center">
              <span
                className={`text-lg ${isYearly ? "text-purple-600 dark:text-purple-400 font-semibold" : "text-gray-600 dark:text-gray-400"}`}
              >
                Yearly
              </span>
              <span className="ml-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 text-xs font-medium px-2.5 py-0.5 rounded">
                Save up to 20% yearly
              </span>
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
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className={`rounded-xl overflow-hidden h-full flex flex-col ${
                tier.highlighted
                  ? "bg-gradient-to-b from-purple-600 to-purple-700 text-white shadow-xl transform md:-translate-y-4"
                  : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200"
              }`}
            >
              {/* Mobile view - Compact pricing card */}
              <div className="md:hidden p-6 cursor-pointer" onClick={() => toggleTier(index)}>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-2xl font-bold mb-1">{tier.name}</h3>
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold">{formatPrice(tier)}</span>
                      <span className="ml-2 opacity-80">
                        {(isYearly ? tier.yearlyPrice : tier.monthlyPrice) !== null ? `/month per agent` : ""}
                      </span>
                    </div>
                    {isYearly && tier.monthlyPrice !== null && tier.yearlyPrice !== null && (
                      <div className="mt-1 text-sm text-green-600 dark:text-green-400">
                        Save {calculateSavings(tier)}%
                      </div>
                    )}
                  </div>
                  <div className={`${tier.highlighted ? "text-white" : "text-purple-600 dark:text-purple-400"}`}>
                    {expandedTier === index ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                  </div>
                </div>

                {/* Show a brief summary in collapsed state */}
                {expandedTier !== index && (
                  <p className={`mt-3 ${tier.highlighted ? "text-purple-100" : "text-gray-600 dark:text-gray-300"}`}>
                    {tier.description}
                  </p>
                )}

                {/* Expanded content for mobile */}
                {expandedTier === index && (
                  <div className="mt-4">
                    <p className={`mb-4 ${tier.highlighted ? "text-purple-100" : "text-gray-600 dark:text-gray-300"}`}>
                      {tier.description}
                    </p>

                    <div className={`mt-6 ${tier.highlighted ? "text-white" : "text-gray-700 dark:text-gray-300"}`}>
                      <p className="font-medium mb-3">What's included:</p>
                      <ul className="space-y-2 mb-6">
                        {tier.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <div
                              className={`rounded-full p-1 mt-0.5 flex-shrink-0 ${
                                tier.highlighted
                                  ? "bg-purple-500/30 text-white"
                                  : "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                              }`}
                            >
                              <Check className="h-3 w-3" />
                            </div>
                            <span
                              className={`text-sm ${tier.highlighted ? "text-purple-100" : "text-gray-600 dark:text-gray-300"}`}
                            >
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>

                      {tier.notIncluded.length > 0 && (
                        <>
                          <p
                            className={`font-medium mb-3 ${tier.highlighted ? "text-white/80" : "text-gray-500 dark:text-gray-400"}`}
                          >
                            Not included:
                          </p>
                          <ul className="space-y-2">
                            {tier.notIncluded.map((feature, i) => (
                              <li key={i} className="flex items-start gap-3">
                                <div
                                  className={`rounded-full p-1 mt-0.5 flex-shrink-0 ${
                                    tier.highlighted
                                      ? "bg-purple-500/20 text-white/70"
                                      : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                                  }`}
                                >
                                  <X className="h-3 w-3" />
                                </div>
                                <span
                                  className={`text-sm ${tier.highlighted ? "text-white/70" : "text-gray-500 dark:text-gray-400"}`}
                                >
                                  {feature}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                    </div>

                    <Button
                      className={`w-full mt-6 ${
                        tier.highlighted
                          ? "bg-white text-purple-600 hover:bg-gray-100"
                          : "bg-purple-600 dark:bg-purple-500 text-white hover:bg-purple-700 dark:hover:bg-purple-600"
                      }`}
                    >
                      {tier.buttonText}
                    </Button>
                  </div>
                )}
              </div>

              {/* Desktop view - Full pricing card */}
              <div className="hidden md:flex md:flex-col">
                <div className="p-6 flex-grow">
                  <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                  <div className="flex items-baseline mb-2">
                    <span className="text-4xl font-bold">{formatPrice(tier)}</span>
                    <span className="ml-2 opacity-80">
                      {(isYearly ? tier.yearlyPrice : tier.monthlyPrice) !== null ? `/month per agent` : ""}
                    </span>
                  </div>
                  {isYearly && tier.monthlyPrice !== null && tier.yearlyPrice !== null && (
                    <div className="mb-4 text-sm text-amber-500 dark:text-amber-300 font-medium">
                      Save {calculateSavings(tier)}% compared to monthly
                    </div>
                  )}
                  <p className={`mb-6 ${tier.highlighted ? "text-purple-100" : "text-gray-600 dark:text-gray-300"}`}>
                    {tier.description}
                  </p>
                  <Button
                    className={`w-full py-6 ${
                      tier.highlighted
                        ? "bg-white text-purple-600 hover:bg-gray-100"
                        : "bg-purple-600 dark:bg-purple-500 text-white hover:bg-purple-700 dark:hover:bg-purple-600"
                    }`}
                  >
                    {tier.buttonText}
                  </Button>
                </div>
                <div
                  className={`p-6 ${tier.highlighted ? "bg-purple-800/30" : "bg-gray-50 dark:bg-gray-900/50"} flex-grow`}
                >
                  <p
                    className={`font-medium mb-4 ${tier.highlighted ? "text-white" : "text-gray-700 dark:text-gray-300"}`}
                  >
                    What's included:
                  </p>
                  <ul className="space-y-3 mb-6">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div
                          className={`rounded-full p-1 mt-0.5 ${
                            tier.highlighted
                              ? "bg-purple-500/30 text-white"
                              : "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                          }`}
                        >
                          <Check className="h-4 w-4" />
                        </div>
                        <span
                          className={`${tier.highlighted ? "text-purple-100" : "text-gray-600 dark:text-gray-300"}`}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {tier.notIncluded.length > 0 && (
                    <>
                      <p
                        className={`font-medium mb-4 ${tier.highlighted ? "text-white/80" : "text-gray-500 dark:text-gray-400"}`}
                      >
                        Not included:
                      </p>
                      <ul className="space-y-3">
                        {tier.notIncluded.map((feature, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <div
                              className={`rounded-full p-1 mt-0.5 ${
                                tier.highlighted
                                  ? "bg-purple-500/20 text-white/70"
                                  : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                              }`}
                            >
                              <X className="h-4 w-4" />
                            </div>
                            <span
                              className={`${tier.highlighted ? "text-white/70" : "text-gray-500 dark:text-gray-400"}`}
                            >
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
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
          <p className="text-gray-600 dark:text-gray-300">
            Need a custom solution?{" "}
            <a href="#contact" className="text-purple-600 dark:text-purple-400 font-medium hover:underline">
              Contact our sales team
            </a>{" "}
            for personalized pricing.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
