import { useRouter } from 'next/router'
import React from 'react'

const Category = () => {
    const route = useRouter()
    return (
        <h1>Category : {JSON.stringify(route.query)}</h1>
    )
}

export default Category