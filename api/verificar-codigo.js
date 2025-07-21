import fs from 'fs';
import path from 'path';

const codigosPath = path.resolve('./api/codigos.json');
const usadosPath = path.resolve('./api/usados.json');

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { codigo } = req.body;
  const codigoString = String(codigo).trim(); // 👈 asegura que sea string

  const codigos = JSON.parse(fs.readFileSync(codigosPath, 'utf8'));
  const usados = JSON.parse(fs.readFileSync(usadosPath, 'utf8'));

  if (usados[codigoString]) {
    return res.json({ estado: "usado" });
  }

  if (codigos[codigoString]) {
    usados[codigoString] = true;
    fs.writeFileSync(usadosPath, JSON.stringify(usados, null, 2));
    return res.json({ estado: "valido", mensaje: codigos[codigoString] });
  }

  return res.json({ estado: "invalido" });
}
