import { useState, useEffect, useMemo } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import api from '../api'

// Comprehensive Event & Venue Database
const eventsData = {
  1: {
    id: 1,
    title: 'UNGU – Waktu yang Dinanti Final Chapter',
    category: 'Konser',
    venue: 'ICE BSD (Hall 5-6)',
    city: 'Tangerang',
    event_date: '2026-10-30T19:30:00',
    organizer: 'TipTip Live',
    organizer_verified: true,
    rating: '4.9',
    reviews_count: 1420,
    hot: true,
    description: 'Konser penutup era baru UNGU yang penuh kenangan dan nostalgia spektakuler. Saksikan Pasha, Enda, Oncy, Makki, dan Rowman membawakan hits legendaris mereka mulai dari "Demi Waktu", "Kekasih Gelapku", hingga "Cinta Dalam Hati" dengan tata panggung 360 derajat dan tata cahaya megah.',
    placeholder: 'linear-gradient(135deg,#3b0764,#5b21b6)',
    banner_image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1600&q=80',
    venue_details: {
      name: 'Indonesia Convention Exhibition (ICE BSD City) Hall 5 & 6',
      address: 'Jl. BSD Grand Boulevard Raya No.1, Pagedangan, Kec. Pagedangan, Kabupaten Tangerang, Banten 15339',
      google_map_url: 'https://www.google.com/maps/search/?api=1&query=Indonesia+Convention+Exhibition+ICE+BSD+City',
      map_query: 'Indonesia Convention Exhibition ICE BSD City Tangerang',
      gate_info: 'Open Gate: 15.00 WIB | Pintu Hall Masuk: 18.00 WIB | Show: 19.30 WIB',
      transit: [
        { type: '🚆 KRL Commuter Line', desc: 'Turun di Stasiun Cisauk atau Rawa Buntu, lanjut Shuttle BSD Link (Gratis) atau ojek online (±7 menit).' },
        { type: '🚌 Shuttle Bus & TransJakarta', desc: 'Tersedia Shuttle Bus resmi dari fX Sudirman & Mall Alam Sutera langsung ke lobby ICE Hall 5.' },
        { type: '🚗 Kendaraan Pribadi / Tol', desc: 'Akses mudah via Tol Jakarta-Serpong (Exit BSD City) atau Tol Serpong-Balaraja (Exit ICE BSD).' },
        { type: '🅿️ Area Parkir', desc: 'Kapasitas parkir 5.000+ mobil di basement & outdoor carpark ICE Hall 1-10.' }
      ],
      facilities: [
        { icon: '🅿️', name: 'Parkir Luas', desc: 'Basement & outdoor dengan kartu elektronik' },
        { icon: '🕌', name: 'Musholla Executive', desc: 'Tersedia di Mezzanine Floor & Hall 6' },
        { icon: '♿', name: 'Akses Disabilitas', desc: 'Ramp khusus, lift, & area duduk ramah kursi roda' },
        { icon: '🍔', name: 'Food Court & Lounge', desc: '20+ tenant F&B resmi sebelum gate masuk' },
        { icon: '🚑', name: 'Posko Medis & First Aid', desc: 'Tim paramedis dan ambulans siaga 24 jam' },
        { icon: '🧳', name: 'Locker & Baggage Drop', desc: 'Penitipan tas & barang berlisensi resmi' }
      ]
    },
    lineup: [
      { name: 'UNGU Band', role: 'Main Headliner (25+ Lagu)' },
      { name: 'Guest Star Rahasia', role: 'Special Collaboration' },
      { name: 'Strings Orchestra', role: 'Live Accompaniment' }
    ],
    rundown: [
      { time: '13:00 WIB', title: 'Open Wristband Exchange', desc: 'Penukaran e-tiket ke gelang fisik di Booth Ticket Hall 7' },
      { time: '15:00 WIB', title: 'Open Gate & Food Carnival', desc: 'Akses ke area sponsor, merchandise resmi, dan festival kuliner' },
      { time: '18:00 WIB', title: 'Pintu Masuk Hall Konser Dibuka', desc: 'Penonton mulai memasuki area panggung sesuai kategori tiket' },
      { time: '19:00 WIB', title: 'Opening Act & Anthem', desc: 'Penampilan pembuka musisi tamu kejutan' },
      { time: '19:45 WIB', title: 'UNGU – The Final Chapter Show', desc: 'Konser inti 2.5 jam membawakan 28 lagu hits terbaik' },
      { time: '22:30 WIB', title: 'Grand Encore & Fireworks', desc: 'Sesi foto bersama dan penutupan megah' }
    ],
    ticket_types: [
      {
        id: 1, name: 'Festival Standing', price: 550000, quota: 5000, sold: 3400,
        badge: 'Sensasi Paling Dekat',
        description: 'Area berdiri di tengah depan panggung dengan pandangan dinamis dan audio menggelegar.',
        perks: ['Akses Area Festival Standing', 'Gelang Wristband Resmi Eksklusif', 'Akses ke Merchandise & Food Area', 'Free Sticker Pack']
      },
      {
        id: 2, name: 'Tribune A (Numbered Seating)', price: 800000, quota: 2000, sold: 1650,
        badge: 'View Terbaik & Nyaman',
        description: 'Tempat duduk bertingkat dengan view panggung lurus dan akustik ternyaman.',
        perks: ['Kursi Bernomor (Numbered Seating)', 'Elevated Panoramic Stage View', 'Akses Jalur Masuk Khusus', 'Free Official Hand Banner']
      },
      {
        id: 3, name: 'Tribune VIP Exclusive', price: 1200000, quota: 500, sold: 485,
        badge: 'Sisa Sedikit!',
        description: 'Pengalaman premium VIP dengan lounge khusus, kursi busa empuk, dan bingkisan eksklusif.',
        perks: ['Kursi VIP Terbaik Center Stage', 'Fast-Track Entrance (Tanpa Antre)', 'Official Tour Lanyard & T-Shirt', 'Akses ke VIP Lounge (Free Snack & Drink)', 'Special Commemorative Ticket Card']
      },
    ],
  },

  2: {
    id: 2,
    title: 'Beyond Eyes 15th Anniversary – Surabaya',
    category: 'Konser',
    venue: 'Grand City Convention & Exhibition Hall',
    city: 'Surabaya',
    event_date: '2026-08-28T19:00:00',
    organizer: 'Maryhouse Media',
    organizer_verified: true,
    rating: '4.8',
    reviews_count: 890,
    hot: false,
    description: 'Perayaan 15 tahun perjalanan musik Beyond Eyes yang luar biasa. Tampil perdana dengan set list spesial anniversary dan tata panggung visual sinematik di kota pahlawan.',
    placeholder: 'linear-gradient(135deg,#0c4a6e,#0369a1)',
    banner_image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1600&q=80',
    venue_details: {
      name: 'Grand City Convention & Exhibition Hall Surabaya Lt. 4',
      address: 'Jl. Walikota Mustajab No.1, Ketabang, Kec. Genteng, Surabaya, Jawa Timur 60272',
      google_map_url: 'https://www.google.com/maps/search/?api=1&query=Grand+City+Convention+Exhibition+Surabaya',
      map_query: 'Grand City Convention Exhibition Hall Surabaya',
      gate_info: 'Open Gate: 16.00 WIB | Masuk Hall: 18.00 WIB | Show: 19.00 WIB',
      transit: [
        { type: '🚆 Kereta Api', desc: '5 menit jalan kaki dari Stasiun Kereta Api Surabaya Gubeng.' },
        { type: '🚌 Suroboyo Bus & Feeder', desc: 'Turun langsung di Halte Grand City Mall (Koridor R1/R2).' },
        { type: '🚗 Parkir Mall & Convention', desc: 'Gedung parkir Grand City Mall lantai P1–P4 (kapasitas 3.000 mobil).' }
      ],
      facilities: [
        { icon: '🏢', name: 'Akses Mall Langsung', desc: 'Terhubung langsung dengan Grand City Mall Surabaya' },
        { icon: '❄️', name: 'Full AC Dingin', desc: 'Convention hall modern dengan sistem pendingin sentral' },
        { icon: '🕌', name: 'Musholla Luas', desc: 'Tersedia di area convention dan lantai parkir' },
        { icon: '♿', name: 'Akses Disabilitas', desc: 'Lift luas dan toilet khusus penyandang disabilitas' }
      ]
    },
    lineup: [
      { name: 'Beyond Eyes', role: 'Full Team 15th Tour' },
      { name: 'Surabaya Youth Strings', role: 'Guest Orchestra' }
    ],
    rundown: [
      { time: '14:00 WIB', title: 'Wristband Redemption', desc: 'Di Exhibition Foyer lantai 3' },
      { time: '16:00 WIB', title: 'Open Gate Foyer', desc: 'Akses photo zone & merchandise store' },
      { time: '19:00 WIB', title: 'Anniversary Concert', desc: 'Show berdurasi 150 menit tanpa jeda' }
    ],
    ticket_types: [
      { id: 3, name: 'Regular Festival', price: 900000, quota: 3000, sold: 1950, badge: 'Pilihan Populer', description: 'Tiket festival reguler dengan akses ke standing zone.', perks: ['Akses Festival Standing', 'Official Wristband Gelang', 'E-Certificate Konser'] },
      { id: 4, name: 'VIP Meet & Greet', price: 1700000, quota: 500, sold: 480, badge: 'Eksklusif Terbatas', description: 'VIP Seating dengan kesempatan Meet & Greet dan foto bersama artis.', perks: ['VIP Front Row Seating', 'Meet & Greet + Foto Bersama (Group of 5)', 'Signed Poster', 'VIP Fast-Track Entrance'] },
    ],
  },

  3: {
    id: 3,
    title: 'LaLaLa Festival 2026 Forest Edition',
    category: 'Festival',
    venue: 'Gambir Expo Kemayoran (Arena JIExpo)',
    city: 'Jakarta',
    event_date: '2026-08-22T14:00:00',
    organizer: 'The Group Live',
    organizer_verified: true,
    rating: '4.9',
    reviews_count: 2100,
    hot: true,
    description: 'Festival musik multi-genre terbesar di Jakarta dengan konsep magical forest, menghadirkan lebih dari 45 artis internasional dan lokal di 3 panggung bertaraf internasional.',
    placeholder: 'linear-gradient(135deg,#064e3b,#059669)',
    banner_image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=1600&q=80',
    venue_details: {
      name: 'Gambir Expo Kemayoran, Kompleks Arena JIExpo Pintu 2',
      address: 'Arena JIExpo Kemayoran, Pintu 2, Pademangan Timur, Kemayoran, Jakarta Pusat 10620',
      google_map_url: 'https://www.google.com/maps/search/?api=1&query=Gambir+Expo+Kemayoran+Jakarta',
      map_query: 'Gambir Expo Kemayoran Jakarta',
      gate_info: 'Open Gate: 13.00 WIB | First Stage: 14.30 WIB | Curfew: 23.45 WIB',
      transit: [
        { type: '🚌 TransJakarta', desc: 'Rute 2C (Balaikota - JIExpo) dan koridor PRJ langsung turun di Halte Pintu 2 JIExpo.' },
        { type: '🚆 KRL Jabodetabek', desc: 'Stasiun Rajawali atau Kemayoran, lanjut ojol 5 menit ke Pintu 2.' },
        { type: '🚗 Tol Dalam Kota', desc: 'Exit Tol Kemayoran / PRJ, ikuti petunjuk ke Gerbang Gambir Expo.' }
      ],
      facilities: [
        { icon: '🎪', name: '3 Panggung Megah', desc: 'Forest Stage, Sunset Stage, & Bloom Stage' },
        { icon: '🍹', name: 'Bar & Food Carnival', desc: 'Puluhan kuliner premium & mocktail station' },
        { icon: '🔋', name: 'Powerbank Rental', desc: 'Charging station tersebar di setiap panggung' },
        { icon: '✨', name: 'Art Installations', desc: 'Spot foto interaktif bertema magical forest' }
      ]
    },
    lineup: [
      { name: '40+ Musisi Internasional & Lokal', role: '3 Hari Festival Spektakuler' },
      { name: 'Indie, R&B, Pop, Electronic', role: 'Multi-Genre Experience' }
    ],
    rundown: [
      { time: '13:00 WIB', title: 'Open Gate & Activations', desc: 'Mulai masuk arena dan nikmati instalasi seni' },
      { time: '14:30 WIB', title: 'Sunset Stage Begins', desc: 'Set live band akustik pembuka hari' },
      { time: '19:00 WIB', title: 'Main Forest Stage', desc: 'Headliners utama bergiliran tampil' },
      { time: '23:30 WIB', title: 'Electronic Closing Set', desc: 'DJ Closing set penutup malam' }
    ],
    ticket_types: [
      { id: 5, name: 'Day 1 Pass', price: 800000, quota: 8000, sold: 4800, badge: '1 Hari', description: 'Akses penuh ke semua panggung untuk hari Sabtu.', perks: ['Akses 3 Stage 1 Hari Penuh', 'Festival Wristband', 'Free Refill Water Station'] },
      { id: 6, name: 'Full 2-Day Pass', price: 1500000, quota: 2000, sold: 1350, badge: 'Best Value (Hemat 100K)', description: 'Akses penuh 2 hari penuh ke semua area festival.', perks: ['Akses 2 Hari (Sabtu & Minggu)', 'Official Festival Merch Bag', 'Priority Wristband Exchange', 'Exclusive Lineup Booklet'] },
    ],
  },

  4: {
    id: 4,
    title: 'Westlife World Tour 2026',
    category: 'Konser',
    venue: 'Stadion Madya GBK Arena',
    city: 'Jakarta',
    event_date: '2026-09-15T20:00:00',
    organizer: 'Live Nation Indonesia',
    organizer_verified: true,
    rating: '5.0',
    reviews_count: 3200,
    hot: true,
    description: 'Konser boyband legendaris dunia asal Irlandia di panggung megah GBK. Bawakan seluruh lagu hits legendaris seperti "My Love", "Swear It Again", "You Raise Me Up", dan "Uptown Girl".',
    placeholder: 'linear-gradient(135deg,#001a33,#1e40af)',
    banner_image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?auto=format&fit=crop&w=1600&q=80',
    venue_details: {
      name: 'Stadion Madya Gelora Bung Karno (GBK Senayan)',
      address: 'Kompleks Gelora Bung Karno, Jl. Pintu Satu Senayan, Gelora, Tanah Abang, Jakarta Pusat 10270',
      google_map_url: 'https://www.google.com/maps/search/?api=1&query=Stadion+Madya+Gelora+Bung+Karno+Jakarta',
      map_query: 'Stadion Madya GBK Senayan Jakarta',
      gate_info: 'Open Gate Plaza: 14.00 WIB | Pintu Tribun: 17.30 WIB | Show: 20.00 WIB',
      transit: [
        { type: '🚇 MRT Jakarta', desc: 'Turun di Stasiun MRT Istora Mandiri (Pintu B) atau Senayan BCA, jalan kaki 7 menit lewat Gate 5 GBK.' },
        { type: '🚌 TransJakarta', desc: 'Turun di Halte Gelora Bung Karno (Koridor 1) atau Halte Senayan Bank DKI.' },
        { type: '🚗 Akses Pintu Masuk', desc: 'Gunakan Pintu 5 (Jl. Sudirman), Pintu 7, atau Pintu 10 (Jl. Gerbang Pemuda).' }
      ],
      facilities: [
        { icon: '🏟️', name: 'Stadion Berstandar FIFA', desc: 'Rumput & tribun modern berstandar internasional' },
        { icon: '💺', name: 'Numbered Seating', desc: 'Semua kategori tribun menggunakan nomor kursi pasti' },
        { icon: '♿', name: 'Disability Platform', desc: 'Area khusus pengguna kursi roda dengan pendamping' },
        { icon: '🛍️', name: 'Official Westlife Store', desc: 'Kaos, hoodie, dan lightstick resmi' }
      ]
    },
    lineup: [
      { name: 'Shane Filan, Mark Feehily, Kian Egan, Nicky Byrne', role: 'Westlife (Full Original Member)' }
    ],
    rundown: [
      { time: '11:00 WIB', title: 'Ticket Exchange Open', desc: 'Plaza Utara GBK Senayan' },
      { time: '17:30 WIB', title: 'Gate to Stadium Opens', desc: 'Pemeriksaan tiket dan barang bawaan' },
      { time: '20:00 WIB', title: 'Westlife Live on Stage', desc: 'Mega concert 22 hits legendaris dunia' }
    ],
    ticket_types: [
      { id: 7, name: 'CAT 3 (Upper Tribune)', price: 750000, quota: 5000, sold: 4100, badge: 'Terjangkau', description: 'Kursi tribun atas dengan sound system terintegrasi.', perks: ['Numbered Seating', 'Akses Pintu Gate 3', 'Free Digital Tour Booklet'] },
      { id: 8, name: 'CAT 2 (Lower Tribune)', price: 1200000, quota: 2000, sold: 1920, badge: 'Sisa Sedikit!', description: 'Tribun bawah dengan pemandangan panggung lebih dekat dan jelas.', perks: ['Numbered Seating Depan', 'View Panggung Sejajar', 'Special Commemorative Lanyard'] },
      { id: 9, name: 'CAT 1 VIP Diamond', price: 2000000, quota: 500, sold: 410, badge: 'Best View', description: 'Kategori paling dekat dengan stage dan runway panggung utama.', perks: ['Front Row Seating Terdekat Stage', 'Fast-Track VIP Gate', 'Exclusive Westlife Tour Merchandise Box', 'Welcome Drink Voucher'] },
    ],
  },

  5: {
    id: 5,
    title: 'Synchronize Festival 2026',
    category: 'Festival',
    venue: 'Gambir Expo Kemayoran',
    city: 'Jakarta',
    event_date: '2026-10-03T14:00:00',
    organizer: 'Demajors & Dyandra',
    organizer_verified: true,
    rating: '4.9',
    reviews_count: 4500,
    hot: true,
    description: 'Festival indie dan musik lintas generasi paling dinanti di Indonesia. Tiga hari penuh merayakan keragaman musik lokal dari dangdut, rock, jazz, pop hingga hip-hop dengan 100+ penampil.',
    placeholder: 'linear-gradient(135deg,#78350f,#d97706)',
    banner_image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1600&q=80',
    venue_details: {
      name: 'Gambir Expo JIExpo Kemayoran Jakarta',
      address: 'Pintu 2 Gambir Expo, Pademangan Timur, Kemayoran, Jakarta Pusat 10620',
      google_map_url: 'https://www.google.com/maps/search/?api=1&query=Gambir+Expo+JIExpo+Kemayoran',
      map_query: 'Gambir Expo JIExpo Kemayoran Jakarta',
      gate_info: 'Open Gate: 13.00 WIB | Panggung Musik: 14.00 - 00.30 WIB',
      transit: [
        { type: '🚌 TransJakarta', desc: 'Rute Koridor 12 atau bus feeder PRJ Kemayoran langsung tiba di halte Gambir Expo.' },
        { type: '🚆 KRL Stasiun', desc: 'Stasiun Rajawali hanya 5 menit naik kendaraan roda dua ke Gerbang JIExpo.' },
        { type: '🚗 Parkir Khusus', desc: 'Lahan parkir motor dan mobil terpusat di Pintu 1 & 2 JIExpo.' }
      ],
      facilities: [
        { icon: '🎸', name: '6 Panggung Berbeda', desc: 'Dynamic Stage, Lake Stage, Forest Stage, District, dsb.' },
        { icon: '📻', name: 'Pasar Musik & Vinyl', desc: 'Bursa kaset, piringan hitam, dan rilisan fisik langka' },
        { icon: '🍲', name: 'Pasar Kuliner Nusantara', desc: '100+ stand makanan dan minuman khas daerah' },
        { icon: '🕌', name: 'Musholla Tenda Raksasa', desc: 'Kapasitas 1.000 jamaah dengan tempat wudhu bersih' }
      ]
    },
    lineup: [
      { name: '100+ Musisi Legendaris & Indie', role: 'Rayakan Musik Indonesia' }
    ],
    rundown: [
      { time: '13:00 WIB', title: 'Open Gate & Pasar Musik', desc: 'Jelajahi pasar kreatif dan bazaar vinyl' },
      { time: '14:00 WIB', title: 'Parallel Shows', desc: 'Semua 6 panggung mulai bergemuruh serentak' },
      { time: '00:00 WIB', title: 'Midnight Secret Show', desc: 'Penampilan rahasia spesial akhir malam' }
    ],
    ticket_types: [
      { id: 9, name: 'Daily Regular Pass', price: 600000, quota: 10000, sold: 6500, badge: 'Tiket Harian', description: 'Akses penuh 1 hari ke seluruh 6 panggung.', perks: ['Akses 6 Panggung Bebas', 'Official Festival Wristband', 'Peta Acara & Lineup Guide'] },
      { id: 10, name: 'VIP 3-Day Pass', price: 1200000, quota: 1000, sold: 860, badge: 'Akses Penuh 3 Hari', description: 'Akses VIP penuh selama 3 hari non-stop dengan fasilitas viewing deck khusus.', perks: ['Akses 3 Hari Penuh', 'VIP Elevated Viewing Deck', 'Antrean Khusus VIP', 'Exclusive Synchronize Merchandise'] },
    ],
  },

  6: {
    id: 6,
    title: 'Twilite Orchestra 35th Anniversary Concert',
    category: 'Theater',
    venue: 'Usmar Ismail Hall',
    city: 'Jakarta',
    event_date: '2026-09-06T16:00:00',
    organizer: 'TWILITE ORCHESTRA',
    organizer_verified: true,
    rating: '5.0',
    reviews_count: 420,
    hot: false,
    description: 'Konser simfoni megah dipimpin maestro Addie MS merayakan 35 tahun dedikasi Twilite Orchestra di dunia musik orkestra Indonesia dengan tata akustik ruangan sempurna.',
    placeholder: 'linear-gradient(135deg,#18181b,#3f3f46)',
    banner_image: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=1600&q=80',
    venue_details: {
      name: 'Pusat Perfilman H. Usmar Ismail (PPHUI Hall) Kuningan',
      address: 'Gedung PPHUI, Jl. H. R. Rasuna Said Kav. C-22, Karet Kuningan, Setiabudi, Jakarta Selatan 12940',
      google_map_url: 'https://www.google.com/maps/search/?api=1&query=Usmar+Ismail+Hall+Kuningan+Jakarta',
      map_query: 'Usmar Ismail Hall Kuningan Jakarta',
      gate_info: 'Dress Code: Smart Casual / Formal | Doors Open: 15.00 WIB | Show: 16.00 WIB Tepat',
      transit: [
        { type: '🚝 LRT Jabodebek', desc: 'Turun di Stasiun LRT Rasuna Said, jalan kaki 3 menit ke lobby gedung.' },
        { type: '🚌 TransJakarta', desc: 'Koridor 6 (Ragunan-Dukuh Atas) turun di Halte GOR Sumantri atau Karet Kuningan.' },
        { type: '🚗 Parkir & Valet', desc: 'Tersedia layanan parkir gedung dan valet di lobby depan.' }
      ],
      facilities: [
        { icon: '🎻', name: 'Akustik Teater Dunia', desc: 'Desain akustik ruangan kayu tanpa distorsi gema' },
        { icon: '💺', name: 'Kursi Beludru Mewah', desc: 'Kenyamanan tempat duduk teater bertingkat' },
        { icon: '🍸', name: 'Cocktail Foyer', desc: 'Area resepsi pra-konser dan minuman hangat' },
        { icon: '📖', name: 'Buku Program Mewah', desc: 'Panduan komposisi partitur lagu eksklusif' }
      ]
    },
    lineup: [
      { name: 'Addie MS', role: 'Conductor & Music Director' },
      { name: 'Twilite Orchestra & Chorus', role: '60 Musisi Orkestra Penuh' }
    ],
    rundown: [
      { time: '15:00 WIB', title: 'Foyer Reception & Registration', desc: 'Tamu undangan dan penonton menikmati sajian selamat datang' },
      { time: '15:45 WIB', title: 'Hall Doors Close', desc: 'Pintu auditorium ditutup tepat waktu demi kenyamanan akustik' },
      { time: '16:00 WIB', title: 'Symphony Overture', desc: 'Babak 1 penampilan karya-karya klasik Indonesia' }
    ],
    ticket_types: [
      { id: 11, name: 'Bronze Balcony Seat', price: 500000, quota: 400, sold: 400, badge: 'Sold Out', description: 'Kursi balkon atas dengan perspektif luas ke seluruh panggung orkestra.', perks: ['Numbered Balcony Seating', 'Official Program Booklet'] },
      { id: 12, name: 'Gold Orchestra Front', price: 1000000, quota: 200, sold: 200, badge: 'Sold Out', description: 'Kursi lantai utama barisan depan menghadap langsung ke arah konduktor.', perks: ['Premium Front Orchestra Seating', 'Hardcover 35th Commemorative Book', 'Akses VIP Cocktail Lounge'] },
    ],
  },

  7: {
    id: 7,
    title: 'Raisa Live in Concert 2026 The Comeback',
    category: 'Konser',
    venue: 'Stadion Utama GBK Senayan',
    city: 'Jakarta',
    event_date: '2026-12-12T19:30:00',
    organizer: 'JUNI Concert & Raisa Production',
    organizer_verified: true,
    rating: '5.0',
    reviews_count: 5120,
    hot: true,
    description: 'Kembalinya diva pop Indonesia di panggung termegah Stadion Utama Gelora Bung Karno dengan tata visual panggung hidrolik 360 derajat, visual interaktif, dan ribuan YourRaisa.',
    placeholder: 'linear-gradient(135deg,#4c1d95,#7c3aed)',
    banner_image: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&w=1600&q=80',
    venue_details: {
      name: 'Stadion Utama Gelora Bung Karno (SUGBK)',
      address: 'Jl. Pintu Satu Senayan, Gelora, Tanah Abang, Jakarta Pusat 10270',
      google_map_url: 'https://www.google.com/maps/search/?api=1&query=Stadion+Utama+Gelora+Bung+Karno+Jakarta',
      map_query: 'Stadion Utama Gelora Bung Karno Jakarta',
      gate_info: 'Open Gate Area GBK: 12.00 WIB | Stadion Open: 16.30 WIB | Show: 19.30 WIB',
      transit: [
        { type: '🚇 MRT Jakarta', desc: 'Stasiun Istora Mandiri & Senayan BCA hanya beberapa langkah dari Gerbang GBK.' },
        { type: '🚌 TransJakarta', desc: 'Halte Gelora Bung Karno dan Halte Senayan Bank DKI (Koridor 1 & 3F).' },
        { type: '🚶 Akses Pejalan Kaki', desc: 'Jembatan Penyeberangan Orang (JPO) tematik Pinisi dan trotoar luas ramah pejalan kaki.' }
      ],
      facilities: [
        { icon: '🔊', name: 'L-Acoustics Sound System', desc: 'Kualitas audio konser kelas dunia dengan surround jernih' },
        { icon: '💡', name: 'LED Interactive Wristband', desc: 'Gelang menyala sinkron dengan lantunan lagu konser' },
        { icon: '♿', name: 'Ramah Disabilitas', desc: 'Akses ramah kursi roda dan jalur khusus di Plaza Barat' },
        { icon: '🛍️', name: 'Official YourRaisa Merch', desc: 'Booth resmi album fisik, lightstick, dan merchandise tour' }
      ]
    },
    lineup: [
      { name: 'Raisa Andriana', role: 'Main Diva (30 Lagu)' },
      { name: 'Guest Collaborators', role: 'Top Duet Partners' }
    ],
    rundown: [
      { time: '12:00 WIB', title: 'Open Fan Village & Plaza', desc: 'Aktivasi stan YourRaisa, photo studio, dan food truck' },
      { time: '16:30 WIB', title: 'Stadium Doors Open', desc: 'Penonton mulai masuk ke tribun dan festival pit' },
      { time: '19:30 WIB', title: 'The Comeback Show', desc: 'Konser megah 3 jam penuh emosi dan magis' }
    ],
    ticket_types: [
      { id: 13, name: 'Festival Standing (Field)', price: 650000, quota: 6000, sold: 4300, badge: 'Paling Seru', description: 'Area lapangan stadion terdekat dengan panggung runway hidrolik.', perks: ['Akses Festival Lapangan', 'Interactive LED Wristband', 'Official Tour Poster'] },
      { id: 14, name: 'VIP Diamond Front Row', price: 1800000, quota: 1000, sold: 870, badge: 'Sisa Sedikit!', description: 'Kursi VIP bernomor di depan stage dengan jarak pandang paling intim.', perks: ['Numbered Best Seating', 'VIP Soundcheck Access Pass', 'Exclusive Merch Package Box', 'Jalur Antrian VIP Khusus'] },
    ],
  },

  8: {
    id: 8,
    title: 'Synchronize Festival 2026 Multi-Genre',
    category: 'Festival',
    venue: 'Gambir Expo Kemayoran',
    city: 'Jakarta',
    event_date: '2026-10-03T13:00:00',
    organizer: 'Demajors Music',
    organizer_verified: true,
    rating: '4.9',
    reviews_count: 1800,
    hot: false,
    description: 'Festival musik multi-genre terbesar yang merayakan keragaman musik lokal Indonesia dari berbagai era dan aliran suara.',
    placeholder: 'linear-gradient(135deg,#78350f,#d97706)',
    banner_image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1600&q=80',
    venue_details: {
      name: 'Gambir Expo Kemayoran Jakarta Pusat',
      address: 'Kompleks Arena JIExpo Kemayoran, Pintu 2, Jakarta Pusat 10620',
      google_map_url: 'https://www.google.com/maps/search/?api=1&query=Gambir+Expo+Kemayoran+Jakarta',
      map_query: 'Gambir Expo Kemayoran Jakarta',
      gate_info: 'Open Gate: 13.00 WIB | Closing: 00.30 WIB',
      transit: [
        { type: '🚌 TransJakarta', desc: 'Turun di Halte JIExpo Kemayoran Pintu 2.' },
        { type: '🚆 KRL', desc: 'Stasiun Rajawali atau Kemayoran, lanjut 5 menit dengan ojol.' }
      ],
      facilities: [
        { icon: '🎪', name: 'Panggung Tematik', desc: '5 Panggung outdoor & indoor' },
        { icon: '🍔', name: 'Food Court', desc: 'Pilihan kuliner lokal lengkap' }
      ]
    },
    lineup: [{ name: '80+ Musisi Nasional', role: 'Multi-Genre Lineup' }],
    rundown: [{ time: '13:00 WIB', title: 'Open Gate', desc: 'Masuk arena festival' }, { time: '14:00 WIB', title: 'Start Shows', desc: 'Konser berlangsung hingga tengah malam' }],
    ticket_types: [
      { id: 15, name: 'Daily Pass', price: 600000, quota: 5000, sold: 3100, badge: 'Akses 1 Hari', description: 'Akses penuh ke semua panggung selama 1 hari.', perks: ['Akses Semua Panggung 1 Hari', 'Wristband Gelang Resmi'] },
      { id: 16, name: '3-Day Pass', price: 1400000, quota: 2000, sold: 1300, badge: 'Akses 3 Hari Penuh', description: 'Akses bebas keluar masuk selama 3 hari festival.', perks: ['Akses 3 Hari Penuh', 'Official Merchandise T-Shirt', 'Fast-Track Exchange'] },
    ],
  },

  9: {
    id: 9,
    title: 'Raditya Dika – Cerita Cintaku Tour 2026',
    category: 'Stand Up',
    venue: 'Sasana Budaya Ganesha (Sabuga)',
    city: 'Bandung',
    event_date: '2026-10-18T19:00:00',
    organizer: 'Kolektif Tawa Nusantara',
    organizer_verified: true,
    rating: '4.9',
    reviews_count: 980,
    hot: true,
    description: 'Spesial pertunjukan stand up comedy teranyar Raditya Dika yang membawakan kisah cinta absurd, kehidupan rumah tangga, dan refleksi hidup yang mengocok perut sekaligus menghangatkan hati.',
    placeholder: 'linear-gradient(135deg,#9f1239,#e11d48)',
    banner_image: 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?auto=format&fit=crop&w=1600&q=80',
    venue_details: {
      name: 'Auditorium Sasana Budaya Ganesha (Sabuga ITB)',
      address: 'Jl. Tamansari No.73, Lb. Siliwangi, Kecamatan Coblong, Kota Bandung, Jawa Barat 40132',
      google_map_url: 'https://www.google.com/maps/search/?api=1&query=Sabuga+ITB+Bandung',
      map_query: 'Sabuga ITB Bandung',
      gate_info: 'Open Gate: 17.30 WIB | Pintu Ditutup: 18.50 WIB | Show: 19.00 WIB Tepat (Tidak ada late entry)',
      transit: [
        { type: '🚗 Kendaraan Pribadi', desc: 'Akses mudah dari Dago / Cihampelas, parkir luas di dalam area Sabuga ITB.' },
        { type: '🚆 Kereta Cepat / Feeder', desc: 'Dari Stasiun Kereta Api Bandung (Hall), 15 menit menggunakan taksi / ojol.' }
      ],
      facilities: [
        { icon: '❄️', name: 'Amphitheater Full AC', desc: 'Kursi berundak dengan visibilitas sempurna' },
        { icon: '🅿️', name: 'Parkir Sabuga', desc: 'Area parkir luas motor dan mobil aman' },
        { icon: '📸', name: 'Photo Booth Tematik', desc: 'Spot foto eksklusif Cerita Cintaku' }
      ]
    },
    lineup: [{ name: 'Raditya Dika', role: 'Main Comedian (120 Menit)' }, { name: 'Opener Komika Pilihan', role: 'Opening Set' }],
    rundown: [{ time: '17:30 WIB', title: 'Open Gate Sabuga', desc: 'Registrasi dan penukaran tiket' }, { time: '19:00 WIB', title: 'Start Comedy Special', desc: 'Pertunjukan dimulai tepat waktu' }],
    ticket_types: [
      { id: 17, name: 'Reguler Tribun Atas', price: 250000, quota: 1500, sold: 920, badge: 'Best Value', description: 'Kursi tribun atas dengan pandangan panggung jelas.', perks: ['Numbered Seat Tribun', 'Free Sticker Pack'] },
      { id: 18, name: 'VIP Floor Depan', price: 500000, quota: 500, sold: 440, badge: 'Sisa Sedikit!', description: 'Kursi VIP lantai dasar paling depan dekat panggung + photo pass.', perks: ['Front Row Floor Seating', 'Group Photo Session dengan Raditya Dika', 'Signed Bookmark'] },
    ],
  },

  10: {
    id: 10,
    title: 'Pandji Pragiwaksono – Komoidoumenoi 2.0',
    category: 'Stand Up',
    venue: 'Istora Senayan GBK',
    city: 'Jakarta',
    event_date: '2026-11-25T20:00:00',
    organizer: 'Comika Event',
    organizer_verified: true,
    rating: '5.0',
    reviews_count: 1780,
    hot: true,
    description: 'Kelanjutan dari tur stand up fenomenal Pandji Pragiwaksono di hadapan 7.000 penonton di Istora Senayan, dengan materi observasi sosial tajam, jujur, dan menghibur.',
    placeholder: 'linear-gradient(135deg,#312e81,#4338ca)',
    banner_image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1600&q=80',
    venue_details: {
      name: 'Istora Gelora Bung Karno (Istora Senayan)',
      address: 'Kompleks Gelora Bung Karno, Jl. Pintu Satu Senayan, Gelora, Jakarta Pusat 10270',
      google_map_url: 'https://www.google.com/maps/search/?api=1&query=Istora+Senayan+Jakarta',
      map_query: 'Istora Senayan Jakarta',
      gate_info: 'Open Gate: 18.00 WIB | Show Dimulai: 20.00 WIB',
      transit: [
        { type: '🚇 MRT Istora Mandiri', desc: 'Turun tepat di depan pintu masuk kawasan Istora GBK.' },
        { type: '🚌 TransJakarta GBK', desc: 'Halte Senayan / GBK hanya 5 menit jalan kaki.' }
      ],
      facilities: [
        { icon: '🏟️', name: '7.000 Indoor Seating', desc: 'Kenyamanan tribun indoor berpendingin udara penuh' },
        { icon: '📺', name: '4 Layar Raksasa LED', desc: 'Pandangan detail dari setiap sudut kursi' }
      ]
    },
    lineup: [{ name: 'Pandji Pragiwaksono', role: 'Headliner Comika' }],
    rundown: [{ time: '18:00 WIB', title: 'Open Gate', desc: 'Pemeriksaan tiket dan akses merchandise' }, { time: '20:00 WIB', title: 'Special Performance', desc: 'Materi spesial komedi 2.0' }],
    ticket_types: [
      { id: 19, name: 'CAT 2 Tribun Tengah', price: 350000, quota: 2500, sold: 1850, badge: 'Favorit', description: 'Kursi tribun tengah ber-AC dengan visibilitas prima.', perks: ['Numbered Seating', 'Official Comika Lanyard'] },
      { id: 20, name: 'VIP Floor Baris Depan', price: 750000, quota: 800, sold: 710, badge: 'Best View', description: 'Kursi VIP di lantai lapangan persis depan panggung utama.', perks: ['VIP Floor Seating', 'Exclusive Signed Merchandise', 'Fast-Track Lane'] },
    ],
  },

  11: {
    id: 11,
    title: 'Jakarta Sunset Marathon 2026 21K & 10K',
    category: 'Sports',
    venue: 'Ancol Beach City Mall',
    city: 'Jakarta',
    event_date: '2026-10-12T15:30:00',
    organizer: 'RunID Official',
    organizer_verified: true,
    rating: '4.8',
    reviews_count: 670,
    hot: false,
    description: 'Lari maraton tepi pantai dengan pemandangan matahari terbenam spektakuler di Teluk Jakarta, diiringi musik DJ live di setiap water station.',
    placeholder: 'linear-gradient(135deg,#047857,#10b981)',
    banner_image: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?auto=format&fit=crop&w=1600&q=80',
    venue_details: {
      name: 'Ancol Beach City & Symphony of The Sea',
      address: 'Taman Impian Jaya Ancol, Jl. Lodan Timur No.7, Ancol, Pademangan, Jakarta Utara 14430',
      google_map_url: 'https://www.google.com/maps/search/?api=1&query=Ancol+Beach+City+Jakarta',
      map_query: 'Ancol Beach City Jakarta',
      gate_info: 'Race Village Buka: 14.00 WIB | Flag-off 21K: 15.30 WIB | Flag-off 10K: 16.15 WIB',
      transit: [
        { type: '🚌 TransJakarta Koridor 5', desc: 'Turun langsung di Halte Ancol, lanjut Bus Wara-Wiri Ancol (Gratis).' },
        { type: '🚗 Akses Pintu Gerbang Ancol', desc: 'Pintu Gerbang Timur atau Pintu Carnaval Ancol.' }
      ],
      facilities: [
        { icon: '🎒', name: 'Baggage Drop Aman', desc: 'Penitipan tas dengan nomor BIB' },
        { icon: '💧', name: 'Water Station Tiap 2.5K', desc: 'Isotonik & air mineral dingin' },
        { icon: '🎖️', name: 'Medal Engraving', desc: 'Grafir nama dan catatan waktu di medali' }
      ]
    },
    lineup: [{ name: 'Sunset DJ Party', role: 'After-Run Celebration' }],
    rundown: [{ time: '14:00 WIB', title: 'Race Village Opens', desc: 'Baggage drop & warming up' }, { time: '15:30 WIB', title: 'Flag-off 21K Half Marathon', desc: 'Pelepasan pelari 21K' }, { time: '18:00 WIB', title: 'Sunset Party & Medal Ceremony', desc: 'Pesta musik pantai dan pembagian podium' }],
    ticket_types: [
      { id: 21, name: '10K Race Pass', price: 375000, quota: 3000, sold: 1950, badge: 'Populer', description: 'Paket lari 10K lengkap dengan running jersey dan finisher medal.', perks: ['Official Running Jersey', 'Timing Chip BIB', 'Finisher Medal Metalik', 'Refreshment Pack'] },
      { id: 22, name: '21K Half Marathon Pass', price: 550000, quota: 2000, sold: 1650, badge: 'Tantangan', description: 'Paket lari 21K dengan finisher tee eksklusif dan hidrasi premium.', perks: ['Official Race Jersey', 'Finisher Tee 21K Eksklusif', 'Finisher Medal Spesial', 'Recovery Massage Pass'] },
    ],
  },

  12: {
    id: 12,
    title: 'Teater Musikal Laskar Pelangi Reimagined',
    category: 'Theater',
    venue: 'Bali Nusa Dua Convention Center',
    city: 'Bali',
    event_date: '2026-12-05T18:30:00',
    organizer: 'Artisana Project & Miles Music',
    organizer_verified: true,
    rating: '5.0',
    reviews_count: 850,
    hot: false,
    description: 'Pentas teater musikal adaptasi mahakarya Andrea Hirata dengan aransemen orkestra megah, koreografi memukau, dan tata panggung visual puitis di Pulau Dewata.',
    placeholder: 'linear-gradient(135deg,#581c87,#9333ea)',
    banner_image: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=1600&q=80',
    venue_details: {
      name: 'Nusa Dua Hall - Bali Nusa Dua Convention Center (BNDCC)',
      address: 'Kawasan Pariwisata Nusa Dua Lot NW/1, Benoa, Kec. Kuta Selatan, Kabupaten Badung, Bali 80363',
      google_map_url: 'https://www.google.com/maps/search/?api=1&query=Bali+Nusa+Dua+Convention+Center',
      map_query: 'Bali Nusa Dua Convention Center Nusa Dua Bali',
      gate_info: 'Cocktail Foyer: 17.30 WITA | Hall Doors: 18.00 WITA | Show: 18.30 WITA',
      transit: [
        { type: '✈️ Bandara I Gusti Ngurah Rai', desc: 'Hanya 20 menit berkendara melalui Tol Bali Mandara.' },
        { type: '🚐 Shuttle Hotel ITDC', desc: 'Layanan antar-jemput gratis dari hotel-hotel di kawasan Nusa Dua.' }
      ],
      facilities: [
        { icon: '🎭', name: 'Auditorium Broadway Class', desc: 'Standar teater internasional berkapasitas 2.500 kursi' },
        { icon: '🍸', name: 'VIP Red Carpet Lounge', desc: 'Minuman selamat datang dan ruang santai eksklusif' }
      ]
    },
    lineup: [{ name: '50+ Aktor & Musisi Teater', role: 'Full Cast Laskar Pelangi' }],
    rundown: [{ time: '17:30 WITA', title: 'Red Carpet & Cocktail', desc: 'Resepsi pembuka di Foyer Utama' }, { time: '18:30 WITA', title: 'Musical Act 1 & 2', desc: 'Pertunjukan teater 2 jam spektakuler' }],
    ticket_types: [
      { id: 23, name: 'Silver Balcony', price: 600000, quota: 1000, sold: 680, badge: 'Pilihan Nyaman', description: 'Tingkat 2 dengan sudut pandang seluruh panggung teater.', perks: ['Auditorium Seating', 'Program Book Teater'] },
      { id: 24, name: 'Platinum Front VIP', price: 1200000, quota: 400, sold: 360, badge: 'Best Seat', description: 'Lantai 1 paling depan terdekat panggung orkestra dan para pemeran.', perks: ['VIP Center Front Row', 'Akses Cocktail Foyer', 'Foto Eksklusif dengan Para Pemeran', 'Souvenir Edisi Khusus'] },
    ],
  },
}

