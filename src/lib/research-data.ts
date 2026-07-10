export type Field =
  | "physics"
  | "medicine"
  | "cs"
  | "biology"
  | "chemistry"
  | "neuroscience"
  | "astronomy"
  | "math";

export const FIELD_LABEL: Record<Field, string> = {
  physics: "الفيزياء",
  medicine: "الطب",
  cs: "علوم الحاسوب",
  biology: "علم الأحياء",
  chemistry: "الكيمياء",
  neuroscience: "علوم الأعصاب",
  astronomy: "الفلك",
  math: "الرياضيات",
};

export interface Research {
  id: string;
  titleAr: string;
  titleEn: string;
  field: Field;
  authors: string;
  source: string;
  year: number;
  summaryAr: string;
  abstractAr: string;
  originalUrl: string;
  readUrl: string; // مفتوح الوصول للقراءة الكاملة
}

/**
 * أبحاث حقيقية مفتوحة الوصول (Open Access) — روابط تفتح النص الكامل مباشرةً.
 */
export const RESEARCH_LIST: Research[] = [
  {
    id: "attention-is-all-you-need",
    titleAr: "الانتباه هو كل ما تحتاجه: بنية Transformer",
    titleEn: "Attention Is All You Need",
    field: "cs",
    authors: "Vaswani et al.",
    source: "NeurIPS · arXiv:1706.03762",
    year: 2017,
    summaryAr:
      "الورقة التي أطلقت ثورة نماذج اللغة الكبيرة، بتقديم بنية Transformer المعتمدة كلياً على آلية الانتباه.",
    abstractAr:
      "نقترح بنية شبكة عصبية جديدة تُدعى Transformer تعتمد فقط على آليات الانتباه، متخلّيةً عن الشبكات المتكررة والملتوية. أظهرت التجارب على مهام الترجمة الآلية تفوّقاً ملحوظاً في الجودة، مع قابلية أعلى للتوازي وزمن تدريب أقصر بكثير.",
    originalUrl: "https://arxiv.org/abs/1706.03762",
    readUrl: "https://arxiv.org/pdf/1706.03762.pdf",
  },
  {
    id: "alphafold-protein-structure",
    titleAr: "AlphaFold: التنبؤ الدقيق ببنية البروتينات",
    titleEn: "Highly accurate protein structure prediction with AlphaFold",
    field: "biology",
    authors: "Jumper et al. (DeepMind)",
    source: "Nature 596, 583–589",
    year: 2021,
    summaryAr:
      "اختراق في علم الأحياء الحاسوبي حلّ إحدى أكبر معضلات البيولوجيا: التنبؤ ببنية البروتين ثلاثية الأبعاد من تسلسله.",
    abstractAr:
      "قدّمنا نموذجاً حاسوبياً يُدعى AlphaFold يتنبأ ببنية البروتين ثلاثية الأبعاد بدقّة تُقارِب الدقّة التجريبية في معظم الحالات. يعتمد النموذج على شبكة عصبية جديدة تدمج المعلومات التطوّرية والفيزيائية والهندسية.",
    originalUrl: "https://www.nature.com/articles/s41586-021-03819-2",
    readUrl: "https://www.nature.com/articles/s41586-021-03819-2",
  },
  {
    id: "crispr-cas9-genome-editing",
    titleAr: "نظام CRISPR-Cas9 لتحرير الجينوم الموجّه",
    titleEn: "A Programmable Dual-RNA–Guided DNA Endonuclease",
    field: "biology",
    authors: "Jinek, Chylinski, Doudna, Charpentier et al.",
    source: "Science 337, 816–821",
    year: 2012,
    summaryAr:
      "الورقة المؤسِّسة لتقنية CRISPR-Cas9 التي فتحت باب تحرير الجينات في مختبرات العالم كلّه.",
    abstractAr:
      "نُظهر أنّ إنزيم Cas9 يمكن برمجته بواسطة RNA موجِّه مفرد لقصّ DNA في مواقع مستهدفة بدقّة. هذه القدرة تفتح آفاقاً واسعة للهندسة الوراثية والعلاج الجيني.",
    originalUrl: "https://www.science.org/doi/10.1126/science.1225829",
    readUrl: "https://www.science.org/doi/10.1126/science.1225829",
  },
  {
    id: "higgs-boson-discovery",
    titleAr: "اكتشاف بوزون هيغز في مصادم الهادرونات الكبير",
    titleEn: "Observation of a new particle at 125 GeV",
    field: "physics",
    authors: "ATLAS & CMS Collaborations",
    source: "Physics Letters B 716",
    year: 2012,
    summaryAr:
      "الإعلان التاريخي عن رصد جسيم متوافق مع بوزون هيغز، يُكمل النموذج القياسي لفيزياء الجسيمات.",
    abstractAr:
      "تُقدّم تجربتا ATLAS وCMS في CERN دليلاً على وجود جسيم جديد كتلته نحو 125 غيغا إلكترون فولت، بخصائص متوافقة مع بوزون هيغز الذي تنبّأت به نظرية النموذج القياسي.",
    originalUrl: "https://arxiv.org/abs/1207.7214",
    readUrl: "https://arxiv.org/pdf/1207.7214.pdf",
  },
  {
    id: "mrna-covid-vaccine",
    titleAr: "سلامة وفعالية لقاح mRNA لكوفيد-19",
    titleEn: "Safety and Efficacy of the BNT162b2 mRNA Covid-19 Vaccine",
    field: "medicine",
    authors: "Polack et al.",
    source: "N Engl J Med 383",
    year: 2020,
    summaryAr:
      "التجربة السريرية الكبرى التي أثبتت فعالية 95% للقاح mRNA ضد كوفيد-19، وأطلقت عصراً جديداً في اللقاحات.",
    abstractAr:
      "تجربة سريرية عشوائية شملت أكثر من 43,000 مشارك أظهرت أنّ لقاح BNT162b2 المعتمد على mRNA يوفّر حماية بنسبة 95% ضد الإصابة بكوفيد-19 المُصحوبة بأعراض، بملف أمان مقبول.",
    originalUrl: "https://www.nejm.org/doi/full/10.1056/NEJMoa2034577",
    readUrl: "https://www.nejm.org/doi/full/10.1056/NEJMoa2034577",
  },
  {
    id: "gravitational-waves-detection",
    titleAr: "أول رصد مباشر لموجات الجاذبية",
    titleEn: "Observation of Gravitational Waves from a Binary Black Hole Merger",
    field: "physics",
    authors: "LIGO Scientific Collaboration",
    source: "Phys. Rev. Lett. 116, 061102",
    year: 2016,
    summaryAr:
      "قبل 100 عام من تنبّؤ آينشتاين، رصد كاشف LIGO موجات الجاذبية الناتجة عن اندماج ثقبين أسودين.",
    abstractAr:
      "في 14 سبتمبر 2015، رصد كاشفا LIGO إشارة موجة جاذبية عابرة تُطابق ما تتوقّعه النسبية العامة لاندماج ثقبين أسودين تبلغ كتلتاهما نحو 36 و29 كتلة شمسية.",
    originalUrl: "https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.116.061102",
    readUrl: "https://arxiv.org/pdf/1602.03837.pdf",
  },
  {
    id: "black-hole-image-m87",
    titleAr: "أول صورة لثقب أسود: M87*",
    titleEn: "First M87 Event Horizon Telescope Results",
    field: "astronomy",
    authors: "Event Horizon Telescope Collaboration",
    source: "ApJL 875, L1",
    year: 2019,
    summaryAr:
      "أوّل صورة مباشرة لأفق حدث ثقب أسود عملاق في مركز مجرّة M87، بمزج بيانات ثمانية تلسكوبات حول الأرض.",
    abstractAr:
      "قدّم تعاون تلسكوب أفق الحدث EHT أوّل صور مباشرة تُظهر الظلّ المميّز لثقب أسود فائق الكتلة يبعد 55 مليون سنة ضوئية، مؤكّداً توقّعات النسبية العامة في نظام حقول جاذبية قويّة.",
    originalUrl: "https://iopscience.iop.org/article/10.3847/2041-8213/ab0ec7",
    readUrl: "https://iopscience.iop.org/article/10.3847/2041-8213/ab0ec7",
  },
  {
    id: "deep-residual-learning",
    titleAr: "التعلّم المتبقي العميق للتعرّف على الصور (ResNet)",
    titleEn: "Deep Residual Learning for Image Recognition",
    field: "cs",
    authors: "He, Zhang, Ren, Sun",
    source: "CVPR · arXiv:1512.03385",
    year: 2015,
    summaryAr:
      "ResNet: الفكرة التي مكّنت تدريب شبكات بأعماق تتجاوز 150 طبقة، وأحدثت طفرة في الرؤية الحاسوبية.",
    abstractAr:
      "نُقدّم إطار تعلّم متبقٍّ يُسهّل تدريب الشبكات العصبية الأعمق بكثير من السابق، عبر إعادة صياغة الطبقات لتتعلّم دوالّ متبقّية بالنسبة لمدخلاتها بدلاً من دوالّ غير مرجعية.",
    originalUrl: "https://arxiv.org/abs/1512.03385",
    readUrl: "https://arxiv.org/pdf/1512.03385.pdf",
  },
  {
    id: "connectome-neural-basis",
    titleAr: "خريطة الاتصال العصبي الكامل لدماغ الذبابة",
    titleEn: "A connectome and analysis of the adult Drosophila central brain",
    field: "neuroscience",
    authors: "Scheffer et al.",
    source: "eLife 9:e57443",
    year: 2020,
    summaryAr:
      "أوّل خريطة كاملة تقريباً لجميع الروابط العصبية في دماغ حيوان معقّد: ذبابة الفاكهة البالغة.",
    abstractAr:
      "قدّمنا خريطة اتصال عصبي عالية الدقّة تشمل نحو 25,000 عصبون و20 مليون تشابك عصبي في الدماغ المركزي لذبابة الفاكهة، ما يتيح تحليل الدوائر العصبية بمستوى غير مسبوق.",
    originalUrl: "https://elifesciences.org/articles/57443",
    readUrl: "https://elifesciences.org/articles/57443",
  },
];

export const getResearchById = (id: string) =>
  RESEARCH_LIST.find((r) => r.id === id);
