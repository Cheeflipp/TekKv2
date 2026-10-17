# TekK – Tekst-, Indholds- & Navigationsforbedringer

Denne plan beskriver opstramningen af tekster, tilføjelsen af din elinstallatør-baggrund på forsiden og under kompetencer, opdatering af årstal og småformuleringer samt tydeligere adgang til undersiden for Indlejning – mens forsidens minimalistiske udtryk med tekst og knapper bevares uændret.

## Brugervalg & Bekræftede Beslutninger

> [!IMPORTANT]
> Nedenstående forbedringer tager direkte udgangspunkt i dine svar og fastholder hjemmesidens nuværende visuelle opbygning uden ekstra bokse på forsiden.

- **Forsidetekst & Minimalisme**: Forsiden bevares helt minimalistisk kun med tekst, status-indikator og de tre handlingsknapper. Brødteksten opdateres, så det tydeligt fremgår, at du er **uddannet elinstallatør** og maskinmesterstuderende med solid praktisk erfaring.
- **Kompetencer (El & Fejlfinding)**: Der tilføjes et dedikeret kompetencekort for **El-arbejde & Teknisk Fejlfinding** på Kompetencer-siden, så din baggrund som uddannet elinstallatør også præsenteres direkte i kompetenceoversigten.
- **Navigation til Indlejning-undersiden**: På Ydelser-oversigten og i navigationsmenuen tilføjes direkte adgang til informationssiden for **Indlejning**, så besøgende både kan læse om indlejningsydelsen og gå direkte til bookingkalenderen.
- **Sproglig opstramning & Årstal**: Eksisterende tekster gennemgås nænsomt for skarpe, mundrette formuleringer og konsistens (bl.a. opdatering af copyright-årstal til 2026 i bunden af siden, ensartet tegnsætning i overskrifter som *"Hvad kan jeg?"*, og strammere formuleringer på tværs af undersiderne).

---

## 1. Overblik & Kernekoncept

- **Hvad løsningen leverer**: En rød tråd i præsentationen af din faglige profil på tværs af alle sider. Besøgende ser straks på forsiden og under kompetencer, at du kombinerer en baggrund som **uddannet elinstallatør** med maskinmesterstudiet og praktisk erfaring inden for svejsning, montage, energioptimering og reparation.
- **Målgruppe**: Virksomheder med behov for teknisk indlejning eller energioptimering samt lokale kunder med behov for reparation af hårde hvidevarer og TV.
- **Primær værdi**: Højere troværdighed ved første øjekast, ingen skjulte undersider, og et skarpt, professionelt sprog uden overflødige fyldord.

---

## 2. Brugeroplevelse & Visuelt Design

- **Brugerrejse (User Flows)**:
  1. **Forside**: Brugeren møder et rent, fokuseret hero-område med live-status (*Ledig i dag / I arbejde i dag*), overskrift, opstrammet præsentationstekst (inkl. elinstallatør-baggrund) og tre tydelige knapper.
  2. **Navigation & Ydelser**: Fra topmenuen og Ydelser-siden kan virksomheder nu både læse detaljerne på undersiden *Indlejning af Teknisk Arbejdskraft* (hvad man kan leje dig ind til, fordele og vilkår) og klikke direkte videre til *Bookingkalenderen*.
  3. **Kompetencer**: Kompetenceoversigten præsenterer et komplet billede af dine færdigheder i et symmetrisk kort-grid, nu udvidet med *El-teknik & Fejlfinding*.
- **Visuel Identitet & Tema**:
  - *Æstetisk retning*: Minimalistisk, teknisk og tillidsvækkende håndværksprofil med støtte til både det lyse *Classic*-tema (`#c29b62` gylden/bronze accent på lys bund) og det mørke *Modern*-tema (`orange-500` på `slate-900` bund).
  - *Typografi & Hierarki*: Markante serif/sans-serif overskrifter kombineret med letlæselig brødtekst (`max-w-3xl`) og tydelige, tekniske metadata-etiketter i monospace.
  - *Layout & Komposition*: Forsiden holdes fri for ekstra nøgletalsbokse eller forstyrrende elementer. På Ydelser-kortet for Indlejning gives der plads til både en primær handling (*Gå til Bookingkalender*) og et sekundært link (*Læs mere om indlejning*).

---

## 3. Væsentlige Produktbeslutninger

- **Beslutning 1: Minimalistisk forside med skarpere faglig profil**
  - *Valgt tilgang*: Vi beholder det rene layout på forsiden og indarbejder *"uddannet elinstallatør og maskinmesterstuderende"* direkte i den eksisterende indledningstekst.
  - *Begrundelse*: Sikrer hurtig afkodning af dine vigtigste kvalifikationer uden at bryde det rolige, minimalistiske design, du foretrækker.
