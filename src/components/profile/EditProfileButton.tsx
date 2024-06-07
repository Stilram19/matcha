import './style.css'

const styles = {
    width: 175,
    height: 41,
    background: '#D9D9D9',
    borderRadius: 6,
    fontSize: 20,
    paddingRight: 8,
};

function EditProfileButton() {
    return (
        <button style={styles} className="lato-black flex flex-wrap items-center justify-evenly" >
            <img src="/icons/pencil.svg" alt="pencil icon" />
            <h3>Edit profile</h3>
        </button>
    )
}

export default EditProfileButton;

/* Rectangle 23 */

// position: absolute;
// width: 175.55px;
// height: 41px;
// left: 130.49px;
// top: 388px;

// background: #D9D9D9;
// border-radius: 6px;
