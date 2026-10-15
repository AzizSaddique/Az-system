import React, { useState, useRef, useEffect, Suspense } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowDownward,
  NorthEast,
  Code,
  Sensors,
  Stars,
  EmojiEvents,
  Bolt,
  SyncAlt,
  ShieldWithHeart,
  ArrowForward,
  Public,
  PrecisionManufacturing,
  PhoneAndroid,
  Dns,
  Memory,
  SmartToy,
  MilitaryTech,
  Mail,
  Terminal
} from '../components/Icons';
import { PORTFOLIO_DATA, Project } from '../data/portfolioData';
import { EcoplugifyAppAnnouncement } from '../components/EcoplugifyAppAnnouncement';
import { ScrollReveal } from '../components/ScrollReveal';

// Code-split heavy modal dialog on demand
const CaseStudyModal = React.lazy(() => import('../components/CaseStudyModal').then(m => ({ default: m.CaseStudyModal })));

const TelemetryWaveform: React.FC = () => {
  const pathRef = useRef<SVGPathElement>(null);
  const [dotPos, setDotPos] = useState<{ x: number; y: number }>({ x: 0, y: 25 });

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    let animationFrameId: number;
    let startTime: number | null = null;
    const duration = 3500; // Smooth 3.5s loop along the telemetry wave

    const animate = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = (elapsed % duration) / duration;

      try {
        const totalLength = path.getTotalLength();
        if (totalLength > 0) {
          const pt = path.getPointAtLength(progress * totalLength);
          setDotPos({ x: pt.x, y: pt.y });
        }
      } catch (err) {
        // Fallback for browsers before path length calculation
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <div className="w-full h-8 pt-1">
      <svg className="w-full h-full text-secondary opacity-90 overflow-visible" fill="none" preserveAspectRatio="none" viewBox="0 0 300 40">
        <path
          ref={pathRef}
          d="M0,25 Q30,10 60,25 T120,20 T180,30 T240,12 T300,22"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle className="fill-secondary/40 animate-ping" cx={dotPos.x} cy={dotPos.y} r="5" />
        <circle className="fill-secondary" cx={dotPos.x} cy={dotPos.y} r="3" />
      </svg>
    </div>
  );
};

const TITLES = [
  { text: 'Software Developer', article: 'a' },
  { text: 'IoT Developer', article: 'an' },
  { text: 'Embedded Systems Developer', article: 'an' },
  { text: 'React Native Developer', article: 'a' },
  { text: 'Robotics Enthusiast', article: 'a' }
];

const TypewriterHeroHeading: React.FC = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionQuery.matches) {
      setIsReducedMotion(true);
      return;
    }

    const currentObj = TITLES[index];
    const currentTitle = currentObj.text;
    let speed = isDeleting ? 40 : 70;

    if (!isDeleting && displayedText === currentTitle) {
      speed = 2000;
    }

    const timer = setTimeout(() => {
      if (!isDeleting && displayedText === currentTitle) {
        setIsDeleting(true);
      } else if (isDeleting && displayedText === '') {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % TITLES.length);
      } else {
        const nextText = isDeleting
          ? currentTitle.substring(0, displayedText.length - 1)
          : currentTitle.substring(0, displayedText.length + 1);
        setDisplayedText(nextText);
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, index]);

  const currentArticle = TITLES[index].article;

  if (isReducedMotion) {
    return (
      <div className="flex flex-col justify-center min-h-[110px] sm:min-h-[130px] w-full">
        <h1 className="font-display-2xl text-2xl sm:text-3xl md:text-4xl lg:text-[42px] xl:text-[48px] 2xl:text-display-2xl tracking-tight leading-tight">
          <span className="text-on-surface lg:whitespace-nowrap block">
            I am {currentArticle} <span className="text-secondary font-bold">Software Developer</span>
          </span>
          <span className="text-[#111827] dark:text-[#F3F5F7] block mt-1">
            That Connects to the Real World.
          </span>
        </h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center min-h-[110px] sm:min-h-[130px] w-full">
      <h1 className="font-display-2xl text-2xl sm:text-3xl md:text-4xl lg:text-[42px] xl:text-[48px] 2xl:text-display-2xl tracking-tight leading-tight">
        <span className="text-on-surface lg:whitespace-nowrap inline-flex items-center flex-wrap max-w-full">
          <span>I am {currentArticle}&nbsp;</span>
          <span className="inline-flex items-center text-secondary font-bold">
            <span>{displayedText}</span>
            <span className="inline-block w-[3px] h-[0.85em] bg-secondary animate-pulse ml-1 shrink-0" />
          </span>
        </span>
        <span className="text-[#111827] dark:text-[#F3F5F7] block mt-1">
          That Connects to the Real World.
        </span>
      </h1>
    </div>
  );
};

