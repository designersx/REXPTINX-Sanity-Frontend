"use client";
import { useEffect, useState } from "react";
import { client } from "@/lib/sanityClient";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PortableText } from "@portabletext/react";
import { useTheme } from "next-themes";
import ".././globals.css"
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

type ShippingPolicy = {
  title: string[];
  lastUpdated: string;
  shippingDetails: string;
  disclaimer: string;
};

export default function ShippingDeliveryPolicy() {
  const [pageData, setPageData] = useState<{
    title: string;
    header: HeaderData | null;
    footer: any;
  } | null>(null);

  const [shippingPolicy, setShippingPolicy] = useState<ShippingPolicy | null>(
    null
  );

  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  useEffect(() => {
    // Fetch general page data (header and footer)
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

    // Fetch the shipping delivery policy
    client
      .fetch(
        `*[_type=="shippingPolicy"][0]{
          title,
          lastUpdated,
          shippingDetails,
          disclaimer
        }`
      )
      .then((data) => setShippingPolicy(data))
      .catch(console.error);
  }, []);

  if (!pageData || !shippingPolicy) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading…
      </div>
    );
  }

  const { header, footer } = pageData;
  const { title, lastUpdated, shippingDetails, disclaimer } = shippingPolicy;

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
    <div
      className={`min-h-screen mt-5 shipping-main ${
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      {/* Simple Header */}
      {header?.enabled && <Header data={header} />}

      <main className="max-w-4xl mx-auto px-6 py-8 md:py-16">
        {/* Title */}
        <div className="text-center mb-16">
          <h1
            className="text-3xl md:text-4xl font-bold text-black mb-4"
            style={isDarkMode ? { color: "white" } : {}}
          >
            <PortableText value={title} components={serializers} />
          </h1>
          <p
            className="text-gray-600 text-lg"
            style={isDarkMode ? { color: "white" } : {}}
          >
            Last updated: {new Date(lastUpdated).toLocaleDateString()}
          </p>
        </div>

        {/* Content */}
        <div className="space-y-10 text-gray-700 leading-relaxed">
          {/* Introduction */}
          <section className="space-y-6">
            <p
              className="text-center text-base md:text-lg font-medium"
              style={isDarkMode ? { color: "white" } : {}}
            >
              {shippingDetails}
            </p>
          </section>

          {/* Disclaimer */}
          <section
            className="space-y-4"
            style={isDarkMode ? { color: "black" } : {}}
          >
            <h2 className="text-xl font-semibold text-black">Disclaimer</h2>
            <div className="bg-gray-100 p-6 rounded-lg max-w-3xl mx-auto shadow-sm border border-gray-200 BorderRadiousCustom">
              {disclaimer}
            </div>
          </section>
        </div>
      </main>

      {footer?.enabled && <Footer footerData={footer} />}
    </div>
  );
}
