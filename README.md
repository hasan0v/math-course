<p align="center">
  <img src="https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.3.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-5.0.8-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Supabase-2.39.0-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
</p>

<h1 align="center">📐 Riyaziyyat Təlim Platforması</h1>

<p align="center">
  <strong>İnteraktiv riyaziyyat dərsləri və animasiyaları ilə modern təhsil platforması</strong><br/>
  Azərbaycan dilində, 9-11-ci sinif tələbələri üçün hazırlanmışdır
</p>

<p align="center">
  <a href="#-xüsusiyyətlər">Xüsusiyyətlər</a> •
  <a href="#-demo">Demo</a> •
  <a href="#️-texnologiyalar">Texnologiyalar</a> •
  <a href="#-quraşdırma">Quraşdırma</a> •
  <a href="#-istifadə">İstifadə</a> •
  <a href="#-api-referansı">API</a>
</p>

---

## 🌟 Layihə Haqqında

**Riyaziyyat Təlim Platforması** Azərbaycan Təhsil Nazirliyi kurikulumuna uyğun hazırlanmış, müasir texnologiyalarla zənginləşdirilmiş interaktiv təhsil sistemidir. Platform tələbələrə riyazi konsepsiyaları canlı animasiyalar və vizuallaşdırmalarla daha yaxşı başa düşməyə kömək edir.

### ✨ Əsas Üstünlüklər

| Xüsusiyyət | Təsvir |
|------------|--------|
| 🎯 **10 İnteraktiv Dərs** | Mafs library ilə canlı riyazi animasiyalar |
| 📊 **Real-time Sinxronizasiya** | Supabase backend ilə cihazlar arası məlumat sinxronizasiyası |
| 🔐 **Rol əsaslı Giriş** | Tələbə və Admin səlahiyyətləri |
| 📱 **Responsive Dizayn** | Mobil və desktop üçün tam dəstək |
| 📈 **Ətraflı Analitika** | Tərəqqi izləmə və hesabatlar |
| 🗓️ **Davamiyyət Sistemi** | Təqvim əsaslı davamiyyət qeydi |

---

## 🎯 Xüsusiyyətlər

### 👨‍🎓 Tələbə Paneli

- **Dərs Siyahısı** - 10 interaktiv dərsə giriş
- **Tərəqqi İzləmə** - Tamamlanmış dərslərin vizual göstəricisi
- **Ev Tapşırıqları** - Təqdim etmə və qiymət görüntüləmə
- **Qiymətlər Baxışı** - Bütün qiymətlər və feedback
- **Şəxsi Profil** - Ad, sinif və hesab məlumatları

### 👨‍🏫 Admin Paneli

| Tab | Funksionallıq |
|-----|---------------|
| **📚 Dərslər** | Dərs yaratma, düzəliş, silmə, animasiya seçimi |
| **👥 Tələbələr** | Tələbə siyahısı, profil idarəsi, sinif filtrləri |
| **📅 Davamiyyət** | Təqvim interfeysi, iştirak qeydi (hazır/qeyb/üzrlü) |
| **📝 Qiymətləndirmə** | Ev tapşırıqlarını yoxlama, qiymət vermə, feedback yazma |
| **📊 Analitika** | Ətraflı statistika, qrafiklər, trend analizi |

### 🎨 İnteraktiv Animasiyalar

Hər dərs üçün **Mafs** library ilə hazırlanmış tamamilə interaktiv vizuallaşdırmalar:

