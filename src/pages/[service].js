import { CATEGORY } from '@/data';
import { useRouter } from 'next/router';

export default function CityPage({ serviceData }) {
    const router = useRouter();
    const { service } = router.query;
    console.log('service: ', service);

    return (
        <div>
            <h1>City Page</h1>
            <h3>{serviceData.name}</h3>
        </div>
    );
}

export async function getStaticPaths() {
    // Generate paths from your city dataset
    const paths = CATEGORY.map(category => ({
        params: { service: category.name },
    }));

    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    // Fetch data for a single city based on params.city
    const serviceData = CATEGORY.find(category => category.name === params.category);

    return { props: { serviceData } };
}
