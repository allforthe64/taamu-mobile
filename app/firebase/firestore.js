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

//get the user out of firestore database and overwrite with the new incoming data
export const updateUser = async (updatedUser) => {
    const userRef = doc(db, 'users', updatedUser.uid)
    await updateDoc(userRef, {...updatedUser})
}

export const addUser = async (user) => {
    
    try {
        //define id variable to ensure that no matter if the id comes through as a localId or uid that setDoc doesn't recieve undefined
        let id
        if (user.localId && user.localId !== '') id = user.localId
        else if (user.uid && user.uid !== '') id = user.uid

        if (id && sessionStorage.userObj) {

            //grab user data out of sessionStorage
            const userData = JSON.parse(sessionStorage.userObj)

            //clear out userData from session storage
            sessionStorage.clear()
            
            if (userData.role === 'racer') {
        
                if (userData.captain) {

                    //create user data object
                    const userObj = {
                        uid: id,
                        ageCategory: userData.ageCategory,
                        email: userData.email,
                        phone: userData.phone,
                        displayName: userData.fName + ' ' + userData.lName,
                        fName: userData.fName,
                        lName: userData.lName,
                        teamName: userData.teamName,
                        gender: userData.gender,
                        contactLinks: userData.contactLinks,
                        countryOfOrigin: userData.location,
                        bio: userData.bio,
                        role: userData.role,
                        pfp: 'gs://areregsoft.appspot.com/default_pfp.png',
                        photos: [], 
                        craftCategories: [],
                        crewMembers: [{fName: userData.fName, lName: userData.lName, email: userData.email, phone: userData.phone, gender: userData.gender, ageCategory: userData.ageCategory, captain: true}],
                        registeredFor: [],
                        captain: true,
                        coach: false,
                        crews: [],
                        craftType: 'V6'
                    }
                    setDoc(doc(db, 'users', id), userObj)

                    //return user data
                    return userObj
                } else {

                    //create user data object
                    const userObj = {
                        uid: id,
                        ageCategory: userData.ageCategory,
                        DOB: userData.dob,
                        email: userData.email,
                        phone: userData.phone,
                        displayName: userData.fName + ' ' + userData.lName,
                        fName: userData.fName,
                        lName: userData.lName,
                        gender: userData.gender,
                        contactLinks: userData.contactLinks,
                        countryOfOrigin: userData.location,
                        bio: userData.bio,
                        role: userData.role,
                        pfp: 'gs://areregsoft.appspot.com/default_pfp.png',
                        photos: [], 
                        craftCategories: [],
                        registeredFor: [],
                        captain: false,
                        coach: false,
                        crews: []
                    }
                    setDoc(doc(db, 'users', id), userObj)

                    //return user data
                    return userObj
                }
            } else if (userData.role === 'organization') {

                //create user data object
                let userObj
                if (userData.paymentProvider === 'stripe') {
                    userObj = {
                        uid: id,
                        email: userData.email,
                        orgName: userData.orgName,
                        phone: userData.phone, 
                        contactLinks: userData.contactLinks, 
                        extLinks: userData.extLinks, 
                        bio: userData.bio, 
                        location: userData.location, 
                        races: [],
                        role: userData.role,
                        pfp: 'gs://areregsoft.appspot.com/default_pfp.png',
                        photos: [],
                        captain: false,
                        coach: false,
                        publicKey: userData.publicKey,
                        secretKey: userData.secretKey,
                        paymentProvider: 'stripe'
                    }
                } else {
                    userObj = {
                        uid: id,
                        email: userData.email,
                        orgName: userData.orgName,
                        phone: userData.phone, 
                        contactLinks: userData.contactLinks, 
                        extLinks: userData.extLinks, 
                        bio: userData.bio, 
                        location: userData.location, 
                        races: [],
                        role: userData.role,
                        pfp: 'gs://areregsoft.appspot.com/default_pfp.png',
                        photos: [],
                        captain: false,
                        coach: false,
                        publicKey: userData.publicKey,
                        paymentProvider: 'paypal'
                    }
                }
                
                setDoc(doc(db, 'users', id), userObj)

                //create a transaction object for this organization
                
                const transactionId = generateRandomString(16)
                const transactionObj = {
                    org: id,
                    transactions: [],
                    id: transactionId
                }
                setDoc(doc(db, 'transactions', transactionId), transactionObj)

                //return user data
                return userObj
            } else if (userData.role === 'coach') {

                //create user data object
                const userObj = {
                    uid: id,
                    teamName: userData.teamName,
                    email: userData.email,
                    phone: userData.phone,
                    displayName: userData.fName + ' ' + userData.lName,
                    fName: userData.fName,
                    lName: userData.lName,
                    contactLinks: userData.contactLinks,
                    countryOfOrigin: userData.location,
                    bio: userData.bio,
                    role: userData.role,
                    pfp: 'gs://areregsoft.appspot.com/default_pfp.png',
                    photos: [], 
                    craftCategories: [],
                    registeredFor: [],
                    captain: false,
                    coach: true,
                    crews: []
                }
                setDoc(doc(db, 'users', id), userObj)

                //return user data
                return userObj
            }
        }
    } catch (err) {
        alert(err)
    }
    
}

