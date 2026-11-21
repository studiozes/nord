# Nord

Persoonlijke reiscockpit voor een winterroadtrip door Scandinavië. Een lichte, responsive website voor iPhone, iPad en desktop.

## Testen

Open de website zodra GitHub Pages is ingeschakeld. Bovenaan kun je kiezen:

- **Komende dagen:** actuele weersverwachtingen voor een reeks plaatsen uit de reis, maar met datums van de komende dagen. Dit is de teststand.
- **Reis 2027:** de voorlopige reisplanning vanaf 21 januari 2027. Voorspellingen verschijnen alleen als de betreffende datum binnen de beschikbare weershorizon valt.

Kies een dag voor zonsopkomst, zonsondergang, daglichtduur, weergegevens en directe externe links. Dark mode volgt standaard de systeeminstelling en is handmatig te wisselen.

## Broncode en gegevens

Voor deze eerste publicatie is alles (HTML, CSS, JavaScript, route en icoon) bewust samengebracht in één zelfstandig `index.html`. Updates aan dit bestand verschijnen na de eerstvolgende GitHub Pages-publicatie.

Weer: [Open-Meteo](https://open-meteo.com/). Zontijden: [Sunrise-Sunset.org](https://sunrise-sunset.org/).

Noorderlicht: geen externe widget. Het detailpaneel haalt actuele [NOAA SWPC OVATION](https://www.spaceweather.gov/products/aurora-30-minute-forecast)-modeldata en de [NOAA Kp-index](https://www.spaceweather.gov/products/planetary-k-index) op. Bewolking komt via Open-Meteo. De drie waarden verschijnen in Nord's eigen compacte tegels en zijn alleen een momentopname, geen berekende zichtkans voor de reisdatum. Noordelijke gemeenten hebben een directe link naar de eigen [Nordlyskart](https://nordlyskart.no/en/northern-lights)-pagina voor een uitgebreider lokaal advies. De huidige NOAA- en bewolkingsgegevens worden op nieuw openen en met de verversknop rechtstreeks opgehaald, niet centraal beheerd of periodiek opgeslagen. Als een externe bron onbereikbaar is, toont Nord een streepje in plaats van verzonnen cijfers.

**Huidige routegegevens:** 14 reisdagen van 21 januari t/m 3 februari 2027, inclusief beide Stena-nachtboten, Lofoten, Senja, de optionele Noordkaap en de terugweg via Zweden. Binnen elke reisdag staan de geplande tussenstops. De route komt uit de eerder afgestemde reisplanning en is nog niet rechtstreeks gesynchroniseerd met Polarsteps. Geplande kilometers zijn niet ingevuld zolang ze niet zijn geverifieerd.

**Nog niet gerealiseerd:** Polarsteps-synchronisatie, automatische controles van wegen/veerboten en volledige toetsing op fysieke iPhones. Weg- en veerbootstatussen worden dus niet als veilig bevestigd. Gegevens kunnen offline verouderd zijn.

Gebruik geen persoonlijke toegangstokens, reserveringsgegevens of geheime Polarsteps-links in deze openbare repository.

## GitHub Pages activeren

1. Open [Settings → Pages](https://github.com/studiozes/nord/settings/pages).
2. Kies onder **Build and deployment**: **Deploy from a branch**, branch **main**, map **/(root)**, en **Save**.
3. Test daarna de URL `https://studiozes.github.io/nord/`.

## Eigen domein

Voor `nord.studiozes.nl`:

1. Voeg bij de DNS-beheerder van `studiozes.nl` een **CNAME**-record toe: host `nord`, bestemming `studiozes.github.io`.
2. Stel onder GitHub Pages het **Custom domain** in op `nord.studiozes.nl`.
3. Activeer **Enforce HTTPS** zodra beschikbaar.

Voer de DNS-configuratie niet uit met geheime gegevens in deze repository.