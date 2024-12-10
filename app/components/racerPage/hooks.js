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
