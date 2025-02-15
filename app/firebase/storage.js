import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { storage } from '../firebaseConfig'

import {format} from 'date-fns'

//bucket URL from storage in firebase console
const BUCKET_URL = 'gs://areregsoft.appspot.com'

//upload image and return the storage bucket
export const uploadImage = async (image, currentUser) => {

    console.log(image)

    //generate bucket path
    const bucket = `${BUCKET_URL}/${currentUser}/${image.fileName}.${format(new Date(), "yyyy-MM-dd'T'HH:mm:ss")}`

    //create blob using the incoming photo
    const blob = await new Promise(async (resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.onload = () => {
        resolve(xhr.response) 
        }
        xhr.onerror = (e) => {
            reject(new TypeError('Network request failed'))
        }
        xhr.responseType = 'blob'
        xhr.open('GET', image.uri, true)
        xhr.send(null)
    })

    //upload image and return result object
    const result = uploadBytes(ref(storage, bucket), blob)
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
    try {
        return await getDownloadURL(ref(storage, path))
    } catch (err) {
        console.log(err)
    }
}