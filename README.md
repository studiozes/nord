# Nord

Persoonlijke reiscockpit voor een winterroadtrip door Scandinavië. Een lichte, responsive website voor iPhone, iPad en desktop.

## Testen

Open de website zodra GitHub Pages is ingeschakeld. Bovenaan kun je kiezen:

- **Komende dagen:** actuele weersverwachtingen voor een reeks plaatsen uit de reis, maar met datums van de komende dagen. Dit is de teststand.
- **Reis 2027:** de voorlopige reisplanning vanaf 21 januari 2027. Voorspellingen verschijnen alleen als de betreffende datum binnen de beschikbare weershorizon valt.

Kies een dag voor zonsopkomst, zonsondergang, daglichtduur, weergegevens en directe externe links. Dark mode volgt standaard de systeeminstelling en is handmatig te wisselen.

## Afwerking van de cockpit (november 2026)

Nord houdt bewust de bestaande compacte opzet: een tijdlijn links, een per etappe gekozen cockpit rechts (op mobiel onder de dag), geen extra tekstblokken tussen informatietegels en klikbare waarden en streepjes naar de bron. De lichte/donkere modus blijft behouden.

- **Etappe eerst.** Vertrek, bestemming, indicatieve rijafstand, uitklapbare tussenstops, benzine 95 en één knop **Open route** naar Apple Kaarten. De links naar tankstations, verkeersinformatie, veerboten en overnachtingen blijven onder **Direct openen**.
- **Rustige hiërarchie.** Zachte paneelachtergronden, consistenter grotere labels, duidelijkere cijfers en subtiele markering van de gekozen dag. Geen grafieken, kaarten of animaties toegevoegd.
- **Reisdag automatisch.** In `Reis 2027` wordt bij het openen de huidige etappe gekozen als de huidige datum precies op een reisdag valt. De gebruiker kan altijd handmatig een andere etappe kiezen. In de teststand blijven de komende dagen bruikbaar.
- **Gegevens met peildatum.** De weersectie toont wanneer de voorspelling is opgehaald; oude gegevens krijgen een andere aanduiding. Benzineprijzen behouden het onderscheid tussen recente lokale meldingen, landelijke week-/maandgemiddelden en ontbrekende informatie. Bij ontbrekende weerwaarden blijft de klikbare `—` behouden.
- **Gericht vernieuwen.** Nieuwe weer- en zontijden werken afzonderlijke waarden bij, zonder het hele overzicht opnieuw op te bouwen. Bij het verversen blijven uitklapbare informatiepanelen open, worden beschikbare brandstofbronnen opnieuw gecontroleerd en wordt het beeld van de wegcamera's opnieuw opgevraagd. Bronproblemen of ontbrekende data worden niet als 0 gepresenteerd.

Controleer bij iedere wijziging zowel de light/dark-weergave als kleine en brede schermen. Live weergave en bereikbaarheid van externe API's zijn afzonderlijke controles en zijn niet gegarandeerd door een JavaScript-syntaxcontrole.

## Tweede kwaliteitsronde (november 2026)

De vorm en functies blijven bewust hetzelfde. Deze ronde corrigeert details die vooral merkbaar zijn bij intensief gebruik en het regelmatig ophalen van externe gegevens:

- **Consistente actuele waarden:** bij het bijwerken van weer- en bronwaarden wordt ook de toegankelijke (gesproken) waarde van de klikbare tegel bijgewerkt.
- **Rustige interactie:** de bronpanelen voor noorderlicht, wegweer en wegmeldingen verversen bij ongewijzigde indeling hun bestaande gegevens en labels in plaats van het hele onderdeel te vervangen. Links, uitklappers en toetsenbordfocus blijven daardoor zoveel mogelijk behouden.
- **Juiste verkeersbronnen:** de link *Verkeer* gebruikt nu per bestemmingsland Vegvesen (NO), Trafikverket (SE), Trafikinfo (DK), Autobahn GmbH (DE) of Rijkswaterstaat (NL). Het blijft een externe bronpagina, geen automatisch gecontroleerde volledige route.
- **Brongegevens zorgvuldig verwerken:** een benzineprijsmelding met een expliciete tijdzone wordt als zodanig gelezen, zonder onterecht een tweede UTC-aanduiding toe te voegen. De eis van minimaal drie recente Noorse stations binnen 40 km blijft ongewijzigd.
- **Afwerking:** grotere peildatum- en bronlabels, consistente zichtbare toetsenbordfocus, en een browserkleur die de lichte of donkere modus volgt (ook bij automatische systeemstand).

