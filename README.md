# Nord

## Wegcamera’s als bronlinks

Wegcamera’s staan direct boven Direct openen in dezelfde vaste linkstijl. Bekende camera’s openen de oorspronkelijke officiële Vegvesen-pagina; voor andere Noorse etappes is de algemene camerakaart beschikbaar. Bij een onbekende of aangepaste route blijft een streepje met de officiële verkeersbron staan. De app haalt geen camerabeelden meer automatisch op. De offline shell is bijgewerkt naar v8.

## Technische onderhoudsronde (23 november 2026)

- De ongewijzigde route, CSS, pure hulpfuncties, applicatielogica en PNG zijn losse, versiegebonden bestanden in `assets/`. De HTML bevat geen dubbele Base64-afbeelding meer. Alleen het zichtbare detailpaneel wordt opgebouwd.
- De geselecteerde etappe krijgt voorrang bij weer en daglicht. Forecast-verzoeken voor dezelfde exacte locatie en tijdzone delen één lopend verzoek; dagen op dezelfde locatie worden uit één resultaat verwerkt. Actuele Open-Meteo-waarden van vandaag delen het forecast-verzoek. Een handmatige verversing tijdens een lopende cyclus behoudt de forceeroptie.
- Meetwaarden worden per animatieframe gebundeld; de etappelijst heeft één klikhandler. Bestaande bronlinks, route, lokale overnachtingen, vormgeving en offline basis blijven behouden.
- De service worker installeert een volledige, versiegebonden lokale app-shell; live externe bronnen worden niet gecachet. Bij een nieuwe assetversie moeten HTML, tests en service worker gezamenlijk worden bijgewerkt.
- `node tests/regression.cjs` controleert syntax, 14 reisdagen, nul versus ontbrekende waarde, datumgrenzen, prioriteit, groepering en offline assetverwijzingen. Live API's en browserweergave zijn aparte praktijkcontroles.


## Launch-afwerking: Nord Release Candidate (23 november 2026)

Deze versie kiest voor een **doordacht, stabiel productontwerp**, niet voor extra functies. De site gebruikt nog steeds een enkele HTML-pagina, native systeemfonts en controleerbare bronnen, zonder frameworks of toegangssleutels.

### Release-afwerking

- **Typografische hiërarchie:** grotere, beter leesbare labels, minder ultrakleine tekst en een consistente verhouding tussen plaatsnaam, temperatuur, kerncijfers en aanvullende gegevens. De broninformatie blijft toegankelijk.
- **Werkelijk responsieve kerncijfers:** One Glance gebruikt twee kolommen in een smal informatiepaneel en vier kolommen zodra het paneel zelf voldoende breed is (vanaf 560 CSS-pixels). Ook de overige weer-, route- en noorderlichtvelden schalen op basis van hun beschikbare ruimte. Op smalle schermen blijven alle velden in dezelfde volgorde aanwezig.
- **Etappelijst:** de vier vaste waarden zijn expliciet gelabeld als Wind, Sneeuw, Nacht en Wegen, met eenheden waar van toepassing. Ontbrekende gegevens blijven streepjes; zonder data worden de eenheden niet als meetwaarden gepresenteerd. Een geldig nulpunt blijft nul.
- **Uniforme componenten:** één centrale productlaag voor paneelhoeken, marges, typografie, bronlinks, aanraakdoelen, focusstaten en de verschillende kaarten. Overlappende historische CSS-afwerkingsblokken zijn vervangen; de belangrijke basis- en functionaliteitsstijlen blijven bestaan.
- **Bediening en toegankelijkheid:** segmentkeuze heeft een correcte beginstatus; het thema heeft een actuele, begrijpelijke toegankelijke knopnaam; de weergave ondersteunt toetsenbordfocus, verminderde beweging en browserzoom. De verticale pagina scrolt zonder tweede scrollcontainer.
- **Geen visuele ruis:** geen blauwe selectiestreep, geen decoratieve schaduwen rond elke waarde en geen overbodige instructie onder het kernoverzicht. De bron is vanuit de waarde zelf te openen.

### Releasecontrole

