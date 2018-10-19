# IT2810 Webutvikling - Prosjekt 3 - Gruppe 04

## Introduksjon

I dette prosjektet fikk vi i oppgave om å lage en “Personal information and motivation manager” app for mobil, som skal kompileres til både iOS og Android. Dette skulle gjøres basert på React Native med bruk av Expo-verktøyet.

### Vårt produkt

Appen BUTLER hjelper deg med å opprette gjøremål enkelt og raskt. Vi har opplevd at det oftere er enklere å ta bilde av noe for å huske det, fremfor å skrive ned. “Et bilde sier mer enn tusen ord”. Prototypen vi har lagd har støtte for å opprette bilde-gjøremål, med tidsfrist (om man ønsker det). Man kan og selvsagt lage “vanlige” tekst-todo’s med eventuell tilhørende tidsfrist. Om man er motivert til å komme i bedre form, er det og mulig å opprette skritteller-gjøremål. Her kan man skrive inn hvor mange skritt man ønsker å gå, med eventuell tidsfrist. Denne funksjonaliteten har vi skrudd av på Android siden pedometer-funksjonaliteten krever at man aksesserer google-API-et som skaper en error om man ikke har autentisert appen hos Google. Dette hadde funket på en ekte app, men siden dette er mer en prototyp som skulle fungere på både ios og android måtte vi droppe pedometer-funksjonaliteten på android.

På hjem-skjermen ser man en oversikt over alle sine gjøremål, enten det er i form av en tekst, et bilde, eller et skritteller-mål. Man kan huke av de oppgavene man har gjort ferdig (dette lagres automatisk) og slette de oppgavene man er ferdig med. I bunn av gjøremålslisten viser BUTLER noen tilfeldig valgte utsagn som skal motivere brukeren. Intensjonen bak motivasjonsteksten og tidfristen man kan sette på gjøremålene, er å motivere brukeren til å lage seg oppgaver og leve et mer strukturert og bedre liv. 
 
## Design
Under idéfasen av prosjektet fant vi ut en mangel med mange av dagens gjøremåls-apper. Det er ofte lettere å huske noe basert på et bilde, fremfor en tekst. Raskere er det og. 

Vi valgte en rød-rosa farge som kontrastfarge, da disse fargene hver for seg representerer energi (rød) og lekenhet (rosa). Dette samsvarte godt med vår produkt. Vi ønsket et ryddig oversiktlig design som ikke trakk fokuset til brukeren bort fra det viktigste med appen - å få informasjon. Ved å legge inn noe motiverende quotes under gjøremålene er formålet å motivere brukeren til å fullføre de målene en har satt seg. Vi tenkte det og kunne være motiverende å legge til en skritteller-task for de brukerne som har iOS. Dette vil og kunne være motiverende for brukeren. 

Det var essensielt for oss å gjøre det raskt å opprette nye gjøremål. Vi var glad for å finne ActionButton-biblioteket med tilhørende FAB (Floating Action Button). Denne knappen ordner funksjonaliteten på en god måte som heller ikke tar for mye plass. 

Under finner du våre mockups. Vi gjorde små endringer etterhvert som vi så forbedringspotensialet til design-utkastet, blant annet endret vi navnet fra BIRD til BUTLER. 

<img src="https://imgur.com/rYKAMpF.png" width="200px"/> <img src="https://imgur.com/mxv57ec.png" width="200px"/> <img src="https://imgur.com/6WAls1W.png" width="200px"/> <img src="https://imgur.com/AISNYEE.png" width="200px"/>


## Teknologi
Under utviklingen av BUTLER har vi brukt react-native med bruk av expo-verktøyet. Alle biblioteker vi har benyttet oss av er valgt med tanke på at de skal fungere på ios, android og med expo. 

### AsyncStorage
AsyncStorage var et krav for prosjektet og ble implementert gjennom en egen wrapper-klasse som vi skrev selv. Målet med denne klassen var å holde all AsyncStorage-funksjonalitet på ett sted i koden, samt forenkle bruken av denne.

