import { CATEGORY, CITY } from '@/data';
import { useRouter } from 'next/router';

export default function CityAreaServicePage({ data }) {
    const router = useRouter();
    const { city, category } = router.query;

    return (
        <div>
            <h1>Service Details</h1>
            <p>City: {city}</p>
            <p>Category: {category}</p>
            <p>{JSON.stringify(data)}</p>
        </div>
    );
}

export async function getStaticPaths() {
    // Generate paths from your dataset
    const paths = [];

    CITY.forEach(city => {
        CATEGORY.forEach((category) => {
            paths.push({
                params: { city: city.name, service: category.name },
            });
        })
    });

    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    // Fetch data based on params (city, service)
    const data = {
        city: params.city,
        service: params.service,
    };

    return { props: { data } };
}