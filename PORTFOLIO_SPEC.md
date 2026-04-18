# Portfolio Case Study Spec: Beauty Secret

## Overview

Transform the existing `portfolio.html` (1,280-line static spec doc) into a **cinematic, interactive Next.js page** at `/projects/beauty-secret` within the emasdev project. The page tells the story of building bsecret.com as a 3-act building journey with GSAP-powered animations, real screenshots, and reconstructed dashboard visualizations.

## Decisions

| Decision | Choice |
|----------|--------|
| Format | Next.js page (not standalone HTML) |
| Narrative | Building journey — 3 acts |
| Animation level | Cinematic / showpiece |
| Screenshots | 25 captured from b-secret.com + reconstructed dashboard visuals |

---

## Page Architecture (Next.js)

```
app/projects/beauty-secret/
├── page.tsx                    # Main page component (server component wrapper)
├── BeautySecretCase.tsx        # Client component ("use client") — the actual page
├── components/
│   ├── Hero.tsx                # Act I hero with particles + animated stats
│   ├── Overview.tsx            # Problem/Solution + tech stack + metrics
│   ├── Architecture.tsx        # Pinned scrollytelling architecture diagram
│   ├── Features.tsx            # Tabbed features with booking wizard demo
│   ├── Integrations.tsx        # API cards + animated payment flow
│   ├── AIFluency.tsx           # Claude Code section with typewriter
│   ├── Testing.tsx             # Test results with progress bars
│   ├── Security.tsx            # Security headers with padlock animation
│   ├── Decisions.tsx           # Expandable decision cards
│   ├── BackendModules.tsx      # Animated module table
│   ├── BookingWizardDemo.tsx   # Interactive 5-step wizard with screenshots
│   ├── BrowserFrame.tsx        # Reusable browser mockup wrapper
│   ├── PhoneFrame.tsx          # Reusable phone mockup wrapper
│   ├── Lightbox.tsx            # Fullscreen image overlay
│   ├── ScrollProgress.tsx      # Top progress bar
│   ├── SectionDots.tsx         # Right-side section indicator (desktop)
│   ├── ParticleCanvas.tsx      # Hero background particles
│   └── AnimatedCounter.tsx     # Reusable count-up number component
├── hooks/
│   ├── useGSAP.ts              # GSAP ScrollTrigger setup hook
│   └── useReducedMotion.ts     # Prefers-reduced-motion detection
├── lib/
│   └── animations.ts           # GSAP animation presets/factories
└── styles/
    └── beauty-secret.css       # Scoped styles (or use Tailwind)
```

### Dependencies to Add

```json
{
  "gsap": "^3.12.7"     // Animation engine + ScrollTrigger + SplitText
}
```

GSAP is the only new dependency. All other animations use CSS + the existing Tailwind setup.

### Routing

Add to `next.config.ts` if needed, or just use the file-system routing (`app/projects/beauty-secret/page.tsx`).

---

## Act Structure & Content Map

### ACT I — "The Challenge" (Hero + Overview)

**Emotional goal**: Draw the visitor in. Make them feel the scale of the problem and the elegance of the solution.

#### Hero Section
- **Opening label**: `Featured Project — Production Deployed` (pill with pulsing dot)
- **Headline**: `Beauty Secret` / `Salon Management Platform` (gradient text)
- **Subtext**: Narrative copy — "A production-grade full-stack SaaS application for a luxury beauty salon in Bucharest, Romania..."
- **Animated stat counters** (count from 0):
  - 48,000+ Lines of Code
  - 227 Source Files
  - 157+ Backend Functions
  - 414+ Test Cases
  - 112 Git Commits
- **Background**: Particle canvas (40-60 pink/purple floating dots)
- **Parallax**: Radial gradient pseudo-elements move at different scroll speeds

**Animations**:
- Hero label slides in from left with bounce
- H1 characters stagger in (SplitText, `y: 40, opacity: 0, stagger: 0.02`)
- Gradient text has left-to-right mask sweep
- Stat counters trigger on scroll-into-view, count over 2s with ease-out
- Particles drift with sin-wave motion on canvas

