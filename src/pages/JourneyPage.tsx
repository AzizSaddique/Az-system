import React from 'react';
import { Link } from 'react-router-dom';
import {
  MilitaryTech,
  CheckCircle,
  DeveloperBoard,
  Route,
  Memory,
  PrecisionManufacturing,
  Code,
  Send
} from '../components/Icons';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { ExecutionMilestones } from '../components/ExecutionMilestones';
import { ScrollReveal } from '../components/ScrollReveal';
import { LazyImage } from '../components/LazyImage';

export const JourneyPage: React.FC = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="relative w-full overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[650px] h-[340px] bg-secondary/10 rounded-full blur-[130px] pointer-events-none -z-10 animate-ambient-glow-1" />
        <div className="absolute top-[800px] -left-32 w-[450px] h-[450px] bg-surface-container-high/40 rounded-full blur-[140px] pointer-events-none -z-10 animate-ambient-glow-2" />

        {/* 1. Header Section */}
        <ScrollReveal>
          <header className="py-space-xl flex flex-col items-start gap-space-md">
            <div className="inline-flex items-center gap-space-xs px-space-sm py-1 rounded-full bg-surface-container-high border-0 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-ping" />
              <span className="font-mono-label text-mono-label text-secondary tracking-widest uppercase">
                CHRONOLOGY // EDUCATION &amp; MILESTONES
              </span>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between w-full gap-space-md lg:gap-space-lg">
              <div className="max-w-2xl space-y-space-sm">
                <h1 className="font-display-2xl text-3xl sm:text-4xl md:text-5xl lg:text-display-2xl tracking-tight text-on-surface leading-tight">
                  Learning by{' '}
                  <span className="text-secondary drop-shadow-[0_0_24px_rgba(170,224,46,0.35)]">
                    Building.
                  </span>
                </h1>
                <p className="font-body-lg text-sm sm:text-body-lg text-on-surface-variant leading-relaxed">
                  A chronological trace across academic rigor, bare-metal hardware execution, and verified milestones from the University of Gujrat to autonomous cyber-physical systems.
                </p>
              </div>

              {/* Telemetry Pill */}
              <div className="flex items-center gap-3 sm:gap-space-md font-mono-code text-xs sm:text-mono-code text-outline-variant bg-surface-container-lowest/80 p-2.5 sm:p-space-sm rounded-xl w-fit">
                <div className="flex flex-col">
                  <span className="font-mono-label text-[10px] sm:text-mono-label text-outline uppercase">Active Node</span>
                  <span className="text-on-surface font-semibold text-xs sm:text-sm">UOG_CS // FYP-26</span>
                </div>
                <div className="h-7 w-px bg-surface-container-high" />
                <div className="flex flex-col">
                  <span className="font-mono-label text-[10px] sm:text-mono-label text-outline uppercase">Domain</span>
                  <span className="text-secondary font-semibold text-xs sm:text-sm">Embedded + ROS 2</span>
                </div>
              </div>
            </div>
          </header>
        </ScrollReveal>

        {/* 2. Interactive Verified Highlight Reel */}
        <section className="my-space-xl relative rounded-xl bg-surface-container-lowest/90 overflow-hidden shadow-xl">
          <div className="p-4 sm:p-space-lg lg:p-space-xl flex flex-col gap-space-lg">
            <ScrollReveal>
              <div className="flex flex-wrap items-center justify-between gap-space-md">
                <div className="flex items-center gap-space-sm">
                  <span className="p-2 rounded-lg bg-surface-container-high text-secondary flex items-center justify-center shrink-0">
                    <MilitaryTech className="w-5 h-5 text-secondary" />
                  </span>
                  <div>
                    <div className="font-mono-label text-[10px] sm:text-mono-label text-secondary tracking-wider font-semibold uppercase">
                      Institutional Honors // 2026
                    </div>
                    <h2 className="font-heading-lg text-xl sm:text-heading-lg text-on-surface">
                      2nd Position • Final Year Project Competition
                    </h2>
                  </div>
                </div>
                <div className="flex items-center gap-space-xs px-3 sm:px-space-md py-1.5 rounded-full bg-secondary/10 text-secondary font-mono-label text-[10px] sm:text-mono-label uppercase tracking-wider font-bold">
                  <CheckCircle className="w-4 h-4 text-secondary shrink-0" />
                  <span>Official UOG Citation</span>
                </div>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center">
              <ScrollReveal direction="left" delay={0.08} className="lg:col-span-5 flex flex-col gap-space-md">
                <p className="font-body-regular text-sm sm:text-body-regular text-on-surface-variant leading-relaxed">
                  Awarded second place in the competitive CS Senior Exhibition at the Department of Computer Science, University of Gujrat. Recognized for architectural integrity, direct IoT hardware implementation, and full-stack telemetry capabilities in the <span className="text-on-surface font-semibold">Ecoplugify</span> project.
                </p>

                <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-space-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-mono-label text-[10px] sm:text-mono-label text-outline uppercase">Project Supervisor</span>
                    <span className="font-mono-label text-[10px] sm:text-mono-label text-secondary">CS_FACULTY</span>
                  </div>
                  <span className="font-heading-md text-base sm:text-heading-md text-on-surface font-bold">Dr. Umer Shoaib</span>
                  <span className="font-body-sm text-xs sm:text-body-sm text-on-surface-variant">Chairperson / Associate Professor, Department of Computer Science</span>
                </div>

                <div className="grid grid-cols-2 gap-space-sm font-mono-code text-mono-code pt-space-xs">
                  <div className="p-space-sm rounded-lg bg-surface-container-high/60 flex flex-col">
                    <span className="font-mono-label text-[10px] sm:text-mono-label text-outline">Prize Pool</span>
                    <span className="text-secondary font-bold text-xs sm:text-body-regular">Cash Awarded</span>
                  </div>
                  <div className="p-space-sm rounded-lg bg-surface-container-high/60 flex flex-col">
                    <span className="font-mono-label text-[10px] sm:text-mono-label text-outline">Certification</span>
                    <span className="text-on-surface font-bold text-xs sm:text-body-regular">Official Scroll</span>
                  </div>
                </div>
              </ScrollReveal>

              {/* Dual Proof Images */}
              <ScrollReveal direction="right" delay={0.16} className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                <div className="group relative rounded-xl overflow-hidden bg-surface-container-high shadow-md">
                  <LazyImage
                    alt="Award Ceremony Handover with Dr. Umer Shoaib"
                    className="w-full h-60 sm:h-80 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    wrapperClassName="w-full h-60 sm:h-80"
                    src={PORTFOLIO_DATA.personalInfo.stageImage}
                    skeletonLabel="UOG_CEREMONY"
                    width={600}
                    height={400}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent opacity-90 pointer-events-none" />
                  <div className="absolute bottom-space-md left-space-md right-space-md pointer-events-none">
                    <span className="font-mono-label text-[10px] sm:text-mono-label text-secondary block font-bold uppercase tracking-wider">Artifact #01</span>
                    <span className="font-body-sm text-xs sm:text-body-sm text-on-surface font-medium">Departmental Handover • Dr. Umer Shoaib</span>
                  </div>
                </div>

                <div className="group relative rounded-xl overflow-hidden bg-surface-container-high shadow-md">
                  <LazyImage
                    alt="University of Gujrat Campus FYP Envelope"
                    className="w-full h-60 sm:h-80 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    wrapperClassName="w-full h-60 sm:h-80"
                    src={PORTFOLIO_DATA.personalInfo.campusImage}
                    skeletonLabel="CAMPUS_DISPATCH"
                    width={600}
                    height={400}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent opacity-90 pointer-events-none" />
                  <div className="absolute bottom-space-md left-space-md right-space-md pointer-events-none">
                    <span className="font-mono-label text-[10px] sm:text-mono-label text-secondary block font-bold uppercase tracking-wider">Artifact #02</span>
                    <span className="font-body-sm text-xs sm:text-body-sm text-on-surface font-medium">Hafiz Hayat Campus • Official Dispatch</span>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* 3. Upgraded Execution Milestones — The Cumulative Sequence */}
        <ExecutionMilestones />

        {/* 4. Strategic Direction (3 Pillars) */}
        <section className="py-space-xl">
          <ScrollReveal>
            <div className="flex flex-col gap-space-xs mb-space-lg">
              <span className="font-mono-label text-mono-label text-secondary uppercase tracking-widest font-bold">The Strategic Direction</span>
              <h2 className="font-heading-xl text-2xl sm:text-3xl lg:text-heading-xl text-on-surface">Building Toward Intelligent Systems</h2>
              <p className="font-body-regular text-sm sm:text-body-regular text-on-surface-variant max-w-xl">
                Three technological pillars directing my ongoing engineering endeavors, research, and technical implementations.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
            <ScrollReveal delay={0}>
              <div className="h-full p-space-lg rounded-xl bg-surface-container-low shadow-sm flex flex-col justify-between group hover:bg-surface-container transition-colors card-interactive">
                <div className="space-y-space-md">
                  <div className="flex items-center justify-between">
                    <span className="font-mono-label text-mono-label text-secondary font-bold">01 // AUTONOMY</span>
                    <Route className="text-outline group-hover:text-secondary transition-colors" />
                  </div>
                  <h3 className="font-heading-md text-heading-md text-on-surface font-semibold">Autonomous Navigation &amp; SLAM</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    Developing deterministic path planning and dynamic obstacle avoidance nodes with Nav2, sensor calibration, and localized SLAM algorithms running on Linux onboard controllers.
                  </p>
                </div>
                <div className="pt-space-lg mt-space-md border-t border-surface-container-high/60 flex items-center justify-between font-mono-label text-mono-label text-outline">
                  <span>TARGET: ROS 2 + RTOS</span>
                  <span className="text-secondary font-bold transition-transform duration-200 group-hover:translate-x-1">→</span>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="h-full p-space-lg rounded-xl bg-surface-container-low shadow-sm flex flex-col justify-between group hover:bg-surface-container transition-colors card-interactive">
                <div className="space-y-space-md">
                  <div className="flex items-center justify-between">
                    <span className="font-mono-label text-mono-label text-secondary font-bold">02 // EDGE COMPUTATION</span>
                    <Memory className="text-outline group-hover:text-secondary transition-colors" />
                  </div>
                  <h3 className="font-heading-md text-heading-md text-on-surface font-semibold">Embedded Machine Learning</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    Compressing neural network weights into TinyML topologies to execute sub-millisecond inference directly on resource-constrained silicon without cloud round-trip latencies.
                  </p>
                </div>
                <div className="pt-space-lg mt-space-md border-t border-surface-container-high/60 flex items-center justify-between font-mono-label text-mono-label text-outline">
                  <span>TARGET: TinyML + ESP32-S3</span>
                  <span className="text-secondary font-bold transition-transform duration-200 group-hover:translate-x-1">→</span>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="h-full p-space-lg rounded-xl bg-surface-container-low shadow-sm flex flex-col justify-between group hover:bg-surface-container transition-colors card-interactive">
                <div className="space-y-space-md">
                  <div className="flex items-center justify-between">
                    <span className="font-mono-label text-mono-label text-secondary font-bold">03 // PHYSICAL INTERACTION</span>
                    <PrecisionManufacturing className="text-outline group-hover:text-secondary transition-colors" />
                  </div>
                  <h3 className="font-heading-md text-heading-md text-on-surface font-semibold">Human-Hardware Ecosystems</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    Formulating low-latency, intuitive tactile interfaces and control telemetry systems to govern real-world robotics fleets, sensors, and distributed power grids.
                  </p>
                </div>
                <div className="pt-space-lg mt-space-md border-t border-surface-container-high/60 flex items-center justify-between font-mono-label text-mono-label text-outline">
                  <span>TARGET: HMI + Real-Time Telemetry</span>
                  <span className="text-secondary font-bold transition-transform duration-200 group-hover:translate-x-1">→</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* 5. Trajectory Diagnostics Terminal Block */}
        <ScrollReveal>
          <section className="my-space-lg p-4 sm:p-space-lg rounded-xl bg-surface-container-lowest font-mono-code text-xs sm:text-mono-code shadow-md overflow-x-auto">
            <div className="flex items-center justify-between pb-space-sm mb-space-md border-b border-surface-container-high/40 min-w-[280px]">
              <div className="flex items-center gap-space-xs">
                <span className="w-3 h-3 rounded-full bg-error/70" />
                <span className="w-3 h-3 rounded-full bg-secondary/70" />
                <span className="w-3 h-3 rounded-full bg-[#65D9FF]/70" />
                <span className="ml-space-sm font-mono-label text-[10px] sm:text-mono-label text-outline uppercase tracking-wider">
                  az_trajectory_diagnostics.sh
                </span>
              </div>
              <span className="font-mono-label text-[10px] sm:text-mono-label text-secondary">STATUS: RUNNING</span>
            </div>
            <div className="space-y-1.5 text-on-surface-variant min-w-[280px]">
              <p className="break-all sm:break-normal"><span className="text-secondary font-semibold">aziz@uog-sys:~$</span> query --candidate "Muhammad Aziz Saddique" --achievements</p>
              <p className="text-on-surface pl-3 sm:pl-4">&gt; MATCH FOUND: Department of Computer Science, University of Gujrat</p>
              <p className="text-on-surface pl-3 sm:pl-4">&gt; 2nd Position [FYP Competition 2026] • Award Certificate ID: #UOG-CS-2026-02</p>
              <p className="text-on-surface pl-3 sm:pl-4">&gt; Project Core: Ecoplugify (Smart Energy &amp; Remote Power Interrupter)</p>
              <p className="break-all sm:break-normal"><span className="text-secondary font-semibold">aziz@uog-sys:~$</span> ros2 topic echo /robot/status</p>
              <p className="text-secondary pl-3 sm:pl-4">&gt; [OK] Nodes Online: 6 | Sensor Sync: 100% | Kinematics Loop: 50Hz Nominal</p>
              <div className="flex items-center gap-space-xs pt-space-xs">
                <span className="text-secondary font-semibold">aziz@uog-sys:~$</span>
                <span className="w-2.5 h-4 bg-secondary inline-block animate-pulse" />
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* 6. Call to Action / Dispatch Footer Section */}
        <ScrollReveal>
          <section className="mt-space-xl p-5 sm:p-space-xl rounded-xl bg-surface-container-low shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-space-lg">
            <div className="space-y-space-xs max-w-xl">
              <span className="font-mono-label text-mono-label text-secondary uppercase tracking-widest font-semibold">Let's Build Together</span>
              <h3 className="font-heading-lg text-xl sm:text-heading-lg text-on-surface font-bold">Follow the Journey or Collaborate</h3>
              <p className="font-body-regular text-sm sm:text-body-regular text-on-surface-variant">
                Seeking engineering opportunities in software development, embedded firmware, IoT architectures, and robotics innovation.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-space-sm font-mono-code text-mono-code w-full md:w-auto">
              <a
                className="w-full sm:w-auto px-space-lg py-space-sm rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface transition-all flex items-center justify-center gap-space-xs shadow-sm min-h-[44px] btn-micro group"
                href={PORTFOLIO_DATA.personalInfo.github}
                rel="noopener noreferrer"
                target="_blank"
              >
                <Code className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />
                <span>GitHub Activity</span>
              </a>
              <Link
                to="/contact"
                className="w-full sm:w-auto px-space-lg py-space-sm rounded-lg bg-secondary hover:bg-secondary-fixed text-on-secondary font-semibold transition-all flex items-center justify-center gap-space-xs shadow-sm min-h-[44px] btn-micro group"
              >
                <Send className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                <span>Initiate Contact</span>
              </Link>
            </div>
          </section>
        </ScrollReveal>

      </div>
    </div>
  );
};
