# outdoor-clothing-visual-support
Appen kommer att vara ett verktyg för att skapa en daglig bildstödsserie med bilder på kläder åt ett barn.
Föräldern ska ha möjlighet att ta fotografier av barnets kläder och välja vilka bilder som kommer vara synliga för barnet.
Appen kommer att vara uppdelad i två delar. 
Den första delen är för föräldern och kommer innehålla alla delarna för att skapa bildstödet. 
Den andra delen är för barnet och kommer endast att presentera de bilder som föräldern valt ut. 
När barnet har klätt på sig respektive klädesplagg ska hen kunna markera klädesplagget som avklarad.

----

Termer:

**Kort**
En komponent för ett klädesplagg som innehåller bild på och data; namn, typ, högsta och lägsta temperatur samt vilka väderförhållanden som klädesplagget är lämplig för.

**Lista**
En listvy som påminner om en att-göra-lista. I denna kommer valda Kort att läggas till och tas bord. Dels kommer detta ske automatiskt.

**Garderob**
En vy med åtkomst till alla lagrade kort

**Snabbåtkomst**
En förenklad listvy av alla lagrade kort.

**Förslagsfält**
En listvy med föreslagna Kort baserat på väderprognos.

**Bildserie**
En vy som endast visar innehållet i Listan.

----

Appen kommer vara orienterad kring en form av att-göra-lista. 
Användaren kommer kunna lägga till och ta bort de lagrade Korten ur en lista. 
Listan kommer presenteras i den andra delen av appen där användaren av den andra delen kan markera ett kort som avklarat.

Som utgångspunkt ska appen innehålla följande funktioner:
Appen ska bestå av två delar som båda loggas in till samma konto.
I den ena delen ska en administrator kunna skapa och lagra kort som kommer innehålla bild och övrig data om ett klädesplagg.
Administratorn ska kunna välja och lägga till kort i en bildserie. Denna del är primärt riktad till en förälder.
Den andra delen kommer endast innehålla en vy av den listan som skapats av administratorn. Denna del är primärt riktat till ett barn.
Korten ska automatiskt kunna föreslås baserat på daglig väderprognos inskrivna parametrar.

----

**Del ett av appen**

Den första delen av appen är en administrativ del där alla kort och bildserien hanteras.

Användaren ska kunna skapa ett kort som kommer lagras i Google tjänst Firebase(Cloud Firestore och Storage).

Kortets struktur:


**Bild** - Bilden kommer kunna väljas genom att ta bild med kamera eller ladda upp från lokala filer på en smartphone, 
ladda upp via webläsare på en dator eller ur ett basutbud som levereras med appen.

**Namn** - Namn på klädesplagget, exempelvis Röda jackan, Gula stövlarna. Kommer fyllas i i fritext.

**Typ** - Väljs från en lista med förutbestämda alternativ:
 - Mellanlager (exempelvis fleecekläder)
 - Jacka
 - Huvudbonad
 - Vantar
 - Skor
 - Byxor
 - Kofta
 - Skalbyxor
 - Overall
 - Halsduk
 
**Högsta temperatur** - Klädesplaggets högsta temperaturtolerans.

**Lägsta temperatur** - Klädesplaggets lägsta temperaturtolerans.

**Väderförhållande** - Vilket väderförhållande som klädesplagget är lämpat för. Förutbestämda alternativ:
 - Moln
 - Sol
 - Snö
 - Regn
 - Vind

Korten kommer finnas tillgängliga dels i garderoben där användaren kan se, ändra, och ta bort sina lagrade kort, dels i snabbåtkomst där användaren kan lägga till korten i listan samt i förslagsfältet där föreslagna kort kommer vara tillgängliga om funktionen är aktiverad.

**Listan** är en form av att-göra-lista som användaren kan fylla med kort, dessa kommer gå att ta bort och/eller markera som avklarad. De kort som finns i listan kommer även vara tillgängliga i den andra delen av appen. De avklarade kort som finns i listan ska representera vilka klädesplagg som barnet har tagit på sig. 


**Valfria funktioner:**

Listan rensas vid midnatt varje natt så användaren inte behöver rensa den manuellt.

Ett alternativ för att listan automatiskt fylls med kort från förslagsfältet kommer finnas.

**Snabbåtkomst** är en del där alla kort som lagrats kommer finnas tillgänglig men med begränsad information för att en en enkel översikt och åtkomst. Det är även härifrån som användaren kommer kunna lägga till korten i listan. 

**Förslagsfältet** kommer innehålla de föreslagna korten som genereras baserat på en väderprognos som hämtas när appen startas. Korten kommer att jämföras med den data som hämtats och rankas efter hur lämpliga de är.
Utvalda parametrar från datan hämtad från apin.

*Vilken temperatur det känns som* - Kommer att jämföras med kortets valda temperaturtolerans.

*Väderförhållande* - Kommer att jämföras med kortets valda lämpade väderförhållande.

*Vindhastighet* - Kommer att jämföras med kortets valda lämpade väderförhållande.

*De senaste fyra dagars nederbörd och temperatur* - Kombinationen av dessa kommer analyseras för att avgöra om det sannolikt är vått ute.

**Garderoben** kommer vara en sektion där användaren har möjlighet att se, ändra och ta bort sina lagrade kort. 


**Del två av appen**

Denna delen är primärt riktad till barn. Den kommer endast innehålla bildserien. Från den här delen kan användaren endast markera/avmarkera kort som avklarade. 

