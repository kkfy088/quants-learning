import type { Book } from "@/lib/types";

/**
 * 《深入浅出Python量化交易实战》— 邓佐韬 / 胡伊春
 * 322 页，15 章，从 Python 入门到深度学习做量化交易
 * 对供应链价值：完整的 pandas 数据处理 → 因子分析 → ML 模型 → 回测 → 深度学习流程，
 * 每一步都有可运行的代码模板，几乎是供应链需求预测的"现成代码 cookbook"
 */
export const pythonQuantTrading: Book = {
  id: "bk-pyqt",
  slug: "python-quant-trading",
  title: "深入浅出Python量化交易实战",
  subtitle: "从数据处理到深度学习的量化全流程",
  author: "邓佐韬 / 胡伊春",
  totalPages: 322,
  cover: "🐍",
  abstract:
    "通过一个\"小瓦姑娘\"的故事线，把量化交易的完整流程从零讲到深度学习：环境搭建、数据获取、简单回测、经典策略、机器学习（线性/树模型/SVM/朴素贝叶斯）、NLP 情感分析、CNN/LSTM 神经网络。最大特点是\"对话+图+代码\"三件套，每章末都有可运行的 Python 代码，零基础也能跟着跑通。",
  whyForScm:
    "这本书的所有量化代码，几乎可以原封不动迁移到供应链：把\"股票价格\"换成\"SKU 销量\"、把\"交易策略\"换成\"补货策略\"、把\"回测\"换成\"滚动预测评估\"、把\"因子\"换成\"促销/价格/天气特征\"。它就是供应链分析师最便宜的\"Python 量化速成课\"。",
  chapters: [
    {
      id: "bk-pyqt-c1",
      bookId: "bk-pyqt",
      number: 1,
      title: "第1章 · 小瓦的故事——从零开始",
      pageStart: 21,
      pageEnd: 39,
      duration: 50,
      summary: "用小瓦的视角引入量化交易概念，搭建 Python+Jupyter 环境，获取第一份股票数据。",
      keyPoints: [
        "量化交易定义：用数学模型和程序替代人工判断的交易方式",
        "Python 量化三件套：pandas（数据）、numpy（计算）、matplotlib（可视化）",
        "数据获取：pandas_datareader / Tushare / 聚宽平台",
        "第一个 DataFrame 操作：head/tail/describe/info",
        "小瓦策略雏形：跌了买、涨了卖（看似合理，实则是亏损策略的典型）",
      ],
      excerpt:
        "千里之行，始于足下。小瓦因为所学专业担心自己毕业以后不好找工作，于是自学了 Python 的入门课程，并掌握了一些 Python 的基础语法和常用工具，如数据分析工具 pandas 和可视化工具 matplotlib。",
      scmInsight:
        "迁移到供应链：把 pandas_datareader 换成 ERP/数据库连接，把股票价格序列换成 SKU 日销量序列，第一节课的代码就能直接复用——这是供应链分析师上手 Python 最快的路径。",
      practice:
        "用 pandas 读一份 CSV 格式的 SKU 销量数据，完成：head()、describe()、按月 resample 聚合、画时间序列图。这是后面所有建模的基础。",
    },
    {
      id: "bk-pyqt-c2",
      bookId: "bk-pyqt",
      number: 2,
      title: "第2章 · 小瓦的策略靠谱吗——回测与经典策略",
      pageStart: 40,
      pageEnd: 62,
      duration: 60,
      summary: "回测的核心思想：用历史数据评估策略是否真的能赚钱，并实现双均线策略。",
      keyPoints: [
        "回测定义：在历史数据上模拟策略执行，计算收益率、胜率、最大回撤",
        "关键陷阱：前视偏差（look-ahead bias）、过拟合、忽略交易成本",
        "小瓦策略诊断：\"低买高卖\"为什么亏——因为它在趋势市场中反复亏损",
        "经典策略：双均线（MA 短期上穿 MA 长期买入、下穿卖出）",
        "用 pandas 实现：rolling 计算均线、shift 生成信号、累计收益曲线",
      ],
      excerpt:
        "什么是回测。使用 Python 实现简单回测。双移动平均策略的 Python 实现。回测的结果分析与可视化。",
      scmInsight:
        "供应链的\"回测\"= 滚动预测评估（rolling forecast）。把双均线策略换成\"ARIMA 预测+滚动评估\"，逻辑完全一致：在历史窗口训练→预测下一段→记录误差→滚动。这是评估任何供应链预测模型的标准方法。",
      practice:
        "对一份销量数据实现滚动预测：用过去 90 天训练 ARIMA，预测下 7 天，计算 MAPE，然后窗口前移 7 天，重复。最后画出滚动 MAPE 曲线。",
    },
    {
      id: "bk-pyqt-c3",
      bookId: "bk-pyqt",
      number: 3,
      title: "第3章 · AI来了——机器学习在交易中的简单应用",
      pageStart: 63,
      pageEnd: 87,
      duration: 65,
      summary: "用 KNN 和线性回归做股价方向预测，引入特征工程和过拟合。",
      keyPoints: [
        "监督学习三件套：特征 X、标签 y、模型 f",
        "KNN（K近邻）：最直观的分类算法——\"看周围最近的 K 个邻居\"",
        "线性回归：最基础但最稳健的预测模型",
        "训练集/测试集切分：train_test_split 的意义",
        "过拟合定义：训练集表现好，测试集崩盘——ML 的头号陷阱",
        "评估指标：准确率（分类）、MSE/R²（回归）",
      ],
      scmInsight:
        "这一章是供应链分析师的 ML 入门必修。把\"预测股价涨跌\"换成\"预测 SKU 是否会爆单\"，把\"过去 5 日收益率\"换成\"过去 5 日销量变化\"，KNN 模型立即可用。",
      practice:
        "对销量数据构造二分类标签（下周销量是否高于本月均值），用过去 7 天的统计量作为特征，跑一个 KNN 分类器，看准确率是否高于 50% 基线。",
    },
    {
      id: "bk-pyqt-c5",
      bookId: "bk-pyqt",
      number: 5,
      title: "第5章 · 因子来了——基本原理和用法",
      pageStart: 107,
      pageEnd: 125,
      duration: 60,
      summary: "量化因子的核心思想：把多个数据维度组合成一个预测信号，并做因子选股。",
      keyPoints: [
        "因子定义：用多个原始数据组合而成的预测信号，如\"价格×资金流入\"",
        "\"瓦氏因子\"案例：股价涨幅方向 × 主力资金净流入 → 预测次日涨跌",
        "因子值计算：标准化、归一化、行业中性化",
        "因子选股流程：对所有股票计算因子值→排序→选 Top N",
        "因子与标签的关系：因子值高是否真的对应未来收益高",
      ],
      excerpt:
        "因子投资是时下投资界的热门话题……小瓦计算了一个非常简单，甚至有点儿\"幼稚\"的因子，但这也能够说明因子分析的基本原理了。",
      scmInsight:
        "供应链的\"因子\"= 销量预测特征。把\"价格+资金流\"换成\"促销强度+价格折扣+天气+节假日+竞品动态\"，就是一个完整的销量预测因子集。这一章讲的就是如何\"构造\"一个有意义的因子。",
      practice:
        "为某个 SKU 设计一个复合因子：促销折扣 × 节假日哑变量，计算其与下周销量的相关系数。如果相关系数 > 0.3，这个因子就有用。",
    },
    {
      id: "bk-pyqt-c6",
      bookId: "bk-pyqt",
      number: 6,
      title: "第6章 · 因子好用吗——IC/换手率/自相关分析",
      pageStart: 126,
      pageEnd: 148,
      duration: 70,
      summary: "系统评估一个因子好不好——IC 值、换手率、预测能力，是因子工程的核心方法论。",
      keyPoints: [
        "IC（Information Coefficient）：因子值与未来收益的 Rank 相关系数，绝对值 > 0.03 即有效",
        "ICIR：IC 的均值/标准差，衡量因子的稳定性",
        "换手率：因子值变化的频率，高换手=高交易成本",
        "自相关：因子值在时间上是否稳定",
        "因子分类：价值、动量、情绪、波动、质量",
        "因子收益分析：按因子分组（5 档）看累计收益曲线",
      ],
      excerpt:
        "因子收益分析。因子 IC 分析。因子换手率分析。因子自相关性分析。因子预测能力分析。",
      scmInsight:
        "这是供应链因子工程的圣经方法论。把\"因子 IC\"换成\"特征与下周销量偏度的 Spearman 相关\"，IC > 0.03 的留下，IC < 0.02 的丢弃——特征选择有了一套客观标准。",
      practice:
        "对你构造的所有销量特征，计算 IC（用 Spearman 相关）和 ICIR（30 天滚动），按 IC > 0.03 且 ICIR > 0.5 的标准筛选，看哪些特征入选。",
    },
    {
      id: "bk-pyqt-c7",
      bookId: "bk-pyqt",
      number: 7,
      title: "第7章 · 当因子遇上线性模型",
      pageStart: 149,
      pageEnd: 171,
      duration: 60,
      summary: "用线性回归和 Lasso/Ridge 做多因子组合，理解正则化的意义。",
      keyPoints: [
        "多因子线性模型：y = β₀ + β₁x₁ + ... + βₙxₙ + ε",
        "OLS 假设：线性、独立、同方差、无多重共线性",
        "Lasso（L1）：自动特征选择，把不重要的系数压到 0",
        "Ridge（L2）：处理多重共线性，系数收缩但非零",
        "ElasticNet：L1+L2 折中",
        "模型评估：R²、Adjusted R²、AIC/BIC",
      ],
      scmInsight:
        "多因子线性模型是供应链预测最稳健的 baseline。Lasso 自动剔除冗余特征，特别适合特征多但样本少的场景（如新品预测）。",
      practice:
        "用 sklearn 的 LassoCV 对所有特征做训练，观察 alpha 增大时哪些特征系数最先变 0——这些就是最不重要的特征。",
    },
    {
      id: "bk-pyqt-c8",
      bookId: "bk-pyqt",
      number: 8,
      title: "第8章 · 因子遇到决策树与随机森林",
      pageStart: 172,
      pageEnd: 194,
      duration: 65,
      summary: "决策树+随机森林+GBDT，是表格数据预测的工业标准。",
      keyPoints: [
        "决策树：基于特征阈值的递归二分，可解释性极强",
        "过拟合风险：单棵决策树几乎一定过拟合",
        "Bagging 思想：训练多棵树投票/平均，降低方差",
        "随机森林：Bagging + 特征随机选择",
        "特征重要性：随机森林天然输出，是特征工程的金标准",
        "GBDT（梯度提升树）：比随机森林更强，但更易过拟合",
      ],
      scmInsight:
        "供应链需求预测的工业标准就是 GBDT（XGBoost/LightGBM/CatBoost）。这一章学完，就有能力跑出比 ARIMA 强 30%-50% 的销量预测模型。",
      practice:
        "用 sklearn.ensemble.RandomForestRegressor 训练一个销量预测模型，打印 feature_importances_，对比你直觉认为重要的特征和模型实际认为重要的特征。",
    },
    {
      id: "bk-pyqt-c9",
      bookId: "bk-pyqt",
      number: 9,
      title: "第9章 · 因子遇到支持向量机",
      pageStart: 195,
      pageEnd: 218,
      duration: 60,
      summary: "SVM 的几何直觉+核技巧，理解高维空间映射对小样本的价值。",
      keyPoints: [
        "SVM 思想：找一个最大间隔的超平面分类",
        "核技巧（Kernel Trick）：把数据映射到高维，原本线性不可分变可分",
        "常用核：线性、多项式、RBF（高斯）",
        "SVM vs 随机森林：SVM 强在小样本高维，随机森林强在大样本表格",
        "参数调优：C（惩罚）、gamma（核宽度）",
      ],
      scmInsight:
        "供应链异常检测（如识别刷单、识别假促销）是小样本高维分类问题，SVM 比 GBDT 更合适。",
      practice:
        "构造一个\"是否爆单\"的二分类标签，用 SVM 和随机森林对比准确率，观察 SVM 在小样本下的优势。",
    },
    {
      id: "bk-pyqt-c10",
      bookId: "bk-pyqt",
      number: 10,
      title: "第10-12章 · 自然语言处理与情感分析",
      pageStart: 219,
      pageEnd: 267,
      duration: 100,
      summary: "把新闻/股评文本转成向量，做情感分类——为预测模型增加非结构化数据维度。",
      keyPoints: [
        "文本预处理：分词、去停用词、词干化",
        "词袋模型 + TF-IDF：把文本变成数值向量",
        "主题模型 LDA：发现文本背后的隐含主题",
        "情感分析：用朴素贝叶斯/逻辑回归做正面/负面分类",
        "Word2Vec / GloVe：词向量的分布式表示",
      ],
      scmInsight:
        "供应链可以迁移到：电商评论情感分析（识别差评趋势 SKU）、客服工单主题挖掘（识别供应链问题聚集）、新闻舆情监控（原料价格预警）。",
      practice:
        "爬取一个 SKU 的电商评论，用 TF-IDF + 朴素贝叶斯做情感分类，输出\"差评比例\"作为该 SKU 的销量风险信号。",
    },
    {
      id: "bk-pyqt-c13",
      bookId: "bk-pyqt",
      number: 13,
      title: "第13章 · 深度学习来了（MLP）",
      pageStart: 268,
      pageEnd: 287,
      duration: 60,
      summary: "用 Keras 搭建第一个多层感知机，理解深度学习的基本组件。",
      keyPoints: [
        "深度学习 vs 传统 ML：自动特征学习，但需大量数据和算力",
        "Keras 三件套：Sequential、Dense、compile",
        "训练流程：fit(X, y, epochs, batch_size, validation_split)",
        "过拟合处理：Dropout、EarlyStopping、BatchNormalization",
        "工具选择：TensorFlow vs PyTorch——前者易上手，后者研究主流",
      ],
      scmInsight:
        "对供应链预测，深度学习的价值在多 SKU 联合建模（一个网络预测所有 SKU），但前提是数据量足够。小样本场景仍应优先用 GBDT。",
      practice:
        "用 Keras 搭建一个 3 层 MLP 预测销量，对比随机森林，看在数据量 < 1000 vs > 10000 时谁更准。",
    },
    {
      id: "bk-pyqt-c14",
      bookId: "bk-pyqt",
      number: 14,
      title: "第14章 · CNN和LSTM",
      pageStart: 288,
      pageEnd: 307,
      duration: 70,
      summary: "时序建模的两大利器：CNN 抓局部模式、LSTM 抓长期依赖。",
      keyPoints: [
        "CNN（卷积神经网络）：1D 卷积适合时序，能抓局部周期模式",
        "嵌入层（Embedding）：把离散特征（如 SKU ID）转成稠密向量",
        "LSTM（长短期记忆）：门控机制解决 RNN 梯度消失，适合长序列",
        "CNN+LSTM 组合：CNN 提取局部特征，LSTM 建模时序依赖",
        "Attention 机制：让模型聚焦关键时间步（Transformer 的基础）",
      ],
      scmInsight:
        "LSTM 是供应链时序预测的深度学习首选——能自然处理\"上周促销对这周销量的滞后影响\"。但训练成本高，建议先跑通 GBDT 再考虑 LSTM。",
      practice:
        "用 Keras 搭建一个 LSTM（input_shape=(timesteps, features)），输入过去 14 天销量+促销特征，预测未来 7 天。和 ARIMA 对比 MAPE。",
    },
    {
      id: "bk-pyqt-c15",
      bookId: "bk-pyqt",
      number: 15,
      title: "第15章 · 写在最后——小瓦的征程",
      pageStart: 308,
      pageEnd: 322,
      duration: 30,
      summary: "全书总结与进阶路线图——从\"会用工具\"到\"做策略\"。",
      keyPoints: [
        "学习路径回顾：数据→策略→因子→ML→DL→组合管理",
        "进阶方向：强化学习做动态调仓、Transformer 做长序列、GAN 做数据增强",
        "工程化：实盘交易系统、低延迟、风控",
        "投资哲学：模型只是工具，认知和纪律才是核心",
      ],
      scmInsight:
        "对应供应链的进阶路径：单 SKU 预测→多 SKU 协同→库存优化→全局供应链仿真。每一步都建立在前一步的扎实基础上，跳级反而走不远。",
      practice:
        "为你的供应链预测项目画一张路线图：3 个月做什么、6 个月做什么、1 年做什么。重点是\"下一步能落地什么\"，而不是\"最终能多炫\"。",
    },
  ],
};
