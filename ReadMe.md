#WattApp - CodeSpark Energy
- > http://softeng.pmf.kg.ac.rs:10011/

## O nama
CodeSpark Energy je tim stručnjaka koji se bavi razvojem inovativne aplikacije čiji je svrha praćenje potrošnje, proizvodnje i skladištenje električne energije. Ova aplikacija je namijenjena različitim vrstama korisnika: DSO korisnicima i prosumerima.

DSO korisnici koriste aplikaciju kako bi imali uvid u stanje elektroenergetskog sistema u realnom vremenu. Mogu pratiti potrošnju i proizvodnju električne energije, skladištenje, upravljati distribucijskom mrežom i slično. Aplikacija pruža korisnicima alate za praćenje i analizu podataka i upozorava ih na potencijalne probleme u elektroenergetskom sistemu.

Prosumeri su korisnici koji troše električnu energiju, ali mogu i da je proiyvode iz obnovljivih izvora i skladište je u baterijama. Oni koriste aplikaciju kako bi pratili svoju proizvodnju i potrošnju i na taj način znali kako i kada će upotrebiti svoju uskladištenu energiju. Aplikacija pruža prosumerima uvid u stanje njihovih baterija i omogućava im da optimiyuju svoju proizvodnju i potrošnju električne energije. Pored toga oni su u mogućnosti da upravljaju svojim uređajima čak i kada se nalaze izvan svojih domova, što im pruža sigurnost i kontrolu nad svojom kućom.

Ukratko, aplikacija koju razvija naš tim omogućava DSO korisnicima i prosumerima da bolje upravljaju elektroenergetskim sistemom, praćenjem i analizom podataka o proizvodnji i potrošnji električne energije. Oba tipa korisnika dobijaju alate za optimizaciju svoje potrošnje i proizvodnje električne energije, što im omogućava da smanje troškove i budu ekološki svesniji.

## Potrebni programi
Da bi se aplikacija uspešno pokretala, potrebno je imati sledeće:
- > Angular : 15.2.2
- > Node.js : 18.14.2
- > Package Manager : 9.5.0
- > .NET : 7.0.2
- > MongoDB : 1.36.3
- > Python : 3.0>

## Lokalno pokretanje aplikacije
Potrebno je klonirati aplikaciju na svojoj lokalnoj mašini.

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
Nakon toga, treba otići u direktorijum \codespark-energy\services\DeviceFaker i u njemu pronaci fajl load_mongo.py i pokrenuti ga.

## Portovi
Pri pokretanju aplikacije, proveriti da li su portovi zauzeti i da li su procesi od projekata već pokrenuti.
- > 4200 - Angular
- > 7158 i 7233 -  .NET
- > 27017 - MongoDB


## Pokretanje aplikacije na Web serveru
Potrebno je instalirati RemoteSSH ekstenziju za lakšu konfiguraciju aplikacije,a nakon toga je potrebno povezati se na ssh remote server.

## Pokretanje MongoDB
- > Kreirati folder na remote koji če se zvati "mongo"
- > Za pokretanje MongoDB na serveru, pokrenuti naredbu mongod --dbpath put/do/mongo/foldera --port MONGO_PORT --bind_all

## Pokretanje .NET projekta
- > Potrebno je postaviti vezu sa MongoDB u "appsettings.json" u .NET projektu koji se nalazio na putanji **\codespark-energy\services\DeviceFaker.sln**.
- > Konekcioni string: "mongodb://website-adresa:MONGO_PORT/".
- > Komande "dotnet build" i "dotnet publish" je potrebno pokrenuti na računaru.
- > Na remote, kreirati dva foldera, jedan za "backend", drugi za "DeviceFaker".
- > Postaviti portove naredbom "export ASPNETCORE_URLS="http:///website-adresa:API_PORT".
- > Pokrenuti oba .NET projekta naredbom "nohup dotnet API.dll &".


## Pokretanje Angular aplikacije
- > Postavite vezu s API serverom u fajlu "app.module.ts" u Angular projektu (url: "http:///website-adresa:API_PORT").
- > Potrebno je pokrenuti komandu "ng build".
- > Potrebno je preuzeti "https://cdn.discordapp.com/attachments/1100106229482786848/1100110066000081007/server.rar".
- > Extractovati "server.rar" folder.
- > U extractovani folder potrebno je ubaciti folder "dist" koji je nastao posle pokretanja komande "ng build".
- > Na remote-u kreirati folder "front" i u njega smestiti prethodno pomenut folder sa folderom "dist" u njemu.
- > Na putanji na kojoj se nalazi folder "front", izvršiti komandu "nohup node index.js &".

## Trenutni nalozi
- > Nalog za DSO korisnika: marijaandric2001@gmail.com
- > Nalog za prosumera: ejes.school@gmail.com
Šifra za oba naloga je Proba@123

## Autori
Aleksa Stojanović
Boris Dugić
Denis Dragoljubović
Vanja Mijatović
Marija Andrić