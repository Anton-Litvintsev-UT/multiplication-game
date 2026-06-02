Variant 1. React
Luua veebirakendus vastavalt etteantud kirjeldusele, kasutades Reacti. Rakenduse kõik kasutajaliidese elemendid peavad olema realiseeritud Reacti komponentidena.
Töö peab sisaldama järgmisi Reacti võimalusi ja töövõtteid:
1. Komponendid
Rakendus peab olema jagatud mitmeks funktsionaalseks komponendiks. Järgmised vaated või loogilised osad peavad olema eraldi komponentidena:
    • esileht
    • sätete leht
    • tulemuste leht
    • mänguleht
    • mängusessiooni vaade
    • nime sisestuse / tulemuse salvestamise vaade
Vastusevariantide kuvamiseks peab olema kasutatud eraldi komponenti või komponentide süsteemi.
2. Props
Andmete edastamiseks komponentide vahel peab kasutama props-e. Vähemalt ühele alamkomponendile tuleb propside kaudu edastada:
    • andmeid
    • sündmuse töötlejaid
3. State ja Hookid
Rakenduses peab olema kasutatud Reacti state. Kohustuslik on kasutada vähemalt kahte hook’i:
    • useState
    • useEffect
Hooki useEffect abil tuleb lahendada vähemalt üks järgmistest:
    • taimeri töö
    • nime lugemine lokaalsest mälust
    • tulemuste laadimine andmebaasist
    • mänguoleku muutumine ajas
4. Tingimuslik renderdamine
Rakenduses peab olema kasutatud tingimuslikku renderdamist. Näiteks peab tingimuslikult muutuma:
    • mängu alguse ja käimasoleva mängu vaade
    • vastusevariantide aktiivsus
    • nime sisestuse välja asendumine nupuga „Tulemused“
5. Loendite renderdamine
    • Tulemuste kuvamisel tuleb kasutada loendi renderdamist.
    • Kuvatud tulemused peavad olema järjestatud punktisumma järgi kahanevalt.
    • Loendite puhul tuleb kasutada korrektseid key atribuute.
6. Sündmuste käsitlemine
Reacti sündmuste abil peab olema realiseeritud vähemalt:
    • menüüvalikute kasutamine
    • sätete muutmine
    • mängu käivitamine ja lõpetamine
    • vastusevariandil klõpsamine
    • tulemuse salvestamine
    • navigeerimine vaadete vahel
7. Vormielemendid
    • Nime sisestus peab olema lahendatud Reactile omase vormihaldusena.
    • Soovitatav on kasutada kontrollitud komponenti (controlled component).
8. Rakenduse loogika
    • Rakenduse töö ei tohi põhineda otsesel DOM-manipulatsioonil (document.getElementById, querySelector jne), vaid Reacti andmevoogudel.
    • Mängu olek, punktid, õigete vastuste arv, ajaloendur ja valikute olek peavad olema hallatud Reacti kaudu.
9. Andmete salvestamine
    • Tulemused peavad olema salvestatud andmebaasi.
    • Kasutaja nimi peab olema salvestatud lokaalsesse mällu (näiteks localStorage kaudu).
10. Navigeerimine
Vaadete vahel liikumine peab olema lahendatud Reactile sobival viisil. Lubatud on kasutada kas:
    • React Routerit
    • või tingimuslikku vaadete renderdamist rakenduse state’i abil