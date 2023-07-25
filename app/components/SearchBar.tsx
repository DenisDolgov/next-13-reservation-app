'use client';

import { useRouter } from "next/navigation";
import { ChangeEventHandler, useState } from "react";

export default function SearchBar() {
    const router = useRouter();
    const [location, setLocation] = useState('');
    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => setLocation(e.target.value);
    const handleSubmit = () => {
        if (!location) return;

        void router.push(`/search?location=${location}`);
        setLocation('');
    }

    return (
        <div className="text-left text-lg py-3 m-auto flex justify-center">
            <input
                className="rounded  mr-3 p-2 w-[450px]"
                type="text"
                placeholder="State, city or town"
                value={location}
                onChange={handleChange}
            />
            <button onClick={handleSubmit} className="rounded bg-red-600 px-9 py-2 text-white">
                Let&apos;s go
            </button>
        </div>
    );
}
