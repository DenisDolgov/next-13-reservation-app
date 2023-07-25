import {Metadata} from "next";
import {PrismaClient} from "@prisma/client";
import RestaurantNavBar from "../components/RestaurantNavBar";
import Menu from "./components/Menu";

type Props = {
    params: {
        slug: string;
    },
};

const prisma = new PrismaClient();

const fetchRestaurantMenu = async (slug: string) => {
    const restaurant = await prisma.restaurant.findUnique({
        where: { slug },
        select: {
            items: true,
        },
    });

    if (!restaurant) {
        throw new Error();
    }

    return restaurant.items;
};

export const metadata: Metadata = {
    title: `Milesstone Grill's menu | Reservation App`
};

export default async function RestaurantMenu({ params: { slug} }: Props) {
    const menu = await fetchRestaurantMenu(slug);

    return (
        <div className="bg-white w-[100%] rounded p-3 shadow">
            <RestaurantNavBar slug={slug} />
            <Menu menu={menu} />
        </div>
    )
}
