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

**Cockpit:** daglicht, dagweer, noorderlicht, actuele weerwaarden, wegmeldingen en etappegegevens staan in compacte, gelijkvormige lichtgrijze tegels. De volledige tegel (zowel waarde als label) opent de relevante bron in een nieuw tabblad. Voor zontijden gaat dit naar de locatie- en datumgebonden Sunrise-Sunset API; voor weer naar de plaatsgebonden Open-Meteo-brongegevens. NOAA heeft voor OVATION geen afzonderlijke plaatswebsite: het auroramodel opent daarom de officiële NOAA-modelkaart, terwijl Nordlyskart een aparte plaatslink blijft. Verkeersmeldingen openen de gefilterde Vegvesen-kaart bij het relevante routepunt. De rijafstand is indicatief en opent ter controle Apple Kaarten, niet een per etappe geverifieerde Polarsteps-registratie. Op desktop staat het detailpaneel naast de tijdlijn, op mobiel bij de gekozen dag. Geplande steps en individuele wegmeldingen zijn uitklapbaar voor minder scrollen. Bij Noorse reisdagen komen de camerabeelden rechtstreeks van Vegvesen, met klik naar de camera. Controleer altijd de beelddatum en de actuele afsluitingen; onbereikbare bronnen geven geen fictieve waarden.

**Route:** 14 reisdagen van 21 januari t/m 3 februari 2027. De voorlopige rijkilometers uit de eerdere routeberekening zijn behouden en worden met *ca.* aangeduid. Ze zijn geen in Polarsteps gecontroleerde afstanden. Veerboottrajecten en optionele omwegen zijn niet meegenomen; waar relevant staat een afzonderlijke routeopmerking. Controleer de daadwerkelijke autoroute, wegtoestand en dienstregeling voor vertrek.

Een per etappe gecontroleerde Polarsteps-rijafstand kan worden opgenomen als `polarstepsRoadKm` en krijgt voorrang op `roadEstimateKm`. Gebruik hiervoor alleen rijkilometers, zonder vaarafstand. Er is geen automatische Polarsteps-synchronisatie. Veerbootstatus wordt bij de rederij gecontroleerd. Bij bronproblemen kunnen actuele waarden ontbreken.

Gebruik geen persoonlijke toegangstokens, reserveringsgegevens of geheime Polarsteps-links in deze openbare repository.

## Actuele omstandigheden en wegweer

Bij Noorse bestemmingen toont Nord naast de bestaande dagvoorspelling drie **actuele Open-Meteo-modelwaarden**: neerslag, luchtvochtigheid en windrichting. De gegevens worden tegelijk met de bestaande actuele bewolkingswaarde aangevraagd, zonder extra API of server. De handmatige verversknop vraagt deze waarden opnieuw op. Deze modelwaarden zijn **geen daadwerkelijke metingen op de weg** en gelden voor het huidige moment, niet voor de toekomstige reisdatum.

De extra bronlinks openen [Vegvær van Statens vegvesen](https://vegvar.atlas.vegvesen.no/) voor echte meetstationgegevens (waaronder wegdektemperatuur), en [Yr.no](https://www.yr.no/en) voor een aanvullende weersverwachting. De website toont geen wegdektemperatuur als de waarde niet rechtstreeks van een bevestigd meetstation ontvangen is. Het officiële Vegvesen DATEX-meetdata-endpoint vereist registratie; Nord gebruikt dit endpoint niet. Dit houdt de oplossing eenvoudig. Camera's en wegstatus blijven aparte bronnen en een camerabeeld bevestigt nooit dat de weg veilig is.

## Wegmeldingen rond routepunten

Voor Noorse etappes probeert Nord verkeersmeldingen rechtstreeks op te halen via de openbare [SituationSimple-WFS van Statens vegvesen](https://www.vegvesen.no/en/fag/technology/open-data/a-selection-of-open-data/what-is-datex/). Er is geen eigen server, account of database. Per geselecteerde etappe gebruikt Nord de bekende vertrek- en aankomstpunten plus geverifieerde belangrijke tussenstops (zoals Saltfjellet, Kvænangsfjellet en Sennalandet). Het controleert een straal van ongeveer 25 km rond ieder punt, telt unieke meldingen en onderscheidt afsluitingsmeldingen van overige meldingen. Ook geplande meldingen kunnen meetellen. Het is dus **geen telling van wegen die momenteel feitelijk dicht zijn**, geen volledige routecontrole en geen bewijs dat de weg veilig is.

De aantallen verschijnen in eigen cockpittegels, en bij de gekozen dag staat ook een teller in de linker tijdlijn. In hetzelfde paneel staan nu vier officiële Vegvesen-kaartweergaven, gericht op het belangrijke controlepunt van de gekozen etappe: **Bergpassen** (`layers=fo`), **Meldingen + verkeer** (`showTfl=1` en actief/gepland), **Bergpassen + verkeer** (`layers=fo&showTfl=1`) en **Tunnels + verkeer** (`layers=tun&showTfl=1`). Dit zijn kaartlagen, geen vier afzonderlijke datasets die de teller automatisch verwerkt. De WFS-teller kan niet zelfstandig bepalen of een bergpas of tunnel momenteel open is. Controleer dat altijd bij Vegvesen. De handmatige verversknop haalt de beschikbare meldingen opnieuw bij de bron op. Als de WFS-dienst niet bereikbaar is, het antwoord onvolledig is of de browser de externe aanvraag blokkeert, toont Nord een streepje/vraagteken in plaats van een misleidende 0. Vanwege de directe browserkoppeling is ondersteuning door de bron van CORS noodzakelijk. Live werking op Safari en Chrome moet nog worden bevestigd.

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