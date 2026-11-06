'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type Variants } from 'framer-motion';
import Image from 'next/image';

const navItems = ['about', 'expertise', 'experience', 'projects', 'contact'];
const ease = [0.22, 1, 0.36, 1] as const;
const sectionVariants: Variants = { hidden: { opacity: 0, y: 34 }, visible: { opacity: 1, y: 0, transition: { duration: 0.72, ease, when: 'beforeChildren', staggerChildren: 0.075 } } };
const childVariants: Variants = { hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0, transition: { duration: 0.58, ease } } };
const leftVariants: Variants = { hidden: { opacity: 0, x: -34 }, visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease } } };
const rightVariants: Variants = { hidden: { opacity: 0, x: 34 }, visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease } } };
const heroStaggerVariants: Variants = { hidden: {}, visible: { transition: { delayChildren: 0.08, staggerChildren: 0.12 } } };
const heroItemVariants: Variants = { hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease } } };
const projectGridVariants: Variants = { hidden: {}, visible: { transition: { delayChildren: 0.06, staggerChildren: 0.075 } } };
const projectTitleVariants: Variants = { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.48, ease } } };
const arsenalGroupVariants: Variants = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.58, ease, when: 'beforeChildren', staggerChildren: 0.07 } } };
const arsenalContentVariants: Variants = { hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.42, ease } } };
const arsenalSkillListVariants: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.045 } } };

