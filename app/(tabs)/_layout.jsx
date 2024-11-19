import { Tabs } from "expo-router";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHouse, faPerson, faFlagCheckered, faLock } from "@fortawesome/free-solid-svg-icons";

export default function TabLayout() {
    return (
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
                    href: {
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
            <Tabs.Screen
                name="auth"
                options={{
                title: 'Log-in',
                headerShown: false,
                tabBarIcon: ({ color }) => <FontAwesomeIcon size={28} icon={faLock} color={color} />,
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
    )
}