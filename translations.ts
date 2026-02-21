
export type Language = 'ID' | 'EN';

export const translations = {
  ID: {
    nav: {
      solusi: 'Solusi',
      layanan: 'Layanan',
      portfolio: 'Portfolio',
      kenapa: 'Kenapa Kami',
      konsultasi: 'Konsultasi Gratis',
    },
    hero: {
      badge: 'Partner Transformasi Digital',
      headline: 'Bikin Website &',
      headlineGradient: 'Aplikasi Tanpa Ribet.',
      subheadline: 'Biar Kamu Fokus Jualan. Kami bantu UMKM & startup punya sistem digital yang simpel, keren, dan benar-benar membantu bisnis tumbuh pesat.',
      ctaPrimary: 'Konsultasi Gratis Sekarang',
      ctaSecondary: 'Lihat Portfolio',
      check1: 'Desain Modern',
      check2: 'Optimasi SEO',
      check3: 'Support Gratis',
    },
    problem: {
      badge: 'Masalah Umum Bisnis',
      headline: 'Kenapa Banyak Bisnis Susah Naik Level?',
      subheadline: 'Punya bisnis tapi masih ngandelin cara manual? Tenang, kamu nggak sendirian. Masalah utamanya adalah sistemnya belum siap untuk tumbuh.',
      item1: { title: 'Website cuma formalitas', desc: 'Udah punya web tapi sepi & nggak ngaruh ke penjualan.' },
      item2: { title: 'Order masih dicatat manual', desc: 'Pusing rekap data, sering ada yang nyelip atau typo.' },
      item3: { title: 'Admin kewalahan', desc: 'Terlalu banyak chat manual yang harus dibalas satu per satu.' },
      item4: { title: 'Kalah saing', desc: 'Branding kalah sama kompetitor yang tampil lebih profesional.' },
      quote: '"Kalau terlihat biasa saja... orang juga akan menganggap bisnis kamu biasa saja."',
    },
    services: {
      badge: 'Layanan Utama Kami',
      headline: 'Solusi Digital yang Solutif.',
      subheadline: 'Kami nggak cuma bikin tampilan bagus. Kami bikin sistem yang kerja untuk membantu bisnis kamu tumbuh.',
      web: {
        title: 'Website Professional',
        tagline: 'Website itu kayak toko digital.',
        desc: 'Kalau tampilannya meyakinkan, orang betah. Kalau jelas dan cepat, orang langsung hubungi.',
        features: [
          'Desain modern & enak dilihat',
          'Lancar di semua HP & laptop',
          'Loading cepat, nggak bikin kabur',
          'Struktur siap SEO Google',
          'Hosting cloud included',
          'Security + backup harian'
        ],
        footer: 'Website bukan cuma pajangan. Ini fondasi branding online kamu.'
      },
      app: {
        title: 'Web Application',
        tagline: 'Butuh sistem biar operasional nggak ribet?',
        desc: 'Kami bantu bikin aplikasi web custom sesuai alur bisnis kamu.',
        features: [
          'Sistem sesuai kebutuhan (bukan template)',
          'Dashboard admin & multi user',
          'Data real-time & terstruktur',
          'Integrasi API / payment / third party',
          'Aman & scalable',
          'Siap dikembangkan jangka panjang'
        ],
        footer: 'Biar bisnis kamu nggak jalan manual terus.'
      },
      mobile: {
        title: 'Mobile Apps',
        tagline: 'Punya ide aplikasi?',
        desc: 'Yuk wujudkan jadi Android & iOS yang siap masuk market.',
        features: [
          'Android & iOS ready',
          'UI/UX modern & user friendly',
          'Backend terintegrasi',
          'Push notification',
          'Payment gateway support',
          'Siap upload ke Play Store & App Store'
        ],
        footer: 'Bukan cuma jadi app. Tapi jadi produk digital yang bisa grow.'
      },
      financial: {
        title: 'Feasibility Study & Startup Blueprint',
        tagline: 'Startup itu bukan cuma soal coding.',
        desc: 'Kami bantu kamu siap sebelum launch atau pitching investor.',
        features: [
          'Feasibility study produk IT',
          'Financial projection 3–5 tahun',
          'Monetization strategy',
          'Hitung burn rate & runway',
          'Dokumen siap present ke investor',
          'Blueprint roadmap pengembangan produk'
        ],
        footer: 'Jadi kamu nggak cuma punya ide. Tapi punya rencana yang matang.'
      },
      closing: 'Kami bukan cuma bikin produk digital. Kami bantu kamu membangunnya dengan arah yang jelas.',
      cta: 'Detail Layanan',
    },
    why: {
      badge: 'Mengapa Kami?',
      headline: 'Kami Ngerti Kondisi',
      headlineGradient: 'UMKM & Startup.',
      subheadline: 'Kami tahu budget itu penting, waktu itu berharga, dan solusi harus benar-benar kepakai. Fokus kami adalah hasil nyata untuk bisnis kamu.',
      stats1: 'Proyek Berhasil Diselesaikan',
      stats2: 'Tingkat Kepuasan Klien Kami',
      item1: { title: 'Nggak Ribet', desc: 'Kami jelaskan semuanya dengan bahasa sederhana. Nggak perlu pusing bahasa teknis.' },
      item2: { title: 'Custom, Bukan Template', desc: 'Kami sesuaikan dengan kebutuhan unik bisnis kamu. Bukan sekadar copy-paste.' },
      item3: { title: 'Harga Masuk Akal', desc: 'Investasi realistis untuk hasil maksimal. Cocok untuk budget UMKM & Startup.' },
      item4: { title: 'Diskusi & Konsultasi', desc: 'Kami dengarkan dulu, baru kasih solusi. Nggak asal jualan fitur yang nggak perlu.' },
      item5: { title: 'Support Pasca-Project', desc: 'Project selesai bukan berarti hubungan berakhir. Kami siap bantu maintenance.' },
    },
    portfolio: {
      badge: 'Portfolio Preview',
      headline: 'Hasil yang Bicara.',
      cta: 'Lihat Semua Proyek',
    },
    testimonials: {
      badge: 'Apa Kata Mereka?',
      headline: 'Dipercayai Oleh Berbagai Bisnis.',
    },
    cta: {
      headline: 'Yuk, Bangun Sistem yang Bantu Kamu',
      headlineGradient: 'Tumbuh!',
      subheadline: 'Ngobrol dulu aja. Gratis. Ceritakan bisnis kamu, kami bantu kasih arahan yang masuk akal dan tepat sasaran.',
      btn1: 'Konsultasi Gratis Sekarang',
      btn2: 'Mulai Proyek Tanpa Ribet',
      footerQuote: '"Jangan tunggu sampai tertinggal. Bisnis lain sudah mulai digitalisasi hari ini."',
    },
    footer: {
      desc: 'Partner Digital Buat UMKM & Startup yang Mau Naik Level Melalui Teknologi Terkini.',
      services: 'Layanan',
      serviceItems: {
        web: 'Website Professional',
        app: 'Web Application',
        mobile: 'Mobile Apps',
        financial: 'Feasibility Study & Financial Projection'
      },
      navigation: 'Navigasi',
      contact: 'Hubungi Kami',
      privacy: 'Kebijakan Privasi',
      terms: 'Syarat & Ketentuan',
    },
    portfolioEcommerce: {
      seo: {
        title: 'Portfolio Website Ecommerce untuk UMKM | Source Code 99',
        description: 'Lihat portfolio website ecommerce yang membantu UMKM meningkatkan penjualan online. Solusi ecommerce profesional dari Source Code 99.'
      },
      hero: {
        h1: 'Website Ecommerce untuk UMKM – Tingkatkan Penjualan Secara Digital',
        overview: 'Gambaran Proyek',
        desc1: 'Banyak UMKM punya produk bagus. Tapi belum punya sistem penjualan online yang optimal.',
        desc2: 'Melalui proyek website ecommerce ini, Source Code 99 membantu UMKM bertransformasi dari penjualan manual menjadi sistem digital yang lebih terstruktur dan scalable.',
        desc3: 'Website ini dirancang bukan hanya untuk tampil profesional, tetapi untuk meningkatkan conversion dan growth sales.'
      },
      goals: {
        title: 'Tujuan Pembuatan Website Ecommerce',
        challenge: 'Klien kami memiliki tantangan:',
        challenges: [
          'Penjualan hanya melalui WhatsApp & marketplace',
          'Data pelanggan tidak terorganisir',
          'Sulit melakukan promosi terarah',
          'Tidak memiliki brand presence yang kuat'
        ],
        objective: 'Tujuan utama proyek ini:',
        objectives: [
          'Meningkatkan penjualan online',
          'Membangun brand yang lebih profesional',
          'Mempermudah proses order',
          'Mengelola data pelanggan dengan lebih rapi'
        ]
      },
      solutions: {
        title: 'Solusi yang Kami Bangun',
        subtitle: 'Source Code 99 mengembangkan website ecommerce custom dengan fitur:',
        items: [
          { title: 'Tampilan Modern & Mobile-Friendly', desc: 'Karena 80% pembeli datang dari smartphone.' },
          { title: 'Sistem Keranjang & Checkout Otomatis', desc: 'Proses beli jadi cepat dan tidak ribet.' },
          { title: 'Integrasi Payment Gateway', desc: 'Mendukung transfer bank & metode pembayaran digital.' },
          { title: 'Dashboard Admin', desc: 'Pemilik bisnis bisa mengelola produk, melihat laporan penjualan, mengatur stok, dan melihat data pelanggan.' },
          { title: 'Optimasi SEO', desc: 'Struktur website dibuat SEO-friendly agar bisa muncul di Google untuk kata kunci produk.' }
        ]
      },
      impact: {
        title: 'Dampak Terhadap Growth Sales',
        subtitle: 'Setelah website ecommerce berjalan:',
        items: [
          'Proses order lebih cepat',
          'Pelanggan lebih percaya karena brand terlihat profesional',
          'Penjualan tidak lagi bergantung pada marketplace',
          'Database pelanggan mulai terkumpul',
          'Kampanye promo lebih mudah dijalankan'
        ],
        footer: 'Website bukan hanya alat pajangan. Ia menjadi mesin penjualan digital.'
      },
      why: {
        title: 'Kenapa Ecommerce Penting untuk UMKM?',
        subtitle: 'Marketplace bagus untuk mulai. Tapi website sendiri memberi kontrol penuh:',
        items: [
          'Tidak tergantung algoritma',
          'Tidak bersaing langsung di halaman yang sama',
          'Bisa membangun brand jangka panjang',
          'Bisa menjalankan strategi digital marketing sendiri'
        ],
        footer: 'Website ecommerce adalah aset bisnis. Bukan sekadar channel tambahan.'
      },
      cta: {
        title: 'Siap Membangun Website Ecommerce untuk Bisnis Anda?',
        subtitle: 'Jika Anda memiliki produk dan ingin meningkatkan penjualan secara digital, Source Code 99 siap membantu.',
        steps: 'Kami bantu dari: Perencanaan, Desain UI/UX, Pengembangan sistem, Sampai website siap digunakan',
        btn1: 'Konsultasi Gratis Sekarang',
        btn2: 'Bangun Website Ecommerce Anda'
      }
    },
    portfolioBooking: {
      seo: {
        title: 'Sistem Booking Online untuk UMKM | Portfolio Source Code 99',
        description: 'Lihat portfolio sistem booking online yang membantu UMKM mengelola reservasi secara otomatis dan profesional. Solusi booking website dari Source Code 99.'
      },
      hero: {
        h1: 'Sistem Booking Online untuk UMKM – Solusi Reservasi Otomatis & Profesional',
        overview: 'Gambaran Proyek',
        desc1: 'Banyak bisnis jasa masih mengandalkan booking manual melalui WhatsApp atau telepon.',
        desc2: 'Melalui proyek Sistem Booking Online ini, Source Code 99 membantu UMKM mengotomatisasi proses reservasi agar lebih efisien, profesional, dan siap berkembang.',
        challenges: [
          'Jadwal bentrok',
          'Admin kewalahan',
          'Data pelanggan tidak tercatat rapi',
          'Banyak peluang terlewat'
        ]
      },
      goals: {
        title: 'Tantangan yang Dihadapi Klien',
        items: [
          'Booking manual dan sulit dikontrol',
          'Tidak ada sistem jadwal otomatis',
          'Sulit melihat laporan reservasi',
          'Pelanggan sering batal tanpa konfirmasi'
        ],
        footer: 'Tanpa sistem digital, operasional menjadi tidak efisien.'
      },
      solutions: {
        title: 'Solusi yang Kami Bangun',
        subtitle: 'Source Code 99 mengembangkan Sistem Booking Online berbasis website dengan fitur:',
        items: [
          { title: 'Kalender Booking Otomatis', desc: 'Pelanggan bisa memilih tanggal dan jam yang tersedia secara real-time.' },
          { title: 'Konfirmasi Otomatis', desc: 'Notifikasi melalui email / WhatsApp setelah reservasi berhasil.' },
          { title: 'Dashboard Admin', desc: 'Pemilik bisnis dapat melihat jadwal harian, mengatur ketersediaan waktu, mengelola layanan, dan melihat data pelanggan.' },
          { title: 'Sistem Pembayaran (Opsional)', desc: 'Booking bisa langsung disertai pembayaran DP atau full payment.' },
          { title: 'Mobile-Friendly', desc: 'Karena mayoritas pelanggan booking lewat smartphone.' }
        ]
      },
      impact: {
        title: 'Dampak Terhadap Bisnis',
        subtitle: 'Setelah sistem berjalan:',
        items: [
          'Tidak ada lagi jadwal bentrok',
          'Admin lebih ringan',
          'Pelanggan merasa lebih profesional',
          'Data pelanggan tersimpan rapi',
          'Tingkat kehadiran meningkat'
        ],
        footer: 'Sistem booking bukan hanya mempermudah. Ia meningkatkan kepercayaan dan efisiensi bisnis.'
      },
      why: {
        title: 'Kenapa Sistem Booking Penting untuk UMKM?',
        subtitle: 'Jika bisnis Anda berbasis jasa, waktu adalah aset utama. Tanpa sistem booking:',
        items: [
          'Potensi kehilangan pelanggan lebih besar',
          'Sulit mengukur performa bisnis',
          'Sulit berkembang'
        ],
        footer: 'Sistem booking online membantu bisnis lebih terstruktur, modern, dan terpercaya.'
      },
      cta: {
        title: 'Ingin Memiliki Sistem Booking Sendiri?',
        subtitle: 'Source Code 99 siap membantu Anda membangun sistem booking yang disesuaikan dengan kebutuhan bisnis Anda.',
        steps: 'Kami bantu dari: Perencanaan fitur, Desain UI/UX, Pengembangan sistem, Sampai implementasi',
        btn1: 'Konsultasi Gratis Sekarang',
        btn2: 'Bangun Sistem Booking Anda'
      }
    },
    portfolioDelivery: {
      seo: {
        title: 'Aplikasi Delivery Startup & UMKM | Portfolio Source Code 99',
        description: 'Portfolio aplikasi delivery untuk startup dan UMKM. Solusi aplikasi mobile dan sistem delivery lengkap dari Source Code 99.'
      },
      hero: {
        h1: 'Portfolio Aplikasi Delivery untuk Startup – Solusi Pengantaran Digital yang Scalable',
        overview: 'Gambaran Proyek',
        desc1: 'Banyak bisnis makanan, retail, dan logistik ingin memiliki sistem delivery sendiri tanpa bergantung pada marketplace besar.',
        challenges: [
          'Tidak punya sistem pemesanan sendiri',
          'Tidak punya aplikasi mobile',
          'Data pelanggan dikuasai platform pihak ketiga',
          'Sulit mengontrol biaya komisi'
        ],
        footer: 'Melalui proyek Startup Delivery App ini, Source Code 99 membantu membangun sistem delivery end-to-end yang modern, scalable, dan siap tumbuh.'
      },
      goals: {
        title: 'Tujuan Pengembangan Aplikasi Delivery',
        subtitle: 'Startup ini ingin:',
        items: [
          'Memiliki aplikasi sendiri (Android & iOS)',
          'Mengelola driver secara internal',
          'Mengontrol sistem pembayaran',
          'Meningkatkan margin keuntungan',
          'Mengumpulkan data pelanggan sendiri'
        ],
        footer: 'Bukan sekadar ikut platform. Tapi membangun ekosistem sendiri.'
      },
      solutions: {
        title: 'Solusi yang Kami Bangun',
        subtitle: 'Source Code 99 mengembangkan sistem delivery lengkap yang terdiri dari:',
        customer: {
          title: 'Aplikasi Customer (Mobile App)',
          items: ['Registrasi & login user', 'Pilih produk / layanan', 'Live tracking pesanan', 'Riwayat order', 'Notifikasi real-time']
        },
        driver: {
          title: 'Aplikasi Driver',
          items: ['Terima / tolak order', 'Navigasi lokasi', 'Update status pengantaran', 'Riwayat pendapatan']
        },
        admin: {
          title: 'Admin Dashboard (Web-Based)',
          items: ['Monitoring order real-time', 'Manajemen driver', 'Pengelolaan produk / merchant', 'Laporan transaksi', 'Analitik performa']
        },
        payment: {
          title: 'Sistem Pembayaran',
          items: ['Integrasi payment gateway', 'Cash & non-cash option', 'Perhitungan komisi otomatis']
        }
      },
      impact: {
        title: 'Dampak Terhadap Growth Startup',
        subtitle: 'Setelah sistem berjalan:',
        items: [
          'Tidak lagi membayar komisi besar ke pihak ketiga',
          'Data pelanggan menjadi aset internal',
          'Branding lebih kuat karena punya aplikasi sendiri',
          'Sistem operasional lebih terkontrol',
          'Siap scale ke kota lain'
        ],
        footer: 'Aplikasi delivery bukan hanya fitur. Itu adalah fondasi pertumbuhan startup digital.'
      },
      why: {
        title: 'Kenapa Startup Perlu Aplikasi Delivery Sendiri?',
        subtitle: 'Marketplace bagus untuk validasi awal. Namun jika ingin meningkatkan profit margin, membangun brand jangka panjang, menguasai data pelanggan, dan scale bisnis lebih cepat, maka memiliki sistem delivery sendiri adalah langkah strategis.',
        tech: {
          title: 'Teknologi yang Digunakan',
          items: ['Backend scalable architecture', 'API integration', 'Cloud hosting', 'Secure authentication', 'Real-time notification system']
        },
        footer: 'Source Code 99 membangun sistem yang tidak hanya berjalan hari ini — tapi siap untuk berkembang di masa depan.'
      },
      cta: {
        title: 'Ingin Membangun Aplikasi Delivery Sendiri?',
        subtitle: 'Jika Anda memiliki startup atau bisnis yang ingin memiliki sistem delivery internal, kami siap membantu dari perencanaan hingga peluncuran.',
        btn1: 'Konsultasi Gratis',
        btn2: 'Bangun Aplikasi Startup Anda'
      }
    },
    portfolioWarehouse: {
      seo: {
        title: 'Warehouse Management System untuk UMKM & Distributor | Source Code 99',
        description: 'Portfolio Warehouse Management System (WMS) untuk UMKM dan distributor. Tingkatkan efisiensi gudang hingga 35% dengan sistem berbasis web dari Source Code 99.'
      },
      hero: {
        h1: 'Warehouse Management System (WMS) untuk UMKM & Distributor – Optimasi Gudang Secara Digital',
        overview: 'Gambaran Proyek',
        desc1: 'Banyak bisnis distribusi, retail, dan manufaktur masih mengelola gudang secara manual atau menggunakan spreadsheet sederhana.',
        challenges: [
          'Stok tidak akurat',
          'Barang sering hilang atau salah kirim',
          'Proses picking lambat',
          'Sulit mengetahui pergerakan barang',
          'Laporan tidak real-time'
        ],
        footer: 'Melalui proyek Warehouse Management System ini, Source Code 99 membantu klien mengubah sistem gudang manual menjadi sistem digital terintegrasi.'
      },
      goals: {
        title: 'Tantangan yang Dihadapi Klien',
        subtitle: 'Klien kami adalah distributor skala menengah dengan 1 gudang utama, 3.000+ SKU produk, dan 50–100 transaksi keluar masuk per hari.',
        problems: [
          'Perbedaan stok fisik & sistem mencapai 15–20%',
          'Proses input manual memakan waktu',
          'Kesalahan pengiriman meningkat',
          'Sulit memantau performa gudang'
        ]
      },
      solutions: {
        title: 'Solusi yang Kami Bangun',
        subtitle: 'Source Code 99 mengembangkan Warehouse Management System berbasis web dengan fitur:',
        items: [
          { title: 'Manajemen Stok Real-Time', desc: 'Update otomatis saat barang masuk & keluar.' },
          { title: 'Tracking Pergerakan Barang', desc: 'Riwayat lengkap setiap transaksi.' },
          { title: 'Sistem Barcode / QR Code', desc: 'Mempercepat proses scanning & picking.' },
          { title: 'Dashboard Monitoring', desc: 'Menampilkan total stok, produk fast-moving, slow-moving, serta laporan harian & bulanan.' },
          { title: 'Multi-User Access', desc: 'Admin, staff gudang, dan manajer memiliki akses berbeda sesuai kebutuhan.' }
        ]
      },
      impact: {
        title: 'Dampak & Statistik (Hasil Implementasi)',
        subtitle: 'Setelah 3 bulan implementasi sistem:',
        stats: [
          'Efisiensi operasional meningkat ±35%',
          'Kesalahan pencatatan stok turun hingga 40%',
          'Waktu proses picking berkurang 30%',
          'Akurasi stok meningkat hingga 95%+',
          'Laporan dapat diakses real-time'
        ],
        footer: 'Sistem WMS bukan hanya mempermudah. Ia meningkatkan kontrol dan profitabilitas bisnis.'
      },
      why: {
        title: 'Kenapa UMKM & Distributor Perlu WMS?',
        subtitle: 'Tanpa sistem gudang digital, risiko kehilangan barang meningkat, proses audit sulit, dan biaya operasional tidak terkontrol.',
        benefits: [
          'Lebih efisien',
          'Lebih akurat',
          'Lebih terukur',
          'Siap scale ke gudang baru'
        ],
        tech: {
          title: 'Teknologi & Arsitektur',
          items: ['Web-based system', 'Cloud deployment', 'Secure authentication', 'Role-based access', 'Scalable database', 'API-ready untuk integrasi ERP / POS']
        },
        footer: 'Source Code 99 membangun sistem yang siap berkembang bersama bisnis Anda.'
      },
      cta: {
        title: 'Ingin Digitalisasi Gudang Anda?',
        subtitle: 'Jika bisnis Anda mulai kesulitan mengelola stok dan distribusi, sekarang waktu yang tepat untuk beralih ke sistem digital.',
        btn1: 'Konsultasi Gratis',
        btn2: 'Bangun Warehouse Management System Anda'
      }
    },
    portfolioCompanyProfile: {
      seo: {
        title: 'Website Company Profile Profesional untuk UMKM & Perusahaan | Source Code 99',
        description: 'Portfolio website company profile profesional untuk UMKM dan perusahaan. Tingkatkan kredibilitas dan tampil di Google bersama Source Code 99.'
      },
      hero: {
        h1: 'Website Company Profile untuk UMKM & Perusahaan – Citra Digital Profesional',
        overview: 'Gambaran Proyek',
        desc1: 'Banyak perusahaan memiliki produk dan layanan yang bagus. Namun tanpa website company profile yang profesional, kepercayaan calon klien menjadi rendah.',
        desc2: 'Melalui proyek Website Company Profile ini, Source Code 99 membantu perusahaan membangun citra digital yang kredibel, modern, dan siap bersaing.',
        footer: 'Website bukan hanya tampilan. Ia adalah wajah resmi perusahaan di dunia digital.'
      },
      goals: {
        title: 'Tantangan yang Dihadapi Klien',
        items: [
          'Tidak memiliki website resmi',
          'Website lama terlihat tidak profesional',
          'Informasi perusahaan tidak terstruktur',
          'Sulit mendapatkan kepercayaan dari klien besar',
          'Tidak muncul di hasil pencarian Google'
        ],
        footer: 'Tanpa company profile digital, peluang bisnis sering terlewat.'
      },
      solutions: {
        title: 'Solusi yang Kami Bangun',
        subtitle: 'Source Code 99 mengembangkan Website Company Profile berbasis web dengan fitur:',
        items: [
          { title: 'Desain Modern & Profesional', desc: 'Tampilan clean, elegan, dan sesuai branding perusahaan.' },
          { title: 'Struktur Konten SEO-Friendly', desc: 'Halaman Tentang Kami, Visi & Misi, Layanan, Portfolio, dan Kontak.' },
          { title: 'Optimasi SEO Dasar', desc: 'Agar website dapat terindeks Google dan muncul di pencarian.' },
          { title: 'Mobile Responsive', desc: 'Tampilan optimal di desktop maupun smartphone.' },
          { title: 'Form Kontak & Integrasi WhatsApp', desc: 'Memudahkan calon klien menghubungi perusahaan.' }
        ]
      },
      impact: {
        title: 'Dampak Setelah Implementasi',
        subtitle: 'Dalam 3–6 bulan setelah website aktif:',
        items: [
          'Peningkatan kredibilitas perusahaan',
          'Lebih mudah mendapatkan klien korporat',
          'Website mulai muncul di pencarian Google',
          'Pertumbuhan inquiry hingga ±25%',
          'Brand terlihat lebih profesional & terpercaya'
        ],
        footer: 'Website company profile bukan sekadar formalitas. Ia menjadi alat marketing jangka panjang.'
      },
      why: {
        title: 'Kenapa Perusahaan Perlu Website Company Profile?',
        subtitle: 'Karena hari ini, sebelum bekerja sama, orang akan mencari Anda di Google. Jika tidak ditemukan — atau tampilannya tidak meyakinkan — maka peluang bisa hilang.',
        benefits: [
          'Meningkatkan kepercayaan',
          'Menunjukkan profesionalisme',
          'Menjadi pusat informasi resmi',
          'Mendukung strategi digital marketing'
        ],
        footer: 'Source Code 99 membantu perusahaan dari tahap perencanaan hingga website siap online.'
      },
      cta: {
        title: 'Siap Membangun Website Company Profile Anda?',
        subtitle: 'Desain modern. Struktur SEO-friendly. Siap menjadi representasi digital perusahaan Anda.',
        btn1: 'Konsultasi Gratis Sekarang',
        btn2: 'Bangun Website Company Profile Anda'
      }
    },
    portfolioFinancial: {
      seo: {
        title: 'Financial Projection & Feasibility Study untuk Startup IT | Source Code 99',
        description: 'Jasa financial projection dan feasibility study untuk startup IT dan UMKM digital. Siapkan produk Anda agar siap go-to-invest bersama Source Code 99.'
      },
      hero: {
        h1: 'Financial Projection & Feasibility Study untuk Startup IT',
        overview: 'Gambaran Proyek',
        desc1: 'Banyak startup IT memiliki ide dan produk yang kuat. Namun ketika bertemu investor, mereka kesulitan menjawab proyeksi revenue, burn rate, dan strategi monetisasi.',
        desc2: 'Melalui layanan ini, Source Code 99 membantu startup membangun blueprint bisnis dan keuangan yang siap dipresentasikan kepada investor.',
        footer: 'Financial projection bukan hanya angka. Ia adalah arah masa depan startup.'
      },
      goals: {
        title: 'Tantangan yang Dihadapi Startup',
        items: [
          'Tidak memiliki financial model terstruktur',
          'Tidak ada proyeksi arus kas',
          'Tidak memahami unit economics',
          'Kesulitan menjelaskan potensi ROI',
          'Pitch deck tidak didukung data keuangan'
        ],
        footer: 'Produk bagus saja tidak cukup. Investor melihat angka.'
      },
      solutions: {
        title: 'Solusi yang Kami Berikan',
        subtitle: 'Source Code 99 membantu startup dalam:',
        items: [
          { title: 'Feasibility Study Produk IT', desc: 'Analisis market size (TAM, SAM, SOM), kompetitor, model bisnis, serta risiko & mitigasi.' },
          { title: 'Financial Projection 3–5 Tahun', desc: 'Revenue projection, cost structure, cash flow, break-even analysis, dan ROI projection.' },
          { title: 'Financial Planner & Monetization', desc: 'Subscription model, transaction fee, freemium to premium, dan pricing validation.' },
          { title: 'Investor-Ready Documentation', desc: 'Financial model spreadsheet, executive summary, financial summary slide, dan business blueprint.' }
        ]
      },
      saas: {
        title: '📊 Proyeksi SaaS Metrics untuk Startup IT',
        subtitle: 'Source Code 99 membantu startup IT menyusun model proyeksi berbasis SaaS metrics yang menjadi perhatian utama investor.',
        metrics: [
          { title: 'Monthly Recurring Revenue (MRR)', desc: 'Menunjukkan kestabilan pendapatan berulang setiap bulan.' },
          { title: 'Annual Recurring Revenue (ARR)', desc: 'Indikator scale & stability bisnis dalam satu tahun.' },
          { title: 'Customer Acquisition Cost (CAC)', desc: 'Mengukur biaya marketing untuk mendapatkan satu pelanggan baru.' },
          { title: 'Lifetime Value (LTV)', desc: 'Total pendapatan yang diharapkan dari satu pelanggan selama berlangganan.' },
          { title: 'Burn Rate & Runway', desc: 'Menentukan berapa lama startup bisa bertahan dengan modal yang ada.' }
        ],
        projection: {
          title: '📈 Contoh Proyeksi 3 Tahun',
          items: [
            'Revenue growth rata-rata 80% per tahun',
            'Gross margin 65–75%',
            'Break-even di tahun ke-2 atau ke-3',
            'Valuasi meningkat 3–5x setelah traction stabil'
          ],
          footer: 'Ini membuat startup lebih siap untuk Angel investor, Seed funding, atau Venture capital.'
        }
      },
      impact: {
        title: 'Dampak & Hasil Nyata',
        subtitle: 'Startup yang kami bantu mengalami:',
        items: [
          'Struktur bisnis lebih terarah',
          'Proyeksi pendapatan lebih realistis',
          'Pitch deck lebih kuat',
          'Investor confidence meningkat'
        ],
        footer: 'Startup berhasil mendapatkan pendanaan tahap awal dan produk lebih siap go-to-market.'
      },
      why: {
        title: 'Kenapa Startup IT Perlu Financial Blueprint?',
        subtitle: 'Karena investor tidak hanya membeli ide. Mereka membeli potensi pertumbuhan yang terukur.',
        benefits: [
          'Mengetahui burn rate',
          'Menentukan strategi pricing',
          'Menghitung kebutuhan funding',
          'Menentukan valuasi awal'
        ],
        footer: 'Tanpa proyeksi keuangan, startup berjalan tanpa kompas.'
      },
      cta: {
        title: 'Siap Mempersiapkan Startup Anda Go-To-Invest?',
        subtitle: 'Jika Anda memiliki produk IT dan ingin mempersiapkannya untuk pendanaan atau ekspansi, Source Code 99 siap membantu membangun fondasi finansialnya.',
        btn1: 'Konsultasi Strategy Session',
        btn2: 'Bangun Financial Blueprint Startup Anda'
      }
    },
    servicesDetail: {
      web: {
        h1: 'Jasa Pembuatan Website Profesional untuk UMKM & Perusahaan',
        why: {
          title: 'Kenapa Website Itu Penting?',
          desc1: 'Hari ini orang cari Anda di Google dulu.',
          desc2: 'Kalau tidak ditemukan — hilang peluang. Kalau tampilannya tidak meyakinkan — hilang kepercayaan.',
          footer: 'Website bukan sekadar formalitas. Ia adalah wajah digital bisnis Anda.'
        },
        what: {
          title: 'Apa yang Kami Bangun?',
          desc: 'Kami tidak membuat website asal jadi. Kami bangun website yang:',
          items: ['Cepat diakses (speed optimized)', 'Mobile friendly', 'SEO-ready', 'Aman & stabil', 'Mudah di-update']
        },
        features: {
          title: 'Fitur Utama',
          items: [
            'Desain modern & clean',
            'Struktur SEO Google-friendly',
            'Halaman layanan terstruktur',
            'Integrasi WhatsApp & form',
            'Hosting cloud included',
            'Security + backup otomatis'
          ]
        },
        caseStudy: {
          title: 'Contoh Kasus',
          desc: 'Salah satu klien kami adalah perusahaan jasa konstruksi.',
          before: ['Tidak memiliki website', 'Sulit dipercaya oleh klien besar', 'Tidak muncul di Google'],
          after: ['Inquiry naik ±30% dalam 4 bulan', 'Mulai muncul di halaman 1 untuk keyword lokal', 'Lebih mudah closing karena terlihat profesional'],
          footer: 'Website yang tepat membantu bisnis terlihat serius.'
        },
        who: {
          title: 'Cocok Untuk Siapa?',
          items: ['UMKM yang ingin naik kelas', 'Perusahaan baru yang butuh branding', 'Bisnis jasa yang ingin tampil lebih kredibel']
        },
        cta: {
          title: 'Siap punya website yang benar-benar bekerja untuk bisnis Anda?',
          btn1: 'Konsultasi Gratis Sekarang',
          btn2: 'Bangun Website Profesional Anda Hari Ini'
        }
      },
      app: {
        h1: 'Jasa Pembuatan Web Application & Sistem Custom',
        why: {
          title: 'Masalah Umum di Bisnis',
          desc: 'Masih pakai Excel manual? Data berantakan? Operasional lambat?',
          footer: 'Saat bisnis mulai tumbuh, sistem manual jadi penghambat.'
        },
        what: {
          title: 'Solusi dari Source Code 99',
          desc: 'Kami membangun aplikasi web custom sesuai alur bisnis Anda.',
          footer: 'Bukan template. Bukan sistem generik. Tapi sistem yang mengikuti cara kerja bisnis Anda.'
        },
        features: {
          title: 'Fitur yang Bisa Dibangun',
          items: ['Dashboard admin', 'Multi-user & role management', 'Tracking data real-time', 'Integrasi API', 'Laporan otomatis', 'Sistem scalable']
        },
        caseStudy: {
          title: 'Contoh Kasus',
          desc: 'Klien distributor dengan 3.000+ SKU produk.',
          before: ['Stok sering selisih', 'Proses manual', 'Laporan lambat'],
          after: ['Efisiensi naik ±35%', 'Kesalahan stok turun 40%', 'Laporan real-time'],
          footer: 'Sistem bukan cuma mempermudah. Ia menghemat biaya operasional.'
        },
        who: {
          title: 'Cocok Untuk:',
          items: ['Distributor', 'Startup', 'Bisnis jasa', 'Perusahaan dengan proses kompleks']
        },
        cta: {
          title: 'Butuh sistem yang bikin bisnis lebih terstruktur?',
          btn1: 'Diskusikan Kebutuhan Sistem Anda',
          btn2: 'Bangun Web Application Custom Sekarang'
        }
      },
      mobile: {
        h1: 'Jasa Pembuatan Aplikasi Android & iOS untuk Startup & UMKM',
        why: {
          title: 'Kenapa Mobile App?',
          desc: 'Karena user ada di smartphone.',
          footer: 'Kalau produk Anda ingin sering dipakai, mobile app adalah langkah strategis.'
        },
        what: {
          title: 'Apa yang Kami Kembangkan?',
          desc: 'Kami bantu dari:',
          items: ['Perencanaan fitur', 'UI/UX design', 'Backend system', 'Deployment ke store']
        },
        features: {
          title: 'Fitur Umum',
          items: ['Login & user management', 'Push notification', 'Payment integration', 'Real-time tracking', 'Admin dashboard', 'Analytics system']
        },
        caseStudy: {
          title: 'Contoh Kasus',
          desc: 'Startup delivery makanan.',
          before: ['Hanya via WhatsApp', 'Order tidak terstruktur'],
          after: ['Order meningkat ±50% dalam 6 bulan', 'Proses lebih cepat', 'Branding lebih kuat'],
          footer: 'Mobile app meningkatkan engagement & retention.'
        },
        who: {
          title: 'Cocok Untuk:',
          items: ['Startup digital', 'Delivery service', 'Marketplace niche', 'Subscription-based business']
        },
        cta: {
          title: 'Punya ide aplikasi?',
          btn1: 'Konsultasikan Ide Anda',
          btn2: 'Wujudkan Mobile App Anda Sekarang'
        }
      },
      financial: {
        h1: 'Feasibility Study & Financial Projection untuk Startup IT',
        why: {
          title: 'Masalah Startup',
          desc: 'Banyak startup punya ide.',
          footer: 'Tapi saat pitching investor, bingung menjawab revenue projection, break-even, burn rate, dan strategi monetisasi. Tanpa blueprint finansial, startup berjalan tanpa arah.'
        },
        what: {
          title: 'Apa yang Kami Bantu?',
          items: ['Feasibility study produk IT', 'Financial projection 3–5 tahun', 'MRR / ARR modelling', 'Burn rate & runway', 'Monetization strategy', 'Investor-ready documentation']
        },
        caseStudy: {
          title: 'Contoh Kasus',
          desc: 'Startup SaaS HR system.',
          before: ['Tidak punya proyeksi jelas', 'Pitch deck kurang meyakinkan'],
          after: ['Revenue projection realistis', 'LTV:CAC ratio terhitung', 'Break-even di tahun ke-2', 'Lebih siap bertemu angel investor'],
          footer: 'Angka yang jelas meningkatkan confidence investor.'
        },
        who: {
          title: 'Cocok Untuk:',
          items: ['Startup tahap early', 'Founder yang ingin fundraising', 'UMKM digital yang ingin scale']
        },
        cta: {
          title: 'Siap membawa startup Anda ke level berikutnya?',
          btn1: 'Booking Strategy Session',
          btn2: 'Siapkan Startup Anda untuk Go-To-Invest'
        }
      }
    }
  },
  EN: {
    nav: {
      solusi: 'Solution',
      layanan: 'Services',
      portfolio: 'Portfolio',
      kenapa: 'Why Us',
      konsultasi: 'Free Consultation',
    },
    hero: {
      badge: 'Digital Transformation Partner',
      headline: 'Build Websites &',
      headlineGradient: 'Apps Without Hassle.',
      subheadline: 'Focus on selling, we handle the tech. We help MSMEs & startups build simple, cool digital systems that truly drive business growth.',
      ctaPrimary: 'Free Consultation Now',
      ctaSecondary: 'View Portfolio',
      check1: 'Modern Design',
      check2: 'SEO Optimized',
      check3: 'Free Support',
    },
    problem: {
      badge: 'Common Business Problems',
      headline: 'Why Do Many Businesses Struggle to Scale?',
      subheadline: "Running a business but still relying on manual ways? You're not alone. The main problem is that the system isn't ready for growth.",
      item1: { title: 'Website is just formality', desc: "Already have a web but it's quiet and doesn't affect sales." },
      item2: { title: 'Manual order recording', desc: 'Dizzy from manual data, things often get missed or typed wrong.' },
      item3: { title: 'Overwhelmed Admins', desc: 'Too many manual chats to answer one by one.' },
      item4: { title: 'Losing Competitiveness', desc: 'Branding loses to competitors who look more professional.' },
      quote: '"If it looks ordinary... people will also think your business is ordinary."',
    },
    services: {
      badge: 'Our Core Services',
      headline: 'Effective Digital Solutions.',
      subheadline: "We don't just build looks. We build systems that work to help your business grow.",
      web: {
        title: 'Professional Website',
        tagline: 'A website is like a digital store.',
        desc: 'If it looks convincing, people stay. If it\'s clear and fast, they contact you immediately.',
        features: [
          'Modern & attractive design',
          'Smooth on all mobile & laptops',
          'Fast loading, no bounce',
          'Google SEO ready structure',
          'Cloud hosting included',
          'Security + daily backup'
        ],
        footer: 'A website is not just a display. It\'s your online branding foundation.'
      },
      app: {
        title: 'Web Application',
        tagline: 'Need a system to simplify operations?',
        desc: 'We help build custom web apps according to your business flow.',
        features: [
          'Custom systems (not templates)',
          'Admin dashboard & multi-user',
          'Real-time & structured data',
          'API / payment / third-party integration',
          'Secure & scalable',
          'Ready for long-term development'
        ],
        footer: 'So your business doesn\'t have to run manually anymore.'
      },
      mobile: {
        title: 'Mobile Apps',
        tagline: 'Have an app idea?',
        desc: 'Let\'s turn it into Android & iOS ready for the market.',
        features: [
          'Android & iOS ready',
          'Modern & user-friendly UI/UX',
          'Integrated backend',
          'Push notifications',
          'Payment gateway support',
          'Ready for Play Store & App Store'
        ],
        footer: 'Not just an app. But a digital product that can grow.'
      },
      financial: {
        title: 'Feasibility Study & Startup Blueprint',
        tagline: 'Startups are not just about coding.',
        desc: 'We help you get ready before launch or investor pitching.',
        features: [
          'IT product feasibility study',
          '3–5 year financial projection',
          'Monetization strategy',
          'Burn rate & runway calculation',
          'Investor-ready documentation',
          'Product development roadmap blueprint'
        ],
        footer: 'So you don\'t just have an idea. You have a solid plan.'
      },
      closing: 'We don\'t just build digital products. We help you build them with a clear direction.',
      cta: 'Service Details',
    },
    why: {
      badge: 'Why Choose Us?',
      headline: 'We Understand',
      headlineGradient: 'MSMEs & Startups.',
      subheadline: 'We know budget matters, time is precious, and solutions must be practical. Our focus is real results for your business.',
      stats1: 'Successful Projects Completed',
      stats2: 'Client Satisfaction Rate',
      item1: { title: 'Hassle-Free', desc: 'We explain everything in simple language. No need to worry about tech jargon.' },
      item2: { title: 'Custom, Not Template', desc: 'We tailor to your unique business needs. Not just a copy-paste job.' },
      item3: { title: 'Reasonable Pricing', desc: 'Realistic investment for maximum results. Perfect for MSME & Startup budgets.' },
      item4: { title: 'Discussion & Consultation', desc: 'We listen first, then solve. We don\'t sell features you don\'t need.' },
      item5: { title: 'Post-Project Support', desc: "Project end doesn't mean the relationship ends. We're ready for maintenance." },
    },
    portfolio: {
      badge: 'Portfolio Preview',
      headline: 'Results That Speak.',
      cta: 'View All Projects',
    },
    testimonials: {
      badge: 'What They Say?',
      headline: 'Trusted by Various Businesses.',
    },
    cta: {
      headline: 'Let\'s Build a System That Helps You',
      headlineGradient: 'Grow!',
      subheadline: 'Let\'s talk first. It\'s free. Tell us about your business, we help provide sensible and targeted guidance.',
      btn1: 'Free Consultation Now',
      btn2: 'Start Project Without Hassle',
      footerQuote: '"Don\'t wait until you\'re left behind. Other businesses are starting digitalization today."',
    },
    footer: {
      desc: 'Digital Partner for MSMEs & Startups wanting to scale up through the latest technology.',
      services: 'Services',
      serviceItems: {
        web: 'Professional Website',
        app: 'Web Application',
        mobile: 'Mobile Apps',
        financial: 'Feasibility Study & Financial Projection'
      },
      navigation: 'Navigation',
      contact: 'Contact Us',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
    },
    portfolioEcommerce: {
      seo: {
        title: 'Ecommerce Website Portfolio for MSMEs | Source Code 99',
        description: 'View our ecommerce website portfolio that helps MSMEs increase online sales. Professional ecommerce solutions from Source Code 99.'
      },
      hero: {
        h1: 'Ecommerce Website for MSMEs – Driving Real Sales Growth',
        overview: 'Project Overview',
        desc1: 'Many small businesses have great products. But they lack a structured online sales system.',
        desc2: 'In this ecommerce website project, Source Code 99 helped an MSME transform from manual selling into a scalable digital sales system.',
        desc3: 'The goal wasn’t just to look professional — but to increase conversions and drive sales growth.'
      },
      goals: {
        title: 'Project Goals',
        challenge: 'The client faced challenges:',
        challenges: [
          'Sales only through WhatsApp & marketplace',
          'No organized customer database',
          'Limited brand identity',
          'Hard to run targeted promotions'
        ],
        objective: 'Main objectives:',
        objectives: [
          'Increase online sales',
          'Strengthen brand credibility',
          'Simplify ordering process',
          'Organize customer data'
        ]
      },
      solutions: {
        title: 'Our Ecommerce Solution',
        subtitle: 'We built a custom ecommerce website featuring:',
        items: [
          { title: 'Modern & Mobile-Friendly Design', desc: 'Because most customers shop from mobile devices.' },
          { title: 'Automated Cart & Checkout', desc: 'Smooth buying experience increases conversion.' },
          { title: 'Payment Gateway Integration', desc: 'Secure and flexible payment methods.' },
          { title: 'Admin Dashboard', desc: 'Business owners can manage products, track sales, monitor stock, and view customer data.' },
          { title: 'SEO Optimization', desc: 'Structured to rank on Google for relevant product keywords.' }
        ]
      },
      impact: {
        title: 'Business Impact',
        subtitle: 'After launching the ecommerce website:',
        items: [
          'Faster order processing',
          'Improved brand trust',
          'Independent sales channel',
          'Growing customer database',
          'Better promotional control'
        ],
        footer: 'A website is not just a showcase. It becomes a digital sales engine.'
      },
      why: {
        title: 'Why Ecommerce Matters for MSMEs?',
        subtitle: 'Marketplaces are great to start. But your own website gives full control:',
        items: [
          'Not dependent on algorithms',
          'No direct competition on the same page',
          'Build long-term brand equity',
          'Run your own digital marketing strategies'
        ],
        footer: 'An ecommerce website is a business asset. Not just an extra channel.'
      },
      cta: {
        title: 'Ready to Build Your Ecommerce Website?',
        subtitle: 'If you want to grow your sales digitally, Source Code 99 is ready to help.',
        steps: 'From planning to launch — we build systems that support growth.',
        btn1: 'Start Your Ecommerce Project Today',
        btn2: 'Consultation'
      }
    },
    portfolioBooking: {
      seo: {
        title: 'Online Booking System for MSMEs | Portfolio Source Code 99',
        description: 'View our online booking system portfolio that helps MSMEs manage reservations automatically and professionally. Booking website solutions from Source Code 99.'
      },
      hero: {
        h1: 'Online Booking System Portfolio – Smart Reservation Solution for Growing Businesses',
        overview: 'Project Overview',
        desc1: 'Many service-based businesses still rely on manual booking through WhatsApp or phone calls.',
        desc2: 'Through this Online Booking System project, Source Code 99 helped businesses automate reservations and operate more efficiently.',
        challenges: [
          'Schedule conflicts',
          'Overwhelmed admin',
          'Unorganized customer data',
          'Missed opportunities'
        ]
      },
      goals: {
        title: 'Challenges',
        items: [
          'Manual booking management',
          'No real-time schedule system',
          'No booking reports',
          'High cancellation rate'
        ],
        footer: 'Without digital systems, scaling becomes difficult.'
      },
      solutions: {
        title: 'Our Solution',
        subtitle: 'We developed a custom web-based Booking System with:',
        items: [
          { title: 'Real-Time Booking Calendar', desc: 'Customers select available dates and time slots instantly.' },
          { title: 'Automatic Confirmation', desc: 'Email or WhatsApp confirmation after booking.' },
          { title: 'Admin Dashboard', desc: 'Business owners can manage schedules, control service availability, access booking reports, and track customer data.' },
          { title: 'Payment Integration (Optional)', desc: 'Allow deposits or full payment at booking.' },
          { title: 'Mobile-Optimized Interface', desc: 'Ensuring a smooth experience for customers on smartphones.' }
        ]
      },
      impact: {
        title: 'Business Impact',
        subtitle: 'After implementation:',
        items: [
          'No more schedule conflicts',
          'Better operational efficiency',
          'Increased professionalism',
          'Organized customer database',
          'Higher customer attendance rate'
        ],
        footer: 'An online booking system is not just a feature — it is an operational upgrade.'
      },
      why: {
        title: 'Why Booking Matters for MSMEs?',
        subtitle: 'If your business is service-based, time is your main asset. Without a booking system:',
        items: [
          'Greater potential to lose customers',
          'Hard to measure business performance',
          'Difficult to scale'
        ],
        footer: 'An online booking system helps businesses stay structured, modern, and trustworthy.'
      },
      cta: {
        title: 'Want Your Own Booking System?',
        subtitle: 'Source Code 99 is ready to help you build a booking system tailored to your business needs.',
        steps: 'From planning to launch — we build systems that support growth.',
        btn1: 'Free Consultation Now',
        btn2: 'Build Your Booking System'
      }
    },
    portfolioDelivery: {
      seo: {
        title: 'Startup & MSME Delivery App | Portfolio Source Code 99',
        description: 'Delivery app portfolio for startups and MSMEs. Mobile app solutions and complete delivery systems from Source Code 99.'
      },
      hero: {
        h1: 'Startup Delivery App Portfolio – Scalable Digital Delivery Solution',
        overview: 'Project Overview',
        desc1: 'Many food, retail, and logistics businesses want their own delivery system without relying on large marketplaces.',
        challenges: [
          'No proprietary ordering system',
          'No mobile app',
          'Customer data controlled by third parties',
          'High commission fees'
        ],
        footer: 'Through this Startup Delivery App project, Source Code 99 built a complete end-to-end delivery ecosystem.'
      },
      goals: {
        title: 'Objectives',
        subtitle: 'The startup aimed to:',
        items: [
          'Launch its own mobile apps (Android & iOS)',
          'Manage drivers internally',
          'Control payments & commissions',
          'Increase profit margins',
          'Own customer data'
        ],
        footer: 'Not just join a platform — but build their own digital ecosystem.'
      },
      solutions: {
        title: 'The Solution',
        subtitle: 'We developed a complete delivery system consisting of:',
        customer: {
          title: 'Customer Mobile App',
          items: ['Registration & login', 'Order placement', 'Live tracking', 'Order history', 'Push notifications']
        },
        driver: {
          title: 'Driver App',
          items: ['Accept/decline orders', 'GPS navigation', 'Delivery status updates', 'Earnings tracking']
        },
        admin: {
          title: 'Web Admin Dashboard',
          items: ['Real-time order monitoring', 'Driver management', 'Merchant control', 'Transaction reports', 'Performance analytics']
        },
        payment: {
          title: 'Integrated Payment System',
          items: ['Payment gateway integration', 'Cash & non-cash options', 'Automated commission calculation']
        }
      },
      impact: {
        title: 'Business Impact',
        subtitle: 'After launch:',
        items: [
          'Reduced third-party commission fees',
          'Full ownership of customer data',
          'Stronger brand identity',
          'Controlled operational flow',
          'Ready to scale geographically'
        ],
        footer: 'A delivery app is not just technology. It’s a growth engine.'
      },
      why: {
        title: 'Why Startups Need Their Own Delivery App?',
        subtitle: 'Marketplaces are good for early validation. But to increase profit margins, build long-term brands, own customer data, and scale faster, having your own delivery system is a strategic move.',
        tech: {
          title: 'Technologies Used',
          items: ['Backend scalable architecture', 'API integration', 'Cloud hosting', 'Secure authentication', 'Real-time notification system']
        },
        footer: 'Source Code 99 builds systems that not only run today — but are ready to grow in the future.'
      },
      cta: {
        title: 'Ready to Build Your Delivery App?',
        subtitle: 'If you have a startup or business that wants an internal delivery system, we are ready to help from planning to launch.',
        btn1: 'Free Consultation',
        btn2: 'Build Your Startup App'
      }
    },
    portfolioWarehouse: {
      seo: {
        title: 'Warehouse Management System for MSMEs & Distributors | Source Code 99',
        description: 'Warehouse Management System (WMS) portfolio for MSMEs and distributors. Increase warehouse efficiency by up to 35% with web-based systems from Source Code 99.'
      },
      hero: {
        h1: 'Warehouse Management System (WMS) Portfolio – Smart Inventory Control for Growing Businesses',
        overview: 'Project Overview',
        desc1: 'Many distributors and retail businesses still manage warehouses manually or using spreadsheets.',
        challenges: [
          'Inaccurate stock levels',
          'Shipping errors',
          'Slow picking process',
          'Lack of real-time reports'
        ],
        footer: 'Through this WMS project, Source Code 99 helped digitize warehouse operations into an integrated system.'
      },
      goals: {
        title: 'Challenges',
        subtitle: 'The client is a medium-scale distributor with 1 main warehouse, 3,000+ SKUs, and 50–100 daily transactions.',
        problems: [
          '15–20% discrepancy between physical & system stock',
          'Time-consuming manual input process',
          'Increasing shipping errors',
          'Difficult to monitor warehouse performance'
        ]
      },
      solutions: {
        title: 'Our Solution',
        subtitle: 'We developed a custom web-based Warehouse Management System with:',
        items: [
          { title: 'Real-Time Stock Management', desc: 'Automatic updates during inbound & outbound transactions.' },
          { title: 'Item Movement Tracking', desc: 'Complete history for every transaction.' },
          { title: 'Barcode / QR Code System', desc: 'Speed up scanning & picking processes.' },
          { title: 'Monitoring Dashboard', desc: 'Displays total stock, fast-moving items, slow-moving items, and periodic reports.' },
          { title: 'Multi-User Access', desc: 'Role-based access for admins, warehouse staff, and managers.' }
        ]
      },
      impact: {
        title: 'Measurable Results',
        subtitle: 'After 3 months of implementation:',
        stats: [
          '35% increase in operational efficiency',
          '40% reduction in stock discrepancies',
          '30% faster picking process',
          '95%+ inventory accuracy',
          'Real-time reporting access'
        ],
        footer: 'A Warehouse Management System is not just software. It is operational control at scale.'
      },
      why: {
        title: 'Why WMS Matters for MSMEs?',
        subtitle: 'Without a digital warehouse system, risks of item loss increase, audits become difficult, and operational costs go uncontrolled.',
        benefits: [
          'More efficient',
          'More accurate',
          'More measurable',
          'Ready to scale to new warehouses'
        ],
        tech: {
          title: 'Technologies & Architecture',
          items: ['Web-based system', 'Cloud deployment', 'Secure authentication', 'Role-based access', 'Scalable database', 'API-ready for ERP / POS integration']
        },
        footer: 'Source Code 99 builds systems that not only run today — but are ready to grow in the future.'
      },
      cta: {
        title: 'Want to Digitalize Your Warehouse?',
        subtitle: 'If your business is struggling with stock and distribution, now is the time to switch to a digital system.',
        btn1: 'Free Consultation',
        btn2: 'Build Your WMS'
      }
    },
    portfolioCompanyProfile: {
      seo: {
        title: 'Professional Company Profile Website for Businesses | Source Code 99',
        description: 'Professional company profile website portfolio for MSMEs and companies. Increase credibility and appear on Google with Source Code 99.'
      },
      hero: {
        h1: 'Professional Company Profile Website Portfolio for Businesses',
        overview: 'Project Overview',
        desc1: 'Many companies offer excellent services. But without a professional company profile website, credibility becomes weak.',
        desc2: 'Through this project, Source Code 99 helped businesses establish a strong digital presence.',
        footer: 'A website is not just design. It is your company’s digital identity.'
      },
      goals: {
        title: 'Challenges',
        items: [
          'No official website',
          'Outdated and unprofessional design',
          'Unstructured company information',
          'Difficulty gaining trust from corporate clients',
          'No visibility on Google'
        ],
        footer: 'Without a digital profile, business opportunities are often lost.'
      },
      solutions: {
        title: 'Our Solution',
        subtitle: 'We developed a modern company profile website with:',
        items: [
          { title: 'Professional & Clean Design', desc: 'Clean, elegant look tailored to the company branding.' },
          { title: 'Structured SEO-Optimized Content', desc: 'About Us, Vision & Mission, Services, Portfolio, and Contact pages.' },
          { title: 'Mobile-Responsive Layout', desc: 'Optimized for both desktop and smartphone users.' },
          { title: 'Contact Form & WhatsApp Integration', desc: 'Making it easy for potential clients to reach out.' },
          { title: 'Search Engine Optimization Setup', desc: 'Ensuring the website is indexed and searchable on Google.' }
        ]
      },
      impact: {
        title: 'Measurable Results',
        subtitle: 'Within 3–6 months:',
        items: [
          'Improved brand credibility',
          'Higher corporate client inquiries',
          'Google search visibility',
          '±25% increase in inquiries',
          'Stronger professional image'
        ],
        footer: 'A company profile website is not optional anymore. It is a business necessity.'
      },
      why: {
        title: 'Why Companies Need a Company Profile Website?',
        subtitle: 'Today, before collaborating, people will search for you on Google. If you are not found — or the appearance is unconvincing — opportunities can be lost.',
        benefits: [
          'Increase trust',
          'Showcase professionalism',
          'Official information hub',
          'Support digital marketing strategies'
        ],
        footer: 'Source Code 99 helps companies from the planning stage until the website is ready to go online.'
      },
      cta: {
        title: 'Ready to Build Your Company Profile Website?',
        subtitle: 'Modern design. SEO-friendly structure. Ready to be your company’s digital representation.',
        btn1: 'Free Consultation Now',
        btn2: 'Build Your Company Profile Website'
      }
    },
    portfolioFinancial: {
      seo: {
        title: 'Financial Projection & Feasibility Study for IT Startups | Source Code 99',
        description: 'Financial projection and feasibility study services for IT startups and digital MSMEs. Prepare your product to be investor-ready with Source Code 99.'
      },
      hero: {
        h1: 'Financial Projection & Feasibility Study for IT Startups',
        overview: 'Project Overview',
        desc1: 'Many IT startups have strong ideas. But when facing investors, they struggle to answer revenue projections, burn rate, and monetization strategies.',
        desc2: 'Source Code 99 helps startups build investor-ready financial blueprints.',
        footer: 'A financial model is not just numbers. It is strategic direction.'
      },
      goals: {
        title: 'Challenges',
        items: [
          'No structured financial model',
          'No cash flow projections',
          'Lack of unit economics understanding',
          'Difficulty explaining ROI potential',
          'Pitch deck not supported by financial data'
        ],
        footer: 'A great product is not enough. Investors look at numbers.'
      },
      solutions: {
        title: 'Our Solution',
        subtitle: 'Source Code 99 supports startups in:',
        items: [
          { title: 'IT Product Feasibility Study', desc: 'Analysis of market size (TAM, SAM, SOM), competitors, business models, and risk mitigation.' },
          { title: '3–5 Year Financial Projection', desc: 'Revenue projection, cost structure, cash flow, break-even analysis, and ROI projection.' },
          { title: 'Financial Planner & Monetization', desc: 'Subscription models, transaction fees, freemium to premium, and pricing validation.' },
          { title: 'Investor-Ready Documentation', desc: 'Financial model spreadsheets, executive summaries, financial summary slides, and business blueprints.' }
        ]
      },
      saas: {
        title: '📊 SaaS Financial Metrics Projection',
        subtitle: 'We help IT startups structure key SaaS metrics that are the main focus for investors.',
        metrics: [
          { title: 'Monthly Recurring Revenue (MRR)', desc: 'Shows the stability of recurring monthly income.' },
          { title: 'Annual Recurring Revenue (ARR)', desc: 'Indicator of business scale & stability over a year.' },
          { title: 'Customer Acquisition Cost (CAC)', desc: 'Measures marketing costs to acquire one new customer.' },
          { title: 'Lifetime Value (LTV)', desc: 'Total expected revenue from one customer during their subscription.' },
          { title: 'Burn Rate & Runway', desc: 'Determines how long the startup can survive with available capital.' }
        ],
        projection: {
          title: '📈 3-Year Projection Example',
          items: [
            'Average revenue growth of 80% per year',
            'Gross margin 65–75%',
            'Break-even in year 2 or 3',
            'Valuation increases 3–5x after stable traction'
          ],
          footer: 'This prepares startups for Angel investors, Seed funding, or Venture capital.'
        }
      },
      impact: {
        title: 'Key Outcomes',
        subtitle: 'Startups we supported achieved:',
        items: [
          'Clear revenue projections',
          'Structured cost modeling',
          'Stronger investor confidence',
          'Better pitch deck validation'
        ],
        footer: 'Startups successfully secured early-stage funding and products are ready to go-to-market.'
      },
      why: {
        title: 'Why IT Startups Need a Financial Blueprint?',
        subtitle: 'Because investors don’t just buy ideas. They buy measurable growth potential.',
        benefits: [
          'Knowing burn rate',
          'Determining pricing strategy',
          'Calculating funding needs',
          'Determining initial valuation'
        ],
        footer: 'Without financial projections, a startup runs without a compass.'
      },
      cta: {
        title: 'Ready to Make Your Startup Investor-Ready?',
        subtitle: 'If you have an IT product and want to prepare it for funding or expansion, Source Code 99 is ready to build its financial foundation.',
        btn1: 'Consultation Strategy Session',
        btn2: 'Build Your Financial Blueprint'
      }
    },
    servicesDetail: {
      web: {
        h1: 'Professional Website Development Services for MSMEs & Companies',
        why: {
          title: 'Why is a Website Important?',
          desc1: 'Today, people search for you on Google first.',
          desc2: 'If not found — lost opportunity. If it doesn\'t look convincing — lost trust.',
          footer: 'A website is not just a formality. It is your business\'s digital face.'
        },
        what: {
          title: 'What Do We Build?',
          desc: 'We don\'t just make any website. We build websites that are:',
          items: ['Fast (speed optimized)', 'Mobile friendly', 'SEO-ready', 'Secure & stable', 'Easy to update']
        },
        features: {
          title: 'Key Features',
          items: [
            'Modern & clean design',
            'Google-friendly SEO structure',
            'Structured service pages',
            'WhatsApp & form integration',
            'Cloud hosting included',
            'Security + automatic backup'
          ]
        },
        caseStudy: {
          title: 'Case Study',
          desc: 'One of our clients is a construction service company.',
          before: ['No website', 'Hard to trust by big clients', 'Not appearing on Google'],
          after: ['Inquiry up ±30% in 4 months', 'Appearing on page 1 for local keywords', 'Easier closing due to professional look'],
          footer: 'The right website helps businesses look serious.'
        },
        who: {
          title: 'Who is it for?',
          items: ['MSMEs wanting to scale up', 'New companies needing branding', 'Service businesses wanting to look more credible']
        },
        cta: {
          title: 'Ready to have a website that truly works for your business?',
          btn1: 'Free Consultation Now',
          btn2: 'Build Your Professional Website Today'
        }
      },
      app: {
        h1: 'Web Application & Custom System Development Services',
        why: {
          title: 'Common Business Problems',
          desc: 'Still using manual Excel? Messy data? Slow operations?',
          footer: 'As business grows, manual systems become a bottleneck.'
        },
        what: {
          title: 'Solutions from Source Code 99',
          desc: 'We build custom web applications according to your business flow.',
          footer: 'Not templates. Not generic systems. But systems that follow your business workflow.'
        },
        features: {
          title: 'Features We Can Build',
          items: ['Admin dashboard', 'Multi-user & role management', 'Real-time data tracking', 'API integration', 'Automatic reports', 'Scalable system']
        },
        caseStudy: {
          title: 'Case Study',
          desc: 'Distributor client with 3,000+ SKU products.',
          before: ['Stock discrepancies', 'Manual process', 'Slow reports'],
          after: ['Efficiency up ±35%', 'Stock errors down 40%', 'Real-time reports'],
          footer: 'Systems don\'t just simplify. They save operational costs.'
        },
        who: {
          title: 'Suitable For:',
          items: ['Distributors', 'Startups', 'Service businesses', 'Companies with complex processes']
        },
        cta: {
          title: 'Need a system that makes your business more structured?',
          btn1: 'Discuss Your System Needs',
          btn2: 'Build Custom Web Application Now'
        }
      },
      mobile: {
        h1: 'Android & iOS App Development for Startups & MSMEs',
        why: {
          title: 'Why Mobile App?',
          desc: 'Because users are on smartphones.',
          footer: 'If you want your product to be used frequently, a mobile app is a strategic step.'
        },
        what: {
          title: 'What Do We Develop?',
          desc: 'We help from:',
          items: ['Feature planning', 'UI/UX design', 'Backend system', 'Deployment to store']
        },
        features: {
          title: 'General Features',
          items: ['Login & user management', 'Push notification', 'Payment integration', 'Real-time tracking', 'Admin dashboard', 'Analytics system']
        },
        caseStudy: {
          title: 'Case Study',
          desc: 'Food delivery startup.',
          before: ['Only via WhatsApp', 'Unstructured orders'],
          after: ['Order increased ±50% in 6 months', 'Faster process', 'Stronger branding'],
          footer: 'Mobile app increases engagement & retention.'
        },
        who: {
          title: 'Suitable For:',
          items: ['Digital startups', 'Delivery services', 'Niche marketplaces', 'Subscription-based businesses']
        },
        cta: {
          title: 'Have an app idea?',
          btn1: 'Consult Your Idea',
          btn2: 'Realize Your Mobile App Now'
        }
      },
      financial: {
        h1: 'Feasibility Study & Financial Projection for IT Startups',
        why: {
          title: 'Startup Problems',
          desc: 'Many startups have ideas.',
          footer: 'But when pitching investors, they struggle with revenue projections, break-even, burn rate, and monetization strategy. Without a financial blueprint, startups run without direction.'
        },
        what: {
          title: 'What Do We Help With?',
          items: ['IT product feasibility study', '3–5 year financial projection', 'MRR / ARR modelling', 'Burn rate & runway', 'Monetization strategy', 'Investor-ready documentation']
        },
        caseStudy: {
          title: 'Case Study',
          desc: 'SaaS HR system startup.',
          before: ['No clear projection', 'Less convincing pitch deck'],
          after: ['Realistic revenue projection', 'Calculated LTV:CAC ratio', 'Break-even in year 2', 'More ready to meet angel investors'],
          footer: 'Clear numbers increase investor confidence.'
        },
        who: {
          title: 'Suitable For:',
          items: ['Early-stage startups', 'Founders wanting to fundraise', 'Digital MSMEs wanting to scale']
        },
        cta: {
          title: 'Ready to take your startup to the next level?',
          btn1: 'Booking Strategy Session',
          btn2: 'Prepare Your Startup to Go-To-Invest'
        }
      }
    }
  }
};
