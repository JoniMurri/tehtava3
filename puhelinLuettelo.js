const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
//tallennetaan paikallisesti.
let luettelo = [];

function mainValikko() {
  console.log("\n Puhelinluettelo ");
  console.log("1. Lisää henkilö");
  console.log("2. Etsi henkilö");
  console.log("3. Selaa luetteloa");
  console.log("4. Poistu");
  rl.question("Valitse toiminto (1, 2, 3, 4): ", (vastaus) => {
    switch (vastaus) {
      case "1":
        kysyNimi();
        break;
      case "2":
        rl.question("Anna etsittävän nimi: ", (nimi) => {
          etsiHenkilo(luettelo, nimi);
        });
        break;
      case "3":
        selaaHenkilot(luettelo);
        break;
      case "4":
        console.log("Heippa!");
        rl.close();
        break;
      default:
        console.log("Virheellinen valinta, yritä uudelleen.");
        mainValikko();
        break;
    }
  });
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
        mainValikko(); // Palaa päävalikkoon
      });
    });
  });
}
// lisää henkilön luetteloon
function lisaaHenkilo(uusiHenkilo) {
  luettelo.push(uusiHenkilo);
  console.log("Henkilö lisätty onnistuneesti.");
}
//
function etsiHenkilo(luettelo, nimi) {
  let tulokset = luettelo.filter(
    (henkilo) =>
      henkilo.etuNimi.toLowerCase().includes(nimi.toLowerCase()) ||
      henkilo.sukuNimi.toLowerCase().includes(nimi.toLowerCase()) ||
      `${henkilo.etuNimi} ${henkilo.sukuNimi}`
        .toLowerCase()
        .includes(nimi.toLowerCase())
  );

  if (tulokset.length > 0) {
    console.log("Löydetyt henkilöt:");
    tulokset.forEach((henkilo, index) => {
      console.log(
        `${index + 1}. ${
          henkilo.etuNimi + "" + henkilo.sukuNimi
        } Puhelinnumero: ${henkilo.puhelinNumero}`
      );
    });
  } else {
    console.log("Henkilöä ei löytynyt.");
  }
  mainValikko(); // Palaa päävalikkoon
}

function selaaHenkilot(luettelo) {
  if (luettelo.length === 0) {
    console.log("Puhelinluettelo on tyhjä.");
  } else {
    console.log("\nPuhelinluettelon henkilöt:");
    luettelo.forEach((henkilo, index) => {
      console.log(
        `${index + 1}. ${henkilo.etuNimi} ${henkilo.sukuNimi}, Puhelinnumero: ${
          henkilo.puhelinNumero
        }`
      );
    });
  }
  mainValikko(); // Palaa päävalikkoon
}

mainValikko();
