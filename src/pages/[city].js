import { CITY } from '@/data';
import { useRouter } from 'next/router';

export default function CityPage({ cityData }) {
    const router = useRouter();
    const { city } = router.query;
    console.log('city: ', city);

    return (
        <div>
            <h1>City Page</h1>
            <h1>{cityData.name}</h1>
        </div>
    );
}

export async function getStaticPaths() {
    // Generate paths from your city dataset
    const paths = CITY.map(city => ({
        params: { city: city.name },
    }));

    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    // Fetch data for a single city based on params.city
    const cityData = CITY.find(city => city.name === params.city);

    return { props: { cityData } };
}
