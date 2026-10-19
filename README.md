# کارگاه هارمونی · Harmony Workshop

یادگیری **عملی** هارمونی و تئوری موسیقی به فارسی، به سبک دولینگو، با **پیانو** یا **گیتار**.

A bilingual (Persian RTL / English LTR), Duolingo-style web app for learning harmony and music theory through hands-on practice—not just reading—with **piano** or **guitar**.

> یک اپلیکیشن مستقل مبتنی بر HTML؛ بدون سرور، بدون فرایند ساخت پیچیده و بدون نیاز به حساب کاربری. پیشرفت فقط در مرورگر خودتان ذخیره می‌شود.

> A standalone HTML-based app with no server, complicated build process, or user account required. Your progress is stored locally in your browser.

## زبان‌ها · Languages

اپ **دوزبانه** است و از فارسی و انگلیسی پشتیبانی می‌کند. با دکمهٔ کوچک تغییر زبان در بالای صفحه، زبان را عوض کنید. انتخاب شما در `localStorage` با کلید `hw-lang` ذخیره می‌شود و در اولین اجرا، زبان مرورگر تعیین‌کننده است.

The app supports both **Persian and English**. Use the small language toggle in the header to switch languages. Your choice is saved in `localStorage` under `hw-lang`. On the first visit, the app defaults to your browser's language.

**برای مشارکت · Contributing to translations**

متن‌های اصلی در `src/app.js` و `src/practice.js` به فارسی نوشته شده‌اند. اسکریپت `i18n/tool.js` هنگام اجرای `python3 build.py` رشته‌های فارسی را با کلیدهای پایدار به جدول ترجمهٔ `[فارسی, English]` تبدیل می‌کند. ترجمه‌های انگلیسی در فایل‌های `i18n/en/*.json` قرار دارند و کلید هر ترجمه، هش متن فارسی آن است.

اگر متن فارسی را تغییر دهید، هش آن نیز تغییر می‌کند و فرایند ساخت با هشدار `untranslated` اطلاع می‌دهد که ترجمه‌ای وجود ندارد. ترجمهٔ جدید را به `i18n/en/extra.json` اضافه کنید.

Source strings are written in Persian in `src/app.js` and `src/practice.js`. During `python3 build.py`, `i18n/tool.js` converts Persian strings into stable translation entries in the `[Persian, English]` table. English translations are stored in `i18n/en/*.json`, using a hash of the Persian source text as the key.

If you change a Persian string, its hash changes too. The build process will issue an `untranslated` warning when the corresponding translation is missing. Add the new translation to `i18n/en/extra.json`.

Building requires Node.js. Run `npm install` to install dependencies such as Acorn.

## امکانات · Features

- **۱۰ واحد، ۵۲ درس و بیش از ۵۶۰ تمرین**؛ شامل پرسش‌های چندگزینه‌ای، ساخت آکورد و گام، تمرین شنیداری، تطبیق و تمرین‌های مبتنی بر گروو. مباحث از نت‌ها و فاصله‌ها تا ii–V–I، دومینانت ثانویه، آکوردهای آلتره، تغییر کلید و هارمونی منفی را پوشش می‌دهند.

  **10 units, 52 lessons, and over 560 exercises**, including multiple-choice questions, chord and scale building, ear training, matching, and groove-based activities. Topics range from notes and intervals to ii–V–I, secondary dominants, altered chords, key changes, and negative harmony.

- **درسنامه‌های ساده و تصویری** با کارت‌های کوتاه، مثال‌ها، نمایش کلاویه‌های پیانو و نمودار شکل آکوردهای گیتار.

  **Simple, visual lessons** featuring concise cards, examples, piano-key visualizations, and guitar chord diagrams.

- **تمرین عملی ساز برای تمام ۵۲ درس**، با مسیرهای جداگانه برای پیانو و گیتار؛ شامل هدف تمرین، مراحل اجرا و راهنمای تشخیص پاسخ درست.

  **Hands-on instrument practice for all 52 lessons**, with separate piano and guitar paths, practice goals, step-by-step instructions, and guidance for checking your results.

