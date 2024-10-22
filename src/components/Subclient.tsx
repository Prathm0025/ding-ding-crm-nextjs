
import React, { useEffect, useState } from 'react'
import Search from './Search'
import Table from './Table'
import { getSubordinateClients } from '@/utils/action'

const Subclient = ({ subordinates_id, page }: any) => {
    const [data, setData] = useState([])
    const [load,setLoad]=useState(false)
    const handelSubordinates = async () => {
        try {
            setLoad(true)
            const subordinates = await getSubordinateClients(subordinates_id, page)
            if (subordinates) {
                setData(subordinates?.data?.subordinates)
            }
            setLoad(false)
        } catch (error) {
            setLoad(false)
        }   
    }

    useEffect(() => {
       handelSubordinates() 
    },[subordinates_id,page])

    const tableData = {
        Thead: ['username', 'status', 'role', 'redeem', 'recharge', 'credits', 'action'],
        Tbody: ['username', 'status', 'role', 'totalRedeemed', 'totalRecharged', 'credits']
    }
    return (
        <div className='pt-5'>
            <div className='pb-5'>
                <Search />
            </div>
            <Table data={data} tableData={tableData} />
        </div>
    )
}

export default Subclient
