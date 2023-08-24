import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from "bcrypt";

async function clearDatabase() {
  await prisma.user.deleteMany();
  await prisma.account.deleteMany();
}

async function seedDatabase() {
  const hashedPassword = await bcrypt.hash("1234", 12);
  const users = [
    {
      email: "salah@gmail.com",
      hashedPassword,
    },
    {
      email: "ben@gmail.com",
      hashedPassword,
    },
    {
      email: "adam@gmail.com",
      hashedPassword,
    },
    {
      email: "emily@gmail.com",
      hashedPassword,
    },
  ];
  const reviews = {
    create: [
      {
        reviewScore: 5,
        title: "Breathtaking Views",
        description:
          "Our stay was absolutely fantastic. The views from the property were breathtaking and made our experience unforgettable!",
        userId: 1,
      },
      {
        reviewScore: 4,
        title: "Cozy Retreat",
        description:
          "The cozy ambiance of this place made our vacation truly relaxing. We thoroughly enjoyed our stay and would recommend it!",
        userId: 2,
      },
      {
        reviewScore: 2,
        title: "Disappointing",
        description:
          "We were disappointed with our stay. The property didn't meet our expectations, and the service was lacking.",
        userId: 3,
      },
    ],
  };
  const listings = [
    {
      title: "Mountain View Retreat",
      description: "Enjoy stunning mountain views from this peaceful retreat.",
      imagesSrc: ["/images/image1.jpeg", "/images/image2.jpeg"],
      category: "Scenic Views",
      roomCount: 3,
      bathroomCount: 2,
      guestCount: 6,
      locationValue: "GB",
      price: 150,
      userId: 2,
      reviews: reviews,
    },
    {
      title: "Urban Loft in the City",
      description:
        "Live in style in this modern urban loft in the heart of the city.",
      imagesSrc: ["/images/image3.jpeg", "/images/image4.jpeg"],
      category: "Apartment",
      roomCount: 1,
      bathroomCount: 1,
      guestCount: 2,
      locationValue: "DE",
      price: 80,
      userId: 3,
    },
    {
      title: "Rustic Farmhouse Getaway",
      description:
        "Experience the charm of country living in this rustic farmhouse.",
      imagesSrc: ["/images/image5.jpeg", "/images/image6.jpeg"],
      category: "Cottage",
      roomCount: 4,
      bathroomCount: 2,
      guestCount: 8,
      locationValue: "ID",
      price: 200,
      userId: 1,
      reviews: reviews,
    },
    {
      title: "Seaside Bungalow",
      description: "Relax by the ocean in this cozy seaside bungalow.",
      imagesSrc: ["/images/image7.jpeg", "/images/image8.jpeg"],
      category: "Beach",
      roomCount: 2,
      bathroomCount: 1,
      guestCount: 4,
      locationValue: "GR",
      price: 120,
      userId: 2,
    },
    {
      title: "Historic Townhouse",
      description:
        "Step back in time with a stay in this charming historic townhouse.",
      imagesSrc: ["/images/image9.jpeg", "/images/image10.jpeg"],
      category: "Historic",
      roomCount: 3,
      bathroomCount: 2,
      guestCount: 6,
      locationValue: "CH",
      price: 130,
      userId: 1,
    },
    {
      title: "Scenic Mountain Retreat",
      description:
        "Enjoy breathtaking mountain views from this serene retreat.",
      imagesSrc: ["/images/image11.jpeg", "/images/image12.avif"],
      category: "Scenic Views",
      roomCount: 2,
      bathroomCount: 1,
      guestCount: 4,
      locationValue: "FR",
      price: 120,
      userId: 3,
    },
    {
      title: "Downtown Apartment Oasis",
      description: "Experience urban living in the heart of the city.",
      imagesSrc: ["/images/image13.jpeg", "/images/image14.jpeg"],
      category: "Apartment",
      roomCount: 1,
      bathroomCount: 1,
      guestCount: 2,
      locationValue: "AS",
      price: 90,
      userId: 1,
      reviews: reviews,
    },
    {
      title: "Charming Countryside Cottage",
      description: "Escape to the countryside in this cozy cottage.",
      imagesSrc: ["/images/image15.jpeg", "/images/image16.jpeg"],
      category: "Cottage",
      roomCount: 2,
      bathroomCount: 1,
      guestCount: 3,
      locationValue: "FR",
      price: 130,
      userId: 2,
      reviews: reviews,
    },
    {
      title: "Beachfront Villa",
      description: "Relax by the sea in this luxurious beachfront villa.",
      imagesSrc: ["/images/image17.jpeg", "/images/image18.jpeg"],
      category: "Villa",
      roomCount: 4,
      bathroomCount: 3,
      guestCount: 8,
      locationValue: "GR",
      price: 250,
      userId: 1,
      reviews: reviews,
    },
    {
      title: "Quaint Historic Home",
      description: "Experience history in this charming historic home.",
      imagesSrc: ["/images/image19.jpeg", "/images/image20.jpeg"],
      category: "Historic",
      roomCount: 3,
      bathroomCount: 2,
      guestCount: 6,
      locationValue: "FR",
      price: 140,
      userId: 3,
      reviews: reviews,
    },
  ];

  for (const userDate of users) {
    await prisma.user.create({
      data: userDate,
    });
  }

  for (const listingData of listings) {
    await prisma.listing.create({
      data: listingData,
    });
  }
}

async function main() {
  try {
    await clearDatabase();
    await seedDatabase();
    console.log("Database cleared and seeded successfully.");
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