//take snapshot of a single user, listen for changes and return
export const singleUserListener = async (docId, setCurrentUser) => {
    const docSnap = onSnapshot(doc(db, 'users', docId), (snapShot) => {
        setCurrentUser({...snapShot.data()})
    })
}

//find a user by email
export const getAllUsers = async (email) => {
    const usersQuery = query(collection(db, 'users'))
    const querySnapshot = await getDocs(usersQuery)
    let data = []
    querySnapshot.forEach(doc => data.push({...doc.data(), id: doc.id}))
    return data
}

//intake data from client and create a new race object within the races collection
export const addRace = async (data) => {
    console.log(data)

    try {
        const docRef = await addDoc(collection(db, 'races'), data)
        console.log('past race upload')
        return docRef.id
    } catch (err) {
        //log error to sentry console
        throw new Error('Error in addRace function: ', err)
    }
}

//get a race out of firestore database and overwrite with the new incoming data
export const updateRace = async (updatedRace) => {
    try {
        console.log('updated race: ', updatedRace)
        const raceRef = doc(db, 'races', updatedRace.id)
        await updateDoc(raceRef, {...updatedRace})
    } catch (err) {
        console.log(err)
        //log error to sentry console
        throw new Error('Error in updateRace function: ', err)
    }
}

//get all race docs from the race collection
export const getAllRaces = async () => {
    const raceQuery = query(collection(db, 'races'), orderBy('startDate'))
    const querySnapshot = await getDocs(raceQuery)
    let data = []
    querySnapshot.forEach(doc => data.push({...doc.data(), id: doc.id}))
    return data
}

//take snapshot of race data, listen for any changes and return
export const racesListener = async (setRaceData) => {
    const q = query(collection(db, 'races'), orderBy('startDate'))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const raceData = []
        querySnapshot.forEach(snapDoc => raceData.push({...snapDoc.data(), id: snapDoc.id}))
        setRaceData(raceData)
    })

    return unsubscribe
}

//take snapshot of a single race, listen for any changes and return
export const singleRaceListener = async (docId, setSingleRaceData) => {
    const docSnap = onSnapshot(doc(db, 'races', docId), (snapShot) => {
        setSingleRaceData({...snapShot.data()})
    })
}

//get data on a single race
export const getRace = async (raceId) => {
    const docSnap = await getDoc(doc(db, 'races', raceId))
    return {...docSnap.data()}
}

