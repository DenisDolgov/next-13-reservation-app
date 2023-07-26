import {Restaurant, Cuisine, Location, Review} from "@prisma/client";
import Link from "next/link";
import Price from "@/app/components/Price";
import Rate from "@/app/components/Rate";
import {calcReviewRatingAverage} from "@/utils/calcReviewRatingAverage";

type Props = {
    restaurant: Pick<Restaurant, 'id'|'name'|'main_image'|'price'|'slug'> & {
        cuisine: Cuisine;
        location: Location;
        reviews: Review[];
    }
};

export default function RestaurantCard({ restaurant }: Props) {
    const avgRating = calcReviewRatingAverage(restaurant.reviews);

    return (
        <div className="w-64 h-72 m-3 rounded overflow-hidden border cursor-pointer">
            <Link href={`/restaurant/${restaurant.slug}`}>
                <img
                    src={restaurant.main_image}
                    alt={restaurant.name}
                    className="w-full h-36"
                />
                <div className="p-1">
                    <h3 className="font-bold text-2xl mb-2">{restaurant.name}</h3>
                    <div className="flex items-start">
                        <Rate rating={avgRating} />
                        <p className="ml-2">{restaurant.reviews.length} review{restaurant.reviews.length > 1 ? 's' : ''}</p>
                    </div>
                    <div className="flex text-reg font-light capitalize">
                        <p className=" mr-3">{restaurant.cuisine.name}</p>
                        <Price price={restaurant.price} className="mr-3" />
                        <p>{restaurant.location.name}</p>
                    </div>
                    <p className="text-sm mt-1 font-bold">Booked 3 times today</p>
                </div>
            </Link>
        </div>
    )
}
