'use client'

import { CaseStudyNav } from './components/CaseStudyNav'
import { ScrollProgress } from './components/ScrollProgress'
import { SectionDots } from './components/SectionDots'
import { Hero } from './components/Hero'
import { Overview } from './components/Overview'
import { Architecture } from './components/Architecture'
import { Features } from './components/Features'
import { Integrations } from './components/Integrations'
import { AIFluency } from './components/AIFluency'
import { Testing } from './components/Testing'
import { Security } from './components/Security'
import { Decisions } from './components/Decisions'
import { BackendModules } from './components/BackendModules'
import { CaseStudyFooter } from './components/CaseStudyFooter'
import styles from './beauty-secret.module.css'

export default function BeautySecretCase() {
  return (
    <div className={styles.caseStudy}>
      <ScrollProgress />
      <CaseStudyNav />
      <SectionDots />

      {/* Act I — The Challenge */}
      <Hero />
      <Overview />

      {/* Act II — The Build */}
      <Architecture />
      <Features />
      <Integrations />
      <AIFluency />

      {/* Act III — The Result */}
      <Testing />
      <Security />
      <Decisions />
      <BackendModules />

      <CaseStudyFooter />
    </div>
  )
}
