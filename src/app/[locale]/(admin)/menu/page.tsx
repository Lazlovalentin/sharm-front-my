import {getAction} from "@/actions/getAction";
import WrapperMenu from "@/components/admin/WrapperMenu/WrapperMenu";


export default async function Home() {
    const allMenus = await getAction("menu/en")

    return (
        <>
            <WrapperMenu menu={allMenus}/>
        </>
    );
}