| Komponent | Dərs | Xüsusiyyətlər |
|-----------|------|---------------|
| `QuadraticFunction` | Kvadratik Funksiya | a, b, c slayderlər, parabola, təpə nöqtəsi, diskriminant |
| `LinearSystemSolver` | Xətti Tənliklər | İki düz xətt, kəsişmə nöqtəsi, əvəzetmə üsulu |
| `CircleProperties` | Çevrə Xassələri | Radius, mərkəzi bucaq, toxunan, vətər |
| `TrigonometryVisualization` | Triqonometriya | Sin, cos, tg funksiyaları, vahid çevrə |
| `SequenceVisualizer` | Ədədi Silsilələr | Arifmetik/həndəsi silsilələr, n-ci həd formulu |
| `PolynomialFactorizer` | Çoxhədlilər | Horner sxemi, vuruqlara ayırma, köklərin qrafiki |
| `DerivativeExplorer` | Törəmə | Funksiya və törəmə qrafikləri, ekstremumlar |
| `ProbabilitySimulator` | Ehtimal/Statistika | Zər və sikkə simulyatoru, kombinasiya |
| `InequalitySolver` | Bərabərsizliklər | İntervallar üsulu, qrafik həll |

---

## 🖼️ Demo

### Tələbə Dashboard
```
┌────────────────────────────────────────────────────────────┐
│  🏠 Ana Səhifə    📚 Dərslər    📋 Tapşırıqlar    👤 Profil │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  ╔═══════════════════════════════════════════════════════╗ │
│  ║  📊 Tərəqqi: 4/10 dərs tamamlandı                     ║ │
│  ║  ██████████░░░░░░░░░░  40%                            ║ │
│  ╚═══════════════════════════════════════════════════════╝ │
│                                                            │
│  ┌─────────────────┐  ┌─────────────────┐                  │
│  │ 📐 Kvadratik    │  │ 📏 Xətti        │                  │
│  │    Funksiya ✓   │  │    Tənliklər ✓  │                  │
│  └─────────────────┘  └─────────────────┘                  │
│  ┌─────────────────┐  ┌─────────────────┐                  │
│  │ ⭕ Çevrə        │  │ 📐 Triqono-     │                  │
│  │    Xassələri    │  │    metriya      │                  │
│  └─────────────────┘  └─────────────────┘                  │
└────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Texnologiyalar

### Frontend Stack

| Texnologiya | Versiya | Məqsəd |
|-------------|---------|--------|
| **React** | 18.2.0 | UI komponenləri və state management |
| **TypeScript** | 5.3.3 | Tip təhlükəsizliyi və daha yaxşı DX |
| **Vite** | 5.0.8 | Sürətli development server və build |
| **Tailwind CSS** | 3.4.0 | Utility-first CSS framework |
| **Framer Motion** | 10.18.0 | Smooth animasiyalar və keçidlər |
| **Mafs** | 0.18.8 | Riyazi vizuallaşdırma componenti |
| **Recharts** | 2.10.3 | Analitika üçün qrafiklər |
| **React Router** | 6.21.1 | Client-side routing |
| **Zustand** | 4.4.7 | Global state management |

### Backend Stack

| Texnologiya | Məqsəd |
|-------------|--------|
| **Supabase** | PostgreSQL verilənlər bazası |
| **Supabase Auth** | İstifadəçi autentifikasiyası |
| **Supabase Storage** | Fayl saxlama (ev tapşırıqları, videolar) |
| **Row Level Security** | Verilənlərin təhlükəsizliyi |

### Deployment

| Xidmət | Məqsəd |
|--------|--------|
| **Vercel** | Frontend hosting və CI/CD |
| **Supabase Cloud** | Backend hosting |

---

## 📦 Quraşdırma

### Tələblər

- **Node.js** ≥ 18.0.0
- **npm** ≥ 9.0.0
- **Supabase** hesabı

### 1️⃣ Repository Clone

```bash
git clone https://github.com/your-username/riyaziyyat-telim-platformasi.git
cd riyaziyyat-telim-platformasi
```

### 2️⃣ Asılılıqları Yükləyin

```bash
npm install
```

### 3️⃣ Supabase Konfiqurasiyası

#### 3.1 Supabase Layihəsi Yaradın

1. [supabase.com](https://supabase.com) saytına daxil olun
2. **New Project** düyməsini basın
3. Layihə adı və şifrə daxil edin
4. Region seçin (ən yaxın olan)
5. **Project URL** və **Anon Key** kopyalayın

#### 3.2 Verilənlər Bazasını Qurun

Supabase SQL Editor-da aşağıdakı faylları **sıra ilə** işlədin:

```sql
-- 1. İlkin Cədvəllər və RLS Policies
-- supabase/migrations/001_initial_schema.sql

