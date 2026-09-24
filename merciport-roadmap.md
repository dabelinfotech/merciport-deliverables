# Merciport Platform — Project Roadmap & Phase Breakdown

**Version:** 1.0 | **Prepared:** September 2026 | **Status:** For review & sign-off

---

## 1. Roadmap at a Glance

| # | Phase | Duration (est.) | Key Deliverables | Exit / Handover Point |
|---|-------|-----------------|------------------|----------------------|
| 0 | Discovery & Requirements | 3–4 weeks | SRS, scope baseline, RACI | SRS sign-off (Milestone M1) |
| 1 | UX/UI Design | 4–5 weeks | Wireframes, clickable prototype, design system | Prototype approval & design system sign-off (M2) |
| 2 | Architecture & Backend Foundation | 3–4 weeks (overlaps Phase 1 tail) | Backend API (v1), API documentation, environments | API contract freeze (M3) |
| 3 | Customer Mobile App | 8–10 weeks | iOS & Android apps, store submissions | Store approval + beta acceptance (M4) |
| 4 | Supplier Portal / App | 7–8 weeks | Supplier web portal + companion app | Supplier UAT entry (M5) |
| 5 | Admin Web Dashboard | 6–8 weeks | Admin dashboard, user/role management | Admin UAT entry (M6) |
| 6 | Environmental & Analytics Modules | 5–6 weeks | Impact dashboard, Carbon & Clean Energy Analytics Centre | Analytics acceptance (M7) |
| 7 | Partner & Investor Reporting | 4 weeks | Reporting module, exportable report templates | Template & export sign-off (M8) |
| 8 | QA & UAT | 6–7 weeks (parallel from Phase 3 onward; formal UAT window here) | Test plans, test cases, QA reports, UAT sign-off | UAT sign-off (M9) |
| 9 | Production Deployment & Launch | 2–3 weeks | Configured hosting, production deployment | Production go-live (M10) |
| 10 | Training, Documentation & Handover | 3 weeks | User manuals, admin training, source code & handover package | Final acceptance & handover (M11) |

**Indicative total elapsed timeline: 24–30 weeks** with overlapping workstreams (design/backend/mobile/portal run in parallel after Phase 2).

---

## 2. Phase Detail

### Phase 0 — Discovery & Requirements
**Milestone M1: SRS Sign-off**

Scope covered:
- Stakeholder interviews across customer, supplier, and admin personas
- Functional and non-functional requirements for all four product surfaces (mobile app, supplier portal, admin dashboard, API)
- Data model and integration inventory
- Regulatory/compliance requirements (esp. for carbon analytics reporting)
- Scope baseline and change-control process

**Acceptance criteria:**
- [ ] SRS document reviewed and approved by all named stakeholders
- [ ] Every deliverable in the master list is traceable to a requirement ID
- [ ] Non-functional requirements quantified (performance targets, uptime, scalability, security baseline)
- [ ] Sign-off recorded in UAT/sign-off log

**Dependencies:** none (predecessor to everything)
**Handover point:** SRS becomes the contract for design and build; changes routed through change control.

---

### Phase 1 — UX/UI Design
**Milestone M2: Prototype & Design System Sign-off**

Scope covered:
- User flows for customer journeys, supplier workflows, and admin operations
- Low-fidelity wireframes → clickable prototype (customer app + supplier portal + admin)
- Final design system: tokens, typography, color, components, accessibility (WCAG 2.1 AA target)

**Acceptance criteria:**
- [ ] Clickable prototype validated with representative users from each persona
- [ ] Design system covers all screens in scope; no orphan screens at build time
- [ ] Accessibility review passed on key flows
- [ ] Sign-off recorded

**Dependencies:** SRS sign-off (M1)
**Handover point:** Design tokens and component specs handed to engineering; prototype becomes the acceptance reference for UI build.

---

### Phase 2 — Architecture & Backend Foundation
**Milestone M3: API Contract Freeze**

Scope covered:
- Backend API v1 (auth, users/roles, core customer/supplier/admin entities)
- API documentation (OpenAPI spec + developer portal docs)
- Environments: dev → staging → production pipeline
- Database schema, migrations, seed strategy
- Security model (authn/authz, roles & permissions, audit logging)

