import fs from 'fs';
import path from 'path';

const codigosPath = path.join(process.cwd(), 'api', 'codigos.json');
const usadosPath = path.join(process.cwd(), 'api', 'usados.json');

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { codigo } = req.body;

  if (!codigo) {
    return res.status(400).json({ error: "Código faltante" });
  }

  let codigos = {};
  let usados = {};

  try {
    codigos = JSON.parse(fs.readFileSync(codigosPath, 'utf8'));
    usados = JSON.parse(fs.readFileSync(usadosPath, 'utf8'));
  } catch (err) {
    return res.status(500).json({ error: "Error leyendo los archivos" });
  }

  if (usados[codigo]) {
    return res.json({ estado: "usado" });
  }

  if (codigos[codigo]) {
    usados[codigo] = true;
    fs.writeFileSync(usadosPath, JSON.stringify(usados, null, 2));
    return res.json({ estado: "valido", mensaje: codigos[codigo] });
  }

  return res.json({ estado: "invalido" });
}
