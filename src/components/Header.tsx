import { Link } from "react-router-dom";

import Login_hud from "./Login_hud";
import Menu from "./Menu";

export default function Header(){

    return(
        <>
            <div id="header">

                <Link id="collections" to="/collections">Collections</Link>

                <Link id="company_name" to="/main">Joynda</Link>
                <Login_hud></Login_hud>

                <Menu></Menu>
            </div>
        </>
    )
}