import React, { useState, useRef, useCallback } from 'react';
import { AlertCircle } from 'lucide-react';
import {
  OpenInNew,
  NorthEast,
  ContentCopy,
  Layers,
  Memory,
  PrecisionManufacturing,
  LockIcon,
  Person,
  Mail as MailIcon,
  Tune,
  Send,
  CheckCircle,
  ShieldWithHeart,
  Speed
} from '../components/Icons';
import { TurnstileWidget, TurnstileWidgetRef } from '../components/TurnstileWidget';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { ScrollReveal } from '../components/ScrollReveal';
import { API_URL } from '../config/api';

type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'error';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    scope: 'fullstack',
    message: '',
    nda: false,
    _honeypot: '',
  });

  const [status, setStatus] = useState<SubmissionStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]> | null>(null);
  const [charCount, setCharCount] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [channelCopied, setChannelCopied] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string>('');
  const turnstileRef = useRef<TurnstileWidgetRef>(null);

  const isFormValid = Boolean(
    formData.name.trim() &&
    formData.email.trim() &&
    formData.message.trim() &&
    formData.message.length <= 800 &&
    turnstileToken
  );

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setFormData({ ...formData, message: text });
    setCharCount(text.length);
  };

  const handleTurnstileSuccess = useCallback((token: string) => {
    setTurnstileToken(token);
    setFieldErrors((prev) => (prev ? { ...prev, turnstileToken: [] } : null));
  }, []);

  const handleTurnstileExpire = useCallback(() => {
    setTurnstileToken('');
  }, []);

  const handleTurnstileError = useCallback(() => {
    setTurnstileToken('');
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'submitting' || !isFormValid) return;

    // Reset previous feedback
    setErrorMessage(null);
    setFieldErrors(null);
    setStatus('submitting');

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          scope: formData.scope,
          message: formData.message.trim(),
          nda: Boolean(formData.nda),
          _honeypot: formData._honeypot || undefined,
          turnstileToken,
        }),
      });

      const data = await response.json().catch(() => null);

      if (response.ok) {
        setStatus('success');
        // Clear form only on confirmed success
        setFormData({
          name: '',
          email: '',
          scope: 'fullstack',
          message: '',
          nda: false,
          _honeypot: '',
        });
        setCharCount(0);
        setTurnstileToken('');
        turnstileRef.current?.reset();
      } else {
        // Invalidate single-use token on any error and prompt re-verification
        setTurnstileToken('');
        turnstileRef.current?.reset();

        if (response.status === 400) {
          setStatus('error');
          if (data?.errors) {
            setFieldErrors(data.errors);
            const firstErrorMsg = Object.values(data.errors).flat()[0] as string;
            setErrorMessage(firstErrorMsg || data.message || 'Validation failed. Please review the highlighted fields.');
          } else {
            setErrorMessage(data?.message || 'Invalid submission payload.');
          }
        } else if (response.status === 429) {
          setStatus('error');
          setErrorMessage('Rate limit reached: Too many transmissions from your connection. Please wait 15 minutes before submitting again.');
        } else if (response.status === 502) {
          setStatus('error');
          setErrorMessage(data?.message || 'Security verification gateway failed. Please refresh the challenge or email directly at azizsaddiquesaddique@gmail.com.');
        } else if (response.status === 503) {
          setStatus('error');
          setErrorMessage(data?.message || 'Email dispatch or security service is currently unconfigured or unavailable. Please reach out directly at azizsaddiquesaddique@gmail.com.');
        } else {
          setStatus('error');
          setErrorMessage(data?.message || 'Transmission failed at server gateway. Please try again or reach out directly at azizsaddiquesaddique@gmail.com.');
        }
      }
    } catch {
      setTurnstileToken('');
      turnstileRef.current?.reset();
      setStatus('error');
      setErrorMessage('Network communication error: Unable to connect to backend server. Please verify your connection or email directly at azizsaddiquesaddique@gmail.com.');
    }
  };

  const copyEmailToClipboard = (emailStr: string, setFn: (v: boolean) => void) => {
    navigator.clipboard.writeText(emailStr);
    setFn(true);
    setTimeout(() => setFn(false), 2500);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="relative w-full overflow-hidden pb-space-xl">
        {/* Backdrop Glows */}
        <div className="absolute -top-32 left-1/4 w-[560px] h-[560px] bg-secondary/5 rounded-full blur-[140px] pointer-events-none -z-10 animate-ambient-glow-1" />
        <div className="absolute top-1/2 -right-24 w-[480px] h-[480px] bg-surface-bright/20 rounded-full blur-[160px] pointer-events-none -z-10 animate-ambient-glow-2" />

        {/* Top Telemetry Strip */}
        <ScrollReveal>
          <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-space-sm mb-space-md sm:mb-space-lg text-outline">
            <div className="flex items-center gap-space-xs font-mono-label text-[10px] sm:text-mono-label">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
              <span className="text-secondary font-bold tracking-widest">COMMUNICATION_LINK // 04_CONTACT</span>
              <span className="text-outline-variant">/</span>
              <span className="text-on-surface-variant">NODE_PK_EAST</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-space-md font-mono-label text-[10px] sm:text-mono-label text-on-surface-variant">
              <span>LAT: 32.5744° N</span>
              <span>LONG: 74.0754° E</span>
              <span className="text-secondary px-space-xs py-0.5 rounded-sm bg-surface-container-high">PKT [UTC+5]</span>
            </div>
          </div>
        </ScrollReveal>

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg lg:gap-space-xl items-start">

          {/* LEFT COLUMN */}
          <div className="lg:col-span-6 flex flex-col gap-space-lg sm:gap-space-xl">

            {/* Header */}
            <ScrollReveal>
              <div className="flex flex-col gap-space-sm sm:gap-space-md">
                <div className="inline-flex items-center gap-space-xs px-space-sm py-1 rounded-sm bg-surface-container-low max-w-fit">
                  <span className="w-2 h-2 rounded-full bg-secondary" />
                  <span className="font-mono-label text-[10px] sm:text-mono-label text-secondary tracking-widest uppercase">
                    GET IN TOUCH // OPEN FOR OPPORTUNITIES
                  </span>
                </div>
                <h1 className="font-heading-xl text-3xl sm:text-4xl lg:text-display-2xl text-on-surface font-bold tracking-tight">
                  Let's Build Something <span className="text-secondary">Meaningful.</span>
                </h1>
                <p className="font-body-lg text-base sm:text-body-lg text-on-surface-variant max-w-xl leading-relaxed">
                  Have a software system to scale, an IoT embedded pipeline to prototype, or an opportunity spanning cloud architecture and field hardware? I'm always prepared to synchronize.
                </p>
              </div>
            </ScrollReveal>

            {/* Profile Snapshot Pill */}
            <ScrollReveal delay={0.06}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-md p-3 sm:p-space-md rounded-xl bg-surface-container-low backdrop-blur-md">
                <div className="flex items-center gap-3 sm:gap-space-md">
                  <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden shrink-0">
                    <img
                      alt="Muhammad Aziz Saddique"
                      className="w-full h-full object-cover"
                      src={PORTFOLIO_DATA.personalInfo.avatarSmall}
                      loading="lazy"
                      decoding="async"
                      width={56}
                      height={56}
                    />
                    <div className="absolute inset-0 bg-secondary/10 mix-blend-color" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-heading-md text-base sm:text-heading-md text-on-surface truncate">Muhammad Aziz Saddique</span>
                    <span className="font-mono-code text-[11px] sm:text-mono-code text-on-surface-variant">Full-Stack &amp; Embedded Systems Engineer</span>
                  </div>
                </div>
                <div className="flex flex-col items-start sm:items-end gap-0.5 shrink-0">
                  <div className="flex items-center gap-space-xs">
                    <span className="w-2 h-2 rounded-full bg-secondary" />
                    <span className="font-mono-label text-[11px] sm:text-mono-label text-secondary uppercase font-semibold">Active • Available</span>
                  </div>
                  <span className="font-mono-label text-[10px] sm:text-mono-label text-outline">Gujrat, Punjab, PK</span>
                </div>
              </div>
            </ScrollReveal>

            {/* Channel Direct Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm">
              <ScrollReveal delay={0}>
                <a
                  className="group p-space-md rounded-xl bg-surface-container-lowest hover:bg-surface-container-high transition-all flex flex-col justify-between h-32 card-interactive"
                  href={PORTFOLIO_DATA.personalInfo.github}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <div className="flex items-center justify-between text-outline group-hover:text-secondary transition-colors">
                    <span className="font-mono-label text-mono-label tracking-widest">CHANNEL_01</span>
                    <OpenInNew className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                  <div>
                    <span className="block font-mono-label text-mono-label text-outline uppercase">GitHub Source</span>
                    <span className="font-mono-code text-mono-code text-on-surface group-hover:text-secondary truncate block">@AzizSaddique</span>
                  </div>
                </a>
              </ScrollReveal>

              <ScrollReveal delay={0.08}>
                <a
                  className="group p-space-md rounded-xl bg-surface-container-lowest hover:bg-surface-container-high transition-all flex flex-col justify-between h-32 card-interactive"
                  href={PORTFOLIO_DATA.personalInfo.linkedin}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <div className="flex items-center justify-between text-outline group-hover:text-secondary transition-colors">
                    <span className="font-mono-label text-mono-label tracking-widest">CHANNEL_02</span>
                    <NorthEast className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                  <div>
                    <span className="block font-mono-label text-mono-label text-outline uppercase">LinkedIn</span>
                    <span className="font-mono-code text-mono-code text-on-surface group-hover:text-secondary truncate block">in/Muhammad Aziz Saddique</span>
                  </div>
                </a>
              </ScrollReveal>

              <ScrollReveal delay={0.16}>
                <div
                  onClick={() => copyEmailToClipboard(PORTFOLIO_DATA.personalInfo.email, setChannelCopied)}
                  className="cursor-pointer group p-space-md rounded-xl bg-surface-container-lowest hover:bg-surface-container-high transition-all flex flex-col justify-between h-32 card-interactive"
                >
                  <div className="flex items-center justify-between text-outline group-hover:text-secondary transition-colors">
                    <span className="font-mono-label text-mono-label tracking-widest">CHANNEL_03</span>
                    <ContentCopy className={`w-4 h-4 transition-transform duration-200 group-hover:scale-110 ${channelCopied ? 'text-secondary' : ''}`} />
                  </div>
                  <div>
                    <span className="block font-mono-label text-mono-label text-outline uppercase">Direct Mail</span>
                    <span className="font-mono-code text-mono-code text-on-surface group-hover:text-secondary truncate block">
                      {channelCopied ? 'Copied to Clipboard!' : 'azizsaddique.dev'}
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* 3 Collaboration Scopes */}
            <div className="flex flex-col gap-space-md">
              <ScrollReveal delay={0.08}>
                <div className="flex items-center justify-between text-outline">
                  <span className="font-mono-label text-[10px] sm:text-mono-label uppercase tracking-wider">COLLABORATION SCOPES &amp; SYSTEM ROLES</span>
                  <span className="font-mono-label text-[10px] sm:text-mono-label text-secondary">[ 03 SPECIFICATIONS ]</span>
                </div>
              </ScrollReveal>

              {/* Scope 1 */}
              <ScrollReveal delay={0}>
                <div className="p-4 sm:p-space-lg rounded-xl bg-surface-container-low transition-all hover:bg-surface-container flex flex-col sm:flex-row gap-space-md items-start">
                  <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center shrink-0 text-on-surface">
                    <Layers className="w-5 h-5 text-on-surface" />
                  </div>
                  <div className="flex flex-col gap-space-xs w-full">
                    <div className="flex flex-wrap sm:flex-nowrap items-start sm:items-center justify-between gap-1">
                      <h3 className="font-heading-md text-base sm:text-heading-md text-on-surface">Full-Stack &amp; Mobile Development</h3>
                      <span className="font-mono-label text-[10px] sm:text-mono-label text-outline px-space-xs py-0.5 rounded bg-surface-container-high shrink-0">CLOUD / APP</span>
                    </div>
                    <p className="font-body-regular text-sm sm:text-body-regular text-on-surface-variant">
                      Architecting reactive user surfaces, resilient REST/GraphQL microservices, and database layers using React, React Native, Node.js, Express, and distributed PostgreSQL/MongoDB datastores.
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <span className="px-2 py-0.5 rounded-sm bg-surface-container-highest font-mono-label text-[11px] sm:text-mono-label text-on-surface-variant">React / Next</span>
                      <span className="px-2 py-0.5 rounded-sm bg-surface-container-highest font-mono-label text-[11px] sm:text-mono-label text-on-surface-variant">React Native</span>
                      <span className="px-2 py-0.5 rounded-sm bg-surface-container-highest font-mono-label text-[11px] sm:text-mono-label text-on-surface-variant">Node.js</span>
                      <span className="px-2 py-0.5 rounded-sm bg-surface-container-highest font-mono-label text-[11px] sm:text-mono-label text-on-surface-variant">REST APIs</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Scope 2 */}
              <ScrollReveal delay={0.1}>
                <div className="p-4 sm:p-space-lg rounded-xl bg-surface-container-low transition-all hover:bg-surface-container flex flex-col sm:flex-row gap-space-md items-start">
                  <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center shrink-0 text-on-surface">
                    <Memory className="w-5 h-5 text-on-surface" />
                  </div>
                  <div className="flex flex-col gap-space-xs w-full">
                    <div className="flex flex-wrap sm:flex-nowrap items-start sm:items-center justify-between gap-1">
                      <h3 className="font-heading-md text-base sm:text-heading-md text-on-surface">IoT &amp; Embedded Systems</h3>
                      <span className="font-mono-label text-[10px] sm:text-mono-label text-secondary px-space-xs py-0.5 rounded bg-surface-container-high shrink-0">HARDWARE / EDGE</span>
                    </div>
                    <p className="font-body-regular text-sm sm:text-body-regular text-on-surface-variant">
                      Bridging physical inputs to the cloud: ESP32/STM32 microcontrollers, edge sensor data telemetry, MQTT/WebSockets low-latency pipelines, and smart automation modules.
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <span className="px-2 py-0.5 rounded-sm bg-surface-container-highest font-mono-label text-[11px] sm:text-mono-label text-on-surface-variant">ESP32 / C++</span>
                      <span className="px-2 py-0.5 rounded-sm bg-surface-container-highest font-mono-label text-[11px] sm:text-mono-label text-on-surface-variant">MQTT Broker</span>
                      <span className="px-2 py-0.5 rounded-sm bg-surface-container-highest font-mono-label text-[11px] sm:text-mono-label text-on-surface-variant">Sensors I2C/SPI</span>
                      <span className="px-2 py-0.5 rounded-sm bg-surface-container-highest font-mono-label text-[11px] sm:text-mono-label text-on-surface-variant">Telemetry Flow</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Scope 3 */}
              <ScrollReveal delay={0.2}>
                <div className="p-4 sm:p-space-lg rounded-xl bg-surface-container-low transition-all hover:bg-surface-container flex flex-col sm:flex-row gap-space-md items-start">
                  <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center shrink-0 text-on-surface">
                    <PrecisionManufacturing className="w-5 h-5 text-on-surface" />
                  </div>
                  <div className="flex flex-col gap-space-xs w-full">
                    <div className="flex flex-wrap sm:flex-nowrap items-start sm:items-center justify-between gap-1">
                      <h3 className="font-heading-md text-base sm:text-heading-md text-on-surface">Robotics &amp; Intelligent Experiments</h3>
                      <span className="font-mono-label text-[10px] sm:text-mono-label text-outline px-space-xs py-0.5 rounded bg-surface-container-high shrink-0">ROBOTICS / AI</span>
                    </div>
                    <p className="font-body-regular text-sm sm:text-body-regular text-on-surface-variant">
                      Developing experimental robotic testbeds, autonomous navigation logic, computer vision sensor fusion, and ROS 2 communication nodes coupled with Python edge-inference scripts.
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <span className="px-2 py-0.5 rounded-sm bg-surface-container-highest font-mono-label text-[11px] sm:text-mono-label text-on-surface-variant">ROS 2</span>
                      <span className="px-2 py-0.5 rounded-sm bg-surface-container-highest font-mono-label text-[11px] sm:text-mono-label text-on-surface-variant">Python</span>
                      <span className="px-2 py-0.5 rounded-sm bg-surface-container-highest font-mono-label text-[11px] sm:text-mono-label text-on-surface-variant">Kinematics</span>
                      <span className="px-2 py-0.5 rounded-sm bg-surface-container-highest font-mono-label text-[11px] sm:text-mono-label text-on-surface-variant">Autonomous Nav</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

          </div>

          {/* RIGHT COLUMN: Contact Form & Terminal Box */}
          <div className="lg:col-span-6 flex flex-col gap-space-md">
            <ScrollReveal delay={0.1}>
              <div className="p-4 sm:p-space-lg md:p-space-xl rounded-xl bg-surface-container-low backdrop-blur-xl shadow-xl flex flex-col gap-space-md sm:gap-space-lg">

              {/* Terminal Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-space-sm border-b border-surface-container-highest">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-error" />
                  <span className="w-3 h-3 rounded-full bg-outline" />
                  <span className="w-3 h-3 rounded-full bg-secondary" />
                  <span className="font-mono-label text-[11px] sm:text-mono-label text-on-surface-variant ml-1 sm:ml-2 font-semibold">MSG_DISPATCH // PROTOCOL_SECURE</span>
                </div>
                <div className="font-mono-label text-[10px] sm:text-mono-label text-secondary flex items-center gap-1">
                  <LockIcon className="w-3 h-3" />
                  <span>TLS_256_ACTIVE</span>
                </div>
              </div>

              {/* Status Line */}
              <div className="p-space-sm rounded-lg bg-surface-container-lowest font-mono-code text-[11px] sm:text-mono-code text-outline-variant flex flex-wrap items-center justify-between gap-1 sm:gap-2">
                <div className="flex items-center gap-space-xs text-on-surface-variant">
                  <span className="text-secondary">$</span>
                  <span>READY_FOR_PAYLOAD</span>
                  <span className="w-2 h-4 bg-secondary inline-block animate-pulse" />
                </div>
                <span className="font-mono-label text-[10px] sm:text-mono-label text-outline">ENDPOINT: azizsaddique.dev</span>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-space-md">

                {/* Honeypot Spam Trap (Hidden from users) */}
                <input
                  type="text"
                  name="_honeypot"
                  value={formData._honeypot}
                  onChange={(e) => setFormData({ ...formData, _honeypot: e.target.value })}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

                {/* Name */}
                <div className="flex flex-col gap-space-xs">
                  <div className="flex items-center justify-between">
                    <label className="font-mono-label text-mono-label text-on-surface font-medium uppercase tracking-wider" htmlFor="name">
                      FULL NAME <span className="text-secondary">*</span>
                    </label>
                    <span className="font-mono-label text-mono-label text-outline">REQ_STRING</span>
                  </div>
                  <div className="relative">
                    <Person className="absolute left-3 top-1/2 -translate-y-1/2 text-outline text-lg" />
                    <input
                      id="name"
                      required
                      disabled={status === 'submitting'}
                      type="text"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (fieldErrors?.name) setFieldErrors({ ...fieldErrors, name: [] });
                      }}
                      placeholder="e.g. Dr. Alex Mercer / Hiring Lead"
                      className={`w-full pl-10 pr-4 py-3 rounded-lg bg-surface-container text-on-surface placeholder:text-outline/60 font-body-regular text-body-regular focus:bg-surface-container-high focus:outline-none transition-colors ${fieldErrors?.name?.length ? 'border border-error' : ''
                        }`}
                    />
                  </div>
                  {fieldErrors?.name?.length ? (
                    <span className="text-xs text-error font-mono-label">{fieldErrors.name[0]}</span>
                  ) : null}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-space-xs">
                  <div className="flex items-center justify-between">
                    <label className="font-mono-label text-mono-label text-on-surface font-medium uppercase tracking-wider" htmlFor="email">
                      EMAIL <span className="text-secondary">*</span>
                    </label>
                    <span className="font-mono-label text-mono-label text-outline">RFC_5322</span>
                  </div>
                  <div className="relative">
                    <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-outline text-lg" />
                    <input
                      id="email"
                      required
                      disabled={status === 'submitting'}
                      type="email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (fieldErrors?.email) setFieldErrors({ ...fieldErrors, email: [] });
                      }}
                      placeholder="name@organization.com"
                      className={`w-full pl-10 pr-4 py-3 rounded-lg bg-surface-container text-on-surface placeholder:text-outline/60 font-body-regular text-body-regular focus:bg-surface-container-high focus:outline-none transition-colors ${fieldErrors?.email?.length ? 'border border-error' : ''
                        }`}
                    />
                  </div>
                  {fieldErrors?.email?.length ? (
                    <span className="text-xs text-error font-mono-label">{fieldErrors.email[0]}</span>
                  ) : null}
                </div>

                {/* Scope */}
                <div className="flex flex-col gap-space-xs">
                  <div className="flex items-center justify-between">
                    <label className="font-mono-label text-mono-label text-on-surface font-medium uppercase tracking-wider" htmlFor="scope">
                      PROJECT SCOPE <span className="text-secondary">*</span>
                    </label>
                    <span className="font-mono-label text-mono-label text-outline">SELECT_CATEGORY</span>
                  </div>
                  <div className="relative">
                    <Tune className="absolute left-3 top-1/2 -translate-y-1/2 text-outline text-lg" />
                    <select
                      id="scope"
                      required
                      disabled={status === 'submitting'}
                      value={formData.scope}
                      onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                      className="w-full pl-10 pr-10 py-3 rounded-lg bg-surface-container text-on-surface font-body-regular text-body-regular focus:bg-surface-container-high focus:outline-none appearance-none transition-colors cursor-pointer"
                    >
                      <option className="bg-surface-container-high text-on-surface" value="fullstack">Full-Stack Web or Mobile Development</option>
                      <option className="bg-surface-container-high text-on-surface" value="iot">IoT &amp; Embedded Hardware Prototyping</option>
                      <option className="bg-surface-container-high text-on-surface" value="career">Full-Time / Engineering Role Inquiry</option>
                      <option className="bg-surface-container-high text-on-surface" value="robotics">Robotics &amp; ROS 2 Experimentation</option>
                      <option className="bg-surface-container-high text-on-surface" value="general">Technical Consultation / Other</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-space-xs">
                  <div className="flex items-center justify-between">
                    <label className="font-mono-label text-mono-label text-on-surface font-medium uppercase tracking-wider" htmlFor="message">
                      MESSAGE <span className="text-secondary">*</span>
                    </label>
                    <span className="font-mono-label text-mono-label text-outline">
                      {charCount} / 800 CHARS
                    </span>
                  </div>
                  <textarea
                    id="message"
                    required
                    disabled={status === 'submitting'}
                    rows={5}
                    maxLength={800}
                    value={formData.message}
                    onChange={handleMessageChange}
                    placeholder="Detail technical requirements, timeline, project architecture, or role specifics..."
                    className={`w-full p-3 rounded-lg bg-surface-container text-on-surface placeholder:text-outline/60 font-body-regular text-body-regular focus:bg-surface-container-high focus:outline-none resize-none transition-colors ${fieldErrors?.message?.length ? 'border border-error' : ''
                      }`}
                  />
                  {fieldErrors?.message?.length ? (
                    <span className="text-xs text-error font-mono-label">{fieldErrors.message[0]}</span>
                  ) : null}
                </div>

                {/* Confidential NDA */}
                <div className="flex items-center gap-space-sm p-space-sm rounded-lg bg-surface-container-lowest">
                  <input
                    id="nda"
                    type="checkbox"
                    disabled={status === 'submitting'}
                    checked={formData.nda}
                    onChange={(e) => setFormData({ ...formData, nda: e.target.checked })}
                    className="w-4 h-4 rounded bg-surface-container text-secondary accent-secondary cursor-pointer"
                  />
                  <label htmlFor="nda" className="font-body-sm text-body-sm text-on-surface-variant cursor-pointer select-none">
                    Confidential initiative / NDA preferred prior to detailed system specs.
                  </label>
                </div>

                {/* Cloudflare Turnstile Security Protection */}
                <TurnstileWidget
                  ref={turnstileRef}
                  onSuccess={handleTurnstileSuccess}
                  onExpire={handleTurnstileExpire}
                  onError={handleTurnstileError}
                  hasError={Boolean(fieldErrors?.turnstileToken?.length)}
                />
                {fieldErrors?.turnstileToken?.length ? (
                  <span className="text-xs text-error font-mono-label -mt-2">
                    {fieldErrors.turnstileToken[0]}
                  </span>
                ) : null}

                {/* Submit button */}
                <button
                  id="submit-btn"
                  type="submit"
                  disabled={!isFormValid || status === 'submitting'}
                  aria-disabled={!isFormValid || status === 'submitting'}
                  className={`w-full py-4 rounded-xl font-mono-code text-mono-code font-bold uppercase tracking-wider flex items-center justify-center gap-space-sm transition-all shadow-md btn-micro group ${!isFormValid || status === 'submitting'
                    ? 'bg-secondary/40 text-on-secondary/60 cursor-not-allowed'
                    : 'bg-secondary hover:bg-secondary-fixed text-on-secondary cursor-pointer'
                    }`}
                >
                  {status === 'submitting' ? (
                    <>
                      <span className="w-4 h-4 border-2 border-on-secondary border-t-transparent rounded-full animate-spin" />
                      <span>DISPATCHING TRANSMISSION...</span>
                    </>
                  ) : !turnstileToken ? (
                    <>
                      <span>SECURITY VERIFICATION PENDING</span>
                      <LockIcon className="w-4 h-4 text-on-secondary/60" />
                    </>
                  ) : !isFormValid ? (
                    <>
                      <span>COMPLETE REQUIRED FIELDS</span>
                      <AlertCircle className="w-4 h-4 text-on-secondary/60" />
                    </>
                  ) : (
                    <>
                      <span>DISPATCH MESSAGE</span>
                      <Send className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </>
                  )}
                </button>

                {/* Success Banner */}
                {status === 'success' && (
                  <div className="p-space-md rounded-lg bg-surface-container-high border border-secondary/30 flex items-center gap-space-sm">
                    <CheckCircle className="text-secondary w-5 h-5 shrink-0" />
                    <div className="flex flex-col">
                      <span className="font-mono-code text-mono-code text-secondary font-semibold">TRANSMISSION CONFIRMED</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">Message delivered. Expected turnaround: &lt; 24 business hours.</span>
                    </div>
                  </div>
                )}

                {/* Error Banner */}
                {status === 'error' && errorMessage && (
                  <div className="p-space-md rounded-lg bg-error/10 border border-error/30 flex items-start gap-space-sm text-error">
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    <div className="flex flex-col">
                      <span className="font-mono-code text-mono-code font-semibold uppercase">DISPATCH FAILED</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">{errorMessage}</span>
                    </div>
                  </div>
                )}

              </form>

              <div className="flex items-start gap-space-xs text-outline font-body-sm text-body-sm pt-space-xs">
                <ShieldWithHeart className="w-4 h-4 shrink-0 mt-0.5 text-secondary" />
                <span>
                  Connected directly to Muhammad Aziz Saddique's engineering dispatch node. For urgent matters, email directly at{' '}
                  <span className="text-on-surface font-mono-code text-mono-code">azizsaddiquesaddique@gmail.com</span>.
                </span>
              </div>
            </div>
          </ScrollReveal>

            {/* Mean SLA Response Card */}
            <ScrollReveal delay={0.2}>
              <div className="p-space-md rounded-xl bg-surface-container-low flex items-center justify-between">
                <div className="flex items-center gap-space-md">
                  <div className="w-9 h-9 rounded-lg bg-surface-container-high flex items-center justify-center text-secondary">
                    <Speed className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <span className="font-mono-label text-mono-label text-outline uppercase block">Mean SLA Response</span>
                    <span className="font-heading-md text-heading-md text-on-surface font-bold">&lt; 18 Hours</span>
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-space-md">
                  <svg className="w-32 h-8 text-secondary" fill="none" viewBox="0 0 128 32">
                    <path d="M0 24L20 18L40 22L60 12L80 16L100 6L128 10" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    <circle cx="128" cy="10" fill="currentColor" r="3" />
                  </svg>
                  <span className="font-mono-label text-mono-label text-secondary">STABLE</span>
                </div>
              </div>
            </ScrollReveal>

          </div>

        </div>

        {/* BOTTOM SECTION */}
        <ScrollReveal>
          <div className="mt-space-xl p-4 sm:p-space-lg md:p-space-xl rounded-xl bg-surface-container-low backdrop-blur-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-space-lg">
            <div className="flex flex-col gap-space-xs max-w-xl">
              <div className="flex items-center gap-space-xs font-mono-label text-[10px] sm:text-mono-label text-secondary">
                <span className="tracking-widest">ZERO FORM LATENCY</span>
              </div>
              <h2 className="font-heading-lg text-xl sm:text-heading-lg text-on-surface font-bold">
                Prefer a Direct Conversation?
              </h2>
              <p className="font-body-regular text-sm sm:text-body-regular text-on-surface-variant">
                Bypass form submission and start a direct channel on your preferred platform or copy the contact string directly to your clipboard.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-space-sm sm:gap-space-md w-full md:w-auto">
              <button
                onClick={() => copyEmailToClipboard(PORTFOLIO_DATA.personalInfo.email, setCopiedEmail)}
                className="min-h-[44px] px-space-md sm:px-space-lg py-3 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-mono-code text-xs sm:text-mono-code flex items-center justify-center gap-space-xs transition-colors btn-micro group cursor-pointer"
              >
                <MailIcon className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />
                <span>{copiedEmail ? 'Copied Email!' : 'Copy Email'}</span>
              </button>
              <a
                href={PORTFOLIO_DATA.personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] px-space-md sm:px-space-lg py-3 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-mono-code text-xs sm:text-mono-code flex items-center justify-center gap-space-xs transition-colors btn-micro group cursor-pointer"
              >
                <OpenInNew className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                <span>GitHub</span>
              </a>
              <a
                href={PORTFOLIO_DATA.personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] px-space-md sm:px-space-lg py-3 rounded-lg bg-secondary text-on-secondary font-mono-code text-xs sm:text-mono-code font-semibold flex items-center justify-center gap-space-xs transition-all shadow-sm btn-micro group cursor-pointer"
              >
                <Send className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                <span>LinkedIn InMail</span>
              </a>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </div>
  );
};
