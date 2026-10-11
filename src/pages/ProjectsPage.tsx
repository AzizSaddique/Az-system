import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Stars,
  EmojiEvents,
  Bolt,
  SyncAlt,
  ShieldWithHeart,
  ArrowForward,
  Public,
  PrecisionManufacturing,
  NorthEast,
  Mail,
  Terminal,
  Code
} from '../components/Icons';
import ecoVideo from '../assets/ecovideo.mp4';
import { PORTFOLIO_DATA, Project } from '../data/portfolioData';
import { CaseStudyModal } from '../components/CaseStudyModal';

export const ProjectsPage: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="flex flex-col w-full relative">
      {/* Subtle Ambient Glow */}
      <div className="absolute top-12 left-1/4 w-96 h-96 rounded-full bg-secondary/10 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-96 right-10 w-80 h-80 rounded-full bg-tertiary-fixed-dim/10 blur-[140px] pointer-events-none -z-10" />

      {/* 1. PROJECTS HERO HEADER */}
      <section className="relative pt-6 pb-12 w-full border-b border-outline-variant/20 mb-space-lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg lg:gap-space-xl items-center">
          
          {/* Left Column: Heading & Description */}
          <div className="lg:col-span-7 flex flex-col gap-space-md">
            <div className="inline-flex items-center gap-space-xs px-2.5 sm:px-space-sm py-1 rounded-full bg-surface-container-high w-fit max-w-full shadow-sm">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse shrink-0" />
              <span className="font-mono-label text-[10px] sm:text-mono-label text-secondary font-semibold uppercase tracking-wider truncate">
                SYSTEMS ARCHITECTURE // PROJECTS REPOSITORY
              </span>
            </div>

            <h1 className="font-display-2xl text-3xl sm:text-4xl md:text-5xl lg:text-display-2xl text-on-surface tracking-tight leading-tight">
              Engineered Projects &amp; <span className="text-secondary">Systems Showcase</span>
            </h1>

            <p className="font-body-lg text-sm sm:text-body-lg text-on-surface-variant">
              Comprehensive technical breakdown of embedded hardware telemetry, cloud infrastructures, cross-platform mobile software, and autonomous robotics platforms.
            </p>

            <div className="flex flex-wrap items-center gap-2 sm:gap-space-md pt-space-xs font-mono-code text-xs sm:text-[13px]">
              <div className="px-3 sm:px-space-md py-1.5 rounded-lg bg-surface-container-low border border-outline-variant/30 text-on-surface flex items-center gap-space-xs">
                <span className="w-2 h-2 rounded-full bg-secondary shrink-0" />
                <span>3 MAJOR DEPLOYMENTS</span>
              </div>
              <div className="px-3 sm:px-space-md py-1.5 rounded-lg bg-surface-container-low border border-outline-variant/30 text-on-surface flex items-center gap-space-xs">
                <Code className="text-[16px] text-secondary shrink-0" />
                <span>FULL-STACK &amp; EMBEDDED</span>
              </div>
            </div>
          </div>

          {/* Right Column: Ecoplugify Live Demo Portrait Video */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center pt-space-sm lg:pt-0">
            <div className="w-full max-w-[260px] sm:max-w-[320px] rounded-2xl overflow-hidden bg-surface-container border border-outline-variant/30 shadow-2xl p-2 flex flex-col gap-2">
              <div className="flex items-center justify-between px-2 py-1 font-mono-label text-mono-label text-secondary">
                <span className="flex items-center gap-1.5 font-bold text-xs sm:text-mono-label">
                  <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                  ECOPLUGIFY LIVE DEMO
                </span>
                <span className="text-outline text-[10px] sm:text-[11px]">PORTRAIT // 1080p</span>
              </div>
              <div className="relative w-full rounded-xl overflow-hidden bg-surface-container-lowest aspect-[9/16] flex items-center justify-center">
                <video
                  src={ecoVideo}
                  controls
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-contain rounded-xl"
                  aria-label="EcoPlugify Smart AI Energy Monitoring Live Demo Video"
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. FLAGSHIP PROJECT: ECOPLUGIFY */}
      <section className="py-space-md w-full" id="flagship">
        <div className="flex flex-col gap-space-md mb-space-lg">
          <div className="flex flex-wrap items-center justify-between gap-space-sm">
            <div className="flex items-center gap-space-xs font-mono-label text-[10px] sm:text-mono-label text-secondary uppercase tracking-widest">
              <Stars className="text-[16px]" />
              <span>FLAGSHIP ENGINEERING SHOWCASE</span>
            </div>
            <div className="px-3 sm:px-space-md py-1 rounded-full bg-secondary/10 text-secondary font-mono-label text-[10px] sm:text-mono-label font-bold flex items-center gap-space-xs shadow-sm">
              <EmojiEvents className="text-[16px]" />
              <span>2nd Position — University of Gujrat FYP Competition 2026</span>
            </div>
          </div>
          <h2 className="font-heading-xl text-2xl sm:text-3xl lg:text-heading-xl text-on-surface">
            EcoPlugify — Smart AI Energy Monitoring &amp; Control
          </h2>
          <p className="font-body-regular text-sm sm:text-body-regular text-on-surface-variant max-w-2xl">
            An end-to-end IoT and edge computing system designed to combat energy wastage. Combines custom-engineered hardware telemetry with sub-second MQTT communication and a cross-platform mobile management client.
          </p>
        </div>

        {/* Main Flagship Showcase Card */}
        <div className="bg-surface-container rounded-2xl overflow-hidden p-4 sm:p-space-lg shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center">
          <div className="lg:col-span-6 flex flex-col gap-space-md">
            <div className="rounded-xl overflow-hidden bg-surface-container-lowest shadow-inner relative group">
              <img
                alt="EcoPlugify Smart Plug Device Render"
                className="w-full h-64 sm:h-80 object-contain p-space-sm group-hover:scale-105 transition-transform duration-500"
                src={PORTFOLIO_DATA.personalInfo.ecoPlugifyRender}
              />
              <div className="absolute top-space-sm left-space-sm bg-surface-container-highest/90 px-space-xs py-0.5 rounded font-mono-label text-[10px] sm:text-mono-label text-secondary max-w-[calc(100%-2rem)] truncate">
                HARDWARE SPEC // EP-01 (16A / 3680W)
              </div>
            </div>
            <div className="grid grid-cols-3 gap-1 sm:gap-space-xs text-center font-mono-code text-mono-code">
              <div className="bg-surface-container-low p-space-xs rounded-lg">
                <div className="text-on-surface-variant text-[10px] sm:text-[11px]">SAMPLING</div>
                <div className="text-on-surface font-bold text-xs sm:text-mono-code">&lt; 100ms</div>
              </div>
              <div className="bg-surface-container-low p-space-xs rounded-lg">
                <div className="text-on-surface-variant text-[10px] sm:text-[11px]">MAX LOAD</div>
                <div className="text-secondary font-bold text-xs sm:text-mono-code">16A / 3.6kW</div>
              </div>
              <div className="bg-surface-container-low p-space-xs rounded-lg">
                <div className="text-on-surface-variant text-[10px] sm:text-[11px]">WIRELESS</div>
                <div className="text-on-surface font-bold text-xs sm:text-mono-code">Wi-Fi 2.4GHz</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col gap-space-md">
            <div className="space-y-space-xs">
              <span className="font-mono-label text-mono-label text-outline uppercase">CORE ARCHITECTURAL STACK</span>
              <div className="flex flex-wrap gap-1.5 sm:gap-space-xs">
                <span className="px-space-sm py-1 rounded bg-surface-container-highest font-mono-code text-xs sm:text-mono-code text-secondary">ESP32 MCU</span>
                <span className="px-space-sm py-1 rounded bg-surface-container-highest font-mono-code text-xs sm:text-mono-code text-on-surface">React Native</span>
                <span className="px-space-sm py-1 rounded bg-surface-container-highest font-mono-code text-xs sm:text-mono-code text-on-surface">Node.js / Express</span>
                <span className="px-space-sm py-1 rounded bg-surface-container-highest font-mono-code text-xs sm:text-mono-code text-on-surface">MQTT Broker</span>
                <span className="px-space-sm py-1 rounded bg-surface-container-highest font-mono-code text-xs sm:text-mono-code text-on-surface">MongoDB</span>
                <span className="px-space-sm py-1 rounded bg-surface-container-highest font-mono-code text-xs sm:text-mono-code text-on-surface">PZEM-004T</span>
              </div>
            </div>

            <div className="flex flex-col gap-space-sm text-sm sm:text-body-regular text-on-surface-variant">
              <div className="flex items-start gap-space-sm">
                <Bolt className="text-secondary text-[20px] shrink-0 mt-0.5" />
                <span><strong className="text-on-surface">Precision AC Load Measurement:</strong> Real-time voltage, current, and true active power readings via hardware isolated PZEM-004T module.</span>
              </div>
              <div className="flex items-start gap-space-sm">
                <SyncAlt className="text-secondary text-[20px] shrink-0 mt-0.5" />
                <span><strong className="text-on-surface">Ultra-Low Latency Telemetry:</strong> MQTT Pub/Sub architecture transmitting metrics to cloud clusters within 85ms for rapid graph updates.</span>
              </div>
              <div className="flex items-start gap-space-sm">
                <ShieldWithHeart className="text-secondary text-[20px] shrink-0 mt-0.5" />
                <span><strong className="text-on-surface">Automated Overload Cutoff:</strong> Autonomous on-device relay trip triggers safeguard sensitive appliances against voltage spikes.</span>
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
              <span className="font-mono-label text-[11px] sm:text-mono-label text-outline">PATENT PENDING // PK-2026</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ECOSYSTEM REPOSITORY: OTHER NOTABLE PROJECTS */}
      <section className="py-space-xl w-full">
        <div className="flex flex-col gap-space-xs mb-space-lg">
          <span className="font-mono-label text-mono-label text-secondary uppercase tracking-widest">ECOSYSTEM REPOSITORY</span>
          <h2 className="font-heading-xl text-2xl sm:text-3xl lg:text-heading-xl text-on-surface">Engineered Systems &amp; Prototypes</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg">
          
          {/* Project 1: Yexon Impex */}
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

          {/* Project 2: Autonomous Navigation Rover */}
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

      {/* 4. CONTACT / CALL TO ACTION */}
      <section className="py-space-xl mb-12 w-full">
        <div className="bg-surface-container-lowest rounded-2xl p-5 sm:p-space-lg lg:p-space-xl shadow-xl flex flex-col items-center text-center gap-space-md relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-secondary/5 via-transparent to-transparent pointer-events-none" />
          <h2 className="font-heading-xl text-2xl sm:text-3xl lg:text-heading-xl text-on-surface max-w-2xl">
            Interested in Technical Collaboration or System Architecture?
          </h2>
          <p className="font-body-regular text-sm sm:text-body-regular text-on-surface-variant max-w-xl">
            Whether you need custom hardware integration, full-stack web platforms, or embedded telemetry solutions, let’s talk.
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
        </div>
      </section>

      {/* Case Study Modal */}
      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
};

export default ProjectsPage;
