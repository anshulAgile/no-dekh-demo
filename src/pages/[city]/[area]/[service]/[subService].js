import { CATEGORY, CITY } from '@/data';
import { useRouter } from 'next/router';

// [city]+[area]+[service]

export default function CityAreaServicePage({ data }) {
    const router = useRouter();
    const { city, service, area,subService } = router.query;

    return (
        <div>
            <h1>Service Details</h1>
            <p>City: {city}</p>
            <p>Area: {area}</p>
            <p>service: {service}</p>
            <p>Sub service: {subService}</p>
            <p>{JSON.stringify(data)}</p>
        </div>
    );
}

export async function getStaticPaths() {
    // Generate paths from your dataset
    const paths = [];

    CITY.forEach(city => {
        city.area.forEach(area => {
            CATEGORY.forEach((category) => {
                category.subCategory.forEach(subCategory => {
                    paths.push({
                        params: { city: city.name, area: area.name, service: category.name, subService: subCategory.name },
                    });
                })
            })
        })
    });

    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    // Fetch data based on params (city, service)
    const data = {
        city: params.city,
        area: params.area,
        service: params.service,
        subService: params.subService,
    };

    return { props: { data } };
}