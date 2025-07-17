async function tirar() {
  const codigoIngresado = document.getElementById("codigo").value.trim().toUpperCase();
  const resultado = document.getElementById("resultado");

  if (!codigoIngresado) {
    resultado.style.color = "orange";
    resultado.innerHTML = "⚠️ Ingresá un código.";
    return;
  }

  try {
    const response = await fetch("/api/verificar-codigo.js", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ codigo: codigoIngresado })
    });

    const data = await response.json();

    if (response.status === 200) {
      resultado.style.color = "#00ff00";
      resultado.innerHTML = "✅ " + (data.premio ? data.premio : data.mensaje);
    } else {
      resultado.style.color = "#ffcc00";
      resultado.innerHTML = "🚫 " + data.mensaje;
    }
  } catch (error) {
    resultado.style.color = "red";
    resultado.innerHTML = "❌ Error al verificar el código.";
  }
}
