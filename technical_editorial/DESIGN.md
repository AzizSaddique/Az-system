---
name: Technical Editorial
colors:
  surface: '#0b141c'
  surface-dim: '#0b141c'
  surface-bright: '#313a43'
  surface-container-lowest: '#060f17'
  surface-container-low: '#131d25'
  surface-container: '#172129'
  surface-container-high: '#212b34'
  surface-container-highest: '#2c363f'
  on-surface: '#dae4ef'
  on-surface-variant: '#c5c6ca'
  inverse-surface: '#dae4ef'
  inverse-on-surface: '#28313a'
  outline: '#8f9194'
  outline-variant: '#45474a'
  surface-tint: '#c6c6c9'
  primary: '#c6c6c9'
  on-primary: '#2f3033'
  primary-container: '#0b0d0f'
  on-primary-container: '#797b7d'
  inverse-primary: '#5d5e61'
  secondary: '#aae02e'
  on-secondary: '#253600'
  secondary-container: '#8fc400'
  on-secondary-container: '#364c00'
  tertiary: '#c2c7ce'
  on-tertiary: '#2c3136'
  tertiary-container: '#080d12'
  on-tertiary-container: '#767b81'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e2e2e5'
  primary-fixed-dim: '#c6c6c9'
  on-primary-fixed: '#1a1c1e'
  on-primary-fixed-variant: '#454749'
  secondary-fixed: '#bcf543'
  secondary-fixed-dim: '#a2d824'
  on-secondary-fixed: '#141f00'
  on-secondary-fixed-variant: '#374e00'
  tertiary-fixed: '#dee3ea'
  tertiary-fixed-dim: '#c2c7ce'
  on-tertiary-fixed: '#171c21'
  on-tertiary-fixed-variant: '#42474d'
  background: '#0b141c'
  on-background: '#dae4ef'
  surface-variant: '#2c363f'
typography:
  display-2xl:
    fontFamily: Geist
    fontSize: 56px
    fontWeight: '700'
    lineHeight: 60px
    letterSpacing: -0.04em
  heading-xl:
    fontFamily: Geist
    fontSize: 40px
    fontWeight: '600'
    lineHeight: 46px
    letterSpacing: -0.03em
  heading-lg:
    fontFamily: Geist
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 35px
    letterSpacing: -0.02em
  heading-md:
    fontFamily: Geist
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 27px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
    letterSpacing: -0.005em
  body-regular:
    fontFamily: Geist
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: '0'
  body-sm:
    fontFamily: Geist
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 19px
    letterSpacing: 0.01em
  mono-metric:
    fontFamily: Geist Mono
    fontSize: 32px
    fontWeight: '500'
    lineHeight: 35px
    letterSpacing: -0.02em
  mono-label:
    fontFamily: Geist Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.06em
  mono-code:
    fontFamily: Geist Mono
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: '0'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 2rem
  margin: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system embodies a sophisticated, modern engineering aesthetic inspired by high-caliber tech platforms and professional developer portfolios. It bridges full-stack cloud ecosystems with embedded hardware through a minimalist, precision-driven editorial lens.

### Brand Personality & Emotional Response
- **High Signal-to-Noise Ratio**: Content, architectural diagrams, and code artifacts lead the visual hierarchy. Visual ornaments are strictly functional or informative.
- **Precision Engineering**: Evokes a sense of absolute reliability, meticulous craftsmanship, and terminal-grade accuracy.
- **Calm & Focused**: Deep near-black environments reduce visual fatigue while warm-white typography and restrained electric-lime accents create clear, purposeful focal points.

### Design Style
The system adopts a refined variant of **Minimalism** fused with **High-Contrast Technical Editorial** elements:
- 1px micro-borders and subtle reticle/grid backgrounds.
- Monospace metadata labels and terminal-grade status indicators.
- Controlled luminance with deep near-black surfaces (`#0B0D0F`) and glowing electric-lime (`#C6FF4D`) interactive beacons.

## Colors

The color architecture is built on a 4-tier dark surface hierarchy, a high-legibility typographic grayscale, and a calibrated electric-lime accent family.