**Acceptance criteria:**
- [ ] API documentation complete for v1 endpoints; contract versioned
- [ ] Staging environment live with CI/CD
- [ ] Security review of auth and data model passed
- [ ] All three client teams (mobile, supplier, admin) consuming the same contract

**Dependencies:** M1 (hard), M2 (soft — UI informs endpoint shape)
**Handover point:** API contract freeze; later changes require version bump and client-team agreement.

---

### Phase 3 — Customer Mobile App
**Milestone M4: Store Submission & Beta Acceptance**

Scope covered:
- iOS and Android apps (single codebase or native per the SRS decision)
- Customer journeys: onboarding, core transactions, notifications, account management
- Store assets and compliance for Apple App Store and Google Play under Merciport's developer accounts

**Acceptance criteria:**
- [ ] Feature-complete against the SRS traceability matrix
- [ ] QA test report green on both platforms (crash-free rate and performance targets met)
- [ ] Apps accepted in review on both stores (or submission confirmed with review in progress)
- [ ] Beta cohort feedback triaged; blockers resolved

**Dependencies:** M3 (API contract), M2 (design)
**Handover point:** Store listings, signing keys/certificates, and release process documented for Merciport ownership.

> ⚠️ **External risk:** App Store / Play Store review timelines (1–7 days per submission, rejections possible). Submit no later than week 2 of this phase's final sprint; keep buffer in the plan.

---

### Phase 4 — Supplier Portal / App
**Milestone M5: Supplier UAT Entry**

Scope covered:
- Web portal plus companion app for supplier workflows
- Supplier onboarding, catalog/service management, order/booking handling, reporting views

**Acceptance criteria:**
- [ ] Supplier workflows complete against SRS
- [ ] QA test report green on portal and app
- [ ] Supplier pilot group onboarded and UAT scripts issued

**Dependencies:** M3, M2
**Handover point:** Supplier onboarding guide drafted; portal admin controls verified by Merciport ops.

---

### Phase 5 — Admin Web Dashboard
**Milestone M6: Admin UAT Entry**

Scope covered:
- Admin dashboard: user/role management, content and configuration, moderation and support tooling, operational monitoring

**Acceptance criteria:**
- [ ] Role-based access verified per the permissions matrix in the SRS
- [ ] Audit logging functional for all admin actions
- [ ] QA test report green; UAT scripts issued

**Dependencies:** M3, M2
**Handover point:** Admin procedures documented; becomes input to the administrator training session (Phase 10).

---

### Phase 6 — Environmental Impact & Carbon Analytics
**Milestone M7: Analytics Acceptance**

Scope covered:
- Environmental Impact Dashboard (customer-facing impact visibility)
- Carbon & Clean Energy Analytics Centre (calculation engine, methodology documentation, data ingestion)

**Acceptance criteria:**
- [ ] Carbon calculation methodology documented and validated against the agreed standard
- [ ] Data pipelines verified for accuracy with test datasets
- [ ] Dashboards render correctly across mobile, portal, and admin surfaces

**Dependencies:** M3, plus data sources confirmed in Phase 0
**Handover point:** Methodology and calculation documentation delivered — required for investor credibility and any third-party assurance.

> ⚠️ **Critical path note:** the carbon methodology needs domain sign-off early. If the methodology isn't locked by end of Phase 2, this phase slips and takes Phase 7 with it.

---

### Phase 7 — Partner & Investor Reporting
**Milestone M8: Reporting Sign-off**

Scope covered:
- Reporting module with exportable report templates (PDF/CSV/XLSX)
- Scheduled/automated report generation where specified

**Acceptance criteria:**
- [ ] Every report template approved by Merciport finance/partnership stakeholders
- [ ] Export formats validated (opens correctly in target tools)
- [ ] Figures reconcile with the Analytics Centre source data

**Dependencies:** M7 (reporting draws on analytics data)
**Handover point:** Template library handed over; Merciport can modify templates or new templates are handled under change control.

---

### Phase 8 — QA & UAT (formal window)
**Milestone M9: UAT Sign-off**

Scope covered:
- Test plans and test cases maintained continuously from Phase 3 onward
- Formal UAT cycles with customer, supplier, and admin representatives
- Defect triage, regression, performance and security testing

