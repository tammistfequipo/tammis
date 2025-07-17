async function tirar() {
  const codigo = document.getElementById("codigo").value.trim().toUpperCase();
  const resultado = document.getElementById("resultado");

  if (!codigo) {
    resultado.style.color = "orange";
    resultado.innerHTML = "⚠️ Ingresá un código.";
    return;
  }

  try {
    const response = await fetch("/api/verificar-codigo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ codigo }),
    });

    const data = await response.json();
    resultado.style.color = "#00ff00";
    resultado.innerHTML = data.mensaje;
  } catch (error) {
    resultado.style.color = "red";
    resultado.innerHTML = "❌ Error al verificar el código.";
  }
}
