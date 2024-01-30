import LoginPage from "@/components/admin/login";
import {user} from "@/state";

export default function Home() {
    return (
        <div>
            {user && <div>Logged in as</div>}
            <LoginPage/>
        </div>
    );
}
