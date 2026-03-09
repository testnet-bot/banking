export const user = {
  name: 'Thomas Müller',
  initials: 'TM',
  kundennummer: '123456',
  since: '2011',
  dob: '12.05.1985',
  address: 'Maximilianstr. 42, 80539 München',
  phone: '+49 176 •••••••789',
  email: 't.mueller@email.de',
  steuerid: '14 xxx xx xxx',
}

export const accounts = [
  {
    id: 'giro',
    type: 'Girokonto',
    name: 'SpardaGiro Klassik',
    iban: 'DE89 7009 0500 0012 3456 78',
    balance: '2.847,93 €',
    balanceLabel: 'Verfügbares Guthaben',
    colorClass: 'card-giro',
  },
  {
    id: 'spar',
    type: 'Sparkonto',
    name: 'SpardaSpar Flex',
    iban: 'DE89 7009 0500 0012 3456 90',
    balance: '15.240,00 €',
    balanceLabel: 'Guthaben (2,5 % p.a.)',
    colorClass: 'card-spar',
  },
  {
    id: 'depot',
    type: 'Depot · UnionInvest',
    name: 'UnionDepot',
    iban: 'Depot-Nr: 4821 0076 00',
    balance: '38.412,75 €',
    balanceLabel: 'Depotwert ▲ +4,8 % YTD',
    colorClass: 'card-depot',
  },
]

export const transactions = [
  { id: 1, icon: '💰', type: 'income',   name: 'Gehaltseingang Siemens AG',       detail: 'Gehalt März 2026 · SEPA-Überweisung',      amount: '+3.200,00 €', date: '07.03.2026', month: 'März 2026' },
  { id: 2, icon: '🛒', type: 'expense',  name: 'REWE Kaufpark München',           detail: 'Kartenzahlung · Girocard · Terminal 4812',  amount: '-94,38 €',    date: '06.03.2026', month: 'März 2026' },
  { id: 3, icon: '☕', type: 'expense',  name: 'Starbucks Coffee München Hbf',    detail: 'Kartenzahlung · Girocard',                 amount: '-7,90 €',     date: '05.03.2026', month: 'März 2026' },
  { id: 4, icon: '🏠', type: 'expense',  name: 'Hausverwaltung GmbH · Miete',     detail: 'Dauerauftrag · IBAN: DE12 7009 0500 9988…', amount: '-950,00 €',   date: '01.03.2026', month: 'März 2026' },
  { id: 5, icon: '🔁', type: 'transfer', name: 'Eigene Umbuchung · SpardaSpar',   detail: 'Sparkonto Aufstockung',                    amount: '-500,00 €',   date: '01.03.2026', month: 'März 2026' },
  { id: 6, icon: '⚡', type: 'expense',  name: 'E.ON Energie Deutschland',        detail: 'Lastschrift · Kd-Nr. 4728812',             amount: '-87,00 €',    date: '28.02.2026', month: 'Februar 2026' },
  { id: 7, icon: '💸', type: 'income',   name: 'Zinsgutschrift SpardaSpar Flex',  detail: 'Monatliche Zinsen · 2,5 % p.a.',           amount: '+31,75 €',    date: '28.02.2026', month: 'Februar 2026' },
  { id: 8, icon: '🎬', type: 'expense',  name: 'Netflix International BV',        detail: 'Lastschrift · Abo Standard',               amount: '-17,99 €',    date: '27.02.2026', month: 'Februar 2026' },
  { id: 9, icon: '🚗', type: 'expense',  name: 'Aral Tankstelle München West',    detail: 'Kartenzahlung · Mastercard Gold',          amount: '-68,50 €',    date: '25.02.2026', month: 'Februar 2026' },
  { id:10, icon: '💰', type: 'income',   name: 'Gehaltseingang Siemens AG',       detail: 'Gehalt Februar 2026 · SEPA-Überweisung',   amount: '+3.200,00 €', date: '07.02.2026', month: 'Februar 2026' },
  { id:11, icon: '🏠', type: 'expense',  name: 'Hausverwaltung GmbH · Miete',     detail: 'Dauerauftrag',                             amount: '-950,00 €',   date: '01.02.2026', month: 'Februar 2026' },
  { id:12, icon: '📱', type: 'expense',  name: 'Telekom Deutschland GmbH',        detail: 'Lastschrift · MagentaMobil',               amount: '-39,95 €',    date: '01.02.2026', month: 'Februar 2026' },
]

