"use client";
import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { HeroSection2 } from "@/components/hero-section2";
import { FeaturesSection } from "@/components/features-section";
import { BenefitsSection } from "@/components/benefits-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { PricingSection } from "@/components/pricing-section";
import { CtaSection } from "@/components/cta-section";
import { Footer } from "@/components/footer";
import { client } from "@/lib/sanityClient";

type HeroData = {
  title: string;
  subtitle: string;
  chatPreview: { sender: string; text: string }[];
  primaryCta: { label: string; url: string };
  secondaryCta: { label: string; url: string };
  svgIcon: string;
};

type Feature = {
  title: string;
  description: string;
  svgIcon: string;
};

type FeaturesData = {
  sectionTitle: string;
  sectionSubtitle: string;
  features: Feature[];
};
type TestimonialsData = {
  sectionTitle: string;
  sectionSubtitle: string;
  testimonials: TestimonialData[];
};

type BottomCallout = {
  prefix: string;
  linkLabel: string;
  linkUrl: string;
  suffix: string;
};

type CtaData = {
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
  console.log(hero, "hero");
  useEffect(() => {
    // 1. Fetch Hero
    client
      .fetch<HeroData>(
        `
        *[_type=='heroSection'][0]{
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

    // 2. Fetch Features
    client
      .fetch<FeaturesData>(
        `
    *[_type=='featuresSection'][0]{
      sectionTitle,
      sectionSubtitle,
      features[] {
        title,
        description,
        svgIcon // Make sure you're fetching the svgIcon field from Sanity
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
      sectionTitle,
      sectionSubtitle,
      toggleLabels{left, right},
      toggleSubtext,
      plans[]{
        title,
        monthlyPrice,
        yearlyPrice,
        unitLabel,
        description,
        ctaLabel,
        ctaUrl,
        includedFeatures[],
        excludedFeatures[],
          togglePurplePricing
      },
      "bottomCallout": bottomCallout {
        prefix,
        linkLabel,
        linkUrl,
        suffix
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
    *[_type=='BenefitSection'][0]{
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
      .fetch<FooterData>(
        `
      *[_type=='footerSection'][0]{
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
    !ctaData
  ) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Header data={headerData} />

      <main>
        {/* <HeroSection2 /> */}
        <HeroSection
          title={hero.title}
          subtitle={hero.subtitle}
          chatPreview={hero.chatPreview}
          primaryCta={hero.primaryCta}
          secondaryCta={hero.secondaryCta}
          svgIcon={hero.svgIcon}
        />

        {/* pass your fetched CMS data as props */}
        <FeaturesSection
          sectionTitle={featuresData.sectionTitle}
          sectionSubtitle={featuresData.sectionSubtitle}
          features={featuresData.features}
        />

        <BenefitsSection data={benefitSectionData} />
        <TestimonialsSection
          sectionTitle={testimonialsData.sectionTitle}
          sectionSubtitle={testimonialsData.sectionSubtitle}
          testimonials={testimonialsData.testimonials}
        />
        {pricingData && (
          <PricingSection
            sectionTitle={pricingData.sectionTitle}
            sectionSubtitle={pricingData.sectionSubtitle}
            toggleLabels={pricingData.toggleLabels}
            toggleSubtext={pricingData.toggleSubtext}
            plans={pricingData.plans}
            bottomCallout={pricingData.bottomCallout}
          />
        )}
        {ctaData && (
          <CtaSection
            title={ctaData.title}
            subtitle={ctaData.subtitle}
            primaryCta={ctaData.primaryCta}
            secondaryCta={ctaData.secondaryCta}
            features={ctaData.features}
          />
        )}
      </main>
      <Footer footerData={footerData} />
    </div>
  );
}