const expertise = [
  ['01', 'Functional & Regression Testing', 'Verify requirements, existing functionality, bug fixes, and critical user journeys.'],
  ['02', 'Test Design & Coverage', 'Build positive, negative, boundary, and edge-case scenarios around real workflows.'],
  ['03', 'AI Chatbot Testing', 'Evaluate response relevance, input variation, fallback behavior, consistency, and unexpected outputs.'],
  ['04', 'UI & Responsive Testing', 'Check layouts, navigation, forms, validation, and browser behavior across screen sizes.'],
  ['05', 'Defect Management', 'Document reproducible issues with expected versus actual results, priority, and evidence.'],
  ['06', 'Release Verification', 'Retest fixes, run regression checks, and support release sign-off with clear evidence.']
];
const skills: Record<string, string[]> = {
  'Manual QA': ['Functional Testing', 'Regression Testing', 'Smoke & Sanity Testing', 'End-to-End Testing', 'Exploratory Testing', 'Positive & Negative Testing', 'Cross-Browser & Responsive Testing', 'Mobile App Testing', 'User Acceptance Testing (UAT)'],
  'Test Design': ['Test Planning', 'Test Scenarios', 'Test Cases', 'Test Execution', 'Requirement Analysis'],
  'Defect & Task Management': ['Trello', 'Bug Reporting', 'Defect Tracking', 'Issue Documentation', 'Severity/Priority Classification', 'Bug Retesting & Verification'],
  'AI & Chatbot Testing': ['AI Chatbot Verification', 'Prompt Testing', 'Response Relevance', 'Fallback Behavior Testing'],
  'Domain Knowledge': ['HRM Systems', 'Team Management Platforms', 'CRM', 'Role-Based Access Control (RBAC)'],
  'QA Processes': ['SDLC', 'STLC', 'Agile Methodology', 'Release Sign-Off']
};
const qaArsenal = [
  { number: '01', mark: '⌕', title: 'Manual QA', status: 'CORE PRACTICE', desc: 'Validate functionality, user journeys, responsive behavior, and release confidence across web and mobile products.', items: skills['Manual QA'], signal: 'coverage active' },
  { number: '02', mark: '✓', title: 'Test Design', status: 'QUALITY PLANNING', desc: 'Turn requirements and workflows into clear scenarios, test cases, execution, and evidence.', items: skills['Test Design'], signal: 'cases prepared' },
  { number: '03', mark: '!', title: 'Defect & Task Management', status: 'ISSUE CONTROL', desc: 'Document, classify, track, retest, and verify defects with clear supporting information.', items: skills['Defect & Task Management'], signal: 'defects traceable' },
  { number: '04', mark: 'AI', title: 'AI & Chatbot Testing', status: 'AI-AWARE QA', desc: 'Validate chatbot responses, prompt variations, relevance, and fallback behavior.', items: skills['AI & Chatbot Testing'], signal: 'responses reviewed' },
  { number: '05', mark: '▦', title: 'Domain Knowledge', status: 'PRODUCT CONTEXT', desc: 'Test complex business workflows across HRM, team management, CRM, and role-based access.', items: skills['Domain Knowledge'], signal: 'workflows mapped' },
  { number: '06', mark: '↻', title: 'QA Processes', status: 'RELEASE PRACTICE', desc: 'Work within established software and testing lifecycles to support reliable releases.', items: skills['QA Processes'], signal: 'release aligned' }
];
type TechnicalCategory = { number: string; icon: string; title: string; note: string; skills: string[] };
const technicalCategories: TechnicalCategory[] = [
  { number: '01', icon: 'MQ', title: 'Manual Testing', note: 'Functional and exploratory coverage across web, SaaS, and mobile applications.', skills: skills['Manual QA'] },
  { number: '02', icon: 'TC', title: 'Test Case Design', note: 'Requirements translated into practical scenarios, cases, and execution.', skills: skills['Test Design'] },
  { number: '03', icon: 'BR', title: 'Bug Reporting & Tracking', note: 'Clear issue documentation, classification, retesting, and verification.', skills: skills['Defect & Task Management'] },
  { number: '04', icon: 'AI', title: 'AI Chatbot Testing', note: 'Focused validation of chatbot behavior, relevance, prompts, and fallbacks.', skills: skills['AI & Chatbot Testing'] },
  { number: '05', icon: 'QA', title: 'QA Methodologies', note: 'Structured quality work across software and testing lifecycles.', skills: skills['QA Processes'] },
  { number: '06', icon: 'DX', title: 'Domain Expertise', note: 'Product context for business systems, team platforms, CRM, and permissions.', skills: skills['Domain Knowledge'] }
];
type ExperienceItem = readonly [string, string, string, string[]];
const experience: ExperienceItem[] = [
  ['June 2026 — Present', 'Senior SQA Engineer', 'AppliconSoft', ['Plan and execute manual, functional, regression, UI, and exploratory testing for SaaS platforms and web applications.', 'Design test scenarios and test cases for complex workflows, form validation, permissions, edge cases, and error handling.', 'Test AI chatbot interactions, user inputs, and expected functionality to identify unexpected behavior.', 'Report defects, including critical-severity issues, with reproducible steps, expected versus actual results, and evidence.', 'Mentor junior QA team members, review their reported issues, and coordinate testing and defect verification.', 'Collaborate with developers to investigate issues, retest fixes, and improve release quality.']],
  ['April 2025 — May 2026', 'SQA Engineer', 'AppliconSoft', ['Performed functional, regression, UI, and end-to-end testing of web applications.', 'Created and executed test cases based on requirements and user workflows.', 'Tested forms, dashboards, role-based permissions, payment flows, notifications, and third-party integrations.', 'Identified and documented defects, including critical issues, with clear steps and evidence, then retested fixes.', 'Checked responsive layouts, navigation, validation messages, and error handling across relevant browsers and screen sizes.']],
  ['June 2024 — March 2025', 'Associate SQA Engineer', 'AppliconSoft', ['Executed manual test cases to verify application functionality against requirements.', 'Identified UI inconsistencies, functional defects, and unexpected application behavior.', 'Tested positive and negative scenarios, field validations, navigation, and common user journeys.', 'Maintained clear bug reports, supported retesting after fixes, and worked with senior QA members to improve test coverage.']],
  ['March 2024 — May 2024', 'UI Intern (Mobile App)', 'AppliconSoft', ['Worked on user interface tasks for a mobile application during a three-month internship.', 'Gained exposure to the mobile application development process and teamwork with developers before moving into QA.']]
];
type Project = { name: string; title: string; type: string; group: 'Academic' | 'Professional'; desc: string; url?: string; image?: string };
const projects: Project[] = [
  { name: 'ROI', title: 'Multi-Company SaaS Business Management Platform', type: 'SaaS', group: 'Professional', desc: 'Tested CRM, customer and supplier management, appointments, invoicing, subscriptions, role permissions, business workflows, Stripe payment flows, and DHL and Trello integrations.', url: 'https://roilevelup.com/', image: '/images/projects/roi.webp' },
  { name: 'Chat Cactus', title: 'AI Chatbot Platform', type: 'AI', group: 'Professional', desc: 'Tested AI chatbot functionality, workspace management, and customer-support workflows to identify functional issues and verify expected application behavior.', url: 'https://chatcactus.com/', image: '/images/projects/chat-cactus.webp' },
  { name: 'Social Rocket AI', title: 'AI-Powered Social Media Platform', type: 'AI', group: 'Professional', desc: 'Tested content creation, scheduling, analytics, user flows, input handling, and consistent UI behavior across responsive interfaces.', url: 'https://socialrocketai.com/', image: '/images/projects/social-rocket.webp' },
  { name: 'Track Pilot AI', title: 'Workforce Productivity SaaS', type: 'SaaS', group: 'Professional', desc: 'Tested time tracking, project management, productivity, and team-performance workflows.', url: 'https://trackpilotai.com/', image: '/images/projects/track-pilot.webp' },
  { name: 'Team Suite AI', title: 'Team Management Platform', type: 'SaaS', group: 'Professional', desc: 'Tested team-management and productivity features across responsive and interactive interfaces.', url: 'https://teamsuiteai.com/', image: '/images/projects/team-suite.webp' },
  { name: 'Flow Ledger Pro', title: 'Accounting & ERP Platform', type: 'ERP', group: 'Professional', desc: 'Tested accounting and business workflows, including functional behavior and responsive interfaces.', url: 'https://flowledgerpro.com/', image: '/images/projects/flow-ledger.webp' },
  { name: 'AppliconSoft', title: 'Corporate Website', type: 'Web', group: 'Professional', desc: 'Tested functionality, UI consistency, responsive layouts, navigation, forms, content presentation, usability, and expected behavior across pages.', url: 'https://appliconsoft.com/', image: '/images/projects/appliconsoft.webp' },
  { name: 'Shaden Resort', title: 'Resort Website · AlUla, Saudi Arabia', type: 'Web', group: 'Professional', desc: 'Shaden Resort AlUla is a hospitality destination near Elephant Rock and Hegra.', url: 'https://shadenresort.sa/', image: '/images/projects/shaden-resort.webp' },
  { name: 'AsklyForm', title: 'MERN Stack Form Builder · Final Year Project', type: 'FYP', group: 'Academic', desc: 'University development project featuring form creation, drag-and-drop editing, and live preview, built with React.js, JavaScript, Node.js, Express.js, MongoDB, Mongoose, Material UI, REST APIs, JWT, and bcrypt.', url: 'https://asklyform.vercel.app/', image: '/images/projects/asklyform.webp' }
];
const initialProjectCount = 9;

