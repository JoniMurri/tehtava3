const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let luettelo = [];

function mainValikko() {
  console.log("\n Puhelinluettelo ");
  console.log("1. Lisää henkilö");
  console.log("2. Etsi henkilö");
  console.log("3. Poistu");
  rl.question("Valitse toiminto (1, 2, 3): ", (vastaus) => {
    switch (vastaus) {
      case "1":
        kysyNimi();
        break;
      case "2":
        etsiHenkilo(luettelo);
        break;
      case "3":
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

function lisaaHenkilo(uusiHenkilo) {
  luettelo.push(uusiHenkilo);
  console.log("Henkilö lisätty onnistuneesti.");
}

function etsiHenkilo(henkiloLista) {
  rl.question(
    "Anna etunimi, sukunimi tai puhelinnumero etsintään: ",
    (hakusana) => {
      let tulokset = henkiloLista.filter(
        (henkilo) =>
          henkilo.etuNimi.toLowerCase().includes(hakusana.toLowerCase()) ||
          henkilo.sukuNimi.toLowerCase().includes(hakusana.toLowerCase()) ||
          henkilo.puhelinNumero.includes(hakusana)
      );

      if (tulokset.length > 0) {
        console.log("Löydetyt henkilöt:");
        tulokset.forEach((henkilo, index) => {
          console.log(
            `${index + 1}. ${henkilo.etuNimi} ${
              henkilo.sukuNimi
            }, Puhelinnumero: ${henkilo.puhelinNumero}`
          );
        });
      } else {
        console.log("Henkilöä ei löytynyt.");
      }
      mainValikko(); // Palaa päävalikkoon
    }
  );
}

mainValikko();
