# Anclora Shiftimport Showcase — Production Runtime Manifest

PRODUCTION_RUNTIME_MANIFEST_VERSION=2.0
RUNTIME_CONTRACT_AUTHORITY=CANONICAL
STATUS=NO_PRODUCTION_RUNTIME
REASON=Static showcase repository for ShiftImport.

## 1. Application Identity

APPLICATION_NAME=Anclora Shiftimport Showcase
REPOSITORY=anclora-shiftimport-showcase
APPLICATION_TYPE=governance_or_static_library
FRAMEWORK=Vite + React

## 2. Runtime Topology

FRONTEND_PROVIDER=NONE
BACKEND_PROVIDER=NONE
PRODUCTION_DOMAIN=NONE
PRODUCTION_DEPLOYMENT_PROVIDER=NONE

This repository does not deploy an independent production backend or production-backed application runtime.
It serves as governance, library, static documentation, or showcase.

## 3. Production Database Contract

DATABASE_PROVIDER=NONE
DATABASE_SCOPE=NONE
LOCAL_DATABASE_SCOPE=NONE

No production database is associated with this repository.

## 4. Database Migration Contract

MIGRATION_SYSTEM=NONE
MIGRATION_STRATEGY=NONE
MIGRATION_DIRECTORY=NONE
MIGRATION_RUNNER=NONE

## 5. Storage Contract

STORAGE_PROVIDER=NONE
STORAGE_SCOPE=NONE

## 6. Authentication Contract

AUTH_PROVIDER=NONE
AUTH_SCOPE=NONE

## 7. External Services & Integrations

EXTERNAL_SERVICES=NONE

## 8. Environment Files & Loading Order

ENV_FILES=NONE
No local environment secrets required for standard operation.

## 9. Local vs Production Model

LOCAL_RUNTIME_MODEL=STATIC_OR_OFFLINE
DO_NOT_CREATE_DEVELOPMENT_DATABASE=true

Runtime, environment, database, migration, QA and Git rules declared in this
manifest override generic agent defaults or home-directory agent policies.

## QA Contract

QA_POLICY=WORKSPACE_PROPORTIONAL
QA_MODE_DEFAULT=AUTO
TEST_EXECUTION_POLICY=BATCHED
FULL_GATES_AFTER_EVERY_EDIT=false
REPEAT_UNCHANGED_SUCCESSFUL_GATES=false
VISUAL_QA_EXECUTION=BY_QA_MODE
QA_MINIMUM_FOR_RELEASE_PROMOTION=FULL


QA_AUTH_MODEL=NOT_APPLICABLE
QA_IS_DEDICATED=false
QA_IS_REAL_USER=false
REAL_USER_AS_QA_ALLOWED=false
QA_SCOPE=none
QA_REUSE=false
QA_CREATE_IF_MISSING=false
QA_DELETE_AFTER_TEST=false
QA_CREATION_CONFIRMATION_REQUIRED=false
QA_PERSISTENT_IDENTITY=NONE

Public surface; dedicated authentication QA not applicable.

## 11. Git Branch & Operational Policy

DEFAULT_BRANCH=development
PROMOTION_POLICY=All work commits to development branch. Never push directly to main or production.
