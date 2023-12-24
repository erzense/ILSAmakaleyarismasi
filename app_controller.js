const Yarismacilar = require("./models/Yarismacilar");
const nodemailer = require("nodemailer");

const getHomepage = async (req, res) => {
  res.render("homepage");
};

const postHomepage = async (req, res) => {
  const { isim, soyisim, mailadresi, universite, sinif, phonenumber } =
    req.body;
  const yarismacinumber = parseInt(phonenumber) - 999999999;
  if (typeof phonenumber === "string") {
    return res
      .status(400)
      .send(
        `<h1>Telefon Numarasında hatalı karakter girdiniz lütfen yeniden denemek için <a href="/">linke tıklayınız</a><h1>`
      );
  }

  const yarismaci = await Yarismacilar.create({
    isim,
    soyisim,
    mailadresi,
    universite,
    sinif,
    phonenumber,
  });

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODE_USER,
      pass: process.env.NODE_MAILER,
    },
  });

  let mailOptions = {
    from: process.env.NODE_USER,
    to: `${mailadresi}`,
    subject: "ILSA İstanbul 6. Oğuzman Makale Yarışması",
    html: `Sayın ${isim} ${soyisim} <br /> <br /> ILSA İstanbul 6. Oğuzman Makale Yarışmasına başvurunuz kabul edilmiştir. <br />
    Yarışmacı Numaranız: ${yarismacinumber} olarak belirlenmiştir. Yarışmada başarılar Dileriz <br /> <br />
    ILSA İstanbul Akademi Komitesi`,
  };

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) console.log(err);
  });

  res.redirect("/");
};
module.exports = {
  getHomepage,
  postHomepage,
};
