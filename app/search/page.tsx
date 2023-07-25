import {Metadata} from "next";
import {PRICE, PrismaClient} from "@prisma/client";
import Header from "./components/Header";
import SearchSideBar from "./components/SearchSideBar";
import RestaurantCard from "./components/RestaurantCard";
import {SearchParams} from "@/app/search/types";

type Props = {
    searchParams: SearchParams;
};

const prisma = new PrismaClient();

export const metadata: Metadata = {
    title: 'Search | Reservation App'
};

const fetchRestaurantsByLocation = (location?: string) => {
    const select = {
        id: true,
        name: true,
        main_image: true,
        slug: true,
        price: true,
        cuisine: true,
        location: true,
    };

    if (!location) return prisma.restaurant.findMany({ select });

    return prisma.restaurant.findMany({
        where: {
            location: {
                name: {
                    equals: location.toLowerCase(),
                },
            },
        },
        select,
    });
};

const fetchLocations = () => prisma.location.findMany();

const fetchCuisines = () => prisma.cuisine.findMany();

export default async function Search({ searchParams }: Props) {
    const [restaurants, locations, cuisines] = await Promise.all([
        fetchRestaurantsByLocation(searchParams.location),
        fetchLocations(),
        fetchCuisines(),
    ]);

    return (
        <>
            <Header/>
            <div className="flex py-4 m-auto w-2/3 justify-between items-start">
                <SearchSideBar locations={locations} cuisines={cuisines} searchParams={searchParams} />
                <div className="w-5/6">
                    {restaurants.length
                        ? restaurants.map(restaurant => (
                            <RestaurantCard key={restaurant.id} restaurant={restaurant}/>
                        ))
                        : <div>No result found</div>
                    }
                </div>
            </div>
        </>
    )
};
