import {
    getDoc,
    getDocs,
    setDoc,
    doc,
    addDoc,
    collection,
    updateDoc,
    query,
    orderBy,
    onSnapshot,
    where,
    deleteDoc
} from 'firebase/firestore'
import { db } from './firebase'


//search firestore for a user using the incoming user objects.id
//if the user exists, return the data associated with it
//if the user doesn't exist, call addUser function with the incoming user object
export const getUser = async (user) => {
    
    const docSnap = await getDoc(doc(db, 'users', user.uid))

    if (!docSnap.exists()) {

        //create a new user data object and return it
        const newUser = await addUser(user)
        return newUser
    } else {
        return {...docSnap.data(), uid: user.uid}
    }
}