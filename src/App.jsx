import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDownRight, ArrowUpRight, ArrowRight, Menu, X, Github, Linkedin, Mail, MoveUpRight, Sparkles, Code2, Layers3, Workflow, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const photos = [
  'https://pixabay.com/images/download/x-2553537_1920.jpg',
  'https://pixabay.com/images/download/x-7459755_1920.jpg',
  'https://pixabay.com/images/download/x-7934916_1920.jpg'
];

const projects = [
  { n:'01', title:'Shiva Assistant', type:'AI AUTOMATION · PRODUCT', desc:'A practical AI assistant experience built around useful workflows, thoughtful UX and reliable automation.', image:photos[0], tags:['AI','Automation','Product'], link:'https://github.com/shivatmprakash9009-eng' },
  { n:'02', title:'Digital Experiences', type:'WEB DESIGN · DEVELOPMENT', desc:'Responsive web experiences with considered typography, clean interaction patterns and a focus on clarity.', image:photos[1], tags:['React','UI/UX','Web'], link:'https://github.com/shivatmprakash9009-eng' },
  { n:'03', title:'Ideas into Interfaces', type:'CONCEPT · EXPERIMENTS', desc:'An evolving collection of experiments exploring how emerging technology can solve real problems.', image:photos[2], tags:['Research','Prototyping','AI'], link:'https://github.com/shivatmprakash9009-eng' }
];

const skills = [
  { title:'Product & strategy', items:['Product thinking','User research','Problem framing','Design systems','Rapid prototyping'] },
  { title:'Development', items:['HTML & CSS','JavaScript','React','Responsive UI','Git & GitHub'] },
  { title:'AI & automation', items:['LLM workflows','API integration','n8n','Prompt design','Automation systems'] }
];

function Reveal({children, className=''}) {
  const reduce = useReducedMotion();
  return <motion.div className={className} initial={reduce ? false : {opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.18}} transition={{duration:.65,ease:[.22,1,.36,1]}}>{children}</motion.div>;
}

