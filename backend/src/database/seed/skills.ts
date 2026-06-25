const SEED_SKILLS = [
  {
    title: "Expo",
    imageUrl:
      "https://res.cloudinary.com/dyhzh3ybt/image/upload/v1782207244/portfolio/skills/bzccq6fmsjqio1ue3iax.png",
    sortOrder: 1,
    details: [
      {
        name: "Setup Development Environment",
        description:
          "Setup, develop and maintain React Native Expo for Android, iOS and Web on macOS, Windows and Linux.",
        descriptionI18n: {
          ar: "إعداد وتطوير والحفاظ على React Native Expo لأندرويد و iOS والويب على macOS و Windows و Linux.",
          cn: "在 macOS、Windows 和 Linux 上为 Android、iOS 和 Web 设置、开发和维护 React Native Expo。",
          id: "Menyiapkan, mengembangkan, dan memelihara React Native Expo untuk Android, iOS, dan Web di macOS, Windows, dan Linux.",
          jp: "macOS、Windows、Linux 上で Android、iOS、Web 向けの React Native Expo をセットアップ、開発、保守する。",
          ru: "Настройка, разработка и поддержка React Native Expo для Android, iOS и Web на macOS, Windows и Linux.",
        },
        sortOrder: 0,
      },
      {
        name: "Expo Go",
        description:
          "Quickly experiment and design prototyping with native Android and iOS apps.",
        descriptionI18n: {
          ar: "التجربة والتصميم السريع للنماذج الأولية مع تطبيقات أندرويد و iOS الأصلية.",
          cn: "使用原生 Android 和 iOS 应用快速进行实验和原型设计。",
          id: "Bereksperimen dan merancang prototipe dengan cepat menggunakan aplikasi native Android dan iOS.",
          jp: "ネイティブの Android および iOS アプリで、素早く実験やプロトタイプ設計を行う。",
          ru: "Быстрое экспериментирование и прототипирование с нативными приложениями Android и iOS.",
        },
        sortOrder: 1,
      },
      {
        name: "Expo Development Build",
        description:
          "In-depth experiment and design prototyping with any native library and configuration for Android and iOS apps and web.",
        descriptionI18n: {
          ar: "تجربة وتصميم نماذج أولية متعمقة باستخدام أي مكتبة أصلية وتكوين مخصص لتطبيقات أندرويد و iOS والويب.",
          cn: "针对 Android、iOS 应用和 Web,使用任意原生库和配置进行深入的实验与原型设计。",
          id: "Eksperimen dan perancangan prototipe secara mendalam dengan library native dan konfigurasi apa pun untuk aplikasi Android, iOS, dan web.",
          jp: "Android、iOS アプリおよび Web 向けに、任意のネイティブライブラリと構成を用いた詳細な実験とプロトタイプ設計を行う。",
          ru: "Углублённое экспериментирование и прототипирование с использованием любых нативных библиотек и конфигураций для приложений Android, iOS и веба.",
        },
        sortOrder: 2,
      },
      {
        name: "Expo Application Services (EAS)",
        description:
          "Create build for development, preview and production both locally or using EAS Build.",
        descriptionI18n: {
          ar: "إنشاء إصدارات للتطوير والمعاينة والإنتاج، محليًا أو باستخدام EAS Build.",
          cn: "在本地或使用 EAS Build 为开发、预览和生产环境创建构建版本。",
          id: "Membuat build untuk development, preview, dan production baik secara lokal maupun menggunakan EAS Build.",
          jp: "ローカルまたは EAS Build を使用して、開発・プレビュー・本番用のビルドを作成する。",
          ru: "Создание сборок для разработки, предварительного просмотра и продакшена локально или с помощью EAS Build.",
        },
        sortOrder: 3,
      },
      {
        name: "Expo Web",
        description:
          "Building full-stack websites with React. Statically rendered for SEO and performance, or client-rendered for a more app-like experience in the browser.",
        descriptionI18n: {
          ar: "بناء مواقع متكاملة (full-stack) باستخدام React، مع تصيير ثابت لتحسين محركات البحث والأداء، أو تصيير من جانب العميل لتجربة أقرب إلى التطبيقات داخل المتصفح.",
          cn: "使用 React 构建全栈网站,可选择静态渲染以提升 SEO 与性能,或客户端渲染以在浏览器中获得更接近原生应用的体验。",
          id: "Membangun situs web full-stack dengan React. Dirender secara statis untuk SEO dan performa, atau dirender di sisi klien untuk pengalaman yang lebih menyerupai aplikasi di browser.",
          jp: "React によるフルスタック Web サイトの構築。SEO とパフォーマンスのための静的レンダリング、またはブラウザでよりアプリらしい体験を実現するクライアントレンダリングに対応。",
          ru: "Создание full-stack веб-сайтов с помощью React. Статический рендеринг для SEO и производительности или клиентский рендеринг для более похожего на приложение опыта в браузере.",
        },
        sortOrder: 4,
      },
      {
        name: "Expo Continous Native Generation (CNG)",
        description:
          "Keep up to date with the latest operating system releases to avoid falling too far behind in any third-party dependencies.",
        descriptionI18n: {
          ar: "متابعة آخر إصدارات نظام التشغيل للبقاء على اطلاع وتجنب التأخر كثيرًا في تبعيات الطرف الثالث.",
          cn: "持续跟进最新的操作系统版本,避免在第三方依赖上落后太多。",
          id: "Tetap mengikuti rilis sistem operasi terbaru agar tidak terlalu tertinggal dalam dependensi pihak ketiga.",
          jp: "最新の OS リリースに追従し、サードパーティ依存関係が大きく遅れないようにする。",
          ru: "Своевременное обновление до последних версий операционной системы, чтобы не сильно отставать в сторонних зависимостях.",
        },
        sortOrder: 5,
      },
      {
        name: "Expo GitHub Build",
        description:
          "Automatically triggers builds from GitHub repository using PR label, pushed code to the repository or manually from Expo Builds page.",
        descriptionI18n: {
          ar: "تشغيل عمليات البناء تلقائيًا من مستودع GitHub باستخدام تصنيف طلب السحب (PR label)، أو عند رفع الكود إلى المستودع، أو يدويًا من صفحة Expo Builds.",
          cn: "通过 PR 标签、向仓库推送代码,或从 Expo Builds 页面手动操作,自动从 GitHub 仓库触发构建。",
          id: "Memicu build secara otomatis dari repository GitHub menggunakan label PR, push kode ke repository, atau secara manual dari halaman Expo Builds.",
          jp: "PR ラベルの付与、リポジトリへのコードのプッシュ、または Expo Builds ページからの手動操作により、GitHub リポジトリからビルドを自動的にトリガーする。",
          ru: "Автоматический запуск сборок из репозитория GitHub с помощью метки PR, отправки кода в репозиторий или вручную со страницы Expo Builds.",
        },
        sortOrder: 6,
      },
      {
        name: "Expo Router",
        description:
          "Manage navigation between screens with file-based routing for Android, iOS and web applications.",
        descriptionI18n: {
          ar: "إدارة التنقل بين الشاشات باستخدام التوجيه القائم على الملفات (file-based routing) لتطبيقات أندرويد و iOS والويب.",
          cn: "通过基于文件的路由(file-based routing)管理 Android、iOS 和 Web 应用中屏幕间的导航。",
          id: "Mengelola navigasi antar layar dengan file-based routing untuk aplikasi Android, iOS, dan web.",
          jp: "ファイルベースルーティングを用いて、Android、iOS、Web アプリケーションの画面間ナビゲーションを管理する。",
          ru: "Управление навигацией между экранами с помощью файловой маршрутизации для приложений Android, iOS и веб-приложений.",
        },
        sortOrder: 7,
      },
    ],
  },
  {
    title: "Firebase",
    imageUrl:
      "https://res.cloudinary.com/dyhzh3ybt/image/upload/v1781161713/portfolio/skills/a0ich5doqko2pjf4gjsy.png",
    sortOrder: 1,
    details: [
      {
        name: "Authentication",
        description:
          "Setup and manage user authentication with email and password, Google sign in, anonnymous sign in and more.",
        descriptionI18n: {
          ar: "إعداد وإدارة مصادقة المستخدمين عبر البريد الإلكتروني وكلمة المرور، وتسجيل الدخول بحساب Google، والتسجيل المجهول وغير ذلك.",
          cn: "设置并管理用户身份验证,支持邮箱密码登录、Google 登录、匿名登录等多种方式。",
          id: "Menyiapkan dan mengelola autentikasi pengguna dengan email dan kata sandi, sign in Google, sign in anonim, dan lainnya.",
          jp: "メールアドレスとパスワード、Google サインイン、匿名サインインなど、ユーザー認証の設定と管理を行う。",
          ru: "Настройка и управление аутентификацией пользователей с помощью электронной почты и пароля, входа через Google, анонимного входа и других способов.",
        },
        sortOrder: 0,
      },
      {
        name: "Firestore Database",
        description:
          "Setup and manage rules for scalable NoSQL cloud database to store and synchronize data. Keep data in sync across client applications with real-time listeners and offline support.",
        descriptionI18n: {
          ar: "إعداد وإدارة قواعد قاعدة بيانات NoSQL السحابية القابلة للتوسع لتخزين البيانات ومزامنتها، مع إبقاء البيانات متزامنة بين تطبيقات العميل عبر المستمعين في الوقت الفعلي والدعم دون اتصال بالإنترنت.",
          cn: "设置并管理可扩展 NoSQL 云数据库的规则,用于存储和同步数据,并通过实时监听器和离线支持,在客户端应用之间保持数据同步。",
          id: "Menyiapkan dan mengelola rules untuk database cloud NoSQL yang scalable guna menyimpan dan menyinkronkan data. Menjaga data tetap sinkron di seluruh aplikasi klien dengan real-time listener dan dukungan offline.",
          jp: "スケーラブルな NoSQL クラウドデータベースのルールを設定・管理し、データの保存と同期を行う。リアルタイムリスナーとオフラインサポートにより、クライアントアプリケーション間でデータを同期させる。",
          ru: "Настройка и управление правилами масштабируемой облачной базы данных NoSQL для хранения и синхронизации данных. Поддержка синхронизации данных между клиентскими приложениями с помощью слушателей в реальном времени и офлайн-поддержки.",
        },
        sortOrder: 1,
      },
      {
        name: "Cloud Storage",
        description:
          "Setup and manage rules for online cloud storage to store and serve user-generated content, such as photos or videos.",
        descriptionI18n: {
          ar: "إعداد وإدارة قواعد التخزين السحابي عبر الإنترنت لتخزين وتقديم المحتوى الذي ينشئه المستخدمون، مثل الصور أو الفيديوهات.",
          cn: "设置并管理在线云存储规则,用于存储和提供用户生成的内容,如照片或视频。",
          id: "Menyiapkan dan mengelola rules untuk cloud storage online guna menyimpan dan menyajikan konten buatan pengguna, seperti foto atau video.",
          jp: "オンラインクラウドストレージのルールを設定・管理し、写真や動画などユーザー生成コンテンツの保存と配信を行う。",
          ru: "Настройка и управление правилами облачного хранилища для хранения и предоставления пользовательского контента, такого как фото или видео.",
        },
        sortOrder: 2,
      },
      {
        name: "Cloud Messaging",
        description:
          "Setup and manage native integration of Firebase Cloud Messaging (FCM) for both Android & iOS, allowing for server-device and device-device communication.",
        descriptionI18n: {
          ar: "إعداد وإدارة التكامل الأصلي لخدمة Firebase Cloud Messaging (FCM) على نظامي أندرويد و iOS، مما يتيح الاتصال بين الخادم والجهاز وبين الأجهزة نفسها.",
          cn: "在 Android 和 iOS 上设置并管理 Firebase Cloud Messaging (FCM) 的原生集成,实现服务器与设备、设备与设备之间的通信。",
          id: "Menyiapkan dan mengelola integrasi native Firebase Cloud Messaging (FCM) untuk Android & iOS, yang memungkinkan komunikasi server-ke-perangkat dan perangkat-ke-perangkat.",
          jp: "Android と iOS の両方で Firebase Cloud Messaging (FCM) のネイティブ統合を設定・管理し、サーバー・デバイス間およびデバイス・デバイス間の通信を可能にする。",
          ru: "Настройка и управление нативной интеграцией Firebase Cloud Messaging (FCM) для Android и iOS, обеспечивающей связь между сервером и устройством, а также между устройствами.",
        },
        sortOrder: 3,
      },
    ],
  },
  {
    title: "React Native",
    imageUrl:
      "https://res.cloudinary.com/dyhzh3ybt/image/upload/v1781851642/portfolio/skills/htibc1ax7w1ieadlirlf.png",
    sortOrder: 2,
    details: [
      {
        name: "Android",
        description:
          "Setup, develop and maintain Android apps on macOS, Windows and Linux.",
        descriptionI18n: {
          ar: "إعداد وتطوير وصيانة تطبيقات أندرويد على macOS و Windows و Linux.",
          cn: "在 macOS、Windows 和 Linux 上设置、开发和维护 Android 应用。",
          id: "Menyiapkan, mengembangkan, dan memelihara aplikasi Android di macOS, Windows, dan Linux.",
          jp: "macOS、Windows、Linux 上で Android アプリのセットアップ、開発、保守を行う。",
          ru: "Настройка, разработка и поддержка приложений Android на macOS, Windows и Linux.",
        },
        sortOrder: 0,
      },
      {
        name: "iOS",
        description:
          "Setup, develop and maintain Native/React Native iOS on macOS.",
        descriptionI18n: {
          ar: "إعداد وتطوير وصيانة تطبيقات iOS الأصلية أو باستخدام React Native على macOS.",
          cn: "在 macOS 上设置、开发和维护原生(Native)/React Native iOS 应用。",
          id: "Menyiapkan, mengembangkan, dan memelihara aplikasi iOS Native/React Native di macOS.",
          jp: "macOS 上で Native/React Native による iOS アプリのセットアップ、開発、保守を行う。",
          ru: "Настройка, разработка и поддержка нативных/React Native приложений для iOS на macOS.",
        },
        sortOrder: 1,
      },
      {
        name: "Windows",
        description:
          "Setup, develop and maintain React Native Windows on Windows.",
        descriptionI18n: {
          ar: "إعداد وتطوير وصيانة React Native Windows على نظام Windows.",
          cn: "在 Windows 上设置、开发和维护 React Native Windows 应用。",
          id: "Menyiapkan, mengembangkan, dan memelihara React Native Windows di Windows.",
          jp: "Windows 上で React Native Windows のセットアップ、開発、保守を行う。",
          ru: "Настройка, разработка и поддержка React Native Windows в Windows.",
        },
        sortOrder: 2,
      },
      {
        name: "Debugging",
        description:
          "App debugging with Developer Menu, DevTools, LogBox and Perf Monitor.",
        descriptionI18n: {
          ar: "تصحيح أخطاء التطبيقات باستخدام Developer Menu و DevTools و LogBox و Perf Monitor.",
          cn: "使用 Developer Menu、DevTools、LogBox 和 Perf Monitor 进行应用调试。",
          id: "Melakukan debugging aplikasi dengan Developer Menu, DevTools, LogBox, dan Perf Monitor.",
          jp: "Developer Menu、DevTools、LogBox、Perf Monitor を使用したアプリのデバッグ。",
          ru: "Отладка приложений с помощью Developer Menu, DevTools, LogBox и Perf Monitor.",
        },
        sortOrder: 3,
      },
    ],
  },
  {
    title: "React Vite",
    imageUrl:
      "https://res.cloudinary.com/dyhzh3ybt/image/upload/v1781852272/portfolio/skills/c3oci1rpw5xpvideakox.png",
    sortOrder: 4,
    details: [
      {
        name: "Static Site",
        description:
          "Deploy static site to GitHub pages, Netlify, Vercel or other services.",
        descriptionI18n: {
          ar: "نشر المواقع الثابتة على GitHub Pages أو Netlify أو Vercel أو خدمات أخرى.",
          cn: "将静态站点部署到 GitHub Pages、Netlify、Vercel 或其他服务。",
          id: "Men-deploy static site ke GitHub Pages, Netlify, Vercel, atau layanan lainnya.",
          jp: "静的サイトを GitHub Pages、Netlify、Vercel などのサービスにデプロイする。",
          ru: "Развёртывание статического сайта на GitHub Pages, Netlify, Vercel или других сервисах.",
        },
        sortOrder: 0,
      },
      {
        name: "Server Side Rendering (SSR)",
        description:
          "Setup and manage source structure, conditional logic and dev server for React SSR integration.",
        descriptionI18n: {
          ar: "إعداد وإدارة بنية الكود المصدري والمنطق الشرطي وخادم التطوير من أجل تكامل React مع التصيير من جانب الخادم (SSR).",
          cn: "为 React SSR 集成设置并管理源码结构、条件逻辑和开发服务器。",
          id: "Menyiapkan dan mengelola struktur source code, logika kondisional, dan dev server untuk integrasi React SSR.",
          jp: "React の SSR(サーバーサイドレンダリング)統合のために、ソース構造、条件分岐ロジック、開発サーバーを設定・管理する。",
          ru: "Настройка и управление структурой исходного кода, условной логикой и dev-сервером для интеграции React SSR.",
        },
        sortOrder: 1,
      },
      {
        name: "Unit Testing",
        description:
          "Setup and manage Playwright for full-featured test runner with auto-waiting, assertions, tracing, and parallelism across Chromium, Firefox, and WebKit.",
        descriptionI18n: {
          ar: "إعداد وإدارة Playwright كمشغّل اختبارات متكامل المزايا، مع الانتظار التلقائي والتحقق (assertions) والتتبع (tracing) والتنفيذ المتوازي عبر Chromium و Firefox و WebKit.",
          cn: "设置并管理 Playwright,作为支持自动等待、断言、追踪以及跨 Chromium、Firefox 和 WebKit 并行执行的全功能测试运行器。",
          id: "Menyiapkan dan mengelola Playwright sebagai test runner lengkap dengan auto-waiting, assertion, tracing, dan paralelisme di Chromium, Firefox, dan WebKit.",
          jp: "自動待機、アサーション、トレース、Chromium・Firefox・WebKit をまたいだ並列実行をサポートするフル機能のテストランナーとして Playwright を設定・管理する。",
          ru: "Настройка и управление Playwright как полнофункциональным тест-раннером с автоматическим ожиданием, проверками (assertions), трассировкой и параллельным выполнением в Chromium, Firefox и WebKit.",
        },
        sortOrder: 2,
      },
      {
        name: "TypeScript + SWC",
        description:
          "Setup TypeScript complier options and sets the corresponding Oxc Transformer options.",
        descriptionI18n: {
          ar: "إعداد خيارات مترجم TypeScript وضبط خيارات Oxc Transformer المقابلة لها.",
          cn: "设置 TypeScript 编译器选项,并配置相应的 Oxc Transformer 选项。",
          id: "Menyiapkan opsi compiler TypeScript dan mengatur opsi Oxc Transformer yang sesuai.",
          jp: "TypeScript コンパイラのオプションを設定し、対応する Oxc Transformer のオプションを設定する。",
          ru: "Настройка параметров компилятора TypeScript и соответствующих параметров Oxc Transformer.",
        },
        sortOrder: 3,
      },
    ],
  },
  {
    title: "Elysia",
    imageUrl:
      "https://res.cloudinary.com/dyhzh3ybt/image/upload/v1781852483/portfolio/skills/nlxpn8lqiukyxdawjwvp.png",
    sortOrder: 5,
    details: [
      {
        name: "Lifecycle",
        description:
          "Understand key concept of encapsulation and isolation by default except stated otherwise.",
        descriptionI18n: {
          ar: "فهم المفهوم الأساسي للتغليف (encapsulation) والعزل (isolation) بشكل افتراضي، ما لم يُنص على خلاف ذلك.",
          cn: "理解封装(encapsulation)和隔离(isolation)默认生效的关键概念,除非另有说明。",
          id: "Memahami konsep kunci encapsulation dan isolation yang berlaku secara default kecuali dinyatakan lain.",
          jp: "特に明記されていない限り、デフォルトで適用されるカプセル化(encapsulation)と分離(isolation)の重要な概念を理解する。",
          ru: "Понимание ключевой концепции инкапсуляции и изоляции, действующей по умолчанию, если не указано иное.",
        },
        sortOrder: 0,
      },
      {
        name: "Method Chaining",
        description:
          "Ensuring important type safety and accurate type inference.",
        descriptionI18n: {
          ar: "ضمان أمان الأنواع (type safety) المهم والاستدلال الدقيق على الأنواع (type inference).",
          cn: "确保关键的类型安全(type safety)和准确的类型推断(type inference)。",
          id: "Memastikan type safety yang penting dan type inference yang akurat.",
          jp: "重要な型安全性(type safety)と正確な型推論(type inference)を確保する。",
          ru: "Обеспечение важной типобезопасности и точного выведения типов.",
        },
        sortOrder: 1,
      },
      {
        name: "Routing",
        description:
          "Understand web servers request's path and method to look up the correct resource and define a route with an HTTP verb method and desired path type like static paths, dynamic paths or wildcards.",
        descriptionI18n: {
          ar: "فهم مسار وطريقة طلب خادم الويب لتحديد المورد الصحيح، وتعريف مسار (route) باستخدام فعل HTTP المناسب ونوع المسار المطلوب، مثل المسارات الثابتة أو الديناميكية أو أحرف البدل (wildcards).",
          cn: "理解 Web 服务器请求的路径与方法以查找正确的资源,并使用 HTTP 动词方法及所需的路径类型(如静态路径、动态路径或通配符)来定义路由。",
          id: "Memahami path dan method dari request web server untuk mencari resource yang tepat, serta mendefinisikan route dengan HTTP verb method dan tipe path yang diinginkan, seperti static path, dynamic path, atau wildcard.",
          jp: "Web サーバーのリクエストのパスとメソッドを理解し、正しいリソースを特定するとともに、HTTP メソッドと静的パス・動的パス・ワイルドカードなど目的のパスタイプを用いてルートを定義する。",
          ru: "Понимание пути и метода запроса веб-сервера для поиска нужного ресурса, а также определение маршрута с помощью HTTP-метода и нужного типа пути, такого как статические пути, динамические пути или wildcard-пути.",
        },
        sortOrder: 2,
      },
      {
        name: "Essential",
        description:
          "Understand basic to advanced Elysia's essential suites including handler, plugins, life cycle, validation and best practice.",
        descriptionI18n: {
          ar: "فهم أساسيات ومفاهيم Elysia المتقدمة، بما في ذلك المعالجات (handlers) والإضافات (plugins) ودورة الحياة (life cycle) والتحقق من الصحة (validation) وأفضل الممارسات.",
          cn: "从基础到进阶,全面理解 Elysia 的核心要素,包括处理器(handler)、插件(plugins)、生命周期(life cycle)、验证(validation)以及最佳实践。",
          id: "Memahami dasar hingga lanjutan dari essential suite Elysia, termasuk handler, plugin, life cycle, validation, dan best practice.",
          jp: "ハンドラー、プラグイン、ライフサイクル、検証(validation)、ベストプラクティスなど、Elysia の基本から高度な必須要素までを理解する。",
          ru: "Понимание базовых и продвинутых основ Elysia, включая обработчики (handlers), плагины, жизненный цикл, валидацию и лучшие практики.",
        },
        sortOrder: 3,
      },
      {
        name: "OpenAPI",
        description:
          "Setup OpenAPI plugin to automatically generate an API documentation page.",
        descriptionI18n: {
          ar: "إعداد إضافة OpenAPI لإنشاء صفحة توثيق API تلقائيًا.",
          cn: "设置 OpenAPI 插件,自动生成 API 文档页面。",
          id: "Menyiapkan plugin OpenAPI untuk secara otomatis membuat halaman dokumentasi API.",
          jp: "OpenAPI プラグインを設定し、API ドキュメントページを自動生成する。",
          ru: "Настройка плагина OpenAPI для автоматической генерации страницы документации API.",
        },
        sortOrder: 4,
      },
      {
        name: "Error Handling",
        description:
          "Handle both explicit or local with plugins and controllers for expected domain failures, Elysia schemas for handling validation errors or background cleanup failures to be logged without changing the response.",
        descriptionI18n: {
          ar: "التعامل مع الأخطاء بشكل صريح أو محلي عبر الإضافات (plugins) والمتحكمات (controllers) لمعالجة الإخفاقات المتوقعة في نطاق العمل، واستخدام مخططات Elysia لمعالجة أخطاء التحقق أو إخفاقات تنظيف الخلفية وتسجيلها دون تغيير الاستجابة.",
          cn: "通过插件(plugins)和控制器(controllers)以显式或局部方式处理预期的业务域错误,并使用 Elysia schema 处理验证错误或后台清理失败,在不改变响应的情况下记录日志。",
          id: "Menangani error secara explicit maupun local dengan plugin dan controller untuk kegagalan domain yang diharapkan, serta menggunakan Elysia schema untuk menangani validation error atau kegagalan background cleanup agar tetap tercatat tanpa mengubah response.",
          jp: "プラグインとコントローラーを使って、想定されるドメインエラーを明示的またはローカルに処理し、Elysia のスキーマを用いて検証エラーやバックグラウンドクリーンアップの失敗をレスポンスを変更せずにログに記録する。",
          ru: "Обработка ожидаемых ошибок предметной области явно или локально с помощью плагинов и контроллеров, а также использование схем Elysia для обработки ошибок валидации или сбоев фоновой очистки с логированием без изменения ответа.",
        },
        sortOrder: 5,
      },
      {
        name: "Unit Testing",
        description:
          "Using Bun-based checks to either call services directly or exercise Elysia routes with real request, then verify returned data, status codes, and mocked side effects.",
        descriptionI18n: {
          ar: "استخدام اختبارات قائمة على Bun لاستدعاء الخدمات مباشرة أو اختبار مسارات Elysia بطلبات حقيقية، ثم التحقق من البيانات المُعادة وأكواد الحالة والتأثيرات الجانبية المُحاكاة (mocked).",
          cn: "使用基于 Bun 的测试,直接调用服务或通过真实请求来执行 Elysia 路由,然后验证返回的数据、状态码以及模拟(mock)的副作用。",
          id: "Menggunakan pengujian berbasis Bun untuk memanggil service secara langsung atau menjalankan route Elysia dengan request asli, lalu memverifikasi data yang dikembalikan, status code, dan mocked side effect.",
          jp: "Bun ベースのテストを使用してサービスを直接呼び出すか、実際のリクエストで Elysia のルートを実行し、返されるデータ、ステータスコード、モックされた副作用を検証する。",
          ru: "Использование тестов на основе Bun для прямого вызова сервисов или выполнения маршрутов Elysia с реальными запросами с последующей проверкой возвращаемых данных, кодов состояния и имитированных побочных эффектов.",
        },
        sortOrder: 6,
      },
    ],
  },
  {
    title: "Play Console",
    imageUrl:
      "https://res.cloudinary.com/dyhzh3ybt/image/upload/v1781853212/portfolio/skills/wbize2jjo6qjgck2hqnk.png",
    sortOrder: 6,
    details: [
      {
        name: "Early 2021 Developer Account",
        description:
          "Personal developer account. The account was created before November 2023, which means that any app submission can immediately go into production without a test release.",
        descriptionI18n: {
          ar: "حساب مطوّر شخصي. تم إنشاء هذا الحساب قبل نوفمبر 2023، وهذا يعني أن أي تطبيق يتم تقديمه يمكن أن يدخل مباشرة إلى الإنتاج دون الحاجة إلى إصدار اختباري.",
          cn: "个人开发者账户。该账户创建于 2023 年 11 月之前,这意味着任何应用提交都可以直接进入生产环境,无需先发布测试版。",
          id: "Akun developer pribadi. Akun ini dibuat sebelum November 2023, yang berarti setiap pengiriman aplikasi dapat langsung masuk ke production tanpa perlu test release.",
          jp: "個人開発者アカウント。このアカウントは 2023 年 11 月より前に作成されたため、アプリの提出はテストリリースを経ずに直接本番環境へ反映できる。",
          ru: "Личный аккаунт разработчика. Аккаунт был создан до ноября 2023 года, что означает, что любая отправка приложения может сразу попасть в продакшн без тестового релиза.",
        },
        sortOrder: 0,
      },
      {
        name: "Testing phase",
        description:
          "Create and manage open testing, closed testing and internal testing releases to selected groups of testers or anyone before going to production.",
        descriptionI18n: {
          ar: "إنشاء وإدارة إصدارات الاختبار المفتوح والمغلق والداخلي لمجموعات مختارة من المختبرين أو لأي شخص قبل الانتقال إلى الإنتاج.",
          cn: "创建并管理公开测试、封闭测试和内部测试版本,在正式上线前发布给指定测试人员或任意用户。",
          id: "Membuat dan mengelola rilis open testing, closed testing, dan internal testing untuk kelompok tester tertentu atau siapa pun sebelum rilis ke production.",
          jp: "本番リリース前に、特定のテスターグループまたは誰にでも公開できるオープンテスト、クローズドテスト、内部テストのリリースを作成・管理する。",
          ru: "Создание и управление релизами открытого, закрытого и внутреннего тестирования для избранных групп тестировщиков или всех желающих перед выходом в продакшн.",
        },
        sortOrder: 1,
      },
      {
        name: "Production",
        description:
          "Create and manage production releases to make the app available to all users in chosen countries.",
        descriptionI18n: {
          ar: "إنشاء وإدارة إصدارات الإنتاج لجعل التطبيق متاحًا لجميع المستخدمين في البلدان المختارة.",
          cn: "创建并管理正式版本发布,使应用程序在选定国家面向所有用户开放。",
          id: "Membuat dan mengelola rilis production agar aplikasi tersedia bagi semua pengguna di negara-negara yang dipilih.",
          jp: "選択した国のすべてのユーザーにアプリを提供するため、本番リリースを作成・管理する。",
          ru: "Создание и управление продакшн-релизами для предоставления приложения всем пользователям в выбранных странах.",
        },
        sortOrder: 2,
      },
      {
        name: "App Signing",
        description:
          "Manage and protect app keys for app signing, upload certificates and credentials.",
        descriptionI18n: {
          ar: "إدارة وحماية مفاتيح التطبيق المستخدمة في توقيع التطبيقات، وتحميل الشهادات وبيانات الاعتماد.",
          cn: "管理并保护用于应用签名的密钥,上传证书与凭据。",
          id: "Mengelola dan melindungi app key untuk app signing, serta mengunggah sertifikat dan credential.",
          jp: "アプリ署名用のキーを管理・保護し、証明書や認証情報をアップロードする。",
          ru: "Управление и защита ключей приложения для подписи приложений, загрузка сертификатов и учётных данных.",
        },
        sortOrder: 3,
      },
      {
        name: "Policy Status",
        description:
          "Manage and maintain developer compliance with Google Play Developer Program policies.",
        descriptionI18n: {
          ar: "إدارة والحفاظ على امتثال المطوّر لسياسات برنامج مطوّري Google Play.",
          cn: "管理并维持开发者对 Google Play 开发者计划政策的合规性。",
          id: "Mengelola dan menjaga kepatuhan developer terhadap kebijakan Google Play Developer Program.",
          jp: "Google Play デベロッパー プログラム ポリシーへの開発者の準拠状況を管理・維持する。",
          ru: "Управление и поддержание соответствия разработчика политикам программы Google Play для разработчиков.",
        },
        sortOrder: 4,
      },
      {
        name: "Store Listing",
        description:
          "Create tailored content to help users find and engage with the app, with or without custom store listing.",
        descriptionI18n: {
          ar: "إنشاء محتوى مخصص لمساعدة المستخدمين على اكتشاف التطبيق والتفاعل معه، سواء باستخدام صفحة متجر مخصصة أو بدونها.",
          cn: "创建定制内容,帮助用户发现并参与该应用,无论是否使用自定义商店列表。",
          id: "Membuat konten yang disesuaikan untuk membantu pengguna menemukan dan berinteraksi dengan aplikasi, baik dengan maupun tanpa custom store listing.",
          jp: "カスタムストア掲載の有無にかかわらず、ユーザーがアプリを見つけて利用しやすくなるよう、最適化されたコンテンツを作成する。",
          ru: "Создание индивидуального контента, помогающего пользователям находить приложение и взаимодействовать с ним, с использованием кастомного описания в магазине или без него.",
        },
        sortOrder: 5,
      },
    ],
  },
  {
    title: "Redux Toolkit",
    imageUrl:
      "https://res.cloudinary.com/dyhzh3ybt/image/upload/v1781854038/portfolio/skills/bxbvolsxax2j9ed1gkzw.png",
    sortOrder: 7,
    details: [
      {
        name: "State Management",
        description:
          "Setup state management utilities to simplify common use cases like store setup, creating reducers, immutable update logic, and more.",
        descriptionI18n: {
          ar: "إعداد أدوات إدارة الحالة (state management) لتبسيط حالات الاستخدام الشائعة مثل إعداد المتجر (store)، وإنشاء المخفِّضات (reducers)، ومنطق التحديث غير القابل للتغيير (immutable update logic) وغير ذلك.",
          cn: "设置状态管理工具,简化常见使用场景,如 store 配置、创建 reducer、不可变更新逻辑等。",
          id: "Menyiapkan utilitas state management untuk menyederhanakan use case umum seperti store setup, pembuatan reducer, logika immutable update, dan lainnya.",
          jp: "ストアのセットアップ、リデューサーの作成、イミュータブルな更新ロジックなど、よくある利用パターンを簡素化する状態管理ユーティリティを設定する。",
          ru: "Настройка утилит управления состоянием для упрощения типичных задач, таких как настройка store, создание reducer'ов, логика неизменяемых обновлений и многое другое.",
        },
        sortOrder: 0,
      },
      {
        name: "RTK Query",
        description:
          "Setup and manage RTK Query data fetching and caching tool. Setup and create RTK Query APIs such as createApi and fetchBaseQuery. Create query customization to extend fetchBaseQuery to enabling automatic re-authorization and more.",
        descriptionI18n: {
          ar: "إعداد وإدارة أداة RTK Query لجلب البيانات وتخزينها مؤقتًا (caching). إعداد وإنشاء واجهات RTK Query مثل createApi و fetchBaseQuery. إنشاء تخصيصات للاستعلامات لتوسيع fetchBaseQuery بما يتيح إعادة التفويض التلقائي وغير ذلك.",
          cn: "设置并管理 RTK Query 数据获取与缓存工具。设置并创建 RTK Query API,如 createApi 和 fetchBaseQuery。自定义查询以扩展 fetchBaseQuery,实现自动重新授权等功能。",
          id: "Menyiapkan dan mengelola RTK Query sebagai tool data fetching dan caching. Menyiapkan dan membuat RTK Query API seperti createApi dan fetchBaseQuery. Membuat query customization untuk meng-extend fetchBaseQuery agar mendukung automatic re-authorization dan lainnya.",
          jp: "データ取得・キャッシュ管理ツールである RTK Query を設定・管理する。createApi や fetchBaseQuery などの RTK Query API を設定・作成する。fetchBaseQuery を拡張するクエリのカスタマイズを行い、自動再認証などを実現する。",
          ru: "Настройка и управление инструментом получения и кэширования данных RTK Query. Настройка и создание API RTK Query, таких как createApi и fetchBaseQuery. Создание кастомизации запросов для расширения fetchBaseQuery с целью автоматической повторной авторизации и других возможностей.",
        },
        sortOrder: 1,
      },
      {
        name: "TypeScript",
        description:
          "Extend the use of the redux toolkit with strict typing and preserving all types of the redux API.",
        descriptionI18n: {
          ar: "توسيع استخدام Redux Toolkit باستخدام أنواع صارمة (strict typing) مع الحفاظ على جميع أنواع واجهة Redux API.",
          cn: "通过严格的类型(strict typing)扩展 Redux Toolkit 的使用,并保留 Redux API 的所有类型。",
          id: "Memperluas penggunaan redux toolkit dengan strict typing serta mempertahankan seluruh tipe dari redux API.",
          jp: "厳格な型付け(strict typing)により Redux Toolkit の利用を拡張し、Redux API のすべての型を保持する。",
          ru: "Расширение использования Redux Toolkit со строгой типизацией при сохранении всех типов Redux API.",
        },
        sortOrder: 2,
      },
    ],
  },
  {
    title: "Axios",
    imageUrl:
      "https://res.cloudinary.com/dyhzh3ybt/image/upload/v1781854143/portfolio/skills/dtarz0mradb6ihvbsvqg.png",
    sortOrder: 8,
    details: [
      {
        name: "Axios API",
        description:
          "Create a request with various Axios methods and configurations.",
        descriptionI18n: {
          ar: "إنشاء طلب باستخدام أساليب وتكوينات Axios المختلفة.",
          cn: "使用各种 Axios 方法和配置创建请求。",
          id: "Membuat request dengan berbagai method dan konfigurasi Axios.",
          jp: "さまざまな Axios のメソッドと設定でリクエストを作成する。",
          ru: "Создание запроса с использованием различных методов и конфигураций Axios.",
        },
        sortOrder: 0,
      },
      {
        name: "Axios Instance",
        description: "Create new instance of Axios with custom config.",
        descriptionI18n: {
          ar: "إنشاء نسخة جديدة (instance) من Axios بتكوين مخصص.",
          cn: "使用自定义配置创建新的 Axios 实例。",
          id: "Membuat instance baru Axios dengan konfigurasi custom.",
          jp: "カスタム設定で新しい Axios インスタンスを作成する。",
          ru: "Создание нового экземпляра Axios с пользовательской конфигурацией.",
        },
        sortOrder: 1,
      },
      {
        name: "Interceptors",
        description:
          "Create interceptors for requests or responses before they are handled by then or catch.",
        descriptionI18n: {
          ar: "إنشاء معترضات (interceptors) للطلبات أو الاستجابات قبل معالجتها بواسطة then أو catch.",
          cn: "在请求或响应被 then 或 catch 处理之前,创建拦截器(interceptors)。",
          id: "Membuat interceptor untuk request atau response sebelum ditangani oleh then atau catch.",
          jp: "リクエストやレスポンスが then や catch で処理される前に、インターセプターを作成する。",
          ru: "Создание перехватчиков (interceptors) для запросов или ответов до их обработки в then или catch.",
        },
        sortOrder: 2,
      },
      {
        name: "Cancellation",
        description:
          "Setup cancellation to prematurely terminate the connection to prevent a call from hanging up.",
        descriptionI18n: {
          ar: "إعداد آلية الإلغاء (cancellation) لإنهاء الاتصال قبل الأوان ومنع تعليق الطلب.",
          cn: "设置取消机制(cancellation),以提前终止连接,防止请求挂起。",
          id: "Menyiapkan cancellation untuk menghentikan koneksi lebih awal agar request tidak menggantung.",
          jp: "通信を途中で終了させるキャンセル処理を設定し、リクエストがハングすることを防ぐ。",
          ru: "Настройка отмены (cancellation) для досрочного завершения соединения, чтобы предотвратить зависание запроса.",
        },
        sortOrder: 3,
      },
    ],
  },
  {
    title: "GitHub",
    imageUrl:
      "https://res.cloudinary.com/dyhzh3ybt/image/upload/v1782207298/portfolio/skills/lkhywhyxlnmsyepkvwu4.png",
    sortOrder: 9,
    details: [
      {
        name: "Repository",
        description:
          "Create and maintain all project files, including the revision history.",
        descriptionI18n: {
          ar: "إنشاء والحفاظ على جميع ملفات المشروع، بما في ذلك سجل التعديلات (revision history).",
          cn: "创建并维护所有项目文件,包括版本修订历史。",
          id: "Membuat dan memelihara seluruh file proyek, termasuk revision history.",
          jp: "リビジョン履歴を含む、すべてのプロジェクトファイルの作成と管理。",
          ru: "Создание и поддержка всех файлов проекта, включая историю изменений.",
        },
        sortOrder: 0,
      },
      {
        name: "Commit, Push, Fetch and Pull",
        description:
          "Move changes from the local repo to the remote or bring changes to the local repo from the remote keeping the codebase up-to-date.",
        descriptionI18n: {
          ar: "نقل التعديلات من المستودع المحلي إلى المستودع البعيد، أو جلب التعديلات من المستودع البعيد إلى المحلي، للحفاظ على قاعدة الكود محدّثة دائمًا.",
          cn: "将更改从本地仓库推送到远程仓库,或从远程仓库拉取更改到本地仓库,以保持代码库保持最新状态。",
          id: "Memindahkan perubahan dari local repo ke remote, atau mengambil perubahan dari remote ke local repo, untuk menjaga codebase tetap up-to-date.",
          jp: "ローカルリポジトリの変更をリモートに反映させたり、リモートの変更をローカルリポジトリに取り込んだりして、コードベースを常に最新の状態に保つ。",
          ru: "Перемещение изменений из локального репозитория в удалённый или получение изменений из удалённого репозитория в локальный для поддержания актуальности кодовой базы.",
        },
        sortOrder: 1,
      },
      {
        name: "Branching",
        description:
          "Create and manage repository branch to develop features, fix bugs, or safely experiment with new ideas in a contained area.",
        descriptionI18n: {
          ar: "إنشاء وإدارة فروع المستودع (branches) لتطوير الميزات، أو إصلاح الأخطاء، أو تجربة أفكار جديدة بأمان في بيئة منعزلة.",
          cn: "创建并管理仓库分支(branch),用于开发新功能、修复缺陷,或在独立环境中安全地尝试新想法。",
          id: "Membuat dan mengelola branch repository untuk mengembangkan fitur, memperbaiki bug, atau bereksperimen dengan ide baru secara aman di area terpisah.",
          jp: "機能開発、バグ修正、または独立した領域での新しいアイデアの安全な実験のために、リポジトリのブランチを作成・管理する。",
          ru: "Создание и управление ветками (branches) репозитория для разработки функций, исправления ошибок или безопасного экспериментирования с новыми идеями в изолированной среде.",
        },
        sortOrder: 2,
      },
      {
        name: "GitHub Actions",
        description:
          "Understand core concepts to configure native automation to handle building, testing, and deploying.",
        descriptionI18n: {
          ar: "فهم المفاهيم الأساسية لتكوين أتمتة (automation) أصلية للتعامل مع عمليات البناء والاختبار والنشر.",
          cn: "理解核心概念,以配置原生自动化(automation)来处理构建、测试和部署。",
          id: "Memahami konsep inti untuk mengonfigurasi automation native guna menangani proses build, testing, dan deployment.",
          jp: "ビルド、テスト、デプロイを扱うネイティブな自動化(automation)を設定するための基本概念を理解する。",
          ru: "Понимание основных концепций для настройки нативной автоматизации, обрабатывающей сборку, тестирование и развёртывание.",
        },
        sortOrder: 3,
      },
      {
        name: "Conflict Resolving",
        description:
          "Resolve merge conflict in non-destructive way by securing my own state to recoverable state to then identify conflicting files using desired merging tool.",
        descriptionI18n: {
          ar: "حل تعارضات الدمج (merge conflicts) بطريقة غير مدمرة، عبر تأمين الحالة الحالية إلى نقطة يمكن استرجاعها، ثم تحديد الملفات المتعارضة باستخدام أداة الدمج المفضّلة.",
          cn: "以无破坏性的方式解决合并冲突(merge conflict),先将当前状态保存为可恢复的状态,再使用所需的合并工具识别冲突文件。",
          id: "Menyelesaikan merge conflict secara non-destructive dengan mengamankan state saat ini ke state yang dapat dipulihkan, lalu mengidentifikasi file yang konflik menggunakan merging tool yang diinginkan.",
          jp: "現在の状態を復元可能な状態として保存することで、非破壊的にマージコンフリクトを解決し、希望するマージツールを使ってコンフリクトファイルを特定する。",
          ru: "Разрешение конфликтов слияния неразрушающим способом: сохранение текущего состояния в восстанавливаемое, а затем определение конфликтующих файлов с помощью предпочитаемого инструмента слияния.",
        },
        sortOrder: 4,
      },
      {
        name: "Pull Request",
        description:
          "Create a proposal to merge a set of changes from one branch into another and posibly trigger automation.",
        descriptionI18n: {
          ar: "إنشاء طلب (proposal) لدمج مجموعة من التعديلات من فرع إلى فرع آخر، مع إمكانية تشغيل أتمتة (automation) تلقائيًا.",
          cn: "创建一个提案,将一组更改从一个分支合并到另一个分支,并可能触发自动化流程。",
          id: "Membuat proposal untuk menggabungkan sekumpulan perubahan dari satu branch ke branch lain, yang juga dapat memicu automation.",
          jp: "一連の変更を 1 つのブランチから別のブランチへマージするためのプロポーザルを作成し、必要に応じて自動化処理をトリガーする。",
          ru: "Создание предложения по объединению набора изменений из одной ветки в другую, что может также запускать автоматизацию.",
        },
        sortOrder: 5,
      },
    ],
  },
  {
    title: "Notifee",
    imageUrl:
      "https://res.cloudinary.com/dyhzh3ybt/image/upload/v1782206917/portfolio/skills/m2at3x7ullwzyoot9pc4.png",
    sortOrder: 10,
    details: [
      {
        name: "Setup Notification",
        description: "Create and manage notification for both Android and iOS.",
        descriptionI18n: {
          ar: "إنشاء وإدارة الإشعارات (notifications) لنظامي أندرويد و iOS.",
          cn: "为 Android 和 iOS 创建并管理通知(notification)。",
          id: "Membuat dan mengelola notifikasi untuk Android dan iOS.",
          jp: "Android と iOS の両方で通知(notification)を作成・管理する。",
          ru: "Создание и управление уведомлениями для Android и iOS.",
        },
        sortOrder: 0,
      },
      {
        name: "Event Listener",
        description:
          "Handling notification and device events for foreground and background event.",
        descriptionI18n: {
          ar: "معالجة أحداث الإشعارات والأجهزة، سواء في المقدمة (foreground) أو الخلفية (background).",
          cn: "处理前台(foreground)和后台(background)的通知与设备事件。",
          id: "Menangani event notifikasi dan perangkat baik di foreground maupun background.",
          jp: "フォアグラウンドおよびバックグラウンドにおける通知イベントとデバイスイベントを処理する。",
          ru: "Обработка событий уведомлений и устройства как на переднем плане (foreground), так и в фоновом режиме (background).",
        },
        sortOrder: 1,
      },
      {
        name: "Interaction",
        description:
          "Handling notification interaction using Event Type for delivered, pressed, dismissed, action press notification and more.",
        descriptionI18n: {
          ar: "معالجة تفاعلات الإشعارات باستخدام أنواع الأحداث (Event Type) مثل التسليم (delivered) والضغط (pressed) والتجاهل (dismissed) والضغط على إجراء (action press) وغيرها.",
          cn: "使用事件类型(Event Type)处理通知交互,包括送达(delivered)、点按(pressed)、关闭(dismissed)、操作按钮点击(action press)等。",
          id: "Menangani interaksi notifikasi menggunakan Event Type seperti delivered, pressed, dismissed, action press, dan lainnya.",
          jp: "配信済み(delivered)、タップ(pressed)、解除(dismissed)、アクションボタンの押下(action press)など、イベントタイプを使って通知のインタラクションを処理する。",
          ru: "Обработка взаимодействия с уведомлениями с помощью типов событий (Event Type), таких как доставлено (delivered), нажато (pressed), отклонено (dismissed), нажатие действия (action press) и других.",
        },
        sortOrder: 2,
      },
      {
        name: "Firebase Cloud Messaging",
        description:
          "Integrate Firebase Cloud Messaging and display notifications with Notifee.",
        descriptionI18n: {
          ar: "دمج Firebase Cloud Messaging وعرض الإشعارات باستخدام Notifee.",
          cn: "集成 Firebase Cloud Messaging,并通过 Notifee 展示通知。",
          id: "Mengintegrasikan Firebase Cloud Messaging dan menampilkan notifikasi dengan Notifee.",
          jp: "Firebase Cloud Messaging を統合し、Notifee で通知を表示する。",
          ru: "Интеграция Firebase Cloud Messaging и отображение уведомлений с помощью Notifee.",
        },
        sortOrder: 3,
      },
    ],
  },
  {
    title: "Mux",
    imageUrl:
      "https://res.cloudinary.com/dyhzh3ybt/image/upload/v1782101504/portfolio/skills/fp1phbblpsuyarhh4oqp.png",
    sortOrder: 11,
    details: [
      {
        name: "Live Streaming",
        description:
          "Setup live streaming service with powerful, flexible and non-intrusive configuration for both streamer and viewer.",
        descriptionI18n: {
          ar: "إعداد خدمة بث مباشر (live streaming) بتكوين قوي ومرن وغير متدخّل، لكل من المُذيع (streamer) والمشاهد.",
          cn: "设置直播服务,提供强大、灵活且非侵入式的配置,兼顾主播与观众的体验。",
          id: "Menyiapkan layanan live streaming dengan konfigurasi yang kuat, fleksibel, dan tidak mengganggu, baik untuk streamer maupun viewer.",
          jp: "ストリーマーと視聴者の双方にとって強力で柔軟、かつ干渉の少ない設定で、ライブストリーミングサービスを構築する。",
          ru: "Настройка сервиса прямых трансляций с мощной, гибкой и ненавязчивой конфигурацией как для стримера, так и для зрителя.",
        },
        sortOrder: 0,
      },
      {
        name: "On Demand Video",
        description:
          "Setup on demand videos for user to upload, watch or modify.",
        descriptionI18n: {
          ar: "إعداد الفيديو عند الطلب (on-demand) ليتمكن المستخدم من تحميله أو مشاهدته أو تعديله.",
          cn: "设置点播视频(on demand video),供用户上传、观看或修改。",
          id: "Menyiapkan video on demand agar pengguna dapat mengunggah, menonton, atau mengubahnya.",
          jp: "ユーザーがアップロード・視聴・編集できるオンデマンド動画を設定する。",
          ru: "Настройка видео по запросу (on demand) для загрузки, просмотра или изменения пользователем.",
        },
        sortOrder: 1,
      },
      {
        name: "Data and analytics",
        description:
          "Setup insight into video engagement and Quality of Experience using client-side SDKs for chosen video player.",
        descriptionI18n: {
          ar: "إعداد رؤى تحليلية حول تفاعل المستخدمين مع الفيديو وجودة التجربة (Quality of Experience) باستخدام أدوات SDK من جانب العميل لمشغل الفيديو المختار.",
          cn: "利用所选播放器的客户端 SDK,洞察视频互动情况与体验质量(Quality of Experience)。",
          id: "Menyiapkan insight untuk video engagement dan Quality of Experience menggunakan client-side SDK untuk video player yang dipilih.",
          jp: "選択した動画プレーヤー向けのクライアントサイド SDK を使用して、動画のエンゲージメントと体験品質(Quality of Experience)に関するインサイトを設定する。",
          ru: "Настройка аналитики вовлечённости и качества просмотра (Quality of Experience) с помощью клиентских SDK для выбранного видеоплеера.",
        },
        sortOrder: 2,
      },
      {
        name: "Security",
        description:
          "Setup, configure and secure video playback to protect user's asset from piracy with DRM video playback.",
        descriptionI18n: {
          ar: "إعداد وتهيئة وتأمين تشغيل الفيديو لحماية محتوى المستخدم من القرصنة عبر تشغيل الفيديو المحمي بـ DRM.",
          cn: "设置、配置并保护视频播放,通过 DRM 视频播放保护用户资产免受盗版侵害。",
          id: "Menyiapkan, mengonfigurasi, dan mengamankan pemutaran video untuk melindungi aset pengguna dari pembajakan dengan pemutaran video berbasis DRM.",
          jp: "DRM による動画再生でユーザーのコンテンツを違法コピーから保護するために、動画再生の設定・構成・保護を行う。",
          ru: "Настройка, конфигурация и защита воспроизведения видео для защиты контента пользователя от пиратства с помощью DRM-воспроизведения видео.",
        },
        sortOrder: 3,
      },
      {
        name: "Integration",
        description:
          "Setup video player for web framework or native mobile application.",
        descriptionI18n: {
          ar: "إعداد مشغل الفيديو لإطار عمل الويب أو لتطبيقات الهاتف المحمول الأصلية (native).",
          cn: "为 Web 框架或原生移动应用设置视频播放器。",
          id: "Menyiapkan video player untuk web framework atau aplikasi mobile native.",
          jp: "Web フレームワークまたはネイティブモバイルアプリケーション向けに動画プレーヤーを設定する。",
          ru: "Настройка видеоплеера для веб-фреймворка или нативного мобильного приложения.",
        },
        sortOrder: 4,
      },
    ],
  },
  {
    title: "OpenCore",
    imageUrl:
      "https://res.cloudinary.com/dyhzh3ybt/image/upload/v1782102347/portfolio/skills/kfbtszv9sicsue81dkbt.png",
    sortOrder: 12,
    details: [
      {
        name: "macOS 27 on Desktop",
        description:
          "Working macOS 27 EFI for H510M motherboard, Comet Lake processor and Navi 10 GPU.",
        descriptionI18n: {
          ar: "تشغيل macOS 27 EFI بنجاح على لوحة أم H510M، ومعالج Comet Lake، وبطاقة رسومات Navi 10.",
          cn: "在 H510M 主板、Comet Lake 处理器和 Navi 10 GPU 上成功运行 macOS 27 EFI。",
          id: "Menjalankan macOS 27 EFI dengan baik pada motherboard H510M, prosesor Comet Lake, dan GPU Navi 10.",
          jp: "H510M マザーボード、Comet Lake プロセッサ、Navi 10 GPU で動作する macOS 27 EFI。",
          ru: "Работающий macOS 27 EFI для материнской платы H510M, процессора Comet Lake и GPU Navi 10.",
        },
        sortOrder: 0,
      },
      {
        name: "macOS 27 on Laptop",
        description:
          "Working macOS 27 EFI for Dell Latitude 5401, Coffe Lake+ processor and UHD 630 iGPU.",
        descriptionI18n: {
          ar: "تشغيل macOS 27 EFI بنجاح على جهاز Dell Latitude 5401، بمعالج Coffee Lake+ وبطاقة رسومات مدمجة UHD 630.",
          cn: "在 Dell Latitude 5401、Coffee Lake+ 处理器及 UHD 630 集成显卡上成功运行 macOS 27 EFI。",
          id: "Menjalankan macOS 27 EFI dengan baik pada Dell Latitude 5401, prosesor Coffee Lake+, dan iGPU UHD 630.",
          jp: "Dell Latitude 5401、Coffee Lake+ プロセッサ、UHD 630 内蔵 GPU で動作する macOS 27 EFI。",
          ru: "Работающий macOS 27 EFI для Dell Latitude 5401, процессора Coffee Lake+ и встроенной графики UHD 630.",
        },
        sortOrder: 1,
      },
      {
        name: "macOS USB Creation",
        description:
          "Using USB formatting tools and grabbing the recovery installer on Windows.",
        descriptionI18n: {
          ar: "استخدام أدوات تهيئة USB والحصول على أداة التثبيت الاستعادي (recovery installer) عبر Windows.",
          cn: "使用 USB 格式化工具,并在 Windows 上获取恢复安装程序(recovery installer)。",
          id: "Menggunakan tool format USB dan mengambil recovery installer melalui Windows.",
          jp: "USB フォーマットツールを使用し、Windows 上でリカバリーインストーラーを取得する。",
          ru: "Использование инструментов форматирования USB и получение восстановительного установщика (recovery installer) на Windows.",
        },
        sortOrder: 2,
      },
    ],
  },
  {
    title: "Docker",
    imageUrl:
      "https://res.cloudinary.com/dyhzh3ybt/image/upload/v1782102501/portfolio/skills/jp6ixb3sdgnbsoqzfucu.png",
    sortOrder: 13,
    details: [
      {
        name: "Docker Engine",
        description:
          "Setup and manage Docker engine on Windows, Linux and macOS.",
        descriptionI18n: {
          ar: "إعداد وإدارة محرك Docker على أنظمة Windows و Linux و macOS.",
          cn: "在 Windows、Linux 和 macOS 上设置并管理 Docker 引擎。",
          id: "Menyiapkan dan mengelola Docker engine di Windows, Linux, dan macOS.",
          jp: "Windows、Linux、macOS 上で Docker エンジンを設定・管理する。",
          ru: "Настройка и управление движком Docker на Windows, Linux и macOS.",
        },
        sortOrder: 0,
      },
      {
        name: "Docker CLI",
        description: "Able to utilize Docker via terminal.",
        descriptionI18n: {
          ar: "القدرة على استخدام Docker عبر الطرفية (terminal).",
          cn: "能够通过终端(terminal)使用 Docker。",
          id: "Mampu menggunakan Docker melalui terminal.",
          jp: "ターミナル経由で Docker を利用できる。",
          ru: "Умение использовать Docker через терминал.",
        },
        sortOrder: 1,
      },
      {
        name: "Docker Desktop",
        description: "Able to utilize Docker via desktop application.",
        descriptionI18n: {
          ar: "القدرة على استخدام Docker عبر تطبيق سطح المكتب.",
          cn: "能够通过桌面应用程序使用 Docker。",
          id: "Mampu menggunakan Docker melalui aplikasi desktop.",
          jp: "デスクトップアプリケーション経由で Docker を利用できる。",
          ru: "Умение использовать Docker через настольное приложение.",
        },
        sortOrder: 2,
      },
      {
        name: "Docker Compose",
        description:
          "Setup YAML file for defining and running multi-container applications.",
        descriptionI18n: {
          ar: "إعداد ملف YAML لتعريف وتشغيل تطبيقات متعددة الحاويات (multi-container).",
          cn: "设置 YAML 文件,用于定义和运行多容器(multi-container)应用。",
          id: "Menyiapkan file YAML untuk mendefinisikan dan menjalankan aplikasi multi-container.",
          jp: "マルチコンテナアプリケーションを定義・実行するための YAML ファイルを設定する。",
          ru: "Настройка файла YAML для определения и запуска многоконтейнерных приложений.",
        },
        sortOrder: 3,
      },
    ],
  },
  {
    title: "Render",
    imageUrl:
      "https://res.cloudinary.com/dyhzh3ybt/image/upload/v1782102912/portfolio/skills/hsuilvjl1xf3o2ekmcbh.png",
    sortOrder: 14,
    details: [
      {
        name: "Blueprints",
        description: "Create, manage and maintain blueprint services.",
        descriptionI18n: {
          ar: "إنشاء وإدارة وصيانة خدمات Blueprint.",
          cn: "创建、管理并维护 Blueprint 服务。",
          id: "Membuat, mengelola, dan memelihara layanan blueprint.",
          jp: "Blueprint サービスの作成、管理、保守を行う。",
          ru: "Создание, управление и поддержка сервисов Blueprint.",
        },
        sortOrder: 0,
      },
      {
        name: "CI/CD Pipeline",
        description:
          "Automate deployment build pipeline for development, staging and production with GitHub integration or any versioning system.",
        descriptionI18n: {
          ar: "أتمتة خط أنابيب البناء والنشر (deployment pipeline) لمراحل التطوير والمعاينة والإنتاج، مع تكامل GitHub أو أي نظام تحكم بالإصدارات.",
          cn: "通过 GitHub 集成或任何版本控制系统,自动化用于开发、预发布(staging)和生产环境的部署构建管道。",
          id: "Mengotomatiskan deployment build pipeline untuk development, staging, dan production dengan integrasi GitHub atau sistem versioning apa pun.",
          jp: "GitHub との連携や任意のバージョン管理システムを用いて、開発・ステージング・本番環境向けのデプロイビルドパイプラインを自動化する。",
          ru: "Автоматизация пайплайна сборки и развёртывания для разработки, стейджинга и продакшена с интеграцией GitHub или любой системы версионирования.",
        },
        sortOrder: 1,
      },
      {
        name: "Cron Jobs",
        description: "Setup and run periodic tasks on a defined schedule.",
        descriptionI18n: {
          ar: "إعداد وتشغيل مهام دورية وفق جدول زمني محدد.",
          cn: "设置并按预定计划运行周期性任务。",
          id: "Menyiapkan dan menjalankan tugas periodik sesuai jadwal yang ditentukan.",
          jp: "定義したスケジュールに従って定期的なタスクを設定・実行する。",
          ru: "Настройка и выполнение периодических задач по заданному графику.",
        },
        sortOrder: 2,
      },
      {
        name: "Security",
        description:
          "Customize a service's runtime behavior for different environments such as development, staging, and production. Very important!",
        descriptionI18n: {
          ar: "تخصيص سلوك التشغيل (runtime behavior) للخدمة في بيئات مختلفة مثل التطوير والمعاينة والإنتاج. مهم جدًا!",
          cn: "针对开发、预发布(staging)和生产等不同环境,自定义服务的运行时行为。非常重要!",
          id: "Menyesuaikan runtime behavior layanan untuk environment yang berbeda seperti development, staging, dan production. Sangat penting!",
          jp: "開発・ステージング・本番など環境ごとにサービスのランタイム動作をカスタマイズする。非常に重要!",
          ru: "Настройка поведения сервиса во время выполнения для разных сред — разработки, стейджинга и продакшена. Очень важно!",
        },
        sortOrder: 3,
      },
      {
        name: "Observability",
        description:
          "Monitor metrics such as CPU, disk storage, memory usage, etc ensuring no anomaly occurred.",
        descriptionI18n: {
          ar: "مراقبة المقاييس مثل المعالج (CPU) وتخزين القرص واستخدام الذاكرة وغيرها، للتأكد من عدم حدوث أي خلل.",
          cn: "监控 CPU、磁盘存储、内存使用等指标,确保系统没有出现异常。",
          id: "Memantau metrik seperti CPU, penyimpanan disk, penggunaan memori, dll untuk memastikan tidak ada anomali yang terjadi.",
          jp: "CPU、ディスク容量、メモリ使用量などの指標を監視し、異常が発生していないことを確認する。",
          ru: "Мониторинг таких показателей, как CPU, использование диска, памяти и т. д., для обеспечения отсутствия аномалий.",
        },
        sortOrder: 4,
      },
    ],
  },
  {
    title: "AWS",
    imageUrl:
      "https://res.cloudinary.com/dyhzh3ybt/image/upload/v1782102951/portfolio/skills/mnbl8msmbwrqy5tgzikw.png",
    sortOrder: 15,
    details: [
      {
        name: "IAM",
        description:
          "Setup and manage user roles and permission using Identity Access and Management (IAM) to securely control access to AWS resources.",
        descriptionI18n: {
          ar: "إعداد وإدارة أدوار وصلاحيات المستخدمين باستخدام Identity Access and Management (IAM) للتحكم الآمن في الوصول إلى موارد AWS.",
          cn: "使用身份与访问管理(IAM)设置并管理用户角色与权限,安全地控制对 AWS 资源的访问。",
          id: "Menyiapkan dan mengelola role serta permission pengguna menggunakan Identity Access and Management (IAM) untuk mengontrol akses ke resource AWS secara aman.",
          jp: "Identity Access and Management (IAM) を使用してユーザーの役割と権限を設定・管理し、AWS リソースへのアクセスを安全に制御する。",
          ru: "Настройка и управление ролями и разрешениями пользователей с помощью Identity Access and Management (IAM) для безопасного контроля доступа к ресурсам AWS.",
        },
        sortOrder: 0,
      },
      {
        name: "Elemental MediaLive",
        description:
          "Setup and manage Inputs, Channels, Clusters and Workflow wizard to deliver real-time video service, live outputs for broadcast and streaming delivery.",
        descriptionI18n: {
          ar: "إعداد وإدارة المدخلات (Inputs) والقنوات (Channels) والمجموعات (Clusters) ومعالج سير العمل (Workflow wizard) لتقديم خدمة فيديو في الوقت الفعلي، وإخراج البث المباشر للنشر والتسليم.",
          cn: "设置并管理输入(Inputs)、频道(Channels)、集群(Clusters)和工作流向导(Workflow wizard),以提供实时视频服务及广播与流媒体直播输出。",
          id: "Menyiapkan dan mengelola Input, Channel, Cluster, dan Workflow wizard untuk menyediakan layanan video real-time serta output siaran langsung untuk broadcast dan streaming.",
          jp: "入力(Inputs)、チャンネル、クラスター、ワークフローウィザードを設定・管理し、リアルタイム動画サービスや放送・配信用のライブ出力を提供する。",
          ru: "Настройка и управление входами (Inputs), каналами, кластерами и мастером рабочих процессов для предоставления видеосервиса в реальном времени и прямых эфиров для трансляции и стримингового вещания.",
        },
        sortOrder: 1,
      },
      {
        name: "Elemental MediaPackage",
        description:
          "Setup and manage Channels (for Live v1) and Channel groups (for Live v2) to packages incoming video streams into different distribution formats based on endpoint configurations.",
        descriptionI18n: {
          ar: "إعداد وإدارة القنوات (لـ Live v1) ومجموعات القنوات (لـ Live v2) لتجميع تدفقات الفيديو الواردة ضمن صيغ توزيع مختلفة حسب تكوينات نقاط النهاية (endpoint).",
          cn: "设置并管理频道(适用于 Live v1)和频道组(适用于 Live v2),根据端点配置将传入的视频流打包为不同的分发格式。",
          id: "Menyiapkan dan mengelola Channel (untuk Live v1) dan Channel group (untuk Live v2) untuk mengemas incoming video stream ke dalam berbagai format distribusi berdasarkan konfigurasi endpoint.",
          jp: "チャンネル(Live v1 用)とチャンネルグループ(Live v2 用)を設定・管理し、エンドポイント設定に基づいて受信した動画ストリームを各種配信フォーマットへパッケージ化する。",
          ru: "Настройка и управление каналами (для Live v1) и группами каналов (для Live v2) для упаковки входящих видеопотоков в различные форматы распространения в зависимости от конфигурации конечных точек.",
        },
        sortOrder: 2,
      },
      {
        name: "CloudFront",
        description:
          "Create and manage CloudFront distribution to deliver video output for end-user with security integration such as third-party DRM, traffic control or DDoS.",
        descriptionI18n: {
          ar: "إنشاء وإدارة توزيع CloudFront لتسليم إخراج الفيديو للمستخدم النهائي، مع تكامل أمني مثل DRM من طرف ثالث، أو التحكم في حركة البيانات، أو الحماية من هجمات DDoS.",
          cn: "创建并管理 CloudFront 分发(distribution),为终端用户提供视频输出,并集成第三方 DRM、流量控制或 DDoS 防护等安全功能。",
          id: "Membuat dan mengelola CloudFront distribution untuk mengirimkan output video ke end-user dengan integrasi keamanan seperti DRM pihak ketiga, traffic control, atau perlindungan DDoS.",
          jp: "CloudFront ディストリビューションを作成・管理し、サードパーティ DRM、トラフィック制御、DDoS 対策などのセキュリティ統合を備えたエンドユーザー向け動画出力を配信する。",
          ru: "Создание и управление дистрибуцией CloudFront для доставки видео конечным пользователям с интеграцией безопасности, такой как DRM от сторонних поставщиков, контроль трафика или защита от DDoS.",
        },
        sortOrder: 3,
      },
      {
        name: "S3",
        description:
          "Create and manage S3 buckets as cloud object storage to integrate with web or micro services.",
        descriptionI18n: {
          ar: "إنشاء وإدارة حِزَم (buckets) S3 كتخزين سحابي للكائنات (object storage) للتكامل مع تطبيقات الويب أو الخدمات الصغيرة (microservices).",
          cn: "创建并管理 S3 存储桶(bucket),作为云对象存储,与 Web 或微服务集成。",
          id: "Membuat dan mengelola S3 bucket sebagai cloud object storage untuk diintegrasikan dengan web atau microservice.",
          jp: "S3 バケットをクラウドオブジェクトストレージとして作成・管理し、Web サービスやマイクロサービスと統合する。",
          ru: "Создание и управление бакетами S3 в качестве облачного объектного хранилища для интеграции с веб- или микросервисами.",
        },
        sortOrder: 4,
      },
    ],
  },
  {
    title: "Railway",
    imageUrl:
      "https://res.cloudinary.com/dyhzh3ybt/image/upload/v1782206557/portfolio/skills/tsexneycgp7yy9tezmvi.png",
    sortOrder: 16,
    details: [
      {
        name: "Deploy",
        description:
          "Setup and manage deployment for many services such as backend, database and web services.",
        descriptionI18n: {
          ar: "إعداد وإدارة النشر لعدة خدمات مثل الخادم الخلفي (backend) وقاعدة البيانات وخدمات الويب.",
          cn: "设置并管理多种服务的部署,如后端、数据库和 Web 服务。",
          id: "Menyiapkan dan mengelola deployment untuk berbagai layanan seperti backend, database, dan web service.",
          jp: "バックエンド、データベース、Web サービスなど、さまざまなサービスのデプロイを設定・管理する。",
          ru: "Настройка и управление развёртыванием для множества сервисов, таких как backend, база данных и веб-сервисы.",
        },
        sortOrder: 0,
      },
      {
        name: "Networking",
        description:
          "Setup and manage network integration for database services such as PostgreSQL and MongoDB.",
        descriptionI18n: {
          ar: "إعداد وإدارة التكامل الشبكي لخدمات قواعد البيانات مثل PostgreSQL و MongoDB.",
          cn: "为 PostgreSQL、MongoDB 等数据库服务设置并管理网络集成。",
          id: "Menyiapkan dan mengelola network integration untuk layanan database seperti PostgreSQL dan MongoDB.",
          jp: "PostgreSQL や MongoDB などのデータベースサービスのネットワーク統合を設定・管理する。",
          ru: "Настройка и управление сетевой интеграцией для сервисов баз данных, таких как PostgreSQL и MongoDB.",
        },
        sortOrder: 1,
      },
      {
        name: "Scaling",
        description:
          "Setup and manage service scaling to avoid unhealthy service operation by increasing compute usage or adding load balancer.",
        descriptionI18n: {
          ar: "إعداد وإدارة توسيع نطاق الخدمة (scaling) لتجنب تشغيلها بشكل غير سليم، عبر زيادة استخدام الحوسبة أو إضافة موزّع أحمال (load balancer).",
          cn: "设置并管理服务扩容(scaling),通过增加计算资源使用量或添加负载均衡器,避免服务运行异常。",
          id: "Menyiapkan dan mengelola scaling layanan untuk menghindari operasi yang tidak sehat dengan meningkatkan penggunaan compute atau menambahkan load balancer.",
          jp: "コンピューティング使用量の増加やロードバランサーの追加によって、サービスの不健全な動作を避けるためのスケーリングを設定・管理する。",
          ru: "Настройка и управление масштабированием сервиса для предотвращения нестабильной работы за счёт увеличения вычислительных ресурсов или добавления балансировщика нагрузки.",
        },
        sortOrder: 2,
      },
      {
        name: "Observability",
        description:
          "Monitor resource usage, set custom alerts, and track logs.",
        descriptionI18n: {
          ar: "مراقبة استخدام الموارد، وضبط تنبيهات مخصصة، وتتبع السجلات (logs).",
          cn: "监控资源使用情况,设置自定义警报,并追踪日志。",
          id: "Memantau penggunaan resource, mengatur custom alert, dan melacak log.",
          jp: "リソース使用状況を監視し、カスタムアラートを設定し、ログを追跡する。",
          ru: "Мониторинг использования ресурсов, настройка пользовательских уведомлений и отслеживание логов.",
        },
        sortOrder: 3,
      },
    ],
  },
  {
    title: "Linux",
    imageUrl:
      "https://res.cloudinary.com/dyhzh3ybt/image/upload/v1782111433/portfolio/skills/imtaatf81av0ow1bdspc.png",
    sortOrder: 17,
    details: [
      {
        name: "i use arch",
        description: "btw.",
        descriptionI18n: {
          ar: "على فكرة.",
          cn: "顺便说一句。",
          id: "btw.",
          jp: "ちなみに。",
          ru: "кстати.",
        },
        sortOrder: 0,
      },
      {
        name: "vanguard",
        description: "is scared of linux.",
        descriptionI18n: {
          ar: "يخاف من Linux.",
          cn: "害怕 Linux。",
          id: "takut sama Linux.",
          jp: "Linux を怖がっている。",
          ru: "боится Linux.",
        },
        sortOrder: 1,
      },
      {
        name: "furry",
        description: "im not a furry despite the stereotype.",
        descriptionI18n: {
          ar: "لست furry على الرغم من الصورة النمطية.",
          cn: "尽管有这种刻板印象,但我不是furry。",
          id: "bukan furry meskipun stereotipnya begitu.",
          jp: "ステレオタイプに反して、ファーリーではない。",
          ru: "не furry, несмотря на стереотип.",
        },
        sortOrder: 2,
      },
      {
        name: "gay?",
        description: "bi.",
        descriptionI18n: {
          ar: "مزدوج (bi).",
          cn: "双性恋(bi)。",
          id: "bi.",
          jp: "バイ。",
          ru: "би.",
        },
        sortOrder: 3,
      },
      {
        name: "femboy",
        description: "maybe. mayhaps? might be.. could be.",
        descriptionI18n: {
          ar: "ربما. لعلّه؟ قد يكون.. يمكن أن يكون.",
          cn: "也许吧。说不定?有可能…可能是。",
          id: "mungkin. bisa jadi? mungkin saja.. bisa jadi.",
          jp: "かもしれない。もしかして?そうかもしれない…そうかもしれない。",
          ru: "может быть. возможно? может быть.. может быть.",
        },
        sortOrder: 3,
      },
      {
        name: "Command Line Interface",
        description: "Able to utilize Linux command prompt.",
        descriptionI18n: {
          ar: "القدرة على استخدام سطر أوامر Linux.",
          cn: "能够使用 Linux 命令行界面。",
          id: "Mampu menggunakan command prompt Linux.",
          jp: "Linux のコマンドプロンプトを使用できる。",
          ru: "Умение использовать командную строку Linux.",
        },
        sortOrder: 4,
      },
      {
        name: "you",
        description: "are dork :3",
        descriptionI18n: {
          ar: "حقّاً غريب :3",
          cn: "是个呆瓜 :3",
          id: "dasar dork :3",
          jp: "ドークだね :3",
          ru: "дорк :3",
        },
        sortOrder: 5,
      },
    ],
  },
  {
    title: "Minecraft Server",
    imageUrl:
      "https://res.cloudinary.com/dyhzh3ybt/image/upload/v1782119218/portfolio/skills/cby6kbvxoybe1kd2rlc3.avif",
    sortOrder: 18,
    details: [
      {
        name: "Local/LAN",
        description:
          "Setup Minecraft server for local/LAN connection on Windows, macOS or Linux.",
        descriptionI18n: {
          ar: "إعداد خادم Minecraft للاتصال المحلي/الشبكة المحلية (LAN) على Windows أو macOS أو Linux.",
          cn: "在 Windows、macOS 或 Linux 上为局域网(LAN)连接设置 Minecraft 服务器。",
          id: "Menyiapkan server Minecraft untuk koneksi local/LAN di Windows, macOS, atau Linux.",
          jp: "Windows、macOS、Linux 上でローカル/LAN 接続用の Minecraft サーバーを設定する。",
          ru: "Настройка сервера Minecraft для локального подключения/LAN на Windows, macOS или Linux.",
        },
        sortOrder: 0,
      },
      {
        name: "Self Hosted",
        description:
          "Setup Minecraft server for world wide connection on Windows, macOS or Linux via port-forwarding or tunneling.",
        descriptionI18n: {
          ar: "إعداد خادم Minecraft للاتصال العالمي على Windows أو macOS أو Linux عبر إعادة توجيه المنافذ (port-forwarding) أو الأنفاق (tunneling).",
          cn: "通过端口转发(port-forwarding)或隧道(tunneling)在 Windows、macOS 或 Linux 上为全球范围的连接设置 Minecraft 服务器。",
          id: "Menyiapkan server Minecraft untuk koneksi worldwide di Windows, macOS, atau Linux melalui port-forwarding atau tunneling.",
          jp: "ポートフォワーディングまたはトンネリングを使用して、Windows、macOS、Linux 上で世界中からアクセス可能な Minecraft サーバーを設定する。",
          ru: "Настройка сервера Minecraft для подключения по всему миру на Windows, macOS или Linux с помощью переадресации портов или туннелирования.",
        },
        sortOrder: 1,
      },
      {
        name: "Modded Server",
        description: "Setup modded Minecraft server with FabricAPI and other.",
        descriptionI18n: {
          ar: "إعداد خادم Minecraft معدّل (modded) باستخدام FabricAPI وغيرها.",
          cn: "使用 FabricAPI 等模组设置 Minecraft 模组服务器。",
          id: "Menyiapkan server Minecraft modded dengan FabricAPI dan lainnya.",
          jp: "FabricAPI などを使用した Minecraft の Mod サーバーを設定する。",
          ru: "Настройка модифицированного сервера Minecraft с помощью FabricAPI и других модов.",
        },
        sortOrder: 2,
      },
      {
        name: "playit.gg",
        description:
          "Setup vanilla or modded Minecraft server for world wide using playit.gg.",
        descriptionI18n: {
          ar: "إعداد خادم Minecraft عادي (vanilla) أو معدّل (modded) للوصول العالمي باستخدام playit.gg.",
          cn: "使用 playit.gg,设置可供全球访问的原版(vanilla)或模组(modded)Minecraft 服务器。",
          id: "Menyiapkan server Minecraft vanilla atau modded untuk akses worldwide menggunakan playit.gg.",
          jp: "playit.gg を使用して、世界中からアクセス可能なバニラまたは Mod 版の Minecraft サーバーを設定する。",
          ru: "Настройка обычного (vanilla) или модифицированного сервера Minecraft для доступа по всему миру с помощью playit.gg.",
        },
        sortOrder: 3,
      },
    ],
  },
  {
    title: "Discord",
    imageUrl:
      "https://res.cloudinary.com/dyhzh3ybt/image/upload/v1782119498/portfolio/skills/ekmqx60spzzsym6npqgm.png",
    sortOrder: 19,
    details: [
      {
        name: "Server Moderation",
        description:
          "Manage Discord server with its user and channel permission and roles.",
        descriptionI18n: {
          ar: "إدارة خادم Discord مع صلاحيات وأدوار المستخدمين والقنوات.",
          cn: "管理 Discord 服务器,包括用户和频道权限及角色。",
          id: "Mengelola server Discord beserta permission dan role pengguna serta channel.",
          jp: "ユーザーおよびチャンネルの権限とロールを含む Discord サーバーを管理する。",
          ru: "Управление сервером Discord, включая разрешения и роли пользователей и каналов.",
        },
        sortOrder: 0,
      },
      {
        name: "Server Integration",
        description:
          "Integrate webhooks for sending message through channel from selected services.",
        descriptionI18n: {
          ar: "دمج الـ webhooks لإرسال الرسائل عبر القناة من خدمات مختارة.",
          cn: "集成 webhook,以便从指定服务通过频道发送消息。",
          id: "Mengintegrasikan webhook untuk mengirim pesan melalui channel dari layanan yang dipilih.",
          jp: "選択したサービスからチャンネル経由でメッセージを送信するための Webhook を統合する。",
          ru: "Интеграция вебхуков (webhooks) для отправки сообщений через канал из выбранных сервисов.",
        },
        sortOrder: 1,
      },
      {
        name: "Discord Apps",
        description: "Create custom Discord Apps for server automation.",
        descriptionI18n: {
          ar: "إنشاء تطبيقات Discord مخصصة لأتمتة الخادم (server automation).",
          cn: "创建自定义 Discord 应用,用于服务器自动化。",
          id: "Membuat Discord App custom untuk server automation.",
          jp: "サーバーの自動化のためにカスタム Discord アプリを作成する。",
          ru: "Создание пользовательских приложений Discord для автоматизации сервера.",
        },
        sortOrder: 2,
      },
    ],
  },
  {
    title: "Figma",
    imageUrl:
      "https://res.cloudinary.com/dyhzh3ybt/image/upload/v1782120680/portfolio/skills/xgun12n0t1psjcgdobul.png",
    sortOrder: 20,
    details: [
      {
        name: "Design",
        description:
          "Create and manage app designs to get an idea of how the app will look to the end user.",
        descriptionI18n: {
          ar: "إنشاء وإدارة تصاميم التطبيق للحصول على فكرة عن شكل التطبيق بالنسبة للمستخدم النهائي.",
          cn: "创建并管理应用设计,直观了解应用在终端用户眼中的外观。",
          id: "Membuat dan mengelola desain aplikasi untuk mendapatkan gambaran tampilan aplikasi bagi end-user.",
          jp: "アプリのデザインを作成・管理し、エンドユーザーにどのように見えるかを把握する。",
          ru: "Создание и управление дизайном приложения, чтобы получить представление о том, как оно будет выглядеть для конечного пользователя.",
        },
        sortOrder: 0,
      },
      {
        name: "Prototype",
        description:
          "Visualize application prototype to understand the application workflow.",
        descriptionI18n: {
          ar: "تصور نموذج أولي (prototype) للتطبيق لفهم سير عمل التطبيق.",
          cn: "通过可视化应用原型(prototype)来理解应用的工作流程。",
          id: "Memvisualisasikan prototype aplikasi untuk memahami workflow aplikasi.",
          jp: "アプリケーションのプロトタイプを可視化し、アプリケーションのワークフローを理解する。",
          ru: "Визуализация прототипа приложения для понимания его рабочего процесса.",
        },
        sortOrder: 1,
      },
    ],
  },
  {
    title: "Notion",
    imageUrl:
      "https://res.cloudinary.com/dyhzh3ybt/image/upload/v1782207346/portfolio/skills/punqysejyyn0zbkel6d0.png",
    sortOrder: 21,
    details: [
      {
        name: "Project Management",
        description: "Productivity and note-taking web application.",
        descriptionI18n: {
          ar: "تطبيق ويب للإنتاجية وتدوين الملاحظات.",
          cn: "用于提高效率和记笔记的网页应用。",
          id: "Aplikasi web untuk produktivitas dan pencatatan.",
          jp: "生産性向上とノート作成のための Web アプリケーション。",
          ru: "Веб-приложение для продуктивности и создания заметок.",
        },
        sortOrder: 0,
      },
    ],
  },
  {
    title: "Trello",
    imageUrl:
      "https://res.cloudinary.com/dyhzh3ybt/image/upload/v1782120868/portfolio/skills/dhjvlworligefnotedts.png",
    sortOrder: 22,
    details: [
      {
        name: "Project Management",
        description:
          "Visual tool to manage project workflow and task tracking.",
        descriptionI18n: {
          ar: "أداة بصرية لإدارة سير عمل المشروع وتتبع المهام.",
          cn: "用于管理项目工作流程和任务追踪的可视化工具。",
          id: "Alat visual untuk mengelola workflow proyek dan task tracking.",
          jp: "プロジェクトのワークフロー管理とタスク追跡のためのビジュアルツール。",
          ru: "Визуальный инструмент для управления рабочим процессом проекта и отслеживания задач.",
        },
        sortOrder: 0,
      },
    ],
  },
  {
    title: "DaVinci Resolve",
    imageUrl:
      "https://res.cloudinary.com/dyhzh3ybt/image/upload/v1782270335/portfolio/skills/cr0ehjn91yf9v7sogxc8.png",
    sortOrder: 22,
    details: [
      {
        name: "Timeline",
        description:
          "Managing timeline settings for given needs such as resolution, aspect ratio and frame rate.",
        descriptionI18n: {
          ar: "إدارة إعدادات الخط الزمني (timeline) بحسب الحاجة، مثل الدقة (resolution) ونسبة الأبعاد (aspect ratio) ومعدل الإطارات (frame rate).",
          cn: "根据需求管理时间线(timeline)设置,如分辨率、宽高比和帧率。",
          id: "Mengelola pengaturan timeline sesuai kebutuhan seperti resolusi, aspect ratio, dan frame rate.",
          jp: "解像度、アスペクト比、フレームレートなど、要件に応じてタイムライン設定を管理する。",
          ru: "Управление настройками таймлайна в зависимости от потребностей, таких как разрешение, соотношение сторон и частота кадров.",
        },
        sortOrder: 0,
      },
      {
        name: "Output",
        description:
          "Adjust production export settings for given needs such as file format, video encoder or bitrate.",
        descriptionI18n: {
          ar: "ضبط إعدادات تصدير الإنتاج بحسب الحاجة، مثل صيغة الملف أو ترميز الفيديو (video encoder) أو معدل البت (bitrate).",
          cn: "根据需求调整成品导出设置,如文件格式、视频编码器或比特率。",
          id: "Menyesuaikan setting export produksi sesuai kebutuhan seperti format file, video encoder, atau bitrate.",
          jp: "ファイル形式、ビデオエンコーダー、ビットレートなど、要件に応じて書き出し設定を調整する。",
          ru: "Настройка параметров экспорта проекта в зависимости от потребностей, таких как формат файла, видеокодер или битрейт.",
        },
        sortOrder: 1,
      },
      {
        name: "Video Editing",
        description: "Basic knowledge of video editing.",
        descriptionI18n: {
          ar: "معرفة أساسية بتحرير الفيديو.",
          cn: "视频编辑的基础知识。",
          id: "Pengetahuan dasar tentang video editing.",
          jp: "動画編集の基礎知識。",
          ru: "Базовые знания видеомонтажа.",
        },
        sortOrder: 2,
      },
    ],
  },
  {
    title: "Photopea",
    imageUrl:
      "https://res.cloudinary.com/dyhzh3ybt/image/upload/v1782270414/portfolio/skills/memo4esieaxtlipf3fjh.png",
    sortOrder: 23,
    details: [
      {
        name: "Photo Editing",
        description: "Basic knowledge of photo editing.",
        descriptionI18n: {
          ar: "معرفة أساسية بتحرير الصور.",
          cn: "图片编辑的基础知识。",
          id: "Pengetahuan dasar tentang photo editing.",
          jp: "写真編集の基礎知識。",
          ru: "Базовые знания редактирования фотографий.",
        },
        sortOrder: 2,
      },
    ],
  },
];

export default SEED_SKILLS;
