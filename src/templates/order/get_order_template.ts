const get_order_template = (user_id: number|null, name: string, surname: string, email: string, adress: string, phone: string, postcode: string, product_id: Array<number>, size: Array<string>, amount: Array<number>, prize: Array<number>, user_status: string, country: string, zasilkovna: boolean, order_code: string) => {

    if(user_status === "Active"){
        return {
            orders: {user_id: user_id, name: name, surname: surname, email: email, adress: adress, phone: phone, postcode: postcode, country: country, zasilkovna: zasilkovna, order_code: order_code},
            order_products: {order_id: null, product_id: product_id, size: size, amount: amount, prize: prize}
        }
    }

    return {
        orders: {user_id: null, name: name, surname: surname, email: email, adress: adress, phone: phone, postcode: postcode, country: country, zasilkovna: zasilkovna, order_code: order_code},
        order_products: {order_id: null, product_id: product_id, size: size, amount: amount, prize: prize}
    }
    
}

export default get_order_template