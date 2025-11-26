import nodemailer from "nodemailer";

export default async function handler(req, res) {
  try {
    const { nombre, correo, mensaje } = req.body;

    if (!nombre || !correo || !mensaje) {
      return res.status(400).json({ error: "Faltan campos requeridos." });
    }

    let transporter = nodemailer.createTransport({
      host: "smtp.office365.com",
      port: 587,
      secure: false,
      auth: {
        user: "victor@quorania.com",
        pass: process.env.OUTLOOK_PASSWORD,
      },
      tls: {
        ciphers: "SSLv3",
        rejectUnauthorized: false,
      },
    });

    await transporter.sendMail({
      from: "victor@quorania.com",
      to: "victor@quorania.com",
      subject: "Nueva incidencia postventa",
      text: `Nombre: ${nombre}\nCorreo: ${correo}\nMensaje: ${mensaje}`,
    });

    return res.status(200).json({ success: true });

  } catch (e) {
    console.error("EMAIL ERROR:", e);  // 👈 IMPRIME EL ERROR REAL
    return res.status(500).json({ error: e.message });  // 👈 DEVUELVE EL ERROR REAL
  }
}
