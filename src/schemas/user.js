import { serverTimestamp } from "firebase/firestore/lite";

function userSchema(user) {
    const userRef = user.user
    console.log(userRef.uid)
    return {
        created: serverTimestamp(),
        uid: userRef.uid,
        email: userRef.email,
        bio: "",
        likedPosts: [],
        folowers: [],
        following: [],
        posts: [],
    }
}

export default userSchema;
