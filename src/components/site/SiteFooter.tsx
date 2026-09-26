import { Link } from "@tanstack/react-router";
import { Container } from "./primitives";
import { Logo } from "./SiteHeader";

const COLUMNS = [
  {
    heading: "Revenue Cycle",
    links: [
      { label: "RCM Overview", to: "/rcm" },
      { label: "RCM Services", to: "/rcm-services" },
      { label: "Industries", to: "/industries" },
    ],
  },
  {
    heading: "Technology",
    links: [
      { label: "Agentic AI", to: "/agentic-ai" },
      { label: "Healthcare AI", to: "/healthcare-ai" },
      { label: "EasyMed", to: "/easymed" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Why StellarOne", to: "/why-stellarone" },
      { label: "Contact", to: "/contact" },
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="bg-navy-deep text-on-navy">
      <Container className="py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_2fr]">
          <div className="max-w-sm">
            <Logo onNavy />
            <p className="mt-4 text-sm leading-relaxed text-on-navy-muted">
              StellarOne Health Technologies Pvt. Ltd. supports US healthcare organizations with
              revenue cycle operations, healthcare workflow automation and digital health technology.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {COLUMNS.map((col) => (
              <div key={col.heading}>
                <h3 className="text-sm font-semibold text-on-navy">{col.heading}</h3>
                <ul className="mt-3 space-y-2">
                  {col.links.map((link) => (
                    <li key={link.to}>
                      <Link
                        to={link.to}
                        className="text-sm text-on-navy-muted transition-colors hover:text-on-navy"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 border-t border-on-navy/15 pt-6">
          <p className="text-xs leading-relaxed text-on-navy-muted">
            Please do not submit patient medical information or other sensitive health information
            through this website.
          </p>
          <p className="mt-3 text-xs text-on-navy-muted">
            © {new Date().getFullYear()} StellarOne Health Technologies Pvt. Ltd. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
