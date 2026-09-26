const SITE_NAME = "StellarOne Health";
const SITE_URL = "https://stellaronehealth.com";

export function pageHead({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}) {
  const fullTitle = `${title} | ${SITE_NAME}`;
  const url = `${SITE_URL}${path}`;
  return {
    meta: [
      { title: fullTitle },
      { name: "description", content: description },
      { property: "og:title", content: fullTitle },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { property: "og:site_name", content: SITE_NAME },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: fullTitle },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "StellarOne Health Technologies Pvt. Ltd.",
          url: SITE_URL,
          email: "Praveen.Jayaraman@stellaronehealth.com",
          description:
            "Operational partner for US healthcare organizations: revenue cycle management, agentic AI for healthcare workflows and the EasyMed digital health platform.",
        }),
      },
    ],
  };
}

export { SITE_NAME, SITE_URL };