Funksjonene vi kom fram til var ```RetrieveTodos()```, ```StoreTodos(todos)```, ```AddTodo(todo)``` og ```Clear()```. ```RetrieveTodos()``` bruker ```AsyncStorage.getItem()``` til å hente gjøremålene som er lagret. Gjøremålene lagres i en liste med gjøremål-objekter i AsyncStorage-lagringen.```StoreTodos(todos)``` tar inn en liste med gjøremål-objekter og bruker ```AsyncStorage.setItem()``` for å lagre gjøremålene. ```AddTodo(todo)``` legger til nye gjøremål, ved å hente alle gjøremål  med ```RetrieveTodos()``` og legge til det nye gjøremålet i listen. Den nye listen vil så lagres med ```AsyncStorage.setItem()```. ```Clear()``` funksjonen benytter seg av ```AsyncStorage.clear()``` til å fjerne alle lagrede gjøremål. Alle AsyncStorage funksjonene skjer inne i try/catch for å fange opp eventuelle feil. Eks:

```javascript

export async function RetrieveTodos() {
    try {
        return await AsyncStorage.getItem('todos', null);
    } catch (error) {
        alert(error);
    }
}

```


### Permissions
Siden applikasjonen vår gir mulighet til opplasting av bilder, trenger vi tilgang til brukerens bilde-bibliotek og kamera. For å få tilgang til disse benyttet vi Permissions-verktøyet til expo. I likhet med AsyncStorage, lagde vi vår egen wrapper til disse funksjonene slik at de kunne benyttes på en enkel og ryddig måte i koden vår.  I Permissions.js har vi to funksjoner som håndterer permissions, ```RequestPermission()``` og ```CheckPermission()```. ```RequestPermission()``` ber om tilgang, og ```CheckPermission()``` sjekker om brukeren allerede har tilgang. ```RequestPermission()``` benytter seg av ```Permission.askAsync()``` og spør brukeren om tilgang i et pop-up-vindu. Tilgang spørres etter i ```_pickImage``` og ```_pickCameraImage``` funksjonene i CreateTaskView.js, som kjøres når brukeren skal legge til et bilde til et gjøremål. 

```CheckPermission()``` benytter seg av ```Permissions.getAsync()``` som sjekker om appen allerede har fått tilgang til de forskjellige tilgangs-parametrene som i vårt tilfelle er ```camera``` og ```cameraRoll```. 

### ImagePicker

ImagePicker er en klasse i expo-modulen som lar en bruker velge et bilde fra telefonen. I vår applikasjon brukes denne klassen til å hente bilde fra enten kameraet eller biblioteket. Bildet som velges kan lagres enten som en base64-string eller i et buffer på telefonen. Dette bufferet slettes når applikasjonen avsluttes, så det er ingen grunn til å bekymre seg over lagrinsplass på telefonen. Både kamera og bibliotek krever eksplisitte permissions fra brukeren. Et eksempel fra koden vår er inkludert under:

```javascript

const status = await RequestPermission('cameraRoll');

if (!status) { return } // Return if permission not granted

const result = await ImagePicker.launchImageLibraryAsync({
   allowsEditing: true,
   base64: false,
});

```

Her sjekker vi først at permissions er gitt før vi åpner biblioteket på telefonen slik at brukeren kan velge et bilde. Resultatet lagres i ```results``` variabelen. Her spesifiserer vi også ```allowsEditing``` til å være sann. Dette gir mulighet til å croppe bildet før det lastes opp. Variabelen ```results``` er et objekt som inneholder et uri-felt som peker til bufferet hvor bildet er lagret.


### ImageManipulator

Når vi skulle lagre bildene våre i AsyncStorage fant vi ut at lagringsplassen på Android default er på kun 6mb, som i vårt tilfelle ikke var nok til å lagre et bilde. Vi brukte derfor ImageManipulator fra expo-biblioteket til å minske størrelsen på bildene. Vi trengte ikke at bildene skulle være spesielt store, så vi “re-sizet” dem til å være på 300*300 pixler, formaterte dem til jpeg og comprimerte dem med en faktor på 0,5 (1= ingen kompresjon, 0= maks kompresjon.) Måten vi manipulerte bildene på  var som følgende:

```javascript

const uri = result.uri; 
    const actions = [{ resize: { width: 300 } }]; 
    const saveOptions = {
        compress: 0.5, 
        format: 'jpeg',
        base64: true,
 	};
  
const newImage = await ImageManipulator.manipulate(uri, actions, saveOptions);

```

