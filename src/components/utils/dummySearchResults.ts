type SearchResult = {
    id: string;
    firstName: string;
    lastName: string;
    userName: string;
    age: number;
    gender: string;
    sexualPreferences: string;
    profilePicture: string; // URL
}

let dummySearchResults: SearchResult[] = [
    {
        id: '1',
        firstName: 'Omar',
        lastName: 'Bednaoui',
        userName: 'obednaou',
        age: 23,
        gender: 'male',
        sexualPreferences: 'heterosexual',
        profilePicture: 'https://cdn.intra.42.fr/users/c33a9dddabed7298d6a21bfacd7e5f76/obednaou.JPG'
    },
    {
        id: '2',
        firstName: 'Oussama',
        lastName: 'Khiar',
        userName: 'okhiar',
        age: 23,
        gender: 'male',
        sexualPreferences: 'heterosexual',
        profilePicture: 'https://cdn.intra.42.fr/users/c33a9dddabed7298d6a21bfacd7e5f76/obednaou.JPG'
    },
    {
        id: '3',
        firstName: 'Oyoub',
        lastName: 'Ben Hamou',
        userName: 'oben-ham',
        age: 23,
        gender: 'intersex',
        sexualPreferences: 'lesbian',
        profilePicture: 'https://cdn.intra.42.fr/users/c33a9dddabed7298d6a21bfacd7e5f76/obednaou.JPG'
    },
];

export default dummySearchResults;