type GenderProps = {
    gender: string;
    iconsFolder: string;
};

function Gender({gender, iconsFolder}: GenderProps) {
    function genderIconPath(): string {
        let svgPath = '';
        const genders = new Set(['male', 'female', 'intersex', 'non-binary', 'transgender']);

        if (genders.has(gender)) {
            svgPath = `${iconsFolder}/${gender}.svg`;
        }

        console.log(`${gender} ${svgPath}`);

        return svgPath;
    }

    return (
        <img src={genderIconPath()} alt="gender icon"></img>
    )
}

export default Gender;