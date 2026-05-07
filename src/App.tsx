import confetti from "canvas-confetti";
import {
  AlertTriangle,
  Banknote,
  BarChart3,
  CheckCircle2,
  ChevronDown,
  ExternalLink,
  Gamepad2,
  Landmark,
  Menu,
  MessageCircleWarning,
  PiggyBank,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  TrendingDown,
  TrendingUp,
  WalletCards,
  X
} from "lucide-react";
import { motion } from "framer-motion";
import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";

const InvestmentChart = lazy(() => import("./InvestmentChart"));
const PyramidStage = lazy(() => import("./PyramidStage"));

const navItems = [
  { href: "#signs", label: "Признаки", icon: AlertTriangle },
  { href: "#examples", label: "Примеры", icon: MessageCircleWarning },
  { href: "#protection", label: "Защита", icon: ShieldCheck },
  { href: "#tips", label: "Советы", icon: PiggyBank },
  { href: "#quiz", label: "Викторина", icon: Gamepad2 }
];

const pyramidSigns = [
  {
    title: "Нет допуска Банка России",
    icon: Landmark,
    text: "Компания предлагает финансовые услуги, но ее не видно в реестрах или сервисе проверки участника финансового рынка."
  },
  {
    title: "Доходность выше рынка",
    icon: TrendingUp,
    text: "Обещают 30-100% годовых, прибыль каждую неделю или «доход без риска» независимо от ситуации на рынке."
  },
  {
    title: "Гарантия прибыли",
    icon: CheckCircle2,
    text: "На рынке инвестиций результат не гарантирован. Слова «точно заработаете» и «мы страхуем все риски» должны насторожить."
  },
  {
    title: "Деньги новых участников",
    icon: WalletCards,
    text: "Выплаты завязаны на приглашение друзей, промокоды, уровни команды и бонусы за пополнение чужих счетов."
  },
  {
    title: "Агрессивная реклама",
    icon: MessageCircleWarning,
    text: "Telegram-каналы, звонки «аналитиков», дедлайн «только сегодня» и давление через страх упустить шанс."
  },
  {
    title: "Непрозрачная деятельность",
    icon: SearchCheck,
    text: "Нет понятной бизнес-модели, отчетности, договора, адреса, ИНН или объяснения, откуда реально берется доход."
  }
];

const examples = [
  {
    tag: "FTX-урок",
    title: "Фасад надежной платформы",
    text: "FTX продвигалась как безопасная криптобиржа с продвинутым риск-контролем. В учебном разборе это пример того, что бренд и медийность не заменяют проверку."
  },
  {
    tag: "FTX-урок",
    title: "Связанная компания рядом",
    text: "Alameda Research была аффилированной торговой фирмой. Главный риск: клиент не видит, куда реально уходят активы и кто получает особые условия."
  },
  {
    tag: "FTX-урок",
    title: "Собственный токен как опора",
    text: "Когда капитал и залоги завязаны на внутренний токен проекта, цена может держаться на доверии, а при панике быстро терять устойчивость."
  },
  {
    tag: "РФ-аналогия",
    title: "Звонок или Telegram с «экспертом»",
    text: "Для российского пользователя похожий красный флаг: давление, обещание дохода, просьба перевести деньги вне легального договора и реестров."
  }
];

const ftxFlow = [
  {
    title: "Клиенты",
    icon: WalletCards,
    text: "Вносят деньги и криптоактивы, ожидая хранения и доступного вывода."
  },
  {
    title: "FTX",
    icon: Banknote,
    text: "Публично выглядит как технологичная биржа с контролем рисков."
  },
  {
    title: "Alameda",
    icon: TrendingUp,
    text: "Получает скрытую поддержку и, по обвинениям регуляторов, доступ к средствам клиентов."
  },
  {
    title: "Риск",
    icon: TrendingDown,
    text: "Смешение средств, неликвидные токены, долговая нагрузка и обвал доверия."
  }
];

const ftxRedFlags = [
  "непрозрачная связь биржи и аффилированной торговой компании",
  "заявления о безопасности, которые невозможно проверить снаружи",
  "опора на собственный токен и внутренние оценки стоимости",
  "отсутствие понятной защиты клиента при массовом выводе средств",
  "ситуация, где «доходность» и ликвидность держатся на доверии, а не на прозрачных активах"
];

