import { dummyBriefProfileInfos, dummyProfileInfos } from "../helpers/constant.js";
import { BriefProfileInfos, ProfileInfos, UserInfos } from "../types/profile.js";

async function getUserInterests(userId: number): Promise<string[]> {
    return (dummyProfileInfos[userId - 1].interests);
}

async function getUserPhotos(userId: number): Promise<string[]> {
    return (dummyProfileInfos[userId - 1].userPhotos);
}

async function getUserInfos(userId: number): Promise<UserInfos> {
    return (dummyProfileInfos[userId - 1].userInfos);
}

export async function retrieveProfileInfos(userId: number): Promise<ProfileInfos | undefined> {
    if (userId < 1 || userId > 3) {
        return (undefined);
    }

    const userInfos = await getUserInfos(userId);
    const interests = await getUserInterests(userId);
    const userPhotos = await getUserPhotos(userId);

    return ({userInfos, interests, userPhotos});
}

export async function retrieveBriefProfileInfos(userId: number): Promise<BriefProfileInfos | undefined> {
    if (userId < 1 || userId > 3) {
        return (undefined);
    }
    return (dummyBriefProfileInfos[userId - 1]);
}
