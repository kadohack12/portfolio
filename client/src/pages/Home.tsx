// Circuit de Lumen — expérience éditoriale interactive : signal cyan, ambiance contrôlable et dossiers explorables.
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  Bot,
  BrainCircuit,
  ChevronRight,
  CircleDot,
  Code2,
  Copy,
  Cpu,
  Crosshair,
  DatabaseZap,
  Layers3,
  LockKeyhole,
  Menu,
  Network,
  Radar,
  ShieldCheck,
  Sparkles,
  SquareTerminal,
  X,
  Zap,
  MousePointer2,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const HERO_IMAGE = "/media/hero.svg";
const SIGNAL_IMAGE = "/media/signal.svg";
const CORE_IMAGE = "/media/core.svg";
const LOGO_MARK = "/media/mark.svg";

const navItems = [
  { label: "Profil", target: "profil" },
  { label: "CV SOC", target: "soc" },
  { label: "Projets", target: "projets" },
  { label: "Stack", target: "stack" },
  { label: "Parcours", target: "parcours" },
];

const projects = [
  {
    code: "AI-01",
    eyebrow: "Agentic AI · Google Cloud / Devpost",
    title: "Agentic Cinema",
    description:
      "Architecture d’agents autonomes multi-étapes pensée pour transformer un objectif complexe en une séquence d’actions cohérente, observable et connectée.",
    detail: "Gemini API · ADK · MCP · orchestration",
    dossier:
      "Concevoir des agents capables de fragmenter une intention complexe, de choisir leurs outils et de faire remonter les résultats dans une chaîne lisible. Le cœur du travail : l’orchestration, la traçabilité et les connexions permises par MCP.",
    tags: ["Gemini API", "ADK", "MCP"],
    icon: BrainCircuit,
    visual: "visual-signal",
    image: SIGNAL_IMAGE,
    link: null,
  },
  {
    code: "SEC-02",
    eyebrow: "Recherche sécurité · Réseau / Linux",
    title: "ICMP Ghost Tunnel",
    description:
      "Expérimentation de stéganographie réseau autour des paquets ICMP, utilisée comme support d’analyse des canaux de communication, de la détection et du durcissement.",
    detail: "Python · ICMP · Wireshark · analyse réseau",
    dossier:
      "Explorer la frontière entre les paquets de contrôle et les canaux de communication discrets afin de mieux analyser les flux, les scénarios de détection et le comportement réseau sous Linux.",
    tags: ["Python", "ICMP", "Wireshark"],
    icon: Network,
    visual: "visual-core",
    image: CORE_IMAGE,
    link: null,
  },
  {
    code: "OPS-03",
    eyebrow: "Automation · Veille IA / Cyber",
    title: "Signal Dispatch",
    description:
      "Pipeline de veille qui relie des sources RSS, des automatisations et des agents locaux pour transformer un flux d’information en signal exploitable.",
    detail: "n8n · RSS · Telegram · Ollama / CrewAI",
    dossier:
      "Transformer la veille en un système actif : capter, filtrer, synthétiser et diffuser une information pertinente vers les bons canaux au lieu de laisser le signal se perdre dans le bruit.",
    tags: ["n8n", "RSS", "Agents locaux"],
    icon: Radar,
    visual: "visual-grid",
    image: null,
    link: null,
  },
  {
    code: "SEC-04",
    eyebrow: "Sécurité offensive · Sliver C2 · LLM locaux",
    title: "AdversarySim-AI",
    description:
      "Assistant IA orienté purple teaming et émulation d’adversaire. Il relie un cadre de commande Sliver C2 à des modèles locaux pour entraîner la détection sans sortir du périmètre autorisé.",
    detail: "Python · Ollama · Sliver C2",
    dossier:
      "Un projet de recherche défensive : simuler un adversaire pour mieux comprendre ce qu’il laisse comme traces. Le travail porte sur la sécurité par conception, la journalisation des actions et l’exécution strictement locale des modèles, afin qu’aucune donnée ne quitte la machine.",
    tags: ["Python", "Sliver C2", "Ollama"],
    icon: BrainCircuit,
    visual: "visual-signal",
    image: SIGNAL_IMAGE,
    link: "https://github.com/kadohack12/AdversarySim-AI",
  },
  {
    code: "SEC-05",
    eyebrow: "Audit de sécurité · Go · Zéro dépendance",
    title: "Lockstate",
    description:
      "Outil d’audit de sécurité local livré en un seul binaire. Aucune dépendance à l’exécution, aucun envoi de données : l’analyse reste entièrement sur la machine auditée.",
    detail: "Go · binaire unique · offline",
    dossier:
      "Les outils d’audit existants sont souvent trop lourds à déployer ou trop dépendants de leur environnement. Lockstate prend le problème à l’envers : un binaire autonome, qui s’exécute hors ligne et produit un rapport lisible sans rien transmettre.",
    tags: ["Go", "Offline", "Zéro dépendance"],
    icon: ShieldCheck,
    visual: "visual-core",
    image: CORE_IMAGE,
    link: "https://github.com/kadohack12/Lockstate",
  },
  {
    code: "SEC-06",
    eyebrow: "Détection d’arnaques · SafeSpace Hacks",
    title: "CheckSafe",
    description:
      "Détecteur d’arnaques numériques pensé pour le grand public. L’objectif : aider quelqu’un qui n’a aucune connaissance technique à décider si un message est fiable.",
    detail: "JavaScript · React · Vercel",
    dossier:
      "Une interface calme pour une décision stressante. L’utilisateur colle un message suspect et reçoit une lecture claire des signaux d’alerte, sans jargon ni verdict alarmiste. Construit pour SafeSpace Hacks.",
    tags: ["JavaScript", "React", "Grand public"],
    icon: Radar,
    visual: "visual-grid",
    image: null,
    link: "https://check-safe-beryl.vercel.app",
  },
  {
    code: "OPS-07",
    eyebrow: "Automatisation · Bots multi-canal",
    title: "LootZero Engine",
    description:
      "Moteur autonome qui traque les jeux payants devenus gratuits à durée illimitée, puis diffuse l’information sur Discord, Telegram et Facebook sans intervention manuelle.",
    detail: "Python · GitHub Actions · Multi-canal",
    dossier:
      "La plupart des plateformes de bons plans mélangent gratuit et free-to-play, ce qui noie le signal utile. LootZero filtre ce bruit à la source et ne retient que les jeux réellement conservables, avec une diffusion automatisée sur plusieurs canaux.",
    tags: ["Python", "Automation", "Bots"],
    icon: SquareTerminal,
    visual: "visual-signal",
    image: SIGNAL_IMAGE,
    link: "https://github.com/kadohack12/lootzero-engine",
  },
  {
    code: "OPS-08",
    eyebrow: "Durcissement · Windows & Linux",
    title: "System Hardening Hub",
    description:
      "Ensemble de scripts, politiques et configurations de durcissement réunis par système d’exploitation, pour appliquer des bases de sécurité solides sans repartir de zéro.",
    detail: "Shell · Windows · Linux",
    dossier:
      "Un dépôt de référence plutôt qu’un outil unique : les réglages de durcissement sont classés par système et documentés, pour être repris, adaptés et vérifiés facilement selon l’environnement cible.",
    tags: ["Shell", "Windows", "Linux"],
    icon: Cpu,
    visual: "visual-grid",
    image: null,
    link: "https://github.com/kadohack12/system-hardening-hub",
  },
];

