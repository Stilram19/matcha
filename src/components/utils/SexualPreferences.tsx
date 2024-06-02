type SexualPreferencesProps = {
    sexualPreference: string;
    iconsFolder: string;
};

function SexualPreferences({sexualPreference, iconsFolder}: SexualPreferencesProps) {
    let iconWidth = 32;

    if (sexualPreference == 'homosexual') {
        iconWidth = 28;
    }

    if (sexualPreference == 'bisexual-male' || sexualPreference == 'bisexual-female') {
        iconWidth = 40;
    }

    function sexualPreferencesIconPath(): string {
        let svgPath = '';
        const sexualPreferences = new Set(['heterosexual', 'bisexual-male', 'bisexual-female', 'homosexual', 'lesbian']);

        if (sexualPreferences.has(sexualPreference)) {
            svgPath = `${iconsFolder}/${sexualPreference}.svg`;
        }

        console.log(`${sexualPreference} ${svgPath}`);

        return svgPath;
    }

    return (
        <img src={sexualPreferencesIconPath()} width={iconWidth} alt="sexual preferences icon"></img>
    )
}

export default SexualPreferences;