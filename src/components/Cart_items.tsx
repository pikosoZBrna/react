import React, { useState } from "react";

export default function Cart_items(){

    const [responce_msg, set_responce_msg] = useState<string>()

    const [session_cart_data, set_session_cart_data] = useState<Array<any>>(sessionStorage.getItem("cart_data") === null ? [] : JSON.parse(sessionStorage.getItem("cart_data")!))

    var handle_on_click = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, pozition: number) =>{

        event.preventDefault();

        let clone = [...session_cart_data]
        
        clone.splice(pozition, 1)

        sessionStorage.setItem("cart_data", JSON.stringify(clone))

        set_session_cart_data(clone)

        set_responce_msg("item removed from cart")
    }

    return(
        <>
            <p>{responce_msg}</p>

            {session_cart_data !== null ? session_cart_data.length > 0 ? 

            <table>
                <thead>
                    <tr>
                        <th>name</th>
                        <th>size</th>
                        <th>image</th>
                        <th>price</th>
                        <th>quantity</th>
                    </tr>
                </thead>
                
                <tbody>

            {session_cart_data.map((item: any, index: number) =>              
                    <tr key={index.toString()}>
                        <td>{item.product[0].product_name}</td>
                        <td>{item.size_data.size}</td>
                        <td><img src={process.env.REACT_APP_SECRET_SERVER_URL + "/images/products/" + item.product[0].id + "/" + item.product[0].url} width={"100px"} height={"100px"}></img></td>
                        <td>{item.product[0].price + "€"}</td>
                        <td>{item.size_data.current_amount}</td>
                        <td><button onClick={(event) =>handle_on_click(event, index)}>remove</button></td>
                    </tr>
            )}
                </tbody>

            </table>
            
            : <p>epmty cart</p> : ""}
        </>
    )
}