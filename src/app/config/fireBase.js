import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  FacebookAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
//
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  setDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

//
// OLD
// const firebaseConfig = {
//   apiKey: "AIzaSyBWnZ82SS81gKxDYjuzyZWid4E1LGJ_zNw",
//   authDomain: "hackathon-fd326.firebaseapp.com",
//   projectId: "hackathon-fd326",
//   storageBucket: "hackathon-fd326.appspot.com",
//   messagingSenderId: "753760336430",
//   appId: "1:753760336430:web:6141c41ba885c31188bdbf",
// };
const firebaseConfig = {
  apiKey: "AIzaSyBWnZ82SS81gKxDYjuzyZWid4E1LGJ_zNw",
  authDomain: "hackathon-fd326.firebaseapp.com",
  projectId: "hackathon-fd326",
  storageBucket: "hackathon-fd326.appspot.com",
  messagingSenderId: "753760336430",
  appId: "1:753760336430:web:6141c41ba885c31188bdbf",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
export const facebook = new FacebookAuthProvider();
//  SINGN_UP

export async function signUp(userInfo) {
  console.log(userInfo, "USerINFO");
  const { name, email, password } = userInfo;
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    await addDoc(collection(db, "user"), {
      name,
      email,
    });
    alert("Sign Up Success");
  } catch (error) {
    alert(error.message);
  }
}

//  LOGIN
export async function logIn(userInfo) {
  const { email, password } = userInfo;
  try {
    await signInWithEmailAndPassword, (auth, email, password);
    alert("Log In Success");
  } catch (error) {
    alert(error.message);
  }
}

//Function to login user
export const loginWithFacebook = async (provider) => {
  console.log(provider);
  try {
    const result = await signInWithPopup(auth, facebook);
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
export const logout = async () => {
  try {
    await signOut(auth);
  } catch (e) {
    console.log(e);
  }
};

// Add-Post in firebase
export async function userCardItem(itemInfo) {
  try {
    const { img, des } = itemInfo;
    const storageRef = ref(storage, `images/${img.name}`);
    await uploadBytes(storageRef, img);
    const imgUrl = await getDownloadURL(storageRef);
    await addDoc(collection(db, "userItem"), {
      description: des,
      image: imgUrl,
    });
    alert("Post successfully!");
  } catch (e) {
    alert(e.message);
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
  console.log(itemInfo);
  try {
    const { updateProfile } = itemInfo;
    const storageRef = ref(storage, `profile/${updateProfile.name}`);
    await uploadBytes(storageRef, updateProfile);
    const imgUrl = await getDownloadURL(storageRef);
    await addDoc(collection(db, "profile"), {
      image: imgUrl,
    });
    alert("Update Profile successfully!");
  } catch (e) {
    alert(e.message);
  }
}

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
