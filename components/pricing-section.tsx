"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Check, X } from "lucide-react";
import { PortableText } from "@portabletext/react";
import "../app/globals.css";
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
  const isInView = useInView(ref, { once: true, amount: 0 });
  const [isYearly, setIsYearly] = useState(false);
  const [expandedTier, setExpandedTier] = useState(null);

  const toggleTier = (index) => {
    if (expandedTier === index) {
      setExpandedTier(null);
    } else {
      setExpandedTier(index);
    }
  };

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

  return (
    <section id="pricing" className="py-20 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="flex">
          <div className="text-center mb-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight"
            >
              <PortableText value={sectionTitle} components={serializers} />
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8"
            >
              {sectionSubtitle}
            </motion.p>

            {/* Billing Toggle */}
            <div className="flex flex-wrap justify-center items-center gap-4">
              <span
                className={`font-medium ${
                  !isYearly
                    ? "text-[#6524EB] dark:text-[#6524EB]"
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
                      ? "bg-[#6524EB] dark:bg-[#6524EB]"
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
                    ? "text-[#6524EB] dark:text-[#6524EB]"
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
            </div>
          </div>
          <div className="text-center mb-8">
            <div className="flex flex-wrap justify-center items-center gap-4">
              <div className="inline-flex items-center bg-[#792ef0] text-white rounded-[16px] px-6 py-4 border border-dashed border-white">
                <div className="flex flex-col text-left">
                  <span className="text-xl font-bold">Sign up for FREE</span>
                  <span className="text-sm mt-1">
                    Includes FREE 10 min + AGENT
                    <br />+ Starter Package features
                  </span>
                </div>
                <div className="ml-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-12 h-12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="white"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 16.2a6 6 0 1112 0c0 1.13-.31 2.18-.84 3.08a1.5 1.5 0 01-2.32.4L16.5 18h-3.5l-1.36 1.68a1.5 1.5 0 01-2.32-.4A5.978 5.978 0 019 16.2z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 7h.01M15 7h.01M12 7h.01"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {plans?.map((plan, index) => {
            const priceLabel = formatPrice(plan);
            const savings = calcSavings(plan);

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className={`rounded-xl overflow-hidden h-full flex flex-col ${
                  plan.togglePurplePricing
                    ? "bg-[#6524EB] text-white shadow-xl transform md:-translate-y-4"
                    : "bg-white dark:bg-white-800 border border-white-200 dark:border-white-700 text-white-900 dark:text-white-100"
                }`}
              >
                {/* Mobile view */}
                <div
                  className="md:hidden p-6 cursor-pointer"
                  onClick={() => toggleTier(index)}
                >
                  {plan.togglePurplePricing && (
                    <div className="ribbon ribbon-top-right">
                      <span>Most Popular</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-2xl font-bold mb-1">{plan.title}</h3>
                      <div className="flex items-baseline">
                        <span className="text-3xl font-bold">{priceLabel}</span>
                        <span className="ml-2 opacity-80">
                          {plan.unitLabel}
                        </span>
                      </div>
                      {isYearly && savings > 0 && (
                        <div className="mt-1 text-sm text-green-600 dark:text-green-400">
                          Save {savings}%
                        </div>
                      )}
                    </div>
                    <div
                      className={
                        plan.togglePurplePricing
                          ? "text-white"
                          : "text-[#6524EB] dark:text-[#6524EB]"
                      }
                    >
                      {expandedTier === index ? (
                        <ChevronUp size={24} />
                      ) : (
                        <ChevronDown size={24} />
                      )}
                    </div>
                  </div>

                  {expandedTier !== index && (
                    <p
                      className={`mt-3 ${
                        plan.togglePurplePricing
                          ? "text-[#6524EB] opacity-80"
                          : "text-gray-600 dark:text-gray-300"
                      }`}
                    >
                      {plan.description}
                    </p>
                  )}

                  {expandedTier === index && (
                    <div className="mt-4">
                      <p
                        className={`mb-4 ${
                          plan.togglePurplePricing
                            ? "text-[#6524EB] opacity-80"
                            : "text-gray-600 dark:text-gray-300"
                        }`}
                      >
                        {plan.description}
                      </p>

                      <div
                        className={`mt-6 ${
                          plan.togglePurplePricing
                            ? "text-white"
                            : "text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        <p className="font-medium mb-3">What's included:</p>
                        <ul className="space-y-2 mb-6">
                          {plan.includedFeatures?.map((feature, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <div
                                className={`rounded-full p-1 mt-0.5 flex-shrink-0 ${
                                  plan.togglePurplePricing
                                    ? "bg-[#6524EB] text-white"
                                    : "bg-[#6524EB] dark:bg-[#6524EB] text-white dark:text-purple-400"
                                }`}
                              >
                                <Check className="h-3 w-3" />
                              </div>
                              <span
                                className={`text-sm ${
                                  plan.togglePurplePricing
                                    ? "text-purple-100"
                                    : "text-gray-600 dark:text-gray-300"
                                }`}
                              >
                                {feature}
                              </span>
                            </li>
                          ))}
                        </ul>

                        {!!plan.excludedFeatures?.length && (
                          <>
                            <p
                              className={`font-medium mb-3 ${
                                plan.togglePurplePricing
                                  ? "text-white/80"
                                  : "text-gray-500 dark:text-gray-400"
                              }`}
                            >
                              Not included:
                            </p>
                            <ul className="space-y-2">
                              {plan.excludedFeatures.map((feature, i) => (
                                <li key={i} className="flex items-start gap-3">
                                  <div
                                    className={`rounded-full p-1 mt-0.5 flex-shrink-0 ${
                                      plan.togglePurplePricing
                                        ? "bg-[#6524EB] text-white/70"
                                        : "bg-[#6524EB] dark:bg-gray-700 text-white dark:text-white"
                                    }`}
                                  >
                                    <X className="h-3 w-3" />
                                  </div>
                                  <span
                                    className={`text-sm ${
                                      plan.togglePurplePricing
                                        ? "text-white/70"
                                        : "text-gray-500 dark:text-gray-400"
                                    }`}
                                  >
                                    {feature}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </>
                        )}
                      </div>

                      <button
                        className={`w-full mt-6 py-3 rounded ${
                          plan.togglePurplePricing
                            ? "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 px-4 w-full py-6 bg-white dark:bg-gray-900 text-[#6524EB] dark:text-[#6524EB] hover:bg-gray-100 dark:hover:bg-gray-800"
                            : "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 px-4 w-full py-6 bg-[#6524EB] dark:bg-[#6524EB] text-white hover:bg-[#6524EB] dark:hover:bg-[#6524EB]"
                        }`}
                      >
                        {plan.ctaLabel}
                      </button>
                    </div>
                  )}
                </div>

                {/* Desktop view */}
                <div className="hidden md:flex md:flex-col">
                  {plan.togglePurplePricing && (
                    <div className="ribbon ribbon-top-right">
                      <span>Most Popular</span>
                    </div>
                  )}
                  <div className="p-6 flex-grow">
                    <h3 className="text-2xl font-bold mb-2">{plan.title}</h3>
                    <div className="flex items-baseline mb-2">
                      <span className="text-4xl font-bold">{priceLabel}</span>
                      <span className="ml-2 opacity-80">{plan.unitLabel}</span>
                    </div>
                    {isYearly && savings > 0 && (
                      <div className="mb-4 text-sm text-amber-500 dark:text-amber-300 font-medium">
                        Save {savings}% compared to monthly
                      </div>
                    )}
                    <p
                      className={`mb-6 ${
                        plan.togglePurplePricing
                          ? "text-[#6524EB]-100 opacity-80"
                          : "text-gray-600 dark:text-gray-300"
                      }`}
                    >
                      {plan.description}
                    </p>
                    <button
                      className={`w-full py-6 rounded ${
                        plan.togglePurplePricing
                          ? "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 px-4 w-full py-6 bg-white dark:bg-gray-900 text-[#6524EB] dark:text-[#6524EB] hover:bg-gray-100 dark:hover:bg-gray-800"
                          : "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 px-4 w-full py-6 bg-[#6524EB] dark:bg-[#6524EB] text-white hover:bg-[#6524EB] dark:hover:bg-[#6524EB]"
                      }`}
                    >
                      {plan.ctaLabel}
                    </button>
                  </div>
                  <div
                    className={`p-6 flex-grow ${
                      plan.togglePurplePricing
                        ? "bg-[#5a1fc0] text-white"
                        : "bg-white dark:bg-gray-900/50 text-gray-900 dark:text-gray-100"
                    }`}
                  >
                    <p
                      className={`font-medium mb-4 ${
                        plan.togglePurplePricing
                          ? "text-white"
                          : "text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      What's included:
                    </p>
                    <ul className="space-y-3 mb-6">
                      {plan.includedFeatures?.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div
                            className={`rounded-full p-1 mt-0.5 ${
                              plan.togglePurplePricing
                                ? "bg-[#6524EB] text-white"
                                : "bg-[#6524EB] dark:bg-purple-900/30 text-white dark:text-white"
                            }`}
                          >
                            <Check className="h-4 w-4" />
                          </div>
                          <span
                            className={
                              plan.togglePurplePricing
                                ? "text-white"
                                : "text-gray-600 dark:text-gray-300"
                            }
                          >
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {!!plan.excludedFeatures?.length && (
                      <>
                        <p
                          className={`font-medium mb-4 ${
                            plan.togglePurplePricing
                              ? "text-white/80"
                              : "text-gray-500 dark:text-gray-400"
                          }`}
                        >
                          Not included:
                        </p>
                        <ul className="space-y-3">
                          {plan.excludedFeatures.map((feature, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <div
                                className={`rounded-full p-1 mt-0.5 ${
                                  plan.togglePurplePricing
                                    ? "bg-[#6524EB] text-white/70"
                                    : "bg-[#6524EB] dark:bg-gray-700 text-white dark:text-white"
                                }`}
                              >
                                <X className="h-4 w-4" />
                              </div>
                              <span
                                className={
                                  plan.togglePurplePricing
                                    ? "text-white/70"
                                    : "text-gray-500 dark:text-gray-400"
                                }
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
            );
          })}
        </motion.div>

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
              className="text-[#6524EB] dark:text-purple-400 font-medium hover:underline"
            >
              {bottomCallout.linkLabel}
            </a>{" "}
            {bottomCallout.suffix}
          </p>
        </motion.div>
      </div>
    </section>

    // <section id="pricing" className="py-20 bg-white dark:bg-gray-950">
    //   <div className="container mx-auto px-4">
    //     {/* — Heading & Toggle — */}
    //     <div className="text-center mb-12">
    //       <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
    //         {sectionTitle}
    //       </h2>
    //       <p className="text-gray-600 dark:text-gray-300 mb-6">
    //         {sectionSubtitle}
    //       </p>

    //       <div className="inline-flex items-center gap-4">
    //         <span
    //           className={`font-medium ${
    //             !isYearly
    //               ? "text-purple-600 dark:text-purple-400"
    //               : "text-gray-600 dark:text-gray-400"
    //           }`}
    //         >
    //           {toggleLabels.left}
    //         </span>
    //         <button
    //           aria-label="Toggle billing"
    //           onClick={() => setIsYearly((y) => !y)}
    //           className="relative w-14 h-7"
    //         >
    //           <div
    //             className={`absolute inset-0 rounded-full transition-colors ${
    //               isYearly
    //                 ? "bg-purple-600 dark:bg-purple-500"
    //                 : "bg-gray-300 dark:bg-gray-700"
    //             }`}
    //           />
    //           <motion.div
    //             className="absolute w-5 h-5 bg-white rounded-full top-1 left-1 shadow"
    //             animate={{ x: isYearly ? 28 : 0 }}
    //             transition={{ type: "spring", stiffness: 500, damping: 30 }}
    //           />
    //         </button>
    //         <span
    //           className={`font-medium ${
    //             isYearly
    //               ? "text-purple-600 dark:text-purple-400"
    //               : "text-gray-600 dark:text-gray-400"
    //           }`}
    //         >
    //           {toggleLabels.right}
    //         </span>
    //         {toggleSubtext && (
    //           <span className="ml-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 text-xs font-medium px-2.5 py-0.5 rounded">
    //             {toggleSubtext}
    //           </span>
    //         )}
    //       </div>
    //     </div>

    //     {/* — Plans Grid — */}
    //     <motion.div
    //       ref={ref}
    //       initial={{ opacity: 0, y: 30 }}
    //       animate={isInView ? { opacity: 1, y: 0 } : {}}
    //       transition={{ duration: 0.6 }}
    //       className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
    //     >
    //       {plans?.map((plan, idx) => {
    //         const priceLabel = formatPrice(plan);
    //         const savings = calcSavings(plan);

    //         const pricingStyle = plan.togglePurplePricing
    //           ? { backgroundColor: "" }
    //           : {};

    //         const featureStyle = plan.togglePurplePricing
    //           ? { backgroundColor: "#8028cd" }
    //           : {};

    //         return (
    //           <motion.div
    //             key={idx}
    //             whileHover={{ y: -5 }}
    //             className={`flex flex-col h-full rounded-xl overflow-hidden shadow ${
    //               plan.togglePurplePricing
    //                 ? "bg-purple-600 text-white"
    //                 : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100"
    //             }`}
    //             style={pricingStyle}
    //           >
    //             {/* — Card Header — */}
    //             <div className="p-6">
    //               <h3 className="text-2xl font-bold mb-1">{plan.title}</h3>
    //               <div className="flex items-baseline mb-1">
    //                 <span className="text-4xl font-bold">{priceLabel}</span>
    //                 <span className="ml-2 opacity-80">{plan.unitLabel}</span>
    //               </div>
    //               {isYearly && savings > 0 && (
    //                 <div className="text-sm font-medium mb-3 text-yellow-500">
    //                   Save {savings}% compared to monthly
    //                 </div>
    //               )}
    //               <p
    //                 className={`mb-6 ${
    //                   plan.togglePurplePricing
    //                     ? "opacity-80 text-purple-100"
    //                     : "text-gray-600 dark:text-gray-300"
    //                 }`}
    //               >
    //                 {plan.description}
    //               </p>

    //               <a
    //                 href={plan.ctaUrl || "#"}
    //                 className={`block w-full text-center py-2 rounded transition-colors ${
    //                   plan.togglePurplePricing
    //                     ? "bg-white text-purple-600 hover:bg-gray-100"
    //                     : "bg-purple-600 text-white hover:bg-purple-700"
    //                 }`}
    //               >
    //                 {plan.ctaLabel}
    //               </a>
    //             </div>

    //             {/* — Feature Lists — */}
    //             <div
    //               className={`p-6 flex-grow ${
    //                 plan.togglePurplePricing
    //                   ? "bg-purple-600 text-white"
    //                   : "bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-gray-100"
    //               }`}
    //               style={featureStyle}
    //             >
    //               <p className="font-medium mb-2">What’s included:</p>
    //               <ul className="space-y-2 mb-4">
    //                 {plan.includedFeatures?.map((feat, i) => (
    //                   <li
    //                     key={i}
    //                     className={`flex items-center gap-2 ${
    //                       plan.togglePurplePricing
    //                         ? "text-white"
    //                         : "text-gray-600 dark:text-gray-300"
    //                     }`}
    //                   >
    //                     <Check
    //                       className={`h-5 w-5 ${
    //                         plan.togglePurplePricing
    //                           ? "text-white"
    //                           : "text-purple-600 dark:text-purple-400"
    //                       }`}
    //                     />
    //                     <span>{feat}</span>
    //                   </li>
    //                 ))}
    //               </ul>

    //               {!!plan.excludedFeatures?.length && (
    //                 <>
    //                   <p className="font-medium mb-2">Not included:</p>
    //                   <ul className="space-y-2">
    //                     {plan.excludedFeatures?.map((feat, i) => (
    //                       <li
    //                         key={i}
    //                         className={`flex items-center gap-2 opacity-60 ${
    //                           plan.togglePurplePricing
    //                             ? "text-white"
    //                             : "text-gray-600 dark:text-gray-300"
    //                         }`}
    //                       >
    //                         <X
    //                           className={`h-5 w-5 ${
    //                             plan.togglePurplePricing
    //                               ? "text-white/80"
    //                               : "text-gray-500 dark:text-gray-400"
    //                           }`}
    //                         />
    //                         <span>{feat}</span>
    //                       </li>
    //                     ))}
    //                   </ul>
    //                 </>
    //               )}
    //             </div>
    //           </motion.div>
    //         );
    //       })}
    //     </motion.div>

    //     {/* — Bottom Callout — */}
    //     <motion.div
    //       initial={{ opacity: 0, y: 20 }}
    //       animate={isInView ? { opacity: 1, y: 0 } : {}}
    //       transition={{ duration: 0.5, delay: 0.6 }}
    //       className="mt-12 text-center"
    //     >
    //       <p className="text-gray-600 dark:text-gray-300">
    //         {bottomCallout.prefix}{" "}
    //         <a
    //           href={bottomCallout.linkUrl}
    //           className="text-purple-600 dark:text-purple-400 font-medium hover:underline"
    //         >
    //           {bottomCallout.linkLabel}
    //         </a>{" "}
    //         {bottomCallout.suffix}
    //       </p>
    //     </motion.div>
    //   </div>
    // </section>
  );
}
