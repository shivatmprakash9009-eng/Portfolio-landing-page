import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import {
  ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, Aperture, Check,
  Code2, Compass, ExternalLink, Layers3, Mail, Menu, Monitor, MoveUpRight,
  Sparkles, Workflow, X, Zap
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const photos = [
  'https://i.ibb.co/zTPY8sXp/jdpereiro-office-space-1744805.jpg',
  'https://i.ibb.co/m5GhB3Bs/pexels-chairs-2181951.jpg',
  'https://i.ibb.co/nqw59ZcJ/pexels-chairs-2181960.jpg'
];

const projects = [
  {
    n: '01',
    title: 'Workswell',
    type: 'PRODUCT DESIGN / WORKSPACE',
    year: 'CONCEPT 2026',
    image: photos[0],
    tags: ['Product strategy', 'Discovery UX', 'Responsive web'],
    intro: 'A more human way to find your next place to think.',
    brief: 'Hybrid teams have more choice than ever, but finding the right place to work can still feel fragmented. Workswell is a concept for making that choice calmer, clearer and more personal.',
    approach: 'A location-first discovery flow, useful space details and a booking path designed to remove hesitation instead of adding more filters.',
    outcome: 'A complete product direction for a flexible workspace experience — from the first search to the moment a team arrives.'
  },
  {
    n: '02',
    title: 'Roomtone',
    type: 'DIGITAL EXPERIENCE / HOSPITALITY',
    year: 'CONCEPT 2026',
    image: photos[1],
    tags: ['Art direction', 'Experience design', 'Design system'],
    intro: 'Digital hospitality with a quieter point of view.',
    brief: 'Roomtone imagines a digital home for distinctive spaces, studios and small-scale stays — built for people who care about the feeling of a place as much as its features.',
    approach: 'Editorial typography, generous imagery and a restrained interface help the character of each space lead. The interaction model stays simple from exploration through enquiry.',
    outcome: 'A cohesive visual and interaction system for a hospitality brand that wants to feel considered, not overproduced.'
  },
  {
    n: '03',
    title: 'Openhouse',
    type: 'PLATFORM CONCEPT / COMMUNITY',
    year: 'CONCEPT 2026',
    image: photos[2],
    tags: ['Information architecture', 'Interaction', 'Prototyping'],
    intro: 'Making local creative spaces easier to discover.',
    brief: 'Independent venues and creative communities are often hard to find unless you already know where to look. Openhouse is a directory concept for bringing those places into view.',
    approach: 'A clear browsing structure, place-led storytelling and lightweight saved lists turn a broad collection into a useful personal shortlist.',
    outcome: 'A scalable foundation for a community-led space directory, with clarity and character given equal weight.'
  }
];

const capabilities = [
  { number: '01', icon: Compass, title: 'Product thinking', text: 'Find the real problem, align around the right question, and give a good idea a clear direction.' },
  { number: '02', icon: Aperture, title: 'Experience design', text: 'Shape interfaces with a strong visual point of view and interaction patterns that feel natural.' },
  { number: '03', icon: Code2, title: 'Creative development', text: 'Bring the details to life with responsive engineering, purposeful motion and durable systems.' }
];

const process = [
  { n: '01', title: 'Listen closely', text: 'Understand the people, context and friction behind the brief before jumping to a solution.' },
  { n: '02', title: 'Find the signal', text: 'Turn complexity into a clear point of view, a focused scope and a direction worth exploring.' },
  { n: '03', title: 'Make it tangible', text: 'Prototype the experience early, test the assumptions and give the best ideas a shape.' },
  { n: '04', title: 'Polish the feeling', text: 'Refine the transitions, responsive behaviour and small details that make a product feel complete.' }
];

function Reveal({ children, className = '', delay = 0 }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={['reveal', className].filter(Boolean).join(' ')}
      initial={reduced ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: reduced ? 0 : 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function ProjectCard({ project, onOpen, index }) {
  return (
    <Reveal className="project-card" delay={index * 0.08}>
      <article>
        <button className="project-visual-button" onClick={() => onOpen(project)} aria-label={'Explore the ' + project.title + ' concept'}>
          <div className="project-image">
            <img className="parallax-media" src={project.image} alt={project.title + ' workspace concept'} loading="lazy" />
            <span className="project-count mono">{project.n} / 03</span>
            <span className="project-open"><ArrowUpRight size={21} /></span>
            <span className="image-wash" />
          </div>
        </button>
        <div className="project-meta"><span>{project.type}</span><span>{project.year}</span></div>
        <div className="project-title-row">
          <h3>{project.title}<span>.</span></h3>
          <button className="project-inline-arrow" onClick={() => onOpen(project)} aria-label={'Read ' + project.title}><ArrowUpRight size={19} /></button>
        </div>
        <p className="project-intro">{project.intro}</p>
        <div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
      </article>
    </Reveal>
  );
}

function App() {
  const rootRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('Home');
  const [selectedProject, setSelectedProject] = useState(null);
  const reduced = useReducedMotion();

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 90, damping: 20, mass: 0.7 });
  const springY = useSpring(pointerY, { stiffness: 90, damping: 20, mass: 0.7 });
  const rotateY = useTransform(springX, [-1, 1], [-5, 5]);
  const rotateX = useTransform(springY, [-1, 1], [4, -4]);

  useEffect(() => {
    if (reduced) return undefined;
    const ctx = gsap.context(() => {
      gsap.set('.scroll-progress-fill', { scaleX: 0, transformOrigin: 'left center' });
      gsap.to('.scroll-progress-fill', {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { trigger: document.documentElement, start: 'top top', end: 'bottom bottom', scrub: 0.2 }
      });

      gsap.from('.hero-kicker, .hero-title-line, .hero-description, .hero-actions, .hero-metrics', {
        y: 32, opacity: 0, duration: 0.95, stagger: 0.1, ease: 'power3.out', delay: 0.12,
        clearProps: 'all'
      });
      gsap.from('.hero-art-shell', {
        y: 42, opacity: 0, scale: 0.96, duration: 1.2, ease: 'power3.out', delay: 0.25,
        clearProps: 'all'
      });

      gsap.to('.hero-art', {
        yPercent: -13,
        ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.6 }
      });
      gsap.to('.hero-orbit-a', { rotate: 360, duration: 45, repeat: -1, ease: 'none' });
      gsap.to('.hero-orbit-b', { rotate: -360, duration: 62, repeat: -1, ease: 'none' });
      gsap.to('.hero-spark', { y: -15, x: 8, duration: 2.8, yoyo: true, repeat: -1, ease: 'sine.inOut' });

      gsap.utils.toArray('.section-index').forEach((el) => {
        gsap.from(el, {
          x: -18, opacity: 0, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 87%', once: true }
        });
      });
      gsap.utils.toArray('.project-image').forEach((el) => {
        const img = el.querySelector('.parallax-media');
        if (!img) return;
        gsap.fromTo(img, { yPercent: -7, scale: 1.08 }, {
          yPercent: 7, scale: 1.08, ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 0.5 }
        });
      });
      gsap.utils.toArray('.process-row').forEach((el) => {
        gsap.from(el.querySelector('.process-rule'), {
          scaleX: 0, transformOrigin: 'left center', duration: 1,
          scrollTrigger: { trigger: el, start: 'top 85%', once: true }
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reduced]);

  useEffect(() => {
    const ids = ['home', 'about', 'expertise', 'work', 'approach'];
    const observers = ids.map((id) => {
      const element = document.getElementById(id);
      if (!element) return null;
      const observer = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return;
        const labels = { home: 'Home', about: 'About', expertise: 'Expertise', work: 'Work', approach: 'Approach' };
        setActive(labels[id]);
      }, { rootMargin: '-36% 0px -55% 0px' });
      observer.observe(element);
      return observer;
    });
    return () => observers.forEach((observer) => observer && observer.disconnect());
  }, []);

  useEffect(() => {
    if (!selectedProject) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setSelectedProject(null);
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.classList.add('modal-open');
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.classList.remove('modal-open');
    };
  }, [selectedProject]);

  const onPortraitMove = (event) => {
    if (reduced || event.pointerType === 'touch') return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - rect.left) / rect.width - 0.5) * 2);
    pointerY.set(((event.clientY - rect.top) / rect.height - 0.5) * 2);
  };
  const resetPortrait = () => { pointerX.set(0); pointerY.set(0); };
  const closeMenu = () => setMenuOpen(false);
  const nav = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Expertise', href: '#expertise' },
    { label: 'Work', href: '#work' },
    { label: 'Approach', href: '#approach' }
  ];

  return (
    <div ref={rootRef} className="site-shell">
      <div className="scroll-progress" aria-hidden="true"><span className="scroll-progress-fill" /></div>
      <div className="grain" aria-hidden="true" />

      <header className="topbar">
        <a className="wordmark" href="#home" onClick={closeMenu} aria-label="Avery Quinn, home">
          <span className="mark">a<span>↗</span></span>
          <span className="wordmark-copy">AVERY QUINN<small>CREATIVE TECHNOLOGIST</small></span>
        </a>
        <nav className={menuOpen ? 'nav-links open' : 'nav-links'} aria-label="Main navigation">
          {nav.map((item) => <a key={item.label} className={active === item.label ? 'nav-active' : ''} href={item.href} onClick={closeMenu}>{item.label}</a>)}
          <a className="nav-cta" href="#contact" onClick={closeMenu}>Let’s talk <ArrowUpRight size={15} /></a>
        </nav>
        <button className="menu-toggle" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      </header>

      <main>
        <section className="hero section-wrap" id="home">
          <div className="hero-topline">
            <span><i className="status-dot" /> INDEPENDENT BY DESIGN</span>
            <span className="mono">SPECULATIVE PROFILE / 2026</span>
          </div>

          <div className="hero-layout">
            <div className="hero-copy">
              <div className="hero-kicker"><Sparkles size={14} /> DESIGN × CODE × CURIOSITY</div>
              <h1>
                <span className="hero-title-line">Ideas into</span>
                <span className="hero-title-line"><em>digital</em> things</span>
                <span className="hero-title-line outline-line">that matter<span className="accent-period">.</span></span>
              </h1>
              <p className="hero-description">I’m Avery — a creative technologist building thoughtful digital products where clear thinking, expressive design and purposeful motion meet.</p>
              <div className="hero-actions">
                <a className="button button-dark" href="#work">Explore selected work <ArrowDownRight size={17} /></a>
                <a className="text-link" href="#about">The point of view <ArrowRight size={16} /></a>
              </div>
              <div className="hero-metrics">
                <div><strong>03</strong><small>Concept projects</small></div>
                <div><strong>04</strong><small>Ways to make</small></div>
                <div><strong>∞</strong><small>Room to explore</small></div>
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-coordinate mono">FIG. 001 / CREATIVE PRACTICE</div>
              <motion.div className="hero-tilt" style={reduced ? {} : { rotateX, rotateY }} onPointerMove={onPortraitMove} onPointerLeave={resetPortrait}>
                <div className="hero-art-shell">
                  <div className="hero-art">
                    <div className="portrait-frame">
                      <img className="portrait-image" src="https://i.ibb.co/xt0GdQZx/aileenweifeng-lol-2553537.jpg" alt="Editorial portrait representing the fictional portfolio persona" fetchPriority="high" />
                      <div className="portrait-gradient" />
                      <div className="portrait-caption">
                        <span>PROFILE STUDY / AQ—01</span>
                        <strong>Curious by<br />default.</strong>
                      </div>
                    </div>
                    <div className="hero-orbit hero-orbit-a"><span className="orbit-token orbit-token-one">IDEAS</span></div>
                    <div className="hero-orbit hero-orbit-b"><span className="orbit-token orbit-token-two">IN MOTION</span></div>
                    <span className="hero-spark spark-one">✳</span>
                    <span className="hero-spark spark-two">+</span>
                    <div className="floating-note">
                      <span className="note-icon"><Code2 size={17} /></span>
                      <span><b>Thoughtfully made</b><small>From rough idea to real detail</small></span>
                      <ArrowUpRight size={16} />
                    </div>
                  </div>
                </div>
              </motion.div>
              <div className="hero-side-note mono">DESIGN WITH INTENT<br />BUILD WITH FEELING</div>
            </div>
          </div>

          <div className="hero-bottom">
            <span>SCROLL TO EXPLORE</span><div className="scroll-line"><span /></div><span className="mono">01 — 05</span>
          </div>
        </section>

        <div className="marquee-band" aria-label="Creative practice">
          <div className="marquee-track">
            {Array.from({ length: 2 }, (_, repeat) => <div className="marquee-group" key={repeat} aria-hidden={repeat === 1}>
              <span>Make it meaningful</span><i>✳</i><span>Make it feel effortless</span><i>✳</i><span>Make the details count</span><i>✳</i>
            </div>)}
          </div>
        </div>

        <section className="content-section section-wrap split-section about-section" id="about">
          <div className="section-label">
            <span className="section-index">01 / THE POINT OF VIEW</span>
            <h2>Curiosity,<br /><em>made useful.</em></h2>
            <p>A practice built around finding the signal in the noise.</p>
          </div>
          <Reveal className="about-content">
            <div className="large-statement">Good digital work should feel <span>obvious in the hand</span> and impossible to ignore.</div>
            <p className="body-copy">I move between systems thinking and visual storytelling — connecting the big idea to the tiny interaction that makes it land. The goal is never more interface. It’s more clarity, more character and a better reason to come back.</p>
            <p className="body-copy">This portfolio follows a fictional creative practice: a set of speculative product and experience concepts, made to explore how strategy, design and front-end craft can work as one.</p>
            <div className="principle-list">
              <span><Check size={15} /> Clarity before cleverness</span>
              <span><Check size={15} /> Character without clutter</span>
              <span><Check size={15} /> Motion with a reason</span>
            </div>
            <div className="signature-line"><span className="signature">Avery Quinn.</span><span className="mono">THINK / SHAPE / REFINE</span></div>
          </Reveal>
        </section>

        <section className="expertise-section" id="expertise">
          <div className="section-wrap">
            <div className="section-heading">
              <div className="section-label">
                <span className="section-index">02 / WHAT I BRING</span>
                <h2>Thoughtful by nature.<br /><em>Precise by craft.</em></h2>
              </div>
              <p className="heading-aside">Three connected disciplines, one joined-up experience — from the first question to the final transition.</p>
            </div>
            <div className="capability-grid">
              {capabilities.map((item, index) => {
                const Icon = item.icon;
                return <Reveal className="capability-card" delay={index * 0.08} key={item.number}>
                  <div className="capability-top"><span className="mono">{item.number} / 03</span><Icon size={23} strokeWidth={1.4} /></div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <span className="capability-arrow"><ArrowUpRight size={18} /></span>
                </Reveal>;
              })}
            </div>
          </div>
        </section>

        <section className="content-section section-wrap portfolio-section" id="work">
          <div className="section-heading">
            <div className="section-label">
              <span className="section-index">03 / SELECTED CONCEPTS</span>
              <h2>Work with<br /><em>a point of view.</em></h2>
            </div>
            <p className="heading-aside">Three fictional case studies exploring how better digital experiences can make everyday choices feel simpler.</p>
          </div>
          <div className="project-grid">
            {projects.map((project, index) => <ProjectCard key={project.n} project={project} index={index} onOpen={setSelectedProject} />)}
          </div>
          <div className="portfolio-foot"><span className="mono">CONCEPT WORK / NOT CLIENT COMMISSIONS</span><a href="#contact" className="text-link">Have a challenge in mind? <ArrowUpRight size={15} /></a></div>
        </section>

        <section className="approach-section" id="approach">
          <div className="section-wrap approach-inner">
            <div className="section-heading">
              <div className="section-label">
                <span className="section-index">04 / HOW IT COMES TOGETHER</span>
                <h2>The method<br /><em>is the magic.</em></h2>
              </div>
              <p className="heading-aside">Less theatre, more intention. A flexible process that keeps the work honest and the details sharp.</p>
            </div>
            <div className="process-list">
              {process.map((item) => <div className="process-row" key={item.n}>
                <span className="process-number mono">{item.n}</span>
                <div className="process-main"><div className="process-rule" /><h3>{item.title}</h3><p>{item.text}</p></div>
                <ArrowUpRight className="process-icon" size={22} strokeWidth={1.4} />
              </div>)}
            </div>
            <div className="toolkit-strip">
              <span className="mono">CURRENT TOOLKIT</span>
              <div className="toolkit-items"><span><Layers3 size={14} /> Figma</span><span><Code2 size={14} /> React</span><span><Workflow size={14} /> GSAP</span><span><Zap size={14} /> Framer Motion</span><span><Monitor size={14} /> CSS systems</span></div>
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-orb contact-orb-one" /><div className="contact-orb contact-orb-two" />
          <div className="section-wrap contact-inner">
            <div className="contact-top"><span className="section-index">05 / YOUR NEXT MOVE</span><span className="availability"><i className="status-dot" /> OPEN TO GOOD QUESTIONS</span></div>
            <p className="contact-kicker">THE NEXT GOOD THING STARTS SOMEWHERE.</p>
            <h2>Have a good<br /><em>problem?</em></h2>
            <div className="contact-bottom">
              <p>Bring the interesting brief, the unfinished thought or the thing that almost works. Let’s give it a sharper point of view.</p>
              <a href="mailto:hello@example.com?subject=Let%E2%80%99s%20make%20something%20good" className="contact-button">Start a conversation <ArrowUpRight size={21} /></a>
            </div>
            <div className="contact-watermark" aria-hidden="true">MAKE IT MATTER</div>
          </div>
        </section>
      </main>

      <footer className="footer section-wrap">
        <a className="wordmark" href="#home"><span className="mark">a<span>↗</span></span><span className="wordmark-copy">AVERY QUINN<small>CREATIVE TECHNOLOGIST</small></span></a>
        <span className="footer-copy">© {new Date().getFullYear()} AVERY QUINN · FICTIONAL PORTFOLIO CONCEPT</span>
        <div className="social-links"><a href="#home" aria-label="Back to top"><MoveUpRight size={17} /></a><a href="#work" aria-label="Selected concepts"><ExternalLink size={16} /></a></div>
      </footer>

      <AnimatePresence>
        {selectedProject && <motion.div className="case-modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedProject(null)}>
          <motion.article className="case-modal" role="dialog" aria-modal="true" aria-labelledby="case-modal-title" initial={{ opacity: 0, y: 30, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16, scale: 0.98 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} onClick={(event) => event.stopPropagation()}>
            <div className="case-modal-top"><span className="mono">{selectedProject.n} / SPECULATIVE CASE STUDY</span><button className="modal-close" onClick={() => setSelectedProject(null)} aria-label="Close case study"><X size={19} /></button></div>
            <div className="case-modal-image"><img src={selectedProject.image} alt="" /></div>
            <div className="case-modal-content">
              <span className="case-type">{selectedProject.type}</span>
              <h2 id="case-modal-title">{selectedProject.title}<em>.</em></h2>
              <p className="case-lead">{selectedProject.intro}</p>
              <div className="case-detail-grid"><div><span>THE BRIEF</span><p>{selectedProject.brief}</p></div><div><span>THE APPROACH</span><p>{selectedProject.approach}</p></div></div>
              <div className="case-outcome"><Check size={17} /><p><strong>Concept direction</strong><br />{selectedProject.outcome}</p></div>
              <div className="tag-row">{selectedProject.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            </div>
          </motion.article>
        </motion.div>}
      </AnimatePresence>
    </div>
  );
}

export default App;