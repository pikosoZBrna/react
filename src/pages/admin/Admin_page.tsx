import { Link } from 'react-router-dom';

import Access_denied from '../user/Access_denied';

import { useEffect, useState } from 'react';
import check_for_admin from '../../functions/sub_functions/check_for_admin';

export default function Admin_page(){

    const [user_data] = useState<Array<any>>(sessionStorage.getItem("user_data") === null ? [] : JSON.parse(sessionStorage.getItem("user_data")!))

    const [is_admin, set_is_admin] = useState<boolean>(false)

    useEffect(() => {
        const temp = async() => {
            var is_admin = await check_for_admin(user_data[0].email, user_data[0].password)

            if(is_admin.next_status === true){
                set_is_admin(true)
            }
        }

        temp()
    }, [])

    return(
        <>
            {is_admin ? 
                <div>
                    <Link to="/admin_collection_page"><button>collections page</button></Link>
                    <Link to="/admin_product_page"><button>products page</button></Link>
                    <Link to="/admin_order_page"><button>orders page</button></Link>

                    <Link to="/admin_collection_add"><button>Add collections</button></Link>
                    <Link to="/admin_product_add"><button>Add products</button></Link>

                    <Link to="/admin_refunds"><button>refunds</button></Link>
                </div> 
                
                : <Access_denied></Access_denied>}
        </>
    )
}