const fmt = (n) => 'Rp' + Number(n).toLocaleString('id-ID')
const fmtDate = (d) => new Date(d).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
const fmtTime = (d) => new Date(d).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB'

export default function TicketDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  // Base event resolution (from static + fallback)
  const defaultEvent = eventsData[id] || eventsData[1]
  const [event, setEvent] = useState(defaultEvent)

  // Interactive UI state
  const [activeTab, setActiveTab] = useState('tickets') // 'tickets' | 'location' | 'seatmap' | 'rundown' | 'faq'
  const [selectedTicketId, setSelectedTicketId] = useState(null)
  const [qty, setQty] = useState(1)
  const [promoCode, setPromoCode] = useState('')
  const [appliedPromo, setAppliedPromo] = useState(null)
  const [promoError, setPromoError] = useState('')
  const [toast, setToast] = useState(null)
  const [isWishlist, setIsWishlist] = useState(false)
  const [liveViewers] = useState(() => Math.floor(Math.random() * 25) + 18)

  // Countdown timer calculation
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    // If id changed, sync event
    if (eventsData[id]) {
      setEvent(eventsData[id])
      if (eventsData[id].ticket_types?.length > 0) {
        setSelectedTicketId(eventsData[id].ticket_types[0].id)
      }
    } else {
      // Try to fetch from API if exists
      api.get(`/events/${id}`)
        .then(res => {
          if (res.data?.data) {
            const apiEv = res.data.data
            setEvent(prev => ({
              ...prev,
              ...apiEv,
              venue_details: prev.venue_details || {
                name: apiEv.venue || 'Venue Acara',
                address: `${apiEv.venue || ''}, ${apiEv.city || ''}`,
                google_map_url: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent((apiEv.venue || '') + ' ' + (apiEv.city || ''))}`,
                map_query: `${apiEv.venue || ''} ${apiEv.city || ''}`,
                gate_info: 'Open Gate: 15.00 WIB | Show: 19.30 WIB',
                transit: [
                  { type: '🚗 Kendaraan Pribadi', desc: 'Akses mudah dengan area parkir tersedia.' },
                  { type: '🚌 Transportasi Umum', desc: 'Dekat dengan halte bus dan stasiun terdekat.' }
                ],
                facilities: [
                  { icon: '🅿️', name: 'Parkir Area', desc: 'Tersedia tempat parkir' },
                  { icon: '🕌', name: 'Musholla', desc: 'Tempat ibadah bersih' },
                  { icon: '🍔', name: 'Food & Beverage', desc: 'Area makanan dan minuman' }
                ]
              }
            }))
            if (apiEv.ticket_types?.length > 0) {
              setSelectedTicketId(apiEv.ticket_types[0].id)
            }
          }
        })
        .catch(() => {})
    }
  }, [id])

  // Set default selected ticket if none
  useEffect(() => {
    if (!selectedTicketId && event.ticket_types?.length > 0) {
      setSelectedTicketId(event.ticket_types[0].id)
    }
  }, [event, selectedTicketId])

  // Countdown clock effect
  useEffect(() => {
    const targetDate = new Date(event.event_date).getTime()
    const updateCountdown = () => {
      const now = new Date().getTime()
      const diff = targetDate - now
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24))
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((diff % (1000 * 60)) / 1000)
        setTimeLeft({ days, hours, minutes, seconds })
      }
    }
    updateCountdown()
    const timer = setInterval(updateCountdown, 1000)
    return () => clearInterval(timer)
  }, [event.event_date])

  const chosenType = useMemo(() => {
    return event.ticket_types?.find(t => t.id === selectedTicketId) || event.ticket_types?.[0]
  }, [event, selectedTicketId])

  const availableQuota = chosenType ? (chosenType.quota - chosenType.sold) : 0
  const subtotal = chosenType ? chosenType.price * qty : 0

  // Promo calculation
  const discountAmount = useMemo(() => {
    if (!appliedPromo) return 0
    if (appliedPromo.type === 'percent') {
      return Math.round((subtotal * appliedPromo.value) / 100)
    }
    return Math.min(appliedPromo.value, subtotal)
  }, [appliedPromo, subtotal])

  const total = Math.max(0, subtotal - discountAmount)

  // Toast Helper
  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  // Promo Code Handler
  const handleApplyPromo = (e) => {
    e.preventDefault()
    setPromoError('')
    const code = promoCode.trim().toUpperCase()
    if (!code) return

    if (code === 'KONSERHEMAT') {
      setAppliedPromo({ code: 'KONSERHEMAT', type: 'nominal', value: 50000, desc: 'Potongan Rp 50.000' })
      showToast('🎉 Promo KONSERHEMAT berhasil dipasang! Hemat Rp 50.000')
    } else if (code === 'DISKON10') {
      setAppliedPromo({ code: 'DISKON10', type: 'percent', value: 10, desc: 'Diskon 10%' })
      showToast('🎉 Promo DISKON10 berhasil dipasang! Hemat 10%')
    } else {
      setPromoError('Kode promo tidak valid atau telah kedaluwarsa')
    }
  }

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href)
    showToast('🔗 Tautan tiket berhasil disalin ke clipboard!')
  }

  const handleCopyAddress = () => {
    const addr = event.venue_details?.address || `${event.venue}, ${event.city}`
    navigator.clipboard?.writeText(addr)
    showToast('📍 Alamat lengkap venue berhasil disalin!')
  }

  const handleToggleWishlist = () => {
    setIsWishlist(!isWishlist)
    showToast(!isWishlist ? '❤️ Event disimpan ke wishlist favorit!' : 'Dihapus dari wishlist')
  }

  const handleBuy = () => {
    if (!chosenType || availableQuota <= 0) return
    navigate('/payment', {
      state: {
        event,
        ticketType: chosenType,
        quantity: qty,
        total,
        discount: discountAmount,
        promoCode: appliedPromo?.code || null
      }
    })
  }

  return (
    <div style={{ minHeight: '100vh', background: '#08080d', color: '#f3f4f6', fontFamily: 'Inter, sans-serif' }}>
      
      {/* Toast Alert */}
      {toast && (
        <div style={{
          position: 'fixed', top: 24, left: '50%', transform: 'translateX(-50%)',
          background: 'linear-gradient(135deg,#7c3aed,#ec4899)', color: '#fff',
          padding: '12px 24px', borderRadius: 9999, fontWeight: 700, fontSize: '0.88rem',
          boxShadow: '0 12px 32px rgba(124,58,237,0.5)', zIndex: 9999,
          display: 'flex', alignItems: 'center', gap: 10, animation: 'fadeUp 0.3s ease'
        }}>
          {toast}
        </div>
      )}

      {/* Top Navbar */}
      <div style={{
        background: 'rgba(10,10,18,0.85)', backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '14px 24px',
        position: 'sticky', top: 0, zIndex: 60
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <Link to="/" style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '6px 14px', borderRadius: 10, background: 'rgba(255,255,255,0.06)',
              color: '#d8b4fe', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600,
              border: '1px solid rgba(255,255,255,0.1)', transition: 'all 0.2s'
            }}>
              ← Beranda
            </Link>
            <span style={{ color: '#4b5563' }}>|</span>
            <span style={{
              color: '#9ca3af', fontSize: '0.85rem', maxWidth: 360,
              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
            }}>
              {event.title}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button
              onClick={handleToggleWishlist}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '7px 14px', borderRadius: 10,
                background: isWishlist ? 'rgba(236,72,153,0.2)' : 'rgba(255,255,255,0.06)',
                border: isWishlist ? '1px solid #ec4899' : '1px solid rgba(255,255,255,0.1)',
                color: isWishlist ? '#f472b6' : '#d1d5db',
                fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s'
              }}
            >
              {isWishlist ? '❤️ Tersimpan' : '🤍 Simpan'}
            </button>
            <button
              onClick={handleCopyLink}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '7px 14px', borderRadius: 10,
                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                color: '#d1d5db', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s'
              }}
            >
              📤 Bagikan
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 20px 80px' }}>

        {/* ── HERO BANNER SECTION ── */}
        <div style={{
          position: 'relative', borderRadius: 24, overflow: 'hidden',
          marginBottom: 32, border: '1px solid rgba(255,255,255,0.1)',
          background: '#12121f', boxShadow: '0 24px 60px rgba(0,0,0,0.6)'
        }}>
          {/* Background image & gradient overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: event.banner_image ? `url(${event.banner_image})` : event.placeholder,
            backgroundSize: 'cover', backgroundPosition: 'center',
            opacity: 0.38, filter: 'blur(1px)'
          }} />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, #0d0d18 10%, rgba(13,13,24,0.7) 60%, rgba(13,13,24,0.4) 100%)'
          }} />

          {/* Hero Content */}
          <div style={{ position: 'relative', zIndex: 2, padding: '40px 36px 32px' }}>
            {/* Top Badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <span style={{
                background: 'linear-gradient(135deg,#7c3aed,#ec4899)',
                color: '#fff', padding: '5px 14px', borderRadius: 9999,
                fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em'
              }}>
                {event.category}
              </span>

              {event.hot && (
                <span style={{
                  background: 'rgba(239,68,68,0.2)', border: '1px solid rgba(239,68,68,0.4)',
                  color: '#f87171', padding: '4px 12px', borderRadius: 9999,
                  fontSize: '0.75rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 5
                }}>
                  🔥 Selling Fast
                </span>
              )}

              <span style={{
                background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)',
                color: '#e5e7eb', padding: '4px 12px', borderRadius: 9999,
                fontSize: '0.75rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 5
              }}>
                ⭐ {event.rating || '4.9'} ({event.reviews_count || '1k+'} rating)
              </span>

              <span style={{
                background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)',
                color: '#4ade80', padding: '4px 12px', borderRadius: 9999,
                fontSize: '0.75rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 6
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', display: 'inline-block', animation: 'pulseDot 1.5s infinite' }} />
                {liveViewers} orang melihat tiket ini
              </span>
            </div>

            {/* Title & Organizer */}
            <h1 style={{
              fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(1.7rem, 3.8vw, 2.7rem)',
              fontWeight: 900, lineHeight: 1.2, margin: '0 0 14px', color: '#fff',
              textShadow: '0 4px 20px rgba(0,0,0,0.8)'
            }}>
              {event.title}
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
              <div style={{
                width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg,#7c3aed,#3b82f6)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.75rem'
              }}>
                {event.organizer?.[0] || 'O'}
              </div>
              <span style={{ color: '#d1d5db', fontSize: '0.9rem', fontWeight: 500 }}>
                Diselenggarakan oleh <strong style={{ color: '#fff' }}>{event.organizer}</strong>
              </span>
              {event.organizer_verified && (
                <span style={{
                  background: 'rgba(59,130,246,0.2)', border: '1px solid rgba(59,130,246,0.4)',
                  color: '#60a5fa', fontSize: '0.7rem', padding: '2px 8px', borderRadius: 9999, fontWeight: 700
                }}>
                  ✓ Verified Partner
                </span>
              )}
            </div>

            {/* Quick Meta Row with prominent LOCATION CHIP */}
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 14, background: 'rgba(15,15,26,0.7)', backdropFilter: 'blur(12px)',
              padding: '16px 20px', borderRadius: 16, border: '1px solid rgba(255,255,255,0.08)'
            }}>
              {/* Highlighted Location Chip */}
              <div
                onClick={() => setActiveTab('location')}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer',
                  padding: '6px 10px', borderRadius: 10, transition: 'background 0.2s',
                  background: activeTab === 'location' ? 'rgba(124,58,237,0.18)' : 'transparent'
                }}
              >
                <div style={{
                  width: 42, height: 42, borderRadius: 12,
                  background: 'linear-gradient(135deg,rgba(124,58,237,0.3),rgba(236,72,153,0.3))',
                  border: '1px solid rgba(124,58,237,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20
                }}>
                  📍
                </div>
                <div>
                  <p style={{ fontSize: '0.72rem', color: '#a78bfa', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Lokasi & Venue</p>
                  <p style={{ fontSize: '0.92rem', fontWeight: 700, color: '#fff', margin: 0 }}>{event.venue}</p>
                  <p style={{ fontSize: '0.78rem', color: '#9ca3af', margin: 0 }}>{event.city} • <span style={{ color: '#c084fc', textDecoration: 'underline' }}>Lihat Peta →</span></p>
                </div>
              </div>

              {/* Date Chip */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '6px 10px' }}>
                <div style={{
                  width: 42, height: 42, borderRadius: 12, background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20
                }}>
                  📅
                </div>
                <div>
                  <p style={{ fontSize: '0.72rem', color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Tanggal Acara</p>
                  <p style={{ fontSize: '0.92rem', fontWeight: 700, color: '#fff', margin: 0 }}>{fmtDate(event.event_date)}</p>
                  <p style={{ fontSize: '0.78rem', color: '#9ca3af', margin: 0 }}>Waktu {fmtTime(event.event_date)}</p>
                </div>
              </div>

              {/* Countdown Live Badge */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '8px 14px',
                borderRadius: 12, background: 'linear-gradient(135deg,rgba(124,58,237,0.15),rgba(236,72,153,0.15))',
                border: '1px solid rgba(124,58,237,0.3)'
              }}>
                <div style={{ fontSize: 22 }}>⏱️</div>
                <div>
                  <p style={{ fontSize: '0.72rem', color: '#f472b6', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Menuju Event</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 800, fontSize: '0.92rem', color: '#fff' }}>
                    <span>{timeLeft.days}h</span> : <span>{timeLeft.hours}j</span> : <span>{timeLeft.minutes}m</span> : <span style={{ color: '#ec4899' }}>{timeLeft.seconds}d</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── NAVIGATION TABS ── */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10, overflowX: 'auto',
          paddingBottom: 8, marginBottom: 28, borderBottom: '1px solid rgba(255,255,255,0.08)'
        }}>
          {[
            { key: 'tickets', label: '🎟️ Pilihan Tiket' },
            { key: 'location', label: '📍 Lokasi & Rute' },
            { key: 'seatmap', label: '🗺️ Denah Panggung' },
            { key: 'rundown', label: '🕒 Rundown & Lineup' },
            { key: 'faq', label: '📋 Ketentuan & FAQ' },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                padding: '11px 22px', borderRadius: 14, fontSize: '0.88rem', fontWeight: 700,
                border: activeTab === tab.key ? '1px solid rgba(124,58,237,0.6)' : '1px solid rgba(255,255,255,0.08)',
                background: activeTab === tab.key ? 'linear-gradient(135deg,rgba(124,58,237,0.25),rgba(236,72,153,0.2))' : 'rgba(255,255,255,0.03)',
                color: activeTab === tab.key ? '#fff' : '#9ca3af',
                cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap',
                boxShadow: activeTab === tab.key ? '0 6px 18px rgba(124,58,237,0.25)' : 'none'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── TWO COLUMN MAIN LAYOUT ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 390px', gap: 32, alignItems: 'start' }} className="ticket-grid">

          {/* ════ LEFT COLUMN: DYNAMIC TAB CONTENT ════ */}
          <div>

            {/* ──────── TAB 1: TIKET & KATEGORI ──────── */}
            {activeTab === 'tickets' && (
              <div>
                {/* Event Description Card */}
                <div style={{
                  background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 20, padding: 24, marginBottom: 28
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                    <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '1.05rem', margin: 0 }}>
                      Tentang Pertunjukan Ini
                    </h3>
                    <span style={{ fontSize: '0.78rem', color: '#a78bfa', fontWeight: 600 }}>Official Description</span>
                  </div>
                  <p style={{ color: '#d1d5db', lineHeight: 1.8, fontSize: '0.92rem', margin: 0 }}>
                    {event.description}
                  </p>
                </div>

                {/* Section Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
                  <div>
                    <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '1.15rem', margin: 0 }}>
                      Pilih Kategori Tiket
                    </h3>
                    <p style={{ color: '#9ca3af', fontSize: '0.82rem', margin: '4px 0 0' }}>
                      Pilih kategori yang Anda inginkan untuk melanjutkan transaksi
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('seatmap')}
                    style={{
                      background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)',
                      color: '#c084fc', padding: '6px 14px', borderRadius: 10, fontSize: '0.8rem',
                      fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6
                    }}
                  >
                    🗺️ Lihat Denah Panggung
                  </button>
                </div>

                {/* Ticket Cards List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {event.ticket_types?.map(t => {
                    const avail = t.quota - t.sold
                    const pct = Math.min(100, Math.round((t.sold / t.quota) * 100))
                    const isSoldout = avail <= 0
                    const isSelected = selectedTicketId === t.id

                    return (
                      <div
                        key={t.id}
                        onClick={() => {
                          if (!isSoldout) {
                            setSelectedTicketId(t.id)
                            setQty(1)
                          }
                        }}
                        style={{
                          borderRadius: 20, cursor: isSoldout ? 'not-allowed' : 'pointer',
                          border: isSelected ? '2px solid #a855f7' : '1px solid rgba(255,255,255,0.08)',
                          background: isSelected
                            ? 'linear-gradient(135deg, rgba(124,58,237,0.12), rgba(236,72,153,0.06))'
                            : 'rgba(255,255,255,0.03)',
                          padding: 22, transition: 'all 0.25s ease',
                          boxShadow: isSelected ? '0 12px 30px rgba(124,58,237,0.22)' : 'none',
                          opacity: isSoldout ? 0.55 : 1, position: 'relative', overflow: 'hidden'
                        }}
                      >
                        {/* Selected accent glow bar */}
                        {isSelected && (
                          <div style={{
                            position: 'absolute', top: 0, left: 0, right: 0, height: 4,
                            background: 'linear-gradient(90deg,#7c3aed,#ec4899)'
                          }} />
                        )}

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, marginBottom: 12 }}>
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                              <h4 style={{ fontWeight: 800, fontSize: '1.05rem', margin: 0, color: '#fff' }}>
                                {t.name}
                              </h4>
                              {t.badge && (
                                <span style={{
                                  background: isSelected ? 'linear-gradient(135deg,#7c3aed,#ec4899)' : 'rgba(255,255,255,0.08)',
                                  color: '#fff', fontSize: '0.68rem', fontWeight: 800,
                                  padding: '3px 9px', borderRadius: 9999, textTransform: 'uppercase'
                                }}>
                                  {t.badge}
                                </span>
                              )}
                            </div>
                            <p style={{ color: '#9ca3af', fontSize: '0.84rem', margin: 0, lineHeight: 1.5 }}>
                              {t.description}
                            </p>
                          </div>

                          <div style={{ textAlign: 'right', flexShrink: 0 }}>
                            <p style={{
                              fontWeight: 900, fontSize: '1.25rem', margin: '0 0 4px',
                              background: 'linear-gradient(135deg,#c084fc,#f472b6)',
                              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
                            }}>
                              {fmt(t.price)}
                            </p>
                            <span style={{ fontSize: '0.72rem', color: '#6b7280' }}>/ tiket</span>
                          </div>
                        </div>

                        {/* Perks / Inclusions */}
                        {t.perks && t.perks.length > 0 && (
                          <div style={{
                            display: 'flex', flexWrap: 'wrap', gap: 8, margin: '14px 0',
                            paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.06)'
                          }}>
                            {t.perks.map((p, pIdx) => (
                              <span key={pIdx} style={{
                                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)',
                                color: '#d1d5db', fontSize: '0.75rem', padding: '3px 10px', borderRadius: 8,
                                display: 'inline-flex', alignItems: 'center', gap: 5
                              }}>
                                <span style={{ color: '#4ade80' }}>✓</span> {p}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Quota bar & Status */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 10 }}>
                          <div style={{ flex: 1, height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
                            <div style={{
                              height: '100%', width: `${pct}%`,
                              background: pct > 85 ? 'linear-gradient(90deg,#ef4444,#dc2626)' : pct > 50 ? 'linear-gradient(90deg,#f59e0b,#d97706)' : 'linear-gradient(90deg,#10b981,#059669)',
                              borderRadius: 3, transition: 'width 0.4s ease'
                            }} />
                          </div>
                          <span style={{
                            fontSize: '0.76rem', fontWeight: 700,
                            color: isSoldout ? '#ef4444' : pct > 80 ? '#f87171' : '#9ca3af', whiteSpace: 'nowrap'
                          }}>
                            {isSoldout ? '🚫 Habis Terjual' : `${avail.toLocaleString()} tersisa (${100 - pct}% tersisa)`}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* ──────── TAB 2: LOKASI & VENUE (FEATURED) ──────── */}
            {activeTab === 'location' && (
              <div>
                {/* Venue Headline Box */}
                <div style={{
                  background: 'linear-gradient(135deg,rgba(124,58,237,0.12),rgba(59,130,246,0.08))',
                  border: '1px solid rgba(124,58,237,0.3)', borderRadius: 24, padding: 28, marginBottom: 24
                }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
                    <div>
                      <span style={{
                        background: 'rgba(124,58,237,0.25)', border: '1px solid rgba(124,58,237,0.4)',
                        color: '#d8b4fe', padding: '4px 12px', borderRadius: 9999, fontSize: '0.75rem', fontWeight: 800,
                        textTransform: 'uppercase', letterSpacing: '0.05em', display: 'inline-block', marginBottom: 10
                      }}>
                        📍 Tempat Acara Resmi
                      </span>
                      <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 900, fontSize: '1.4rem', color: '#fff', margin: '0 0 6px' }}>
                        {event.venue_details?.name || event.venue}
                      </h3>
                      <p style={{ color: '#9ca3af', fontSize: '0.9rem', margin: 0 }}>
                        Kota {event.city}, Indonesia
                      </p>
                    </div>

                    <div style={{ display: 'flex', gap: 10 }}>
                      <button
                        onClick={handleCopyAddress}
                        style={{
                          background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.14)',
                          color: '#fff', padding: '9px 16px', borderRadius: 12, fontSize: '0.82rem',
                          fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
                          transition: 'all 0.2s'
                        }}
                      >
                        📋 Salin Alamat
                      </button>
                      <a
                        href={event.venue_details?.google_map_url || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.venue + ' ' + event.city)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          background: 'linear-gradient(135deg,#7c3aed,#ec4899)',
                          color: '#fff', padding: '9px 18px', borderRadius: 12, fontSize: '0.82rem',
                          fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6,
                          boxShadow: '0 6px 16px rgba(124,58,237,0.35)', transition: 'all 0.2s'
                        }}
                      >
                        🧭 Buka Google Maps ↗
                      </a>
                    </div>
                  </div>

                  {/* Full Address Display Box */}
                  <div style={{
                    marginTop: 20, padding: '16px 20px', borderRadius: 16,
                    background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.06)',
                    display: 'flex', alignItems: 'center', gap: 12
                  }}>
                    <span style={{ fontSize: 24 }}>🏢</span>
                    <div>
                      <p style={{ fontSize: '0.72rem', color: '#a78bfa', fontWeight: 700, textTransform: 'uppercase', margin: '0 0 2px' }}>
                        Alamat Lengkap
                      </p>
                      <p style={{ fontSize: '0.88rem', color: '#e5e7eb', margin: 0, lineHeight: 1.5 }}>
                        {event.venue_details?.address || `${event.venue}, ${event.city}`}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Interactive Embedded Google Maps */}
                <div style={{
                  background: '#111122', border: '1px solid rgba(255,255,255,0.09)',
                  borderRadius: 24, padding: 16, marginBottom: 28, overflow: 'hidden'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px 14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#22c55e' }} />
                      <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff' }}>Peta Lokasi Interaktif</span>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Navigasi GPS Siap Pakai</span>
                  </div>

                  <div style={{ borderRadius: 16, overflow: 'hidden', height: 320, position: 'relative' }}>
                    <iframe
                      title="Lokasi Acara"
                      width="100%"
                      height="100%"
                      style={{ border: 0, filter: 'contrast(1.05) brightness(0.95)' }}
                      loading="lazy"
                      allowFullScreen
                      referrerPolicy="no-referrer-when-downgrade"
                      src={`https://maps.google.com/maps?q=${encodeURIComponent(event.venue_details?.map_query || (event.venue + ' ' + event.city))}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                    />
                  </div>
                </div>

                {/* Transit & Access Guide */}
                <div style={{
                  background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 24, padding: 26, marginBottom: 28
                }}>
                  <h4 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '1.05rem', margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
                    🚗 Panduan Rute & Transportasi
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {(event.venue_details?.transit || []).map((t, idx) => (
                      <div key={idx} style={{
                        padding: '14px 18px', borderRadius: 14,
                        background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)',
                        display: 'flex', alignItems: 'flex-start', gap: 12
                      }}>
                        <span style={{ fontWeight: 800, fontSize: '0.9rem', color: '#c084fc', minWidth: 150 }}>
                          {t.type}
                        </span>
                        <p style={{ fontSize: '0.85rem', color: '#d1d5db', margin: 0, lineHeight: 1.5, flex: 1 }}>
                          {t.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Venue Facilities Grid */}
                <div style={{
                  background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 24, padding: 26, marginBottom: 28
                }}>
                  <h4 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '1.05rem', margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
                    ✨ Fasilitas di Venue
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
                    {(event.venue_details?.facilities || []).map((f, idx) => (
                      <div key={idx} style={{
                        padding: '16px 18px', borderRadius: 16,
                        background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)'
                      }}>
                        <div style={{ fontSize: 24, marginBottom: 8 }}>{f.icon}</div>
                        <h5 style={{ fontWeight: 700, fontSize: '0.9rem', color: '#fff', margin: '0 0 4px' }}>{f.name}</h5>
                        <p style={{ fontSize: '0.78rem', color: '#9ca3af', margin: 0, lineHeight: 1.4 }}>{f.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Gate & Entry Rules */}
                <div style={{
                  padding: '20px 24px', borderRadius: 20,
                  background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.25)',
                  display: 'flex', alignItems: 'center', gap: 16
                }}>
                  <div style={{ fontSize: 32 }}>🚪</div>
                  <div>
                    <h5 style={{ fontWeight: 800, fontSize: '0.95rem', color: '#c084fc', margin: '0 0 4px' }}>
                      Informasi Pintu Masuk & Gate
                    </h5>
                    <p style={{ fontSize: '0.85rem', color: '#d1d5db', margin: 0, lineHeight: 1.5 }}>
                      {event.venue_details?.gate_info || 'Open Gate 15.00 WIB. Disarankan tiba minimal 1 jam sebelum gerbang dibuka untuk kemudahan registrasi dan penukaran wristband.'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ──────── TAB 3: DENAH PANGGUNG (SEAT MAP) ──────── */}
            {activeTab === 'seatmap' && (
              <div style={{
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 24, padding: 28, marginBottom: 28
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                  <div>
                    <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '1.2rem', margin: 0 }}>
                      Denah Panggung & Tata Letak
                    </h3>
                    <p style={{ color: '#9ca3af', fontSize: '0.82rem', margin: '4px 0 0' }}>
                      Klik pada area denah untuk memilih kategori tiket langsung
                    </p>
                  </div>
                  <span style={{
                    background: 'rgba(124,58,237,0.2)', color: '#c084fc',
                    fontSize: '0.75rem', fontWeight: 700, padding: '4px 12px', borderRadius: 9999
                  }}>
                    Interactive Layout
                  </span>
                </div>

                {/* Visual Concert Hall Stage Layout Graphic */}
                <div style={{
                  background: '#0a0a14', border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 20, padding: '36px 20px', textAlign: 'center', position: 'relative'
                }}>
                  {/* Stage Element */}
                  <div style={{
                    maxWidth: 420, margin: '0 auto 28px', padding: '16px 24px',
                    borderRadius: '16px 16px 40px 40px',
                    background: 'linear-gradient(180deg,#7c3aed,#4c1d95)',
                    border: '2px solid #a855f7',
                    boxShadow: '0 0 35px rgba(124,58,237,0.6)',
                    color: '#fff', fontWeight: 900, letterSpacing: '0.12em', fontSize: '1rem',
                    textTransform: 'uppercase'
                  }}>
                    🎤 PANGGUNG UTAMA / MAIN STAGE
                  </div>

                  {/* Soundwave effect light */}
                  <div style={{
                    width: 220, height: 16, margin: '-18px auto 26px',
                    background: 'radial-gradient(ellipse at center, rgba(236,72,153,0.8), transparent 70%)',
                    filter: 'blur(4px)'
                  }} />

                  {/* VIP / Center Floor Section */}
                  <div style={{ maxWidth: 440, margin: '0 auto 16px' }}>
                    <div
                      onClick={() => {
                        const vip = event.ticket_types?.find(t => t.name.toLowerCase().includes('vip')) || event.ticket_types?.[event.ticket_types.length - 1]
                        if (vip) setSelectedTicketId(vip.id)
                      }}
                      style={{
                        padding: '16px', borderRadius: 14,
                        background: selectedTicketId === event.ticket_types?.find(t => t.name.toLowerCase().includes('vip'))?.id
                          ? 'rgba(236,72,153,0.3)' : 'rgba(236,72,153,0.12)',
                        border: selectedTicketId === event.ticket_types?.find(t => t.name.toLowerCase().includes('vip'))?.id
                          ? '2px solid #ec4899' : '1px dashed rgba(236,72,153,0.4)',
                        cursor: 'pointer', transition: 'all 0.2s', marginBottom: 12
                      }}
                    >
                      <p style={{ fontWeight: 800, fontSize: '0.95rem', color: '#f472b6', margin: 0 }}>
                        ⭐ VIP DIAMOND / VIP FLOOR
                      </p>
                      <span style={{ fontSize: '0.74rem', color: '#d1d5db' }}>Front row, direct stage viewing</span>
                    </div>

                    {/* Festival Standing Pit */}
                    <div
                      onClick={() => {
                        const fest = event.ticket_types?.find(t => t.name.toLowerCase().includes('festival') || t.name.toLowerCase().includes('regular')) || event.ticket_types?.[0]
                        if (fest) setSelectedTicketId(fest.id)
                      }}
                      style={{
                        padding: '24px 16px', borderRadius: 14,
                        background: selectedTicketId === event.ticket_types?.[0]?.id
                          ? 'rgba(124,58,237,0.35)' : 'rgba(124,58,237,0.12)',
                        border: selectedTicketId === event.ticket_types?.[0]?.id
                          ? '2px solid #a855f7' : '1px solid rgba(124,58,237,0.3)',
                        cursor: 'pointer', transition: 'all 0.2s'
                      }}
                    >
                      <p style={{ fontWeight: 800, fontSize: '0.95rem', color: '#c084fc', margin: 0 }}>
                        🎪 FESTIVAL STANDING AREA
                      </p>
                      <span style={{ fontSize: '0.74rem', color: '#9ca3af' }}>Paling dekat & bebas bergerak di tengah</span>
                    </div>
                  </div>

                  {/* Tribune Wings (Left, Right, Center) */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, maxWidth: 520, margin: '14px auto 0' }}>
                    <div
                      onClick={() => {
                        if (event.ticket_types?.[1]) setSelectedTicketId(event.ticket_types[1].id)
                      }}
                      style={{
                        padding: '16px 12px', borderRadius: 14,
                        background: selectedTicketId === event.ticket_types?.[1]?.id
                          ? 'rgba(59,130,246,0.35)' : 'rgba(59,130,246,0.1)',
                        border: selectedTicketId === event.ticket_types?.[1]?.id
                          ? '2px solid #60a5fa' : '1px solid rgba(59,130,246,0.25)',
                        cursor: 'pointer', transition: 'all 0.2s'
                      }}
                    >
                      <p style={{ fontWeight: 800, fontSize: '0.88rem', color: '#93c5fd', margin: 0 }}>
                        TRIBUNE A (Sisi Kiri)
                      </p>
                      <span style={{ fontSize: '0.72rem', color: '#9ca3af' }}>Elevated Seating</span>
                    </div>

                    <div
                      onClick={() => {
                        if (event.ticket_types?.[1]) setSelectedTicketId(event.ticket_types[1].id)
                      }}
                      style={{
                        padding: '16px 12px', borderRadius: 14,
                        background: selectedTicketId === event.ticket_types?.[1]?.id
                          ? 'rgba(59,130,246,0.35)' : 'rgba(59,130,246,0.1)',
                        border: selectedTicketId === event.ticket_types?.[1]?.id
                          ? '2px solid #60a5fa' : '1px solid rgba(59,130,246,0.25)',
                        cursor: 'pointer', transition: 'all 0.2s'
                      }}
                    >
                      <p style={{ fontWeight: 800, fontSize: '0.88rem', color: '#93c5fd', margin: 0 }}>
                        TRIBUNE B (Sisi Kanan)
                      </p>
                      <span style={{ fontSize: '0.72rem', color: '#9ca3af' }}>Elevated Seating</span>
                    </div>
                  </div>

                  <p style={{ fontSize: '0.76rem', color: '#6b7280', marginTop: 24, marginBottom: 0 }}>
                    💡 Catatan: Skema denah panggung hanya sebagai ilustrasi proporsional tata ruang venue acara.
                  </p>
                </div>
              </div>
            )}

            {/* ──────── TAB 4: RUNDOWN & LINEUP ──────── */}
            {activeTab === 'rundown' && (
              <div>
                {/* Lineup Card */}
                <div style={{
                  background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 24, padding: 26, marginBottom: 24
                }}>
                  <h4 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '1.1rem', margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
                    🎸 Bintang Tamu & Pengisi Acara
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
                    {(event.lineup || []).map((art, idx) => (
                      <div key={idx} style={{
                        padding: '16px 18px', borderRadius: 16, background: 'rgba(255,255,255,0.02)',
                        border: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: 14
                      }}>
                        <div style={{
                          width: 44, height: 44, borderRadius: 14,
                          background: 'linear-gradient(135deg,#7c3aed,#ec4899)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20
                        }}>
                          🎤
                        </div>
                        <div>
                          <p style={{ fontWeight: 800, fontSize: '0.95rem', color: '#fff', margin: 0 }}>{art.name}</p>
                          <p style={{ fontSize: '0.78rem', color: '#9ca3af', margin: 0 }}>{art.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rundown Timeline */}
                <div style={{
                  background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 24, padding: 26
                }}>
                  <h4 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '1.1rem', margin: '0 0 20px', display: 'flex', alignItems: 'center', gap: 8 }}>
                    🕒 Jadwal & Timeline Acara
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 18, position: 'relative', paddingLeft: 24 }}>
                    {/* Vertical line indicator */}
                    <div style={{
                      position: 'absolute', top: 12, bottom: 12, left: 7, width: 2,
                      background: 'linear-gradient(to bottom, #7c3aed, #ec4899, #3b82f6)'
                    }} />

                    {(event.rundown || []).map((r, idx) => (
                      <div key={idx} style={{ position: 'relative' }}>
                        {/* Dot */}
                        <div style={{
                          position: 'absolute', left: -24, top: 4, width: 14, height: 14,
                          borderRadius: '50%', background: '#7c3aed', border: '3px solid #08080d'
                        }} />
                        <span style={{
                          fontSize: '0.78rem', fontWeight: 800, color: '#f472b6',
                          background: 'rgba(236,72,153,0.1)', padding: '2px 8px', borderRadius: 6
                        }}>
                          {r.time}
                        </span>
                        <h5 style={{ fontWeight: 800, fontSize: '0.98rem', color: '#fff', margin: '6px 0 2px' }}>
                          {r.title}
                        </h5>
                        <p style={{ fontSize: '0.84rem', color: '#9ca3af', margin: 0, lineHeight: 1.4 }}>
                          {r.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ──────── TAB 5: FAQ & KETENTUAN ──────── */}
            {activeTab === 'faq' && (
              <div style={{
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 24, padding: 26, marginBottom: 28
              }}>
                <h4 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '1.15rem', margin: '0 0 18px' }}>
                  Syarat & Ketentuan Pengunjung
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {[
                    { q: 'Bagaimana cara penukaran e-tiket ke wristband?', a: 'Tunjukkan e-ticket PDF/QR Code yang dikirim ke email atau akun Konserku Anda bersama kartu identitas resmi (KTP / SIM / Paspor) yang sesuai pada saat penukaran gelang di venue.' },
                    { q: 'Apakah tiket yang sudah dibeli bisa direfund atau ditukar?', a: 'Semua penjualan tiket bersifat final dan non-refundable (tidak dapat diuangkan kembali), kecuali terjadi pembatalan resmi dari pihak promotor acara.' },
                    { q: 'Apa saja barang yang dilarang dibawa ke dalam arena?', a: 'Dilarang membawa senjata tajam, kembang api/flare, kamera profesional (DSLR / lensa lepas), botol kaca, makanan & minuman dari luar, dan zat terlarang.' },
                    { q: 'Berapa batas usia minimal penonton?', a: 'Penonton di bawah usia 12 tahun wajib didampingi oleh orang tua atau wali dewasa yang memiliki tiket sah di kategori yang sama.' },
                    { q: 'Apakah tersedia fasilitas untuk pengunjung disabilitas?', a: 'Ya, venue menyediakan ramp akses ramah kursi roda, lift, dan petugas khusus yang siap mendampingi menuju platform tempat duduk disabilitas.' },
                  ].map((faq, idx) => (
                    <div key={idx} style={{
                      padding: '16px 20px', borderRadius: 16,
                      background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)'
                    }}>
                      <h5 style={{ fontWeight: 700, fontSize: '0.92rem', color: '#c084fc', margin: '0 0 6px' }}>
                        {faq.q}
                      </h5>
                      <p style={{ fontSize: '0.85rem', color: '#9ca3af', margin: 0, lineHeight: 1.6 }}>
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* ════ RIGHT COLUMN: STICKY CHECKOUT SUMMARY ════ */}
          <div style={{ position: 'sticky', top: 90 }}>
            <div style={{
              background: '#111120', border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 24, padding: 26, boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
              position: 'relative', overflow: 'hidden'
            }}>
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
                <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '1.1rem', margin: 0, color: '#fff' }}>
                  Ringkasan Pesanan
                </h3>
                <span style={{ fontSize: '0.74rem', color: '#22c55e', fontWeight: 700, background: 'rgba(34,197,94,0.12)', padding: '2px 8px', borderRadius: 6 }}>
                  ● Stok Aktif
                </span>
              </div>

              {chosenType ? (
                <>
                  {/* Selected Ticket Card */}
                  <div style={{
                    background: 'linear-gradient(135deg, rgba(124,58,237,0.12), rgba(236,72,153,0.08))',
                    border: '1px solid rgba(124,58,237,0.3)', borderRadius: 16, padding: '14px 16px', marginBottom: 18
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                      <p style={{ fontSize: '0.75rem', color: '#c084fc', fontWeight: 700, textTransform: 'uppercase', margin: 0 }}>
                        Kategori Terpilih
                      </p>
                      <span style={{ fontSize: '0.72rem', color: '#4ade80' }}>Tersedia</span>
                    </div>
                    <p style={{ fontWeight: 800, fontSize: '1.05rem', margin: '0 0 2px', color: '#fff' }}>
                      {chosenType.name}
                    </p>
                    <p style={{ fontSize: '0.85rem', color: '#9ca3af', margin: 0 }}>
                      {fmt(chosenType.price)} <span style={{ fontSize: '0.75rem' }}>/ orang</span>
                    </p>
                  </div>

                  {/* Quantity Stepper */}
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                      <label style={{ fontSize: '0.82rem', color: '#d1d5db', fontWeight: 600 }}>Jumlah Tiket</label>
                      <span style={{ fontSize: '0.74rem', color: '#6b7280' }}>
                        Maks {Math.min(availableQuota, 10)} tiket
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <button
                        onClick={() => setQty(q => Math.max(1, q - 1))}
                        disabled={qty <= 1}
                        style={{
                          width: 40, height: 40, borderRadius: 12,
                          background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
                          color: '#fff', fontSize: 20, cursor: qty <= 1 ? 'not-allowed' : 'pointer',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: qty <= 1 ? 0.4 : 1
                        }}
                      >
                        −
                      </button>
                      <span style={{ fontWeight: 900, fontSize: '1.3rem', minWidth: 40, textAlign: 'center', color: '#fff' }}>
                        {qty}
                      </span>
                      <button
                        onClick={() => setQty(q => Math.min(Math.min(availableQuota, 10), q + 1))}
                        disabled={qty >= Math.min(availableQuota, 10)}
                        style={{
                          width: 40, height: 40, borderRadius: 12,
                          background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
                          color: '#fff', fontSize: 20, cursor: qty >= Math.min(availableQuota, 10) ? 'not-allowed' : 'pointer',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          opacity: qty >= Math.min(availableQuota, 10) ? 0.4 : 1
                        }}
                      >
                        +
                      </button>
                      <span style={{ fontSize: '0.78rem', color: '#9ca3af', marginLeft: 4 }}>
                        = {fmt(subtotal)}
                      </span>
                    </div>
                  </div>

                  {/* Promo Code Box */}
                  <div style={{ marginBottom: 20 }}>
                    <p style={{ fontSize: '0.82rem', color: '#d1d5db', fontWeight: 600, marginBottom: 8 }}>
                      Kode Promo / Voucher
                    </p>
                    <form onSubmit={handleApplyPromo} style={{ display: 'flex', gap: 8 }}>
                      <input
                        type="text"
                        placeholder="Contoh: KONSERHEMAT"
                        value={promoCode}
                        onChange={e => setPromoCode(e.target.value)}
                        style={{
                          flex: 1, padding: '10px 14px', borderRadius: 10,
                          background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)',
                          color: '#fff', fontSize: '0.82rem', outline: 'none'
                        }}
                      />
                      <button
                        type="submit"
                        style={{
                          padding: '10px 16px', borderRadius: 10,
                          background: 'rgba(124,58,237,0.3)', border: '1px solid rgba(124,58,237,0.5)',
                          color: '#c084fc', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer'
                        }}
                      >
                        Pasang
                      </button>
                    </form>
                    {promoError && (
                      <p style={{ fontSize: '0.72rem', color: '#ef4444', margin: '4px 0 0' }}>{promoError}</p>
                    )}
                    {appliedPromo && (
                      <div style={{
                        marginTop: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        fontSize: '0.75rem', color: '#4ade80', background: 'rgba(34,197,94,0.1)',
                        padding: '4px 10px', borderRadius: 8
                      }}>
                        <span>✓ Voucher {appliedPromo.code} aktif</span>
                        <button
                          type="button"
                          onClick={() => setAppliedPromo(null)}
                          style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '0.75rem' }}
                        >
                          Hapus
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Pricing Breakdown */}
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 14, marginBottom: 20 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{ color: '#9ca3af', fontSize: '0.82rem' }}>Subtotal ({qty} tiket)</span>
                      <span style={{ fontSize: '0.82rem', color: '#d1d5db' }}>{fmt(subtotal)}</span>
                    </div>
                    {discountAmount > 0 && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                        <span style={{ color: '#4ade80', fontSize: '0.82rem' }}>Diskon Promo</span>
                        <span style={{ fontSize: '0.82rem', color: '#4ade80' }}>−{fmt(discountAmount)}</span>
                      </div>
                    )}
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{ color: '#9ca3af', fontSize: '0.82rem' }}>Biaya Layanan & Admin</span>
                      <span style={{ fontSize: '0.82rem', color: '#22c55e', fontWeight: 700 }}>GRATIS</span>
                    </div>

                    <div style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      marginTop: 12, paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.08)'
                    }}>
                      <div>
                        <span style={{ fontWeight: 700, fontSize: '0.92rem', color: '#fff', display: 'block' }}>Total Bayar</span>
                        <span style={{ fontSize: '0.72rem', color: '#6b7280' }}>Termasuk Pajak Daerah</span>
                      </div>
                      <span style={{
                        fontWeight: 900, fontSize: '1.35rem',
                        background: 'linear-gradient(135deg,#c084fc,#f472b6)',
                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
                      }}>
                        {fmt(total)}
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <div style={{ textAlign: 'center', padding: '36px 0', color: '#6b7280' }}>
                  <div style={{ fontSize: 44, marginBottom: 10 }}>🎫</div>
                  <p style={{ fontSize: '0.88rem', margin: 0 }}>Silakan pilih kategori tiket terlebih dahulu</p>
                </div>
              )}

              {/* Checkout CTA Button */}
              <button
                onClick={handleBuy}
                disabled={!chosenType || availableQuota <= 0}
                style={{
                  width: '100%', padding: '16px', borderRadius: 14,
                  background: chosenType && availableQuota > 0
                    ? 'linear-gradient(135deg,#7c3aed,#ec4899)'
                    : 'rgba(255,255,255,0.06)',
                  color: chosenType && availableQuota > 0 ? '#fff' : '#4b5563',
                  fontWeight: 800, fontSize: '1rem', border: 'none',
                  cursor: chosenType && availableQuota > 0 ? 'pointer' : 'not-allowed',
                  boxShadow: chosenType && availableQuota > 0 ? '0 10px 28px rgba(124,58,237,0.45)' : 'none',
                  transition: 'all 0.25s ease'
                }}
              >
                {chosenType ? (availableQuota > 0 ? 'Lanjut Pembayaran →' : 'Tiket Habis') : 'Pilih Tiket Dulu'}
              </button>

              {/* Trust Badges */}
              <div style={{
                marginTop: 20, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.06)',
                display: 'flex', flexDirection: 'column', gap: 8
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.75rem', color: '#9ca3af' }}>
                  <span style={{ color: '#22c55e' }}>🛡️</span> Garansi 100% Tiket Resmi & Bebas Calo
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.75rem', color: '#9ca3af' }}>
                  <span style={{ color: '#38bdf8' }}>⚡</span> E-Tiket Instan langsung terbit di email & WA
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.75rem', color: '#9ca3af' }}>
                  <span style={{ color: '#f59e0b' }}>🔒</span> Pembayaran Terenkripsi Bank & QRIS Aman
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* ── MOBILE STICKY BOTTOM CHECKOUT BAR ── */}
      <div className="mobile-bottom-bar" style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        background: 'rgba(12,12,22,0.95)', backdropFilter: 'blur(16px)',
        borderTop: '1px solid rgba(255,255,255,0.1)', padding: '12px 20px',
        display: 'none', alignItems: 'center', justifyContent: 'space-between', zIndex: 50
      }}>
        <div>
          <span style={{ fontSize: '0.72rem', color: '#9ca3af', display: 'block' }}>
            {chosenType?.name || 'Pilih Tiket'} • {qty} tiket
          </span>
          <span style={{
            fontSize: '1.15rem', fontWeight: 900,
            background: 'linear-gradient(135deg,#c084fc,#f472b6)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
          }}>
            {fmt(total)}
          </span>
        </div>

        <button
          onClick={handleBuy}
          disabled={!chosenType || availableQuota <= 0}
          style={{
            padding: '12px 24px', borderRadius: 12,
            background: chosenType ? 'linear-gradient(135deg,#7c3aed,#ec4899)' : 'rgba(255,255,255,0.1)',
            color: '#fff', fontWeight: 800, fontSize: '0.9rem', border: 'none', cursor: 'pointer'
          }}
        >
          Beli Sekarang →
        </button>
      </div>

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 860px) {
          .ticket-grid {
            grid-template-columns: 1fr !important;
          }
          .mobile-bottom-bar {
            display: flex !important;
          }
        }
      `}</style>

    </div>
  )
}
