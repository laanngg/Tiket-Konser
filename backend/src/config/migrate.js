/**
 * Jalankan: node src/config/migrate.js
 * Membuat semua tabel yang diperlukan di database konserku
 */
const pool = require('./database')

async function migrate() {
  const conn = await pool.getConnection()
  try {
    console.log('🔄 Menjalankan migrasi...')

    await conn.query(`CREATE TABLE IF NOT EXISTS users (
      id          INT AUTO_INCREMENT PRIMARY KEY,
      name        VARCHAR(120) NOT NULL,
      email       VARCHAR(180) NOT NULL UNIQUE,
      password    VARCHAR(255) NOT NULL,
      phone       VARCHAR(20),
      role        ENUM('user','admin') DEFAULT 'user',
      created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
    )`)

    await conn.query(`CREATE TABLE IF NOT EXISTS events (
      id          INT AUTO_INCREMENT PRIMARY KEY,
      title       VARCHAR(200) NOT NULL,
      description TEXT,
      category    VARCHAR(60),
      venue       VARCHAR(200),
      city        VARCHAR(100),
      event_date  DATETIME,
      image_url   VARCHAR(500),
      organizer   VARCHAR(150),
      status      ENUM('active','soldout','cancelled') DEFAULT 'active',
      created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
    )`)

    await conn.query(`CREATE TABLE IF NOT EXISTS ticket_types (
      id          INT AUTO_INCREMENT PRIMARY KEY,
      event_id    INT NOT NULL,
      name        VARCHAR(80) NOT NULL,
      price       DECIMAL(12,0) NOT NULL,
      quota       INT NOT NULL DEFAULT 0,
      sold        INT NOT NULL DEFAULT 0,
      description VARCHAR(300),
      FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
    )`)

    await conn.query(`CREATE TABLE IF NOT EXISTS orders (
      id              INT AUTO_INCREMENT PRIMARY KEY,
      order_code      VARCHAR(30) NOT NULL UNIQUE,
      user_name       VARCHAR(120) NOT NULL,
      user_email      VARCHAR(180) NOT NULL,
      user_phone      VARCHAR(20),
      event_id        INT NOT NULL,
      ticket_type_id  INT NOT NULL,
      quantity        INT NOT NULL DEFAULT 1,
      unit_price      DECIMAL(12,0) NOT NULL,
      total_price     DECIMAL(12,0) NOT NULL,
      payment_method  VARCHAR(60),
      payment_status  ENUM('pending','paid','failed','refunded') DEFAULT 'pending',
      payment_proof   VARCHAR(500),
      created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
      paid_at         DATETIME,
      FOREIGN KEY (event_id)       REFERENCES events(id),
      FOREIGN KEY (ticket_type_id) REFERENCES ticket_types(id)
    )`)

    await conn.query(`CREATE TABLE IF NOT EXISTS tickets (
      id          INT AUTO_INCREMENT PRIMARY KEY,
      order_id    INT NOT NULL,
      ticket_code VARCHAR(40) NOT NULL UNIQUE,
      holder_name VARCHAR(120),
      is_used     TINYINT(1) DEFAULT 0,
      FOREIGN KEY (order_id) REFERENCES orders(id)
    )`)

    // Seed: default admin
    const bcrypt = require('bcrypt')
    const hash = await bcrypt.hash('admin123', 10)
    await conn.query(`
      INSERT IGNORE INTO users (name, email, password, role)
      VALUES ('Administrator', 'admin@konserku.id', ?, 'admin')
    `, [hash])

    // Seed: sample events
    await conn.query(`
      INSERT IGNORE INTO events (id, title, description, category, venue, city, event_date, organizer, status) VALUES
      (1, 'UNGU – Waktu yang Dinanti Final Chapter', 'Konser penutup era baru UNGU yang penuh kenangan',  'Konser',  'ICE BSD', 'Tangerang', '2026-10-30 19:30:00', 'TipTip', 'active'),
      (2, 'Beyond Eyes 15th Anniversary – Surabaya', 'Perayaan 15 tahun perjalanan musik Beyond Eyes',    'Konser',  'Surabaya Convention Center', 'Surabaya', '2026-08-28 19:00:00', 'Maryhouse Media', 'active'),
      (3, 'LaLaLa Festival 2026',                    'Festival musik multi-genre terbesar di Jakarta',    'Festival','Gambir Expo', 'Jakarta', '2026-08-22 14:00:00', 'The Group', 'active'),
      (4, 'Westlife World Tour 2026',                'Konser boyband legendaris asal Irlandia',           'Konser',  'GBK Arena', 'Jakarta', '2026-09-15 20:00:00', 'Live Nation', 'active'),
      (5, 'Synchronize Festival 2026',               'Festival indie terpopuler se-Indonesia',            'Festival','Gambir Expo', 'Jakarta', '2026-10-03 14:00:00', 'Demajors', 'active'),
      (6, 'Twilite Orchestra 35th Anniversary',      'Perayaan 35 tahun Twilite Orchestra',               'Theater', 'Usmar Ismail Hall', 'Jakarta', '2026-09-06 16:00:00', 'TWILITE ORCHESTRA', 'soldout')
    `)

    // Seed: ticket types
    await conn.query(`
      INSERT IGNORE INTO ticket_types (id, event_id, name, price, quota, sold, description) VALUES
      (1, 1, 'Festival', 550000, 5000, 3200, 'Area festival standing'),
      (2, 1, 'Tribune A', 800000, 2000, 1500, 'Tribune A dengan view terbaik'),
      (3, 2, 'Regular',   900000, 3000, 1800, 'Tiket regular'),
      (4, 2, 'VIP',      1700000, 500,  480,  'VIP dengan meet & greet'),
      (5, 3, 'Day Pass',  800000, 8000, 4500, 'Tiket 1 hari'),
      (6, 3, 'Full Pass',1500000, 2000, 1200, 'Tiket 2 hari penuh'),
      (7, 4, 'CAT 3',    750000, 5000, 3800, 'Kategori 3'),
      (8, 4, 'CAT 2',   1200000, 2000, 1900, 'Kategori 2'),
      (9, 5, 'Regular',  600000, 10000, 6000, 'Tiket regular'),
      (10,5, 'VIP',     1200000, 1000,  800, 'Area VIP')
    `)

    console.log('✅ Migrasi selesai!')
  } catch (err) {
    console.error('❌ Migrasi gagal:', err.message)
  } finally {
    conn.release()
    process.exit(0)
  }
}

migrate()
