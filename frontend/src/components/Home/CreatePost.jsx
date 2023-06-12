import styles from './createPost.module.scss';

export default function CreatePost({ user }) {
    return (
        <div className={styles.createPost}>
            <div className={styles.createPost_header}>
                <img
                    src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                    alt=""
                    srcSet=""
                />
                <div className={styles.open_post}>
                    <input type="text" placeholder="What's on your mind?" />
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
