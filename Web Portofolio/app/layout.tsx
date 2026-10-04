import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "@fontsource/caveat/400.css";
import "./globals.css";
import { SITE_URL } from "@/lib/site-config";
import { themeBootstrap } from "@/lib/portfolio-preferences";
import { PortfolioPreferencesProvider } from "@/components/portfolio-preferences";
import { PortfolioIntro } from "@/components/portfolio-intro";
import { introBootstrap } from "@/lib/portfolio-intro";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Muhammad Naufal Zaki — Technology, Data & Operations",
    template: "%s | Muhammad Naufal Zaki",
  },
  description:
    "Information Systems undergraduate at Universitas Airlangga with experience in technology projects, data analytics, operations, partnerships, and cross-functional leadership.",
  applicationName: "Muhammad Naufal Zaki",
  authors: [
    {
      name: "Muhammad Naufal Zaki",
      url: SITE_URL,
    },
  ],
  creator: "Muhammad Naufal Zaki",
  publisher: "Muhammad Naufal Zaki",
  alternates: {
    canonical: `${SITE_URL}/`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${SITE_URL}/`,
    siteName: "Muhammad Naufal Zaki",
    title: "Muhammad Naufal Zaki — Technology, Data & Operations",
    description:
      "Information Systems undergraduate at Universitas Airlangga with experience in technology projects, data analytics, operations, partnerships, and cross-functional leadership.",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Muhammad Naufal Zaki — Technology, Data & Operations",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Naufal Zaki — Technology, Data & Operations",
    description:
      "Information Systems undergraduate at Universitas Airlangga with experience in technology projects, data analytics, operations, partnerships, and cross-functional leadership.",
    images: [`${SITE_URL}/og-image.png`],
  },
  verification: {
    google: "rDgk7nLORIZEaWq5yPSgcXnHIhAvIsODRjtgpX3vQf8",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Muhammad Naufal Zaki",
  url: SITE_URL,
  image: `${SITE_URL}/profile.jpg`,
  jobTitle: "Information Systems Student",
  description:
    "Information Systems undergraduate at Universitas Airlangga with experience in technology projects, data analytics, operations, partnerships, and cross-functional leadership.",
  affiliation: {
    "@type": "EducationalOrganization",
    name: "Universitas Airlangga",
    url: "https://www.unair.ac.id/",
  },
  sameAs: [
    "https://github.com/mnaufalzaki",
    "https://www.linkedin.com/in/naufalz/",
  ],
  award: ["BSI Scholarship Awardee"],
  knowsAbout: [
    "Information Systems",
    "Enterprise Systems",
    "Technology Risk",
    "Financial Technology",
    "Data Analytics",
    "Machine Learning",
    "Blockchain",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Muhammad Naufal Zaki",
  url: SITE_URL,
  description:
    "Information Systems undergraduate at Universitas Airlangga with experience in technology projects, data analytics, operations, partnerships, and cross-functional leadership.",
  author: {
    "@type": "Person",
    name: "Muhammad Naufal Zaki",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
        <script dangerouslySetInnerHTML={{ __html: introBootstrap }} />
      </head>
      <body className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
          }}
        />
        <PortfolioPreferencesProvider>
          <PortfolioIntro>{children}</PortfolioIntro>
        </PortfolioPreferencesProvider>
      </body>
    </html>
  );
}
