import { PRICE } from "@prisma/client";

type Props = {
    price: PRICE;
    className?: string;
};

const getFilledCharsCount = (price: PRICE) => {
    switch (price) {
        case "CHEAP":
            return 2;
        case "REGULAR":
            return 3;
        case "EXPENSIVE":
            return 4;
    }
}

export default function Price({ price, className }: Props) {
    let filledChars = getFilledCharsCount(price);
    let emptyChars = 4 - filledChars;

    return (
        <div className={className}>
            <span>{new Array(filledChars).fill('$').join('')}</span>
            {emptyChars > 0 && <span className="text-gray-400">{new Array(emptyChars).fill('$').join('')}</span>}
        </div>
    );
};
