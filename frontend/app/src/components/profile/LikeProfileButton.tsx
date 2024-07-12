import './style.css'

const styles = {
    width: 175,
    height: 41,
    background: '#D9D9D9',
    borderRadius: 6,
    fontSize: 20,
    paddingRight: 8,
};

type LikeProfileButtonProps = {
    handleLikeButtonClick: () => void;
};

function LikeProfileButton({handleLikeButtonClick}: LikeProfileButtonProps) {
    function handleClick() {
        handleLikeButtonClick();
    }

    return (
        <button onClick={handleClick} style={styles} className="hover:scale-105 lato-black flex flex-wrap items-center justify-evenly" >
            <img src="/icons/likeHeart.svg" alt="likeHeart icon" />
            <h3 className="mr-8 sm:mr-10">Like</h3>
        </button>
    )
}

export default LikeProfileButton;