In code beoordeeld: 14 reisetappes plus 14 testetappes, een aangepaste route in beide standen, dezelfde noorderlicht- en verkeersvelden voor alle bestemmingen, de bekende 35 routepunten, ontbrekende getallen versus echte nulwaarden, balans van gegenereerde HTML-elementen, geldige JavaScript en CSS, en het ontbreken van geneste scrollgebieden.

Dit zijn **technische regressietests**, geen Pixel-/Lighthouse-/VoiceOver-/Safari-certificering. Controleer vóór een publieke lancering visueel op een smalle iPhone, een grotere iPhone, iPad en Mac, zowel licht als donker; gebruik ook tekstvergroting, een lang route-overzicht, een ontbrekende bronwaarde, een afwijkende overnachting, een eventuele wegcamera en offline modus. GitHub Pages en het subdomein kunnen een korte tijd of een oude browsercache achterlopen op de hoofdbranch.

De nieuwe UI probeert Apple-ontwerpprincipes zoals duidelijke hiërarchie, aanpasbare indeling en begrijpelijke bediening te volgen, zonder te claimen een officiële Apple-app te zijn.

Persoonlijke reiscockpit voor een winterroadtrip door Scandinavië. Een lichte, responsive website voor iPhone, iPad en desktop.

## Nord One Glance: ontwerpstandaard (november 2026)

Nord is een persoonlijke **onepager** op GitHub Pages, niet een generiek dashboard met meer en meer tegels. De visuele richting is geïnspireerd door de rust en hiërarchie van Apple Weer, maar het blijft een zelfstandige webapp met eigen bronkoppelingen. Er is geen Apple-affiliatie en de interface is niet letterlijk een native Apple-app. Licht en donker volgen standaard het systeem.

### Schermhiërarchie

1. **Reisdag in één oogopslag:** bestemming en geplande route, gemiddelde dagtemperatuur, windstoten, sneeuwval, nachtelijke bewolking, maanverlichting, actuele aurora boven de locatie, actuele Kp, daglicht en wegmeldingen rond controlepunten. Alle waarden en ook het streepje bij ontbrekende data zijn aanklikbaar naar hun eigen bron.
2. **Weer onderweg:** vooraf vastgelegde routepunten in rustige rijen, met temperatuur, windstoten, sneeuwval per uur, modelzicht en bewolking. De kijkuren zijn steekproefmomenten, geen aankomst- of passeertijden.
3. **Noorderlicht en weer in detail:** de zes bestaande noorderlichtbronnen plus het volledige dagelijkse weeroverzicht, daglicht en de aanvullende actuele weggegevens.
4. **Praktisch reizen:** route, tanken, overnachtingen, wegcamera's en externe bronnen. De aangepaste werkelijke overnachtingsplaats en de originele route blijven beschikbaar.

De volledige interface gebruikt een neutrale selectie in plaats van de oude blauwe linker rand, vrijwel geen decoratieve schaduwen, weinig kaders, consistente systeemtypografie en duidelijke getallen. Accentkleur is gereserveerd voor echte links en focus. Geen nieuwe account, kaartlaag, AI-advies, instellingen of eigen oncontroleerbare voorspellingen. De uitgebreide gegevens worden niet verwijderd, alleen beter geordend. Op grotere schermen blijft de lijst links en het detail rechts; op mobiel staat het detail in de geopende reisdag. **Reis 2027** is de standaard voor een nieuwe browser; **Komende dagen** blijft de teststand.

### Bronbetekenis en betrouwbaarheid

