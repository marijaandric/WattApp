#WattApp - CodeSpark Energy

## Potrebni programi
Da bi se aplikacija uspešno pokretala, potrebno je imati sledeće:
- > Angular : 15.2.2
- > Node.js : 18.14.2
- > Package Manager : 9.5.0
- > .NET : 7.0.2
- > MongoDB : 1.36.3
- > Python : 3.0>


## FrontEnd
Potrebno je otvoriti cmd na putanji codespark-energy\wattApp\frontend\wattApp.
Tamo je potrebno instalirati potrebne biblioteke komandom :
- > **npm install**

Nakon toga, potrebno je pokrenuti Angular server :
- > **ng serve --open**

## BackEnd
Potrebno je pokrenuti **codespark-energy\wattApp\backend\backend.sln** i **\codespark-energy\services\DeviceFaker.sln**.

Mozete pokrenuti i aplikacije i putem cli-a na sledeci nacin:
- > Otvorite potrebni direktorijum (codespark-energy\wattApp\backend\backend\ i \codespark-energy\services\DeviceFaker\) u cmd-u
- > Poreknite komandu **dotnet restore**
- > Pokrenite komandu **dotnet build**
- > Pokrenite komandu **dotnet run**


## MongoDB
Potrebno je instalirati MongoDB i prema potrebi MongoDB compass, i pokrenuti MongoDB instancu na standardnom portu (27017) ukoliko nije vec pokrenuta. Na toj instanci treba napraviti Devices bazu i u njoj DevicesData kolekciju. (Za ovo predlazemo MongoDB compass)
Nakon toga, treba otici u direktorijum \codespark-energy\services\DeviceFaker i u njemu pronaci fajl load_mongo.py i pokrenuti ga.

## Portovi
Pri pokretanju aplikacije, proveriti da li su portovi zauzeti i da li su procesi od projekata već pokrenuti.
- > 4200 - Angular
- > 7158 i 7233 -  .NET
- > 27017 - MongoDB


