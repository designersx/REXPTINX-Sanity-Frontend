"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

export type Plan = {
  title: string;
  monthlyPrice: number | null;
  yearlyPrice: number | null;
  unitLabel: string;
  description: string;
  ctaLabel: string;
  ctaUrl: string | null;
  includedFeatures: string[];
  excludedFeatures: string[] | null;
  togglePurplePricing: boolean;
};
export type BottomCallout = {
  prefix: string;
  linkLabel: string;
  linkUrl: string;
  suffix: string;
};

export type PricingSectionData = {
  sectionTitle: string;
  sectionSubtitle: string;
  toggleLabels: { left: string; right: string };
  toggleSubtext: string;
  plans: Plan[];
  bottomCallout: BottomCallout;
};

export function PricingSection({
  sectionTitle,
  sectionSubtitle,
  toggleLabels,
  toggleSubtext,
  plans,
  bottomCallout,
}: PricingSectionData) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [isYearly, setIsYearly] = useState(false);

  function formatPrice(plan: Plan) {
    const raw = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
    if (!raw) return "Custom";
    return `$${raw}`;
  }

  function calcSavings(plan: Plan) {
    if (!plan.monthlyPrice || !plan.yearlyPrice) return 0;
    const annualFromMonthly = plan.monthlyPrice * 12;
    const annualDirect = plan.yearlyPrice * 12;
    return Math.round(
      ((annualFromMonthly - annualDirect) / annualFromMonthly) * 100
    );
  }

  return (
    <section id="pricing" className="py-20 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        {/* — Heading & Toggle — */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            {sectionTitle}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {sectionSubtitle}
          </p>

          <div className="inline-flex items-center gap-4">
            <span
              className={`font-medium ${
                !isYearly
                  ? "text-purple-600 dark:text-purple-400"
                  : "text-gray-600 dark:text-gray-400"
              }`}
            >
              {toggleLabels.left}
            </span>
            <button
              aria-label="Toggle billing"
              onClick={() => setIsYearly((y) => !y)}
              className="relative w-14 h-7"
            >
              <div
                className={`absolute inset-0 rounded-full transition-colors ${
                  isYearly
                    ? "bg-purple-600 dark:bg-purple-500"
                    : "bg-gray-300 dark:bg-gray-700"
                }`}
              />
              <motion.div
                className="absolute w-5 h-5 bg-white rounded-full top-1 left-1 shadow"
                animate={{ x: isYearly ? 28 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </button>
            <span
              className={`font-medium ${
                isYearly
                  ? "text-purple-600 dark:text-purple-400"
                  : "text-gray-600 dark:text-gray-400"
              }`}
            >
              {toggleLabels.right}
            </span>
            {toggleSubtext && (
              <span className="ml-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 text-xs font-medium px-2.5 py-0.5 rounded">
                {toggleSubtext}
              </span>
            )}

            <div className="ml-auto mt-1.5">
          <button className=" text-xl  font-bold block w-full text-center py-2 rounded transition-colors bg-purple-600 text-white hover:bg-purple-700 " > Sign Up For Free </button> 
 <p className="text-sm relative -bottom-2">10 min on us with all starter package features</p>
 </div>
          </div>
        </div>

        {/* — Plans Grid — */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {plans?.map((plan, idx) => {
            const priceLabel = formatPrice(plan);
            const savings = calcSavings(plan);

            const pricingStyle = plan.togglePurplePricing
              ? { backgroundColor: "" }
              : {};

            const featureStyle = plan.togglePurplePricing
              ? { backgroundColor: "#8028cd" }
              : {};

            return (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className={`flex flex-col h-full rounded-xl overflow-hidden shadow ${
                  plan.togglePurplePricing
                    ? "bg-purple-600 text-white"
                    : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100"
                }`}
                style={pricingStyle}
              >
                    <div className="ribbon ribbon-top-right"> <span>Popular</span></div>
                
                {/* — Card Header — */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-1">{plan.title}</h3>
                  <div className="flex items-baseline mb-1">
                    <span className="text-4xl font-bold">{priceLabel}</span>
                    <span className="ml-2 opacity-80">{plan.unitLabel}</span>
                  </div>
                  {isYearly && savings > 0 && (
                    <div className="text-sm font-medium mb-3 text-yellow-500">
                      Save {savings}% compared to monthly
                    </div>
                  )}
                  <p
                    className={`mb-6 ${
                      plan.togglePurplePricing
                        ? "opacity-80 text-purple-100"
                        : "text-gray-600 dark:text-gray-300"
                    }`}
                  >
                    {plan.description}
                  </p>

                  <a
                    href={plan.ctaUrl || "#"}
                    className={`block w-full text-center py-2 rounded transition-colors ${
                      plan.togglePurplePricing
                        ? "bg-white text-purple-600 hover:bg-gray-100"
                        : "bg-purple-600 text-white hover:bg-purple-700"
                    }`}
                  >
                    {plan.ctaLabel}
                  </a>
                </div>

                {/* — Feature Lists — */}
                <div
                  className={`p-6 flex-grow ${
                    plan.togglePurplePricing
                      ? "bg-purple-600 text-white"
                      : "bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-gray-100"
                  }`}
                  style={featureStyle}
                >
                  <p className="font-medium mb-2">What’s included:</p>
                  <ul className="space-y-2 mb-4">
                    {plan.includedFeatures?.map((feat, i) => (
                      <li
                        key={i}
                        className={`flex items-center gap-2 ${
                          plan.togglePurplePricing
                            ? "text-white"
                            : "text-gray-600 dark:text-gray-300"
                        }`}
                      >
                        <Check
                          className={`h-5 w-5 ${
                            plan.togglePurplePricing
                              ? "text-white"
                              : "text-purple-600 dark:text-purple-400"
                          }`}
                        />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  {!!plan.excludedFeatures?.length && (
                    <>
                      <p className="font-medium mb-2">Not included:</p>
                      <ul className="space-y-2">
                        {plan.excludedFeatures?.map((feat, i) => (
                          <li
                            key={i}
                            className={`flex items-center gap-2 opacity-60 ${
                              plan.togglePurplePricing
                                ? "text-white"
                                : "text-gray-600 dark:text-gray-300"
                            }`}
                          >
                            <X
                              className={`h-5 w-5 ${
                                plan.togglePurplePricing
                                  ? "text-white/80"
                                  : "text-gray-500 dark:text-gray-400"
                              }`}
                            />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* — Bottom Callout — */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600 dark:text-gray-300">
            {bottomCallout.prefix}{" "}
            <a
              href={bottomCallout.linkUrl}
              className="text-purple-600 dark:text-purple-400 font-medium hover:underline"
            >
              {bottomCallout.linkLabel}
            </a>{" "}
            {bottomCallout.suffix}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