- Dagtemperatuur is het **daggemiddelde** in de modelverwachting, geen actuele thermometermeting. De uurweerwaarden zijn modelgegevens voor de vooraf gekozen locaties en kijkuren.
- **Aurora nu** is NOAA OVATION boven de plaats, **geen berekende zichtkans**. **Kp nu** is de actuele planetaire index. Beide waarden worden voor een toekomstige of eerdere geselecteerde dag als streepje weergegeven. De automatische actuele NOAA-verzoeken lopen alleen wanneer de geselecteerde datum vandaag is. Nachtbewolking en maanverlichting zijn juist datumgebonden.
- **Wegmeldingen** zijn alleen actuele meldingen binnen de gebruikte controlepunten, geen beoordeling dat de hele route veilig/open is. Het overzicht toont voor toekomstig geselecteerde dagen geen actuele teller als voorspelling voor die dag. Officiële Vegvesen-links blijven beschikbaar.
- Ontbrekende, niet-ondersteunde, verouderde of niet-geautoriseerde bronwaarden worden niet geschat of als nul getoond. Het overzicht wordt waar mogelijk zonder scroll- en focusverlies bijgewerkt.
- De code blijft vanilla HTML/CSS/JavaScript plus een kleine service worker. Er worden geen extra fonts, frameworks, servers of API-sleutels toegevoegd.

De voorbereiding gebruikt nog de 14 huidige etappes en 35 vooraf gekozen routepunten. De exacte Polarsteps-planning kan later de kijkuren en stops verfijnen zonder dat Nord een configuratiedashboard wordt.

## Vaste onderdelen op iedere etappe (november 2026)

Alle 14 etappes, inclusief Kiel, Göteborg, Luleå en Schijndel, hebben nu **dezelfde hoofdindeling en dezelfde informatiegroepen**. Niet de relevantie van een plek, maar alleen de beschikbare brongegevens bepalen of een getal zichtbaar is. Dit geldt ook in de teststand `Komende dagen`.

De volgende onderdelen en kolommen worden **altijd** getoond:
- **One Glance:** bestemming en vaste kernwaarden voor weer, nachtelijke bewolking, maanlicht, aurora, Kp, daglicht en wegmeldingen.
- **Weer onderweg:** dezelfde meetkolommen voor temperatuur, windstoten, sneeuwval per uur, zicht en bewolking. Zijn de werkelijke route of kijkpunten onbekend, dan komt er een rij met streepjes en een link naar de route in Apple Kaarten, in plaats van een verdwenen blok.
- **Noorderlicht:** steeds zes waarden: Vooruitzicht, Bewolking nacht, Maanlicht, Aurora nu, Bewolking nu en Kp nu. De aanwezigheid van het onderdeel is niet meer afhankelijk van een vooraf geselecteerde Noorse plaats. Voor bestemmingen zonder specifieke Nordlyskart-pagina wordt naar hun algemene noorderlichtinformatie verwezen, niet naar een verzonnen locatiegebonden planner.
- **Weer en daglicht:** dezelfde acht dagelijkse weervelden en drie astronomische velden, rechtstreeks uit de beschikbare bronnen.
- **Wegmeldingen en actueel weer:** steeds drie wegmeldingswaarden en vier actuele weervelden. Alleen voor bekende Noorse controlepunten gebruikt Nord een automatische Vegvesen-telling. Voor Kiel en andere etappes zonder dergelijke dekking blijft de telling **—**; officiële verkeersinformatie voor het betreffende land blijft aanklikbaar.
- **Etappe:** vertrek, bestemming en indicatieve rijafstand hebben in beide standen dezelfde drie kolommen. Bij een onbekende of gewijzigde afstand wordt **—** getoond.
- **Wegcamera's:** ook deze uitklapper blijft zichtbaar. Waar geen betrouwbare camerakoppeling aanwezig is, wordt **—** getoond met een link naar de officiële verkeersbron.

Actuele NOAA-aurora/Kp en Open-Meteo-huidige waarden worden alleen als **nu** getoond bij een geselecteerde datum die overeenkomt met vandaag. Weerdata voor toekomstige reisdagen, berekende nachtelijke bewolking en zontijden volgen hun eigen geldige voorspellingsperiode. Zonder geldige waarde verschijnt consequent **—**, ook wanneer de bron überhaupt geen dekking voor de regio heeft. Een echte nul blijft nul. Met een aangepaste werkelijke overnachtingsplaats worden de oorspronkelijke route- of plaatsgebonden livegegevens niet ten onrechte aan de nieuwe bestemming toegeschreven.

