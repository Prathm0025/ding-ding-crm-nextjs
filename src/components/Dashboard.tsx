"use client"
import React, { useEffect, useState } from 'react'
import Recharge from './svg/Recharge'
import Redeem from './svg/Redeem'
import Clients from './svg/Clients'
import Player from './svg/Player'
import RecentTransaction from './RecentTransaction'
import { getUserReport } from '@/utils/action'
import toast from 'react-hot-toast'
import Cookies from 'js-cookie'
import jwt from 'jsonwebtoken'

const Dashboard = () => {
    const [reporttype, setReportType] = useState('daily')
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<any>({});
    const card = [
        {
            title: 'Recharge',
            amount: data?.recharge,
            icon: <Recharge />
        },
        {
            title: 'Redeem',
            amount: data?.redeem,
            icon: <Redeem />
        },
        {
            title: 'Clients',
            amount: 0,
            icon: <Clients />
        },
        {
            title: 'Players',
            amount: data?.users?.player,
            icon: <Player />
        }
    ]

    useEffect(() => {
        (async () => {
            setLoading(true);
            const user: any = await Cookies.get('userToken')
            if (user) {
                const userid: any = jwt.decode(user)
                const response = await getUserReport(userid?.id, reporttype);
                setLoading(false);
                if (response?.error) {
                    return toast.error(response.error);
                }
                setData(response);
            }
        })();
    }, [reporttype]);

    return (
        <div className='py-2 '>
            <div className='p-2  h-full bg-gray-100  dark:bg-gray-800'>
                <div className='flex items-center justify-between'>
                    <div className=' dark:text-white text-[1.2rem]'>Daily Report</div>
                    <div>
                        <select onChange={(e) => setReportType(e.target.value)} className='px-8 bg-gray-300 rounded-md dark:bg-gray-700 outline-none dark:text-white text-black py-1.5'>
                            <option value="daily">Daily</option>
                            <option value="weakly">Weakly</option>
                            <option value="monthly">Monthly</option>
                        </select>
                    </div>
                </div>
                <div className='grid grid-cols-12 pt-5 gap-4'>
                    {
                        card?.map((item, ind) => (
                            <div key={ind} className='p-4 rounded-lg bg-white dark:bg-gray-700 col-span-6 lg:col-span-4 xl:col-span-3'>
                                <div className='flex justify-start space-x-2 items-center'>
                                    {item?.icon}
                                    <div className='dark:text-white text-xl text-black'>{item?.title}</div>
                                </div>
                                <div className='text-5xl text-[#27a5ff] pt-4'>{item?.amount}</div>
                            </div>
                        ))
                    }

                </div>
                <div className='pt-5 grid grid-cols-12 gap-4 h-full'>
                    <RecentTransaction recentTransactions={data?.transactions} />
                    <div className='col-span-5 p-3 rounded-lg  bg-white dark:bg-gray-700 '>
                        <div className='text-xl dark:text-white'>Most Played Games</div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
