# دليل صور BookMart — أماكن الصور بالظبط
مهم جدًا: لازم اسم الملف يفضل زي ما هو مكتوب هنا بالظبط (نفس الحروف، ونفس امتداد `.jpg`) عشان يظهر أوتوماتيك من غير ما تلمس أي كود.
لو صورك مش .jpg (يعني .png أو .jpeg أو .webp)، قول لـ Claude يغيّرلك الامتداد في data/db.json بدل ما تحول الصور بنفسك.

## 1) صورة الهيدر (خلفية الصفحة الرئيسية)
- المسار: `public/images/header/hero.jpg`

## 2) صور الأصناف (اللي بتظهر في شريط الأصناف فوق صفحة Market)
- `public/images/categories/calculator.jpg` → Calculator
- `public/images/categories/notebook.jpg` → Notebook
- `public/images/categories/pencil.jpg` → Pencil
- `public/images/categories/backpack.jpg` → Backpack
- `public/images/categories/ballpoint-pen.jpg` → Ballpoint Pen
- `public/images/categories/eraser.jpg` → Eraser
- `public/images/categories/organizer.jpg` → Organizer

## 3) صور المنتجات (كل صنف وعدد صوره)

### Calculator — 9 صور
المجلد: `public/images/products/calculator/`

| اسم الملف | المنتج |
|---|---|
| `1.jpg` | Scientific Calculator |
| `2.jpg` | Basic Calculator |
| `3.jpg` | Graphing Calculator |
| `4.jpg` | Desktop Calculator |
| `5.jpg` | Pocket Calculator |
| `6.jpg` | Financial Calculator |
| `7.jpg` | Programmable Calculator |
| `8.jpg` | Dual Power Calculator |
| `9.jpg` | Calculator with Cover |

### Notebook — 9 صور
المجلد: `public/images/products/notebook/`

| اسم الملف | المنتج |
|---|---|
| `1.jpg` | A4 Ruled Notebook |
| `2.jpg` | Spiral Notebook |
| `3.jpg` | Pocket Notebook |
| `4.jpg` | Grid Notebook |
| `5.jpg` | Hardcover Notebook |
| `6.jpg` | Sketch Notebook |
| `7.jpg` | Composition Notebook |
| `8.jpg` | Mini Notebook |
| `9.jpg` | Leather Notebook |

### Pencil — 6 صور
المجلد: `public/images/products/pencil/`

| اسم الملف | المنتج |
|---|---|
| `1.jpg` | Wooden Pencil Pack (12) |
| `2.jpg` | Mechanical Pencil |
| `3.jpg` | Colored Pencils Set (24) |
| `4.jpg` | HB Pencil Pack |
| `5.jpg` | 2B Pencil Pack |
| `6.jpg` | Pencil with Eraser Top |

### Backpack — 9 صور
المجلد: `public/images/products/backpack/`

| اسم الملف | المنتج |
|---|---|
| `1.jpg` | Laptop Backpack |
| `2.jpg` | Mini Backpack |
| `3.jpg` | School Backpack |
| `4.jpg` | Trolley Backpack |
| `5.jpg` | Canvas Backpack |
| `6.jpg` | Waterproof Backpack |
| `7.jpg` | Sports Backpack |
| `8.jpg` | Backpack with USB Port |
| `9.jpg` | Backpack with Pencil Case |

### Ballpoint Pen — 9 صور
المجلد: `public/images/products/ballpoint-pen/`

| اسم الملف | المنتج |
|---|---|
| `1.jpg` | Blue Ballpoint Pen (Pack of 10) |
| `2.jpg` | Black Ballpoint Pen Set |
| `3.jpg` | Gel Pen Set (12 Colors) |
| `4.jpg` | Red Ballpoint Pen |
| `5.jpg` | Retractable Ballpoint Pen |
| `6.jpg` | Fine Point Ballpoint Pen |
| `7.jpg` | Ballpoint Pen Set (Multicolor) |
| `8.jpg` | Executive Ballpoint Pen |
| `9.jpg` | Ballpoint Pen with Grip |

### Eraser — 8 صور
المجلد: `public/images/products/eraser/`

| اسم الملف | المنتج |
|---|---|
| `1.jpg` | White Eraser Pack |
| `2.jpg` | Colored Eraser Pack |
| `3.jpg` | Kneaded Eraser |
| `4.jpg` | Jumbo Eraser |
| `5.jpg` | Eraser Set (Assorted Shapes) |
| `6.jpg` | Vinyl Eraser |
| `7.jpg` | Dust-Free Eraser |
| `8.jpg` | Mini Eraser Pack |

### Organizer — 9 صور
المجلد: `public/images/products/organizer/`

| اسم الملف | المنتج |
|---|---|
| `1.jpg` | Desk Organizer |
| `2.jpg` | Pencil Case |
| `3.jpg` | File Organizer |
| `4.jpg` | Drawer Organizer |
| `5.jpg` | Cable Organizer |
| `6.jpg` | Stationery Tray |
| `7.jpg` | Multi-Compartment Organizer |
| `8.jpg` | Mesh Organizer |
| `9.jpg` | Rotating Desk Organizer |

## طريقة التغيير
1. افتح `public/images/products/<اسم الصنف>/` أو `public/images/categories/` أو `public/images/header/`.
2. لاقي الملف اللي فيه نفس الاسم من الجدول فوق (مثلاً `3.jpg`).
3. احذفه أو استبدله بصورتك، وسمّي صورتك بنفس الاسم بالظبط (`3.jpg`).
4. اعمل حفظ، وارجع المتصفح واعمل تحديث عادي (F5) — الصورة هتظهر على طول من غير ما تلمس أي سطر كود.
