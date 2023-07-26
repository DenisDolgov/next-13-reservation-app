import {Cuisine, Location, Restaurant, Review} from "@prisma/client";
import Price from "@/app/components/Price";
import Link from "next/link";
import {calcReviewRatingAverage} from "@/utils/calcReviewRatingAverage";
import Rate from "@/app/components/Rate";

type Props = {
    restaurant: Pick<Restaurant, 'id'|'slug'|'main_image'|'name'|'price'> & {
        location: Location;
        cuisine: Cuisine;
        reviews: Review[];
    }
};

const getRatingText = (reviews: Review[]) => {
    const averageRating = calcReviewRatingAverage(reviews);

    if (averageRating === 0) return '';
    if (averageRating > 4) return 'Awesome';
    if (averageRating <= 4 && averageRating > 3) return 'Good';
    if (averageRating <= 3 && averageRating > 2) return 'Average';
    if (averageRating <= 2) return 'Bad';
}

export default function RestaurantCard({ restaurant }: Props) {
    const ratingText = getRatingText(restaurant.reviews);
    const avgRating = calcReviewRatingAverage(restaurant.reviews);

    return (
        <div className="border-b flex pb-5">
            <img
                src={restaurant.main_image}
                alt={restaurant.name}
                className="w-44 rounded"
            />
            <div className="pl-5">
                <h2 className="text-3xl">{restaurant.name}</h2>
                <div className="flex items-start">
                    <Rate rating={avgRating} />
                    {ratingText && <p className="ml-2 text-sm">{ratingText}</p>}
                </div>
                <div className="mb-9">
                    <div className="font-light flex text-reg">
                        <Price price={restaurant.price} className="mr-4" />
                        <p className="mr-4">{restaurant.cuisine.name}</p>
                        <p className="mr-4">{restaurant.location.name}</p>
                    </div>
                </div>
                <div className="text-red-600">
                    <Link href={`/restaurant/${restaurant.slug}`}>View more information</Link>
                </div>
            </div>
        </div>
    )
}