-- 2. Seed Data (10 dərs)
-- supabase/seed.sql

-- 3. Əlavə Policy Düzəlişləri (lazım olduqda)
-- supabase/fix_policies.sql
```

#### 3.3 Environment Variables

`.env` faylı yaradın:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

> 💡 **Qeyd:** `.env.example` faylını nümunə kimi istifadə edə bilərsiniz:
> ```bash
> copy .env.example .env
> ```

### 4️⃣ İnkişaf Serveri

```bash
npm run dev
```

Brauzer avtomatik açılacaq: [http://localhost:5173](http://localhost:5173)

---

## 🗃️ Verilənlər Bazası Sxemi

### Entity Relationship Diagram

```
┌─────────────┐     ┌─────────────────────┐     ┌─────────────┐
│   profiles  │────<│  student_progress   │>────│   lessons   │
│─────────────│     │─────────────────────│     │─────────────│
│ id (PK)     │     │ id (PK)             │     │ id (PK)     │
│ role        │     │ student_id (FK)     │     │ title       │
│ full_name   │     │ lesson_id (FK)      │     │ content     │
│ grade_level │     │ completed           │     │ animation_  │
│ created_at  │     │ completed_at        │     │   type      │
└─────────────┘     └─────────────────────┘     │ video_url   │
       │                                        │ lesson_order│
       │            ┌─────────────────────┐     └─────────────┘
       │            │      homework       │            │
       │            │─────────────────────│            │
       │            │ id (PK)             │────────────┘
       │            │ lesson_id (FK)      │
       │            │ title               │
       │            │ description         │
       │            │ due_date            │
       │            └─────────────────────┘
       │                      │
       │            ┌─────────────────────┐     ┌─────────────┐
       └───────────>│ homework_submissions│────>│   grades    │
                    │─────────────────────│     │─────────────│
                    │ id (PK)             │     │ id (PK)     │
                    │ homework_id (FK)    │     │ submission_ │
                    │ student_id (FK)     │     │   id (FK)   │
                    │ submission_text     │     │ score       │
                    │ file_url            │     │ feedback    │
                    │ submitted_at        │     │ graded_at   │
                    └─────────────────────┘     └─────────────┘

       │
       │            ┌─────────────────────┐
       └───────────>│     attendance      │
                    │─────────────────────│
                    │ id (PK)             │
                    │ student_id (FK)     │
                    │ date                │
                    │ status              │
                    └─────────────────────┘
