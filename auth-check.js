firebase.auth().onAuthStateChanged(async (user) => {
  if (user) {
    const uid = user.uid;
    const doc = await firebase.firestore().collection("usuarios").doc(uid).get();
    if (!doc.exists || !doc.data().vip) {
      alert("Acceso denegado. Solo usuarios VIP pueden entrar.");
      window.location.href = "login.html";
    }
  } else {
    window.location.href = "login.html";
  }
});
