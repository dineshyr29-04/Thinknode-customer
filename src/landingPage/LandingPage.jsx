import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const NAV_ITEMS = [
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Standards", href: "#standards" },
  { label: "Proof", href: "#proof" },
];

const METRICS = [
  { value: "24h", label: "Response window" },
  { value: "48h", label: "Standard delivery" },
  { value: "100%", label: "Focused scope" },
  { value: "0", label: "Noise tolerance" },
];

const SERVICES = [
  {
    index: "01",
    title: "Product-grade web development",
    description: "Fast, disciplined builds for platforms that need to look premium and work even harder.",
    points: ["React interfaces", "Responsive systems", "Performance tuning"],
  },
  {
    index: "02",
    title: "Minimalist frontend systems",
    description: "Sharp UI architecture with intentional spacing, hierarchy, and production-ready polish.",
    points: ["Design systems", "Component libraries", "Accessibility pass"],
  },
  {
    index: "03",
    title: "Automation and operations",
    description: "Reliable workflow logic for teams that want fewer manual steps and cleaner execution.",
    points: ["Workflow design", "Tool integration", "Process cleanup"],
  },
  {
    index: "04",
    title: "Visual identity execution",
    description: "Clean layouts and presentation assets that feel restrained, technical, and expensive.",
    points: ["Brand pages", "Launch assets", "Pitch-ready visuals"],
  },
];

const PROCESS = [
  {
    step: "01",
    title: "Brief and scope",
    description: "We define the output, remove ambiguity, and lock the delivery shape before work starts.",
  },
  {
    step: "02",
    title: "Build and refine",
    description: "The interface is constructed in clean passes, with every surface checked for consistency.",
  },
  {
    step: "03",
    title: "Handoff and support",
    description: "Final delivery includes clear structure, clean implementation, and room to scale later.",
  },
];

const STANDARDS = [
  ["Background", "Pure white"],
  ["Typography", "Inter / Helvetica Neue / Geist"],
  ["Corners", "None"],
  ["Effects", "Flat, restrained, production-grade"],
  ["Motion", "Short, subtle, and intentional"],
];

const PROOF = [
  {
    quote:
      "The interface felt like something a senior product team would ship internally: clean, direct, and impossible to misread.",
    name: "Arjun Mehta",
    role: "Startup Founder",
  },
  {
    quote:
      "Everything was structured, fast, and highly considered. It looked expensive without trying to look decorative.",
    name: "Sofia Laurent",
    role: "Product Director",
  },
  {
    quote:
      "The result had that rare Swiss-modern discipline: precise spacing, strong hierarchy, and no visual excess.",
    name: "Kevin Osei",
    role: "Creative Director",
  },
];

const FONT_STACK = "Inter, Helvetica Neue, Geist, SF Pro Display, SF Pro Text, system-ui, sans-serif";
const MONO_STACK = "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, monospace";

