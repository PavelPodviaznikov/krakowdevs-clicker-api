const { initializeApp } = require("firebase/app");
const { getFirestore, collection, getDocs, doc, updateDoc, getDoc } = require('firebase/firestore/lite');

class DBService {
  constructor() {
    this.app = undefined;
    this.db = undefined;
  }

  init() {
    const firebaseConfig = {
      apiKey: "AIzaSyAd7PqBwullABRsuA8ildAZjpjqcEqjMvU",
      authDomain: "krakowdevs-clicker-b31b1.firebaseapp.com",
      projectId: "krakowdevs-clicker-b31b1",
      storageBucket: "krakowdevs-clicker-b31b1.appspot.com",
      messagingSenderId: "683431932635",
      appId: "1:683431932635:web:0457ab7afeff429fe412fe"
    };

    this.app = initializeApp(firebaseConfig);
    this.db = getFirestore(this.app);
  }

  async getClicks() {
    const clicksCollection = collection(this.db, 'clicks');
    const clicksSnapshot = await getDocs(clicksCollection);
    const clicksList = clicksSnapshot.docs.map(doc => doc.data());
    
    return clicksList[0].num;
  }

  async saveClicks(clicks) {
    const docRef = doc(this.db, "clicks", "test@test.com");

    await updateDoc(docRef, { num: clicks });

    return true;
  }
}

module.exports = new DBService();