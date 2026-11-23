/* Nord · eenvoudige reiscockpit, zonder tracking of accounts. */
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const ROUTE = Array.isArray(window.NORD_PLAN) ? window.NORD_PLAN : [];
  const RETURN = window.NORD_RETURN || 'Terugreis nog niet uitgewerkt';
  const {MS_DAY}=window.NordCore;
  const STORE_PREFIX = 'nord.v1.';
  const icons = {
    refresh:'<path d="M20 8a8 8 0 1 0 1 7M20 3v5h-5"/>',
    moon:'<path d="M20 14A8 8 0 0 1 10 3a9 9 0 1 0 10 11z"/>',
    sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l2 2m10 10 2 2M19 5l-2 2M7 17l-2 2"/>',
    cloudy:'<path d="M5 19a4 4 0 0 1 0-8 6 6 0 0 1 11-2 5 5 0 0 1 2 10z"/>',
    part:'<path d="M13 2v3m7 5h-3m0-6-2 2M5 20a4 4 0 0 1 0-8 6 6 0 0 1 11-2 4.5 4.5 0 0 1 2 9z"/>',
    rain:'<path d="M5 14a4 4 0 0 1 0-8 6 6 0 0 1 11-2 5 5 0 0 1 2 10zM8 17l-2 4m8-4-2 4m8-4-2 4"/>',
    snow:'<path d="M5 14a4 4 0 0 1 0-8 6 6 0 0 1 11-2 5 5 0 0 1 2 10zM8 17v5m-3-2.5h6M18 17v5m-3-2.5h6"/>',
    wind:'<path d="M3 7h12a3 3 0 1 0-3-3M2 12h18a3 3 0 1 1-3 3M4 17h8a3 3 0 1 1-3 3"/>',
    thermometer:'<path d="M9 14.8V5a3 3 0 0 1 6 0v9.8a5 5 0 1 1-6 0Z"/><path d="M12 10v8"/>',
    feels:'<path d="M7.5 14V5a2.5 2.5 0 0 1 5 0v9a4.5 4.5 0 1 1-5 0Z"/><path d="M10 10v7M16 7h5M16 11h4M16 15h3"/>',
    snowflake:'<path d="M12 2v20M3.3 7l17.4 10M3.3 17 20.7 7M9 5l3-3 3 3m-6 14 3 3 3-3M4.5 11 3.3 7l4.4-1M16.3 18l4.4-1-1.2-4M7.7 18l-4.4-1 1.2-4M19.5 11l1.2-4-4.4-1"/>',
    humidity:'<path d="M12 3C9 7 5 10.2 5 14a7 7 0 0 0 14 0c0-3.8-4-7-7-11z"/><path d="M9 15h.01M15 12h.01M9 18l6-9"/>',
    sunrise:'<path d="M2 18h20M5 21h14M6 15a6 6 0 0 1 12 0M12 2v5M3 7l3 3m15-3-3 3"/>',
    sunset:'<path d="M2 18h20M5 21h14M6 15a6 6 0 0 1 12 0M12 2v8m-3-3 3 3 3-3"/>',
    clock:'<circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/>',
    road:'<circle cx="5" cy="5" r="2.5"/><circle cx="19" cy="19" r="2.5"/><path d="M8 5h8a4 4 0 0 1 0 8H8a3 3 0 0 0 0 6h8"/>',
    pin:'<path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
    flag:'<path d="M5 22V3m0 1c5-3 8 3 15 0v12c-7 3-10-3-15 0"/>',
    alert:'<path d="m12 3 10 18H2L12 3z"/><path d="M12 9v5m0 3h.01"/>',
    roadblock:'<rect x="3" y="8" width="18" height="10" rx="1"/><path d="m7 8 5 10m0-10 5 10M6 21v-3m12 3v-3"/>',
    ship:'<path d="m3 14 9-4 9 4-3 6H6zm4-2V5h10v7M10 5V2h4v3M2 22q2-2 5 0 3-2 5 0 3-2 5 0 3-2 5 0"/>',
    compass:'<circle cx="12" cy="12" r="9"/><path d="m16 8-2 6-6 2 2-6z"/>',
    eye:'<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>',
    moonstar:'<path d="M20.5 14A9 9 0 0 1 10 3.5 9 9 0 1 0 20.5 14Z M20 3v6m-3-3h6"/>',
    fuel:'<rect x="4" y="3" width="11" height="18" rx="2"/><path d="M7 6h5v5H7zM15 13h2v4a2 2 0 0 0 4 0V9l-4-4M2 21h15"/>',
    bed:'<path d="M3 19V9h18v10M3 16h18M5 9V6h14v3"/>',
    arrow:'<path d="m9 5 7 7-7 7"/>',
    link:'<path d="M13 5h6v6M19 5l-9 9M19 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"/>'
  };
  const ico = (name, cls='') => `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${icons[name] || icons.cloudy}</svg>`;
  const esc = s => String(s ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const safeGet = (k, fallback) => {try {let raw=localStorage.getItem(STORE_PREFIX+k);return raw===null?fallback:JSON.parse(raw)}catch{return fallback}};
  const safePut = (k,v) => {try {localStorage.setItem(STORE_PREFIX+k,JSON.stringify(v))}catch{}};
  const {dateAtHome,addDays,labelDate,n,prioritise,uniqueBy,groupBy}=window.NordCore;
  const displayValue=x=>{
    if(x===null||x===undefined||(typeof x==='number'&&!Number.isFinite(x)))return '—';
    const text=String(x).trim();
    return !text||/^(?:nan|null|undefined|n\/a)$/i.test(text)?'—':text;
  };
  const fmtDeg = x => n(x)===null?'—':`${Math.round(Number(x))}°`;
  const fmt = (x,suf='') => n(x)===null?'—':`${Math.round(Number(x))}${suf}`;
  const feelsLike=x=>n(x)===null?'—':'Voelt '+fmtDeg(x);
  const locationId=d=>`${d.lat.toFixed(2)},${d.lon.toFixed(2)}`;
  const weatherCache=safeGet('weather',{});
  const sunCache=safeGet('sun',{});
  // De echte reis is de standaardweergave; komende dagen blijft een optionele teststand.
  let mode=safeGet('mode','trip')==='preview'?'preview':'trip';
  let selected=null;
  let busy=false, lastError=false;

  // Originele reis blijft onaangetast. Wijzigingen worden lokaal per datum bewaard.
  const actualStops=safeGet('actualStops',{});
  const STOP_COUNTRIES=['no','se','dk','de','nl','fi'];
  function stopFor(date){
    const value=actualStops&&typeof actualStops==='object'&&!Array.isArray(actualStops)?actualStops[date]:null;
    if(!value||typeof value.place!=='string'||typeof value.country!=='string')return null;
    const place=value.place.trim(),country=value.country.toLowerCase();
    return place&&place.length<=85&&STOP_COUNTRIES.includes(country)?{place,country}:null;
  }
  function tripDays(){
    return ROUTE.map((original,i)=>{
      const stop=stopFor(original.date),prior=ROUTE[i-1];
      const last=prior&&prior.ferry!=='stena'?stopFor(prior.date):null;
      const changedFrom=Boolean(last&&prior.place===original.from&&(last.place!==prior.place||last.country!==prior.country));
      const from=changedFrom?last.place:original.from,fromCountry=changedFrom?last.country:(original.fromCountry||original.country);
      const overnightPlace=stop?stop.place:original.place,overnightCountry=stop?stop.country:original.country;
      const changedTo=overnightPlace!==original.place||overnightCountry!==original.country;
      return {...original,id:'trip-'+i,stage:'trip',from,fromCountry,overnightPlace,overnightCountry,
        actualStop:stop,destinationChanged:changedTo,routeChanged:changedTo||changedFrom};
    });
  }
  function storeStop(date,place,country){
    if(mode!=='trip'||!ROUTE.some(d=>d.date===date&&d.ferry!=='stena'&&d.place!=='Schijndel'))return false;
    const value=String(place||'').trim().replace(/\s+/g,' ');
    if(!value||value.length>85||!STOP_COUNTRIES.includes(country))return false;
    actualStops[date]={place:value,country};
    safePut('actualStops',actualStops);
    return true;
  }
  function clearStop(date){
    if(!Object.prototype.hasOwnProperty.call(actualStops,date))return;
    delete actualStops[date];safePut('actualStops',actualStops);
  }

  const countryName=c=>({dk:'Denmark',se:'Sweden',no:'Norway',de:'Germany',nl:'Netherlands',fi:'Finland'})[c]||'Norway';
  const placeCountry=d=>countryName(d.country);
  const previewPlaces=ROUTE.filter((d,i)=>!d.optional && (i===0 || d.place!==ROUTE[i-1].place)).slice(0,9);
  function days(){
    if(mode==='trip')return tripDays();
    const today=dateAtHome();
    return previewPlaces.map((d,i)=>({...d,planDate:d.date,date:addDays(today,i),id:'preview-'+i,stage:'preview'}));
  }
  function dataKey(d){return `${locationId(d)}@${d.date}`}
  const weather=d=>weatherCache[dataKey(d)]?.value || null;
  const solar=d=>sunCache[dataKey(d)]?.value || null;
  const fresh=d=>{const item=weatherCache[dataKey(d)];return item && Date.now()-item.when<60*60*1000 && item.value && Object.hasOwn(item.value,'humidity') && Object.hasOwn(item.value,'nightCloud') && Object.hasOwn(item.value,'moonlight') && Object.hasOwn(item.value,'windDir') && Object.hasOwn(item.value,'precipChance')};
  const codeIcon=c=>{
    const v=n(c);
    if(v===null||v<0||v>99)return null;
    return v===0?'sun':v<=3?'part':[45,48].includes(v)?'cloudy':
      [51,53,55,56,57,61,63,65,66,67,80,81,82,95,96,99].includes(v)?'rain':
      [71,73,75,77,85,86].includes(v)?'snow':'cloudy';
  };
  // Lokale bronnen bij de geplande overnachtingsplaatsen.
  // Reine en Mefjordvær gebruiken de bevestigde gemeentepagina (Moskenes / Senja).
  const AURORA_PLACES=Object.freeze({
    'Tynset':{key:'tynset',url:'https://nordlyskart.no/en/northern-lights/tynset'},
    'Mo i Rana':{key:'rana',url:'https://nordlyskart.no/en/northern-lights/rana',region:'Rana'},
    'Reine':{key:'moskenes',url:'https://nordlyskart.no/en/northern-lights/moskenes',region:'Moskenes'},
    'Svolvær':{key:'svolvaer',url:'https://nordlyskart.no/en/northern-lights/svolvaer'},
    'Mefjordvær':{key:'senja',url:'https://nordlyskart.no/en/northern-lights/senja',region:'Senja'},
    'Tromsø':{key:'tromso',url:'https://nordlyskart.no/en/northern-lights/tromso'},
    'Alta':{key:'alta',url:'https://nordlyskart.no/en/northern-lights/alta'},
    'Honningsvåg':{key:'honningsvag',url:'https://nordlyskart.no/en/northern-lights/honningsvag'},
    'Luleå':{key:'se-lulea',url:'https://nordlyskart.no/en/northern-lights/sweden/lulea'},
    'Gävle':{key:'se-gavle',url:'https://nordlyskart.no/en/northern-lights/sweden/gavle'}
  });
  // Alleen officieel gepubliceerde camera-ID's en (waar bevestigd) cameradetailpagina's.
  // De naam beschrijft het wegtraject; camera's hoeven niet in de bestemming zelf te staan.
  const ROUTE_CAMERAS=Object.freeze({
    'Mo i Rana':[{name:'E6 Saltfjellet · noordelijke route',id:'1829006_1'}],
    'Reine':[{name:'Moskenes veerhaven',id:'3000615_1',page:'https://www.vegvesen.no/trafikk/vaerveikamera/3000615?lat=67.8999&lng=13.04428&zoom=12'},
             {name:'E6 Saltfjellet · aanrijroute',id:'1829006_1'}],
    'Alta':[{name:'E6 Alta Vest',id:'3000938_1',page:'https://www.vegvesen.no/trafikk/vaerveikamera/3000938'},
            {name:'E6 Sennalandet · richting Noordkaap',id:'2000065_1'}],
    'Honningsvåg':[{name:'E69 Noordkaap',id:'2000012_1',page:'https://www.vegvesen.no/trafikk/vaerveikamera/2000012?lat=71.15675&lng=25.779207&zoom=12'},
                  {name:'E6 Sennalandet · aanrijroute',id:'2000065_1'}]
  });
  const camMap=d=>'https://www.vegvesen.no/trafikk/hvaskjer?'+new URLSearchParams({
    lat:String(d.lat),lng:String(d.lon),zoom:'9',layers:'ctv'
  });

  // Extra actuele modelwaarden. Dit zijn geen metingen aan het wegdek.
  const directionLabel=degrees=>{
    const x=n(degrees);
    if(x===null||x<0||x>360)return '—';
    return ['N','NO','O','ZO','Z','ZW','W','NW'][Math.round(x/45)%8];
  };
  function roadNowContent(d){
    const point=auroraState.cloud.get(locationId(d));
    const fresh=Boolean(!d.destinationChanged&&d.date===dateAtHome()&&point?.at&&point?.checkedAt
      &&Date.now()-point.checkedAt<25*60000&&Date.now()-point.at<90*60000);
    const rain=fresh?n(point.precip):null;
    const humidity=fresh?n(point.humidity):null;
    const visibility=fresh?n(point.visibility):null;
    const bearing=fresh?directionLabel(point.direction):'—';
    const rainText=rain===null||rain<0?'—':rain.toLocaleString('nl-NL',{maximumFractionDigits:1})+' mm';
    const humidityText=humidity===null||humidity<0||humidity>100?'—':Math.round(humidity)+'%';
    const visibilityText=visibility===null||visibility<0?'—':visibility<1000?Math.round(visibility)+' m':(visibility/1000).toLocaleString('nl-NL',{maximumFractionDigits:1})+' km';
    const sourceTraffic=urls(d).road;
    const sourceYr='https://www.yr.no/en';
    return `<section class="details-section road-now-section">
      <h3>Actueel weer <a class="source-meta" href="${esc(weatherCurrentUrl(d))}" target="_blank" rel="noopener noreferrer" title="Open de actuele modelwaarden bij Open-Meteo">${fresh?'Model · '+updatedTime(point.at):'Model · —'}</a></h3>
      <div class="road-now-tiles">
        ${sourceTile('rain',rainText,'Neerslag nu',weatherCurrentUrl(d),'road-now-tile','Modelwaarde voor neerslag · Open-Meteo')}
        ${sourceTile('humidity',humidityText,'Luchtvochtigheid',weatherCurrentUrl(d),'road-now-tile','Actuele relatieve luchtvochtigheid · Open-Meteo')}
        ${sourceTile('compass',bearing,'Wind uit',weatherCurrentUrl(d),'road-now-tile','Actuele windrichting op 10 meter · Open-Meteo')}
        ${sourceTile('eye',visibilityText,'Zicht',weatherCurrentUrl(d),'road-now-tile','Modelinschatting zicht op deze locatie, geen daadwerkelijke meting langs de weg · Open-Meteo')}
      </div>
      <details class="cockpit-more"><summary>Meer weer- en verkeersbronnen</summary>
        <div class="links">${link('Officiële verkeersinformatie',sourceTraffic)} ${link('Verwachting · Yr.no',sourceYr)}</div>
      </details>
    </section>`;
  }

  // Officiële, openbare WFS: meldingen rond bekende routepunten, niet de hele rijroute.
  const ROAD_CHECK_POINTS=Object.freeze({
    '2027-01-23':[{name:'Mosjøen',lat:65.83753,lon:13.18921}],
    '2027-01-24':[{name:'Saltfjellet',lat:66.552425,lon:15.322464},{name:'Bodø',lat:67.2884,lon:14.4058}],
    '2027-01-26':[{name:'Narvik',lat:68.435556,lon:17.437222},{name:'Finnsnes',lat:69.2424,lon:17.9657}],
    '2027-01-28':[{name:'Kvænangsfjellet',lat:69.9001,lon:21.5566}],
    '2027-01-29':[{name:'Sennalandet',lat:70.26854,lon:24.09215},{name:'Nordkapptunnelen',lat:70.9251,lon:25.6971}],
    '2027-01-30':[{name:'Sennalandet',lat:70.26854,lon:24.09215},{name:'Nordkapptunnelen',lat:70.9251,lon:25.6971}]
  });

  // Voorbereide kijkmomenten voor de voorlopig bekende Polarsteps-route.
  // Uren zijn vaste steekproefmomenten op lokale tijd, GEEN route- of aankomsttijden.
  // Alle locaties komen uit de bestaande etappes of ROAD_CHECK_POINTS.
  const ROUTE_WEATHER_SLOTS=Object.freeze({
    '2027-01-21':[['Schijndel',9],['Kiel',17]],
    '2027-01-22':[['Göteborg',9],['Tynset',18]],
    '2027-01-23':[['Tynset',9],['Mosjøen',15],['Mo i Rana',19]],
    '2027-01-24':[['Mo i Rana',9],['Saltfjellet',12],['Bodø',16],['Reine',20]],
    '2027-01-25':[['Reine',10],['Svolvær',16]],
    '2027-01-26':[['Svolvær',9],['Narvik',13],['Mefjordvær',19]],
    '2027-01-27':[['Mefjordvær',10],['Tromsø',17]],
    '2027-01-28':[['Tromsø',9],['Kvænangsfjellet',14],['Alta',19]],
    '2027-01-29':[['Alta',10],['Sennalandet',13],['Honningsvåg',18]],
    '2027-01-30':[['Honningsvåg',10],['Sennalandet',14],['Alta',18]],
    '2027-01-31':[['Alta',9],['Luleå',19]],
    '2027-02-01':[['Luleå',9],['Gävle',19]],
    '2027-02-02':[['Gävle',9],['Göteborg',18]],
    '2027-02-03':[['Kiel',9],['Schijndel',18]]
  });
  const ROUTE_WEATHER_FIELDS='temperature_2m,wind_gusts_10m,snowfall,visibility,cloud_cover';
  const routeWeatherCache=safeGet('routeWeather',{})||{};
  const routeWeatherAttempts=new Map(),routeWeatherPending=new Map();
  const weatherDayAvailable=day=>{
    const gap=(Date.parse(day+'T12:00:00Z')-Date.parse(dateAtHome()+'T12:00:00Z'))/MS_DAY;
    return gap>=0&&gap<=15;
  };
  function routeWeatherPoints(d){
    const planDate=d.planDate||d.date;
    const slots=ROUTE_WEATHER_SLOTS[planDate]||[];
    const existing=ROUTE.concat(...Object.values(ROAD_CHECK_POINTS));
    return slots.map(([name,hour])=>{
      const location=existing.find(p=>p.place===name||p.name===name);
      return location&&Number.isFinite(location.lat)&&Number.isFinite(location.lon)?
        {name,hour,lat:location.lat,lon:location.lon,country:location.country||d.country,
          pass:/Saltfjellet|Kvænangsfjellet|Sennalandet/.test(name)}:null;
    }).filter(Boolean);
  }
  const routeWeatherKey=(d,p)=>[d.date,p.name,p.hour,p.lat.toFixed(3),p.lon.toFixed(3)].join('|');
  const routeWeatherUrl=(d,p)=>'https://api.open-meteo.com/v1/forecast?'+new URLSearchParams({
    latitude:String(p.lat),longitude:String(p.lon),hourly:ROUTE_WEATHER_FIELDS,
    start_date:d.date,end_date:d.date,timezone:'auto'
  });
  const routeWeatherValues=(d,p)=>routeWeatherCache[routeWeatherKey(d,p)]?.values||null;

  // Identieke kolommen bij een gewijzigde route of ontbrekende controlepunten.
  // Geen weerwaarden tonen voor een route die we niet kunnen lokaliseren.
  function emptyRouteWeather(d,message){
    const emptyMetric=label=>'<span class="route-weather-measure"><small>'+esc(label)
      +'</small><span class="route-weather-value is-empty">—</span></span>';
    return '<section class="details-section route-weather-section"><h3>Weer onderweg'
      +'<span class="route-weather-meta">—</span></h3>'
      +'<div class="route-weather-rows"><div class="route-weather-row route-weather-row--empty">'
      +'<span class="route-weather-row-top"><span class="route-weather-place">Routepunten'
      +'<small>—</small></span><strong class="route-weather-value route-weather-temperature is-empty">—</strong></span>'
      +'<span class="route-weather-measures">'+emptyMetric('Wind')+emptyMetric('Sneeuw')
      +emptyMetric('Zicht')+emptyMetric('Wolken')+'</span></div></div>'
      +'<p class="route-weather-note">'+esc(message)+' '
      +link('Controleer route',urls(d).maps)+'</p></section>';
  }
  function routeWeatherContent(d){
    if(d.routeChanged)return emptyRouteWeather(d,'Route aangepast. Er zijn nog geen passende kijkpunten vastgesteld.');
    const points=routeWeatherPoints(d);
    if(!points.length)return emptyRouteWeather(d,'Geen voorbereide kijkpunten beschikbaar.');
    const available=weatherDayAvailable(d.date);
    const known=points.map(p=>routeWeatherCache[routeWeatherKey(d,p)])
      .filter(x=>x&&Number.isFinite(Number(x.when))&&Number(x.when)>0&&x.values);
    const latest=known.length?Math.min(...known.map(e=>e.when)):null;
    const failed=points.some(p=>Date.now()-(routeWeatherFailures.get(routeWeatherKey(d,p))||0)<15*60000);
    const stamp=navigator.onLine===false?'offline · eerder opgehaald':
      !available?'buiten voorspellingsperiode':
      failed?'bron tijdelijk niet bereikbaar':
      !known.length?'nog geen uurverwachting':
      known.length<points.length?'gedeeltelijk bijgewerkt':
      Date.now()-latest>3*3600000?'eerder opgehaald '+updatedTime(latest):
      'bijgewerkt '+updatedTime(latest);
    const metric=(v,unit,maximum=0)=>{
      const num=n(v);
      return num===null?'—':num.toLocaleString('nl-NL',{maximumFractionDigits:maximum})+unit;
    };
    const rowValue=(label,value)=>
      '<span class="route-weather-measure"><small>'+esc(label)+'</small>'
      +'<span class="route-weather-value'+(value==='—'?' is-empty':'')+'">'+esc(value)+'</span></span>';
    const rows=points.map(p=>{
      const v=routeWeatherValues(d,p),url=routeWeatherUrl(d,p),time=String(p.hour).padStart(2,'0')+':00';
      const temperature=metric(v?.temp,'°'),gust=metric(v?.gust,' km/u'),
        snow=metric(v?.snow,' cm',1),visibility=n(v?.visibility)===null?'—':
        n(v.visibility)<1000?metric(v.visibility,' m'):metric(v.visibility/1000,' km',1),
        cloud=metric(v?.cloud,'%');
      const title=p.name+' · weersmodel voor '+time+' lokale tijd. Dit is geen verwachte passeertijd. '
        +(p.pass?'Controleer altijd de officiële bergpasstatus. ':'')+'Open-Meteo';
      const access=p.name+' om '+time+': temperatuur '+temperature+', windstoten '+gust
        +', sneeuw '+snow+', zicht '+visibility+', bewolking '+cloud+'. Open weersbron.';
      return '<a class="route-weather-row" href="'+esc(url)+'" target="_blank" rel="noopener noreferrer"'
        +' title="'+esc(title)+'" aria-label="'+esc(access)+'">'
        +'<span class="route-weather-row-top"><span class="route-weather-place">'+esc(p.name)
        +'<small>'+esc(time)+' · model'+(p.pass?' · bergpas':'')+'</small></span>'
        +'<strong class="route-weather-value route-weather-temperature'+(temperature==='—'?' is-empty':'')+'">'+esc(temperature)+'</strong></span>'
        +'<span class="route-weather-measures">'
        +rowValue('Wind',gust)+rowValue('Sneeuw',snow)
        +rowValue('Zicht',visibility)+rowValue('Wolken',cloud)
        +'</span></a>';
    }).join('');
    const passes=points.filter(p=>p.pass);
    const official=passes.length?'<div class="route-weather-links">'
      +passes.map(p=>link('Wegstatus '+p.name,roadMapUrl(p,ROAD_MAP_VIEWS.find(v=>v.key==='passes-flow')))).join('')
      +'</div>':'';
    return '<section class="details-section route-weather-section"><h3>Weer onderweg'
      +'<span class="route-weather-meta">'+esc(stamp)+'</span></h3>'
      +'<div class="route-weather-rows">'+rows+'</div>'
      +official
      +'<p class="route-weather-note">Vaste kijkuren, geen passagetijden · sneeuw per uur · geen wegmetingen.</p>'
      +'</section>';
  }
  function refreshRouteWeatherPanel(d){
    const active=days().find(x=>x.id===selected);
    if(!active||active.id!==d.id)return;
    const root=desktopLayout.matches?$('sideDetail'):$('timeline').querySelector('.day-card.is-open .day-details');
    const target=root?.querySelector('.route-weather-dynamic');
    if(!target)return;
    const html=routeWeatherContent(active);
    if(target.innerHTML===html)return;
    const template=document.createElement('template');
    template.innerHTML=html;
    const before=[...target.querySelectorAll('a.route-weather-row')];
    const after=[...template.content.querySelectorAll('a.route-weather-row')];
    // Bij een gelijkblijvende etappe alleen waarden aanpassen; focus en scroll blijven staan.
    if(before.length&&before.length===after.length&&before.every((el,i)=>el.href===after[i].href)){
      before.forEach((el,i)=>{
        const next=after[i];
        const oldVals=el.querySelectorAll('.route-weather-value');
        const newVals=next.querySelectorAll('.route-weather-value');
        oldVals.forEach((v,j)=>{
          if(!newVals[j])return;
          if(v.textContent!==newVals[j].textContent)v.textContent=newVals[j].textContent;
          v.classList.toggle('is-empty',newVals[j].classList.contains('is-empty'));
        });
        for(const attr of ['aria-label','title']){
          if(el.getAttribute(attr)!==next.getAttribute(attr))el.setAttribute(attr,next.getAttribute(attr));
        }
      });
      const oldMeta=target.querySelector('.route-weather-meta');
      const newMeta=template.content.querySelector('.route-weather-meta');
      if(oldMeta&&newMeta&&oldMeta.textContent!==newMeta.textContent)oldMeta.textContent=newMeta.textContent;
      return;
    }
    target.innerHTML=html;
  }

  const ROAD_RADIUS_KM=25,roadAlerts=new Map(),roadPending=new Map();
  const roadPlan=d=>ROUTE.find(r=>r.date===d.date)||d;
  const roadKey=d=>roadPlan(d).date;
  function roadPoints(d){
    if(d.routeChanged)return [];
    const plan=roadPlan(d),points=[];
    const origin=ROUTE.find(r=>r.place===plan.from&&r.country==='no');
    if(origin)points.push({name:origin.place,lat:origin.lat,lon:origin.lon});
    if(plan.country==='no')points.push({name:plan.place,lat:plan.lat,lon:plan.lon});
    points.push(...(ROAD_CHECK_POINTS[plan.date]||[]));
    return points.filter((p,i,all)=>all.findIndex(q=>Math.abs(q.lat-p.lat)<.015&&Math.abs(q.lon-p.lon)<.015)===i).slice(0,6);
  }
  function roadPolygon(p){
    const ring=[];
    for(let i=0;i<=12;i++){
      const a=2*Math.PI*i/12;
      ring.push((p.lat+ROAD_RADIUS_KM/111.2*Math.cos(a)).toFixed(5)+' '+(p.lon+ROAD_RADIUS_KM/(111.2*Math.cos(p.lat*Math.PI/180))*Math.sin(a)).toFixed(5));
    }
    return 'Intersects(geometry, POLYGON(('+ring.join(',')+')))';
  }
  // Vier officiële Vegvesen-kaartweergaven; alleen de kaartpositie volgt de etappe.
  const ROAD_MAP_VIEWS=Object.freeze([
    {key:'passes',label:'Bergpassen',params:{layers:'fo',tusort:'pop',brsort:'pop',fosort:'pop'}},
    {key:'traffic',label:'Meldingen + verkeer',params:{tusort:'pop',brsort:'sta',fosort:'pop',showTfl:'1',a:'active_now-active_later'}},
    {key:'passes-flow',label:'Bergpassen + verkeer',params:{tusort:'pop',brsort:'sta',fosort:'pop',showTfl:'1',layers:'fo'}},
    {key:'tunnels-flow',label:'Tunnels + verkeer',params:{tusort:'pop',brsort:'sta',fosort:'pop',showTfl:'1',layers:'tun'}}
  ]);
  const roadMapUrl=(p,view)=>'https://www.vegvesen.no/trafikk/hvaskjer?'+new URLSearchParams({
    ...view.params,lat:String(p.lat),lng:String(p.lon),zoom:'8'
  });
  function roadKnown(d){
    const item=roadAlerts.get(roadKey(d));
    return item?.ok&&Date.now()-item.at<10*60000?item:null;
  }
  const roadGlance=d=>{
    if(d.routeChanged||d.date!==dateAtHome())return '—';
    return displayValue(roadKnown(d)?.closed);
  };
  function roadAlertsContent(d){
    const points=roadPoints(d),hasVegvesenPoints=points.length>0;
    const result=hasVegvesenPoints&&d.date===dateAtHome()?roadKnown(d):null;
    const focus=points.find(p=>/Saltfjellet|Sennalandet|Kvænangsfjellet/.test(p.name))||points[0];
    // Outside known Norwegian checkpoints, preserve the section but do not
    // imply that a complete national incident feed has been checked.
    const source=hasVegvesenPoints
      ?roadMapUrl(focus,ROAD_MAP_VIEWS.find(view=>view.key==='traffic'))
      :urls(d).road;
    const info=hasVegvesenPoints
      ?'Vegvesen-meldingen binnen circa 25 km van bekende controlepunten; geen volledige routecontrole.'
      :'Geen automatisch gecontroleerde wegmeldingen voor deze etappe. Open de officiële verkeersbron.';
    const tiles=[
      {icon:'roadblock',value:displayValue(result?.closed),label:'Afsluitmeldingen'},
      {icon:'alert',value:displayValue(result?.other),label:'Meldingen'},
      {icon:'road',value:hasVegvesenPoints?String(points.length):'—',label:'Controlepunten'}
    ];
    const mapLinks=hasVegvesenPoints
      ?ROAD_MAP_VIEWS.map(view=>link(view.label,roadMapUrl(focus,view))).join('')
      :link('Officiële verkeersinformatie',source);
    return `<section class="details-section road-alert-section"><h3>Wegmeldingen
      <a class="source-meta" href="${esc(source)}" target="_blank" rel="noopener noreferrer"
       title="Officiële verkeersbron voor deze etappe">${hasVegvesenPoints?'Vegvesen':'Verkeersbron'} · ${result?updatedTime(result.at):'—'}</a></h3>
      <div class="road-alert-tiles">${tiles.map(t=>sourceTile(t.icon,t.value,t.label,source,'road-alert-tile',info)).join('')}</div>
      <details class="cockpit-more"><summary>Verkeerskaarten en bronnen</summary>
        <div class="links">${mapLinks}</div>
      </details>
    </section>`;
  }

  // Werk nieuwe bronwaarden bij zonder actieve links, focus of uitklappers te vervangen.
  function updateDynamicPanel(target,html){
    if(!target||target.innerHTML===html)return;
    const template=document.createElement('template');
    template.innerHTML=html;
    const oldTiles=[...target.querySelectorAll('a.source-tile')];
    const newTiles=[...template.content.querySelectorAll('a.source-tile')];
    const oldLinks=[...target.querySelectorAll('a:not(.source-tile)')];
    const newLinks=[...template.content.querySelectorAll('a:not(.source-tile)')];
    const compatible=oldTiles.length===newTiles.length&&oldLinks.length===newLinks.length
      &&oldTiles.length>0
      &&oldTiles.every((tile,i)=>tile.querySelector('.label')?.textContent===newTiles[i].querySelector('.label')?.textContent)
      &&oldLinks.every((link,i)=>link.getAttribute('href')===newLinks[i].getAttribute('href'));
    if(compatible){
      oldTiles.forEach((tile,i)=>{
        const incoming=newTiles[i],currentValue=tile.querySelector('.value');
        const value=incoming.querySelector('.value')?.textContent;
        if(currentValue&&value!=null){
          if(currentValue.textContent!==value)currentValue.textContent=value;
          currentValue.classList.toggle('is-empty',incoming.querySelector('.value')?.classList.contains('is-empty')===true);
        }
        for(const attr of ['aria-label','title','href']){
          const next=incoming.getAttribute(attr);
          if(next!==null&&tile.getAttribute(attr)!==next)tile.setAttribute(attr,next);
        }
      });
      const before=[...target.querySelectorAll('.source-meta')];
      const after=[...template.content.querySelectorAll('.source-meta')];
      if(before.length===after.length)before.forEach((el,i)=>{
        if(el.textContent!==after[i].textContent)el.textContent=after[i].textContent;
      });
      return;
    }
    const opened=[...target.querySelectorAll('details')].map(el=>el.open);
    target.innerHTML=html;
    target.querySelectorAll('details').forEach((el,i)=>{
      if(i<opened.length)el.open=opened[i];
    });
  }

  function updateRoadAlerts(d){
    const active=days().find(x=>x.id===selected);
    if(!active||roadKey(active)!==roadKey(d))return;
    const target=desktopLayout.matches?$('sideDetail').querySelector('.road-alerts-dynamic'):$('timeline').querySelector('.day-card.is-open .road-alerts-dynamic');
    updateDynamicPanel(target,roadAlertsContent(active));
    const glance=$('timeline').querySelector('.day-card.is-open .day-glance .glance:last-child strong');
    if(glance)glance.textContent=roadGlance(active);
    refreshOverview(active);
  }
  function roadDate(s){
    if(typeof s!=='string')return null;
    const time=Date.parse(s.replace(/\[.*?\]/g,'').replace(/([+-]\d{2})(\d{2})$/,'$1:$2'));
    return Number.isFinite(time)?time:null;
  }
  function interpretRoadFeatures(json){
    if(json?.type!=='FeatureCollection'||!Array.isArray(json.features)||json.features.length>=400)throw Error('WFS niet volledig');
    const total=Number(json.totalFeatures??json.numberMatched??json.numberOfFeatures);
    if(Number.isFinite(total)&&total>json.features.length)throw Error('WFS afgekapt');
    const incidents=new Map(),now=Date.now();
    for(const feature of json.features){
      const p=feature?.properties;if(!p)continue;
      const id=String(p.situationId||p.recordId||feature.id||'');if(!id)continue;
      const end=roadDate(p.endTime);if(end!==null&&end<now)continue;
      const description=String(p.description||''),kind=String(p.secondaryTypes||'')+' '+String(p.situationType||'');
      const closed=/\b(stengt|stenging|stengning|vinterstengt|nattestengt|avstengt|closed|closure|roadclosure|roadclosed|fullclosure)\b/i.test(description+' '+kind)&&!/\b(ikke stengt|kan bli stengt|ikke lenger stengt)\b/i.test(description);
      const item={closed,road:String(p.roadNumber||''),location:String(p.locationDescription||''),description};
      if(!incidents.has(id)||(!incidents.get(id).closed&&closed))incidents.set(id,item);
    }
    const items=[...incidents.values()].sort((a,b)=>Number(b.closed)-Number(a.closed));
    return {closed:items.filter(x=>x.closed).length,other:items.filter(x=>!x.closed).length,items:items.slice(0,6)};
  }
  async function fetchRoadAlerts(d,force=false){
    const points=roadPoints(d);if(!points.length)return;
    const key=roadKey(d),last=roadAlerts.get(key);
    if(!force&&(roadKnown(d)||(last?.ok===false&&Date.now()-last.at<2*60000)))return;
    if(roadPending.has(key))return roadPending.get(key);
    const params=new URLSearchParams({
      service:'WFS',version:'1.3.0',request:'GetFeature',typeName:'datex_3_1:SituationSimple',outputFormat:'application/json',
      srsname:'EPSG:4326',maxFeatures:'400',cql_filter:points.map(roadPolygon).join(' OR ')
    });
    const pending=getJSON('https://ogckart-sn1.atlas.vegvesen.no/datex_3_1/ows?'+params,12000)
      .then(interpretRoadFeatures).then(data=>roadAlerts.set(key,{...data,ok:true,at:Date.now()}))
      .catch(()=>roadAlerts.set(key,{ok:false,at:Date.now()}))
      .finally(()=>{roadPending.delete(key);updateRoadAlerts(d)});
    roadPending.set(key,pending);
    updateRoadAlerts(d);
    return pending;
  }
  // Wegcamera's gebruiken dezelfde rustige bronlinks als Direct openen.
  // De actuele afbeelding en tijdstempel staan bij de officiële bron.
  function roadcamContent(d){
    const cams=d.routeChanged?[]:(ROUTE_CAMERAS[d.place]||[]);
    const links=cams.map(cam=>{
      const cameraNumber=String(cam.id).split('_')[0];
      const target=cam.page||'https://www.vegvesen.no/trafikk/vaerveikamera/'+encodeURIComponent(cameraNumber)+'?'+new URLSearchParams({
        lat:String(d.lat),lng:String(d.lon),zoom:'11'
      });
      return link(cam.name,target);
    });
    if(!d.routeChanged&&d.country==='no'){
      links.push(link(cams.length?'Alle wegcamera’s':'— · Alle wegcamera’s',camMap(d)));
    }else{
      links.push(link('— · Officiële verkeersinformatie',urls(d).road));
    }
    return `<div class="cockpit-panel cockpit-panel--actions">
      <section class="details-section"><h3>Wegcamera’s</h3><div class="links">${links.join('')}</div></section>
    </div>`;
  }

  function urls(d){
    const coord=`${d.lat},${d.lon}`;const place=`${d.overnightPlace||d.place}, ${countryName(d.overnightCountry||d.country)}`;
    const aurora=AURORA_PLACES[d.place]?.url || 'https://nordlyskart.no/en/northern-lights';
    return {
      maps:`https://maps.apple.com/?${new URLSearchParams({saddr:`${d.from}, ${countryName(d.fromCountry||d.country)}`,daddr:place,dirflg:'d'})}`,
      wind:`https://www.windy.com/?${coord},8`,
      road:({no:'https://www.vegvesen.no/trafikk',dk:'https://trafikinfo.dk/',se:'https://www.trafikverket.se/resa-och-trafik/trafikinformation/',de:'https://verkehr.autobahn.de/web/main/karte/',nl:'https://www.rwsverkeersinfo.nl/'})[d.country]||'https://maps.apple.com/',
      ferry:d.ferry==='bognes'?'https://www.torghatten.no/en/our-routes/18-703':d.ferry==='bodo-moskenes'?'https://www.torghatten.no/en/our-routes/18-782':'https://www.stenaline.nl/routes/kiel-goteborg',
      aurora,
      fuel:`https://www.google.com/maps/search/?api=1&${new URLSearchParams({query:`gas station ${place}`})}`,
      // Accommodaties via staySearch(d), met twee personen en aparte bronlinks.
    };
  }
  function link(text,href){return `<a target="_blank" rel="noopener noreferrer" href="${esc(href)}">${esc(text)}${ico('link')}</a>`}

  // Zoek altijd voor twee gasten en één nacht bij de eindbestemming.
  // Geen verplichte beddenfilter of harde prijsgrens: een kleine cabin met één bed kan passend zijn.

  function stayEditor(d){
    if(mode!=='trip'||d.ferry==='stena'||d.place==='Schijndel')return '';
    const saved=d.actualStop,selectedCountry=saved?.country||d.country;
    const options=STOP_COUNTRIES.map(c=>'<option value="'+c+'"'+(c===selectedCountry?' selected':'')+'>'+esc(countryName(c))+'</option>').join('');
    const title=saved?'Werkelijk: '+saved.place:'Werkelijke overnachting vastleggen';
    return '<details class="actual-stay-edit"><summary>'+ico('pin')+'<span>'+esc(title)+'</span></summary>'
      +'<form class="actual-stay-form" data-stay-date="'+esc(d.date)+'">'
      +'<div class="actual-stay-inputs"><label>Overnachtingsplaats'
      +'<input name="overnightPlace" type="text" maxlength="85" required autocomplete="off"'
      +' placeholder="'+esc(d.place)+'" value="'+esc(saved?.place||'')+'"></label>'
      +'<label>Land<select name="overnightCountry">'+options+'</select></label></div>'
      +'<div class="actual-stay-actions"><button type="submit">Opslaan</button>'
      +(saved?'<button class="actual-stay-reset" type="button" data-reset-date="'+esc(d.date)+'">Planning herstellen</button>':'')
      +'</div><small>Alleen op dit apparaat opgeslagen. De oorspronkelijke planning, datums en veerboten blijven ongewijzigd.</small>'
      +'</form></details>';
  }
  function staySearch(d){
    const location=(d.overnightPlace||d.place)+', '+countryName(d.overnightCountry||d.country);
    const checkin=d.date,checkout=addDays(checkin,1);
    const booking='https://www.booking.com/searchresults.html?'+new URLSearchParams({
      ss:location,checkin,checkout,group_adults:'2',group_children:'0',no_rooms:'1',lang:'nl'
    });
    const airbnb='https://www.airbnb.com/s/'+encodeURIComponent(location)+'/homes?'+new URLSearchParams({
      query:location,checkin,checkout,adults:'2',locale:'nl'
    });
    // HomeToGo publiceert geen bestendige, verifieerbare zoeklink voor
    // locatie + datums + gasten samen. Gebruik uitsluitend bestaande regiopagina's.
    const homeToGoByPlace={
      'Reine':'https://www.hometogo.nl/f/lofoten-eilandengroep/',
      'Svolvær':'https://www.hometogo.nl/f/lofoten-eilandengroep/',
      'Tromsø':'https://www.hometogo.nl/f/tromsoe/',
      'Göteborg':'https://www.hometogo.nl/f/goeteborg/'
    };
    const homeToGo=homeToGoByPlace[d.overnightPlace||d.place]||({
      no:'https://www.hometogo.nl/f/noorwegen/',
      se:'https://www.hometogo.nl/f/zweden/',
      nl:'https://www.hometogo.nl/',
      de:'https://www.hometogo.nl/'
    }[d.overnightCountry||d.country]||'https://www.hometogo.nl/');
    const terms=(d.overnightCountry||d.country)==='no'?'rorbu cabin winter accommodation':(d.overnightCountry||d.country)==='se'?'stuga cabin winter accommodation':'small cabin unique accommodation';
    const special='https://www.google.com/maps/search/?api=1&'+new URLSearchParams({
      query:terms+' '+location
    });
    return {booking,airbnb,homeToGo,special};
  }
  function stayProvider(icon,name,url,extra='',hint=''){
    return '<a class="stay-provider" href="'+esc(url)+'" target="_blank" rel="noopener noreferrer"'
      +' title="'+esc(extra||'Zoek overnachtingen op '+name)+'"'
      +' aria-label="'+esc(name+'. '+(extra||'Open zoekresultaten')+'.')+'">'
      +'<span class="stay-provider-icon">'+ico(icon)+'</span>'
      +'<span class="stay-provider-name">'+esc(name)+'</span>'
      +(hint?'<span class="stay-provider-hint">'+esc(hint)+'</span>':'')+'</a>';
  }
  function stayContent(d){
    // Op de veerbootnachten en bij thuiskomst zijn geen extra accommodaties nodig.
    if(d.ferry==='stena'||d.place==='Schijndel')return '';
    const links=staySearch(d);
    const dateFmt=new Intl.DateTimeFormat('nl-NL',{day:'numeric',month:'short',timeZone:'UTC'});
    const nights=dateFmt.format(new Date(d.date+'T12:00:00Z'))+' – '+dateFmt.format(new Date(addDays(d.date,1)+'T12:00:00Z'));
    return '<div class="cockpit-panel cockpit-panel--stay"><div class="details-section">'
      +'<h3>Overnachten <small class="source-meta">'+esc(nights)+' · 2 personen</small></h3>'
      +'<div class="stay-providers">'
      +stayProvider('bed','Booking',links.booking,'Bestemming, datum en twee gasten ingevuld')
      +stayProvider('pin','Airbnb',links.airbnb,'Bestemming, datum en twee gasten ingevuld')
      +stayProvider('compass','HomeToGo',links.homeToGo,'Regiopagina; controleer bestemming, datum en gasten op de website','filters zelf')
      +'</div>'
      +'<a class="stay-special" href="'+esc(links.special)+'" target="_blank" rel="noopener noreferrer"'
      +' title="Ontdek eenvoudige hutten, huisjes en bijzondere plekken rondom de eindbestemming; geen live beschikbaarheid">'
      +ico('pin')+'<span>Cabins & bijzondere plekken</span>'+ico('link')+'</a>'
      +'</div></div>';
  }
  // Iedere informatietegel is zelf een link naar de bron van de waarde.
  // Geen extra server of eigen databeheer; ontbrekende gegevens blijven '—'.
  const LOCAL_TZ=d=>({
    dk:'Europe/Copenhagen',se:'Europe/Stockholm',no:'Europe/Oslo',
    de:'Europe/Berlin',nl:'Europe/Amsterdam',fi:'Europe/Helsinki'
  })[d.country]||'Europe/Oslo';
  const WEATHER_DAILY_FIELDS='temperature_2m_mean,apparent_temperature_mean,weather_code,wind_gusts_10m_max,wind_direction_10m_dominant,precipitation_probability_max,snowfall_sum,cloud_cover_mean,relative_humidity_2m_mean,moon_phase';
  const WEATHER_HOURLY_FIELDS='cloud_cover';
  const weatherDailyUrl=d=>'https://api.open-meteo.com/v1/forecast?'+new URLSearchParams({
    latitude:String(d.lat),longitude:String(d.lon),
    daily:WEATHER_DAILY_FIELDS,hourly:WEATHER_HOURLY_FIELDS,
    timezone:LOCAL_TZ(d),forecast_days:'16'
  });
  const weatherCurrentUrl=d=>'https://api.open-meteo.com/v1/forecast?'+new URLSearchParams({
    latitude:String(d.lat),longitude:String(d.lon),
    current:'cloud_cover,precipitation,relative_humidity_2m,wind_direction_10m,visibility',
    timezone:LOCAL_TZ(d)
  });
  const solarSourceUrl=d=>'https://api.sunrise-sunset.org/v2?'+new URLSearchParams({
    lat:String(d.lat),lng:String(d.lon),date:d.date
  });
  function sourceTile(icon,value,label,url,extraClass='',description=''){
    const textValue=displayValue(value);
    return `<a class="info-box source-tile ${esc(extraClass)}" href="${esc(url)}" target="_blank" rel="noopener noreferrer"
      title="${esc(description||'Open bron: '+label)}"
      aria-label="${esc(label+': '+textValue+'. Open bron in nieuw tabblad.')}">
      ${textValue==='—'?'':ico(icon)}<div class="value${textValue==='—'?' is-empty':''}">${esc(textValue)}</div><div class="label">${esc(label)}</div></a>`;
  }
  function staticStageTile(icon,value,label){
    return `<div class="info-box stage-tile stage-tile--static" aria-label="${esc(label+': '+value)}">
      ${ico(icon)}<div class="value">${esc(value)}</div><div class="label">${esc(label)}</div>
    </div>`;
  }
  const readableSun=(d,kind)=>{
    const s=solar(d); if(!s)return '—';
    if(s.sun_status==='polar_night')return kind==='length'?'0u 00':'Geen';
    if(s.sun_status==='midnight_sun')return kind==='length'?'24u 00':'Geen';
    if(kind==='length'){
      if(n(s.day_length)===null)return '—';
      const minutes=Math.floor(Number(s.day_length)/60);return `${Math.floor(minutes/60)}u ${String(minutes%60).padStart(2,'0')}`;
    }
    const v=kind==='rise'?s.sunrise:s.sunset;
    if(typeof v!=='string')return '—';
    const parsed=new Date(v);return Number.isNaN(parsed.valueOf())?'—':new Intl.DateTimeFormat('nl-NL',{timeZone:d.country==='dk'?'Europe/Copenhagen':d.country==='se'?'Europe/Stockholm':'Europe/Oslo',hour:'2-digit',minute:'2-digit',hour12:false}).format(parsed);
  };

  // Benzine 95: betrouwbare referentie per bestemmingsland, niet per individueel tankstation.
  const FUEL_URL={
    no:'https://www.fuel-prices.eu/Norway/',
    se:'https://www.fuel-prices.eu/live/sweden/',
    dk:'https://www.fuel-prices.eu/live/denmark/',
    de:'https://energy.ec.europa.eu/data-and-analysis/weekly-oil-bulletin_en',
    nl:'https://energy.ec.europa.eu/data-and-analysis/weekly-oil-bulletin_en'
  };
  const fuelPrices=new Map(),fuelPending=new Map(),fuelAttempts=new Map();
  const fuelCountry=d=>String(d.overnightCountry||d.country||'').toLowerCase();
  const fuelUrl=c=>FUEL_URL[c]||'https://www.google.com/maps/search/?api=1&query=gas+station';
  const fuelDate=v=>/^\d{4}M\d{2}$/.test(v)?v.slice(5,7)+'-'+v.slice(0,4):
    /^\d{4}-\d{2}-\d{2}$/.test(v)?v.slice(8,10)+'-'+v.slice(5,7):'';

  // Euro-indicatie: ECB-referentiekoers, geen realtime bank- of wisselkantoortarief.
  const FX_API='https://api.frankfurter.dev/v2/rates?base=EUR&quotes=NOK,SEK,DKK&providers=ecb';
  const FX_SOURCE='https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html';
  const FX_CODES=new Set(['NOK','SEK','DKK']);
  const fxRates=new Map();
  let fxPending=null,fxLastAttempt=0,fxLastSuccess=0;
  function fxConversion(amount,currency){
    if(!FX_CODES.has(currency)||!Number.isFinite(Number(amount))||Number(amount)<=0)return null;
    const item=fxRates.get(currency);
    const euro=item?Number(amount)/item.rate:null;
    return {
      value:euro===null?'—':'≈ € '+new Intl.NumberFormat('nl-NL',{minimumFractionDigits:2,maximumFractionDigits:2}).format(euro)+'/l',
      date:item?'ECB · '+fuelDate(item.date):'ECB · —'
    };
  }
  function fuelFxLink(x){
    const fx=fxConversion(x.amount,x.currency);
    if(!fx)return '';
    return '<a class="fuel-fx" href="'+esc(FX_SOURCE)+'" target="_blank" rel="noopener noreferrer"'
      +' title="Indicatieve omrekening met ECB-referentiekoers, geen pomp- of bankkoers"'
      +' aria-label="'+esc('Euro-omrekening: '+fx.value+'. '+fx.date+'. Open ECB-bron.')+'">'
      +'<span class="fuel-fx-value">'+esc(fx.value)+'</span>'
      +'<span class="fuel-fx-date">'+esc(fx.date)+'</span></a>';
  }
  function updateFxDisplay(){
    const d=days().find(x=>x.id===selected);
    if(d)updateFuel(fuelCountry(d));
  }
  async function fetchFx(force=false){
    if(fxPending)return fxPending;
    const now=Date.now();
    if(!force&&now-fxLastSuccess<12*3600000)return;
    if(!force&&now-fxLastAttempt<10*60000)return;
    fxLastAttempt=now;
    fxPending=(async()=>{
      const rows=await getJSON(FX_API,11000);
      if(!Array.isArray(rows))return;
      let accepted=0;
      for(const row of rows){
        const code=String(row?.quote||'').toUpperCase();
        const rate=Number(row?.rate),date=String(row?.date||'');
        if(String(row?.base||'').toUpperCase()!=='EUR'||!FX_CODES.has(code))continue;
        if(!Number.isFinite(rate)||rate<2||rate>50||!/^\d{4}-\d{2}-\d{2}$/.test(date))continue;
        const elapsed=Date.now()-Date.parse(date+'T12:00:00Z');
        if(!Number.isFinite(elapsed)||elapsed< -86400000||elapsed>7*86400000)continue;
        fxRates.set(code,{rate,date});
        accepted++;
      }
      if(accepted)fxLastSuccess=Date.now();
    })().catch(()=>{}).finally(()=>{fxPending=null;updateFxDisplay()});
    return fxPending;
  }

  function fuelText(c){
    const x=fuelPrices.get(c);
    if(!x)return {value:'—',meta:'Landelijk · bron openen',amount:null,currency:null};
    const str=new Intl.NumberFormat('nl-NL',{minimumFractionDigits:2,maximumFractionDigits:2}).format(x.price);
    return {value:(x.currency==='NOK'?'NOK ':x.currency==='SEK'?'SEK ':x.currency==='DKK'?'DKK ':'€ ')+str+'/l',meta:x.type+' · '+fuelDate(x.date),amount:x.price,currency:x.currency};
  }

  // Een regionale dagindicatie is alleen geldig als minstens drie afzonderlijke
  // stations binnen 40 km hun benzine-95-prijs de afgelopen 48 uur hebben gemeld.
  // De export zelf wordt vaker ververst; dat zegt niets over de leeftijd van de prijzen.
  const REGIONAL_NO_SOURCE='https://drivstoffpriser.github.io/Drivstoffpriser-App/data/index.html';
  const REGIONAL_NO_STATIONS='https://drivstoffpriser.github.io/Drivstoffpriser-App/data/stations.json';
  const REGIONAL_NO_PRICES='https://drivstoffpriser.github.io/Drivstoffpriser-App/data/prices.json';
  const regionalFuel=new Map();
  const regionalFuelPending=new Map();
  const regionalFuelAttempts=new Map();
  const fuelKey=d=>fuelCountry(d)+':'+Number(d.lat).toFixed(3)+':'+Number(d.lon).toFixed(3);
  const distanceKm=(a,b,c,d)=>{
    const rad=Math.PI/180,dp=(c-a)*rad,dl=(d-b)*rad;
    const h=Math.sin(dp/2)**2+Math.cos(a*rad)*Math.cos(c*rad)*Math.sin(dl/2)**2;
    return 12742*Math.asin(Math.min(1,Math.sqrt(h)));
  };
  function regionalFuelText(d){
    if(d.destinationChanged)return null;
    const item=regionalFuel.get(fuelKey(d));
    if(!item || Date.now()-item.checked>6*3600000 || item.stations<3)return null;
    return {
      value:'NOK '+new Intl.NumberFormat('nl-NL',{minimumFractionDigits:2,maximumFractionDigits:2}).format(item.price)+'/l',
      meta:'Regio 40 km · '+item.stations+' stations · meldingen ≤48 uur, laatst '+fuelDate(item.date),
      url:REGIONAL_NO_SOURCE,amount:item.price,currency:'NOK'
    };
  }
  function fuelDisplay(d){
    const local=regionalFuelText(d);
    if(local)return local;
    const country=fuelCountry(d),national=fuelText(country);
    return {
      ...national,
      meta:national.value==='—'&&country==='no'?'Regio: geen recente prijzen · landelijke bron':
        national.value==='—'?national.meta:'Landelijk · '+national.meta,
      url:fuelUrl(country)
    };
  }
  function updateRegionalFuel(d){
    const selectedDay=days().find(x=>x.id===selected);
    if(selectedDay?.id!==d.id)return;
    updateFuel(fuelCountry(d));
  }
  async function loadRegionalFuel(d,force=false){
    if(d.destinationChanged||fuelCountry(d)!=='no')return; // Andere landen bieden hier geen betrouwbare vrije station-feed.
    const key=fuelKey(d),existing=regionalFuel.get(key);
    if(!force&&existing&&Date.now()-existing.checked<6*3600000)return;
    if(regionalFuelPending.has(key))return regionalFuelPending.get(key);
    if(!force&&Date.now()-(regionalFuelAttempts.get(key)||0)<10*60000)return;
    regionalFuelAttempts.set(key,Date.now());
    const job=(async()=>{
      const [stations,prices]=await Promise.all([
        getJSON(REGIONAL_NO_STATIONS,12000),
        getJSON(REGIONAL_NO_PRICES,12000)
      ]);
      if(!Array.isArray(stations?.stations)||!Array.isArray(prices?.prices))return;
      const freshExport=Date.parse(prices.exportedAt);
      if(!Number.isFinite(freshExport)||Date.now()-freshExport>48*3600000||freshExport>Date.now()+3600000)return;
      const byId=new Map(stations.stations.filter(x=>x?.id).map(x=>[x.id,x]));
      const unique=new Map(),now=Date.now();
      for(const p of prices.prices){
        if(p?.fuelType!=='petrol95'||!p.stationId)continue;
        const price=Number(p.price),station=byId.get(p.stationId);
        const rawTime=String(p.updatedAt||'').trim();
        const at=Date.parse(/(?:Z|[+-]\d{2}:?\d{2})$/i.test(rawTime)?rawTime:rawTime+'Z');
        if(!station||!Number.isFinite(price)||price<10||price>50||!Number.isFinite(at))continue;
        if(at>now+3600000||now-at>48*3600000)continue;
        const lat=Number(station.latitude),lon=Number(station.longitude);
        if(!Number.isFinite(lat)||!Number.isFinite(lon)||distanceKm(d.lat,d.lon,lat,lon)>40)continue;
        const prev=unique.get(p.stationId);
        if(!prev||at>prev.at)unique.set(p.stationId,{price,at});
      }
      if(unique.size<3)return;
      const valid=[...unique.values()],sum=valid.reduce((n,p)=>n+p.price,0);
      const mostRecent=Math.max(...valid.map(p=>p.at));
      regionalFuel.set(key,{checked:now,price:sum/valid.length,stations:valid.length,
        date:new Date(mostRecent).toISOString().slice(0,10)});
    })().catch(()=>{}).finally(()=>{
      regionalFuelPending.delete(key);
      updateRegionalFuel(d);
    });
    regionalFuelPending.set(key,job);
    return job;
  }

  function fuelStrip(d){
    const c=fuelCountry(d),x=fuelDisplay(d);
    return `<div class="fuel-quote" data-fuel="${esc(c)}"><a class="fuel-strip" href="${esc(x.url)}" target="_blank"
        rel="noopener noreferrer" title="Actuele regionale benzine-95-prijs bij voldoende recente stations; anders expliciet landelijke indicatie">
      <span class="fuel-name">${ico('fuel')}Benzine 95</span>
      <span class="fuel-number">${esc(x.value)}</span>
      <small class="fuel-meta">${esc(x.meta)}</small>
    </a>${fuelFxLink(x)}</div>`;
  }
  function updateFuel(c){
    const selectedDay=days().find(d=>d.id===selected);
    const x=selectedDay&&fuelCountry(selectedDay)===c?fuelDisplay(selectedDay):null;
    if(!x)return;
    // Alleen het zichtbare detailpaneel; verborgen kaarten van een andere etappe
    // mogen nooit een brandstofprijs van de huidige selectie overnemen.
    const root=desktopLayout.matches?$('sideDetail'):$('timeline').querySelector('.day-card.is-open .day-details');
    if(!root)return;
    root.querySelectorAll('.fuel-quote[data-fuel="'+c+'"]').forEach(wrapper=>{
      const priceLink=wrapper.querySelector('.fuel-strip');
      if(!priceLink)return;
      priceLink.href=x.url;
      const n=priceLink.querySelector('.fuel-number'),m=priceLink.querySelector('.fuel-meta');
      if(n)n.textContent=x.value;
      if(m)m.textContent=x.meta;
      priceLink.setAttribute('aria-label','Benzine 95 '+x.value+'. '+x.meta+'. Open bron.');
      const converted=fxConversion(x.amount,x.currency),fx=wrapper.querySelector('.fuel-fx');
      if(converted){
        if(!fx)wrapper.insertAdjacentHTML('beforeend',fuelFxLink(x));
        else{
          const value=fx.querySelector('.fuel-fx-value'),date=fx.querySelector('.fuel-fx-date');
          if(value)value.textContent=converted.value;
          if(date)date.textContent=converted.date;
          fx.setAttribute('aria-label','Euro-omrekening: '+converted.value+'. '+converted.date+'. Open ECB-bron.');
        }
      }else if(fx)fx.remove();
    });
  }
  function ssb95(json){
    // JSON-stat2, zoek 95-octaan en nieuwste maand; geen getal tonen als dit niet kan.
    if(!Array.isArray(json?.id)||!Array.isArray(json?.size)||!Array.isArray(json?.value))return null;
    const axes=json.id.map((id,pos)=>{
      const cat=json.dimension?.[id]?.category||{};
      return {pos,values:Object.entries(cat.index||{}).map(([code,i])=>
        ({code,i:Number(i),label:String(cat.label?.[code]||code)}))};
    });
    const product=axes.map(a=>({...a,hit:a.values.find(v=>/95/.test(v.label)&&!/(diesel|98)/i.test(v.label))})).find(a=>a.hit);
    const time=axes.map(a=>({...a,months:a.values.filter(v=>/^\d{4}M(?:0[1-9]|1[0-2])$/.test(v.code))})).find(a=>a.months.length);
    if(!product||!time)return null;
    const month=time.months.sort((a,b)=>b.code.localeCompare(a.code))[0];
    let index=0,stride=1;
    for(let i=json.size.length-1;i>=0;i--){
      index+=(i===product.pos?product.hit.i:i===time.pos?month.i:0)*stride;
      stride*=json.size[i];
    }
    const price=Number(json.value[index]);
    return price>=10&&price<=50?{price,currency:'NOK',date:month.code,type:'Maandgemiddelde · SSB'}:null;
  }
  async function loadFuel(c,force=false){
    if(!FUEL_URL[c]||(!force&&fuelPrices.has(c)&&Date.now()-fuelPrices.get(c).checked<12*3600000))return;
    if(fuelPending.has(c))return fuelPending.get(c);
    if(!force&&Date.now()-(fuelAttempts.get(c)||0)<10*60000)return;
    fuelAttempts.set(c,Date.now());
    const job=(async()=>{
      let item=null;
      if(c==='no'){
        item=ssb95(await getJSON('https://data.ssb.no/api/pxwebapi/v2/tables/09654/data?lang=en',12000));
      }else if(c==='dk'){
        const json=await getJSON('https://www.fuel-prices.eu/live/api.php?action=summary',12000);
        const d=json?.data?.countries?.find(x=>x.country_code==='DK'&&x.live);
        const price=Number(d?.fuels?.sp95?.avg),at=Number(d?.last_fetched_ts)*1000;
        if(price>=0.5&&price<=4&&Number(d?.fuels?.sp95?.stations)>30&&
          Number.isFinite(at)&&Math.abs(Date.now()-at)<72*3600000)
          item={price,currency:'EUR',date:new Date(at).toISOString().slice(0,10),type:'Actueel pompprijsgemiddelde'};
      }else{
        const json=await getJSON('https://www.fuel-prices.eu/lang/api/country-history.php?cc='+c.toUpperCase(),12000);
        if(Array.isArray(json?.labels)&&Array.isArray(json?.e95)){
          for(let i=Math.min(json.labels.length,json.e95.length)-1;i>=0;i--){
            const price=Number(json.e95[i]),date=json.labels[i],age=Date.now()-Date.parse(date+'T12:00:00Z');
            if(price>=0.5&&price<=4&&/^\d{4}-\d{2}-\d{2}$/.test(date)&&age>=0&&age<28*86400000){
              item={price,currency:'EUR',date,type:'Weekgemiddelde · EU'};break;
            }
          }
        }
      }
      if(item)fuelPrices.set(c,{...item,checked:Date.now()});
    })().catch(()=>{}).finally(()=>{fuelPending.delete(c);updateFuel(c)});
    fuelPending.set(c,job);
    return job;
  }


  // One-glance cockpit: source-linked values, no invented scores or safety verdicts.
  // NOAA's live aurora/Kp readings only relate to the selected day when it is today.
  const heroStat=(key,label,value,url,description)=>{
    const shown=displayValue(value);
    return '<a class="nord-stat" href="'+esc(url)+'" target="_blank" rel="noopener noreferrer"'
      +' title="'+esc(description)+'" aria-label="'+esc(label+': '+shown+'. Open bron.')+'">'
      +'<span class="nord-stat-label">'+esc(label)+'</span>'
      +'<strong class="nord-stat-number'+(shown==='—'?' is-empty':'')+'" data-overview-value="'+esc(key)+'">'+esc(shown)+'</strong></a>';
  };
  const forecastIconName=w=>w?.icon||null;
  const forecastCondition=w=>({
    sun:'Helder',part:'Licht bewolkt',cloudy:'Bewolkt',
    rain:'Neerslag',snow:'Sneeuw'
  })[w?.icon]||'Verwachting niet beschikbaar';
  function overviewContent(d){
    const w=d.destinationChanged?null:weather(d),u=urls(d);
    const today=d.date===dateAtHome();
    const oval=today&&!d.destinationChanged?localOval(d):null;
    const kp=today?kpNow():null;
    const night=n(w?.nightCloud),moonlight=n(w?.moonlight);
    const roadPts=roadPoints(d),road=roadPts.length&&today?roadKnown(d):null;
    const roadSource=roadPts.length?roadMapUrl(roadPts.find(p=>p.name==='Kvænangsfjellet'||p.name==='Sennalandet'||p.name==='Saltfjellet')||roadPts[0],ROAD_MAP_VIEWS.find(v=>v.key==='traffic')):u.road;
    const auroraSource=AURORA_PLACES[d.place]?.url;
    const auroraUrl=today?'https://www.spaceweather.gov/products/aurora-30-minute-forecast':
      auroraSource?auroraSource+'/trip-planner':'https://nordlyskart.no/en/northern-lights';
    const summaryDate=labelDate(d.date,{weekday:'long',day:'numeric',month:'long'});
    const mainPlace=d.overnightPlace||d.place;
    const stats=[
      heroStat('gust','Windstoten',fmt(w?.gust,' km/u'),weatherDailyUrl(d),'Dagmaximum windstoten in de modelverwachting · Open-Meteo'),
      heroStat('snow','Sneeuwval',n(w?.snow)===null?'—':Number(w.snow).toLocaleString('nl-NL',{maximumFractionDigits:1})+' cm',weatherDailyUrl(d),'Sneeuwval over de hele dag · Open-Meteo'),
      heroStat('night','Wolken nacht',night===null?'—':Math.round(night)+'%',weatherDailyUrl(d),'Modelgemiddelde bewolking van 18:00 tot 06:00 lokale tijd · Open-Meteo'),
      heroStat('moon','Maanlicht',moonlight===null?'—':Math.round(moonlight)+'%',weatherDailyUrl(d),'Berekende maanverlichting; geen rekening met maanhoogte · Open-Meteo'),
      heroStat('oval','Aurora nu',oval===null?'—':Math.round(oval)+'%',auroraUrl,'NOAA OVATION kortetermijnmodel boven deze plaats, geen kans op zichtbaarheid. Alleen voor vandaag.'),
      heroStat('kp','Kp nu',kp===null?'—':kp.toLocaleString('nl-NL',{maximumFractionDigits:1}),'https://www.spaceweather.gov/products/planetary-k-index','Actuele planetaire Kp-index. Niet de voorspelling voor de geselecteerde toekomstige datum.'),
      heroStat('daylight','Daglicht',d.destinationChanged?'—':readableSun(d,'length'),solarSourceUrl(d),'Daglicht op de geplande bestemming · Sunrise-Sunset.org'),
      heroStat('roads','Wegmeldingen',road&&n(road.closed)!==null&&n(road.other)!==null?String(road.closed+road.other):'—',roadSource,'Actieve en mogelijk geplande Vegvesen-meldingen rond enkele routepunten, geen volledige routecheck. Alleen actuele meldingen, geen voorspelling.')
    ].join('');
    return '<section class="nord-overview" aria-label="Weer, noorderlicht en wegmeldingen in één oogopslag">'
      +'<div class="nord-overview-head"><div class="nord-place">'
      +'<span class="nord-eyebrow">'+esc(summaryDate)+'</span>'
      +'<h2>'+esc(mainPlace)+'</h2>'
      +'<span class="nord-overview-route">'+esc(d.from+' → '+mainPlace)+'</span>'
      +(d.destinationChanged?'<span class="nord-overview-plan">Weerwaarden: geplande bestemming '+esc(d.place)+'</span>':'')
      +'</div><a class="nord-temperature" href="'+esc(weatherDailyUrl(d))+'" target="_blank" rel="noopener noreferrer"'
      +' title="Gemiddelde dagtemperatuur op de geplande bestemming · Open-Meteo">'
      +'<span class="nord-weather-icon">'+(forecastIconName(w)?ico(forecastIconName(w)):'')+'</span>'
      +'<strong class="'+(n(w?.temp)===null?'is-empty':'')+'" data-overview-value="temp">'+esc(fmtDeg(w?.temp))+'</strong>'
      +'<span class="nord-temp-caption">'+esc(w?.icon?forecastCondition(w):'—')+'</span></a></div>'
      +'<div class="nord-overview-grid">'+stats+'</div>'
      +'<div class="nord-overview-foot"><span class="nord-weather-meta">'+esc(weatherMeta(d))+'</span></div></section>';
  }
  function refreshOverview(d){
    const root=desktopLayout.matches?$('sideDetail'):$('timeline').querySelector('.day-card.is-open .day-details');
    const current=root?.querySelector('.nord-overview');
    if(!current)return;
    const template=document.createElement('template');
    template.innerHTML=overviewContent(d);
    const next=template.content.querySelector('.nord-overview');
    if(!next)return;
    current.querySelectorAll('[data-overview-value]').forEach(el=>{
      const incoming=next.querySelector('[data-overview-value="'+el.getAttribute('data-overview-value')+'"]');
      if(incoming){
        if(el.textContent!==incoming.textContent)el.textContent=incoming.textContent;
        el.classList.toggle('is-empty',incoming.classList.contains('is-empty'));
      }
    });
    current.querySelectorAll('a.nord-stat').forEach((el,i)=>{
      const incoming=next.querySelectorAll('a.nord-stat')[i];
      if(!incoming)return;
      for(const attr of ['aria-label','title','href']){
        const val=incoming.getAttribute(attr);
        if(val!==null&&el.getAttribute(attr)!==val)el.setAttribute(attr,val);
      }
    });
    const oldMeta=current.querySelector('.nord-weather-meta'),newMeta=next.querySelector('.nord-weather-meta');
    if(oldMeta&&newMeta&&oldMeta.textContent!==newMeta.textContent)oldMeta.textContent=newMeta.textContent;
    const oldCondition=current.querySelector('.nord-temp-caption'),newCondition=next.querySelector('.nord-temp-caption');
    if(oldCondition&&newCondition&&oldCondition.textContent!==newCondition.textContent)oldCondition.textContent=newCondition.textContent;
    const oldIcon=current.querySelector('.nord-weather-icon'),newIcon=next.querySelector('.nord-weather-icon');
    if(oldIcon&&newIcon&&oldIcon.innerHTML!==newIcon.innerHTML)oldIcon.innerHTML=newIcon.innerHTML;
  }

  function detailContent(d){
    const w=weather(d),u=urls(d);
    return `<div class="detail-inner">
      ${overviewContent(d)}
      <div class="cockpit-panel cockpit-panel--route-weather"><div class="route-weather-dynamic">${routeWeatherContent(d)}</div></div>
      <div class="cockpit-panel cockpit-panel--aurora"><section class="details-section aurora-section" data-aurora-location="${esc(d.place)}"><h3>Noorderlicht${d.destinationChanged?' · geplande locatie '+esc(d.place):''}</h3><div class="aurora-dynamic">${auroraContent(d)}</div></section></div>
      <div class="cockpit-duo cockpit-duo--conditions">
        <div class="cockpit-panel cockpit-panel--weather">
      <div class="details-section"><h3>Weer${d.destinationChanged?' · gepland '+esc(d.place):''} <a class="source-meta" href="${esc(weatherDailyUrl(d))}" target="_blank" rel="noopener noreferrer" title="Open de daggegevens bij Open-Meteo">${esc(weatherMeta(d))}</a></h3>
        <div class="weather-tiles">
          ${sourceTile('thermometer',fmtDeg(w?.temp),'Temperatuur',weatherDailyUrl(d),'weather-tile','Gemiddelde dagtemperatuur · Open-Meteo')}
          ${sourceTile('feels',fmtDeg(w?.feel),'Voelt als',weatherDailyUrl(d),'weather-tile','Gemiddelde gevoelstemperatuur · Open-Meteo')}
          ${sourceTile('wind',fmt(w?.gust,' km/u'),'Windstoten',weatherDailyUrl(d),'weather-tile','Maximale windstoten · Open-Meteo')}
          ${sourceTile('compass',directionLabel(w?.windDir),'Wind uit',weatherDailyUrl(d),'weather-tile','Overheersende windrichting van de dag, waar de wind vandaan komt · Open-Meteo')}
          ${sourceTile('snowflake',n(w?.snow)===null?'—':Number(w.snow).toLocaleString('nl-NL',{maximumFractionDigits:1})+' cm','Sneeuwval',weatherDailyUrl(d),'weather-tile','Sneeuwval van deze dag · Open-Meteo')}
          ${sourceTile('rain',fmt(w?.precipChance,'%'),'Neerslagkans',weatherDailyUrl(d),'weather-tile','Hoogste berekende uurlijkse neerslagkans op deze dag; geen kans voor de volledige etappe · Open-Meteo')}
          ${sourceTile('cloudy',fmt(w?.cloud,'%'),'Bewolking',weatherDailyUrl(d),'weather-tile','Gemiddelde bewolking van deze dag · Open-Meteo')}
          ${sourceTile('humidity',fmt(w?.humidity,'%'),'Luchtvochtigheid',weatherDailyUrl(d),'weather-tile','Gemiddelde relatieve luchtvochtigheid op deze datum · Open-Meteo')}
        </div>
      </div>
        </div>
        <div class="cockpit-panel cockpit-panel--light">
          <div class="details-section"><h3>Daglicht${d.destinationChanged?' · gepland '+esc(d.place):''}</h3>
      <div class="detail-rows">
        ${sourceTile('sunrise',readableSun(d,'rise'),'Zonsopkomst',solarSourceUrl(d))}
        ${sourceTile('sunset',readableSun(d,'set'),'Zonsondergang',solarSourceUrl(d))}
        ${sourceTile('clock',readableSun(d,'length'),'Daglicht',solarSourceUrl(d))}
      </div>
          </div>
        </div>
      </div>
      <div class="cockpit-duo cockpit-duo--roads">
        <div class="cockpit-panel road-alerts-dynamic">${roadAlertsContent(d)}</div>
        <div class="cockpit-panel road-now-dynamic">${roadNowContent(d)}</div>
      </div>
      <div class="cockpit-panel cockpit-panel--stage">
      <div class="details-section"><h3>Etappe</h3>
        <div class="stage-tiles">
          ${staticStageTile('pin',d.from,'Van')}
          ${staticStageTile('flag',d.overnightPlace||d.place,'Naar')}
          ${sourceTile('compass',!d.routeChanged&&Number.isFinite(d.roadEstimateKm)?'ca. '+Number(d.roadEstimateKm).toLocaleString('nl-NL')+' km':'—','Rijafstand',u.maps,'stage-tile',d.routeChanged?'Aangepaste route: afstand zelf controleren in Apple Kaarten.':'Indicatieve rijafstand zonder veerboten. '+(d.roadEstimateNote||'Bekijk de actuele route in Apple Kaarten.'))}
        </div>
      </div>
      ${stayEditor(d)}
      ${d.routeChanged?`<p class="actual-route-note">Aangepaste route: controleer afstand en officiële wegstatus zelf.${d.destinationChanged?' Weer en daglicht blijven voor de geplande bestemming '+esc(d.place)+'.':''} Vaste datums en veerboten blijven staan.</p>`:''}
      ${Array.isArray(d.steps)&&d.steps.length?`<details class="route-steps"><summary>Tussenstops · ${d.steps.length}</summary>
        <ol class="step-list">${d.steps.map(step=>`<li>${esc(step)}</li>`).join('')}</ol>
        ${d.roadEstimateNote?`<p class="snow-note">${esc(d.roadEstimateNote)}</p>`:''}
        ${d.note?`<p class="snow-note">${esc(d.note)}</p>`:''}
      </details>`:''}
        <div class="stage-utilities">
          ${fuelStrip(d)}
          <a class="route-cta" href="${esc(u.maps)}" target="_blank" rel="noopener noreferrer"
             title="Open deze etappe in Apple Kaarten" aria-label="Open de route van ${esc(d.from)} naar ${esc(d.place)} in Apple Kaarten">
             ${ico('compass')}<span>Open route</span>${ico('link')}
          </a>
        </div>
      </div>
      ${stayContent(d)}
      ${roadcamContent(d)}
      <div class="cockpit-panel cockpit-panel--actions">
      <div class="details-section"><h3>Direct openen</h3><div class="links">
        ${link('Verkeer',u.road)} ${d.ferry?link('Veerboot',u.ferry):''}
        ${link(d.destinationChanged?'Windkaart (gepland)':'Windkaart',u.wind)} ${link('Noorderlicht',u.aurora)} ${link('Tanken',u.fuel)} ${link('Benzineprijzen',FUEL_URL[d.country]||FUEL_URL.nl)}
      </div></div>
      </div>

    </div>`;
  }
  // Alleen actuele brondata, geen eigen noorderlichtvoorspellingen of webscraping.
  // NOAA OVATION is een kortetermijnmodel voor aurora direct boven de plaats;
  // Kp is wereldwijd, Open-Meteo levert bewolking op de huidige locatie.
  const auroraState={oval:null,kp:null,ovalAt:0,kpAt:0,cloud:new Map(),pending:null};
  const NOAA_OVAL='https://services.swpc.noaa.gov/json/ovation_aurora_latest.json';
  const NOAA_KP='https://services.swpc.noaa.gov/products/noaa-planetary-k-index.json';
  const auroraTime=t=>{
    if(typeof t!=='string')return null;
    const parsed=Date.parse(t.includes('T')?t:t.replace(' ','T')+'Z');
    return Number.isFinite(parsed)?parsed:null;
  };
  function localOval(d){
    const o=auroraState.oval;
    if(!o || !Array.isArray(o.coordinates) || o.coordinates.length<100)return null;
    const time=auroraTime(o['Forecast Time']);
    // Oude nowcasts nooit presenteren als een actuele voorspelling.
    if(time===null || Math.abs(Date.now()-time)>90*60000)return null;
    const longitude=(d.lon+360)%360;
    let best=null,minimum=Infinity;
    for(const c of o.coordinates){
      if(!Array.isArray(c)||c.length<3||c.some(v=>v===null||v===undefined||v===''))continue;
      const x=Number(c[0]),y=Number(c[1]),value=Number(c[2]);
      if(!Number.isFinite(x)||!Number.isFinite(y)||!Number.isFinite(value))continue;
      const dx=Math.min(Math.abs(x-longitude),360-Math.abs(x-longitude));
      const distance=dx*dx+Math.pow(y-d.lat,2);
      if(distance<minimum){minimum=distance;best=value;}
    }
    return minimum<=4 && best!==null && best>=0 && best<=100?best:null;
  }
  function kpNow(){
    const rows=auroraState.kp;
    if(!Array.isArray(rows))return null;
    for(let i=rows.length-1;i>0;i--){
      const row=rows[i];if(!Array.isArray(row)||row[1]===null||row[1]===undefined||row[1]==='')continue;
      const time=auroraTime(row[0]),v=Number(row[1]);
      if(time!==null && Date.now()-time>=0 && Date.now()-time<6*3600000 && v>=0 && v<=9)return v;
    }
    return null;
  }
  function auroraContent(d){
    const today=d.date===dateAtHome(),w=d.destinationChanged?null:weather(d),
      oval=today&&!d.destinationChanged?localOval(d):null,kp=today?kpNow():null,
      cloud=auroraState.cloud.get(locationId(d));
    const currentCloud=today&&!d.destinationChanged&&cloud?.at&&Date.now()-cloud.at<65*60000?cloud.value:null;
    const locality=AURORA_PLACES[d.place];
    const plannerUrl=locality?.url?locality.url+'/trip-planner':'https://nordlyskart.no/en/northern-lights';
    const plannerTitle=locality?.url
      ?'Nordlyskart Trip Planner voor de geplande bestemming. De langetermijnbeoordeling is niet automatisch uitleesbaar.'
      :'Geen plaatsgebonden Nordlyskart-planner gekoppeld. Open de algemene noorderlichtbron.';
    const tiles=[
      {icon:'moonstar',label:'Vooruitzicht',value:'—',url:plannerUrl,title:plannerTitle},
      {icon:'cloudy',label:'Bewolking nacht',value:n(w?.nightCloud)===null?'—':Math.round(w.nightCloud)+'%',
        url:weatherDailyUrl(d),title:'Modelgemiddelde van 18:00 tot 06:00 lokale tijd op de geselecteerde nacht · Open-Meteo'},
      {icon:'moon',label:'Maanlicht',value:n(w?.moonlight)===null?'—':Math.round(w.moonlight)+'%',
        url:weatherDailyUrl(d),title:'Benaderd verlicht deel van de maan uit de Open-Meteo-maanfase; zegt niet of de maan boven de horizon staat'},
      {icon:'moonstar',label:'Aurora nu',value:oval===null?'—':Math.round(oval)+'%',
        url:'https://www.spaceweather.gov/products/aurora-30-minute-forecast',
        title:'NOAA OVATION model voor circa 30 minuten vanaf nu; geen garantie op zichtbaarheid'},
      {icon:'cloudy',label:'Bewolking nu',value:n(currentCloud)===null?'—':Math.round(currentCloud)+'%',
        url:weatherCurrentUrl(d),title:'Actuele bewolking op de locatie · Open-Meteo'},
      {icon:'compass',label:'Kp nu',value:kp===null?'—':kp.toLocaleString('nl-NL',{maximumFractionDigits:1}),
        url:'https://www.spaceweather.gov/products/planetary-k-index',title:'Actuele planetaire Kp-index · NOAA'}
    ];
    return `<div class="aurora-tiles">${tiles.map(t=>sourceTile(t.icon,t.value,t.label,t.url,'aurora-tile',t.title)).join('')}</div>
      <div class="links">${link('Noorderlicht · bron',locality?.url||'https://nordlyskart.no/en/northern-lights')}</div>`;
  }
  function updateAuroraDisplay(){
    const d=days().find(day=>day.id===selected);
    if(!d)return;
    refreshOverview(d);
    const target=desktopLayout.matches
      ? $('sideDetail').querySelector('.aurora-dynamic')
      : $('timeline').querySelector('.day-card.is-open .aurora-dynamic');
    updateDynamicPanel(target,auroraContent(d));
    const nowTarget=desktopLayout.matches
      ? $('sideDetail').querySelector('.road-now-dynamic')
      : $('timeline').querySelector('.day-card.is-open .road-now-dynamic');
    updateDynamicPanel(nowTarget,roadNowContent(d));
  }
  async function fetchAurora(force=false){
    if(auroraState.pending)return auroraState.pending;
    const d=days().find(day=>day.id===selected);
    if(!d||d.destinationChanged||d.date!==dateAtHome())return;
    const now=Date.now(),id=locationId(d),jobs=[];
    if(force || now-auroraState.ovalAt>10*60000){
      auroraState.ovalAt=now;
      jobs.push(getJSON(NOAA_OVAL,12000).then(result=>{
        if(!Array.isArray(result?.coordinates))throw Error('Missing NOAA coordinates');
        auroraState.oval=result;
      }).catch(()=>{auroraState.oval=null;}));
    }
    if(force || now-auroraState.kpAt>10*60000){
      auroraState.kpAt=now;
      jobs.push(getJSON(NOAA_KP,10000).then(result=>{
        if(!Array.isArray(result))throw Error('Invalid NOAA Kp');
        auroraState.kp=result;
      }).catch(()=>{auroraState.kp=null;}));
    }
    const current=auroraState.cloud.get(id);
    if(force || !current || now-(current.checkedAt||0)>15*60000){
      jobs.push(getForecast(d).then(result=>{
        const v=key=>result?.current?.[key];
        const num=key=>v(key)===null||v(key)===undefined||v(key)===''||!Number.isFinite(Number(v(key)))?null:Number(v(key));
        // Bewaar het tijdstip van de modelwaarde, niet van het downloaden.
        // De Open-Meteo-tijd is lokaal, met utc_offset_seconds voor conversie.
        const time=String(result?.current?.time||'');
        const offset=Number(result?.utc_offset_seconds);
        const sampled=/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(time)&&Number.isFinite(offset)
          ?Date.parse(time+'Z')-offset*1000:null;
        const checkedAt=Date.now();
        const validTime=sampled!==null&&Number.isFinite(sampled)
          &&checkedAt-sampled>=-20*60000&&checkedAt-sampled<=90*60000;
        if(!validTime){
          auroraState.cloud.set(id,{at:null,checkedAt,value:null});
          return;
        }
        const cloud=num('cloud_cover'),humidity=num('relative_humidity_2m'),precip=num('precipitation'),
          direction=num('wind_direction_10m'),visibility=num('visibility');
        auroraState.cloud.set(id,{at:sampled,checkedAt,
          value:cloud!==null&&cloud>=0&&cloud<=100?cloud:null,
          precip:precip!==null&&precip>=0?precip:null,
          humidity:humidity!==null&&humidity>=0&&humidity<=100?humidity:null,
          direction:direction!==null&&direction>=0&&direction<=360?direction:null,
          visibility:visibility!==null&&visibility>=0?visibility:null});
      }).catch(()=>{auroraState.cloud.set(id,{at:null,checkedAt:Date.now(),value:null});}));
    }
    scheduleReadings();
    auroraState.pending=Promise.all(jobs).then(scheduleReadings).finally(()=>{
      auroraState.pending=null;
      const current=days().find(day=>day.id===selected);
      if(current&&!current.destinationChanged&&current.date===dateAtHome()&&!auroraState.cloud.has(locationId(current))){
        Promise.resolve().then(()=>fetchAurora(false).catch(()=>{}));
      }
    });
    return auroraState.pending;
  }
  const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
  const desktopLayout=window.matchMedia('(min-width:820px)');
  // Eén natuurlijke paginascroll op elk schermformaat.
  // De geselecteerde etappe verandert alleen na een expliciete keuze.
  desktopLayout.addEventListener('change',()=>render());

  let lastCheckedAt=0;
  const updatedTime=at=>new Intl.DateTimeFormat('nl-NL',{hour:'2-digit',minute:'2-digit'}).format(new Date(at));
  function updateStatus(){
    const el=$('update');if(!el)return;
    const today=dateAtHome();
    const forecastWithinRange=days().some(d=>{
      const gap=(Date.parse(d.date+'T12:00:00Z')-Date.parse(today+'T12:00:00Z'))/MS_DAY;
      return gap>=0&&gap<=15;
    });
    el.textContent=navigator.onLine===false?'Offline · route beschikbaar, live gegevens niet':
      busy?'Vernieuwen…':
      lastError?'Niet alle weersbronnen beschikbaar':
      !forecastWithinRange?'Weer buiten voorspellingsperiode':
      lastCheckedAt?'Weer gecontroleerd '+updatedTime(lastCheckedAt):
      mode==='preview'?'Weer voor de komende dagen':'Reisplanning 2027';
  }
  function weatherMeta(d){
    const item=weatherCache[dataKey(d)];
    if(!Number.isFinite(Number(item?.when))||Number(item.when)<=0)return 'nog geen voorspelling';
    const old=Date.now()-item.when>3*3600000;
    const when=new Intl.DateTimeFormat('nl-NL',old?{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'}:
      {hour:'2-digit',minute:'2-digit'}).format(new Date(item.when));
    return navigator.onLine===false?'offline · opgeslagen '+when:(old?'eerder opgehaald':'bijgewerkt')+' '+when;
  }
  const weatherTileValues=w=>[
    fmtDeg(w?.temp),
    fmtDeg(w?.feel),
    fmt(w?.gust,' km/u'),
    directionLabel(w?.windDir),
    n(w?.snow)===null?'—':Number(w.snow).toLocaleString('nl-NL',{maximumFractionDigits:1})+' cm',
    fmt(w?.precipChance,'%'),
    fmt(w?.cloud,'%'),
    fmt(w?.humidity,'%')
  ];
  const solarTileValues=d=>[
    readableSun(d,'rise'),readableSun(d,'set'),readableSun(d,'length')
  ];
  function writeValues(root,selector,values){
    if(!root)return;
    root.querySelectorAll(selector).forEach((el,i)=>{
      if(i>=values.length)return;
      const value=String(values[i]);
      if(el.textContent!==value)el.textContent=value;
      el.classList.toggle('is-empty',value==='—');
      const unit=el.closest('.glance-reading')?.querySelector('small');
      if(unit)unit.hidden=value==='—';
      // De gesproken waarde volgt altijd de zichtbare bronwaarde, ook bij live updates.
      const tile=el.closest('a.source-tile');
      const label=tile?.querySelector('.label')?.textContent?.trim();
      if(label)tile.setAttribute('aria-label',label+': '+value+'. Open bron in nieuw tabblad.');
    });
  }
  // Update alleen meetwaarden; <details>, camera's, bronlinks en scroll blijven bestaan.
  let readingsFrame=null;
  function scheduleReadings(){
    if(readingsFrame!==null)return;
    readingsFrame=requestAnimationFrame(()=>{readingsFrame=null;updateReadings();});
  }
  function updateReadings(){
    updateStatus();
    const arr=days();
    const cards=new Map(Array.from($('timeline').querySelectorAll('.day-card'),el=>[el.dataset.id,el]));
    for(const d of arr){
      const card=cards.get(d.id);
      if(!card)continue;
      const w=d.destinationChanged?null:weather(d),temperature=card.querySelector('.day-weather');
      if(temperature){
        const visual=temperature.querySelector('.day-weather-visual');
        const wanted=w?.icon?ico(w.icon):'';
        if(visual&&visual.innerHTML!==wanted)visual.innerHTML=wanted;
        writeValues(temperature,'.reading',[fmtDeg(w?.temp)]);
        writeValues(temperature,'.feel',[feelsLike(w?.feel)]);
      }
      writeValues(card,'.day-glance strong',[fmt(w?.gust),fmt(w?.snow),fmt(w?.nightCloud,'%')]);
    }
    const d=arr.find(x=>x.id===selected);
    if(!d)return;
    const roots=[$('sideDetail'),$('timeline').querySelector('.day-card.is-open .day-details')];
    for(const root of roots){
      if(!root)continue;
      writeValues(root,'.cockpit-panel--weather .weather-tile .value',weatherTileValues(weather(d)));
      writeValues(root,'.cockpit-panel--light .source-tile .value',solarTileValues(d));
      const meta=root.querySelector('.cockpit-panel--weather .source-meta');
      if(meta)meta.textContent=weatherMeta(d);
    }
    updateAuroraDisplay();
  }

  function render(){
    const arr=days();
    const desktop=window.matchMedia('(min-width:820px)').matches;
    if(!arr.length){$('timeline').textContent='Geen reisdagen beschikbaar';return;}
    if(!arr.some(d=>d.id===selected))selected=(mode==='trip'?arr.find(d=>d.date===dateAtHome()):null)?.id||arr[0].id;
    $('mode-preview').setAttribute('aria-pressed',String(mode==='preview'));
    $('mode-trip').setAttribute('aria-pressed',String(mode==='trip'));
    $('range').textContent=mode==='preview'?'Actueel weer op onze routeplaatsen':'21 januari – 3 februari 2027';
    updateStatus();
    const cards=arr.map(d=>{
      const w=d.destinationChanged?null:weather(d),open=d.id===selected;
      const to=d.overnightPlace||d.place;
      const sub=(mode==='preview'?'Testetappe · ':'')+(d.from===to?'Lokale ritten':d.from+' → '+to)+(d.destinationChanged?' · gepland '+d.place:'');
      return `<article class="day-card${open?' is-open':''}" data-id="${esc(d.id)}">
        <button type="button" class="day-button" data-select="${esc(d.id)}" aria-expanded="${open}" aria-controls="${desktop?'sideDetail':'detail-'+esc(d.id)}">
        <div class="day-main"><span class="day-date"><span class="num">${esc(labelDate(d.date,{day:'numeric'}))}</span><span class="month">${esc(labelDate(d.date,{weekday:'short',month:'short'}))}</span></span>
        <span class="day-summary"><span class="day-title">${esc(d.overnightPlace||d.place)}${d.optional?' · optie':''}</span><span class="day-route" style="display:block">${esc(sub)}</span></span>
        <span class="day-weather"><span class="day-weather-visual">${w?.icon?ico(w.icon):''}</span><span class="reading">${fmtDeg(w?.temp)}</span><span class="feel">${feelsLike(w?.feel)}</span></span>
        ${ico('arrow','chevron')}
        </div><div class="day-glance">
          <span class="glance" title="Maximale windstoten op de bestemming">
            <span class="glance-label">Wind</span><span class="glance-reading"><strong class="${n(w?.gust)===null?'is-empty':''}">${fmt(w?.gust)}</strong><small ${n(w?.gust)===null?'hidden':''}>km/u</small></span>
          </span>
          <span class="glance" title="Sneeuwval over de hele dag">
            <span class="glance-label">Sneeuw</span><span class="glance-reading"><strong class="${n(w?.snow)===null?'is-empty':''}">${fmt(w?.snow)}</strong><small ${n(w?.snow)===null?'hidden':''}>cm</small></span>
          </span>
          <span class="glance" title="Bewolking tijdens de nacht">
            <span class="glance-label">Nacht</span><span class="glance-reading"><strong>${fmt(w?.nightCloud,'%')}</strong></span>
          </span>
          <span class="glance" title="Afsluitmeldingen bij de bekende routepunten, geen volledige routecontrole">
            <span class="glance-label">Wegen</span><span class="glance-reading"><strong>${roadGlance(d)}</strong></span>
          </span>
        </div></button>
        <div class="day-details" id="detail-${esc(d.id)}" ${open?'':'hidden'}>${open&&!desktop?detailContent(d):''}</div></article>`;
    }).join('');
    $('timeline').innerHTML=cards+(mode==='trip'&&RETURN?`<div class="return-card">${ico('road')}<span>${esc(RETURN)}</span></div>`:'');
    $('sideDetail').innerHTML=desktop?detailContent(arr.find(d=>d.id===selected)):'';
    const fuelDay=arr.find(d=>d.id===selected);
    if(fuelDay&&navigator.onLine!==false){
      loadFuel(fuelCountry(fuelDay)).catch(()=>{});
      loadRegionalFuel(fuelDay).catch(()=>{});
      fetchFx().catch(()=>{});
    }
    if(navigator.onLine!==false){
      fetchAurora().catch(()=>{});
      const selectedRoadDay=days().find(x=>x.id===selected);if(selectedRoadDay){fetchRoadAlerts(selectedRoadDay).catch(()=>{});loadRouteWeather(selectedRoadDay).catch(()=>{});}
    }
  }
  // Eén gedelegeerde handler, ook na een wijziging van de route of schermbreedte.
  $('timeline').addEventListener('click',event=>{
      const btn=event.target.closest('[data-select]');
      if(!btn)return;
      const id=btn.dataset.select;
      if(id!==selected){
        selected=id;
        const restoreFocus=document.activeElement===btn;
        render();
        if(restoreFocus){
          if(desktopLayout.matches){
            const heading=$('sideDetail').querySelector('.nord-place h2');
            if(heading){heading.tabIndex=-1;heading.focus({preventScroll:true});}
          }else{
            const next=$('timeline').querySelector('[data-select="'+id+'"]');
            next?.focus({preventScroll:true});
          }
        }
        loadSelectedReadings();
      }
      // Op mobiel opent de geselecteerde etappe in de tijdlijn.
      // Op desktop gaat de pagina naar het begin van de cockpit, niet naar een
      // late rij links waardoor het belangrijke overzicht buiten beeld valt.
      const card=[...$('timeline').querySelectorAll('.day-card')].find(el=>el.dataset.id===id);
      requestAnimationFrame(()=>{
        const target=desktopLayout.matches?$('sideDetail'):card;
        target?.scrollIntoView({
          block:'start',
          behavior:reduceMotion.matches?'auto':'smooth'
        });
      });
  });
  async function getJSON(url,timeout=10000){
    const ac=new AbortController(),t=setTimeout(()=>ac.abort(),timeout);
    try{const res=await fetch(url,{signal:ac.signal,cache:'no-store'});if(!res.ok)throw Error('HTTP '+res.status);return await res.json()}finally{clearTimeout(t)}
  }

  // Haal alleen uurweer voor de geopende etappe op; maximaal twee bronnen tegelijk.
  // Modellen zijn geen metingen van het wegdek of een veilige-routebeoordeling.
  const routeWeatherFailures=new Map();
  async function loadRouteWeatherPoint(d,p,force=false){
    const key=routeWeatherKey(d,p),now=Date.now(),current=routeWeatherCache[key];
    if(!force&&current&&Number.isFinite(Number(current.when))&&now-current.when<60*60000
      &&Object.hasOwn(current.values||{},'cloud'))return;
    if(routeWeatherPending.has(key))return routeWeatherPending.get(key);
    if(!force&&now-(routeWeatherAttempts.get(key)||0)<10*60000)return;
    routeWeatherAttempts.set(key,now);
    const job=(async()=>{
      try{
        const result=await getJSON(routeWeatherUrl(d,p),12000);
        const hourly=result?.hourly;
        if(!Array.isArray(hourly?.time))throw Error('Geen uurreeks');
        const target=d.date+'T'+String(p.hour).padStart(2,'0')+':00';
        const i=hourly.time.indexOf(target);
        if(i<0)throw Error('Geen uur voor gekozen kijkmoment');
        const value=field=>Array.isArray(hourly[field])?n(hourly[field][i]):null;
        const raw={
          temp:value('temperature_2m'),
          gust:value('wind_gusts_10m'),
          snow:value('snowfall'),
          visibility:value('visibility'),cloud:value('cloud_cover')
        };
        // Bronfouten, lege waarden en onrealistische waarden zijn nooit nul.
        const values={
          temp:raw.temp!==null&&raw.temp>=-80&&raw.temp<=60?raw.temp:null,
          gust:raw.gust!==null&&raw.gust>=0&&raw.gust<=300?raw.gust:null,
          snow:raw.snow!==null&&raw.snow>=0&&raw.snow<=100?raw.snow:null,
          visibility:raw.visibility!==null&&raw.visibility>=0&&raw.visibility<=100000?raw.visibility:null,
          cloud:raw.cloud!==null&&raw.cloud>=0&&raw.cloud<=100?raw.cloud:null
        };
        routeWeatherCache[key]={when:Date.now(),values};
        routeWeatherFailures.delete(key);
        const keys=Object.keys(routeWeatherCache);
        if(keys.length>100){
          keys.sort((a,b)=>Number(routeWeatherCache[b]?.when||0)-Number(routeWeatherCache[a]?.when||0));
          keys.slice(100).forEach(k=>delete routeWeatherCache[k]);
        }
        safePut('routeWeather',routeWeatherCache);
      }catch{
        routeWeatherFailures.set(key,Date.now());
      }finally{
        refreshRouteWeatherPanel(d);
      }
    })().finally(()=>routeWeatherPending.delete(key));
    routeWeatherPending.set(key,job);
    return job;
  }
  async function loadRouteWeather(d,force=false){
    if(!d||d.routeChanged||navigator.onLine===false||!weatherDayAvailable(d.date))return;
    const all=routeWeatherPoints(d);
    let cursor=0;
    const jobs=Array.from({length:Math.min(2,all.length)},async()=>{
      while(cursor<all.length){
        const p=all[cursor++];
        await loadRouteWeatherPoint(d,p,force);
      }
    });
    await Promise.all(jobs);
  }

  async function mapConcurrent(items,limit,handler){let i=0;const jobs=Array.from({length:Math.min(limit,items.length)},async()=>{while(i<items.length){const item=items[i++];try{await handler(item)}catch{lastError=true}}});await Promise.all(jobs)}
  // Eén lopend forecast-verzoek per exacte locatie en tijdzone.
  // De actuele velden worden alleen voor een locatie van vandaag meegevraagd.
  const forecastPending=new Map(),sunPending=new Map();
  const forecastKey=d=>[d.lat,d.lon,LOCAL_TZ(d)].join('|');
  const CURRENT_FIELDS='cloud_cover,precipitation,relative_humidity_2m,wind_direction_10m,visibility';
  function getForecast(d){
    const key=forecastKey(d);
    if(forecastPending.has(key))return forecastPending.get(key);
    const today=days().some(day=>forecastKey(day)===key&&day.date===dateAtHome()&&!day.destinationChanged);
    const q=new URLSearchParams({latitude:String(d.lat),longitude:String(d.lon),daily:WEATHER_DAILY_FIELDS,hourly:WEATHER_HOURLY_FIELDS,timezone:LOCAL_TZ(d),forecast_days:'16'});
    if(today)q.set('current',CURRENT_FIELDS);
    const job=getJSON('https://api.open-meteo.com/v1/forecast?'+q,11000)
      .finally(()=>forecastPending.delete(key));
    forecastPending.set(key,job);
    return job;
  }
  function storeWeather(d,out){
    const key=dataKey(d);
    const dateIdx=out?.daily?.time?.indexOf(d.date)??-1;
    if(dateIdx<0)return;
    const val=k=>out?.daily?.[k]?.[dateIdx];
    // Gemiddelde bewolking van de geselecteerde avond 18:00 tot de volgende ochtend 06:00 (lokale tijd).
    const hourly=out?.hourly||{},nextDay=addDays(d.date,1),night=[];
    if(Array.isArray(hourly.time)&&Array.isArray(hourly.cloud_cover)){
      hourly.time.forEach((t,i)=>{
        if(typeof t!=='string')return;
        const day=t.slice(0,10),hour=Number(t.slice(11,13)),v=n(hourly.cloud_cover[i]);
        if((day===d.date&&hour>=18)||(day===nextDay&&hour<6)){
          if(v!==null&&v>=0&&v<=100)night.push(v);
        }
      });
    }
    const phase=n(val('moon_phase'));
    const moonlight=phase!==null&&phase>=0&&phase<=1?Math.round((1-Math.cos(phase*Math.PI*2))*50):null;
    weatherCache[key]={when:Date.now(),value:{
      temp:n(val('temperature_2m_mean')),feel:n(val('apparent_temperature_mean')),
      icon:codeIcon(val('weather_code')),gust:n(val('wind_gusts_10m_max')),
      windDir:n(val('wind_direction_10m_dominant')),precipChance:n(val('precipitation_probability_max')),
      snow:n(val('snowfall_sum')),cloud:n(val('cloud_cover_mean')),
      humidity:n(val('relative_humidity_2m_mean')),
      nightCloud:night.length>=9?Math.round(night.reduce((a,b)=>a+b,0)/night.length):null,
      moonlight
    }};
  }
  async function getWeatherGroup(group,force=false){
    const needed=group.filter(d=>force||!fresh(d));
    if(!needed.length)return;
    const out=await getForecast(needed[0]);
    for(const d of needed)storeWeather(d,out);
    safePut('weather',weatherCache);scheduleReadings();
  }
  async function getSun(d){
    const key=dataKey(d);if(sunCache[key])return;
    if(sunPending.has(key))return sunPending.get(key);
    const job=(async()=>{
      const out=await getJSON(solarSourceUrl(d),12000);
      if(!['normal','polar_night','midnight_sun'].includes(out?.sun_status))throw Error('Onbekende zonstatus');
      sunCache[key]={when:Date.now(),value:{sun_status:out.sun_status,sunrise:out.sunrise,sunset:out.sunset,day_length:out.day_length}};
      safePut('sun',sunCache);scheduleReadings();
    })().finally(()=>sunPending.delete(key));
    sunPending.set(key,job);
    return job;
  }
  function loadSelectedReadings(){
    if(navigator.onLine===false)return;
    const d=days().find(day=>day.id===selected);
    if(!d)return;
    if(weatherDayAvailable(d.date))getWeatherGroup([d]).catch(()=>{lastError=true;scheduleReadings();});
    getSun(d).catch(()=>{lastError=true;scheduleReadings();});
  }
  let refreshCycle=0, pendingRefresh=false,pendingForce=false;
  async function refresh(force=false){
    if(navigator.onLine===false){busy=false;updateStatus();return;}
    if(busy){pendingRefresh=true;pendingForce=pendingForce||force;loadSelectedReadings();return;}busy=true;lastError=false;updateStatus();
    const arr=prioritise(days(),selected),cycle=++refreshCycle;
    const uniqueSun=uniqueBy(arr.filter(d=>!sunCache[dataKey(d)]),dataKey);
    const uniqueWeather=uniqueBy(arr.filter(d=>weatherDayAvailable(d.date)&&(force||!fresh(d))),dataKey);
    const groups=groupBy(uniqueWeather,forecastKey);
    await Promise.all([
      mapConcurrent(groups,3,group=>getWeatherGroup(group,force)),
      mapConcurrent(uniqueSun,3,d=>getSun(d))
    ]);
    if(cycle===refreshCycle){
      busy=false;lastCheckedAt=Date.now();scheduleReadings();
      if(pendingRefresh){const again=pendingForce;pendingRefresh=false;pendingForce=false;refresh(again);}
    }
  }
  function changeMode(m){mode=m;safePut('mode',mode);selected=null;render();refresh()}
  // Laat de Safari-adresbalk en de themaknop dezelfde systeem- of gebruikersmodus volgen.
  const systemDark=matchMedia('(prefers-color-scheme: dark)');
  const actualTheme=()=>document.documentElement.dataset.theme||(systemDark.matches?'dark':'light');
  function syncBrowserTheme(){
    const meta=document.querySelector('meta[name="theme-color"]');
    if(meta)meta.setAttribute('content',actualTheme()==='dark'?'#101114':'#f5f5f7');
    $('theme').innerHTML=ico(actualTheme()==='dark'?'sun':'moon');
    const themeAction=actualTheme()==='dark'?'Schakel naar lichte weergave':'Schakel naar donkere weergave';
    $('theme').setAttribute('title',themeAction);
    $('theme').setAttribute('aria-label',themeAction);
  }
  function changeTheme(){
    const next=actualTheme()==='dark'?'light':'dark';
    document.documentElement.dataset.theme=next;
    safePut('theme',next);
    syncBrowserTheme();
  }
  const theme=safeGet('theme','auto');if(theme==='light'||theme==='dark')document.documentElement.dataset.theme=theme;
  $('refresh').innerHTML=ico('refresh');syncBrowserTheme();
  systemDark.addEventListener('change',()=>{if(!document.documentElement.dataset.theme)syncBrowserTheme()});
  $('refresh').addEventListener('click',()=>{if(navigator.onLine===false){updateStatus();return;}refresh(true);fetchAurora(true).catch(()=>{});const d=days().find(x=>x.id===selected);if(d){fetchRoadAlerts(d,true).catch(()=>{});loadRouteWeather(d,true).catch(()=>{});loadFuel(fuelCountry(d),true).catch(()=>{});loadRegionalFuel(d,true).catch(()=>{});fetchFx(true).catch(()=>{});}});
  $('theme').addEventListener('click',changeTheme);

  // Eén handler voor de zichtbare mobiele of desktopeditor.
  document.addEventListener('submit',event=>{
    const form=event.target.closest('form[data-stay-date]');
    if(!form)return;
    event.preventDefault();
    const date=form.getAttribute('data-stay-date');
    const place=form.elements.namedItem('overnightPlace')?.value;
    const country=form.elements.namedItem('overnightCountry')?.value;
    if(storeStop(date,place,country))render();
  });
  document.addEventListener('click',event=>{
    const btn=event.target.closest('button[data-reset-date]');
    if(!btn)return;
    clearStop(btn.getAttribute('data-reset-date'));
    render();
  });
  $('mode-preview').addEventListener('click',()=>changeMode('preview'));
  $('mode-trip').addEventListener('click',()=>changeMode('trip'));
  // De routepagina is na een eerste online bezoek opnieuw te openen zonder internet.
  // Alleen de app-shell wordt gecachet, nooit live verkeers-, weer- of prijsdata.
  if('serviceWorker' in navigator&&location.protocol==='https:'){
    navigator.serviceWorker.register('./sw.js',{scope:'./'}).catch(()=>{});
  }
  window.addEventListener('offline',()=>{updateStatus();const d=days().find(x=>x.id===selected);if(d)refreshRouteWeatherPanel(d);});
  window.addEventListener('online',()=>{
    updateStatus();refresh();
    const d=days().find(x=>x.id===selected);
    if(d){
      loadFuel(fuelCountry(d)).catch(()=>{});
      loadRegionalFuel(d).catch(()=>{});
      fetchFx().catch(()=>{});
      fetchAurora().catch(()=>{});
      fetchRoadAlerts(d).catch(()=>{});
      loadRouteWeather(d).catch(()=>{});
      refreshRouteWeatherPanel(d);
    }
  });
  render();
  if(navigator.onLine!==false)refresh();
})();