Geen nieuwe accounts, widgets, algoritmische veiligheidsclaims of extra informatietegels toegevoegd. Werking van externe diensten, responsiviteit en visuele weergave op een echt toestel moeten aanvullend live worden getest.

## Controle op betrouwbaarheid (november 2026)

Deze afrondende controle heeft geen extra tegels of menu's toegevoegd, maar bestaande eisen aangescherpt:

- Ontbrekende modelgegevens blijven `—`. Bij actuele Open-Meteo-waarden wordt een ontbrekende bewolkingswaarde niet stilzwijgend `0%`. Ook ontbrekende NOAA-aurora- en Kp-waarden worden niet als `0` geïnterpreteerd. Een echte bronwaarde van nul blijft wel geldig.
- Het deel *Actueel weer* gebruikt de tijd van het modelresultaat (met de bijbehorende tijdzone) in plaats van alleen het tijdstip van downloaden. Verouderde resultaten worden niet als actueel gepresenteerd. Een bronfout levert een streepje op en laat de bronlink staan.
- De brandstof- en ECB-gegevens worden alleen in het geselecteerde zichtbare etappepaneel bijgewerkt. Dit voorkomt dat bij wisselen van etappe een prijs van de ene bestemming tijdelijk bij een andere staat.
- De kleine tijdsaanduidingen bij *Weer*, *Actueel weer* en *Wegmeldingen* zijn rechtstreeks klikbaar naar hun bron; ook ontbrekende bronwaarden houden die link.
- Wanneer een geselecteerde reisdag nog buiten de weershorizon ligt, geeft de compacte statusbalk dit aan en suggereert Nord niet dat voor die toekomstige datum al een weersverwachting gecontroleerd is.

De opzet met een zelfstandige `index.html`, bronlinks, weer/noorderlicht/wegmeldingen, lokale brandstofprijzen waar verantwoord, EUR-omrekening, licht/donker en de compacte etappe-cockpit blijft ongewijzigd.

## Broncode en gegevens

Voor deze eerste publicatie is alles (HTML, CSS, JavaScript, route en icoon) bewust samengebracht in één zelfstandig `index.html`. Updates aan dit bestand verschijnen na de eerstvolgende GitHub Pages-publicatie.

