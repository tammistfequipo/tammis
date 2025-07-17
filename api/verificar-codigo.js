import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ mensaje: 'Método no permitido' });
  }

  const { codigo } = req.body;

  const filePath = path.join(process.cwd(), 'api', 'codigos.json');
  const rawData = fs.readFileSync(filePath, 'utf-8');
  const codigos = JSON.parse(rawData);

  if (codigos[codigo]) {
    const mensaje = codigos[codigo];
    return res.status(200).json({ valido: true, mensaje: "✅ " + mensaje });
  } else {
    return res.status(200).json({ valido: false, mensaje: "❌ Código inválido. Probá con otro." });
  }
}
