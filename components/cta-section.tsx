// "use client"

// import { motion } from "framer-motion"
// import { Button } from "@/components/ui/button"
// import { PhoneCall, MessageSquare, Calendar } from "lucide-react"

// export function CtaSection() {
//   return (
//     <section className="py-20 bg-gradient-to-br from-purple-600 to-purple-800 text-white">
//       <div className="container mx-auto px-4">
//         <div className="max-w-4xl mx-auto text-center">
//           <motion.h2
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             viewport={{ once: true }}
//             className="text-3xl md:text-4xl font-bold mb-6 leading-tight"
//           >
//             Ready to Transform Your Business Communications?
//           </motion.h2>
//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//             viewport={{ once: true }}
//             className="text-xl text-purple-100 mb-8 leading-relaxed"
//           >
//             Join thousands of businesses that have upgraded to AI-powered reception. Start your 14-day free trial today.
//           </motion.p>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.3 }}
//             viewport={{ once: true }}
//             className="flex flex-col sm:flex-row gap-4 justify-center"
//           >
//             <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//               <Button className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-6 w-full">
//                 Start Free Trial
//               </Button>
//             </motion.div>
//             <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//               <Button
//                 variant="outline"
//                 className="border-amber-100 bg-amber-100 text-black font-bold hover:bg-amber-200 hover:border-amber-200 text-lg px-8 py-6 w-full flex items-center justify-center gap-2"
//               >
//                 <Calendar className="h-5 w-5" />
//                 Schedule Demo
//               </Button>
//             </motion.div>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             transition={{ duration: 0.8, delay: 0.5 }}
//             viewport={{ once: true }}
//             className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8"
//           >
//             <div className="flex flex-col items-center">
//               <div className="bg-purple-500/30 rounded-full p-4 mb-4">
//                 <PhoneCall className="h-8 w-8" />
//               </div>
//               <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
//               <p className="text-purple-100 text-center">Our team is always available to help you get started.</p>
//             </div>
//             <div className="flex flex-col items-center">
//               <div className="bg-purple-500/30 rounded-full p-4 mb-4">
//                 <Calendar className="h-8 w-8" />
//               </div>
//               <h3 className="text-xl font-semibold mb-2">Easy Setup</h3>
//               <p className="text-purple-100 text-center">Be up and running with your AI receptionist in minutes.</p>
//             </div>
//             <div className="flex flex-col items-center">
//               <div className="bg-purple-500/30 rounded-full p-4 mb-4">
//                 <MessageSquare className="h-8 w-8" />
//               </div>
//               <h3 className="text-xl font-semibold mb-2">No Risk</h3>
//               <p className="text-purple-100 text-center">Try it free for 14 days with no commitment required.</p>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   )
// }

"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PhoneCall, MessageSquare, Calendar } from "lucide-react";
import Link from "next/link";
type CtaFeature = {
  icon: React.ElementType; // Use React component type for icons
  title: string;
  description: string;
};

type CtaProps = {
  title: string;
  subtitle: string;
  primaryCta: { label: string; url: string };
  secondaryCta: { label: string; url: string };
  features: CtaFeature[];
};

export function CtaSection({
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  features,
}: CtaProps) {
  console.log(features, "ffgvnedfj");
  return (
    <section className="py-20 bg-gradient-to-br from-purple-600 to-purple-800 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-6 leading-tight"
          >
            {title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-purple-100 mb-8 leading-relaxed"
          >
            {subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href={primaryCta.url || "#"}
                target={primaryCta.url ? "_blank" : "_self"}
                scroll={false}
              >
                <Button className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-6 w-full">
                  {primaryCta.label}
                </Button>
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href={secondaryCta.url || "#"}
                target={secondaryCta.url ? "_blank" : "_self"}
                scroll={false}
              >
                <Button
                  variant="outline"
                  className="border-amber-100 bg-amber-100 text-black font-bold hover:bg-amber-200 hover:border-amber-200 text-lg px-8 py-6 w-full flex items-center justify-center gap-2"
                >
                  <Calendar className="h-5 w-5" />
                  {secondaryCta.label}
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {features?.map((feature, index) => (
              <div key={feature.title} className="flex flex-col items-center">
                {" "}
                <div
                  className="bg-purple-500/30 rounded-full p-4 mb-4"
                  dangerouslySetInnerHTML={{ __html: feature.icon }}
                />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-purple-100 text-center">
                  {feature.description}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
