import type { LocalizedText } from "@/app/portfolio-data";

type PersonalSpace = {
  slug: string;
  title: string;
  description: LocalizedText;
  href: string;
};

const sapProductionUrl = "https://sap.naufalzaki.tech/";
const sapPreviewUrl = process.env.NEXT_PUBLIC_SAP_PREVIEW_URL;

function sapDestination() {
  if (!sapPreviewUrl) return sapProductionUrl;
  const url = new URL(sapPreviewUrl);
  if (url.protocol !== "http:" || !["localhost", "127.0.0.1"].includes(url.hostname) || url.username || url.password) {
    throw new Error("SAP preview must use HTTP on localhost or 127.0.0.1");
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
    href: sapDestination(),
  },
];
