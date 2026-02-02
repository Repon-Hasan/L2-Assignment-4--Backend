import { Request, Response } from "express";
import { reviewService } from "./review.service";
import { string } from "better-auth";

export const reviewController = {
  async create(req: Request, res: Response) {
    try {
      const userId = req.user.id;
      
      const review = await reviewService.createReview(userId, req.body);
           // console.log("review", req.body)
      res.status(201).json({
        message: "Review submitted",
        data: review,
      });
    } catch (error: any) {
      res.status(403).json({ message: error.message });
    }
  },

  async canReview(req: Request, res: Response) {
    const userId = req.user.id;
    const { medicineId } = req.params;

    const canReview = await reviewService.canReview(userId, medicineId);
    res.json({ canReview });
  },

  async getByMedicine(req: Request, res: Response) {
    const { medicineId } = req.params;
    const reviews = await reviewService.getReviewsByMedicine(medicineId);

    res.json(reviews);
  },
};
