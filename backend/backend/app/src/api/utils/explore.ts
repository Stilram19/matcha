export function getMatchingSexualOrientation(gender: string, sexualPreference: string): string[] {
    if (sexualPreference === 'homosexual') {
        return (['homosexual', 'bisexual-male']);
    }

    if (sexualPreference === 'bisexual-male') {
        return (['homosexual', 'bisexual-female', 'bisexual-male', 'heterosexual']);
    }

    if (sexualPreference === 'bisexual-female') {
        return (['lesbian', 'bisexual-male', 'bisexual-female', 'heterosexual']);
    }

    if (sexualPreference === 'lesbian') {
        return (['lesbian', 'bisexual-female']);
    }

    if (sexualPreference === 'heterosexual') {
        const ret = ['heterosexual'];
        let bis = gender === 'male' || gender === 'transgender-male' ? 'bisexual-female' : 'bisexual-male';

        ret.push(bis);
        return (ret);
    }

    return [];
}

export function getOppositeGenders(gender: string): string[] {
    if (gender === 'male' || gender === 'transgender-male') {
        return ['female', 'transgender-female'];
    }

    return ['male', 'transgender-male'];
}