type Variant = Variants;
function MotionSection({ id, className, children, staticWhenReduced = false }: { id?: string; className: string; children: React.ReactNode; staticWhenReduced?: boolean }) {
  const reduced = useReducedMotion();
  const shouldAnimate = !(reduced && staticWhenReduced);
  return <motion.section id={id} className={className} variants={shouldAnimate ? sectionVariants : undefined} initial={shouldAnimate ? 'hidden' : false} whileInView={shouldAnimate ? 'visible' : undefined} viewport={{ once: true, amount: 0.14 }}>{children}</motion.section>;
}
function Reveal({ children, className = '', variants = childVariants, staticWhenReduced = false }: { children: React.ReactNode; className?: string; variants?: Variant; staticWhenReduced?: boolean }) {
  const reduced = useReducedMotion();
  const shouldAnimate = !(reduced && staticWhenReduced);
  return <motion.div className={className} variants={shouldAnimate ? variants : undefined} initial={shouldAnimate ? 'hidden' : false} whileInView={shouldAnimate ? 'visible' : undefined} viewport={{ once: true, amount: 0.16 }}>{children}</motion.div>;
}

function ProfileImage({ className = '' }: { className?: string }) {
  const reduced = useReducedMotion();
  const isHeroProfile = className.includes('hero-profile-frame');
  return <motion.div className={`profile-frame ${className}`} whileHover={reduced ? undefined : { y: -6, rotate: -1 }} transition={{ duration: 0.3 }}>
    <Image src="/images/profile.webp" alt="Humna Ishfaq" fill sizes={isHeroProfile ? '(max-width: 520px) 88px, 104px' : '(max-width: 520px) 230px, (max-width: 760px) 250px, (max-width: 1050px) 260px, 300px'} quality={95} className="profile-image" priority />
  </motion.div>;
}

function ProjectPreview({ src, name, type }: { src?: string; name: string; type: string }) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const reduced = useReducedMotion();
  return <div className="project-preview">
    <motion.div className={`project-image-placeholder project-placeholder-${type.toLowerCase()} ${loaded ? 'is-hidden' : ''}`} aria-hidden={loaded} aria-label={`${name} project image placeholder`} whileHover={reduced ? undefined : { scale: 1.015 }} transition={{ duration: 0.3, ease }}>
      <span>IMAGE SLOT / {type}</span><b>{name}</b><small>{src}</small><i aria-hidden="true">{name.slice(0, 1)}</i>
    </motion.div>
    {src && !failed && <motion.div className="project-image-wrap" whileHover={reduced ? undefined : { scale: 1.015 }} transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}>
      <Image src={src} alt={`${name} project screenshot`} fill sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw" className="project-image" onLoad={() => setLoaded(true)} onError={() => setFailed(true)} />
    </motion.div>}
  </div>;
}