export const dauerauftraege = [
  { id: 1, icon: '🏠', bg: '#fff0f0', name: 'Hausverwaltung München GmbH',   iban: 'DE12 7009 0500 9988 7766 55', schedule: 'Monatlich am 1. · Nächste: 01.04.2026 · Miete April', amount: '−950,00 €' },
  { id: 2, icon: '📱', bg: '#f0f4ff', name: 'Telekom Deutschland GmbH',      iban: 'DE84 1001 0010 0556 7788 00', schedule: 'Monatlich am 1. · Nächste: 01.04.2026 · Kd.-Nr. 4728812', amount: '−39,95 €' },
  { id: 3, icon: '💰', bg: '#f0fff4', name: 'SpardaSpar Flex · Sparplan',    iban: 'DE89 7009 0500 0012 3456 90 (eigenes Konto)', schedule: 'Monatlich am 15. · Nächste: 15.03.2026 · Sparrate', amount: '−500,00 €' },
  { id: 4, icon: '💡', bg: '#fffbf0', name: 'E.ON Energie Deutschland',      iban: 'DE56 2004 1133 0236 4543 00', schedule: 'Monatlich am 28. · Nächste: 28.03.2026 · Strom und Gas', amount: '−87,00 €' },
]

export const funds = [
  { icon: '🌍', name: 'UniGlobal net',       isin: 'DE0008491051', shares: '12,500 Anteile · Sparplan 100 €/Monat', value: '21.480,00 €', perf: '+5,82 %', up: true },
  { icon: '🇪🇺', name: 'UniEuropa net',       isin: 'DE0008491069', shares: '8,750 Anteile · Sparplan 50 €/Monat',  value: '9.187,50 €',  perf: '+3,20 %', up: true },
  { icon: '⚖️', name: 'UniRak Nachhaltig A', isin: 'DE0008491028', shares: '5,200 Anteile',                         value: '5.460,00 €',  perf: '−0,80 %', up: false },
  { icon: '🏦', name: 'UniOptima',            isin: 'DE0008491077', shares: '2,315 Anteile',                         value: '2.285,25 €',  perf: '+1,44 %', up: true },
]

export const mails = [
  {
    subject: '📄 Kontoauszug Februar 2026',
    preview: 'Ihr monatlicher Kontoauszug steht bereit...',
    date: '08.03.2026',
    unread: true,
    meta: 'Von: Sparda-Bank München eG · An: Thomas Müller · 08.03.2026 · 07:42 Uhr',
    body: `<p>Sehr geehrter Herr Müller,</p><br/><p>Ihr Kontoauszug für das Girokonto <strong>DE89 7009 0500 0012 3456 78</strong> für den Monat <strong>Februar 2026</strong> steht zur Verfügung.</p><br/><p><strong>Zusammenfassung:</strong><br/>Anfangssaldo: 1.195,45 €<br/>Einnahmen: +3.231,75 €<br/>Ausgaben: −1.595,27 €<br/>Endsaldo: 2.831,93 €</p><br/><p>Mit freundlichen Grüßen<br/><strong>Ihre Sparda-Bank München eG</strong></p>`,
  },
  {
    subject: '🔐 SpardaSecureGo+ aktiviert',
    preview: 'Ihr neues Gerät wurde erfolgreich registriert...',
    date: '06.03.2026',
    unread: true,
    meta: 'Von: Sparda-Bank München eG · An: Thomas Müller · 06.03.2026 · 14:18 Uhr',
    body: `<p>Sehr geehrter Herr Müller,</p><br/><p>Ihr Gerät <strong>iPhone 14 Pro</strong> wurde erfolgreich für SpardaSecureGo+ registriert.</p><br/><p>Falls Sie diese Aktion nicht selbst durchgeführt haben, kontaktieren Sie uns umgehend unter <strong>089 / 55142-0</strong>.</p><br/><p>Mit freundlichen Grüßen<br/><strong>Ihre Sparda-Bank München eG</strong></p>`,
  }
]
