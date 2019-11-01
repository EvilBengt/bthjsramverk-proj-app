> Frontend för slutprojekt i kursen "JavaScript-baserade webbramverk" (jsramverk) på Blekinge Tekniska Högskola (BTH)

---------------

Krav 2: Frontend
================

Jag har genom kursen använt mig av ramverket React för frontend-utveckling
och jag valde att fortsätta med det även i projektet. Jag tycker det har
gått väldigt bra och jag börjar gilla Reacts idéer med immutable state och
sådant. Det gör att det blir väldigt tydligt när sidan behöver och kommer
uppdateras eller ej.

Jag har delat upp applikationen i tre huvuddelar; "Hem", "Fonder" och
"Mina sidor". Hem-sidan är bara en enkel presentation. Fonder presenterar
en enkel lista på alla fonder som finns i systemet där varje rubrik är en
länk till en detalj-sida med realtids-data för just den fonden. Här använder
jag "react-rt-chart" som är en wrapper för "c3.js" för att i realtid rita ut
fondens kurs i ett diagram. Om man är inloggad finns här även en knapp för
att investera i den valda fonden.

Mina sidor är kanske den mest omfattande sidan. Här presenteras nuvarande
saldo och en lista på alla fonder man äger andelar i. För varje fond visas
nuvarande värde, antalet ägda andelar samt det uträknade värdet av alla
ägda andelar för den fonden. Allt på "mina sidor" som har med fonder att
göra uppdateras i realtid med socket.io.

Innan man är inloggad byts länken till "Mina sidor" ut till en länk till
inloggningssidan. Där finns ett formulär för att logga in och även en
länk till sidan för att skapa nytt konto.

För att berörda delar av appen ska veta om användaren är inloggad eller ej,
har jag byggt en enkel modell för inloggningsfunktionen. Där finns
ett API för att prenumerera (typ events) och på så sätt "få reda på" om
användaren är inloggad eller ej.

Vissa requests till servern är också utbrutna till egna moduler då de kanske
används på flera ställen eller helt enkel är mer avancerade än vanliga
"GET"-requests. Annars körs många requests i de komponenterna som
använder datan.

För att underlätta responsiv styling och eventuellt snabba upp
mobil-versionen något arbetade jag enligt mobile-first. Hela sidan är
alltså gjord primärt som en mobilsida, men med media-queries för att
flytta runt och bättre anpassa layouten för större skärmar.


Krav 3: Realtid
===============

Även här har jag en modell för realtids-tjänsten för att kunna samla den
datan centralt då flera sidor använder den. Även här finns möjlighet för
sidor att prenumerera på ändringar i datan.

De sidor som använder sig av realtids-datan är "Fonder" och "Mina sidor".
Endast en av dessa sidor kommer såklart visas åt gången så för att
underlätta mekanismen för att avsluta prenumerationer finns det endast
plats för en prenumeration åt gången. Det räcker därför med att sidan
kör `funds.unsubscribe()` för att tas bort så modellen inte försöker
uppdatera sidans state när den inte visas.
