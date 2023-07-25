import { PrismaClient, Restaurant } from "@prisma/client";
import AppHeader from "./components/AppHeader";
import RestaurantCard from "./components/RestaurantCard";

const prisma = new PrismaClient();

const fetchRestaurants = () => prisma.restaurant.findMany({
    select: {
        id: true,
        name: true,
        main_image: true,
        cuisine: true,
        location: true,
        price: true,
        slug: true,
    },
});

export default async function Home() {
    const restaurants = await fetchRestaurants();

    return (
        <>
            <AppHeader/>
            <div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
                {restaurants.map(restaurant => (
                    <RestaurantCard restaurant={restaurant} key={restaurant.id}/>
                ))}
            </div>
        </>
    )
}
