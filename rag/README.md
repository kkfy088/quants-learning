# 知识框架与 RAG 数据说明

## 一、数据概览

- **知识点总数**：164 个
- **分类层级**：9 大类 / 35 子类
- **数据格式**：JSONL（每行一个 JSON 对象）
- **文件大小**：231.1 KB
- **来源覆盖**：5 个内容文件（crash / deep / power90 / 2 本书）

## 二、十大分类框架

| 大类 | 子类数 | 知识点数 | 说明 |
|------|--------|---------|------|
| **核心方法论** | 4 | 48 | 量化决策范式、因子思维、IC 评估、人机边界——跨场景通用的核心方法论 |
| **理论** | 6 | 33 | 时序/ML 理论、过拟合、回测、评估指标、贝叶斯 |
| **工具与基础** | 6 | 30 | Python/pandas/NumPy/sklearn/Pyomo 等工具基础 |
| **电力市场** | 6 | 25 | 电力市场结构、LMP、竞价、储能、风险约束 |
| **机器学习模型** | 4 | 14 | XGBoost/LSTM/SHAP/AutoML 等 ML 模型 |
| **供应链应用** | 4 | 6 | 需求预测、库存、缺货、促销——供应链应用层 |
| **测量与决策科学** | 3 | 4 | 校准估计、EVPI、抽样、不确定性下的决策 |
| **时序模型** | 1 | 3 | ARIMA/SARIMA/Prophet 等经典时序模型 |
| **工程化** | 1 | 1 | Agent 框架、流水线、部署、实验管理 |

## 三、RAG 数据结构（JSONL 字段说明）

每个知识点是一个 JSON 对象，字段如下：

| 字段 | 类型 | 说明 |
|------|------|------|
| `id` | string | 稳定哈希 ID（kp-xxxxxxxx） |
| `title` | string | 知识点标题（独立可理解） |
| `category` | string | 大类 ID（如 methodology） |
| `subcategory` | string | 子类 ID（如 factor_thinking） |
| `category_label` | string | 大类中文名 |
| `subcategory_label` | string | 子类中文名 |
| `source` | string | 来源标签（crash/deep/power90/book-*） |
| `source_ref` | string | 来源引用（如 power90-d1） |
| `difficulty` | string | L1（基础）/ L2（进阶） |
| `summary` | string | 一句话总结（用于召回后排重） |
| `key_points` | string[] | 3-5 个核心要点 |
| `details_md` | string | 详细讲解（Markdown 格式） |
| `code` | string | 相关代码片段（如有） |
| `related` | string[] | 关联知识点 ID 列表（3-5 个） |
| `common_pitfalls` | string[] | 常见错误 |

## 四、如何使用这份数据

### 方案 A：直接接入向量数据库（推荐）

用 Chroma（本地）或 Pinecone（云），每个知识点的 details_md + key_points 作为 embedding 输入。

### 方案 B：DeepSeek API 直接 RAG

在量化学习平台的 AI 助手中，把召回的 top-K 知识点 details 注入 system prompt。

### 方案 C：纯本地搜索（不上向量库）

用 SQLite FTS5 或简单的关键词倒排索引，适合不想引入向量库的场景。

## 五、迭代与扩展

