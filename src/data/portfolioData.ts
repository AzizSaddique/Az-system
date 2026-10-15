export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  badge?: string;
  period: string;
  summary: string;
  fullDescription: string;
  imageUrl: string;
  tags: string[];
  metrics: { label: string; value: string }[];
  highlights: string[];
  architectureDetails?: string[];
  supervisor?: string;
  institution?: string;
  achievement?: string;
  hardwarePhotos?: { url: string; caption: string; tag: string }[];
  appScreenshots?: { url: string; caption: string; screen: string }[];
  awardPhotos?: { url: string; caption: string }[];
  demoUrl?: string;
  repoUrl?: string;
}

export const PORTFOLIO_DATA = {
  personalInfo: {
    name: "Muhammad Aziz Saddique",
    title: "Full-Stack & Embedded Systems Engineer",
    degree: "BS Computer Science",
    institution: "University of Gujrat",
    location: "Narowal, Punjab, Pakistan",
    email: "azizsaddiquesaddique@gmail.com",
    github: "https://github.com/AzizSaddique",
    linkedin: "https://linkedin.com/in/muhammad-aziz-saddique-5a8626298",
    fypSupervisor: "Dr. Umer Shoaib",
    fypAward: "2nd Position — University of Gujrat FYP Competition 2026",

    // Local public paths (guaranteed reliable load in Vite dev & build)
    heroPortrait: "/images/heroPortrait-448.webp",
    avatarSmall: "/images/avatarSmall-96.webp",
    ecoPlugifyRender: "/images/ecoplugify/hardware-prototype-640.webp",
    ecoPlugifyHardwarePhoto: "/images/ecoplugify/hardware-prototype-640.webp",
    ecoPlugifyHardwareViews: "/images/ecoplugify/ecoPlugifyHardwareViews.webp",
    ecoPlugifySpecSheet: "/images/ecoplugify/ecoPlugifySpecSheet.webp",
    ecoPlugifyAwardCeremony: "/images/ecoplugify/award-ceremony.webp",
    ecoPlugifyAwardEnvelope: "/images/ecoplugify/award-envelope.webp",
    certificateImage: "/images/ecoplugify/award-ceremony.webp",
    stageImage: "/images/stageImage.webp",
    campusImage: "/images/campusImage.webp",
    workspaceImage: "/images/workspaceImage.webp",
    labImage: "/images/labImage.webp",

    // Original remote URLs kept as secondary references
    remoteUrls: {
      heroPortrait: "https://lh3.googleusercontent.com/aida-public/AB6AXuChMwrN09hsNSpwNlXkt9ueK6BSE1LSzEy-979WnOsOZozkFkomqRPEIRf-AqDt5vZsAYRHXAShSgOQntTrEkjJkgS23XDMWSzEj5w2NIIorjIGd0Gjjqd02IDeM2femIXQFm8I3tRbH2QH6R2S-y1uOyWi3HsFNOd_xzUAavyT8Bsak0B3V_X7sc3j2eQD1b-3fpHXojR439tSHXUhnfY44A5PZxvouoIxuxYFzy8939FIqGakw4NkLl1JJSTtfSD0",
      avatarSmall: "https://lh3.googleusercontent.com/aida/AEtjO1UnWuBIeTdNuzFH5y5TdjKhJkElUFwfS1N5IUQnh9yOAiSw9uZ-nDYEHNosCKXQX8GwziOuFoocHAP2ctdfourDdcgqW8Ieoazrl-q5pZSf02EFhkhjX7JixkBYbLUlARWtpfMTDshsHWA9xX4_JFOmqve1floT2lqRlNJePvnGVyUqRvvS1lBsHnxyMBYYzzphmunHfogxckWK9sdwZnLJ4oUixESy5CC7aW2lM4MpNQqCwkW0wH3l8OJ-nSHa0xhm7JO9It44",
      ecoPlugifyRender: "/images/ecoplugify/hardware-prototype.jpg",
      ecoPlugifyHardwareViews: "/images/ecoplugify/hardware-prototype.jpg",
      ecoPlugifySpecSheet: "/images/ecoplugify/hardware-prototype.jpg",
      certificateImage: "/images/ecoplugify/award-ceremony.jpg",
      stageImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuAh19RhSPT1MMY7MfpsYwfgAV0qZ-GgRfe8HFzEXA0dIcEd7RwAenSOBBWvYqeXRCIYCUk4HhR3UYu6zTgyVpJbgIfr9Vr9P-_7JxoYBK7kRfas7d8YcAqRQctpLfccbWHEcjv1AgmJOBrL28dnAi7QcspgKiT8biPYkOG0fx689hqCqmOyD_cMMm3k5Grw16Iqk64w8jEzqLEyd4KKH2blVFcoR4la23W_Td0hrG_l2pe3vvr6uklWbLo1XHr_IhU9",
      campusImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuAoW6mzYYyb8wNrjtaZ1P3fk-0PpvDbrFLuo6aMjfG1M1f6_XCDzXvk4CyZRlbvfU3BDTJqjKgQFpMZmTQdH5P2j-TdJv2hsOYM5yAXKbvCHu16z1Oq_InlE5EjIF3e1DLjYpyFfhxTsU-tIP-YoACFbygIPHguKL2aBbfeR9FmbDgEst7zKPKaxCFaddGFVTBU3GlsVNcUeW2f8dnDrLz1xqFaOwDetHEg_yMA7PV6nIjPM_W7oLPVphu0w5Hy9hBh",
      workspaceImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuDHnPzNiii3Imk60m04CgfZHdEo3uOC_8nnNjOgQnpym2ASMHSDZeKUgR2rIDgLO-FZd_xYugjeVJuDMQAq3wF8hXCxUKs4G2YvFyEHT5bcmnYQ8U35T4RbOfwcJgA6S9sK4yjWdzUqvNPtLOZgwplOcYqWomKL91d41T9JVs90QYnVoAhIgNuI5m5UVluNC-fXivIlvlkSC1ERmXObz8gI_OvT2eogh3my4UmNgxbWOH2NMdKIGfc",
      labImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBB4i5Zgrc-Z-NnNUm7jgscl1QDHLZ8mfMbWsuDV1W3t8-9vT0N1MUQ4Tw_Vhevoe3vvH4qYvGTrnMlVCeNt-yur4t5gdPcH6e684Z2awd9hVKnndMRc0ZHJFtEzG0ObhiSGZB22j2oyqsfkkEBRN6hAsejh7HXo6hSRs0yeD-pxeI2fFB9q46byvzoKuV6G4Hfsbu_dgYBmeL5CCFHMlEZAEIZMw-rinqXWQqDrFz3Mx5jKN0eUrg"
    }
  },

  projects: [
    {
      id: "ecoplugify",
      title: "EcoPlugify — Smart Energy Monitoring & Control System Using IoT",
      subtitle: "Final Year Engineering Prototype • 2nd Position UOG 2026",
      category: "FINAL YEAR ENGINEERING PROJECT",
      badge: "2nd Position — University of Gujrat FYP Competition 2026",
      period: "2026",
      supervisor: "Dr. Umer Shoaib",
      institution: "Department of Computer Science, University of Gujrat (Hafiz Hayat Campus)",
      achievement: "2nd Position, Final Year Project Competition 2026 (Cash Prize & Certificate Awarded)",
      summary: "A physical IoT smart plug prototype paired with a React Native mobile application and Node.js backend. Features remote appliance switching, AC electrical telemetry, BLE onboarding, and tariff-based cost calculation.",
      fullDescription: "EcoPlugify is an IoT-based smart energy monitoring and control system developed and prototyped as a final-year project at the Department of Computer Science, University of Gujrat (Hafiz Hayat Campus), under the academic supervision of Dr. Umer Shoaib. The project tackles domestic energy wastage through an end-to-end architecture: an ESP32 microcontroller with a high-voltage AC relay switching circuit, AC-to-DC internal power regulation, AC electrical telemetry sensing (evaluating HLW8012 pulse-frequency transducers and PZEM-004T transducers during development), an MQTT pub/sub telemetry bridge, a Node.js/MongoDB backend, and a custom React Native CLI mobile application with Bluetooth Low Energy (BLE) provisioning.",
      imageUrl: "/images/ecoplugify/hardware-prototype-640.webp",
      tags: ["ESP32 Microcontroller", "C++ Firmware", "React Native CLI", "MQTT Broker", "Node.js / Express", "MongoDB", "AC Relay Circuit", "BLE Provisioning"],
      metrics: [
        { label: "PROJECT TYPE", value: "FYP Prototype" },
        { label: "CONTROLLER", value: "ESP32 (C++)" },
        { label: "MOBILE CLIENT", value: "React Native CLI" },
        { label: "TELEMETRY", value: "MQTT / TLS" }
      ],
      highlights: [
        "Bench-Tested Hardware Prototype: Constructed around an ESP32 NodeMCU, Songle AC relay module, transistor driver circuit (BC547/2N2222), MOV surge suppression, and acrylic-shielded switchboard plate.",
        "Custom React Native Mobile App: Built with React Native CLI (package com.ecoplugify) and NativeWind for manual appliance on/off toggling, live power display, and PKR cost estimation.",
        "BLE Provisioning Workflow: Embedded Bluetooth Low Energy discovery flow allowing users to scan nearby plugs and safely dispatch local Wi-Fi SSID and password to the ESP32.",
        "MQTT Telemetry & Scheduling: Standardized pub/sub topics (data, relay, schedule, status) over Wi-Fi, supporting scheduled on/off automations and live parameter updates.",
        "Academic Competition Honor: Won 2nd Position at the University of Gujrat Final Year Project Competition 2026, evaluated by faculty and jury panels."
      ],
      architectureDetails: [
        "Microcontroller: ESP32 dual-core SoC running custom C++ firmware with Wi-Fi and BLE stacks.",
        "Actuation Stage: High-voltage AC relay driven via transistor switching circuit with flyback diode protection.",
        "Power & Protection: AC-to-DC step-down converter (Hi-Link module) with MOV transient suppression and fuse protection.",
        "Energy Sensing: Sensor research evaluating AC parameter acquisition (HLW8012 frequency pulse-timing and PZEM-004T module).",
        "Communication Bridge: MQTT telemetry protocol (HiveMQ Cloud broker evaluated on TLS port 8883) with topic routing.",
        "Backend & Mobile: Node.js/Express REST and MQTT services with MongoDB, paired with a React Native CLI Android application."
      ],
      hardwarePhotos: [
        {
          url: "/images/ecoplugify/hardware-prototype-640.webp",
          caption: "Benchtop hardware prototype: ESP32 NodeMCU, Songle AC relay module, MOV transient suppression disc, terminal wiring, and acrylic-shielded switchboard faceplate.",
          tag: "HARDWARE PROTOTYPE"
        }
      ],
      appScreenshots: [
        {
          url: "/images/ecoplugify/app-dashboard.webp",
          screen: "Device Dashboard",
          caption: "Live device dashboard showing linked plug (plug1), real-time power (0W), daily energy total (0.0 Wh), calculated cost in PKR (Rs 0), and instant relay toggle."
        },
        {
          url: "/images/ecoplugify/app-ble-setup.webp",
          screen: "BLE Provisioning",
          caption: "Bluetooth Low Energy setup wizard guiding user to discover and connect to unassigned EcoPlugify hardware."
        },
        {
          url: "/images/ecoplugify/app-wifi-provision.webp",
          screen: "Wi-Fi Provisioning",
          caption: "Wi-Fi network scanner and credential dispatch screen sending home Wi-Fi SSID and password to the ESP32 over BLE."
        },
        {
          url: "/images/ecoplugify/app-schedule.webp",
          screen: "Backend Automations",
          caption: "Automation scheduler displaying synchronized timed on/off events for connected smart plugs."
        },
        {
          url: "/images/ecoplugify/app-analytics.webp",
          screen: "Power Draw Gauge",
          caption: "Real-time circular power meter (Watts) and energy/cost summaries calculated from telemetry data."
        },
        {
          url: "/images/ecoplugify/app-ai-history.webp",
          screen: "Appliance Telemetry",
          caption: "Telemetry view for real-time device readings and classification insights."
        },
        {
          url: "/images/ecoplugify/app-login.webp",
          screen: "App Authentication",
          caption: "Branded mobile login screen built with React Native CLI (package com.ecoplugify) and NativeWind."
        },
        {
          url: "/images/ecoplugify/app-profile.webp",
          screen: "Profile & Navigation",
          caption: "User profile drawer and account management options."
        }
      ],
      awardPhotos: [
        {
          url: "/images/ecoplugify/award-ceremony.webp",
          caption: "Award Ceremony: Department of Computer Science, University of Gujrat FYP Competition 2026 (2nd Position Winner) with supervisor Dr. Umer Shoaib and faculty."
        },
        {
          url: "/images/ecoplugify/award-envelope.webp",
          caption: "Official University of Gujrat 2nd Position FYP-2026 distinction envelope at Hafiz Hayat Campus."
        }
      ]
    },
    {
      id: "yexon-impex",
      title: "Yexon Impex Platform",
      subtitle: "Full-Stack Enterprise Logistics Telemetry Portal",
      category: "LOGISTICS TELEMETRY",
      period: "2024–2025",
      summary: "Full-stack enterprise supply-chain management portal engineered for real-time shipment dispatch tracking, inventory synchronization, and automated customs document generation.",
      fullDescription: "Enterprise logistics management platform built with Next.js 14, TypeScript, PostgreSQL, and Docker. Provides real-time shipment telemetry tracking, inventory management, and automated documentation workflows for import/export operations.",
      imageUrl: "/images/workspaceImage.jpg",
      demoUrl: "https://yexonimpex.store/",
      tags: ["Next.js 14", "TypeScript", "PostgreSQL", "Docker"],
      metrics: [
        { label: "Deployment", value: "PROD DEPLOYMENT" },
        { label: "Architecture", value: "Full-Stack" }
      ],
      highlights: [
        "Real-time shipment dispatch tracking with automated status alerts.",
        "Synchronized inventory management across multi-warehouse locations.",
        "Customs document generation pipeline with PDF export capabilities."
      ]
    },
    {
      id: "autonomous-rover",
      title: "Autonomous Navigation Rover",
      subtitle: "Differential Drive Mobile Robotics Platform",
      category: "ACTIVE RESEARCH // ROBOTICS",
      period: "Active",
      summary: "Differential drive mobile robotics platform utilizing ROS 2 nodes, 2D LiDAR point-cloud mapping, SLAM algorithms, and ultrasonic sensor array for autonomous collision avoidance.",
      fullDescription: "Robotics testbed designed to explore ROS 2 graph nodes, Nav2 navigation stack, 2D LiDAR point-cloud SLAM mapping, and kinematics for differential-drive ground rovers.",
      imageUrl: "/images/labImage.jpg",
      tags: ["ROS 2 Humble", "Python", "LiDAR SLAM", "Kinematics"],
      metrics: [
        { label: "Status", value: "R&D LAB BENCH" },
        { label: "Stack", value: "ROS 2 + LiDAR" }
      ],
      highlights: [
        "Differential drive kinematic modeling for obstacle-avoidance rovers.",
        "2D LiDAR SLAM mapping and path planning node integration.",
        "Ultrasonic sensor array for close-range emergency collision avoidance."
      ]
    }
  ]
};
