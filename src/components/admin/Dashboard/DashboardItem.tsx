'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Props = {
    href: string;
    src: string;
    alt: string;
};

export const DashboardItem = (props: Props) => {
    const { href, src, alt } = props;
    const activePath = usePathname();
    const active = href === activePath.split('/')[2];

    return (
        <Link href={href} className={`${active ? 'active' : ''}`}>
            <Image src={src} alt={alt} />
        </Link>
    );
};
