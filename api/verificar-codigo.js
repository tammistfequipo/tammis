export default function handler(req, res) {
  const codigos = {
    "TFTF01": "🔥 10% de regalo",
    "TFTF02": "🎁 200 fichas extra",
    "TFTF03": "🚫 Sin premio, suerte la próxima",
    "TFTF04": "🚫 Sin premio, suerte la próxima",
    "TFTF05": "🔥 ¡Premio especial 50% extra!"
  };

  if (req.method === 'POST') {
    const { codigo } = req.body;

    if (!codigo) {
      return res.status(400).json({ mensaje: "Código no enviado" });
    }

    if (!codigos[codigo]) {
      return res.status(200).json({ mensaje: "❌ Código inválido. Probá con otro." });
    }

    return res.status(200).json({ mensaje: "✅ " + codigos[codigo] });
  } else {
    return res.status(405).json({ mensaje: "Método no permitido" });
  }
}