#### Overview Section
- **Transition copy**: *"A salon with 4 employees, 177+ services, and customers booking via WhatsApp..."*
- **Problem card** (slides from left) / **Solution card** (slides from right)
- **Screenshot #1**: Full landing page in browser mockup frame — first visual proof
- **Tech stack badges**: Staggered pop-in (16 badges, 30ms stagger each)
- **Metric cards grid** (8 cards): Count-up animations + wave entrance pattern

**Screenshots used**:
- Screenshot #1 (Hero EN) or #25 (Hero RO) — in BrowserFrame
- Optionally #11 (Services index) — secondary proof

---

### ACT II — "The Build" (Architecture → Features → Integrations → AI)

**Emotional goal**: Walk through the engineering journey. Each section = a chapter in the build story.

#### Architecture Section — *"First, I designed the system..."*

**Transition copy**: *"Before writing a single line of code, I mapped out the entire system architecture — a serverless stack built for real-time reactivity."*

**Pinned Scrollytelling Architecture Diagram**:
- Container pins while user scrolls through ~400vh of virtual height
- Layers reveal one at a time:
  1. CLIENT LAYER (Next.js 16, React 19, Tailwind CSS 4) — boxes fade in + slide down
  2. Arrow draws itself (SVG `stroke-dashoffset` animation)
  3. MIDDLEWARE (Clerk, next-intl, Proxy) — boxes appear
  4. Arrow draws
  5. BACKEND (Convex, 157+ Functions, HTTP Actions) — boxes appear
  6. Arrow draws
  7. THIRD-PARTY (Stripe, Google Maps, Instagram, WhatsApp) — boxes appear
  8. Arrow draws
  9. INFRASTRUCTURE (Vercel, Convex Cloud, Clerk Hosted) — boxes appear
- Each `arch-box` has pulsing border glow on entrance
- Hover any box → connected boxes highlight, others dim to 30%
- **Mobile fallback**: No pinning; sequential reveal instead

**Database Schema Table**:
- 16-row table with staggered row entrance (30ms stagger from left)
- Row hover highlights related tables (e.g., hovering `appointments` highlights `customers`, `payments`, `reviews`)

**Route Structure Cards**:
- 4 cards (Public, Customer, Employee, Admin) stagger in from bottom
- Admin sub-page badges scatter-in with slight random rotation

**Screenshot placement**:
- Screenshot of admin dashboard (reconstructed visualization) in browser mockup, right-aligned after the architecture diagram

#### Features Section — *"Then I built the core experiences..."*

**Transition copy**: *"With the architecture in place, I built the features that bring the platform to life."*

**Tab System (5 tabs: Booking, Dashboards, Loyalty, SEO, UI)**:
- **Sliding tab indicator**: Animated underline follows active tab (GSAP `x` and `width`)
- **Tab transitions**: Outgoing panel slides left + fades, incoming slides in from right + fades in
- Each tab panel has its own scroll-triggered animations

**Booking Tab** — The Star Interactive Element:
- Left side: Animated timeline (5 steps). Dots fill sequentially on scroll; connecting line grows; text slides in per step.
- Right side: **Interactive Booking Wizard Demo** (see below)
- Below: Smart Availability Engine feature list with animated checkmarks (SVG path draw)
- **Screenshots**: Booking flow steps #20-#24 used inside the wizard demo

**Dashboards Tab**:
- 3 dashboard cards (Customer, Employee, Admin) with staggered entrance
- Each card includes a **reconstructed mini-dashboard visualization** (simplified HTML/CSS recreation):
  - **Customer**: 4 stat cards + next appointment widget
  - **Employee**: Today's schedule mini-table + earnings stat
  - **Admin**: Revenue chart (mini sparkline) + appointment count + occupancy stat
- Below the cards: note about Convex reactive queries

