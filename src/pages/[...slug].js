import { CATEGORY, CITY, displayPOP } from '@/data';
import React from 'react'

const DynamicPage = (props) => {
    console.log('props: ', props);
    return (<>
        <h1>DynamicPage</h1>
        {props.data?.map((val, i) => {
            return <>
                <h3 key={val}>{i + 1}) {displayPOP(val)}</h3>
                <h3 key={val} style={{ fontWeight: "bolder", color: "blue" }}>{val}</h3>
            </>
        })}
    </>)
}

export default DynamicPage

export async function getStaticPaths() {

    let generatedPaths = [{ params: {}];

    // CITY //mumbai
    CITY.forEach(city => {
        generatedPaths.push({ params: { slug: [city.name] } })

        //CITY + CATEGORY //mumbai/ac-service
        CATEGORY.forEach(category => {
            generatedPaths.push({ params: { slug: [city.name, category.name] } })

            // CITY + CATEGORY + SUB Category //mumbai/ac-service-ac-gas-filling

            category.subCategory.forEach(subCategory => {
                generatedPaths.push({ params: { slug: [city.name, category.name, subCategory.name] } })
            })
        })
    })

    // AREA //mumbai/bandra
    CITY.forEach(city => {
        city.area.forEach(area => {
            generatedPaths.push({ params: { slug: [city.name, area.name] } })

            // AREA + CATEGORY  //mumbai/bandra/ac-service
            CATEGORY.forEach(category => {
                generatedPaths.push({ params: { slug: [city.name, area.name, category.name] } })

                // AREA + CATEGORY + Sub Category  //mumbai/bandra/ac-service/ac-gas-filling
                category.subCategory.forEach(subcategory => {
                    generatedPaths.push({ params: { slug: [city.name, area.name, category.name, subcategory.name] } })
                })

            })
        })
    })

    // CATEGORY
    CATEGORY.forEach(category => {
        generatedPaths.push({ params: { slug: [category.name] } })
    })

    // Sub category 
    CATEGORY.forEach(category => {
        category.subCategory.forEach(area => {
            generatedPaths.push({ params: { slug: [category.name, area.name] } })
        })
    })

    const paths = [
        { params: { slug: ['mumbai'] } },
        { params: { slug: ['mumbai', 'shivranjani'] } },
        { params: { slug: ['mumbai', 'ac-services'] } },
        { params: { slug: ['mumbai', 'ac-services', 'ac-gas-filling'] } },
    ];
    console.log('generatedPaths: ', generatedPaths);
    return {
        paths: generatedPaths,
        fallback: false, // or 'blocking' if you want to enable ISR
    };
}

export async function getStaticProps({ params, ...rest }) {
    console.log('rest: ', rest);
    // Use params.slug to fetch data based on the slug
    // For example, params.slug could be ['mumbai', 'ac-services']
    const data = params.slug;
    console.log('params: ', params);
    // console.log('params.slug: ', params.slug);

    return {
        props: {
            data,
        },
    };
}
