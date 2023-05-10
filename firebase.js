// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getFirestore, onSnapshot, collection, orderBy, query } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCw4EWOucYJBMzbUliKsFcIJ2buJhBoK9Y",
  authDomain: "listtareas-61407.firebaseapp.com",
  projectId: "listtareas-61407",
  storageBucket: "listtareas-61407.appspot.com",
  messagingSenderId: "1013329374248",
  appId: "1:1013329374248:web:9571372a367c0eb387191d",
  measurementId: "G-L0BY22X73T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const getCambios = () => {
  const querys = query(collection(db, 'tareas'), orderBy('Titulo'));
  const unsubscribe = onSnapshot(querys, snapshot => {
    const cambios = snapshot.docChanges().map(change => {
      return {
        type: change.type,
        doc: change.doc
      };
    });
    console.log(cambios);
    cambios.forEach(cambio => {
      if(cambio.type == 'added'){
        console.log(cambio.doc.data());
      }else if(cambio.type == 'removed'){
        console.log('Eliminado');
      }else if(cambio.type == 'modified'){
        console.log('Modificado')
      }
    });
  });
  return unsubscribe;
}



