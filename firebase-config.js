import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDGOV8zn4u_Bh3mWFdTh9j82N8UdAChUNY",
  authDomain: "axplaystudio-ef5c7.firebaseapp.com",
  projectId: "axplaystudio-ef5c7",
  storageBucket: "axplaystudio-ef5c7.appspot.com",
  messagingSenderId: "786631190185",
  appId: "1:786631190185:web:6f4b3907c3545339676bb8",
  measurementId: "G-6Z6C2QS524"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const contenido = document.getElementById("contenido");

getDocs(collection(db, "peliculas"))
  .then(snapshot => {
    const categorias = {};

    snapshot.forEach(doc => {
      const data = doc.data();
      const cat = data.categoria || "Sin categoría";
      if (!categorias[cat]) categorias[cat] = [];
      categorias[cat].push(data);
    });

    for (const categoria in categorias) {
      const seccion = document.createElement("div");
      seccion.className = "categoria";
      seccion.innerHTML = `<h2>${categoria.toUpperCase()}</h2>`;

      categorias[categoria].forEach(peli => {
        const card = document.createElement("div");
        card.className = "pelicula";
        card.innerHTML = `
          <img src="${peli.img}" alt="Miniatura">
          <h3>${peli.titulo}</h3>
          <iframe src="${peli.src}" allowfullscreen></iframe>
        `;
        seccion.appendChild(card);
      });

      contenido.appendChild(seccion);
    }
  })
  .catch(err => {
    contenido.innerHTML = `<p style="color:red;">❌ Error cargando películas: ${err.message}</p>`;
  });
  