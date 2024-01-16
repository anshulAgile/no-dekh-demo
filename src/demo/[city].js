import { useRouter } from 'next/router'
import React from 'react'

const CITY = () => {
    const route = useRouter()
    return (
        <h1>CITY : {JSON.stringify(route.query)}</h1>
    )
}

export default CITY