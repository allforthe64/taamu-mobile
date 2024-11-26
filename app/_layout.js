import { Stack } from "expo-router";

import { Platform } from 'react-native';
import { useEffect } from 'react';


export default function Layout() {

    useEffect(() => {
        const testFetch = async () => {
          console.log('running')
          try {
            await fetch('http://localhost:3000/api/tm-dblink', {
              body: JSON.stringify({ target: "races" }),
              method: "POST"
            }).then((response) => 
              {
                console.log(response)
                return response.json()
              }).then((data) => console.log('data: ', data))
          } catch (err) {
            console.log(err)
          }
          
        }
        testFetch()
      }, [])

    return (

        <Stack>
            <Stack.Screen name="(tabs)" options={{headerShown: false}} />
        </Stack>
    )
}