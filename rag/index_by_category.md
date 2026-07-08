# 知识点索引（按分类）

总计 **164** 个知识点


## 工程化

- [90.3 下一步选项](power90-d90) `{cat}` `kp-5f0cd2aa`
  - 方向 适合人群 实盘部署（小型虚拟电厂） 有产业资源 读顶会论文（IEEE TSG、Applied Energy） 想读博 参加 Kaggle 能源类比赛 想刷简历 切入绿电交易/碳市场 看政策风口

## 测量与决策科学

- [第二篇 · 开始衡量之前（校准估计+风险+EVPI）](book-measure-ch5) `{cat}` `kp-e3c7136a`
  - 三件衡量前必做的事：校准你的不确定性估计、把不确定性画成概率分布、计算信息的预期价值（EVPI）。
- [第3章 · 无形事物的假象](book-measure-ch3) `{cat}` `kp-60363643`
  - 拆解\
- [第9章 · 抽样：观察少数，探知全体](book-measure-ch9) `{cat}` `kp-a3d54bf4`
  - 统计抽样的直觉与公式——为什么 5 个样本就能得出有力结论，以及\
- [3.1 两类模型的本质差异](crash-d3) `{cat}` `kp-6e81653e`
  - 维度 时序模型（ARIMA/Prophet） ML 模型（XGBoost/LSTM） 核心假设 未来是过去的延续 特征与目标有稳定映射 输入 历史值序列 特征矩阵 X 输出 未来值（带置信区间） 点预

## 核心方法论

- [⚠️ 新手最大的坑：因子越多越好？](crash-d2) `{cat}` `kp-434ce0e0`
  - 不是。 因子过多会带来： 过拟合（噪声被当成信号） 多重共线性（因子之间高度相关，模型不稳定） 计算成本高 实战中， 15-30 个精选因子 比 100 个粗糙因子效果好得多。
- [2.3 因子好坏怎么评——IC 与相关性](crash-d2) `{cat}` `kp-8029be9b`
  - IC（Information Coefficient，信息系数）： 因子值与未来目标的 Rank 相关系数。 |IC| 评价 行动 &gt; 0.05 强因子 必留 0.03 - 0.05 有效 保留
- [2.1 因子是什么——精确化定义](crash-d2) `{cat}` `kp-2cf9d7b2`
  - 因子 = 对目标变量有预测力、且能被数值化、且能被持续观察的变量。 注意三个限定词，缺一不可： 限定词 含义 反例（不构成因子） 有预测力 和目标有因果关系或强相关 "SKU 编号"——是数字但没预测
- [第一篇 · 衡量：总是有方法可以衡量的](book-measure-ch1) `{cat}` `kp-783ad05a`
  - 破除\
- [第3章 · AI来了——机器学习在交易中的简单应用](book-pyqt-ch3) `{cat}` `kp-79436e93`
  - 用 KNN 和线性回归做股价方向预测，引入特征工程和过拟合。
- [第6章 · 因子好用吗——IC/换手率/自相关分析](book-pyqt-ch6) `{cat}` `kp-c01fd1db`
  - 系统评估一个因子好不好——IC 值、换手率、预测能力，是因子工程的核心方法论。
- [1.1 一句话定义量化分析](crash-d1) `{cat}` `kp-1b3b279e`
  - 量化分析 = 用数据和模型，把'不确定的判断'变成'可验证、可复现、可追溯'的决策依据。 三个关键词： 可验证： 预测对不对，事后用真实数据检验 可复现： 同一份数据 + 同一套代码，结果完全一致 可
- [1.3 量化分析的四大环节（核心地图）](crash-d1) `{cat}` `kp-dff170a9`
  - 无论是金融、供应链还是电力市场，量化分析的骨架永远是这四步： 环节 做什么 典型错误 出错代价 ① 数据 收集、清洗、对齐 脏数据、口径不一致 地基塌了，后面全错 ② 建模 选模型、训练、调参 过拟合
- [⚠️ 哪个环节最贵](crash-d1) `{cat}` `kp-510c4862`
  - 不是建模——很多人以为建模最难最贵。 实际上是数据和决策最贵。 数据脏了：后面所有工作都白做 决策错了：模型再准也亏钱 建模错了：可以换模型重训，损失可控 这就是为什么 顶尖团队把 70% 精力放在数
- [1.4 人与 AI 的边界——'人定方向、机器跑流程'](crash-d1) `{cat}` `kp-92a8d0ff`
  - 这是整个 5 天最重要的一句话，请务必记住。 环节 人主导 AI/自动化主导 ① 数据 判断数据可信度、识别噪声 清洗、对齐、特征构造 ② 建模 提出假设（"促销拉动销量"） 代码生成、模型训练、调参
- [1.5 为什么这个范式适用于所有'预测+决策'问题](crash-d1) `{cat}` `kp-ab6c63de`
  - 无论是： 金融： 预测股价 → 决定买卖 供应链： 预测销量 → 决定补货 电力市场： 预测电价 → 决定报价 医疗： 预测病情 → 决定治疗方案 骨架都是 数据→建模→评估→决策 ，差异只在数据形态
- [📖 延伸阅读（不强求）](crash-d1) `{cat}` `kp-470d64c6`
  - 《如何衡量万事万物》第 1 章（在教材精读模块）——讲"万事万物皆可衡量"，是量化思维的哲学基石。
- [2.2 从业务问题反向推导因子集](crash-d2) `{cat}` `kp-526cdf8c`
  - 这是量化分析师最值钱的能力。 好的因子集 = 好模型的一半。 示例：预测某 SKU 下周销量 类别 候选因子 为什么可能有用 时间 星期几 工作日 vs 周末需求不同 月份 季节性 距大促天数 大促前
- [2.5 因子思维适用于所有量化问题](crash-d2) `{cat}` `kp-61948654`
  - 场景 目标 典型因子 金融选股 预测下周涨跌 动量/估值/质量/情绪 供应链补货 预测下周销量 历史/促销/天气/节假日 电力报价 预测次日电价 负荷预测/燃料价/新能源出力 医疗诊断 预测病情进展 
