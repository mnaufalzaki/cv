import type { Metadata } from "next";
import { PortfolioPage } from "@/components/portfolio-page";
import { SITE_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected Information Systems projects by Muhammad Naufal Zaki across machine learning, data analytics, financial technology, blockchain, and practical technology experiments.",
  alternates: {
    canonical: `${SITE_URL}/projects/`,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${SITE_URL}/projects/`,
    siteName: "Muhammad Naufal Zaki",
    title: "Projects | Muhammad Naufal Zaki",
    description:
      "Selected Information Systems projects by Muhammad Naufal Zaki across machine learning, data analytics, financial technology, blockchain, and practical technology experiments.",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Muhammad Naufal Zaki — Projects",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Muhammad Naufal Zaki",
    description:
      "Selected Information Systems projects by Muhammad Naufal Zaki across machine learning, data analytics, financial technology, blockchain, and practical technology experiments.",
    images: [`${SITE_URL}/og-image.png`],
  },
};

export default function Projects() {
  return <PortfolioPage view="projects" />;
}
