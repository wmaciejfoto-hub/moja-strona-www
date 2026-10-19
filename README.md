# WMaciejFoto – instrukcja strony

Ta strona to zwykły folder z plikami. Nie potrzebujesz żadnych programów do budowania ani serwera.
Poniżej znajdziesz wszystko krok po kroku, prostym językiem.

## Co jest w folderze

| Plik / folder | Do czego służy |
|---|---|
| `index.html` | Cała strona: teksty, ceny, galeria, formularz |
| `css/style.css` | Wygląd: kolory, czcionka, zaokrąglenia |
| `js/main.js` | Drobne ruchy: menu, powiększanie zdjęć, wysyłka formularza |
| `images/` | Tutaj wrzucasz swoje zdjęcia |
| `favicon.svg` | Mała ikonka w karcie przeglądarki |
| `polityka-prywatnosci.html` | Szablon polityki prywatności do uzupełnienia |

---

## 1. Jak uruchomić stronę na komputerze

1. Rozpakuj folder (jeśli dostałeś go jako ZIP): kliknij plik prawym przyciskiem i wybierz „Wypakuj wszystko”.
2. Otwórz folder i **kliknij dwukrotnie plik `index.html`**. Strona otworzy się w przeglądarce.
3. Do wyświetlenia czcionek potrzebne jest połączenie z internetem. Bez niego strona też działa, tylko z czcionką zastępczą.

**Jak zobaczyć stronę na telefonie:**
- Najprościej: opublikuj stronę (punkt 5) i otwórz jej adres na telefonie.
- Albo wyślij sobie folder i otwórz `index.html` w przeglądarce telefonu.
- Na komputerze możesz też zmniejszyć okno przeglądarki. Strona dopasuje się do wąskiego ekranu, tak jak na telefonie.

**Wygodniejsza edycja (opcjonalnie):** zainstaluj darmowy program VS Code, otwórz w nim folder i zainstaluj dodatek „Live Server”. Wtedy po każdej zmianie strona odświeża się sama.

---

## 2. Jak zmienić teksty, ceny, dane kontaktowe i kolory

**Teksty, ceny, opinie, pytania (FAQ):**
1. Kliknij plik `index.html` prawym przyciskiem i wybierz „Otwórz za pomocą” → Notatnik (albo VS Code).
2. Szukaj komentarzy zaczynających się od `EDYTUJ`. Stoją tuż przed każdym fragmentem, który możesz zmienić.
3. Zmieniaj tylko tekst między znacznikami, np. w `<p class="price">350 zł</p>` zmień samo `350 zł`.
4. Zapisz plik (Ctrl+S) i odśwież stronę w przeglądarce (F5).

**Miejsca do uzupełnienia:** w pliku znajdziesz napisy `[UZUPEŁNIJ: ...]`, np. liczba dni na wysłanie zdjęć. Wpisz tam swoje dane i usuń nawias. Użyj wyszukiwania (Ctrl+F) i wpisz `UZUPEŁNIJ`, żeby znaleźć wszystkie.

**Dane kontaktowe:** adres e-mail i telefon występują w sekcji „Kontakt”, a także w danych dla Google na samej górze pliku. Zmień je w obu miejscach. W adresie telefonu (`tel:+48607584942`) wpisuj numer bez spacji.

**Kolory i czcionka:** otwórz `css/style.css`. Na samej górze jest blok „EDYTUJ: KOLORY, CZCIONKA, ZAOKRĄGLENIA”. Zmień kod koloru (np. `#4C97FF`), zapisz i odśwież stronę.

**Menu u góry:** nazwy linków są w `index.html` w bloku `<nav>`.

---

## 3. Jak wstawić i zoptymalizować zdjęcia

1. Przygotuj zdjęcia: JPG, **hero.jpg** ok. 1600×2000 px (pionowe), **galeria** dłuższy bok ok. 1600 px, jakość ok. 80, do ok. 300 KB jedno zdjęcie. Za duże pliki spowalniają stronę.
2. Zmniejsz je darmowym narzędziem: <https://squoosh.app> (przeciągnij zdjęcie, wybierz format JPG, jakość ok. 80, pobierz).
3. Nazwij pliki **dokładnie tak** i wrzuć do folderu `images/` (zastąp stare, jeśli są):
   - `hero.jpg` (zdjęcie na górze),
   - `portret.jpg` (sekcja „Poznajmy się”),
   - `galeria-01.jpg` … `galeria-12.jpg` (galeria).
4. Odśwież stronę. Zdjęcia pojawią się same, bez zmieniania kodu. Do tego czasu strona pokazuje ładne niebieskie tła zastępcze.
5. **Masz mniej niż 12 zdjęć w galerii?** W `index.html` znajdź sekcję „GALERIA” i usuń całe niepotrzebne bloki od `<li>` do `</li>`.
6. **Opisy zdjęć:** w każdym bloku zmień tekst w `alt="…"` na krótki opis zdjęcia. To ważne dla Google i dla osób korzystających z czytników ekranu.

Kolejność w galerii zmienisz, przestawiając bloki `<li>…</li>` albo zmieniając numery plików.

---

## 4. Jak podłączyć formularz kontaktowy

