export type ProfileInfos = {
    userInfos: UserInfos;
    interests: string[];
    userPhotos: string[];
}

export type UserInfos = {
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
    fameRating: number;
};

export type BriefProfileInfos = {
    id: string;
    firstName: string;
    lastName: string;
    userName: string;
    age: number;
    gender: string;
    sexualPreferences: string;
    biography: string;
    profilePicture: string;
};

export type updateProfilePersonalInfos = {
    profilePicturePath: string | null;
    username: string;
    firstname: string;
    lastname: string;
    gender: string;
    biography: string;
    sexualPreference: string;
};