//icon
import { GiHeartBottle } from "react-icons/gi";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer
      className=""
      style={{
        height: "170px",
        backgroundColor: "var(--brand-gold-muted)",
        boxShadow: "0px -4px 6px -1px rgba(0, 0, 0, 0.5)",
      }}
    >
      <div className="container h-100">
        <div className="d-flex flex-column justify-content-end align-items-end h-100 gap-3">
          <div className="d-flex gap-3">
            <a href="https://github.com/CarmeloZiino">
              <FiGithub
                style={{ fontSize: "2rem", color: "var(--brand-warm-brown)" }}
              />
            </a>
            <a href="https://www.linkedin.com/in/carmelo-ziino-773b17195/">
              <FiLinkedin
                style={{ fontSize: "2rem", color: "var(--brand-warm-brown)" }}
              />
            </a>
          </div>
          <p
            className=""
            style={{ fontSize: "0.8rem", color: "var(--brand-warm-brown)" }}
          >
            Made con <GiHeartBottle style={{ fontSize: "25px" }} /> by Carmelo
            Ziino
          </p>
        </div>
      </div>
    </footer>
  );
}
