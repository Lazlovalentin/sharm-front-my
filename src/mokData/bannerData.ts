export type BannerItem = {
    id: number;
    title: string;
    image: string;
    link: string;
    top: number;
    left: number;
    bottom: string | null;
};

export const bannerData: BannerItem[] = [
    {
        id: 1,
        title: "Carousel",
        image: "/banner/imageForBanner1.png",
        link: "/info/photo1",
        top: 0,
        left: 0,
        bottom: null,
    },
    {
        id: 2,
        title: "Carousel2",
        image: "/banner/imageForBanner2.jpg",
        link: "/info/photo2",
        top: 10,
        left: 20,
        bottom: "перейти"
    },
    {
        id: 3,
        title: "Carousel3",
        image: "/banner/imageForBanner3.jpg",
        link: "/info/photo3",
        top: 50,
        left: 60,
        bottom: "купити"
    },
    {
        id: 4,
        title: "Carousel4",
        image: "/banner/imageForBanner4.jpg",
        link: "/info/photo4",
        top: 50,
        left: 60,
        bottom: "будь вкурсі"
    },
    {
        id: 5,
        title: "Carousel5",
        image: "/banner/imageForBanner5.jpg",
        link: "/info/photo5",
        top: 50,
        left: 60,
        bottom: null
    },
];