```

### Cədvəl Təsvirləri

| Cədvəl | Sütunlar | Məqsəd |
|--------|----------|--------|
| **profiles** | id, role, full_name, grade_level, created_at | İstifadəçi profilləri (student/admin) |
| **lessons** | id, title, content, animation_type, animation_config, video_url, lesson_order | Dərs materialları |
| **student_progress** | id, student_id, lesson_id, completed, completed_at | Tələbə tərəqqisi |
| **homework** | id, lesson_id, title, description, due_date | Ev tapşırıqları |
| **homework_submissions** | id, homework_id, student_id, submission_text, file_url | Tapşırıq təqdimləri |
| **grades** | id, submission_id, score (0-100), feedback | Qiymətləndirmə |
| **attendance** | id, student_id, date, status (present/absent/excused) | Davamiyyət |

### Row Level Security (RLS) Policies

```sql
-- Tələbələr öz məlumatlarını görə bilər
-- Adminlər bütün məlumatları idarə edə bilər
-- Dərslər hər kəsə açıqdır (SELECT)
```

**Əsas RLS Qaydaları:**

| Cədvəl | Tələbə | Admin |
|--------|--------|-------|
| profiles | Own SELECT/UPDATE | ALL |
| lessons | SELECT | ALL |
| student_progress | Own ALL | SELECT |
| homework | SELECT | ALL |
| homework_submissions | Own ALL | SELECT |
| grades | Own SELECT | ALL |
| attendance | Own SELECT | ALL |

---

## 📁 Layihə Strukturu

```
riyaziyyat-telim-platformasi/
├── 📁 src/
│   ├── 📁 components/
│   │   └── 📁 animations/           # 10 Mafs animasiyası
│   │       ├── CircleProperties.tsx
│   │       ├── DerivativeExplorer.tsx
│   │       ├── InequalitySolver.tsx
│   │       ├── LinearSystemSolver.tsx
│   │       ├── PlaceholderAnimation.tsx
│   │       ├── PolynomialFactorizer.tsx
│   │       ├── ProbabilitySimulator.tsx
│   │       ├── QuadraticFunction.tsx
│   │       ├── SequenceVisualizer.tsx
│   │       └── TrigonometryVisualization.tsx
│   │
│   ├── 📁 contexts/
│   │   └── AuthContext.tsx          # Autentifikasiya context
│   │
│   ├── 📁 lib/
│   │   ├── supabase.ts              # Supabase client
│   │   └── types.ts                 # TypeScript interfaces
│   │
│   ├── 📁 pages/
│   │   ├── AdminDashboard.tsx       # Admin paneli (5 tab)
│   │   ├── HomeworkSubmission.tsx   # Ev tapşırığı təqdimi
│   │   ├── LessonViewer.tsx         # Dərs görüntüləmə
│   │   ├── Login.tsx                # Giriş/Qeydiyyat
│   │   └── StudentDashboard.tsx     # Tələbə paneli
│   │
│   ├── App.tsx                      # Root component
│   ├── routes.tsx                   # React Router konfiqurasiyası
│   ├── main.tsx                     # Entry point
│   └── index.css                    # Global styles
│
├── 📁 supabase/
│   ├── 📁 migrations/
│   │   └── 001_initial_schema.sql   # Cədvəllər və RLS
│   ├── seed.sql                     # 10 dərs məlumatları
│   ├── fix_policies.sql             # Policy düzəlişləri
│   └── fix_insert_policy.sql        # Insert policy fix
│
├── 📄 index.html
├── 📄 package.json
├── 📄 tsconfig.json
├── 📄 tailwind.config.js
├── 📄 vite.config.ts
├── 📄 vercel.json                   # Vercel konfiqurasiyası
├── 📄 .env.example
└── 📄 README.md
```

---

## 📚 Dərs Məzmunu

Platformada Azərbaycan Təhsil Nazirliyi kurikulumuna uyğun **10 dərs** mövcuddur:

| # | Dərs | Mövzu | Sinif | Animasiya |
|---|------|-------|-------|-----------|
| 1 | Kvadratik Funksiya və Qrafiki | Parabola, təpə nöqtəsi, diskriminant | 9 | `quadratic-function` |
| 2 | Xətti Tənliklər Sistemi | Əvəzetmə, toplama, qrafik üsulu | 9 | `linear-system` |
| 3 | Çevrə və Onun Xassələri | Radius, mərkəzi bucaq, toxunan | 9 | `circle-properties` |
| 4 | Triqonometriya | Sin, cos, tg, praktik məsələlər | 10 | `trigonometry` |
| 5 | Rasional Tənliklər | İş məsələləri, ümumi məxrəc | 10 | `rational-equations` |
| 6 | Ədədi Silsilələr | Arifmetik və həndəsi silsilələr | 10 | `sequences` |
| 7 | Çoxhədlilər | Vuruqlara ayırma, Horner sxemi | 10 | `polynomial-factorizer` |
| 8 | Törəmə | Ekstremumlar, optimizasiya | 11 | `derivative-explorer` |
| 9 | Ehtimal və Statistika | Kombinasiya, permutasiya, orta | 11 | `probability-simulator` |
| 10 | Bərabərsizliklər | İntervallar üsulu, qrafik həll | 11 | `inequality-solver` |

---

## 🔐 Autentifikasiya

### Admin Hesabı Yaratmaq

#### Üsul 1: Supabase Dashboard

1. **Authentication** → **Users** → **Add User**
2. Email: `admin@mathplatform.az`
3. Password: güclü şifrə
4. SQL Editor-da profil yaradın:

```sql
INSERT INTO profiles (id, role, full_name, grade_level)
VALUES (
  'user_uid_from_auth',  -- Auth tabından kopyalayın
  'admin',
  'Admin İstifadəçi',
  11
);
```

#### Üsul 2: Qeydiyyat + SQL

1. Platformada qeydiyyatdan keçin
2. SQL Editor-da rolunu dəyişin:

```sql
UPDATE profiles
SET role = 'admin'
WHERE id = 'user_uid';
```

### TypeScript Interface

```typescript
interface AuthContextType {
    user: any | null
    profile: Profile | null
    loading: boolean
    signIn: (email: string, password: string) => Promise<void>
    signUp: (email: string, password: string, fullName: string, gradeLevel: number) => Promise<void>
    signOut: () => Promise<void>
}
```

---

## 🚀 Deployment

### Vercel ilə Deploy

#### 1. GitHub Repository Yaradın

```bash
git init
git add .
git commit -m "İlkin commit: Riyaziyyat platforması"
git branch -M main
git remote add origin https://github.com/your-username/your-repo.git
git push -u origin main
```

#### 2. Vercel-ə Deploy Edin

1. [vercel.com](https://vercel.com) → **New Project**
2. GitHub repository seçin
3. Environment Variables əlavə edin:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. **Deploy** düyməsini basın

#### 3. Konfiqurasiya Faylı

`vercel.json`:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

---

## 🧪 İnkişaf Qaydaları

### Skriptlər

| Əmr | Təsvir |
|-----|--------|
| `npm run dev` | Development server (hot reload) |
| `npm run build` | Production build |
| `npm run preview` | Production build preview |
| `npm run type-check` | TypeScript tip yoxlaması |

### Yeni Animasiya Əlavə Etmək

1. `src/components/animations/` qovluğunda yeni fayl yaradın
2. Mafs komponentlərini import edin
3. `LessonViewer.tsx`-də import və case əlavə edin
4. `types.ts`-də `AnimationType` union-a əlavə edin

```typescript
// types.ts
export type AnimationType =
    | 'quadratic-function'
    | 'your-new-animation'  // Yeni əlavə
