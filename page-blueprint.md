# Seiten-Blueprint — WG Nürnberg

Exakte Struktur jeder Seite. Claude Code folgt diesem Blueprint.

---

## Hauptseite (index.html)

### Sektion 1: Header (fixed)
- Logo links (grey SVG)
- Nav: Über uns, Lage, Freie Zimmer, Vorteile, FAQ
- CTA-Button: "Anfragen"
- Dark Mode Toggle: ☀️/🌙
- Mobil: Hamburger

### Sektion 2: Hero
- Fullscreen-Höhe (100vh)
- Hintergrundbild: Stock Photo (fröhliche junge Leute, Unsplash)
- Overlay: semi-transparenter Gradient
- Badge: "Seit 2002 in der Lorenzer Altstadt"
- H1: "Miete dein WG-Zimmer bei WG Nürnberg"
- Subtitle: Kurze Beschreibung (1-2 Sätze)
- 2 Buttons: "Jetzt anfragen" (Primary) + "WhatsApp" (WhatsApp-grün)
- Kein Parallax (zu fehleranfällig)

### Sektion 3: Über uns
- Section Header: Eyebrow → H2 → Description
- 2-Spalten: Text links, Bild rechts (echtes WG-Foto)
- Text: Wer wir sind, seit wann, was uns ausmacht
- 4 Stat-Counter: 20+ Jahre, 120+ Bewohner, 20+ Nationalitäten, 17 WGs

### Sektion 4: Lage
- Section Header
- 2-Spalten: Karte (SVG) links, Entfernungen rechts
- Entfernungen in Kategorien: Zu Fuß, Fahrrad, Bahn
- Adresse mit Pin-Icon

### Sektion 5: Freie Zimmer ⭐
- Section Header: "Aktuelle Verfügbarkeit"
- Karten-Grid (gleicher Karten-Stil wie überall)
- Jede Karte: Kategorie-Badge (farbig), Titel, Größe, Preis, Verfügbar ab, "Anfragen"-Button
- 4 Beispiel-Zimmer (Platzhalter-Daten, Mix aus Kategorien)
- Footer: "🔄 Aktualisiert täglich um 08:00 Uhr"
- Hinweis: Zuordnung ist flexibel

### Sektion 6: Vorteile
- Section Header
- 6 Karten-Grid (gleicher Karten-Stil)
- Jede Karte: Emoji-Icon, H4 Titel, kurze Beschreibung
- Keine Provision, Eigener Mietvertrag, Echte Flatrate, Internationale Community, Team vor Ort, Beste Lage

### Sektion 7: So geht's (3 Schritte)
- Section Header
- 3 Karten horizontal: Anfragen → Vertrag unterschreiben → Einziehen
- Schritt 2 betont: "Keine Besichtigung nötig"
- Verbindungslinien oder Nummern zwischen den Schritten

### Sektion 8: Keine Besichtigung nötig
- Section Header: "Einfach anmelden und einziehen"
- Hauptaussage: Besichtigung ist NICHT nötig, das ist der Normalfall
- 3 Alternativen als kleine Karten: 360° Tour, Fotos & Grundrisse, Video-Call
- CTA: "Du brauchst keine Besichtigung – melde dich einfach an!"

### Sektion 9: 360° Touren
- Section Header: "Virtuelle Tour"
- 4 Tour-Karten (gleicher Karten-Stil): Grasstraße 11 Altbau, 11 Modern, 15, 21
- Links: Platzhalter (#tour-NAME)

### Sektion 10: Bewertungen
- Section Header
- 3 Testimonial-Karten (gleicher Karten-Stil)
- Sterne, Zitat, Autor mit Avatar-Initial

### Sektion 11: Galerie
- Section Header
- Filter-Buttons: Alle, Grasstraße, Klarastraße, Sternstraße, Zimmer
- Responsive Grid mit echten WG-Fotos
- Lightbox bei Klick (Prev/Next, Keyboard, Touch-Swipe)

### Sektion 12: WG-Typen
- Section Header: "Für jeden das Richtige"
- 4 Karten: Studenten, Mediziner, Inklusive, Senioren
- Jede Karte: Emoji, Titel, kurze Beschreibung, Link zur Unterseite
- Kategorie-Badges in den jeweiligen Farben

### Sektion 13: Kontakt
- Section Header
- 2-Spalten: Kontakt-Infos links, Formular rechts
- Formular: Name, E-Mail, Telefon (optional), Einzugsdatum, Mietdauer (Select), Nachricht, Submit
- Kontakt-Kanäle: WhatsApp, Telefon, E-Mail

### Sektion 14: FAQ
- Section Header
- Accordion (18-19 Fragen)
- ERSTE Frage: "Muss ich besichtigen?" → "Nein!"

### Sektion 15: Footer
- 4-Spalten: Brand/Social, Navigation, WG-Typen, Kontakt
- Copyright, Impressum, Datenschutz

---

## Unterseiten (studenten-wg.html, mediziner-wg.html, inklusive-wg.html, senioren-wg.html)

Alle Unterseiten folgen dem gleichen Template:

### Header
- Gleich wie Hauptseite (Nav zurück zur Startseite)

### Hero (kleiner als Hauptseite)
- Emoji + H1 + Description
- Background: Surface-Farbe (kein Bild)

### Inhalt
- H2: Spezifischer Titel
- Fließtext: Was macht diese WG-Art aus?
- Feature-Liste: 6 Punkte mit Emoji-Icon + H4 + Text
- (Bei Studenten: Entfernungen zu Hochschulen)

### Freie Zimmer (für diese Kategorie)
- Gleicher Karten-Stil wie Hauptseite
- Nur Zimmer dieser Kategorie
- "Aktualisiert täglich um 08:00 Uhr"

### CTA
- "Du brauchst keine Besichtigung – melde dich einfach an!"
- 2 Buttons: Anmelden + WhatsApp/Telefon

### Footer
- Gleich wie Hauptseite

---

## Konsistenz-Checkliste

Vor Abgabe prüfen:
- [ ] Alle Sektionen haben den gleichen Section-Header-Stil
- [ ] Alle Karten nutzen den EINEN Karten-Stil aus dem Design System
- [ ] Sektions-Abstände sind ÜBERALL gleich
- [ ] Typografie-Skala wird strikt eingehalten
- [ ] Abwechselnde Backgrounds (weiß/surface) sind durchgängig
- [ ] Dark Mode: Alle Sektionen sauber
- [ ] Mobile: Alle Sektionen stacken korrekt
- [ ] Kein Abschnitt "fühlt sich anders an" als der Rest
