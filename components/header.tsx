"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export type NavLink = { label: string; href: string | null };
export type HeaderData = {
  logoUrl: string;
  logoAlt: string;
  tagline: string | null;
  navLinks: NavLink[];
  showThemeToggle: boolean;
  ctaLabel: string | null;
  ctaUrl: string | null;
  ctaOpenInNewTab?: boolean;
};

export function Header({ data }: { data: HeaderData }) {
  const {
    logoUrl,
    logoAlt,
    tagline,
    navLinks,
    showThemeToggle,
    ctaLabel,
    ctaUrl,
    ctaOpenInNewTab,
  } = data;
  const staticRoutes: Record<string, string> = {
    Features: "#features",
    Benefits: "#benefits",
    Testimonials: "#testimonials",
    Pricing: "#pricing",
  };

  // build list with guaranteed href string and unique key
  const navList = navLinks?.map((item, idx) => {
    const href = item.href ?? staticRoutes[item.label] ?? "/";
    return {
      label: item.label,
      href,
      key: `${href}-${idx}`,
    };
  });

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLinkClick = () => setIsMobileMenuOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo + optional tagline */}
        <Link href="/">
          <div className="flex items-center cursor-pointer">
            <Image
              src={
                document.documentElement.classList.contains("dark")
                  ? "./images/footer_logo.png"
                  : logoUrl
              }
              alt={logoAlt}
              width={150}
              height={50}
              className={
                document.documentElement.classList.contains("dark")
                  ? "h-10 w-auto"
                  : "h-10 w-auto dark:brightness-0 dark:invert"
              }
              // className={
              //   !document.documentElement.classList.contains("dark")
              //     ? "h-10 w-auto dark:brightness-0 dark:invert"
              //     : "h-10 w-auto "
              // }
            />
            {tagline && (
              <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                {tagline}
              </span>
            )}
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-4">
          {navList?.map((link) => (
            <motion.div
              key={link.key}
              whileHover={{ y: -2, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link
                href={link.href}
                className="font-medium px-2 text-gray-700 dark:text-gray-200 hover:text-[#6524EB] dark:hover:text-[#6524EB] transition-colors"
              >
                {link.label}
              </Link>
            </motion.div>
          ))}

          {showThemeToggle && <ThemeToggle />}

          {ctaLabel && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href={ctaUrl || "#"}
                className="ml-2 inline-block"
                target={ctaOpenInNewTab ? "_blank" : "_self"}
              >
                <Button className="bg-[#6524EB] hover:bg-[#5a1fc0] text-white">
                  {ctaLabel}
                </Button>
              </Link>
            </motion.div>
          )}
        </nav>

        {/* Mobile Controls */}
        <div className="md:hidden flex items-center gap-2">
          {showThemeToggle && <ThemeToggle />}

          <motion.button
            className="text-gray-700 dark:text-gray-200"
            onClick={() => setIsMobileMenuOpen((o) => !o)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-800 shadow-lg"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              {navList?.map((link) => (
                <Link
                  key={link.key}
                  href={link.href}
                  className="font-medium py-2 text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  onClick={handleLinkClick}
                >
                  {link.label}
                </Link>
              ))}

              {ctaLabel && (
                <Link
                  href={ctaUrl || "/"}
                  className="w-full inline-block"
                  onClick={handleLinkClick}
                >
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white w-full">
                    {ctaLabel}
                  </Button>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