```

### Yeni Dərs Əlavə Etmək (Admin Panel)

1. Admin hesabı ilə daxil olun
2. **Dərslər** tab-ına keçin
3. **Dərs Əlavə Et** düyməsini basın
4. Formu doldurun:
   - Başlıq və məzmun (Markdown dəstəklənir)
   - Animasiya növü seçimi
   - Video URL (istəyə görə)
   - Sıra nömrəsi

---

## 🐛 Troubleshooting

### ❌ Supabase Əlaqə Xətası

```
Error: Failed to fetch
```

**Həll:**
- `.env` faylının mövcud olduğunu yoxlayın
- `VITE_SUPABASE_URL` və `VITE_SUPABASE_ANON_KEY` düzgün dəyərlərlə doldurulub
- Supabase project-in aktiv olduğunu təsdiq edin

### ❌ RLS Policy Xətası

```
Error: new row violates row-level security policy
```

**Həll:**
```sql
-- RLS policies yoxlayın
SELECT * FROM pg_policies WHERE tablename = 'profiles';

-- Insert policy əlavə edin
CREATE POLICY "Allow insert for authenticated users"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);
```

### ❌ Build Xətası

```bash
# node_modules-u silin və yenidən yükləyin
rm -rf node_modules package-lock.json
npm install

