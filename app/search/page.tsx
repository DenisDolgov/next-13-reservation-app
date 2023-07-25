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

const fetchRestaurantsByCity = (city?: string) => {
    const select = {
        id: true,
        name: true,
        main_image: true,
        slug: true,
        price: true,
        cuisine: true,
        location: true,
    };

    if (!city) return prisma.restaurant.findMany({ select });

    return prisma.restaurant.findMany({
        where: {
            location: {
                name: {
                    contains: city.toLowerCase(),
                },
            }
        },
        select,
    });
};

export default async function Search({ searchParams: { city } }: Props) {
    const restaurants = await fetchRestaurantsByCity(city);

    return (
        <>
            <Header/>
            <div className="flex py-4 m-auto w-2/3 justify-between items-start">
                <SearchSideBar/>
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
