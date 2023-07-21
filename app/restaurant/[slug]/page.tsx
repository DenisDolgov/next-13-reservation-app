import NavBar from "../../components/NavBar";
import Header from "./components/Header";
import RestaurantNavBar from "./components/RestaurantNavBar";
import Rating from "./components/Rating";
import Images from "./components/Images";
import Reviews from "./components/Reviews";
import ReservationCard from "./components/ReservationCard";

export default function RestaurantDetails() {
    return (
        <main className="bg-gray-100 min-h-screen w-screen">
            <main className="max-w-screen-2xl m-auto bg-white">
                <NavBar />
                <Header />
                {/* DESCRIPTION PORTION */}
                <div className="flex m-auto w-2/3 justify-between items-start 0 -mt-11">
                    <div className="bg-white w-[70%] rounded p-3 shadow">
                        <RestaurantNavBar />
                        {/* TITLE */}
                        <div className="mt-4 border-b pb-6">
                            <h1 className="font-bold text-6xl">Milesstone Grill</h1>
                        </div>
                        {/* TITLE */}
                        <Rating />
                        {/* DESCRIPTION */}
                        <div className="mt-4">
                            <p className="text-lg font-light">
                                The classics you love prepared with a perfect twist, all served up
                                in an atmosphere that feels just right. That’s the Milestones
                                promise. So, whether you’re celebrating a milestone, making the most
                                of Happy Hour or enjoying brunch with friends, you can be sure that
                                every Milestones experience is a simple and perfectly memorable one.
                            </p>
                        </div>
                        {/* DESCRIPTION */}
                        <Images />
                        <Reviews />
                    </div>
                    <div className="w-[27%] relative text-reg">
                        <ReservationCard />
                    </div>
                </div>
            </main>
        </main>
    )
}
