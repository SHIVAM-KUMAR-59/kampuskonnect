'use client'

import api from '@/utils/axios'
import React, { useEffect, useState } from 'react'

const CurrentConnections = ({role}) => {
    const [connections, setConnections] = useState([])
    const fetchConnections = async () => {
        try {
            const connections = await api.get(`/${role}/connections`);
            setConnections(connections.data.data);
            console.log(connections);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchConnections();
    },[])

//    if (!connections.length) {
//     return (
//       <div className="text-center py-16 text-gray-500">
//         You have no connections yet, connect with an alumni to grow your network.
//       </div>
//     );
//   }
  return (
    <section className="space-y-6 mt-8">
        <h1 className="text-2xl font-semibold text-gray-900">
            You have 5 Connections
      </h1>
    </section>
  )
}

export default CurrentConnections