export const HomePage: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="flex flex-col w-full relative">
      {/* Subtle Ambient Glow */}
      <div className="absolute top-12 left-1/4 w-96 h-96 rounded-full bg-secondary/10 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-96 right-10 w-80 h-80 rounded-full bg-tertiary-fixed-dim/10 blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-[1800px] left-10 w-96 h-96 rounded-full bg-secondary/5 blur-[160px] pointer-events-none -z-10" />

      {/* 1. HERO SECTION */}
      <section className="relative pt-6 pb-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg lg:gap-space-xl items-center">

          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-7 flex flex-col gap-space-md min-w-0">
            {/* Identity Badge */}
            <div className="inline-flex items-center gap-space-xs px-2.5 sm:px-space-sm py-1 rounded-full bg-surface-container-high w-fit max-w-full shadow-sm">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse shrink-0" />
              <span className="font-mono-label text-[10px] sm:text-mono-label text-secondary font-semibold uppercase tracking-wider truncate">
                SOFTWARE / EMBEDDED / ROBOTICS // NAROWAL, PK
              </span>
            </div>

            {/* Hero Headline */}
            <TypewriterHeroHeading />

            {/* Subtitle */}
            <p className="font-body-lg text-sm sm:text-body-lg text-on-surface-variant max-w-xl">
              Building high resilience mobile applications, scalable backend systems, and edge telemetry hardware engineered with a core focus on embedded systems and autonomous robotics.
            </p>

            {/* CTA Hub */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-space-md pt-space-xs">
              <a
                href="#featured-project"
                className="w-full sm:w-auto justify-center px-space-lg py-space-sm rounded-lg bg-secondary text-on-secondary font-mono-code text-mono-code font-bold shadow-md hover:bg-secondary-fixed transition-transform active:scale-95 flex items-center gap-space-xs min-h-[44px]"
              >
                <span>Explore My Work</span>
                <ArrowDownward className="text-[18px]" />
              </a>
              <Link
                to="/contact"
                className="w-full sm:w-auto justify-center px-space-lg py-space-sm rounded-lg bg-surface-container-high text-on-surface hover:text-secondary font-mono-code text-mono-code transition-colors flex items-center gap-space-xs min-h-[44px]"
              >
                <span>Let's Connect</span>
                <NorthEast className="text-[18px]" />
              </Link>
              <a
                href={PORTFOLIO_DATA.personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto justify-center px-space-md py-space-sm rounded-lg bg-surface-container-low text-on-surface-variant hover:text-secondary font-mono-label text-mono-label flex items-center gap-space-xs transition-colors min-h-[44px]"
              >
                <Code className="text-[16px]" />
                <span>github.com/AzizSaddique</span>
              </a>
            </div>

            {/* Micro Telemetry Ticker */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-space-sm pt-space-md max-w-lg">
              <div className="p-space-sm rounded-lg bg-surface-container-low flex flex-col gap-0.5">
                <span className="font-mono-label text-[10px] sm:text-mono-label text-outline">NODE STATUS</span>
                <span className="font-mono-code text-xs sm:text-mono-code font-bold text-on-surface flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary" /> 100% ONLINE
                </span>
              </div>
              <div className="p-space-sm rounded-lg bg-surface-container-low flex flex-col gap-0.5">
                <span className="font-mono-label text-[10px] sm:text-mono-label text-outline">HARDWARE STACK</span>
                <span className="font-mono-code text-xs sm:text-mono-code font-bold text-on-surface truncate">ESP32 / HLW8012</span>
              </div>
              <div className="p-space-sm rounded-lg bg-surface-container-low flex flex-col gap-0.5">
                <span className="font-mono-label text-[10px] sm:text-mono-label text-outline">RESEARCH FOCUS</span>
                <span className="font-mono-code text-xs sm:text-mono-code font-bold text-secondary truncate">ROS 2 • AUTONOMY</span>
              </div>
            </div>
          </div>

          {/* Right Column: Portrait Frame & Glass HUD Telemetry */}
          <div className="lg:col-span-5 relative flex flex-col items-center mt-6 lg:mt-0">
            {/* Floating HUD Telemetry Pill */}
            <div className="w-full max-w-md bg-surface-container-highest/90 backdrop-blur-xl p-3 sm:p-space-md rounded-xl shadow-xl flex flex-col gap-space-sm relative z-20 -mb-4 sm:-mb-8">
              <div className="flex items-center justify-between pb-space-xs text-[11px] sm:text-mono-label">
                <div className="flex items-center gap-space-xs font-mono-label text-secondary">
                  <Sensors className="text-[14px]" />
                  <span>LIVE TELEMETRY FEED</span>
                </div>
                <span className="font-mono-label text-outline">LATENCY: 12.4ms</span>
              </div>
              <div className="flex items-center justify-between bg-surface-container-lowest/80 p-space-xs rounded-lg px-2 sm:px-space-sm font-mono-code text-[11px] sm:text-mono-code gap-2">
                <span className="text-on-surface-variant truncate">ESP32_SOCKET_PK09</span>
                <span className="text-secondary font-bold whitespace-nowrap">ACTIVE (238V/4.1A)</span>
              </div>
              <TelemetryWaveform />
            </div>

            {/* Verified Portrait Image Container */}
            <div className="relative w-full max-w-md rounded-2xl overflow-hidden bg-surface-container-low border border-outline-variant/30 shadow-2xl aspect-[4/5] flex items-center justify-center group">
              <picture>
                <source
                  type="image/webp"
                  srcSet="/images/heroPortrait-360.webp 360w, /images/heroPortrait-448.webp 448w, /images/heroPortrait.webp 512w"
                  sizes="(max-width: 640px) 360px, (max-width: 1024px) 448px, 448px"
                />
                <img
                  alt="Muhammad Aziz Saddique portrait"
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  src="/images/heroPortrait-448.webp"
                  loading="eager"
                  decoding="async"
                  width={448}
                  height={560}
                />
              </picture>
              <div className="absolute inset-x-0 bottom-0 p-space-md bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/80 to-transparent flex justify-between items-end backdrop-blur-[2px]">
                <div>
                  <p className="font-heading-md text-heading-md text-on-surface font-bold">Muhammad Aziz Saddique</p>
                  <p className="font-mono-label text-mono-label text-secondary">CS GRADUATE // UNIVERSITY OF GUJRAT</p>
                </div>
                <span className="font-mono-label text-mono-label text-outline px-space-xs py-0.5 rounded bg-surface-container-high border border-outline-variant/20">
                  PK-2026
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ECOPLUGIFY MOBILE APP COMING SOON ANNOUNCEMENT */}
      <EcoplugifyAppAnnouncement />

      {/* 2. FLAGSHIP PROJECT: ECOPLUGIFY */}
      <ScrollReveal>
        <section className="py-space-xl w-full" id="featured-project">
          <div className="flex flex-col gap-space-md mb-space-lg">
            <div className="flex flex-wrap items-center justify-between gap-space-sm">
              <div className="flex items-center gap-space-xs font-mono-label text-mono-label text-secondary uppercase tracking-widest">
                <Stars className="text-[16px]" />
                <span>FLAGSHIP ENGINEERING SHOWCASE</span>
              </div>
              <div className="px-space-md py-1 rounded-full bg-secondary/10 text-secondary font-mono-label text-mono-label font-bold flex items-center gap-space-xs shadow-sm">
                <EmojiEvents className="text-[16px]" />
                <span>2nd Position — University of Gujrat FYP Competition 2026</span>
              </div>
            </div>
            <h2 className="font-heading-xl text-heading-xl text-on-surface">
              EcoPlugify — Smart Energy Monitoring &amp; Control System
            </h2>
            <p className="font-body-regular text-body-regular text-on-surface-variant max-w-2xl">
              An IoT smart plug engineering prototype paired with a React Native mobile application and Node.js backend. Features remote appliance switching, AC electrical telemetry, BLE onboarding, and tariff-based cost calculation.
            </p>
          </div>

          {/* Main Flagship Showcase Card */}
          <div className="bg-surface-container rounded-2xl overflow-hidden p-4 sm:p-space-lg shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center">
            <div className="lg:col-span-6 flex flex-col gap-space-md">
              <div className="rounded-xl overflow-hidden bg-surface-container-lowest shadow-inner relative group border border-outline-variant/20">
                <img
                  alt="EcoPlugify Physical Hardware Prototype Bench"
                  className="w-full h-64 sm:h-80 object-contain p-space-sm group-hover:scale-105 transition-transform duration-500"
                  src="/images/ecoplugify/hardware-prototype-640.webp"
                  loading="lazy"
                  decoding="async"
                  width={640}
                  height={480}
                />
                <div className="absolute top-space-sm left-space-sm bg-surface-container-highest/90 px-space-xs py-0.5 rounded font-mono-label text-[10px] sm:text-mono-label text-secondary max-w-[calc(100%-2rem)] truncate">
                  HARDWARE PROTOTYPE // UOG FYP 2026
                </div>
              </div>
              <div className="grid grid-cols-3 gap-1 sm:gap-space-xs text-center font-mono-code text-mono-code">
                <div className="bg-surface-container-low p-space-xs rounded-lg">
                  <div className="text-on-surface-variant text-[10px] sm:text-[11px]">CONTROLLER</div>
                  <div className="text-on-surface font-bold text-xs sm:text-mono-code">ESP32 Wi-Fi</div>
                </div>
                <div className="bg-surface-container-low p-space-xs rounded-lg">
                  <div className="text-on-surface-variant text-[10px] sm:text-[11px]">ACTUATION</div>
                  <div className="text-secondary font-bold text-xs sm:text-mono-code">Relay Switch</div>
                </div>
                <div className="bg-surface-container-low p-space-xs rounded-lg">
                  <div className="text-on-surface-variant text-[10px] sm:text-[11px]">PROTOCOL</div>
                  <div className="text-on-surface font-bold text-xs sm:text-mono-code">MQTT / TLS</div>
                </div>
              </div>
            </div>

          <div className="lg:col-span-6 flex flex-col gap-space-md">
            <div className="space-y-space-xs">
              <span className="font-mono-label text-mono-label text-outline uppercase">CORE ARCHITECTURAL STACK</span>
              <div className="flex flex-wrap gap-1.5 sm:gap-space-xs">
                <span className="px-space-sm py-1 rounded bg-surface-container-highest font-mono-code text-xs sm:text-mono-code text-secondary">ESP32 MCU</span>
                <span className="px-space-sm py-1 rounded bg-surface-container-highest font-mono-code text-xs sm:text-mono-code text-on-surface">C++ Firmware</span>
                <span className="px-space-sm py-1 rounded bg-surface-container-highest font-mono-code text-xs sm:text-mono-code text-on-surface">React Native CLI</span>
                <span className="px-space-sm py-1 rounded bg-surface-container-highest font-mono-code text-xs sm:text-mono-code text-on-surface">MQTT Broker</span>
                <span className="px-space-sm py-1 rounded bg-surface-container-highest font-mono-code text-xs sm:text-mono-code text-on-surface">Node.js / Express</span>
                <span className="px-space-sm py-1 rounded bg-surface-container-highest font-mono-code text-xs sm:text-mono-code text-on-surface">MongoDB</span>
                <span className="px-space-sm py-1 rounded bg-surface-container-highest font-mono-code text-xs sm:text-mono-code text-on-surface">BLE Provisioning</span>
              </div>
            </div>

            <div className="flex flex-col gap-space-sm text-sm sm:text-body-regular text-on-surface-variant">
              <div className="flex items-start gap-space-sm">
                <Bolt className="text-secondary text-[20px] shrink-0 mt-0.5" />
                <span><strong className="text-on-surface">AC Electrical Telemetry:</strong> Real-time voltage, current, and active power measurement research on connected loads.</span>
              </div>
              <div className="flex items-start gap-space-sm">
                <SyncAlt className="text-secondary text-[20px] shrink-0 mt-0.5" />
                <span><strong className="text-on-surface">MQTT Telemetry Pipeline:</strong> Standardized pub/sub message pipeline (data, relay, schedule, status) over local Wi-Fi.</span>
              </div>
              <div className="flex items-start gap-space-sm">
                <ShieldWithHeart className="text-secondary text-[20px] shrink-0 mt-0.5" />
                <span><strong className="text-on-surface">Mobile Control &amp; Provisioning:</strong> React Native CLI mobile client with Bluetooth Low Energy setup, live power meter, and PKR cost calculations.</span>
              </div>
            </div>

            <div className="pt-space-xs flex flex-wrap items-center gap-space-md">
              <button
                onClick={() => setSelectedProject(PORTFOLIO_DATA.projects[0])}
                className="w-full sm:w-auto justify-center px-space-md py-space-sm rounded-lg bg-surface-container-highest hover:bg-secondary hover:text-on-secondary font-mono-code text-mono-code font-semibold text-on-surface transition-colors flex items-center gap-space-xs min-h-[44px]"
              >
                <span>Explore Case Study</span>
                <ArrowForward className="text-[16px]" />
              </button>
              <span className="font-mono-label text-[11px] sm:text-mono-label text-outline">HONORS // 2ND POSITION UOG FYP 2026</span>
            </div>
          </div>
        </div>
      </section>
      </ScrollReveal>

      {/* 3. OTHER NOTABLE PROJECTS */}
      <ScrollReveal>
        <section className="py-space-xl w-full">
          <div className="flex flex-col gap-space-xs mb-space-lg">
            <span className="font-mono-label text-mono-label text-secondary uppercase tracking-widest">ECOSYSTEM REPOSITORY</span>
            <h2 className="font-heading-xl text-2xl sm:text-3xl lg:text-heading-xl text-on-surface">Engineered Systems &amp; Prototypes</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg">

            {/* Project 1 */}
            <div className="bg-surface-container p-4 sm:p-space-lg rounded-2xl flex flex-col justify-between gap-space-md shadow-lg group hover:bg-surface-container-high transition-colors">
              <div className="flex flex-col gap-space-sm">
                <div className="flex items-center justify-between">
                  <span className="px-space-xs py-0.5 rounded bg-surface-container-highest font-mono-label text-mono-label text-outline">LOGISTICS TELEMETRY</span>
                  <Public className="text-outline group-hover:text-secondary transition-colors text-[20px]" />
                </div>
                <h3 className="font-heading-lg text-xl sm:text-heading-lg text-on-surface group-hover:text-secondary transition-colors">
                  Yexon Impex Platform
                </h3>
                <p className="font-body-regular text-sm sm:text-body-regular text-on-surface-variant">
                  Full-stack enterprise supply-chain management portal engineered for real-time shipment dispatch tracking, inventory synchronization, and automated customs document generation.
                </p>
              </div>
              <div className="flex flex-col gap-space-sm pt-space-xs">
                <div className="flex flex-wrap gap-1.5 font-mono-code text-mono-code text-[12px] text-on-surface-variant">
                  <span className="bg-surface-container-low px-space-xs py-0.5 rounded">Next.js 14</span>
                  <span className="bg-surface-container-low px-space-xs py-0.5 rounded">TypeScript</span>
                  <span className="bg-surface-container-low px-space-xs py-0.5 rounded">PostgreSQL</span>
                  <span className="bg-surface-container-low px-space-xs py-0.5 rounded">Docker</span>
                </div>
                <div className="flex items-center justify-between font-mono-label text-mono-label text-outline pt-space-xs">
                  <span>PROD DEPLOYMENT</span>
                  <div className="flex items-center gap-space-md">
                    <button
                      onClick={() => setSelectedProject(PORTFOLIO_DATA.projects[1])}
                      className="hover:text-on-surface hover:underline"
                    >
                      DETAILS
                    </button>
                    <a
                      href="https://yexonimpex.store/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-secondary font-bold flex items-center gap-1 hover:underline"
                    >
                      VIEW DEMO <NorthEast className="text-[14px]" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Project 2 */}
            <div className="bg-surface-container p-4 sm:p-space-lg rounded-2xl flex flex-col justify-between gap-space-md shadow-lg group hover:bg-surface-container-high transition-colors">
              <div className="flex flex-col gap-space-sm">
                <div className="flex items-center justify-between">
                  <span className="px-space-xs py-0.5 rounded bg-secondary/15 font-mono-label text-mono-label text-secondary">ACTIVE RESEARCH // ROBOTICS</span>
                  <PrecisionManufacturing className="text-secondary text-[20px]" />
                </div>
                <h3 className="font-heading-lg text-xl sm:text-heading-lg text-on-surface group-hover:text-secondary transition-colors">
                  Autonomous Navigation Rover
                </h3>
                <p className="font-body-regular text-sm sm:text-body-regular text-on-surface-variant">
                  Differential drive mobile robotics platform utilizing ROS 2 nodes, 2D LiDAR point-cloud mapping, SLAM algorithms, and ultrasonic sensor array for autonomous collision avoidance.
                </p>
              </div>
              <div className="flex flex-col gap-space-sm pt-space-xs">
                <div className="flex flex-wrap gap-1.5 font-mono-code text-mono-code text-[12px] text-on-surface-variant">
                  <span className="bg-surface-container-low px-space-xs py-0.5 rounded">ROS 2 Humble</span>
                  <span className="bg-surface-container-low px-space-xs py-0.5 rounded">Python</span>
                  <span className="bg-surface-container-low px-space-xs py-0.5 rounded">LiDAR SLAM</span>
                  <span className="bg-surface-container-low px-space-xs py-0.5 rounded">Kinematics</span>
                </div>
                <div className="flex items-center justify-between font-mono-label text-mono-label text-outline pt-space-xs">
                  <span>R&amp;D LAB BENCH</span>
                  <button
                    onClick={() => setSelectedProject(PORTFOLIO_DATA.projects[2])}
                    className="text-secondary font-bold flex items-center gap-1 hover:underline"
                  >
                    DOCS • REPO <NorthEast className="text-[14px]" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </section>
      </ScrollReveal>

      {/* 4. ABOUT & ENGINEERING PHILOSOPHY */}
      <ScrollReveal>
        <section className="py-space-xl w-full">
          <div className="bg-surface-container-high/80 rounded-2xl p-4 sm:p-space-lg lg:p-space-xl shadow-xl flex flex-col lg:flex-row gap-space-lg lg:gap-space-xl items-center">
            <div className="w-full lg:w-1/3 flex flex-col gap-space-sm">
              <span className="font-mono-label text-mono-label text-secondary uppercase tracking-widest">ABOUT THE DEVELOPER</span>
              <h2 className="font-heading-xl text-2xl sm:text-3xl lg:text-heading-xl text-on-surface">
                Curious About Systems. Driven to Build.
              </h2>
              <div className="font-mono-code text-mono-code text-outline text-[12px] space-y-1">
                <div>// DEGREE: BS Computer Science</div>
                <div>// INSTITUTION: Univ. of Gujrat</div>
                <div>// SPECIALTY: Full-Stack &amp; IoT</div>
              </div>
            </div>
            <div className="w-full lg:w-2/3 flex flex-col gap-space-md text-body-regular text-body-regular text-on-surface-variant">
              <p>
                I operate at the intersection where high-level software logic converges with bare-metal microcontrollers and kinetic machinery. Having graduated in Computer Science from the University of Gujrat, my work is driven by a desire to solve tangible physical challenges through clean code and reliable hardware telemetry.
              </p>
              <p>
                Whether designing concurrent mobile applications in React Native, deploying distributed cloud backends, or configuring ROS 2 navigation stacks on edge hardware, I build maintainable, battle-tested software designed to withstand production constraints.
              </p>
              <div className="pt-space-xs">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-space-xs text-secondary font-mono-code text-mono-code font-bold hover:underline"
                >
                  <span>Read Complete Background &amp; Philosophy</span>
                  <ArrowForward className="text-[18px]" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* 5. TECHNICAL SKILLS: 4 CATEGORIZED GRIDS */}
      <ScrollReveal>
        <section className="py-space-xl w-full">
          <div className="flex flex-col gap-space-xs mb-space-lg">
            <span className="font-mono-label text-mono-label text-secondary uppercase tracking-widest">SYSTEM CAPABILITIES</span>
            <h2 className="font-heading-xl text-2xl sm:text-3xl lg:text-heading-xl text-on-surface">Core Competencies &amp; Toolchain</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">

            {/* Panel 1 */}
            <div className="bg-surface-container p-space-md rounded-xl flex flex-col gap-space-md shadow-md">
              <div className="flex items-center gap-space-xs font-mono-code text-mono-code font-bold text-on-surface">
                <PhoneAndroid className="text-secondary text-[20px]" />
                <span>Frontend &amp; Mobile</span>
              </div>
              <ul className="space-y-space-xs font-body-sm text-body-sm text-on-surface-variant">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-secondary" />React • Next.js</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-secondary" />React Native (Expo / CLI)</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-secondary" />Tailwind CSS &amp; UI Systems</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-secondary" />TypeScript • JavaScript</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-secondary" />Socket.IO Real-Time Feeds</li>
              </ul>
            </div>

            {/* Panel 2 */}
            <div className="bg-surface-container p-space-md rounded-xl flex flex-col gap-space-md shadow-md">
              <div className="flex items-center gap-space-xs font-mono-code text-mono-code font-bold text-on-surface">
                <Dns className="text-secondary text-[20px]" />
                <span>Backend &amp; Data</span>
              </div>
              <ul className="space-y-space-xs font-body-sm text-body-sm text-on-surface-variant">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-secondary" />Node.js &amp; Express.js</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-secondary" />MongoDB • Mongoose</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-secondary" />PostgreSQL • SQL Queries</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-secondary" />Firebase Ecosystem</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-secondary" />RESTful APIs &amp; Auth (JWT)</li>
              </ul>
            </div>

            {/* Panel 3 */}
            <div className="bg-surface-container p-space-md rounded-xl flex flex-col gap-space-md shadow-md">
              <div className="flex items-center gap-space-xs font-mono-code text-mono-code font-bold text-on-surface">
                <Memory className="text-secondary text-[20px]" />
                <span>IoT &amp; Embedded</span>
              </div>
              <ul className="space-y-space-xs font-body-sm text-body-sm text-on-surface-variant">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-secondary" />ESP32 / ESP8266 MCUs</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-secondary" />Embedded C++ • Arduino</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-secondary" />MQTT Protocol • Brokers</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-secondary" />HLW8012-004T / Sensor Integration</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-secondary" />Serial Communication (UART)</li>
              </ul>
            </div>

            {/* Panel 4 */}
            <div className="bg-surface-container p-space-md rounded-xl flex flex-col gap-space-md shadow-md">
              <div className="flex items-center gap-space-xs font-mono-code text-mono-code font-bold text-on-surface">
                <SmartToy className="text-secondary text-[20px]" />
                <span>Robotics (In-Progress)</span>
              </div>
              <ul className="space-y-space-xs font-body-sm text-body-sm text-on-surface-variant">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-secondary" />Python for Robotics</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-secondary" />ROS 2 (Robot Operating System)</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-secondary" />LiDAR Sensor Mapping / SLAM</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-secondary" />Kinematics • Mobile Rovers</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-secondary" />Gazebo Simulation</li>
              </ul>
            </div>

          </div>
        </section>
      </ScrollReveal>

      {/* 6. VERIFIED ACHIEVEMENT & CERTIFICATE */}
      <ScrollReveal>
        <section className="py-space-xl w-full">
          <div className="bg-surface-container rounded-2xl overflow-hidden p-4 sm:p-space-lg lg:p-space-xl shadow-xl flex flex-col lg:flex-row gap-space-lg lg:gap-space-xl items-center">
            <div className="lg:w-1/2 w-full flex justify-center">
              <div className="relative rounded-xl overflow-hidden bg-surface-container-lowest max-w-md w-full shadow-2xl">
                <img
                  alt="Final Year Project Competition Certificate Award Ceremony with supervisor Dr. Umer Shoaib at University of Gujrat"
                  className="w-full h-auto object-cover"
                  src={PORTFOLIO_DATA.personalInfo.certificateImage}
                  loading="lazy"
                  decoding="async"
                  width={500}
                  height={350}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-space-sm left-space-sm right-space-sm bg-surface-container-high/90 backdrop-blur-md p-space-xs rounded-lg flex items-center justify-between text-[11px] sm:text-mono-label">
                  <span className="font-mono-label text-secondary font-bold">VERIFIED RECOGNITION</span>
                  <span className="font-mono-label text-outline">UOG // 2026</span>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 flex flex-col gap-space-md">
              <div className="inline-flex items-center gap-space-xs px-space-sm py-1 rounded-full bg-secondary/10 w-fit text-secondary font-mono-label text-mono-label font-bold">
                <MilitaryTech className="text-[16px]" />
                <span>COMPETITIVE MERIT RECOGNITION</span>
              </div>
              <h2 className="font-heading-xl text-2xl sm:text-3xl lg:text-heading-xl text-on-surface">
                2nd Position Award Winner — Final Year Project Competition 2026
              </h2>
              <p className="font-body-regular text-sm sm:text-body-regular text-on-surface-variant">
                Recognized by the Department of Computer Science at the University of Gujrat for pioneering the <em>"EcoPlugify — Smart AI Energy Monitoring &amp; Control System"</em>. Awarded both certificate of distinction and cash prize under the supervision and guidance of Dr. Umer Shoaib.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm pt-space-xs font-mono-code text-mono-code text-[13px]">
                <div className="p-space-sm rounded-lg bg-surface-container-high flex flex-col">
                  <span className="text-outline text-[11px]">SUPERVISION</span>
                  <span className="text-on-surface font-semibold">Dr. Umer Shoaib</span>
                </div>
                <div className="p-space-sm rounded-lg bg-surface-container-high flex flex-col">
                  <span className="text-outline text-[11px]">PROJECT CLASSIFICATION</span>
                  <span className="text-secondary font-semibold">Smart Energy &amp; Edge AI</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* 7. CONTACT & INVITATION CALL TO ACTION */}
      <ScrollReveal>
        <section className="py-space-xl mb-12 w-full" id="contact">
          <div className="bg-surface-container-lowest rounded-2xl p-5 sm:p-space-lg lg:p-space-xl shadow-xl flex flex-col items-center text-center gap-space-md relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-secondary/5 via-transparent to-transparent pointer-events-none" />
            <div className="inline-flex items-center gap-space-xs px-space-sm py-1 rounded-full bg-surface-container-high text-secondary font-mono-label text-mono-label font-bold">
              <span className="w-2 h-2 rounded-full bg-secondary animate-ping" />
              <span>READY FOR COLLABORATION</span>
            </div>
            <h2 className="font-heading-xl text-2xl sm:text-3xl lg:text-heading-xl text-on-surface max-w-2xl">
              Have an Interesting Problem to Solve in Software or Connected Systems?
            </h2>
            <p className="font-body-regular text-sm sm:text-body-regular text-on-surface-variant max-w-xl">
              Let’s connect and engineer something tangible. I am available for software engineering roles, IoT development contracts, and embedded robotics ventures.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-space-md pt-space-sm w-full">
              <Link
                to="/contact"
                className="w-full sm:w-auto px-space-xl py-space-sm rounded-lg bg-secondary text-on-secondary font-mono-code text-mono-code font-bold hover:bg-secondary-fixed transition-transform active:scale-95 flex items-center justify-center gap-space-xs shadow-md min-h-[44px]"
              >
                <Mail className="text-[18px]" />
                <span>Get In Touch</span>
              </Link>
              <a
                href={PORTFOLIO_DATA.personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-space-lg py-space-sm rounded-lg bg-surface-container-high text-on-surface hover:text-secondary font-mono-code text-mono-code transition-colors flex items-center justify-center gap-space-xs min-h-[44px]"
              >
                <Terminal className="text-[18px]" />
                <span>View GitHub</span>
              </a>
            </div>
            <div className="pt-space-md font-mono-label text-[11px] sm:text-mono-label text-outline flex flex-wrap items-center justify-center gap-2 sm:gap-space-md">
              <span>RESPONSE TIME &lt; 24H</span>
              <span className="hidden sm:inline">•</span>
              <span>ENCRYPTED DIRECT CHANNEL</span>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Case Study Modal (Deferred & Code-Split on Demand) */}
      <Suspense fallback={null}>
        {selectedProject && (
          <CaseStudyModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </Suspense>
    </div>
  );
};

