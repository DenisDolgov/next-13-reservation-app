import {PRICE} from "@prisma/client";

export type SearchParams = {
    location?: string;
    cuisine?: string;
    price?: PRICE;
}
