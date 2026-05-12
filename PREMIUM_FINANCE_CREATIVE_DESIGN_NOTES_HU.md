# Premium finance × creative design patch · v8

Ez a verzió a teljes oldalt egységesebb, elegánsabb üzleti–pénzügyi és kreatív irányba finomítja.

## Fő módosítások

- Nagyobb logó desktopon és mobilon.
- Desktopon a főmenü középre rendezett, kapszulaszerű, visszafogott prémium megjelenéssel.
- A teljes oldal szellősebb spacinget kapott.
- A kártyák, blokkok, CTA-k és tartalmi panelek finomabb shadow-t, border-t és luxusabb radius-rendszert kaptak.
- A képek kitöltik a saját vizuális boxukat.
- Hover esetén a kép finoman zoomol, de a lekerekítés megmarad: `overflow: hidden`, `isolation: isolate`, `clip-path` és örökölt border-radius védi a sarkokat.
- A háttér kapott egy nagyon finom pénzügyi rács/háló textúrát, amely modern, de nem AI-s vagy túldizájnolt.
- Mobilon a képmagasság és logóméret kontrollált marad.

## Ellenőrizendő élesítés után

- Header: logo / nyelvváltó / hamburger mobilon nem csúszik-e össze.
- Desktop menü: középen, egy sorban jelenjen meg.
- Képek hover-zoomja: a sarkok maradjanak lekerekítve.
- Főoldal és bemutatkozó oldalak: a képek töltsék ki a boxot.
- Jogi oldalak: a finomabb kártya- és spacing-rendszer ne nyomja túl a szöveget.


## v9 – Mélykék blokkok és szélesebb gombok

- A képek melletti szövegblokkok most már a footer hangulatával összhangban álló mély kék hátteret kaptak.
- Ez különösen érvényes:
  - a hero szövegpanelre,
  - a főoldali második portré melletti szövegrészre,
  - a bemutatkozás oldali intro blokkra.
- Az oldal más blokkjaiban is szelektíven megjelenik a mélykék panelstílus, így a teljes vizuális ritmus változatosabb, de nem túlzsúfolt.
- A fő gombok szélesebbek és levegősebbek lettek, hogy a szöveg ne érjen túl közel a gomb széléhez.
- Mobilon a gombok teljes szélességet kapnak ott, ahol ez vizuálisan stabilabb.


## v10 – Private banking / luxury consulting + arany vonalrendszer

- Erősebb, de továbbra is visszafogott private banking / luxury consulting hangulat került az oldalra.
- A fő szövegblokkok, kártyák és vizuális panelek finom arany belső vonalrendszert kaptak.
- A hover állapotok elegánsabbak lettek: több mélység, kevesebb harsányság.
- A képek arany szegélyt és belső finom vonalat kaptak, miközben a lekerekítés hover-zoom közben is megmarad.
- A gombok szélesebbek, levegősebbek és private banking jellegűbbek lettek.
- Mobilon az arany vonalak visszafogottabbak, hogy ne legyen zsúfolt a megjelenés.


## v12 – Képarány, header-viselkedés, több kék blokk

- A főoldali második portré (`portrait_2.webp`) arányát visszaállítottam: nem nyúlik a szövegbox magasságához, hanem természetes portréarányban jelenik meg.
- A header lefelé görgetéskor finoman eltűnik, visszagörgetéskor előjön.
- Több tartalmi blokk kapott mélykék, private-banking hangulatú hátteret, hogy az oldal változatosabb és prémiumabb legyen.
