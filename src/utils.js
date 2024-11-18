import { toast } from 'react-toastify';
// import toast, { Toaster } from 'react-hot-toast';

export const handleSuccess = (msg) => {
    toast.success(msg)
    console.log("Success Toast")
}

export const handleError = (msg) => {
    toast.error(msg)
    console.log("Error Toast")
}
