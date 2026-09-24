# Laserownia — strona wizytówkowa

Statyczna strona (HTML + CSS + JS, bez backendu, bez frameworków). Można ją
otworzyć od razu w przeglądarce albo wrzucić na dowolny hosting stron
statycznych (np. GitHub Pages, Netlify, Cloudflare Pages, zwykły hosting
współdzielony).

## Pliki

- `index.html` — treść i struktura strony
- `styles.css` — wygląd, kolory, tryb ciemny, animacje
- `script.js` — przełącznik trybu ciemnego, menu mobilne, filtrowanie
  portfolio, lightbox ze zdjęciami, animacje przy scrollu

## Co koniecznie podmienić przed publikacją

Wszystkie poniższe dane są przykładowe — wyszukaj je w `index.html`
(Ctrl+F) i zamień na swoje:

1. **Link do Allegro** — w pliku pojawia się kilka razy jako
   `https://allegro.pl/uzytkownik/TwojaNazwaSprzedawcy`. Podmień na adres
   swojego konta/sklepu na Allegro.
2. **Dane kontaktowe** — w sekcji „Kontakt”:
   - e-mail: `kontakt@laserownia.pl`
   - telefon: `+48 123 456 789` (podmień też w `tel:+48123456789`)
   - lokalizacja: `Twoje Miasto, Polska`
3. **Social media** — linki `Instagram ↗` i `Facebook ↗` mają obecnie
   `href="#"` — podmień na prawdziwe adresy profili.
4. **Nazwa firmy** — obecnie „LASEROWNIA” (w nagłówku i stopce). Możesz
   zmienić na własną nazwę.

## Jak podmienić zdjęcia portfolio na własne

Sekcja „Portfolio” zawiera 6 kart. Zamiast rysunków SVG (przykładowych
wizualizacji) możesz wstawić prawdziwe zdjęcia swoich realizacji.

W `index.html` każda karta wygląda tak:

```html
<button class="portfolio-card reveal" data-category="tabliczki" type="button" aria-label="Powiększ: Tabliczka z nazwiskiem">
  <span class="portfolio-media">
    <svg viewBox="0 0 240 180">...</svg>
  </span>
  <span class="portfolio-caption">
    <span class="portfolio-title">Tabliczka z nazwiskiem</span>
    <span class="portfolio-tag">Tabliczki</span>
  </span>
</button>
```

Aby wstawić zdjęcie, zamień zawartość `<span class="portfolio-media">` na:

```html
<span class="portfolio-media">
  <img src="zdjecia/tabliczka-1.jpg" alt="Tabliczka z wygrawerowanym nazwiskiem">
</span>
```

Utwórz folder `zdjecia/` obok `index.html` i wrzuć tam swoje pliki. Zdjęcia
w proporcji zbliżonej do kwadratu lub 4:3 będą wyglądać najlepiej w siatce.
Jeśli chcesz dodać więcej niż 6 realizacji, skopiuj cały blok `<button
class="portfolio-card">...</button>` i wklej go jako kolejny element w
`<div id="portfolioGrid">`.

Atrybut `data-category` decyduje, w którym filtrze (Tabliczki / Ozdoby /
Prezenty / Wzory geometryczne) dany element się pojawia — możesz wpisać
jedną lub kilka wartości oddzielonych spacją, np.
`data-category="ozdoby wzory"`.

## Tryb ciemny

Strona sama dobiera motyw na starcie na podstawie ustawień systemowych
odwiedzającego, a przełącznik (ikona słońca/księżyca w nagłówku) pozwala
zmienić go ręcznie na czas wizyty. Wybór nie jest zapamiętywany między
wizytami. Jeśli chcesz, aby wybór motywu zapamiętywał się przy kolejnych
wejściach na stronę, dodaj w `script.js` zapisywanie wyboru w
`localStorage` (w podglądzie plików w Claude ta funkcja jest zablokowana,
ale zadziała normalnie po wrzuceniu strony na własny hosting).

## Czcionki

Strona korzysta z Google Fonts (Space Grotesk, Inter, JetBrains Mono)
wczytywanych z internetu. Jeśli wolisz, aby strona działała w pełni offline
lub bez zależności od Google, możesz pobrać te czcionki i podpiąć je
lokalnie (`@font-face` w `styles.css`) albo zamienić nazwy w
`styles.css` na czcionki systemowe.

## Zgodność

Strona jest w pełni responsywna (telefon / tablet / komputer), ma widoczny
fokus klawiatury, respektuje ustawienie „ogranicz animacje” systemu
operacyjnego i nie wysyła żadnych danych ani formularzy — cały kontakt
odbywa się przez e-mail, telefon lub Allegro.
