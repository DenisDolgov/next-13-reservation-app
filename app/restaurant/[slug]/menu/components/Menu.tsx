import MenuCard from "./MenuCard";
import {Items} from ".prisma/client";

type Props = {
    menu: Items[];
};

export default function Menu({ menu }: Props) {
    return (
        <main className="bg-white mt-5">
            <div>
                <div className="mt-4 pb-1 mb-1">
                    <h1 className="font-bold text-4xl">Menu</h1>
                </div>
                <div className="flex flex-wrap justify-between">
                    {menu.map(item => <MenuCard item={item} key={item.id} />)}
                </div>
            </div>
        </main>
    );
};
