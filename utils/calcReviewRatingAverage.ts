import {Review} from "@prisma/client";

export const calcReviewRatingAverage = (reviews: Review[]) => {
    if (!reviews.length) return 0;

    const sum = reviews.reduce((sum, item) => sum + item.rating, 0);

    return Number((sum / reviews.length).toFixed(1));
};
