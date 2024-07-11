import './style.css'

const styles = {
    width: 175,
    height: 41,
    background: '#D9D9D9',
    borderRadius: 6,
    fontSize: 20,
    paddingRight: 8,
};

type UnlikeProfileButtonProps = {
    handleUnlikeButtonClick: () => void;
};

function UnlikeProfileButton({handleUnlikeButtonClick}: UnlikeProfileButtonProps) {
    function handleClick() {
        handleUnlikeButtonClick();
    }

    return (
        <button onClick={handleClick} style={styles} className="hover:scale-105 lato-black flex flex-wrap items-center justify-evenly" >
            <img src="/icons/unlikeHeart.svg" alt="unlikeHeart icon" />
            <h3 className="sm:mr-7">Unlike</h3>
        </button>
    )
}

export default UnlikeProfileButton;
