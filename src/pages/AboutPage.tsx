import React from 'react';
import { Link } from 'react-router-dom';
import {
  Terminal,
  Memory,
  PrecisionManufacturing,
  ArrowForward
} from '../components/Icons';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const AboutPage: React.FC = () => {
  return (
    <div className="flex flex-col w-full text-on-surface space-y-space-xl pb-space-xl">
      
      {/* HERO / EDITORIAL HEADER */}
      <section className="relative pt-space-md pb-space-lg flex flex-col gap-space-sm overflow-hidden">
        <div className="absolute -top-24 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-20 w-80 h-80 bg-surface-container-high/40 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex items-center gap-space-xs font-mono-label text-[10px] sm:text-mono-label tracking-widest text-secondary max-w-full truncate">
          <span className="w-2 h-2 rounded-full bg-secondary shrink-0" />
          <span>ENGINEERING PHILOSOPHY // 01</span>
          <span className="text-outline-variant">•</span>
          <span className="text-outline hidden sm:inline">ARCH: CYBER-PHYSICAL</span>
        </div>

        <h1 className="font-display-2xl text-3xl sm:text-4xl md:text-5xl lg:text-display-2xl font-bold tracking-tight text-on-surface max-w-4xl leading-tight">
          Curious About Systems.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-on-surface via-primary-fixed to-secondary">
            Driven to Build.
          </span>
        </h1>

        <p className="font-body-lg text-sm sm:text-body-lg text-on-surface-variant max-w-3xl pt-space-xs">
          I'm a Computer Science graduate from <span className="text-on-surface font-semibold">University of Gujrat</span> passionate about building practical software, connecting intelligent physical devices, and advancing into autonomous robotics.
        </p>

        {/* System Vital Strip */}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-space-sm mt-space-md p-2 sm:p-space-sm bg-surface-container-low rounded-xl">
          <div className="flex flex-col p-2.5 sm:p-space-sm bg-surface-container rounded-lg">
            <span className="font-mono-label text-[10px] sm:text-mono-label text-outline uppercase">Credential</span>
            <span className="font-mono-code text-xs sm:text-mono-code font-bold text-on-surface">BS Computer Science</span>
          </div>
          <div className="flex flex-col p-2.5 sm:p-space-sm bg-surface-container rounded-lg">
            <span className="font-mono-label text-[10px] sm:text-mono-label text-outline uppercase">Core Discipline</span>
            <span className="font-mono-code text-xs sm:text-mono-code font-bold text-secondary">Software • Embedded IoT</span>
          </div>
          <div className="flex flex-col p-2.5 sm:p-space-sm bg-surface-container rounded-lg">
            <span className="font-mono-label text-[10px] sm:text-mono-label text-outline uppercase">Next Frontier</span>
            <span className="font-mono-code text-xs sm:text-mono-code font-bold text-on-surface">ROS 2 • Robotics</span>
          </div>
          <div className="flex flex-col p-2.5 sm:p-space-sm bg-surface-container rounded-lg">
            <span className="font-mono-label text-[10px] sm:text-mono-label text-outline uppercase">Base Station</span>
            <span className="font-mono-code text-xs sm:text-mono-code font-bold text-on-surface">Gujrat, Pakistan</span>
          </div>
        </div>
      </section>

      {/* SECTION A: MY STORY */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-stretch">
        
        {/* Left Column: Portrait */}
        <div className="lg:col-span-5 flex flex-col justify-between p-3 sm:p-space-md bg-surface-container-low rounded-xl relative group">
          <div className="flex items-center justify-between pb-space-sm text-outline font-mono-label text-[10px] sm:text-mono-label">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
              SYS.ID // AZIZ_SADDIQUE
            </span>
            <span>LAT: 32.5744° N</span>
          </div>
          <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden bg-surface-container-high my-space-sm shadow-xl">
            <img
              alt="Muhammad Aziz Saddique Portrait"
              className="w-full h-full object-cover object-top filter grayscale contrast-125 transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
              src={PORTFOLIO_DATA.personalInfo.heroPortrait}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-3 left-3 right-3 p-2.5 sm:p-space-sm bg-surface-container-lowest/90 backdrop-blur-md rounded-lg">
              <p className="font-mono-label text-[11px] sm:text-mono-label text-secondary font-semibold">MUHAMMAD AZIZ SADDIQUE</p>
              <p className="font-mono-code text-xs sm:text-mono-code text-on-surface">SYSTEMS ENGINEER &amp; FULL-STACK DEVELOPER</p>
            </div>
          </div>
          <div className="pt-space-sm flex justify-between items-center font-mono-label text-[10px] sm:text-mono-label text-outline">
            <span>STATUS: ACTIVE RUNTIME</span>
            <span className="text-secondary tracking-widest font-bold">READY FOR MISSION</span>
          </div>
        </div>

        {/* Right Column: Personal Narrative */}
        <div className="lg:col-span-7 flex flex-col justify-between p-4 sm:p-space-lg bg-surface-container-low rounded-xl space-y-space-md">
          <div className="space-y-space-xs">
            <span className="font-mono-label text-mono-label text-secondary tracking-widest uppercase">Chronicle // Evolution</span>
            <h2 className="font-heading-xl text-2xl sm:text-3xl lg:text-heading-xl text-on-surface font-semibold">
              Bridging Virtual Logic with Physical Hardware.
            </h2>
          </div>
          <div className="space-y-space-md font-body-regular text-sm sm:text-body-regular text-on-surface-variant">
            <p>
              My foundation began at the <strong className="text-on-surface font-medium">University of Gujrat</strong>, where I earned my Bachelor of Science in Computer Science. While my degree grounded me in data structures, algorithmic complexity, and scalable software design, my natural curiosity pulled me beyond standard browser sandboxes and into the physical realm.
            </p>
            <p>
              I realized modern computing reaches its true potential when high-level web interfaces interface directly with physical sensors and microcontrollers. Venturing deep into ESP32 silicon, bare-metal C++, and low-latency MQTT message queues, I spearheaded the engineering of <strong className="text-secondary font-medium">Ecoplugify</strong>—an end-to-end intelligent energy telemetry socket designed and prototyped from scratch in Pakistan.
            </p>
            <p>
              Grounded, candid, and builder-first: I don't claim decades of legacy claims. Instead, I bring sharp, end-to-end execution, rapid iterative learning, and a relentless drive. Today, I am aggressively expanding into <strong className="text-on-surface font-medium">ROS 2, Linux embedded systems, and kinematics</strong>, engineering the bridge toward autonomous robotics.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-space-sm pt-space-sm">
            <div className="p-2.5 sm:p-space-sm bg-surface-container rounded-lg flex flex-col">
              <span className="font-mono-metric text-2xl sm:text-mono-metric text-secondary font-bold">BSCS</span>
              <span className="font-mono-label text-[11px] sm:text-mono-label text-outline">Graduated Gujrat</span>
            </div>
            <div className="p-2.5 sm:p-space-sm bg-surface-container rounded-lg flex flex-col">
              <span className="font-mono-metric text-2xl sm:text-mono-metric text-on-surface font-bold">16A</span>
              <span className="font-mono-label text-[11px] sm:text-mono-label text-outline">Ecoplugify Smart HW</span>
            </div>
            <div className="p-2.5 sm:p-space-sm bg-surface-container rounded-lg flex flex-col">
              <span className="font-mono-metric text-2xl sm:text-mono-metric text-on-surface font-bold">ROS 2</span>
              <span className="font-mono-label text-[11px] sm:text-mono-label text-outline">Robotics Research</span>
            </div>
          </div>
        </div>

      </section>

      {/* SECTION B: HOW I THINK */}
      <section className="flex flex-col space-y-space-md">
        <div className="flex items-center justify-between">
          <div>
            <span className="font-mono-label text-mono-label text-secondary uppercase tracking-widest">Cognitive Blueprint // 02</span>
            <h2 className="font-heading-lg text-heading-lg font-bold text-on-surface">How I Think</h2>
          </div>
          <span className="font-mono-label text-mono-label text-outline hidden sm:inline">FIRST-PRINCIPLES MINDSET</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
          {/* Card 1 */}
          <div className="p-space-lg bg-surface-container-low hover:bg-surface-container rounded-xl flex flex-col justify-between transition-all duration-300 group shadow-lg">
            <div className="space-y-space-sm">
              <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-secondary">
                <Terminal className="w-5 h-5" />
              </div>
              <span className="font-mono-label text-mono-label text-outline block">PARADIGM 01</span>
              <h3 className="font-heading-md text-heading-md font-semibold text-on-surface group-hover:text-secondary transition-colors">
                Build to Learn
              </h3>
              <p className="font-body-regular text-body-regular text-on-surface-variant">
                True mastery doesn't come from passive tutorials. I deconstruct abstract paradigms by engineering functional, full-lifecycle applications—from firmware interrupts to cloud databases.
              </p>
            </div>
            <div className="pt-space-md mt-space-md bg-surface-container-highest/20 rounded p-space-xs font-mono-code text-mono-code text-secondary flex items-center gap-2">
              <span>&gt;</span><span>code • flash • stress-test</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-space-lg bg-surface-container-low hover:bg-surface-container rounded-xl flex flex-col justify-between transition-all duration-300 group shadow-lg">
            <div className="space-y-space-sm">
              <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-secondary">
                <Memory className="w-5 h-5" />
              </div>
              <span className="font-mono-label text-mono-label text-outline block">PARADIGM 02</span>
              <h3 className="font-heading-md text-heading-md font-semibold text-on-surface group-hover:text-secondary transition-colors">
                Software Meets Hardware
              </h3>
              <p className="font-body-regular text-body-regular text-on-surface-variant">
                Unifying high-level React and Node.js microservices with ESP32 physical circuitry. Eliminating impedance between web-layer event loops and real-world microvolt telemetry.
              </p>
            </div>
            <div className="pt-space-md mt-space-md bg-surface-container-highest/20 rounded p-space-xs font-mono-code text-mono-code text-secondary flex items-center gap-2">
              <span>&gt;</span><span>MQTT • UART • WebSockets</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-space-lg bg-surface-container-low hover:bg-surface-container rounded-xl flex flex-col justify-between transition-all duration-300 group shadow-lg">
            <div className="space-y-space-sm">
              <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-secondary">
                <PrecisionManufacturing className="w-5 h-5" />
              </div>
              <span className="font-mono-label text-mono-label text-outline block">PARADIGM 03</span>
              <h3 className="font-heading-md text-heading-md font-semibold text-on-surface group-hover:text-secondary transition-colors">
                Always Exploring
              </h3>
              <p className="font-body-regular text-body-regular text-on-surface-variant">
                Refusing stagnation. Expanding constantly into autonomous systems, ROS 2 graph communications, Linux kernel drivers, and mathematical kinematics for mobile robotics.
              </p>
            </div>
            <div className="pt-space-md mt-space-md bg-surface-container-highest/20 rounded p-space-xs font-mono-code text-mono-code text-secondary flex items-center gap-2">
              <span>&gt;</span><span>ROS 2 • SLAM • Python Core</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION C: WHAT I BUILD */}
      <section className="flex flex-col space-y-space-md">
        <div className="flex items-center justify-between">
          <div>
            <span className="font-mono-label text-mono-label text-secondary uppercase tracking-widest">Core Verticals // 03</span>
            <h2 className="font-heading-lg text-heading-lg font-bold text-on-surface">What I Build</h2>
          </div>
          <span className="font-mono-label text-mono-label text-outline">SYSTEM SPECIALIZATIONS</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
          {/* Card 1 */}
          <div className="flex flex-col bg-surface-container-low rounded-xl overflow-hidden shadow-lg group">
            <div className="relative h-44 bg-surface-container-high overflow-hidden">
              <img
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                alt="Workspace laptop React dashboard"
                src={PORTFOLIO_DATA.personalInfo.workspaceImage}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-surface-container-low/40 to-transparent" />
              <span className="absolute top-3 left-3 px-space-xs py-0.5 rounded bg-surface-container-lowest/80 text-secondary font-mono-label text-mono-label uppercase">
                Full-Stack • Mobile
              </span>
            </div>
            <div className="p-space-md flex flex-col flex-1 justify-between space-y-space-sm">
              <div>
                <h3 className="font-heading-md text-heading-md font-semibold text-on-surface">Software &amp; Mobile Applications</h3>
                <p className="font-body-regular text-body-regular text-on-surface-variant mt-1">
                  Production React and React Native clients paired with Node.js and Express backends. Architected for ultra-low latency, clean state management, and ergonomic UX.
                </p>
              </div>
              <div className="flex flex-wrap gap-1 font-mono-label text-mono-label text-outline pt-space-xs">
                <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface">React</span>
                <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface">React Native</span>
                <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface">Node.js</span>
                <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface">REST / APIs</span>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col bg-surface-container-low rounded-xl overflow-hidden shadow-lg group">
            <div className="relative h-44 bg-surface-container-high overflow-hidden">
              <img
                alt="EcoPlugify Embedded Hardware Smart Plug Views"
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                src={PORTFOLIO_DATA.personalInfo.ecoPlugifyHardwareViews}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-surface-container-low/30 to-transparent" />
              <span className="absolute top-3 left-3 px-space-xs py-0.5 rounded bg-surface-container-lowest/80 text-secondary font-mono-label text-mono-label uppercase">
                Physical Computing
              </span>
            </div>
            <div className="p-space-md flex flex-col flex-1 justify-between space-y-space-sm">
              <div>
                <h3 className="font-heading-md text-heading-md font-semibold text-on-surface">IoT &amp; Embedded Systems</h3>
                <p className="font-body-regular text-body-regular text-on-surface-variant mt-1">
                  Microcontroller firmware programming on ESP32 silicon. Direct integration of power telemetry sensors, high-current relay coils, and real-time MQTT message brokers.
                </p>
              </div>
              <div className="flex flex-wrap gap-1 font-mono-label text-mono-label text-outline pt-space-xs">
                <span className="px-2 py-0.5 rounded bg-surface-container text-secondary font-bold">ESP32</span>
                <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface">C++</span>
                <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface">MQTT</span>
                <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface">Relay Circuits</span>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="flex flex-col bg-surface-container-low rounded-xl overflow-hidden shadow-lg group">
            <div className="relative h-44 bg-surface-container-high overflow-hidden">
              <img
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                alt="Robotics laboratory workbench"
                src={PORTFOLIO_DATA.personalInfo.labImage}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-surface-container-low/40 to-transparent" />
              <span className="absolute top-3 left-3 px-space-xs py-0.5 rounded bg-surface-container-lowest/80 text-secondary font-mono-label text-mono-label uppercase">
                Active Learning
              </span>
            </div>
            <div className="p-space-md flex flex-col flex-1 justify-between space-y-space-sm">
              <div>
                <h3 className="font-heading-md text-heading-md font-semibold text-on-surface">Robotics &amp; Intelligent Systems</h3>
                <p className="font-body-regular text-body-regular text-on-surface-variant mt-1">
                  Active deep dive into ROS 2 node architecture, robotic kinematics, simulation in Gazebo, and autonomous navigation for intelligent mobile ground units.
                </p>
              </div>
              <div className="flex flex-wrap gap-1 font-mono-label text-mono-label text-outline pt-space-xs">
                <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface">ROS 2</span>
                <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface">Python</span>
                <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface">Kinematics</span>
                <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface">Simulation</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION D: TECHNICAL TOOLKIT */}
      <section className="p-space-lg bg-surface-container-low rounded-xl space-y-space-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs">
          <div>
            <span className="font-mono-label text-mono-label text-secondary uppercase tracking-widest">Competency Registry // 04</span>
            <h2 className="font-heading-lg text-heading-lg font-bold text-on-surface">Technical Toolkit</h2>
          </div>
          <div className="flex items-center gap-space-md font-mono-label text-mono-label">
            <span className="flex items-center gap-1.5 text-on-surface">
              <span className="w-2 h-2 rounded-full bg-secondary" /> Production
            </span>
            <span className="flex items-center gap-1.5 text-outline">
              <span className="w-2 h-2 rounded-full bg-outline-variant" /> Exploring / Learning
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md">
          {/* Column 1 */}
          <div className="p-space-md bg-surface-container rounded-lg space-y-space-sm">
            <div className="flex items-center justify-between pb-space-xs border-b border-outline-variant/10">
              <span className="font-mono-code text-mono-code font-bold text-on-surface">Frontend</span>
              <span className="font-mono-label text-mono-label text-secondary">PROD</span>
            </div>
            <ul className="space-y-space-xs font-mono-code text-mono-code text-on-surface-variant">
              <li className="flex items-center justify-between py-1">
                <span className="text-on-surface">React.js</span>
                <span className="text-secondary font-mono-label text-mono-label">High</span>
              </li>
              <li className="flex items-center justify-between py-1">
                <span className="text-on-surface">React Native</span>
                <span className="text-secondary font-mono-label text-mono-label">High</span>
              </li>
              <li className="flex items-center justify-between py-1">
                <span className="text-on-surface">Tailwind CSS</span>
                <span className="text-secondary font-mono-label text-mono-label">Fluent</span>
              </li>
              <li className="flex items-center justify-between py-1">
                <span className="text-on-surface">JavaScript (ES6+)</span>
                <span className="text-secondary font-mono-label text-mono-label">Core</span>
              </li>
              <li className="flex items-center justify-between py-1">
                <span className="text-outline">Next.js</span>
                <span className="text-outline font-mono-label text-mono-label">Active</span>
              </li>
            </ul>
          </div>

          {/* Column 2 */}
          <div className="p-space-md bg-surface-container rounded-lg space-y-space-sm">
            <div className="flex items-center justify-between pb-space-xs border-b border-outline-variant/10">
              <span className="font-mono-code text-mono-code font-bold text-on-surface">Backend &amp; DB</span>
              <span className="font-mono-label text-mono-label text-secondary">PROD</span>
            </div>
            <ul className="space-y-space-xs font-mono-code text-mono-code text-on-surface-variant">
              <li className="flex items-center justify-between py-1">
                <span className="text-on-surface">Node.js</span>
                <span className="text-secondary font-mono-label text-mono-label">High</span>
              </li>
              <li className="flex items-center justify-between py-1">
                <span className="text-on-surface">Express.js</span>
                <span className="text-secondary font-mono-label text-mono-label">High</span>
              </li>
              <li className="flex items-center justify-between py-1">
                <span className="text-on-surface">MongoDB</span>
                <span className="text-secondary font-mono-label text-mono-label">Fluent</span>
              </li>
              <li className="flex items-center justify-between py-1">
                <span className="text-on-surface">SQL / Relational</span>
                <span className="text-secondary font-mono-label text-mono-label">Fluent</span>
              </li>
              <li className="flex items-center justify-between py-1">
                <span className="text-on-surface">Socket.IO &amp; REST</span>
                <span className="text-secondary font-mono-label text-mono-label">Core</span>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="p-space-md bg-surface-container rounded-lg space-y-space-sm">
            <div className="flex items-center justify-between pb-space-xs border-b border-outline-variant/10">
              <span className="font-mono-code text-mono-code font-bold text-on-surface">IoT &amp; Embedded</span>
              <span className="font-mono-label text-mono-label text-secondary">PROD</span>
            </div>
            <ul className="space-y-space-xs font-mono-code text-mono-code text-on-surface-variant">
              <li className="flex items-center justify-between py-1">
                <span className="text-on-surface">ESP32 Silicon</span>
                <span className="text-secondary font-mono-label text-mono-label">Firmware</span>
              </li>
              <li className="flex items-center justify-between py-1">
                <span className="text-on-surface">C / C++ (Embedded)</span>
                <span className="text-secondary font-mono-label text-mono-label">Core</span>
              </li>
              <li className="flex items-center justify-between py-1">
                <span className="text-on-surface">MQTT Broker Stack</span>
                <span className="text-secondary font-mono-label text-mono-label">High</span>
              </li>
              <li className="flex items-center justify-between py-1">
                <span className="text-on-surface">Sensor Telemetry</span>
                <span className="text-secondary font-mono-label text-mono-label">Analog/Dig</span>
              </li>
              <li className="flex items-center justify-between py-1">
                <span className="text-outline">PCB Diagnostics</span>
                <span className="text-outline font-mono-label text-mono-label">Breadboard</span>
              </li>
            </ul>
          </div>

          {/* Column 4 */}
          <div className="p-space-md bg-surface-container rounded-lg space-y-space-sm">
            <div className="flex items-center justify-between pb-space-xs border-b border-outline-variant/10">
              <span className="font-mono-code text-mono-code font-bold text-on-surface">Robotics (Active)</span>
              <span className="font-mono-label text-mono-label text-outline">LEARNING</span>
            </div>
            <ul className="space-y-space-xs font-mono-code text-mono-code text-on-surface-variant">
              <li className="flex items-center justify-between py-1">
                <span className="text-on-surface">ROS 2 Nodes</span>
                <span className="text-outline font-mono-label text-mono-label">In-depth</span>
              </li>
              <li className="flex items-center justify-between py-1">
                <span className="text-on-surface">Python Robotics</span>
                <span className="text-outline font-mono-label text-mono-label">In-depth</span>
              </li>
              <li className="flex items-center justify-between py-1">
                <span className="text-on-surface">Linux Embedded / CLI</span>
                <span className="text-secondary font-mono-label text-mono-label">Solid</span>
              </li>
              <li className="flex items-center justify-between py-1">
                <span className="text-on-surface">Gazebo Simulation</span>
                <span className="text-outline font-mono-label text-mono-label">Exploring</span>
              </li>
              <li className="flex items-center justify-between py-1">
                <span className="text-on-surface">Robotic Kinematics</span>
                <span className="text-outline font-mono-label text-mono-label">Math/Core</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION E: FEATURED FLAGSHIP PREVIEW */}
      <section className="p-4 sm:p-space-lg bg-surface-container-low rounded-xl relative overflow-hidden group">
        <div className="flex flex-col lg:flex-row items-center gap-space-lg">
          <div className="w-full lg:w-1/2 space-y-space-sm">
            <div className="flex flex-wrap items-center gap-space-xs">
              <span className="px-space-xs py-0.5 rounded bg-secondary text-on-secondary font-mono-label text-[10px] sm:text-mono-label font-bold uppercase">
                Flagship Hardware Project
              </span>
              <span className="font-mono-label text-[10px] sm:text-mono-label text-outline">MODEL EP-01 • 16A 3680W</span>
            </div>
            <h2 className="font-heading-xl text-2xl sm:text-3xl lg:text-heading-xl font-bold text-on-surface">Ecoplugify Smart IoT Plug</h2>
            <p className="font-body-regular text-sm sm:text-body-regular text-on-surface-variant">
              Engineered as a comprehensive cyber-physical solution: custom 60x60mm casing design, onboard ESP32 microcontroller, high-power relay control, live energy consumption telemetry over Wi-Fi 2.4GHz, and complete cloud dashboard integration.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-space-xs font-mono-label text-[11px] sm:text-mono-label text-outline">
              <div className="p-2 bg-surface-container rounded">
                <span className="text-secondary font-bold block">100-250V~</span>
                <span>AC Input Range</span>
              </div>
              <div className="p-2 bg-surface-container rounded">
                <span className="text-secondary font-bold block">16A MAX</span>
                <span>Relay Switching</span>
              </div>
              <div className="p-2 bg-surface-container rounded col-span-2 sm:col-span-1">
                <span className="text-secondary font-bold block">MQTT/WSS</span>
                <span>Telemetry Uplink</span>
              </div>
            </div>
            <div className="pt-space-sm">
              <a
                href="/#featured-project"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-space-xs px-space-md py-2.5 rounded-full bg-surface-container-high hover:bg-secondary hover:text-on-secondary font-mono-code text-xs sm:text-mono-code text-on-surface transition-all min-h-[44px]"
              >
                <span>Inspect Project Architecture</span>
                <ArrowForward className="text-sm" />
              </a>
            </div>
          </div>
          <div className="w-full lg:w-1/2 flex items-center justify-center p-space-sm bg-surface-container rounded-lg">
            <img
              alt="Ecoplugify Smart Plug Engineering Spec Sheet"
              className="w-full max-h-80 object-contain rounded filter contrast-110 drop-shadow-2xl transition-transform duration-500 group-hover:scale-102"
              src={PORTFOLIO_DATA.personalInfo.ecoPlugifySpecSheet}
            />
          </div>
        </div>
      </section>

      {/* SECTION F: CONTACT BANNER / CTA */}
      <section className="p-5 sm:p-space-xl bg-surface-container-low rounded-xl relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-space-lg">
        <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-secondary/15 rounded-full blur-3xl pointer-events-none" />
        <div className="space-y-space-xs max-w-xl text-center sm:text-left">
          <div className="inline-flex items-center gap-space-xs text-secondary font-mono-label text-[10px] sm:text-mono-label uppercase">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span>Open for Full-Time Roles &amp; Engineering Collabs</span>
          </div>
          <h2 className="font-heading-xl text-2xl sm:text-3xl lg:text-heading-xl font-bold text-on-surface">
            Let's Build Something Meaningful.
          </h2>
          <p className="font-body-regular text-sm sm:text-body-regular text-on-surface-variant">
            Whether you are engineering a full-stack platform, an embedded telemetry fleet, or autonomous robotic software, I am ready to deploy.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-space-sm w-full sm:w-auto">
          <Link
            to="/contact"
            className="w-full sm:w-auto px-space-xl py-3 rounded-full bg-secondary text-on-secondary font-heading-md text-sm sm:text-body-regular font-bold tracking-tight hover:scale-105 active:scale-95 transition-all text-center shadow-lg min-h-[44px] flex items-center justify-center"
          >
            Contact Me Direct
          </Link>
          <a
            href={PORTFOLIO_DATA.personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-space-md py-3 rounded-full bg-surface-container-high hover:bg-surface-container-highest font-mono-code text-xs sm:text-mono-code text-on-surface transition-all text-center min-h-[44px] flex items-center justify-center"
          >
            GitHub Profile
          </a>
        </div>
      </section>

    </div>
  );
};
