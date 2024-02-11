import Swal from "sweetalert2";
import { useApiHook } from "./useApi";
import { PlaylistStore } from "../ZustandStore/playlistStore";
export function useSweetAlert(){
    const {removePlaylist} = PlaylistStore()
const {deleteVideoMutation} = useApiHook()
    const  SweetAlertForDelete =  (id : string)=>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
        Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
            deleteVideoMutation.mutate(id)
            }
        });
     }

     const SweetAlertDeletePL = (list:string) =>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
        Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
            removePlaylist(list)
            }
        });
     }

    return{SweetAlertForDelete, SweetAlertDeletePL}
}