function Header() {
  const [open, setOpen] = useState(false); const [scrolled, setScrolled] = useState(false); const [activeSection, setActiveSection] = useState('about'); const reduced = useReducedMotion(); const { scrollY } = useScroll(); const orbY = useTransform(scrollY, [0, 900], [0, 160]);
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 24); const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && setActiveSection(entry.target.id)), { rootMargin: '-26% 0px -62% 0px', threshold: 0 }); navItems.forEach((item) => { const element = document.getElementById(item); if (element) observer.observe(element); }); window.addEventListener('scroll', onScroll, { passive: true }); return () => { window.removeEventListener('scroll', onScroll); observer.disconnect(); }; }, []);
  return <motion.header className={scrolled ? 'site-header scrolled' : 'site-header'} initial={reduced ? false : { opacity: 0, y: -18 }} animate={reduced ? undefined : { opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: 'easeOut' }}><motion.div className="header-orb" style={reduced ? undefined : { y: orbY }} aria-hidden="true" /><a className="logo" href="#top" aria-label="Humna Ishfaq home"><motion.span whileHover={reduced ? undefined : { rotate: -8, scale: 1.08 }}>HI</motion.span><div className="logo-copy"><b>Humna Ishfaq</b><small>Senior Software Quality Assurance Engineer</small></div></a><button className="menu-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle navigation">{open ? '×' : '☰'}</button><nav className={open ? 'nav open' : 'nav'}>{navItems.map((item) => <a key={item} className={activeSection === item ? 'active' : ''} href={`#${item}`} onClick={() => setOpen(false)}>{item}{activeSection === item && <motion.span className="nav-indicator" layoutId="nav-indicator" />}</a>)}<a className="nav-cta" href="#contact" onClick={() => setOpen(false)}>Let&apos;s connect <span>↗</span></a></nav></motion.header>;
}

