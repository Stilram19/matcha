export type MatchedUserSummaryProps = {
    firstName: string;
    lastName: string;
    gender: string;
}

export type BioAndInterestsProps = {
    biography: string;
    userInterests: Set<string>;
};
