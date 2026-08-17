import { NAV_LINKS } from "../data/navLinks";
import { SKILLS } from "../data/skills";
import { FOOTER_SOCIALS } from "../data/socials";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-top">

        <div className="footer-brand">
          <a href="#home" className="logo">
            umer<span>.dev</span>
          </a>

          <p>
            Umer Safeer Lodhi — a MERN stack & Next.js
            developer building reliable, scalable web
            applications with clean code and thoughtful
            interfaces.
          </p>
        </div>

        <div className="footer-cols">

          <div className="footer-col">
            <h4>Navigate</h4>

            <ul>
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4>Stack</h4>

            <ul>
              {SKILLS.map((skill) => (
                <li key={skill.name}>
                  <a href="#skills">
                    {skill.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4>Connect</h4>

            <div className="footer-social">
              {FOOTER_SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                >
                  {social.svg}
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>

      <div className="footer-bottom">
        <span>
          © {year} Umer Safeer Lodhi. All rights reserved.
        </span>

        <span>
          Built with{" "}
          <span className="heart">♥</span>{" "}
          using MERN & Next.js
        </span>
      </div>
    </footer>
  );
}