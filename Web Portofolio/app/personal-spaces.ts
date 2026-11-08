import type { LocalizedText } from "@/app/portfolio-data";

type PersonalSpace = {
  slug: string;
  title: string;
  description: LocalizedText;
  href: string;
};

function personalSpaceDestination(productionUrl: string, previewUrl?: string) {
  if (!previewUrl) return productionUrl;
  const url = new URL(previewUrl);
  if (url.protocol !== "http:" || !["localhost", "127.0.0.1"].includes(url.hostname) || url.username || url.password) {
    throw new Error("Personal space previews must use HTTP on localhost or 127.0.0.1");
  }
  return url.href;
}

// Add future spaces here; the footer entrance stays the same.
export const personalSpaces: PersonalSpace[] = [
  {
    slug: "atensi",
    title: "Atensi",
    description: {
      en: "Hal paling berharga dari hidup.",
      id: "Hal paling berharga dari hidup.",
    },
    href: "https://atensi.naufalzaki.tech/",
  },
  {
    slug: "sap-learning",
    title: "SAP Learning",
    description: {
      en: "SAP study notes and certification roadmap.",
      id: "Catatan belajar dan roadmap sertifikasi SAP.",
    },
    href: personalSpaceDestination("https://sap.naufalzaki.tech/", process.env.NEXT_PUBLIC_SAP_PREVIEW_URL),
  },
  {
    slug: "topgdp",
    title: "TopGDP",
    description: {
      en: "Notes on career, assets, and choices toward 2050.",
      id: "Catatan karier, aset, dan kebebasan memilih menuju 2050.",
    },
    href: personalSpaceDestination("https://topgdp.naufalzaki.tech/", process.env.NEXT_PUBLIC_TOPGDP_PREVIEW_URL),
  },
];
