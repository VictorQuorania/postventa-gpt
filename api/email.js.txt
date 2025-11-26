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
        pass: process.env.OUTLOOK_PASSWORD
      }
    });

    await transporter.sendMail({
      from: "victor@quorania.com",
      to: "victor@quorania.com",
      subject: "Nueva incidencia postventa",
      text: `Nombre: ${nombre}\nCorreo: ${correo}\nMensaje: ${mensaje}`
    });

    return res.status(200).json({ success: true });
  } catch (e) {
    return res.status(500).json({ error: "Error enviando correo." });
  }
}
