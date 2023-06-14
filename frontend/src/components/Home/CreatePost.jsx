import { useEffect, useRef, useState } from 'react';
import styles from './createPost.module.scss';
import EmojiPicker from 'emoji-picker-react';
import axios from 'axios';

import PropTypes from 'prop-types';

export default function CreatePost({ user }) {
    const [text, setText] = useState('');
    const [emojiPick, setEmojiPick] = useState(true);
    const [cursorPosition, setCursorPosition] = useState();
    // const [loading, setLoading] = useState(false);

    const textRef = useRef(null);

    useEffect(() => {
        textRef.current.selectionEnd = cursorPosition;
    }, [cursorPosition]);

    const handleTextChange = (e) => {
        console.log('text', e.target.value);
        setText(e.target.value);
    };
    const handleEmoji = ({ emoji }) => {
        const ref = textRef.current;
        ref.focus();
        const start = text.substring(0, ref.selectionStart);
        const end = text.substring(ref.selectionStart);
        const newText = start + emoji + end;
        setText(newText);
        setCursorPosition(start.length + emoji.length);
    };

    const postSubmit = async () => {
        // setLoading(true);
        await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/create-post`,
            {
                text,
                user: user.id,
            },
            {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            }
        );
        // setLoading(false);
    };
    return (
        <div className={styles.createPost}>
            <div className={styles.createPost_header}>
                <img
                    src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                    alt=""
                    srcSet=""
                />
                <div className={styles.open_post}>
                    <textarea
                        ref={textRef}
                        maxLength="400"
                        value={text}
                        type="text"
                        placeholder="What's on your mind?"
                        onChange={handleTextChange}
                        className={styles.open_post_textarea}
                    ></textarea>
                </div>
                <div className={styles.post_emojis_wrap}>
                    <img
                        src="/assets/home/emoji.svg"
                        alt=""
                        srcSet=""
                        onClick={() => setEmojiPick(!emojiPick)}
                    />
                </div>
            </div>
            <div className={styles.emoji_picker_wrap}>
                <div className={styles.emoji_picker}>
                    {!emojiPick && <EmojiPicker onEmojiClick={handleEmoji} />}
                </div>
            </div>

            <div className={styles.create_splitter}></div>

            {/* TODO: Complete the image import later
             */}
            {/* <div className={styles.createPost_body}>
                <div className={`${styles.createPost_icon} ${styles.hover}`}>
                    <img src="/assets/home/image.svg" alt="" />
                </div>
            </div> */}
            <div className={styles.createPost_submit}>
                <button
                    className={styles.post_submit}
                    onClick={() => {
                        postSubmit();
                    }}
                    // disabled={loading}
                >
                    Create Post
                </button>
            </div>
        </div>
    );
}
CreatePost.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        token: PropTypes.string.isRequired,
    }).isRequired,
};
