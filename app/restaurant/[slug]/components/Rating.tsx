import {Review} from "@prisma/client";
import {calcReviewRatingAverage} from "@/utils/calcReviewRatingAverage";
import Rate from "@/app/components/Rate";

type Props = {
    reviews: Review[];
};

export default function Rating({ reviews }: Props) {
    const avgRating = calcReviewRatingAverage(reviews);

    return (
        <div className="flex items-end">
            <div className="ratings mt-2 flex items-center">
                <Rate rating={avgRating} />
                <p className="text-reg ml-3">{avgRating}</p>
            </div>
            <div>
                <p className="text-reg ml-4">{reviews.length} Review{reviews.length === 1 ? '' : 's'}</p>
            </div>
        </div>
    );
}
