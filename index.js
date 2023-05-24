import {getCambios, agregarTarea } from "./firebase.js";
window.addEventListener('DOMContentLoaded', async () =>{
       getCambios();
       document.getElementById('agregarBtn').addEventListener('click', (e) => {
              e.preventDefault()
              const tituloInput = document.getElementById('autocomplete-input');
              const titulo = tituloInput.value;
            
              if (titulo) {
                agregarTarea(titulo);
                tituloInput.value='';
              }else{
                console.log('No ingresó un titulo')
              }
            });
})