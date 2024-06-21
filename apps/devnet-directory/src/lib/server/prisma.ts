// Exports types and things
import { PrismaClient, Prisma } from "prisma-shared";

const {
    DATABASE_URL
} = process.env;


const prisma = new PrismaClient({
    datasources: {
        db: {
            url: DATABASE_URL
        }
    }
});

export { prisma, Prisma };
