import {Metadata} from "next";
import {PrismaClient} from "@prisma/client";
import Header from "./components/Header";
import SearchSideBar from "./components/SearchSideBar";
import RestaurantCard from "./components/RestaurantCard";

type Props = {
    searchParams: {
        city?: string;
    }
}

const prisma = new PrismaClient();

export const metadata: Metadata = {
    title: 'Search | Reservation App'
};

const fetchRestaurantsByCity = async (city = '') => {
    const restaurants = await prisma.restaurant.findMany({
        where: {
            location: {
                name: {
                    contains: city,
                },
            }
        }
    });

    return restaurants;
};

export default async function Search({ searchParams: { city } }: Props) {
    const restaurants = await fetchRestaurantsByCity(city);

    return (
        <>
            <Header/>
            <div className="flex py-4 m-auto w-2/3 justify-between items-start">
                <SearchSideBar/>
                <div className="w-5/6">
                    {restaurants.map(restaurant => (
                        <RestaurantCard key={restaurant.id} restaurant={restaurant}/>
                    ))}
                </div>
            </div>
        </>
    )
};
