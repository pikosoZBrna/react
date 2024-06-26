export default async function get_stripe_payment_url(cart_data: any, order_template: any){
    try {
    
        const form_data = new FormData()

        form_data.append('items', JSON.stringify({products: cart_data.cart_items_for_stripe_paywall}))
        form_data.append('tables', JSON.stringify(order_template))
        form_data.append('cart', JSON.stringify(cart_data.cart_items_for_stripe_paywall))

        const responce = await fetch(process.env.REACT_APP_SECRET_SERVER_URL + '/stripe_create_session', {
            method: 'POST',
            body: form_data
        })

        const data = await responce.json()

      return data

    } catch (error) {

      console.log(error);
    }
}