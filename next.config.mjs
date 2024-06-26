/** @type {import('next').NextConfig} */
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['ksuu-store.fra1.digitaloceanspaces.com'],
  },
};

export default withNextIntl(nextConfig);
