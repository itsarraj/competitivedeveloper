import { useState } from 'react';
import styles from './createPost.module.scss';
import EmojiPicker from 'emoji-picker-react';
export default function CreatePost({ user }) {
    const [text, setText] = useState('');
    const [emojiPick, setEmojiPick] = useState(true);
    const handleTextChange = (e) => {
        console.log('text', e.target.value);
        setText(e.target.value);
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
                        maxLength="100"
                        value={text}
                        type="text"
                        placeholder="What's on your mind?"
                        onChange={handleTextChange}
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
                    {!emojiPick && <EmojiPicker />}
                </div>
            </div>

            <div className={styles.create_splitter}> </div>

            <div className={styles.createPost_body}>
                <div className={`${styles.createPost_icon} ${styles.hover}`}>
                    <img src="/assets/home/image.svg" alt="" />
                </div>
            </div>
        </div>
    );
}
