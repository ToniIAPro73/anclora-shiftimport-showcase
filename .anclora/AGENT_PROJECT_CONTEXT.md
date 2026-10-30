# Anclora Shiftimport Showcase — Agent Project Context

AGENT_PROJECT_CONTEXT_VERSION=3.0
STATUS=ACTIVE
AUTHORITY=anclora-governance

## 1. Project Identity

APPLICATION_NAME=Anclora Shiftimport Showcase
REPOSITORY=anclora-shiftimport-showcase
PROJECT_ROLE=Static showcase repository for ShiftImport
PRODUCT_FAMILY=Anclora Group

## 2. Bootstrap (minimal router)

```text
AUTHORITY=anclora-governance
AGENT_PROJECT_CONTEXT_ROLE=MINIMAL_ROUTER
```

Authority, QA, token economy, Git, promotion and the verification matrix are defined by Governance
([`AOS_ADOPTION_STANDARD`](../../anclora-governance/standards/AOS_ADOPTION_STANDARD.md),
[`AGENT_EXECUTION_POLICY`](../../anclora-governance/standards/AGENT_EXECUTION_POLICY.md),
[`AGENT_OPERATING_STANDARD`](../../anclora-governance/standards/AGENT_OPERATING_STANDARD.md)) and are not
duplicated here. Entry point: [`../AGENTS.md`](../AGENTS.md). Repository facts: [`PRODUCTION_RUNTIME.md`](PRODUCTION_RUNTIME.md).
Adoption and exceptions: [`AOS_ADOPTION.md`](AOS_ADOPTION.md). Load each only when the task needs it.

## 4. Core Project Contracts

- **PRODUCTION_RUNTIME**: [`.anclora/PRODUCTION_RUNTIME.md`](PRODUCTION_RUNTIME.md)
  - Documents status `NO_PRODUCTION_RUNTIME` and confirms no production database/backend runtime is deployed.
- **AOS_ADOPTION**: [`.anclora/AOS_ADOPTION.md`](AOS_ADOPTION.md)
  - Documents AOS alignment, governance level, standards, and referenced authoritative knowledge.

## 4. Task Routing

| Task Domain | Primary Authority to Read First | Secondary / Operational Sources |
| :--- | :--- | :--- |
| **Runtime / Infra** | [`.anclora/PRODUCTION_RUNTIME.md`](PRODUCTION_RUNTIME.md) | `../package.json` |
| **AOS Governance** | [`.anclora/AOS_ADOPTION.md`](AOS_ADOPTION.md) | [`../../anclora-governance/`](../../anclora-governance/) |
| **Design / Branding** | [`../../anclora-design-system/`](../../anclora-design-system/) | [`../../anclora-vault/00-governance/contracts/`](../../anclora-vault/00-governance/contracts/) |
| **Git Workflow** | [`.anclora/PRODUCTION_RUNTIME.md`](PRODUCTION_RUNTIME.md) | `../AGENTS.md` |

## 5. Source Authority

- Operational Rules: `../AGENTS.md`
- Governance: [`../../anclora-governance/`](../../anclora-governance/)

<!-- ANCLORA-AOS:START -->
ANCLORA_AOS_AUTHORITY=anclora-governance
Canonical rules: [AOS Adoption Standard](../../anclora-governance/standards/AOS_ADOPTION_STANDARD.md). Repository-specific facts remain in this repository's `.anclora/` contracts.
<!-- ANCLORA-AOS:END -->
