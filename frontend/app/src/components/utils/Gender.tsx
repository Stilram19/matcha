type GenderProps = {
    gender: string;
    iconsFolder: string;
};

function Gender({gender, iconsFolder}: GenderProps) {
    console.log(gender);
    function genderIconPath(): string {
        let svgPath = '';
        const genders = new Set(['male', 'female', 'intersex', 'non-binary', 'transgender']);

        if (genders.has(gender)) {
            svgPath = `${iconsFolder}/${gender}.svg`;
        }

        return svgPath;
    }

    return (
        <img src={genderIconPath()} alt="gender icon" style={{width: 24}}></img>
    )
}

export default Gender;