type ProfileInfos = {
    id: string;
    firstName: string;
    lastName: string;
    userName: string;
    age: number;
    gender: string;
    sexualPreferences: string;
    profilePicture: string; // URL
    biography: string;
    tags: Set<string>;
    userPhotos: Set<string>; // the key is URL, each one is unique
    fameRating: number; // stars count
}

let dummyProfileInfos: ProfileInfos[] = [
    {
        id: '1',
        firstName: 'Omar',
        lastName: 'Bednaoui',
        userName: 'obednaou',
        age: 23,
        gender: 'male',
        sexualPreferences: 'heterosexual',
        profilePicture: 'https://cdn.intra.42.fr/users/c33a9dddabed7298d6a21bfacd7e5f76/obednaou.JPG',
        biography: 'Hey there, I am using matcha. Looking for someone to share sunsets and spontaneous road trips. let’s make memories together.',
        tags: new Set(['science', 'history', 'travel']),
        userPhotos: new Set(['https://cdn.intra.42.fr/users/c33a9dddabed7298d6a21bfacd7e5f76/obednaou.JPG', 'https://cdn.intra.42.fr/users/c33a9dddabed7298d6a21bfacd7e5f76/obednaou.JPG', 'https://cdn.intra.42.fr/users/c33a9dddabed7298d6a21bfacd7e5f76/obednaou.JPG', 'https://cdn.intra.42.fr/users/c33a9dddabed7298d6a21bfacd7e5f76/obednaou.JPG']),
        fameRating: 4,
    },
    {
        id: '2',
        firstName: 'Oussama',
        lastName: 'Khiar',
        userName: 'okhiar',
        age: 23,
        gender: 'male',
        sexualPreferences: 'heterosexual',
        profilePicture: 'https://cdn.intra.42.fr/users/b752273cac16bd0fb1cf7195cde87d06/okhiar.JPG',
        biography: 'Hey there, I am using matcha. Looking for someone to share sunsets and spontaneous road trips. let’s make memories together.',
        tags: new Set(['science', 'history', 'travel']),
        userPhotos: new Set(['https://cdn.intra.42.fr/users/b752273cac16bd0fb1cf7195cde87d06/okhiar.JPG', 'https://cdn.intra.42.fr/users/b752273cac16bd0fb1cf7195cde87d06/okhiar.JPG', 'https://cdn.intra.42.fr/users/b752273cac16bd0fb1cf7195cde87d06/okhiar.JPG', 'https://cdn.intra.42.fr/users/b752273cac16bd0fb1cf7195cde87d06/okhiar.JPG']),
        fameRating: 4,
    },
    {
        id: '3',
        firstName: 'Oyoub',
        lastName: 'Ben Hamou',
        userName: 'oben-ham',
        age: 23,
        gender: 'intersex',
        sexualPreferences: 'lesbian',
        profilePicture: 'https://cdn.intra.42.fr/users/b7eb31b25645d03918e9c54265ad7f9a/aben-ham.jpg',
        biography: 'Hey there, I am using matcha. Looking for someone to share sunsets and spontaneous road trips. let’s make memories together.',
        tags: new Set(['science', 'history', 'travel']),
        userPhotos: new Set(['https://cdn.intra.42.fr/users/b7eb31b25645d03918e9c54265ad7f9a/aben-ham.jpg', 'https://cdn.intra.42.fr/users/b7eb31b25645d03918e9c54265ad7f9a/aben-ham.jpg', 'https://cdn.intra.42.fr/users/b7eb31b25645d03918e9c54265ad7f9a/aben-ham.jpg', 'https://cdn.intra.42.fr/users/b7eb31b25645d03918e9c54265ad7f9a/aben-ham.jpg']),
        fameRating: 4,
    },
];

export default dummyProfileInfos;