Reisafhankelijke acties zoals een specifieke veerbootlink, accommodatiezoeker of de daadwerkelijke tussenstops mogen inhoudelijk verschillen: dat zijn géén ontbrekende weer- of auroravelden. De visuele bronopmaak, witruimte, volgorde, kolommen en rustige selectie blijven uniform.

## Consistente weergave en scrollen (november 2026)

Een afwerkingsronde voor Nord One Glance, zonder nieuwe functies of extra instellingen:

- **Eén doorlopende pagina:** op desktop is de tweede, intern scrollende rechterzijbalk verwijderd. De hele pagina heeft één natuurlijke scroll; scrollen verandert de geselecteerde etappe niet meer automatisch. Klikken op een andere etappe brengt de bovenkant van de nieuwe cockpit in beeld. Op mobiel blijft het detail onder de geselecteerde etappe geopend. Toetsenbordfocus wordt bij wisseling behouden en naar de nieuwe cockpit verplaatst wanneer nodig. Verminderde beweging wordt gerespecteerd.
- **Eén visueel systeem:** neutrale selectie, overal dezelfde basis voor paneelachtergronden, afgeronde hoeken, ruimte tussen secties, numerieke typografie, subtiele scheidingslijnen en bronlinks. Weer, noorderlicht, daglicht, wegmeldingen, brandstof en overnachtingslinks gebruiken dezelfde rustige vormprincipes zonder randen rond ieder getal. Klikbare hoofdelementen houden voldoende hoogte voor aanraakbediening.
- **Ontbrekende informatie:** bronwaarden die `null`, leeg, niet-numeriek of niet beschikbaar zijn worden als **`—`** weergegeven. Bij ontbrekende weergegevens toont Nord geen fictief wolkenicoon. Ontbrekende euro-omrekeningen worden als een enkel streepje getoond, zonder verzonnen eurobedrag of eenheid. Een echte waarde van **0** blijft **0**.
- **Datumbewust:** actuele wegmeldingen en NOAA-waarden worden niet als vooruitzichten voor toekomstige etappes getoond. De relevante bron blijft wel aanklikbaar. Poolnacht met nul daglicht en zonsopkomst *Geen* zijn geldige astronomische omstandigheden, geen ontbrekende gegevens.
- **Responsieve afwerking:** extra controles en kleine-schermopmaak voor smalle telefoons, flexibele kolommen, afbreking van lange labels, veilige schermranden en consistente ondermarges. Geen globaal verbergen van horizontale overloop waarmee echte layoutfouten onzichtbaar worden.

Technisch gecontroleerd: JavaScript-syntax, CSS-blokstructuur, 14 reis- en 14 testetappes, een afwijkende overnachtingsplaats, 35 voorbereide routepunten, ontbrekende getallen en behoud van nulwaarden. Echte Safari/iPhone/Mac-rendering, scrollgevoel, dynamische browserwerkbalken en de feitelijke GitHub Pages-release blijven aparte praktijkcontroles. De app blijft zelf HTML/CSS/JavaScript op GitHub Pages; er zijn geen nieuwe afhankelijkheden of diensten toegevoegd.

## Testen

Open de bestaande Nord op GitHub Pages. De reisstand opent standaard in een nieuwe browser. Met de subtiele periodekeuze bovenaan kun je ook de teststand openen:

- **Komende dagen:** actuele weersverwachtingen voor een reeks plaatsen uit de reis, maar met datums van de komende dagen. Dit is de teststand.
- **Reis 2027:** de voorlopige reisplanning vanaf 21 januari 2027. Voorspellingen verschijnen alleen als de betreffende datum binnen de beschikbare weershorizon valt.

Kies een dag voor zonsopkomst, zonsondergang, daglichtduur, weergegevens en directe externe links. Dark mode volgt standaard de systeeminstelling en is handmatig te wisselen.

## Afwerking van de cockpit (november 2026)

Nord houdt bewust de bestaande compacte opzet: een tijdlijn links, een per etappe gekozen cockpit rechts (op mobiel onder de dag), geen extra tekstblokken tussen informatietegels en klikbare waarden en streepjes naar de bron. De lichte/donkere modus blijft behouden.

