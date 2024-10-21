import Search from '@/components/Search'
import Table from '@/components/Table'
import { getActivePlayers } from '@/utils/action'
import React from 'react'

const page = async ({ searchParams }:any) => {
    const activePlayers = await getActivePlayers(searchParams?.page)
    const tableData = {
        Thead: ['username', 'status', 'role', 'redeem', 'recharge', 'credits','Current Game', 'action'],
        Tbody:['username', 'status', 'role', 'totalRedeemed','totalRecharged','credits','currentGame']
    }


    return (
        <div className='pt-5'>
            <div className='pb-5'>
                <Search />
            </div>
            <Table data={activePlayers?.subordinates} tableData={tableData} />
        </div>
    )
}

export default page
