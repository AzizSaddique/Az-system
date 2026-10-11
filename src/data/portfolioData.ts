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
  demoUrl?: string;
  repoUrl?: string;
}

export const PORTFOLIO_DATA = {
  personalInfo: {
    name: "Muhammad Aziz Saddique",
    title: "Full-Stack & Embedded Systems Engineer",
    degree: "BS Computer Science",
    institution: "University of Gujrat",
    location: "Gujrat, Punjab, Pakistan",
    email: "azizsaddiquesaddique@gmail.com",
    github: "https://github.com/AzizSaddique",
    linkedin: "https://linkedin.com/in/aziz-saddique",
    fypSupervisor: "Dr. Umer Shoaib",
    fypAward: "2nd Position — University of Gujrat FYP Competition 2026",
    
    // Local public paths (guaranteed reliable load in Vite dev & build)
    heroPortrait: "/images/heroPortrait.jpg",
    avatarSmall: "/images/avatarSmall.jpg",
    ecoPlugifyRender: "/images/ecoPlugifyRender.jpg",
    ecoPlugifyHardwareViews: "/images/ecoPlugifyHardwareViews.jpg",
    ecoPlugifySpecSheet: "/images/ecoPlugifySpecSheet.jpg",
    certificateImage: "/images/certificateImage.jpg",
    stageImage: "/images/stageImage.jpg",
    campusImage: "/images/campusImage.jpg",
    workspaceImage: "/images/workspaceImage.jpg",
    labImage: "/images/labImage.jpg",

    // Original remote URLs kept as secondary references
    remoteUrls: {
      heroPortrait: "https://lh3.googleusercontent.com/aida-public/AB6AXuChMwrN09hsNSpwNlXkt9ueK6BSE1LSzEy-979WnOsOZozkFkomqRPEIRf-AqDt5vZsAYRHXAShSgOQntTrEkjJkgS23XDMWSzEj5w2NIIorjIGd0Gjjqd02IDeM2femIXQFm8I3tRbH2QH6R2S-y1uOyWi3HsFNOd_xzUAavyT8Bsak0B3V_X7sc3j2eQD1b-3fpHXojR439tSHXUhnfY44A5PZxvouoIxuxYFzy8939FIqGakw4NkLl1JJSTtfSD0",
      avatarSmall: "https://lh3.googleusercontent.com/aida/AEtjO1UnWuBIeTdNuzFH5y5TdjKhJkElUFwfS1N5IUQnh9yOAiSw9uZ-nDYEHNosCKXQX8GwziOuFoocHAP2ctdfourDdcgqW8Ieoazrl-q5pZSf02EFhkhjX7JixkBYbLUlARWtpfMTDshsHWA9xX4_JFOmqve1floT2lqRlNJePvnGVyUqRvvS1lBsHnxyMBYYzzphmunHfogxckWK9sdwZnLJ4oUixESy5CC7aW2lM4MpNQqCwkW0wH3l8OJ-nSHa0xhm7JO9It44",
      ecoPlugifyRender: "https://lh3.googleusercontent.com/aida-public/AB6AXuCnAdvlldSd16_baeQPO26-Iu_8qPNujQ-lbhHUFHRV2BdOuyq-YFs2pAEkG54Ij-cA5b_XqfCCIr9oU_Q2ZrkxITSyJEDoYM9Kzvq-X1BqPF69bXIcI7NEnzTOwoLF3nTX06vVIkoWmO7MxaG5ZgTiRR01GYhfMaMDqCQmZxVcYVhBbfWA8g_K72sDgzWoiUmfNybIdxiartdSX7mAg9x92JmL1eJBCtWEYA7A_gQmQ1Udy9QC6RA",
      ecoPlugifyHardwareViews: "https://lh3.googleusercontent.com/aida-public/AB6AXuCNXKAtAbdg8r3LtMkjum_T2D2rrd-Lfk52j_i1wkLchx77n9gR9x2yuRdkC-EeykMvpKaEodHQ958Y1eK92p33G73tZwXp2wnq7TvnLPIx9Ij3oi0rcn5bqZrAEIIk9N6A3hHmiRSt0dDyaxgo4zgklqs-eA6TeoXK3-eUtmMEvpvCjoa8xYKsprbpPk5e9iTBDmXr2hcEiez1olKUlqTTDa5XRX7vRwnlT_SaM0jpJuWYq8h8SmKe58fbgF6rv5vb",
      ecoPlugifySpecSheet: "https://lh3.googleusercontent.com/aida/AEtjO1VMd5oYlZq14W9X7FomD0mR-9rG0WbEwTks46G4sZ8F3nQn3b-W4-qg2l0XJzYk5Ym1Q3xZ0V2q9jC5eD0qP8bN2w",
      certificateImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjqIbnH1U_ECBJsc_Q0HIoQyN-AhhBHFoorlZnE9ArWUUn8zewuaM_V4FOwZWCf8Jy4gDLY1hyXl3wgUnymGgEiaX3HqrDw4jJK_-wjCRyEGfDX0sGQI8Bqekr5u9no24XWOcFW42wWC-B_9AS2WOr8ii6p0lpC5PshaUqJYsLDiH-1lOI6gGg9S0CzdNriwjN1V1GVEdqPYppFTbgkZHpkpUwz1Oyvw88EpdgYZx88nh1aw8LaaqX8JleTYZ3Mjgl",
      stageImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuAh19RhSPT1MMY7MfpsYwfgAV0qZ-GgRfe8HFzEXA0dIcEd7RwAenSOBBWvYqeXRCIYCUk4HhR3UYu6zTgyVpJbgIfr9Vr9P-_7JxoYBK7kRfas7d8YcAqRQctpLfccbWHEcjv1AgmJOBrL28dnAi7QcspgKiT8biPYkOG0fx689hqCqmOyD_cMMm3k5Grw16Iqk64w8jEzqLEyd4KKH2blVFcoR4la23W_Td0hrG_l2pe3vvr6uklWbLo1XHr_IhU9",
      campusImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuAoW6mzYYyb8wNrjtaZ1P3fk-0PpvDbrFLuo6aMjfG1M1f6_XCDzXvk4CyZRlbvfU3BDTJqjKgQFpMZmTQdH5P2j-TdJv2hsOYM5yAXKbvCHu16z1Oq_InlE5EjIF3e1DLjYpyFfhxTsU-tIP-YoACFbygIPHguKL2aBbfeR9FmbDgEst7zKPKaxCFaddGFVTBU3GlsVNcUeW2f8dnDrLz1xqFaOwDetHEg_yMA7PV6nIjPM_W7oLPVphu0w5Hy9hBh",
      workspaceImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuDHnPzNiii3Imk60m04CgfZHdEo3uOC_8nnNjOgQnpym2ASMHSDZeKUgR2rIDgLO-FZd_xYugjeVJuDMQAq3wF8hXCxUKs4G2YvFyEHT5bcmnYQ8U35T4RbOfwcJgA6S9sK4yjWdzUqvNPtLOZgwplOcYqWomKL91d41T9JVs90QYnVoAhIgNuI5m5UVluNC-fXivIlvlkSC1ERmXObz8gI_OvT2eogh3my4UmNgxbWOH2NMdKIGfc",
      labImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBB4i5Zgrc-Z-NnNUm7jgscl1QDHLZ8mfMbWsuDV1W3t8-9vT0N1MUQ4Tw_Vhevoe3vvH4qYvGTrnMlVCeNt-yur4t5gdPcH6e684Z2awd9hVKnndMRc0ZHJFtEzG0ObhiSGZB22j2oyqsfkkEBRN6hAsejh7HXo6hSRs0yeD-pxeI2fFB9q46byvzoKuV6G4Hfsbu_dgYBmeL5CCFHMlEZAEIZMw-rinqXWQqDrFz3Mx5jKN0eUrg"
    }
  },

  projects: [
    {
      id: "ecoplugify",
      title: "EcoPlugify — Smart AI Energy Monitoring & Control",
      subtitle: "Flagship Engineering Showcase",
      category: "FLAGSHIP ENGINEERING SHOWCASE",
      badge: "2nd Position — University of Gujrat FYP Competition 2026",
      period: "2026",
      supervisor: "Dr. Umer Shoaib",
      summary: "An end-to-end IoT and edge computing system designed to combat energy wastage. Combines custom-engineered hardware telemetry with sub-second MQTT communication and a cross-platform mobile management client.",
      fullDescription: "EcoPlugify is an end-to-end intelligent energy telemetry socket designed and prototyped from scratch at the Department of Computer Science, University of Gujrat, under the supervision of Dr. Umer Shoaib. It integrates custom 60x60mm hardware casing design, onboard ESP32 microcontroller, PZEM-004T current/voltage transducers, high-power relay switching, and an ultralight MQTT bridge transmitting real-time consumption data to cloud dashboards and mobile applications.",
      imageUrl: "/images/ecoPlugifyRender.jpg",
      tags: ["ESP32 MCU", "React Native", "Node.js / Express", "MQTT Broker", "MongoDB", "PZEM-004T"],
      metrics: [
        { label: "SAMPLING", value: "< 100ms" },
        { label: "MAX LOAD", value: "16A / 3.6kW" },
        { label: "WIRELESS", value: "Wi-Fi 2.4GHz" },
        { label: "PATENT PENDING", value: "PK-2026" }
      ],
      highlights: [
        "Precision AC Load Measurement: Real-time voltage, current, and true active power readings via hardware isolated PZEM-004T module.",
        "Ultra-Low Latency Telemetry: MQTT Pub/Sub architecture transmitting metrics to cloud clusters within 85ms for rapid graph updates.",
        "Automated Overload Cutoff: Autonomous on-device relay trip triggers safeguard sensitive appliances against voltage spikes."
      ],
      architectureDetails: [
        "Microcontroller: ESP32 Dual-Core @ 240MHz running custom C++ firmware.",
        "Energy Sensing: PZEM-004T V3.0 UART TTL power transducer module.",
        "Relay Control: 16A / 250VAC isolated heavy-duty relay channel with overcurrent trip.",
        "Communication: Sub-second MQTT Pub/Sub + WebSockets for real-time telemetry."
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
