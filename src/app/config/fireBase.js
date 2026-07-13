// IMPORTS
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  FacebookAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  getDoc,
  deleteDoc,
  onSnapshot,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { uploadToCloudinary } from "../lib/cloudinary";
import {
  successToast,
  errorToast,
  loadingToast,
  updateToast,
} from "@/utils/toast";

// FIREBASE CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyBWnZ82SS81gKxDYjuzyZWid4E1LGJ_zNw",
  authDomain: "hackathon-fd326.firebaseapp.com",
  projectId: "hackathon-fd326",
  storageBucket: "hackathon-fd326.appspot.com",
  messagingSenderId: "753760336430",
  appId: "1:753760336430:web:6141c41ba885c31188bdbf",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getFirestore(app);
export const facebook = new FacebookAuthProvider();

// FALLBACK AVATAR
const fallbackAvatar =
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80";

// MAP SNAPSHOT
const mapSnapshot = (snapshot) =>
  snapshot.docs.map((document) => ({ id: document.id, ...document.data() }));

//  SINGN_UP
export async function signUp(userInfo, router) {
  const { name, email, password } = userInfo;
  try {
    const credentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    await setDoc(doc(db, "users", credentials.user.uid), {
      uid: credentials.user.uid,
      name,
      email,
      photo: fallbackAvatar,
      bio: "New to Luma and ready to share.",
      skills: ["Creator"],
      interests: ["Social", "Photography"],
      followers: [],
      following: [],
      friends: [],
      online: true,
      lastActive: serverTimestamp(),
      createdAt: serverTimestamp(),
    });

    localStorage.setItem(
      "user",
      JSON.stringify({ uid: credentials.user.uid, name, email }),
    );
    successToast("Account created successfully!");
    router.push("/mainDashboard");
  } catch (error) {
    errorToast(error.message);
  }
}

//  LOGIN
export async function logIn(userInfo, router) {
  const { email, password } = userInfo;
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    localStorage.setItem(
      "user",
      JSON.stringify({
        uid: user.user.uid,
        email: user.user.email,
        name: user.user.displayName,
      }),
    );
    successToast("Logged in successfully!");
    router.push("/mainDashboard");
  } catch (error) {
    errorToast(error.message);
  }
}

// login with facebook
export const loginWithFacebook = async (provider) => {
  console.log(provider);
  try {
    const result = await signInWithPopup(auth, facebook);
    await setDoc(
      doc(db, "users", result.user.uid),
      {
        uid: result.user.uid,
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL || fallbackAvatar,
        bio: "Creating, connecting, and sharing in Luma.",
        skills: ["Creator"],
        interests: ["Community"],
        followers: [],
        following: [],
        friends: [],
        online: true,
        lastActive: serverTimestamp(),
        createdAt: serverTimestamp(),
      },
      { merge: true },
    );
    await addDoc(collection(db, "facebookloginuser"), {
      name: result.user.displayName,
      email: result.user.email,
      photo: result.user.photoURL,
      uid: result.user.uid,
    });
    alert("Login Success");
  } catch (e) {
    console.log(`login error ${e}`);
  }
};

//Function to logout user
export const logout = async (router) => {
  try {
    if (auth.currentUser) {
      await updateDoc(doc(db, "users", auth.currentUser.uid), {
        online: false,
        lastActive: serverTimestamp(),
      });
    }
    localStorage.removeItem("user");
    successToast("Logged out successfully!");
    await signOut(auth);
    router.push("/login");
  } catch (e) {
    errorToast(e);
  }
};

// current User profile
const getCurrentUserProfile = async () => {
  const currentUser = auth.currentUser;
  if (!currentUser) return null;
  const userRef = doc(db, "users", currentUser.uid);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    return { id: userSnap.id, ...userSnap.data() };
  }
  // console.log(currentUser, "< - currentUser");
  const profile = {
    uid: currentUser.uid,
    name:
      currentUser.name || currentUser.email?.split("@")[0] || "Luma Creator",
    email: currentUser.email || "",
    photo: currentUser.photoURL || fallbackAvatar,
    bio: "Building a luminous social presence.",
    skills: ["Design", "Community", "Storytelling"],
    interests: ["Photography", "Creative tech", "Culture"],
    followers: [],
    following: [],
    friends: [],
    online: true,
    lastActive: serverTimestamp(),
    createdAt: serverTimestamp(),
  };
  await setDoc(userRef, profile, { merge: true });
  return { id: currentUser.uid, ...profile };
};

