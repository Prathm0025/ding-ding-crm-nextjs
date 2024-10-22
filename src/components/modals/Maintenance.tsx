import Loader from "@/utils/Load";
import { UpdateMaintenance, getToggle } from "@/utils/action";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

const Maintenance = ({ closeModal, fetchDate }: any) => {
    const [startDate, setStartDate] = useState("");
    const [ismaintennence, setIsMaintenance] = useState(false)
    const [countdown, setCountdown] = useState({ day: 0, hour: 0, minute: 0, second: 0 })
    const [load,setLoad]=useState(false)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStartDate(e.target.value);
    };

    const fetchAvilableDate = async () => {
        setLoad(true)
        const response = await getToggle();
        const availableDate = new Date(response.availableAt);
        console.log(response)
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        setIsMaintenance(response?.underMaintenance)
        // startCountdown(new Date(availableDate));
        startCountdown(new Date("2024-10-22T15:50:00.000Z"));
        setLoad(false)
        if (availableDate.getTime() === today.getTime()) {
            updateToggleValue("null");
        }
    };

    useEffect(() => {
        fetchAvilableDate()
    }, [fetchDate])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!startDate) {
            return toast.error("Please select a valid date");
        } else {
            updateToggleValue(startDate);
        }
        setStartDate("");
    };




    const updateToggleValue = async (startDate: string) => {
        let availableAt = "null";
        if (startDate !== "null") {
            availableAt = new Date(startDate).toISOString();
        }
        const response: any = await UpdateMaintenance(availableAt);
        if (response?.error) {
            return toast.error(response?.error);
        }
        if (response?.availableAt) {
            closeModal()
            toast.success(response?.message || "Maintenance scheduled successfully");
        } else {

        }
    };

    function startCountdown(targetDate: Date) {
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const targetTime = targetDate.getTime();

            // Calculate the difference in milliseconds
            const difference = targetTime - now;

            // If the countdown is over, clear the interval and return
            if (difference <= 0) {
                clearInterval(interval);
                console.log('Countdown completed!');
                return;
            }

            // Calculate the remaining time
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            // Output or return the remaining time
            setCountdown({ day: days, hour: hours, minute: minutes, second: seconds });

            return () => clearInterval(interval);
        }, 1000);
    }

    return (
        <div>
            {ismaintennence ? <div className="flex items-center justify-center">
                <form onSubmit={(e) => handleSubmit(e)} className="flex gap-5 items-center">
                    {(
                        <input
                            id="m-input"
                            type="datetime-local"
                            value={startDate}
                            onChange={(e) => handleChange(e)}
                            className="appearance-none bg-[#dfdfdf] dark:bg-[#4e4c4cea] dark:text-white text-black px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300"
                        />
                    )}
                    <button
                        className="text-center flex justify-center px-4 items-center gap-2 bg-gradient-to-r from-[#8C7CFD] hover:from-[#BC89F1] hover:to-[#8C7CFD] to-[#BC89F1] mx-auto text-white text-xl rounded-md p-2 font-light hover:shadow-[0_30px_10px_-15px_rgba(0,0,0,0.2)] transition-all duration-200 ease-in-out"
                        type="submit"
                    >
                        {"Submit"}
                    </button>
                </form>
            </div> :
                <div className="flex items-center justify-center space-x-3 text-2xl">
                    <span className="bg-[#27a5ff] px-4 rounded-xl text-white bg-opacity-50 border-[3px] border-[#27a5ff] py-2">{countdown?.day} </span>
                    <span className="text-white">:</span>
                    <span className="bg-[#27a5ff] px-4 rounded-xl text-white bg-opacity-50 border-[3px] border-[#27a5ff] py-2">{countdown?.hour} </span>
                    <span className="text-white">:</span>
                    <span className="bg-[#27a5ff] px-4 rounded-xl text-white bg-opacity-50 border-[3px] border-[#27a5ff] py-2">{countdown?.minute} </span>
                    <span className="text-white">:</span>
                    <span className="bg-[#27a5ff] px-4 rounded-xl text-white bg-opacity-50 border-[3px] border-[#27a5ff] py-2">{countdown?.second}</span>
                </div>}
            {load&&<Loader />}
        </div>
    );
};

export default Maintenance;