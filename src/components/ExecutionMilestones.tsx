import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion';
import {
  Code2,
  Server,
  CircuitBoard,
  Trophy,
  Bot,
  CheckCircle2,
  Cpu,
  Radio,
  Zap,
  Activity,
  Compass,
  Radar
} from 'lucide-react';

interface MilestoneData {
  id: string;
  sequence: string;
  year: string;
  periodLabel: string;
  title: string;
  badge: string;
  badgeType: 'default' | 'flagship' | 'silver' | 'active';
  description: string;
  tags: string[];
  icon: React.ElementType;
  coordinates: string;
  extraContent?: 'ecoplugify' | 'silverAward' | 'ros2Active';
}

const MILESTONES: MilestoneData[] = [
  {
    id: 'node-01',
    sequence: '01',
    year: '2022',
    periodLabel: 'Initial Kernel',
    title: 'BS Computer Science Matriculation',
    badge: 'UOG // GUJRAT',
    badgeType: 'default',
    description:
      'Began undergraduate studies focusing firmly on algorithmic fundamentals, object-oriented programming with modern C++, relational models, discrete mathematics, and low-level system calls. Established an uncompromising passion for hardware-adjacent programming paradigms.',
    tags: ['C++', 'Data Structures', 'OOP Architectures', 'Computer Networks'],
    icon: Code2,
    coordinates: 'LAT: 32.5744° N // SYSTEM_BOOT',
  },
  {
    id: 'node-02',
    sequence: '02',
    year: '2024–2025',
    periodLabel: 'Full-Stack Synthesis',
    title: 'Cloud Infrastructure & Dynamic Telemetry',
    badge: 'DISTRIBUTED_NET',
    badgeType: 'default',
    description:
      'Transitioned beyond sandbox scripts to design fault-tolerant web APIs, bi-directional WebSocket relays, and database schemas with MongoDB and relational engines. Engineered end-to-end tooling including custom inventory systems, dispatch monitors, and high-frequency data pipelines.',
    tags: ['Node.js / Express', 'WebSocket • Socket.IO', 'MongoDB / PostgreSQL', 'REST Architectures'],
    icon: Server,
    coordinates: 'IP: 192.168.1.0/24 // SOCKET_RELAY',
  },
  {
    id: 'node-03',
    sequence: '03',
    year: '2026',
    periodLabel: 'Physical Device Rollout',
    title: 'EcoPlugify: IoT Smart Energy Monitoring Prototype',
    badge: 'FLAGSHIP // IOT',
    badgeType: 'flagship',
    description:
      'Architected and bench-tested an ESP32-powered smart plug prototype paired with AC energy measurement, relay switching circuitry, and an MQTT telemetry bridge. Engineered C++ firmware, BLE onboarding, and companion React Native mobile application for Dr. Umer Shoaib’s supervised FYP.',
    tags: ['ESP32 Firmware', 'Energy Telemetry', 'MQTT Protocols', 'React Native CLI'],
    icon: CircuitBoard,
    coordinates: 'HW_REV: EP-01 // SILICON_BRIDGE',
    extraContent: 'ecoplugify',
  },
  {
    id: 'node-04',
    sequence: '04',
    year: '2026 // HONORS',
    periodLabel: '2nd Position FYP',
    title: 'UOG Computer Science FYP Competition Podium',
    badge: 'SILVER LAUREL',
    badgeType: 'silver',
    description:
      'Competed in the University of Gujrat departmental grand expo among dozens of software and engineering cohorts. Ranked #2 overall, validated by senior academic evaluators and industrial jury panels for solving critical local grid-monitoring inefficiencies with deployable edge hardware.',
    tags: ['Department of Computer Science', 'Verified Record', 'Institutional Silver', 'Jury Validated'],
    icon: Trophy,
    coordinates: 'EXPO // DEPT_CS // PODIUM_02',
    extraContent: 'silverAward',
  },
  {
    id: 'node-05',
    sequence: '05',
    year: 'PRESENT +',
    periodLabel: 'Active Horizon',
    title: 'Autonomous Robotics, ROS 2 & Edge Inference',
    badge: 'ACTIVE EXECUTION',
    badgeType: 'active',
    description:
      'Diving deeply into autonomous mobile robot (AMR) kinematics, publisher/subscriber nodes over DDS, 2D/3D LiDAR sensor fusion, and spatial mapping via SLAM. Translating computer vision models into real-time physical actuator routines.',
    tags: ['ROS 2 Jazzy', 'Nav2 Navigation', 'LiDAR Pointclouds', 'Kinematics Algorithms'],
    icon: Bot,
    coordinates: 'DDS_DOMAIN: 0 // SLAM_NAV2',
    extraContent: 'ros2Active',
  },
];

