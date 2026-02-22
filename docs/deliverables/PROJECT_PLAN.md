# GreenCircle — Project Plan & Student Allocation

**Purpose:** A plan document as if starting from scratch, with design thinking tasks allocated to three students. Student work produces research and design artifacts that feed back into the technical implementation.

**Spec:** `docs/requirements/2026_Term 1 UX Project Spec.md`  
**Target:** Year 9 Computing Technology students working in groups of three

---

## 1. Design Thinking Tasks We Skipped

The current implementation built directly from the spec. These design thinking activities were not performed and would strengthen the project:

| Task | Purpose | Output |
|------|---------|--------|
| User research | Validate assumptions with real community members | Interview notes, survey data |
| Persona creation | Humanise target audience | 2–4 persona cards |
| Empathy mapping | Understand user frustrations and motivations | Empathy map diagrams |
| Problem definition | Clarify the community waste problem | Problem statement |
| User journey mapping | Map flows before building | Journey maps |
| Wireframing (design-first) | Explore layout before code | Low-fidelity wireframes |
| Interactive prototyping | Test flows without code | Web prototype |
| Usability testing | Validate with users | Test report, findings |
| Accessibility audit | Check WCAG compliance | Audit report |
| Iteration based on feedback | Refine from user input | Updated designs |

---

## 2. Student Roles & Primary Deliverables

| Student | Primary Role | Key Deliverables | Feeds Into |
|---------|--------------|------------------|------------|
| **Lewis** | Web prototype (technical build) | Working web app via AI dev tools (Cursor) | — |
| **Student B** | Research & design thinking | Reverse Brief (Word), personas, problem statement, journey maps, wireframes | Lewis's build |
| **Student C** | Evaluation, accessibility & presentation | Usability report, accessibility audit, Presentation (PPT), success criteria | Lewis's iterations |

---

## 3. Detailed Task Allocation

### Lewis — Web Prototype (Technical Build)

Lewis uses AI development tools (Cursor) to build the working web application. He receives design inputs from Student B and applies feedback from Student C.

| Task | Duration | Output |
|------|----------|--------|
| T1: Scaffold | 1 wk | T3 stack, Prisma, NextAuth, routes |
| T2: Core features | 2 wk | Dashboard, bookings, reports, challenges |
| T3: Admin & visualisation | 1 wk | Admin dashboard, charts, user management |
| T4: i18n & polish | 1 wk | Locales, UI refinements |
| T5: Feedback integration | 1 wk | Apply research and usability findings from B & C |
| T6: Documentation & deploy | 0.5 wk | Deliverables, Vercel |

### Student B — Research & Design Thinking

Student B does the user-centred research and design artefacts that inform Lewis's build.

| Task | Duration | Output |
|------|----------|--------|
| Plan user research (interviews/surveys) | 0.5 wk | Research plan |
| Conduct 3–5 community interviews | 1 wk | Interview notes |
| Create 2–3 personas (demographic, behavioural, psychometric, geographic) | 0.5 wk | Persona cards |
| Empathy maps for key personas | 0.5 wk | Empathy map diagrams |
| Write problem statement | 0.5 wk | Problem statement |
| Map user journeys (resident, admin) | 0.5 wk | Journey maps |
| Create low-fidelity wireframes | 1 wk | Wireframes |
| Document navigation and accessibility choices | 0.5 wk | Design notes |
| Draft reverse brief sections | 1 wk | Reverse Brief (Word) draft |
| Finalise reverse brief with UX justification | 0.5 wk | Reverse Brief (Word) final |
| Share personas, journey maps, wireframes with Lewis by end of Week 2 | — | Handoff |

### Student C — Evaluation, Accessibility & Presentation

Student C tests the web prototype, audits accessibility, and delivers the presentation.

| Task | Duration | Output |
|------|----------|--------|
| Create usability test plan | 0.5 wk | Test plan |
| Run 2–3 usability tests (on Lewis's web prototype) | 1 wk | Test report |
| Accessibility audit (WCAG check) | 0.5 wk | Audit report |
| Map findings to success criteria | 0.5 wk | Success criteria checklist |
| Draft presentation structure | 0.5 wk | Outline |
| Build presentation (problem, features, journeys, needs) | 1 wk | Presentation (PPT) |
| Rehearse and refine | 0.5 wk | Final presentation |
| Share usability report and audit with Lewis by end of Week 5 | — | Handoff |

---

## 4. Feedback Loops: Students → Lewis (via Cursor)

| Student Output | Lewis Action (using Cursor) |
|----------------|-----------------------------|
| Personas, problem statement (B) | Refine copy, onboarding, feature emphasis |
| Journey maps, wireframes (B) | Validate route structure, align UI patterns |
| Usability report (C) | Fix identified pain points |
| Accessibility audit (C) | Address WCAG issues |
| Success criteria checklist (C) | Address gaps before submission |

---

## 5. Dependencies

- Lewis needs B's personas, journey maps, and wireframes before/during build.
- Student C needs Lewis's web prototype before usability testing and audit.
- Lewis's T5 (feedback integration) needs outputs from B and C.
- Presentation can be drafted in parallel; finalised after testing.

---

## 6. Related Documents

- **[GANTT_CHART.md](./GANTT_CHART.md)** — Week-by-week timeline, task checklists, handoff schedule
- **[FEEDBACK_TEMPLATE.md](./FEEDBACK_TEMPLATE.md)** — Structure for student feedback → Lewis's actions (via Cursor)