- **Beslutning 2: Synliggørelse af Indlejning-undersiden + direkte booking**
  - *Valgt tilgang*: Ydelser-menuen og Ydelser-oversigtskortet for Indlejning kobles sammen med informationssiden for Indlejning, samtidig med at der er direkte genvej til selve Bookingkalenderen.
  - *Begrundelse*: Nogle erhvervskunder vil booke med det samme, mens andre ønsker at læse om dine el-, svejse- og montagekompetencer samt betingelser, før de vælger dato.
- **Beslutning 3: Nænsom tekst- og detaljeopstramning**
  - *Valgt tilgang*: Vi bevarer din nuværende, jordnære og professionelle tone, men retter små ujævnheder (f.eks. manglende spørgsmålstegn i *"Hvad kan jeg?"*, gentagelser i punktlister på Energioptimering, samt opdatering af årstallet i footeren fra 2025 til 2026).
  - *Begrundelse*: Bevarer autenticiteten i dine tekster, men løfter det professionelle helhedsindtryk.

---

## 4. Teknisk Arkitektur & Indholdsstruktur

### Arkitektur- og Navigationsdiagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        Global Navigation & Footer                       │
│  [Hjem]   [Ydelser ▾]   [Kompetencer]   [Om mig]   [Kontakt]   (© 2026) │
└──────┬─────────┬──────────────┬─────────────┬──────────┬────────────────┘
       │         │              │             │          │
       ▼         │              ▼             ▼          ▼
┌──────────────┐ │     ┌───────────────┐ ┌─────────┐ ┌─────────┐
│   Forside    │ │     │  Kompetencer  │ │ Om mig  │ │ Kontakt │
│ Minimalistisk│ │     │  + El-teknik  │ │ Portræt │ │Formular │
│ + Elinstall. │ │     │ & Fejlfinding │ │ & Profil│ │& Direkte│
└──────────────┘ │     └───────────────┘ └─────────┘ └─────────┘
                 │
                 ▼
       ┌──────────────────────────────────────────────────────┐
       │                  Ydelser (Oversigt)                  │
       ├─────────────────┬──────────────────┬─────────────────┤
       ▼                 ▼                  ▼                 ▼
┌──────────────┐  ┌──────────────┐  ┌───────────────┐  ┌──────────────┐
│  Indlejning  │─▶│   Booking    │  │Energioptimer. │  │ Hvidevare &  │
│ (Læs mere)   │  │ (Kalender)   │  │ (SMV/Industri)│  │TV Reparation │
└──────────────┘  └──────────────┘  └───────────────┘  └──────────────┘
```

### Konkrete Indholds- og Komponentændringer

1. **Forside**:
   - Opdatering af brødteksten under hovedoverskriften, så den præcist nævner: *"Som uddannet elinstallatør og maskinmesterstuderende med solid praktisk erfaring fra industri og montage leverer jeg teknisk indlejning, energiberegninger samt professionel fejlfinding og reparation."*
2. **Kompetencer-data & Visning**:
   - Tilføjelse af kompetencekortet **El-teknik og Fejlfinding** med fokus på din autorisationsfaglige baggrund som uddannet elinstallatør, elektrisk fejlfinding, styring og el-teknisk montage.
   - Opstramning af overskriften på Kompetencer-siden til *"Hvad kan jeg?"* og finpudsning af kortbeskrivelserne.
3. **Ydelser & Menu-navigation**:
   - I topmenuens dropdown og mobilmenu tilføjes direkte link til både **Indlejning (Læs om ydelsen)** og **Bookingkalender**, og på Ydelser-oversigtssiden får Indlejning-kortet både link til at læse om indlejning og knap til at åbne bookingkalenderen.
   - På Indlejning-undersiden tilføjes en afsluttende kontaktboks nederst på siden (ligesom på de øvrige ydelsessider), så siden afrundes harmonisk.
4. **Tværgående tekst- og årstalsopstramning**:
   - Footer: Opdatering af `© 2025 TekK` til `© 2026 TekK`.
   - Energioptimering: Fjernelse af dobbeltkonfekt i punktlisten under *Mindre Virksomheder* (hvor ventilation/behovsstyring stod to gange i træk) til fordel for skarpere, adskilte punkter.
   - Om mig, Booking & Kontakt: Mindre sproglige finpudsninger for ensartet tegnsætning og klarhed.