- **Kerncijfers eerst.** Het huidige ontwerp opent met weer en noorderlicht in één overzicht. De vroegere etappe-eerst-indeling is bij de latere One Glance-ronde vervangen. Vertrek, bestemming, indicatieve rijafstand, uitklapbare tussenstops, benzine 95 en één knop **Open route** naar Apple Kaarten staan nog steeds verderop bij Etappe. De links naar tankstations, verkeersinformatie, veerboten en overnachtingen blijven onder **Direct openen**.
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

Noorderlicht: geen externe widget en geen eigen voorspellingen. De cockpit combineert zes compacte tegels: **Vooruitzicht** (op dit moment `—` met directe link naar de plaatsgebonden [Nordlyskart Trip Planner](https://nordlyskart.no/en/northern-lights/alta/trip-planner)), **Bewolking nacht** (18:00–06:00 lokaal uit de uurverwachting van Open-Meteo), **Maanlicht** (benadering van verlicht maanoppervlak op basis van de Open-Meteo-maanfase), **Aurora nu** ([NOAA SWPC OVATION](https://www.spaceweather.gov/products/aurora-30-minute-forecast)), **Bewolking nu** (Open-Meteo) en **Kp nu** ([NOAA](https://www.spaceweather.gov/products/planetary-k-index)). Het maanlichtpercentage zegt niet of de maan boven de horizon staat. De waarde `Vooruitzicht` wordt niet automatisch gevuld: er is nog geen betrouwbare, rechtstreeks leesbare toegang tot de afzonderlijke beoordelingen 'Good/Possible/Weak' van Nordlyskart. Dat is bewust niet nagebootst. De geselecteerde reisnacht bepaalt de nachtelijke bronwaarden; de drie 'nu'-tegels zijn alleen ingevuld wanneer die reisdatum gelijk is aan vandaag. Dit voorkomt dat een actuele NOAA-meting als voorspelling voor een toekomstige reisdag verschijnt. Buiten de voorspellingsperiode of bij bronproblemen is een `—` zichtbaar, als aanklikbare tegel.

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

## Weer onderweg: voorbereid per etappe (november 2026)

Op basis van de nu bekende 14 Nord-etappes (de oorspronkelijke Polarsteps-link was niet rechtstreeks uitleesbaar) zijn **35 vaste kijkmomenten** voorbereid. Elke etappe bevat 2 tot 4 relevante locaties: vertrek, een bekend controlepunt en/of de eindbestemming. Voorbeelden zijn Mosjøen, Saltfjellet, Bodø, Narvik, Kvænangsfjellet en Sennalandet. De coördinaten zijn afkomstig uit de bestaande Nord-route en de reeds vastgelegde controlepunten; onbekende tussentrajecten zijn niet ingevuld met verzonnen plaatsen.

Het onderdeel **Weer onderweg** staat direct onder het overzicht van de gekozen reisdag. Je hoeft onderweg **geen locatie, uur, model of filter** te kiezen. Elk van de 35 momenten is vooraf gekoppeld aan een indicatief lokaal uur, met de labeltekst **model**. Deze uren zijn alleen consistente steekproefmomenten van de weersverwachting: het zijn **geen verwachte passeer- of aankomsttijden** en niet gebaseerd op een bevestigde veerbootdienstregeling.

Per punt toont Nord:
- temperatuur in °C;
- windstoten in km/u;
- sneeuwval in het getoonde uur (cm, niet de volledige dag);
- modelmatig zicht (meters of kilometers), geen sensor langs de rijbaan.

Elke rij is volledig aanklikbaar naar de locatiegebonden [Open-Meteo Forecast API](https://open-meteo.com/en/docs). Bij relevante bergpassen staan bovendien directe links naar de officiële Vegvesen-kaart. De bronwaarden worden alleen opgehaald wanneer de betreffende etappe is geopend, maximaal twee parallelle verzoeken, binnen de beschikbare **16-daagse voorspellingsperiode**. Resultaten worden één uur lokaal gecachet; een handmatige verversing vraagt opnieuw gegevens op. Bij niet-beschikbare waarden blijft een klikbaar streepje zichtbaar. Echte nulwaarden zijn geldig. Een bronfout wordt zichtbaar als **bron tijdelijk niet bereikbaar**. Tijdens het laden worden de bestaande rijen waar mogelijk op hun plaats bijgewerkt, met behoud van focus en scroll.

Als een overnachting of vertrekplaats afwijkt van het oorspronkelijke plan, toont Nord **geen automatische routeweerwaarden** alsof de vooraf gekozen locaties nog bij de gewijzigde route horen. Het dagweer op de geplande eindbestemming blijft afzonderlijk beschikbaar en correct gelabeld. Vaste veerbootdata veranderen nooit vanzelf. Bij offline gebruik kan eerder opgehaalde uurinformatie verschijnen met een offline-aanduiding, maar Nord claimt geen actuele weg- of weersituatie.

Dit is de **voorbereide eerste versie**. Bij de laatste routecontrole met de volledige Polarsteps-planning kunnen precieze stops, volgorde, kijkuren en veerbootmomenten worden aangescherpt, zonder de dagelijkse interface uit te breiden.

## Werkelijke overnachting en offline gebruik (november 2026)

De originele 14-daagse reisroute wordt niet overschreven. In **Reis 2027** verschijnt bij alle gewone overnachtingsdagen een compacte, uitklapbare keuze **Werkelijke overnachting vastleggen**. Vul plaats en land in en kies **Opslaan**. Daarna:

- Toont de etappe de gekozen overnachtingsplaats, en de volgende gewone etappe gebruikt die plaats en dat land als vertrekpunt in de Apple Kaarten-link. De accommodatiezoeker voor de betreffende nacht gebruikt ook de gekozen locatie, datum, één nacht en **twee personen**.
- Behoudt Nord de oorspronkelijke bestemming intern. Voor een afwijkende eindbestemming worden de weer- en daglichtwaarden expliciet aangeduid als gegevens bij de **geplande** bestemming. In de tijdlijn verschijnen daar geen misleidende weergetallen voor de alternatieve plaats.
- Wordt een aangepaste rijafstand niet gegokt. De automatische wegmeldingentelling en de routecamera's verdwijnen voor een gewijzigde etappe; controleer de werkelijke route zelf bij Apple Kaarten en de officiële wegbeheerder. De telling is sowieso alleen een inventarisatie van meldingen rondom controlepunten, geen bewijs dat de route open of veilig is. De betreffende tegel noemt daarom **Afsluitmeldingen**.
- Blijven reisdata, vervolgovernachtingsdatums en vaste veerboten **ongewijzigd**. Nord verschuift niet automatisch een nacht of veerboot. De twee Stena Line-nachten en de thuiskomstdag zijn niet bewerkbaar.
- Kan **Planning herstellen** per datum de afwijking verwijderen. Alle wijzigingen worden alleen lokaal in de browser op dit apparaat opgeslagen en synchroniseren niet tussen bijvoorbeeld Mac en iPhone. Maak bij gebruik op meerdere apparaten dezelfde wijziging op elk apparaat.

Voor offline beschikbaarheid is `sw.js` toegevoegd, een kleine service worker die alleen de eigen `index.html` en daarmee de routegegevens beschikbaar houdt. Na **één succesvol online bezoek** kan de pagina opnieuw worden geopend wanneer er tijdelijk geen internet is, voor zover de browser de offline opslag bewaart. Een offline statusmelding maakt duidelijk dat live weer, wegmeldingen, benzineprijzen en externe boekingslinks niet zijn bijgewerkt; die externe gegevens worden **niet** in de offline cache opgeslagen. De reeds lokaal opgeslagen weergegevens krijgen een vermelding dat ze offline en mogelijk verouderd zijn. Vooraf op de telefoon online openen en daarna met vliegtuigmodus testen blijft essentieel. Een service worker werkt alleen op HTTPS en is niet gegarandeerd wanneer de browser caches verwijdert.

De numerieke bronverwerking behandelt lege waarden, witruimte en `null` als onbekend, maar accepteert een échte `0` wel. Er zijn geen extra API-sleutels, accounts, back-end, GPS-volging of automatische veiligheidsclaims toegevoegd.

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