**Acceptance criteria:**
- [ ] Test plan and full test case suite executed; QA test reports published
- [ ] No open critical/high defects at UAT close
- [ ] UAT sign-off document executed by Merciport for each surface (customer app, supplier portal, admin, API)

**Dependencies:** All build phases (M4–M8)
**Handover point:** UAT sign-off is the formal gate to production deployment.

---

### Phase 9 — Production Deployment & Launch
**Milestone M10: Go-Live**

Scope covered:
- Production hosting environment configured and hardened
- Deployment runbook, rollback plan, backup and monitoring setup
- Go-live checklist and cutover

**Acceptance criteria:**
- [ ] Production environment passes security scan and load test
- [ ] Monitoring, alerting, and backups verified
- [ ] Store apps pointing at production API
- [ ] Go-live checklist signed

**Dependencies:** M9
**Handover point:** Credentials, infrastructure access, and runbooks transferred to Merciport.

---

### Phase 10 — Training, Documentation & Handover
**Milestone M11: Final Acceptance & Handover**

Scope covered:
- User manuals for customer, supplier, and admin
- Administrator training session (live, recorded)
- Full source code repository access and handover package (per Section 10 of the Commercial Paper — IP/ownership terms)

**Acceptance criteria:**
- [ ] Manuals reviewed and approved for all three user types
- [ ] Training delivered and attendance/feedback recorded
- [ ] Repository access transferred and verified (Merciport admin rights confirmed)
- [ ] Handover package complete: source code, API docs, infrastructure docs, credentials transfer, methodology docs, report templates
- [ ] Final acceptance certificate executed

**Dependencies:** M10
**Handover point:** End of engagement — project closes; support/warranty period (per contract) begins.

---

## 3. Critical Path & Dependencies Map

```
M1 SRS ──► M2 Design ──► M3 API Freeze ──┬─► M4 Mobile App ──────┐
                                          ├─► M5 Supplier Portal ─┤
                                          ├─► M6 Admin Dashboard ─┤
                                          └─► M7 Analytics ─► M8 Reporting
                                                                    │
              M4 + M5 + M6 + M7 + M8 ──► M9 UAT Sign-off ──► M10 Go-Live ──► M11 Handover
```

**Critical path:** SRS → Design → API freeze → Analytics methodology → Reporting → UAT → Go-live.

**Top schedule risks:**
1. **App store reviews** — external dependency; buffer 1–2 weeks.
2. **Carbon methodology sign-off** — needs domain expertise early; unblock in Phase 0–2.
3. **UAT availability of Merciport stakeholders** — lock UAT windows into calendars at Phase 0.
4. **Scope creep on analytics/reporting** — change control enforced from M1.

---

## 4. Handover Points Summary

| Point | What transfers | Gate |
|-------|----------------|------|
| End of Phase 0 | SRS, scope baseline | M1 sign-off |
| End of Phase 1 | Design system, prototype, tokens | M2 sign-off |
| End of Phase 2 | API contract, docs, environments | M3 freeze |
| End of Phase 3 | Store listings, signing keys, release process | M4 |
| End of Phase 5–6 | Supplier/admin operational docs | M5, M6 |
| End of Phase 6 | Carbon methodology & calculation docs | M7 |
| End of Phase 7 | Report template library | M8 |
| End of Phase 8 | Test artifacts + executed UAT sign-off | M9 |
| End of Phase 9 | Infrastructure access, runbooks, credentials | M10 |
| End of Phase 10 | Source repo, handover package, training | M11 final acceptance |

---

## 5. Governance

- **Weekly:** workstream status against milestones; risk log review
- **Bi-weekly:** steering checkpoint (scope, timeline, budget)
- **Per milestone:** formal acceptance against the criteria above, recorded in the sign-off log
- **Change control:** any requirement change post-M1 is logged, impact-assessed, and approved before build

---

*Next step: validate the estimated durations against Merciport's team availability and target launch date, then lock the calendar dates per milestone.*
## Project Structure\n- `docs/`: SRS, API Specs, Manuals\n- `src/`: Source code for Backend, Mobile, Portal, and Admin\n- `tests/`: QA and UAT reports