Strona nie ma własnego serwera, więc wiadomości z formularza wysyła darmowa usługa zewnętrzna. Wystarczy jedna.

### Opcja A: Formspree
1. Wejdź na <https://formspree.io> i załóż darmowe konto.
2. Utwórz nowy formularz („New form”) i podaj swój adres e-mail.
3. Skopiuj adres formularza, wygląda tak: `https://formspree.io/f/abcdwxyz`.
4. W `index.html` znajdź linię `<form class="form" ... action="WKLEJ_TUTAJ_ADRES_FORMULARZA" ...>` i zamień `WKLEJ_TUTAJ_ADRES_FORMULARZA` na skopiowany adres.
5. Zapisz i wyślij próbną wiadomość. Przy pierwszej wiadomości Formspree może poprosić o potwierdzenie adresu e-mail.

### Opcja B: Web3Forms
1. Wejdź na <https://web3forms.com> i wpisz swój e-mail. Dostaniesz klucz („access key”).
2. W `index.html` zamień `action="WKLEJ_TUTAJ_ADRES_FORMULARZA"` na `action="https://api.web3forms.com/submit"`.
3. Odkomentuj linię z `access_key` tuż pod tagiem `<form>` (usuń `<!--` i `-->`) i wpisz swój klucz.

Dopóki formularz nie jest podłączony, wyświetli on prośbę o napisanie bezpośrednio na Twój e-mail. Nic się nie zepsuje.

---

## 5. Jak opublikować stronę za darmo i podpiąć własną domenę

### Krok 1: opublikuj stronę
Wybierz jedną z darmowych opcji (zasady planów mogą się zmieniać, sprawdź na stronie usługi):

- **Netlify Drop:** wejdź na <https://app.netlify.com/drop> i **przeciągnij cały folder** ze stroną na okno. Dostaniesz adres typu `nazwa.netlify.app`.
- **Cloudflare Pages:** <https://pages.cloudflare.com> → „Create a project” → „Direct Upload” → wgraj folder.
- **GitHub Pages:** załóż repozytorium na <https://github.com>, wgraj pliki, w ustawieniach „Pages” włącz publikację z gałęzi `main`.

### Krok 2: kup domenę
Kup adres (np. `wmaciejfoto.pl`) u dowolnego dostawcy, np. home.pl, cyberFolks, OVH lub Namecheap. Koszt to zwykle kilkadziesiąt złotych rocznie.

### Krok 3: podepnij domenę
1. W panelu hostingu (Netlify / Cloudflare / GitHub) znajdź „Domains” lub „Custom domain” i wpisz swoją domenę.
2. Hosting pokaże Ci dokładne **rekordy DNS** do wpisania (zwykle rekord **A** dla domeny głównej oraz rekord **CNAME** dla `www`).
3. Zaloguj się do panelu swojej domeny, otwórz „Zarządzanie DNS” i wpisz dokładnie te wartości.
4. Poczekaj od kilku minut do kilku godzin. Kłódka **HTTPS** włączy się automatycznie.

Jeśli utkniesz, pomoże Ci pomoc techniczna dostawcy domeny. Wystarczy napisać: „Chcę skierować domenę na hosting Netlify/Cloudflare/GitHub” i podać wartości z panelu hostingu.

### Krok 4: po publikacji
W `index.html` zamień wszystkie `TWOJA-DOMENA.pl` na swój prawdziwy adres (jest w kilku miejscach: `canonical`, `og:url`, `og:image` i dane dla Google). Dzięki temu Google i media społecznościowe poprawnie pokażą stronę.

---

## 6. Lista kontrolna przed publikacją

- [ ] Wyszukaj w `index.html` i `polityka-prywatnosci.html` napis `UZUPEŁNIJ` i uzupełnij wszystkie miejsca.
- [ ] Wstaw swoje zdjęcia (`hero.jpg`, `portret.jpg`, `galeria-01…12.jpg`) i zmień opisy `alt`.
- [ ] Usuń z galerii bloki bez zdjęć.
- [ ] Sprawdź cenę, adres e-mail, telefon i linki do social mediów.
- [ ] Podłącz formularz i wyślij próbną wiadomość.
- [ ] Uzupełnij politykę prywatności (najlepiej z pomocą specjalisty od RODO).
- [ ] Zamień `TWOJA-DOMENA.pl` na prawdziwy adres.
- [ ] Obejrzyj stronę na telefonie i na komputerze, kliknij każdy link i przycisk.

---

## Najczęstsze problemy

- **Zdjęcie się nie pokazuje:** sprawdź nazwę pliku (małe litery, bez polskich znaków, rozszerzenie `.jpg`) i czy plik leży w folderze `images/`.
- **Zmiana nie jest widoczna:** zapisz plik (Ctrl+S) i odśwież stronę z wyczyszczeniem pamięci (Ctrl+F5).
- **Formularz nic nie wysyła:** upewnij się, że w `action="…"` wkleiłeś prawdziwy adres, a nie `WKLEJ_TUTAJ…`.
- **Strona wygląda inaczej niż u mnie:** wyczyść pamięć przeglądarki albo otwórz stronę w trybie prywatnym.
