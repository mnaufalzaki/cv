import type { LocalizedText } from "@/app/portfolio-data";

type PersonalSpace = {
  slug: string;
  title: string;
  description: LocalizedText;
  href: string;
};

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
];
