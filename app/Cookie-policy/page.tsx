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

export default function CookiePolicy() {
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

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 md:py-16">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-4">
            Cookie Policy
          </h1>
          <p className="text-gray-600 text-lg">Last updated: Jun 2nd 2025</p>
        </div>

        {/* Content */}
        <div className="space-y-8 text-gray-700 leading-relaxed">
          {/* Introduction */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-black">
              1. What Are Cookies
            </h2>
            <p>
              Cookies are small text files that are placed on your computer or
              mobile device when you visit our website. They are widely used to
              make websites work more efficiently and provide information to
              website owners.
            </p>
            <p>
              <strong>DESIGNERS X</strong> uses cookies to enhance your browsing
              experience, analyze website traffic, and provide personalized
              content and advertisements.
            </p>
          </section>

          {/* Types of Cookies */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-black">
              2. Types of Cookies We Use
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-purple-600 mb-2">
                  Essential Cookies
                </h3>
                <p>
                  These cookies are necessary for the website to function
                  properly. They enable basic functions like page navigation,
                  access to secure areas, and form submissions. The website
                  cannot function properly without these cookies.
                </p>
                <div className="bg-gray-50 p-3 rounded mt-2">
                  <p className="text-sm">
                    <strong>Examples:</strong> Session cookies, authentication
                    cookies, security cookies
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-purple-600 mb-2">
                  Performance Cookies
                </h3>
                <p>
                  These cookies collect information about how visitors use our
                  website, such as which pages are visited most often and if
                  users get error messages. This helps us improve website
                  performance and user experience.
                </p>
                <div className="bg-gray-50 p-3 rounded mt-2">
                  <p className="text-sm">
                    <strong>Examples:</strong> Google Analytics, page load time
                    tracking, error reporting
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-purple-600 mb-2">
                  Functional Cookies
                </h3>
                <p>
                  These cookies allow the website to remember choices you make
                  and provide enhanced, personalized features. They may be set
                  by us or by third-party providers whose services we use.
                </p>
                <div className="bg-gray-50 p-3 rounded mt-2">
                  <p className="text-sm">
                    <strong>Examples:</strong> Language preferences, region
                    settings, user interface customization
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-purple-600 mb-2">
                  Targeting/Advertising Cookies
                </h3>
                <p>
                  These cookies are used to deliver advertisements that are
                  relevant to you and your interests. They also limit the number
                  of times you see an advertisement and help measure advertising
                  campaign effectiveness.
                </p>
                <div className="bg-gray-50 p-3 rounded mt-2">
                  <p className="text-sm">
                    <strong>Examples:</strong> Social media cookies, remarketing
                    pixels, ad network cookies
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* How We Use Cookies */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-black">
              3. How We Use Cookies
            </h2>
            <p>We use cookies for the following purposes:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li>To ensure our website functions properly and securely</li>
              <li>To remember your preferences and settings</li>
              <li>To analyze website traffic and user behavior</li>
              <li>To improve our services and user experience</li>
              <li>To provide personalized content and recommendations</li>
              <li>To deliver relevant advertisements</li>
              <li>To measure the effectiveness of our marketing campaigns</li>
              <li>To prevent fraud and enhance security</li>
            </ul>
          </section>

          {/* Third-Party Cookies */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-black">
              4. Third-Party Cookies
            </h2>
            <p>
              We may allow third-party companies to place cookies on our website
              to provide services such as analytics, advertising, and social
              media integration.
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-purple-600 mb-2">
                  Common Third-Party Services
                </h3>
                <ul className="list-disc ml-6 space-y-1">
                  <li>
                    <strong>Google Analytics:</strong> Website traffic analysis
                    and user behavior tracking
                  </li>
                  <li>
                    <strong>Google Ads:</strong> Advertising and remarketing
                    campaigns
                  </li>
                  <li>
                    <strong>Facebook Pixel:</strong> Social media advertising
                    and conversion tracking
                  </li>
                  <li>
                    <strong>YouTube:</strong> Video content embedding and
                    analytics
                  </li>
                  <li>
                    <strong>Payment Processors:</strong> Secure payment
                    processing (Razorpay, Stripe, etc.)
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Cookie Duration */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-black">
              5. Cookie Duration
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-purple-600 mb-2">
                  Session Cookies
                </h3>
                <p>
                  These are temporary cookies that are deleted when you close
                  your browser. They are used to maintain your session while
                  browsing our website.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-purple-600 mb-2">
                  Persistent Cookies
                </h3>
                <p>
                  These cookies remain on your device for a specified period or
                  until you delete them. They remember your preferences and
                  settings for future visits.
                </p>
              </div>
            </div>
          </section>

          {/* Managing Cookies */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-black">
              6. How to Manage Cookies
            </h2>
            <p>
              You have the right to control how cookies are used on your device.
              You can manage your cookie preferences through your browser
              settings or our cookie consent banner.
            </p>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-purple-600 mb-2">
                  Browser Settings
                </h3>
                <p>Most web browsers allow you to:</p>
                <ul className="list-disc ml-6 space-y-1">
                  <li>View and delete cookies</li>
                  <li>Block cookies from specific websites</li>
                  <li>Block third-party cookies</li>
                  <li>Clear all cookies when you close the browser</li>
                  <li>Set up warnings when cookies are being sent</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-purple-600 mb-2">
                  Browser-Specific Instructions
                </h3>
                <ul className="list-disc ml-6 space-y-1">
                  <li>
                    <strong>Chrome:</strong> Settings → Privacy and Security →
                    Cookies and other site data
                  </li>
                  <li>
                    <strong>Firefox:</strong> Settings → Privacy & Security →
                    Cookies and Site Data
                  </li>
                  <li>
                    <strong>Safari:</strong> Preferences → Privacy → Manage
                    Website Data
                  </li>
                  <li>
                    <strong>Edge:</strong> Settings → Cookies and site
                    permissions → Cookies and site data
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4">
              <p className="text-sm">
                <strong>Note:</strong> Disabling certain cookies may affect the
                functionality of our website and limit your access to some
                features and services.
              </p>
            </div>
          </section>

          {/* Updates to Cookie Policy */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-black">
              7. Updates to This Cookie Policy
            </h2>
            <p>
              We may update this Cookie Policy from time to time to reflect
              changes in our practices, technology, or legal requirements. We
              will notify you of any significant changes by posting the updated
              policy on our website.
            </p>
            <p>
              We encourage you to review this Cookie Policy periodically to stay
              informed about how we use cookies.
            </p>
          </section>

          {/* Disclaimer */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-black">9. Disclaimer</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm">
                <strong>Disclaimer:</strong> The above content is created at
                DESIGNERS X's sole discretion. Razorpay shall not be liable for
                any content provided here and shall not be responsible for any
                claims and liability that may arise due to merchant's
                non-adherence to it.
              </p>
            </div>
          </section>
        </div>
      </main>
      {footer?.enabled && <Footer footerData={footer} />}
    </div>
  );
}