- [3.3 过拟合——量化分析的头号陷阱](crash-d3) `{cat}` `kp-428efd95`
  - 过拟合 = 模型记住了训练数据里的噪声，而不是真实的规律。 三大成因： 成因 表现 对策 模型太复杂 参数远多于样本 用更简单模型 / 正则化 特征太多 100 个特征 1000 个样本 特征选择（L
- [3.4 回测的正确姿势](crash-d3) `{cat}` `kp-727d31b0`
  - 回测 = 用历史数据模拟"如果当时用这个模型，表现如何"。 这是量化分析的命脉。 错误做法 后果 正确做法 随机切分（shuffle=True） 测试集混入未来信息 时序切分（TimeSeriesSp
- [5.2 三个场景的难度排序](crash-d5) `{cat}` `kp-7c8c4d87`
  - 维度 供应链（最易入门） 电力（中等） 金融（最难） 数据可得性 ⭐⭐⭐⭐⭐（企业内部） ⭐⭐⭐⭐⭐（PJM 公开） ⭐⭐⭐（需付费） 噪声水平 ⭐⭐（较稳定） ⭐⭐⭐（有尖峰） ⭐⭐⭐⭐⭐（极嘈杂）
- [5.4 认知毕业测试](crash-d5) `{cat}` `kp-a19abdf5`
  - 5 天结束了。回答以下 5 个问题，每个 20 分，60 分及格，80 分优秀： 用一句话定义"量化分析"（提示：三个关键词） 量化分析四大环节里，哪个最贵？为什么？ 什么是因子？它的三个必要条件是什
- [5.5 选择你的下一步](crash-d5) `{cat}` `kp-4f56ec28`
  - 你的情况 推荐路径 供应链/快消从业者 100 天修炼（D1-D100） 电力/能源从业者 电力市场 90 天（D1-D90） 金融爱好者 100 天修炼 + 《PyQT》教材精读 纯好奇、未定向 先
- [🎓 Day 5 毕业](crash-d5) `{cat}` `kp-606625c6`
  - 完成认知毕业测试，自评分数 写下"我接下来要深耕的场景 + 理由" 点"✅ 完成今日"——5 天速成结束 恭喜！你现在拥有的认知地图，比许多工作 3 年的"经验型分析师"还清晰。 认知清晰是行动有效的
- [量化=数据+模型+代码+判断](deep-d1) `{cat}` `kp-76064fba`
  - 量化不是"用AI替代人"，而是把可重复的执行自动化，把人释放到需要判断力的环节。
