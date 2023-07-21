import AppHeader from "./components/AppHeader";
import RestaurantCard from "./components/RestaurantCard";

export default function Home() {
    return (
        <>
            <AppHeader/>
            <div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
                <RestaurantCard/>
            </div>
        </>
    )
}
