"use client";
import type React from "react";
import { PortableText } from "@portabletext/react";
import { Send } from "lucide-react";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { client } from "@/lib/sanityClient";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { useTheme } from "next-themes";
import axios from "axios";
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
type ContactUsData = {
  pageTitle: string;
  pageSubtitle: string;
  formLabels: {
    fullName: string;
    emailAddress: string;
    phoneNumber: string;
    subject: string;
    message: string;
    sendButton: string;
    formDescription: string;
  };
  subjectOptions: string[];
  contactInfo: {
    description: string;
    phone: {
      label: string;
      subLabel: string;
      number: string;
      iconSvg: string;
    };
    email: {
      label: string;
      subLabel: string;
      address: string;
      iconSvg: string;
    };
    businessHours: {
      label: string;
      mondayToFriday: string;
      saturday: string;
      sunday: string;
      iconSvg: string;
    };
  };
};
export default function ContactUs() {
  const [pageData, setPageData] = useState<{
    title: string;
    header: HeaderData | null;
    footer: any;
  } | null>(null);

  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  const [contactUsData, setContactUsData] = useState<ContactUsData | null>(
    null
  );
  console.log(contactUsData, "contactUsData");


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Form Data to send in the API request
      const { name, email, phone, subject, message } = formData;

      // Prepare the email content
      const html = `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong> ${message}</p>
    `;

      const text = `
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      Subject: ${subject}
      Message: ${message}
    `;

      // Sending form data via Mailgun
      const formDataToSend = new FormData();
      formDataToSend.append("from", email);
      formDataToSend.append("to", "rexport@rexpt.in");
      formDataToSend.append("subject", `Contact Us Enquiry: ${subject}`);
      formDataToSend.append("html", html);
      formDataToSend.append("text", text); // Fallback plain text

      const response = await axios.post(
        `https://api.mailgun.net/v3/${process.env.NEXT_PUBLIC_MAILGUN_DOMAIN}/messages`,
        formDataToSend,
        {
          auth: {
            username: "api",
            password: process.env.NEXT_PUBLIC_MAILGUN_API_KEY,
          },
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Show SweetAlert success message
      Swal.fire({
        title: "Thank you for your message!",
        text: "We'll get back to you soon.",
        icon: "success",
        confirmButtonText: "OK",
      });

      // Reset form data after successful submission
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      console.error("Error sending email:", err.response?.data || err.message);

      // Show SweetAlert error message
      Swal.fire({
        title: "Oops!",
        text: "There was an error while sending your message. Please try again later.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
                        contactInfo{ email, phone, emailSvgIcon,phoneSvgIcon ,contactUs,contactUsSvgIcon},
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
    // Fetch Contact Us specific data from its own schema/document
    client
      .fetch(
        `*[_type=="contactUs"][0]{
  header,
  form,
  contactInformation {
    description,
    phone {
      label,
      subLabel,
      number,
      svgIcon
    },
    email {
      label,
      subLabel,
      address,
      svgIcon
    },
    businessHours {
      label,
      hours[],
      svgIcon
    }
  }
}`
      )
      .then((data) => {
        console.log("contactUs raw data:", data);
        setContactUsData({
          pageTitle: data.header.title,
          pageSubtitle: data.header.subtitle,
          formLabels: {
            fullName: data.form.fullName,
            emailAddress: data.form.emailAddress,
            phoneNumber: data.form.phoneNumber,
            subject: data.form.subject,
            message: data.form.message,
            sendButton: data.form.sendButtonLabel,
            formDescription:
              data.form.formDescription || "Please fill the form",
          },
          subjectOptions: data.form.subjectOptions || [],
          contactInfo: {
            description: data.contactInformation?.description || "",
            phone: {
              label: data.contactInformation?.phone?.label || "",
              subLabel: data.contactInformation?.phone?.subLabel || "",
              number: data.contactInformation?.phone?.number || "",
              iconSvg: data.contactInformation?.phone?.svgIcon || "",
            },
            email: {
              label: data.contactInformation?.email?.label || "",
              subLabel: data.contactInformation?.email?.subLabel || "",
              address: data.contactInformation?.email?.address || "",
              iconSvg: data.contactInformation?.email?.svgIcon || "",
            },
            businessHours: {
              label: data.contactInformation?.businessHours?.label || "",
              mondayToFriday:
                data.contactInformation?.businessHours?.hours?.[0] || "",
              saturday:
                data.contactInformation?.businessHours?.hours?.[1] || "",
              sunday: data.contactInformation?.businessHours?.hours?.[2] || "",
              iconSvg: data.contactInformation?.businessHours.svgIcon || "",
            },
          },
        });
      })
      .catch(console.error);
  }, []);

  if (!pageData || !contactUsData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading…
      </div>
    );
  }

  const { header, footer } = pageData;

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
      className={`min-h-screen mt-5 cancel-main  ${
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      {/* Header */}
      {header?.enabled && <Header data={header} />}
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        {/* Header Section */}
        <div className="text-center mb-16 mt-5">
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
            style={isDarkMode ? { color: "white" } : {}}
          >
            <PortableText
              value={contactUsData?.pageTitle}
              components={serializers}
            />
          </h1>
          <p
            className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            style={isDarkMode ? { color: "white" } : {}}
          >
            {contactUsData?.pageSubtitle}
          </p>
        </div>

        {/* Contact Form and Info */}
        <div
          className="grid lg:grid-cols-2 gap-12 lg:gap-16"
          // style={{ height: "700px" }}
        >
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-10">
            <div className="mb-8">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
                Send us a Message
              </h2>
              <p className="text-gray-600">
                {contactUsData?.formLabels?.formDescription}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    {contactUsData?.formLabels?.fullName}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData?.name}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#6524EB] focus:border-transparent outline-none transition-all duration-200 text-gray-900 placeholder-gray-400 ${
                      isDarkMode
                        ? "bg-black text-white border-gray-600 placeholder-gray-500"
                        : "bg-white text-black border-gray-300 placeholder-gray-400"
                    }`}
                    // className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200 text-gray-900 placeholder-gray-400"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    {contactUsData?.formLabels?.emailAddress}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData?.email}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#6524EB] focus:border-transparent outline-none transition-all duration-200 text-gray-900 placeholder-gray-400 ${
                      isDarkMode
                        ? "bg-black text-white border-gray-600 placeholder-gray-500"
                        : "bg-white text-black border-gray-300 placeholder-gray-400"
                    }`}
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    {contactUsData?.formLabels?.phoneNumber}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData?.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#6524EB] focus:border-transparent outline-none transition-all duration-200 text-gray-900 placeholder-gray-400 ${
                      isDarkMode
                        ? "bg-black text-white border-gray-600 placeholder-gray-500"
                        : "bg-white text-black border-gray-300 placeholder-gray-400"
                    }`}
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    {contactUsData?.formLabels?.subject}
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData?.subject}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#6524EB] focus:border-transparent outline-none transition-all duration-200 text-gray-900 placeholder-gray-400 ${
                      isDarkMode
                        ? "bg-black text-white border-gray-600 placeholder-gray-500"
                        : "bg-white text-black border-gray-300 placeholder-gray-400"
                    }`}
                  >
                    <option value="">Select a subject</option>
                    {contactUsData?.subjectOptions?.map((option) => (
                      <option
                        key={option}
                        value={option?.toLowerCase().replace(/\s+/g, "-")}
                      >
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  {contactUsData?.formLabels?.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData?.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200 text-gray-900 placeholder-gray-400 resize-none ${
                    isDarkMode
                      ? "bg-black text-white border-gray-600 placeholder-gray-500"
                      : "bg-white text-black border-gray-300 placeholder-gray-400"
                  }`}
                  placeholder="Tell us about your requirements or questions..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#6524eb] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#6524eb] focus:ring-4 focus:ring-[#6524eb]-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    {contactUsData?.formLabels?.sendButton}
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2
                className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4"
                style={isDarkMode ? { color: "white" } : {}}
              >
                Contact Information
              </h2>
              <p
                className="text-gray-600 text-lg"
                style={isDarkMode ? { color: "white" } : {}}
              >
                {contactUsData?.contactInfo?.description}
              </p>
            </div>

            <div className="space-y-6">
              {/* Phone */}
              <div className="flex items-start space-x-4 p-6 bg-white rounded-2xl shadow-lg">
                <div
                  className="bg-[#6524eb] p-3 rounded-xl"
                  dangerouslySetInnerHTML={{
                    __html: contactUsData?.contactInfo?.phone?.iconSvg,
                  }}
                  style={{ color: "#ffffff" }}
                ></div>
                <div>
                  <h3
                    className="font-bold text-gray-900 mb-1"
                    style={isDarkMode ? { color: "black" } : {}}
                  >
                    {contactUsData?.contactInfo?.phone?.label}
                  </h3>
                  <p
                    className="text-gray-600 mb-2"
                    style={isDarkMode ? { color: "black" } : {}}
                  >
                    {contactUsData?.contactInfo?.phone?.subLabel}
                  </p>
                  <p className="text-xl font-bold text-[#6524eb]">
                    {contactUsData?.contactInfo?.phone?.number}
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4 p-6 bg-white rounded-2xl shadow-lg">
                <div
                  className="bg-[#6524eb] p-3 rounded-xl"
                  style={{ color: "#ffffff" }}
                  dangerouslySetInnerHTML={{
                    __html: contactUsData?.contactInfo?.email?.iconSvg,
                  }}
                ></div>
                <div>
                  <h3
                    className="font-bold text-gray-900 mb-1"
                    style={isDarkMode ? { color: "black" } : {}}
                  >
                    {contactUsData?.contactInfo?.email?.label}
                  </h3>
                  <p
                    className="text-gray-600 mb-2"
                    style={isDarkMode ? { color: "black" } : {}}
                  >
                    {contactUsData?.contactInfo?.email?.subLabel}
                  </p>
                  <p className="text-xl font-bold text-[#6524eb]">
                    {contactUsData?.contactInfo?.email?.address}
                  </p>
                </div>
              </div>

              {/* Business Hours */}
              <div className="flex items-start space-x-4 p-6 bg-white rounded-2xl shadow-lg">
                <div
                  className="bg-[#6524eb] p-3 rounded-xl"
                  style={{ color: "#ffffff" }}
                  dangerouslySetInnerHTML={{
                    __html: contactUsData?.contactInfo?.businessHours?.iconSvg,
                  }}
                ></div>
                <div>
                  <h3
                    className="font-bold text-gray-900 mb-1"
                    style={isDarkMode ? { color: "black" } : {}}
                  >
                    {contactUsData?.contactInfo?.businessHours?.label}
                  </h3>
                  <p
                    className="text-gray-600"
                    style={isDarkMode ? { color: "black" } : {}}
                  >
                    Monday - Friday:{" "}
                    {contactUsData?.contactInfo?.businessHours?.mondayToFriday}
                  </p>
                  <p
                    className="text-gray-600"
                    style={isDarkMode ? { color: "black" } : {}}
                  >
                    Saturday:{" "}
                    {contactUsData?.contactInfo?.businessHours?.saturday}
                  </p>
                  <p
                    className="text-gray-600"
                    style={isDarkMode ? { color: "black" } : {}}
                  >
                    Sunday: {contactUsData?.contactInfo?.businessHours?.sunday}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {footer?.enabled && <Footer footerData={footer} />}
    </div>
  );
}
