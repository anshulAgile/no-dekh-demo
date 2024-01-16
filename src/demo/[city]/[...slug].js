import { useRouter } from 'next/router'
import React from 'react'

const DEfault = () => {
    const route = useRouter()
    return (
        <h1>DEfault : {JSON.stringify(route.query)}</h1>
    )
}

export default DEfault