- [供应链警示：](deep-d11) `{cat}` `kp-a5db42e1`
  - df.isnull().sum()/len(df)*100 df['销量'].fillna(df['销量'].median(),inplace=True) df['销量'].fillna(method
- [数据质量检查清单（每次分析前）](deep-d12) `{cat}` `kp-90c3779d`
  - 列名有无空格/特殊字符 日期是否datetime类型 时序是否连续 数值列有无负数 分类列有无意外值 SKU级数据是否自洽
- [from statsmodels.graphics.tsaplots import plot_acf,plot_pacf](deep-d17) `{cat}` `kp-b4586964`
  - from statsmodels.graphics.tsaplots import plot_acf,plot_pacf fig,ax=plt.subplots(1,2,figsize=(12,4))
- [残差诊断必看](deep-d18) `{cat}` `kp-98466221`
  - 标准化残差→围绕0随机 直方图→近似正态 Q-Q图→贴对角线 残差ACF→无显著自相关
- [31-100天预告](deep-d30) `{cat}` `kp-45e04cb5`
  - 阶段 天数 内容 因子深化 31-45 IC体系/因子库/RD-Agent闭环 Agent框架 46-60 LangGraph/CrewAI/AutoGen实战 高级预测 61-75 LSTM/Tra
- [4.2 偏差考核：新能源最痛的环节](power90-d4) `{cat}` `kp-1c04415f`
  - 新能源出力靠天吃饭，预测必然不准。出力 ≠ 合约量 → 偏差。 偏差方向 典型规则 后果 实际 > 合约（多发了） 多出部分按现货低价卖 低价卖，可能亏本 实际 缺额按现货高价买回 高价买回，可能亏本
- [⚠️ 这就是为什么」出力预测」对新能源企业生死攸关](power90-d4) `{cat}` `kp-0de68cf5`
  - 预测准 → 合约量接近实际 → 不被偏差考核罚 预测差 20% → 偏差考核可能吞掉全部利润 这也是 AI 在电力市场 最早商业化 的方向——风电/光伏功率预测。
- [4.3 算例：某风电场月度收益](power90-d4) `{cat}` `kp-451ed69d`
  - 假设条件： 装机 100MW，月度合约量 30,000 MWh，合约价 350 元/MWh 实际发电 26,000 MWh（少了 4,000 MWh） 现货均价 400 元/MWh 偏差罚则：少发按现
- [6.1 每周自检清单（来自方案第七节）](power90-d6) `{cat}` `kp-44f88f24`
  - 每周日花 30 分钟回答三个问题： 本周交付了什么可运行的东西？ （不是"学了什么「，是」做出来了什么」） 是否偏离主攻方向？ 如果在做 RL 而电价预测 baseline 还没跑通，立即纠偏 下周的
- [8.3 电价数据的"三大脏"](power90-d8) `{cat}` `kp-15f042e4`
  - 脏类型 识别 处理 缺失（检修/通讯故障） df.isnull().sum() 前向填充或插值 重复（同时间戳多条） df.index.duplicated().
- [📖 关键里程碑](power90-d10) `{cat}` `kp-cad587b7`
  - 阶段一结束！你已完成： ✅ 市场结构图 ✅ 电价数据集 ✅ baseline 预测模型 这是整个 90 天最重要的" 三个一 "。
- [⚠️ 关键改动：数据从 D11 启动](power90-d11) `{cat}` `kp-192b023e`
  - 原方案把数据放在 D71，会导致实战阶段完全没时间迭代。 从 D11 开始，所有练习围绕同一份数据展开——这是成功率从 30% 提到 75% 的最关键改动。
- [11.3 ERA5 气象数据（可选，建议有）](power90-d11) `{cat}` `kp-3745d6ab`
  - 地址： cds.climate.copernicus.eu （需注册 Copernicus 账号） 关键变量： 2m 温度（影响负荷） 10m 风速（影响风电出力） 表面太阳辐射（影响光伏）
- [12.1 sklearn 三步范式](power90-d12) `{cat}` `kp-6a04ed65`
  - from sklearn.ensemble import RandomForestRegressor model = RandomForestRegressor(n_estimators=100) m
- [19.1 为什么电价需要概率预测](power90-d19) `{cat}` `kp-d7541a66`
  - 电价波动极大，只给点预测（如"明天 14:00 电价 350 元「）远远不够——决策者需要知道」95% 概率落在 280-450 元之间」。
- [19.3 覆盖率检查](power90-d19) `{cat}` `kp-2fb8a78f`
  - coverage = ((y_te >= pred_low) & (y_te
- [22.1 DC-OPF 是什么](power90-d22) `{cat}` `kp-cd37e1c1`
  - 直流最优潮流 （DC Optimal Power Flow）：在简化假设下（电压幅值=1、忽略电阻、相角小），求满足电网物理约束的最低成本发电方案。
- [31.1 实验管理（轻量版）](power90-d31) `{cat}` `kp-0f10de86`
  - # experiments/log.py import json, datetime, hashlib def log_experiment(model_name, params, metrics, 
- [cyclical encoding](power90-d32) `{cat}` `kp-5a23a1f6`
  - df['hour_sin'] = np.sin(2*np.pi*df.index.hour/24) df['hour_cos'] = np.cos(2*np.pi*df.index.hour/24) 
- [交叉特征示例](power90-d33) `{cat}` `kp-01556730`
  - df['weekday_hour'] = df['is_weekend'].astype(str) + '_' + df['hour'].astype(str) df['summer_peak'] =
- [⚠️ RL 触发条件](power90-d56) `{cat}` `kp-826c78ab`
  - 方案第六节明确： RL 是"探索项"，仅当 D55 前主线顺利且有余力才做。 否则果断跳过。
- [61.1 风电 vs 光伏](power90-d61) `{cat}` `kp-98884208`
  - 维度 风电 光伏 关键驱动 风速（立方关系！） 辐照度（线性） 日周期 弱 强（白天才有） 预测难点 风速突变（锋面） 云遮挡（极难预测） 常用模型 NWP + ML NWP + ML + 图像识别（
- [71.2 用 Prefect 或 Airflow 编排（可选）](power90-d71) `{cat}` `kp-d05a7bb0`
  - 简单版用 Python 函数链即可，复杂场景可上 Prefect 。
- [90.2 复盘模板](power90-d90) `{cat}` `kp-4531e8c7`
  - 做对了什么？ （3-5 条） 如果重来会怎么做？ （3 条） 最大收获？ 最大教训？
- [🎉 Day 90 终极任务](power90-d90) `{cat}` `kp-97d201dd`
  - 把终极交付物推到 GitHub Public 写一篇 500 字复盘（可发知乎/公众号） 庆祝 🍾
- [71.1 Pipeline 架构](power90-d71) `{cat}` `kp-28905aad`
  - # pipeline/run.py def run_pipeline(start_date, end_date): # ① 数据加载 df = load_data(start_date, end_da
- [88.1 仓库结构](power90-d88) `{cat}` `kp-24c0aadf`
  - power-market-ai/ ├── README.md ├── data/ │ ├── raw/ │ └── processed/ ├── src/ │ ├── data_loader.py │

## 机器学习模型

- [28.1 Optuna 基础](power90-d28) `{cat}` `kp-3bfc9fb0`
  - import optuna def objective(trial): params = { 'n_estimators': trial.suggest_int('n_estimators', 100
- [5.3 序列模型：LSTM 和 Transformer](power90-d5) `{cat}` `kp-2d33d127`
  - LSTM（长短期记忆网络） ：通过"门"机制决定哪些历史信息该记、该忘。 记忆单元 C_t = f_t * C_{t-1} + i_t * C̃_t 遗忘门 f_t, 输入门 i_t, 输出门 o_t
- [17.1 Self-Attention 一句话](power90-d17) `{cat}` `kp-22c45b15`
  - 每个时刻」看到」所有其他时刻，自动算出」该关注哪些时刻」。 公式：Attention(Q, K, V) = softmax(QK^T / √d) · V Q（Query）： "我在找什么" K（Key
- [41.1 SHAP TreeExplainer](power90-d41) `{cat}` `kp-52c7cdb6`
  - import shap explainer = shap.TreeExplainer(model_xgb) shap_values = explainer.shap_values(X_te) # 全局
- [2.4 为什么'因子组合'远胜'单因子'](crash-d2) `{cat}` `kp-f17901ec`
  - 单因子只看一个维度，组合因子能捕捉 交互效应 。 场景 促销折扣单因子 促销×节假日组合因子 普通日 + 7 折 销量+20% — 双 11 + 7 折 销量+20%（误判） 销量+200%（真实） 
- [⚠️ 新手最常见误区](crash-d3) `{cat}` `kp-6531eb98`
  - "LSTM 一定比 ARIMA 强" ——错。在数据量 &lt; 5000 行时，ARIMA/XGBoost 几乎一定胜过 LSTM。 不要为了"看起来高级"硬上深度学习。
- [5.1 三个场景的统一骨架](crash-d5) `{cat}` `kp-7e15f50a`
  - 维度 金融（股价预测） 电力（电价预测） 供应链（销量预测） 目标 预测下周股价涨跌 预测次日 24 时段电价 预测下周 SKU 销量 数据 股价/财报/舆情 历史电价/负荷/天气 销量/促销/天气/
- [供应链模型选择决策树](deep-d21) `{cat}` `kp-c0262de8`
  - 数据 1年+年季节？→SARIMA/Prophet 有外部变量(促销/价格)？→XGBoost SKU>100？→先聚类再分组建模
- [5.2 监督学习三剑客](power90-d5) `{cat}` `kp-20c4d0e4`
  - 模型 适用 优点 缺点 线性回归 baseline 快、可解释 表达能力弱 树模型（XGBoost/LightGBM） 表格特征 强、快、特征重要性 不擅长时序 神经网络（MLP） 复杂非线性 表达力
- [14.3 第二周自检](power90-d14) `{cat}` `kp-4ea914a2`
  - 本周交付了什么可运行的东西？（baseline + XGBoost） 是否偏离主攻方向？（电价预测是核心） 下周目标：跑通 LSTM demo（D15-21）
- [18.2 电价预测的实战选择](power90-d18) `{cat}` `kp-d7fb2145`
  - 日前电价需要预测 24 小时 → 推荐 Seq2Seq 或 Direct 。 XGBoost 在多步预测中常用 Direct （24 个模型并行训练）。
- [19.2 分位数回归（用 LightGBM）](power90-d19) `{cat}` `kp-c5608014`
  - import lightgbm as lgb # 训练 3 个分位模型 quantiles = [0.1, 0.5, 0.9] models = {} for q in quantiles: m = 
- [25.2 阶段二基础设施清单](power90-d25) `{cat}` `kp-66cda8ea`
  - ✅ data/raw/ 有 PJM 3 年数据 ✅ baseline + XGBoost + LSTM + Transformer + LightGBM 分位数 ✅ Pyomo + Gurobi ✅ 
- [⚠️ 风险预案](power90-d14) `{cat}` `kp-5725c2ae`
  - 方案第六节明确： "电价预测模型效果差「的应对是——先用 XGBoost，不上 LSTM。 树模型常优于 LSTM，不要为了」看起来高级」硬上深度学习。

## 电力市场

- [2.1 发电商怎么报价](power90-d2) `{cat}` `kp-8869b59f`
  - 电力报价不是」一个价」，而是」量价曲线」——不同出力段对应不同价。 报价形式 结构 典型用途 单段报价 (P, Q) 一对 小型机组 步梯报价（block bid） [(Q1,P1), (Q2,P2)
- [3.1 电力市场时间轴（一张图说清）](power90-d3) `{cat}` `kp-0f565917`
  - ┌─────────────┬──────────────┬──────────────┬───────────────┐ │ 年度/月度 │ 日前 │ 实时 │ 辅助服务 │ │ 中长期合约 │ 集
- [5.1 AI 三大类（电力视角）](power90-d5) `{cat}` `kp-e8b0c450`
  - 类别 核心思想 电力应用 本章定位 监督学习 学 X→y 映射 电价预测、负荷预测、故障诊断 主线 序列模型 建模时间依赖 多步电价预测、新能源出力 主线 强化学习 学决策策略 竞价策略、储能调度 了
- [5.4 强化学习（RL）速览](power90-d5) `{cat}` `kp-d936630f`
  - RL 思想：通过试错，学一个」在状态 s 下选动作 a」的策略 π(s)，使累计奖励最大。 概念 电力竞价类比 状态 s 当前市场价、自身剩余合约量 动作 a 报多少量、什么价 奖励 r 结算利润 策
- [⚠️ 为什么 RL 在电力竞价很难](power90-d5) `{cat}` `kp-9a017a21`
  - reward 设计极难（短期利润 vs 长期声誉） 对手在变，非平稳环境 试错成本高（真实报价错一次亏百万） 本课程把 RL 定位为"探索项" ，主线用确定性优化（数学规划）。详见方案第六节风险表。
- [26.1 决策矩阵（方案第三节）](power90-d26) `{cat}` `kp-2a881761`
  - 方向 数据可得性 技术门槛 可验证性 产业价值 综合 电价预测 ⭐⭐⭐⭐⭐ ⭐⭐⭐ ⭐⭐⭐⭐⭐ ⭐⭐⭐⭐⭐ ✅ 首选 竞价策略 ⭐⭐⭐ ⭐⭐⭐⭐ ⭐⭐⭐ ⭐⭐⭐⭐⭐ 次选 新能源收益 ⭐⭐⭐ ⭐⭐⭐ 
- [81.2 应急模式设计](power90-d81) `{cat}` `kp-95ed5732`
  - 信号 动作 预测区间过宽（不确定性高） 降低报价量 预测为尖峰日 启动备用策略 NWP 预警极端天气 提前调整
- [1.2 出清（Uniform Clearing）原理](power90-d1) `{cat}` `kp-081b3c0e`
  - 核心思想： 所有中标机组按同一个价格结算 ——这个价格就是满足负荷的最后一台机组的报价。 举例：负荷 1000MW，三台机组报价如下： 机组 容量(MW) 报价(元/MWh) 是否中标 A (核电) 
- [1.3 节点电价 LMP（Locational Marginal Price）](power90-d1) `{cat}` `kp-15bb0471`
  - LMP = 能量价 + 阻塞价 + 损耗价 能量价： 系统边际机组成本（上面讲的出清价） 阻塞价： 电网输电能力不足时，便宜电送不过去，本地只能用贵电 损耗价： 输电过程中的线损
- [2.2 双边合约 vs 集中竞价](power90-d2) `{cat}` `kp-dde138de`
  - 维度 双边合约 集中竞价 对手方 电厂↔用户/售电公司直接签 通过交易中心撮合 价格 双方协商 市场出清 量 固定，确定性强 动态，反映实时供需 角色 "压舱石「——锁定大部分电量 」价格发现」——反
- [2.4 算例：3 机组出清收益拆解](power90-d2) `{cat}` `kp-b2b03564`
  - 负荷 1000MW，A/B/C 三台机组报价如 Day 1 所示，出清价 500 元。 机组 中标量 收入 假设成本 利润 A 500MW 500×500=250,000 200×500=100,00
- [3.2 关键时点（以某省试点为例）](power90-d3) `{cat}` `kp-2ae776d1`
  - 时点 动作 D-1 08:00 发电商提交日前报价（量价曲线） D-1 10:00 日前市场截单 D-1 11:00 交易中心出清，发布次日 24 时段电价与机组计划 D 日 实时 实际调度，AGC 
- [7.1 补漏清单](power90-d7) `{cat}` `kp-1a99fa76`
  - 对照 Day 1-6 的 objectives，把没达标的勾出来，重点补： LMP 三要素能不能口头讲清？ 3 机组出清算例能不能 5 分钟内手算完？ 偏差结算方向（多发 vs 少发）有没有混淆？
- [⚠️ 新手最易混淆](power90-d1) `{cat}` `kp-736749da`
  - "为什么同一个时刻不同节点电价差几十倍？" → 通常是 阻塞 导致。某条线路满了，远处的便宜电送不过来，本地只能用本地贵电。
- [7.2 提前认识 PJM](power90-d7) `{cat}` `kp-49ad1b59`
  - PJM Interconnection 是美国最大的区域输电组织（RTO），覆盖 13 个州 + DC，服务 6500 万用户。 数据地址： dataminer2.pjm.
- [9.2 Plotly 多尺度电价图](power90-d9) `{cat}` `kp-312ee500`
  - import plotly.graph_objects as go from plotly.subplots import make_subplots fig = make_subplots(rows
- [9.3 标注尖峰日](power90-d9) `{cat}` `kp-79d58b7d`
  - # 找出价格 > 99 分位的时段 threshold = df['lmp'].quantile(0.99) spikes = df[df['lmp'] > threshold] fig.add_tr
- [11.2 PJM 数据下载](power90-d11) `{cat}` `kp-feaaa5cc`
  - 登录 dataminer2.pjm.com 选择 Locational Marginal Pricing 数据集 选一个节点（建议先选一个代表节点，如某大型变电站） 时间范围：2022-01-01 至
- [23.1 LMP 的对偶变量推导](power90-d23) `{cat}` `kp-4eda9e3e`
  - # 在求解后提取对偶 m.dual = Suffix(direction=Suffix.IMPORT) SolverFactory('glpk').solve(m) for n in m.nodes:
- [25.1 Plotting 工具封装](power90-d25) `{cat}` `kp-5c8672be`
  - # utils/plotting.py import plotly.graph_objects as go def plot_lmp(df, title='电价时序'): fig = go.Figur
- [1.1 电力市场的"四层蛋糕"](power90-d1) `{cat}` `kp-07b2767a`
  - 中国电力市场体系不是单一市场，而是四个相互衔接的市场层，按时间从长到短排列。 市场层 时间尺度 解决什么 类比 中长期合约 年度/月度 锁定大部分电量价格，规避波动 期货/远期合约 日前集中竞价 提前
- [📖 字典式查阅（不通读！）](power90-d1) `{cat}` `kp-02c1cee0`
  - 《电力市场概论》曾鸣 → 只翻市场结构 + 出清 + 结算章节，遇到不懂的概念再回来查
- [3.3 结算瀑布（重要！）](power90-d3) `{cat}` `kp-71c1eb63`
  - 最终某发电商的结算 = 中长期合约结算 + 日前市场结算 + 实时偏差结算 + 辅助服务结算 理解关键： 中长期合约"对冲"了现货波动，但 不消除电量物理交付 。物理电量必须在现货市场执行，合约只是财
- [4.1 新能源参与市场的三阶段](power90-d4) `{cat}` `kp-6e5c75be`
  - 阶段 机制 风险承担方 ① 保障性收购（早期） 政府定价，电网统购 电网（实际是全体用户分摊） ② 市场化交易（过渡期） 部分电量参与市场，部分仍保障 新能源+电网共担 ③ 平价上网+绿电交易（未来）
- [2.3 偏差结算：多发少发都要罚](power90-d2) `{cat}` `kp-7aefb84d`
  - 实际发电 / 用电 ≠ 合约量 → 偏差电量，按偏差结算规则处理。 发电偏差： 多发按现货价卖（可能赚可能亏）；少发按现货价买回（"补量"） 用电偏差： 多用电按现货价买；少用按现货价卖回 所以： 合

## 供应链应用

- [6.2 第一周综合图：四层市场 × AI 三大类](power90-d6) `{cat}` `kp-7dada7e0`
  - 市场层 监督学习 序列模型 强化学习 中长期 负荷年度预测 长周期趋势 合约组合优化 日前 日前电价预测（主攻） 多时段联合预测 竞价策略 实时 超短期电价 波动建模 储能调度 辅助服务 调频需求预测
- [供应链EDA黄金问题](deep-d13) `{cat}` `kp-af569e3a`
  - 哪类SKU销量最高/最波动？ 一周哪天最好？一月哪段？ 促销提升效果稳定吗？ 有无SKU模式完全不同？ 库存周转趋势改善还是恶化？
- [供应链因子类别](deep-d23) `{cat}` `kp-1d05263e`
  - 类别 示例 趋势 短期MA/长期MA、环比增速 波动 CV、振幅、极端值频率 价格 折扣力度、价格vs品类均值 时间 星期几、月初末、距节假日天数 竞品 同类SKU均销量、市场份额变化 库存 库存天数
- [⚠️ 最大陷阱](deep-d10) `{cat}` `kp-44a36e59`
  - 冰淇淋销量↗溺水死亡↗——不是因为冰淇淋导致溺水，而是"夏天"同时导致两者。这叫 混淆变量 。供应链中极常见：促销同时导致高销量和高退货率。
- [供应链预测的特殊挑战](deep-d1) `{cat}` `kp-a158c333`
  - 层级性： SKU→品类→仓库→区域，各层预测需自洽 间断性： 很多SKU不是天天有销量，传统模型直接失效 促销扰动： 大促暴涨5-10倍，是信号还是噪声？ 缺货截断： 卖断货=你只看到部分需求，历史数
- [⚠️ 最容易被忽视的问题](deep-d1) `{cat}` `kp-7763da0c`
  - 缺货截断（Censored Demand）： 销量=0可能不是真的没人买，而是没货可卖。如果你用缺货期间的数据训练模型，模型会学到"以后也少备点货"——然后持续缺货。这是供应链预测中最隐蔽也最致命的陷

## 理论

- [第2章 · 小瓦的策略靠谱吗——回测与经典策略](book-pyqt-ch2) `{cat}` `kp-98edf6a0`
  - 回测的核心思想：用历史数据评估策略是否真的能赚钱，并实现双均线策略。
- [1.2 传统经验 vs 量化方法——一张表看清](crash-d1) `{cat}` `kp-f515ecf6`
  - 维度 传统经验决策 量化方法 判断依据 "这么多年都是这么做的" "基于过去 5 年数据，模型预测增幅 28%±5%" 一致性 不同人拍不同数字，吵不出结果 同一份数据、同一套代码，结果一致 追溯性 
- [4.5 接下来 100 天该补什么](crash-d4) `{cat}` `kp-4d15cf3a`
  - 今天跑通后，你已经有了 "我能写 Python"的信心 。但要真正做量化，还需要补： 技能 在 100 天修炼的哪一天 pandas 进阶（合并/透视/时序） D8-D14 ARIMA / Proph
- [from xgboost import XGBRegressor
from sklearn.model_selectio](deep-d24) `{cat}` `kp-7a623af7`
  - from xgboost import XGBRegressor from sklearn.model_selection import TimeSeriesSplit tscv=TimeSeries
- [回测报告应包括：每轮MAPE、误差时间分布、SKU维度误差、系统性偏差检查。](deep-d26) `{cat}` `kp-55839baf`
  - def walk_forward_cv(df,feat,target,train_days=90,test_days=7): results=[] for i in range(train_days,
- [📖 W4完成✅](deep-d28) `{cat}` `kp-03e1a1ec`
  - 核心：特征工程→XGBoost/LightGBM→回测→多指标评估。
- [⚠️ 新手最大错误](power90-d13) `{cat}` `kp-2b6a6e56`
  - 用 train_test_split(shuffle=True) 切时序数据 → 测试集里混入了"未来"的信息，模型看起来表现好，实则完全不可用。 from sklearn.
- [13.2 三类信息泄漏](power90-d13) `{cat}` `kp-05923eb8`
  - 泄漏类型 表现 修正 切分泄漏 随机切分，测试集混入未来 用 TimeSeriesSplit，时间严格后移 归一化泄漏 用全量数据 fit_transform 只在训练集 fit，测试集 transf
- [29.1 滚动窗口回测](power90-d29) `{cat}` `kp-df9d1028`
  - from sklearn.metrics import mean_absolute_error window_train = 180 * 24 # 180 天训练 window_test = 30 *
- [30.1 阶段二交付物清单](power90-d30) `{cat}` `kp-b6054e04`
  - ✅ data/ 目录完整（PJM 3 年 + 可选 ERA5） ✅ 5 个模型对比表 ✅ Pyomo + Gurobi + 3 节点 OPF ✅ 主攻方向决策：电价预测 ✅ Optuna 调参 ✅ 滚
- [30.2 阶段三计划（D31-D70）](power90-d30) `{cat}` `kp-1c240a2c`
  - 区间 内容 D31-D50 主攻电价预测：模型迭代、特征深挖、回测完善 D51-D60 竞价策略（基于预测做优化） D61-D65 SHAP 可解释性 D66-D70 新能源/需求响应（了解级）
- [70.1 阶段三交付物清单](power90-d70) `{cat}` `kp-91bf0cef`
  - ✅ 电价预测主模型（MAPE ≤ 15%） ✅ 集成模型（XGBoost + LightGBM + LSTM） ✅ SHAP 可解释性分析 ✅ 尖峰预测两阶段方案 ✅ 竞价策略 + 历史回测 ✅ RL
- [70.2 阶段四计划（D71-D90）](power90-d70) `{cat}` `kp-fe3c405b`
  - 区间 任务 D71-D75 端到端串联：数据→预测→策略→回测 D76-D80 回测验证（对比 baseline） D81-D85 风险分析（极端日表现） D86-D90 成文 + Git 整理 + 
- [🏆 90 天交付清单](power90-d90) `{cat}` `kp-c06aba51`
  - ✅ 可运行的电价预测系统 （MAPE ≤ 15%，含置信区间） ✅ 竞价策略模块 （基于预测的 Pyomo 优化） ✅ 端到端回测报告 （5 折滚动 + 极端日分析） ✅ 策略报告 （10-15 页 
- [📖 90 天的真正价值](power90-d90) `{cat}` `kp-21943176`
  - 方案开篇那句话最值得回味： "90 天后你的验收标准不是'学完了什么'，而是'一个可运行的电价预测 + 竞价策略系统，含回测报告'。倒推每一天该做什么。" 你做到了。
- [第三篇 · 衡量方法（抽样+贝叶斯+四力）](book-measure-ch8) `{cat}` `kp-c2d4b4ad`
  - 三大实战方法：小样本抽样（rule of five）、贝叶斯更新、用\
- [3.5 评估指标——为什么 MAPE 不够](crash-d3) `{cat}` `kp-613a4303`
  - 指标 含义 陷阱 MAE 平均绝对误差 不区分大小错 RMSE 均方根误差（惩罚大错） 对异常值敏感 MAPE 平均绝对百分比误差 真实值小时爆炸（除以 0） WAPE 加权 MAPE（分母用总和） 
- [指标适用注意
MAPE销量>0销量=0时炸
WAPE含零销量∑|误差|/∑|实际|
MASE跨品类对比需基准模型](deep-d27) `{cat}` `kp-475835ac`
  - 指标 适用 注意 MAPE 销量>0 销量=0时炸 WAPE 含零销量 ∑|误差|/∑|实际| MASE 跨品类对比 需基准模型
- [14.1 XGBoost 升级](power90-d14) `{cat}` `kp-0209d1d1`
  - from xgboost import XGBRegressor from sklearn.metrics import mean_absolute_error xgb = XGBRegressor(
- [14.2 对比表（务必记录）](power90-d14) `{cat}` `kp-8549297c`
  - 模型 MAE RMSE MAPE 训练时间 线性回归（baseline） ? ? ? 随机森林 ? ? ? ? XGBoost ? ? ? ?
- [18.1 三种多步预测策略](power90-d18) `{cat}` `kp-224fea2b`
  - 策略 原理 优点 缺点 递归（Recursive） 预测 t+1，再用它当输入预测 t+2 简单 误差累积 直接（Direct） 为每个未来时刻训练独立模型 无累积误差 训练 24 个模型 Seq2S
- [20.1 模型大对比表（务必填全）](power90-d20) `{cat}` `kp-34ad32dc`
  - 模型 MAE RMSE MAPE 训练时间 是否概率 线性回归 ❌ 随机森林 ❌ XGBoost ❌ LSTM ❌ Transformer ❌ LightGBM 分位数 ✅
- [31.2 验收标准（必须量化）](power90-d31) `{cat}` `kp-bcdd9cb3`
  - 指标 目标 MAPE ≤ 15%（取决于市场波动性） 尖峰日（>P99）命中率 ≥ 60% 预测延迟 次日 24 小时 覆盖率（80% 区间） 78%-82%
- [41.2 误差归因](power90-d41) `{cat}` `kp-b77b4e38`
  - # 找出预测误差最大的样本 errors = np.abs(y_te - y_pred) worst_idx = errors.argsort()[-20:] # 看这些样本的 SHAP 值，找出驱动
- [76.1 两个 baseline](power90-d76) `{cat}` `kp-2bbb7afb`
  - # Persistence：用 t-1 的值预测 t pred_persistence = df['lmp'].shift(1) # Naive：用昨天同时段 pred_naive = df['lmp
- [第7章 · 衡量信息的价值](book-measure-ch7) `{cat}` `kp-e6c5c045`
  - 用 EVPI 回答\
- [3.2 模型选型决策树](crash-d3) `{cat}` `kp-d158ad63`
  - 问：数据量多少？ ├─ &lt; 500 行 → 用 ARIMA 或 Prophet（小样本友好） ├─ 500-10000 行 → 先试 XGBoost，对比 ARIMA └─ &gt;
- [86.1 报告结构（10-15 页）](power90-d86) `{cat}` `kp-849f8867`
  - 摘要（1 页） ：核心结论 + 主要数字 背景（1 页） ：电力市场 + 研究问题 数据（2 页） ：来源、时间范围、清洗 方法（3 页） ：模型选型、特征工程、回测框架 结果（3 页） ：MAPE 
- [5.3 三场景的'共同陷阱'](crash-d5) `{cat}` `kp-37d569e3`
  - 陷阱 金融表现 电力表现 供应链表现 过拟合 回测夏普 3，实盘亏 训练 MAPE 5%，上线 25% 训练准，大促全错 信息泄漏 用了财报后数据 用了未来负荷 用了促销后销量 忽略极端事件 黑天鹅爆
- [from lightgbm import LGBMRegressor
models={'xgb':XGBRegresso](deep-d25) `{cat}` `kp-3e848277`
  - from lightgbm import LGBMRegressor models={'xgb':XGBRegressor(n_estimators=200),'lgb':LGBMRegressor(
- [⚠️ LSTM 常见坑](power90-d16) `{cat}` `kp-a0277e82`
  - 过拟合： Dropout 必加，hidden_dim 不要超过 128 训练慢： batch_size 设 64-256，用 GPU 归一化： LSTM 对输入 scale 极敏感，必须 Standa
- [from statsmodels.tsa.stattools import adfuller
p=adfuller(df](deep-d16) `{cat}` `kp-01b53088`
  - from statsmodels.tsa.stattools import adfuller p=adfuller(df['销量'].dropna())[1] # p d=0平稳,d=1一阶差分,d=
- [📖 W3完成✅](deep-d21) `{cat}` `kp-9f9ae4e4`
  - 核心：平稳性→ACF/PACF→ARIMA/SARIMA/Prophet→模型对比。

## 时序模型

- [供应链季节性：周(m=7)/月(m≈30)/年(m=365)。多重季节→考虑Prophet或TBATS。](deep-d19) `{cat}` `kp-d5dd71e9`
  - from statsmodels.tsa.statespace.sarimax import SARIMAX m=SARIMAX(ts,order=(2,1,2),seasonal_order=(1,
- [11.1 数据目录结构（规范！）](power90-d11) `{cat}` `kp-9b525050`
  - data/ ├── raw/ # 原始数据，不动 │ ├── pjm_lmp_2022.csv │ ├── pjm_lmp_2023.csv │ ├── pjm_lmp_2024.csv │ └── 
- [81.1 极端日识别](power90-d81) `{cat}` `kp-ef44ce42`
  - # 价格 > P99 的日子 spike_days = df[df['lmp'] > df['lmp'].quantile(0.99)].index.normalize().

## 工具与基础

- [9.1 NumPy 向量化（提速 100x）](power90-d9) `{cat}` `kp-58c08486`
  - import numpy as np # 反例：for 循环 prices = df['lmp'].values result = [] for p in prices: result.append(
- [15.1 PyTorch 三件套](power90-d15) `{cat}` `kp-bec40cc9`
  - import torch import torch.nn as nn # ① Tensor（类似 ndarray，但能跑 GPU） x = torch.randn(100, 10) # 100 样本 
- [16.1 滑窗 reshape（关键！）](power90-d16) `{cat}` `kp-2b537895`
  - import numpy as np def make_sequences(df, target_col, seq_len=24, horizon=1): X, y = [], [] arr = df
- [56.1 Q-learning 简化版](power90-d56) `{cat}` `kp-24d24558`
  - import numpy as np Q = np.zeros((n_states, n_actions)) for episode in range(1000): s = env.
- [第1章 · 小瓦的故事——从零开始](book-pyqt-ch1) `{cat}` `kp-3fd84286`
  - 用小瓦的视角引入量化交易概念，搭建 Python+Jupyter 环境，获取第一份股票数据。
- [4.3 理解 DataFrame——5 个核心动作](crash-d4) `{cat}` `kp-d56d3aed`
  - DataFrame 就是"代码版的 Excel 表"，但能处理百万行不卡。 动作 Excel 怎么做 pandas 代码 看前几行 滚动鼠标 df.head() 筛选 自动筛选 df[df['销量']
- [📖 W1完成✅](deep-d6) `{cat}` `kp-ea693b31`
  - 核心能力：环境搭建、pandas/NumPy、数据读写、分组统计、时序操作、可视化。
- [m=Prophet(yearly_seasonality=True,weekly_seasonality=True)
m](deep-d20) `{cat}` `kp-5407bc5c`
  - m=Prophet(yearly_seasonality=True,weekly_seasonality=True) m.add_country_holidays(country_name='CN')
- [好的特征比好的算法更重要。](deep-d22) `{cat}` `kp-c78976ca`
  - def make_ts_features(df,target,lags=[1,2,3,7,14,28]): d=df.copy() for l in lags: d[f'lag_{l}']=d[tar
- [7.3 环境准备](power90-d7) `{cat}` `kp-fb376029`
  - # Python 3.10+ pip install pandas numpy matplotlib plotly scikit-learn jupyter 下周要装 pyomo 和申请 gurobi
- [8.2 五大核心操作（电价数据视角）](power90-d8) `{cat}` `kp-c5626d32`
  - import pandas as pd # ① 读取 df = pd.read_csv('lmp_2024.csv', parse_dates=['datetime']) # ② 检查 df.info
- [10.1 你的第一个电价预测 baseline](power90-d10) `{cat}` `kp-961abb3e`
  - import pandas as pd from sklearn.linear_model import LinearRegression from sklearn.
- [12.2 电价特征工程（15+ 特征）](power90-d12) `{cat}` `kp-3d19702b`
  - 类别 特征 代码 时间 小时 df.index.hour 星期几 df.index.dayofweek 月份 df.index.month 是否周末 df.index.
- [27.1 节假日特征](power90-d27) `{cat}` `kp-e9ddc668`
  - from pandas.tseries.holiday import USFederalHolidayCalendar cal = USFederalHolidayCalendar() holiday
- [27.2 极端事件标记](power90-d27) `{cat}` `kp-c27256a9`
  - # 寒潮：温度 35°C 持续 3 天 df['is_cold_wave'] = (df['temp'] = 72 df['is_heat_wave'] = (df['temp'] > 35).rol
- [46.1 两阶段方案](power90-d46) `{cat}` `kp-3444da5f`
  - # 阶段 1：分类——明天会不会有尖峰 df['is_spike'] = (df['lmp'] > df['lmp'].rolling(720).quantile(0.99)).
- [64.1 需求响应分类](power90-d64) `{cat}` `kp-7df48f9f`
  - 类型 机制 典型用户 削峰（peak shaving） 高峰时降负荷 大工业 填谷（valley filling） 低谷时升负荷 电动车充电 转移（load shifting） 把高峰负荷挪到低谷 储
- [21.1 Pyomo 三件套](power90-d21) `{cat}` `kp-6fee9de0`
  - from pyomo.environ import * model = ConcreteModel() # ① 决策变量 model.x = Var(within=NonNegativeReals) 
- [22.2 3 节点 OPF 模型](power90-d22) `{cat}` `kp-bec10343`
  - from pyomo.environ import * m = ConcreteModel() # 3 个节点，节点 1 为平衡节点 m.nodes = RangeSet(0, 2) # 2 台发电机
- [51.1 发电商报价优化](power90-d51) `{cat}` `kp-568ffbd1`
  - from pyomo.environ import * m = ConcreteModel() # 决策：每段（共 10 段）报价量 m.segments = RangeSet(0, 9) m.qty
- [4.1 三条路径，选一条](crash-d4) `{cat}` `kp-2726f50d`
  - 路径 适合谁 优点 缺点 Google Colab（推荐新手） 完全零基础 免安装、免费 GPU、浏览器即用 需科学上网 Anaconda 本地安装 有 Python 基础 离线可用、环境独立 安装较
- [4.2 第一段代码（复制到 Colab 即可跑）](crash-d4) `{cat}` `kp-50d29f90`
  - # 第一步：导入工具 import pandas as pd import numpy as np # 第二步：造一份模拟销量数据（先不连真实数据库） dates = pd.
- [4.4 读真实 CSV（下一步）](crash-d4) `{cat}` `kp-85418915`
  - # 如果你有真实销量数据 CSV df_real = pd.read_csv('my_sales.csv', parse_dates=['日期']) df_real.head() # Google C
- [24.1 Gurobi 学术 license](power90-d24) `{cat}` `kp-f1b1968d`
  - 注册 gurobi.com/academia 下载并安装 运行 grbgetkey xxxxxxx 激活 SolverFactory('gurobi').solve(m)
- [15.2 训练循环五步](power90-d15) `{cat}` `kp-d00da6df`
  - model = MLP() opt = torch.optim.Adam(model.parameters(), lr=1e-3) loss_fn = nn.
- [16.2 PyTorch LSTM 模型](power90-d16) `{cat}` `kp-48e862ee`
  - class LSTMPredictor(nn.Module): def __init__(self, input_dim, hidden=64, layers=2): super().__init__
- [17.2 简化版 Transformer（仅 Encoder）](power90-d17) `{cat}` `kp-a1706073`
  - class TransformerPredictor(nn.Module): def __init__(self, feat_dim, d_model=64, nhead=4, layers=2): 
- [12.3 特征重要性](power90-d12) `{cat}` `kp-fb3359e1`
  - rf = RandomForestRegressor().fit(X, y) importances = pd.Series(rf.feature_importances_, index=X.colu
- [13.3 归一化正确写法](power90-d13) `{cat}` `kp-f41686ff`
  - from sklearn.preprocessing import StandardScaler scaler = StandardScaler() X_tr_scaled = scaler.
- [35.1 三模型集成](power90-d35) `{cat}` `kp-c309d914`
  - from sklearn.linear_model import Ridge # 第一层：三个基模型 preds_xgb = model_xgb.predict(X_val) preds_lgb = 
