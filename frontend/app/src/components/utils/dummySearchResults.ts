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
        profilePicture: 'https://cdn.intra.42.fr/users/b752273cac16bd0fb1cf7195cde87d06/okhiar.JPG'
    },
    {
        id: '3',
        firstName: 'Oyoub',
        lastName: 'Ben Hamou',
        userName: 'oben-ham',
        age: 23,
        gender: 'intersex',
        sexualPreferences: 'lesbian',
        profilePicture: 'https://cdn.intra.42.fr/users/b7eb31b25645d03918e9c54265ad7f9a/aben-ham.jpg'
    },
];

export default dummySearchResults;