### Palette Strategy
- **Canvas (`#0B0D0F`)**: Serves as the global page backdrop and root viewport fill to minimize eye strain and maximize contrast.
- **Surfaces (`#111418`, `#161B20`, `#1E242B`)**: Establishes tonal depth for recessed containers, interactive cards, and floating popovers.
- **Borders (`#1F262E`, `#2D3743`)**: Hairline dividers and structural grid guides that maintain crisp separation without heavy drop shadows.
- **Text Grayscale (`#F5F6F8`, `#A3ADB8`, `#637080`)**: Ensures clear typographic hierarchy from high-impact headings down to secondary timestamps and metadata.
- **Accent & Status (`#C6FF4D`, `#34D399`, `#FBBF24`, `#F87171`)**: Electric lime acts as the primary interactive beacon, supported by semantic indicators for success, warnings, and errors.

## Typography

The typographic foundation pairs an ultra-clean geometric sans-serif for editorial narrative with a technical monospace for engineering metadata, metrics, and code artifacts.

### Scaling & Responsiveness
- Large display tokens (e.g., `display-2xl`) scale down gracefully on mobile viewports to prevent overflow while preserving structural weight.
- Monospace tokens maintain strict character widths and tabular numeric figures for telemetry, timestamps, and terminal command logs.

## Layout & Spacing

The layout philosophy relies on a **fixed content grid** bounded at a maximum width of `1200px` for main sections and `1440px` for wide engineering views, paired with an 8-point spatial rhythm.

### Spatial Rhythm & Breakpoints
- All dimensional tokens derive from an 8px base (with 4px half-steps for micro-components).
- Incorporates a subtle 32px × 32px CSS technical grid background (`.bg-tech-grid`) to reinforce structural context across technical sections.
- Breakpoints align to standard form factors: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px), and `2xl` (1440px).

## Elevation & Depth

Depth is achieved primarily through **luminance layering**, **hairline borders**, and **subtle accent-glow halos** rather than heavy drop shadows, preserving clean technical clarity.

### Surface Hierarchy & Shadows
- **Hairline Borders**: Standard borders use 1px solid `#1F262E`, transitioning to `#2D3743` or `rgba(198, 255, 77, 0.4)` on interactive states.
- **Glassmorphism**: Sticky navigation bars and overlays utilize semi-transparent surfaces (`rgba(11, 13, 15, 0.85)`) backed by a `12px` backdrop blur.
- **Glow Halos**: Active elements and focused cards leverage low-opacity electric-lime glows (`rgba(198, 255, 77, 0.15)`) to indicate focus without visual clutter.

## Shapes

The shape language reflects precision engineering through controlled, subtle rounding that avoids overly soft consumer aesthetics.

### Application
- **Base Rounding (`rounded-sm` / `4px`)**: Applied to micro-components, inline badges, tags, and status indicators.
- **Container Rounding (`rounded-md` / `6px` to `8px`)**: Applied to cards, interactive panels, input fields, and buttons.
- Sharp architectural lines and 1px micro-borders remain prominent to maintain the technical editorial character.

## Components

Components are engineered for high signal-to-noise ratio, featuring crisp borders, monospace metadata labels, and immediate state feedback.

### Key Components
- **Buttons**: 
  - *Primary*: Solid electric lime (`#C6FF4D`) background with near-black bold text and immediate scale-down feedback on press.
  - *Secondary (Outline)*: Transparent background with a muted border, transitioning to surface fill and lime highlights on hover.
  - *Ghost Monospace*: Clean text-only links styled in monospace metadata format.
- **Chips & Badges**: 28px height, `rounded-sm` geometry, `#111418` surface fill, and 1px subtle borders enclosing uppercase monospace labels.
- **Input Fields**: Idle state with `#2D3743` borders and `#161B20` surface fill, shifting to `#C6FF4D` focus rings upon activation.
- **Project Showcase Cards**: Structured containers featuring a monospace category tag, live repo indicator, 22px bold title, 3-line abstract, and embedded hardware telemetry readout previews.
- **Interactive Terminal / Telemetry Console**: Window-controlled developer console block featuring command prompts, output trees in electric lime, and live status pulses.
- **Lists & Timelines**: Left-aligned chronological rails with 1px hairline dividers and circular pill nodes centered on electric-lime indicators.
- **Checkboxes & Radio Buttons**: Minimal geometric geometry with high-contrast active ticks and focus halos.