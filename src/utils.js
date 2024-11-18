import { toast } from 'react-toastify';
// import toast, { Toaster } from 'react-hot-toast';
// import {config} from 'dotenv'
// import 'dotenv/config'

export const handleSuccess = (msg) => {
    toast.success(msg)
    console.log("Success Toast")
}

export const handleError = (msg) => {
    toast.error(msg)
    console.log("Error Toast")
}


export const env_variables = {
    BASE_URL : String(import.meta.env.VITE_BASE_URL)
}
