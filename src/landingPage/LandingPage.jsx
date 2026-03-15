import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion";

/* Global particle canvas */
function ParticleBg() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let raf;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const COUNT = 140;
    const nodes = Array.from({ length: COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      r: Math.random() * 1.8 + 0.4,
      pulse: Math.random() * Math.PI * 2,
      color: Math.random() > 0.55 ? [0, 210, 255] : Math.random() > 0.5 ? [110, 80, 255] : [0, 180, 220],
    }));

    let mouse = { x: -9999, y: -9999 };
    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", onMove);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < COUNT; i++) {
        for (let j = i + 1; j < COUNT; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 140) {
            const [r, g, b] = nodes[i].color;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(${r},${g},${b},${(1 - d / 140) * 0.38})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        n.pulse += 0.018;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
        const d = Math.hypot(mouse.x - n.x, mouse.y - n.y);
        if (d < 130) {
          n.x += (n.x - mouse.x) * 0.01;
          n.y += (n.y - mouse.y) * 0.01;
        }
        const [r, g, b] = n.color;
        const gr = n.r * (1 + 0.35 * Math.sin(n.pulse));
        const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, gr * 6);
        grd.addColorStop(0, `rgba(${r},${g},${b},1)`);
        grd.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.beginPath();
        ctx.arc(n.x, n.y, gr, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}

/* grid overlay */
function Grid() {
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none" }}>
      <svg width="100%" height="100%">
        <defs>
          <pattern id="g2" width="64" height="64" patternUnits="userSpaceOnUse">
            <path d="M 64 0 L 0 0 0 64" fill="none" stroke="rgba(0,200,255,0.04)" strokeWidth="0.8" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#g2)" />
      </svg>
    </div>
  );
}

/* scan line */
function Scan() {
  return (
    <motion.div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        height: 2,
        background: "linear-gradient(90deg,transparent,rgba(0,220,255,0.28),transparent)",
        zIndex: 2,
        pointerEvents: "none",
      }}
      animate={{ top: ["0%", "100%"] }}
      transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
    />
  );
}

/* section wrapper */
function Sec({ children, id, py = 120, extra = {} }) {
  return (
    <section
      id={id}
      style={{
        position: "relative",
        zIndex: 10,
        background: "linear-gradient(180deg,rgba(2,6,18,0.84),rgba(3,10,26,0.90))",
        padding: `${py}px 32px`,
        ...extra,
      }}
    >
      <Grid />
      {children}
    </section>
  );
}

