import React from 'react';
import { Smartphone, Zap, ArrowDown, Radio, Clock, Power } from 'lucide-react';

export const EcoplugifyAppAnnouncement: React.FC = () => {
  const handleScrollToEcoplugify = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById('featured-project');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      aria-label="Ecoplugify Mobile App Announcement"
      className="w-full my-space-lg sm:my-space-xl relative"
    >
      {/* Background Ambient Glows */}
      <div
        className="absolute -top-12 left-1/3 w-80 h-80 rounded-full bg-secondary/10 blur-[130px] pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-10 right-1/4 w-72 h-72 rounded-full bg-[#38bdf8]/10 blur-[140px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Main Glassmorphic Announcement Box */}
      <div className="relative rounded-2xl bg-surface-container/90 border border-secondary/30 shadow-[0_0_40px_rgba(170,224,46,0.08)] backdrop-blur-xl overflow-hidden p-5 sm:p-space-lg lg:p-space-xl">
        {/* Subtle Tech Grid Texture */}
        <div
          className="absolute inset-0 bg-tech-grid opacity-25 pointer-events-none -z-10 [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_90%)]"
          aria-hidden="true"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg lg:gap-space-xl items-center">
          {/* Left Column: Headlines, Supporting Text, and Action Controls */}
          <div className="lg:col-span-7 flex flex-col gap-space-md">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-space-xs px-3 py-1 rounded-full bg-secondary/10 border border-secondary/30 text-secondary font-mono-label text-[11px] sm:text-mono-label uppercase tracking-widest font-bold shadow-sm w-fit">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse shrink-0" />
              <span>ECOPLUGIFY APP • COMING SOON</span>
            </div>

            {/* Main Headline */}
            <h2 className="font-heading-xl text-2xl sm:text-3xl md:text-4xl lg:text-heading-xl text-on-surface font-bold tracking-tight leading-tight">
              Ecoplugify — Smart Energy,{' '}
              <span className="text-secondary drop-shadow-[0_0_24px_rgba(170,224,46,0.4)] bg-gradient-to-r from-secondary via-[#d4ff59] to-[#38bdf8] bg-clip-text text-transparent">
                Coming Soon.
              </span>
            </h2>

            {/* Primary Supporting Text */}
            <p className="font-body-lg text-base sm:text-body-lg text-on-surface font-medium leading-relaxed max-w-xl">
              “Monitor energy consumption, control connected appliances, and explore smarter energy management with Ecoplugify. The mobile app is coming soon.”
            </p>

            {/* Short Supporting Technical Line */}
            <p className="font-body-regular text-xs sm:text-body-sm text-on-surface-variant leading-relaxed max-w-xl">
              Engineered with ESP32 edge silicon and IoT telemetry to deliver real-time energy monitoring, intelligent thresholding, and smart appliance control directly from your phone.
            </p>

            {/* Hardware & IoT Micro Telemetry Strip */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-space-sm pt-space-xs font-mono-code text-[11px] sm:text-mono-code text-outline">
              <span className="px-2 py-0.5 rounded bg-surface-container-high text-secondary font-semibold">
                ESP32 + PZEM-004T
              </span>
              <span>•</span>
              <span className="text-on-surface">Sub-100ms MQTT Feed</span>
              <span>•</span>
              <span className="text-on-surface">Remote Appliance Relay</span>
            </div>

            {/* Action Buttons Hub */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-space-md pt-space-xs">
              {/* Primary: Explore Ecoplugify (Scrolls to existing section) */}
              <a
                href="#featured-project"
                onClick={handleScrollToEcoplugify}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-space-lg py-3 rounded-lg bg-secondary text-on-secondary font-mono-code text-sm font-bold shadow-md hover:bg-secondary-fixed transition-all active:scale-95 cursor-pointer min-h-[44px]"
              >
                <span>Explore Ecoplugify</span>
                <ArrowDown className="w-4 h-4 shrink-0" />
              </a>

              {/* Secondary: App Coming Soon (Informational / In Development) */}
              <div
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-space-md py-3 rounded-lg bg-surface-container-high/80 border border-outline-variant/40 text-on-surface font-mono-code text-sm select-none min-h-[44px]"
                title="Mobile client is actively under development — store release coming soon"
              >
                <Smartphone className="w-4 h-4 text-secondary shrink-0" />
                <span>App Coming Soon</span>
                <span className="font-mono-label text-[10px] px-1.5 py-0.5 rounded bg-surface-container-highest text-secondary uppercase font-bold tracking-wider">
                  IN DEV
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Telemetry Mobile Interface Preview */}
          <div className="lg:col-span-5 flex justify-center mt-4 lg:mt-0">
            {/* Phone Mockup Frame */}
            <div className="relative w-full max-w-[320px] rounded-[2rem] bg-surface-container-lowest p-3 sm:p-4 border-2 border-secondary/40 shadow-[0_0_35px_rgba(170,224,46,0.12)]">
              {/* Screen Notch / Top Bar */}
              <div className="flex items-center justify-between px-3 py-1 mb-2 font-mono-code text-[10px] text-outline border-b border-surface-container-high/40">
                <span className="text-secondary font-bold">ECOPLUGIFY MOBILE</span>
                <span className="flex items-center gap-1">
                  <Radio className="w-3 h-3 text-secondary animate-pulse" />
                  <span>BLE / MQTT</span>
                </span>
              </div>

              {/* App Interface Visual Telemetry Preview */}
              <div className="rounded-xl bg-surface-container-low p-3 sm:p-4 flex flex-col gap-3 border border-surface-container-high/60">
                {/* Active Socket Status */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-mono-label text-[10px] text-outline block uppercase">CONNECTED APPLIANCE</span>
                    <span className="font-heading-md text-sm sm:text-base text-on-surface font-bold">Lab Bench Relay #01</span>
                  </div>
                  <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-ping" />
                </div>

                {/* Energy Consumption Live Gauge Box */}
                <div className="p-3 rounded-lg bg-surface-container-lowest border border-secondary/20 flex flex-col gap-1">
                  <div className="flex items-center justify-between text-outline font-mono-label text-[10px]">
                    <span className="text-secondary flex items-center gap-1 font-bold">
                      <Zap className="w-3 h-3 text-secondary" />
                      <span>REAL-TIME POWER</span>
                    </span>
                    <span className="text-on-surface-variant font-mono-code">238.4 V // 4.12 A</span>
                  </div>
                  <div className="flex items-baseline gap-1.5 pt-0.5">
                    <span className="font-mono-metric text-2xl sm:text-3xl text-secondary font-bold">982.2</span>
                    <span className="font-mono-label text-xs text-on-surface-variant uppercase">Watts</span>
                  </div>
                </div>

                {/* Switch State */}
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-surface-container-high/50 font-mono-code text-xs">
                  <div className="flex items-center gap-2 text-on-surface">
                    <Power className="w-4 h-4 text-secondary" />
                    <span>Relay Switch Control</span>
                  </div>
                  <span className="font-mono-label text-[10px] font-bold px-2 py-0.5 rounded bg-secondary text-on-secondary">
                    ENGAGED
                  </span>
                </div>

                {/* Status Notice */}
                <div className="pt-1 text-center font-mono-label text-[10px] text-outline uppercase tracking-wider flex items-center justify-center gap-1.5">
                  <Clock className="w-3 h-3 text-secondary" />
                  <span>Mobile Client • Staged for Release</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EcoplugifyAppAnnouncement;
