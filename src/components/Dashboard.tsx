"use client"
import React from 'react'
import Recharge from './svg/Recharge'
import Redeem from './svg/Redeem'
import Clients from './svg/Clients'
import Player from './svg/Player'
import RecentTransaction from './RecentTransaction'

const Dashboard = () => {

    const card = [
        {
            title: 'Recharge',
            amount: 0,
            icon: <Recharge />
        },
        {
            title: 'Redeem',
            amount: 0,
            icon: <Redeem />
        },
        {
            title: 'Clients',
            amount: 0,
            icon: <Clients />
        },
        {
            title: 'Players',
            amount: 0,
            icon: <Player />
        }
    ]

    const recentTransactions = [
        {
            sender: 'Ashish',
            receiver: 'Admin',
            amount: 500,
            type: 'redeem',
            date: '2022-03-15'
        },
        {
            sender: 'Ashish',
            receiver: 'Admin',
            amount: 500,
            type: 'recharge',
            date: '2022-03-15'
        },
        {
            sender: 'Ashish',
            receiver: 'Admin',
            amount: 500,
            type: 'redeem',
            date: '2022-03-15'
        },
        {
            sender: 'Ashish',
            receiver: 'Admin',
            amount: 500,
            type: 'redeem',
            date: '2022-03-15'
        }
    ]

    return (
        <div className='py-2 '>
            <div className='p-2  h-full bg-gray-100  dark:bg-gray-800'>
                <div className='flex items-center justify-between'>
                    <div className=' dark:text-white text-[1.2rem]'>Daily Report</div>
                    <div>
                        <select className='px-8 bg-gray-300 rounded-md dark:bg-gray-700 outline-none dark:text-white text-black py-1.5'>
                            <option value="">Today</option>
                            <option value="">Weakly</option>
                            <option value="">Monthly</option>
                        </select>
                    </div>
                </div>
                <div className='grid grid-cols-12 pt-5 gap-4'>
                    {
                        card?.map((item, ind) => (
                            <div key={ind} className='p-4 rounded-lg bg-white dark:bg-gray-700 col-span-3'>
                                <div className='flex justify-start space-x-2 items-center'>
                                    {item?.icon}
                                    <div className='dark:text-white text-xl text-black'>{item?.title}</div>
                                </div>
                                <div className='text-5xl dark:text-white text-black pt-4'>{item?.amount}</div>
                            </div>
                        ))
                    }

                </div>
                <div className='pt-5 grid grid-cols-12 gap-4 h-full'>
                    <RecentTransaction recentTransactions={recentTransactions} />
                    <div className='col-span-5 p-3 rounded-lg  bg-white dark:bg-gray-700 '>
                        <div className='text-xl dark:text-white'>Most Played Games</div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