**Loyalty Tab**:
- 4-tier timeline with animated dot fills
- Gift card system feature list

**SEO Tab**:
- Feature lists (SEO + i18n) with staggered checkmark animations
- **Screenshot**: Category page (#12 Hairdressing) in browser mockup

**UI Tab**:
- Feature lists (Visual Design + UX Patterns)
- **Screenshot pair**: Romanian hero (#25) vs English hero (#1) in two phone mockups side by side — demonstrates bilingual support

#### Integrations Section — *"I wired everything together..."*

**Transition copy**: *"Four external services, carefully integrated with production-grade reliability."*

**Integration Cards (4)**:
- Staggered entrance with **3D tilt** on hover (CSS `perspective` + `rotateX/Y` from mouse position)
- Cards: Convex, Stripe, Clerk, Maps/Social

**Animated Payment Flow Diagram**:
- Pinned section (shorter pin than architecture, ~200vh)
- 7 steps appear one at a time as user scrolls
- SVG arrows draw between steps
- **Pulsing data packet**: A small colored dot travels along each arrow as it completes
- Color coding: pink = customer action, purple = backend, green = Stripe
- **Screenshot**: Could show Stripe checkout (if captured) at step 4

#### AI Fluency Section — *"My development partner throughout..."*

**Transition copy**: *"83% of commits were AI-assisted — here's how I leveraged Claude Code across the entire development lifecycle."*

**Metric Cards (4)**: Animated counters with sparkle burst particle effect on completion
- 93 AI Co-Authored Commits
- 83% of Commits AI-Assisted
- 112 Total Commits
- 1 Developer (Solo)

**"How AI Was Leveraged" Cards (6)**: Masonry cascade entrance (column by column)

**CLAUDE.md Typewriter Code Block**:
- Initially empty, types out line by line tied to scroll position
- Blinking cursor at end of last visible line
- Each line appears as user scrolls deeper into the section
- Syntax highlighted (comments dim, keywords purple, functions pink)

---

### ACT III — "The Result" (Testing → Security → Decisions → Backend)

**Emotional goal**: Prove quality, security, and engineering maturity. The "trust" section.

#### Testing Section — *"414 tests. Zero known bugs."*

**Unit Tests (193 cases)**:
- Each test module shown as an **animated horizontal progress bar** that fills to its count
- Bar fills with green gradient, count number appears at end
- Staggered fill (each bar starts 100ms after the previous)

**E2E Tests (221 scenarios)**:
- Table with row entrance animations
- **Device badges**: Scatter-in animation (start at random positions → settle into grid)
- Show count: "Each test × 17 devices = 3,757 individual checks"

#### Security Section — *"Production-hardened from day one."*

**Padlock Animation**: Large SVG padlock, shackle drops and clicks locked on scroll-in

**Security Headers Card + Application Security Card**: Staggered entrance

**CSP Code Block**:
- Syntax highlighting with **hoverable domain tooltips**
- Hovering `clerk.accounts.dev` → tooltip: "Authentication provider"
- Hovering `*.convex.cloud` → tooltip: "Real-time database"

#### Engineering Decisions — *"Every architecture choice has a trade-off."*

**6 Decision Cards as Expandable Panels**:
- Show title + first 2 lines only
- Click → smooth height animation expands full rationale
- Subtle scale-up on hover before click
- Open one = close others (accordion behavior)

#### Backend Modules — *"22 modules. 157+ server functions."*

**Module Table**:
- 22-row table with staggered row entrance (slide from left, 30ms per row)
- "157+" header stat with animated counter
- Row hover: subtle background highlight + slightly expanded view

---

## Interactive Booking Wizard Demo

This is the single most impactful interactive element on the page. A simplified, clickable 5-step demo.

### Design

```
┌─────────────────────────────────────────────┐
│  ○ ○ ○   b-secret.com/booking              │
├─────────────────────────────────────────────┤
│                                             │
│   ① ─── ② ─── ③ ─── ④ ─── ⑤              │
│   ●      ○      ○      ○      ○            │
│                                             │
│  ┌─────────────────────────────────────┐    │
│  │                                     │    │
│  │    [Screenshot of current step]     │    │
│  │                                     │    │
│  │                                     │    │
│  └─────────────────────────────────────┘    │
│                                             │
│   ◀ Previous              Next ▶            │
│                                             │
└─────────────────────────────────────────────┘
```

### Implementation
- React component with `useState(currentStep)` (0-4)
- 5 step indicators (numbered circles + connecting line that fills progressively)
- Each step shows the corresponding screenshot from the booking flow:
  - Step 1: Screenshot #20 (Service selection)
  - Step 2: Screenshots #21/#22 (Calendar + Time slots)
  - Step 3: Screenshot #23 (Stylist selection)
  - Step 4: Screenshot #24 (Contact details form)
  - Step 5: Reconstructed summary view (or text placeholder)
- Previous/Next buttons with GSAP slide transitions
- Step indicator line fills with gradient as you advance
- Touch-friendly: swipe support for mobile

---

## Reconstructed Dashboard Visualizations

Since the admin/employee/customer dashboards are behind auth, we'll build simplified HTML/CSS/SVG recreations based on the actual component code from oanasalon. These are NOT interactive — they're static visual representations that look like the real dashboards.

### Admin Dashboard Mini-Viz
Based on: `/app/[locale]/admin/page.tsx`
```
┌──────────────────────────────────────────┐
│  Admin Dashboard                         │
├──────────────────────────────────────────┤
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐       │
│  │  12 │ │  47 │ │ 78% │ │ ₿2.4k│      │
│  │ Appt│ │Clnts│ │ Occ │ │  Rev │       │
│  └─────┘ └─────┘ └─────┘ └─────┘       │
│                                          │
│  Revenue This Week    Today's Schedule   │
│  ╭──────────────╮   ┌──────────────────┐ │
│  │  ╱╲  ╱╲      │   │ 09:00 Haircut    │ │
│  │ ╱  ╲╱  ╲╱╲   │   │ 10:30 Lashes     │ │
│  │╱        ╲╱   │   │ 13:00 Extensions │ │
│  ╰──────────────╯   └──────────────────┘ │
└──────────────────────────────────────────┘
```
- Stat cards with gradient numbers (same brand colors)
- Mini SVG line chart (hardcoded path, not real data)
- Mini schedule list with status dots
- Glass-morphism card styling matching bsecret.com's aesthetic

### Employee Dashboard Mini-Viz
Based on: `/app/[locale]/employee/page.tsx`
- 4 stat cards (Today's appts, Week count, Month revenue, Completion %)
- Today's schedule mini-table (3-4 rows)
- Achievement badges (3-4 colored emoji badges)

### Customer Dashboard Mini-Viz
Based on: `/app/[locale]/dashboard/page.tsx`
- 4 stat cards (Upcoming, Completed, Total spent, Loyalty points)
- Next appointment card (service, date, time, staff)
- Loyalty tier progress bar

### Implementation Approach
- Pure HTML/CSS/SVG within React components
- Styled to match bsecret.com's dark theme with glass-morphism
- Appear inside BrowserFrame components in the Dashboards tab
- Animated entrance (fade + slight scale-up)

---

## Screenshot Map

| # | Content | Section Placement | Frame Type |
|---|---------|------------------|------------|
| 1 | Hero EN | Overview — first proof of finished product | BrowserFrame |
| 11 | Services index | Overview — secondary (optional) | BrowserFrame |
| 12 | Hairdressing category | Features → SEO tab | BrowserFrame |
| 20 | Booking step 1 — service select | BookingWizardDemo step 1 | Inside demo |
| 21 | Booking step 2 — calendar | BookingWizardDemo step 2a | Inside demo |
| 22 | Booking step 2 — time slots | BookingWizardDemo step 2b | Inside demo |
| 23 | Booking step 3 — stylist | BookingWizardDemo step 3 | Inside demo |
| 24 | Booking step 4 — details | BookingWizardDemo step 4 | Inside demo |
| 25 | Hero RO | Features → UI tab (bilingual demo) | PhoneFrame |
| 1 | Hero EN | Features → UI tab (bilingual demo) | PhoneFrame |
| 3 | Team carousel | Landing page showcase (optional) | BrowserFrame |
| 5 | Gallery | Landing page showcase (optional) | BrowserFrame |
| 6 | Gift cards | Features → Loyalty tab (optional) | BrowserFrame |
| 9 | Contact/Map | Integrations → Maps card (optional) | BrowserFrame |

### Image Requirements
- Format: WebP, max 1200px width, quality 80
- `loading="lazy"` on all except first screenshot
- `width` + `height` attributes to prevent CLS
- Total budget: < 2MB for all images
- Store in: `public/screenshots/beauty-secret/`

---

## Reusable Components

### BrowserFrame
```
Props: { url: string, children: ReactNode, className?: string }
```
- Rounded top corners
- Title bar with 3 dots (red/yellow/green circles)
- URL bar showing the passed URL
- Drop shadow
- Hover: scale 1.02 + enhanced shadow
- Click: opens Lightbox

### PhoneFrame
```
Props: { children: ReactNode, className?: string }
```
- Rounded rectangle with thick dark border
- Notch cutout at top (CSS pseudo-element)
- Home indicator at bottom
- Screenshot inside with matching border-radius

### Lightbox
```
Props: { src: string, alt: string, isOpen: boolean, onClose: () => void }
```
- Dark backdrop (85% opacity)
- Image centered at max resolution
- Close button (X) top-right
- Escape key support
- Fade-in + scale-up on open, reverse on close

### AnimatedCounter
```
Props: { target: number, suffix?: string, duration?: number }
```
- Counts from 0 to target using GSAP
- Triggers on scroll-into-view (ScrollTrigger)
- Ease: `power2.out`
- Formats with commas (48,000+)

### ScrollProgress
- Fixed position, top: 0, left: 0, height: 3px, z-index: 200
- `scaleX` from 0 to 1 driven by page scroll progress
- Gradient: `--brand` to `--brand2`

### SectionDots
- Fixed position, right side of viewport
- One dot per section (10 dots)
- Active dot = filled brand color with glow
- Current section label appears next to active dot
- Hidden on screens < 1024px

---

## Animation Library & Setup

### GSAP Registration
```tsx
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
```

### Animation Presets (lib/animations.ts)
```typescript
// Reusable animation factories
export const fadeInUp = (trigger: string) => ({...})
export const staggerChildren = (parent: string, stagger: number) => ({...})
export const countUp = (element: string, target: number) => ({...})
export const drawSVGLine = (path: string) => ({...})
export const pinSection = (trigger: string, endTrigger: string) => ({...})
export const slideTabIn = (panel: HTMLElement, direction: 'left' | 'right') => ({...})
```

### Reduced Motion
```tsx
// useReducedMotion.ts
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    mq.addEventListener('change', (e) => setReduced(e.matches))
  }, [])
  return reduced
}
```

When `reduced = true`: All ScrollTrigger animations fire instantly (duration: 0), no particles, no pinning.

---

## Styling Approach

### Option A: Scoped CSS Module (Recommended)
A single `beauty-secret.module.css` with all the existing CSS variables and styles from portfolio.html, adapted to CSS Modules syntax.

### Color Palette (from portfolio.html)
```css
--brand: #c46a86;     /* Pink */
--brand2: #a77bd6;    /* Purple */
--bg: #0e0c0d;        /* Near-black */
--bg2: #161314;       /* Dark gray */
--surface: #1e1a1c;   /* Card bg */
--surface2: #262123;  /* Badge bg */
--text: #f5f0f1;      /* Light text */
--muted: #a8999c;     /* Secondary text */
--dim: #766d70;       /* Tertiary text */
--border: #342e30;    /* Border color */
```

This is a different palette from the main emasdev site (which uses teal/purple). The case study page should have its own visual identity — it's showcasing a DIFFERENT project.

### Typography
- Primary: Inter (already loaded in emasdev)
- Mono: JetBrains Mono (add Google Font link)

---

## Mobile Adaptations

| Feature | Desktop | Mobile (< 768px) |
|---------|---------|-------------------|
| Hero particles | 60 particles | 25 particles |
| Custom cursor | Yes | No |
| Architecture pinning | Pinned scrollytelling | Sequential reveal |
| Payment flow pinning | Pinned | Sequential reveal |
| Section dots | Right side | Hidden |
| Scroll progress | Top bar | Top bar |
| 3D tilt cards | Mouse-tracked tilt | Disabled |
| Booking wizard demo | Full-size | Full-width, smaller |
| Dashboard visualizations | Side by side | Stacked |
| Tab nav | Inline | Horizontally scrollable |

---

## Performance Budget

| Asset | Target Size |
|-------|-------------|
| Page JS bundle (incl GSAP) | < 120KB gzip |
| CSS | < 15KB gzip |
| Screenshots (10-14 WebP) | < 2MB total |
| Fonts (Inter already cached) | ~20KB (JetBrains Mono) |
| **Total first load** | **< 2.2MB** |
| **Largest Contentful Paint** | **< 2.5s** |
| **Cumulative Layout Shift** | **< 0.1** |

---

## Implementation Phases

### Phase 1: Foundation
- Create `app/projects/beauty-secret/` route structure
- Set up BeautySecretCase.tsx client component
- Port CSS from portfolio.html to CSS Module
- Install GSAP, set up ScrollTrigger
- Create useGSAP and useReducedMotion hooks
- Create ScrollProgress and SectionDots components
- Basic section structure with content from portfolio.html

### Phase 2: Hero & Overview (Act I)
- ParticleCanvas component
- Hero with SplitText animation + stat counters
- Overview with Problem/Solution slide-in
- Tech badge stagger animation
- Metric card count-up
- BrowserFrame component + first screenshot placement

### Phase 3: Architecture (Act II - Chapter 1)
- Replace text arrows with SVG arrows
- Pinned scrollytelling with ScrollTrigger
- Layer-by-layer reveal animation
- Database table hover interactions
- Route structure card animations

### Phase 4: Features (Act II - Chapter 2)
- Enhanced tab system with GSAP transitions
- Sliding tab indicator
- BookingWizardDemo interactive component
- Timeline animation for booking steps
- Dashboard mini-visualizations (3 reconstructed dashboards)
- Screenshot placements per tab

### Phase 5: Integrations + AI (Act II - Chapters 3 & 4)
- 3D tilt integration cards
- Animated payment flow with data packets
- AI metrics with sparkle bursts
- CLAUDE.md typewriter code block
- Masonry cascade for AI cards

### Phase 6: Act III Sections
- Testing progress bars + device scatter
- Security padlock SVG animation
- CSP domain tooltips
- Expandable decision cards (accordion)
- Backend module table animations

### Phase 7: Screenshot Capture & Integration
- Export all 25 browser screenshots as WebP files
- Optimize and resize
- Place in public/screenshots/beauty-secret/
- Integrate into all designated sections
- Build Lightbox component
- PhoneFrame for bilingual comparison

### Phase 8: Polish & QA
- Reduced motion testing
- Mobile responsiveness pass
- Touch device testing
- Lighthouse audit (target > 90)
- Cross-browser testing (Chrome, Firefox, Safari)
- Final animation timing tweaks

---

## Open Questions for Implementation

1. Should the main emasdev nav/layout wrap this page, or should it have its own full-page layout (no shared header/footer)?
2. Should there be a "Back to Portfolio" link/button to return to emamocanu.com?
3. Should the page have its own metadata/OG image, or inherit from the main site?
4. For the dashboard visualizations: should we use actual Recharts (same lib as oanasalon) for the mini-charts, or pure SVG paths to keep it lightweight?
