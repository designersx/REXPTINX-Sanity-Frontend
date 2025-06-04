import Link from "next/link";
import Image from "next/image";
import { Mail, PhoneCall } from "lucide-react";
type FooterData = {
  footerLogo: { asset: { url: string } };
  sectionTitle: string;
  socialLinks: Array<{
    platform: string;
    icon: string;
  }>;
  quickLinks: Array<{
    label: string;
    url: string;
  }>;
  resourcesLinks: Array<{
    label: string;
    url: string;
  }>;
  contactInfo: {
    email: string;
    phone: string;
    phoneSvgIcon: string;
    emailSvgIcon: string;
  };
  copyright: string;
  privacyPolicy: string;
  termsOfService: string;
  cancellationRefundPolicy: { label: string };
  shippingDeliveryPolicy: { label: string };
};

type FooterProps = {
  footerData: FooterData;
};

export function Footer({ footerData }: FooterProps) {
  console.log(footerData, "footerData");
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Footer Logo */}
          <div>
            {footerData?.footerLogo && (
              <Link href="/" className="inline-block mb-6">
                <Image
                  src={footerData?.footerLogo.asset.url}
                  alt="rexpt - The AI Receptionist Service"
                  width={150}
                  height={50}
                  className="h-10 w-auto"
                />
              </Link>
            )}
            <p className="text-gray-400 mb-6">{footerData?.sectionTitle}</p>

            {/* Social Media Links */}
            <div className="flex space-x-4">
              {footerData?.socialLinks?.map((socialLink, index) =>
                socialLink.url ? (
                  <Link
                    key={`${socialLink.platform}-${socialLink.url}-${index}`}
                    href={socialLink.url}
                    target="_blank"
                    scroll={false}
                    className="text-gray-400 hover:text-[#6524EB]   transition-colors"
                  >
                    <div
                      dangerouslySetInnerHTML={{ __html: socialLink.icon }}
                    />
                  </Link>
                ) : (
                  // Fallback when URL is null (you can decide to render a placeholder or nothing)
                  <span
                    key={`${socialLink.platform}-${index}`}
                    className="text-gray-400"
                  >
                    <div
                      dangerouslySetInnerHTML={{ __html: socialLink.icon }}
                    />
                  </span>
                )
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {footerData?.quickLinks?.map((link, index) => (
                <li key={`${link.label}-${link.url}-${index}`}>
                  <Link
                    href={link.url}
                    className="text-gray-400 hover:text-[#6524EB] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          {/* <div>
            <h3 className="text-lg font-semibold mb-6">Resources</h3>
            <ul className="space-y-3">
              {footerData?.resourcesLinks?.map((link, index) => (
                <li key={`${link.label}-${link.url}-${index}`}>
                  {link.url ? (
                    <Link
                      href={link.url}
                      className="text-gray-400 hover:text-[#6524EB] transition-colors"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <span className="text-gray-400">{link.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </div> */}

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3  hover:text-[#6524EB]">
                <div
                  className="text-[#6524EB]"
                  dangerouslySetInnerHTML={{
                    __html: footerData?.contactInfo?.emailSvgIcon,
                  }}
                />
                <span className="text-gray-400  hover:text-[#6524EB]">
                  {footerData?.contactInfo?.email}
                </span>
              </li>
              <li className="flex items-center gap-3  hover:text-[#6524EB]  ">
                <div
                  className="text-[#6524EB]"
                  dangerouslySetInnerHTML={{
                    __html: footerData?.contactInfo?.phoneSvgIcon,
                  }}
                />
                <span className="text-gray-400  hover:text-[#6524EB] ">
                  {footerData?.contactInfo?.phone}
                </span>
              </li>
              {/* <Link
                className="flex items-center gap-3  hover:text-[#6524EB]"
                href="/Contact-us"
              >
                <div
                  className="text-[#6524EB]"
                  dangerouslySetInnerHTML={{
                    __html: footerData?.contactInfo?.phoneSvgIcon,
                  }}
                />
                <span className="text-gray-400  hover:text-[#6524EB]">
                  {footerData?.contactInfo?.contactUs||"Contact Us"}
                </span>
              </Link> */}
            </ul>
          </div>
        </div>

        {/* Footer Links (Privacy Policy, Terms of Service, Cookie Policy) */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              {footerData?.copyright}
            </p>
            <div className="flex space-x-6">
              <Link
                href="/Privacy-Policy"
                // href={footerData?.privacyPolicy ?? "#"}
                className="text-gray-400 hover:text-[#6524EB]   text-sm transition-colors"
              >
                {footerData.privacyPolicy?.label}
              </Link>
              <Link
                href="/Terms-Condition"
                // href={footerData?.termsOfService ?? "#"}
                className="text-gray-400 hover:text-[#6524EB]   text-sm transition-colors"
              >
                {footerData?.termsOfService?.label}
              </Link>
              <Link
                href="/Cancellation-Refund"
                // href={footerData?.termsOfService ?? "#"}
                className="text-gray-400 hover:text-[#6524EB]   text-sm transition-colors"
              >
                {footerData?.cancellationRefundPolicy?.label}
              </Link>
              <Link
                href="/Shipping-Delivery"
                // href={footerData?.termsOfService ?? "#"}
                className="text-gray-400 hover:text-[#6524EB]   text-sm transition-colors"
              >
                {footerData?.shippingDeliveryPolicy?.label}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
