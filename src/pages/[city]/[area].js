import { CITY } from '@/data';
import { useRouter } from 'next/router';

export default function CityAreaServicePage({ data }) {
    const router = useRouter();
    const { city, area } = router.query;

    return (
        <div>
            <h1>Service Details</h1>
            <p>City: {city}</p>
            <p>Area: {area}</p>
            <p>{JSON.stringify(data)}</p>
        </div>
    );
}

export async function getStaticPaths() {
    // Generate paths from your dataset
    const paths = [];

    CITY.forEach(city => {
        city.area.forEach(area => {
            paths.push({
                params: { city: city.name, area: area.name },
            });
        });
    });

    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    // Fetch data based on params (city, area)
    const data = {
        city: params.city,
        area: params.area,
    };

    return { props: { data } };
}