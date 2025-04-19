interface Puzzle {
  phrase: string;
  category: string;
}

export const PUZZLES: Puzzle[] = [
  // Meemit ja nettikulttuuri
  { phrase: "TORILLA TAVATAAN", category: "Meemi" },
  { phrase: "KYLLÄ LÄHTEE", category: "Meemi" },
  { phrase: "EBIN MENO", category: "Meemi" },
  { phrase: "SPURDO SPÄRDE", category: "Meemi" },
  { phrase: "TÄNÄÄN OLI HYVÄ PÄIVÄ", category: "Meemi" },
  { phrase: "HYPPY MUNILLEEN", category: "Meemi" },

  { phrase: "NYT LOPPU LEIKKI SANO MÄKISEN HEIKKI", category: "Aitoo" },
  { phrase: "NIIN NIIN PERKELE MEINAAN NIIN", category: "Aitoo" },
  { phrase: "ETTÄ JOTTA TUOTA NOIN", category: "Aitoo" },
  { phrase: "AITOON KORONA-ESKO", category: "Aitoo" },
  { phrase: "AITOON SYYHY-ESKO", category: "Aitoo" },
  { phrase: "VELI-OSKARI JA VETÄYTYVÄT HIUSRAJAT", category: "Aitoo" },
  { phrase: "TURUN PORMESTARI TARJOO", category: "Aitoo" },
  { phrase: "VESSAPAPERIMUMMO", category: "Aitoo" },
  { phrase: "KAAKAN KAPAKAN KARAOKE", category: "Aitoo" },
  { phrase: "JUHO NIEMI JA GRILIPUUT", category: "Aitoo" },
  { phrase: "KENRAALI-KAPTEENI SLÄKKER TÖRST", category: "Aitoo" },
  { phrase: "SIELLÄ SE RAIMO KROOLAA", category: "Aitoo" },
  { phrase: "ARMAS STENROOSIN MUNKIT", category: "Aitoo" },
  { phrase: "MAUKKA JA MEHUKATTITONKAT", category: "Aitoo" },
  { phrase: "KOPSONIN MAKKARAPERUNAT", category: "Aitoo" },
  { phrase: "JUHON PIKKU HÖPÖNASSUT", category: "Aitoo" },

  // Klassikot ja sanonnat
  { phrase: "EI SAA PEITTÄÄ", category: "Klassikko" },
  { phrase: "KOHTA SAUNAAN", category: "Suomalaista" },
  { phrase: "PERKELE JA SAUNA", category: "Perinne" },
  { phrase: "KALSARIKÄNNIT", category: "Elämäntapa" },
  { phrase: "TALVISODAN HENKI", category: "Historia" },

  // Ruoka ja juoma
  { phrase: "KARJALAN PIIRAKAT", category: "Ruoka" },
  { phrase: "SALMIAKKI JA KAHVI", category: "Herkut" },
  { phrase: "MÄMMI JA PIIMÄ", category: "Perinneruoat" },
  { phrase: "RUISLEIPÄ JA VOI", category: "Ruoka" },
  { phrase: "GRILLIMAKKARA", category: "Kesäherkku" },

  // Luonto ja vuodenajat
  { phrase: "KESKIYÖN AURINKO", category: "Luonto" },
  { phrase: "REVONTULET", category: "Luonto" },
  { phrase: "KAAMOS JA PIMEYS", category: "Vuodenaika" },
  { phrase: "JUHANNUS SAARESSA", category: "Kesäjuhla" },
  { phrase: "LUMIPALLO LENTÄÄ", category: "Talvi" },

  // Kulttuuri ja urheilu
  { phrase: "JÄÄKIEKON MM KISAT", category: "Urheilu" },
  { phrase: "PESÄPALLO KESÄLLÄ", category: "Urheilu" },
  { phrase: "HIIHTO JA SAUVAT", category: "Talviurheilu" },
  { phrase: "MUUMIT JA TOVE JANSSON", category: "Kulttuuri" },
  { phrase: "SIBELIUS JA SISU", category: "Suomalaisuus" }

]; 