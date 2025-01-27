const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let luettelo = [];

function aloitusValikko() {
  rl.question(
    "Tervetuloa puhelinluetteloon! \r Paina (y) jos haluat jatkaa. Paina (x) jos haluat poistua: ",
    (vastaus) => {
      if (vastaus === "x") {
        console.log("Heippa!");
        rl.close();
      } else if (vastaus === "y") {
        kysyNimi(); // Siirrytään kysymään käyttäjän nimeä
      } else {
        console.log("Virheellinen syöte, yritä uudelleen.");
        aloitusValikko(); // Palaa alkuun
      }
    }
  );
}

function kysyNimi() {
  let uusiHenkilo = { etuNimi: "", sukuNimi: "", puhelinNumero: "" };
  rl.question("Anna lisättävän henkilön Etunimi: ", (etuNimi) => {
    uusiHenkilo.etuNimi = etuNimi;
    rl.question("Anna käyttäjän Sukunimi: ", (sukuNimi) => {
      uusiHenkilo.sukuNimi = sukuNimi;
      rl.question("Anna Puhelinnumero: ", (puhelinNumero) => {
        uusiHenkilo.puhelinNumero = puhelinNumero;
        console.log(
          `Lisätty henkilö:  ${uusiHenkilo.etuNimi} ${uusiHenkilo.sukuNimi} Puhelinnro:  ${uusiHenkilo.puhelinNumero}`
        );
        lisaaHenkilo(uusiHenkilo);
        // Kysytään, haluaako käyttäjä lisätä uuden käyttäjän
        rl.question(
          "Haluatko lisätä uuden käyttäjän? Paina (y) jatkaaksesi tai  Etsi henkilö painamalla (f) poistuaksesi: paina (x) ",
          (vastaus) => {
            if (vastaus === "y") {
              kysyNimi(); // Kysytään uudelleen
            } else if (vastaus === "f") {
              etsiHenkilo();
            } else if (vastaus === "x") {
              console.log("Heippa!");
              rl.close(); // Palaa kysymykseen
            }
          }
        );
      });
    });
  });
}

function lisaaHenkilo(uusiHenkilo) {
  luettelo.push(uusiHenkilo);
  console.log(luettelo);
}

function etsiHenkilo() {
  rl.question("Anna etunimi tai sukunimi etsintään: ", (nimi) => {
    let tulokset = luettelo.filter(
      (henkilo) =>
        henkilo.etuNimi.toLowerCase().includes(nimi.toLowerCase()) ||
        henkilo.sukuNimi.toLowerCase().includes(nimi.toLowerCase())
    );

    if (tulokset.length > 0) {
      console.log("Löydetyt henkilöt:");
      tulokset.forEach((henkilo, index) => {
        console.log(
          `${index + 1}. ${henkilo.etuNimi} ${
            henkilo.sukuNimi
          }, Puhelinnumero: ${henkilo.puhelinNumero}`
        );
        aloitusValikko();
      });
    } else {
      console.log("Henkilöä ei löytynyt.");
    }
  });
}

aloitusValikko();
