import React, {FC} from 'react';
import "./CreateMenu.scss"
import MyInput from "@/components/general/MyInput/MyInput";
import MyBtn from "@/components/UI/MyBtn/MyBtn";
import {Line} from "@/components/UI/Line/Line";
import {getAction} from "@/actions/postAction";


interface CreateMenuProps {
    parentId: string | undefined
    setVisible: (visible: boolean) => void;
}

const CreateMenu: FC<CreateMenuProps> = ({parentId, setVisible}) => {

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        const data = {
            icons: "1",
            translations: [
                {
                    name: formData.get('name-ua'),
                    url: formData.get('url-ua'),
                    lang: "ua"
                },
                {
                    name: formData.get('name-ru'),
                    url: formData.get('url-ru'),
                    lang: "ru"
                },
                {
                    name: formData.get('name-en'),
                    url: formData.get('url-en'),
                    lang: "en"
                },
            ]
        }

        let test = getAction("menu", data)
        console.log("etest", test)
        setVisible(false)
    }


    return (
        <div className="container-create-menu">
            <form onSubmit={handleSubmit}>
                <MyInput type={"text"} placeholder={"Назва"} name={"name-ua"}/>
                <MyInput type={"text"} placeholder={"Названия"} name={"name-ru"}/>
                <MyInput type={"text"} placeholder={"name"} name={"name-en"}/>
                <Line isAbsolute={false}/>
                <MyInput type={"text"} placeholder={"посилання"} name={"url-ua"}/>
                <MyInput type={"text"} placeholder={"силка"} name={"url-ru"}/>
                <MyInput type={"text"} placeholder={"url"} name={"url-en"}/>
                <Line isAbsolute={false}/>
                <MyBtn text={"submit"} color={"primary"}/>
            </form>
        </div>
    );
};

export default CreateMenu;