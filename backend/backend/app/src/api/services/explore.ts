import { dummyProfileInfos } from "../helpers/constant.js";
import { Filters } from "../types/explore.js";

export async function getRecommendedProfilesService(userId: number, filters: Filters) {
    return (dummyProfileInfos);
}
