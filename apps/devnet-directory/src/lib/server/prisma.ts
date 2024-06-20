// Exports types and things
import { PrismaClient, Prisma } from "prisma-shared";
import { DATABASE_URL } from "$env/static/private";

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: DATABASE_URL
        }
    }
});

export { prisma, Prisma };
