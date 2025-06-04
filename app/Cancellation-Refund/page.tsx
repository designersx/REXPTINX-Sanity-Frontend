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
type CancellationPolicyData = {
  title: any[]; // PortableText blocks
  lastUpdated: string;
  sections: {
    heading: string;
    content: any[]; // PortableText blocks
  }[];
  disclaimerTitle: string;
  disclaimer: {
    content: any[];
  };
};
export default function CancellationRefundPolicy() {
  const [pageData, setPageData] = useState<{
    title: string;
    header: HeaderData | null;
    footer: any;
  } | null>(null);
  const [policy, setPolicy] = useState<CancellationPolicyData | null>(null);


  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
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
    client
      .fetch(
        `*[_type == "cancellationRefundPolicy"][0]{
          title,
          lastUpdated,
          sections[]{
            heading,
            content
          },
          disclaimerTitle,
          disclaimer {
            content
          }
        }`
      )
      .then(setPolicy)
      .catch(console.error);
  }, []);

  if (!pageData || !policy) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading…
      </div>
    );
  }

  const serializers = {
    marks: {
      purple: ({ children }: any) => (
        <span className="text-[#6524EB]">{children}</span>
      ),
      strong: ({ children }: any) => <strong>{children}</strong>,
      break: () => <br />,
    },
    list: {
      bullet: ({ children }: any) => (
        <ul className="list-disc ml-6">{children}</ul>
      ),
      number: ({ children }: any) => (
        <ol className="list-decimal ml-6">{children}</ol>
      ),
    },
  };
  const { header, footer } = pageData;
  return (
    <div className={`min-h-screen mt-5 cancel-main  ${
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      }`}>
      {/* Simple Header */}
      {header?.enabled && <Header data={header} />}

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 md:py-16"
      
      >
        {/* Title */}
        <div className="text-center mb-12"
        
        >
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-4"
            style={isDarkMode ? { color: "white" } : {}}
          >
            <PortableText value={policy?.title} components={serializers} />
          </h1>
          <p className="text-gray-600 text-lg"
            style={isDarkMode ? { color: "white" } : {}}
          >
            Last updated:{" "}
            {new Date(policy?.lastUpdated).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-8 text-gray-700 leading-relaxed"
          style={isDarkMode ? { color: "white" } : {}}
        >
          {policy?.sections?.map((section, idx) => (
            <section key={idx} className="space-y-4">
              <h2 className="text-xl font-semibold text-black"
                style={isDarkMode ? { color: "white" } : {}}
              >
                {section?.heading}
              </h2>
              <PortableText value={section?.content} components={serializers} />
            </section>
          ))}

          {/* Disclaimer */}
          <section className="space-y-4"
            style={isDarkMode ? { color: "black" } : {}}>
            <h2 className="text-xl font-semibold text-black">
              {policy?.disclaimerTitle}
            </h2>
            <div
              className="bg-gray-50 p-4 rounded-lg BorderRadiousCustom"
              style={{ padding: "2rem" }}
            >
              <PortableText
                value={policy?.disclaimer?.content}
                components={serializers}
              />
            </div>
          </section>
        </div>
      </main>
      {footer?.enabled && <Footer footerData={footer} />}
    </div>
  );
}
