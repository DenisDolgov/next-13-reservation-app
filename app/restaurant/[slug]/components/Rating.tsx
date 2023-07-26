import {Review} from "@prisma/client";
import {calcReviewRatingAverage} from "@/utils/calcReviewRatingAverage";

type Props = {
    reviews: Review[];
};

export default function Rating({ reviews }: Props) {
    const averageRating = calcReviewRatingAverage(reviews);

    return (
        <div className="flex items-end">
            <div className="ratings mt-2 flex items-center">
                <p>*****</p>
                <p className="text-reg ml-3">{averageRating}</p>
            </div>
            <div>
                <p className="text-reg ml-4">{reviews.length} Review{reviews.length === 1 ? '' : 's'}</p>
            </div>
        </div>
    );
}
