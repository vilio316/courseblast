import { useNavigate } from "react-router"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { ID, updatePFP } from "../redux/userSlice"
import supabase from "../supabase/clientSetup"
import { MainNav } from "./NavComponents"

export default function UploadProfilePicture(){
    let user_id = useAppSelector(ID)
    let dispatch = useAppDispatch()
    let navigate = useNavigate()

    async function updatePicture(url: string){
      await supabase.from('users').update({
        user_pfp: url
      }).eq('id', user_id)
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
        <div className="p-2 md:p-4 w-11/12 mx-auto">
        <MainNav/>
        <form className='my-2 md:my-4 border-2 border-emerald-700 border-dashed p-2 md:p-4'>
            <label htmlFor="pfp_upload">
            <input type="file" name="Profile Picture" id="pfp_upload" onChange={(event)=> upload_pfp(event)} className="h-0 opacity-0" accept="image/jpeg, image/jfif, image/png, image/jpg"/>
            <p className="text-xl md:text-2xl font-bold my-2 md:my-4">Upload Profile Image here</p>
            <p>Accepted File Types: .jpg, .jpeg, .jfif, .png</p>
            </label>
        </form>
        </div>
    )
}