Weer: [Open-Meteo](https://open-meteo.com/). Zontijden: [Sunrise-Sunset.org](https://sunrise-sunset.org/).

Noorderlicht: geen externe widget en geen eigen voorspellingen. De cockpit combineert zes compacte tegels: **Vooruitzicht** (op dit moment `—` met directe link naar de plaatsgebonden [Nordlyskart Trip Planner](https://nordlyskart.no/en/northern-lights/alta/trip-planner)), **Bewolking nacht** (18:00–06:00 lokaal uit de uurverwachting van Open-Meteo), **Maanlicht** (benadering van verlicht maanoppervlak op basis van de Open-Meteo-maanfase), **Aurora nu** ([NOAA SWPC OVATION](https://www.spaceweather.gov/products/aurora-30-minute-forecast)), **Bewolking nu** (Open-Meteo) en **Kp nu** ([NOAA](https://www.spaceweather.gov/products/planetary-k-index)). Het maanlichtpercentage zegt niet of de maan boven de horizon staat. De waarde `Vooruitzicht` wordt niet automatisch gevuld: er is nog geen betrouwbare, rechtstreeks leesbare toegang tot de afzonderlijke beoordelingen 'Good/Possible/Weak' van Nordlyskart. Dat is bewust niet nagebootst. De geselecteerde reisnacht bepaalt alleen de nachtelijke bronwaarden; de drie 'nu'-tegels horen bij de actuele tijd. Buiten de voorspellingsperiode of bij bronproblemen is een `—` zichtbaar, als aanklikbare tegel.

**Brandstof:** onder Etappe staat een compacte, klikbare indicatie voor benzine 95 in het bestemmingsland (geen prijsvoorspelling voor de reisdatum). Denemarken: actuele landelijke pompprijsgemiddelden via de openbare fuel-prices.eu-API; Zweden, Duitsland en Nederland: laatste wekelijkse nationale Euro 95-gemiddelde uit de EU Oil Bulletin-historie; Noorwegen: laatste SSB-maandgemiddelde in NOK via de publieke PxWebApi v2. De meetdatum en het type prijs staan bij het bedrag. Bij een waarde in NOK, SEK of DKK verschijnt daaronder klein de indicatieve euro-omrekening op basis van de laatst beschikbare ECB-referentiekoers via [Frankfurter](https://frankfurter.dev/). De euro-omrekening en het streepje wanneer een koers ontbreekt zijn apart klikbaar naar [ECB](https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html). Koersen worden binnen zeven dagen van hun peildatum geaccepteerd; ECB-koersen zijn geen realtime bank- of wisselkantoortarieven. Als een landelijk bedrag al in euro’s wordt geleverd, verschijnt geen onnodige dubbele omrekening. Bij een onbereikbare of onvolledige brandstofbron verschijnt `—` met een link. In Direct openen staat een aparte link *Benzineprijzen* om kort voor het tanken actuele prijzen te controleren. Brandstofzekerheid en voldoende reserve blijven belangrijker dan een eventueel klein prijsverschil. Bron: [fuel-prices.eu](https://www.fuel-prices.eu/api/docs/), [SSB](https://www.ssb.no/en/statbank/table/09654) en [DrivstoffAppen](https://drivstoffappen.no/drivstoffpriser).

**Cockpit:** acht dagweertegels inclusief overheersende windrichting, maximale uurlijkse neerslagkans en gemiddelde luchtvochtigheid, gelijke compacte vakken en geen toelichtingsalinea's tussen de tegels. Alle waarden en streepjes zijn klikbaar naar een passende bronpagina of een datum-/plaatsgebonden brondataset. **Van** en **Naar** zijn niet klikbaar en hebben hun label boven de plaatsnaam; de geschatte rijafstand is wel een link naar Apple Kaarten. Het zonsondergangicoon heeft een pijl omlaag. De lijst met steps, de bronlinks voor wegweer en de vier Vegvesen-kaartlagen zitten achter uitklapbare onderdelen. De wegmeldingenteller blijft een indicatie rond controlepunten, nooit een bewijs van een open of veilige route. De Vegvesen-camerabeelden zijn beeldtegels zonder onderschrift. Aantikken opent de officiële cameradetailpagina, **niet** de losse afbeeldings-URL. De datum/tijd in de afbeelding blijft zichtbaar. Op desktop staat het detailpaneel naast de tijdlijn, op mobiel bij de gekozen dag.

**Route:** 14 reisdagen van 21 januari t/m 3 februari 2027. De voorlopige rijkilometers uit de eerdere routeberekening zijn behouden en worden met *ca.* aangeduid. Ze zijn geen in Polarsteps gecontroleerde afstanden. Veerboottrajecten en optionele omwegen zijn niet meegenomen; waar relevant staat een afzonderlijke routeopmerking. Controleer de daadwerkelijke autoroute, wegtoestand en dienstregeling voor vertrek.

Een per etappe gecontroleerde Polarsteps-rijafstand kan worden opgenomen als `polarstepsRoadKm` en krijgt voorrang op `roadEstimateKm`. Gebruik hiervoor alleen rijkilometers, zonder vaarafstand. Er is geen automatische Polarsteps-synchronisatie. Veerbootstatus wordt bij de rederij gecontroleerd. Bij bronproblemen kunnen actuele waarden ontbreken.

Gebruik geen persoonlijke toegangstokens, reserveringsgegevens of geheime Polarsteps-links in deze openbare repository.

## Extra weerinformatie en valutakoersen

De dagverwachting gebruikt naast de oorspronkelijke zes waarden twee nieuwe velden uit [Open-Meteo](https://open-meteo.com/en/docs):

- **Wind uit**: `wind_direction_10m_dominant` als leesbare windstreek (N, NO, O, ZO, Z, ZW, W, NW). Dit beschrijft de overheersende windrichting bij de geselecteerde bestemming en is geen live meting.
- **Neerslagkans**: `precipitation_probability_max`, het maximum van de berekende uurlijkse kansen die dag, dus niet de kans dat de hele etappe nat wordt.
- **Zicht** in **Actueel weer**: modelwaarde `visibility` uit de huidige Open-Meteo-gegevens, bij Noorse bestemmingen. Dit is geen gemeten zicht op een specifieke weg of bergpas.

De dagwaarden worden binnen de bestaande weershorizon van 16 dagen opgehaald, via dezelfde directe verbinding. Buiten die periode of bij ontbrekende brondata blijven de waarden `—` en is de bron nog steeds aanklikbaar. De aanvullende dagvelden maken eenmalig opnieuw ophalen van oudere lokale caches noodzakelijk.

Bij prijsbedragen in kronen is `NOK/SEK/DKK` de hoofdwaarde. De kleine euro-indicatie is apart aanklikbaar, laat de ECB-peildatum zien en verandert niet de oorspronkelijke prijs. Een ontbrekende koers geeft `≈ € —/l`, zonder schatting. De EUR-omrekening hoort bij de getoonde benzineprijs en is niet per definitie de koers op de dag waarop die benzineprijs werd gemeten.

## Overnachten tijdens de etappe

De compacte accommodatiezoeker staat meteen onder **Etappe**, vóór het weer. In de reisstand worden de geplande eindbestemming, incheckdatum en standaard één nacht gekozen, voor **2 personen**.

- **Booking** en **Airbnb** openen een externe zoektocht met de bestemming, in- en uitcheckdatum en twee gasten in de zoeklink. Controleer deze waarden op de website; platforms kunnen hun URL-indeling veranderen.
- **HomeToGo** opent een gecontroleerde bestemmings- of regiopagina (specifiek Lofoten, Tromsø of Göteborg waar beschikbaar, anders Noorwegen, Zweden of de homepage). Er is geen betrouwbaar geverifieerde deep-link voor alle zoekfilters samen. Daarom staat bij de tegel **filters zelf**. De gebruiker stelt de juiste stad, datums en gasten daar zelf in.
- **Cabins & bijzondere plekken** is een subtiele extra zoeklink in Google Maps voor eenvoudige hutten, Noorse rorbuer of Zweedse stugor. Deze link toont ontdekkingsmogelijkheden, geen vooraf gecontroleerde beschikbaarheid.
- Op **21 januari** en **2 februari** overnachten de reizigers op de Stena Line; op de thuiskomstdag is geen extra boeking nodig. Op deze drie dagen verschijnt geen accommodatiezoeker, ook niet in de teststand.
- De interface gebruikt drie kleine iconen in de Nord-stijl, zonder grote logo's, prijsvergelijker, datumformulier of extra widgets.

De voorkeur is bewust **budgetvriendelijk en bijzonder**, bij benadering € 100 per nacht, maar er is géén harde prijsfilter. Een zelfstandig huisje of cabin met **één bed** kan al passen; we vragen nooit twee bedden of twee slaapkamers. Een slaapmat en slaapzak kunnen een alternatief zijn als dat praktisch en door de verhuurder toegestaan is. Verwarming, bereikbaarheid in de winter en eigen sanitaire voorzieningen zijn belangrijker dan luxe; controleer dit en mogelijke schoonmaakkosten en toeslagen zelf. De externe links maken geen reservering en garanderen geen beschikbare accommodatie.

## Actuele omstandigheden en wegweer

Bij Noorse bestemmingen toont Nord naast de bestaande dagvoorspelling vier **actuele Open-Meteo-modelwaarden**: neerslag, luchtvochtigheid, windrichting en zicht. De gegevens worden tegelijk met de bestaande actuele bewolkingswaarde aangevraagd, zonder extra API of server. De handmatige verversknop vraagt deze waarden opnieuw op. Deze modelwaarden zijn **geen daadwerkelijke metingen op de weg** en gelden voor het huidige moment, niet voor de toekomstige reisdatum.

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