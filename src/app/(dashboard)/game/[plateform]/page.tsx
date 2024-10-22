import Search from '@/components/Search'
import Table from '@/components/Table'
import { getGames, getTransactions } from '@/utils/action'
import React from 'react'

const page = async ({ params }: any) => {
  const games: any = await getGames("milkyway", params?.plateform)
  const tableData = {
    Thead: ['Thumbnail', 'Game Name', 'Category', 'Type', 'Status', 'Slug', 'action'],
    Tbody: ['thumbnail', 'name', 'category', 'type', 'status', 'slug']
  }

  return (
    <div className='pt-5'>
      <div className='pb-5'>
        <Search />
      </div>
      <Table page={'game'} gamePlatform={params?.plateform} data={games} tableData={tableData} />
    </div>
  )
}

export default page
