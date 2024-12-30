import { useAppSelector } from "../redux/hooks"
import { ID } from "../redux/userSlice"
import supabase from "../supabase/clientSetup"

export default function UploadProfilePicture(){
    let user_id = useAppSelector(ID)


    async function upload_pfp(event: any){
    let file_item = event.target.files[0]
    await supabase.storage.from('courseblast_storage_bucket').upload(
        `${user_id}/profile_photo`, file_item
    )
    }

    return(
        <>
        <p>Attach PFP here: </p>
        <form>
            <input type="file" name="Profile Picture" id="pfp_upload" onChange={(event)=> upload_pfp(event)} />
        </form>
        </>
    )
}