function App() {
  const root = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('Home');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-copy > *', { y:34, opacity:0, duration:.9, stagger:.12, ease:'power3.out', delay:.15 });
      gsap.from('.hero-visual', { scale:.94, opacity:0, duration:1.1, ease:'power3.out', delay:.25 });
      gsap.utils.toArray('.section-label').forEach((el) => {
        gsap.from(el, { x:-22, opacity:0, duration:.7, ease:'power2.out', scrollTrigger:{trigger:el, start:'top 86%'} });
      });
      gsap.to('.orbit-one', { rotate:360, duration:32, repeat:-1, ease:'none' });
      gsap.to('.orbit-two', { rotate:-360, duration:44, repeat:-1, ease:'none' });
    }, root);
    const sections = ['home','journey','work','skills','toolbox','portfolio','contact'];
    const observers = sections.map(id => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) setActive(id === 'home' ? 'Home' : id === 'portfolio' ? 'Portfolio' : id === 'contact' ? 'Contact' : id === 'work' ? 'Experience' : id === 'skills' || id === 'toolbox' ? 'Skills' : 'About');
      }, { rootMargin:'-35% 0px -55% 0px' });
      obs.observe(el); return obs;
    });
    return () => { ctx.revert(); observers.forEach(o => o?.disconnect()); };
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const nav = [{label:'Home',href:'#home'},{label:'About',href:'#journey'},{label:'Experience',href:'#work'},{label:'Skills',href:'#skills'},{label:'Portfolio',href:'#portfolio'}];

  return <div ref={root} className="site-shell">
    <div className="grain" aria-hidden="true" />
    <header className="topbar">
      <a className="wordmark" href="#home" onClick={closeMenu}><span className="mark">S<span>.</span></span><span>SHIVATM<br/><small>INDEPENDENT BUILDER</small></span></a>
      <nav className={menuOpen ? 'nav-links open' : 'nav-links'} aria-label="Main navigation">
        {nav.map(item => <a key={item.label} className={active===item.label?'nav-active':''} href={item.href} onClick={closeMenu}>{item.label}</a>)}
        <a className="nav-cta" href="#contact" onClick={closeMenu}>Let’s talk <ArrowUpRight size={15}/></a>
      </nav>
      <button className="menu-toggle" aria-label={menuOpen?'Close menu':'Open menu'} onClick={()=>setMenuOpen(!menuOpen)}>{menuOpen?<X/>:<Menu/>}</button>
    </header>

    <main>
      <section className="hero section-wrap" id="home">
        <div className="hero-topline"><span><i className="status-dot"/> AVAILABLE FOR SELECT PROJECTS</span><span className="mono">PORTFOLIO / 2026</span></div>
        <div className="hero-layout">
          <div className="hero-copy">
            <motion.div className="eyebrow" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.2}}><Sparkles size={14}/> BUILDER · DESIGNER · DEVELOPER</motion.div>
            <h1>Turning bold<br/>ideas into <span className="serif-word">digital</span><br/><span className="outline-word">reality.</span></h1>
            <p className="hero-description">I’m Shivatm Prakash — an independent builder exploring the intersection of technology, design and intelligent automation.</p>
            <div className="hero-actions"><a className="button button-dark" href="#portfolio">Explore my work <ArrowDownRight size={17}/></a><a className="text-link" href="#journey">A little about me <ArrowRight size={16}/></a></div>
            <div className="hero-metrics"><div><strong>01<span>+</span></strong><small>Curiosity first</small></div><div><strong>∞</strong><small>Things to build</small></div><div><strong>AI<span>/</span>WEB</strong><small>Areas of focus</small></div></div>
          </div>
          <div className="hero-visual">
            <div className="visual-index mono">FIG. 001 — THE BUILDER</div>
            <div className="portrait-frame">
              <div className="portrait-image" role="img" aria-label="Abstract editorial portrait artwork" />
              <div className="portrait-overlay"><span className="portrait-cross">+</span><span className="portrait-caption mono">CURIOUS BY DEFAULT<br/>BUILT FOR WHAT'S NEXT</span></div>
            </div>
            <div className="orbit orbit-one"><span className="orbit-label orbit-label-a">DESIGN</span><span className="orbit-label orbit-label-b">DEVELOP</span></div>
            <div className="orbit orbit-two"><span className="orbit-dot dot-a"/><span className="orbit-dot dot-b"/></div>
            <div className="floating-note"><span className="note-icon"><Code2 size={17}/></span><span><b>Always building</b><small>Ideas → experiments</small></span><ArrowUpRight size={16}/></div>
            <span className="visual-coordinate mono">26°15' N / 82°04' E</span>
          </div>
        </div>
        <div className="hero-bottom"><span>SCROLL TO EXPLORE</span><div className="scroll-line"><span/></div><span className="mono">01 — 07</span></div>
      </section>

      <section className="content-section section-wrap split-section" id="journey">
        <div className="section-label"><span className="section-number">01 /</span><h2>My<br/><em>journey.</em></h2><p>A work in progress, by design.</p></div>
        <Reveal className="journey-content"><div className="large-statement">I’m interested in building things that make technology feel <span>more human.</span></div><p className="body-copy">From crafting interfaces to experimenting with AI and automation, I like working across the full journey — understanding a problem, shaping an idea, and turning it into something people can actually use.</p><p className="body-copy">My approach is simple: stay curious, learn in public, and choose clarity over complexity. I’m currently sharpening my skills across web development, product thinking and intelligent systems.</p><div className="signature-line"><span className="signature">Shivatm.</span><span className="mono">LEARN · BUILD · REFINE</span></div></Reveal>
      </section>

      <section className="content-section section-wrap" id="work">
        <div className="section-heading"><div className="section-label"><span className="section-number">02 /</span><h2>Experience &<br/><em>direction.</em></h2></div><p className="heading-aside">A growing practice shaped by curiosity, experimentation and real-world problem solving.</p></div>
        <div className="timeline">
          <Reveal className="timeline-item"><div className="timeline-date mono">NOW — ONGOING</div><div className="timeline-marker"><span/></div><div className="timeline-body"><div className="timeline-top"><div><span className="tiny-tag">INDEPENDENT</span><h3>Founder & Digital Builder</h3></div><span className="timeline-arrow"><ArrowUpRight size={20}/></span></div><p>Building through Shiva Enterprises: exploring AI-powered workflows, web experiences and useful digital products from concept to implementation.</p><div className="tag-row"><span>Product thinking</span><span>AI automation</span><span>Web development</span></div></div></Reveal>
          <Reveal className="timeline-item"><div className="timeline-date mono">CONTINUOUS</div><div className="timeline-marker"><span/></div><div className="timeline-body"><div className="timeline-top"><div><span className="tiny-tag">LEARNING BY DOING</span><h3>Developer & Systems Explorer</h3></div><span className="timeline-arrow"><ArrowUpRight size={20}/></span></div><p>Learning modern frontend engineering, APIs, automation tools and AI systems by turning small experiments into working projects.</p><div className="tag-row"><span>React</span><span>APIs</span><span>GitHub</span></div></div></Reveal>
        </div>
      </section>

      <section className="content-section section-wrap split-section skills-section" id="skills">
        <div className="section-label"><span className="section-number">03 /</span><h2>Skill<br/><em>set.</em></h2><p>Tools are useful.<br/>Judgment is the craft.</p></div>
        <div className="skill-groups">{skills.map((group,i)=><Reveal className="skill-group" key={group.title}><div className="skill-group-heading"><span className="mono">0{i+1}</span><h3>{group.title}</h3><ArrowUpRight size={17}/></div><div className="skill-pills">{group.items.map(item=><span key={item}>{item}</span>)}</div></Reveal>)}</div>
      </section>

      <section className="toolbox-band" id="toolbox"><div className="section-wrap toolbox-inner"><div><span className="section-number">04 / THE TOOLBOX</span><h2>Good tools.<br/><em>Better questions.</em></h2><p>My toolkit evolves with every project. These are the building blocks I’m using and learning.</p></div><div className="tool-grid"><div><Layers3/><span>INTERFACE</span><b>Design systems</b></div><div><Code2/><span>DEVELOPMENT</span><b>Modern web</b></div><div><Workflow/><span>WORKFLOWS</span><b>Automation</b></div><div><Sparkles/><span>EXPERIMENTS</span><b>Applied AI</b></div></div></div></section>

      <section className="content-section section-wrap portfolio-section" id="portfolio">
        <div className="section-heading"><div className="section-label"><span className="section-number">05 /</span><h2>Selected<br/><em>work.</em></h2></div><p className="heading-aside">A few directions I’m exploring. Case studies will grow as each project develops.</p></div>
        <div className="project-grid">{projects.map((project,i)=><Reveal key={project.n} className="project-card"><a href={project.link} target="_blank" rel="noreferrer" className="project-link"><div className="project-image"><img src={project.image} alt={project.title} loading="lazy"/><span className="project-count mono">{project.n} / 03</span><span className="project-open"><ArrowUpRight size={22}/></span><div className="image-shade"/></div><div className="project-meta"><span className="mono">{project.type}</span><span className="mono">2026</span></div><h3>{project.title}</h3><p>{project.desc}</p><div className="tag-row">{project.tags.map(t=><span key={t}>{t}</span>)}</div></a></Reveal>)}</div>
        <div className="portfolio-foot"><span className="mono">MORE EXPERIMENTS IN PROGRESS</span><a href="https://github.com/shivatmprakash9009-eng" target="_blank" rel="noreferrer" className="text-link">Explore GitHub <ExternalLink size={15}/></a></div>
      </section>

      <section className="contact-section" id="contact"><div className="section-wrap contact-inner"><div className="contact-top"><span className="section-number">06 / YOUR NEXT MOVE</span><span className="availability"><i className="status-dot"/> OPEN TO GOOD IDEAS</span></div><h2>Have a good<br/><em>problem?</em></h2><p>Let’s talk about a product, a collaboration, or an idea worth exploring.</p><a href="mailto:hello@shivatm.dev" className="contact-button">Start a conversation <ArrowUpRight size={21}/></a><div className="contact-watermark">LET’S BUILD</div></div></section>
    </main>

    <footer className="footer section-wrap"><a className="wordmark" href="#home"><span className="mark">S<span>.</span></span><span>SHIVATM<br/><small>INDEPENDENT BUILDER</small></span></a><span className="footer-copy">© {new Date().getFullYear()} SHIVATM PRAKASH. BUILT WITH INTENTION.</span><div className="social-links"><a href="https://github.com/shivatmprakash9009-eng" aria-label="GitHub" target="_blank" rel="noreferrer"><Github size={17}/></a><a href="https://www.linkedin.com/" aria-label="LinkedIn" target="_blank" rel="noreferrer"><Linkedin size={17}/></a><a href="mailto:hello@shivatm.dev" aria-label="Email"><Mail size={17}/></a><a href="#home" aria-label="Back to top"><MoveUpRight size={17}/></a></div></footer>
  </div>;
}

export default App;