function SectionHeader({ eyebrow, title, description }) {
  return (
    <div style={{ maxWidth: 760, marginBottom: 28 }}>
      <div
        style={{
          fontFamily: MONO_STACK,
          fontSize: 11,
          letterSpacing: "0.34em",
          textTransform: "uppercase",
          color: "#444",
          marginBottom: 14,
        }}
      >
        {eyebrow}
      </div>
      <h2
        style={{
          fontFamily: FONT_STACK,
          fontSize: "clamp(2rem, 4vw, 3.5rem)",
          lineHeight: 1.02,
          fontWeight: 800,
          letterSpacing: "-0.06em",
          margin: 0,
        }}
      >
        {title}
      </h2>
      {description ? (
        <p
          style={{
            margin: "16px 0 0",
            maxWidth: 680,
            fontSize: 16,
            lineHeight: 1.7,
            color: "#444",
          }}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

function Panel({ children, style = {}, whileHover = {} }) {
  return (
    <motion.div
      whileHover={whileHover}
      style={{
        border: "1px solid #111",
        background: "#fff",
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: "rgba(255,255,255,0.96)",
        backdropFilter: "blur(10px)",
        borderBottom: scrolled ? "1px solid #111" : "1px solid rgba(17,17,17,0.55)",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "18px 24px",
          display: "grid",
          gridTemplateColumns: "auto 1fr auto",
          alignItems: "center",
          gap: 24,
        }}
      >
        <a href="#top" style={{ display: "inline-flex", alignItems: "center", gap: 14, color: "#111", textDecoration: "none" }}>
          <img
            src="/logo.svg"
            alt="ThinkNode"
            style={{ width: 40, height: 40, display: "block", objectFit: "cover" }}
          />
          <span
            style={{
              fontFamily: FONT_STACK,
              fontSize: 14,
              fontWeight: 800,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
            }}
          >
            ThinkNode
          </span>
        </a>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 24,
          }}
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              style={{
                fontFamily: MONO_STACK,
                fontSize: 10,
                letterSpacing: "0.26em",
                textTransform: "uppercase",
                color: "#111",
                textDecoration: "none",
                borderBottom: "1px solid transparent",
                paddingBottom: 4,
                transition: "border-color 160ms ease, opacity 160ms ease",
              }}
            >
              {item.label}
            </a>
          ))}
        </div>

        <motion.button
          onClick={() => (window.location.hash = "#contact")}
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.98 }}
          style={{
            fontFamily: MONO_STACK,
            fontSize: 11,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#fff",
            background: "#111",
            border: "1px solid #111",
            padding: "12px 18px",
            cursor: "pointer",
          }}
        >
          Get started
        </motion.button>
      </div>
    </motion.nav>
  );
}