| 场景 | 操作 |
|------|------|
| 新增课程内容 | 修改 content/*.ts，重跑 python scripts/build_rag.py |
| 新增分类 | 编辑 build_rag.py 的 TAXONOMY 和 CATEGORY_RULES |
| 接入新教材 | 在 content/ 加新文件 + 在 build_rag.py 加解析器 |
| 质量问题 | 编辑 is_low_quality_kp() 的过滤规则 |

---

## 六、完整分类目录

### 工程化

**部署与监控**

- `kp-5f0cd2aa` [power90/D90] 90.3 下一步选项
### 测量与决策科学

**校准估计**

- `kp-e3c7136a` [book-measure/book-measure-ch5] 第二篇 · 开始衡量之前（校准估计+风险+EVPI）
**麦纳玛拉谬误**

- `kp-60363643` [book-measure/book-measure-ch3] 第3章 · 无形事物的假象
**小样本抽样**

- `kp-a3d54bf4` [book-measure/book-measure-ch9] 第9章 · 抽样：观察少数，探知全体
- `kp-6e81653e` [crash/D3] 3.1 两类模型的本质差异
### 核心方法论

**IC/ICIR 评估**

- `kp-434ce0e0` [crash/D2] ⚠️ 新手最大的坑：因子越多越好？
- `kp-8029be9b` [crash/D2] 2.3 因子好坏怎么评——IC 与相关性
**因子思维**

- `kp-2cf9d7b2` [crash/D2] 2.1 因子是什么——精确化定义
**量化决策范式**

- `kp-783ad05a` [book-measure/book-measure-ch1] 第一篇 · 衡量：总是有方法可以衡量的
- `kp-79436e93` [book-pyqt/book-pyqt-ch3] 第3章 · AI来了——机器学习在交易中的简单应用
- `kp-c01fd1db` [book-pyqt/book-pyqt-ch6] 第6章 · 因子好用吗——IC/换手率/自相关分析
- `kp-1b3b279e` [crash/D1] 1.1 一句话定义量化分析
- `kp-dff170a9` [crash/D1] 1.3 量化分析的四大环节（核心地图）
- `kp-510c4862` [crash/D1] ⚠️ 哪个环节最贵
- `kp-92a8d0ff` [crash/D1] 1.4 人与 AI 的边界——'人定方向、机器跑流程'
- `kp-ab6c63de` [crash/D1] 1.5 为什么这个范式适用于所有'预测+决策'问题
- `kp-470d64c6` [crash/D1] 📖 延伸阅读（不强求）
- `kp-526cdf8c` [crash/D2] 2.2 从业务问题反向推导因子集
- `kp-61948654` [crash/D2] 2.5 因子思维适用于所有量化问题
- `kp-428efd95` [crash/D3] 3.3 过拟合——量化分析的头号陷阱
- `kp-727d31b0` [crash/D3] 3.4 回测的正确姿势
- `kp-7c8c4d87` [crash/D5] 5.2 三个场景的难度排序
- `kp-a19abdf5` [crash/D5] 5.4 认知毕业测试
- `kp-4f56ec28` [crash/D5] 5.5 选择你的下一步
- `kp-606625c6` [crash/D5] 🎓 Day 5 毕业
- `kp-76064fba` [deep/D1] 量化=数据+模型+代码+判断
- `kp-a5db42e1` [deep/D11] 供应链警示：
- `kp-90c3779d` [deep/D12] 数据质量检查清单（每次分析前）
- `kp-b4586964` [deep/D17] from statsmodels.graphics.tsaplots import plot_acf,plot_pacf
- `kp-98466221` [deep/D18] 残差诊断必看
- `kp-45e04cb5` [deep/D30] 31-100天预告
- `kp-1c04415f` [power90/D4] 4.2 偏差考核：新能源最痛的环节
- `kp-0de68cf5` [power90/D4] ⚠️ 这就是为什么」出力预测」对新能源企业生死攸关
- `kp-451ed69d` [power90/D4] 4.3 算例：某风电场月度收益
- `kp-44f88f24` [power90/D6] 6.1 每周自检清单（来自方案第七节）
- `kp-15f042e4` [power90/D8] 8.3 电价数据的"三大脏"
- `kp-cad587b7` [power90/D10] 📖 关键里程碑
- `kp-192b023e` [power90/D11] ⚠️ 关键改动：数据从 D11 启动
- `kp-3745d6ab` [power90/D11] 11.3 ERA5 气象数据（可选，建议有）
- `kp-6a04ed65` [power90/D12] 12.1 sklearn 三步范式
- `kp-d7541a66` [power90/D19] 19.1 为什么电价需要概率预测
- `kp-2fb8a78f` [power90/D19] 19.3 覆盖率检查
- `kp-cd37e1c1` [power90/D22] 22.1 DC-OPF 是什么
- `kp-0f10de86` [power90/D31] 31.1 实验管理（轻量版）
- `kp-5a23a1f6` [power90/D32] cyclical encoding
- `kp-01556730` [power90/D33] 交叉特征示例
- `kp-826c78ab` [power90/D56] ⚠️ RL 触发条件
- `kp-98884208` [power90/D61] 61.1 风电 vs 光伏
- `kp-d05a7bb0` [power90/D71] 71.2 用 Prefect 或 Airflow 编排（可选）
- `kp-4531e8c7` [power90/D90] 90.2 复盘模板
- `kp-97d201dd` [power90/D90] 🎉 Day 90 终极任务
**四步法流水线**

- `kp-28905aad` [power90/D71] 71.1 Pipeline 架构
- `kp-24c0aadf` [power90/D88] 88.1 仓库结构
### 机器学习模型

**AutoML**

- `kp-3bfc9fb0` [power90/D28] 28.1 Optuna 基础
**深度学习（LSTM/Transformer）**

- `kp-2d33d127` [power90/D5] 5.3 序列模型：LSTM 和 Transformer
- `kp-22c45b15` [power90/D17] 17.1 Self-Attention 一句话
**可解释性（SHAP）**

- `kp-52c7cdb6` [power90/D41] 41.1 SHAP TreeExplainer
**树模型（XGBoost/LightGBM）**

- `kp-f17901ec` [crash/D2] 2.4 为什么'因子组合'远胜'单因子'
- `kp-6531eb98` [crash/D3] ⚠️ 新手最常见误区
- `kp-7e15f50a` [crash/D5] 5.1 三个场景的统一骨架
- `kp-c0262de8` [deep/D21] 供应链模型选择决策树
- `kp-20c4d0e4` [power90/D5] 5.2 监督学习三剑客
- `kp-4ea914a2` [power90/D14] 14.3 第二周自检
- `kp-d7fb2145` [power90/D18] 18.2 电价预测的实战选择
- `kp-c5608014` [power90/D19] 19.2 分位数回归（用 LightGBM）
- `kp-66cda8ea` [power90/D25] 25.2 阶段二基础设施清单
- `kp-5725c2ae` [power90+power90/D14] ⚠️ 风险预案
### 电力市场

**报价与竞价策略**

- `kp-8869b59f` [power90/D2] 2.1 发电商怎么报价
- `kp-0f565917` [power90/D3] 3.1 电力市场时间轴（一张图说清）
- `kp-e8b0c450` [power90/D5] 5.1 AI 三大类（电力视角）
- `kp-d936630f` [power90/D5] 5.4 强化学习（RL）速览
- `kp-9a017a21` [power90/D5] ⚠️ 为什么 RL 在电力竞价很难
- `kp-2a881761` [power90/D26] 26.1 决策矩阵（方案第三节）
- `kp-95ed5732` [power90/D81] 81.2 应急模式设计
**出清与电价机制**

- `kp-081b3c0e` [power90/D1] 1.2 出清（Uniform Clearing）原理
- `kp-15bb0471` [power90/D1] 1.3 节点电价 LMP（Locational Marginal Price）
- `kp-dde138de` [power90/D2] 2.2 双边合约 vs 集中竞价
- `kp-b2b03564` [power90/D2] 2.4 算例：3 机组出清收益拆解
- `kp-2ae776d1` [power90/D3] 3.2 关键时点（以某省试点为例）
- `kp-1a99fa76` [power90/D7] 7.1 补漏清单
**节点电价 LMP**

- `kp-736749da` [power90/D1] ⚠️ 新手最易混淆
- `kp-49ad1b59` [power90/D7] 7.2 提前认识 PJM
- `kp-312ee500` [power90/D9] 9.2 Plotly 多尺度电价图
- `kp-79d58b7d` [power90/D9] 9.3 标注尖峰日
- `kp-feaaa5cc` [power90/D11] 11.2 PJM 数据下载
- `kp-4eda9e3e` [power90/D23] 23.1 LMP 的对偶变量推导
- `kp-5c8672be` [power90/D25] 25.1 Plotting 工具封装
**市场结构（中长期/日前/实时/辅助）**

- `kp-07b2767a` [power90/D1] 1.1 电力市场的"四层蛋糕"
- `kp-02c1cee0` [power90/D1] 📖 字典式查阅（不通读！）
- `kp-71c1eb63` [power90/D3] 3.3 结算瀑布（重要！）
**新能源参与市场**

- `kp-6e5c75be` [power90/D4] 4.1 新能源参与市场的三阶段
**偏差结算**

- `kp-7aefb84d` [power90/D2] 2.3 偏差结算：多发少发都要罚
### 供应链应用

**需求预测**

- `kp-7dada7e0` [power90/D6] 6.2 第一周综合图：四层市场 × AI 三大类
**库存优化**

- `kp-af569e3a` [deep/D13] 供应链EDA黄金问题
- `kp-1d05263e` [deep/D23] 供应链因子类别
**促销建模**

- `kp-44a36e59` [deep/D10] ⚠️ 最大陷阱
**缺货截断处理**

- `kp-a158c333` [deep/D1] 供应链预测的特殊挑战
- `kp-7763da0c` [deep/D1] ⚠️ 最容易被忽视的问题
### 理论

**回测方法论**

- `kp-98edf6a0` [book-pyqt/book-pyqt-ch2] 第2章 · 小瓦的策略靠谱吗——回测与经典策略
- `kp-f515ecf6` [crash/D1] 1.2 传统经验 vs 量化方法——一张表看清
- `kp-4d15cf3a` [crash/D4] 4.5 接下来 100 天该补什么
- `kp-7a623af7` [deep/D24] from xgboost import XGBRegressor
from sklearn.model_selectio
- `kp-55839baf` [deep/D26] 回测报告应包括：每轮MAPE、误差时间分布、SKU维度误差、系统性偏差检查。
- `kp-03e1a1ec` [deep/D28] 📖 W4完成✅
- `kp-2b6a6e56` [power90/D13] ⚠️ 新手最大错误
- `kp-05923eb8` [power90/D13] 13.2 三类信息泄漏
- `kp-df9d1028` [power90/D29] 29.1 滚动窗口回测
- `kp-b6054e04` [power90/D30] 30.1 阶段二交付物清单
- `kp-1c240a2c` [power90/D30] 30.2 阶段三计划（D31-D70）
- `kp-91bf0cef` [power90/D70] 70.1 阶段三交付物清单
- `kp-fe3c405b` [power90/D70] 70.2 阶段四计划（D71-D90）
- `kp-c06aba51` [power90/D90] 🏆 90 天交付清单
- `kp-21943176` [power90/D90] 📖 90 天的真正价值
**贝叶斯方法**

- `kp-c2d4b4ad` [book-measure/book-measure-ch8] 第三篇 · 衡量方法（抽样+贝叶斯+四力）
**评估指标（MAPE/WAPE/RMSE）**

- `kp-613a4303` [crash/D3] 3.5 评估指标——为什么 MAPE 不够
- `kp-475835ac` [deep/D27] 指标适用注意
MAPE销量>0销量=0时炸
WAPE含零销量∑|误差|/∑|实际|
MASE跨品类对比需基准模型
- `kp-0209d1d1` [power90/D14] 14.1 XGBoost 升级
- `kp-8549297c` [power90/D14] 14.2 对比表（务必记录）
- `kp-224fea2b` [power90/D18] 18.1 三种多步预测策略
- `kp-34ad32dc` [power90/D20] 20.1 模型大对比表（务必填全）
- `kp-bcdd9cb3` [power90/D31] 31.2 验收标准（必须量化）
- `kp-b77b4e38` [power90/D41] 41.2 误差归因
- `kp-2bbb7afb` [power90/D76] 76.1 两个 baseline
**模型选型决策**

- `kp-e6c5c045` [book-measure/book-measure-ch7] 第7章 · 衡量信息的价值
- `kp-d158ad63` [crash/D3] 3.2 模型选型决策树
- `kp-849f8867` [power90/D86] 86.1 报告结构（10-15 页）
**过拟合与正则化**

- `kp-37d569e3` [crash/D5] 5.3 三场景的'共同陷阱'
- `kp-3e848277` [deep/D25] from lightgbm import LGBMRegressor
models={'xgb':XGBRegresso
- `kp-a0277e82` [power90/D16] ⚠️ LSTM 常见坑
**时序基础（平稳性/ACF/PACF）**

- `kp-01b53088` [deep/D16] from statsmodels.tsa.stattools import adfuller
p=adfuller(df
- `kp-9f9ae4e4` [deep/D21] 📖 W3完成✅
### 时序模型

**ARIMA / SARIMA**

- `kp-d5dd71e9` [deep/D19] 供应链季节性：周(m=7)/月(m≈30)/年(m=365)。多重季节→考虑Prophet或TBATS。
- `kp-9b525050` [power90/D11] 11.1 数据目录结构（规范！）
- `kp-ef44ce42` [power90/D81] 81.1 极端日识别
### 工具与基础

**NumPy 数值计算**

- `kp-58c08486` [power90/D9] 9.1 NumPy 向量化（提速 100x）
- `kp-bec40cc9` [power90/D15] 15.1 PyTorch 三件套
- `kp-2b537895` [power90/D16] 16.1 滑窗 reshape（关键！）
- `kp-24d24558` [power90/D56] 56.1 Q-learning 简化版
**pandas 数据处理**

- `kp-3fd84286` [book-pyqt/book-pyqt-ch1] 第1章 · 小瓦的故事——从零开始
- `kp-d56d3aed` [crash/D4] 4.3 理解 DataFrame——5 个核心动作
- `kp-ea693b31` [deep/D6] 📖 W1完成✅
- `kp-5407bc5c` [deep/D20] m=Prophet(yearly_seasonality=True,weekly_seasonality=True)
m
- `kp-c78976ca` [deep/D22] 好的特征比好的算法更重要。
- `kp-fb376029` [power90/D7] 7.3 环境准备
- `kp-c5626d32` [power90/D8] 8.2 五大核心操作（电价数据视角）
- `kp-961abb3e` [power90/D10] 10.1 你的第一个电价预测 baseline
- `kp-3d19702b` [power90/D12] 12.2 电价特征工程（15+ 特征）
- `kp-e9ddc668` [power90/D27] 27.1 节假日特征
- `kp-c27256a9` [power90/D27] 27.2 极端事件标记
- `kp-3444da5f` [power90/D46] 46.1 两阶段方案
- `kp-7df48f9f` [power90/D64] 64.1 需求响应分类
**Pyomo 优化建模**

- `kp-6fee9de0` [power90/D21] 21.1 Pyomo 三件套
- `kp-bec10343` [power90/D22] 22.2 3 节点 OPF 模型
- `kp-568ffbd1` [power90/D51] 51.1 发电商报价优化
**Python 环境**

- `kp-2726f50d` [crash/D4] 4.1 三条路径，选一条
- `kp-50d29f90` [crash/D4] 4.2 第一段代码（复制到 Colab 即可跑）
- `kp-85418915` [crash/D4] 4.4 读真实 CSV（下一步）
- `kp-f1b1968d` [power90/D24] 24.1 Gurobi 学术 license
**PyTorch**

- `kp-d00da6df` [power90/D15] 15.2 训练循环五步
- `kp-48e862ee` [power90/D16] 16.2 PyTorch LSTM 模型
- `kp-a1706073` [power90/D17] 17.2 简化版 Transformer（仅 Encoder）
**scikit-learn**

- `kp-fb3359e1` [power90/D12] 12.3 特征重要性
- `kp-f41686ff` [power90/D13] 13.3 归一化正确写法
- `kp-c309d914` [power90/D35] 35.1 三模型集成