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

export async function retrieveProfileInfosService(userId: number): Promise<ProfileInfos | undefined> {
    if (userId < 1 || userId > 3) {
        return (undefined);
    }

    const userInfos = await getUserInfos(userId);
    const interests = await getUserInterests(userId);
    const userPhotos = await getUserPhotos(userId);

    return ({userInfos, interests, userPhotos});
}

export async function retrieveBriefProfileInfosService(userId: number): Promise<BriefProfileInfos | undefined> {
    if (userId < 1 || userId > 3) {
        return (undefined);
    }
    return (dummyBriefProfileInfos[userId - 1]);
}

export async function updateUserInterestsService(userId: number, interests: string[]) {

}

export async function addUserInterestsService(userId: number, interests: string[]) {
    
}

async function removeUserConnection(blockingUserId: number, blockedUserId: number) {

}

async function addBlockedUser(blockingUserId: number, blockedUserId: number) {

}

export async function blockUserService(blockingUserId: number, blockedUserId: number) {
    await removeUserConnection(blockingUserId, blockedUserId);
    await addBlockedUser(blockingUserId, blockedUserId);
}

export async function reportFakeAccountService(reportedUserId: number) {

}

export async function likeProfileService(likingUserId: number, likedUserId: number) {

}

export async function unlikeProfileService(unlikingUserId: number, unlikedUserId: number) {

}

export async function isBlockedService(blockingUserId: number, blockedUserId: number) {
    return (false);
}