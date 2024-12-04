import { Tabs } from "expo-router";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHouse, faPerson, faFlagCheckered, faLock, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { AuthContextProvider } from "../firebase/authContext";
import { useState } from "react";
import { install } from 'react-native-quick-crypto';

//firebase auth import
import { firebaseAuth } from "../firebaseConfig";

export default function TabLayout() {

    /* console.log('current user: ', firebaseAuth.currentUser) */

    /* const [firebaseAuth, setFirebaseAuth] = useState({currentUser: true}) */

    //override global.Buffer and global.crypto 
    install();

    
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