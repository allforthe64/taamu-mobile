import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { storage } from '../firebaseConfig'

import {format} from 'date-fns'

//bucket URL from storage in firebase console
const BUCKET_URL = 'gs://areregsoft.appspot.com'

//upload image and return the storage bucket
export const uploadImage = async (image, currentUser) => {

    //generate bucket path
    const bucket = `${BUCKET_URL}/${currentUser}/${image.name}.${format(new Date(), "yyyy-MM-dd'T'HH:mm:ss")}`

    //upload image and return result object
    const result = uploadBytes(ref(storage, bucket), image)
    return result
}

export const deleteFile = (path) => {
    deleteObject(ref(storage, path)).then(() => {
        console.log('OK')
    }).catch((err) => {
        console.log(err)
    })
}

//get the downloadable url from incoming path
export const getDownloadableURL = async (path) => {
    return await getDownloadURL(ref(storage, path))
}