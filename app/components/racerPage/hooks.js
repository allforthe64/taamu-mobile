//add the new link to the array of external
export const addLink = (input, setterFunction, setterFunction1) => {
    setterFunction(prev => [input, ...prev])
    setterFunction1('')
}

//add the new category to the array of craftCategories
export const addCategory = (input, setterFunction, setterFunction1) => {
    setterFunction(prev => [input, ...prev])
    setterFunction1('')
}

//set array of links to every link that isn't the one being removed
export const removeLink = (input, setterFunction) => {
    setterFunction(prev => prev.filter(currLink => currLink !== input))
}

//set array of craft cats to every cat that isn't the one being removed
export const removeCategory = (input, setterFunction) => {
    setterFunction(prev => prev.filter(currCategory => currCategory !== input))
}

export const encrypt = async (input, keyData) => {
    const url = 'https://tuarolife.com/api/wl4h8nrciBCNXW9IybL2'; // Replace with your API URL
    const key = keyData.key /* '84f863ea1090484b804f4ac1bc12b677' */
    const iv = keyData.iv /* 'a4c3a43d571b53a3' */

    try {
        const response = await fetch(url, {
        method: 'POST', // Specifies the request method
        headers: {
            'Content-Type': 'application/json', // Sets the request body as JSON
            'Authorization': 'Bearer your-token', // Optional: Add an authorization token if needed
        },
        body: JSON.stringify({payload: input, key: key, iv: iv}), // Converts the payload to JSON string
        });

        // Check if the response was successful
        if (response.ok) {
            const data = await response.json(); // Parse JSON response
            return data
        } else {
        console.error('Failed to send data:', response.status);
        }
    } catch (error) {
        console.error('Error sending POST request:', error);
    }
}