export default function Home() {
  const reduced = useReducedMotion(); const year = new Date().getFullYear(); const visibleProjects = projects.slice(0, initialProjectCount);
  return <main id="top"><Header />
    <section className="hero section-wrap" aria-labelledby="hero-title">
      <div className="hero-atmosphere" aria-hidden="true"><span className="hero-detail hero-detail-check">✓</span><span className="hero-detail hero-detail-bug">✣</span><span className="hero-detail hero-detail-spark">✳</span></div>
      <motion.div className="hero-center" variants={heroStaggerVariants} initial={reduced ? false : 'hidden'} animate="visible">
        <motion.div className="hero-profile-entry" variants={heroItemVariants}><ProfileImage className="hero-profile-frame" /></motion.div>
        <motion.p className="hero-intro" variants={heroItemVariants}>HUMNA ISHFAQ · QUALITY ASSURANCE</motion.p>
        <motion.h1 id="hero-title" variants={heroItemVariants}>Humna <span>Ishfaq.</span></motion.h1>
        <motion.h2 className="hero-role" variants={heroItemVariants}>Senior Software <em>Quality Assurance Engineer.</em></motion.h2>
        <motion.p className="hero-lede" variants={heroItemVariants}>Manual QA specialist with 2.5+ years of experience testing web, SaaS, mobile, and AI chatbot products across complex business workflows.</motion.p>
        <motion.div className="hero-assurance" variants={heroItemVariants}>
          <motion.span className="hero-assurance-mark" aria-hidden="true" animate={reduced ? undefined : { scale: [1, 1.08, 1] }} transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}>✓</motion.span>
          <span>MANUAL QA</span><i /><span>AI CHATBOT TESTING</span>
        </motion.div>
        <motion.div className="hero-actions" variants={heroItemVariants}>
          <a className="button button-lime" href="#projects">View QA Work <span>↗</span></a>
          <a className="button button-outline" href="#contact">Let&apos;s Connect <span>→</span></a>
        </motion.div>
        <motion.div className="hero-contact-row" variants={heroItemVariants}>
          <a href="tel:+923257848648">+92 325 7848648</a>
          <a href="mailto:humnaishfaq06@gmail.com">humnaishfaq06@gmail.com</a>
          <a href="https://www.linkedin.com/in/humna-ishfaq-31a3242a3" target="_blank" rel="noreferrer">LinkedIn ↗</a>
        </motion.div>
        <motion.div className="hero-meta" variants={heroItemVariants}>
          <span className="location-pin">●</span> Lahore, Pakistan · Open to Remote <span className="meta-divider" />
          <a href="/Humna_Ishfaq_Resume.pdf" download>Resume ↓</a>
        </motion.div>
      </motion.div>
    </section>
    <MotionSection id="expertise" className="section-wrap section-light qlab-section" staticWhenReduced>
      <div className="qlab-heading">
        <div>
          <div className="section-kicker">01 / Technical expertise</div>
          <Reveal staticWhenReduced><h2>Inside the<br /><em>QA Lab.</em></h2></Reveal>
        </div>
        <Reveal className="qlab-heading-copy" staticWhenReduced>
          <span className="qlab-status"><i /> SYSTEM / QUALITY ONLINE</span>
          <p>Manual QA expertise for test design, defect management, AI chatbot validation, business workflows, and reliable releases.</p>
        </Reveal>
      </div>
      <div className="qlab-toolbar" aria-label="QA Lab status">
        <span><b>●</b> LAB SESSION / HI-01</span>
        <span>{qaArsenal.length} TESTING ZONES</span>
        <span>{qaArsenal.reduce((count, category) => count + category.items.length, 0)} SIGNALS MAPPED</span>
      </div>
      <div className="qlab-grid">
        {qaArsenal.map((category, index) => (
          <motion.article
            className={`qlab-card qlab-card-${index + 1}`}
            key={category.number}
            variants={reduced ? undefined : arsenalGroupVariants}
            initial={reduced ? false : undefined}
            whileHover={reduced ? undefined : { y: -6, transition: { duration: 0.24, ease } }}
          >
            {index === 0 && <span className="qlab-scan" aria-hidden="true" />}
            <div className="qlab-card-top">
              <motion.span className="qlab-mark" variants={reduced ? undefined : arsenalContentVariants} whileHover={reduced ? undefined : { rotate: -7, scale: 1.08 }}>{category.mark}</motion.span>
              <span className="qlab-number">ZONE / {category.number}</span>
              <span className="qlab-card-status"><i /> {category.status}</span>
            </div>
            <div className="qlab-copy">
              <motion.h3 variants={reduced ? undefined : arsenalContentVariants}>{category.title}</motion.h3>
              <motion.p variants={reduced ? undefined : arsenalContentVariants}>{category.desc}</motion.p>
            </div>
            <motion.ul className="qlab-skills" variants={reduced ? undefined : arsenalSkillListVariants}>
              {category.items.map((skill, skillIndex) => (
                <motion.li key={skill} variants={reduced ? undefined : arsenalContentVariants} whileHover={reduced ? undefined : { x: 3 }}>
                  <span>{String(skillIndex + 1).padStart(2, '0')}</span>{skill}
                </motion.li>
              ))}
            </motion.ul>
            <div className="qlab-card-foot"><span>STATUS</span><b>{category.signal}</b><i aria-hidden="true">↗</i></div>
          </motion.article>
        ))}
      </div>
      <div className="qlab-console" aria-label="QA Lab workflow status">
        <code>$ qa-lab --mode=investigate --coverage=balanced</code>
        <span><i /> PLAN</span><b>→</b><span><i /> TEST</span><b>→</b><span><i /> REPORT</span><b>→</b><span><i /> VERIFY</span>
        <strong>READY</strong>
      </div>
    </MotionSection>
    <MotionSection id="about" className="section-wrap about-section">
      <div className="section-kicker">02 / Meet the bug hunter</div>
      <div className="about-grid">
        <Reveal className="about-image-column" variants={leftVariants}>
          <div className="about-image-shell">
            <ProfileImage className="about-profile-frame" />
          </div>
        </Reveal>
        <div className="about-summary">
          <Reveal variants={rightVariants}>
            <h2>Beyond the<br /><em>happy path.</em></h2>
            <p className="about-lede">I&apos;m a Senior Software Quality Assurance Engineer with <strong>2.5+ years of experience</strong> testing complex products and helping teams release with confidence.</p>
            <p className="about-copy">My experience covers <strong>7 web and SaaS platforms</strong>, <strong>4 mobile applications</strong>, multi-tenant products, role-based access, payment flows, third-party integrations, and AI chatbot validation.</p>
          </Reveal>
          <div className="principles">
            {[['01', 'Broad product coverage', 'Tested seven web and SaaS platforms and four mobile applications.'], ['02', 'Complex workflow validation', 'Experienced with permissions, payment flows, integrations, and multi-tenant products.'], ['03', 'Quality through collaboration', 'Validates AI chatbots, mentors junior QA testers, and works closely with developers.']].map(([n, t, d], i) => <motion.div className="principle" key={n} variants={rightVariants} transition={{ delay: i * 0.1 }}><span>{n}</span><div><h3>{t}</h3><p>{d}</p></div></motion.div>)}
          </div>
        </div>
      </div>
    </MotionSection>
    <MotionSection className="section-wrap skills-section skills-index-section">
      <div className="skills-index-heading">
        <div>
          <div className="section-kicker">03 / Technical skills</div>
          <Reveal><h2>Quality skills,<br /><em>clearly applied.</em></h2></Reveal>
        </div>
        <Reveal className="skills-index-intro" variants={rightVariants}>
          <span className="skills-index-status"><i /> VERIFIED SKILL DIRECTORY</span>
          <p>Manual testing, test design, defect management, chatbot validation, methodologies, and domain knowledge grounded in real QA work.</p>
          <div className="skills-index-stats"><span><b>{technicalCategories.length}</b> categories</span><span><b>{technicalCategories.reduce((count, category) => count + category.skills.length, 0)}</b> skill entries</span></div>
        </Reveal>
      </div>
      <div className="skills-directory">
        {technicalCategories.map((category, categoryIndex) => (
          <motion.article
            className={`skills-directory-row ${categoryIndex === technicalCategories.length - 1 ? 'skills-directory-quality' : ''}`}
            key={category.number}
            variants={childVariants}
            whileHover={reduced ? undefined : { x: 5, transition: { duration: 0.24, ease } }}
          >
            <div className="skills-directory-key"><span>{category.number}</span><b>{category.icon}</b></div>
            <div className="skills-directory-copy"><h3>{category.title}</h3><p>{category.note}</p></div>
            <motion.ul className="skills-directory-list" variants={arsenalSkillListVariants}>
              {category.skills.map((skill, skillIndex) => (
                <motion.li key={skill} variants={arsenalContentVariants} whileHover={reduced ? undefined : { y: -2 }}>
                  <span>{String(skillIndex + 1).padStart(2, '0')}</span>{skill}
                </motion.li>
              ))}
            </motion.ul>
            <span className="skills-directory-arrow" aria-hidden="true">↗</span>
          </motion.article>
        ))}
      </div>
    </MotionSection>
    <MotionSection id="experience" className="section-wrap experience-section"><div className="section-kicker">04 / Professional experience</div><div className="section-heading"><Reveal><h2>Quality ownership<br /><em>at every level.</em></h2></Reveal><Reveal><p>Progressing at AppliconSoft from mobile UI internship experience to senior ownership of manual QA, chatbot validation, mentoring, and release quality.</p></Reveal></div><div className="timeline">{experience.map(([date, role, company, bullets], i) => <motion.article className="timeline-item" key={role} variants={i % 2 === 0 ? leftVariants : rightVariants}><div className="timeline-date mono">{date}</div><motion.div className="timeline-marker" animate={reduced ? undefined : { boxShadow: ['0 0 0 5px rgba(225,106,77,.12)', '0 0 0 9px rgba(225,106,77,0)', '0 0 0 5px rgba(225,106,77,.12)'] }} transition={{ duration: 2.8, repeat: Infinity, delay: i * 0.25 }} /><div className="timeline-content"><div className="role-line"><h3>{role}</h3><span className="company-tag">{company}</span></div><ul>{bullets.map((b) => <motion.li key={b} variants={childVariants}>{b}</motion.li>)}</ul></div></motion.article>)}</div></MotionSection>
    <MotionSection id="projects" className="section-wrap projects-section"><div className="section-kicker">05 / Selected projects</div><div className="projects-intro"><Reveal><h2>Products tested<br /><em>with purpose.</em></h2></Reveal><Reveal><p>QA experience across SaaS, AI chatbot, workforce, accounting, corporate web, and mobile products—plus one clearly identified university development project.</p></Reveal></div><motion.div className="projects-grid" variants={projectGridVariants} initial={reduced ? false : 'hidden'} whileInView="visible" viewport={{ once: true, amount: 0.08 }}>{visibleProjects.map((project, i) => <motion.article className={`project-card project-${project.type.toLowerCase()} project-${project.group.toLowerCase()}`} key={project.name} variants={childVariants} whileHover={reduced ? undefined : { y: -5, transition: { duration: 0.24, ease } }}><ProjectPreview src={project.image} name={project.name} type={project.type} /><div className="project-top"><span className="project-index">CASE / {String(i + 1).padStart(2, '0')}</span><span className="project-type">{project.group} · {project.type}</span></div><div className="project-report-meta">{project.type === 'FYP' ? <><span className="project-severity"><i /> PROJECT TYPE <b>UNIVERSITY DEVELOPMENT</b></span><span className="project-flow">DESIGN <i>→</i> BUILD <i>→</i> PREVIEW</span></> : <><span className="project-severity"><i /> QA SCOPE <b>VERIFIED</b></span><span className="project-flow">REVIEW <i>→</i> TEST <i>→</i> VERIFY</span></>}</div><motion.div className="project-glyph" whileHover={reduced ? undefined : { scale: 1.12, rotate: 5 }}>{project.type === 'AI' ? '✦' : project.type === 'FYP' ? '</>' : project.type === 'ERP' ? '▦' : project.type === 'Mobile' ? '⌁' : '↗'}</motion.div><motion.h3 className="project-name" variants={reduced ? undefined : projectTitleVariants} whileHover={reduced ? undefined : { x: 3 }}>{project.name}</motion.h3><p className="project-title">{project.title}</p><p>{project.desc}</p>{project.url ? <a href={project.url} target="_blank" rel="noreferrer" className="project-link">View project website <span>↗</span></a> : <span className="project-link muted">Four mobile applications tested</span>}</motion.article>)}</motion.div></MotionSection>
    <MotionSection id="mobile-testing" className="section-wrap mobile-testing-section">
      <div className="mobile-testing-lab">
        <Reveal className="mobile-testing-copy" variants={leftVariants}>
          <div className="mobile-testing-eyebrow"><span aria-hidden="true">●</span> MOBILE QA / FIELD EXPERIENCE</div>
          <h2>Mobile Application<br /><em>Testing.</em></h2>
          <p>Hands-on testing across mobile functionality, interface consistency, and usability—checking the details that shape a dependable experience on smaller screens.</p>
          <div className="mobile-testing-signals" aria-label="Mobile testing coverage">
            <span><b>04</b> applications tested</span>
            <span><b>03</b> quality focus areas</span>
          </div>
          <div className="mobile-testing-focus" aria-label="Testing focus areas">
            {['Functionality', 'UI consistency', 'Usability'].map((focus) => <span key={focus}><i aria-hidden="true">✓</i>{focus}</span>)}
          </div>
        </Reveal>

        <Reveal>
          {/* <motion.div className="mobile-device" aria-label="Mobile QA test run visual" whileHover={reduced ? undefined : { y: -5, rotate: -0.6 }} transition={{ duration: 0.3, ease }}>
            <div className="mobile-device-speaker" />
            <div className="mobile-device-screen">
              <div className="mobile-device-status"><span>09:41</span><span>QA ●</span></div>
              <div className="mobile-device-runner">
                <span className="mobile-runner-label">TEST SESSION</span>
                <strong>Mobile flow<br />inspection</strong>
                <div className="mobile-scan-visual" aria-hidden="true"><span /><i /></div>
                <ul>
                  <li><span>Functional flow</span><b>PASS</b></li>
                  <li><span>Interface review</span><b>PASS</b></li>
                  <li><span>Usability check</span><b>PASS</b></li>
                </ul>
              </div>
              <div className="mobile-device-home" />
            </div>
          </motion.div> */}

          <div className="mobile-project-directory">
            <div className="mobile-directory-header"><span>APPLICATIONS TESTED</span><b>04 / 04</b></div>
            <div className="mobile-testing-apps" aria-label="Applications tested">
              {['HRM', 'SnaptheCity', 'CorpCare', 'ProAdvisorCoach'].map((application, index) => (
                <motion.div className="mobile-app-entry" key={application} variants={childVariants} whileHover={reduced ? undefined : { x: 5 }} transition={{ duration: 0.22, ease }}>
                  <span className="mobile-app-index">0{index + 1}</span>
                  <span className="mobile-app-name">{application}</span>
                  <span className="mobile-app-status"><i aria-hidden="true" /> TESTED</span>
                </motion.div>
              ))}
            </div>
            <div className="mobile-directory-footer"><span>FUNCTIONALITY</span><i /> <span>UI</span><i /> <span>USABILITY</span></div>
          </div>
        </Reveal>
      </div>
    </MotionSection>
    <MotionSection className="section-wrap education-section">
      <div className="section-kicker">06 / Education</div>
      <div className="education-layout">
        <Reveal variants={leftVariants}>
          <h2>Grounded in<br /><em>computer science.</em></h2>
        </Reveal>
        <div className="education-timeline">
          <motion.article className="education-entry" variants={rightVariants}>
            <span className="education-year mono">2026</span>
            <div>
              <h3>Bachelor of Science in Computer Science <small>(BSCS)</small></h3>
              <p>Virtual University of Pakistan</p>
            </div>
          </motion.article>
          <motion.article className="education-entry" variants={rightVariants}>
            <span className="education-year mono">2023</span>
            <div>
              <h3>Associate Degree Program (ADP) in Computer Science</h3>
              <p>Virtual University of Pakistan</p>
              <small className="education-note">Transferred into the BSCS program.</small>
            </div>
          </motion.article>
        </div>
      </div>
    </MotionSection>
    <MotionSection className="resume-section">
      <div className="resume-layout">
        <Reveal className="resume-copy">
          <div className="section-kicker">07 / Resume</div>
          <h2>Experience in<br /><em>quality, clearly told.</em></h2>
          <p>Senior Software Quality Assurance Engineer with 2.5+ years of experience in manual QA, SaaS testing, mobile application testing and AI chatbot validation.</p>
          <div className="resume-actions">
            <motion.a className="button button-dark" href="/Humna_Ishfaq_Resume.pdf" download whileHover={reduced ? undefined : { y: -3 }} whileTap={reduced ? undefined : { scale: 0.98 }}>Download Resume <span aria-hidden="true">↓</span></motion.a>
            <a className="resume-view-link" href="/Humna_Ishfaq_Resume.pdf" target="_blank" rel="noreferrer">View Resume <span aria-hidden="true">↗</span></a>
          </div>
        </Reveal>
        <Reveal className="resume-preview" variants={rightVariants}>
          <div className="resume-preview-bar"><span>HUMNA ISHFAQ</span><span>RESUME / PDF</span></div>
          <iframe src="/Humna_Ishfaq_Resume.pdf#toolbar=0&navpanes=0&scrollbar=0&page=1&view=FitH" title="First page of Humna Ishfaq's resume" loading="lazy" />
        </Reveal>
      </div>
    </MotionSection>
    <motion.section id="contact" className="contact-section" variants={sectionVariants} initial={reduced ? false : 'hidden'} whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
      <div className="contact-inner">
        <div className="section-kicker">08 / Contact</div>
        <div className="contact-layout">
          <Reveal className="contact-intro">
            <p className="contact-name">Humna Ishfaq</p>
            <h2>Let&apos;s make<br /><em>quality matter.</em></h2>
            <p>Senior Software Quality Assurance Engineer, based in Lahore and open to remote opportunities. I welcome conversations about thoughtful QA and better product experiences.</p>
          </Reveal>
          <div className="contact-links">
            <Reveal><a href="mailto:humnaishfaq06@gmail.com"><span className="contact-icon" aria-hidden="true">@</span><span><span className="mono">EMAIL</span><span className="contact-value">humnaishfaq06@gmail.com</span></span><b aria-hidden="true">↗</b></a></Reveal>
            <Reveal><a href="tel:+923257848648"><span className="contact-icon" aria-hidden="true">☎</span><span><span className="mono">PHONE</span><span className="contact-value">+92 325 7848648</span></span><b aria-hidden="true">↗</b></a></Reveal>
            <Reveal><a href="https://www.linkedin.com/in/humna-ishfaq-31a3242a3" target="_blank" rel="noreferrer"><span className="contact-icon contact-linkedin-icon" aria-hidden="true">in</span><span><span className="mono">LINKEDIN</span><span className="contact-value">Humna Ishfaq</span></span><b aria-hidden="true">↗</b></a></Reveal>
            <Reveal><div className="contact-location"><span className="contact-icon" aria-hidden="true">⌖</span><span><span className="mono">LOCATION / AVAILABILITY</span><span className="contact-value">Lahore, Pakistan · Open to Remote</span></span></div></Reveal>
          </div>
        </div>
      </div>
    </motion.section>
    <footer><div className="footer-brand"><span>HI</span><div><strong>Humna Ishfaq</strong><small>Senior Software Quality Assurance Engineer</small></div></div><div className="footer-end"><a href="#top">Back to top ↑</a><span>© {year} Humna Ishfaq</span></div></footer>
  </main>;
}
