//craft categories array
export const craftCategories = [
    'V1',
    'V1 - relay',
    'OC1',
    'OC1 - relay',
    'OC2',
    'OC2 - relay',
    'Surfski Double',
    'Surfski Double - relay',
    'Surfski Single - relay',
    'SUP',
    'Surfski Single',
    'V6',
    'V12',
    'War Canoe Single',
    'War Canoe Double',
    'War Canoe 6 Man',
    'War Canoe 11 Man',
    'Dragon Boat 20 Man',
    'Dragon Boat 10 Man'
]

//race distances array
export const raceDistances = {
    'All Race Types': [
        {
            text: 'Any Distance',
            metric: null,
            value: null
        },
        {
            text: '0-500m',
            metric: 'ms',
            value: 500
        },
        {
            text: '1000m',
            metric: 'ms',
            value: 1000
        },
        {
            text: '1500m',
            metric: 'ms',
            value: 1500
        },
        {
            text: '2k-5k',
            metric: 'kms',
            lower: 2,
            upper: 5
        },
        {
            text: '5k-10k',
            metric: 'kms',
            lower: 5,
            upper: 10
        },
        {
            text: '10k-20k',
            metric: 'kms',
            lower: 10,
            upper: 20
        },
        {
            text: '20k +',
            metric: 'kms',
            value: 20
        },
        {
            text: '< 1 Mile',
            metric: 'mi',
            value: 1
        },
        {
            text: '1 Mile - 5 Miles',
            metric: 'mi',
            lower: 1,
            upper: 5
        },
        {
            text: '5 Miles - 10 Miles',
            metric: 'mi',
            lower: 5,
            upper: 10
        },
        {
            text: '10 Miles - 15 Miles',
            metric: 'mi',
            lower: 10,
            upper: 15
        },
        {
            text: '15 Miles - 20 Miles',
            metric: 'mi',
            lower: 15,
            upper: 20
        },
        {
            text: '20+ Miles',
            metric: 'mi',
            value: 20
        }
    ],
    'Sprints': [
        {
            text: 'Any Distance',
            metric: null,
            value: null
        },
        {
            text: '0-500m',
            metric: 'ms',
            value: 500
        },
        {
            text: '1000m',
            metric: 'ms',
            value: 1000
        },
        {
            text: '1500m',
            metric: 'ms',
            value: 1500
        },
    ],
    'Distance': [
        {
            text: 'Any Distance',
            metric: null,
            value: null
        },
        {
            text: '2k-5k',
            metric: 'kms',
            lower: 2,
            upper: 5
        },
        {
            text: '5k-10k',
            metric: 'kms',
            lower: 5,
            upper: 10
        },
        {
            text: '10k-20k',
            metric: 'kms',
            lower: 10,
            upper: 20
        },
        {
            text: '20k +',
            metric: 'kms',
            value: 20
        },
        {
            text: '> 1 Mile',
            metric: 'mi',
            value: 1
        },
        {
            text: '1 Mile - 5 Miles',
            metric: 'mi',
            lower: 1,
            upper: 5
        },
        {
            text: '5 Miles - 10 Miles',
            metric: 'mi',
            lower: 5,
            upper: 10
        },
        {
            text: '10 Miles - 15 Miles',
            metric: 'mi',
            lower: 10,
            upper: 15
        },
        {
            text: '15 Miles - 20 Miles',
            metric: 'mi',
            lower: 15,
            upper: 20
        },
        {
            text: '20+ Miles',
            metric: 'mi',
            value: 20
        }
    ]
}