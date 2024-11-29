import { Tabs } from "expo-router";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHouse, faPerson, faFlagCheckered, faLock, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { AuthContextProvider } from "../firebase/authContext";

//firebase auth import
import { firebaseAuth } from "../firebaseConfig";

export default function TabLayout() {

    console.log('current user: ', firebaseAuth.currentUser)

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
                        href: !firebaseAuth.currentUser ? null : {
                            pathname: '/[racer]',
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
                {firebaseAuth.currentUser ? 
                    <Tabs.Screen
                        name="logout"
                        options={{
                        title: 'Log Out',
                        headerShown: false,
                        tabBarIcon: ({ color }) => <FontAwesomeIcon size={28} icon={faRightFromBracket} color={'red'} />,
                        }}
                    />
                :
                    <Tabs.Screen
                        name="auth"
                        options={{
                        title: 'Log-in',
                        headerShown: false,
                        tabBarIcon: ({ color }) => <FontAwesomeIcon size={28} icon={faLock} color={color} />,
                        }}
                    />
                }
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