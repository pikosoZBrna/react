import { useState } from "react";
import { Link } from "react-router-dom"

export default function Cart(props: {cart_item_count?: number}){

    const [cart_data, set_cart_data] = useState<Array<any>>(sessionStorage.getItem("cart_data") === null ? [] : JSON.parse(sessionStorage.getItem("cart_data")!))

    return(
        <>
            <div id="cart">
                <Link to="/prepare-order">
                    <img src={process.env.REACT_APP_SECRET_SERVER_URL + "/images/others/cart_image.jpg"} width={"80px"} height={"80px"}></img>
                    {cart_data !== null ? <>
                        {cart_data ? props.cart_item_count ? <p id="cart_item_number">{props.cart_item_count}</p> : <p id="cart_item_number">{cart_data.length}</p> : <p id="cart_item_number">{0}</p>}
                    </> : <p id="cart_item_number">{0}</p>}
                </Link>
            </div>
        </>
    )
}
