import { useRouter } from 'next/router'
import React from 'react'

const Area = () => {
    const route = useRouter()
    return (
        <h1>Area : {JSON.stringify(route.query)}</h1>
    )
}

export default Area