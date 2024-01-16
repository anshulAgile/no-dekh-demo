import { useRouter } from 'next/router'
import React from 'react'

const SubCategory = () => {
    const route = useRouter()
    return (
        <h1>SubCategory : {JSON.stringify(route.query)}</h1>
    )
}

export default SubCategory