function Footer() {
  return (
    <footer
      id="contact"
      style={{
        borderTop: "1px solid #111",
        padding: "24px 24px 34px",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          gap: 16,
          justifyContent: "space-between",
          alignItems: "center",
          color: "#444",
          fontSize: 12,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        <span style={{ fontFamily: MONO_STACK }}>ThinkNode customer portal</span>
        <span style={{ fontFamily: MONO_STACK }}>Built for clean execution</span>
        <a href="#top" style={{ color: "#111", textDecoration: "none", fontFamily: MONO_STACK }}>
          Back to top
        </a>
      </div>
    </footer>
  );
}

export default function LandingPage() {
  const navigate = useNavigate();
  const [activeProof, setActiveProof] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveProof((value) => (value + 1) % PROOF.length);
    }, 5200);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div
      id="top"
      style={{
        minHeight: "100vh",
        background: "#fff",
        color: "#111",
        fontFamily: FONT_STACK,
        overflowX: "hidden",
      }}
    >
      <Navbar />

      <main style={{ paddingTop: 84 }}>
        <section
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "48px 24px 88px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1.3fr) minmax(320px, 0.85fr)",
              gap: 24,
              alignItems: "stretch",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{ paddingTop: 12 }}
            >
              <div
                style={{
                  fontFamily: MONO_STACK,
                  fontSize: 11,
                  letterSpacing: "0.34em",
                  textTransform: "uppercase",
                  color: "#444",
                  marginBottom: 18,
                }}
              >
                ThinkNode customer portal
              </div>
              <h1
                style={{
                  margin: 0,
                  maxWidth: 760,
                  fontSize: "clamp(3.2rem, 8vw, 7rem)",
                  lineHeight: 0.94,
                  letterSpacing: "-0.08em",
                  fontWeight: 800,
                }}
              >
                Hardcoded by elite engineers.
              </h1>
              <p
                style={{
                  maxWidth: 640,
                  margin: "22px 0 0",
                  fontSize: "clamp(1rem, 1.4vw, 1.2rem)",
                  lineHeight: 1.7,
                  color: "#444",
                }}
              >
                A brutally clean client experience built with premium SaaS discipline, Swiss typography, and production-grade restraint.
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 34 }}>
                <motion.button
                  onClick={() => navigate("/login")}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    fontFamily: MONO_STACK,
                    fontSize: 11,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "#fff",
                    background: "#111",
                    border: "1px solid #111",
                    padding: "14px 20px",
                    cursor: "pointer",
                  }}
                >
                  Start project
                </motion.button>
                <motion.a
                  href="#services"
                  whileHover={{ y: -1 }}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: MONO_STACK,
                    fontSize: 11,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "#111",
                    background: "#fff",
                    border: "1px solid #111",
                    padding: "14px 20px",
                    textDecoration: "none",
                  }}
                >
                  View services
                </motion.a>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                  gap: 12,
                  marginTop: 34,
                }}
              >
                {METRICS.map((metric) => (
                  <Panel key={metric.label} style={{ padding: 16 }} whileHover={{ y: -1 }}>
                    <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.06em", lineHeight: 1 }}>{metric.value}</div>
                    <div
                      style={{
                        marginTop: 12,
                        fontFamily: MONO_STACK,
                        fontSize: 10,
                        letterSpacing: "0.22em",
                        textTransform: "uppercase",
                        color: "#444",
                        lineHeight: 1.5,
                      }}
                    >
                      {metric.label}
                    </div>
                  </Panel>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: "grid", gap: 12 }}
            >
              <Panel style={{ padding: 24 }}>
                <div
                  style={{
                    fontFamily: MONO_STACK,
                    fontSize: 10,
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    color: "#444",
                    marginBottom: 18,
                  }}
                >
                  Operating standard
                </div>
                <div
                  style={{
                    display: "grid",
                    gap: 0,
                    borderTop: "1px solid #111",
                  }}
                >
                  {[
                    ["Look", "Pure white, black text, sharp edges"],
                    ["Tone", "Minimal, technical, deliberate"],
                    ["Motion", "Fast, smooth, and subtle"],
                    ["Structure", "Grid-driven and fully responsive"],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "120px minmax(0, 1fr)",
                        gap: 16,
                        padding: "16px 0",
                        borderBottom: "1px solid #111",
                        alignItems: "start",
                      }}
                    >
                      <div style={{ fontFamily: MONO_STACK, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "#444" }}>
                        {label}
                      </div>
                      <div style={{ fontSize: 15, lineHeight: 1.6 }}>{value}</div>
                    </div>
                  ))}
                </div>
              </Panel>

              <Panel style={{ padding: 24 }} whileHover={{ y: -1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 16, marginBottom: 18 }}>
                  <div>
                    <div style={{ fontSize: 12, color: "#444", fontFamily: MONO_STACK, letterSpacing: "0.22em", textTransform: "uppercase" }}>
                      Delivery model
                    </div>
                    <div style={{ marginTop: 10, fontSize: 22, fontWeight: 800, letterSpacing: "-0.05em" }}>
                      One page, engineered with intent.
                    </div>
                  </div>
                  <div
                    style={{
                      alignSelf: "flex-start",
                      border: "1px solid #111",
                      padding: "8px 10px",
                      fontFamily: MONO_STACK,
                      fontSize: 10,
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                    }}
                  >
                    Live
                  </div>
                </div>
                <p style={{ margin: 0, color: "#444", lineHeight: 1.7 }}>
                  The experience is structured to feel premium without decoration: no excess color, no soft glass, and no visual drift.
                </p>
              </Panel>
            </motion.div>
          </div>
        </section>

        <section id="services" style={{ borderTop: "1px solid #111" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "84px 24px" }}>
            <SectionHeader
              eyebrow="Services"
              title="Focused capabilities for teams that value clarity."
              description="Each module is designed to read like a premium product surface: direct, disciplined, and built to scale without visual clutter."
            />

            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 16 }}>
              {SERVICES.map((service) => (
                <Panel key={service.index} style={{ padding: 24, minHeight: 250 }} whileHover={{ y: -2 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "baseline" }}>
                    <div style={{ fontFamily: MONO_STACK, fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase", color: "#444" }}>
                      {service.index}
                    </div>
                    <div style={{ width: 42, height: 1, background: "#111" }} />
                  </div>
                  <h3 style={{ margin: "20px 0 0", fontSize: 24, lineHeight: 1.1, letterSpacing: "-0.05em" }}>{service.title}</h3>
                  <p style={{ margin: "14px 0 0", color: "#444", fontSize: 15, lineHeight: 1.7 }}>{service.description}</p>
                  <div style={{ marginTop: 20, borderTop: "1px solid #111", paddingTop: 16, display: "grid", gap: 10 }}>
                    {service.points.map((point) => (
                      <div key={point} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                        <span style={{ width: 14, height: 1, background: "#111", flexShrink: 0 }} />
                        <span style={{ fontFamily: MONO_STACK, fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase" }}>{point}</span>
                      </div>
                    ))}
                  </div>
                </Panel>
              ))}
            </div>
          </div>
        </section>

        <section id="process" style={{ borderTop: "1px solid #111" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "84px 24px" }}>
            <SectionHeader
              eyebrow="Process"
              title="A direct operating rhythm."
              description="The workflow is intentionally short. It removes friction, keeps the scope visible, and produces clean handoff points."
            />

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 16 }}>
              {PROCESS.map((step) => (
                <Panel key={step.step} style={{ padding: 24, minHeight: 220 }} whileHover={{ y: -2 }}>
                  <div style={{ fontFamily: MONO_STACK, fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: "#444" }}>
                    Step {step.step}
                  </div>
                  <div style={{ marginTop: 24, fontSize: 44, fontWeight: 800, lineHeight: 0.9, letterSpacing: "-0.08em" }}>{step.step}</div>
                  <h3 style={{ margin: "18px 0 0", fontSize: 22, lineHeight: 1.12, letterSpacing: "-0.05em" }}>{step.title}</h3>
                  <p style={{ margin: "12px 0 0", color: "#444", fontSize: 15, lineHeight: 1.7 }}>{step.description}</p>
                </Panel>
              ))}
            </div>
          </div>
        </section>

        <section id="standards" style={{ borderTop: "1px solid #111" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "84px 24px" }}>
            <SectionHeader
              eyebrow="Standards"
              title="The system is intentionally minimal."
              description="The interface avoids decoration and focuses on hierarchy, spacing, and typographic discipline."
            />

            <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(320px, 420px)", gap: 16 }}>
              <Panel style={{ padding: 24 }}>
                <div style={{ display: "grid", gap: 0 }}>
                  {STANDARDS.map(([label, value]) => (
                    <div
                      key={label}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "180px minmax(0, 1fr)",
                        gap: 20,
                        padding: "18px 0",
                        borderBottom: "1px solid #111",
                        alignItems: "start",
                      }}
                    >
                      <div style={{ fontFamily: MONO_STACK, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "#444" }}>{label}</div>
                      <div style={{ fontSize: 16, lineHeight: 1.6 }}>{value}</div>
                    </div>
                  ))}
                </div>
              </Panel>

              <Panel style={{ padding: 24 }} whileHover={{ y: -2 }}>
                <div style={{ fontFamily: MONO_STACK, fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase", color: "#444" }}>
                  Layout logic
                </div>
                <div style={{ marginTop: 18, fontSize: 24, fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.06em" }}>
                  Strong grid. Sharp borders. No soft corners.
                </div>
                <p style={{ margin: "14px 0 0", color: "#444", lineHeight: 1.7 }}>
                  Every section is built to feel engineered rather than decorated, with consistent spacing and a clear visual path.
                </p>
                <div style={{ marginTop: 20, display: "grid", gap: 10 }}>
                  {[
                    "Compact rhythm",
                    "Accessible contrast",
                    "No visual clutter",
                    "Systematic alignment",
                  ].map((item) => (
                    <div key={item} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                      <span style={{ width: 14, height: 1, background: "#111", flexShrink: 0 }} />
                      <span style={{ fontFamily: MONO_STACK, fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase" }}>{item}</span>
                    </div>
                  ))}
                </div>
              </Panel>
            </div>
          </div>
        </section>

        <section id="proof" style={{ borderTop: "1px solid #111" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "84px 24px" }}>
            <SectionHeader
              eyebrow="Proof"
              title="Client feedback without the fluff."
              description="The testimonial block is kept deliberately plain so the signal stays high and the interface remains calm."
            />

            <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.2fr) minmax(300px, 0.8fr)", gap: 16, alignItems: "stretch" }}>
              <Panel style={{ padding: 28, minHeight: 260 }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeProof}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div style={{ fontSize: 56, lineHeight: 1, fontWeight: 800, marginBottom: 10 }}>“</div>
                    <p style={{ margin: 0, fontSize: 22, lineHeight: 1.6, letterSpacing: "-0.03em" }}>{PROOF[activeProof].quote}</p>
                    <div style={{ marginTop: 26, borderTop: "1px solid #111", paddingTop: 18, display: "flex", justifyContent: "space-between", gap: 16, alignItems: "center" }}>
                      <div>
                        <div style={{ fontSize: 16, fontWeight: 700 }}>{PROOF[activeProof].name}</div>
                        <div style={{ marginTop: 6, fontFamily: MONO_STACK, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "#444" }}>{PROOF[activeProof].role}</div>
                      </div>
                      <div style={{ fontFamily: MONO_STACK, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "#444" }}>
                        {String(activeProof + 1).padStart(2, "0")}/{String(PROOF.length).padStart(2, "0")}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                <div style={{ display: "flex", gap: 8, marginTop: 20 }}>
                  {PROOF.map((item, index) => (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => setActiveProof(index)}
                      style={{
                        width: 44,
                        height: 4,
                        padding: 0,
                        border: "none",
                        background: index === activeProof ? "#111" : "#c9c9c9",
                        cursor: "pointer",
                      }}
                      aria-label={`Show testimonial ${index + 1}`}
                    />
                  ))}
                </div>
              </Panel>

              <Panel style={{ padding: 24 }} whileHover={{ y: -2 }}>
                <div style={{ fontFamily: MONO_STACK, fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase", color: "#444" }}>
                  Why it works
                </div>
                <div style={{ marginTop: 18, fontSize: 24, fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.06em" }}>
                  Premium without performance theater.
                </div>
                <p style={{ margin: "14px 0 0", color: "#444", lineHeight: 1.7 }}>
                  The visual system keeps attention on content, structure, and delivery quality instead of ornamental effects.
                </p>
                <div style={{ marginTop: 20, display: "grid", gap: 12 }}>
                  {[
                    "Consistent black-and-white language",
                    "Flat surfaces with thin borders",
                    "No rounded corners or soft shadows",
                    "Fast, restrained hover states",
                  ].map((item) => (
                    <div key={item} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                      <span style={{ width: 14, height: 1, background: "#111", flexShrink: 0 }} />
                      <span style={{ fontFamily: MONO_STACK, fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase" }}>{item}</span>
                    </div>
                  ))}
                </div>
              </Panel>
            </div>
          </div>
        </section>

        <section style={{ borderTop: "1px solid #111" }}>
          <div
            style={{
              maxWidth: 1280,
              margin: "0 auto",
              padding: "84px 24px 92px",
              display: "grid",
              gridTemplateColumns: "minmax(0, 1.2fr) auto",
              gap: 24,
              alignItems: "end",
            }}
          >
            <div>
              <div style={{ fontFamily: MONO_STACK, fontSize: 11, letterSpacing: "0.34em", textTransform: "uppercase", color: "#444", marginBottom: 14 }}>
                Start
              </div>
              <h2 style={{ margin: 0, fontSize: "clamp(2.4rem, 5vw, 4.8rem)", lineHeight: 0.98, letterSpacing: "-0.08em", fontWeight: 800, maxWidth: 820 }}>
                If the brief is serious, the interface should be too.
              </h2>
              <p style={{ margin: "16px 0 0", maxWidth: 680, color: "#444", lineHeight: 1.7, fontSize: 16 }}>
                Start the project and we will respond with a clean scope, a clear plan, and an execution model that stays disciplined from first draft to final handoff.
              </p>
            </div>

            <motion.button
              onClick={() => navigate("/login")}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              style={{
                fontFamily: MONO_STACK,
                fontSize: 11,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#fff",
                background: "#111",
                border: "1px solid #111",
                padding: "18px 24px",
                cursor: "pointer",
                alignSelf: "end",
              }}
            >
              Start project
            </motion.button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
