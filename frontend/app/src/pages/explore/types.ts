export type MatchedUserSummaryProps = {
    id: string;
    firstName: string;
    lastName: string;
    age: number;
    fameRating: number;
    gender: string;
}

export type BioAndInterestsProps = {
    biography: string;
    userInterests: Set<string>;
};
