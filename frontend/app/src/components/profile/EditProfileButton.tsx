import './style.css'

const styles = {
    width: 175,
    height: 41,
    background: '#D9D9D9',
    borderRadius: 6,
    fontSize: 20,
    paddingRight: 8,
};

type EditProfileButtonProps = {
    handleEditButtonClick: () => void;
};

function EditProfileButton({handleEditButtonClick}: EditProfileButtonProps) {
    function handleClick() {
        handleEditButtonClick();
    }

    return (
        <button onClick={handleClick} style={styles} className="hover:scale-105 lato-black flex flex-wrap items-center justify-evenly" >
            <img src="/icons/pencil.svg" alt="pencil icon" />
            <h3>Edit profile</h3>
        </button>
    )
}

export default EditProfileButton;
