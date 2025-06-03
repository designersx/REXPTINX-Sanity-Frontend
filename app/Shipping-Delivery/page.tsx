"use client";
import { useEffect, useState } from "react";
import { client } from "@/lib/sanityClient";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
type HeaderData = {
  enabled: boolean;
  logoUrl: string;
  logoAlt: string;
  tagline: string;
  navLinks: { label: string; href: string }[];
  showThemeToggle: boolean;
  ctaLabel: string;
  ctaUrl: string;
  ctaOpenInNewTab?: boolean;
};
export default function ShippingDeliveryPolicy() {
  const [pageData, setPageData] = useState<{
    title: string;
    header: HeaderData | null;
    footer: any;
  } | null>(null);

  useEffect(() => {
    client
      .fetch(
        `*[_type=="page"][0]{
                  title,
                  "header": *[_type=="header"][0]{
                    "logoUrl": logo.asset->url,
                    enabled,
                    logoAlt,
                    tagline,
                    navLinks[]{label, href},
                    showThemeToggle,
                    ctaLabel,
                    ctaUrl,
                    ctaOpenInNewTab
                  },
                  "footer": *[_type=="footerSection"][0]{
                    enabled,
                    footerLogo { asset->{url} },
                    sectionTitle,
                    socialLinks[]{platform, url, icon},
                    quickLinks[]{label, url},
                    resourcesLinks[]{label, url},
                    contactInfo{ email, phone, emailSvgIcon,phoneSvgIcon,contactUs,contactUsSvgIcon },
                    copyright,
                   privacyPolicy { label },
  termsOfService { label },
  cancellationRefundPolicy { label },
  shippingDeliveryPolicy { label }
                  },
                  sections[]->{
                    _type,
                    ...,
                      testimonials[] {
                     rating,
                    "content": quote,
                    "name": authorName,
                    "position": authorRole,
                   "authorImageUrl": authorImage.asset->url
                  },
                    video{asset->{url}},
                    videoThumbnail{asset->{url}},
                    rexAgentImage{asset->{url}},
                    authorImage{asset->{url}}
                  }
                }`
      )
      .then(setPageData)
      .catch(console.error);
  }, []);

  if (!pageData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading…
      </div>
    );
  }

  const { header, footer } = pageData;
  return (
    <div className="min-h-screen bg-white mt-5">
      {/* Simple Header */}
      {header?.enabled && <Header data={header} />}

      <main className="max-w-4xl mx-auto px-6 py-8 md:py-16">
        {/* Title */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-4">
            Shipping & <span className="text-purple-600">Delivery Policy</span>
          </h1>
          <p className="text-gray-600 text-lg">Last updated: Jun 2nd 2025</p>
        </div>

        {/* Content */}
        <div className="space-y-10 text-gray-700 leading-relaxed">
          {/* Introduction */}
          <section className="space-y-6">
            {/* Removed empty <h2> to clean markup */}
            <p className="text-center text-base md:text-lg font-medium">
              Shipping is not applicable for business.
            </p>
          </section>

          {/* Disclaimer */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-black">Disclaimer</h2>
            <div className="bg-gray-100 p-6 rounded-lg max-w-3xl mx-auto shadow-sm border border-gray-200">
              Disclaimer: The above content is created at DESIGNERS X's sole
              discretion. Razorpay shall not be liable for any content provided
              here and shall not be responsible for any claims and liability
              that may arise due to merchant’s non-adherence to it.
            </div>
          </section>
        </div>
      </main>

      {footer?.enabled && <Footer footerData={footer} />}
    </div>
  );
}
