import { hash } from "bcrypt";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

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

  const household = await db.household.upsert({
    where: { id: "seed-household-1" },
    create: {
      id: "seed-household-1",
      addressLine1: "123 Demo Street",
      suburb: "Greentown",
      postcode: "1234",
    },
    update: {},
  });

  await db.householdMember.upsert({
    where: {
      userId_householdId: {
        userId: demoUser.id,
        householdId: household.id,
      },
    },
    create: {
      userId: demoUser.id,
      householdId: household.id,
      isPrimary: true,
    },
    update: {},
  });

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

  const existingRequest = await db.serviceRequest.findFirst({
    where: {
      householdId: household.id,
      requestType: "BulkyPickup",
      description: "Old mattress and couch",
    },
  });
  if (!existingRequest) {
    const serviceRequest = await db.serviceRequest.create({
      data: {
        householdId: household.id,
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
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
