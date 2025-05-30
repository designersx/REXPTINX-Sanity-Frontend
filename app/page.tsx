"use client";
import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/features-section";
import { BenefitsSection } from "@/components/benefits-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { PricingSection } from "@/components/pricing-section";
import { CtaSection } from "@/components/cta-section";
import { Footer } from "@/components/footer";
import { client } from "@/lib/sanityClient";
import { HeroSection2 } from "@/components/hero-section2";
import dynamic from "next/dynamic";
const CustomSection = dynamic(() => import("@/components/Custom-section"), { ssr: false });
type HeroData = {
  enabled: boolean;
  backgroundColor?: string;
  title: string;
  subtitle: string;
  chatPreview: { sender: string; text: string }[];
  primaryCta: { label: string; url: string };
  secondaryCta: { label: string; url: string };
  svgIcon: string;
};

type HeroData2 = {
  enabled: boolean;
  title: string;
  subtitle: string;
  primaryCta: { label: string; url: string };
  secondaryCta: {
    label: string;
    phoneNumber?: string;
    rexAgentImage?: { asset: { url: string } };
  };
  video?: string;
  videoThumbnail?: {
    asset: { url: string };
  };
};

type Feature = {
  title: string;
  description: string;
  svgIcon: string;
};

type FeaturesData = {
  enabled: boolean;
  sectionTitle: string;
  sectionSubtitle: string;
  backgroundColor?: string;
  features: Feature[];
};
type TestimonialsData = {
  enabled: boolean;
  backgroundColor?: string;
  sectionTitle: string;
  sectionSubtitle: string;
  testimonials: TestimonialData[];
};

type RichTextBlock = {
  _type: "block";
  children: Array<{ _type: "span"; text: string; marks: string[] }>;
  markDefs: any[];
  style: string;
};

type SignupButton = {
  label: RichTextBlock[];
  description: RichTextBlock[];
  icon?: { asset: { url: string } };
  url?: string;
};

type PricingSectionData = {
  enabled: boolean;
  backgroundColor?: string;
  sectionTitle: string;
  sectionSubtitle: string;
  toggleLabels: { left: string; right: string };
  toggleSubtext: string;
  plans: any[]; // your existing planItem type here
  bottomCallout: BottomCallout;
  signupButton?: SignupButton;
};

type BottomCallout = {
  prefix: string;
  linkLabel: string;
  linkUrl: string;
  suffix: string;
};

type CtaData = {
  enabled: boolean;
  title: string;
  subtitle: string;
  primaryCta: { label: string; url: string };
  secondaryCta: { label: string; url: string };
  features: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
};

type FooterData = {
  enabled: boolean;
  footerLogo: { asset: { url: string } } | null;
  sectionTitle: string;
  socialLinks: { platform: string; url: string; icon: string }[];
  quickLinks: { label: string; url: string }[];
  resourcesLinks: { label: string; url: string }[];
  contactInfo: {
    email: string;
    phone: string;
    emailIcon: string;
    phoneIcon: string;
  };
  copyright: string;
  privacyPolicy: string;
  termsOfService: string;
  cookiePolicy: string;
};

type BenefitSectionData = {
  enabled: boolean;
  backgroundColor?: string;
  title: string;
  introText: string;
  features: {
    svgIcon: string;
    title: string;
    description: string;
  }[];
  seeTheDifference: {
    heading: string;
    bulletPoints: string[];
  };
};

