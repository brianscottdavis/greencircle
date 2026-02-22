import { hash } from "bcrypt";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

const REQUEST_TYPES = ["BulkyPickup", "Overflow", "MissedService"] as const;
const REQUEST_STATUSES = ["Submitted", "Triaged", "Scheduled", "Assigned", "Completed", "Closed"] as const;
const REPORT_TYPES = ["Contamination", "MissedPickup", "Overflow"] as const;
const JOB_STATUSES = ["Requested", "Scheduled", "Assigned", "InProgress", "Completed"] as const;

async function main() {
  const hashedPassword = await hash("demo123", 10);

  const actors = [
    { email: "demo@greencircle.example", name: "Demo Resident", role: "resident" },
    { email: "crew@greencircle.example", name: "Demo Crew Member", role: "crew" },
    { email: "ambassador@greencircle.example", name: "Demo Ambassador", role: "ambassador" },
    { email: "admin@greencircle.example", name: "Demo Admin", role: "admin" },
  ] as const;

  for (const { email, name, role } of actors) {
    await db.user.upsert({
      where: { email },
      create: { email, name, password: hashedPassword, role },
      update: { password: hashedPassword, role },
    });
  }

  const demoUser = await db.user.findUniqueOrThrow({
    where: { email: "demo@greencircle.example" },
  });

  const crewUser = await db.user.findUniqueOrThrow({
    where: { email: "crew@greencircle.example" },
  });

  // Additional resident users for busier simulation
  const extraResidents = [
    { email: "alice@greencircle.example", name: "Alice Jones" },
    { email: "bob@greencircle.example", name: "Bob Smith" },
    { email: "carol@greencircle.example", name: "Carol Lee" },
    { email: "dave@greencircle.example", name: "Dave Chen" },
    { email: "eve@greencircle.example", name: "Eve Wong" },
    { email: "frank@greencircle.example", name: "Frank Brown" },
    { email: "grace@greencircle.example", name: "Grace Taylor" },
    { email: "henry@greencircle.example", name: "Henry Wilson" },
    { email: "ivy@greencircle.example", name: "Ivy Martinez" },
    { email: "jack@greencircle.example", name: "Jack Davis" },
  ];

  const residentUsers: { id: string }[] = [demoUser];
  for (const { email, name } of extraResidents) {
    const user = await db.user.upsert({
      where: { email },
      create: { email, name, password: hashedPassword, role: "resident" },
      update: { password: hashedPassword },
    });
    residentUsers.push(user);
  }

  // Households
  const householdData = [
    { id: "seed-household-1", addressLine1: "123 Demo Street", suburb: "Greentown", postcode: "1234" },
    { id: "seed-household-2", addressLine1: "45 Oak Avenue", suburb: "Greentown", postcode: "1235" },
    { id: "seed-household-3", addressLine1: "78 Pine Road", suburb: "Greenvale", postcode: "1236" },
    { id: "seed-household-4", addressLine1: "12 Elm Drive", suburb: "Greenvale", postcode: "1236" },
    { id: "seed-household-5", addressLine1: "200 Cedar Lane", suburb: "Greenside", postcode: "1237" },
    { id: "seed-household-6", addressLine1: "55 Birch Street", suburb: "Greenside", postcode: "1237" },
    { id: "seed-household-7", addressLine1: "88 Maple Place", suburb: "Greentown", postcode: "1234" },
    { id: "seed-household-8", addressLine1: "91 Willow Way", suburb: "Greenvale", postcode: "1236" },
  ];

  const households: { id: string }[] = [];
  for (const h of householdData) {
    const household = await db.household.upsert({
      where: { id: h.id },
      create: h,
      update: {},
    });
    households.push(household);
  }

  // Assign residents to households (spread across households)
  for (let i = 0; i < residentUsers.length; i++) {
    const resident = residentUsers[i];
    const household = households[i % households.length];
    if (!resident || !household) continue;
    await db.householdMember.upsert({
      where: {
        userId_householdId: {
          userId: resident.id,
          householdId: household.id,
        },
      },
      create: {
        userId: resident.id,
        householdId: household.id,
        isPrimary: i === 0,
      },
      update: {},
    });
  }

  const challenge = await db.challenge.upsert({
    where: { id: "seed-challenge-1" },
    create: {
      id: "seed-challenge-1",
      title: "Plastic-Free Week",
      description: "Avoid single-use plastics for 7 days. Log daily to earn points.",
      status: "Active",
      startDate: new Date(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      points: 50,
    },
    update: { status: "Active" },
  });

  await db.challengeParticipation.upsert({
    where: {
      challengeId_userId: {
        challengeId: challenge.id,
        userId: demoUser.id,
      },
    },
    create: {
      challengeId: challenge.id,
      userId: demoUser.id,
      progress: 3,
    },
    update: {},
  });

  // --- Busy seed: service requests, reports, jobs ---
  const requestCount = await db.serviceRequest.count();

  if (requestCount < 20) {
    const descriptions = {
      BulkyPickup: [
        "Old mattress and couch",
        "Garden waste and timber",
        "Broken furniture",
        "E-waste and appliances",
        "Renovation rubble",
        "Scrap metal",
        "Christmas tree",
        "Moving boxes",
      ],
      Overflow: [
        "Bin lid won't close",
        "Extra waste from party",
        "Missed last collection",
        "Bin overflowing",
      ],
      MissedService: [
        "General bin not collected",
        "Recycling missed",
        "Green waste skipped",
        "All bins missed",
      ],
    };

    let requestIndex = 0;
    const serviceRequestsCreated: { id: string; householdId: string }[] = [];

    for (let r = 0; r < 45; r++) {
      const reqType = REQUEST_TYPES[r % REQUEST_TYPES.length]!;
      const status = REQUEST_STATUSES[Math.floor(r / 8) % REQUEST_STATUSES.length]!;
      const household = households[r % households.length];
      const resident = residentUsers[r % residentUsers.length];
      if (!household || !resident) continue;

      const descList = descriptions[reqType];
      const desc = descList[requestIndex % descList.length] ?? "";
      requestIndex++;

      const sr = await db.serviceRequest.create({
        data: {
          householdId: household.id,
          createdById: resident.id,
          requestType: reqType,
          description: `Seed ${reqType} #${r + 1}: ${desc}`,
          status,
          photoUrls: [],
        },
      });
      serviceRequestsCreated.push({ id: sr.id, householdId: household.id });
    }

    // Jobs for a subset of service requests
    for (let j = 0; j < serviceRequestsCreated.length; j++) {
      const sr = serviceRequestsCreated[j];
      if ((j % 2 === 0 || j % 3 === 0) && sr) {
        const jobStatus = JOB_STATUSES[j % JOB_STATUSES.length]!;
        await db.job.create({
          data: {
            serviceRequestId: sr.id,
            status: jobStatus,
            scheduledFor: new Date(Date.now() + (j + 1) * 24 * 60 * 60 * 1000),
            completedAt: jobStatus === "Completed" ? new Date() : null,
          },
        });
      }
    }
  }

  // Reports (don't need household)
  const reportDescriptions: Record<(typeof REPORT_TYPES)[number], string[]> = {
    Contamination: ["Plastic in recycling", "Food in general waste", "Wrong bin", "Non-recyclable items"],
    MissedPickup: ["Bin not emptied", "Truck skipped", "Road blocked"],
    Overflow: ["Bin overflow", "Extra waste", "Lid open"],
  };

  const reportCount = await db.report.count();

  if (reportCount < 20) {
    for (let r = 0; r < 35; r++) {
      const reportType = REPORT_TYPES[r % REPORT_TYPES.length]!;
      const resident = residentUsers[r % residentUsers.length];
      if (!resident) continue;
      const descList = reportDescriptions[reportType];
      const desc = descList[r % descList.length] ?? "";
      await db.report.create({
        data: {
          createdById: resident.id,
          reportType,
          description: `Seed ${reportType} #${r + 1}: ${desc}`,
          photoUrls: [],
          status: r % 5 === 0 ? "Resolved" : "Submitted",
        },
      });
    }
  }

  // Original single service request + job (keep for demo user)
  const household1 = households[0];
  if (household1) {
  const existingRequest = await db.serviceRequest.findFirst({
    where: {
      householdId: household1.id,
      requestType: "BulkyPickup",
      description: "Old mattress and couch",
    },
  });
  if (!existingRequest) {
    const serviceRequest = await db.serviceRequest.create({
      data: {
        householdId: household1.id,
        createdById: demoUser.id,
        requestType: "BulkyPickup",
        description: "Old mattress and couch",
        status: "Submitted",
        photoUrls: [],
      },
    });
    await db.job.create({
      data: {
        serviceRequestId: serviceRequest.id,
        status: "Scheduled",
        scheduledFor: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
    });
  }
  }

  const existingNotice = await db.noticeboardPost.findFirst({
    where: { title: "Welcome to GreenCircle" },
  });
  if (!existingNotice) {
    await db.noticeboardPost.create({
      data: {
        title: "Welcome to GreenCircle",
        body: "This is your community noticeboard. Check here for local waste tips and announcements.",
      },
    });
  }

  console.log("Seed complete. Demo actors (all password: demo123):");
  actors.forEach((a) => console.log(`  ${a.email} (${a.role})`));
  console.log("\nExtra residents (password: demo123):");
  extraResidents.forEach((a) => console.log(`  ${a.email}`));
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
