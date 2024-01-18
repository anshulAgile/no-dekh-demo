import { CATEGORY, CITY } from '@/data';
import { useRouter } from 'next/router';

export default function CityAreaServicePage({ data }) {
    const router = useRouter();
    const { service, subService } = router.query;

    return (
        <div>
            <h1>Service Details</h1>
            <p>service: {service}</p>
            <p>subService: {subService}</p>
            <p>{JSON.stringify(data)}</p>
        </div>
    );
}

export async function getStaticPaths() {
    // Generate paths from your dataset
    const paths = [];

    CATEGORY.forEach(cg => {
        cg.subCategory.forEach((subCategory) => {
            paths.push({
                params: { city: cg.name, service: subCategory.name },
            });
        })
    });

    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    // Fetch data based on params (city, service)
    const data = {
        service: params.service,
        subService: params.subService,
    };

    return { props: { data } };
}