import './style.css'

const styles = {
    width: 175,
    height: 41,
    background: '#D9D9D9',
    borderRadius: 6,
    fontSize: 20,
    paddingRight: 8,
};

type LikeBackProfileButtonProps = {
    handleLikeBackButtonClick: () => void;
};

function LikeBackProfileButton({handleLikeBackButtonClick}: LikeBackProfileButtonProps) {
    function handleClick() {
        handleLikeBackButtonClick();
    }

    return (
        <button onClick={handleClick} style={styles} className="hover:scale-105 lato-black flex flex-wrap items-center justify-evenly" >
            <img src="/icons/likeHeart.svg" alt="likeHeart icon" />
            <h3 className="sm:mr-3">Like Back</h3>
        </button>
    )
}

export default LikeBackProfileButton;
