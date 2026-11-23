// Pas hier de reisroute aan. Dit is een voorlopige planning, niet gesynchroniseerd met Polarsteps.
// Laat onbekende afstanden of tijden op null staan; zet geen verzonnen waarden in de cockpit.
window.NORD_PLAN = [
  {
    "date": "2027-01-21",
    "from": "Schijndel",
    "fromCountry": "nl",
    "place": "Kiel",
    "country": "de",
    "lat": 54.3233,
    "lon": 10.1394,
    "ferry": "stena",
    "steps": [
      "Schijndel",
      "Kiel",
      "Nachtboot Kiel – Göteborg"
    ],
    "note": "Overnachting aan boord van Stena Line.",
    "roadEstimateKm": 572
  },
  {
    "date": "2027-01-22",
    "from": "Göteborg",
    "fromCountry": "se",
    "place": "Tynset",
    "country": "no",
    "lat": 62.2736,
    "lon": 10.7757,
    "steps": [
      "Göteborg",
      "Svinesund",
      "Østerdalen",
      "Tynset"
    ],
    "roadEstimateKm": 628
  },
  {
    "date": "2027-01-23",
    "from": "Tynset",
    "fromCountry": "no",
    "place": "Mo i Rana",
    "country": "no",
    "lat": 66.313,
    "lon": 14.1428,
    "steps": [
      "Tynset",
      "Kvikne",
      "Hell",
      "Laksforsen",
      "Mosjøen",
      "Mo i Rana",
      "Krokstrand (overnachtingsalternatief)"
    ],
    "roadEstimateKm": 663
  },
  {
    "date": "2027-01-24",
    "from": "Mo i Rana",
    "fromCountry": "no",
    "place": "Reine",
    "country": "no",
    "lat": 67.9327,
    "lon": 13.0891,
    "ferry": "bodo-moskenes",
    "steps": [
      "Mo i Rana",
      "Saltfjellet",
      "Poolcirkel",
      "Saltstraumen (optioneel)",
      "Bodø",
      "Veerboot Bodø – Moskenes",
      "Reine / Sørvågen"
    ],
    "note": "Overnachten in Reine of Sørvågen, afhankelijk van de route en beschikbaarheid.",
    "roadEstimateKm": 236
  },
  {
    "date": "2027-01-25",
    "from": "Reine",
    "fromCountry": "no",
    "place": "Svolvær",
    "country": "no",
    "lat": 68.2343,
    "lon": 14.5689,
    "steps": [
      "Reine / Sørvågen",
      "Lofoten",
      "Svolvær"
    ],
    "roadEstimateKm": 121
  },
  {
    "date": "2027-01-26",
    "from": "Svolvær",
    "fromCountry": "no",
    "place": "Mefjordvær",
    "country": "no",
    "lat": 69.5185,
    "lon": 17.4382,
    "steps": [
      "Svolvær",
      "Narvik",
      "Finnsnes",
      "Bergsbotn",
      "Mefjordvær"
    ],
    "roadEstimateKm": 440
  },
  {
    "date": "2027-01-27",
    "from": "Mefjordvær",
    "fromCountry": "no",
    "place": "Tromsø",
    "country": "no",
    "lat": 69.6492,
    "lon": 18.9553,
    "steps": [
      "Mefjordvær",
      "Senja",
      "Tromsø"
    ],
    "roadEstimateKm": 236,
    "roadEstimateNote": "Via Finnsnes over land."
  },
  {
    "date": "2027-01-28",
    "from": "Tromsø",
    "fromCountry": "no",
    "place": "Alta",
    "country": "no",
    "lat": 69.9689,
    "lon": 23.2716,
    "steps": [
      "Tromsø",
      "Lyngen (optioneel)",
      "Olderdalen",
      "Kvænangsfjellet",
      "Alta"
    ],
    "note": "In Alta beoordelen we weer en wegen voordat we richting Noordkaap vertrekken.",
    "roadEstimateKm": 390,
    "roadEstimateNote": "Via E8/E6 over land. Een route via de Lyngen-veerboten wijkt af."
  },
  {
    "date": "2027-01-29",
    "from": "Alta",
    "fromCountry": "no",
    "place": "Honningsvåg",
    "country": "no",
    "lat": 70.9822,
    "lon": 25.9705,
    "steps": [
      "Alta",
      "Sennalandet",
      "Porsangerfjord",
      "Nordkapptunnelen",
      "Honningsvåg",
      "Noordkaap (optioneel)"
    ],
    "note": "Honningsvåg is de gewenste uitvalsbasis; Noordkaap alleen wanneer het weer en de wegstatus het toelaten.",
    "roadEstimateKm": 207
  },
  {
    "date": "2027-01-30",
    "from": "Honningsvåg",
    "fromCountry": "no",
    "place": "Alta",
    "country": "no",
    "lat": 69.9689,
    "lon": 23.2716,
    "steps": [
      "Honningsvåg / Magerøya",
      "Noordkaap (tweede poging, optioneel)",
      "Alta"
    ],
    "note": "Reservedag voor een tweede Noordkaappoging. De invulling hangt af van de omstandigheden.",
    "roadEstimateKm": 207
  },
  {
    "date": "2027-01-31",
    "from": "Alta",
    "fromCountry": "no",
    "place": "Luleå",
    "country": "se",
    "lat": 65.5848,
    "lon": 22.1567,
    "steps": [
      "Alta",
      "Luleå"
    ],
    "roadEstimateKm": 609
  },
  {
    "date": "2027-02-01",
    "from": "Luleå",
    "fromCountry": "se",
    "place": "Gävle",
    "country": "se",
    "lat": 60.6749,
    "lon": 17.1413,
    "steps": [
      "Luleå",
      "Gävle"
    ],
    "roadEstimateKm": 734
  },
  {
    "date": "2027-02-02",
    "from": "Gävle",
    "fromCountry": "se",
    "place": "Göteborg",
    "country": "se",
    "lat": 57.7089,
    "lon": 11.9746,
    "ferry": "stena",
    "steps": [
      "Gävle",
      "Göteborg",
      "Nachtboot Göteborg – Kiel"
    ],
    "note": "Overnachting aan boord van Stena Line.",
    "roadEstimateKm": 533
  },
  {
    "date": "2027-02-03",
    "from": "Kiel",
    "fromCountry": "de",
    "place": "Schijndel",
    "country": "nl",
    "lat": 51.6191,
    "lon": 5.4311,
    "steps": [
      "Kiel",
      "Schijndel"
    ],
    "roadEstimateKm": 570
  }
];
window.NORD_RETURN = '';
