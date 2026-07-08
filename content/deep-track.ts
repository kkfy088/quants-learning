import type { DayContent } from "@/lib/types";

// ════════════════════════════════════════════════════════════
// 100 天深化轨 · v3.0 业务优先级版（P4→P5→P6→因子→电力大宗）
//   Day 1-5    承上启下 + 时序快速过 + 因果入门
//   Day 6-25   ★ P4 因果归因 / 营销评估（20 天，重点）
//   Day 26-45  ★ P5 库存与补货决策（20 天，重点）
//   Day 46-65  P6 Agent + 毕业项目（20 天）
//   Day 66-80  因子挖掘深化（15 天）
//   Day 81-100 电力 + 大宗商品业务（20 天，扩展视野）
// 5 天速成（crash-course.ts）独立成轨，此轨 Day 1 接在 5 天之后。
// 统计学（SARIMA / 贝叶斯 / 协整）穿插在用到时补。
// ════════════════════════════════════════════════════════════

export const deepDays: DayContent[] = [
  // ───────────────────────────────────────────────────────────
  // Day 1-5 · 承上启下：5 天速成回顾 + 因果思维建立
  // ───────────────────────────────────────────────────────────
  {
    id: "deep-1", day: 1, week: 1, track: "deep",
    title: "5 天速成回顾 + 100 天路线图",
    description: "承上启下，建立 100 天的业务优先级学习节奏",
    objectives: [
      "复盘 5 天速成掌握的内容（数学/pandas/Boosting/ARIMA/工具）",
      "理解新路线：P4 因果 → P5 库存 → P6 Agent → 因子 → 电力大宗",
      "明确统计学是『用到时补』而非单独阶段",
    ],
    duration: 30,
    cues: [
      "5 天速成留下了哪些『会用但不懂为什么』的点？",
      "为什么把 P4 因果放第一？因为它对口你工作中最常被问的问题",
      "统计学（SARIMA/贝叶斯）会穿插在用到时讲",
    ],
    content: `<h3>100 天新路线图（业务优先级）</h3>
<table>
<tr><th>阶段</th><th>天数</th><th>核心问题</th></tr>
<tr><td>承上启下</td><td>Day 1-5</td><td>从『会用』到『懂为什么』</td></tr>
<tr><td>★ P4 因果归因</td><td>Day 6-25</td><td>促销/广告到底拉动多少销量？ROI 是多少？</td></tr>
<tr><td>★ P5 库存补货</td><td>Day 26-45</td><td>该补多少货？什么时候补？</td></tr>
<tr><td>P6 Agent + 毕业</td><td>Day 46-65</td><td>让 AI 自动挖因子、跑回测、出报告</td></tr>
<tr><td>因子挖掘深化</td><td>Day 66-80</td><td>IC / ICIR / RD-Agent 自动化</td></tr>
<tr><td>电力 + 大宗</td><td>Day 81-100</td><td>扩展视野，跨场景迁移</td></tr>
</table>
<h3>为什么 P4 放第一</h3>
<p>你工作中最常被老板问的问题：<em>"这次促销真的有效吗？ROI 是多少？"</em><br>
答案不是看销量涨了多少（那是相关），而是用因果推断算出『如果没有促销会怎样』。<br>
P4 学完，你能回答所有『X 是否导致 Y』的问题。</p>
<div class="ex-box"><h4>✏️ 今日必做</h4>
<ol>
<li>把 5 天速成笔记整理成『已知 / 半知 / 想深入』三栏</li>
<li>列出你工作中最常遇到的 3 个因果归因问题</li>
<li>新建 GitHub repo <code>my-quant-journey</code></li>
</ol></div>`,
  },
  {
    id: "deep-2", day: 2, week: 1, track: "deep",
    title: "时序快速过：ARIMA / SARIMA / LightGBM 复盘",
    description: "把 5 天速成的时序知识系统化",
    objectives: [
      "巩固 ARIMA(p,d,q) / SARIMA(p,d,q)(P,D,Q,m)",
      "巩固 LightGBM 时序化（lag/rolling）",
      "形成时序模型选择决策树",
    ],
    duration: 45,
    cues: [
      "ARIMA 单变量；SARIMA 加季节；SARIMAX 加外生",
      "LightGBM 多变量强，但外推弱",
      "数据量小（&lt;500）→ ARIMA；数据量大（&gt;5000）→ LightGBM",
    ],
    content: `<h3>时序模型选择决策树</h3>
<pre><code>数据量 &lt; 500？
├─ 是 → ARIMA / Prophet / ETS
└─ 否 → 有强季节？
        ├─ 是 → SARIMA / Prophet
        └─ 否 → 多变量？
                ├─ 是 → LightGBM + lag/rolling
                └─ 否 → ARIMA</code></pre>
<h3>关键代码模板</h3>
<pre><code># SARIMA
from pmdarima import auto_arima
model = auto_arima(y, seasonal=True, m=7, stepwise=True)

# LightGBM 时序化
for lag in [1, 7, 14]:
    df[f'lag_{lag}'] = df['y'].shift(lag)
for w in [7, 14]:
    df[f'rmean_{w}'] = df['y'].shift(1).rolling(w).mean()</code></pre>`,
  },
  {
    id: "deep-3", day: 3, week: 1, track: "deep",
    title: "特征工程系统化 + 防泄漏",
    description: "lag/rolling/target encoding/防泄漏检查清单",
    objectives: [
      "掌握 lag/rolling/target encoding 三大特征",
      "理解数据泄漏的 5 种形式",
      "建立特征工程代码模板",
    ],
    duration: 45,
    cues: [
      "lag 必须用历史（lag_1 = 昨天）",
      "rolling 必须先 shift(1) 防泄漏",
      "target encoding 必须 K-fold",
    ],
    content: `<h3>数据泄漏的 5 种形式</h3>
<ol>
<li><strong>未来 lag：</strong>用了『明天的销量』作为今天的特征</li>
<li><strong>滚动泄漏：</strong>rolling 包含当前时刻</li>
<li><strong>目标编码泄漏：</strong>用全量数据算 target encode</li>
<li><strong>训练测试混合：</strong>归一化用了测试集</li>
<li><strong>时间切分错：</strong>用 shuffle=True 切分时序</li>
</ol>
<pre><code># 防泄漏 target encoding
from sklearn.model_selection import KFold
def target_encode_kfold(train, col, target, n_splits=5):
    global_mean = train[target].mean()
    kf = KFold(n_splits=n_splits, shuffle=True, random_state=42)
    encoded = pd.Series(index=train.index, dtype=float)
    for tr_idx, val_idx in kf.split(train):
        agg = train.iloc[tr_idx].groupby(col)[target].mean()
        encoded.iloc[val_idx] = train.iloc[val_idx][col].map(agg).fillna(global_mean)
    return encoded</code></pre>`,
  },
  {
    id: "deep-4", day: 4, week: 1, track: "deep",
    title: "因果 vs 相关：思维范式转换",
    description: "为什么相关≠因果（P4 入门）",
    objectives: [
      "理解潜在结果框架（Neyman-Rubin）",
      "认识混淆变量、选择偏差",
      "建立因果思维的三个核心问题",
    ],
    duration: 45,
    cues: [
      "潜在结果 Y(1) / Y(0)，只能观察一个",
      "ATE = E[Y(1) - Y(0)]",
      "因果三武器：RCT / 自然实验 / 观察数据+假设",
    ],
    content: `<h3>经典案例：冰淇淋与溺水</h3>
<p>冰淇淋销量和溺水人数高度相关，但前者不导致后者——是气温（混淆变量）共同导致。</p>
<h3>潜在结果框架</h3>
<ul>
<li><strong>处理 T：</strong>是否做了某事（如是否促销）</li>
<li><strong>潜在结果：</strong>Y(1) 做的，Y(0) 不做的</li>
<li><strong>事实观察：</strong>Y = T·Y(1) + (1-T)·Y(0)——你只能看到一个</li>
<li><strong>ATE：</strong>E[Y(1) - Y(0)]，可通过实验或方法估计</li>
</ul>
<h3>因果推断三大武器</h3>
<ol>
<li><strong>随机对照实验（RCT）：</strong>金标准，但贵</li>
<li><strong>自然实验：</strong>DID、合成控制、工具变量</li>
<li><strong>观察数据 + 假设：</strong>DoubleML、Propensity Score</li>
</ol>
<div class="ex-box"><h4>✏️ 今日思考</h4>
<p>你工作中遇到的『X 是否导致 Y』问题，能用 RCT 吗？如果不能，需要什么假设？</p></div>`,
  },
  {
    id: "deep-5", day: 5, week: 1, track: "deep",
    title: "DAG 有向无环图：画因果图",
    description: "用图论工具梳理变量关系",
    objectives: [
      "理解 DAG 的节点和有向边",
      "识别混淆变量、中介变量、对撞变量",
      "学会用 backdoor 准则",
    ],
    duration: 45,
    cues: [
      "混淆变量 C → T, C → Y：必须控制",
      "中介变量 T → M → Y：控制 M 会切断真实效应",
      "对撞变量 T → C ← Y：控制 C 引入虚假关联",
    ],
    content: `<h3>三种变量的处理原则</h3>
<table>
<tr><th>类型</th><th>结构</th><th>处理</th></tr>
<tr><td>混淆变量</td><td>C → T, C → Y</td><td>✅ 必须控制</td></tr>
<tr><td>中介变量</td><td>T → M → Y</td><td>⚠️ 看研究问题</td></tr>
<tr><td>对撞变量</td><td>T → C ← Y</td><td>❌ 不能控制</td></tr>
</table>
<h3>Backdoor 准则</h3>
<p>要估计 T 对 Y 的因果效应，必须『关闭』所有从 T 到 Y 的后门路径——通过控制路径上的混淆变量。</p>
<div class="ex-box"><h4>✏️ AI 辅助</h4>
<p>把你的业务场景告诉 AI：<em>"促销影响销量，但还有价格、季节、库存这些变量，帮我画 DAG，识别哪些必须控制。"</em></p></div>`,
  },

  // ───────────────────────────────────────────────────────────
  // ★ P4 · 因果归因 / 营销评估（Day 6-25，20 天重点）
  // ───────────────────────────────────────────────────────────

  // ===== Week 2 · Day 6-12 · 经典因果推断方法 =====
  {
    id: "deep-6", day: 6, week: 2, track: "deep",
    title: "P4 启动 · 双重差分（DID）实战",
    description: "政策/活动效果评估的经典方法",
    objectives: [
      "理解 DID 的『平行趋势假设』",
      "会跑 DID 回归并解释系数",
      "知道 DID 失效的场景",
    ],
    duration: 45,
    cues: [
      "DID = (实验后-实验前) - (对照后-对照前)",
      "平行趋势假设：没处理的话，两组变化趋势一致",
      "DID 系数 = 政策/活动的因果效应",
    ],
    content: `<h3>DID 公式</h3>
<p><code>DID = (Ȳ_T,post - Ȳ_T,pre) - (Ȳ_C,post - Ȳ_C,pre)</code></p>
<pre><code>import statsmodels.formula.api as smf
df['treat_x_post'] = df['treat'] * df['post']
model = smf.ols('销量 ~ treat + post + treat_x_post', data=df).fit()
print(model.params['treat_x_post'])  # DID 估计</code></pre>
<h3>平行趋势检验</h3>
<p>在政策实施前的多期数据上，画两组的趋势图，看是否平行。</p>
<div class="pit-box"><h4>⚠️ DID 三大陷阱</h4>
<ol>
<li>实验组对照组选错（对照组也受溢出效应）</li>
<li>没有平行趋势就直接用</li>
<li>政策时点和其他冲击重合（如同时遇上疫情）</li>
</ol></div>`,
  },
  {
    id: "deep-7", day: 7, week: 2, track: "deep",
    title: "合成控制法（Synthetic Control）",
    description: "DID 的进化版，构造『合成对照组』",
    objectives: [
      "理解合成控制法的权重构造",
      "会跑 SyntheticControl 并画对比图",
      "知道和 DID 的适用差异",
    ],
    duration: 45,
    cues: [
      "合成控制：用多个对照单位的加权组合模拟实验组",
      "权重通过最小化预处理期差异得到",
      "适合『只有一个实验单位』的场景（如某城市试点）",
    ],
    content: `<pre><code>from SyntheticControlMethods import Synth
sc = Synth(df, outcome='销量', id='城市', time='月份',
           treated_unit='试点城市', treated_time='2025-01',
           n_optim=10)
sc.plot(path='synth.png')</code></pre>
<h3>合成控制 vs DID</h3>
<table>
<tr><th></th><th>DID</th><th>合成控制</th></tr>
<tr><td>对照组</td><td>单个或多个，简单平均</td><td>加权组合，最优拟合</td></tr>
<tr><td>适用</td><td>多单位 + 处理</td><td>单单位 + 处理</td></tr>
<tr><td>假设</td><td>平行趋势</td><td>预处理期可拟合</td></tr>
</table>`,
  },
  {
    id: "deep-8", day: 8, week: 2, track: "deep",
    title: "CausalImpact：Google 贝叶斯反事实",
    description: "用贝叶斯结构时序构造『如果没有干预会怎样』",
    objectives: [
      "理解 CausalImpact 的贝叶斯结构时序模型",
      "会跑 CausalImpact 并解读结果图",
      "知道核心假设（对照时间序列）",
    ],
    duration: 45,
    cues: [
      "CausalImpact 用贝叶斯结构时序拟合『反事实』",
      "需要提供 1+ 个对照序列（不受处理影响）",
      "输出：累积效应 / 平均效应 / 置信区间",
    ],
    content: `<pre><code>from causalimpact import CausalImpact
ci = CausalImpact(
    data=df[['目标序列', '对照1', '对照2']],
    pre_period=['2024-01-01', '2025-01-01'],
    post_period=['2025-01-02', '2025-03-01'],
)
ci.run()
ci.plot()
print(ci.summary())</code></pre>
<h3>CausalImpact 三大要素</h3>
<ol>
<li><strong>目标序列：</strong>受处理的时间序列</li>
<li><strong>对照序列：</strong>不受处理但与目标相关的序列</li>
<li><strong>处理时点：</strong>明确的事件发生时间</li>
</ol>`,
  },
  {
    id: "deep-9", day: 9, week: 2, track: "deep",
    title: "工具变量（IV）+ 双阶段最小二乘（2SLS）",
    description: "处理内生性的经典方法",
    objectives: [
      "理解工具变量的两个条件（相关性 + 外生性）",
      "会跑 2SLS 回归",
      "知道在营销场景的应用",
    ],
    duration: 45,
    cues: [
      "IV 必须影响 T 但不直接影响 Y（只通过 T）",
      "2SLS：第一阶段用 IV 预测 T，第二阶段用预测的 T 回归 Y",
      "经典 IV：天气（影响价格但不直接影响销量）",
    ],
    content: `<h3>工具变量的两个条件</h3>
<ol>
<li><strong>相关性：</strong>Cov(Z, T) ≠ 0（IV 和处理相关）</li>
<li><strong>外生性：</strong>Cov(Z, ε) = 0（IV 不直接影响 Y）</li>
</ol>
<pre><code>from linearmodels.iv import IV2SLS
model = IV2SLS.from_formula('销量 ~ 1 + [价格 ~ 天气指数] + 季节', data=df)
result = model.fit()
print(result.summary())</code></pre>
<h3>营销场景的 IV</h3>
<ul>
<li><strong>天气：</strong>影响冰淇淋价格（供给冲击）但不直接影响需求</li>
<li><strong>竞争对手定价：</strong>影响自己定价但不直接决定自己销量</li>
<li><strong>运费波动：</strong>影响终端价格但不影响需求</li>
</ul>`,
  },
  {
    id: "deep-10", day: 10, week: 2, track: "deep",
    title: "Propensity Score Matching（PSM）",
    description: "观察数据的经典匹配法",
    objectives: [
      "理解 Propensity Score 的概念",
      "会跑 PSM 并平衡协变量",
      "知道 PSM 的局限",
    ],
    duration: 45,
    cues: [
      "PS = P(T=1|X)，给定协变量被处理的概率",
      "匹配：找 PS 相似但 T 不同的样本",
      "局限：只能控制观察到的混淆",
    ],
    content: `<pre><code>from sklearn.linear_model import LogisticRegression
from sklearn.neighbors import NearestNeighbors

# 第一步：估计 PS
ps_model = LogisticRegression().fit(X, T)
df['ps'] = ps_model.predict_proba(X)[:, 1]

# 第二步：最近邻匹配
treated = df[df['treat'] == 1]
control = df[df['treat'] == 0]
nn = NearestNeighbors(n_neighbors=1).fit(control[['ps']])
dist, idx = nn.kneighbors(treated[['ps']])
matched_control = control.iloc[idx.flatten()]</code></pre>
<div class="pit-box"><h4>⚠️ PSM 的局限</h4>
<ul>
<li>只能控制观察到的混淆，未观察到的无能为力</li>
<li>高维 X 时 PS 估计难</li>
<li>被 DoubleML 全面取代（Day 12）</li>
</ul></div>`,
  },
  {
    id: "deep-11", day: 11, week: 2, track: "deep",
    title: "Week 2 复习 + 因果三角验证案例",
    description: "用 DID + 合成控制 + CausalImpact 三角验证",
    objectives: [
      "完成一个真实业务场景的因果分析",
      "用三种方法交叉验证结论",
      "产出可交付的报告",
    ],
    duration: 60,
    cues: [
      "三角验证：三种方法结论一致 → 强证据",
      "三角验证：结论不一致 → 方法学有问题",
      "报告：数据 / 方法 / 结果 / 业务建议 / 局限",
    ],
    content: `<h3>项目模板</h3>
<ol>
<li><strong>问题：</strong>某次促销活动到底拉动了多少销量？</li>
<li><strong>数据：</strong>实验组（促销店）+ 对照组（非促销店）× 促销前后各 4 周</li>
<li><strong>方法：</strong>
  <ul>
  <li>DID：检查平行趋势，跑回归</li>
  <li>CausalImpact：用对照店构造反事实</li>
  <li>合成控制：用多店加权拟合</li>
  </ul>
</li>
<li><strong>结果：</strong>三种方法的 ATE 估计 + 置信区间</li>
<li><strong>业务建议：</strong>促销是否值得做？ROI 是多少？</li>
</ol>`,
  },
  {
    id: "deep-12", day: 12, week: 2, track: "deep",
    title: "DoubleML：双重机器学习去偏",
    description: "高维混淆变量的现代化解决方案",
    objectives: [
      "理解 DoubleML 的去偏原理",
      "会跑 DoubleML 估计因果效应",
      "知道和传统 PS / IV 的差异",
    ],
    duration: 45,
    cues: [
      "DoubleML = 两个 ML 模型：一个预测 T，一个预测 Y",
      "用残差做回归，消除混淆偏差",
      "交叉拟合（cross-fitting）防过拟合偏差",
    ],
    content: `<h3>DoubleML 三步</h3>
<ol>
<li>用 ML 拟合 T ~ X，得到 T 的残差</li>
<li>用 ML 拟合 Y ~ X，得到 Y 的残差</li>
<li>用残差对残差做 OLS，得到去偏后的因果效应</li>
</ol>
<pre><code>from econml.dml import LinearDML
model = LinearDML(
    model_y=RandomForestRegressor(),
    model_t=RandomForestClassifier(),
    discrete_treatment=True,
    cv=5,
)
model.fit(Y, T, X=X_conf)
ate = model.ate(X=X_conf)
print(f'平均因果效应: {ate}')</code></pre>
<h3>为什么 DoubleML 比 PSM 强</h3>
<ul>
<li>PSM 只能控制低维混淆，DoubleML 支持高维（几百个变量）</li>
<li>PSM 假设线性，DoubleML 用 ML 自动学非线性</li>
<li>DoubleML 有交叉拟合保证，理论严格</li>
</ul>`,
  },

  // ===== Week 3 · Day 13-19 · 营销组合建模（MMM）+ Robyn =====
  {
    id: "deep-13", day: 13, week: 3, track: "deep",
    title: "营销组合建模（MMM）整体框架",
    description: "Meta Robyn 的理论基础",
    objectives: [
      "理解 MMM 的核心方程",
      "掌握 Adstock 衰减模型",
      "知道 MMM 和归因模型的差异",
    ],
    duration: 45,
    cues: [
      "MMM = Marketing Mix Modeling",
      "销量 = 基线 + Σ Adstock(Hill(媒体_i)) + 季节 + 价格 + ε",
      "归因模型看点击路径，MMM 看预算分配",
    ],
    content: `<h3>MMM 核心方程</h3>
<p><code>销量 = 基线 + Σ Adstock(Hill(媒体_i)) + 季节 + 价格 + ε</code></p>
<h3>Adstock 衰减</h3>
<p>广告效应不会立即消失，会持续衰减。<br>
<code>adstock(t) = spend(t) + λ·adstock(t-1)</code>，λ 是留存率（通常 0.3-0.7）。</p>
<pre><code>def adstock(spend, decay=0.5):
    result, acc = [], 0
    for x in spend:
        acc = x + decay * acc
        result.append(acc)
    return result</code></pre>
<h3>MMM vs 归因模型</h3>
<table>
<tr><th></th><th>MMM</th><th>归因（MTA）</th></tr>
<tr><td>数据粒度</td><td>周/月</td><td>用户级点击流</td></tr>
<tr><td>能见度</td><td>含线下渠道</td><td>仅数字渠道</td></tr>
<tr><td>回答问题</td><td>预算怎么分</td><td>哪个触点贡献大</td></tr>
<tr><td>隐私要求</td><td>低（聚合数据）</td><td>高（Cookie）</td></tr>
</table>`,
  },
  {
    id: "deep-14", day: 14, week: 3, track: "deep",
    title: "Hill 饱和函数 + 拐点识别",
    description: "广告边际效应递减",
    objectives: [
      "理解 Hill 函数的数学形式",
      "掌握半饱和点和陡峭度的意义",
      "知道怎么从历史数据拟合",
    ],
    duration: 45,
    cues: [
      "Hill 函数：response(x) = x^γ / (x^γ + θ^γ)",
      "θ 是半饱和点（达到 50% 效应的投入量）",
      "γ 是陡峭度（γ 越大越像 S 型）",
    ],
    content: `<h3>Hill 函数三种形态</h3>
<ul>
<li><strong>γ &lt; 1：</strong>凹型，前期增长快，后期饱和（典型广告）</li>
<li><strong>γ = 1：</strong>Michaelis-Menten，标准饱和</li>
<li><strong>γ &gt; 1：</strong>S 型，前期慢，中期快，后期饱和</li>
</ul>
<pre><code>import numpy as np
def hill(x, theta=100, gamma=0.8):
    return x**gamma / (x**gamma + theta**gamma)

# 拟合
from scipy.optimize import curve_fit
popt, _ = curve_fit(hill, spend_data, sales_data)
theta_fit, gamma_fit = popt</code></pre>
<div class="ex-box"><h4>✏️ 业务洞察</h4>
<p>找到 θ 后，如果当前投入 &gt;&gt; θ，说明广告已饱和，加预算 ROI 急降；如果 &lt; θ，说明还有空间。</p></div>`,
  },
  {
    id: "deep-15", day: 15, week: 3, track: "deep",
    title: "Meta Robyn 实战",
    description: "工业级 MMM 工具",
    objectives: [
      "会跑 Robyn 自动调参",
      "解读 Robyn 的 Pareto 前沿",
      "知道怎么选最优模型",
    ],
    duration: 60,
    cues: [
      "Robyn = Meta 开源 MMM（R 实现）",
      "用 Nevergrad 自动调参",
      "Pareto 前沿：NRMSE vs Decomposition RSSD",
    ],
    content: `<h3>Robyn 工作流</h3>
<pre><code># R 代码（Robyn 是 R 包）
library(Robyn)
InputCollect &lt;- robyn_inputs(
    dt_input = data,
    dt_holidays = holidays,
    adstock = 'geometric',  # 或 'weibull'
    date_var = 'date',
    dep_var = 'sales',
    dep_var_type = 'revenue',
    prophet_vars = c('trend', 'season', 'holiday'),
    paid_media_spends = c('tv', 'ooh', 'print', 'search', 'facebook'),
    paid_media_vars = c('tv_impressions', ...),
    factor_vars = c('promo'),
    window_start = '2024-01-01',
    window_end = '2025-12-31',
)
OutputModels &lt;- robyn_run(InputCollect, iterations = 2000, trials = 5)
OutputCollect &lt;- robyn_outputs(InputCollect, OutputModels)
robyn_onepagereport(OutputCollect)</code></pre>
<h3>解读 Pareto 前沿</h3>
<p>Robyn 输出多个候选模型，画在『NRMSE（准确度）× RSSD（解释度）』二维图上。<br>
选 Pareto 前沿上的模型，业务解释最合理。</p>`,
  },
  {
    id: "deep-16", day: 16, week: 3, track: "deep",
    title: "预算最优分配",
    description: "把 MMM 结果转化为预算决策",
    objectives: [
      "理解预算分配的约束优化",
      "会跑 Robyn 的预算分配场景",
      "知道边际 ROI 的概念",
    ],
    duration: 45,
    cues: [
      "目标：在固定预算下最大化销量",
      "约束：各渠道预算上下限",
      "边际 ROI = 最后一元投入的回报",
    ],
    content: `<pre><code># Robyn 预算分配
allocator &lt;- robyn_allocator(
    InputCollect,
    OutputCollect,
    select_model = 'best_model_id',
    date_range = 'all',
    total_budget = 1000000,  # 总预算
    scenario = 'max_response',  # 最大化响应
    channel_constr_low = 0.5,  # 各渠道下限 50%
    channel_constr_high = 2,   # 各渠道上限 200%
)</code></pre>
<h3>边际 ROI 曲线</h3>
<p>每个渠道的边际 ROI 随投入递减（Hill 饱和）。最优分配是各渠道的边际 ROI 相等。</p>
<div class="ex-box"><h4>✏️ 业务价值</h4>
<p>典型场景：把 TV 预算的 20% 挪到抖音，整体 ROI 涨 15%。这就是 Robyn 的核心价值。</p></div>`,
  },
  {
    id: "deep-17", day: 17, week: 3, track: "deep",
    title: "贝叶斯 MMM（PyMC 实现）",
    description: "Python 版的 MMM，带不确定性量化",
    objectives: [
      "理解贝叶斯 MMM 的优势",
      "会用 PyMC 搭建贝叶斯 MMM",
      "知道和 Robyn 的差异",
    ],
    duration: 45,
    cues: [
      "贝叶斯：每个参数有分布，不是点估计",
      "能输出『ROI 是 3.2±0.5』而非『ROI 是 3.2』",
      "PyMC-Marketing 是 Python 版 Robyn",
    ],
    content: `<pre><code>import pymc as pm
with pm.Model() as mmm:
    # 媒体渠道的 Adstock + Hill
    adstock_tv = adstock(tv_spend, decay=pm.Beta('decay_tv', 2, 2))
    response_tv = hill(adstock_tv, theta=pm.HalfNormal('theta_tv', 100),
                       gamma=pm.Beta('gamma_tv', 2, 2))
    # ... 其他渠道
    # 基线 + 季节 + 趋势
    baseline = pm.Normal('baseline', mu=1000, sigma=500)
    trend = pm.Normal('trend', mu=0, sigma=10)
    season = fourier_series(dates, periods=[7, 365.25])
    # 似然
    mu = baseline + trend * t + season + response_tv + ...
    sigma = pm.HalfNormal('sigma', 50)
    y = pm.Normal('y', mu=mu, sigma=sigma, observed=sales)
    trace = pm.sample(2000, tune=1000, chains=4, target_accept=0.9)</code></pre>
<h3>贝叶斯 vs Robyn</h3>
<table>
<tr><th></th><th>Robyn（频率派）</th><th>贝叶斯 MMM</th></tr>
<tr><td>输出</td><td>点估计</td><td>分布</td></tr>
<tr><td>不确定性</td><td>置信区间</td><td>可信区间（更直观）</td></tr>
<tr><td>先验利用</td><td>❌</td><td>✅（能融入历史经验）</td></tr>
</table>`,
  },
  {
    id: "deep-18", day: 18, week: 3, track: "deep",
    title: "uplift Modeling：找对促销敏感的人",
    description: "个体处理效应（ITE）估计",
    objectives: [
      "理解 uplift 的概念（处理效应的个体差异）",
      "掌握 S/T/X/L Learner 四种方法",
      "知道 uplift 在营销中的应用",
    ],
    duration: 45,
    cues: [
      "uplift = Y(1) - Y(0) 在个体层面",
      "四类人：必然买/必然不买/促销才买/促销反而不买",
      "目标是找『促销才买』的人",
    ],
    content: `<h3>四种 Learner</h3>
<table>
<tr><th>方法</th><th>思路</th><th>适用</th></tr>
<tr><td>S-Learner</td><td>一个模型，把 T 作为特征</td><td>简单</td></tr>
<tr><td>T-Learner</td><td>两个模型，T=0/T=1 各一个</td><td>样本充足</td></tr>
<tr><td>X-Learner</td><td>T-Learner + 加权修正</td><td>不平衡数据</td></tr>
<tr><td>L-Learner</td><td>结合 DoubleML</td><td>理论严格</td></tr>
</table>
<pre><code>from econml.uplift import XGBRegressor as UpliftXGB
model = UpliftXGB()
model.fit(X, treatment=T, y=Y)
uplift = model.predict(X)</code></pre>
<h3>业务价值</h3>
<p>把 uplift 排序，给 Top 20% 的『促销敏感型』用户发券，比平均发券的 ROI 高 3-5 倍。</p>`,
  },
  {
    id: "deep-19", day: 19, week: 3, track: "deep",
    title: "Week 3 复习 + MMM 案例端到端",
    description: "用真实数据跑完整 Robyn",
    objectives: [
      "完成一个 Robyn 端到端案例",
      "产出预算优化建议报告",
      "形成可复用的代码模板",
    ],
    duration: 90,
    cues: [
      "数据：2 年周度数据 × 5 个媒体渠道",
      "Robyn 自动调参 2000 次",
      "报告含：模型拟合 / Adstock 参数 / 预算优化",
    ],
    content: `<h3>端到端案例流程</h3>
<ol>
<li>准备数据：销量 + 媒体花费 + 价格 + 节假日</li>
<li>跑 Robyn，选出 Pareto 前沿的最优模型</li>
<li>解读每个渠道的 Adstock 衰减率 + Hill 饱和点</li>
<li>计算各渠道的边际 ROI</li>
<li>跑预算优化场景（+20% / -20% 总预算）</li>
<li>产出报告：哪个渠道加投、哪个减投、预期增量</li>
</ol>
<div class="ex-box"><h4>✏️ AI 辅助验收</h4>
<p>把报告发给 AI：<em>"这是我做的 MMM 分析，请像资深营销科学家一样批判：方法论哪里有问题？预算建议是否合理？"</em></p></div>`,
  },

  // ===== Week 4 · Day 20-25 · 实验设计 + P4 毕业 =====
  {
    id: "deep-20", day: 20, week: 4, track: "deep",
    title: "Geo Lift Test + Switchback 实验",
    description: "现代 A/B 测试设计",
    objectives: [
      "理解 Geo Lift Test 的原理",
      "掌握 Switchback 实验设计",
      "知道实验设计的样本量计算",
    ],
    duration: 45,
    cues: [
      "Geo Lift：选地理区域做对照（避免用户溢出）",
      "Switchback：时间轮换处理/对照（适合双边市场）",
      "样本量：MDE / 显著性 / Power",
    ],
    content: `<h3>Geo Lift Test</h3>
<p>问题：用户级 A/B 测试在营销中有『溢出』（朋友推荐、跨设备）。Geo Lift 选城市级对照，避免溢出。</p>
<pre><code># 用 Google 的 GeoLift 包（R）
# library(GeoLift)
# geo_data &lt;- read.csv('sales_by_city.csv')
# results &lt;- GeoLift(Y='sales', data=geo_data,
#                   locations=c('北京','上海','广州'),
#                   effect_size=0.05, treatment_periods=4)</code></pre>
<h3>样本量计算</h3>
<pre><code>from statsmodels.stats.power import tt_solve_power
n = tt_solve_power(effect_size=0.2, alpha=0.05, power=0.8)
print(f'每组需要 {int(n)} 样本')</code></pre>`,
  },
  {
    id: "deep-21", day: 21, week: 4, track: "deep",
    title: "贝叶斯 A/B 测试 + 序贯检验",
    description: "比频率派 A/B 更直观",
    objectives: [
      "理解贝叶斯 A/B 的优势",
      "会算 Beta 分布的胜率",
      "知道序贯检验（不必等到样本量）",
    ],
    duration: 45,
    cues: [
      "频率派：p 值 + 固定样本量",
      "贝叶斯：后验分布 + 胜率",
      "序贯：可以随时停止（无 peeking 问题）",
    ],
    content: `<pre><code>import numpy as np
# A 组：1000 用户，120 转化；B 组：1000，135 转化
samples_a = np.random.beta(121, 881, 100000)
samples_b = np.random.beta(136, 866, 100000)
p_b_better = (samples_b > samples_a).mean()
print(f'B 组胜率: {p_b_better:.1%}')</code></pre>
<h3>贝叶斯 A/B 的业务优势</h3>
<ul>
<li>直接说『B 组更好的概率 95%』——老板能听懂</li>
<li>可以随时停止（无 peeking 问题）</li>
<li>能算『提升幅度』的不确定性</li>
</ul>`,
  },
  {
    id: "deep-22", day: 22, week: 4, track: "deep",
    title: "EconML + SHAP 因果归因",
    description: "把因果效应和特征贡献结合",
    objectives: [
      "会用 EconML 估计异质处理效应（HTE）",
      "结合 SHAP 解释因果效应",
      "知道 Causal Forest 的原理",
    ],
    duration: 45,
    cues: [
      "HTE = 不同人群的处理效应不同",
      "Causal Forest = Random Forest 的因果版",
      "SHAP + Causal Forest = 因果归因图",
    ],
    content: `<pre><code>from econml.dml import CausalForestDML
cf = CausalForestDML(
    model_y=RandomForestRegressor(),
    model_t=RandomForestClassifier(),
    discrete_treatment=True,
    n_estimators=100,
)
cf.fit(Y, T, X=X)
# 估计每个人的 ITE
ite = cf.effect(X)
# 哪些特征影响 ITE？
shap_values = cf.shap_values(X)</code></pre>
<h3>业务应用</h3>
<p>用 Causal Forest 找『对促销最敏感的 SKU 群体』，然后定向投促销。</p>`,
  },
  {
    id: "deep-23", day: 23, week: 4, track: "deep",
    title: "高维混淆变量控制",
    description: "几百个变量时怎么控制混淆",
    objectives: [
      "理解高维混淆的挑战",
      "掌握 Lasso + DoubleML 的组合",
      "知道 Double Selection Lasso",
    ],
    duration: 45,
    cues: [
      "高维：协变量数 &gt; 样本数",
      "Double Selection：分两步 Lasso 选混淆变量",
      "选出的变量再做线性回归",
    ],
    content: `<h3>Double Selection Lasso（Chernozhukov 2015）</h3>
<ol>
<li>用 Lasso 拟合 Y ~ X，选影响 Y 的变量</li>
<li>用 Lasso 拟合 T ~ X，选影响 T 的变量</li>
<li>取并集，作为混淆变量控制</li>
<li>用 OLS 估计因果效应</li>
</ol>
<pre><code>from sklearn.linear_model import LassoCV
lasso_y = LassoCV().fit(X, Y)
selected_y = X.columns[lasso_y.coef_ != 0]
lasso_t = LassoCV().fit(X, T)
selected_t = X.columns[lasso_t.coef_ != 0]
controls = list(set(selected_y) | set(selected_t))
# 用选出的控制变量做 OLS
import statsmodels.api as sm
model = sm.OLS(Y, sm.add_constant(df[controls + ['T']])).fit()</code></pre>`,
  },
  {
    id: "deep-24", day: 24, week: 4, track: "deep",
    title: "P4 毕业项目启动：完整营销 ROI 归因系统",
    description: "用学到的所有因果方法做一个真实项目",
    objectives: [
      "整合 DID + CausalImpact + DoubleML + MMM",
      "产出可交付的营销 ROI 报告",
      "代码归档 GitHub",
    ],
    duration: 90,
    cues: [
      "项目：某品牌 2025 年 Q3 促销的完整因果归因",
      "四种方法三角验证",
      "报告：方法 / 结果 / 业务建议 / 局限",
    ],
    content: `<h3>毕业项目结构</h3>
<ol>
<li><strong>数据：</strong>2 年周度数据（销量 + 5 渠道广告 + 促销 + 价格 + 节假日）</li>
<li><strong>分析 1（短期效应）：</strong>DID + CausalImpact 估计单次促销的因果效应</li>
<li><strong>分析 2（长期 ROI）：</strong>Robyn / 贝叶斯 MMM 估计各渠道的长期 ROI</li>
<li><strong>分析 3（用户分层）：</strong>uplift modeling 找敏感人群</li>
<li><strong>分析 4（异质效应）：</strong>Causal Forest 找哪些 SKU 对促销最敏感</li>
<li><strong>综合报告：</strong>方法 / 结果 / 预算优化建议 / 风险评估</li>
</ol>`,
  },
  {
    id: "deep-25", day: 25, week: 4, track: "deep",
    title: "P4 阶段总结：因果分析能力地图",
    description: "回顾 20 天 P4 学到的能力",
    objectives: [
      "形成因果分析能力地图",
      "整理 P4 作品（毕业项目）",
      "预告 P5 库存补货",
    ],
    duration: 60,
    cues: [
      "20 天掌握了从『相关』到『因果』的完整武器库",
      "毕业项目是简历核心素材",
      "P5：从预测到决策",
    ],
    content: `<h3>P4 完成标志</h3>
<ul>
<li>✅ 掌握潜在结果框架 + DAG</li>
<li>✅ 会用 DID / 合成控制 / CausalImpact</li>
<li>✅ 会用 DoubleML / EconML（HTE）</li>
<li>✅ 会用 Robyn / 贝叶斯 MMM</li>
<li>✅ 会用 uplift modeling 找敏感人群</li>
<li>✅ 会设计 Geo Lift / 贝叶斯 A/B</li>
<li>✅ 有一个完整营销 ROI 归因作品</li>
</ul>
<h3>P5 预告</h3>
<p>从『促销有没有效』转到『该补多少货』——把预测能力接到库存决策。</p>`,
  },

  // ───────────────────────────────────────────────────────────
  // ★ P5 · 库存与补货决策（Day 26-45，20 天重点）
  // ───────────────────────────────────────────────────────────

  // ===== Week 5 · Day 26-32 · 库存理论基础 + SARIMA 穿插 =====
  {
    id: "deep-26", day: 26, week: 5, track: "deep",
    title: "P5 启动 · 库存理论：EOQ / 安全库存 / 服务水准",
    description: "经典库存模型",
    objectives: [
      "理解经济订货量（EOQ）",
      "掌握安全库存的计算",
      "知道 Cycle Service vs Fill Rate 的差异",
    ],
    duration: 45,
    cues: [
      "EOQ = √(2DS/H)，平衡订货成本和持有成本",
      "安全库存 = z·σ·√L",
      "Fill Rate 比 Cycle Service 更业务友好",
    ],
    content: `<h3>EOQ 经济订货量</h3>
<pre><code>import numpy as np
D = 12000  # 年需求
S = 100    # 每次订货成本
H = 16     # 单位年持有成本
EOQ = np.sqrt(2 * D * S / H)  # ≈ 387</code></pre>
<h3>安全库存</h3>
<pre><code>from scipy.stats import norm
z = norm.ppf(0.95)              # 95% 服务水准
sigma_L = 50                    # 提前期内需求标准差
safety_stock = z * sigma_L      # ≈ 82</code></pre>
<h3>两类服务水准</h3>
<ul>
<li><strong>Cycle Service Rate：</strong>不缺货的周期比例</li>
<li><strong>Fill Rate：</strong>需求被即时满足的比例（老板更关心）</li>
</ul>`,
  },
  {
    id: "deep-27", day: 27, week: 5, track: "deep",
    title: "SARIMA 数学严格版（用到时补）",
    description: "理解 SARIMA 的数学结构",
    objectives: [
      "理解 AR / MA / 差分的算子表示",
      "掌握 Box-Jenkins 方法论",
      "看懂 SARIMA 论文里的公式",
    ],
    duration: 45,
    cues: [
      "AR(p)：y_t = c + φ₁y_{t-1} + ... + ε_t",
      "MA(q)：y_t = c + ε_t + θ₁ε_{t-1} + ...",
      "滞后算子 B：B^k · y_t = y_{t-k}",
    ],
    content: `<h3>SARIMA(p,d,q)(P,D,Q,m)</h3>
<p><code>Φ(B^m)φ(B)(1-B)^d(1-B^m)^D y_t = Θ(B^m)θ(B)ε_t</code></p>
<ul>
<li>φ(B)：非季节 AR</li>
<li>θ(B)：非季节 MA</li>
<li>Φ(B^m)：季节 AR</li>
<li>Θ(B^m)：季节 MA</li>
</ul>
<h3>Box-Jenkins 方法论</h3>
<ol>
<li>识别：看 ACF/PACF 选 p/q</li>
<li>估计：最大似然</li>
<li>诊断：残差 Ljung-Box</li>
<li>预测</li>
</ol>
<pre><code>from statsmodels.tsa.statespace.sarimax import SARIMAX
model = SARIMAX(y, order=(1,1,1), seasonal_order=(1,1,1,7))
res = model.fit(disp=False)
print(res.summary())</code></pre>`,
  },
  {
    id: "deep-28", day: 28, week: 5, track: "deep",
    title: "SARIMAX：带外生变量的 SARIMA",
    description: "把促销/天气作为外生变量",
    objectives: [
      "理解 exog 的概念",
      "会用 SARIMAX 加入业务变量",
      "知道外生变量的『未来值』问题",
    ],
    duration: 45,
    cues: [
      "exog 是模型之外但影响目标的变量",
      "预测时必须提供 exog 的未来值",
      "适合促销计划已排期的场景",
    ],
    content: `<pre><code>from statsmodels.tsa.statespace.sarimax import SARIMAX
model = SARIMAX(
    train['销量'],
    exog=train[['促销', '价格', '广告费']],
    order=(1, 1, 1),
    seasonal_order=(1, 1, 1, 7),
)
res = model.fit(disp=False)
forecast = res.get_forecast(steps=7, exog=test[['促销', '价格', '广告费']])</code></pre>
<div class="pit-box"><h4>⚠️ 致命陷阱</h4>
<p>预测时要传 <code>exog</code>，否则报错。更隐蔽的陷阱：你用了『未来才知道的促销』训练，上线时模型要求未来 7 天的促销标记——但实际业务里促销计划可能还没定。</p></div>`,
  },
  {
    id: "deep-29", day: 29, week: 5, track: "deep",
    title: "(s, S) / (r, Q) 补货策略",
    description: "工业级补货算法",
    objectives: [
      "理解 (s, S) 和 (r, Q) 策略",
      "掌握参数确定方法",
      "知道在 ERP 系统的实现",
    ],
    duration: 45,
    cues: [
      "(s, S)：库存低于 s 就补到 S",
      "(r, Q)：库存低于 r 就订 Q 单位",
      "s = 安全库存 + 提前期需求",
    ],
    content: `<h3>(s, S) 策略</h3>
<pre><code>s = expected_demand_during_leadtime + safety_stock
S = s + EOQ</code></pre>
<h3>(r, Q) 策略</h3>
<pre><code>r = mean_demand_L + z * sigma_L  # 再订货点
Q = EOQ                          # 订货量</code></pre>
<h3>策略选择</h3>
<ul>
<li><strong>固定成本：</strong>(s, S) 更优</li>
<li><strong>可变成本：</strong>(r, Q) 更优</li>
<li><strong>实际：</strong>大部分 ERP 用 (s, S) 变种</li>
</ul>`,
  },
  {
    id: "deep-30", day: 30, week: 5, track: "deep",
    title: "多级库存优化（Multi-Echelon）",
    description: "仓库 → 门店 → 货架的协同",
    objectives: [
      "理解多级供应链的牛鞭效应",
      "掌握级库存（echelon stock）概念",
      "知道多级优化的收益",
    ],
    duration: 45,
    cues: [
      "级库存 = 本级 + 下游所有",
      "集中式 vs 分散式优化",
      "多级优化可降总库存 20-30%",
    ],
    content: `<h3>级库存（Echelon Stock）</h3>
<p>传统：每个节点独立优化。<br>
多级：把整条链看成整体，优化级库存。</p>
<h3>牛鞭效应</h3>
<p>需求波动沿供应链放大：零售 ±5% → 批发 ±10% → 制造 ±20%。<br>
原因：信息延迟、批量订货、价格波动、配给博弈。</p>
<div class="ex-box"><h4>✏️ 缓解牛鞭</h4>
<p>分享 POS 数据（销售点）、减小批量、稳定价格、VMI（供应商管理库存）。</p></div>`,
  },
  {
    id: "deep-31", day: 31, week: 5, track: "deep",
    title: "S&OP 销售运营计划的量化",
    description: "把预测接到财务和产能",
    objectives: [
      "理解 S&OP 流程",
      "掌握预测在 S&OP 的角色",
      "知道和财务/产能的协调",
    ],
    duration: 45,
    cues: [
      "S&OP = Sales and Operations Planning",
      "月度滚动：需求 → 供应 → 财务对齐",
      "量化：基线预测 + 不确定性 + 财务模拟",
    ],
    content: `<h3>S&OP 月度循环</h3>
<ol>
<li><strong>需求评审：</strong>更新需求预测（销售+市场+预测团队）</li>
<li><strong>供应评审：</strong>评估产能/库存能否满足</li>
<li><strong>协调会议：</strong>解决需求供应缺口</li>
<li><strong>高管 S&OP：</strong>决策 + 财务对齐</li>
</ol>
<h3>量化的角色</h3>
<ul>
<li>提供基线预测（数据驱动）</li>
<li>量化不确定性（概率预测）</li>
<li>模拟不同决策的财务影响</li>
</ul>`,
  },
  {
    id: "deep-32", day: 32, week: 5, track: "deep",
    title: "Week 5 复习 + 库存仿真",
    description: "用蒙特卡洛模拟库存系统",
    objectives: [
      "完成一个库存仿真系统",
      "对比不同补货策略",
      "量化服务水准 vs 成本权衡",
    ],
    duration: 60,
    cues: [
      "仿真 = 模拟 1000 天",
      "对比 (s,S) vs (r,Q)",
      "成本 = 持有 + 订货 + 缺货",
    ],
    content: `<pre><code>def simulate_inventory(demand_gen, policy, days=1000):
    inventory, costs, shortages = [], 0, 0
    stock = policy['S_init']
    for d in range(days):
        demand = demand_gen()
        if stock &lt; policy['s']:
            order = policy['S'] - stock
            costs += order * policy['unit_cost'] + policy['order_cost']
            stock += order
        sold = min(stock, demand)
        shortages += max(0, demand - stock)
        stock -= sold
        costs += stock * policy['hold_cost']
        inventory.append(stock)
    return {'avg_stock': np.mean(inventory), 'shortage': shortages, 'cost': costs}</code></pre>`,
  },

  // ===== Week 6 · Day 33-39 · 概率预测 + 高级库存方法 =====
  {
    id: "deep-33", day: 33, week: 6, track: "deep",
    title: "概率预测：分位数 LightGBM",
    description: "不只预测值，还预测分布",
    objectives: [
      "掌握分位数回归",
      "会跑多分位数 LightGBM",
      "把概率预测接到库存决策",
    ],
    duration: 45,
    cues: [
      "P10/P50/P90 = 保守/中位/乐观",
      "Pinball Loss 训练分位数",
      "概率预测直接喂给库存决策",
    ],
    content: `<pre><code>import lightgbm as lgb
quantiles = [0.1, 0.5, 0.9]
preds = {}
for q in quantiles:
    params = {'objective': 'quantile', 'alpha': q, 'learning_rate': 0.05}
    model = lgb.train(params, train_set, num_boost_round=500)
    preds[q] = model.predict(X_test)

# 接库存决策
service_level = 0.95
target_quantile = 1 - (1 - service_level) * 2  # ≈ 0.9
stock = preds[target_quantile]</code></pre>
<h3>概率预测 vs 点预测</h3>
<p>点预测：『下周销量 1000』——给不出不确定性。<br>
概率预测：『下周 P50=1000，P90=1500』——直接算出该备多少货。</p>`,
  },
  {
    id: "deep-34", day: 34, week: 6, track: "deep",
    title: "DeepAR：Amazon 概率预测 SOTA",
    description: "深度学习概率预测",
    objectives: [
      "理解 DeepAR 的自回归结构",
      "会跑 GluonTS 的 DeepAR",
      "知道 DeepAR vs 分位数 LightGBM",
    ],
    duration: 45,
    cues: [
      "DeepAR：自回归 LSTM + 高斯/负二项分布",
      "天然处理多重时序（跨 SKU 共享）",
      "GluonTS：Amazon 开源时序库",
    ],
    content: `<pre><code>from gluonts.model.deepar import DeepAREstimator
from gluonts.trainer import Trainer
estimator = DeepAREstimator(
    freq='D', prediction_length=7,
    trainer=Trainer(epochs=50, learning_rate=1e-3),
)
predictor = estimator.train(train_data)
forecasts = list(predictor.predict(test_data))</code></pre>
<h3>DeepAR 适用场景</h3>
<ul>
<li>大量相关时序（如 1000 个 SKU）</li>
<li>冷启动（新 SKU 借用其他 SKU 模式）</li>
<li>需要概率预测</li>
</ul>`,
  },
  {
    id: "deep-35", day: 35, week: 6, track: "deep",
    title: "贝叶斯推断 + PyMC（用到时补）",
    description: "贝叶斯的数学原理",
    objectives: [
      "理解贝叶斯定理",
      "掌握共轭先验",
      "知道 MCMC 的原理",
    ],
    duration: 45,
    cues: [
      "先验 × 似然 = 后验",
      "共轭：Beta 先验 + 二项似然 → Beta 后验",
      "MCMC：构造马尔可夫链，平稳分布=后验",
    ],
    content: `<h3>贝叶斯定理</h3>
<p><code>P(θ|D) = P(D|θ) · P(θ) / P(D)</code></p>
<pre><code>import pymc as pm
with pm.Model() as model:
    alpha = pm.Normal('alpha', mu=0, sigma=10)
    beta = pm.Normal('beta', mu=0, sigma=10)
    sigma = pm.HalfNormal('sigma', sigma=1)
    mu = alpha + beta * X
    y_obs = pm.Normal('y_obs', mu=mu, sigma=sigma, observed=y)
    trace = pm.sample(2000, tune=1000, chains=4)</code></pre>
<h3>共轭先验对照</h3>
<table>
<tr><th>似然</th><th>共轭先验</th></tr>
<tr><td>Bernoulli</td><td>Beta</td></tr>
<tr><td>Poisson</td><td>Gamma</td></tr>
<tr><td>Gaussian</td><td>Gaussian</td></tr>
</table>`,
  },
  {
    id: "deep-36", day: 36, week: 6, track: "deep",
    title: "强化学习补货入门",
    description: "Amazon RL 库存控制",
    objectives: [
      "理解 RL 的状态/动作/奖励",
      "知道 RL 在补货中的优势",
      "了解 RL 库存的论文",
    ],
    duration: 45,
    cues: [
      "RL = 试错学习最优策略",
      "状态 = 库存 + 预测",
      "奖励 = -（持有 + 缺货 + 订货成本）",
    ],
    content: `<h3>RL 补货建模</h3>
<ul>
<li><strong>状态 s_t：</strong>当前库存 + 预测分布 + 提前期</li>
<li><strong>动作 a_t：</strong>订多少</li>
<li><strong>奖励 r_t：</strong>-（持有 + 缺货 + 订货成本）</li>
</ul>
<pre><code>from stable_baselines3 import PPO
env = InventoryEnv(...)  # 自定义环境
model = PPO('MlpPolicy', env, verbose=1)
model.learn(total_timesteps=100000)</code></pre>
<div class="ex-box"><h4>✏️ 进阶论文</h4>
<p>Amazon 2021 论文 <em>Reinforcement Learning for Inventory Optimization</em></p></div>`,
  },
  {
    id: "deep-37", day: 37, week: 6, track: "deep",
    title: "新品冷启动：相似品迁移 + Chronos 零样本",
    description: "新品无历史数据怎么办",
    objectives: [
      "掌握相似品迁移方法",
      "会用 Chronos 零样本预测",
      "知道冷启动的不同场景",
    ],
    duration: 45,
    cues: [
      "方法 1：找相似 SKU 迁移",
      "方法 2：Chronos 零样本大模型",
      "方法 3：贝叶斯先验借用",
    ],
    content: `<pre><code># 方法 1：相似品迁移
from sklearn.metrics.pairwise import cosine_similarity
sim = cosine_similarity(new_sku_features, existing_sku_features)
similar_skus = sim.argsort()[0][-5:]
forecast = existing_forecasts[similar_skus].mean()

# 方法 2：Chronos 零样本
from chronos import ChronosPipeline
pipeline = ChronosPipeline.from_pretrained('amazon/chronos-t5-large')
forecast = pipeline.predict(context=new_sku_short_history, prediction_length=7)</code></pre>
<h3>Chronos 的革命</h3>
<p>Amazon 2024 发布的时序大模型，预训练于百万级时序，零样本预测——给少量历史就能输出。</p>`,
  },
  {
    id: "deep-38", day: 38, week: 6, track: "deep",
    title: "间断性需求：Croston / TSB",
    description: "慢销品的特殊预测",
    objectives: [
      "理解间断性需求",
      "掌握 Croston / TSB",
      "知道和普通时序的差异",
    ],
    duration: 45,
    cues: [
      "间断性：很多天销量=0",
      "Croston：分开预测『间隔』和『大小』",
      "TSB 是改进版",
    ],
    content: `<pre><code>def croston(series, alpha=0.1):
    nonzero = series[series &gt; 0]
    intervals = np.diff(nonzero.index)
    z = nonzero.ewm(alpha=alpha).mean()
    p = pd.Series(intervals).ewm(alpha=alpha).mean()
    forecast = z / p
    return forecast</code></pre>
<h3>ABC 分类策略</h3>
<ul>
<li>A 类快销：天天有销量 → ARIMA</li>
<li>B 类中销：偶尔缺货 → Croston</li>
<li>C 类慢销：很多天=0 → TSB</li>
</ul>`,
  },
  {
    id: "deep-39", day: 39, week: 6, track: "deep",
    title: "缺货需求还原（Censored Demand）",
    description: "卖断货 ≠ 没需求",
    objectives: [
      "理解截断数据问题",
      "掌握需求还原方法",
      "知道在库存优化的影响",
    ],
    duration: 45,
    cues: [
      "销量 = min(需求, 库存)",
      "库存=0 时观察被截断",
      "用 Tobit 或 EM 算法还原",
    ],
    content: `<h3>截断数据问题</h3>
<p>实际观察到的不是需求，而是销量 = min(需求, 库存)。</p>
<pre><code># 用 EM 算法
# E 步：估计缺货期的真实需求（用预测分布）
# M 步：用还原后的需求重新拟合模型
for iteration in range(100):
    # E 步
    stockout_mask = (inventory == 0)
    imputed_demand = np.where(stockout_mask,
                              np.maximum(predicted_demand, observed_sales),
                              observed_sales)
    # M 步
    model.fit(imputed_demand)</code></pre>
<div class="pit-box"><h4>⚠️ 不还原的后果</h4>
<p>模型学到『缺货期销量低 → 以后少备货』——持续缺货死循环。</p></div>`,
  },

  // ===== Week 7 · Day 40-45 · P5 毕业项目 =====
  {
    id: "deep-40", day: 40, week: 7, track: "deep",
    title: "P5 毕业项目启动：端到端库存优化系统",
    description: "把 P4 + P5 学的整合成一个系统",
    objectives: [
      "选定业务场景（电商/快消/医药）",
      "设计系统架构",
      "制定 6 天开发计划",
    ],
    duration: 60,
    cues: [
      "场景：销量预测 + 库存优化 + 营销归因",
      "架构：数据 → 特征 → 模型 → 决策 → 报告",
      "产出：代码 + 报告 + Demo",
    ],
    content: `<h3>毕业项目目标</h3>
<ol>
<li><strong>数据层：</strong>销售 + 库存 + 营销 + 外部</li>
<li><strong>特征层：</strong>lag/rolling/广告衰减/节假日</li>
<li><strong>模型层：</strong>LightGBM + 概率预测</li>
<li><strong>决策层：</strong>(s, S) + 安全库存</li>
<li><strong>归因层：</strong>DID + SHAP 量化营销 ROI</li>
<li><strong>展示层：</strong>Streamlit Dashboard</li>
</ol>`,
  },
  {
    id: "deep-41", day: 41, week: 7, track: "deep",
    title: "毕业项目 Day 2：数据 + 特征 + 模型",
    description: "端到端预测管线",
    objectives: [
      "完成数据整合 + 特征工程",
      "训练多分位数 LightGBM",
      "Optuna 调参",
    ],
    duration: 60,
    cues: [
      "防泄漏检查",
      "P10/P50/P90 三模型",
      "SHAP 分析",
    ],
    content: `<h3>今日任务</h3>
<ol>
<li>加载 Kaggle M5 / Rossmann 数据</li>
<li>合并库存数据</li>
<li>构造 lag/rolling/日期/营销特征</li>
<li>训练 P10/P50/P90 LightGBM</li>
<li>Optuna 调参</li>
<li>SHAP 分析</li>
</ol>`,
  },
  {
    id: "deep-42", day: 42, week: 7, track: "deep",
    title: "毕业项目 Day 3：库存决策模块",
    description: "把概率预测接到补货",
    objectives: [
      "实现 (s, S) 补货策略",
      "基于概率预测算安全库存",
      "蒙特卡洛仿真",
    ],
    duration: 60,
    cues: [
      "P90 作为再订货点",
      "服务水准 95% 计算",
      "仿真 1000 次评估",
    ],
    content: `<h3>今日任务</h3>
<ol>
<li>读取概率预测结果</li>
<li>按服务水准 95% 算目标库存</li>
<li>用 (s, S) 策略生成补货建议</li>
<li>蒙特卡洛仿真对比 P50 vs P90 决策</li>
<li>输出补货建议表（每个 SKU 多少件）</li>
</ol>`,
  },
  {
    id: "deep-43", day: 43, week: 7, track: "deep",
    title: "毕业项目 Day 4：因果归因模块",
    description: "整合 P4 的因果分析",
    objectives: [
      "评估某次促销的真实效果",
      "DID + CausalImpact + SHAP 三角验证",
      "产出归因报告",
    ],
    duration: 60,
    cues: [
      "DID：实验组 vs 对照组",
      "CausalImpact：贝叶斯反事实",
      "SHAP：特征贡献",
    ],
    content: `<h3>今日任务</h3>
<ol>
<li>识别一次促销活动作为处理</li>
<li>DID 估计因果效应</li>
<li>CausalImpact 构造反事实</li>
<li>SHAP 分析促销贡献</li>
<li>三角对比，写归因报告</li>
</ol>`,
  },
  {
    id: "deep-44", day: 44, week: 7, track: "deep",
    title: "毕业项目 Day 5：API + Dashboard",
    description: "服务化 + 可视化",
    objectives: [
      "FastAPI 暴露预测接口",
      "Streamlit Dashboard",
      "Docker 打包",
    ],
    duration: 60,
    cues: [
      "API：/predict /reorder /attribution",
      "Dashboard：销量图 + 库存建议 + 归因",
      "一键部署",
    ],
    content: `<pre><code># FastAPI
from fastapi import FastAPI
app = FastAPI()
@app.post('/predict')
def predict(inp): ...
@app.post('/reorder')
def reorder(inp): ...

# Streamlit
import streamlit as st
st.title('供应链决策系统')
st.line_chart(sales_data)
st.dataframe(reorder_table)</code></pre>`,
  },
  {
    id: "deep-45", day: 45, week: 7, track: "deep",
    title: "P5 毕业总结：从预测到决策",
    description: "回顾 20 天 P5 + 项目完成",
    objectives: [
      "完成端到端供应链决策系统",
      "整理作品集",
      "预告 P6 Agent",
    ],
    duration: 60,
    cues: [
      "P4 + P5 整合成完整系统",
      "作品 = 代码 + 报告 + Demo",
      "P6：让 AI 自动化整个流程",
    ],
    content: `<h3>P5 完成标志</h3>
<ul>
<li>✅ 掌握 EOQ / 安全库存 / 多级库存</li>
<li>✅ 掌握 (s, S) / (r, Q) 补货</li>
<li>✅ 会用概率预测（分位数 LGBM / DeepAR）</li>
<li>✅ 会用 RL 补货（入门）</li>
<li>✅ 会处理冷启动 / 间断需求 / 缺货还原</li>
<li>✅ 有一个端到端供应链决策系统</li>
</ul>
<h3>P6 预告</h3>
<p>下一步：用 Agent 自动化整个流程——让 AI 自动挖因子、跑回测、出报告。</p>`,
  },

  // ───────────────────────────────────────────────────────────
  // P6 · Agent + 毕业项目（Day 46-65，20 天）
  // ───────────────────────────────────────────────────────────

  // ===== Week 8 · Day 46-52 · 工程化基础 =====
  {
    id: "deep-46", day: 46, week: 8, track: "deep",
    title: "P6 启动 · 软件工程基础",
    description: "Git / 测试 / 代码规范",
    objectives: [
      "掌握 Git 工作流",
      "会写 pytest 单元测试",
      "理解代码规范和 CI",
    ],
    duration: 45,
    cues: [
      "Git：分支 / 合并 / 冲突解决",
      "pytest：测试驱动开发",
      "CI：GitHub Actions 自动跑测试",
    ],
    content: `<h3>Git 工作流</h3>
<pre><code>git checkout -b feature/new-model
git add .
git commit -m "feat: add new model"
git push origin feature/new-model
# 在 GitHub 上开 PR</code></pre>
<h3>pytest 测试模板</h3>
<pre><code># test_features.py
import pytest
import pandas as pd
def test_lag_no_leakage():
    df = pd.DataFrame({'y': [1, 2, 3, 4]})
    df['lag_1'] = df['y'].shift(1)
    assert df.loc[1, 'lag_1'] == 1  # 第 2 行的 lag_1 应该是第 1 行</code></pre>`,
  },
  {
    id: "deep-47", day: 47, week: 8, track: "deep",
    title: "Docker 容器化",
    description: "一次构建处处运行",
    objectives: [
      "会写 Dockerfile",
      "掌握镜像构建",
      "知道 docker-compose",
    ],
    duration: 45,
    cues: [
      "Dockerfile：FROM + COPY + RUN + CMD",
      "构建：docker build -t name .",
      "Compose：多服务编排",
    ],
    content: `<pre><code>FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]</code></pre>
<pre><code># docker-compose.yml
version: '3'
services:
  api:
    build: .
    ports: ["8000:8000"]
  db:
    image: postgres:15
    environment:
      POSTGRES_PASSWORD: example</code></pre>`,
  },
  {
    id: "deep-48", day: 48, week: 8, track: "deep",
    title: "FastAPI 模型服务化",
    description: "把模型变成 API",
    objectives: [
      "会写 FastAPI 服务",
      "掌握模型加载 + 预测",
      "知道 API 文档自动生成",
    ],
    duration: 45,
    cues: [
      "FastAPI 比 Flask 快、自带类型校验",
      "joblib 保存模型",
      "/docs 自动 Swagger",
    ],
    content: `<pre><code>from fastapi import FastAPI
from pydantic import BaseModel
import joblib

app = FastAPI()
model = joblib.load('model.pkl')

class ForecastInput(BaseModel):
    date: str
    sku_id: str
    price: float
    promotion: int

@app.post('/predict')
def predict(inp: ForecastInput):
    features = make_features(inp)
    pred = model.predict([features])
    return {'forecast': float(pred[0])}</code></pre>`,
  },
  {
    id: "deep-49", day: 49, week: 8, track: "deep",
    title: "MLflow 实验追踪",
    description: "管理上百次实验",
    objectives: [
      "会用 MLflow 记录参数/指标/模型",
      "掌握实验对比",
      "知道模型注册中心",
    ],
    duration: 45,
    cues: [
      "Tracking：记录实验",
      "Models：模型版本",
      "Registry：上线审批",
    ],
    content: `<pre><code>import mlflow
mlflow.set_experiment('销量预测')
with mlflow.start_run():
    mlflow.log_params({'model': 'lightgbm', 'lr': 0.05})
    mlflow.log_metrics({'mae': 12.5, 'mape': 0.15})
    mlflow.lightgbm.log_model(model, 'model')</code></pre>`,
  },
  {
    id: "deep-50", day: 50, week: 8, track: "deep",
    title: "Airflow / Prefect 流水线编排",
    description: "定时跑批预测",
    objectives: [
      "理解 DAG",
      "会写 Airflow DAG",
      "知道定时调度",
    ],
    duration: 45,
    cues: [
      "DAG：任务依赖图",
      "Operator：Bash / Python",
      "Schedule：cron",
    ],
    content: `<pre><code>from airflow import DAG
from airflow.operators.python import PythonOperator
from datetime import datetime

dag = DAG('daily_forecast', schedule_interval='0 6 * * *',
          start_date=datetime(2026, 1, 1))
t1 = PythonOperator(task_id='fetch', python_callable=fetch_data, dag=dag)
t2 = PythonOperator(task_id='train', python_callable=train_model, dag=dag)
t3 = PythonOperator(task_id='predict', python_callable=predict, dag=dag)
t1 &gt;&gt; t2 &gt;&gt; t3</code></pre>`,
  },
  {
    id: "deep-51", day: 51, week: 8, track: "deep",
    title: "监控与告警 + 数据漂移",
    description: "模型上线后会变差",
    objectives: [
      "理解数据漂移 vs 概念漂移",
      "会跑 PSI / KS 检验",
      "建立监控仪表盘",
    ],
    duration: 45,
    cues: [
      "数据漂移：X 分布变了",
      "概念漂移：Y|X 关系变了（致命）",
      "PSI > 0.2 → 重训",
    ],
    content: `<pre><code>def psi(expected, actual, bins=10):
    expected_pct = np.histogram(expected, bins=bins)[0] / len(expected)
    actual_pct = np.histogram(actual, bins=bins)[0] / len(actual)
    return np.sum((actual_pct - expected_pct) * np.log(actual_pct / expected_pct))</code></pre>`,
  },
  {
    id: "deep-52", day: 52, week: 8, track: "deep",
    title: "Week 8 复习 + MLOps 全景图",
    description: "把工程化工具串起来",
    objectives: [
      "理解 MLOps 全流程",
      "知道每个工具的位置",
      "建立工程化能力地图",
    ],
    duration: 60,
    cues: [
      "数据 → 实验 → 训练 → 部署 → 监控",
      "工具：Git/MLflow/Docker/Airflow/Prometheus",
      "MLOps = DevOps + ML",
    ],
    content: `<h3>MLOps 全景图</h3>
<table>
<tr><th>阶段</th><th>工具</th></tr>
<tr><td>版本控制</td><td>Git + DVC</td></tr>
<tr><td>实验追踪</td><td>MLflow / W&amp;B</td></tr>
<tr><td>编排</td><td>Airflow / Prefect</td></tr>
<tr><td>服务化</td><td>FastAPI / BentoML</td></tr>
<tr><td>容器</td><td>Docker / K8s</td></tr>
<tr><td>监控</td><td>Prometheus / Evidently</td></tr>
</table>`,
  },

  // ===== Week 9 · Day 53-59 · Agent 框架 =====
  {
    id: "deep-53", day: 53, week: 9, track: "deep",
    title: "LangGraph：图式 Agent 编排",
    description: "2024-2026 最热的 Agent 框架",
    objectives: [
      "理解 LangGraph 的图结构",
      "会写简单的 Agent",
      "知道和 LangChain 的差异",
    ],
    duration: 45,
    cues: [
      "LangGraph = LangChain 的状态机进化版",
      "节点 = 函数，边 = 条件跳转",
      "支持循环、分支、人在环",
    ],
    content: `<pre><code>from langgraph.graph import StateGraph, END
from typing import TypedDict, Annotated

class State(TypedDict):
    question: str
    analysis: str
    answer: str

def analyze(state):
    state['analysis'] = llm.invoke(f"分析: {state['question']}")
    return state

def answer(state):
    state['answer'] = llm.invoke(f"基于 {state['analysis']} 回答")
    return state

workflow = StateGraph(State)
workflow.add_node('analyze', analyze)
workflow.add_node('answer', answer)
workflow.add_edge('analyze', 'answer')
workflow.add_edge('answer', END)
app = workflow.compile()</code></pre>`,
  },
  {
    id: "deep-54", day: 54, week: 9, track: "deep",
    title: "RD-Agent：自动挖因子闭环",
    description: "微软开源的因子挖掘 Agent",
    objectives: [
      "理解 RD-Agent 的架构",
      "知道因子挖掘的自动化闭环",
      "了解在金融/供应链的应用",
    ],
    duration: 45,
    cues: [
      "RD-Agent = Research & Development Agent",
      "自动：提出因子 → 测试 → 迭代",
      "微软开源，2024 发布",
    ],
    content: `<h3>RD-Agent 工作流</h3>
<ol>
<li><strong>提出假设：</strong>LLM 生成因子想法（如『过去 7 天波动率』）</li>
<li><strong>编码实现：</strong>自动生成 Python 代码</li>
<li><strong>回测验证：</strong>跑历史回测，计算 IC</li>
<li><strong>迭代改进：</strong>基于结果让 LLM 改进因子</li>
</ol>
<pre><code># RD-Agent（简化）
from rd_agent import RDAgent
agent = RDAgent(
    data_config='config.yaml',
    llm='deepseek-v4-pro',
    factor_universe=['价格', '成交量', '基本面'],
)
agent.run(iterations=100)</code></pre>`,
  },
  {
    id: "deep-55", day: 55, week: 9, track: "deep",
    title: "Multi-Agent 投研框架",
    description: "多角色协作的 Agent",
    objectives: [
      "理解 Multi-Agent 的协作模式",
      "知道 TradingAgents 框架",
      "了解在投研的应用",
    ],
    duration: 45,
    cues: [
      "多 Agent = 多角色（分析师/交易员/风控）",
      "每个 Agent 有不同工具和视角",
      "协作产出综合决策",
    ],
    content: `<h3>Multi-Agent 角色分工</h3>
<table>
<tr><th>角色</th><th>职责</th></tr>
<tr><td>数据 Agent</td><td>拉数据、清洗</td></tr>
<tr><td>分析 Agent</td><td>跑模型、出洞察</td></tr>
<tr><td>交易 Agent</td><td>生成交易建议</td></tr>
<tr><td>风控 Agent</td><td>评估风险</td></tr>
<tr><td>协调 Agent</td><td>整合、决策</td></tr>
</table>
<pre><code># 简化框架
from crewai import Agent, Task, Crew

analyst = Agent(role='分析师', goal='找信号', llm=llm)
trader = Agent(role='交易员', goal='出建议', llm=llm)
risk = Agent(role='风控', goal='防风险', llm=llm)

crew = Crew(agents=[analyst, trader, risk])
result = crew.kickoff(input='分析某 SKU 的补货决策')</code></pre>`,
  },
  {
    id: "deep-56", day: 56, week: 9, track: "deep",
    title: "AutoML 全流程：H2O / AutoGluon",
    description: "一键建模",
    objectives: [
      "理解 AutoML 的原理",
      "会跑 H2O / AutoGluon",
      "知道 AutoML 的局限",
    ],
    duration: 45,
    cues: [
      "AutoML = 自动特征 + 模型 + 调参",
      "H2O：传统 ML，企业级",
      "AutoGluon：Amazon 开源，含深度学习",
    ],
    content: `<pre><code># AutoGluon
from autogluon.tabular import TabularPredictor
predictor = TabularPredictor(label='销量', eval_metric='mae').fit(
    train_data,
    time_limit=3600,  # 1 小时
)
predictions = predictor.predict(test_data)
predictor.leaderboard(test_data)</code></pre>
<div class="pit-box"><h4>⚠️ AutoML 的局限</h4>
<ul>
<li>不能处理数据泄漏（你要自己防）</li>
<li>特征工程有限（复杂的 lag/rolling 要手动）</li>
<li>可解释性差</li>
</ul></div>`,
  },
  {
    id: "deep-57", day: 57, week: 9, track: "deep",
    title: "人在环（Human-in-the-Loop）",
    description: "Agent + 人工审核",
    objectives: [
      "理解 Human-in-the-Loop 的价值",
      "知道什么时候必须人来审核",
      "设计审核工作流",
    ],
    duration: 45,
    cues: [
      "自动 80%，人工审核 20%（关键决策）",
      "审核点：异常预测 / 大额决策 / 模型不自信",
      "反馈循环：人工修正喂回模型",
    ],
    content: `<h3>Human-in-the-Loop 触发条件</h3>
<ol>
<li><strong>低置信度：</strong>模型预测的不确定性大</li>
<li><strong>异常值：</strong>输入偏离训练分布</li>
<li><strong>大额决策：</strong>补货金额 &gt; 阈值</li>
<li><strong>新模式：</strong>结构性变化（如疫情）</li>
</ol>
<pre><code># LangGraph 人在环
def human_review(state):
    if state['confidence'] &lt; 0.8 or state['amount'] &gt; 100000:
        # 暂停，等待人工
        return 'await_human'
    return 'auto_approve'</code></pre>`,
  },
  {
    id: "deep-58", day: 58, week: 9, track: "deep",
    title: "A/B 测试设计 + 统计显著性",
    description: "证明你的模型真的有用",
    objectives: [
      "理解 A/B 测试的设计原则",
      "会算样本量和显著性",
      "知道业务指标 vs 模型指标的对齐",
    ],
    duration: 45,
    cues: [
      "A/B = 对照实验，证明因果",
      "样本量由 MDE / 显著性 / Power 决定",
      "MAE 降了但库存成本没降？业务指标对齐问题",
    ],
    content: `<pre><code>from statsmodels.stats.power import tt_solve_power
n = tt_solve_power(effect_size=0.1, alpha=0.05, power=0.8)
print(f'每组需要 {int(n)} 样本')

# 业务指标对照
# 模型指标：MAE / MAPE
# 业务指标：缺货率 / 库存周转 / 总成本
# 必须证明：模型指标改善 → 业务指标改善</code></pre>`,
  },
  {
    id: "deep-59", day: 59, week: 9, track: "deep",
    title: "Week 9 复习 + Agent 案例",
    description: "用 Agent 自动化一个真实任务",
    objectives: [
      "完成一个 Agent 自动化案例",
      "整合 LangGraph + RD-Agent",
      "知道 Agent 的边界",
    ],
    duration: 60,
    cues: [
      "案例：Agent 自动跑销量预测 + 出报告",
      "Agent 能做：拉数据 / 跑模型 / 写报告",
      "Agent 不能做：定义业务问题 / 判断结论合理性",
    ],
    content: `<h3>Agent 自动化案例</h3>
<ol>
<li><strong>输入：</strong>用户问『下周 SKU123 的销量预测』</li>
<li><strong>Agent 1（数据）：</strong>拉历史销量 + 库存</li>
<li><strong>Agent 2（特征）：</strong>构造 lag/rolling</li>
<li><strong>Agent 3（模型）：</strong>调 LightGBM 预测</li>
<li><strong>Agent 4（报告）：</strong>生成 Markdown 报告</li>
<li><strong>Agent 5（审核）：</strong>人工 review 异常</li>
</ol>
<div class="ex-box"><h4>✏️ AI 辅助</h4>
<p>让 AI 帮你设计 Agent 工作流：<em>"我要自动化销量预测到报告的全流程，帮我设计 5 个 Agent 的协作图。"</em></p></div>`,
  },

  // ===== Week 10 · Day 60-65 · P6 毕业项目 =====
  {
    id: "deep-60", day: 60, week: 10, track: "deep",
    title: "P6 毕业项目启动：Agent 化决策系统",
    description: "整合 P4+P5+P6 的所有能力",
    objectives: [
      "设计 Agent 化系统架构",
      "整合 LangGraph + LightGBM + Robyn",
      "制定 6 天开发计划",
    ],
    duration: 60,
    cues: [
      "系统：用户提问 → Agent 协作 → 出报告",
      "整合 P4 因果 + P5 库存 + P6 Agent",
      "产出：可交互的 Demo",
    ],
    content: `<h3>P6 毕业项目目标</h3>
<ol>
<li><strong>用户接口：</strong>自然语言提问（『SKU123 该补多少货？』）</li>
<li><strong>数据 Agent：</strong>自动拉数据 + 清洗</li>
<li><strong>预测 Agent：</strong>调 LightGBM + 概率预测</li>
<li><strong>决策 Agent：</strong>(s, S) 策略 + 库存建议</li>
<li><strong>归因 Agent：</strong>DID/SHAP 量化营销 ROI</li>
<li><strong>报告 Agent：</strong>自动生成 Markdown + Dashboard</li>
</ol>`,
  },
  {
    id: "deep-61", day: 61, week: 10, track: "deep",
    title: "毕业项目 Day 2-3：核心模块开发",
    description: "实现 5 个 Agent",
    objectives: [
      "实现数据/预测/决策 Agent",
      "用 LangGraph 串联",
      "测试端到端流程",
    ],
    duration: 90,
    cues: [
      "每个 Agent 一个函数",
      "LangGraph 串联状态流转",
      "测试：给一个问题，跑通全链",
    ],
    content: `<pre><code>from langgraph.graph import StateGraph, END

class State(TypedDict):
    question: str
    data: dict
    prediction: dict
    decision: dict
    report: str

workflow = StateGraph(State)
workflow.add_node('data_agent', data_agent)
workflow.add_node('predict_agent', predict_agent)
workflow.add_node('decision_agent', decision_agent)
workflow.add_node('report_agent', report_agent)
workflow.add_edge('data_agent', 'predict_agent')
workflow.add_edge('predict_agent', 'decision_agent')
workflow.add_edge('decision_agent', 'report_agent')
workflow.add_edge('report_agent', END)
app = workflow.compile()</code></pre>`,
  },
  {
    id: "deep-62", day: 62, week: 10, track: "deep",
    title: "毕业项目 Day 4-5：UI + 部署",
    description: "Streamlit + Docker 部署",
    objectives: [
      "Streamlit 交互界面",
      "Docker 打包",
      "部署到 HuggingFace Space",
    ],
    duration: 90,
    cues: [
      "UI：输入框 + 按钮 + 结果展示",
      "Docker 一键启动",
      "HuggingFace Space 免费托管",
    ],
    content: `<pre><code>import streamlit as st
st.title('🤖 Agent 化决策系统')
question = st.text_input('你的问题', 'SKU123 下周该补多少货？')
if st.button('运行'):
    result = app.invoke({'question': question})
    st.write(result['report'])</code></pre>`,
  },
  {
    id: "deep-63", day: 63, week: 10, track: "deep",
    title: "毕业项目 Day 6：测试 + 文档",
    description: "代码质量",
    objectives: [
      "写单元测试",
      "完成 README",
      "代码重构",
    ],
    duration: 60,
    cues: [
      "pytest 测试每个 Agent",
      "README 含架构图",
      "类型注解 + docstring",
    ],
    content: `<h3>测试清单</h3>
<ul>
<li>test_data_agent：数据加载正确</li>
<li>test_predict_agent：预测不 NaN</li>
<li>test_decision_agent：库存 &gt; 0</li>
<li>test_e2e：端到端不报错</li>
</ul>`,
  },
  {
    id: "deep-64", day: 64, week: 10, track: "deep",
    title: "毕业项目 Day 7：答辩准备",
    description: "准备 15 分钟答辩",
    objectives: [
      "设计答辩结构",
      "练习讲解",
      "准备 Q&A",
    ],
    duration: 60,
    cues: [
      "15 分钟：问题(2) + 方法(5) + 结果(5) + 业务(3)",
      "重点：业务价值 + 技术亮点",
      "Q&A 预演",
    ],
    content: `<h3>答辩 PPT 结构（15 张）</h3>
<ol>
<li>封面</li>
<li>业务问题</li>
<li>数据描述</li>
<li>方法概述（P4 因果 + P5 库存 + P6 Agent）</li>
<li>P4：因果归因亮点</li>
<li>P5：库存优化结果</li>
<li>P6：Agent 架构图</li>
<li>关键结果</li>
<li>业务 ROI 估算</li>
<li>未来改进</li>
<li>Demo 截图</li>
<li>Q&amp;A</li>
</ol>`,
  },
  {
    id: "deep-65", day: 65, week: 10, track: "deep",
    title: "P6 毕业总结 + 100 天中程复盘",
    description: "回顾 P6 + 100 天中程",
    objectives: [
      "回顾 P6 学到的能力",
      "复盘前 65 天成果",
      "预告后 35 天（因子 + 电力大宗）",
    ],
    duration: 60,
    cues: [
      "P6：从单兵到 Agent 指挥官",
      "65 天已完成 2 个作品（P4 因果 + P5 库存）",
      "后 35 天：深化因子 + 扩展电力大宗",
    ],
    content: `<h3>65 天能力地图</h3>
<table>
<tr><th>领域</th><th>熟练度</th></tr>
<tr><td>因果归因（P4）</td><td>✅ 专家</td></tr>
<tr><td>库存补货（P5）</td><td>✅ 专家</td></tr>
<tr><td>Agent 化（P6）</td><td>✅ 熟练</td></tr>
<tr><td>工程化</td><td>✅ 熟练</td></tr>
</table>
<h3>后 35 天预告</h3>
<ul>
<li>Day 66-80：因子挖掘深化（IC / ICIR / RD-Agent）</li>
<li>Day 81-100：电力市场 + 大宗商品量化（扩展视野）</li>
</ul>`,
  },

  // ───────────────────────────────────────────────────────────
  // 因子挖掘深化（Day 66-80，15 天）
  // ───────────────────────────────────────────────────────────

  // ===== Week 11 · Day 66-72 · 因子体系基础 =====
  {
    id: "deep-66", day: 66, week: 11, track: "deep",
    title: "因子挖掘启动 · 什么是因子",
    description: "金融级因子思维",
    objectives: [
      "理解因子的三个条件（预测力 + 数值化 + 持续观察）",
      "区分金融因子和供应链因子",
      "知道因子体系和特征工程的差异",
    ],
    duration: 45,
    cues: [
      "因子 ≠ 特征：因子强调可解释 + 持续有效",
      "金融因子：动量 / 价值 / 质量 / 波动率",
      "供应链因子：促销深度 / 价格弹性 / 库存周转",
    ],
    content: `<h3>因子的三个条件</h3>
<ol>
<li><strong>有预测力：</strong>和目标相关</li>
<li><strong>能数值化：</strong>喂给模型</li>
<li><strong>能持续观察：</strong>未来也能获取</li>
</ol>
<h3>金融因子经典四类</h3>
<table>
<tr><th>类别</th><th>例子</th></tr>
<tr><td>动量</td><td>过去 12 月收益率</td></tr>
<tr><td>价值</td><td>PE / PB / 股息率</td></tr>
<tr><td>质量</td><td>ROE / 资产周转</td></tr>
<tr><td>波动率</td><td>过去 60 日波动 / Beta</td></tr>
</table>`,
  },
  {
    id: "deep-67", day: 67, week: 11, track: "deep",
    title: "IC（信息系数）+ ICIR",
    description: "因子的预测力评估",
    objectives: [
      "理解 IC 的计算",
      "掌握 ICIR（信息比率）",
      "知道有效因子的阈值",
    ],
    duration: 45,
    cues: [
      "IC = corr(因子值, 未来收益)",
      "|IC| > 0.03 在金融算有效（噪声大）",
      "ICIR = mean(IC) / std(IC)，衡量稳定性",
    ],
    content: `<pre><code>def calculate_ic(factor, forward_return):
    """计算 IC（Spearman 秩相关更稳健）"""
    from scipy.stats import spearmanr
    ic, _ = spearmanr(factor, forward_return)
    return ic

def calculate_icir(ic_series):
    """IC 序列的 IR"""
    return ic_series.mean() / ic_series.std()</code></pre>
<h3>有效因子阈值</h3>
<ul>
<li><strong>金融：</strong>|IC| &gt; 0.03，ICIR &gt; 0.3</li>
<li><strong>供应链：</strong>|IC| &gt; 0.1（噪声小，要求高）</li>
<li><strong>衰减：</strong>IC 随时间衰减，需要监控</li>
</ul>`,
  },
  {
    id: "deep-68", day: 68, week: 11, track: "deep",
    title: "因子换手 + 衰减分析",
    description: "因子的生命周期",
    objectives: [
      "理解因子换手率",
      "掌握 IC 衰减曲线",
      "知道因子半衰期",
    ],
    duration: 45,
    cues: [
      "换手 = 因子值变化的频率",
      "高换手 → 高交易成本",
      "衰减：因子预测力随时间下降",
    ],
    content: `<pre><code># IC 衰减曲线
for horizon in [1, 5, 10, 20, 60]:
    forward_ret = df['收益'].shift(-horizon)
    ic = calculate_ic(df['因子'], forward_ret)
    print(f'{horizon}天 IC: {ic:.4f}')

# 换手率
turnover = df['因子'].diff().abs().mean() / df['因子'].std()</code></pre>
<h3>因子生命周期</h3>
<ol>
<li>发现期：IC 高但不稳定</li>
<li>验证期：IC 稳定，ICIR 提升</li>
<li>衰减期：市场学习，IC 下降</li>
<li>失效期：IC 接近 0</li>
</ol>`,
  },
  {
    id: "deep-69", day: 69, week: 11, track: "deep",
    title: "因子相关性矩阵 + 合成",
    description: "因子之间的去冗余",
    objectives: [
      "理解因子相关性",
      "掌握因子合成（PCA / 等权 / IC 加权）",
      "知道去冗余的原则",
    ],
    duration: 45,
    cues: [
      "高相关因子 = 信息冗余",
      "合成：PCA / 等权 / IC 加权",
      "保留信息正交的因子",
    ],
    content: `<pre><code># 因子相关性
import seaborn as sns
corr = df[factor_list].corr()
sns.heatmap(corr, annot=True)

# PCA 合成
from sklearn.decomposition import PCA
pca = PCA(n_components=1)
composite = pca.fit_transform(df[factor_list])

# IC 加权
weights = ic_series / ic_series.sum()
composite = (df[factor_list] * weights).sum(axis=1)</code></pre>`,
  },
  {
    id: "deep-70", day: 70, week: 11, track: "deep",
    title: "供应链因子的设计",
    description: "把因子思维迁移到供应链",
    objectives: [
      "设计供应链专属因子",
      "知道和金融因子的差异",
      "建立供应链因子库",
    ],
    duration: 45,
    cues: [
      "供应链因子：促销深度 / 库存周转 / 价格弹性",
      "目标：销量 / 缺货 / 滞销",
      "和金融因子的差异：频率低 / 噪声小 / 业务可解释",
    ],
    content: `<h3>供应链因子库（举例）</h3>
<table>
<tr><th>类别</th><th>因子</th><th>计算</th></tr>
<tr><td>价格</td><td>折扣深度</td><td>1 - 实际价/原价</td></tr>
<tr><td>价格</td><td>相对竞品价</td><td>自己价/品类均价</td></tr>
<tr><td>库存</td><td>库存周转</td><td>销量/平均库存</td></tr>
<tr><td>库存</td><td>缺货天数</td><td>过去 30 天缺货天数</td></tr>
<tr><td>促销</td><td>促销强度</td><td>促销天数占比</td></tr>
<tr><td>季节</td><td>季节指数</td><td>本月销量/年均</td></tr>
<tr><td>历史</td><td>动量</td><td>过去 7 天涨幅</td></tr>
<tr><td>历史</td><td>波动率</td><td>过去 30 天 std</td></tr>
</table>`,
  },
  {
    id: "deep-71", day: 71, week: 11, track: "deep",
    title: "因子回测框架",
    description: "系统化测试因子",
    objectives: [
      "理解因子回测流程",
      "会跑分层回测",
      "知道回测的陷阱",
    ],
    duration: 45,
    cues: [
      "分层回测：按因子值分 5 档，看收益差异",
      "多空组合：做多 Top 减做空 Bottom",
      "陷阱：前视偏差 / 幸存者偏差 / 过拟合",
    ],
    content: `<pre><code>def factor_backtest(df, factor, return_col, n_groups=5):
    """分层回测"""
    df['group'] = pd.qcut(df[factor], n_groups, labels=False)
    group_returns = df.groupby('group')[return_col].mean()
    long_short = group_returns.iloc[-1] - group_returns.iloc[0]
    return group_returns, long_short</code></pre>
<h3>三大陷阱</h3>
<ol>
<li><strong>前视偏差：</strong>用了未来数据</li>
<li><strong>幸存者偏差：</strong>只看现存标的，忽略退市/下架</li>
<li><strong>过拟合：</strong>在历史上调参到完美</li>
</ol>`,
  },
  {
    id: "deep-72", day: 72, week: 11, track: "deep",
    title: "Week 11 复习 + 因子库建设",
    description: "建立自己的因子库",
    objectives: [
      "完成一个 50+ 因子的库",
      "每个因子含 IC / 换手 / 衰减",
      "归档 GitHub",
    ],
    duration: 60,
    cues: [
      "因子库 = 数据 + 计算 + 评估",
      "可视化：IC 时间序列 / 分层收益",
      "持续迭代",
    ],
    content: `<h3>因子库结构</h3>
<pre><code>factor_library/
├── factors/
│   ├── price_factors.py
│   ├── inventory_factors.py
│   ├── promotion_factors.py
│   └── momentum_factors.py
├── evaluation/
│   ├── ic_calculator.py
│   ├── decay_analyzer.py
│   └── backtest.py
├── data/
│   └── raw_data.parquet
└── README.md</code></pre>`,
  },

  // ===== Week 12 · Day 73-80 · RD-Agent + 高级因子 =====
  {
    id: "deep-73", day: 73, week: 12, track: "deep",
    title: "RD-Agent 深入：自动挖因子闭环",
    description: "让 AI 自动生成和测试因子",
    objectives: [
      "深入理解 RD-Agent 架构",
      "会跑 RD-Agent 自动挖因子",
      "知道和手动挖因子的差异",
    ],
    duration: 60,
    cues: [
      "RD-Agent = LLM + 代码生成 + 回测",
      "自动：假设 → 编码 → 测试 → 迭代",
      "效率比人工高 10-100 倍",
    ],
    content: `<h3>RD-Agent 闭环</h3>
<ol>
<li><strong>提出假设：</strong>LLM 基于领域知识生成因子想法</li>
<li><strong>编码：</strong>自动生成 Python 实现</li>
<li><strong>回测：</strong>自动跑历史回测</li>
<li><strong>评估：</strong>计算 IC / ICIR / 换手</li>
<li><strong>迭代：</strong>基于结果让 LLM 改进</li>
</ol>
<pre><code># 简化 RD-Agent
class RDAgent:
    def __init__(self, llm, data):
        self.llm = llm
        self.data = data
    def propose(self):
        return self.llm.invoke('提出一个销量预测因子')
    def code(self, idea):
        return self.llm.invoke(f'用 Python 实现: {idea}')
    def test(self, code):
        exec(code)
        return calculate_ic(...)
    def iterate(self, n=100):
        for _ in range(n):
            idea = self.propose()
            code = self.code(idea)
            ic = self.test(code)
            if ic &gt; 0.1:
                save_factor(code)</code></pre>`,
  },
  {
    id: "deep-74", day: 74, week: 12, track: "deep",
    title: "因子正交化 + Alpha 剥离",
    description: "因子之间的去相关",
    objectives: [
      "理解因子正交化",
      "掌握残差化（residualization）",
      "知道 Alpha 剥离",
    ],
    duration: 45,
    cues: [
      "正交化：让因子之间不相关",
      "残差化：从一个因子中剔除其他因子的成分",
      "Alpha = 收益中无法被已知因子解释的部分",
    ],
    content: `<pre><code># 残差化
from sklearn.linear_model import LinearRegression
# 把 factor_B 对 factor_A 回归，取残差
model = LinearRegression().fit(df[['factor_A']], df['factor_B'])
df['factor_B_pure'] = df['factor_B'] - model.predict(df[['factor_A']])

# Gram-Schmidt 正交化
def orthogonalize(factors_df):
    result = factors_df.copy()
    for i in range(1, len(factors_df.columns)):
        for j in range(i):
            result.iloc[:, i] -= np.dot(result.iloc[:, i], result.iloc[:, j]) / \
                                  np.dot(result.iloc[:, j], result.iloc[:, j]) * result.iloc[:, j]
    return result</code></pre>`,
  },
  {
    id: "deep-75", day: 75, week: 12, track: "deep",
    title: "因子组合 + 风险控制",
    description: "多因子组合优化",
    objectives: [
      "理解因子组合",
      "掌握均值-方差优化",
      "知道风险预算",
    ],
    duration: 45,
    cues: [
      "组合 = 多因子加权",
      "均值-方差：最大化收益/风险",
      "风险预算：按风险贡献分配",
    ],
    content: `<pre><code># 均值-方差优化
from scipy.optimize import minimize
def portfolio_variance(weights, cov_matrix):
    return weights @ cov_matrix @ weights

def optimize_portfolio(expected_returns, cov_matrix, target_return):
    n = len(expected_returns)
    constraints = [
        {'type': 'eq', 'fun': lambda w: np.sum(w) - 1},
        {'type': 'eq', 'fun': lambda w: w @ expected_returns - target_return}
    ]
    bounds = [(0, 0.3)] * n  # 单标的上限 30%
    result = minimize(portfolio_variance, np.ones(n)/n,
                      args=(cov_matrix,), constraints=constraints, bounds=bounds)
    return result.x</code></pre>`,
  },
  {
    id: "deep-76", day: 76, week: 12, track: "deep",
    title: "变点检测 + 因子失效预警",
    description: "因子何时失效",
    objectives: [
      "理解因子失效信号",
      "掌握变点检测",
      "建立失效预警",
    ],
    duration: 45,
    cues: [
      "IC 持续下降 → 失效",
      "变点：IC 序列的结构性变化",
      "PELT / BOCPD 算法",
    ],
    content: `<pre><code>import ruptures as rpt
# 检测 IC 序列的变点
algo = rpt.Pelt(model='rbf').fit(ic_series.values)
bkps = algo.predict(pen=10)

# 失效预警
def failure_warning(ic_series, window=60, threshold=0.02):
    recent_ic = ic_series[-window:].mean()
    historical_ic = ic_series[:-window].mean()
    if recent_ic &lt; threshold * historical_ic:
        return '⚠️ 因子可能失效'</code></pre>`,
  },
  {
    id: "deep-77", day: 77, week: 12, track: "deep",
    title: "高级因子：非线性和交互",
    description: "用 ML 挖非线性因子",
    objectives: [
      "理解非线性因子",
      "掌握交互因子",
      "知道用树模型提取特征重要性",
    ],
    duration: 45,
    cues: [
      "非线性：原始因子的变换（平方/对数/分位）",
      "交互：两因子的乘积/比值",
      "树模型自动学交互",
    ],
    content: `<pre><code># 非线性变换
df['factor_log'] = np.log1p(df['factor'].clip(lower=0))
df['factor_rank'] = df['factor'].rank(pct=True)

# 交互因子
df['price_x_promo'] = df['price'] * df['promotion']
df['momentum_div_vol'] = df['momentum'] / (df['volatility'] + 1e-8)

# 用 LightGBM 自动学交互
import lightgbm as lgb
model = lgb.LGBMRegressor().fit(X, y)
importance = model.feature_importances_</code></pre>`,
  },
  {
    id: "deep-78", day: 78, week: 12, track: "deep",
    title: "因子归因报告",
    description: "解释模型的预测来源",
    objectives: [
      "理解因子归因",
      "结合 SHAP 做归因",
      "产出业务报告",
    ],
    duration: 45,
    cues: [
      "归因 = 解释预测来源",
      "SHAP：每个特征的贡献",
      "业务报告：哪些因子驱动了这次预测",
    ],
    content: `<pre><code>import shap
explainer = shap.TreeExplainer(model)
shap_values = explainer.shap_values(X_test)

# 单次预测归因
def explain_prediction(idx):
    base = explainer.expected_value
    contributions = pd.Series(shap_values[idx], index=X_test.columns)
    top_factors = contributions.abs().sort_values(ascending=False).head(5)
    return f"预测来源：{top_factors.to_dict()}"

# 全局归因
shap.summary_plot(shap_values, X_test)</code></pre>`,
  },
  {
    id: "deep-79", day: 79, week: 12, track: "deep",
    title: "因子管理 + 版本控制",
    description: "工程化的因子库",
    objectives: [
      "理解因子工程化",
      "掌握因子版本控制",
      "建立因子注册中心",
    ],
    duration: 45,
    cues: [
      "因子像代码：版本 + 测试 + 文档",
      "注册中心：因子元数据",
      "A/B 测试：新因子 vs 旧因子",
    ],
    content: `<h3>因子注册中心</h3>
<pre><code># factor_registry.yaml
factors:
  - id: momentum_7d
    version: 1.2.0
    description: 过去 7 天动量
    formula: "close.pct_change(7)"
    ic_30d: 0.08
    status: production
  - id: price_elasticity
    version: 0.3.0
    description: 价格弹性
    formula: "demand_change / price_change"
    ic_30d: 0.12
    status: experiment</code></pre>`,
  },
  {
    id: "deep-80", day: 80, week: 12, track: "deep",
    title: "因子阶段总结 + 作品整理",
    description: "回顾 15 天因子挖掘",
    objectives: [
      "形成因子工程能力地图",
      "整理因子库作品",
      "预告电力大宗",
    ],
    duration: 60,
    cues: [
      "因子思维可迁移到任何预测问题",
      "RD-Agent 是 2026 的核心竞争力",
      "电力大宗：扩展视野",
    ],
    content: `<h3>因子阶段完成标志</h3>
<ul>
<li>✅ 掌握 IC / ICIR / 换手 / 衰减</li>
<li>✅ 会设计供应链因子</li>
<li>✅ 会跑分层回测</li>
<li>✅ 会用 RD-Agent 自动挖因子</li>
<li>✅ 会用 SHAP 做因子归因</li>
<li>✅ 有一个 50+ 因子的因子库</li>
</ul>
<h3>电力大宗预告</h3>
<p>把因子思维迁移到电力和大宗商品——不同行业的因子不同，但方法论相通。</p>`,
  },

  // ───────────────────────────────────────────────────────────
  // 电力 + 大宗商品业务（Day 81-100，20 天，扩展视野）
  // ───────────────────────────────────────────────────────────

  // ===== Week 13 · Day 81-87 · 电力市场 =====
  {
    id: "deep-81", day: 81, week: 13, track: "deep",
    title: "电力市场结构入门",
    description: "日前 / 实时 / 辅助服务",
    objectives: [
      "理解电力市场的四个子市场",
      "知道电价形成的机制",
      "了解电力预测的特殊性",
    ],
    duration: 45,
    cues: [
      "日前市场：提前一天报价",
      "实时市场：当天平衡",
      "辅助服务：调频/备用",
      "容量市场：长期容量补偿",
    ],
    content: `<h3>电力市场四子市场</h3>
<table>
<tr><th>市场</th><th>时间尺度</th><th>交易内容</th></tr>
<tr><td>日前</td><td>D-1</td><td>主能量</td></tr>
<tr><td>实时</td><td>5-15 分钟</td><td>偏差平衡</td></tr>
<tr><td>辅助服务</td><td>秒-分钟</td><td>调频/备用</td></tr>
<tr><td>容量</td><td>年度</td><td>容量补偿</td></tr>
</table>
<h3>电价预测的特殊性</h3>
<ul>
<li>强季节性（日/周/年）</li>
<li>尖峰（极端天气时价格暴涨）</li>
<li>负电价（可再生能源过剩时）</li>
<li>跳跃（机组故障）</li>
</ul>`,
  },
  {
    id: "deep-82", day: 82, week: 13, track: "deep",
    title: "电价预测：TFT + PatchTST",
    description: "2026 SOTA 时序模型",
    objectives: [
      "理解 TFT（Temporal Fusion Transformer）",
      "掌握 PatchTST",
      "知道和传统方法的差异",
    ],
    duration: 60,
    cues: [
      "TFT：Google 可解释 DL 时序",
      "PatchTST：把序列切 patch",
      "Chronos：零样本预测",
    ],
    content: `<pre><code># PyTorch Forecasting 的 TFT
from pytorch_forecasting import TemporalFusionTransformer
tft = TemporalFusionTransformer.from_dataset(training_dataset)
trainer = pl.Trainer(max_epochs=50)
trainer.fit(tft, train_dataloader, val_dataloader)

# PatchTST
from patchtst import PatchTST
model = PatchTST(
    patch_len=16,
    stride=8,
    d_model=128,
    n_heads=4,
    n_layers=3,
)</code></pre>
<h3>TFT 的优势</h3>
<ul>
<li>可解释：变量重要性 + 时点注意力</li>
<li>多变量 + 多步预测</li>
<li>处理已知未来变量（如节假日）</li>
</ul>`,
  },
  {
    id: "deep-83", day: 83, week: 13, track: "deep",
    title: "电力调度优化：Gurobi + Pyomo",
    description: "数学规划求解器",
    objectives: [
      "理解调度优化的数学模型",
      "会写 Pyomo 模型",
      "知道 LP / MIP 的差异",
    ],
    duration: 60,
    cues: [
      "调度 = 在约束下最小化成本",
      "约束：发电平衡 / 容量 / 爬坡",
      "Gurobi：商业求解器（学术免费）",
    ],
    content: `<pre><code>import pyomo.environ as pyo
model = pyo.ConcreteModel()
model.gen = pyo.Set(initialize=['G1', 'G2', 'G3'])
model.t = pyo.RangeSet(1, 24)
model.P = pyo.Var(model.gen, model.t, domain=pyo.NonNegativeReals)

# 目标：最小化总发电成本
model.obj = pyo.Objective(
    expr=sum(cost[g] * model.P[g, t] for g in model.gen for t in model.t),
    sense=pyo.minimize
)

# 约束 1：每个时段满足负荷
def load_balance(model, t):
    return sum(model.P[g, t] for g in model.gen) >= load[t]
model.load_con = pyo.Constraint(model.t, rule=load_balance)

# 约束 2：发电机容量
def capacity(model, g, t):
    return model.P[g, t] &lt;= cap_max[g]
model.cap_con = pyo.Constraint(model.gen, model.t, rule=capacity)

solver = pyo.SolverFactory('gurobi')
solver.solve(model)</code></pre>`,
  },
  {
    id: "deep-84", day: 84, week: 13, track: "deep",
    title: "电力双层规划 + 预测优化级联",
    description: "预测 + 优化的级联",
    objectives: [
      "理解双层规划",
      "知道预测和优化的级联",
      "了解 stochastic optimization",
    ],
    duration: 45,
    cues: [
      "上层：决策变量（如调度）",
      "下层：市场响应（如价格）",
      "级联：先用 TFT 预测价格，再优化调度",
    ],
    content: `<h3>预测优化级联</h3>
<ol>
<li><strong>预测：</strong>TFT 预测未来 24 小时电价</li>
<li><strong>优化：</strong>用预测价格优化储能调度（低价充电、高价放电）</li>
<li><strong>反馈：</strong>实际执行结果反馈给预测模型</li>
</ol>
<pre><code># 储能调度优化
def optimize_storage(price_forecast, capacity=100, efficiency=0.9):
    """低价充电、高价放电"""
    model = pyo.ConcreteModel()
    model.t = pyo.RangeSet(0, len(price_forecast)-1)
    model.charge = pyo.Var(model.t, domain=pyo.NonNegativeReals)
    model.discharge = pyo.Var(model.t, domain=pyo.NonNegativeReals)
    model.soc = pyo.Var(model.t, domain=pyo.NonNegativeReals, bounds=(0, capacity))

    # 目标：最大化套利收益
    model.obj = pyo.Objective(
        expr=sum(price_forecast[t] * (model.discharge[t] - model.charge[t])
                 for t in model.t),
        sense=pyo.maximize
    )
    # SOC 平衡
    def soc_balance(model, t):
        if t == 0:
            return model.soc[t] == 0
        return model.soc[t] == model.soc[t-1] + \
               efficiency * model.charge[t] - model.discharge[t] / efficiency
    model.soc_con = pyo.Constraint(model.t, rule=soc_balance)
    return model</code></pre>`,
  },
  {
    id: "deep-85", day: 85, week: 13, track: "deep",
    title: "可再生能源预测",
    description: "风电 / 光伏出力预测",
    objectives: [
      "理解新能源出力的特点",
      "知道数值天气预报（NWP）",
      "了解预测误差对市场的影响",
    ],
    duration: 45,
    cues: [
      "新能源出力强依赖天气",
      "NWP = Numerical Weather Prediction",
      "预测误差 → 不平衡成本",
    ],
    content: `<h3>新能源预测流程</h3>
<ol>
<li><strong>NWP：</strong>ECMWF / GFS 提供未来 7 天气象</li>
<li><strong>统计模型：</strong>用历史 NWP + 实际出力训练</li>
<li><strong>输出：</strong>未来 0-72 小时的发电预测</li>
</ol>
<pre><code># 用 LightGBM 预测光伏出力
features = ['温度', '辐照度', '云量', '湿度', '风速']
model = lgb.LGBMRegressor().fit(X_train[features], y_train)
forecast = model.predict(X_test[features])</code></pre>
<h3>预测误差的市场影响</h3>
<p>不平衡电量 = 实际 - 计划。偏差大 → 不平衡成本高。所以新能源场站要做概率预测，量化不确定性。</p>`,
  },
  {
    id: "deep-86", day: 86, week: 13, track: "deep",
    title: "电力需求响应 + 虚拟电厂",
    description: "需求侧管理",
    objectives: [
      "理解需求响应（DR）",
      "知道虚拟电厂（VPP）",
      "了解聚合商模式",
    ],
    duration: 45,
    cues: [
      "DR：用户响应价格信号调整负荷",
      "VPP：聚合分布式资源",
      "聚合商：把小用户打包成大玩家",
    ],
    content: `<h3>需求响应类型</h3>
<ul>
<li><strong>价格型：</strong>分时电价 / 实时电价</li>
<li><strong>激励型：</strong>削峰补偿 / 紧急响应</li>
<li><strong>调节型：</strong>自动参与调频</li>
</ul>
<h3>虚拟电厂（VPP）</h3>
<p>聚合大量分布式资源（储能 / EV / 可调负荷），统一调度参与市场。</p>
<pre><code># VPP 聚合优化
def vpp_dispatch(resources, market_price):
    """在市场价格下，调度所有资源"""
    total = 0
    for r in resources:
        if market_price &gt; r.marginal_cost:
            total += r.capacity  # 放电
        elif market_price &lt; r.charge_cost:
            total -= r.capacity  # 充电
    return total</code></pre>`,
  },
  {
    id: "deep-87", day: 87, week: 13, track: "deep",
    title: "Week 13 复习 + 电力案例",
    description: "电价预测 + 调度优化案例",
    objectives: [
      "完成一个电价预测 + 储能调度案例",
      "知道和供应链的差异",
      "形成跨场景迁移能力",
    ],
    duration: 60,
    cues: [
      "电价：尖峰 + 季节",
      "供应链：促销 + 节假日",
      "方法论相同，数据不同",
    ],
    content: `<h3>跨场景迁移对照</h3>
<table>
<tr><th></th><th>供应链</th><th>电力</th></tr>
<tr><td>目标</td><td>销量</td><td>电价 / 负荷</td></tr>
<tr><td>季节</td><td>节假日</td><td>日/周/年</td></tr>
<tr><td>外生</td><td>促销 / 广告</td><td>天气 / 检修</td></tr>
<tr><td>决策</td><td>补货</td><td>调度 / 储能</td></tr>
<tr><td>方法</td><td>LightGBM + 概率</td><td>TFT + 优化</td></tr>
</table>`,
  },

  // ===== Week 14 · Day 88-95 · 大宗商品 + 套保 =====
  {
    id: "deep-88", day: 88, week: 14, track: "deep",
    title: "大宗商品市场入门",
    description: "铜 / 铝 / 原油 / 农产品",
    objectives: [
      "理解大宗商品的分类",
      "知道价格驱动因素",
      "了解现货 vs 期货",
    ],
    duration: 45,
    cues: [
      "金属：铜 / 铝 / 锌（工业需求）",
      "能源：原油 / 天然气 / 煤炭",
      "农产品：大豆 / 玉米 / 小麦",
      "现货 vs 期货：期货有套保和投机",
    ],
    content: `<h3>大宗商品分类</h3>
<table>
<tr><th>类别</th><th>代表</th><th>价格驱动</th></tr>
<tr><td>金属</td><td>铜 / 铝</td><td>工业需求 / 库存</td></tr>
<tr><td>能源</td><td>原油 / 天然气</td><td>OPEC / 地缘</td></tr>
<tr><td>农产品</td><td>大豆 / 玉米</td><td>天气 / 季节</td></tr>
<tr><td>贵金属</td><td>金 / 银</td><td>避险 / 实际利率</td></tr>
</table>
<h3>价格形成</h3>
<p>现货价格 = 即时交割价格；期货价格 = 未来交割价格。<br>
基差 = 现货 - 期货，反映供需紧张程度。</p>`,
  },
  {
    id: "deep-89", day: 89, week: 14, track: "deep",
    title: "商品因子 + 周期分析",
    description: "大宗商品的因子体系",
    objectives: [
      "设计商品因子",
      "理解库存周期",
      "知道跨品种关联",
    ],
    duration: 45,
    cues: [
      "库存因子：LME / SHFE 库存",
      "期限结构：近月 vs 远月",
      "跨品种：铜油比 / 金银比",
    ],
    content: `<h3>大宗商品因子库</h3>
<table>
<tr><th>类别</th><th>因子</th></tr>
<tr><td>库存</td><td>LME 库存变化 / 可用天数</td></tr>
<tr><td>期限</td><td>近远月价差 / 基差</td></tr>
<tr><td>持仓</td><td>基金净多 / 商业空头</td></tr>
<tr><td>跨品种</td><td>铜油比 / 金银比 / 螺纹-铁矿</td></tr>
<tr><td>宏观</td><td>美元指数 / 实际利率</td></tr>
<tr><td>技术</td><td>动量 / 波动率 / 均值回归</td></tr>
</table>`,
  },
  {
    id: "deep-90", day: 90, week: 14, track: "deep",
    title: "套保策略设计",
    description: "用期货对冲现货风险",
    objectives: [
      "理解套保原理",
      "会算最优套保比",
      "知道基差风险",
    ],
    duration: 45,
    cues: [
      "套保 = 用期货锁定价格",
      "最优套保比 = cov(现货, 期货) / var(期货)",
      "基差风险：现货和期货的价格差波动",
    ],
    content: `<pre><code>import numpy as np
# 最小方差套保比
spot_returns = np.diff(np.log(spot_prices))
fut_returns = np.diff(np.log(fut_prices))
hedge_ratio = np.cov(spot_returns, fut_returns)[0, 1] / np.var(fut_returns)

# 套保效果
hedged_portfolio = spot_returns - hedge_ratio * fut_returns
print(f"套保后方差: {np.var(hedged_portfolio):.6f}")
print(f"原始方差: {np.var(spot_returns):.6f}")
print(f"方差降低: {1 - np.var(hedged_portfolio)/np.var(spot_returns):.1%}")</code></pre>
<h3>套保类型</h3>
<ul>
<li><strong>多头套保：</strong>未来要买，现在买期货锁价</li>
<li><strong>空头套保：</strong>持有现货，卖期货防跌</li>
<li><strong>交叉套保：</strong>用相关品种对冲（如用铝期货对冲铝合金）</li>
</ul>`,
  },
  {
    id: "deep-91", day: 91, week: 14, track: "deep",
    title: "Monte Carlo 回测 + 策略稳健性",
    description: "策略的统计检验",
    objectives: [
      "理解 Monte Carlo 在策略检验的应用",
      "掌握 White's Reality Check",
      "知道 PBO（Probability of Backtest Overfitting）",
    ],
    duration: 45,
    cues: [
      "Monte Carlo：重采样评估策略",
      "PBO：过拟合的概率",
      "稳健策略：PBO 低",
    ],
    content: `<pre><code># Monte Carlo 回测
def monte_carlo_backtest(strategy, data, n_simulations=10000):
    returns = []
    for _ in range(n_simulations):
        sampled = data.sample(len(data), replace=True)
        r = strategy(sampled)
        returns.append(r)
    return np.percentile(returns, [5, 50, 95])

# PBO（Bailey 2017）
def pbo(strategy_matrix):
    """概率回测过拟合"""
    # 在多组参数中，最优策略在样本外的排名分布
    n = len(strategy_matrix)
    ranks = np.array([np.argsort(s) for s in strategy_matrix])
    pbo_value = (ranks[:, 0] &lt; n/2).mean()  # 简化版
    return pbo_value</code></pre>`,
  },
  {
    id: "deep-92", day: 92, week: 14, track: "deep",
    title: "大宗商品 + Agent",
    description: "用 RD-Agent 自动挖商品因子",
    objectives: [
      "把 RD-Agent 迁移到商品市场",
      "知道商品因子的特殊性",
      "整合到 Multi-Agent 投研",
    ],
    duration: 60,
    cues: [
      "商品因子：库存 / 期限 / 持仓",
      "RD-Agent：自动生成 + 测试",
      "Multi-Agent：整合到投研流程",
    ],
    content: `<pre><code># 商品因子 RD-Agent
from rd_agent import RDAgent
agent = RDAgent(
    data_config='commodity_config.yaml',
    llm='deepseek-v4-pro',
    factor_universe=['库存', '期限结构', '持仓', '宏观', '技术'],
    target='未来 5 日收益',
)
factors = agent.run(iterations=100)
print(f"发现有效因子 {len(factors)} 个")</code></pre>
<h3>Multi-Agent 商品投研</h3>
<ul>
<li>数据 Agent：拉 LME / SHFE / USDA 数据</li>
<li>因子 Agent：RD-Agent 挖因子</li>
<li>策略 Agent：组合因子 + 回测</li>
<li>风控 Agent：止损 / 仓位</li>
</ul>`,
  },
  {
    id: "deep-93", day: 93, week: 14, track: "deep",
    title: "风险预算 + 仓位管理",
    description: "凯利公式 + 风险平价",
    objectives: [
      "理解凯利公式",
      "掌握风险平价",
      "知道 VaR / CVaR",
    ],
    duration: 45,
    cues: [
      "凯利：最优仓位 = 期望收益 / 方差",
      "风险平价：按风险贡献分配资金",
      "VaR：95% 置信下的最大损失",
    ],
    content: `<pre><code># 凯利公式
def kelly_fraction(win_prob, win_loss_ratio):
    """凯利仓位"""
    return win_prob - (1 - win_prob) / win_loss_ratio

# 风险平价
from scipy.optimize import minimize
def risk_parity_objective(weights, cov_matrix):
    margins = weights @ cov_matrix  # 边际风险
    risk_contrib = weights * margins
    target = risk_contrib.sum() / len(weights)
    return np.sum((risk_contrib - target) ** 2)

# VaR
from scipy.stats import norm
var_95 = norm.ppf(0.05, mu, sigma)  # 5% 分位</code></pre>`,
  },
  {
    id: "deep-94", day: 94, week: 14, track: "deep",
    title: "跨场景迁移案例",
    description: "把供应链方法用到电力和商品",
    objectives: [
      "完成一个跨场景案例",
      "知道方法论的通用性",
      "形成迁移能力",
    ],
    duration: 60,
    cues: [
      "供应链 → 电力：库存 ↔ 储能",
      "供应链 → 商品：销量 ↔ 成交",
      "方法论相同，业务语言不同",
    ],
    content: `<h3>跨场景迁移对照</h3>
<table>
<tr><th>概念</th><th>供应链</th><th>电力</th><th>商品</th></tr>
<tr><td>目标</td><td>销量</td><td>负荷 / 电价</td><td>价格 / 成交</td></tr>
<tr><td>库存</td><td>仓库</td><td>储能</td><td>交易所库存</td></tr>
<tr><td>补货</td><td>(s,S)</td><td>充放电</td><td>建仓 / 平仓</td></tr>
<tr><td>风险</td><td>缺货</td><td>不平衡</td><td>价格波动</td></tr>
<tr><td>套保</td><td>安全库存</td><td>合约</td><td>期货</td></tr>
<tr><td>方法</td><td>LightGBM + 概率</td><td>TFT + 优化</td><td>因子 + 套保</td></tr>
</table>`,
  },
  {
    id: "deep-95", day: 95, week: 14, track: "deep",
    title: "电力大宗阶段总结",
    description: "回顾 15 天电力大宗",
    objectives: [
      "形成跨场景能力",
      "整理作品",
      "准备毕业",
    ],
    duration: 60,
    cues: [
      "方法论可迁移",
      "三个场景：供应链 + 电力 + 商品",
      "毕业项目：选一个场景做深",
    ],
    content: `<h3>电力大宗完成标志</h3>
<ul>
<li>✅ 理解电力市场四子市场</li>
<li>✅ 会用 TFT / PatchTST 预测电价</li>
<li>✅ 会用 Gurobi 做调度优化</li>
<li>✅ 理解大宗商品因子</li>
<li>✅ 会设计套保策略</li>
<li>✅ 能跨场景迁移方法论</li>
</ul>`,
  },

  // ===== Week 15 · Day 96-100 · 最终毕业 =====
  {
    id: "deep-96", day: 96, week: 15, track: "deep",
    title: "最终毕业项目：选场景深化",
    description: "把 100 天学到的所有能力整合",
    objectives: [
      "选一个场景（供应链/电力/商品）",
      "整合 P4 因果 + P5 库存 + P6 Agent + 因子",
      "做一个完整作品",
    ],
    duration: 90,
    cues: [
      "推荐选供应链（最对口）",
      "整合：预测 + 决策 + 归因 + Agent",
      "产出：代码 + 报告 + Demo + 答辩",
    ],
    content: `<h3>毕业项目选项</h3>
<ol>
<li><strong>选项 A · 供应链决策系统（推荐）：</strong>预测 + 库存 + 营销归因 + Agent 化</li>
<li><strong>选项 B · 电力交易系统：</strong>电价预测 + 储能调度 + 套保</li>
<li><strong>选项 C · 商品量化：</strong>因子挖掘 + 策略 + 套保</li>
</ol>
<h3>无论选哪个，都要包含</h3>
<ul>
<li>数据层：多源数据整合</li>
<li>预测层：SOTA 模型 + 概率预测</li>
<li>决策层：业务可执行的决策</li>
<li>归因层：因果推断 + SHAP</li>
<li>Agent 层：LangGraph 自动化</li>
<li>工程层：Docker + MLflow</li>
</ul>`,
  },
  {
    id: "deep-97", day: 97, week: 15, track: "deep",
    title: "毕业项目开发 + AI 辅助",
    description: "用 AI 加速开发",
    objectives: [
      "用 AI 辅助写代码",
      "用 AI 做代码 review",
      "保持高效迭代",
    ],
    duration: 90,
    cues: [
      "AI 写模板，你改业务逻辑",
      "AI review 代码，找 bug",
      "每天推进一个模块",
    ],
    content: `<h3>AI 辅助开发流程</h3>
<ol>
<li><strong>需求：</strong>用自然语言描述给 AI</li>
<li><strong>模板：</strong>AI 生成代码骨架</li>
<li><strong>填充：</strong>你填业务逻辑和数据</li>
<li><strong>Review：</strong>AI 检查 bug 和防泄漏</li>
<li><strong>迭代：</strong>跑起来后让 AI 提改进建议</li>
</ol>
<div class="ex-box"><h4>✏️ 高效 Prompt</h4>
<p><em>"我要做一个 SKU 销量预测系统，含数据加载 / 特征工程 / LightGBM 训练 / 概率预测 / 库存决策。给我完整的模块化代码骨架，每块留 TODO 给我填。"</em></p></div>`,
  },
  {
    id: "deep-98", day: 98, week: 15, track: "deep",
    title: "毕业项目打磨 + 文档",
    description: "把作品打磨到位",
    objectives: [
      "代码清理",
      "文档完善",
      "Demo 上线",
    ],
    duration: 90,
    cues: [
      "代码 PEP8 合规",
      "README 含架构图 + Demo 链接",
      "HuggingFace Space / Streamlit Cloud",
    ],
    content: `<h3>最终检查清单</h3>
<ul>
<li>代码 lint 通过</li>
<li>所有测试通过</li>
<li>README 含截图和 Demo 链接</li>
<li>报告 PDF 导出</li>
<li>Demo 部署到 HuggingFace Space</li>
<li>GitHub repo 公开 + 标星</li>
<li>LinkedIn 更新</li>
</ul>`,
  },
  {
    id: "deep-99", day: 99, week: 15, track: "deep",
    title: "毕业答辩 + 100 天复盘",
    description: "正式答辩 + 总结",
    objectives: [
      "完成 15 分钟答辩",
      "总结 100 天成长",
      "规划下一步",
    ],
    duration: 90,
    cues: [
      "自信讲解",
      "Q&A 诚实回答",
      "100 天能力地图",
    ],
    content: `<h3>🎓 100 天能力地图</h3>
<table>
<tr><th>领域</th><th>熟练</th><th>专家</th></tr>
<tr><td>因果归因（P4）</td><td></td><td>✅</td></tr>
<tr><td>库存补货（P5）</td><td></td><td>✅</td></tr>
<tr><td>Agent 化（P6）</td><td>✅</td><td></td></tr>
<tr><td>因子挖掘</td><td>✅</td><td></td></tr>
<tr><td>电力市场</td><td>✅</td><td></td></tr>
<tr><td>大宗商品</td><td>✅</td><td></td></tr>
<tr><td>工程化</td><td>✅</td><td></td></tr>
</table>
<h3>核心能力</h3>
<ol>
<li>能预测（ARIMA/LightGBM/TFT/概率预测）</li>
<li>能归因（DID/CausalImpact/DoubleML/MMM）</li>
<li>能决策（库存/补货/套保/调度）</li>
<li>能工程化（Docker/MLflow/Airflow）</li>
<li>能 Agent 化（LangGraph/RD-Agent）</li>
</ol>`,
  },
  {
    id: "deep-100", day: 100, week: 15, track: "deep",
    title: "Day 100：毕业 · 下一步",
    description: "100 天的终点，新的起点",
    objectives: [
      "正式毕业",
      "规划持续学习路径",
      "展望职业方向",
    ],
    duration: 30,
    cues: [
      "100 天建立了完整能力栈",
      "持续学习：每周论文 + 每月项目",
      "职业方向：分析师 / 算法工程师 / 投研",
    ],
    content: `<h3>🎓 100 天毕业总结</h3>
<p>恭喜你完成了 100 天的量化分析师修炼之路。回顾这 100 天：</p>
<ul>
<li><strong>Day 1-5：</strong>地基（数学 / Python / 工具）</li>
<li><strong>Day 6-25：</strong>★ P4 因果归因（营销 ROI 评估）</li>
<li><strong>Day 26-45：</strong>★ P5 库存补货（从预测到决策）</li>
<li><strong>Day 46-65：</strong>P6 Agent + 毕业项目</li>
<li><strong>Day 66-80：</strong>因子挖掘深化</li>
<li><strong>Day 81-100：</strong>电力 + 大宗商品（扩展视野）</li>
</ul>
<h3>持续学习机制</h3>
<ul>
<li>每周读 1 篇论文（Papers with Code）</li>
<li>每月做 1 个小项目</li>
<li>每季度更新作品集</li>
<li>每年选 1 个新方向深化</li>
</ul>
<h3>下一步方向（任选）</h3>
<ul>
<li><strong>深度学习时序：</strong>TFT / PatchTST / Chronos 深入</li>
<li><strong>Agent 工程化：</strong>LangGraph / Multi-Agent 产品化</li>
<li><strong>金融量化：</strong>因子挖掘 + 套保 + 高频</li>
<li><strong>电力市场：</strong>调度优化 + 储能 + VPP</li>
</ul>
<p><span class="key-pt">100 天只是开始。保持好奇心和执行力，量化的世界很大，你会走得很远。🚀</span></p>`,
  },
];