const protectionSteps = [
  "Откройте сервис Банка России «Проверить участника финансового рынка».",
  "Введите название, ИНН, ОГРН, адрес сайта или номер лицензии компании.",
  "Сверьте юридическое лицо, вид деятельности, статус лицензии и дату обновления данных.",
  "Проверьте бренд и домен в списке компаний с выявленными признаками нелегальной деятельности.",
  "Если данные не совпадают, есть давление или перевод на карту физлица, остановите платеж и сохраните доказательства."
];

const safetyTips = [
  "Разделяйте деньги: подушка безопасности отдельно, инвестиции отдельно.",
  "Для консервативной части изучайте вклады, ОФЗ и фонды у легальных участников рынка.",
  "Не переводите деньги на карты физических лиц, криптокошельки и счета «партнеров».",
  "Проверяйте не только название бренда, но и ИНН, ОГРН, домен, договор и получателя платежа.",
  "Берите паузу минимум на сутки, если вас торопят внести деньги прямо сейчас."
];

const quizQuestions = [
  {
    question: "Платформа громко заявляет, что клиентские активы «в безопасности», но не объясняет, где они хранятся.",
    answers: [
      "Проверить регулирование, договор, хранение активов и связь с другими компаниями",
      "Доверять бренду, если о нем пишут крупные СМИ",
      "Оценивать только удобство приложения"
    ],
    correct: 0
  },
  {
    question: "Проект выпускает собственный токен и использует его как важную часть залога и оценки капитала.",
    answers: [
      "Это всегда делает проект надежнее",
      "Это красный флаг: стоимость может держаться на доверии к самому проекту",
      "Это заменяет аудит и раскрытие отчетности"
    ],
    correct: 1
  },
  {
    question: "У платформы есть связанная торговая компания, но пользователю говорят, что она «как все остальные клиенты».",
    answers: [
      "Нужно искать конфликт интересов и специальные условия для связанной компании",
      "Это неважно, если интерфейс работает быстро",
      "Это плюс: свои компании всегда лучше контролируются"
    ],
    correct: 0
  },
  {
    question: "В российском Telegram-канале обещают «FTX 2.0 без ошибок» и доход 12% в неделю.",
    answers: [
      "Это похоже на пирамидальный сценарий: сверхдоходность, давление и непрозрачность",
      "Это безопасно, потому что старый кейс уже изучен",
      "Можно входить, если администратор показывает скриншоты выплат"
    ],
    correct: 0
  },
  {
    question: "Перед переводом денег в РФ вы хотите проверить компанию после урока FTX.",
    answers: [
      "Сверить участника в сервисе Банка России и проверить список предупреждений",
      "Ориентироваться на красивый сайт и отзывы в рекламе",
      "Спросить только у менеджера компании"
    ],
    correct: 0
  }
];

type ChartPoint = {
  month: string;
  safe: number;
  pyramid: number;
  riskZone: number;
};

function formatRub(value: number) {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0
  }).format(value);
}

function buildChartData(amount: number, years: number): ChartPoint[] {
  const months = years * 12;
  const safeMonthlyRate = 0.095 / 12;

  return Array.from({ length: months + 1 }, (_, index) => {
    const safe = amount * Math.pow(1 + safeMonthlyRate, index);
    const growthPhase = months * 0.42;
    const fakeGrowth = amount * Math.pow(1 + 0.065, Math.min(index, growthPhase));
    const collapseProgress = Math.max(0, (index - growthPhase) / Math.max(1, months - growthPhase));
    const pyramid = collapseProgress
      ? Math.max(amount * 0.04, fakeGrowth * Math.pow(1 - collapseProgress, 2.8))
      : fakeGrowth;

    return {
      month: `${index} мес.`,
      safe: Math.round(safe),
      pyramid: Math.round(pyramid),
      riskZone: Math.round(Math.max(safe, pyramid) * 1.08)
    };
  });
}