// Add-Post in firebase
export async function userCardItem(itemInfo, router) {
  try {
    const id = loadingToast("Uploading Post...");
    const postId = `LUMA-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const { files = [], des, privacy = "Public", richText = "" } = itemInfo;
    const currentUser = await getCurrentUserProfile();

    const uploads = await Promise.all(
      files.map(async (file) => {
        return await uploadToCloudinary(file);
      }),
    );

    const userID =
      JSON.parse(localStorage.getItem("user"))?.uid || currentUser?.uid;
    await setDoc(doc(db, "posts", postId), {
      postId,
      description: des,
      richText,
      privacy,
      media: uploads,
      image: uploads[0]?.url || "",
      authorId: userID,
      authorName: currentUser?.name || "Luma Creator",
      authorPhoto: currentUser?.photo || fallbackAvatar,
      createdAt: serverTimestamp(),
      likes: [],
      commentsCount: 0,
      sharesCount: 0,
      updatedAt: serverTimestamp(),
    });
    updateToast(id, "Uploaded Successfully");
    router.push("/mainDashboard");
  } catch (error) {
    errorToast(error.message);
  }
}

// get Post from firebase
export async function getingAds() {
  const querySnapshot = await getDocs(collection(db, "userItem"));
  const ads = [];
  querySnapshot.forEach((doc) => {
    const ad = doc.data();
    ad.id = doc.id;
    ads.push(ad);
  });
  return ads;
}

// Update Profile
// DAYNAMIC_UPDATE

export async function updateprofile(itemInfo) {
  try {
    console.log(itemInfo, "<-itemInfo");

    const id = loadingToast("Updating profile...");
    const { updateProfile, bio, skills = [], interests = [] } = itemInfo;
    let imgUrl = "";

    if (updateProfile?.name) {
      imgUrl = (await uploadToCloudinary(updateProfile)).url;
    }

    const currentUser = auth.currentUser;
    console.log(itemInfo, "<-itemInfo");
    console.log(currentUser, "<-currentUser");

    if (currentUser) {
      await setDoc(
        doc(db, "users", currentUser.uid),
        {
          photo: imgUrl || currentUser.photoURL || fallbackAvatar,
          bio,
          skills,
          interests,
          updatedAt: serverTimestamp(),
        },
        { merge: true },
      );
    }
    // await addDoc(collection(db, "profile"), {
    //   image: imgUrl || fallbackAvatar,
    // });
    updateToast(id, "Profile updated successfully!");
  } catch (e) {
    errorToast("Failed to update profile.");
  }
}

// get profile
export async function getProfile() {
  const querySnapshot = await getDocs(collection(db, "profile"));
  const ads = [];
  querySnapshot.forEach((doc) => {
    const ad = doc.data();
    ad.id = doc.id;
    ads.push(ad);
  });
  return ads;
}

// FACEBOOK-PROFIE

// get Post from firebase
export async function getFacebookProfile() {
  const querySnapshot = await getDocs(collection(db, "facebookloginuser"));
  const allData = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    data.id = doc.id;
    allData.push(data);
  });
  return allData;
}

export async function getCurrentProfile() {
  return getCurrentUserProfile();
}

export function listenUsers(callback) {
  return onSnapshot(collection(db, "users"), (snapshot) => {
    callback(mapSnapshot(snapshot));
  });
}

export function listenPosts(callback) {
  const postsQuery = query(
    collection(db, "posts"),
    orderBy("createdAt", "desc"),
  );
  return onSnapshot(postsQuery, (snapshot) => callback(mapSnapshot(snapshot)));
}

export async function updatePresence(online = true) {
  if (!auth.currentUser) return;
  await setDoc(
    doc(db, "users", auth.currentUser.uid),
    { online, lastActive: serverTimestamp() },
    { merge: true },
  );
}

export async function followUser(targetUser) {
  const currentUser = await getCurrentUserProfile();
  if (!currentUser || currentUser.uid === targetUser.uid) return;
  const following = Array.from(
    new Set([...(currentUser.following || []), targetUser.uid]),
  );
  await setDoc(
    doc(db, "users", currentUser.uid),
    { following },
    { merge: true },
  );
  const targetRef = doc(db, "users", targetUser.uid);
  const targetSnap = await getDoc(targetRef);
  const target = targetSnap.data() || {};
  const followers = Array.from(
    new Set([...(target.followers || []), currentUser.uid]),
  );
  await setDoc(targetRef, { followers }, { merge: true });
  await createNotification(targetUser.uid, {
    type: "follow",
    title: "New follower",
    body: `${currentUser.name} started following you.`,
  });
}

export async function unfollowUser(targetUser) {
  const currentUser = await getCurrentUserProfile();
  if (!currentUser) return;
  await setDoc(
    doc(db, "users", currentUser.uid),
    {
      following: (currentUser.following || []).filter(
        (uid) => uid !== targetUser.uid,
      ),
    },
    { merge: true },
  );
}

export async function sendFriendRequest(targetUser) {
  const currentUser = await getCurrentUserProfile();
  if (!currentUser || currentUser.uid === targetUser.uid) return;
  const requestId = [currentUser.uid, targetUser.uid].sort().join("_");
  await setDoc(doc(db, "friendRequests", requestId), {
    from: currentUser.uid,
    fromName: currentUser.name,
    fromPhoto: currentUser.photo || fallbackAvatar,
    to: targetUser.uid,
    toName: targetUser.name,
    status: "pending",
    createdAt: serverTimestamp(),
  });
  await createNotification(targetUser.uid, {
    type: "friend-request",
    title: "Friend request",
    body: `${currentUser.name} sent you a friend request.`,
  });
}

export function listenFriendRequests(callback) {
  if (!auth.currentUser) return () => {};
  const requestsQuery = query(
    collection(db, "friendRequests"),
    where("to", "==", auth.currentUser.uid),
    where("status", "==", "pending"),
  );
  return onSnapshot(requestsQuery, (snapshot) =>
    callback(mapSnapshot(snapshot)),
  );
}

export async function respondFriendRequest(request, accepted) {
  const requestRef = doc(db, "friendRequests", request.id);
  await updateDoc(requestRef, { status: accepted ? "accepted" : "rejected" });
  if (!accepted) return;
  const currentUser = await getCurrentUserProfile();
  const requesterRef = doc(db, "users", request.from);
  const requesterSnap = await getDoc(requesterRef);
  const requester = requesterSnap.data() || {};
  await setDoc(
    doc(db, "users", currentUser.uid),
    {
      friends: Array.from(
        new Set([...(currentUser.friends || []), request.from]),
      ),
    },
    { merge: true },
  );
  await setDoc(
    requesterRef,
    {
      friends: Array.from(
        new Set([...(requester.friends || []), currentUser.uid]),
      ),
    },
    { merge: true },
  );
  await createNotification(request.from, {
    type: "friend-accepted",
    title: "Friend request accepted",
    body: `${currentUser.name} accepted your request.`,
  });
}

export function listenNotifications(callback) {
  if (!auth.currentUser) return () => {};
  const notificationsQuery = query(
    collection(db, "notifications"),
    where("to", "==", auth.currentUser.uid),
    orderBy("createdAt", "desc"),
  );
  return onSnapshot(notificationsQuery, (snapshot) =>
    callback(mapSnapshot(snapshot)),
  );
}

export async function createNotification(to, payload) {
  await addDoc(collection(db, "notifications"), {
    to,
    read: false,
    createdAt: serverTimestamp(),
    ...payload,
  });
}

const conversationIdFor = (a, b) => [a, b].sort().join("_");

export function listenMessages(otherUserId, callback) {
  if (!auth.currentUser || !otherUserId) return () => {};
  const conversationId = conversationIdFor(auth.currentUser.uid, otherUserId);
  const messagesQuery = query(
    collection(db, "conversations", conversationId, "messages"),
    orderBy("createdAt", "asc"),
  );
  return onSnapshot(messagesQuery, (snapshot) =>
    callback(mapSnapshot(snapshot)),
  );
}

export async function sendMessage(otherUser, text) {
  const currentUser = await getCurrentUserProfile();
  if (!currentUser || !text.trim()) return;
  const conversationId = conversationIdFor(currentUser.uid, otherUser.uid);
  await setDoc(
    doc(db, "conversations", conversationId),
    {
      participants: [currentUser.uid, otherUser.uid],
      lastMessage: text.trim(),
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  );
  await addDoc(collection(db, "conversations", conversationId, "messages"), {
    from: currentUser.uid,
    to: otherUser.uid,
    text: text.trim(),
    createdAt: serverTimestamp(),
  });
  await createNotification(otherUser.uid, {
    type: "message",
    title: "New message",
    body: `${currentUser.name}: ${text.trim().slice(0, 80)}`,
  });
}

export async function removeNotification(id) {
  await deleteDoc(doc(db, "notifications", id));
}
