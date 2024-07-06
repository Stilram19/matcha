export type ProfileInfos = {
    id: string;
    isSelf: boolean;
    isLiked: boolean;
    isLiking: boolean;
    firstName: string;
    lastName: string;
    userName: string;
    age: number;
    gender: string;
    sexualPreferences: string;
    profilePicture: string; // URL
    biography: string;
    interests: Set<string>;
    userPhotos: string[];
    fameRating: number; // number of stars
}

let dummyProfileInfos: ProfileInfos[] = [
    {
        id: '1',
        isSelf: true,
        isLiked:false,
        isLiking: false,
        firstName: 'Omar',
        lastName: 'Bednaoui',
        userName: 'obednaou',
        age: 23,
        gender: 'male',
        sexualPreferences: 'heterosexual',
        profilePicture: 'https://cdn.intra.42.fr/users/c33a9dddabed7298d6a21bfacd7e5f76/obednaou.JPG',
        biography: 'Hey there, I am using matcha. Looking for someone to share sunsets and spontaneous road trips. let’s make memories together.',
        interests: new Set(['science', 'history', 'travel']),
        userPhotos: [],
        fameRating: 4,
    },
    {
        id: '2',
        isSelf: false,
        isLiked:true,
        isLiking: false,
        firstName: 'Oussama',
        lastName: 'Khiar',
        userName: 'okhiar',
        age: 23,
        gender: 'male',
        sexualPreferences: 'heterosexual',
        profilePicture: 'https://cdn.intra.42.fr/users/b752273cac16bd0fb1cf7195cde87d06/okhiar.JPG',
        biography: 'Hey there, I am using matcha. Looking for someone to share sunsets and spontaneous road trips. let’s make memories together.',
        interests: new Set(['science', 'history', 'travel']),
        userPhotos: [],
        fameRating: 4,
    },
    {
        id: '3',
        isSelf: true,
        isLiked:true,
        isLiking: false,
        firstName: 'Oyoub',
        lastName: 'Ben Hamou',
        userName: 'oben-ham',
        age: 23,
        gender: 'intersex',
        sexualPreferences: 'lesbian',
        profilePicture: 'https://cdn.intra.42.fr/users/b7eb31b25645d03918e9c54265ad7f9a/aben-ham.jpg',
        biography: 'Hey there, I am using matcha. Looking for f****a to share sunsets and spontaneous road trips. let’s make memories together. I am working hard on post common core cursus to show her how smart and disciplined I am.',
        interests: new Set(['science', 'history', 'travel']),
        userPhotos: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjNCQuPKwuASXizfHpDfreaYgQRFZLnkb6tA&s', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjNCQuPKwuASXizfHpDfreaYgQRFZLnkb6tA&s', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjNCQuPKwuASXizfHpDfreaYgQRFZLnkb6tA&s', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjNCQuPKwuASXizfHpDfreaYgQRFZLnkb6tA&s'],
        fameRating: 4,
    },
];

export default dummyProfileInfos;