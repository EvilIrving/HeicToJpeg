import dynamic from 'next/dynamic';

const UI = dynamic(
    () => import('../components/ui'),
    { ssr: false }
);
export default function Page() {
    return (
        <UI />
    )
}