``` ImageManipulator.manipulate(uri, actions, saveOptions) ``` tar tre argumenter, uri er selve bildet, actions er en liste med objekter som sier hvordan bildet skal endres, og saveOptions er hvordan bildet skal lagres. I actions resizer vi bildet til å ha en bredde på 300 piksler, og ved å kun definere hva bredden skal være blir høyden skalert slik at bildet beholder sitt originale format. ```saveOptions``` sier hvordan bildet skal lagres, og det er her vi definerer at bildet skal lagres som jpeg, og at bildet skal komprimeres. ```base64``` konverterer bildet til en streng 


### react-navigation
React navigation er et bibliotek som håndterer navigering mellom forskjellige views. Vi valgte å benytte oss av denne da vi hadde behov for en header til applikasjonen og dette spesifikke biblioteket genererer denne automatisk. 

```javascript
render() {
   return <AppWithNavigation />;
}

const AppWithNavigation = createStackNavigator(
   {
     Home: HomeView,
     NewTask: CreateTaskView,
   },
   {
     initialRouteName: 'Home', // defines which view to open on startup
   }
);
```

Over er et eksempel på hvordan vi opprettet navigasjonssystemet. I App.js filen returnerer vi kun ```AppWithNavigation```. Dette tar inn forsjekllige views i applikasjonen og gir de et variabelnavn. Alle views som er definert her blir automatisk gitt en prop som heter ```navigation```. Denne kan benyttes til å navigere mellom views. For å modifisere headeren bruker vi en statisk variabel i hver av viewsene.

```javascript
static navigationOptions = {
   title: 'TITTEL HER',
   headerStyle: {
       backgroundColor: '#fff'
   },
   headerTintColor: '#ff0042',
   headerTitleStyle: {
       color: '#ff0042',
   }
};
```


### react-native-modal
Dette biblioteket brukes når man vil vise innhold som for eksempel en pop-up over annet innhold. I appen vår bruker vi dette når man velger om man vil laste opp et bilde fra minnet på telefonen, eller om man vil ta et bilde med kameraet. Modal er også en dependency for dateTime-pickeren vi har valgt å bruke, så dette biblioteket passet fint for våre behov. 

```xml
<Modal isVisible={this.props.isModalVisible}
  onBackdropPress={this.props.toggleModal}>
  <View>
      <Button onPress={this.props.pickImage} title={"Choose from library!"}/>
      <Button onPress={this.props.pickCameraImage} title={"Take picture with camera!"}/>
  </View>
</Modal>
```

Slik ser vår implementasjon av Modal’en som velger bilde-input-metoder. Modal’en blir togglet av og på med prop’en isModalVisible som passes ned fra CreateTaskViewComponent.js. Til vanlig er ikke Modal’en synlig, og isModalVisible blir lik True når man trykker på feltet for å legge til bilde i et bilde-gjøremål. Modalen inneholder to knapper som har hver sin funksjon som kalles, og det er disse brukeren trykker på for å velge “bilde-kilde”.

### react-native-action-button
Vi brukte actionbutton til å lage FAB-knappen som sender deg til sidene hvor man kan lage de forskjellige taskene. Under er et simplifisert eksempel på hvordan vi implementerte FABComponent.js

```javascript
renderiOSComponent(){
	if (Platform.OS === 'ios') {return{<ActionButton.Item title="New step counter task" />}}
}
```
```xml
<ActionButton>
    {renderiOSComponent()}
    <ActionButton.Item title="New image task"/>
    <ActionButton.Item title="New text task"/>
</ActionButton> 
```
Knappen ```<ActionButton>``` vil rendre alle ```<ActionButton.item/>``` når den trykkes på, ```renderiOSComponent()```-funksjonen sjekker hvilken platform som brukes, og et ```<ActionButton.item/>``` kun på ios. 

### react-native-vector-icons
Alle ikonene brukt i appen er Ionicons fra react-native-vector-icons, vi har valgt de iconene som fungerer på tvers av ios, android og expo. Et eksempel på bruk av Ionicons:

```xml
<Ionicons name="md-checkmark" size={35} color="#FF0040" /> 
```
Dette er “checkmark”-ikonet vi brukte i appen.

### react-native-modal-datetime-picker
Dette biblioteket inneholder et brukergrensesnitt for å vise den native’ dato-velgeren til telefonen, enten om det er Android eller iOS. Når man har bekreftet det tidspunktet man ønsker for frist på todo’en returnerer dato-velgeren et date-objekt. Dette konverterer vi til en streng og definerer hvor mye av informasjonen fra dato-velgeren vi ønsker å ha med. Slik ser dette ut:

