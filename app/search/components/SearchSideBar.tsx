'use client';

import {Cuisine, Location, PRICE} from "@prisma/client";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {SearchParams} from "@/app/search/types";

type Props = {
    locations: Location[];
    cuisines: Cuisine[];
    searchParams: SearchParams;
};

const priceBtnCommonClass = 'border w-full text-reg font-light p-2 text-center';

const prices = [{
    price: PRICE.CHEAP,
    label: '$',
    className: `${priceBtnCommonClass} rounded-l`,
}, {
    price: PRICE.REGULAR,
    label: '$$',
    className: priceBtnCommonClass
}, {
    price: PRICE.EXPENSIVE,
    label: '$$$',
    className: `${priceBtnCommonClass} rounded-r`,
}]

export default function SearchSideBar({ locations, cuisines, searchParams }: Props) {
    const router = useRouter();
    const common = {
        pathname: '/search',
    };

    return (
        <div className="w-1/5">
            <div className="border-b pb-4 flex flex-col">
                <h1 className="mb-2">Region</h1>
                {locations.map(item => (
                    <Link
                        key={item.id}
                        className="font-light text-reg capitalize"
                        href={{ ...common, query: { ...searchParams, location: item.name } }}
                    >
                        {item.name}
                    </Link>
                ))}
            </div>
            <div className="border-b pb-4 mt-3 flex flex-col">
                <h1 className="mb-2">Cuisine</h1>
                {cuisines.map(item => (
                    <Link
                        className="font-light text-reg capitalize"
                        key={item.id}
                        href={{ ...common, query: { ...searchParams, cuisine: item.name } }}
                    >
                        {item.name}
                    </Link>
                ))}
            </div>
            <div className="mt-3 pb-4">
                <h1 className="mb-2">Price</h1>
                <div className="flex">
                    {prices.map(({ price, label, className }) => (
                        <Link
                            key={label}
                            className={className}
                            href={{ ...common, query: { ...searchParams, price } }}
                        >
                            {label}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