//pull results data where the results.raceId === incoming raceId
export const resultsTableListener = async (raceId, setResultsObject, racePage) => {
    
    //query for a results table with a raceId that matches incoming raceId
    const q = query(collection(db, 'results'), where('raceId', '==', raceId))
    
    //check to see if the listener is being called from a racePage or from the results page

    if (!racePage) {
        //non racePage call
        //call listener
        const docSnap = onSnapshot(q, async (snapShot) => {
            
            //if no results exist for this race, generate a new table and return it into the state
            if (snapShot.empty) {
                //generate new docRef so that we have the document id
                const docRef = doc(collection(db, 'results'))

                //create newResultsTable object
                const newResultsTable = {
                    id: docRef.id,
                    raceId: raceId,
                    filledHeats: [],
                    results: []
                }
                
                //create results object
                await setDoc(docRef, newResultsTable)
                setResultsObject(newResultsTable)
            }
            else {
                //if results do exist, return them into the resultsObject state
                let resultsArr = []
                snapShot.forEach(result => {
                    console.log(result.data())
                    resultsArr.push(result.data())
                })
                setResultsObject(resultsArr[0])   
            }
        })
    } else {
        //race page call
        //call listener
        const docSnap = onSnapshot(q, async (snapShot) => {
            //create results holder array, map over snapShot result (should only be 1 result object) and return that result object
            let resultsArr = []
            snapShot.forEach(result => {
                console.log(result.data())
                resultsArr.push(result.data())
            })
            setResultsObject(resultsArr[0]) 
        })
    }
}

//get a resultTable out of firestore database and overwrite with the new incoming data
export const updateResultsTable = async (updatedResultsTable) => {
    /* console.log('updatedResultsTable: ', updatedResultsTable) */
    const resultsRef = doc(db, 'results', updatedResultsTable.id)
    await updateDoc(resultsRef, updatedResultsTable)
}

//query all crews created by a specific coach
export const getCrews = async (coachId) => {

    //create crewsRef
    const crewsRef = collection(db, 'crews')

    //query crews where the creator key matches the coachId
    const q = query(crewsRef, where('coach', '==', coachId))

    //create crews array, map over query and push crew data into it, return the crew array
    let crewArray = []
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach(doc => {
        crewArray.push(doc.data())
    })
    return crewArray
    
}

//get a single crew data object
export const getSingleCrew = async (crewId) => {
    const docSnap = await getDoc(doc(db, 'crews', crewId))
    return {...docSnap.data(), id: crewId}
}

//take snapshot of a single crew, listen for any changes and return
export const singleCrewListener = async (crewId, setSelectedCrewObject) => {
    const docSnap = onSnapshot(doc(db, 'crews', crewId), (snapShot) => {
        setSelectedCrewObject({...snapShot.data()})
    })
}

//create a new crew data object
export const addCrew = async (crewData) => {
    setDoc(doc(db, 'crews', crewData.id), crewData)
}

//get the crewData out of firestore database and overwrite with the new incoming data
export const updateCrew = async (updatedCrew) => {
    console.log(updatedCrew)
    const crewRef = doc(db, 'crews', updatedCrew.id)
    await updateDoc(crewRef, {...updatedCrew})
}

//delete a crew data object
export const deleteCrew = async (crewId) => {
    await deleteDoc(doc(db, 'crews', crewId))
}

//get a key
export const getKey = async (keyId) => {
    const docSnap = await getDoc(doc(db, 'keys', keyId))
    return {...docSnap.data()}
}

//transaction documents
//get a transaction document using an orgId
export const getTransactionDoc = async (orgId) => {
    //create ref to transactions collection
    const transactionsRef = collection(db, 'transactions')
    
    //create query
    const q = query(transactionsRef, where('org', '==', orgId))

    //return snapshot data
    const querySnapshot = await getDocs(q) 
    let queryData
    querySnapshot.forEach(doc => {
        queryData = doc.data()
    })
    return queryData
}

export const updateTransactionDoc = async (updatedTransactionObj) => {
    console.log(updatedTransactionObj)
    const transactionsRef = doc(db, 'transactions', updatedTransactionObj.id)
    await updateDoc(transactionsRef, updatedTransactionObj)
}

export function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    console.log(result)
    return result;
}