const competencyGroups = [
  {
    number: "01",
    title: "Security Research",
    icon: ShieldCheck,
    items: ["Reconnaissance & énumération web", "Linux privilege escalation", "Analyse de paquets & ICMP", "Rapports de vulnérabilités"],
  },
  {
    number: "02",
    title: "IA locale & agents",
    icon: Bot,
    items: ["LLM locaux via Ollama", "Agents autonomes outillés", "Émulation d’adversaire assistée", "Automatisation de l’analyse"],
  },
  {
    number: "03",
    title: "Automatisation",
    icon: SquareTerminal,
    items: ["Python & Bash", "GitHub Actions & CI", "Bots Discord / Telegram", "Veille technique structurée"],
  },
  {
    number: "04",
    title: "Bases matérielles",
    icon: Cpu,
    items: ["Arduino & électronique", "Grafcet / automatismes", "Logique F3 / STI", "Systèmes séquentiels"],
  },
];

const timeline = [
  { date: "Fondations", title: "Électrotechnique & systèmes", text: "DT/STI et BAC F3 : une lecture matérielle des systèmes avant d’en explorer les couches logicielles." },
  { date: "Terrain", title: "CTF, labs et apprentissage offensif", text: "Progression continue sur HTB, TryHackMe, Root-Me, Bugcrowd et des scénarios d’audit web contrôlés." },
  { date: "Collectif", title: "HackerLab / ASIN et communautés", text: "Participation à l’écosystème tech et cyber du Bénin, avec une approche orientée challenge et partage." },
  { date: "Maintenant", title: "IA agentique appliquée", text: "Conception d’agents, d’automatisations et de protocoles pour augmenter la qualité de l’analyse technique." },
];

