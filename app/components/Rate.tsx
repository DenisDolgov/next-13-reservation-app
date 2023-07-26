import {Review} from "@prisma/client";
import {calcReviewRatingAverage} from "@/utils/calcReviewRatingAverage";
import fullStar from "@/public/icons/full-star.png";
import halfStar from "@/public/icons/half-star.png";
import emptyStar from "@/public/icons/empty-star.png";
import Image from "next/image";

type Props = {
    rating: number;
};

const getStars = (rating: number) => {
    const stars = [];

    for (let i = 0; i < 5; i++) {
        const diff = rating - i;

        if (diff >= 1) stars.push(fullStar);
        else if (diff < 1 && diff > 0.2) {
            if (diff < 0.7) stars.push(halfStar)
            else stars.push(fullStar)
        }
        else stars.push(emptyStar);
    }

    return stars;
}

export default function Rate({ rating }: Props) {
    const stars = getStars(rating);

    return (
        <div className="flex gap-1 items-center">
            {stars.map((star, index) => (
                <Image key={index} src={star} alt="" className="w-4 h-4" />
            ))}
        </div>
    );
};
