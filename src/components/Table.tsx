'use client'
import React, { useState } from 'react'
import Threedots from './svg/Threedots'
import Delete from './svg/Delete'
import Modal from './Modal'
import ChangePassword from './modals/ChangePassword'

const Table = ({ data, tableData }: any) => {
    const [openIndex, setOpenIndex] = useState(null); // State to track which dropdown is open
    const [modalType, setModalType] = useState({ Type: "", id: '' })
    const [openmodal,setOpenModal]=useState(false)
    const handleOpen = (index: any) => {
        setOpenIndex((prevIndex) => (prevIndex === index ? null : index)); // Toggle the dropdown for the clicked index
    };

    const buttons=['Change  Password','Recharge','Redeem','Update Status']
    const handelOpenModal = (type:string,id:string) => {
        setModalType({ Type: type, id: id })
        setOpenModal(true)
        setOpenIndex(null);
    } 

    const handelCloseModal = () => {
        setOpenModal(false)
    }

    let ModalContent;
    switch (modalType?.Type) {
      case "Change  Password":
            ModalContent = <ChangePassword id={modalType?.id} closeModal={handelCloseModal} />;
        break;
  
    //   case "Recharge Client":
    //     ModalContent = <Recharge setOpen={setOpen} id={rowData._id} />;
    //     break;
  
    //   case "Redeem Client":
    //     ModalContent = <Redeem setOpen={setOpen} id={rowData._id} />;
    //     break;
  
    //   case "Update Status":
    //     ModalContent = (
    //       <ClientStatus
    //         setOpen={setOpen}
    //         id={rowData._id}
    //         prevStatus={rowData.status}
    //       />
    //     );
    //     break;
  
    //   case "Delete":
    //     ModalContent = (
    //       <DeleteModal
    //         title="user"
    //         setOpen={setOpen}
    //         id={rowData._id}
    //         handleDelete={handleDelete}
    //       />
    //     );
    //     break;
  
      default:
        ModalContent = null;
    }

    return (
        <>
            <div className="relative  shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-md text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            {
                                tableData.Thead.map((th: any) => (
                                    <th key={th} scope="col" className="px-6 py-3 text-left">
                                        {th}
                                    </th>
                                ))
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((item: any, ind: number) => (
                            <tr
                                key={item?._id}
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                            >
                                {tableData.Tbody.map((td: any) => {
                                    let tdClass = "px-6 py-4 whitespace-nowrap text-base ";


                                    switch (td) {
                                        case 'status':
                                            tdClass += item[td] === 'active'
                                                ? ' text-green-600'
                                                : ' text-red-600';
                                            break;

                                        case 'type':
                                            tdClass += item[td] === 'Recharge'
                                                ? ' text-blue-600'
                                                : item[td] === 'Redeem'
                                                    ? ' text-orange-600'
                                                    : '';
                                            break;

                                        default:
                                            break;
                                    }

                                    return (
                                        <td key={td} className={tdClass}>
                                            {item[td]}
                                        </td>
                                    );
                                })}
                                {/* Action buttons */}
                                <td>
                                    <div className='flex items-center justify-start pl-5 space-x-5'>
                                        <div className='relative'>
                                            <button onClick={() => handleOpen(ind)} className=' hover:bg-black transition-all text-[#27a5ff] p-1 rounded-lg '>
                                                <Threedots />
                                            </button>
                                            <div className={`z-10 ${openIndex === ind ? 'scale-100' : 'scale-0'} z-[51] transition-all absolute  bottom-0 right-0 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}>
                                                <ul className="py-2 text-sm text-gray-700 px-2 dark:text-gray-200" aria-labelledby="dropdownDelayButton">
                                                    {
                                                        buttons.map((button, index) => (
                                                            <li key={index}>
                                                                <button onClick={()=>handelOpenModal(button,item?._id)} className={`block w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-md text-start dark:hover:text-white ${button === 'Change Password'? 'text-blue-600' : ''}`}>
                                                                    {button}
                                                                </button>
                                                            </li>
                                                        ))
                                                    }
                                                </ul>
                                            </div>
                                        </div>

                                        <button className='hover:bg-black transition-all text-red-600 p-1  rounded-lg'>
                                            <Delete />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {openIndex !== null && <div onClick={() => handleOpen(null)} className='bg-black fixed top-0 bg-opacity-35 left-0 w-full h-screen z-[50]'></div>}
            {openmodal && <Modal closeModal={handelCloseModal} modaltype={modalType} >{ModalContent}</Modal>}
        </>

    )
}

export default Table
