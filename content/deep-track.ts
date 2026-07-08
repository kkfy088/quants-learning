import type { DayContent } from "@/lib/types";

/**
 * 100 天深化轨 v4.0 — 浓缩版（承接 15 天速成）
 *
 * 设计哲学：
 * - 前 15 天（crash-course.ts）：统计 + Python + 工具 + 时序概念一站式
 * - Day 16-35：★ P4 因果归因（20 天重点）— 营销 ROI 归因
 * - Day 36-55：★ P5 库存补货（20 天重点）— 供应链决策
 * - Day 56-75：P6 Agent 自动化（20 天）— AI 跑流水线
 * - Day 76-100：选修 + 毕业项目（25 天）— 因子 + 电力 + 大宗 + ARIMA 附录
 *
 * 关键调整（vs v3.0）：
 * - ARIMA 家族已在前 15 天用 statsforecast 一键跑，数学严格版后移到 Day 93 附录
 * - 统计学穿插补：用到时补
 * - 工具链：AI 原生（WorkBuddy+DeepSeek）+ 本地 venv 为主，Colab 为 GPU 辅助
 */

export const deepDays: DayContent[] = [
  // ============================================================
  // P4 因果归因（Day 16-35，20 天，⭐⭐⭐ 重点）
  // ============================================================

  {
    id: "deep-16", day: 16, week: 4, track: "deep", duration: 120,
    title: "P4 启动 · 因果 vs 相关：思维范式转换",
    description: "从两个变量一起变升级到改变 X 会不会真的改变 Y。这是分析师和算法工程师的分水岭。",
    objectives: ["理解潜在结果框架", "理解反事实的含义", "区分 ATE/CATE/ITE"],
    cues: ["Q: 为什么相关不等于因果？", "Q: 什么是反事实？"],
    content: `<h3>潜在结果框架</h3>
<p><strong>反事实：</strong> 如果没做促销，销量会是多少？因果分析就是估计这个看不到的对照。</p>
<p><strong>ATE：</strong> 促销对所有商品的平均效果</p>
<p><strong>CATE：</strong> 促销对高端商品的效果（异质效应）</p>`,
    resources: [{ label: "Facure 因果推断第 1-2 章", url: "https://matheusfacure.github.io/python-causality-handbook/01-Introduction-To-Causality.html" }],
  },
  {
    id: "deep-17", day: 17, week: 4, track: "deep", duration: 120,
    title: "DAG 有向无环图：画因果图",
    description: "用图形化方式表达变量间的因果关系，识别混淆变量和中介变量。",
    objectives: ["画 DAG 因果图", "识别混淆变量", "理解 do 演算"],
    cues: ["Q: 怎么找混淆变量？", "Q: do(X) 和 see(X) 区别？"],
    content: `<h3>DAG 三类变量</h3>
<ul><li><strong>混淆变量：</strong> 同时影响处理和结果 → 必须控制</li>
<li><strong>中介变量：</strong> 处理 → 中介 → 结果 → 不能控制</li>
<li><strong>对撞变量：</strong> 处理和结果都指向它 → 不能控制</li></ul>`,
  },
  {
    id: "deep-18", day: 18, week: 4, track: "deep", duration: 150,
    title: "双重差分（DID）实战",
    description: "最经典的因果推断方法——比较处理组和对照组在干预前后的变化差异。",
    objectives: ["理解 DID 的平行趋势假设", "用 Python 实现 DID"],
    cues: ["Q: DID 的核心假设是什么？"],
    content: `<h3>DID 公式</h3>
<p>ATE = (处理组后 - 处理组前) - (对照组后 - 对照组前)</p>
<pre><code class="language-python">import statsmodels.api as sm
df['did'] = df['treated'] * df['post']
model = sm.OLS(df['sales'], sm.add_constant(df[['treated', 'post', 'did']]))
result = model.fit()
print(f"DID 效应: {result.params['did']:.2f}")</code></pre>`,
    resources: [{ label: "Facure 第 14 章 DID", url: "https://matheusfacure.github.io/python-causality-handbook/13-Difference-in-Differences.html" }],
  },
  {
    id: "deep-19", day: 19, week: 4, track: "deep", duration: 120,
    title: "合成控制法（Synthetic Control）",
    description: "当只有一个处理单元时，用其他单元加权合成反事实对照组。",
    objectives: ["理解合成控制的权重构造", "用 SyntheticControl 库实现"],
    cues: ["Q: 合成控制和 DID 的区别？"],
    content: `<p><strong>场景：</strong> 北京试点新促销策略，用上海+广州+深圳的历史数据加权组合，构造一个假北京作为对照。</p>`,
  },
  {
    id: "deep-20", day: 20, week: 4, track: "deep", duration: 120,
    title: "CausalImpact：Google 贝叶斯反事实",
    description: "用贝叶斯结构时序模型估计干预的因果效应，自动输出置信区间。",
    objectives: ["用 CausalImpact 一行代码评估", "解读结果图"],
    cues: ["Q: CausalImpact 的置信区间怎么读？"],
    content: `<pre><code class="language-python">from causalimpact import CausalImpact
ci = CausalImpact(data, pre_period, post_period)
ci.run()
print(ci.summary())
ci.plot()</code></pre>`,
  },
  {
    id: "deep-21", day: 21, week: 4, track: "deep", duration: 120,
    title: "工具变量（IV）+ 双阶段最小二乘（2SLS）",
    description: "当存在不可观测的混淆变量时，用工具变量破局。",
    objectives: ["理解工具变量的有效性条件", "用 linearmodels 实现 2SLS"],
    cues: ["Q: 工具变量要满足哪两个条件？"],
    content: `<p><strong>两个条件：</strong> (1) 相关性：工具变量影响处理 (2) 外生性：工具变量不通过其他路径影响结果</p>`,
  },
  {
    id: "deep-22", day: 22, week: 4, track: "deep", duration: 120,
    title: "Week 4 复习 + 因果三角验证案例",
    description: "用 DID + 合成控制 + CausalImpact 三种方法同时验证一个促销效果。",
    objectives: ["三角验证的思路"],
    cues: ["Q: 三个方法结论不一致怎么办？"],
    content: `<p><strong>三角验证：</strong> 如果三个独立方法都得到类似结论，可信度大大提高。</p>`,
  },
  {
    id: "deep-23", day: 23, week: 5, track: "deep", duration: 150,
    title: "DoubleML：双重机器学习去偏",
    description: "微软开源的因果 ML 库。用两个 ML 模型分别估计处理和结果，再去偏。",
    objectives: ["理解 DoubleML 的交叉拟合", "用 DoubleML 库实现"],
    cues: ["Q: DoubleML 为什么比传统回归好？"],
    content: `<pre><code class="language-python">from doubleml import DoubleMLPLR
import doubleml as dml
dml_data = dml.DoubleMLData(df, y_col='sales', d_cols='promo', x_cols=features)
ml_l = lgb.LGBMRegressor()
ml_m = lgb.LGBMRegressor()
dml_plr = DoubleMLPLR(dml_data, ml_l, ml_m)
dml_plr.fit()
print(dml_plr.summary)</code></pre>`,
    resources: [{ label: "DoubleML 文档", url: "https://docs.doubleml.org/" }],
  },
  {
    id: "deep-24", day: 24, week: 5, track: "deep", duration: 120,
    title: "营销组合建模（MMM）整体框架",
    description: "评估多个媒体渠道（电视/搜索/社交/促销）各自对销量的贡献。",
    objectives: ["理解 MMM 的整体框架", "理解 Adstock 衰减和饱和曲线"],
    cues: ["Q: 为什么广告效果会衰减？"],
    content: `<p><strong>MMM 核心公式：</strong> Sales = α + β₁·Adstock(TV) + β₂·Adstock(Search) + ... + 季节性 + 趋势</p>`,
  },
  {
    id: "deep-25", day: 25, week: 5, track: "deep", duration: 150,
    title: "Meta Robyn 实战：开源 MMM 工业级实现",
    description: "Meta 开源的 Robyn 是 MMM 的标杆工具。用真实数据跑一次完整的营销 ROI 分析。",
    objectives: ["用 Robyn 跑一次完整 MMM", "解读 ROI 报告", "做预算最优分配"],
    cues: ["Q: Robyn 怎么处理多渠道数据？"],
    content: `<pre><code class="language-python">from robyn import Robyn
r = Robyn()
r.import_data('marketing_data.csv')
r.run()
r.plot_roi()</code></pre>
<p><strong>本地资源：</strong> books/robyn-mmm/ 有完整 demo 和案例</p>`,
    resources: [{ label: "Meta Robyn GitHub", url: "https://github.com/facebookexperimental/Robyn" }],
  },
  {
    id: "deep-26", day: 26, week: 5, track: "deep", duration: 120,
    title: "uplift Modeling：找对促销敏感的人",
    description: "不是所有人都对促销敏感。uplift modeling 找出被促销打动才会买的人群。",
    objectives: ["理解 S/T/X/L Learner", "用 CausalML 实现 uplift"],
    cues: ["Q: uplift 和普通分类模型区别？"],
    content: `<p><strong>四类人群：</strong> (1) Sure Things：买不买都买 (2) Persuadables：促销才买 ← 目标 (3) Lost Causes：促销也不买 (4) Sleeping Dogs：促销反而不买</p>`,
  },
  {
    id: "deep-27", day: 27, week: 5, track: "deep", duration: 120,
    title: "Week 5 复习 + 贝叶斯 MMM（PyMC）",
    description: "用 PyMC 实现贝叶斯 MMM——给 ROI 估计附带置信区间。统计学穿插补：贝叶斯推断。",
    objectives: ["理解贝叶斯 MMM 的优势", "用 PyMC 写简单版本"],
    cues: ["Q: 贝叶斯 MMM 比传统 MMM 好在哪？"],
    content: `<p><strong>统计学穿插补：</strong> 贝叶斯推断的核心是 P(θ|D) ∝ P(D|θ) × P(θ)。</p>`,
  },
  {
    id: "deep-28", day: 28, week: 6, track: "deep", duration: 120,
    title: "Geo Lift Test + Switchback 实验",
    description: "当无法做个体级 A/B 测试时，用地理区域做实验。",
    objectives: ["设计 Geo Lift Test", "理解 Switchback 实验"],
    cues: ["Q: Geo Lift 和个体 A/B 的区别？"],
    content: `<p><strong>Geo Lift：</strong> 选 3 个城市做促销，3 个城市做对照。</p>`,
  },
  {
    id: "deep-29", day: 29, week: 6, track: "deep", duration: 120,
    title: "贝叶斯 A/B 测试 + 序贯检验",
    description: "贝叶斯 A/B 测试可以随时停止，不需要预设样本量。",
    objectives: ["贝叶斯 A/B vs 频率派 A/B", "序贯检验的实现"],
    cues: ["Q: 为什么贝叶斯 A/B 可以随时停？"],
    content: ``,
  },
  {
    id: "deep-30", day: 30, week: 6, track: "deep", duration: 120,
    title: "EconML + 高维混淆变量控制",
    description: "微软 EconML 库。当混淆变量有几十上百个时，用 ML 方法控制。",
    objectives: ["用 EconML 实现异质效应估计", "理解 Causal Forest"],
    cues: ["Q: EconML 和 DoubleML 区别？"],
    content: ``,
    resources: [{ label: "EconML 文档", url: "https://econml.azurewebsites.net/" }],
  },
  {
    id: "deep-31", day: 31, week: 6, track: "deep", duration: 180,
    title: "🏆 P4 毕业项目启动：完整营销 ROI 归因系统",
    description: "用真实（或模拟）营销数据，用 DID + CausalImpact + DoubleML + MMM 四种方法构建完整 ROI 归因系统。",
    objectives: ["整合 4 种因果方法", "产出 ROI 报告 + 预算建议"],
    cues: ["Q: 四种方法结论如何调和？"],
    content: `<p><strong>交付物：</strong> 营销 ROI 归因报告（含方法对比 + ROI 估计 + 预算最优分配建议）</p>`,
  },
  {
    id: "deep-32", day: 32, week: 6, track: "deep", duration: 180,
    title: "P4 毕业项目 Day 2：数据准备 + 特征",
    description: "清洗营销数据，构造 Adstock/Hill/季节性特征。",
    objectives: [], cues: [], content: ``,
  },
  {
    id: "deep-33", day: 33, week: 6, track: "deep", duration: 180,
    title: "P4 毕业项目 Day 3：四种因果方法实现",
    description: "DID + CausalImpact + DoubleML + MMM 四路并行实现。",
    objectives: [], cues: [], content: ``,
  },
  {
    id: "deep-34", day: 34, week: 6, track: "deep", duration: 180,
    title: "P4 毕业项目 Day 4：报告 + 可视化",
    description: "整合四种方法结论，产出业务可读的 ROI 报告。",
    objectives: [], cues: [], content: ``,
  },
  {
    id: "deep-35", day: 35, week: 6, track: "deep", duration: 120,
    title: "🏆 P4 阶段总结：因果分析能力地图",
    description: "P4 毕业项目答辩 + 因果分析方法选型决策树。",
    objectives: ["建立因果方法选型决策树", "作品集整理"],
    cues: ["Q: 不同场景选哪个因果方法？"],
    content: `<p><strong>P4 交付物：</strong> 完整营销 ROI 归因系统</p>
<p><strong>下一个阶段：</strong> P5 库存补货</p>`,
  },

  // ============================================================
  // P5 库存补货（Day 36-55，20 天，⭐⭐⭐ 重点）
  // ============================================================

  {
    id: "deep-36", day: 36, week: 7, track: "deep", duration: 120,
    title: "P5 启动 · 库存理论：EOQ / 安全库存 / 服务水准",
    description: "预测的最终归宿是补货决策。库存理论是供应链的核心。",
    objectives: ["理解 EOQ 经济订货量", "计算安全库存", "设定服务水准"],
    cues: ["Q: EOQ 公式的假设是什么？", "Q: 服务水准 95% 意味着什么？"],
    content: `<h3>EOQ 公式</h3>
<p>Q* = √(2DS/H)，其中 D=年需求，S=每次订货成本，H=单位持有成本</p>
<h3>安全库存</h3>
<p>SS = Z × σ × √L，其中 Z=服务水准对应的标准差倍数，σ=需求标准差，L=提前期</p>`,
  },
  {
    id: "deep-37", day: 37, week: 7, track: "deep", duration: 150,
    title: "SARIMA 数学严格版（用到时补）",
    description: "前 15 天用 statsforecast 一键跑了 SARIMA，这里补数学严格版。",
    objectives: ["理解差分方程", "理解 Box-Jenkins 方法论", "看懂 ACF/PACF"],
    cues: ["Q: ACF 怎么读？", "Q: 季节差分 D 怎么定？"],
    content: `<p><strong>统计学穿插补：</strong> SARIMA(p,d,q)(P,D,Q,m) 的 7 个参数含义。</p>`,
    resources: [{ label: "Hyndman FPP3 第 8-9 章 ARIMA", url: "https://otexts.com/fpp3/arima.html" }],
  },
  {
    id: "deep-38", day: 38, week: 7, track: "deep", duration: 120,
    title: "SARIMAX：带外生变量的 SARIMA",
    description: "加入促销/节假日/天气等外生变量，让 SARIMA 更准。",
    objectives: ["用 SARIMAX 加入外生变量"],
    cues: ["Q: 外生变量怎么选？"],
    content: ``,
  },
  {
    id: "deep-39", day: 39, week: 7, track: "deep", duration: 120,
    title: "(s, S) / (r, Q) 补货策略",
    description: "工业级补货策略：什么时候补，补多少。",
    objectives: ["理解 (s,S) 策略", "理解 (r,Q) 策略"],
    cues: ["Q: s 和 S 怎么定？"],
    content: `<p><strong>(s,S) 策略：</strong> 当库存降到 s 时，补到 S。</p>
<p><strong>(r,Q) 策略：</strong> 每隔 r 天检查，补固定数量 Q。</p>`,
  },
  {
    id: "deep-40", day: 40, week: 7, track: "deep", duration: 120,
    title: "多级库存优化（Multi-Echelon）",
    description: "仓库 → 门店 → 货架的协同优化。",
    objectives: ["理解牛鞭效应", "多级库存的协同方法"],
    cues: ["Q: 牛鞭效应怎么缓解？"],
    content: ``,
  },
  {
    id: "deep-41", day: 41, week: 7, track: "deep", duration: 120,
    title: "S&OP 销售运营计划的量化",
    description: "把销量预测接到财务和产能。",
    objectives: ["理解 S&OP 流程"],
    cues: ["Q: S&OP 的输入输出是什么？"],
    content: ``,
  },
  {
    id: "deep-42", day: 42, week: 7, track: "deep", duration: 120,
    title: "Week 7 复习 + 库存仿真",
    description: "用模拟仿真验证补货策略的效果。",
    objectives: ["写一个简单的库存仿真器"],
    cues: ["Q: 仿真怎么评估策略？"],
    content: ``,
  },
  {
    id: "deep-43", day: 43, week: 8, track: "deep", duration: 150,
    title: "概率预测：分位数 LightGBM",
    description: "不只预测一个值，预测销量的整个分布——库存决策需要区间。",
    objectives: ["理解分位数回归", "用 LightGBM 做概率预测", "计算 Pinball Loss"],
    cues: ["Q: 为什么库存需要概率预测？"],
    content: `<pre><code class="language-python">model = lgb.LGBMRegressor(objective='quantile', alpha=0.05)
model.fit(X_train, y_train)
pred_lower = model.predict(X_val)</code></pre>`,
  },
  {
    id: "deep-44", day: 44, week: 8, track: "deep", duration: 150,
    title: "DeepAR：Amazon 概率预测 SOTA（GPU 辅助）",
    description: "Amazon 的概率预测模型。这一节需要 GPU——切换到 Colab 跑。",
    objectives: ["理解 DeepAR 的自回归结构", "在 Colab 上跑 DeepAR"],
    cues: ["Q: 什么时候用 Colab？"],
    content: `<p><strong>工具链切换：</strong> 这是第一个需要 GPU 的内容。打开 Colab，选 T4 GPU runtime。</p>`,
  },
  {
    id: "deep-45", day: 45, week: 8, track: "deep", duration: 120,
    title: "贝叶斯推断 + PyMC（用到时补）",
    description: "概率预测的底层是贝叶斯。用 PyMC 做贝叶斯时序预测。",
    objectives: ["用 PyMC 写贝叶斯线性回归", "理解 MCMC 的直觉"],
    cues: ["Q: MCMC 为什么慢？"],
    content: `<p><strong>统计学穿插补：</strong> MCMC 是从后验分布采样的算法。</p>`,
  },
  {
    id: "deep-46", day: 46, week: 8, track: "deep", duration: 150,
    title: "强化学习补货入门",
    description: "Amazon 最新论文在用 RL 做库存控制。让 AI 自己学最优补货策略。",
    objectives: ["理解 RL 的状态/动作/奖励", "用简单 RL 做补货"],
    cues: ["Q: RL 补货的奖励怎么设计？"],
    content: `<p><strong>本地资源：</strong> books/sutton-barto-rl-intro.pdf 是 RL 圣经。</p>`,
  },
  {
    id: "deep-47", day: 47, week: 8, track: "deep", duration: 120,
    title: "新品冷启动：相似品迁移 + Chronos 零样本",
    description: "新品没有历史数据怎么预测？用相似品迁移 + Chronos 零样本。",
    objectives: ["相似品迁移方法", "用 Chronos 零样本预测新品"],
    cues: ["Q: 新品怎么找相似品？"],
    content: ``,
  },
  {
    id: "deep-48", day: 48, week: 8, track: "deep", duration: 120,
    title: "间断性需求：Croston / TSB",
    description: "慢销品的销量断断续续——传统方法失效，需要 Croston 算法。",
    objectives: ["理解间断性需求的特点", "用 Croston / TSB 算法"],
    cues: ["Q: 为什么 Croston 把需求和间隔分开预测？"],
    content: ``,
  },
  {
    id: "deep-49", day: 49, week: 9, track: "deep", duration: 120,
    title: "缺货需求还原（Censored Demand）",
    description: "卖断货不等于没需求——需要还原真实需求。",
    objectives: ["理解 censored demand", "用统计方法还原"],
    cues: ["Q: 怎么知道卖断货时的真实需求？"],
    content: ``,
  },
  {
    id: "deep-50", day: 50, week: 9, track: "deep", duration: 180,
    title: "🏆 P5 毕业项目启动：端到端库存优化系统",
    description: "整合预测 + 库存 + 因果，构建完整的供应链决策系统。这是你最大的作品。",
    objectives: ["端到端系统架构", "整合 100 天学的所有方法"],
    cues: ["Q: 系统怎么模块化？"],
    content: `<p><strong>交付物：</strong> 端到端供应链决策系统（预测 → 概率区间 → 库存决策 → ROI 评估）</p>`,
  },
  {
    id: "deep-51", day: 51, week: 9, track: "deep", duration: 180,
    title: "毕业项目 Day 2：数据 + 特征 + 预测模块",
    description: "实现销量预测模块（LightGBM + 概率预测）。",
    objectives: [], cues: [], content: ``,
  },
  {
    id: "deep-52", day: 52, week: 9, track: "deep", duration: 180,
    title: "毕业项目 Day 3：库存决策模块",
    description: "实现 (s,S) 补货策略 + 安全库存计算 + 仿真验证。",
    objectives: [], cues: [], content: ``,
  },
  {
    id: "deep-53", day: 53, week: 9, track: "deep", duration: 180,
    title: "毕业项目 Day 4：因果归因模块",
    description: "整合 P4 的因果方法，评估促销对销量的影响。",
    objectives: [], cues: [], content: ``,
  },
  {
    id: "deep-54", day: 54, week: 9, track: "deep", duration: 180,
    title: "毕业项目 Day 5：API + Dashboard",
    description: "用 FastAPI 包装系统，用 Plotly/Dash 做 Dashboard。",
    objectives: [], cues: [], content: ``,
  },
  {
    id: "deep-55", day: 55, week: 9, track: "deep", duration: 120,
    title: "🏆 P5 毕业总结：从预测到决策",
    description: "P5 毕业项目答辩 + 供应链决策能力地图。",
    objectives: ["作品集整理", "能力地图"],
    cues: ["Q: 系统的核心价值是什么？"],
    content: `<p><strong>P5 交付物：</strong> 端到端供应链决策系统</p>
<p><strong>下一个阶段：</strong> P6 Agent 自动化</p>`,
  },

  // ============================================================
  // P6 Agent 自动化（Day 56-75，20 天）
  // ============================================================

  {
    id: "deep-56", day: 56, week: 10, track: "deep", duration: 120,
    title: "P6 启动 · 软件工程基础",
    description: "写出能上线的代码——Git/代码规范/测试。",
    objectives: ["Git 工作流", "代码规范", "单元测试"],
    cues: ["Q: 为什么需要测试？"],
    content: ``,
  },
  {
    id: "deep-57", day: 57, week: 10, track: "deep", duration: 150,
    title: "Docker 容器化",
    description: "一次构建处处运行。",
    objectives: ["写 Dockerfile", "理解镜像和容器"],
    cues: ["Q: Docker 解决什么问题？"],
    content: ``,
  },
  {
    id: "deep-58", day: 58, week: 10, track: "deep", duration: 150,
    title: "FastAPI 模型服务化",
    description: "把 P5 的系统变成 API。",
    objectives: ["用 FastAPI 包装模型", "理解 RESTful API"],
    cues: ["Q: API 的好处是什么？"],
    content: ``,
  },
  {
    id: "deep-59", day: 59, week: 10, track: "deep", duration: 120,
    title: "MLflow 实验追踪",
    description: "管理上百次实验——参数/指标/模型版本。",
    objectives: ["用 MLflow 记录实验"],
    cues: ["Q: MLflow 解决什么问题？"],
    content: ``,
  },
  {
    id: "deep-60", day: 60, week: 10, track: "deep", duration: 120,
    title: "Airflow / Prefect 流水线编排",
    description: "定时跑批预测。",
    objectives: ["用 Airflow 编写 DAG"],
    cues: ["Q: 为什么需要流水线编排？"],
    content: ``,
  },
  {
    id: "deep-61", day: 61, week: 11, track: "deep", duration: 120,
    title: "监控与告警 + 数据漂移",
    description: "模型上线后会变差——需要监控。",
    objectives: ["监控模型性能", "检测数据漂移和概念漂移"],
    cues: ["Q: 数据漂移和概念漂移区别？"],
    content: ``,
  },
  {
    id: "deep-62", day: 62, week: 11, track: "deep", duration: 120,
    title: "Week 10 复习 + MLOps 全景图",
    description: "整合 Docker/FastAPI/MLflow/Airflow——完整的 MLOps 链路。",
    objectives: ["MLOps 全景理解"],
    cues: ["Q: MLOps 的核心环节有哪些？"],
    content: ``,
  },
  {
    id: "deep-63", day: 63, week: 11, track: "deep", duration: 150,
    title: "LangGraph：图式 Agent 编排",
    description: "2024-2026 最大趋势——用图结构编排多个 AI Agent。",
    objectives: ["理解 LangGraph 的节点和边", "写一个简单的 Agent 工作流"],
    cues: ["Q: LangGraph 比 LangChain 好在哪？"],
    content: ``,
    resources: [{ label: "LangGraph 文档", url: "https://langchain-ai.github.io/langgraph/" }],
  },
  {
    id: "deep-64", day: 64, week: 11, track: "deep", duration: 150,
    title: "RD-Agent：微软自动挖因子闭环",
    description: "微软开源的 Agent——自动挖因子 → 回测 → 迭代。这是 SOTA。",
    objectives: ["理解 RD-Agent 的架构", "跑一次 RD-Agent"],
    cues: ["Q: RD-Agent 怎么自动迭代？"],
    content: ``,
    resources: [{ label: "RD-Agent GitHub", url: "https://github.com/microsoft/RD-Agent" }],
  },
  {
    id: "deep-65", day: 65, week: 11, track: "deep", duration: 120,
    title: "Multi-Agent 投研框架",
    description: "多个 Agent 协作——一个挖因子，一个回测，一个出报告。",
    objectives: ["理解多 Agent 协作"],
    cues: ["Q: 多 Agent 怎么分工？"],
    content: ``,
  },
  {
    id: "deep-66", day: 66, week: 12, track: "deep", duration: 120,
    title: "AutoML 全流程：H2O / AutoGluon",
    description: "一键建模——从数据到模型全自动。",
    objectives: ["用 AutoGluon 一键建模"],
    cues: ["Q: AutoML 能替代分析师吗？"],
    content: ``,
  },
  {
    id: "deep-67", day: 67, week: 12, track: "deep", duration: 120,
    title: "A/B 测试设计 + 统计显著性",
    description: "证明你的模型真的有用。",
    objectives: ["设计 A/B 测试", "计算样本量"],
    cues: ["Q: A/B 测试需要多少样本？"],
    content: ``,
  },
  {
    id: "deep-68", day: 68, week: 12, track: "deep", duration: 120,
    title: "Week 12 复习 + Agent 案例",
    description: "整合 Agent 框架——从数据到报告全自动。",
    objectives: [], cues: [], content: ``,
  },
  {
    id: "deep-69", day: 69, week: 12, track: "deep", duration: 180,
    title: "🏆 P6 毕业项目启动：Agent 化决策系统",
    description: "把 P4 + P5 的系统用 Agent 串起来——AI 自动跑预测 → 因果分析 → 出报告。",
    objectives: ["整合 Agent + P4 P5 系统"],
    cues: [],
    content: `<p><strong>交付物：</strong> Agent 化决策系统</p>`,
  },
  {
    id: "deep-70", day: 70, week: 12, track: "deep", duration: 180,
    title: "P6 毕业项目 Day 2-3：核心模块开发",
    description: "", objectives: [], cues: [], content: ``,
  },
  {
    id: "deep-71", day: 71, week: 13, track: "deep", duration: 180,
    title: "P6 毕业项目 Day 4-5：UI + 部署",
    description: "", objectives: [], cues: [], content: ``,
  },
  {
    id: "deep-72", day: 72, week: 13, track: "deep", duration: 180,
    title: "P6 毕业项目 Day 6：测试 + 文档",
    description: "", objectives: [], cues: [], content: ``,
  },
  {
    id: "deep-73", day: 73, week: 13, track: "deep", duration: 180,
    title: "P6 毕业项目 Day 7：答辩准备",
    description: "", objectives: [], cues: [], content: ``,
  },
  {
    id: "deep-74", day: 74, week: 13, track: "deep", duration: 180,
    title: "🏆 P6 毕业答辩：Agent 化决策系统",
    description: "答辩 + 作品集整理。",
    objectives: [], cues: [], content: ``,
  },
  {
    id: "deep-75", day: 75, week: 13, track: "deep", duration: 120,
    title: "100 天中程复盘：能力盘点 + 下一步规划",
    description: "盘点前 75 天学到的能力，规划后 25 天的方向。",
    objectives: ["能力地图", "选毕业项目方向"],
    cues: ["Q: 你最擅长哪个领域？"],
    content: `<p><strong>下一个阶段：</strong> 选修深化（因子 / 电力 / 大宗）+ 最终毕业项目</p>`,
  },

  // ============================================================
  // 选修 + 最终毕业项目（Day 76-100，25 天）
  // ============================================================

  // ── 因子挖掘（Day 76-82）──
  {
    id: "deep-76", day: 76, week: 14, track: "deep", duration: 120,
    title: "选修 · 因子挖掘启动：什么是因子",
    description: "因子是能预测目标且有经济学含义的变量。",
    objectives: ["理解因子的三个必要条件", "区分因子和特征"],
    cues: ["Q: 因子和特征的区别？"],
    content: ``,
  },
  {
    id: "deep-77", day: 77, week: 14, track: "deep", duration: 120,
    title: "IC（信息系数）+ ICIR",
    description: "评估因子预测力的核心指标。",
    objectives: ["计算 IC/ICIR", "理解有效因子的阈值"],
    cues: ["Q: IC 多少算有效？"],
    content: ``,
  },
  {
    id: "deep-78", day: 78, week: 14, track: "deep", duration: 120,
    title: "因子衰减 + 换手 + 相关性矩阵",
    description: "评估因子的稳定性和独立性。",
    objectives: ["分析因子衰减", "计算因子相关性"],
    cues: ["Q: 因子衰减快说明什么？"],
    content: ``,
  },
  {
    id: "deep-79", day: 79, week: 14, track: "deep", duration: 120,
    title: "供应链因子设计 + RD-Agent 深入",
    description: "为供应链场景设计专属因子，用 RD-Agent 自动挖掘。",
    objectives: ["设计供应链因子", "用 RD-Agent 自动挖因子"],
    cues: ["Q: 供应链场景有哪些独特因子？"],
    content: ``,
  },
  {
    id: "deep-80", day: 80, week: 14, track: "deep", duration: 120,
    title: "因子组合 + 正交化 + 风险控制",
    description: "把多个因子组合成最终的预测信号。",
    objectives: ["因子正交化", "组合优化"],
    cues: ["Q: 为什么需要正交化？"],
    content: ``,
  },
  {
    id: "deep-81", day: 81, week: 14, track: "deep", duration: 120,
    title: "因子失效预警 + 变点检测",
    description: "因子会失效——需要监控和预警。",
    objectives: ["检测因子失效", "变点检测方法"],
    cues: ["Q: 怎么发现因子失效了？"],
    content: ``,
  },
  {
    id: "deep-82", day: 82, week: 14, track: "deep", duration: 120,
    title: "因子阶段总结 + 作品整理",
    description: "", objectives: [], cues: [], content: ``,
  },

  // ── 电力市场（Day 83-88）──
  {
    id: "deep-83", day: 83, week: 15, track: "deep", duration: 120,
    title: "选修 · 电力市场结构入门",
    description: "日前市场/实时市场/辅助服务市场。",
    objectives: ["理解电力市场结构"],
    cues: ["Q: 日前市场和实时市场区别？"],
    content: ``,
  },
  {
    id: "deep-84", day: 84, week: 15, track: "deep", duration: 150,
    title: "电价预测：TFT + PatchTST（GPU 辅助）",
    description: "Google TFT 和 PatchTST 是电力预测 SOTA。需要在 Colab 跑。",
    objectives: ["用 TFT 预测电价", "用 PatchTST"],
    cues: ["Q: TFT 为什么可解释？"],
    content: ``,
  },
  {
    id: "deep-85", day: 85, week: 15, track: "deep", duration: 150,
    title: "电力调度优化：Gurobi + Pyomo",
    description: "用数学规划求解调度最优解。",
    objectives: ["用 Pyomo 建模", "用 Gurobi 求解"],
    cues: ["Q: 调度优化的目标函数是什么？"],
    content: ``,
  },
  {
    id: "deep-86", day: 86, week: 15, track: "deep", duration: 120,
    title: "电力双层规划 + 预测优化级联",
    description: "先预测电价，再优化调度——两层级联。",
    objectives: ["理解双层规划", "实现级联"],
    cues: [],
    content: ``,
  },
  {
    id: "deep-87", day: 87, week: 15, track: "deep", duration: 120,
    title: "可再生能源预测 + 虚拟电厂",
    description: "风电/光伏预测 + VPP 聚合。",
    objectives: [], cues: [], content: ``,
  },
  {
    id: "deep-88", day: 88, week: 15, track: "deep", duration: 120,
    title: "电力阶段总结 + 跨场景迁移",
    description: "", objectives: [], cues: [], content: ``,
  },

  // ── 大宗商品（Day 89-92）──
  {
    id: "deep-89", day: 89, week: 16, track: "deep", duration: 120,
    title: "选修 · 大宗商品市场入门",
    description: "铜/铝/原油/农产品。",
    objectives: ["理解大宗商品市场结构"],
    cues: [],
    content: ``,
  },
  {
    id: "deep-90", day: 90, week: 16, track: "deep", duration: 120,
    title: "商品因子 + 周期分析",
    description: "大宗商品的周期性特征。",
    objectives: [], cues: [], content: ``,
  },
  {
    id: "deep-91", day: 91, week: 16, track: "deep", duration: 120,
    title: "套保策略 + Monte Carlo 回测",
    description: "用 Monte Carlo 模拟检验套保策略的稳健性。",
    objectives: [], cues: [], content: ``,
  },
  {
    id: "deep-92", day: 92, week: 16, track: "deep", duration: 120,
    title: "大宗商品 + Agent + 风险预算",
    description: "用 Agent 框架做商品量化。",
    objectives: [], cues: [], content: ``,
  },

  // ── ARIMA 附录（Day 93-94）──
  {
    id: "deep-93", day: 93, week: 16, track: "deep", duration: 120,
    title: "【附录】ARIMA 家族数学严格版（选修）",
    description: "前 15 天用 statsforecast 一键跑了。这里补严格数学——给想深挖的人。",
    objectives: ["Box-Jenkins 方法论", "ACF/PACF 数学", "SARIMA 严格推导"],
    cues: ["Q: 为什么只做选修？因为 statsforecast 已经替代了手动调参"],
    content: `<p><strong>为什么放附录：</strong> 现代 AutoARIMA 库已经能自动选参，手动调参的价值在下降。</p>`,
    resources: [{ label: "Hyndman FPP3 完整时序理论", url: "https://otexts.com/fpp3/" }],
  },
  {
    id: "deep-94", day: 94, week: 16, track: "deep", duration: 120,
    title: "【附录】GARCH 波动率建模（选修）",
    description: "波动率建模——金融场景常用。",
    objectives: ["理解 GARCH", "用 arch 库实现"],
    cues: [],
    content: ``,
  },

  // ── 最终毕业项目（Day 95-100）──
  {
    id: "deep-95", day: 95, week: 17, track: "deep", duration: 180,
    title: "🎯 最终毕业项目：选场景深化",
    description: "从因子/电力/大宗三个方向选一个深化，做最终毕业项目。",
    objectives: ["选定场景", "制定方案"],
    cues: ["Q: 你最想深化哪个方向？"],
    content: `<p><strong>三个选项：</strong></p>
<ul><li>A · 供应链全栈（对口你的工作）</li>
<li>B · 电力市场量化</li>
<li>C · 大宗商品 + Agent</li></ul>`,
  },
  {
    id: "deep-96", day: 96, week: 17, track: "deep", duration: 180,
    title: "最终毕业项目：开发 + AI 辅助",
    description: "用 AI 原生方式开发最终项目。",
    objectives: [], cues: [], content: ``,
  },
  {
    id: "deep-97", day: 97, week: 17, track: "deep", duration: 180,
    title: "最终毕业项目：打磨 + 文档",
    description: "", objectives: [], cues: [], content: ``,
  },
  {
    id: "deep-98", day: 98, week: 17, track: "deep", duration: 180,
    title: "最终毕业项目：测试 + 部署",
    description: "", objectives: [], cues: [], content: ``,
  },
  {
    id: "deep-99", day: 99, week: 17, track: "deep", duration: 180,
    title: "🎯 毕业答辩：最终项目展示",
    description: "答辩 + 评审。",
    objectives: [], cues: [], content: ``,
  },
  {
    id: "deep-100", day: 100, week: 17, track: "deep", duration: 120,
    title: "🎓 Day 100：毕业 · 能力地图 + 职业路径",
    description: "100 天复盘 + 能力盘点 + 职业规划。",
    objectives: ["能力地图", "职业路径", "持续学习计划"],
    cues: ["Q: 100 天后你成为了什么样的人？"],
    content: `<h3>100 天后的能力地图</h3>
<ul>
<li><strong>统计 + Python：</strong> 工业级数据处理 + 模型训练</li>
<li><strong>因果归因：</strong> 回答促销广告到底有没有效</li>
<li><strong>库存决策：</strong> 从预测到补货的完整链路</li>
<li><strong>Agent 自动化：</strong> AI 跑流水线</li>
<li><strong>选修深化：</strong> 因子 / 电力 / 大宗（选一）</li>
</ul>
<p><strong>恭喜！你已经是工业级量化分析师了。</strong></p>`,
  },
];
