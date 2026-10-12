import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ExternalLink,
  Cpu,
  Smartphone,
  Award,
  Network,
  Wrench,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Zap,
  Info,
  Calendar,
  DollarSign,
  Radio,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { Project } from '../data/portfolioData';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
}

type EcoPlugifyTab =
  | 'overview'
  | 'hardware'
  | 'mobile'
  | 'architecture'
  | 'status'
  | 'challenges'
  | 'achievement';

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<EcoPlugifyTab>('overview');
  const [selectedMobileIndex, setSelectedMobileIndex] = useState<number>(0);

  useEffect(() => {
    if (!project) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [project, onClose]);

  // Reset tab when project changes
  useEffect(() => {
    setActiveTab('overview');
    setSelectedMobileIndex(0);
  }, [project?.id]);

  if (!project) return null;

  const isEcoPlugify = project.id === 'ecoplugify';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-background/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-5xl bg-surface-container border border-outline-variant/30 rounded-2xl shadow-2xl overflow-hidden z-10 my-4 sm:my-8 max-h-[94vh] sm:max-h-[92vh] flex flex-col"
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between p-3 sm:p-space-md bg-surface-container-highest/90 border-b border-outline-variant/20 shrink-0">
            <div className="flex items-center gap-space-xs font-mono-label text-[11px] sm:text-mono-label text-secondary uppercase">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span>{project.category} // CASE STUDY</span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-surface-container-high text-on-surface hover:text-secondary hover:bg-surface-container-highest transition-colors cursor-pointer"
              aria-label="Close Case Study"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* EcoPlugify Navigation Tabs */}
          {isEcoPlugify && (
            <div className="bg-surface-container-low border-b border-outline-variant/20 px-3 sm:px-space-md py-2 flex items-center gap-1.5 overflow-x-auto scrollbar-none shrink-0 text-xs font-mono-code">
              {[
                { id: 'overview', label: 'Overview', icon: Info },
                { id: 'hardware', label: 'Real Hardware', icon: Cpu },
                { id: 'mobile', label: 'Mobile App Gallery', icon: Smartphone },
                { id: 'architecture', label: 'Architecture & MQTT', icon: Network },
                { id: 'status', label: 'Implemented vs Planned', icon: CheckCircle2 },
                { id: 'challenges', label: 'Troubleshooting', icon: Wrench },
                { id: 'achievement', label: 'UOG Award (2nd Pos)', icon: Award }
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as EcoPlugifyTab)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all cursor-pointer ${
                      isActive
                        ? 'bg-secondary text-on-secondary shadow-sm font-bold'
                        : 'bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Modal Content Body */}
          <div className="p-4 sm:p-space-lg md:p-space-xl overflow-y-auto space-y-space-md sm:space-y-space-lg text-on-surface flex-grow">
            {/* Header info strip */}
            <div className="space-y-space-xs">
              {project.badge && (
                <div className="inline-flex items-center gap-space-xs px-space-md py-1 rounded-full bg-secondary/10 text-secondary font-mono-label text-xs sm:text-mono-label font-bold border border-secondary/20">
                  <Award className="w-3.5 h-3.5 text-secondary" />
                  <span>{project.badge}</span>
                </div>
              )}
              <h2 className="font-heading-xl text-xl sm:text-2xl md:text-heading-xl font-bold text-on-surface">
                {project.title}
              </h2>
              <div className="flex flex-wrap items-center gap-x-space-md gap-y-1 font-mono-label text-[11px] sm:text-mono-label text-outline">
                {project.supervisor && (
                  <span>
                    SUPERVISOR: <strong className="text-on-surface">{project.supervisor}</strong>
                  </span>
                )}
                {project.institution && (
                  <span>
                    INSTITUTION: <strong className="text-on-surface">{project.institution}</strong>
                  </span>
                )}
              </div>
            </div>

            {/* IF ECOPLUGIFY: TABBED DETAILED SECTIONS */}
            {isEcoPlugify ? (
              <div className="space-y-space-lg">
                {/* 1. OVERVIEW TAB */}
                {activeTab === 'overview' && (
                  <div className="space-y-space-md">
                    {/* Project Identity Notice */}
                    <div className="p-3.5 rounded-xl bg-surface-container-low border border-secondary/30 flex items-start gap-3">
                      <Zap className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                      <div className="text-xs sm:text-body-sm text-on-surface-variant space-y-1">
                        <strong className="text-on-surface block">
                          Academic Engineering Prototype &amp; Final-Year Project
                        </strong>
                        <p>
                          EcoPlugify is a physical IoT smart plug prototype developed as a Final Year Project (FYP 2026) in the Department of Computer Science at University of Gujrat (Hafiz Hayat Campus) under the academic supervision of <strong>Dr. Umer Shoaib</strong>. It was awarded <strong>2nd Position</strong> in the university's final-year exhibition.
                        </p>
                        <p className="text-[11px] text-outline pt-1">
                          Note: This project is an academic proof-of-concept and engineering prototype, not a commercial, mass-produced, or certified consumer appliance.
                        </p>
                      </div>
                    </div>

                    {/* Hardware Prototype Hero Visual */}
                    <div className="rounded-xl overflow-hidden bg-surface-container-lowest border border-outline-variant/20 p-2 sm:p-space-sm">
                      <div className="relative group">
                        <img
                          src={project.imageUrl}
                          alt="EcoPlugify Physical Hardware Prototype Bench"
                          className="w-full max-h-80 sm:max-h-96 object-contain mx-auto rounded-lg"
                        />
                        <div className="absolute bottom-2 left-2 right-2 bg-surface-container-lowest/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-outline-variant/30 text-xs font-mono-code flex items-center justify-between">
                          <span className="text-secondary font-bold">REAL HARDWARE PROTOTYPE</span>
                          <span className="text-outline text-[11px]">ESP32 • Relay Stage • Switchboard Chassis</span>
                        </div>
                      </div>
                    </div>

                    {/* Verified Metrics Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-xs font-mono-code text-mono-code">
                      {project.metrics.map((m, idx) => (
                        <div key={idx} className="bg-surface-container-low p-space-sm rounded-lg border border-outline-variant/10">
                          <div className="text-on-surface-variant text-[10px] sm:text-[11px] uppercase">{m.label}</div>
                          <div className="text-secondary font-bold text-sm sm:text-body-regular mt-1">{m.value}</div>
                        </div>
                      ))}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-space-xs">
                      {project.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-space-sm py-1 rounded bg-surface-container-highest font-mono-code text-xs sm:text-mono-code text-on-surface"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Problem Statement & Description */}
                    <div className="space-y-space-xs">
                      <h3 className="font-mono-label text-mono-label text-outline uppercase tracking-wider flex items-center gap-1.5">
                        <Info className="w-3.5 h-3.5 text-secondary" />
                        <span>PROJECT OVERVIEW &amp; PROBLEM CONTEXT</span>
                      </h3>
                      <p className="font-body-regular text-sm sm:text-body-regular text-on-surface-variant leading-relaxed">
                        {project.fullDescription}
                      </p>
                    </div>

                    {/* Engineering Highlights */}
                    <div className="space-y-space-xs">
                      <h3 className="font-mono-label text-mono-label text-outline uppercase tracking-wider">
                        KEY ENGINEERING CONTRIBUTIONS
                      </h3>
                      <ul className="space-y-space-xs font-body-regular text-sm sm:text-body-regular text-on-surface-variant">
                        {project.highlights.map((h, idx) => (
                          <li key={idx} className="flex items-start gap-space-xs">
                            <span className="text-secondary font-mono-code shrink-0">&gt;</span>
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* 2. REAL HARDWARE PROTOTYPE TAB */}
                {activeTab === 'hardware' && (
                  <div className="space-y-space-md">
                    <div className="space-y-1">
                      <h3 className="font-heading-lg text-lg sm:text-heading-lg font-bold text-on-surface flex items-center gap-2">
                        <Cpu className="w-5 h-5 text-secondary" />
                        <span>Real Hardware Prototype &amp; Component Breakdown</span>
                      </h3>
                      <p className="font-body-regular text-xs sm:text-body-sm text-on-surface-variant">
                        Actual benchtop prototype constructed inside a modular wall switchboard faceplate with transparent acrylic insulating shielding.
                      </p>
                    </div>

                    {/* Hardware Image Full View */}
                    <div className="rounded-xl overflow-hidden bg-surface-container-lowest border border-outline-variant/30 p-2 sm:p-space-sm">
                      <img
                        src="/images/ecoplugify/hardware-prototype.jpg"
                        alt="EcoPlugify Physical Hardware Prototype Components"
                        className="w-full max-h-[420px] object-contain mx-auto rounded-lg"
                      />
                      <div className="mt-2 p-2.5 bg-surface-container-low rounded-lg text-xs font-mono-code text-on-surface-variant space-y-1">
                        <span className="text-secondary font-bold block">
                          PHYSICAL BENCH PROTOTYPE ANNOTATION
                        </span>
                        <p>
                          Visible components: <strong>ESP32 NodeMCU board</strong> (right, active red power LED, Wi-Fi/BLE), <strong>Songle 10A AC Relay Module</strong> (center-blue, load switching), <strong>AC-to-DC step-down converter</strong>, <strong>yellow MOV surge disc</strong>, terminal block, and socket terminals behind acrylic insulation.
                        </p>
                      </div>
                    </div>

                    {/* Subsystem Technical Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm text-xs sm:text-body-sm">
                      <div className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/20 space-y-2">
                        <span className="font-mono-label text-mono-label text-secondary uppercase font-bold flex items-center gap-1.5">
                          <Cpu className="w-4 h-4 text-secondary" />
                          <span>Embedded Controller</span>
                        </span>
                        <p className="text-on-surface-variant leading-relaxed">
                          ESP32 Dual-Core microcontroller executing native C++ firmware. Manages Wi-Fi 2.4GHz connectivity, BLE advertising for initial provisioning, and asynchronous MQTT telemetry packet serialization.
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/20 space-y-2">
                        <span className="font-mono-label text-mono-label text-secondary uppercase font-bold flex items-center gap-1.5">
                          <Zap className="w-4 h-4 text-secondary" />
                          <span>Relay Actuation Stage</span>
                        </span>
                        <p className="text-on-surface-variant leading-relaxed">
                          Single-channel AC relay with transistor driver circuit (tested with BC547 and 2N2222 with base resistor and flyback protection diode) allowing the microcontroller to switch connected loads on command.
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/20 space-y-2">
                        <span className="font-mono-label text-mono-label text-secondary uppercase font-bold flex items-center gap-1.5">
                          <Radio className="w-4 h-4 text-secondary" />
                          <span>Energy Measurement Research</span>
                        </span>
                        <p className="text-on-surface-variant leading-relaxed">
                          Hardware testing evaluated dedicated energy metering sensor ICs—primarily the <strong>HLW8012</strong> pulse-frequency transducer and PZEM-004T transducer module during development—to read AC voltage, current, and active power.
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/20 space-y-2">
                        <span className="font-mono-label text-mono-label text-secondary uppercase font-bold flex items-center gap-1.5">
                          <ShieldAlert className="w-4 h-4 text-secondary" />
                          <span>Power &amp; Protection Circuit</span>
                        </span>
                        <p className="text-on-surface-variant leading-relaxed">
                          Internal AC-to-DC power supply module (Hi-Link module evaluated for 5V DC step-down), fused AC line, and Metal Oxide Varistor (MOV yellow disc) for transient suppression across mains inputs.
                        </p>
                      </div>
                    </div>

                    {/* Safety & Load Disclosure */}
                    <div className="p-3 rounded-lg bg-surface-container-lowest border border-outline-variant/30 text-xs font-mono-code text-outline flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                      <span>
                        Engineering Note: Mains-voltage parameters and sustained load thresholds in this prototype reflect lab bench testing. Final production load certification requires formal lab compliance testing.
                      </span>
                    </div>
                  </div>
                )}

                {/* 3. MOBILE APPLICATION GALLERY TAB */}
                {activeTab === 'mobile' && (
                  <div className="space-y-space-md">
                    <div className="space-y-1">
                      <h3 className="font-heading-lg text-lg sm:text-heading-lg font-bold text-on-surface flex items-center gap-2">
                        <Smartphone className="w-5 h-5 text-secondary" />
                        <span>React Native Mobile Application Gallery</span>
                      </h3>
                      <p className="font-body-regular text-xs sm:text-body-sm text-on-surface-variant">
                        Actual mobile application running on Android (Package: <code className="text-secondary font-mono">com.ecoplugify</code>, React Native CLI 0.83.1, NativeWind / Tailwind CSS).
                      </p>
                    </div>

                    {/* Screenshot Viewer */}
                    {project.appScreenshots && project.appScreenshots.length > 0 && (
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md items-start">
                        {/* Big preview */}
                        <div className="lg:col-span-6 bg-surface-container-lowest rounded-xl p-3 border border-outline-variant/30 flex flex-col items-center justify-center">
                          <img
                            src={project.appScreenshots[selectedMobileIndex].url}
                            alt={project.appScreenshots[selectedMobileIndex].screen}
                            className="max-h-[380px] sm:max-h-[440px] w-auto object-contain rounded-xl shadow-lg"
                          />
                          <div className="mt-3 text-center space-y-1 w-full">
                            <span className="font-mono-label text-xs uppercase tracking-wider text-secondary font-bold block">
                              {project.appScreenshots[selectedMobileIndex].screen}
                            </span>
                            <p className="text-xs text-on-surface-variant max-w-sm mx-auto">
                              {project.appScreenshots[selectedMobileIndex].caption}
                            </p>
                          </div>
                        </div>

                        {/* Thumbnails list */}
                        <div className="lg:col-span-6 space-y-2 max-h-[480px] overflow-y-auto pr-1">
                          <span className="font-mono-label text-[11px] uppercase tracking-wider text-outline block">
                            Tap to inspect screens:
                          </span>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {project.appScreenshots.map((shot, idx) => (
                              <button
                                key={idx}
                                onClick={() => setSelectedMobileIndex(idx)}
                                className={`p-1.5 rounded-lg border text-left transition-all cursor-pointer flex flex-col items-center gap-1 ${
                                  selectedMobileIndex === idx
                                    ? 'border-secondary bg-secondary/10 shadow-sm'
                                    : 'border-outline-variant/20 bg-surface-container-low hover:bg-surface-container'
                                }`}
                              >
                                <img
                                  src={shot.url}
                                  alt={shot.screen}
                                  className="h-24 w-auto object-contain rounded"
                                />
                                <span className="text-[10px] font-mono-code font-bold truncate w-full text-center text-on-surface">
                                  {shot.screen}
                                </span>
                              </button>
                            ))}
                          </div>

                          <div className="p-3 bg-surface-container-low rounded-lg text-xs font-mono-code space-y-1 text-on-surface-variant mt-2 border border-outline-variant/20">
                            <span className="text-secondary font-bold block">Mobile App Features:</span>
                            <ul className="list-disc list-inside space-y-0.5 text-[11px]">
                              <li>Live telemetry display (Watts, Wh, cost in PKR)</li>
                              <li>Bluetooth Low Energy (BLE) plug onboarding wizard</li>
                              <li>Over-the-air Wi-Fi SSID / password transmission to ESP32</li>
                              <li>Remote on/off relay actuation button</li>
                              <li>Daily on/off automations and schedule synchronization</li>
                              <li>Configurable electricity tariffs (e.g., PKR 22.44 to 48.84/kWh)</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* 4. SYSTEM ARCHITECTURE & MQTT TAB */}
                {activeTab === 'architecture' && (
                  <div className="space-y-space-md">
                    <div className="space-y-1">
                      <h3 className="font-heading-lg text-lg sm:text-heading-lg font-bold text-on-surface flex items-center gap-2">
                        <Network className="w-5 h-5 text-secondary" />
                        <span>System Architecture &amp; MQTT Telemetry Pipeline</span>
                      </h3>
                      <p className="font-body-regular text-xs sm:text-body-sm text-on-surface-variant">
                        End-to-end communication path connecting the physical smart plug to cloud services and mobile clients.
                      </p>
                    </div>

                    {/* Architecture Flow Diagram */}
                    <div className="p-4 sm:p-space-lg rounded-xl bg-surface-container-lowest border border-outline-variant/20 font-mono-code space-y-3">
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-center text-xs">
                        <div className="p-2.5 rounded-lg bg-surface-container-high w-full sm:w-auto flex-1">
                          <span className="text-secondary font-bold block">1. Physical Stage</span>
                          <span className="text-outline text-[11px]">Mains Load + Relay + Sensor</span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-outline rotate-90 sm:rotate-0 shrink-0" />
                        <div className="p-2.5 rounded-lg bg-surface-container-high w-full sm:w-auto flex-1">
                          <span className="text-secondary font-bold block">2. ESP32 NodeMCU</span>
                          <span className="text-outline text-[11px]">C++ Firmware &amp; Wi-Fi</span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-outline rotate-90 sm:rotate-0 shrink-0" />
                        <div className="p-2.5 rounded-lg bg-surface-container-high w-full sm:w-auto flex-1">
                          <span className="text-secondary font-bold block">3. MQTT Broker</span>
                          <span className="text-outline text-[11px]">HiveMQ Cloud TLS (8883)</span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-outline rotate-90 sm:rotate-0 shrink-0" />
                        <div className="p-2.5 rounded-lg bg-surface-container-high w-full sm:w-auto flex-1">
                          <span className="text-secondary font-bold block">4. Backend &amp; DB</span>
                          <span className="text-outline text-[11px]">Node.js + MongoDB</span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-outline rotate-90 sm:rotate-0 shrink-0" />
                        <div className="p-2.5 rounded-lg bg-surface-container-high w-full sm:w-auto flex-1">
                          <span className="text-secondary font-bold block">5. Mobile Client</span>
                          <span className="text-outline text-[11px]">React Native (com.ecoplugify)</span>
                        </div>
                      </div>
                    </div>

                    {/* MQTT Topic Convention Box */}
                    <div className="space-y-space-xs">
                      <h4 className="font-mono-label text-mono-label text-secondary uppercase font-bold">
                        VERIFIED MQTT TOPIC CONVENTION
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-xs font-mono-code text-xs">
                        <div className="p-3 rounded-lg bg-surface-container-low border border-outline-variant/20 space-y-1">
                          <span className="text-secondary font-bold">ecoplugify/&#123;DEVICE_ID&#125;/data</span>
                          <p className="text-on-surface-variant text-[11px]">
                            Uplink telemetry published by the ESP32: AC voltage, current, active power (Watts), and accumulated energy (Wh).
                          </p>
                        </div>
                        <div className="p-3 rounded-lg bg-surface-container-low border border-outline-variant/20 space-y-1">
                          <span className="text-secondary font-bold">ecoplugify/&#123;DEVICE_ID&#125;/relay</span>
                          <p className="text-on-surface-variant text-[11px]">
                            Downlink command subscribed by the ESP32: receives actuation payloads (ON / OFF) dispatched from the mobile app.
                          </p>
                        </div>
                        <div className="p-3 rounded-lg bg-surface-container-low border border-outline-variant/20 space-y-1">
                          <span className="text-secondary font-bold">ecoplugify/&#123;DEVICE_ID&#125;/schedule</span>
                          <p className="text-on-surface-variant text-[11px]">
                            Time-based schedule synchronization for timed relay triggering without continuous active app connection.
                          </p>
                        </div>
                        <div className="p-3 rounded-lg bg-surface-container-low border border-outline-variant/20 space-y-1">
                          <span className="text-secondary font-bold">ecoplugify/&#123;DEVICE_ID&#125;/status</span>
                          <p className="text-on-surface-variant text-[11px]">
                            Connection status heartbeat &amp; Last Will and Testament (LWT) announcing online/offline device state to cloud services.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 5. IMPLEMENTED VS ROADMAPPED TAB */}
                {activeTab === 'status' && (
                  <div className="space-y-space-md">
                    <div className="space-y-1">
                      <h3 className="font-heading-lg text-lg sm:text-heading-lg font-bold text-on-surface flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-secondary" />
                        <span>Implemented Features vs. Roadmapped Enhancements</span>
                      </h3>
                      <p className="font-body-regular text-xs sm:text-body-sm text-on-surface-variant">
                        Transparent engineering breakdown distinguishing completed project deliverables from future research concepts.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md text-xs sm:text-body-sm">
                      {/* Confirmed Implemented */}
                      <div className="p-4 rounded-xl bg-surface-container-low border border-secondary/30 space-y-3">
                        <div className="flex items-center gap-2 text-secondary font-bold font-mono-label uppercase">
                          <CheckCircle2 className="w-4 h-4 text-secondary" />
                          <span>Implemented &amp; Verified in Prototype</span>
                        </div>
                        <ul className="space-y-2 text-on-surface-variant">
                          <li className="flex items-start gap-2">
                            <span className="text-secondary font-bold">✓</span>
                            <span><strong>Remote Appliance Switching:</strong> Manual ON/OFF relay control executed from the React Native app.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-secondary font-bold">✓</span>
                            <span><strong>BLE Device Discovery:</strong> Mobile scanning wizard to detect nearby unconfigured plugs.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-secondary font-bold">✓</span>
                            <span><strong>Wi-Fi Provisioning over BLE:</strong> Secure dispatch of local SSID and password to ESP32.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-secondary font-bold">✓</span>
                            <span><strong>Live Power &amp; Energy Metrics:</strong> Real-time Watts display and accumulated Wh calculation in app.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-secondary font-bold">✓</span>
                            <span><strong>Electricity Cost Estimation:</strong> Dynamic tariff calculations converting kWh into Pakistani Rupees (PKR).</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-secondary font-bold">✓</span>
                            <span><strong>Backend Synced Scheduling:</strong> User-defined time-based automation routines.</span>
                          </li>
                        </ul>
                      </div>

                      {/* Roadmapped Enhancements */}
                      <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/20 space-y-3">
                        <div className="flex items-center gap-2 text-outline font-bold font-mono-label uppercase">
                          <Clock className="w-4 h-4 text-outline" />
                          <span>Roadmapped Future Enhancements</span>
                        </div>
                        <ul className="space-y-2 text-on-surface-variant">
                          <li className="flex items-start gap-2">
                            <span className="text-outline font-bold">○</span>
                            <span><strong>Autonomous Overload Trip:</strong> Hardware-level overcurrent auto-cutoff (researched, pending certified laboratory testing).</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-outline font-bold">○</span>
                            <span><strong>Offline Telemetry Caching:</strong> Local SPIFFS/Flash persistence during network interruptions.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-outline font-bold">○</span>
                            <span><strong>Voice Assistant Control:</strong> Integration with Google Assistant and Alexa smart home protocols.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-outline font-bold">○</span>
                            <span><strong>AI Energy Optimization:</strong> Automated appliance load classification and predictive cost reduction suggestions.</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* 6. ENGINEERING CHALLENGES & TROUBLESHOOTING TAB */}
                {activeTab === 'challenges' && (
                  <div className="space-y-space-md">
                    <div className="space-y-1">
                      <h3 className="font-heading-lg text-lg sm:text-heading-lg font-bold text-on-surface flex items-center gap-2">
                        <Wrench className="w-5 h-5 text-secondary" />
                        <span>Engineering Challenges &amp; Hardware Debugging History</span>
                      </h3>
                      <p className="font-body-regular text-xs sm:text-body-sm text-on-surface-variant">
                        Key hardware troubleshooting milestones resolved during prototype development.
                      </p>
                    </div>

                    <div className="space-y-3 text-xs sm:text-body-sm font-body-regular">
                      <div className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/20 space-y-1.5">
                        <span className="font-mono-label text-mono-label text-secondary font-bold flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-secondary" />
                          <span>1. GPIO Pin Reconfiguration Iterations</span>
                        </span>
                        <p className="text-on-surface-variant leading-relaxed">
                          During early development, the relay circuit was tested across GPIO 14, GPIO 26, and GPIO 13. Certain pins floated high during the ESP32 boot cycle, momentarily pulsing the relay on power-up. Pin assignments and external pull-down resistors were tuned to ensure the relay remains strictly in a safe, unpowered state during system resets.
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/20 space-y-1.5">
                        <span className="font-mono-label text-mono-label text-secondary font-bold flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-secondary" />
                          <span>2. Transistor Driver &amp; Active-Low Relay Logic</span>
                        </span>
                        <p className="text-on-surface-variant leading-relaxed">
                          Directly driving a 5V relay coil from a 3.3V ESP32 GPIO caused coil chatter. A discrete transistor switching stage (testing BC547 and 2N2222 with base-current limiting resistor and flyback clamp diode) was engineered to reliably drive the coil from the Hi-Link DC supply with active-low logic.
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/20 space-y-1.5">
                        <span className="font-mono-label text-mono-label text-secondary font-bold flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-secondary" />
                          <span>3. HLW8012 Sensor Pulse-Width Calibration</span>
                        </span>
                        <p className="text-on-surface-variant leading-relaxed">
                          Initial HLW8012 sensor bench tests produced zero values due to interrupt timing mismatches on the CF and CF1 frequency pins. Testing explored CF on GPIO 34 / GPIO 25, CF1 on GPIO 35 / GPIO 26, and SEL on GPIO 27. Adjusting pulse sampling intervals and interrupt handlers in the C++ firmware brought the sensor into operational readout.
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/20 space-y-1.5">
                        <span className="font-mono-label text-mono-label text-secondary font-bold flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-secondary" />
                          <span>4. Mains Isolation in Modular Switchplate Enclosure</span>
                        </span>
                        <p className="text-on-surface-variant leading-relaxed">
                          Fitting high-voltage AC conductors alongside 3.3V logic inside a wall switchboard chassis required strict physical isolation. Clear acrylic barriers were fabricated and fixed to separate mains AC terminal blocks and the MOV from sensitive microcontroller signal traces.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* 7. COMPETITION ACHIEVEMENT TAB */}
                {activeTab === 'achievement' && (
                  <div className="space-y-space-md">
                    <div className="space-y-1">
                      <h3 className="font-heading-lg text-lg sm:text-heading-lg font-bold text-on-surface flex items-center gap-2">
                        <Award className="w-5 h-5 text-secondary" />
                        <span>University Competition Achievement &amp; Recognition</span>
                      </h3>
                      <p className="font-body-regular text-xs sm:text-body-sm text-on-surface-variant">
                        2nd Position Winner in the Final Year Project Competition 2026, Department of Computer Science, University of Gujrat.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                      {/* Ceremony Photo */}
                      <div className="rounded-xl overflow-hidden bg-surface-container-lowest border border-outline-variant/30 p-2 space-y-2">
                        <img
                          src="/images/ecoplugify/award-ceremony.jpg"
                          alt="EcoPlugify Award Ceremony with Dr. Umer Shoaib"
                          className="w-full max-h-72 object-contain rounded-lg mx-auto"
                        />
                        <div className="text-xs font-mono-code text-on-surface-variant p-2 space-y-1">
                          <span className="text-secondary font-bold block">
                            AWARD CEREMONY // UOG CS EXPO 2026
                          </span>
                          <p>
                            Awarded 2nd Position certificate and cash prize with project supervisor <strong>Dr. Umer Shoaib</strong> and department faculty.
                          </p>
                        </div>
                      </div>

                      {/* Envelope Photo */}
                      <div className="rounded-xl overflow-hidden bg-surface-container-lowest border border-outline-variant/30 p-2 space-y-2">
                        <img
                          src="/images/ecoplugify/award-envelope.jpg"
                          alt="University of Gujrat 2nd Position Envelope"
                          className="w-full max-h-72 object-contain rounded-lg mx-auto"
                        />
                        <div className="text-xs font-mono-code text-on-surface-variant p-2 space-y-1">
                          <span className="text-secondary font-bold block">
                            OFFICIAL UOG DISTINCTION ENVELOPE
                          </span>
                          <p>
                            Official award envelope for 2nd Position FYP-2026 at University of Gujrat Hafiz Hayat Campus.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* STANDARD CASE STUDY VIEW FOR OTHER PROJECTS (Yexon, Rover) */
              <div className="space-y-space-md">
                <p className="font-body-regular text-sm sm:text-body-regular text-on-surface-variant">
                  {project.summary}
                </p>

                {/* Project Visual */}
                <div className="rounded-xl overflow-hidden bg-surface-container-lowest border border-outline-variant/20 p-2 sm:p-space-sm">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-44 sm:h-64 md:h-80 object-contain mx-auto"
                  />
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-xs font-mono-code text-mono-code">
                  {project.metrics.map((m, idx) => (
                    <div key={idx} className="bg-surface-container-low p-space-sm rounded-lg">
                      <div className="text-on-surface-variant text-[11px] uppercase">{m.label}</div>
                      <div className="text-secondary font-bold text-body-regular mt-1">{m.value}</div>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-space-xs">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-space-sm py-1 rounded bg-surface-container-highest font-mono-code text-mono-code text-on-surface"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Detailed Description */}
                <div className="space-y-space-xs">
                  <h3 className="font-mono-label text-mono-label text-outline uppercase tracking-wider">
                    ARCHITECTURAL OVERVIEW
                  </h3>
                  <p className="font-body-regular text-body-regular text-on-surface-variant leading-relaxed">
                    {project.fullDescription}
                  </p>
                </div>

                {/* Key Accomplishments */}
                <div className="space-y-space-xs">
                  <h3 className="font-mono-label text-mono-label text-outline uppercase tracking-wider">
                    KEY ENGINEERING HIGHLIGHTS
                  </h3>
                  <ul className="space-y-space-xs font-body-regular text-body-regular text-on-surface-variant">
                    {project.highlights.map((h, idx) => (
                      <li key={idx} className="flex items-start gap-space-xs">
                        <span className="text-secondary font-mono-code">&gt;</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="p-3 sm:p-space-md bg-surface-container-highest/90 border-t border-outline-variant/20 flex flex-col sm:flex-row items-stretch sm:items-center justify-between font-mono-label text-[11px] sm:text-mono-label text-outline gap-3 shrink-0">
            <span className="text-center sm:text-left">
              AZ // {isEcoPlugify ? 'FINAL YEAR PROJECT 2026' : 'CASE STUDY VERIFIED'}
            </span>
            <div className="flex items-center gap-space-sm w-full sm:w-auto">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial min-h-[40px] px-space-md py-space-xs rounded-lg bg-secondary text-on-secondary font-bold hover:bg-secondary-fixed transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Launch Live Demo</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              <button
                onClick={onClose}
                className="flex-1 sm:flex-initial min-h-[40px] px-space-md py-space-xs rounded-lg bg-surface-container-high hover:bg-surface-container border border-outline-variant/30 text-on-surface font-bold transition-colors flex items-center justify-center cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CaseStudyModal;