function SectionTitle({
  eyebrow,
  title,
  text
}: {
  eyebrow: string;
  title: string;
  text: string;
}) {
  return (
    <motion.div
      className="section-title"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
    >
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      <p>{text}</p>
    </motion.div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);
  const [amount, setAmount] = useState(100000);
  const [years, setYears] = useState(3);
  const [quizIndex, setQuizIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);
  const [scrollBoost, setScrollBoost] = useState(0);
  const boostTimer = useRef<number | undefined>(undefined);
  const lastScroll = useRef(0);

  useEffect(() => {
    lastScroll.current = window.scrollY;
    const onScroll = () => {
      const distance = Math.abs(window.scrollY - lastScroll.current);
      lastScroll.current = window.scrollY;
      setScrollBoost(Math.min(1.5, distance / 44));
      window.clearTimeout(boostTimer.current);
      boostTimer.current = window.setTimeout(() => setScrollBoost(0), 130);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(boostTimer.current);
    };
  }, []);

  const chartData = useMemo(() => buildChartData(amount, years), [amount, years]);
  const quiz = quizQuestions[quizIndex];
  const resultLevel =
    score >= 4 ? "Финансовый щит включен" : score >= 3 ? "Хорошая база, но нужна пауза" : "Красные флаги пока маскируются";

  const handleAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(answerIndex);
    const isCorrect = answerIndex === quiz.correct;
    const nextScore = score + (isCorrect ? 1 : 0);

    window.setTimeout(() => {
      if (quizIndex === quizQuestions.length - 1) {
        setScore(nextScore);
        setFinished(true);
        if (nextScore >= 4) {
          confetti({
            particleCount: 130,
            spread: 78,
            origin: { y: 0.72 },
            colors: ["#33f5ad", "#ffffff", "#ff375f"]
          });
        }
      } else {
        setScore(nextScore);
        setQuizIndex((current) => current + 1);
        setSelectedAnswer(null);
      }
    }, 720);
  };

  const restartQuiz = () => {
    setQuizIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setFinished(false);
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="На первый экран">
          <span className="brand-mark">₽</span>
          <span>АнтиПирамида РФ</span>
        </a>

        <nav className="desktop-nav" aria-label="Главная навигация">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <button
          className="menu-button"
          type="button"
          aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      {menuOpen && (
        <motion.nav
          className="mobile-menu"
          aria-label="Мобильная навигация"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
                <Icon size={18} />
                {item.label}
              </a>
            );
          })}
        </motion.nav>
      )}

      <main id="top">
        <section className="hero-section">
          <div className="hero-copy">
            <motion.p
              className="hero-kicker"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
            >
              образовательный fintech-сервис
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.05 }}
            >
              Финансовые пирамиды и безопасные инвестиции в РФ
            </motion.h1>
            <motion.p
              className="hero-lead"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.12 }}
            >
              Разберите схему на примере FTX, проверьте признаки риска для РФ, сравните безопасный сценарий с
              обрушением доверия и пройдите мини-тест по ситуациям из мессенджеров, звонков и псевдоинвест-проектов.
            </motion.p>
            <motion.div
              className="hero-actions"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.18 }}
            >
              <a className="primary-button" href="#protection">
                <SearchCheck size={20} />
                Проверить компанию
              </a>
              <a className="ghost-button" href="#quiz">
                <Gamepad2 size={20} />
                Начать викторину
              </a>
            </motion.div>
            <motion.div
              className="hero-metrics"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.25 }}
            >
              <span>
                <b>5</b> ситуаций в квизе
              </span>
              <span>
                <b>3</b> шага до стоп-сигнала
              </span>
              <span>
                <b>44px</b> touch-ready интерфейс
              </span>
            </motion.div>
          </div>

          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.12 }}
          >
            <Suspense
              fallback={
                <div className="pyramid-stage pyramid-placeholder" aria-hidden="true">
                  <span>₽</span>
                </div>
              }
            >
              <PyramidStage scrollBoost={scrollBoost} />
            </Suspense>
          </motion.div>
        </section>

        <section className="quick-strip" aria-label="Быстрые действия">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <a key={item.href} href={item.href}>
                <Icon size={18} />
                <span>{item.label}</span>
              </a>
            );
          })}
        </section>

        <section className="content-section" id="signs">
          <SectionTitle
            eyebrow="детектор признаков"
            title="Когда инвестиция превращается в ловушку"
            text="Сетка перестраивается: три колонки на десктопе и одна крупная колонка на телефоне."
          />
          <div className="sign-grid">
            {pyramidSigns.map((sign, index) => {
              const Icon = sign.icon;
              return (
                <motion.article
                  className="risk-card"
                  key={sign.title}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.42, delay: index * 0.04 }}
                >
                  <Icon size={24} />
                  <h3>{sign.title}</h3>
                  <p>{sign.text}</p>
                </motion.article>
              );
            })}
          </div>
        </section>

        <section className="content-section examples-band" id="examples">
          <SectionTitle
            eyebrow="кейс FTX"
            title="Как большая платформа стала учебным примером схемы доверия"
            text="FTX не равна классической финансовой пирамиде в юридическом смысле. Здесь она используется как понятный кейс: непрозрачность, связанные лица, смешение клиентских средств и быстрый обвал доверия."
          />
          <div className="ftx-case">
            <div className="ftx-flow" aria-label="Схема FTX">
              {ftxFlow.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.article
                    className="flow-card"
                    key={step.title}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.36, delay: index * 0.05 }}
                  >
                    <Icon size={24} />
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </motion.article>
                );
              })}
            </div>

            <div className="ftx-redflags">
              <div>
                <Sparkles size={24} />
                <h3>Разбор схемы</h3>
                <p>
                  На примере FTX удобно показать, как доверие, громкий бренд и сложные финансовые связи могут скрывать
                  реальные риски для клиента.
                </p>
              </div>
              <ul>
                {ftxRedFlags.map((flag) => (
                  <li key={flag}>{flag}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="example-grid">
            {examples.map((example) => (
              <motion.article
                className="example-card"
                key={example.title}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <span>{example.tag}</span>
                <h3>{example.title}</h3>
                <p>{example.text}</p>
              </motion.article>
            ))}
          </div>
          <div className="ftx-source-actions">
            <a href="https://www.sec.gov/newsroom/press-releases/2022-219" target="_blank" rel="noreferrer">
              <ExternalLink size={18} />
              SEC: обвинения по FTX
            </a>
            <a
              href="https://www.justice.gov/archives/opa/pr/samuel-bankman-fried-sentenced-25-years-his-orchestration-multiple-fraudulent-schemes"
              target="_blank"
              rel="noreferrer"
            >
              <ExternalLink size={18} />
              DOJ: приговор SBF
            </a>
            <a href="https://www.cftc.gov/PressRoom/PressReleases/8938-24" target="_blank" rel="noreferrer">
              <ExternalLink size={18} />
              CFTC: FTX и Alameda
            </a>
          </div>
        </section>

        <section className="content-section protection-layout" id="protection">
          <div>
            <SectionTitle
              eyebrow="инструменты защиты"
              title="Проверка до первого перевода"
              text="Кнопка открывает короткий алгоритм работы с сервисами Банка России и списком компаний с признаками нелегальной деятельности."
            />
            <div className="source-actions">
              <a href="https://www.cbr.ru/finorg/" target="_blank" rel="noreferrer">
                <ExternalLink size={18} />
                Сервис проверки ЦБ
              </a>
              <a href="https://www.cbr.ru/inside/warning-list/" target="_blank" rel="noreferrer">
                <ExternalLink size={18} />
                Список предупреждений
              </a>
            </div>
          </div>

          <div className="guide-panel">
            <button className="guide-toggle" type="button" onClick={() => setGuideOpen((value) => !value)}>
              <span>
                <SearchCheck size={22} />
                Проверить компанию
              </span>
              <ChevronDown size={20} className={guideOpen ? "rotate" : ""} />
            </button>
            {guideOpen && (
              <motion.ol
                className="guide-list"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.32 }}
              >
                {protectionSteps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </motion.ol>
            )}
          </div>
        </section>

        <section className="content-section calculator-section" id="calculator">
          <SectionTitle
            eyebrow="калькулятор инвестора"
            title="Стабильный рост против FTX-сценария обвала доверия"
            text="График иллюстративный: он показывает механику риска, а не прогноз доходности или оценку конкретного актива."
          />
          <div className="calculator-grid">
            <div className="controls-panel">
              <label>
                <span>Стартовая сумма</span>
                <strong>{formatRub(amount)}</strong>
                <input
                  type="range"
                  min="20000"
                  max="500000"
                  step="10000"
                  value={amount}
                  onChange={(event) => setAmount(Number(event.target.value))}
                />
              </label>
              <label>
                <span>Горизонт</span>
                <strong>{years} года</strong>
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  value={years}
                  onChange={(event) => setYears(Number(event.target.value))}
                />
              </label>
              <div className="scenario-note">
                <BarChart3 size={22} />
                  <p>
                  Зеленая линия моделирует умеренный сложный процент, красная показывает FTX-подобный сценарий:
                  сначала рост доверия, затем резкий отток и потеря ликвидности.
                </p>
              </div>
            </div>

            <div className="chart-panel">
              <Suspense fallback={<div className="chart-fallback">Загружаем график...</div>}>
                <InvestmentChart data={chartData} />
              </Suspense>
            </div>
          </div>
        </section>

        <section className="content-section tips-section" id="tips">
          <SectionTitle
            eyebrow="советы"
            title="Привычки безопасного инвестора"
            text="Короткий чек-лист перед тем, как открыть счет, подписать договор или перевести деньги."
          />
          <div className="tips-list">
            {safetyTips.map((tip, index) => (
              <motion.div
                className="tip-row"
                key={tip}
                initial={{ opacity: 0, x: -18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.36, delay: index * 0.04 }}
              >
                <span>{index + 1}</span>
                <p>{tip}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="content-section quiz-section" id="quiz">
          <SectionTitle
            eyebrow="мини-игра"
            title="Викторина: распознай риск"
            text="Пять ситуаций из звонков, рекламы и переписок. Победа запускает конфетти."
          />
          <div className="quiz-panel">
            {!finished ? (
              <>
                <div className="quiz-progress" aria-label={`Вопрос ${quizIndex + 1} из ${quizQuestions.length}`}>
                  <span style={{ width: `${((quizIndex + 1) / quizQuestions.length) * 100}%` }} />
                </div>
                <p className="quiz-counter">
                  Вопрос {quizIndex + 1} / {quizQuestions.length}
                </p>
                <h3>{quiz.question}</h3>
                <div className="answer-grid">
                  {quiz.answers.map((answer, answerIndex) => {
                    const isSelected = selectedAnswer === answerIndex;
                    const isCorrect = quiz.correct === answerIndex;
                    const className =
                      selectedAnswer === null
                        ? ""
                        : isCorrect
                          ? "correct"
                          : isSelected
                            ? "wrong"
                            : "muted";

                    return (
                      <button
                        type="button"
                        key={answer}
                        className={className}
                        disabled={selectedAnswer !== null}
                        onClick={() => handleAnswer(answerIndex)}
                      >
                        {answer}
                      </button>
                    );
                  })}
                </div>
              </>
            ) : (
              <motion.div
                className="quiz-result"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.36 }}
              >
                {score >= 4 ? <ShieldCheck size={42} /> : <AlertTriangle size={42} />}
                <p>{resultLevel}</p>
                <h3>
                  {score} из {quizQuestions.length}
                </h3>
                <span>
                  {score >= 4
                    ? "Вы уверенно распознаете ключевые признаки пирамид."
                    : "Повторите блок признаков и обязательно проверяйте компании до перевода денег."}
                </span>
                <button type="button" onClick={restartQuiz}>
                  Пройти еще раз
                </button>
              </motion.div>
            )}
          </div>
        </section>
      </main>

      <nav className="bottom-nav" aria-label="Быстрая мобильная навигация">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <a key={item.href} href={item.href} aria-label={item.label}>
              <Icon size={20} />
              <span>{item.label}</span>
            </a>
          );
        })}
      </nav>

      <footer>
        <div>
          <span className="brand-mark">₽</span>
          <p>Проект выполнен в образовательных целях. Не является финансовой рекомендацией</p>
        </div>
        <div className="footer-links">
          <a href="https://cbr.ru/Reception/TopicalMessage/Page/2672" target="_blank" rel="noreferrer">
            Признаки пирамид
          </a>
          <a href="https://www.cbr.ru/development/warning-list/" target="_blank" rel="noreferrer">
            API списка ЦБ
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
