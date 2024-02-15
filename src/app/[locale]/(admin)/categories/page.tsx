import ThemeSwitcher from "@/components/general/ThemeSwitcher/ThemeSwitcher";
import {getTranslations} from 'next-intl/server';
import LocalSwitch from "@/components/admin/LocalSwitch/LocalSwitch";
import TreeList from "@/components/admin/TreeList/TreeList";
import WrapperCategory from "@/components/admin/WrapperCategory/WrapperCategory";


const categories = [
    {
        "id": 12,
        "title": "title1",
        "url": "url1",
        "children": []
    },
    {
        "id": 12,
        "title": "title1",
        "url": "url1",
        "children": [{
            "id": 12,
            "title": "title1",
            "url": "url1",
            "children": []
        },]
    },
    {
        "id": 12,
        "title": "title1",
        "url": "url1",
        "children": [
            {
                "id": 16,
                "title": "title4",
                "url": "url4",
                "children": [
                    {
                        "id": 17,
                        "title": "title5",
                        "url": "url5",
                        "children": [
                            {
                                "id": 18,
                                "title": "title6",
                                "url": "url6",
                                "children": [
                                    {
                                        "id": 19,
                                        "title": "title7",
                                        "url": "url7",
                                        "children": []
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
]

export default async function Home() {
    return (
        <div>
            <WrapperCategory categories={categories}/>
        </div>
    );
}