- **تشخیص نت با میکروفون** با استفاده از کتابخانهٔ [Pitchy](https://github.com/ianprime0509/pitchy) و تشخیص‌دهندهٔ داخلی؛ به‌علاوهٔ **پشتیبانی از کنترلر MIDI** از طریق Web MIDI در Chrome و Edge. کارت‌های تمرین، نت‌های هدف را به‌صورت چک‌لیست نمایش می‌دهند.

  **Microphone-based pitch detection** using [Pitchy](https://github.com/ianprime0509/pitchy) and a built-in detector, plus **MIDI controller support** through Web MIDI in Chrome and Edge. Practice cards include checklists of target notes.

- **کارگاه پیانو** با ۱۲ درس تعاملی، تمرین نت‌خوانی و ارزیابی ریتم.

  **Piano Workshop** with 12 interactive lessons, sight-reading practice, and rhythm assessment.

- سیستم امتیاز تجربه (XP)، استریک روزانه، مرور اشتباهات، آزمون تعیین سطح و تم روز و شب.

  Experience points (XP), daily streaks, mistake review, a placement test, and light and dark themes.

- **پشتیبان‌گیری از پیشرفت** در قالب فایل JSON یا متن، همراه با **پشتیبانی از کار آفلاین** از طریق PWA روی GitHub Pages.

  **Progress backup and restore** through JSON or text files, plus **offline support** through a Progressive Web App (PWA) hosted on GitHub Pages.

## اجرا · Getting Started

```bash
git clone https://github.com/<you>/harmony-workshop.git
cd harmony-workshop
python3 -m http.server 8000
```

سپس آدرس `http://localhost:8000` را در مرورگر باز کنید.

Then open `http://localhost:8000` in your browser.

می‌توانید فایل `index.html` را مستقیماً هم باز کنید؛ اما برای استفاده از میکروفون، MIDI و قابلیت‌های آفلاین، برنامه باید از طریق `https://` یا `localhost` اجرا شود.

You can also open `index.html` directly. However, microphone access, MIDI, and offline features require the app to run over `https://` or `localhost`.

## ساختار پروژه · Project Structure

```text
index.html            خروجی ساخته‌شده؛ همین فایل منتشر می‌شود
src/template.html     پوستهٔ صفحه
src/style.css         همهٔ استایل‌ها
src/app.js            موتور تئوری، محتوای درس‌ها، رابط، صدا و کارگاه پیانو
src/practice.js       تمرین‌های ساز (۵۲ درس × پیانو/گیتار) و شکل‌های آکورد گیتار
build.py              ساخت index.html از فایل‌های src/
sw.js, manifest.*     قابلیت‌های PWA و آفلاین
tests/smoke.js        تست دودی با Playwright
docs/CONTENT.md       راهنمای نوشتن درس و تمرین
```

```text
index.html            Generated build output; this is the published file
src/template.html     Page template
src/style.css         All styles
src/app.js            Theory engine, lesson content, UI, audio, and Piano Workshop
src/practice.js       Instrument practice (52 lessons × piano/guitar) and guitar chord shapes
build.py              Builds index.html from src/
sw.js, manifest.*     PWA and offline support
tests/smoke.js        Playwright smoke test
docs/CONTENT.md       Guide to authoring lessons and exercises
```

بعد از هر تغییر در فایل‌های `src/`، پروژه را دوباره بسازید و تست‌ها را اجرا کنید:

After changing files in `src/`, rebuild the app and run the tests:

```bash
python3 build.py
npm install          # فقط بار اول؛ برای Playwright
npm test
```

```bash
python3 build.py
npm install          # First time only; installs dependencies for Playwright
npm test
```

## انتشار روی GitHub Pages · Deployment to GitHub Pages

یک workflow در `.github/workflows/pages.yml` وجود دارد که با هر `push` به شاخهٔ `main`، تست‌ها را اجرا می‌کند و سایت را منتشر می‌کند.

A workflow in `.github/workflows/pages.yml` runs the tests and deploys the site whenever changes are pushed to the `main` branch.

برای فعال‌سازی انتشار، در تنظیمات مخزن به مسیر زیر بروید:

To enable deployment, navigate to:

**Settings → Pages → Source: GitHub Actions**

## وابستگی‌های بیرونی · External Dependencies

این منابع هنگام اجرای برنامه استفاده می‌شوند:

These resources are used at runtime:

| مورد · Resource | منبع · Source | مجوز · License |
| --- | --- | --- |
| فونت‌های Vazirmatn و JetBrains Mono · Vazirmatn and JetBrains Mono fonts | Google Fonts | SIL OFL |
| کتابخانهٔ تشخیص فرکانس Pitchy · Pitch detection library | cdn.jsdelivr.net | 0BSD |
| نمونه‌های صدای پیانو Salamander Grand Piano v3 (Alexander Holm) · Piano samples | tonejs.github.io / jsDelivr | CC BY 3.0 |

اگر کتابخانهٔ Pitchy بارگذاری نشود، برنامه از تشخیص‌دهندهٔ داخلی استفاده می‌کند. اگر نمونه‌های صدای پیانو در دسترس نباشند، برنامه به صدای ساده‌تر برمی‌گردد.

If Pitchy fails to load, the app falls back to its built-in pitch detector. If the piano samples are unavailable, it falls back to a simpler synthesized sound.

## محدودیت‌های شناخته‌شده · Known Limitations

- **میکروفون تک‌صدایی است:** برای تشخیص آکورد، نت‌ها را جداگانه و به‌صورت آرپژ اجرا کنید. تشخیص هم‌زمان چند نت هنوز پیاده‌سازی نشده است.

  **The microphone detector is monophonic:** Play chord notes separately as an arpeggio. Simultaneous chord recognition is not yet supported.

- ارزیابی دقیق ریتم هنگام نواختن ساز واقعی، از جمله تأثیر تأخیر صدا، هنوز به‌طور کامل آزمایش نشده است.

  Precise rhythm assessment with a physical instrument, including audio latency, has not yet been fully tested.

- پیشرفت فقط در مرورگر فعلی ذخیره می‌شود. برای انتقال آن به دستگاه یا مرورگر دیگر، از قابلیت پشتیبان‌گیری استفاده کنید.

  Progress is stored only in the current browser. Use the backup feature to transfer it to another device or browser.

- فایل `src/app.js` هنوز بزرگ است. تقسیم آن به ماژول‌های کوچک‌تر در نقشهٔ راه قرار دارد.

  The `src/app.js` file is still large. Splitting it into smaller modules is on the roadmap.

## نقشهٔ راه · Roadmap

- تشخیص هم‌زمان آکورد با روش‌های کروماتیک و تبدیل فوریهٔ سریع (FFT).

  Simultaneous chord recognition using chroma features and Fast Fourier Transform (FFT).

- تمرین ریتم با ضربه‌های کاربر و سنجش دقت اجرا.

  Rhythm exercises using user taps and timing-accuracy measurement.

- برنامهٔ مرور فاصله‌دار با عنوان «مرور امروز».

  A spaced-repetition feature called “Review Today.”

- تقسیم `app.js` به ماژول‌های محتوا، موتور و رابط کاربری.

  Split `app.js` into separate content, engine, and UI modules.

## مجوز · License

کد پروژه تحت مجوز MIT منتشر می‌شود؛ فایل `LICENSE` را ببینید. محتوای درس‌ها به‌صورت اصیل نوشته شده و از متن هیچ کتاب خاصی کپی نشده است.

The project code is released under the MIT License; see `LICENSE`. The lesson content is original and is not copied from any specific book.
