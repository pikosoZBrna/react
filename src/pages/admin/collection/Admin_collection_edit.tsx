import { useEffect, useState } from 'react';
import {useNavigate, useLocation } from 'react-router-dom';

import Access_denied from '../../user/Access_denied';

import edit_record from '../../../apis/records/edit_record';

import Admin_image_add from '../../../components/Admin/Admin_add_image_handler';

import set_up_files from '../../../functions/set_ups/set_up_files';

import Files from '../../../interfaces/Files';
import get_filtred_data from '../../../functions/get_filtred_data';
import get_edit_collection_template from '../../../templates/admin/get_edit_collection_template';
import { useCookies } from 'react-cookie';
import check_for_admin from '../../../functions/sub_functions/check_for_admin';
import Loading from '../../../components/Loading';

export default function Admin_collection_edit(){

    const navigate = useNavigate();
    const location = useLocation();
    
    const file_set_up = set_up_files(location.state.collection_images, location.state.collections[0], "collections")
    
    const [collection_name, setCollection_name] = useState<string>(location.state.collections[0].name);

    const [urls, set_urls] = useState<{main: string|undefined, hover:string|undefined, other: Array<string>, model_show_case: Array<string>, detail_show_case: Array<string>}>(file_set_up.ulrs)
    const [files, set_files] = useState<Files>()

    const [err_msg, set_err_msg] = useState<string>("")

    const [cookies, setCookie] = useCookies(['user_data'])

    const [loading, set_loading] = useState<boolean>(false);  

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

    var handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

        set_loading(true)

        event.preventDefault();

        if(!collection_name){set_err_msg("empty collection name")}

        if(collection_name){

            const filtred_data = get_filtred_data(urls, files, file_set_up.ulrs)

            const edit_collection_template = get_edit_collection_template(collection_name, location.state.collections[0].id, filtred_data.file_names_for_table)

            const [api_responce, error] = await edit_record(edit_collection_template, location.state.collections[0].id, cookies.user_data[0].id, filtred_data.files_to_save, filtred_data.file_names_to_keep, "collections")

            if(error){
                set_err_msg("error ocured")
            }else if(api_responce.next_status === true){  
                navigate("/admin_collection_page", {state: {msg: api_responce.msg}})
            }
        }   

        set_loading(false)
    }

    return(
        <>

            {loading ? <Loading></Loading> : <>
                <p>{err_msg}</p>

                {is_admin ? <div>
                    <form onSubmit={handleSubmit} encType="multipart/form-data">

                        <label htmlFor="collection_edit">{"Collection name"}</label>
                        <input id="collection_edit" type="text" name="collection_edit" value={collection_name} onChange={(e) => setCollection_name(e.target.value)}></input>
                        <br></br>
                        <br></br>

                        <Admin_image_add default_urls={urls} on_change={set_files} on_delete={set_urls}></Admin_image_add>

                        <button>save</button>

                    </form>
                </div> : <Access_denied></Access_denied>}
            </>}
        </>
    )
}