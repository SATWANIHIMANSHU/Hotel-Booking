import React from 'react'
import { useState,useEffect } from 'react';
import { roomsDummyData } from '../../assets/assets';
import Title from '../../components/Title';
import { useAppContext } from '../../context/Appcontext';
import toast from 'react-hot-toast';

const ListRoom = () => {

  const [rooms,setRooms] = useState([])
  const {axios,getToken,user,currency} = useAppContext();

  const fetchRooms = async()=>{
    
    try {
      const {data} = await axios.get('/api/rooms/owner',{ headers: {Authorization:`Bearer ${await getToken()}`}}); 
      if(data.success){
        setRooms(data.rooms);
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  //Toggle Availabilty of room

  const toggleAvailabilty = async (roomId) => {

  setRooms(prev =>
    prev.map(room =>
      room._id === roomId
        ? { ...room, isAvailable: !room.isAvailable }
        : room
    )
  );

  try {
    const { data } = await axios.post(
      '/api/rooms/toggle-availability',
      { roomId },
      { headers: { Authorization: `Bearer ${await getToken()}` } }
    );

    if (!data.success) {
      throw new Error(data.message);
    }

    toast.success(data.message);
  } catch (error) {
    toast.error(error.message || "Toggle failed");


    setRooms(prev =>
      prev.map(room =>
        room._id === roomId
          ? { ...room, isAvailable: !room.isAvailable }
          : room
      )
    );
  }
};



  useEffect(() => {
     if(user){
      fetchRooms();
     }
  }, [user])
  

  return (
    <div>
      <Title align="left" font="outfit" title=" Room Listing" subTitle="View, edit,or manage all listed rooms.Keep the infromation up-to-date to provide the best experience for users." />
      <p className='text-gray-500 mt-8'>All Rooms</p>

      <div className='w-full max-w-3xl text-left border border-gray-300 rounded-lg max-h-80 overflow-y-scroll mt-4'>
        <table className='w-full'>

          <thead className='bg-gray-50'>
                         <tr>
                          <th className='py-3 px-4 text-gray-800 font-medium'>Name</th>
                          <th className='py-3 px-4 text-gray-800 font-medium max-sm:hidden'>Facility</th>
                          <th className='py-3 px-4 text-gray-800 font-medium text-center'>Price / night</th>
                          <th className='py-3 px-4 text-gray-800 font-medium text-center'>Action</th>
                         </tr>
                  </thead>
          <tbody className='text-sm'>
            {
              rooms.map((item,index)=>(
                <tr key={index}>  
                  <td className='py-3 px-4 text-gray-700 border-t border-gray-300'>
                    {item.roomType}
                  </td> 
                   <td className='py-3 px-4 text-gray-700 border-t border-gray-300 max-sm:hidden'>
                    {item.amenities.join(', ')}
                  </td>
                  <td className='py-3 px-4 text-gray-700 border-t border-gray-300 text-center'>
                    {currency}{item.pricePerNight}
                  </td> 
                   <td className='py-3 px-4 border-t border-gray-300 text-sm text-red-500 text-center'>
                  <label className="relative inline-flex items-center cursor-pointer">
  <input
    type="checkbox"
    className="sr-only peer"
    checked={item.isAvailable}
    onChange={() => toggleAvailabilty(item._id)}
  />

  
  <div className="w-12 h-7 bg-gray-300 rounded-full peer-checked:bg-blue-600 transition-colors duration-200"></div>


  <div className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 peer-checked:translate-x-5"></div>
</label>

                    
                  </td>  
                </tr>
              ))
            }
            </tbody>
        </table>
      </div>
    </div>
  )
}

export default ListRoom