export default function Home() {
  const [customSectionData, setCustomSectionData] = useState(null);

  const [hero, setHero] = useState<HeroData | null>(null);
  const [featuresData, setFeaturesData] = useState<FeaturesData | null>(null);
  const [headerData, setHeaderData] = useState<HeaderData | null>(null);
  const [testimonialsData, setTestimonialsData] =
    useState<TestimonialsData | null>(null);
  const [pricingData, setPricingData] = useState<
    (PricingSectionData & { bottomCallout: BottomCallout }) | null
  >(null);
  const [ctaData, setCtaData] = useState<CtaData | null>(null);
  const [footerData, setFooterData] = useState<FooterData | null>(null);
  const [benefitSectionData, setBenefitSectionData] =
    useState<BenefitSectionData | null>(null);
  const [hero2, setHero2] = useState<HeroData2 | null>(null);

  useEffect(() => {
    // 1. Fetch Hero
    client
      .fetch<HeroData>(
        `
        *[_type=='heroSection'][0]{
         enabled,
        backgroundColor,
          title,
          subtitle,
          svgIcon,
          chatPreview[]{sender, text,svgIcon },
          primaryCta{label, url},
          secondaryCta{label, url}
        }
      `
      )
      .then(setHero)
      .catch(console.error);

    // Fetch heroSection2 data
    client
      .fetch<HeroData2>(
        `
    *[_type=='heroSection1'][0] {
      enabled,
      title,
      subtitle,
       backgroundColor,
      primaryCta {
        label,
        url
      },
      secondaryCta {
        label,
        phoneNumber,  
        rexAgentImage {
          asset -> {
            url
          }
        }
      },
      video {
        asset-> {
          url
        }
      },   
      videoThumbnail {
        asset -> {
          url
        }
      }
    }
    `
      )
      .then(setHero2)
      .catch(console.error);

    // 2. Fetch Features
    client
      .fetch<FeaturesData>(
        `*[_type=='featuresSection' && enabled==true]{
     enabled,
       backgroundColor,
      sectionTitle,
      sectionSubtitle,
      features[] {
        title,
        description,
        svgIcon 
      }
    }
  `
      )
      .then(setFeaturesData)
      .catch(console.error);

    // header

    client
      .fetch<HeaderData>(
        `
        *[_type=='header'][0]{

          "logoUrl": logo.asset->url,
          enabled,
          logoAlt,
          tagline,
          navLinks[]{label, href},
          showThemeToggle,
          ctaLabel,
          ctaUrl
        }
      `
      )
      .then(setHeaderData)
      .catch(console.error);

    client
      .fetch<TestimonialsData>(
        `
  *[_type=='testimonialsSection'][0]{
  enabled,
  backgroundColor,
    sectionTitle,
    sectionSubtitle,
    testimonials[]{
      rating,
      "content": quote,
      "name": authorName,
      "position": authorRole,
      "authorImageUrl": authorImage.asset->url
    }
  }
`
      )
      .then(setTestimonialsData);
    // 6) Fetch Pricing
    client
      .fetch<PricingSectionData & { bottomCallout: BottomCallout }>(
        `
    *[_type=='pricingSection'][0]{
    enabled,
     backgroundColor,
      sectionTitle,
      sectionSubtitle,
      toggleLabels{left, right},
      toggleSubtext,
      plans[]{
        togglePurplePricing,
        title,
        monthlyPrice,
        yearlyPrice,
        unitLabel,
        description,
        ctaLabel,
        ctaUrl,
        includedFeatures[],
        excludedFeatures[],
      },
      "bottomCallout": bottomCallout {
        prefix,
        linkLabel,
        linkUrl,
        suffix
      },
       signupButton {
       label[]{ ..., markDefs[] }, 
       description[]{ ..., markDefs[] },
       icon{ asset->{url} },
       url
     }
    }
    `
      )

      .then(setPricingData)
      .catch(console.error);

    // 6. Fetch CTA Section Data
    client
      .fetch<CtaData>(
        `
        *[_type=='ctaSection'][0]{
        enabled,
          title,
          subtitle,
          primaryCta{label, url},
          secondaryCta{label, url},
          features[] {
            icon,
            title,
            description
          }
        }
      `
      )
      .then(setCtaData)
      .catch(console.error);

    // 1. Fetch Benefit Section
    client
      .fetch<BenefitSectionData>(
        `
      *[_type=='BenefitSection' && enabled==true]{
    enabled,
    backgroundColor,
      title,
      introText,
      features[] {
        svgIcon,
        title,
        description
      },
      seeTheDifference {
        heading,
        bulletPoints
      }
    }
  `
      )
      .then(setBenefitSectionData)
      .catch(console.error);

    client
      .fetch(
        `
  *[_type == "customIntegrationSection"][0]{
    enabled,
    backgroundColor,
    title,
    subtitle,
    lottieUrl,
    features[]{
      text,
      svgIcon
    }
  }
`
      )
      .then(setCustomSectionData)
      .catch(console.error);

    client
      .fetch<FooterData>(
        `
      *[_type=='footerSection'][0]{
      enabled,
        footerLogo {
          asset->{
            url
          }
        },
        sectionTitle,
        socialLinks[] {
          platform,
          url,
          icon
        },
        quickLinks[] {
          label,
          url
        },
        resourcesLinks[] {
          label,
          url
        },
        contactInfo {
          email,
          phone,
           emailSvgIcon,
      phoneSvgIcon 
        },
        copyright,
        privacyPolicy,
        termsOfService,
        cookiePolicy
      }
      `
      )
      .then(setFooterData)
      .catch(console.error);
  }, []);

  if (
    !hero ||
    !featuresData ||
    !headerData ||
    !testimonialsData ||
    !benefitSectionData ||
    !pricingData ||
    !ctaData ||
    !hero2
  ) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading…
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-white dark:bg-gray-950">
        {headerData?.enabled && <Header data={headerData} />}
        <main>
          {hero2?.enabled && (
            <HeroSection2
              enabled={hero2.enabled}
              title={hero2.title}
              subtitle={hero2.subtitle}
              primaryCta={hero2.primaryCta}
              secondaryCta={hero2.secondaryCta}
              video={hero2.video}
              videoThumbnail={hero2.videoThumbnail}
            />
          )}
          {hero?.enabled && (
            <HeroSection
              enabled={hero.enabled}
              title={hero.title}
              subtitle={hero.subtitle}
              chatPreview={hero.chatPreview}
              primaryCta={hero.primaryCta}
              secondaryCta={hero.secondaryCta}
              svgIcon={hero.svgIcon}
              backgroundColor={hero.backgroundColor}
            />
          )}

          {featuresData?.map((section, index) => (
            <FeaturesSection
              enabled={section.enabled}
              sectionTitle={section.sectionTitle}
              sectionSubtitle={section.sectionSubtitle}
              features={section.features}
              backgroundColor={section.backgroundColor}
            />
          ))}
          {customSectionData?.enabled && (
            <CustomSection
              enabled={customSectionData.enabled}
              backgroundColor={customSectionData.backgroundColor}
              title={customSectionData.title}
              subtitle={customSectionData.subtitle}
              lottieUrl={customSectionData.lottieUrl}
              features={customSectionData.features}
            />
          )}
          {benefitSectionData.map((section, idx) => (
             <BenefitsSection  key={idx} data={section} />
            ))}
          {testimonialsData?.enabled && (
            <TestimonialsSection
              sectionTitle={testimonialsData.sectionTitle}
              sectionSubtitle={testimonialsData.sectionSubtitle}
              testimonials={testimonialsData.testimonials}
              backgroundColor={testimonialsData.backgroundColor}
            />
          )}
          {pricingData?.enabled && (
            <PricingSection
              sectionTitle={pricingData.sectionTitle}
              sectionSubtitle={pricingData.sectionSubtitle}
              toggleLabels={pricingData.toggleLabels}
              toggleSubtext={pricingData.toggleSubtext}
              plans={pricingData.plans}
              bottomCallout={pricingData.bottomCallout}
              signupButton={pricingData.signupButton}
              backgroundColor={pricingData.backgroundColor}
            />
          )}

          {ctaData.enabled && (
            <CtaSection
              title={ctaData.title}
              subtitle={ctaData.subtitle}
              primaryCta={ctaData.primaryCta}
              secondaryCta={ctaData.secondaryCta}
              features={ctaData.features}
            />
          )}
        </main>
        {footerData.enabled && <Footer footerData={footerData} />}
      </div>
    </>
  );
}
