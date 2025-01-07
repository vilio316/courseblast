import { useNavigate } from "react-router"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { ID, updatePFP } from "../redux/userSlice"
import supabase from "../supabase/clientSetup"

export default function UploadProfilePicture(){
    let user_id = useAppSelector(ID)
    let dispatch = useAppDispatch()
    let navigate = useNavigate()

    async function updatePicture(url: string){
      await supabase.from('users').update({
        user_pfp: url
      })
    }

    async function upload_pfp(event: any){
    let file_item = event.target.files[0]
    console.log(file_item)
    const {data} = await supabase.storage.from('courseblast_storage_bucket').upload(
        `${user_id}/${file_item.name}`, file_item
    )

    async function fetchSupaPfpURL(){
    const { data } = supabase
  .storage
  .from('courseblast_storage_bucket')
  .getPublicUrl(`${user_id}/${file_item.name}`)
  if(data){
    dispatch(updatePFP(data.publicUrl))
    updatePicture(data.publicUrl)
    window.alert("PFP Updated Successfully")
    navigate('/user')   
  }
    }
    if(data){
    fetchSupaPfpURL()
    }
    }

    return(
        <>
        <p>Attach PFP here: </p>
        <form>
            <label htmlFor="pfp_upload" className="h-40 w-10/12 rounded-2xl border-2 border-emerald-700 border-dashed p-2 md:p-4">
            <input type="file" name="Profile Picture" id="pfp_upload" onChange={(event)=> upload_pfp(event)} className="none"/>
            </label>
        </form>
        </>
    )
}


