const mongoose = require("mongoose");

const yarismacilar = new mongoose.Schema({
  isim: String,
  soyisim: String,
  mailadresi: {
    type: String,
    unique: false,
  },
  universite: String,
  sinif: String,
  phonenumber: {
    type: Number,
    unique: false,
    set: (v) =>
      v && typeof v === "string" && v.startsWith("0")
        ? parseInt(v.substring(1))
        : v,
  },
  yarismacinumber: Number,
});

yarismacilar.pre("save", function (next) {
  if (this.isNew) {
    this.yarismacinumber = this.phonenumber - 999999999;
  }
  next();
});

module.exports = mongoose.model("Yarismacilar", yarismacilar);
