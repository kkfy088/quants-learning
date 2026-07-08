import type { Resource, Cheatsheet, QuizQuestion } from "@/lib/types";

// ── Resources ──────────────────────────────────────────────

export const resources: Resource[] = [
  // Datasets
  { id: "r1", title: "Walmart Sales Forecasting", url: "https://www.kaggle.com/c/walmart-recruiting-store-sales-forecasting", description: "Walmart 历史销售数据，45个门店143周，经典零售预测入门数据集", category: "dataset", lang: "en" },
  { id: "r2", title: "M5 Competition", url: "https://www.kaggle.com/competitions/m5-forecasting-accuracy", description: "Walmart 商品层级销量预测竞赛，含日历/价格/事件数据，供应链预测必刷榜", category: "dataset", lang: "en" },
  { id: "r3", title: "Rossmann Store Sales", url: "https://www.kaggle.com/c/rossmann-store-sales", description: "德国药妆连锁店日销量，含促销/节假日/竞争店距等特征，因子挖掘经典案例", category: "dataset", lang: "en" },
  { id: "r4", title: "Favorita Grocery Sales", url: "https://www.kaggle.com/competitions/favorita-grocery-sales-forecasting", description: "厄瓜多尔杂货连锁店销量，含油价/地震等外生变量，供应链+宏观因子绝佳案例", category: "dataset", lang: "en" },
  { id: "r5", title: "E-Commerce Data (UCI)", url: "https://archive.ics.uci.edu/dataset/502/online+retail+ii", description: "英国电商交易记录 2009-2011，RFM 分析和时序预测的入门标准数据集", category: "dataset", lang: "en" },
  { id: "r6", title: "京东供应链需求预测", url: "https://www.datafountain.cn/competitions/530", description: "国产数据集，基于真实供应链场景的需求预测竞赛", category: "dataset", lang: "zh" },
  // GitHub
  { id: "g1", title: "microsoft/qlib", url: "https://github.com/microsoft/qlib", description: "微软开源的 AI 量化平台，含模型/因子/回测/执行全栈，直接复用回测框架到供应链", category: "github", lang: "en" },
  { id: "g2", title: "microsoft/RD-Agent", url: "https://github.com/microsoft/RD-Agent", description: "因子自动挖掘闭环：假设→代码→回测→迭代，可直接改造为销量因子挖掘引擎", category: "github", lang: "en" },
  { id: "g3", title: "facebook/prophet", url: "https://github.com/facebook/prophet", description: "Meta 开源时序预测库，供应链/零售领域最广泛使用的预测工具", category: "github", lang: "en" },
  { id: "g4", title: "skforecast", url: "https://github.com/skforecast/skforecast", description: "Python 时序预测库，把任意 sklearn 回归器变成多步预测器，供应链 ML 预测首选", category: "github", lang: "en" },
  { id: "g5", title: "nixtla/statsforecast", url: "https://github.com/Nixtla/statsforecast", description: "Nixtla 统计预测库，AutoARIMA/ETS/CES 等 30+ 模型，供应链基线预测工业级库", category: "github", lang: "en" },
  { id: "g6", title: "darts (unit8co)", url: "https://github.com/unit8co/darts", description: "Python 时序预测库，统一接口支持 ARIMA/Prophet/TFT/N-BEATS，切换模型只需一改", category: "github", lang: "en" },
  { id: "g7", title: "langchain-ai/langgraph", url: "https://github.com/langchain-ai/langgraph", description: "图式 Agent 编排框架，适合构建 数据→特征→建模→回测 的有状态预测流水线", category: "github", lang: "en" },
  { id: "g8", title: "TradingAgents", url: "https://github.com/TauricResearch/TradingAgents", description: "UCLA/MIT 7万星多智能体投研框架，基本面+技术+情绪分析师协作辩论，可借鉴架构", category: "github", lang: "en" },
  { id: "g9", title: "amazon-science/chronos-forecasting", url: "https://github.com/amazon-science/chronos-forecasting", description: "Amazon 时序预训练大模型，零样本预测能力，适合供应链新品冷启动场景", category: "github", lang: "en" },
  { id: "g10", title: "pandas-dev/pandas", url: "https://github.com/pandas-dev/pandas", description: "Python 数据分析核心库，量化与供应链的数据清洗都靠它", category: "github", lang: "en" },
  { id: "g11", title: "dmlc/xgboost", url: "https://github.com/dmlc/xgboost", description: "Kaggle 王者模型，表格数据的基准模型，销量预测中 PK 深度学习不落下风", category: "github", lang: "en" },
  { id: "g12", title: "microsoft/LightGBM", url: "https://github.com/microsoft/LightGBM", description: "微软梯度提升框架，比 XGBoost 更快、更省内存，大规模 SKU 预测时优势明显", category: "github", lang: "en" },
  // Videos
  { id: "v1", title: "StatQuest: ARIMA in Python", url: "https://www.youtube.com/watch?v=3UmyHed0iYE", description: "StatQuest 是统计学最好懂的 YouTuber，ARIMA 从原理到代码一步到位（英文字幕）", category: "video", lang: "en" },
  { id: "v2", title: "Forecasting: Principles and Practice (Online Book)", url: "https://otexts.com/fpp3/", description: "Rob Hyndman 的预测学圣经，免费在线全本，供应链预测理论基石", category: "video", lang: "en" },
  { id: "v3", title: "Kaggle Time Series Course", url: "https://www.kaggle.com/learn/time-series", description: "Kaggle 官方时序微课程，含 notebook 实操，30 分钟入门", category: "video", lang: "en" },
  { id: "v4", title: "机器学习预测销量 B站", url: "https://search.bilibili.com/all?keyword=%E6%9C%BA%E5%99%A8%E5%AD%A6%E4%B9%A0+%E9%94%80%E5%94%AE%E9%A2%84%E6%B5%8B", description: "B站 机器学习 + 销量预测 搜索结果，中文讲解更直观", category: "video", lang: "zh" },
  { id: "v5", title: "时间序列预测 B站", url: "https://search.bilibili.com/all?keyword=%E6%97%B6%E9%97%B4%E5%BA%8F%E5%88%97%E9%A2%84%E6%B5%8B+%E4%BE%9B%E5%BA%94%E9%93%BE", description: "B站 时间序列 + 供应链 搜索结果", category: "video", lang: "zh" },
  { id: "v6", title: "3Blue1Brown Neural Networks", url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi", description: "3B1B 神经网络系列，数学直觉可视化讲解，理解深度学习预测的数学前提", category: "video", lang: "en" },
  { id: "v7", title: "DeepLearning.AI — Practical Time Series", url: "https://www.youtube.com/watch?v=Nm2arOikBuY", description: "Andrew Ng 的深度学习专项课程中的时序预测讲座", category: "video", lang: "en" },
  // Books
  { id: "b1", title: "Forecasting: Principles and Practice (3e)", url: "https://otexts.com/fpp3/", description: "Rob Hyndman — 免费在线全本，预测学圣经，供应链预测理论基石", category: "book", lang: "en" },
  { id: "b2", title: "Python for Finance (2e)", url: "https://www.oreilly.com/library/view/python-for-finance/9781492024326/", description: "Yves Hilpisch — Python 金融量化标准教材，数据处理/回测/衍生品全流程", category: "book", lang: "en" },
  { id: "b3", title: "Advances in Financial Machine Learning", url: "https://www.wiley.com/en-us/Advances+in+Financial+Machine+Learning-p-9781119482086", description: "Marcos López de Prado — 量化 ML 圣经，样本加权/元标记/回测过拟合检验必读", category: "book", lang: "en" },
  { id: "b4", title: "利用 Python 进行数据分析 (3e)", url: "https://www.oreilly.com/library/view/python-for-data/9781098104023/", description: "Wes McKinney — pandas 之父写的官方教材，数据处理必读", category: "book", lang: "en" },
  { id: "b5", title: "供应链管理（第 6 版）", url: "https://book.douban.com/subject/27013461/", description: "Sunil Chopra — 供应链管理标准教材，理解业务逻辑才能做好预测", category: "book", lang: "zh" },
  { id: "b6", title: "统计学习方法（第 2 版）", url: "https://book.douban.com/subject/33437381/", description: "李航 — 中文 ML 经典，数学推导严谨，理论基础必读", category: "book", lang: "zh" },
  // Tools
  { id: "t1", title: "Google Colab", url: "https://colab.research.google.com/", description: "免费云端 Jupyter Notebook，带 GPU，无需本地装环境即可跑代码", category: "tool", lang: "both" },
  { id: "t2", title: "DeepSeek Platform", url: "https://platform.deepseek.com/", description: "DeepSeek API 管理平台，创建和管理 API Key", category: "tool", lang: "both" },
  { id: "t3", title: "VS Code", url: "https://code.visualstudio.com/", description: "推荐 IDE，Python/Jupyter 插件生态最完善", category: "tool", lang: "en" },
  { id: "t4", title: "Jupyter Notebook", url: "https://jupyter.org/", description: "交互式 Python 笔记本，数据分析探索的最佳工具", category: "tool", lang: "en" },
  { id: "t5", title: "GitHub Codespaces", url: "https://github.com/features/codespaces", description: "云端开发环境，浏览器里写代码，无需本地配置", category: "tool", lang: "en" },
  { id: "t6", title: "Optuna", url: "https://optuna.org/", description: "超参数优化框架，自动调参比手工 GridSearch 高效 10 倍", category: "tool", lang: "en" },
  { id: "t7", title: "MLflow", url: "https://mlflow.org/", description: "ML 实验追踪平台，记录每次训练的参数/指标/模型，团队协作必备", category: "tool", lang: "en" },
  // Community
  { id: "c1", title: "Kaggle Discussions", url: "https://www.kaggle.com/discussion", description: "全球最大的数据科学社区，时序预测竞赛讨论区宝藏无数", category: "community", lang: "en" },
  { id: "c2", title: "r/MachineLearning", url: "https://www.reddit.com/r/MachineLearning/", description: "Reddit ML 社区，前沿论文讨论和工业落地经验", category: "community", lang: "en" },
  { id: "c3", title: "Cross Validated (Stats StackExchange)", url: "https://stats.stackexchange.com/", description: "统计学问答社区，时间序列/预测方法论问题有高手解答", category: "community", lang: "en" },
  { id: "c4", title: "Hacker News", url: "https://news.ycombinator.com/", description: "技术新闻社区，时常有量化/预测/供应链相关讨论", category: "community", lang: "en" },
  { id: "c5", title: "和鲸社区 Heywhale", url: "https://www.heywhale.com/", description: "中文数据科学社区，有供应链预测相关竞赛和数据集", category: "community", lang: "zh" },
  { id: "c6", title: "Datawhale", url: "https://github.com/datawhalechina", description: "中文 AI 开源学习组织，量化/Python/ML 教程丰富", category: "community", lang: "zh" },
  // Papers
  { id: "p1", title: "DeepAR: Probabilistic Forecasting (Amazon)", url: "https://arxiv.org/abs/1704.04110", description: "Amazon 的概率预测模型，原生支持冷启动和层级预测，供应链 SOTA 方法", category: "paper", lang: "en" },
  { id: "p2", title: "N-BEATS: Neural basis expansion analysis (Element AI)", url: "https://arxiv.org/abs/1905.10437", description: "纯 DL 时序预测，不靠特征工程，M4 竞赛冠军，供应链预测可迁移", category: "paper", lang: "en" },
  { id: "p3", title: "Temporal Fusion Transformer (Google)", url: "https://arxiv.org/abs/1912.09363", description: "Google 的可解释 Transformer，支持静态+动态特征，供应链多变量预测顶配", category: "paper", lang: "en" },
  { id: "p4", title: "Autoformer: Decomposition Transformers", url: "https://arxiv.org/abs/2106.13008", description: "自相关机制的 Transformer，将时序分解为趋势-季节，更适合业务可解释的需求预测", category: "paper", lang: "en" },
  { id: "p5", title: "Forecasting at Scale (Prophet 论文)", url: "https://peerj.com/preprints/3190/", description: "Prophet 原始论文，理解模型原理才能用好它，Business Forecasting 必读", category: "paper", lang: "en" },
];

// ── Cheatsheets ───────────────────────────────────────────

export const cheatsheets: Cheatsheet[] = [
  {
    id: "cs1",
    title: "pandas 核心操作速查",
    icon: "🐼",
    entries: [
      { label: "读取 CSV", code: "df = pd.read_csv('sales.csv', parse_dates=['date'])", note: "parse_dates 把日期列转成 datetime" },
      { label: "设为时间索引", code: "df = df.set_index('date').sort_index()", note: "时序分析必须先设时间索引并排序" },
      { label: "重采样-月", code: "monthly = df.resample('M').sum()", note: "M=月末, MS=月初, W=周, Q=季度" },
      { label: "滞后特征", code: "df['lag_7'] = df['sales'].shift(7)", note: "shift(7) 取 7 天前的值, shift(-1) 取明天的" },
      { label: "滚动窗口", code: "df['ma_7'] = df['sales'].rolling(7).mean()", note: "rolling(n) 开窗, 然后 .mean()/.std()/.sum()" },
      { label: "缺失值填充", code: "df['sales'] = df['sales'].fillna(method='ffill')", note: "ffill=前向填充, bfill=后向, 或 .fillna(0)" },
      { label: "GroupBy 聚合", code: "df.groupby('product')['sales'].agg(['mean','sum','std'])", note: "按产品汇总: 均值/总和/标准差" },
      { label: "日期特征", code: "df['month'] = df.index.month\ndf['dow'] = df.index.dayofweek", note: "dow=0(周一)~6(周日), 提取周期性特征" },
      { label: "合并数据", code: "merged = pd.merge(sales, promo, on='date', how='left')", note: "how='left' 保留左表所有行, 相当于 SQL LEFT JOIN" },
      { label: "条件筛选", code: "promo_sales = df[df['is_promo'] == 1]", note: "布尔索引, 多个条件用 & (and) 或 | (or)" },
    ],
  },
  {
    id: "cs2",
    title: "时序建模核心代码",
    icon: "📈",
    entries: [
      { label: "ADF 平稳性检验", code: "from statsmodels.tsa.stattools import adfuller\nresult = adfuller(df['sales'].dropna())\nprint('p-value:', result[1])", note: "p<0.05 → 平稳; p>0.05 → 需差分" },
      { label: "差分", code: "df['diff1'] = df['sales'].diff().dropna()", note: ".diff(1) 一阶差分, .diff(12) 季节差分" },
      { label: "ACF/PACF 图", code: "from statsmodels.graphics.tsaplots import plot_acf, plot_pacf\nplot_acf(df['sales'].dropna(), lags=40)\nplot_pacf(df['sales'].dropna(), lags=40)", note: "ACF 定 q, PACF 定 p, 看截尾/拖尾" },
      { label: "ARIMA 建模", code: "from statsmodels.tsa.arima.model import ARIMA\nmodel = ARIMA(train, order=(1,1,1))\nfitted = model.fit()\nforecast = fitted.forecast(steps=30)", note: "order=(p,d,q): p=AR阶数, d=差分阶数, q=MA阶数" },
      { label: "SARIMA (带季节)", code: "model = ARIMA(train, order=(1,1,1), seasonal_order=(1,1,1,7))\nfitted = model.fit()", note: "第4个参数7=周期, 日数据从7开始凑, 月数据从12开始凑" },
      { label: "自动调参", code: "import pmdarima as pm\nmodel = pm.auto_arima(train, seasonal=True, m=7, trace=True)", note: "pmdarima 自动搜索最佳 (p,d,q)(P,D,Q,m)" },
      { label: "Prophet", code: "from prophet import Prophet\nm = Prophet(yearly_seasonality=True, weekly_seasonality=True)\nm.fit(df.rename(columns={'date':'ds','sales':'y'}))\nfuture = m.make_future_dataframe(periods=30)\nforecast = m.predict(future)", note: "Prophet 自动处理节假日/趋势变点, 可加额外回归量" },
      { label: "残差诊断", code: "residuals = fitted.resid\nresiduals.plot()\nplot_acf(residuals, lags=40)", note: "残差应像白噪声: 均值为0, ACF 无显著滞后" },
    ],
  },
  {
    id: "cs3",
    title: "XGBoost + 回测核心代码",
    icon: "🎯",
    entries: [
      { label: "时序→监督学习", code: "def series_to_supervised(data, n_in=1, n_out=1):\n  # 把 [t-7,t-6,...,t] 作为特征, [t+1] 作为标签\n  ...", note: "需要自己写转换函数, 或用 skforecast 库自动处理" },
      { label: "TimeSeriesSplit", code: "from sklearn.model_selection import TimeSeriesSplit\ntscv = TimeSeriesSplit(n_splits=5)\nfor train_idx, val_idx in tscv.split(X):\n  ...", note: "时序交叉验证: 不用 shuffle, 保证时间顺序" },
      { label: "XGBoost 训练", code: "import xgboost as xgb\nmodel = xgb.XGBRegressor(n_estimators=500, max_depth=5, learning_rate=0.05, early_stopping_rounds=20)\nmodel.fit(X_train, y_train, eval_set=[(X_val, y_val)], verbose=False)", note: "early_stopping 防过拟合的利器" },
      { label: "LightGBM (更快)", code: "import lightgbm as lgb\nmodel = lgb.LGBMRegressor(n_estimators=500, num_leaves=31, learning_rate=0.05)\nmodel.fit(X_train, y_train, eval_set=[(X_val, y_val)])", note: "LightGBM 比 XGBoost 快 3-5 倍, SKU 多时首选" },
      { label: "特征重要性", code: "importance = model.feature_importances_\nfeat_imp = pd.DataFrame({'feature': X.columns, 'importance': importance})\nfeat_imp.sort_values('importance', ascending=False).head(10)", note: "看哪些特征对预测贡献最大, 去掉不重要特征" },
      { label: "滚动回测", code: "from sklearn.metrics import mean_absolute_percentage_error as mape\nfor i in range(len(test)):\n  model.fit(X_train, y_train)\n  pred = model.predict(X_test[i:i+1])\n  predictions.append(pred)\n  # 把真实值加入训练集继续滚动\n  X_train = np.vstack([X_train, X_test[i]])\n  y_train = np.append(y_train, y_test[i])", note: "一定要滚动! 不能一次测试, 否则是信息泄露" },
      { label: "MAPE/WAPE", code: "mape = np.mean(np.abs((y_true - y_pred) / y_true)) * 100\nwape = np.sum(np.abs(y_true - y_pred)) / np.sum(y_true) * 100", note: "MAPE 各点等权重; WAPE 按销量加权, 更接近业务KPI" },
      { label: "残差分析", code: "errors = y_true - y_pred\nplt.hist(errors, bins=50)\n# 看偏差分布: 正态=模型无偏, 偏斜=有系统误差", note: "残差图比单一指标更有信息量" },
      { label: "Optuna 调参", code: "import optuna\ndef objective(trial):\n  params = {\n    'n_estimators': trial.suggest_int('n', 100, 1000),\n    'max_depth': trial.suggest_int('d', 3, 10),\n    'learning_rate': trial.suggest_float('lr', 0.01, 0.3),\n  }\n  model = xgb.XGBRegressor(**params)\n  model.fit(X_train, y_train)\n  return mape(y_val, model.predict(X_val))", note: "Optuna 自动搜索最优超参数, 比 GridSearch 高效 10 倍" },
    ],
  },
];

// ── Quizzes (for 5-day crash course) ──────────────────────

export const quizzes: QuizQuestion[] = [
  {
    id: "q1", dayId: "crash-1",
    question: "量化分析定义中的三个关键词是什么？",
    options: ["AI、大数据、深度学习", "可验证、可复现、可追溯", "速度快、精度高、自动化", "模型、算法、算力"],
    answer: 1,
    explanation: "量化的本质是思维方式，不是工具。三个关键词——可验证（事后能检验）、可复现（同样输入同样输出）、可追溯（每个数字能追到源头）。",
  },
  {
    id: "q2", dayId: "crash-1",
    question: "量化分析四大环节中，哪个最贵？",
    options: ["建模（选模型最难）", "数据（脏数据让后面全白做）", "评估（回测复杂）", "决策（拍板压力最大）"],
    answer: 1,
    explanation: "数据脏了，后面所有工作都白做——地基塌了。建模错了可以换模型重训，损失可控。这就是为什么顶尖团队把 70% 精力放在数据上。",
  },
  {
    id: "q3", dayId: "crash-1",
    question: "人定方向、机器跑流程——以下哪个环节必须人来主导？",
    options: ["数据清洗", "模型训练", "提出假设（如促销拉动销量）", "算回测指标"],
    answer: 2,
    explanation: "机器能跑流程，但这个假设有没有业务意义必须人来判断。AI 可以辅助发散，但核心创意和业务逻辑仍源于人。",
  },
  {
    id: "q4", dayId: "crash-2",
    question: "因子的三个必要条件是？",
    options: ["有预测力、能数值化、能持续观察", "数值大、稳定、相关", "频率高、成本低、易获取", "公开、免费、标准"],
    answer: 0,
    explanation: "缺一不可：有预测力（和目标相关）、能数值化（喂给模型）、能持续观察（未来也能获取）。SKU 编号是数字但没预测力，不构成因子。",
  },
  {
    id: "q5", dayId: "crash-2",
    question: "IC（信息系数）= 0.04，在金融场景中应该怎么处理？",
    options: ["剔除（噪声）", "保留（属于有效因子）", "必留（强因子）", "无法判断"],
    answer: 1,
    explanation: "金融场景噪声极大，|IC| > 0.03 即算有效。0.04 属于有效但偏弱，保留并观察其稳定性（ICIR）。",
  },
  {
    id: "q6", dayId: "crash-2",
    question: "为什么促销折扣×节假日组合因子比促销折扣单因子强？",
    options: ["组合因子代码更复杂显得高级", "捕捉了交互效应（双11+7折 vs 普通+7折效果差10倍）", "单因子不稳定", "模型只认组合因子"],
    answer: 1,
    explanation: "单因子只看一个维度。普通日 7 折可能拉动 20%，双 11 当天 7 折可能拉动 200%——这就是交互效应。树模型/神经网络自动学这种交互。",
  },
  {
    id: "q7", dayId: "crash-3",
    question: "数据量 500 行，预测下周销量，应该选？",
    options: ["LSTM（深度学习最强）", "XGBoost（树模型之王）", "ARIMA 或 Prophet（小样本友好）", "Transformer（最新架构）"],
    answer: 2,
    explanation: "深度学习数据饥渴，500 行严重不足，LSTM/Transformer 几乎一定过拟合。ARIMA/Prophet 对小样本友好，是正确选择。新手最大误区就是为了高级硬上深度学习。",
  },
  {
    id: "q8", dayId: "crash-3",
    question: "过拟合的三大成因不包括以下哪个？",
    options: ["模型太复杂（参数远多于样本）", "特征太多（100 特征 1000 样本）", "评估方法错（用全量数据评估）", "数据量太大"],
    answer: 3,
    explanation: "数据量大反而是防过拟合的有利条件。三大成因是：模型太复杂、特征太多、评估方法错。识别信号：训练 MAPE=2%，测试 MAPE=30%。",
  },
  {
    id: "q9", dayId: "crash-3",
    question: "为什么时序数据不能用 train_test_split(shuffle=true)？",
    options: ["速度慢", "测试集会混入未来信息，造成信息泄漏", "代码报错", "结果不稳定"],
    answer: 1,
    explanation: "随机切分会让测试集包含时间上晚于训练集的数据——模型偷看了未来，评估结果虚假好看，上线必崩。必须用 TimeSeriesSplit，时间严格后移。",
  },
  {
    id: "q10", dayId: "crash-5",
    question: "金融、电力、供应链三类预测问题，共同骨架是？",
    options: ["都用 LSTM", "都是时序问题", "数据→因子→模型→评估→决策（四步法）", "都需要 GPU"],
    answer: 2,
    explanation: "无论目标是什么（股价/电价/销量），骨架都是：数据→因子→模型→评估→决策。学一套方法论可迁移到任何场景，差异只在数据形态和决策约束。",
  },
];