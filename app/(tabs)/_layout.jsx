import { Tabs } from "expo-router";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHouse, faPerson, faFlagCheckered, faLock, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { AuthContextProvider } from "../firebase/authContext";
import { useState, useEffect } from "react";

//firebase auth import
import { firebaseAuth } from "../firebaseConfig";

export default function TabLayout() {

    /* const [firebaseAuth, setFirebaseAuth] = useState({currentUser: true}) */
    const racer = firebaseAuth?.currentUser?.uid
    console.log('racer: ', racer)
    const [racerData, setRacerData] = useState()

    //grab racer data
    useEffect(() => {
        if (racer) {
            alert('running useEffect')
            //activate single user listener based on the id passed through the url params
            const getRacerData = async () => {
                const unsubscribe = await singleUserListener(racer, setRacerData)
                return () => unsubscribe()
            }
            getRacerData()
        } 
      }, [racer])

      console.log(racerData)
  
    
    return (
        <AuthContextProvider>
            <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
                <Tabs.Screen
                    name="index"
                    options={{
                    title: 'Home',
                    headerShown: false,
                    tabBarIcon: ({ color }) => <FontAwesomeIcon size={28} icon={faHouse} color={color} />,
                    }}
                />
                <Tabs.Screen
                    name="[racer]"
                    options={{
                        title: 'Racer Page',
                        headerShown: false,
                        tabBarIcon: ({ color }) => <FontAwesomeIcon size={28} icon={faPerson} color={color} />,
                        href: firebaseAuth.currentUser === null ? null : {
                            pathname: `/[${firebaseAuth.currentUser}]`,
                            params: {
                                racer: 'foobar'
                            }
                        }
                    }}
                />
                <Tabs.Screen
                    name="races"
                    options={{
                    title: 'Search Races',
                    headerShown: false,
                    tabBarIcon: ({ color }) => <FontAwesomeIcon size={28} icon={faFlagCheckered} color={color} />,
                    }}
                />
                <Tabs.Screen
                    name="logout"
                    options={{
                    title: 'Log Out',
                    headerShown: false,
                    tabBarIcon: ({ color }) => <FontAwesomeIcon size={28} icon={faRightFromBracket} color={'red'} />,
                    href: firebaseAuth.currentUser !== null ? {pathname: '/logout'} : null
                    }}
                />
                <Tabs.Screen
                    name="auth"
                    options={{
                    title: 'Log-in',
                    headerShown: false,
                    tabBarIcon: ({ color }) => <FontAwesomeIcon size={28} icon={faLock} color={color} />,
                    href: firebaseAuth.currentUser !== null ? null : {pathname: '/auth'}
                    }}
                />
                <Tabs.Screen
                    name="register"
                    options={{
                    title: 'Register',
                    headerShown: false,
                    tabBarIcon: ({ color }) => <FontAwesomeIcon size={28} icon={faLock} color={color} />,
                    href: null
                    }}
                />
            </Tabs>
        </AuthContextProvider>
    )
}