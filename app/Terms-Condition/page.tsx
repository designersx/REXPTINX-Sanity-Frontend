"use client";
import { useEffect, useState } from "react";
import { client } from "@/lib/sanityClient";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PortableText } from "@portabletext/react";
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
type TermsData = {
  title: any[];
  lastUpdated: string;
  sections: { heading: string; content: any[] }[];
  disclaimerTitle: string;
  disclaimer: any[];
};

export default function Privacy() {
  const [pageData, setPageData] = useState<{
    title: string;
    header: HeaderData | null;
    footer: any;
  } | null>(null);
  const [termsData, setTermsData] = useState<TermsData | null>(null);

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
        `*[_type=="termsAndConditions"][0]{
          title,
          lastUpdated,
          sections[]{
            heading,
            content
          },
          disclaimerTitle,
          disclaimer
        }`
      )
      .then(setTermsData)
      .catch(console.error);
  }, []);

  if (!pageData || !termsData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading…
      </div>
    );
  }

  const { header, footer } = pageData;

  const serializers = {
    marks: {
      purple: ({ children }: any) => (
        <span style={{ color: "#6524EB" }}>{children}</span>
      ),
      strong: ({ children }: any) => <strong>{children}</strong>,
      break: ({ children }: any) => (
        <>
          {children}
          <br />
        </>
      ),
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

  return (
    <div className="min-h-screen bg-white mt-5">
      {/* Simple Header */}
      {header?.enabled && <Header data={header} />}

      {/* Main Content */}

      <main className="max-w-4xl mx-auto px-4 py-8 md:py-16">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-4">
            <PortableText value={termsData.title} components={serializers} />
          </h1>
          <p className="text-gray-600 text-lg">
            Last updated:{" "}
            {new Date(termsData.lastUpdated).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-8 text-gray-700 leading-relaxed">
          {termsData.sections.map((section, idx) => (
            <section key={idx} className="space-y-4">
              <h2 className="text-xl font-semibold text-black">
                {section.heading}
              </h2>
              <PortableText value={section.content} components={serializers} />
            </section>
          ))}

          {/* Disclaimer */}
          <section className="space-y-4" style={{ padding: "1rem" }}>
            <h2 className="text-xl font-semibold text-black">
              {termsData.disclaimerTitle}
            </h2>
            <div
              className="bg-gray-50 p-4 rounded-lg"
              style={{ padding: "2rem" }}
            >
              <PortableText
                value={termsData.disclaimer}
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