export const ExecutionMilestones: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll progression for the timeline track
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 75%'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <section ref={containerRef} className="py-space-xl relative overflow-hidden" aria-label="Execution Milestones">
      {/* Background Technical Grid Texture */}
      <div
        className="absolute inset-0 bg-tech-grid opacity-35 pointer-events-none -z-10 [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_90%)]"
        aria-hidden="true"
      />

      {/* Atmospheric Engineering Glows */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-secondary/5 rounded-full blur-[140px] pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute top-2/3 right-10 w-[420px] h-[420px] bg-[#38bdf8]/5 rounded-full blur-[130px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Section Header with Telemetry Strip */}
      <div className="flex flex-col gap-space-xs mb-space-xl">
        <div className="flex flex-wrap items-center justify-between gap-2 text-outline pb-1 border-b border-surface-container-high/40">
          <div className="flex items-center gap-space-xs font-mono-label text-[10px] sm:text-mono-label text-secondary tracking-widest uppercase font-bold">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span>EXECUTION MILESTONES // CHRONOLOGICAL SEQUENCE</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-4 font-mono-code text-[10px] sm:text-[11px] text-outline">
            <span className="hidden sm:inline">PIPELINE: DETERMINISTIC</span>
            <span className="text-outline-variant">•</span>
            <span>EPOCH: 2022 → PRESENT</span>
            <span className="text-outline-variant">•</span>
            <span className="text-secondary font-semibold">05 PHASES</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-space-sm pt-space-xs">
          <div>
            <h2 className="font-heading-xl text-2xl sm:text-3xl lg:text-heading-xl text-on-surface font-bold tracking-tight">
              The Cumulative <span className="text-secondary drop-shadow-[0_0_20px_rgba(170,224,46,0.3)]">Sequence</span>
            </h2>
            <p className="font-body-regular text-sm sm:text-body-regular text-on-surface-variant max-w-xl leading-relaxed mt-1">
              A physical logbook of system iterations, firmware deployments, academic validation, and autonomous robotics architectures.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-low border border-surface-container-high/60 text-outline font-mono-code text-[11px]">
            <Activity className="w-3.5 h-3.5 text-secondary animate-pulse" />
            <span>SYSTEM_TRACE: ACTIVE</span>
          </div>
        </div>
      </div>

      {/* The Centralized Timeline Structure */}
      <div className="relative w-full pb-space-lg">
        {/* DESKTOP TIMELINE TRACK (Centered at 50%) */}
        <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-4 bottom-12 w-[2px]" aria-hidden="true">
          {/* Subtle static laser rail */}
          <div className="absolute inset-0 bg-gradient-to-b from-surface-container-highest via-surface-container-high to-surface-container-lowest" />
          {/* Animated dynamic progress beam */}
          <motion.div
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-secondary via-[#38bdf8] to-secondary shadow-[0_0_12px_rgba(170,224,46,0.6)]"
            style={{
              height: '100%',
              scaleY: shouldReduceMotion ? 1 : smoothProgress,
              transformOrigin: 'top',
            }}
          />
        </div>

        {/* MOBILE TIMELINE TRACK (Left-aligned at left-4 / left-6) */}
        <div className="lg:hidden absolute left-4 sm:left-6 top-3 bottom-10 w-[2px]" aria-hidden="true">
          <div className="absolute inset-0 bg-surface-container-highest/60" />
          <motion.div
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-secondary via-[#38bdf8] to-secondary shadow-[0_0_10px_rgba(170,224,46,0.6)]"
            style={{
              height: '100%',
              scaleY: shouldReduceMotion ? 1 : smoothProgress,
              transformOrigin: 'top',
            }}
          />
        </div>

        {/* Milestone Cards Sequence */}
        <div className="flex flex-col gap-space-xl sm:gap-14 lg:gap-20">
          {MILESTONES.map((milestone, index) => {
            const isEven = index % 2 === 1; // index 1, 3 are on the right in alternating desktop
            const IconComponent = milestone.icon;

            return (
              <div
                key={milestone.id}
                className="relative w-full flex flex-col lg:flex-row items-stretch lg:items-center"
              >
                {/* DESKTOP CENTRAL JUNCTION NODE (Always at center 50%) */}
                <div
                  className="hidden lg:flex absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-20 items-center justify-center pointer-events-none"
                  aria-hidden="true"
                >
                  <div
                    className={`relative w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                      milestone.badgeType === 'flagship'
                        ? 'bg-background border-2 border-secondary shadow-[0_0_18px_rgba(170,224,46,0.5)]'
                        : milestone.badgeType === 'silver'
                        ? 'bg-background border-2 border-slate-300 shadow-[0_0_16px_rgba(226,232,240,0.4)]'
                        : milestone.badgeType === 'active'
                        ? 'bg-background border-2 border-[#38bdf8] shadow-[0_0_18px_rgba(56,189,248,0.5)]'
                        : 'bg-background border border-surface-container-highest shadow-sm'
                    }`}
                  >
                    {/* Inner glowing pip or pulse */}
                    <div
                      className={`w-2.5 h-2.5 rounded-full ${
                        milestone.badgeType === 'flagship'
                          ? 'bg-secondary animate-pulse'
                          : milestone.badgeType === 'silver'
                          ? 'bg-slate-200'
                          : milestone.badgeType === 'active'
                          ? 'bg-[#38bdf8] animate-ping'
                          : 'bg-outline-variant'
                      }`}
                    />
                    {/* Technical sequence identifier overlay */}
                    <span className="absolute -bottom-5 font-mono-label text-[9px] text-outline font-bold tracking-widest uppercase">
                      {milestone.sequence}
                    </span>
                  </div>
                </div>

                {/* MOBILE JUNCTION NODE (Pinned on left-4 / left-6) */}
                <div
                  className="lg:hidden absolute left-4 sm:left-6 -translate-x-1/2 top-4 z-20 flex items-center justify-center pointer-events-none"
                  aria-hidden="true"
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center border-2 ${
                      milestone.badgeType === 'flagship'
                        ? 'bg-surface-container-lowest border-secondary shadow-[0_0_12px_rgba(170,224,46,0.6)]'
                        : milestone.badgeType === 'silver'
                        ? 'bg-surface-container-lowest border-slate-300 shadow-[0_0_12px_rgba(226,232,240,0.4)]'
                        : milestone.badgeType === 'active'
                        ? 'bg-surface-container-lowest border-[#38bdf8] shadow-[0_0_14px_rgba(56,189,248,0.6)]'
                        : 'bg-surface-container-lowest border-surface-container-highest'
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${
                        milestone.badgeType === 'flagship'
                          ? 'bg-secondary animate-pulse'
                          : milestone.badgeType === 'silver'
                          ? 'bg-slate-200'
                          : milestone.badgeType === 'active'
                          ? 'bg-[#38bdf8] animate-ping'
                          : 'bg-outline-variant'
                      }`}
                    />
                  </div>
                </div>

                {/* DESKTOP ALTERNATING TWO-COLUMN CONTAINER */}
                <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-space-md lg:gap-12 items-center">
                  {/* LEFT WING (Col 1-5 on Desktop) */}
                  <div
                    className={`lg:col-span-5 flex flex-col ${
                      isEven ? 'lg:order-2 lg:col-start-8' : 'lg:order-1'
                    } pl-10 sm:pl-14 lg:pl-0`}
                  >
                    <motion.div
                      initial={
                        shouldReduceMotion
                          ? { opacity: 0 }
                          : {
                              opacity: 0,
                              y: 35,
                              x: isEven ? 20 : -20,
                              filter: 'blur(5px)',
                            }
                      }
                      whileInView={{
                        opacity: 1,
                        y: 0,
                        x: 0,
                        filter: 'blur(0px)',
                      }}
                      viewport={{ once: false, amount: 0.25, margin: '-40px' }}
                      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                      className={`group relative rounded-xl p-4 sm:p-space-lg transition-all duration-300 ${
                        milestone.badgeType === 'flagship'
                          ? 'bg-surface-container-low/95 border-2 border-secondary/50 shadow-[0_0_35px_rgba(170,224,46,0.12)] hover:border-secondary hover:shadow-[0_0_45px_rgba(170,224,46,0.22)]'
                          : milestone.badgeType === 'silver'
                          ? 'bg-surface-container-low/95 border-2 border-slate-300/40 shadow-[0_0_30px_rgba(226,232,240,0.1)] hover:border-slate-200 hover:shadow-[0_0_40px_rgba(226,232,240,0.18)]'
                          : milestone.badgeType === 'active'
                          ? 'bg-surface-container-low/95 border-2 border-[#38bdf8]/50 shadow-[0_0_35px_rgba(56,189,248,0.12)] hover:border-[#38bdf8] hover:shadow-[0_0_45px_rgba(56,189,248,0.2)]'
                          : 'bg-surface-container-low/90 border border-surface-container-high/60 hover:border-surface-container-highest shadow-sm hover:bg-surface-container-low'
                      }`}
                    >
                      {/* Top Circuit Tech Coordinate Bar */}
                      <div className="flex items-center justify-between pb-2 mb-space-sm border-b border-surface-container-high/40 text-outline font-mono-code text-[10px] sm:text-[11px]">
                        <span className="flex items-center gap-1.5 text-on-surface-variant font-medium">
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              milestone.badgeType === 'flagship'
                                ? 'bg-secondary animate-pulse'
                                : milestone.badgeType === 'silver'
                                ? 'bg-slate-300'
                                : milestone.badgeType === 'active'
                                ? 'bg-[#38bdf8] animate-ping'
                                : 'bg-outline'
                            }`}
                          />
                          <span>{milestone.coordinates}</span>
                        </span>
                        <span className="font-mono-label text-[10px] uppercase tracking-wider text-outline">
                          SEQ_0{milestone.sequence}
                        </span>
                      </div>

                      {/* Header with Year, Title and Badge */}
                      <div className="flex flex-col gap-1.5">
                        <div className="flex flex-wrap items-center justify-between gap-space-xs">
                          <div className="flex items-baseline gap-2">
                            <span
                              className={`font-mono-metric text-xl sm:text-2xl font-bold ${
                                milestone.badgeType === 'flagship'
                                  ? 'text-secondary drop-shadow-[0_0_12px_rgba(170,224,46,0.3)]'
                                  : milestone.badgeType === 'silver'
                                  ? 'text-slate-100 drop-shadow-[0_0_12px_rgba(226,232,240,0.25)]'
                                  : milestone.badgeType === 'active'
                                  ? 'text-[#38bdf8] drop-shadow-[0_0_12px_rgba(56,189,248,0.3)]'
                                  : 'text-secondary'
                              }`}
                            >
                              {milestone.year}
                            </span>
                            <span className="font-mono-label text-[11px] sm:text-mono-label text-outline uppercase tracking-wider">
                              • {milestone.periodLabel}
                            </span>
                          </div>

                          {/* Dynamic Badge */}
                          <div
                            className={`px-2.5 py-1 rounded font-mono-label text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase flex items-center gap-1.5 ${
                              milestone.badgeType === 'flagship'
                                ? 'bg-secondary text-on-secondary shadow-sm'
                                : milestone.badgeType === 'silver'
                                ? 'bg-gradient-to-r from-slate-200 to-slate-400 text-slate-950 font-bold shadow-sm'
                                : milestone.badgeType === 'active'
                                ? 'bg-[#38bdf8]/15 text-[#38bdf8] border border-[#38bdf8]/40 animate-pulse'
                                : 'bg-surface-container-high text-on-surface-variant'
                            }`}
                          >
                            <IconComponent className="w-3.5 h-3.5 shrink-0" />
                            <span>{milestone.badge}</span>
                          </div>
                        </div>

                        <h3 className="font-heading-md text-base sm:text-lg lg:text-heading-md text-on-surface font-bold pt-1">
                          {milestone.title}
                        </h3>
                      </div>

                      {/* Milestone Description */}
                      <p className="font-body-regular text-sm sm:text-body-regular text-on-surface-variant leading-relaxed mt-2">
                        {milestone.description}
                      </p>

                      {/* FLAGSHIP EMPHASIS: ECOPLUGIFY FIRMWARE TELEMETRY BOX */}
                      {milestone.extraContent === 'ecoplugify' && (
                        <div className="mt-space-md p-3 sm:p-space-md rounded-lg bg-surface-container-lowest border border-secondary/20 shadow-inner flex flex-col gap-2.5">
                          <div className="flex items-center justify-between font-mono-label text-[10px] sm:text-mono-label">
                            <span className="text-secondary font-bold flex items-center gap-1.5">
                              <Zap className="w-3.5 h-3.5 text-secondary animate-pulse" />
                              <span>FIRMWARE KERNEL EP-01 // TELEMETRY SUITE</span>
                            </span>
                            <span className="text-outline uppercase">PZEM-004T + ESP32</span>
                          </div>

                          {/* Animated Oscilloscope / Energy Waveform Trace */}
                          <div className="relative h-8 w-full bg-surface-container/70 rounded overflow-hidden flex items-center px-2">
                            <svg className="w-full h-6 text-secondary/80" viewBox="0 0 300 24" fill="none">
                              <path
                                d="M0 12 L40 12 L50 4 L60 20 L70 12 L110 12 L120 2 L130 22 L140 12 L180 12 L190 6 L200 18 L210 12 L260 12 L270 3 L280 21 L290 12 L300 12"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="opacity-90"
                              />
                            </svg>
                            <span className="absolute right-2 font-mono-code text-[10px] text-secondary font-bold">
                              50/60Hz ACTIVE
                            </span>
                          </div>

                          <p className="font-mono-code text-xs text-on-surface-variant leading-snug">
                            ESP32 Microcontroller • AC Relay Switching • MQTT Pub/Sub Telemetry • React Native App
                          </p>
                        </div>
                      )}

                      {/* HONORS EMPHASIS: UOG SECOND POSITION SILVER LAUREL BOX */}
                      {milestone.extraContent === 'silverAward' && (
                        <div className="mt-space-md p-3 sm:p-space-md rounded-lg bg-gradient-to-r from-slate-200/10 via-slate-100/5 to-slate-300/10 border border-slate-300/30 flex flex-col gap-2">
                          <div className="flex items-center justify-between font-mono-label text-[10px] sm:text-mono-label">
                            <span className="text-slate-200 font-bold flex items-center gap-1.5">
                              <Trophy className="w-4 h-4 text-slate-300" />
                              <span>CS SENIOR EXHIBITION PODIUM // SECOND POSITION</span>
                            </span>
                            <span className="px-1.5 py-0.5 rounded bg-slate-300/20 text-slate-200 font-bold text-[9px]">
                              RANK #2
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-2 sm:gap-space-md font-mono-code text-xs text-slate-300">
                            <span className="text-slate-100 font-semibold">&gt; Department of Computer Science</span>
                            <span className="text-outline">•</span>
                            <span className="text-slate-300">University of Gujrat</span>
                            <span className="text-outline">•</span>
                            <span className="text-secondary font-medium">Verified Record</span>
                          </div>
                        </div>
                      )}

                      {/* ACTIVE HORIZON: ROS 2 LIDAR & RADAR TELEMETRY BOX */}
                      {milestone.extraContent === 'ros2Active' && (
                        <div className="mt-space-md p-3 sm:p-space-md rounded-lg bg-surface-container-lowest border border-[#38bdf8]/30 flex flex-col gap-2.5">
                          <div className="flex items-center justify-between font-mono-label text-[10px] sm:text-mono-label">
                            <span className="text-[#38bdf8] font-bold flex items-center gap-1.5">
                              <Radar className="w-4 h-4 text-[#38bdf8] animate-spin [animation-duration:6s]" />
                              <span>AUTONOMOUS CYBER-PHYSICAL PIPELINE</span>
                            </span>
                            <span className="flex items-center gap-1 text-[#38bdf8] font-mono-code text-[10px]">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-ping" />
                              <span>DDS PUB/SUB ACTIVE</span>
                            </span>
                          </div>

                          <div className="flex items-center justify-between gap-3 p-2 rounded bg-surface-container/60 font-mono-code text-xs text-on-surface">
                            <div className="flex items-center gap-2">
                              <Compass className="w-4 h-4 text-[#38bdf8]" />
                              <span>2D/3D LiDAR Sensor Fusion</span>
                            </div>
                            <span className="text-[#38bdf8] font-bold">SLAM + Nav2</span>
                          </div>

                          <p className="font-mono-code text-xs text-on-surface-variant leading-snug">
                            AMR Kinematics • Micro-ROS on Microcontrollers • Real-time Actuator Feedback Loops
                          </p>
                        </div>
                      )}

                      {/* Technology Tags with Staggered Delays */}
                      <div className="flex flex-wrap gap-1.5 sm:gap-space-xs pt-space-md mt-space-xs">
                        {milestone.tags.map((tag, tagIndex) => (
                          <motion.span
                            key={tag}
                            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.92 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: false, amount: 0.4 }}
                            transition={{
                              duration: 0.35,
                              delay: shouldReduceMotion ? 0 : 0.15 + tagIndex * 0.05,
                            }}
                            className={`font-mono-label text-[11px] sm:text-mono-label px-2.5 py-1 rounded transition-colors ${
                              milestone.badgeType === 'flagship'
                                ? 'bg-secondary/10 border border-secondary/25 text-secondary font-semibold hover:bg-secondary/20'
                                : milestone.badgeType === 'silver'
                                ? 'bg-slate-300/10 border border-slate-300/25 text-slate-200 font-medium hover:bg-slate-300/20'
                                : milestone.badgeType === 'active'
                                ? 'bg-[#38bdf8]/10 border border-[#38bdf8]/25 text-[#38bdf8] font-medium hover:bg-[#38bdf8]/20'
                                : 'bg-surface-container-highest text-primary font-medium hover:bg-surface-container-high'
                            }`}
                          >
                            {tag}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  {/* RIGHT WING (Col 8-12 on Desktop) - Empty spacer to enforce clean alternating layout */}
                  <div
                    className={`hidden lg:block lg:col-span-5 ${
                      isEven ? 'lg:order-1 lg:col-start-1 text-right' : 'lg:order-2 text-left'
                    }`}
                    aria-hidden="true"
                  >
                    {/* Architectural Milestone Timestamp Pillar */}
                    <div className={`flex flex-col ${isEven ? 'items-end pr-8' : 'items-start pl-8'}`}>
                      <span className="font-mono-metric text-4xl font-extrabold text-outline/70 select-none">
                        {milestone.sequence}
                      </span>
                      <span className="font-mono-label text-xs text-outline uppercase tracking-widest mt-1">
                        PHASE // {milestone.periodLabel}
                      </span>
                      <div className="flex items-center gap-1 mt-2 text-outline font-mono-code text-[11px]">
                        <span>[STAMP: {milestone.year}]</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExecutionMilestones;