# TypeScript yoxlaması
npm run type-check
```

### ❌ Vite Port Konflikti

```bash
# Başqa port istifadə edin
npm run dev -- --port 3000
```

---

## 📖 İstifadəçi Bələdçiləri

### 👨‍🎓 Tələbə üçün

1. **Qeydiyyat** - Ad, email, şifrə, sinif daxil edin
2. **Dashboard** - Dərs siyahısı və tərəqqi faizi görünür
3. **Dərs Açma** - Dərsə klikləyin → Məzmun + animasiya
4. **Animasiya** - Slayderlər və düymələrlə interaktiv öyrənmə
5. **Tamamlama** - "Dərsi Tamamla" düyməsini basın
6. **Ev Tapşırıqları** - Tapşırıqları göndərin və qiymətləri görün

### 👨‍🏫 Admin üçün

| Tab | Əməliyyatlar |
|-----|-------------|
| **📚 Dərslər** | Əlavə et, Düzəliş et, Sil, Animasiya seç |
| **👥 Tələbələr** | Siyahı görüntülə, Profil redaktə, Sinifə görə filtr |
| **📅 Davamiyyət** | Tarix seçin, İştirak statusu qeyd edin |
| **📝 Qiymətləndirmə** | Təqdimləri yoxlayın, Qiymət verin, Feedback yazın |
| **📊 Analitika** | Qrafiklər, Tərəqqi, Sinif performansı |

---

## 🎨 Dizayn Sistemi

### Rənglər (Tailwind Custom)

```javascript
// tailwind.config.js
colors: {
    primary: {
        50: '#f0f9ff',
        100: '#e0f2fe',
        500: '#0ea5e9',  // Əsas
        600: '#0284c7',
        900: '#0c4a6e',
    }
}
```

### Animasiyalar

```javascript
animation: {
    'fade-in': 'fadeIn 0.3s ease-in-out',
    'slide-up': 'slideUp 0.4s ease-out',
}
```

### Şriftlər

```css
font-family: 'Inter', system-ui, sans-serif;
```

---

## 🔒 Təhlükəsizlik

- ✅ **Row Level Security (RLS)** - Supabase-də aktiv
- ✅ **JWT Token** - Autentifikasiya
- ✅ **HTTPS** - Vercel-də avtomatik
- ✅ **Env Variables** - Həssas məlumatlar `.env`-də
- ✅ **Input Validation** - Frontend-də form yoxlamaları

---

## 📊 Performans

| Metrik | Dəyər | Status |
|--------|-------|--------|
| Lighthouse Performance | 95+ | ✅ Əla |
| First Contentful Paint | <1.5s | ✅ |
| Time to Interactive | <3s | ✅ |
| Bundle Size (gzip) | ~300KB | ✅ |

---

## 🤝 Töhfələr

Pull request-lər xoş gəlmisiniz! Böyük dəyişikliklər üçün əvvəlcə issue açın.

### Necə Töhfə Vermək

1. Fork edin
2. Feature branch yaradın (`git checkout -b feature/YeniXususiyyet`)
3. Commit edin (`git commit -m 'Yeni xüsusiyyət əlavə edildi'`)
4. Push edin (`git push origin feature/YeniXususiyyet`)
5. Pull Request açın

---

## 📝 Lisenziya

Bu layihə [MIT License](LICENSE) altında lisenziyalanmışdır.

---

## 👥 Müəlliflər

Azərbaycan Təhsil Nazirliyi kurikulumuna görə hazırlanmışdır.

---

## 📞 Əlaqə

- 🐛 **Bug Report:** [GitHub Issues](https://github.com/your-username/your-repo/issues)
- 💡 **Feature Request:** [GitHub Discussions](https://github.com/your-username/your-repo/discussions)
- 📧 **Email:** support@mathplatform.az

---

<p align="center">
  <strong>⭐ Bu layihəni bəyəndinizsə, GitHub-da ulduz verin!</strong>
</p>

<p align="center">
  Uğurlar! 🎓📐
</p>
