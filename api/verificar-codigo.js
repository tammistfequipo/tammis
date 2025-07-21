import fs from 'fs';
import path from 'path';

const codigosPath = path.resolve('./api/codigos.json');
const usadosPath = path.resolve('./api/usados.json');

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { codigo } = req.body;
  const codigoStr = String(codigo).trim();

  try {
    const codigos = JSON.parse(fs.readFileSync(codigosPath, 'utf8'));

    let usados = {};
    if (fs.existsSync(usadosPath)) {
      const usadosRaw = fs.readFileSync(usadosPath, 'utf8') || '{}';
      usados = JSON.parse(usadosRaw);
    }

    if (usados[codigoStr]) {
      return res.json({ estado: 'usado' });
    }

    if (codigos[codigoStr]) {
      usados[codigoStr] = true;
      fs.writeFileSync(usadosPath, JSON.stringify(usados, null, 2));
      return res.json({ estado: 'valido', mensaje: codigos[codigoStr] });
    }

    return res.json({ estado: 'invalido' });

  } catch (error) {
    console.error('Error en el servidor:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}