```javascript
_handleDatePicked = (date) => {
    let deadlineString = date.toString().substring(0,16) + 'at ' + date.toString().substring(16,21);
}
```

Som vist i eksempelet over konverterer vi deler av date-objektet til en streng for å vise i appen. Dersom vi ønsket å bruke deadline til noe annet enn at den bare blir vist så kunne vi ikke brukt denne strengen. Vi trenger for eksempel hele date-objektet for å sammenligne tidspunkter i forbindelse med varsling om at en frist nærmer seg. Dette ser vi på som en mulig fremtidig utvidelse.

For å ta høyde for tidsforskjell så har vi lagt på 2 timer på den tiden dato-velgeren returnerer. Dette gjøres enkelt når vi setter opp elementet ved å legge inn valgalternativet ```timeZoneOffsetInMinutes={120}```.

### Pedometer
For å kunne ha skritteller-funksjonalitet valgte vi å benytte oss av Pedometer verktøyet til expo. Dette funket fint på iOS, men vi møtte på noen utfordringer med det på Android da det krever at brukeren skulle ha Google Fit på sin enhet for at den skulle fungere slik vi ville. Siden ikke alle har dette valgte vi å kun ha skritteller-funksjonalitet på ios, siden det stod i oppgavebeskrivelsen at appen skulle virke på både ios og android. Dette var en kjedelig avgjørelse vi måtte ta, men vi ville ikke at android-brukere kunne oppleve å få feilmeldinger om de ikke hadde Google Fit installert på sin enhet.

Måten biblioteket fungerer er at den tar i bruk gyroskopet og en ulike sensorer på iPhonen som klarer å oppdage om et skritt er tatt. Dette er allerede implementert i operativsystemet så vi trenger kun å aksessere det. 

## Bruk av Git

Under arbeidet med appen har vi brukt github til å holde styr på progresjonen i utviklingen. Vi har lagd issues som beskriver hva som må gjøres, og deretter har vi lagd branches ut i fra disse. Det har vært jevn fordeling på arbeidet, selv om det står at noen har flere linjer kode så er ikke dette en god representasjon på arbeidsforholdet innad i gruppen da linjene og inkluderer biblioteker, og react-relaterte kode-masser. Under prosjektet har vi også ofte benyttet oss av parprogrammering, slik at flere på gruppen fikk kunnskap om enkelte ting. Underveis i prosjektet har vi relatert commits til issues, men det har ikke alltid fungert som vi ville, spesielt i starten av prosjektet var vi litt usikre på hvordan dette skulle gjøres best mulig. 

## Testing
Til testing av applikasjonen benyttet vi Jest-biblioteket. Dette biblioteket integrerer veldig bra med react native og tilbyr god funksjonalitet for testing. Før vi begynte satt vi oss et mål om å oppnå en dekningsgrad på 100%. I starten var dette bare et mål å holde i bakhodet, men etterhvert som vi fikk bedre forståelse av jest og dets funksjoner innså vi at dette målet var oppnåelig. Alle på gruppen har derfor puttet stor innsats i testingen og den endelige dekningsgraden vår endte også opp på 100%. 

Dette betyr selvfølgelig ikke at grundigheten i enhetstestene våre ikke også har vært viktig for oss i utviklingsprosessen. Testene våre forsikrer oss om at all funksjonalitet virker og at grensesnitt renderer på en korrekt måte. For hver av testene vi har skrevet har vi gått grundig inn for å forsikre oss at alle forgreiningene dekkes og kjører på en korrekt måte. Vi har også benyttet oss hyppig av mocking-funksjoner fra jest-biblioteket til å teste funksjonskall som gjøres, samt for å forhindre kjøring av kodesnutter som kan være problematiske i et test-miljø. Den sistnevnte gruppen blir ikke utelatt fra testingen, men blir heller testet i andre enhetstester. Til rendering av komponenter benyttes snapshot-testing.

I tillegg til enhetstestingen har vi gjennomført smoke-testing på diverse enheter som inkluderer iPhone X, iPhone 6, iPhone SE, Samsung XCover 4, Huawei Y6 2018 og  Honor 6. Alle disse enhetene kjørte applikasjonen med forventet oppførsel og funksjonalitet.

## Kilder
* Mocke Android plattform i Jest: https://stackoverflow.com/questions/43161416/mocking-platform-detection-in-jest-and-react-native
* https://jestjs.io/
* https://stackoverflow.com/
* https://expo.io/
* https://facebook.github.io

