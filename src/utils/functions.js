async function initailizeUser() {
    const docSnap = await getDoc(doc(db, "users", currentUser.uid));
    if (!docSnap.exists) {
      await setDoc(doc(db, "users", currentUser.uid), {
        uid: currentUser.uid,
        name: currentUser.displayName,
        email: currentUser.email,
        profilePic: currentUser.photoURL,
        folowers: [],
        following: [],
      });
    } else {
      console.log("user already exists");
    }
  }
  