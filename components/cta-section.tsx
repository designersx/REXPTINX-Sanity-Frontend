"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import Link from "next/link";
type CtaFeature = {
  icon: React.ElementType;
  title: string;
  description: string;
};

type CtaProps = {
  title: string;
  subtitle: string;
  primaryCta: { label: string; url: string; openInNewTab?: boolean };
  secondaryCta: { label: string; url: string; openInNewTab?: boolean };
  features: CtaFeature[];
};

export function CtaSection({
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  features,
}: CtaProps) {
  return (
    <section className="py-20 bg-gradient-to-br from-[#6524EB] to-[#6524EB] text-white">
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
                target={primaryCta.openInNewTab ? "_blank" : "_self"}
                scroll={false}
              >
                <Button className="bg-white text-[#6524EB] hover:bg-gray-100 text-lg px-8 py-6 w-full">
                  {primaryCta.label}
                </Button>
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href={secondaryCta.url || "#"}
                target={secondaryCta.openInNewTab ? "_blank" : "_self"}
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
                  className="bg-[#5a1fc0] rounded-full p-4 mb-4"
                  dangerouslySetInnerHTML={{ __html: feature.icon }}
                />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-white text-center">{feature.description}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