const riseIn = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.62, ease: [0.23, 1, 0.32, 1] as const } },
};

function scrollToSection(target: string) {
  document.getElementById(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[number] | null>(null);
  const [introVisible, setIntroVisible] = useState(true);
  const [cursorActive, setCursorActive] = useState(false);
  const [showAllBadges, setShowAllBadges] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateNav = () => {
      setScrolled(window.scrollY > 30);
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(maxScroll > 0 ? Math.min(100, (window.scrollY / maxScroll) * 100) : 0);
    };
    updateNav();
    window.addEventListener("scroll", updateNav, { passive: true });
    return () => window.removeEventListener("scroll", updateNav);
  }, []);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedProject(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) {
      setIntroVisible(false);
      return;
    }
    const bootTimer = window.setTimeout(() => setIntroVisible(false), 1750);
    return () => window.clearTimeout(bootTimer);
  }, []);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!finePointer.matches) return;
    const updateCursor = (event: PointerEvent) => {
      cursorRef.current?.style.setProperty("--cursor-x", `${event.clientX}px`);
      cursorRef.current?.style.setProperty("--cursor-y", `${event.clientY}px`);
    };
    const updateCursorMode = (event: PointerEvent) => {
      const target = event.target as Element;
      setCursorActive(Boolean(target.closest("a, button, [role='button'], input, textarea, select")));
    };
    document.addEventListener("pointermove", updateCursor, { passive: true });
    document.addEventListener("pointerover", updateCursorMode, { passive: true });
    return () => {
      document.removeEventListener("pointermove", updateCursor);
      document.removeEventListener("pointerover", updateCursorMode);
    };
  }, []);

  const handleNav = (target: string) => {
    setMenuOpen(false);
    scrollToSection(target);
  };

  const copySignature = async () => {
    try {
      await navigator.clipboard.writeText("Kadohack12 — Cybersecurity · Agentic AI · Automation");
      toast.success("Signature Kadohack12 copiée.");
    } catch {
      toast.message("Kadohack12 — Cybersecurity · Agentic AI · Automation");
    }
  };

  const trackPointer = (event: React.PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--pointer-x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--pointer-y", `${event.clientY - rect.top}px`);
  };

  return (
    <div className="lumen-site">
      <div ref={cursorRef} className={`precision-cursor ${cursorActive ? "is-active" : ""}`} aria-hidden="true"><i /><span>{cursorActive ? "OPEN" : "SCAN"}</span></div>
      <div className="visit-progress" style={{ transform: `scaleX(${scrollProgress / 100})` }} aria-hidden="true" />
      <div className="aurora-lattice" aria-hidden="true"><i /><i /><i /></div>
      <div className="ambient-orb ambient-orb-one" aria-hidden="true" />
      <div className="ambient-orb ambient-orb-two" aria-hidden="true" />

      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <a className="brand-lockup" href="#top" aria-label="Retour en haut" onClick={() => scrollToSection("top")}>
          <span className="brand-emblem"><img src={LOGO_MARK} alt="" /></span>
          <span className="brand-word">KADO<span>/</span>HACK12</span>
        </a>

        <nav className="desktop-nav" aria-label="Navigation principale">
          {navItems.map((item) => (
            <button key={item.target} className="nav-link" onClick={() => handleNav(item.target)}>
              {item.label}
            </button>
          ))}
        </nav>

        <button className="nav-contact" onClick={() => handleNav("contact")}>
          Établir le contact <ArrowUpRight size={15} />
        </button>

        <button className="mobile-trigger" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"} aria-expanded={menuOpen}>
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </header>

      <div className={`mobile-nav ${menuOpen ? "open" : ""}`}>
        {navItems.map((item) => (
          <button key={item.target} onClick={() => handleNav(item.target)}>{item.label}<ArrowDownRight size={18} /></button>
        ))}
      </div>

      <main id="top">
        <section className="hero-section section-frame" onPointerMove={trackPointer}>
          <div className="signal-rail hero-rail" aria-hidden="true"><span>00 / INIT</span><i /><i /><i /><b /></div>
          <div className="hero-art" aria-hidden="true" style={{ backgroundImage: `url(${HERO_IMAGE})` }} />
          <div className="hero-texture" aria-hidden="true" />
          <div className="hero-reticle" aria-hidden="true"><i /><i /><b /></div>
          <div className="hero-motes" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>
          <div className="hero-copy">
            <motion.div initial="hidden" animate="visible" variants={riseIn} className="eyebrow-line">
              <span className="live-dot" /> PORTO-NOVO, BÉNIN <i /> CYBERSECURITY · AGENTIC AI
            </motion.div>
            <motion.h1 initial="hidden" animate="visible" variants={riseIn} transition={{ delay: 0.06 }}>
              Déconstruire<br />le système.<br /><em>Lire le signal.</em>
            </motion.h1>
            <motion.p initial="hidden" animate="visible" variants={riseIn} transition={{ delay: 0.12 }}>
              Je suis <strong>Kadmiel Trésor Ligan</strong>, alias Kadohack12. Je relie cybersécurité, IA agentique et automatisation pour comprendre les systèmes jusque dans leurs couches les moins visibles.
            </motion.p>
            <motion.div className="hero-actions" initial="hidden" animate="visible" variants={riseIn} transition={{ delay: 0.18 }}>
              <button className="action-primary" onClick={() => scrollToSection("projets")}>Explorer les projets <ArrowDownRight size={19} /></button>
              <button className="text-action" onClick={() => scrollToSection("profil")}>Lire le manifeste <ChevronRight size={17} /></button>
            </motion.div>
          </div>
          <motion.button className="hero-status-card" type="button" onClick={() => setSelectedProject(projects[0])} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.45, duration: 0.7 }} aria-label="Ouvrir le premier dossier de projet">
            <div className="status-top"><span>MODE / ACTIVE</span><CircleDot size={15} /></div>
            <div className="status-metric"><b>04</b><span>domaines<br />d’exploration</span></div>
            <div className="status-scan"><span>OPEN SIGNAL / 100%</span><i /></div>
            <span className="status-hover">OUVRIR LE DOSSIER <ArrowUpRight size={12} /></span>
          </motion.button>
          <a className="scroll-cue" href="#profil" onClick={() => scrollToSection("profil")}><span>SCROLL TO EXPLORE</span><i /></a>
          <div className="hero-pointer-note"><MousePointer2 size={14} /> SURVOLEZ LE SIGNAL</div>
        </section>

        <section id="profil" className="profile-section section-frame">
          <div className="signal-rail" aria-hidden="true"><span>01 / PROFILE</span><i /><i /><b /></div>
          <motion.div className="section-intro offset-left" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={riseIn}>
            <div className="section-kicker"><span>01</span> MANIFESTE</div>
            <h2>La curiosité est<br /><em>une méthode.</em></h2>
          </motion.div>
          <motion.div className="profile-statement" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={riseIn}>
            <p className="statement-lead">« Si ça peut être analysé, automatisé ou optimisé, je suis déjà dessus. »</p>
            <p>Issu d’une base en électrotechnique et systèmes industriels, je navigue aujourd’hui entre analyse de sécurité, scripts réseau, agents intelligents et automatisations. Mon approche : observer les interactions, identifier la logique, puis construire des outils qui rendent le système plus lisible et plus robuste.</p>
            <div className="profile-meta">
              <span><Crosshair size={15} /> CTF & security labs</span>
              <span><Sparkles size={15} /> IA agentique appliquée</span>
              <span><Code2 size={15} /> Scripts & workflows</span>
            </div>
          </motion.div>
          <motion.div className="profile-specs" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={riseIn}>
            <div><span>LABORATOIRES</span><strong>HTB · THM · Root-Me</strong></div>
            <div><span>STACK PRINCIPALE</span><strong>Python · Go · Bash</strong></div>
            <div><span>FOCUS ACTUEL</span><strong>IA locale & recherche offensive</strong></div>
          </motion.div>
        </section>

        <section id="soc" className="soc-section section-frame">
          <div className="signal-rail" aria-hidden="true"><span>02 / SOC DOSSIER</span><i /><i /><i /><b /></div>
          <motion.div className="soc-heading" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={riseIn}>
            <div className="section-kicker"><span>02</span> DOSSIER SOC</div>
            <h2>Observer.<br /><em>Trier. Répondre.</em></h2>
            <p>Un profil junior orienté triage et investigation, construit par la pratique des labs, l’analyse des signaux et l’automatisation des tâches répétitives.</p>
            <div className="soc-actions">
              <a className="soc-profile-link" href="https://tryhackme.com/p/kadohack12" target="_blank" rel="noreferrer">Ouvrir le profil TryHackMe <ArrowUpRight size={16} /></a>
              
            </div>
          </motion.div>
          <motion.div className="soc-dashboard" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={riseIn}>
            <div className="soc-metric-grid">
              <div className="soc-metric soc-metric-featured"><span>RANKING / THM</span><strong>TOP 4%</strong><small>Communauté mondiale</small></div>
              <div className="soc-metric"><span>ROOMS</span><strong>83</strong><small>Completed rooms</small></div>
              <div className="soc-metric"><span>STREAK</span><strong>14</strong><small>Jours actifs affichés</small></div>
              <div className="soc-metric"><span>LEAGUES</span><strong>OR · PLATINE</strong><small>Classements compétitifs</small></div>
            </div>
            <div className="soc-signal-panel">
              <div className="soc-panel-head"><span><i /> SIGNALS / FIELD NOTES</span><span>kadohack12</span></div>
              <div className="soc-skill-row"><span>Alert triage & log analysis</span><b aria-hidden="true"><i style={{ width: "88%" }} /></b><em>ACTIVE</em></div>
              <div className="soc-skill-row"><span>Linux hardening & PrivEsc</span><b aria-hidden="true"><i style={{ width: "92%" }} /></b><em>ACTIVE</em></div>
              <div className="soc-skill-row"><span>Network / ICMP investigation</span><b aria-hidden="true"><i style={{ width: "84%" }} /></b><em>ACTIVE</em></div>
              <div className="soc-skill-row"><span>Python & Bash automation</span><b aria-hidden="true"><i style={{ width: "90%" }} /></b><em>ACTIVE</em></div>
            </div>
            <div className="soc-badges">
              <div className="soc-panel-head"><span>BADGES / FIELD NOTES</span><button onClick={() => setShowAllBadges((value) => !value)}>{showAllBadges ? "Réduire" : "Voir la sélection"}</button></div>
              <div className="badge-list">
                {["Linux PrivEsc", "Hash Cracker", "Mr. Robot", "OhSINT", "Security Awareness", ...(showAllBadges ? ["30 Day Streak", "SNOW/OFF", "3 Million Legend"] : [])].map((badge) => <span key={badge}><i />{badge}</span>)}
              </div>
            </div>
          </motion.div>
        </section>
        <section id="projets" className="projects-section section-frame">
          <div className="signal-rail" aria-hidden="true"><span>03 / WORK</span><i /><i /><i /><b /></div>
          <motion.div className="section-heading" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={riseIn}>
            <div className="section-kicker"><span>02</span> JOURNAL D’OPÉRATIONS</div>
            <h2>Des systèmes à<br /><em>faire parler.</em></h2>
            <p>Chaque projet est une surface d’expérimentation : apprendre, instrumenter, connecter et documenter.</p>
          </motion.div>
          <div className="project-list">
            {projects.map((project, index) => {
              const Icon = project.icon;
              return (
                <motion.article key={project.code} className={`project-card ${project.visual}`} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.16 }} variants={riseIn} transition={{ delay: index * 0.06 }} onClick={() => setSelectedProject(project)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") setSelectedProject(project); }} tabIndex={0} role="button" aria-label={`Ouvrir le dossier ${project.title}`}>
                  <div className="project-visual" aria-hidden="true">
                    {project.image ? <img src={project.image} alt="" /> : <div className="grid-pulse"><i /><i /><i /><span /></div>}
                    <div className="visual-glass" />
                    <span className="project-code">{project.code}</span>
                  </div>
                  <div className="project-content">
                    <div className="project-topline"><span>{project.eyebrow}</span><span className="operation-state"><i /> DOSSIER ACTIF <Icon size={17} /></span></div>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="project-footer">
                      <div className="tag-list">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                      <span className="project-detail">{project.detail}<b>Ouvrir le dossier <ArrowUpRight size={12} /></b></span>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </section>

        <section id="stack" className="stack-section section-frame">
          <div className="signal-rail" aria-hidden="true"><span>04 / STACK</span><i /><i /><b /></div>
          <motion.div className="stack-header" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={riseIn}>
            <div className="section-kicker"><span>04</span> OUTILS & MÉTHODES</div>
            <h2>Une stack qui traverse<br /><em>les couches.</em></h2>
          </motion.div>
          <div className="competency-grid">
            {competencyGroups.map((group, index) => {
              const Icon = group.icon;
              return (
                <motion.article className="competency-card" key={group.number} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.18 }} variants={riseIn} transition={{ delay: index * 0.05 }}>
                  <div className="competency-index"><span>{group.number}</span><Icon size={22} /></div>
                  <h3>{group.title}</h3>
                  <ul>{group.items.map((item) => <li key={item}><i />{item}</li>)}</ul>
                </motion.article>
              );
            })}
          </div>
          <div className="tool-belt" aria-label="Technologies utilisées">
            <span><DatabaseZap size={16} /> Python</span><span>Go</span><span>Shell</span><span>JavaScript</span><span>Linux</span><span>Ollama</span><span>Sliver C2</span><span>Wireshark</span><span>GitHub Actions</span>
          </div>
        </section>

        <section id="parcours" className="timeline-section section-frame">
          <div className="signal-rail" aria-hidden="true"><span>05 / PATH</span><i /><i /><i /><b /></div>
          <motion.div className="timeline-title" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={riseIn}>
            <div className="section-kicker"><span>05</span> TRAJECTOIRE</div>
            <h2>De la logique<br />au <em>signal.</em></h2>
          </motion.div>
          <div className="timeline-list">
            {timeline.map((item, index) => (
              <motion.article className="timeline-item" key={item.title} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={riseIn} transition={{ delay: index * 0.04 }}>
                <div className="timeline-node"><span>{String(index + 1).padStart(2, "0")}</span><i /></div>
                <div className="timeline-date">{item.date}</div>
                <div className="timeline-copy"><h3>{item.title}</h3><p>{item.text}</p></div>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="contact" className="contact-section section-frame">
          <div className="contact-grid" aria-hidden="true" />
          <motion.div className="contact-copy" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={riseIn}>
            <div className="section-kicker"><span>06</span> CANAL OUVERT</div>
            <h2>Un système à<br /><em>sonder ?</em></h2>
            <p>Disponible pour collaborer sur des projets cyber, IA, automatisation et des défis où il faut aller plus loin que la surface.</p>
            <div className="contact-actions">
              <button className="action-primary" onClick={copySignature}>Copier la signature <Copy size={17} /></button>
              <a className="contact-subtle" href="#top" onClick={() => scrollToSection("top")}>Retour au signal <ArrowUpRight size={16} /></a>
            </div>
          </motion.div>
          <motion.div className="contact-chip" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.55 }}>
            <div className="chip-mark"><img src={LOGO_MARK} alt="" /></div>
            <span>STATUS</span><strong>READY FOR<br />THE NEXT CHALLENGE</strong><i />
          </motion.div>
        </section>
      </main>

      <AnimatePresence>
        {selectedProject && (
          <motion.div className="project-modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={() => setSelectedProject(null)}>
            <motion.section className="project-modal" role="dialog" aria-modal="true" aria-label={`Dossier ${selectedProject.title}`} initial={{ opacity: 0, y: 26, scale: 0.985 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 18, scale: 0.99 }} transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] as const }} onMouseDown={(event) => event.stopPropagation()}>
              <div className="modal-grid" aria-hidden="true" />
              <button className="modal-close" onClick={() => setSelectedProject(null)} aria-label="Fermer le dossier"><X size={18} /></button>
              <div className="modal-code">DOSSIER / {selectedProject.code}</div>
              <div className="modal-icon">{(() => { const Icon = selectedProject.icon; return <Icon size={26} />; })()}</div>
              <p className="modal-eyebrow">{selectedProject.eyebrow}</p>
              <h2>{selectedProject.title}</h2>
              <p className="modal-lead">{selectedProject.dossier}</p>
              <div className="modal-meta"><span><LockKeyhole size={14} /> RESEARCH LOG</span><span><Layers3 size={14} /> {selectedProject.detail}</span></div>
              <div className="modal-tags">{selectedProject.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              {selectedProject.link && <a className="modal-link" href={selectedProject.link} target="_blank" rel="noreferrer">Ouvrir le projet <ArrowUpRight size={16} /></a>}
              <button className="modal-next" onClick={() => { setSelectedProject(null); scrollToSection("stack"); }}>Voir les outils mobilisés <ArrowDownRight size={17} /></button>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {introVisible && (
          <motion.section className="boot-sequence" aria-label="Initialisation du système" initial={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.36 } }}>
            <div className="boot-grid" aria-hidden="true" />
            <motion.div className="boot-core" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.42, ease: [0.23, 1, 0.32, 1] as const }}>
              <span className="boot-label"><i /> KADOHACK12 / SECURE SESSION</span>
              <div className="boot-mark"><img src={LOGO_MARK} alt="" /></div>
              <h2>Système<br /><em>en ligne.</em></h2>
              <div className="boot-progress"><span>INITIALISATION DES CAPTEURS</span><i /></div>
              <button className="boot-skip" onClick={() => setIntroVisible(false)}>Passer l’intro <ChevronRight size={15} /></button>
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>

      <footer className="site-footer">
        <span>© {new Date().getFullYear()} KADOHACK12</span>
        <span>BUILT FOR CURIOSITY <Zap size={13} /></span>
        <button onClick={() => scrollToSection("top")}>TOP <ArrowUpRight size={13} /></button>
      </footer>
    </div>
  );
}
