import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import RestaurantNavBar from "./components/RestaurantNavBar";
import Rating from "./components/Rating";
import Images from "./components/Images";
import Reviews from "./components/Reviews";
import ReservationCard from "./components/ReservationCard";

export const metadata = {
    title: 'Milesstone Grill | Reservation App'
}

const prisma = new PrismaClient();

const fetchRestaurantsBySlug = async (slug: string) => {
    const restaurant = await prisma.restaurant.findUnique({
        where: { slug },
        select: {
            id: true,
            slug: true,
            name: true,
            description: true,
            images: true,
            reviews: true,
        }
    });

    if (!restaurant) {
        notFound();
    }

    return restaurant;
};

type Props = {
    params: {
        slug: string;
    }
};

export default async function RestaurantDetails({ params: { slug } }: Props) {
    const restaurant = await fetchRestaurantsBySlug(slug);

    return (
        <>
            <div className="bg-white w-[70%] rounded p-3 shadow">
                <RestaurantNavBar slug={restaurant.slug} />
                <div className="mt-4 border-b pb-6">
                    <h1 className="font-bold text-6xl">{restaurant.name}</h1>
                </div>
                <Rating reviews={restaurant.reviews} />
                <div className="mt-4">
                    <p className="text-lg font-light">{restaurant.description}</p>
                </div>
                <Images images={restaurant.images} />
                <Reviews reviews={restaurant.reviews} />
            </div>
            <div className="w-[27%] relative text-reg">
                <ReservationCard />
            </div>
        </>
    )
}
