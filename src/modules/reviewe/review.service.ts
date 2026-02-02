import { prisma } from "../../lib/prisma";

export const reviewService = {
  async canReview(userId: string, medicineId: string) {
    const ordered = await prisma.orderItem.findFirst({
      where: {
        medicineId,
        order: {
          userId,
          status: "DELIVERED",
        },
      },
    });

    if (!ordered) return false;

    const reviewed = await prisma.review.findUnique({
      where: {
        userId_medicineId: { userId, medicineId },
      },
    });

    return !reviewed;
  },

  async createReview(userId: string, payload: any) {
    const { medicineId, rating, comment } = payload;

    const canReview = await this.canReview(userId, medicineId);
    if (!canReview) {
      throw new Error("You cannot review this medicine");
    }

    return prisma.review.create({
      data: {
        userId,
        medicineId,
        rating,
        comment,
      },
    });
  },

  async getReviewsByMedicine(medicineId: string) {
    return prisma.review.findMany()
  
  },
};
