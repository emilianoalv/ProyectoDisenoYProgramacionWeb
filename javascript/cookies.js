
//Configuración de la cookie para valor y días de expiración
setCookie = (cName, cValue, expDays) => {
  //Calcular la fecha de expiración
  let date = new Date();
  date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
  const expires = "expires=" + date.toUTCString();

  //Guardar la cookie
  document.cookie = cName + "=" + cValue + "; " + expires + "; path=/";
}


//Leer la cookie
getCookie = (cName) => {
  const name = cName + "=";
  const cDecoded = decodeURIComponent(document.cookie);
  const cArr = cDecoded.split("; ");
  let value = null;

  cArr.forEach(val => {
    if (val.indexOf(name) === 0) value = val.substring(name.length);
  });

  return value;
}


// Click en el botón para que se oculte el banner y se guarde la cookie
document.querySelector("#cookies-btn").addEventListener("click", () => {
  document.querySelector("#cookies").style.display = "none";
  setCookie("cookie", "true", 30);
});

// Mostrar banner si no hay cookie
cookieMessage = () => {
  if (!getCookie("cookie")) {
    document.querySelector("#cookies").style.display = "block";
  }
}

//Cuando se carga la página, revisa si hay cookie para ver si se muestra el banner
window.addEventListener("load", cookieMessage);

