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

const lista = document.getElementById('listaTareas');
const renderList = (doc) => {
  let li = document.createElement('li');
  li.className = 'collection-item';
  li.setAttribute('data-id', doc.id);

  let div = document.createElement('div');
  let titulo = document.createElement('span');
  titulo.textContent = doc.data().Titulo;

  let enlace = document.createElement('a');
  enlace.href = '#modal1';
  enlace.className = 'modal-trigger secondary-content';

  let editBtn = document.createElement('i');
  editBtn.className = 'material-icons';
  editBtn.innerText = 'edit';

  let deleteBtn = document.createElement('i');
  deleteBtn.className = 'material-icons secondary-content';
  deleteBtn.innerText = 'delete';

  enlace.appendChild(editBtn);
  div.appendChild(titulo);
  div.appendChild(deleteBtn);
  div.appendChild(enlace);
  li.appendChild(div);

  deleteBtn.addEventListener('click', e => {
    console.log('delete');
  })
  lista.append(li);
}
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
        renderList(cambio.doc)
      }else if(cambio.type == 'removed'){
        console.log('Eliminado');
      }else if(cambio.type == 'modified'){
        console.log('Modificado')
      }
    });
  });
  return unsubscribe;
}



