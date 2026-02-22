# Community Waste Management & Sustainability Platform

## Technical Specification

Generated: 22 February 2026

------------------------------------------------------------------------

## 1. Platform Targets

-   **Node.js:** 22 and above
-   **Next.js:** 16.1 and above
-   **React:** 19 and above
-   **TypeScript:** 5.9+
-   **tRPC:** 11.x
-   **React Query:** 5.x
-   **Prisma:** Latest stable
-   **Database:** PostgreSQL

------------------------------------------------------------------------

## 2. Naming Conventions (Authoritative)

  Layer                    Convention
  ------------------------ -----------------------
  URI Paths                lowercase, kebab-case
  Querystring Parameters   camelCase
  JSON Bodies              PascalCase
  TypeScript Interfaces    PascalCase
  Prisma Fields            camelCase

------------------------------------------------------------------------

## 3. Core Domain Entities

### User

-   UserId
-   Email
-   Role
-   HouseholdId
-   EngagementScore

### Household

-   HouseholdId
-   AddressLine1
-   Suburb
-   Postcode
-   Zone

### ServiceRequest

-   ServiceRequestId
-   RequestType
-   Status
-   Description
-   PhotoUrls
-   ScheduledFor

### Job

-   JobId
-   Status
-   ScheduledFor
-   CompletedAt

### Challenge

-   ChallengeId
-   Title
-   Description
-   StartDate
-   EndDate
-   Points

------------------------------------------------------------------------

## 4. API Design Rules

-   All request/response bodies use PascalCase.
-   All URIs are lowercase.
-   All query parameters use camelCase.
-   Enums use PascalCase.

Example:

    POST /api/service-requests

``` json
{
  "RequestType": "Overflow",
  "Description": "Bin Is Full"
}
```

------------------------------------------------------------------------

## 5. State Machines

### ServiceRequest Lifecycle

Submitted → Triaged → Scheduled → Assigned → Completed → Closed

### Challenge Lifecycle

Upcoming → Active → Ended → Archived

------------------------------------------------------------------------

## 6. Non-Functional Requirements

-   99% uptime target
-   WCAG AA compliance
-   Mobile-first
-   \< 2s dashboard load
-   Must pass lint, typecheck and tests

------------------------------------------------------------------------

End of Technical Specification
