# StellarOne Health strategic website update

## Goal
Align the existing site with the attached master brief while preserving the established StellarOne identity, service imagery, CEO details, working lead form, and existing routes. The result will prioritize RCM first, then healthcare automation, Agentic AI, and EasyMed.

## What will change

### 1. Homepage and conversion journey
- Replace the opening message with “Intelligent Healthcare Operations. Built for Better Outcomes.” and the supplied supporting copy.
- Change the primary action to “Request an RCM Assessment” and the secondary action to “Explore Healthcare AI,” with the four-part trust statement below.
- Reorder and strengthen the page into the requested flow: credibility, four business areas, major RCM section, four-step engagement model, automation, Agentic AI, example AI workflows, EasyMed, industries, trust, insights, final action.
- Keep all statements factual and avoid invented metrics, outcomes, credentials, clients, or deployments.

### 2. Navigation and page structure
- Replace the crowded card-style desktop menu with a cleaner grouped navigation for Solutions, Products, Industries, About, Insights, and Contact.
- Keep the phone menu simple and prominent, with “Request an RCM Assessment” as its main action.
- Add focused pages for Healthcare Automation, About, Insights, Privacy Policy, Terms of Service, and Cookie Policy.
- Preserve and improve the existing RCM, RCM Services, Agentic AI, Healthcare AI, EasyMed, Industries, Why StellarOne, and Contact pages.

### 3. RCM, automation, and AI content
- Make RCM the strongest commercial story, including modular and end-to-end delivery, the requested service coverage, partnership language for RCM companies, and an Assess → Design → Implement → Optimize model.
- Add a dedicated Healthcare Automation page with practical workflow examples and appropriate human controls.
- Expand the Agentic AI presentation with clearly labeled conceptual Eligibility, Denial, AR, Credentialing, and Reporting workflow cards.
- Retain human oversight, auditability, access control, monitoring, and “Conceptual demonstration” notices across AI content.

### 4. EasyMed, industries, company, and trust
- Present EasyMed as a StellarOne product rather than the company’s main identity, using only carefully qualified capabilities.
- Improve audience-specific messaging for medical practices, behavioral health, specialty practices, RCM companies, healthcare organizations, and healthcare technology companies.
- Build an About page using the supplied mission and vision, plus the verified CEO details already on the site.
- Add a healthcare trust section using careful language about data protection, secure architecture, privacy, responsible AI, and compliance-oriented development—without certification claims.

### 5. Contact and lead qualification
- Create two clear inquiry paths: “Need RCM Support?” and “Interested in Healthcare AI?”
- Adapt the form fields and action labels to the selected path while retaining validation, safe error handling, the health-information warning, and the existing lead-capture abstraction.
- Preserve Praveen Jayaraman’s leadership contact details.

### 6. SEO, quality, and verification
- Update metadata and page copy around the supplied search themes without keyword stuffing.
- Add all new pages to the sitemap and ensure every route has unique title, description, canonical, Open Graph, and Twitter metadata.
- Check all navigation, actions, images, forms, keyboard flow, focus states, headings, labels, 404 handling, and external-resource errors.
- Verify representative phone, tablet, laptop, and large-desktop layouts with no clipping or horizontal scrolling.
- Confirm the site contains no placeholder links, lorem ipsum, unsupported claims, or fabricated social proof.

## Technical approach
- Continue using the shared blocks in `src/components/site/`, semantic tokens in `src/styles.css`, and centralized content in `src/content/site.ts`.
- Add small reusable navigation and workflow-card components where needed rather than duplicating page markup.
- Keep the existing TanStack route structure and `LeadSink` integration boundary.
- Record any new structural convention in `AGENTS.md`, then validate the live experience and current build diagnostics.

## Scope note
The Insights page will be an editorial hub with factual topic previews, not fabricated articles or case studies. Legal pages will use clear general website language and avoid pretending to be jurisdiction-specific legal advice.