/* scroll reveal */
function Reveal({ children, delay = 0, y = 44, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* counter */
function Count({ to, suffix = "" }) {
  const [v, setV] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let c = 0;
    const step = () => {
      c += Math.ceil(to / 55);
      if (c >= to) {
        setV(to);
        return;
      }
      setV(c);
      requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, to]);
  return (
    <span ref={ref}>
      {v}
      {suffix}
    </span>
  );
}

/* font injector */
function Fonts() {
  useEffect(() => {
    const l = document.createElement("link");
    l.rel = "stylesheet";
    l.href =
      "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Orbitron:wght@400;500;600;700;800&family=JetBrains+Mono:wght@300;400;600&display=swap";
    document.head.appendChild(l);
  }, []);
  return null;
}

/* typography helpers */
const F = {
  display: { fontFamily: "'Orbitron', sans-serif", fontWeight: 800 },
  head: { fontFamily: "'Orbitron', sans-serif", fontWeight: 700 },
  sub: { fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 },
  body: { fontFamily: "'Space Grotesk', sans-serif", fontWeight: 400 },
  mono: { fontFamily: "'JetBrains Mono', monospace" },
};

function Chip({ children }) {
  return (
    <div
      style={{
        ...F.mono,
        display: "inline-block",
        fontSize: 10,
        letterSpacing: "0.45em",
        color: "#00d4ff",
        padding: "4px 16px",
        border: "1px solid rgba(0,212,255,0.3)",
        background: "rgba(0,212,255,0.07)",
        marginBottom: 16,
      }}
    >
      {children}
    </div>
  );
}

function H2({ children }) {
  return (
    <h2
      style={{
        ...F.display,
        fontSize: "clamp(2rem,5vw,3.6rem)",
        lineHeight: 1.1,
        color: "#ffffff",
        margin: 0,
      }}
    >
      {children}
    </h2>
  );
}

/* button styles */
const BTN = {
  blue: {
    ...F.sub,
    fontSize: 12,
    letterSpacing: "0.2em",
    padding: "14px 36px",
    color: "#fff",
    background: "rgba(0, 212, 255, 0.15)",
    border: "1.5px solid rgba(0, 212, 255, 0.5)",
    backdropFilter: "blur(10px)",
    cursor: "pointer",
    borderRadius: "16px",
    position: "relative",
    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
  },
  ghost: {
    ...F.sub,
    fontSize: 12,
    letterSpacing: "0.2em",
    padding: "14px 36px",
    color: "#cbd5e1",
    background: "rgba(255, 255, 255, 0.08)",
    border: "1.5px solid rgba(255, 255, 255, 0.25)",
    backdropFilter: "blur(10px)",
    cursor: "pointer",
    borderRadius: "16px",
    position: "relative",
    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
  },
};

/* navbar */
function Navbar() {
  const [sc, setSc] = useState(false);
  useEffect(() => {
    const fn = () => setSc(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <motion.nav
      initial={{ y: -90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "14px 40px",
        background: sc ? "rgba(2,6,18,0.93)" : "rgba(2,6,18,0.45)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(0,200,255,0.1)",
        transition: "background 0.4s",
      }}
    >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ position: "relative", width: 38, height: 38 }}>
              <motion.div
                style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "2px solid #00d4ff" }}
                animate={{ rotate: 360 }}
                transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                style={{ position: "absolute", inset: 7, borderRadius: "50%", border: "1px solid rgba(168,85,247,0.8)" }}
                animate={{ rotate: -360 }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
              />
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#00d4ff", boxShadow: "0 0 12px #00d4ff" }} />
              </div>
            </div>
            <span style={{ ...F.head, fontSize: 17, letterSpacing: "0.28em", color: "#fff" }}>
              THINK
              <span style={{ color: "#00d4ff", textShadow: "0 0 16px rgba(0,212,255,0.75)" }}>NODE</span>
            </span>
          </div>
          <div style={{ display: "flex", gap: 36 }}>
            {["Services", "Process", "Portfolio", "Testimonials"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                style={{
                  ...F.mono,
                  fontSize: 10,
                  letterSpacing: "0.3em",
                  color: "#94a3b8",
                  textDecoration: "none",
                  textTransform: "uppercase",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = "#00d4ff";
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = "#94a3b8";
                }}
              >
                {item}
              </a>
            ))}
          </div>
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
            style={{
              ...F.sub,
              fontSize: 11,
              letterSpacing: "0.25em",
              padding: "10px 24px",
              color: "#00d4ff",
              background: "rgba(0, 212, 255, 0.1)",
              border: "1px solid rgba(0, 212, 255, 0.4)",
              backdropFilter: "blur(8px)",
              cursor: "pointer",
              borderRadius: "14px",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(0, 212, 255, 0.2)";
              e.currentTarget.style.borderColor = "rgba(0, 212, 255, 0.8)";
              e.currentTarget.style.boxShadow = "0 0 20px rgba(0, 212, 255, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(0, 212, 255, 0.1)";
              e.currentTarget.style.borderColor = "rgba(0, 212, 255, 0.4)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            GET STARTED
          </motion.button>
        </motion.nav>
      );
    }

    /* data */
const SERVICES = [
  {
    sym: "A",
    title: "Web Development",
    desc: "Full-stack applications engineered for performance, scale, and pixel-perfect precision.",
    accent: "#00d4ff",
  },
  {
    sym: "B",
    title: "Frontend Apps",
    desc: "Component-driven UI systems with cinematic micro-interactions that convert.",
    accent: "#a855f7",
  },
  {
    sym: "C",
    title: "E-Poster Design",
    desc: "Visual systems that communicate authority, brand intelligence, and aesthetic edge.",
    accent: "#10b981",
  },
  {
    sym: "D",
    title: "n8n Automation",
    desc: "Workflow automation that eliminates friction, multiplies output, and runs silently.",
    accent: "#f59e0b",
  },
  {
    sym: "E",
    title: "Video Editing",
    desc: "Post-production that transforms raw footage into unforgettable narrative experiences.",
    accent: "#f43f5e",
  },
];

const PORTFOLIO = [
  { title: "E-Commerce Platform", tag: "Web Dev", a: "#0d3a5c", b: "#041520" },
  { title: "SaaS Dashboard", tag: "Frontend", a: "#2d1b69", b: "#0d0b2e" },
  { title: "Brand Identity System", tag: "Design", a: "#064e3b", b: "#012318" },
  { title: "Workflow Automation", tag: "n8n", a: "#78350f", b: "#2c1508" },
  { title: "Product Launch Video", tag: "Video", a: "#7f1d1d", b: "#2d0a0a" },
  { title: "Mobile App UI", tag: "Frontend", a: "#0c4a6e", b: "#031c2c" },
];

const TESTIMONIALS = [
  {
    name: "Arjun Mehta",
    role: "Startup Founder",
    quote:
      "ThinkNode delivered a platform that exceeded every expectation. The level of craft is extraordinary - we went live ahead of schedule.",
    av: "AM",
  },
  {
    name: "Sofia Laurent",
    role: "Product Director",
    quote:
      "Our automation workflows now run flawlessly. Response time, quality of output, and communication were all exceptional throughout.",
    av: "SL",
  },
  {
    name: "Kevin Osei",
    role: "Creative Director",
    quote:
      "The visual design language they created for us is completely unique. Clients constantly ask who designed it - it just commands attention.",
    av: "KO",
  },
  {
    name: "Priya Nair",
    role: "E-commerce Lead",
    quote:
      "From brief to delivery in record time. The frontend performance improvements alone paid for everything, twice over.",
    av: "PN",
  },
];

/* main */
export default function LandingPage() {
  const navigate = useNavigate();
  const [tIdx, setTIdx] = useState(0);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 700], [0, -180]);
  const heroOp = useTransform(scrollY, [0, 500], [1, 0]);

  useEffect(() => {
    const t = setInterval(() => setTIdx((i) => (i + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ background: "#020812", minHeight: "100vh", overflowX: "hidden", color: "#fff" }}>
      <Fonts />
      <ParticleBg />
      <Navbar />

      <>
        {/* Main Landing Content - All Visible */}
        <section
            style={{
              position: "relative",
              zIndex: 10,
              height: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(ellipse 80% 65% at 50% 42%,rgba(0,50,110,0.38) 0%,rgba(2,6,18,0.78) 100%)",
                zIndex: 1,
              }}
            />
            <Grid />
            <Scan />
            <motion.div style={{ y: heroY, opacity: heroOp, position: "relative", zIndex: 5, textAlign: "center", padding: "0 24px", maxWidth: 940 }}>
              <motion.div
                initial={{ opacity: 0, y: 70 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                <Chip>THINKNODE CLIENT PORTAL</Chip>
                <div style={{ ...F.display, fontSize: "clamp(3rem,8vw,6.2rem)", lineHeight: 1.06, marginBottom: 26 }}>
                  <span style={{ color: "#ffffff" }}>Build, Design,</span>
                  <br />
                  <span
                    style={{
                      background: "linear-gradient(90deg,#00d4ff,#a855f7)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    & Automate
                  </span>
                </div>
                <p style={{ ...F.body, fontSize: 20, color: "#cbd5e1", maxWidth: 600, margin: "0 auto 44px", lineHeight: 1.75 }}>
                  Professional freelance services for web, design, and automation. Precision-crafted for results.
                </p>
                <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
                  <motion.button
                    style={BTN.blue}
                    whileHover={{ scale: 1.07, boxShadow: "0 0 44px rgba(0,212,255,0.5)" }}
                    whileTap={{ scale: 0.97 }}
                  >
                    START PROJECT
                  </motion.button>
                  <motion.button
                    style={BTN.ghost}
                    whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255,255,255,0.2)" }}
                    whileTap={{ scale: 0.97 }}
                  >
                    VIEW SERVICES
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          </section>

          <Sec py={36} extra={{ borderTop: "1px solid rgba(0,200,255,0.12)", borderBottom: "1px solid rgba(0,200,255,0.12)" }}>
            <div
              style={{
                maxWidth: 1100,
                margin: "0 auto",
                display: "flex",
                justifyContent: "space-around",
                flexWrap: "wrap",
                gap: 32,
                position: "relative",
                zIndex: 5,
              }}
            >
              {[
                ["50", "+", "Projects Delivered"],
                ["100", "%", "Client Satisfaction"],
                ["5", "+", "Service Areas"],
                ["48", "h", "Avg. Delivery"],
              ].map(([n, s, l], i) => (
                <Reveal key={l} delay={i * 0.1}>
                  <div style={{ textAlign: "center" }}>
                    <div
                      style={{
                        ...F.head,
                        fontSize: 44,
                        color: "#00d4ff",
                        textShadow: "0 0 26px rgba(0,212,255,0.5)",
                      }}
                    >
                      <Count to={parseInt(n, 10)} suffix={s} />
                    </div>
                    <div style={{ ...F.mono, fontSize: 10, color: "#64748b", letterSpacing: "0.35em", marginTop: 5 }}>{l}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Sec>

          <Sec id="services">
            <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 5 }}>
              <Reveal>
                <div style={{ textAlign: "center", marginBottom: 72 }}>
                  <Chip>CAPABILITIES</Chip>
                  <H2>
                    Service <span style={{ color: "#00d4ff" }}>Modules</span>
                  </H2>
                </div>
              </Reveal>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 20 }}>
                {SERVICES.map((s, i) => (
                  <Reveal key={s.title} delay={i * 0.09}>
                    <motion.div
                      whileHover={{ y: -10, scale: 1.02 }}
                      style={{
                        padding: 38,
                        cursor: "pointer",
                        position: "relative",
                        overflow: "hidden",
                        background: "rgba(4,12,34,0.82)",
                        border: `1px solid ${s.accent}45`,
                        backdropFilter: "blur(12px)",
                        clipPath: "polygon(0 0,calc(100% - 22px) 0,100% 22px,100% 100%,22px 100%,0 calc(100% - 22px))",
                      }}
                    >
                      <motion.div
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          height: 2,
                          background: `linear-gradient(90deg,transparent,${s.accent},transparent)`,
                        }}
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
                      />
                      <div style={{ ...F.display, fontSize: 38, color: s.accent, marginBottom: 18 }}>{s.sym}</div>
                      <h3 style={{ ...F.sub, fontSize: 19, color: "#f1f5f9", marginBottom: 10, letterSpacing: "0.05em" }}>{s.title}</h3>
                      <p style={{ ...F.body, fontSize: 15, color: "#94a3b8", lineHeight: 1.75, margin: 0 }}>{s.desc}</p>
                      <div style={{ position: "absolute", bottom: 13, right: 17, ...F.mono, fontSize: 10, color: "#1e293b" }}>{String(i + 1).padStart(2, "0")}</div>
                    </motion.div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Sec>

          <Sec id="process">
            <div style={{ maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 5 }}>
              <Reveal>
                <div style={{ textAlign: "center", marginBottom: 80 }}>
                  <Chip>PROCESS</Chip>
                  <H2>
                    System <span style={{ color: "#00d4ff" }}>Protocol</span>
                  </H2>
                </div>
              </Reveal>
              <div style={{ display: "flex", flexDirection: "column", gap: 60 }}>
                {[
                  {
                    n: "01",
                    title: "Submit Your Project",
                    desc: "Share your brief, requirements, and vision. We analyse, scope, and confirm timelines within 24 hours.",
                  },
                  {
                    n: "02",
                    title: "We Build Your Solution",
                    desc: "Our engineers and designers execute with surgical precision. Real-time updates keep you informed.",
                  },
                  {
                    n: "03",
                    title: "Receive Your Project",
                    desc: "Final delivery with full handoff docs, source files, and post-delivery support - all included.",
                  },
                ].map((step, i) => (
                  <Reveal key={step.n} delay={i * 0.18}>
                    <div style={{ display: "flex", alignItems: "center", gap: 44, flexDirection: i % 2 === 1 ? "row-reverse" : "row" }}>
                      <div style={{ position: "relative", flexShrink: 0, width: 100, height: 100 }}>
                        <motion.div
                          style={{
                            width: 100,
                            height: 100,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: "rgba(0,212,255,0.09)",
                            border: "1px solid rgba(0,212,255,0.38)",
                            clipPath: "polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)",
                            ...F.head,
                            fontSize: 22,
                            color: "#00d4ff",
                          }}
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
                        >
                          {step.n}
                        </motion.div>
                        <motion.div
                          style={{
                            position: "absolute",
                            inset: -9,
                            clipPath: "polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)",
                            border: "1px solid rgba(0,212,255,0.18)",
                          }}
                          animate={{ scale: [1, 1.35, 1], opacity: [0.6, 0, 0.6] }}
                          transition={{ duration: 2.6, repeat: Infinity, delay: i * 0.9 }}
                        />
                      </div>
                      <div style={{ textAlign: i % 2 === 1 ? "right" : "left" }}>
                        <div style={{ ...F.mono, fontSize: 10, color: "#00d4ff", letterSpacing: "0.38em", marginBottom: 9 }}>STEP {step.n}</div>
                        <h3 style={{ ...F.sub, fontSize: 25, color: "#f1f5f9", marginBottom: 10 }}>{step.title}</h3>
                        <p
                          style={{
                            ...F.body,
                            fontSize: 16,
                            color: "#94a3b8",
                            lineHeight: 1.78,
                            maxWidth: 500,
                            margin: i % 2 === 1 ? "0 0 0 auto" : 0,
                          }}
                        >
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Sec>

          <Sec id="portfolio">
            <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 5 }}>
              <Reveal>
                <div style={{ textAlign: "center", marginBottom: 72 }}>
                  <Chip>PORTFOLIO</Chip>
                  <H2>
                    Delivered <span style={{ color: "#00d4ff" }}>Projects</span>
                  </H2>
                </div>
              </Reveal>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(340px,1fr))", gap: 16 }}>
                {PORTFOLIO.map((p, i) => (
                  <Reveal key={p.title} delay={i * 0.07}>
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      style={{
                        position: "relative",
                        height: 220,
                        overflow: "hidden",
                        cursor: "pointer",
                        background: `linear-gradient(135deg,${p.a},${p.b})`,
                        border: "1px solid rgba(255,255,255,0.07)",
                      }}
                    >
                      <Grid />
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        style={{
                          position: "absolute",
                          inset: 0,
                          background: "rgba(2,8,22,0.9)",
                          backdropFilter: "blur(5px)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexDirection: "column",
                          gap: 8,
                          zIndex: 5,
                        }}
                      >
                        <div style={{ ...F.mono, fontSize: 10, color: "#00d4ff", letterSpacing: "0.35em" }}>{p.tag}</div>
                        <div style={{ ...F.sub, fontSize: 20, color: "#ffffff" }}>{p.title}</div>
                        <div
                          style={{
                            ...F.mono,
                            fontSize: 10,
                            color: "#00d4ff",
                            border: "1px solid #00d4ff",
                            padding: "5px 16px",
                            letterSpacing: "0.25em",
                            marginTop: 10,
                          }}
                        >
                          VIEW PROJECT -
                        </div>
                      </motion.div>
                      <div style={{ position: "absolute", bottom: 20, left: 20, zIndex: 3 }}>
                        <div style={{ ...F.mono, fontSize: 9, color: "#64748b", letterSpacing: "0.3em" }}>{p.tag}</div>
                        <div style={{ ...F.sub, fontSize: 18, color: "#e2e8f0" }}>{p.title}</div>
                      </div>
                      <div style={{ position: "absolute", top: 16, right: 18, ...F.mono, fontSize: 10, color: "#1e293b" }}>
                        {String(i + 1).padStart(2, "0")}
                      </div>
                    </motion.div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Sec>

          <Sec>
            <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 5 }}>
              <Reveal>
                <div style={{ textAlign: "center", marginBottom: 72 }}>
                  <Chip>WHY THINKNODE</Chip>
                  <H2>
                    Core <span style={{ color: "#00d4ff" }}>Advantages</span>
                  </H2>
                </div>
              </Reveal>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(460px,1fr))", gap: 16 }}>
                {[
                  {
                    sym: "01",
                    title: "Fast Delivery",
                    desc: "48-hour turnaround on standard projects. We operate with urgency without sacrificing quality.",
                    accent: "#00d4ff",
                  },
                  {
                    sym: "02",
                    title: "Professional Quality",
                    desc: "Production-grade output on every engagement. No shortcuts, no compromise, no exceptions.",
                    accent: "#a855f7",
                  },
                  {
                    sym: "03",
                    title: "Custom Solutions",
                    desc: "Every project is built from scratch, tailored to your exact requirements and brand identity.",
                    accent: "#10b981",
                  },
                  {
                    sym: "04",
                    title: "Affordable Pricing",
                    desc: "Transparent, competitive rates with zero hidden fees. Maximum value, honest invoicing.",
                    accent: "#f59e0b",
                  },
                ].map((f, i) => (
                  <Reveal key={f.title} delay={i * 0.1}>
                    <motion.div
                      whileHover={{ x: 8 }}
                      style={{
                        display: "flex",
                        gap: 24,
                        padding: 36,
                        background: "rgba(4,12,34,0.76)",
                        border: "1px solid rgba(255,255,255,0.07)",
                        backdropFilter: "blur(10px)",
                      }}
                    >
                      <div style={{ ...F.display, fontSize: 40, color: f.accent, flexShrink: 0, lineHeight: 1 }}>{f.sym}</div>
                      <div>
                        <h3 style={{ ...F.sub, fontSize: 18, color: "#f1f5f9", marginBottom: 9, letterSpacing: "0.04em" }}>{f.title}</h3>
                        <p style={{ ...F.body, fontSize: 15, color: "#94a3b8", lineHeight: 1.78, margin: 0 }}>{f.desc}</p>
                      </div>
                    </motion.div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Sec>

          <Sec id="testimonials">
            <div style={{ maxWidth: 860, margin: "0 auto", position: "relative", zIndex: 5 }}>
              <Reveal>
                <div style={{ textAlign: "center", marginBottom: 72 }}>
                  <Chip>TESTIMONIALS</Chip>
                  <H2>
                    Client <span style={{ color: "#00d4ff" }}>Signals</span>
                  </H2>
                </div>
              </Reveal>
              <div style={{ minHeight: 280 }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={tIdx}
                    initial={{ opacity: 0, x: 80 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -80 }}
                    transition={{ duration: 0.68, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      padding: 52,
                      background: "rgba(4,12,34,0.88)",
                      backdropFilter: "blur(14px)",
                      border: "1px solid rgba(0,212,255,0.2)",
                      clipPath: "polygon(0 0,calc(100% - 34px) 0,100% 34px,100% 100%,34px 100%,0 calc(100% - 34px))",
                    }}
                  >
                    <div style={{ ...F.display, fontSize: 60, color: "#00d4ff", lineHeight: 0.8, marginBottom: 26 }}>
                      "
                    </div>
                    <p style={{ ...F.body, fontSize: 20, color: "#e2e8f0", lineHeight: 1.8, marginBottom: 40 }}>{TESTIMONIALS[tIdx].quote}</p>
                    <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                      <div
                        style={{
                          width: 54,
                          height: 54,
                          background: "linear-gradient(135deg,#00aaff,#6050ff)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          ...F.sub,
                          fontSize: 13,
                          color: "#fff",
                          flexShrink: 0,
                        }}
                      >
                        {TESTIMONIALS[tIdx].av}
                      </div>
                      <div>
                        <div style={{ ...F.sub, fontSize: 16, color: "#f1f5f9" }}>{TESTIMONIALS[tIdx].name}</div>
                        <div style={{ ...F.mono, fontSize: 10, color: "#64748b", letterSpacing: "0.3em", marginTop: 4 }}>
                          {TESTIMONIALS[tIdx].role}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
                <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 28 }}>
                  {TESTIMONIALS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setTIdx(i)}
                      style={{
                        width: 38,
                        height: 3,
                        border: "none",
                        cursor: "pointer",
                        background: i === tIdx ? "#00d4ff" : "rgba(255,255,255,0.12)",
                        transition: "background 0.3s",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </Sec>

          <Sec py={160}>
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "radial-gradient(ellipse 72% 72% at 50% 50%,rgba(0,80,160,0.2) 0%,rgba(80,0,160,0.1) 60%,transparent 100%)",
                zIndex: 2,
              }}
            />
            <div style={{ maxWidth: 820, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 5 }}>
              <Reveal>
                <Chip>INITIATE</Chip>
                <div style={{ ...F.display, fontSize: "clamp(2.4rem,6vw,4.6rem)", lineHeight: 1.1, marginBottom: 28 }}>
                  <span
                    style={{
                      background: "linear-gradient(135deg,#ffffff 0%,#00d4ff 55%,#a855f7 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    Ready to Start Your Project?
                  </span>
                </div>
                <p style={{ ...F.body, fontSize: 19, color: "#94a3b8", lineHeight: 1.78, marginBottom: 56 }}>
                  Submit your brief today. We will respond within 24 hours with a fully custom proposal.
                </p>
                <motion.button
                  style={{ ...BTN.blue, fontSize: 14, padding: "18px 60px", position: "relative", overflow: "hidden" }}
                  whileHover={{ scale: 1.07, boxShadow: "0 0 64px rgba(0,212,255,0.5)" }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate('/login')}
                >
                  START YOUR PROJECT -
                  <motion.div
                    style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,0.18)" }}
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "linear", repeatDelay: 0.8 }}
                  />
                </motion.button>
              </Reveal>
            </div>
          </Sec>

          <Sec py={40} extra={{ borderTop: "1px solid rgba(0,200,255,0.1)" }}>
            <div
              style={{
                maxWidth: 1200,
                margin: "0 auto",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 24,
                position: "relative",
                zIndex: 5,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ position: "relative", width: 28, height: 28 }}>
                  <motion.div
                    style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "1.5px solid #00d4ff" }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                  />
                </div>
                <span style={{ ...F.head, fontSize: 15, letterSpacing: "0.28em", color: "#fff" }}>
                  THINK<span style={{ color: "#00d4ff" }}>NODE</span>
                </span>
              </div>
              <div style={{ ...F.mono, fontSize: 10, color: "#334155", letterSpacing: "0.3em" }}>
                (c) 2025 THINKNODE - ALL SYSTEMS OPERATIONAL.
              </div>
              <div style={{ display: "flex", gap: 32 }}>
                {["Services", "Portfolio", "Contact"].map((item) => (
                  <a
                    key={item}
                    href="#"
                    style={{
                      ...F.mono,
                      fontSize: 10,
                      color: "#475569",
                      textDecoration: "none",
                      letterSpacing: "0.3em",
                      textTransform: "uppercase",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = "#00d4ff";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = "#475569";
                    }}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </Sec>
        </>
      </div>
    );
  }
