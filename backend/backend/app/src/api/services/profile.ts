import { dummyProfileInfos } from "../helpers/constant.js";
import { ProfileInfos, UserInfos } from "../types/profile.js";

async function getUserInterests(userId: number): Promise<Set<string>> {
    return (dummyProfileInfos[0].interests);
}

async function getUserPhotos(userId: number): Promise<string[]> {
    return (dummyProfileInfos[0].userPhotos);
}

async function getUserInfos(userId: number): Promise<UserInfos> {
    return (dummyProfileInfos[0].userInfos);
}

export async function retrieveProfileInfos(userId: number): Promise<ProfileInfos> {
    const userInfos = await getUserInfos(userId);
    const interests = await getUserInterests(userId);
    const userPhotos = await getUserPhotos(userId);

    return ({userInfos, interests, userPhotos});
}
