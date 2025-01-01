import { useAppSelector } from "../redux/hooks"
import { ID } from "../redux/userSlice"
import supabase from "../supabase/clientSetup"

export default function UploadProfilePicture(){
    let user_id = useAppSelector(ID)


    async function upload_pfp(event: any){
    let file_item = event.target.files[0]
    console.log(file_item)
    const {data} = await supabase.storage.from('courseblast_storage_bucket').upload(
        `${user_id}/${file_item.name}`, file_item
    )
    console.log(data)

    async function fetchSupaPfpURL(){
        const { data } = supabase
  .storage
  .from('courseblast_storage_bucket')
  .getPublicUrl(`${user_id}/${file_item.name}`)
  console.log(data)
    }

    if(data){
    fetchSupaPfpURL()
    }
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


