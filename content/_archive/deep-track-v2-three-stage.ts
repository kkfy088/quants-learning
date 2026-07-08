import type { DayContent } from "@/lib/types";

// ════════════════════════════════════════════════════════════
// 100 天深化轨 · v2.0 三段式结构（5+30+30+35）
//   Day 1-35   阶段二 · 时序预测 + 因果分析（AI 辅助加速）
//   Day 36-65  阶段三 · 统计学深入（SARIMA / 状态空间 / 贝叶斯）
//   Day 66-100 阶段四 · 路径 A · 供应链库存决策（对口工作）
// 5 天速成（crash-course.ts）独立成轨，此轨 Day 1 接在 5 天之后。
// ════════════════════════════════════════════════════════════

export const deepDays: DayContent[] = [
  // ───────────────────────────────────────────────────────────
  // 阶段二 · 时序预测 + 因果分析（Day 1-35）
  // 5 天速成后直接做项目，30 天内产出 2 个作品
  // ───────────────────────────────────────────────────────────

  // ===== Week 1 · Day 1-7 · 承上启下 + 时序数据预处理 =====
  {
    id: "deep-1", day: 1, week: 1, track: "deep",
    title: "5 天回顾 + 阶段二导论：30 天做两个作品",
    description: "承上启下，建立阶段二的学习节奏与作品目标",
    objectives: [
      "复盘 5 天速成掌握的内容（数学/pandas/Boosting/ARIMA/工具）",
      "理解阶段二目标：30 天内完成时序预测系统 + 因果归因报告",
      "建立 AI 辅助学习的工作流（提问-验证-总结）",
    ],
    duration: 30,
    cues: [
      "5 天速成留下了哪些『会用但不懂为什么』的点？",
      "时序预测系统 + 因果归因报告分别长什么样？",
      "AI 辅助学习的三个关键习惯：提问精确化 / 验证代码 / 总结归档",
    ],
    content: `<h3>阶段二的两个交付物</h3>
<p><span class="key-pt">交付物 1（Day 1-19）：时序预测系统</span>——一个能跑 ARIMA / SARIMA / LightGBM 三模型横评，并产出预测+回测报告的脚本。</p>
<p><span class="key-pt">交付物 2（Day 20-35）：因果归因报告</span>——一个用 DID + CausalImpact + DoubleML 三角验证促销/广告效果的完整分析。</p>
<h3>5 天速成的『会用但不懂』清单</h3>
<ul>
<li>会用 <code>auto_arima</code> 但不懂 p/d/q 怎么选 → Day 13-16 解决</li>
<li>会用 LightGBM 但不懂过拟合原理 → Day 23-25 解决</li>
<li>知道『相关≠因果』但不会做因果分析 → Day 27-33 解决</li>
</ul>
<div class="ex-box"><h4>✏️ 今日必做</h4>
<ol>
<li>把 5 天速成的笔记导出为 Markdown，整理成『已知 / 半知 / 想深入』三栏</li>
<li>在 AI 助手中提问：『我要做一个销量预测系统，30 天应该怎么规划？』对比它的回答和本提纲</li>
<li>新建 GitHub repo <code>my-forecast-system</code>，把后续每天的代码推上去</li>
</ol></div>`,
  },
  {
    id: "deep-2", day: 2, week: 1, track: "deep",
    title: "时序数据四大组件：趋势/季节/周期/噪声",
    description: "把一条时序拆成四个可解释的部分",
    objectives: [
      "理解时间序列的加性/乘性分解模型",
      "会用 statsmodels 的 seasonal_decompose",
      "学会读分解图，判断该用什么模型",
    ],
    duration: 45,
    cues: [
      "加性 vs 乘性怎么选？看季节波动的振幅是否随趋势变化",
      "周期（cycle）和季节（season）的区别——周期是不固定长度",
      "分解出来后，哪部分用模型预测？哪部分直接减掉？",
    ],
    content: `<h3>加性 vs 乘性模型</h3>
<p><code>y(t) = Trend + Seasonality + Residual</code>（加性）</p>
<p><code>y(t) = Trend × Seasonality × Residual</code>（乘性，等价于 log 后变加性）</p>
<pre><code>from statsmodels.tsa.seasonal import seasonal_decompose
result = seasonal_decompose(df['销量'], model='additive', period=7)
result.plot()  # 趋势 / 季节 / 残差三张图</code></pre>
<p><span class="key-pt">判断准则：</span>如果销量的波动幅度随销量增大而增大（如双十一前后），用乘性（或先取 log）。</p>
<div class="pit-box"><h4>⚠️ 常见错误</h4>
<p>忘了设 <code>period</code> 参数——周度季节=7，月度=12，没有季节性就不该用这个分解。</p></div>
<div class="ex-box"><h4>✏️ AI 辅助练习</h4>
<ol>
<li>找一份真实销量数据（Kaggle Rossmann / M5 Forecasting）</li>
<li>用 <code>seasonal_decompose</code> 分解，截图发给 AI 问：『这个分解合理吗？为什么残差还有规律？』</li>
<li>把 AI 的回答和你的观察对比，写成一段笔记</li>
</ol></div>`,
  },
  {
    id: "deep-3", day: 3, week: 1, track: "deep",
    title: "平稳性：ADF 检验 + 差分直觉",
    description: "为什么 ARIMA 要求平稳，怎么让它平稳",
    objectives: [
      "理解平稳性的严格定义（均值/方差/自协方差恒定）",
      "会跑 ADF / KPSS 检验并读 p 值",
      "理解差分（d 参数）的数学含义",
    ],
    duration: 45,
    cues: [
      "ADF 的 H0 是『有单位根』，p<0.05 才能拒绝（即平稳）",
      "一阶差分 = 今天减昨天；二阶差分 = 差分的差分（很少用）",
      "季节差分 = 今天减 7 天前（对周季节有效）",
    ],
    content: `<h3>为什么 ARIMA 要平稳</h3>
<p>ARIMA 模型的预测本质是『假设统计性质不随时间变化』——如果均值在漂移、方差在爆炸，模型学到的规律明天就失效。</p>
<pre><code>from statsmodels.tsa.stattools import adfuller
result = adfuller(df['销量'])
print(f'ADF 统计量: {result[0]:.4f}')
print(f'p 值: {result[1]:.4f}')  # < 0.05 才平稳</code></pre>
<h3>差分的层次</h3>
<ul>
<li><strong>一阶差分 d=1：</strong><code>df['销量'].diff()</code>——消除线性趋势</li>
<li><strong>季节差分 D=1：</strong><code>df['销量'].diff(7)</code>——消除周季节</li>
<li><strong>log 后再差分：</strong>稳定方差的常用技巧</li>
</ul>
<div class="pit-box"><h4>⚠️ 过差分陷阱</h4>
<p>差分次数过多会让序列过度平滑、丢失信息——看 ACF 图，如果滞后 1 项是强负值（如 -0.5 以下），说明差分过头了。</p></div>`,
  },
  {
    id: "deep-4", day: 4, week: 1, track: "deep",
    title: "ACF / PACF 读图：ARIMA 的 p 和 q 怎么选",
    description: "通过自相关图确定 AR 和 MA 阶数",
    objectives: [
      "理解 ACF（自相关函数）和 PACF（偏自相关）",
      "掌握 p/q 选择的三个经典规则",
      "知道什么时候该用 auto_arima 自动选",
    ],
    duration: 45,
    cues: [
      "ACF 截尾 → MA(q)；PACF 截尾 → AR(p)",
      "ACF 拖尾且 PACF 拖尾 → ARMA，靠 AIC 比",
      "滞后 7/14/21 处有尖刺 → 需要季节项 SARIMA",
    ],
    content: `<h3>p / q 选择三规则（经典口诀）</h3>
<table>
<tr><th>ACF</th><th>PACF</th><th>模型</th></tr>
<tr><td>截尾（q 步后归零）</td><td>拖尾</td><td>MA(q)</td></tr>
<tr><td>拖尾</td><td>截尾（p 步后归零）</td><td>AR(p)</td></tr>
<tr><td>拖尾</td><td>拖尾</td><td>ARMA(p,q)，遍历比较 AIC</td></tr>
</table>
<pre><code>from statsmodels.graphics.tsaplots import plot_acf, plot_pacf
import matplotlib.pyplot as plt
fig, axes = plt.subplots(2, 1)
plot_acf(df['销量'].diff().dropna(), ax=axes[0])
plot_pacf(df['销量'].diff().dropna(), ax=axes[1])</code></pre>
<div class="pit-box"><h4>⚠️ 实战建议</h4>
<p>规则是 1970 年代 Box-Jenkins 方法论，现代工程里大多直接用 <code>auto_arima</code>（pmdarima 库）做网格搜索，比人工读图快 10 倍且不易出错。读图能力是『读懂模型在干什么』的必备，但选参数请交给算法。</p></div>`,
  },
  {
    id: "deep-5", day: 5, week: 1, track: "deep",
    title: "季节性处理：STL 分解 + 傅里叶项",
    description: "处理周/月/年多重季节性",
    objectives: [
      "理解 STL 分解（优于经典分解，能处理变化季节）",
      "学会用傅里叶项处理多重季节",
      "了解 TBATS / Prophet 的处理思路",
    ],
    duration: 45,
    cues: [
      "STL = Seasonal-Trend decomposition using Loess（局部加权回归）",
      "傅里叶项 = 把季节波看成多个正弦余弦波叠加",
      "Prophet 内部就是用傅里叶项建模季节",
    ],
    content: `<h3>STL 分解</h3>
<pre><code>from statsmodels.tsa.seasonal import STL
stl = STL(df['销量'], period=7, robust=True)
res = stl.fit()
res.plot()  # 趋势/季节/残差</code></pre>
<p><span class="key-pt">robust=True</span> 用的是稳健回归，对异常值（如大促）不敏感。</p>
<h3>傅里叶项（用于带外生变量的回归）</h3>
<pre><code>from statsmodels.tsa.deterministic import Fourier
# 周季节用 3 对正余弦，年季节用 10 对
fourier = Fourier(period=365.25, order=10)
exog = fourier.in_sample(df.index)</code></pre>
<div class="ex-box"><h4>✏️ 实战练习</h4>
<p>用同一份数据，分别做 STL 分解和傅里叶回归，对比两者的残差——哪个更接近白噪声？</p></div>`,
  },
  {
    id: "deep-6", day: 6, week: 1, track: "deep",
    title: "时序特征工程：lag / rolling / 日期特征",
    description: "把时序变成表格，让 LightGBM 也能预测时序",
    objectives: [
      "掌握 lag 特征（lag_1 / lag_7 / lag_365）",
      "掌握 rolling 特征（均值/标准差/最大值）",
      "理解为什么要严格防泄漏",
    ],
    duration: 45,
    cues: [
      "lag_7 = 7 天前的销量，今天能用",
      "rolling_7_mean 必须用 shift(1) 先错位，否则泄漏",
      "日期特征：周几 / 月几 / 是否周末 / 是否发薪日",
    ],
    content: `<h3>特征模板</h3>
<pre><code>def make_features(df):
    for lag in [1, 7, 14, 28]:
        df[f'lag_{lag}'] = df['销量'].shift(lag)
    for w in [7, 14, 28]:
        df[f'rmean_{w}'] = df['销量'].shift(1).rolling(w).mean()
        df[f'rstd_{w}'] = df['销量'].shift(1).rolling(w).std()
    df['dayofweek'] = df.index.dayofweek
    df['is_weekend'] = (df.index.dayofweek >= 5).astype(int)
    df['month'] = df.index.month
    return df</code></pre>
<div class="pit-box"><h4>⚠️ 致命错误：未来信息泄漏</h4>
<p>如果你直接 <code>df['销量'].rolling(7).mean()</code>，今天的均值包含了今天的销量——但预测今天时，你不知道今天的销量！必须先 <code>shift(1)</code>。</p></div>
<div class="ex-box"><h4>✏️ AI 辅助</h4>
<p>让 AI 帮你检查特征工程代码：<em>"这段代码有没有数据泄漏风险？逐行分析。"</em></p></div>`,
  },
  {
    id: "deep-7", day: 7, week: 1, track: "deep",
    title: "Week 1 复习 + 综合案例：销量分解",
    description: "把前 6 天的知识串成一个完整案例",
    objectives: [
      "完成一个完整的数据预处理 + 分解 + 特征工程流程",
      "建立可复用的代码模板",
      "理解每个步骤对最终预测的贡献",
    ],
    duration: 60,
    cues: [
      "数据加载 → 平稳性检验 → STL 分解 → 特征工程，串起来",
      "什么情况下该用 ARIMA？什么情况该用 LightGBM？",
      "本周产出的代码 / 笔记 / 图，归档到 GitHub",
    ],
    content: `<h3>综合案例流程</h3>
<ol>
<li>加载 Kaggle Rossmann 数据（1115 家店 × 942 天）</li>
<li>挑一家店，做 STL 分解（period=7）</li>
<li>ADF 检验原始序列 + 一阶差分 + 季节差分</li>
<li>构造 lag/rolling/日期特征</li>
<li>画 ACF/PACF，记录你的观察</li>
<li>把所有代码封装成 <code>preprocess.py</code>，推到 GitHub</li>
</ol>
<div class="ex-box"><h4>✏️ 交付物</h4>
<ul>
<li>一个 Jupyter Notebook，包含所有分析和图表</li>
<li>一个 <code>preprocess.py</code> 模块</li>
<li>一篇 Markdown 笔记，总结本周学到的 5 个最重要概念</li>
</ul></div>`,
  },

  // ===== Week 2 · Day 8-14 · ARIMA 家族精通 =====
  {
    id: "deep-8", day: 8, week: 2, track: "deep",
    title: "ARIMA(p,d,q) 完整流程 + auto_arima",
    description: "用 pmdarima 自动选参，理解每个参数",
    objectives: [
      "会用 pmdarima.auto_arima 做参数搜索",
      "理解 AIC/BIC 的作用（模型选择）",
      "看懂模型输出（系数 / p 值 / 残差诊断）",
    ],
    duration: 45,
    cues: [
      "auto_arima 搜索的是 (p,d,q) 的组合，目标是 AIC 最小",
      "AIC = 拟合优度 + 参数惩罚，越小越好",
      "信息准则不是绝对的，是相对的（同数据集内比较）",
    ],
    content: `<h3>auto_arima 模板</h3>
<pre><code>from pmdarima import auto_arima
model = auto_arima(
    train['销量'],
    seasonal=False,
    stepwise=True,           # 启发式搜索（比暴力快）
    trace=True,              # 打印搜索过程
    error_action='ignore',
    suppress_warnings=True,
    max_p=5, max_q=5, max_d=2,
)
print(model.summary())
model.plot_diagnostics(figsize=(12, 8))  # 残差诊断四图</code></pre>
<h3>读 summary</h3>
<ul>
<li><strong>coef</strong>：每个 AR/MA 项的系数</li>
<li><strong>P>|z|</strong>：系数显著性（<0.05 才有意义）</li>
<li><strong>AIC/BIC</strong>：信息准则，越小越好</li>
<li><strong>Ljung-Box</strong>：残差是否还有自相关（>0.05 才白噪声）</li>
</ul>`,
  },
  {
    id: "deep-9", day: 9, week: 2, track: "deep",
    title: "SARIMA：加季节项的 ARIMA",
    description: "(p,d,q) × (P,D,Q,m) 双重参数",
    objectives: [
      "理解 SARIMA 的季节参数 m / P / D / Q",
      "会用 SARIMA 处理周/月度季节性",
      "对比 SARIMA vs 普通 ARIMA 的预测效果",
    ],
    duration: 45,
    cues: [
      "m = 季节周期长度（周度=7，月度=12）",
      "P/D/Q 是季节维度的 AR/差分/MA",
      "auto_arima 加 seasonal=True, m=7 自动搜",
    ],
    content: `<h3>SARIMA 模型记号</h3>
<p><code>SARIMA(p,d,q) × (P,D,Q,m)</code></p>
<ul>
<li><strong>p,d,q</strong>：非季节部分（Day 8 学过）</li>
<li><strong>P,D,Q</strong>：季节部分的 AR / 差分 / MA</li>
<li><strong>m</strong>：季节周期（7=周，12=月，365.25=年）</li>
</ul>
<pre><code>model = auto_arima(
    train['销量'],
    seasonal=True, m=7,
    stepwise=True, trace=True,
    max_p=3, max_q=3, max_P=2, max_Q=2, max_d=1, max_D=1,
)</code></pre>
<h3>SARIMA 擅长 / 不擅长的场景</h3>
<table>
<tr><th>擅长</th><th>不擅长</th></tr>
<tr><td>单变量 + 强季节性</td><td>多变量（要用 SARIMAX）</td></tr>
<tr><td>样本量适中（&gt;2 个完整季节）</td><td>外部冲击（促销/事件）</td></tr>
<tr><td>趋势线性</td><td>非线性趋势</td></tr>
</table>`,
  },
  {
    id: "deep-10", day: 10, week: 2, track: "deep",
    title: "SARIMAX：带外生变量的 SARIMA",
    description: "把促销/天气/价格作为外生变量输入",
    objectives: [
      "理解外生变量（exog）的概念",
      "会用 SARIMAX 把促销/广告作为外生变量",
      "知道外生变量预测时的『未来值』问题",
    ],
    duration: 45,
    cues: [
      "exog 是模型之外但影响目标的变量（促销标记/天气）",
      "预测时必须提供 exog 的未来值——这是 SARIMAX 的最大限制",
      "如果未来 exog 未知（如天气），得先预测 exog 本身",
    ],
    content: `<pre><code>from statsmodels.tsa.statespace.sarimax import SARIMAX
model = SARIMAX(
    train['销量'],
    exog=train[['促销', '价格', '广告费']],
    order=(1, 1, 1),
    seasonal_order=(1, 1, 1, 7),
)
res = model.fit(disp=False)
# 预测时必须提供未来的 exog
forecast = res.get_forecast(steps=7, exog=test[['促销', '价格', '广告费']])</code></pre>
<div class="pit-box"><h4>⚠️ 致命陷阱</h4>
<p>很多人忘了预测时要传 <code>exog</code>，直接报错。更隐蔽的陷阱：你用了『未来才知道的促销』训练（如双十一促销标记），上线时模型要求输入未来 7 天的促销标记——但实际业务里促销计划可能还没定。SARIMAX 适合『促销计划已排期』的场景。</p></div>`,
  },
  {
    id: "deep-11", day: 11, week: 2, track: "deep",
    title: "ARIMA 诊断：残差 + Ljung-Box + AIC/BIC",
    description: "判断模型是否『够了』",
    objectives: [
      "理解残差诊断的四张图",
      "会跑 Ljung-Box 检验残差自相关",
      "会用 AIC/BIC 在多模型间选择",
    ],
    duration: 45,
    cues: [
      "残差应该是白噪声——没有规律，均值=0，方差恒定",
      "Ljung-Box p>0.05 → 残差无自相关，模型已『榨干』信息",
      "AIC 偏向拟合，BIC 偏向简洁（参数少）",
    ],
    content: `<h3>残差诊断四图</h3>
<ol>
<li><strong>标准化残差图：</strong>应该是无规律的噪声带，不能有趋势</li>
<li><strong>直方图 + KDE：</strong>应该接近正态分布</li>
<li><strong>Q-Q 图：</strong>点应该贴着对角线</li>
<li><strong>相关图（ACF/PACF）：</strong>所有滞后都应该在置信区间内</li>
</ol>
<pre><code>from statsmodels.stats.diagnostic import acorr_ljungbox
lb = acorr_ljungbox(res.resid, lags=[10], return_df=True)
print(lb)  # 看 p 值，> 0.05 才合格</code></pre>
<h3>AIC vs BIC</h3>
<table>
<tr><th></th><th>AIC</th><th>BIC</th></tr>
<tr><td>目标</td><td>预测准确</td><td>找真模型</td></tr>
<tr><td>参数惩罚</td><td>较轻（×2）</td><td>较重（×log(n)）</td></tr>
<tr><td>样本大时</td><td>倾向选复杂模型</td><td>倾向选简单模型</td></tr>
</table>`,
  },
  {
    id: "deep-12", day: 12, week: 2, track: "deep",
    title: "ARIMA vs Prophet 对照（同数据集）",
    description: "两个模型在同一份数据上横评",
    objectives: [
      "理解 Prophet 的优势（自动处理节假日/变点）",
      "理解 ARIMA 的优势（理论严格/可解释）",
      "学会用同一评估框架对比多模型",
    ],
    duration: 45,
    cues: [
      "Prophet 自动识别节假日、变点、季节性——开箱即用",
      "ARIMA 理论严格，但需要手动调参",
      "评估指标：MAE / MAPE / RMSE 三件套",
    ],
    content: `<pre><code>from prophet import Prophet
m = Prophet(
    yearly_seasonality=True,
    weekly_seasonality=True,
    changepoint_prior_scale=0.05,  # 趋势灵活度
)
m.add_country_holidays(country_name='CN')  # 中国节假日
m.fit(prophet_df)  # Prophet 要 ds + y 两列
future = m.make_future_dataframe(periods=7)
fcst = m.predict(future)</code></pre>
<h3>横评结论（经验法则）</h3>
<ul>
<li><strong>数据干净 + 单变量 + 强季节：</strong>ARIMA 通常更准</li>
<li><strong>有节假日 + 多重季节 + 缺失值：</strong>Prophet 更省心</li>
<li><strong>业务场景：</strong>两个都跑，比 MAE，谁好用谁</li>
</ul>
<div class="ex-box"><h4>✏️ 今日必做</h4>
<p>用同一份数据跑两个模型，画对比图，把结果写成报告推到 GitHub。</p></div>`,
  },
  {
    id: "deep-13", day: 13, week: 2, track: "deep",
    title: "时序交叉验证：TimeSeriesSplit + 滚动回测",
    description: "不能用 train_test_split(shuffle=True)",
    objectives: [
      "理解时序数据为什么不能随机切分",
      "会用 TimeSeriesSplit 做扩展窗口交叉验证",
      "掌握滚动回测（rolling forecast）的实现",
    ],
    duration: 45,
    cues: [
      "随机切分会让测试集混入未来信息——信息泄漏",
      "TimeSeriesSplit 是『前 n 折训练，第 n+1 折测试』",
      "滚动回测：每预测一步，把真实值加入训练集",
    ],
    content: `<h3>错误做法 vs 正确做法</h3>
<pre><code># ❌ 错误：随机切分会让模型『偷看』未来
from sklearn.model_selection import train_test_split
X_train, X_test = train_test_split(df, test_size=0.2, shuffle=True)

# ✅ 正确：时序切分
train = df.iloc[:int(len(df)*0.8)]
test = df.iloc[int(len(df)*0.8):]

# ✅ 更严谨：TimeSeriesSplit
from sklearn.model_selection import TimeSeriesSplit
tscv = TimeSeriesSplit(n_splits=5)
for train_idx, test_idx in tscv.split(df):
    train, test = df.iloc[train_idx], df.iloc[test_idx]</code></pre>
<h3>滚动回测（最贴近真实业务）</h3>
<pre><code>history = train.copy()
predictions = []
for t in range(len(test)):
    model = SARIMAX(history, order=(1,1,1)).fit(disp=False)
    yhat = model.forecast(steps=1)[0]
    predictions.append(yhat)
    history = pd.concat([history, test.iloc[[t]]])  # 真实值入训练集</code></pre>
<div class="pit-box"><h4>⚠️ 性能提示</h4>
<p>滚动回测每个 step 都要重新训练，很慢。如果用 LightGBM，可以一次训练后只滚动预测（数据更新但不重训）。</p></div>`,
  },
  {
    id: "deep-14", day: 14, week: 2, track: "deep",
    title: "里程碑 1 · ARIMA 完整案例（电商销量）",
    description: "把 Week 1-2 串成一个端到端案例",
    objectives: [
      "完成一个可交付的 ARIMA 预测脚本",
      "产出回测报告（MAE/MAPE + 残差诊断 + 预测图）",
      "代码归档 GitHub，准备作品集",
    ],
    duration: 90,
    cues: [
      "交付物 = 代码 + 报告 + 可视化",
      "报告里必须写：数据 / 方法 / 结果 / 业务建议",
      "这张图就是你简历里『项目经验』的核心素材",
    ],
    content: `<h3>里程碑 1 · 交付物清单</h3>
<ol>
<li><strong>数据：</strong>Kaggle Rossmann / M5 Forecasting 任选一份</li>
<li><strong>预处理：</strong>STL 分解 + ADF 检验 + 特征工程</li>
<li><strong>建模：</strong>auto_arima + SARIMA + Prophet 三模型对比</li>
<li><strong>评估：</strong>滚动回测 + MAE/MAPE/RMSE + 残差诊断</li>
<li><strong>报告：</strong>Markdown 一页纸，含图表 + 业务建议</li>
</ol>
<div class="ex-box"><h4>✏️ AI 辅助验收</h4>
<p>把你的报告发给 AI：<em>"这是我做的销量预测报告，请像资深数据科学家一样批判：方法论哪里有问题？结果是否可信？业务建议是否落地？"</em></p></div>`,
  },

  // ===== Week 3 · Day 15-21 · ML 时序 + 特征工程 =====
  {
    id: "deep-15", day: 15, week: 3, track: "deep",
    title: "LightGBM 时序化：lag + rolling 特征",
    description: "把表格模型改造成时序预测利器",
    objectives: [
      "理解 LightGBM 为什么在时序上常胜过 ARIMA",
      "掌握 lag + rolling 特征的批量构造",
      "学会 LightGBM 的核心参数（learning_rate / num_leaves / max_depth）",
    ],
    duration: 45,
    cues: [
      "LightGBM 优势：天然处理多变量 + 非线性 + 缺失值",
      "num_leaves 控制复杂度，过大→过拟合",
      "early stopping 防过拟合",
    ],
    content: `<pre><code>import lightgbm as lgb
params = {
    'objective': 'regression',
    'metric': 'mae',
    'learning_rate': 0.05,
    'num_leaves': 31,
    'max_depth': -1,
    'feature_fraction': 0.8,
    'bagging_fraction': 0.8,
    'bagging_freq': 5,
    'verbose': -1,
}
model = lgb.train(
    params,
    train_set=lgb.Dataset(X_train, y_train),
    valid_sets=[lgb.Dataset(X_val, y_val)],
    num_boost_round=1000,
    callbacks=[lgb.early_stopping(50), lgb.log_evaluation(100)],
)</code></pre>
<h3>为什么 LightGBM 在时序上常胜</h3>
<ul>
<li>ARIMA 假设严格平稳，LightGBM 不需要</li>
<li>ARIMA 难加入外生变量，LightGBM 天然多变量</li>
<li>ARIMA 难处理非线性（如促销阈值效应），LightGBM 自动学</li>
</ul>`,
  },
  {
    id: "deep-16", day: 16, week: 3, track: "deep",
    title: "Optuna 自动调参：贝叶斯优化",
    description: "比 GridSearch 快 10 倍",
    objectives: [
      "理解 Optuna 的 TPE 贝叶斯优化原理",
      "学会定义 LightGBM 的搜索空间",
      "知道早停（median pruner）的用法",
    ],
    duration: 45,
    cues: [
      "Optuna 比 GridSearch 快，因为它学历史结果",
      "TPE = Tree-structured Parzen Estimator",
      "调 100 次 trial 通常够用",
    ],
    content: `<pre><code>import optuna
def objective(trial):
    params = {
        'objective': 'regression',
        'metric': 'mae',
        'learning_rate': trial.suggest_float('lr', 0.01, 0.3, log=True),
        'num_leaves': trial.suggest_int('num_leaves', 15, 127),
        'max_depth': trial.suggest_int('max_depth', 3, 12),
        'feature_fraction': trial.suggest_float('ff', 0.5, 1.0),
        'bagging_fraction': trial.suggest_float('bf', 0.5, 1.0),
        'lambda_l1': trial.suggest_float('l1', 1e-3, 10, log=True),
        'lambda_l2': trial.suggest_float('l2', 1e-3, 10, log=True),
    }
    model = lgb.train(params, ..., num_boost_round=500,
                      callbacks=[lgb.early_stopping(30)])
    return model.best_score['valid_0']['l1']

study = optuna.create_study(direction='minimize')
study.optimize(objective, n_trials=50)
print(study.best_params)</code></pre>
<div class="ex-box"><h4>✏️ 实战</h4>
<p>把里程碑 1 的 ARIMA 案例用 LightGBM + Optuna 重做一遍，对比 MAE 改善了多少。</p></div>`,
  },
  {
    id: "deep-17", day: 17, week: 3, track: "deep",
    title: "多因子特征工程：价格/促销/天气/广告",
    description: "业务因子的系统化设计",
    objectives: [
      "理解特征工程的业务优先级",
      "掌握价格弹性、促销叠加、广告衰减的特征构造",
      "学会特征筛选（Filter / Wrapper / Embedded）",
    ],
    duration: 45,
    cues: [
      "价格弹性 = 销量变化% / 价格变化%",
      "促销叠加：折扣 × 节假日 × 库存",
      "广告衰减（Adstock）：广告效应随时间指数衰减",
    ],
    content: `<h3>业务特征清单</h3>
<table>
<tr><th>类别</th><th>特征</th><th>构造方法</th></tr>
<tr><td>价格</td><td>原价/折扣率/相对竞品价</td><td>直接计算</td></tr>
<tr><td>促销</td><td>促销标记/促销天数/促销深度</td><td>业务系统</td></tr>
<tr><td>广告</td><td>Adstock 衰减后预算</td><td>指数加权</td></tr>
<tr><td>季节</td><td>周几/月几/季度/节假日</td><td>日期函数</td></tr>
<tr><td>天气</td><td>温度/降水/极端天气</td><td>外部数据</td></tr>
<tr><td>历史</td><td>lag/rolling/同比/环比</td><td>shift/rolling</td></tr>
</table>
<pre><code># Adstock 衰减
def adstock(spend, decay=0.5):
    result = []
    acc = 0
    for x in spend:
        acc = x + decay * acc
        result.append(acc)
    return result</code></pre>`,
  },
  {
    id: "deep-18", day: 18, week: 3, track: "deep",
    title: "Target Encoding + K-fold 防泄漏",
    description: "类别特征的神器",
    objectives: [
      "理解 Target Encoding 的原理",
      "掌握 K-fold 防泄漏的实现",
      "知道什么时候该用 Target Encoding 而不是 OneHot",
    ],
    duration: 45,
    cues: [
      "Target Encoding = 用每个类别的目标均值替代类别",
      "直接用全量数据算 → 严重泄漏",
      "K-fold：用其他折的目标均值编码当前折",
    ],
    content: `<h3>为什么需要 Target Encoding</h3>
<p>对于高基数类别（如 SKU 编号、店铺 ID），OneHot 会产生几千列稀疏矩阵，LightGBM 处理慢且容易过拟合。Target Encoding 把每个类别压缩成一个数字。</p>
<pre><code>from sklearn.model_selection import KFold
def target_encode(train, col, target, n_splits=5, smoothing=10):
    global_mean = train[target].mean()
    kf = KFold(n_splits=n_splits, shuffle=True, random_state=42)
    encoded = pd.Series(index=train.index, dtype=float)
    for tr_idx, val_idx in kf.split(train):
        agg = train.iloc[tr_idx].groupby(col)[target].agg(['mean', 'count'])
        smooth = (agg['mean'] * agg['count'] + global_mean * smoothing) / (agg['count'] + smoothing)
        encoded.iloc[val_idx] = train.iloc[val_idx][col].map(smooth).fillna(global_mean)
    return encoded</code></pre>
<p><span class="key-pt">smoothing 参数</span>防止小样本类别过拟合——只有 10 个样本的 SKU，它的均值不可信，要向全局均值收缩。</p>`,
  },
  {
    "id": "deep-19", "day": 19, "week": 3, "track": "deep",
    "title": "SHAP 可解释性：特征贡献图",
    "description": "给老板讲清楚『广告费贡献多少销量』",
    "objectives": [
      "理解 SHAP 值（Shapley Additive exPlanations）",
      "会画 SHAP summary plot / dependence plot",
      "知道如何用 SHAP 做特征筛选和业务归因",
    ],
    "duration": 45,
    "cues": [
      "SHAP 来自博弈论，把预测结果分摊给每个特征",
      "summary plot：所有特征重要性排序",
      "dependence plot：某特征的边际效应",
    ],
    "content": `<pre><code>import shap
explainer = shap.TreeExplainer(model)
shap_values = explainer.shap_values(X_test)
shap.summary_plot(shap_values, X_test)
shap.dependence_plot('广告费', shap_values, X_test)</code></pre>
<h3>SHAP 在业务里的两个核心用法</h3>
<ol>
<li><strong>特征筛选：</strong>SHAP 值接近 0 的特征直接删</li>
<li><strong>业务归因：</strong>『这次预测销量 1000，其中广告贡献 300，促销贡献 200』——老板最爱听</li>
</ol>
<div class="ex-box"><h4>✏️ AI 辅助</h4>
<p>把 SHAP 图发给 AI：<em>"这张 SHAP 图能说明什么业务结论？哪些特征是噪声？"</em></p></div>`,
  },
  {
    "id": "deep-20", "day": 20, "week": 3, "track": "deep",
    "title": "模型集成：Stacking + 时序加权",
    "description": "ARIMA + LightGBM + Prophet 三合一",
    "objectives": [
      "理解 Stacking / Blending / 加权平均的区别",
      "学会用残差stacking（ARIMA 跑趋势，LightGBM 跑残差）",
      "知道集成不是万能的（多样性是前提）",
    ],
    "duration": 45,
    "cues": [
      "加权平均：最简单，适合基模型差异大",
      "Stacking：用元模型学权重，更灵活",
      "残差 stacking：ARIMA 预测 → LightGBM 学残差，效果常最佳",
    ],
    "content": `<h3>三种集成方式</h3>
<pre><code># 方式 1：简单加权
ensemble = 0.5 * lgb_pred + 0.3 * arima_pred + 0.2 * prophet_pred

# 方式 2：Stacking（用线性回归学权重）
from sklearn.linear_model import Ridge
stack_X = np.column_stack([lgb_pred, arima_pred, prophet_pred])
meta = Ridge(alpha=1.0).fit(stack_X, y_val)

# 方式 3：残差 stacking
arima_pred = arima_model.predict(train)
residual = train_y - arima_pred
lgb_model.fit(X_train, residual)  # 学残差
final = arima_pred_test + lgb_model.predict(X_test)</code></pre>
<div class="pit-box"><h4>⚠️ 多样性是前提</h4>
<p>集成三个高度相关的模型（都用 LightGBM）几乎没有提升。集成有效的前提是基模型『犯错的方式不同』——ARIMA 擅长趋势，LightGBM 擅长非线性，Prophet 擅长季节，集成才有意义。</p></div>`,
  },
  {
    "id": "deep-21", "day": 21, "week": 3, "track": "deep",
    "title": "Week 3 复习 + LightGBM vs ARIMA 横评",
    "description": "用同一份数据对比两个模型族",
    "objectives": [
      "完成 LightGBM + Optuna + SHAP 端到端流程",
      "和 Week 2 的 ARIMA 案例横评",
      "形成『什么时候用什么模型』的决策树",
    ],
    "duration": 60,
    "cues": [
      "LightGBM 多变量能力强，ARIMA 单变量理论强",
      "数据量小（&lt;500）→ ARIMA / Prophet",
      "数据量大 + 多因子 → LightGBM",
    ],
    "content": `<h3>横评报告模板</h3>
<table>
<tr><th>维度</th><th>ARIMA</th><th>LightGBM</th></tr>
<tr><td>数据量 &lt;500</td><td>✅ 适合</td><td>❌ 过拟合</td></tr>
<tr><td>数据量 &gt;5000</td><td>⚠️ 慢</td><td>✅ 适合</td></tr>
<tr><td>多变量</td><td>⚠️ SARIMAX 受限</td><td>✅ 天然支持</td></tr>
<tr><td>非线性</td><td>❌ 不支持</td><td>✅ 自动学</td></tr>
<tr><td>可解释</td><td>✅ 系数直观</td><td>✅ SHAP</td></tr>
<tr><td>外推</td><td>✅ 理论保证</td><td>❌ 边界外失效</td></tr>
</table>`,
  },

  // ===== Week 4 · Day 22-28 · 因果分析入门到实战 =====
  {
    "id": "deep-22", "day": 22, "week": 4, "track": "deep",
    "title": "因果 vs 相关：潜在结果框架",
    "description": "为什么相关≠因果",
    "objectives": [
      "理解潜在结果（potential outcomes）框架",
      "认识混淆变量、选择偏差",
      "建立因果思维的三个核心问题",
    ],
    "duration": 45,
    "cues": [
      "潜在结果：Y(1) 接受处理的潜在结果，Y(0) 不接受",
      "个体处理效应 ITE = Y(1) - Y(0)，但永远只能观察一个",
      "平均处理效应 ATE = E[Y(1) - Y(0)]",
    ],
    "content": `<h3>为什么相关≠因果</h3>
<p>经典案例：冰淇淋销量和溺水人数高度相关，但前者不导致后者——是气温（混淆变量）共同导致。</p>
<h3>潜在结果框架（Neyman-Rubin）</h3>
<ul>
<li><strong>处理 T：</strong>是否做了某事（如是否促销）</li>
<li><strong>潜在结果 Y(1), Y(0)：</strong>做和不做的两个平行宇宙</li>
<li><strong>事实观察：</strong>Y = T·Y(1) + (1-T)·Y(0)——你只能看到一个</li>
<li><strong>ITE：</strong>Y(1) - Y(0)，但永远未知</li>
<li><strong>ATE：</strong>E[Y(1) - Y(0)]，可通过实验或方法估计</li>
</ul>
<h3>因果推断的三大武器</h3>
<ol>
<li><strong>随机对照实验（RCT）：</strong>金标准，但贵</li>
<li><strong>自然实验：</strong>DID、合成控制、工具变量</li>
<li><strong>观察数据 + 假设：</strong>DoubleML、Propensity Score</li>
</ol>`,
  },
  {
    "id": "deep-23", "day": 23, "week": 4, "track": "deep",
    "title": "有向无环图（DAG）：画因果图",
    "description": "用图论工具梳理变量关系",
    "objectives": [
      "理解 DAG 的节点和有向边",
      "识别混淆变量、中介变量、对撞变量",
      "学会用 backdoor 准则确定该控制哪些变量",
    ],
    "duration": 45,
    "cues": [
      "混淆变量：同时影响 T 和 Y，必须控制",
      "中介变量：T → M → Y，控制 M 会切断真实效应",
      "对撞变量：T → C ← Y，控制 C 会引入虚假关联",
    ],
    "content": `<h3>三种变量的处理原则</h3>
<table>
<tr><th>类型</th><th>结构</th><th>处理</th></tr>
<tr><td>混淆变量</td><td>C → T, C → Y</td><td>✅ 必须控制</td></tr>
<tr><td>中介变量</td><td>T → M → Y</td><td>⚠️ 看研究问题</td></tr>
<tr><td>对撞变量</td><td>T → C ← Y</td><td>❌ 不能控制</td></tr>
</table>
<h3>Backdoor 准则</h3>
<p>要估计 T 对 Y 的因果效应，必须『关闭』所有从 T 到 Y 的后门路径——通过控制路径上的混淆变量。</p>
<pre><code># 用 pgmpy 画 DAG
from pgmpy.base import DAG
dag = DAG()
dag.add_edges_from([('气温', '冰淇淋销量'),
                    ('气温', '溺水人数'),
                    ('冰淇淋销量', '溺水人数')])  # 这是虚假因果</code></pre>
<div class="ex-box"><h4>✏️ AI 辅助</h4>
<p>把你的业务场景告诉 AI：<em>"促销影响销量，但还有价格、季节、库存这些变量，帮我画 DAG，识别哪些必须控制。"</em></p></div>`,
  },
  {
    "id": "deep-24", "day": 24, "week": 4, "track": "deep",
    "title": "双重差分（DID）实战",
    "description": "政策/活动效果评估的经典方法",
    "objectives": [
      "理解 DID 的『平行趋势假设』",
      "会跑 DID 回归并解释系数",
      "知道 DID 失效的场景",
    ],
    "duration": 45,
    "cues": [
      "DID = (实验组后 - 实验组前) - (对照组后 - 对照组前)",
      "平行趋势假设：没处理的话，两组变化趋势一致",
      "DID 系数 = 政策/活动的因果效应",
    ],
    "content": `<h3>DID 公式</h3>
<p><code>DID = (Ȳ_T,post - Ȳ_T,pre) - (Ȳ_C,post - Ȳ_C,pre)</code></p>
<pre><code>import statsmodels.api as sm
import statsmodels.formula.api as smf
df['treat_x_post'] = df['treat'] * df['post']
model = smf.ols('销量 ~ treat + post + treat_x_post', data=df).fit()
print(model.params['treat_x_post'])  # 这就是 DID 估计</code></pre>
<h3>平行趋势检验</h3>
<p>在政策实施前的多期数据上，画两组的趋势图，看是否平行。如果不平行，DID 结果不可信。</p>
<div class="pit-box"><h4>⚠️ DID 的三个陷阱</h4>
<ol>
<li>实验组对照组选错（如对照组也受溢出效应影响）</li>
<li>没有平行趋势就直接用</li>
<li>政策时点和其他冲击重合（如同时遇上疫情）</li>
</ol></div>`,
  },
  {
    "id": "deep-25", "day": 25, "week": 4, "track": "deep",
    "title": "合成控制法（Synthetic Control）",
    "description": "DID 的进化版，构造『合成对照组』",
    "objectives": [
      "理解合成控制法的权重构造",
      "会跑 SyntheticControl 并画对比图",
      "知道和 DID 的适用差异",
    ],
    "duration": 45,
    "cues": [
      "合成控制：用多个对照单位的加权组合模拟实验组",
      "权重通过最小化预处理期差异得到",
      "适合『只有一个实验单位』的场景（如某城市试点）",
    ],
    "content": `<pre><code>from SyntheticControlMethods import Synth
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
    "id": "deep-26", "day": 26, "week": 4, "track": "deep",
    "title": "CausalImpact：Google 贝叶斯反事实",
    "description": "用贝叶斯结构时序构造『如果没有干预会怎样』",
    "objectives": [
      "理解 CausalImpact 的贝叶斯结构时序模型",
      "会跑 CausalImpact 并解读结果图",
      "知道 CausalImpact 的核心假设（对照时间序列）",
    ],
    "duration": 45,
    "cues": [
      "CausalImpact 用贝叶斯结构时序拟合『反事实』",
      "需要提供 1+ 个对照序列（不受处理影响）",
      "输出：累积效应 / 平均效应 / 置信区间",
    ],
    "content": `<pre><code>from causalimpact import CausalImpact
ci = CausalImpact(
    data=df[['目标序列', '对照1', '对照2']],
    pre_period=['2024-01-01', '2025-01-01'],
    post_period=['2025-01-02', '2025-03-01'],
)
ci.run()
ci.plot()
print(ci.summary())  # 平均效应 + p 值</code></pre>
<h3>CausalImpact 三大要素</h3>
<ol>
<li><strong>目标序列：</strong>受处理的时间序列</li>
<li><strong>对照序列：</strong>不受处理但与目标相关的序列（如同行业其他公司股价）</li>
<li><strong>处理时点：</strong>明确的事件发生时间</li>
</ol>
<div class="ex-box"><h4>✏️ 实战</h4>
<p>用一份电商促销数据：目标=实验店销量，对照=同公司其他店销量，处理=大促日。跑 CausalImpact，输出促销的因果效应。</p></div>`,
  },
  {
    "id": "deep-27", "day": 27, "week": 4, "track": "deep",
    "title": "DoubleML：双重机器学习去偏",
    "description": "高维混淆变量的现代化解决方案",
    "objectives": [
      "理解 DoubleML 的去偏原理",
      "会跑 DoubleML 估计因果效应",
      "知道和传统 PS / IV 的差异",
    ],
    "duration": 45,
    "cues": [
      "DoubleML = 两个 ML 模型：一个预测 T，一个预测 Y",
      "用残差做回归，消除混淆偏差",
      "交叉拟合（cross-fitting）防过拟合偏差",
    ],
    "content": `<h3>DoubleML 三步</h3>
<ol>
<li>用 ML 拟合 T ~ X，得到 T 的残差（处理残差）</li>
<li>用 ML 拟合 Y ~ X，得到 Y 的残差（结果残差）</li>
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
<h3>为什么 DoubleML 比 Propensity Score 强</h3>
<ul>
<li>PS 只能控制低维混淆，DoubleML 支持高维（几百个变量）</li>
<li>PS 假设线性，DoubleML 用 ML 自动学非线性</li>
<li>DoubleML 有交叉拟合保证，理论严格</li>
</ul>`,
  },
  {
    "id": "deep-28", "day": 28, "week": 4, "track": "deep",
    "title": "uplift modeling：找对促销敏感的人",
    "description": "个体处理效应（ITE）估计",
    "objectives": [
      "理解 uplift 的概念（处理效应的个体差异）",
      "掌握 S/T/X/L Learner 四种方法",
      "知道 uplift 在营销中的应用",
    ],
    "duration": 45,
    "cues": [
      "uplift = Y(1) - Y(0) 在个体层面",
      "四类人：必然买/必然不买/促销才买/促销反而不买",
      "目标是找『促销才买』的人，给他们促销",
    ],
    "content": `<h3>四种 Learner</h3>
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
uplift = model.predict(X)  # 每个人的预测 ITE</code></pre>
<div class="ex-box"><h4>✏️ 业务应用</h4>
<p>电商场景：把 uplift 排序，给 Top 20% 的『促销敏感型』用户发券，比平均发券的 ROI 高 3-5 倍。</p></div>`,
  },

  // ===== Day 29-35 · 阶段二毕业 =====
  {
    "id": "deep-29", "day": 29, "week": 5, "track": "deep",
    "title": "Day 29 · 里程碑 2 启动：完整因果归因报告",
    "description": "用 DID + CausalImpact + DoubleML 三角验证",
    "objectives": [
      "完成一个真实业务场景的因果分析",
      "用三种方法交叉验证结论",
      "产出可交付的报告",
    ],
    "duration": 90,
    "cues": [
      "三角验证：三种方法结论一致 → 强证据",
      "三角验证：结论不一致 → 方法学有问题",
      "报告必须含：数据 / 方法 / 结果 / 业务建议 / 局限",
    ],
    "content": `<h3>项目模板</h3>
<ol>
<li><strong>问题：</strong>某次促销活动到底拉动了多少销量？</li>
<li><strong>数据：</strong>实验组（促销店）+ 对照组（非促销店）× 促销前后各 4 周</li>
<li><strong>方法：</strong>
  <ul>
  <li>DID：检查平行趋势，跑回归</li>
  <li>CausalImpact：用对照店构造反事实</li>
  <li>DoubleML：控制天气/价格/库存等混淆</li>
  </ul>
</li>
<li><strong>结果：</strong>三种方法的 ATE 估计 + 置信区间</li>
<li><strong>业务建议：</strong>促销是否值得做？ROI 是多少？</li>
</ol>`,
  },
  {
    "id": "deep-30", "day": 30, "week": 5, "track": "deep",
    "title": "Day 30 · 阶段二总结 + 作品集整理",
    "description": "回顾 30 天成果，整理作品集",
    "objectives": [
      "回顾阶段二学到的核心能力",
      "整理两个作品（时序预测 + 因果归因）",
      "准备阶段三的学习计划",
    ],
    "duration": 60,
    "cues": [
      "两个作品是简历核心素材",
      "代码 + 报告 + 可视化，归档 GitHub",
      "阶段三：回头补统计学，让你『懂为什么』",
    ],
    "content": `<h3>阶段二产出的两个作品</h3>
<ol>
<li><strong>时序预测系统</strong>：ARIMA + SARIMA + LightGBM 三模型 + Optuna 调参 + SHAP 归因 + 滚动回测报告</li>
<li><strong>因果归因报告</strong>：DID + CausalImpact + DoubleML 三角验证 + 业务建议</li>
</ol>
<h3>下一步预告（阶段三）</h3>
<ul>
<li>Day 31-65：统计学深入——SARIMA 数学严格版 / 状态空间 / 贝叶斯 / 协整</li>
<li>目标：从『会用』升级到『懂为什么』+『能读论文』</li>
</ul>`,
  },
  {
    "id": "deep-31", "day": 31, "week": 5, "track": "deep",
    "title": "阶段二补丁 1 · 舆情文本因子的入门",
    "description": "把评论/社媒文本变成销量因子",
    "objectives": [
      "理解文本特征的基本流程（分词 → 向量化 → 情感）",
      "会用 SnowNLP / Transformers 做中文情感分析",
      "知道如何把情感分数作为外生变量",
    ],
    "duration": 45,
    "cues": [
      "中文分词：jieba；情感分析：SnowNLP / HanLP",
      "进阶：HuggingFace 中文 BERT 微调",
      "把每日情感均值作为 SARIMAX 的 exog",
    ],
    "content": `<pre><code># 简单版：SnowNLP
from snownlp import SnowNLP
df['情感分'] = df['评论'].apply(lambda x: SnowNLP(x).sentiments)

# 进阶版：HuggingFace BERT
from transformers import pipeline
classifier = pipeline('sentiment-analysis', model='uer/roberta-base-finetuned-jd-binary-chinese')
df['情感分'] = df['评论'].apply(lambda x: classifier(x)[0]['score'])</code></pre>
<div class="ex-box"><h4>✏️ AI 辅助</h4>
<p>把评论样本发给 AI：<em>"这批评论能提取出哪些销量相关的信号？除了情感还有什么维度？"</em></p></div>`,
  },
  {
    "id": "deep-32", "day": 32, "week": 5, "track": "deep",
    "title": "阶段二补丁 2 · Featuretools 自动特征生成",
    "description": "让算法自动生成几百个特征",
    "objectives": [
      "理解深度特征合成（Deep Feature Synthesis）",
      "会跑 Featuretools 生成特征矩阵",
      "知道自动特征的陷阱（冗余 + 泄漏）",
    ],
    "duration": 45,
    "cues": [
      "Featuretools 自动做 groupby + 聚合 + 拼接",
      "生成几百个特征后必须筛选",
      "陷阱：自动聚合容易引入未来信息",
    ],
    "content": `<pre><code>import featuretools as ft
es = ft.EntitySet(id='sales')
es = es.add_dataframe(dataframe_name='sales',
                     dataframe=df,
                     index='id',
                     time_index='日期')
fm, features = ft.dfs(
    entityset=es,
    target_dataframe_name='sales',
    agg_primitives=['mean', 'sum', 'count', 'max', 'min'],
    trans_primitives=['day', 'month', 'year'],
    max_depth=2,
)
# 自动生成 100+ 特征</code></pre>`,
  },
  {
    "id": "deep-33", "day": 33, "week": 5, "track": "deep",
    "title": "阶段二补丁 3 · 概率预测入门",
    "description": "不只预测值，还预测区间",
    "objectives": [
      "理解点预测 vs 概率预测",
      "会用 LightGBM 的 quantile objective",
      "知道 Pinball Loss 的计算",
    ],
    "duration": 45,
    "cues": [
      "概率预测：输出 P10 / P50 / P90 三个分位数",
      "P10 = 10% 分位（保守），P90 = 90%（乐观）",
      "区间预测对库存决策至关重要",
    ],
    "content": `<pre><code># 分位数 LightGBM
for alpha in [0.1, 0.5, 0.9]:
    params = {'objective': 'quantile', 'alpha': alpha, ...}
    model = lgb.train(params, ...)
    preds[alpha] = model.predict(X_test)

# Pinball Loss 评估
def pinball(y_true, y_pred, alpha):
    diff = y_true - y_pred
    return np.mean(np.where(diff >= 0, alpha * diff, (alpha-1) * diff))</code></pre>`,
  },
  {
    "id": "deep-34", "day": 34, "week": 5, "track": "deep",
    "title": "阶段二补丁 4 · 模型监控与漂移检测",
    "description": "上线后会变差怎么办",
    "objectives": [
      "理解数据漂移（data drift）和概念漂移（concept drift）",
      "会跑 PSI / KS 检验",
      "建立模型监控仪表盘",
    ],
    "duration": 45,
    "cues": [
      "数据漂移：X 分布变了，Y|X 不变",
      "概念漂移：Y|X 关系变了（最致命）",
      "PSI > 0.2 → 显著漂移，需要重训",
    ],
    "content": `<pre><code>def psi(expected, actual, bins=10):
    expected_pct = np.histogram(expected, bins=bins)[0] / len(expected)
    actual_pct = np.histogram(actual, bins=bins)[0] / len(actual)
    return np.sum((actual_pct - expected_pct) * np.log(actual_pct / expected_pct))</code></pre>`,
  },
  {
    "id": "deep-35", "day": 35, "week": 5, "track": "deep",
    "title": "Day 35 · 阶段二最终总结 + 阶段三导论",
    "description": "完成阶段二，进入统计学深入",
    "objectives": [
      "整理阶段二所有代码和报告",
      "建立阶段三的学习节奏",
      "预告阶段三的统计学地图",
    ],
    "duration": 60,
    "cues": [
      "阶段二：会用 ARIMA / LightGBM / 因果分析",
      "阶段三：懂为什么 + 能读论文",
      "重点：SARIMA 数学严格版 / 状态空间 / 贝叶斯 / 协整",
    ],
    "content": `<h3>阶段二完成的标志</h3>
<ul>
<li>✅ 跑通过 ARIMA / SARIMA / LightGBM / Prophet</li>
<li>✅ 用过 Optuna 调参 + SHAP 归因</li>
<li>✅ 用 DID / CausalImpact / DoubleML 做过因果分析</li>
<li>✅ 有 2 个完整作品归档 GitHub</li>
</ul>
<h3>阶段三预告</h3>
<p>接下来的 30 天，从『会用』升级到『懂为什么』。重点是 SARIMA 数学严格版、状态空间模型、贝叶斯推断、协整与单位根——这些是读论文、做创新的地基。</p>`,
  },

  // ───────────────────────────────────────────────────────────
  // 阶段三 · 统计学深入（Day 36-65）
  // 从『会用』升级到『懂为什么』+『能读论文』
  // ───────────────────────────────────────────────────────────

  // ===== Week 6 · Day 36-42 · 回归与统计推断严格版 =====
  {
    id: "deep-36", day: 36, week: 6, track: "deep",
    title: "线性回归严格版：OLS 假设 + 高斯-马尔可夫定理",
    description: "为什么 OLS 是 BLUE（最优线性无偏估计）",
    objectives: [
      "掌握 OLS 的六大假设（线性/无完全共线/误差零均值/同方差/无自相关/正态性）",
      "理解高斯-马尔可夫定理的『最优』含义",
      "知道违反每个假设的后果 + 检验方法",
    ],
    duration: 45,
    cues: [
      "BLUE = Best Linear Unbiased Estimator",
      "异方差 → 标准误失真 → 用稳健标准误（HC3）",
      "自相关 → 用 Newey-West 标准误",
    ],
    content: `<h3>OLS 六大假设</h3>
<ol>
<li><strong>线性：</strong>Y = Xβ + ε，参数线性</li>
<li><strong>无完全共线：</strong>X 之间不能完全相关</li>
<li><strong>误差零均值：</strong>E[ε|X] = 0（外生性）</li>
<li><strong>同方差：</strong>Var(ε|X) = σ²（不变）</li>
<li><strong>无自相关：</strong>Cov(ε_i, ε_j) = 0</li>
<li><strong>正态性（小样本需要）：</strong>ε ~ N(0, σ²)</li>
</ol>
<pre><code>import statsmodels.api as sm
X = sm.add_constant(X)
model = sm.OLS(y, X).fit(cov_type='HC3')  # 稳健标准误
print(model.summary())</code></pre>
<div class="ex-box"><h4>✏️ AI 辅助</h4>
<p>把 summary 输出发给 AI：<em>"这个 OLS 结果违反了哪些假设？Durbin-Watson / Jarque-Bera / Omnibus 都说明了什么？"</em></p></div>`,
  },
  {
    id: "deep-37", day: 37, week: 6, track: "deep",
    title: "假设检验全谱：t / F / 卡方 / Wald / LR / LM",
    description: "六大检验统计量的原理和选择",
    objectives: [
      "掌握六大检验的适用场景",
      "理解 p 值的本质（不是『效应存在概率』）",
      "知道多重检验的 Bonferroni / BH 校正",
    ],
    duration: 45,
    cues: [
      "t 检验：单系数；F 检验：多系数联合",
      "卡方：分类变量独立性",
      "Wald/LR/LM：三大渐近检验，大样本等价",
    ],
    content: `<h3>检验统计量选择决策树</h3>
<ul>
<li><strong>单个系数：</strong>t 检验</li>
<li><strong>多个系数联合：</strong>F 检验（小样本）/ Wald（大样本）</li>
<li><strong>分类变量独立性：</strong>卡方</li>
<li><strong>模型整体：</strong>F / LR（似然比）</li>
</ul>
<h3>p 值的正确解读</h3>
<p><span class="key-pt">p 值不是『H0 为真的概率』</span>，而是『假设 H0 为真，观察到当前数据或更极端数据的概率』。</p>
<pre><code># 多重检验校正
from statsmodels.stats.multitest import multipletests
reject, pvals_corrected, _, _ = multipletests(pvals, method='fdr_bh')  # BH 控制 FDR</code></pre>`,
  },
  {
    id: "deep-38", day: 38, week: 6, track: "deep",
    title: "置信区间 + Bootstrap + 多重检验",
    description: "区间估计与非参数方法",
    objectives: [
      "理解置信区间的频率派解释",
      "掌握 Bootstrap 重采样原理",
      "知道多重检验问题的严重性",
    ],
    duration: 45,
    cues: [
      "95% CI 不是『95% 概率包含真值』，而是『重复采样100次，95次包含真值』",
      "Bootstrap：从样本有放回重采样估计分布",
      "100 个因子做检验，5% 显著性 → 平均 5 个假阳性",
    ],
    content: `<pre><code># Bootstrap 计算均值置信区间
def bootstrap_ci(data, n_boot=10000, alpha=0.05):
    boots = [np.random.choice(data, len(data), replace=True).mean() for _ in range(n_boot)]
    return np.percentile(boots, [100*alpha/2, 100*(1-alpha/2)])

# 多重检验：100 个因子，5% 阈值 → 至少 5 个假阳性（期望）
# Bonferroni：α/n → 最严格
# BH（Benjamini-Hochberg）：控制 FDR → 较温和</code></pre>
<div class="pit-box"><h4>⚠️ 多重检验的陷阱</h4>
<p>测试 100 个因子是否预测股价，5% 显著性下，<strong>即使所有因子都是噪声</strong>，平均也会有 5 个『显著』。这是量化研究最大的统计陷阱。</p></div>`,
  },
  {
    id: "deep-39", day: 39, week: 6, track: "deep",
    title: "广义线性模型：Logistic / Poisson / Gamma",
    description: "不同分布族对应不同 GLM",
    objectives: [
      "理解 GLM 的三要素（分布 + 链接函数 + 线性预测）",
      "知道 Logistic / Poisson / Gamma 各自适用场景",
      "会跑 statsmodels 的 GLM",
    ],
    duration: 45,
    cues: [
      "二分类（买/不买）→ Logistic（Bernoulli + logit）",
      "计数（订单数）→ Poisson（Poisson + log）",
      "正偏连续（金额）→ Gamma（Gamma + log/inverse）",
    ],
    content: `<pre><code>import statsmodels.api as sm
# Logistic（二分类）
logit = sm.GLM(y_binary, X, family=sm.families.Binomial()).fit()

# Poisson（计数）
poisson = sm.GLM(y_count, X, family=sm.families.Poisson()).fit()

# Gamma（正偏连续）
gamma = sm.GLM(y_positive, X, family=sm.families.Gamma(link='log')).fit()</code></pre>
<h3>GLM 三要素对照</h3>
<table>
<tr><th>分布</th><th>链接</th><th>典型场景</th></tr>
<tr><td>Bernoulli</td><td>logit</td><td>是否购买/流失</td></tr>
<tr><td>Poisson</td><td>log</td><td>每日订单数</td></tr>
<tr><td>Negative Binomial</td><td>log</td><td>过离散计数</td></tr>
<tr><td>Gamma</td><td>log/inverse</td><td>金额/时长</td></tr>
<tr><td>Gaussian</td><td>identity</td><td>连续对称</td></tr>
</table>`,
  },
  {
    id: "deep-40", day: 40, week: 6, track: "deep",
    title: "混合效应模型：随机截距 + 随机斜率",
    description: "面板数据和分层结构的处理",
    objectives: [
      "理解固定效应 vs 随机效应",
      "会跑 statsmodels 的 MixedLM",
      "知道面板数据的两大场景",
    ],
    duration: 45,
    cues: [
      "固定效应：每个组的截距单独估计",
      "随机效应：假设截距来自共同分布（省参数）",
      "面板：N 个个体 × T 期，如 1000 个 SKU × 30 天",
    ],
    content: `<pre><code>import statsmodels.formula.api as smf
# 随机截距：每个 SKU 有自己的基线
model = smf.mixedlm('销量 ~ 价格 + 促销', data=df, groups=df['sku_id'])
result = model.fit()

# 随机斜率：每个 SKU 的价格弹性不同
model = smf.mixedlm('销量 ~ 价格', data=df, groups=df['sku_id'],
                    re_formula='~价格')
result = model.fit()</code></pre>
<h3>什么时候用混合效应模型</h3>
<ul>
<li>多 SKU / 多店 / 多用户的销量预测</li>
<li>重复测量数据（如同一患者多次就诊）</li>
<li>分层结构（SKU → 品类 → 区域）</li>
</ul>`,
  },
  {
    id: "deep-41", day: 41, week: 6, track: "deep",
    title: "正则化回归：Ridge / Lasso / ElasticNet 数学原理",
    description: "防过拟合的数学原理",
    objectives: [
      "理解 L1（Lasso）和 L2（Ridge）的几何含义",
      "知道 ElasticNet 的折衷",
      "会用坐标下降法理解 Lasso",
    ],
    duration: 45,
    cues: [
      "Ridge：损失 + λ·‖β‖²，系数缩小但不为零",
      "Lasso：损失 + λ·‖β‖₁，能产生稀疏解（特征选择）",
      "ElasticNet：α·L1 + (1-α)·L2，兼顾两者",
    ],
    content: `<pre><code>from sklearn.linear_model import Ridge, Lasso, ElasticNet
ridge = Ridge(alpha=1.0).fit(X, y)      # L2
lasso = Lasso(alpha=0.1).fit(X, y)      # L1（稀疏）
en = ElasticNet(alpha=0.1, l1_ratio=0.5).fit(X, y)  # 折衷</code></pre>
<h3>几何直观</h3>
<ul>
<li><strong>Ridge</strong>：约束区域是圆，最优解在圆与等高线相切处——系数缩小但非零</li>
<li><strong>Lasso</strong>：约束区域是菱形，最优解常在顶点——某些系数精确为零</li>
</ul>
<div class="ex-box"><h4>✏️ AI 辅助</h4>
<p>让 AI 帮你画一张 Ridge vs Lasso 的约束区域图，理解为什么 Lasso 能做特征选择。</p></div>`,
  },
  {
    id: "deep-42", day: 42, week: 6, track: "deep",
    title: "Week 6 复习 + 回归诊断实战",
    description: "用真实数据做完整回归诊断",
    objectives: [
      "跑完一个完整的回归分析流程",
      "诊断所有假设违反并修正",
      "形成可复用的诊断模板",
    ],
    duration: 60,
    cues: [
      "诊断六图：残差 vs 拟合 / Q-Q / Scale-Location / 残差 vs 杠杆",
      "Breusch-Pagan 检验异方差",
      "VIF 检查多重共线",
    ],
    content: `<h3>回归诊断完整流程</h3>
<ol>
<li>跑 OLS，看 summary</li>
<li>画残差诊断图（残差 vs 拟合 / Q-Q / Scale-Location）</li>
<li>检验异方差（Breusch-Pagan）</li>
<li>检验多重共线（VIF &gt; 10 严重）</li>
<li>检验自相关（Durbin-Watson，理想≈2）</li>
<li>根据违反的假设选择修正方案（稳健 SE / Ridge / 加变量）</li>
</ol>
<pre><code>from statsmodels.stats.diagnostic import het_breuschpagan
from statsmodels.stats.outliers_influence import variance_inflation_factor
bp = het_breuschpagan(model.resid, X)
vif = [variance_inflation_factor(X.values, i) for i in range(X.shape[1])]</code></pre>`,
  },

  // ===== Week 7 · Day 43-49 · 时序统计学深入 =====
  {
    id: "deep-43", day: 43, week: 7, track: "deep",
    title: "SARIMA 数学严格版：差分方程 + Box-Jenkins",
    description: "理解 SARIMA 的数学结构",
    objectives: [
      "理解 AR / MA / 差分的算子表示",
      "掌握 Box-Jenkins 方法论的完整流程",
      "看懂 SARIMA 论文里的公式",
    ],
    duration: 45,
    cues: [
      "AR(p)：y_t = c + φ₁y_{t-1} + ... + φ_p·y_{t-p} + ε_t",
      "MA(q)：y_t = c + ε_t + θ₁ε_{t-1} + ... + θ_q·ε_{t-q}",
      "ARMA = AR + MA，用滞后算子 B 表示",
    ],
    content: `<h3>滞后算子 B</h3>
<p><code>B^k · y_t = y_{t-k}</code>，AR(1) 可写为 <code>(1 - φB)y_t = ε_t</code>。</p>
<h3>SARIMA(p,d,q)(P,D,Q,m)</h3>
<p><code>Φ(B^m)φ(B)(1-B)^d(1-B^m)^D y_t = Θ(B^m)θ(B)ε_t</code></p>
<ul>
<li>φ(B)：非季节 AR 部分</li>
<li>θ(B)：非季节 MA 部分</li>
<li>Φ(B^m)：季节 AR 部分</li>
<li>Θ(B^m)：季节 MA 部分</li>
</ul>
<h3>Box-Jenkins 方法论（1970）</h3>
<ol>
<li>识别（Identification）：看 ACF/PACF 选 p/q</li>
<li>估计（Estimation）：最大似然估计参数</li>
<li>诊断（Diagnostics）：残差 Ljung-Box</li>
<li>预测（Forecast）：用拟合模型预测</li>
</ol>`,
  },
  {
    id: "deep-44", day: 44, week: 7, track: "deep",
    title: "状态空间模型（SSM）+ Kalman 滤波",
    description: "SARIMA 的更一般框架",
    objectives: [
      "理解状态空间表示（状态方程 + 观测方程）",
      "掌握 Kalman 滤波的预测-更新循环",
      "知道 SARIMA / 局部线性趋势 / 结构时序都是 SSM 特例",
    ],
    duration: 45,
    cues: [
      "状态方程：x_t = F·x_{t-1} + w_t",
      "观测方程：y_t = H·x_t + v_t",
      "Kalman = 预测（用状态方程）→ 更新（用观测）",
    ],
    content: `<h3>状态空间表示</h3>
<pre><code>状态方程：x_t = F·x_{t-1} + w_t,  w_t ~ N(0, Q)
观测方程：y_t = H·x_t + v_t,      v_t ~ N(0, R)</code></pre>
<p>很多模型都能写成这个形式：ARMA、局部线性趋势、结构时序、动态回归。</p>
<pre><code>from statsmodels.tsa.statespace.structural import UnobservedComponents
model = UnobservedComponents(
    df['销量'],
    level='local linear trend',  # 局部线性趋势
    seasonal=7,                  # 周季节
    stochastic_seasonal=True,
)
res = model.fit()</code></pre>
<h3>Kalman 滤波循环</h3>
<ol>
<li><strong>预测：</strong>x̂_{t|t-1} = F·x̂_{t-1|t-1}</li>
<li><strong>更新：</strong>x̂_{t|t} = x̂_{t|t-1} + K·(y_t - H·x̂_{t|t-1})</li>
<li>K 是 Kalman 增益，权衡预测和观测</li>
</ol>`,
  },
  {
    id: "deep-45", day: 45, week: 7, track: "deep",
    title: "VAR 向量自回归 + 脉冲响应",
    description: "多变量时序的因果关系",
    objectives: [
      "理解 VAR 的多方程结构",
      "会跑 VAR 并选阶数",
      "掌握脉冲响应函数（IRF）和方差分解",
    ],
    duration: 45,
    cues: [
      "VAR(p)：每个变量都对自己的滞后 + 其他变量的滞后回归",
      "选阶：AIC / BIC / HQ",
      "脉冲响应：一个变量冲击对其他变量的动态影响",
    ],
    content: `<pre><code>from statsmodels.tsa.api import VAR
model = VAR(df[['销量', '价格', '广告']])
results = model.select_order(maxlags=10)
print(results.summary())  # 选阶
var_res = model.fit(3)    # 拟合 VAR(3)
irf = var_res.irf(10)
irf.plot()</code></pre>
<h3>VAR 的适用场景</h3>
<ul>
<li>多个相互影响的时间序列（价格↔销量↔库存）</li>
<li>宏观经济学（GDP↔通胀↔利率）</li>
<li>需求与营销的互动分析</li>
</ul>
<div class="pit-box"><h4>⚠️ VAR 需要 Stationary</h4>
<p>VAR 假设所有序列平稳。如果不平稳，要么差分，要么用 VECM（向量误差修正模型，Day 47 协整）。</p></div>`,
  },
  {
    id: "deep-46", day: 46, week: 7, track: "deep",
    title: "单位根检验深入：ADF / PP / KPSS / ZA",
    description: "严格判断平稳性",
    objectives: [
      "掌握 ADF / PP / KPSS 的差异",
      "理解结构性断点单位根（Zivot-Andrews）",
      "知道检验的 size distortion 问题",
    ],
    duration: 45,
    cues: [
      "ADF：H0=有单位根（不平稳）；KPSS：H0=平稳（反向）",
      "两者交叉验证最稳",
      "ZA：允许一次结构性断点",
    ],
    content: `<h3>三大检验的对比</h3>
<table>
<tr><th></th><th>ADF</th><th>PP</th><th>KPSS</th></tr>
<tr><td>H0</td><td>有单位根</td><td>有单位根</td><td>平稳</td></tr>
<tr><td>p&lt;0.05</td><td>拒绝→平稳</td><td>拒绝→平稳</td><td>拒绝→不平稳</td></tr>
<tr><td>修正</td><td>基本</td><td>异方差稳健</td><td>反向验证</td></tr>
</table>
<pre><code>from statsmodels.tsa.stattools import adfuller, kpss
adf = adfuller(series)     # p<0.05 → 平稳
kpss_res = kpss(series)    # p>0.05 → 平稳（注意反向）</code></pre>
<h3>结构性断点（Zivot-Andrews）</h3>
<p>很多时序在政策/事件时有结构性断点，普通 ADF 检验会误判。ZA 检验允许在断点处自动搜索，更稳健。</p>`,
  },
  {
    id: "deep-47", day: 47, week: 7, track: "deep",
    title: "协整与误差修正模型（ECM）",
    description: "非平稳但共同运动的序列",
    objectives: [
      "理解协整（两个 I(1) 序列的线性组合是 I(0)）",
      "会跑 Engle-Granger 两步法",
      "知道 VECM 是 VAR + 协整约束",
    ],
    duration: 45,
    cues: [
      "伪回归：两个无关的非平稳序列看起来高度相关",
      "协整：长期均衡关系，短期偏离会被拉回",
      "ECM：Δy_t = α(y_{t-1} - βx_{t-1}) + 短期项",
    ],
    content: `<h3>经典案例：醉酒与狗</h3>
<p>主人和狗都随机游走（非平稳），但狗绳把他们绑在一起——他们的距离是平稳的（协整）。</p>
<pre><code># Engle-Granger 两步法
# 第一步：OLS 估计长期关系
res = sm.OLS(y, sm.add_constant(x)).fit()
residual = res.resid
# 第二步：检验残差平稳
adf_res = adfuller(residual)  # 残差平稳 → 协整</code></pre>
<h3>VECM（向量误差修正模型）</h3>
<p>VAR + 误差修正项，刻画多变量的长期均衡 + 短期调整。</p>
<pre><code>from statsmodels.tsa.vector_ar.vecm import VECM, coint_johansen
# Johansen 检验协整阶数
johansen = coint_johansen(df, det_order=0, k_ar_diff=1)
vecm = VECM(df, k_ar_diff=1, coint_rank=1).fit()</code></pre>`,
  },
  {
    id: "deep-48", day: 48, week: 7, track: "deep",
    title: "GARCH 族：波动率建模",
    description: "方差随时间变化的时序",
    objectives: [
      "理解波动率聚集（volatility clustering）",
      "会跑 ARCH / GARCH / EGARCH",
      "知道在金融/电力/库存的应用",
    ],
    duration: 45,
    cues: [
      "ARCH(p)：方差依赖于过去 p 期残差平方",
      "GARCH(p,q)：方差依赖于过去残差 + 过去方差",
      "EGARCH：能刻画不对称（跌比涨波动更大）",
    ],
    content: `<pre><code>from arch import arch_model
am = arch_model(returns, vol='Garch', p=1, q=1)
res = am.fit()
print(res.summary())
fig = res.plot()  # 波动率估计</code></pre>
<h3>GARCH 在供应链的应用</h3>
<ul>
<li><strong>需求波动率预测：</strong>用于安全库存计算</li>
<li><strong>价格波动率：</strong>大宗商品/电力套保</li>
<li><strong>异常检测：</strong>波动率突增=需求结构性变化</li>
</ul>`,
  },
  {
    id: "deep-49", day: 49, week: 7, track: "deep",
    title: "Week 7 复习 + 时序统计学对照表",
    description: "把所有时序方法整理成一张表",
    objectives: [
      "形成 SARIMA / SSM / VAR / VECM / GARCH 的对照表",
      "知道每个方法的适用场景",
      "能根据数据特征选方法",
    ],
    duration: 60,
    cues: [
      "单变量平稳 → ARMA",
      "单变量非平稳 → ARIMA / SARIMA",
      "多变量协整 → VECM；多变量不协整 → VAR（差分后）",
    ],
    content: `<h3>时序统计学方法地图</h3>
<table>
<tr><th>方法</th><th>单/多变量</th><th>平稳要求</th><th>典型场景</th></tr>
<tr><td>ARMA</td><td>单</td><td>平稳</td><td>基础建模</td></tr>
<tr><td>ARIMA / SARIMA</td><td>单</td><td>差分后平稳</td><td>含趋势/季节</td></tr>
<tr><td>VAR</td><td>多</td><td>所有平稳</td><td>多变量互动</td></tr>
<tr><td>VECM</td><td>多</td><td>协整</td><td>长期均衡</td></tr>
<tr><td>SSM / Kalman</td><td>单/多</td><td>灵活</td><td>状态估计</td></tr>
<tr><td>GARCH</td><td>单</td><td>残差</td><td>波动率</td></tr>
<tr><td>UnobservedComponents</td><td>单</td><td>灵活</td><td>趋势+季节分解</td></tr>
</table>`,
  },

  // ===== Week 8 · Day 50-56 · 高级时序方法 =====
  {
    id: "deep-50", day: 50, week: 8, track: "deep",
    title: "Holt-Winters 三指数平滑",
    description: "和 SARIMA 等价但更直观",
    objectives: [
      "理解一次/二次/三次指数平滑",
      "掌握 Holt-Winters 的加性/乘性",
      "知道和 SARIMA 的等价关系",
    ],
    duration: 45,
    cues: [
      "一次：单参数无趋势",
      "二次：加趋势（Holt）",
      "三次：加季节（Holt-Winters）",
    ],
    content: `<pre><code>from statsmodels.tsa.holtwinters import ExponentialSmoothing
model = ExponentialSmoothing(
    train,
    trend='add',          # 或 'mul'
    seasonal='add',       # 或 'mul'
    seasonal_periods=7,
)
res = model.fit()
fcst = res.forecast(7)</code></pre>
<h3>和 SARIMA 的等价</h3>
<p>Holt-Winters 加性 ≈ SARIMA(0,1,1)(0,1,1,m)，但参数更少、更易调。</p>`,
  },
  {
    id: "deep-51", day: 51, week: 8, track: "deep",
    title: "TBATS：复杂季节性 + Box-Cox",
    description: "处理多重季节性（如日+周+年）",
    objectives: [
      "理解 TBATS 名字的含义",
      "会用 TBATS 处理非整数季节",
      "知道和 Prophet 的差异",
    ],
    duration: 45,
    cues: [
      "TBATS = Trigonometric + Box-Cox + ARMA + Trend + Seasonal",
      "用三角函数处理多重季节",
      "Box-Cox 变换稳定方差",
    ],
    content: `<pre><code>from tbats import TBATS
estimator = TBATS(seasonal_periods=[7, 365.25])  # 周度+年度
model = estimator.fit(train)
fcst = model.forecast(steps=7)</code></pre>
<h3>适用场景</h3>
<ul>
<li>电力负荷（日+周+年三重季节）</li>
<li>零售销量（周+月+年）</li>
<li>交通流量（小时+日+周）</li>
</ul>`,
  },
  {
    id: "deep-52", day: 52, week: 8, track: "deep",
    title: "变点检测：PELT / BOCPD / CUSUM",
    description: "找出时序结构变化的时点",
    objectives: [
      "理解三大变点检测方法",
      "会跑 ruptures 库",
      "知道业务应用（如促销生效时点）",
    ],
    duration: 45,
    cues: [
      "PELT：精确线性时间",
      "BOCPD：贝叶斯在线变点",
      "CUSUM：工业控制图经典",
    ],
    content: `<pre><code>import ruptures as rpt
# PELT 检测变点
algo = rpt.Pelt(model='rbf').fit(series)
bkps = algo.predict(pen=10)  # penalty 控制变点数

# 在线变点（Bayesian）
import bayespy
# BOCPD 实现</code></pre>
<h3>业务应用</h3>
<ul>
<li><strong>促销生效时点：</strong>销量拐点 = 促销真实生效时</li>
<li><strong>异常检测：</strong>结构性变化 ≠ 噪声</li>
<li><strong>模型重训时机：</strong>变点后需要重训</li>
</ul>`,
  },
  {
    id: "deep-53", day: 53, week: 8, track: "deep",
    title: "异常检测：STL 残差 + Isolation Forest + DBSCAN",
    description: "三类异常检测方法",
    objectives: [
      "理解异常的三种类型（点/上下文/集合）",
      "会跑 Isolation Forest / DBSCAN",
      "知道用 STL 残差做时序异常",
    ],
    duration: 45,
    cues: [
      "点异常：单个极端值",
      "上下文异常：在特定上下文下异常（如夏天穿棉袄）",
      "集合异常：单个正常，合在一起异常",
    ],
    content: `<pre><code># 方法 1：STL 残差
resid = STL(series, period=7).fit().resid
z = (resid - resid.mean()) / resid.std()
anomalies = z[np.abs(z) > 3]

# 方法 2：Isolation Forest
from sklearn.ensemble import IsolationForest
iso = IsolationForest(contamination=0.01).fit(X)
labels = iso.predict(X)  # -1 异常

# 方法 3：DBSCAN
from sklearn.cluster import DBSCAN
labels = DBSCAN(eps=0.5, min_samples=5).fit_predict(X)</code></pre>`,
  },
  {
    id: "deep-54", day: 54, week: 8, track: "deep",
    title: "Prophet 数学原理：加性模型 + 变点 + 季节",
    description: "拆开 Prophet 看内部",
    objectives: [
      "理解 Prophet 的加性分解",
      "掌握趋势变点的自动检测",
      "知道 Prophet 的局限",
    ],
    duration: 45,
    cues: [
      "Prophet：y = g(t) + s(t) + h(t) + ε",
      "g(t)：分段线性或 logistic 趋势",
      "s(t)：傅里叶项；h(t)：节假日",
    ],
    content: `<h3>Prophet 的四个组件</h3>
<ul>
<li><strong>趋势 g(t)：</strong>分段线性或 saturating growth（logistic）</li>
<li><strong>季节 s(t)：</strong>傅里叶项（年=10 阶，周=3 阶）</li>
<li><strong>节假日 h(t)：</strong>虚拟变量</li>
<li><strong>误差 ε：</strong>正态</li>
</ul>
<p>变点（changepoints）默认 25 个候选位置，L1 正则选出真正生效的。</p>
<pre><code>from prophet import Prophet
m = Prophet(
    changepoint_prior_scale=0.05,  # 趋势灵活度
    seasonality_prior_scale=10,    # 季节强度
    changepoint_range=0.8,         # 变点候选在前 80%
)</code></pre>
<div class="pit-box"><h4>⚠️ Prophet 的局限</h4>
<ul>
<li>不能自动处理外生变量（要手动）</li>
<li>对高频数据（小时级）效果差</li>
<li>不能学习变量之间的交互</li>
</ul></div>`,
  },
  {
    id: "deep-55", day: 55, week: 8, track: "deep",
    title: "层级预测：自底向上 / 自顶向下 / MinT",
    description: "SKU → 品类 → 总部的预测自洽",
    objectives: [
      "理解层级预测的调和问题",
      "掌握三种调和方法",
      "知道 MinT 是 SOTA",
    ],
    duration: 45,
    cues: [
      "底层 SKU 预测加总 ≠ 总部分类预测——不自洽",
      "自底向上：直接加总",
      "MinT（Trace Minimization）：最优调和",
    ],
    content: `<pre><code># hts 库（或 hierarchicalforecast）
from hierarchicalforecast.core import HierarchicalReconciliation
from hierarchicalforecast.methods import BottomUp, TopDown, MinTrace
reconcilers = [BottomUp(), TopDown(method='average_proportions'),
               MinTrace(method='ols')]
hrec = HierarchicalReconciliation(reconcilers=reconcilers)
fcst_reconciled = hrec.reconcile(fcst, S, tags)</code></pre>
<h3>MinT 原理</h3>
<p>MinT 通过最小化调和后预测的协方差迹（trace），找到最优的调和矩阵——既利用上层稳定信息，又保留下层细节。</p>`,
  },
  {
    id: "deep-56", day: 56, week: 8, track: "deep",
    title: "Week 8 复习 + 综合案例：多方法横评",
    description: "用同一份数据对比所有高级时序方法",
    objectives: [
      "完成 Holt-Winters / TBATS / Prophet / SSM 横评",
      "形成『什么时候用什么』的决策树",
      "建立高级时序的代码模板库",
    ],
    duration: 60,
    cues: [
      "单变量 + 简单季节 → Holt-Winters",
      "多重季节 → TBATS / Prophet",
      "需要状态解释 → SSM",
    ],
    content: `<h3>横评结论（经验法则）</h3>
<table>
<tr><th>场景</th><th>推荐</th></tr>
<tr><td>单变量 + 周季节</td><td>Holt-Winters / SARIMA</td></tr>
<tr><td>多重季节（日+周+年）</td><td>TBATS / Prophet</td></tr>
<tr><td>含节假日 + 变点</td><td>Prophet</td></tr>
<tr><td>需要状态解释</td><td>UnobservedComponents（SSM）</td></tr>
<tr><td>多变量协整</td><td>VECM</td></tr>
<tr><td>波动率建模</td><td>GARCH</td></tr>
</table>`,
  },

  // ===== Week 9 · Day 57-65 · 贝叶斯与决策 =====
  {
    id: "deep-57", day: 57, week: 9, track: "deep",
    title: "贝叶斯推断严格版：共轭先验 + MCMC",
    description: "贝叶斯的数学原理",
    objectives: [
      "理解贝叶斯定理的三要素（先验/似然/后验）",
      "掌握共轭先验的便利性",
      "知道 MCMC 的原理（Metropolis / Gibbs / HMC）",
    ],
    duration: 45,
    cues: [
      "先验 × 似然 = 后验（归一化前）",
      "共轭：Beta 先验 + 二项似然 → Beta 后验",
      "MCMC：构造马尔可夫链，使其平稳分布=后验",
    ],
    content: `<h3>贝叶斯定理</h3>
<p><code>P(θ|D) = P(D|θ) · P(θ) / P(D)</code></p>
<ul>
<li>P(θ)：先验（观察数据前的信念）</li>
<li>P(D|θ)：似然（数据在参数下的概率）</li>
<li>P(θ|D)：后验（观察数据后的信念）</li>
</ul>
<h3>共轭先验对照</h3>
<table>
<tr><th>似然</th><th>共轭先验</th><th>后验</th></tr>
<tr><td>Bernoulli</td><td>Beta</td><td>Beta</td></tr>
<tr><td>Poisson</td><td>Gamma</td><td>Gamma</td></tr>
<tr><td>Gaussian（均值）</td><td>Gaussian</td><td>Gaussian</td></tr>
<tr><td>Multinomial</td><td>Dirichlet</td><td>Dirichlet</td></tr>
</table>
<h3>MCMC 直觉</h3>
<p>当后验没有解析解（如非共轭），用 MCMC 采样近似。三大算法：</p>
<ul>
<li><strong>Metropolis：</strong>提议 + 接受/拒绝</li>
<li><strong>Gibbs：</strong>逐维采样（要求条件分布好算）</li>
<li><strong>HMC（Hamiltonian）：</strong>用梯度信息高效采样（PyMC/Stan 默认）</li>
</ul>`,
  },
  {
    id: "deep-58", day: 58, week: 9, track: "deep",
    title: "PyMC 实战：贝叶斯线性回归 + 贝叶斯 SARIMA",
    description: "用代码做贝叶斯建模",
    objectives: [
      "会写 PyMC 模型",
      "掌握贝叶斯线性回归",
      "了解贝叶斯时序结构",
    ],
    duration: 45,
    cues: [
      "PyMC 用概率编程语法描述模型",
      "sample() 触发 NUTS（HMC 变种）采样",
      "ArviZ 做后验分析",
    ],
    content: `<pre><code>import pymc as pm
import arviz as az

with pm.Model() as model:
    # 先验
    alpha = pm.Normal('alpha', mu=0, sigma=10)
    beta = pm.Normal('beta', mu=0, sigma=10)
    sigma = pm.HalfNormal('sigma', sigma=1)

    # 似然
    mu = alpha + beta * X
    y_obs = pm.Normal('y_obs', mu=mu, sigma=sigma, observed=y)

    # 采样
    trace = pm.sample(2000, tune=1000, chains=4)

az.summary(trace)
az.plot_trace(trace)</code></pre>
<h3>贝叶斯 vs 频率派</h3>
<p>频率派：参数是固定的，数据是随机的。<br>
贝叶斯：参数是随机的（有分布），数据是观察到的。</p>`,
  },
  {
    id: "deep-59", day: 59, week: 9, track: "deep",
    title: "贝叶斯结构时序（BSTS）",
    description: "Google 的因果分析底层",
    objectives: [
      "理解 BSTS 的状态空间 + 贝叶斯结构",
      "会跑 BSTS 做时序预测",
      "知道 BSTS 是 CausalImpact 的底层",
    ],
    duration: 45,
    cues: [
      "BSTS = Bayesian Structural Time Series",
      "把趋势 + 季节 + 回归都建成贝叶斯组件",
      "天然提供预测区间",
    ],
    content: `<pre><code># Python 版本：用 tfp 或 statsmodels 的 UnobservedComponents + 贝叶斯
# R 版本（推荐）：bsts 包
# library(bsts)
# ss &lt;- AddLocalLinearTrend(list(), y)
# ss &lt;- AddSeasonal(ss, y, nseasons = 7)
# model &lt;- bsts(y, state.specification = ss, niter = 1000)</code></pre>
<h3>BSTS 在 CausalImpact 中的角色</h3>
<p>CausalImpact = BSTS 反事实构造 + 点估计 + 置信区间。BSTS 提供反事实的『如果没有干预会怎样』。</p>`,
  },
  {
    id: "deep-60", day: 60, week: 9, track: "deep",
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
    content: `<pre><code># 贝叶斯 A/B 测试
import numpy as np
# A 组：1000 用户，120 转化
# B 组：1000 用户，135 转化
conv_a, n_a = 120, 1000
conv_b, n_b = 135, 1000

# 后验 Beta 分布
samples_a = np.random.beta(conv_a + 1, n_a - conv_a + 1, 100000)
samples_b = np.random.beta(conv_b + 1, n_b - conv_b + 1, 100000)
# B 组胜率
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
    id: "deep-61", day: 61, week: 9, track: "deep",
    title: "损失函数与决策理论：MAE/MAPE 背后的数学",
    description: "不同指标背后的统计假设",
    objectives: [
      "理解损失函数 = 决策问题的数学化",
      "知道 MSE 对应均值、MAE 对应中位数、Pinball 对应分位数",
      "建立指标选择决策树",
    ],
    duration: 45,
    cues: [
      "MSE 最小化 → 预测均值",
      "MAE 最小化 → 预测中位数",
      "Pinball Loss → 预测任意分位数",
    ],
    content: `<h3>损失函数与最优预测的对应</h3>
<table>
<tr><th>损失函数</th><th>最优预测</th><th>适用场景</th></tr>
<tr><td>MSE (L2)</td><td>条件均值</td><td>对称误差、连续值</td></tr>
<tr><td>MAE (L1)</td><td>条件中位数</td><td>异常值鲁棒</td></tr>
<tr><td>Pinball (α)</td><td>条件 α 分位数</td><td>区间预测/库存</td></tr>
<tr><td>Huber</td><td>均值+鲁棒</td><td>半鲁棒回归</td></tr>
<tr><td>0-1 Loss</td><td>众数</td><td>分类</td></tr>
</table>
<h3>MAPE 的陷阱</h3>
<p>MAPE = |y - ŷ| / |y|，当 y 接近 0 时爆炸。WAPE（weighted APE）更稳健。</p>`,
  },
  {
    id: "deep-62", day: 62, week: 9, track: "deep",
    title: "概率预测与评分规则：CRPS / Pinball",
    description: "评估概率预测的好坏",
    objectives: [
      "理解 CRPS（连续排位概率分数）",
      "会算 Pinball Loss",
      "知道为什么概率预测比点预测重要",
    ],
    duration: 45,
    cues: [
      "CRPS = 预测分布 CDF 与观察值的积分距离",
      "Pinball Loss = 分位数损失",
      "概率预测不追求『准』，追求『校准』",
    ],
    content: `<pre><code># Pinball Loss
def pinball(y_true, y_pred, alpha):
    diff = y_true - y_pred
    return np.mean(np.where(diff >= 0, alpha * diff, (alpha-1) * diff))

# CRPS（用 properscoring 库）
from properscoring import crps_ensemble
crps = crps_ensemble(y_true, ensemble_forecasts).mean()</code></pre>
<h3>校准 vs 锐度</h3>
<ul>
<li><strong>校准（Calibration）：</strong>说 90% 置信区间，90% 的真实值确实在内</li>
<li><strong>锐度（Sharpness）：</strong>区间越窄越好</li>
<li><strong>CRPS：</strong>同时考虑校准和锐度</li>
</ul>`,
  },
  {
    id: "deep-63", day: 63, week: 9, track: "deep",
    title: "蒙特卡洛方法 + Bootstrap 再抽样",
    description: "用随机化解决确定性问题",
    objectives: [
      "理解蒙特卡洛积分",
      "掌握 Bootstrap 的多种变体",
      "知道在库存仿真中的应用",
    ],
    duration: 45,
    cues: [
      "蒙特卡洛：用大数定律近似积分",
      "Bootstrap：从样本重采样估计分布",
      "块 Bootstrap：时序专用（保留时间结构）",
    ],
    content: `<pre><code># 蒙特卡洛模拟库存
demand_samples = np.random.lognormal(mean=5, sigma=0.5, size=10000)
stock = 200
shortage = np.maximum(demand_samples - stock, 0).mean()  # 期望缺货
overstock = np.maximum(stock - demand_samples, 0).mean()  # 期望滞销

# 块 Bootstrap（时序）
from arch.bootstrap import StationaryBootstrap
bs = StationaryBootstrap(10, returns)
ci = bs.conf_int(lambda x: x.mean(), 1000)</code></pre>`,
  },
  {
    id: "deep-64", day: 64, week: 9, track: "deep",
    title: "非参数统计：核密度 / 经验分布 / 置换检验",
    description: "不假设分布的方法",
    objectives: [
      "理解非参数方法的优势",
      "会跑置换检验",
      "知道核密度估计（KDE）",
    ],
    duration: 45,
    cues: [
      "非参数：不假设正态/特定分布",
      "KDE：用核函数平滑直方图",
      "置换检验：通过随机重排标签计算 p 值",
    ],
    content: `<pre><code># KDE
from scipy.stats import gaussian_kde
kde = gaussian_kde(data)
x_grid = np.linspace(data.min(), data.max(), 100)
density = kde(x_grid)

# 置换检验
def permutation_test(group_a, group_b, n_perm=10000):
    obs_diff = group_a.mean() - group_b.mean()
    combined = np.concatenate([group_a, group_b])
    n_a = len(group_a)
    diffs = []
    for _ in range(n_perm):
        np.random.shuffle(combined)
        diffs.append(combined[:n_a].mean() - combined[n_a:].mean())
    p = (np.abs(diffs) >= np.abs(obs_diff)).mean()
    return p</code></pre>`,
  },
  {
    id: "deep-65", day: 65, week: 9, track: "deep",
    title: "阶段三总结：统计学能力地图 + 自测",
    description: "回顾 30 天统计学深入",
    objectives: [
      "形成统计学能力地图",
      "自测：能独立解决什么问题",
      "准备阶段四：供应链库存决策",
    ],
    duration: 60,
    cues: [
      "回归诊断 / 假设检验 / 贝叶斯 / 时序严格版",
      "能读懂论文的方法部分",
      "能根据数据特征选方法",
    ],
    content: `<h3>阶段三完成标志</h3>
<ul>
<li>✅ 掌握 OLS 假设 + 诊断 + 修正</li>
<li>✅ 理解 SARIMA 数学结构（滞后算子）</li>
<li>✅ 会用 SSM / Kalman / VAR / VECM / GARCH</li>
<li>✅ 掌握贝叶斯建模（PyMC）</li>
<li>✅ 能用概率预测（CRPS / Pinball）</li>
</ul>
<h3>下一步：阶段四（Day 66-100）</h3>
<p>路径 A：供应链库存决策——把前 65 天学的所有方法用到真实业务场景。</p>`,
  },

  // ───────────────────────────────────────────────────────────
  // 阶段四 · 路径 A · 供应链库存决策（Day 66-100）
  // 把前 65 天的所有方法应用到真实业务场景
  // ───────────────────────────────────────────────────────────

  // ===== Week 10 · Day 66-72 · 库存理论基础 =====
  {
    id: "deep-66", day: 66, week: 10, track: "deep",
    title: "库存理论：EOQ / 安全库存 / 服务水准",
    description: "经典库存模型",
    objectives: [
      "理解经济订货量（EOQ）",
      "掌握安全库存的计算",
      "知道服务水准（Cycle Service / Fill Rate）的差异",
    ],
    duration: 45,
    cues: [
      "EOQ = √(2DS/H)，平衡订货成本和持有成本",
      "安全库存 = z·σ·√L",
      "Cycle Service vs Fill Rate——后者更业务友好",
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
safety_stock = z * sigma_L      # ≈ 82
reorder_point = mean_demand_L + safety_stock</code></pre>
<h3>两类服务水准</h3>
<ul>
<li><strong>Cycle Service Rate：</strong>不缺货的周期比例（CSL=95% 表示 100 个周期有 95 个不缺货）</li>
<li><strong>Fill Rate：</strong>需求被即时满足的比例（FR=95% 表示 100 件需求 95 件即时满足）</li>
</ul>
<p>老板更关心 Fill Rate——因为它直接关联客户体验。</p>`,
  },
  {
    id: "deep-67", day: 67, week: 10, track: "deep",
    title: "多级库存优化（Multi-Echelon）",
    description: "仓库 → 门店 → 货架的协同",
    objectives: [
      "理解多级供应链的牛鞭效应",
      "掌握级库存（echelon stock）概念",
      "知道多级优化的收益",
    ],
    duration: 45,
    cues: [
      "级库存 = 本级库存 + 下游所有库存",
      "集中式 vs 分散式优化",
      "多级优化可降低总库存 20-30%",
    ],
    content: `<h3>级库存（Echelon Stock）</h3>
<p>传统：每个节点独立优化自己的库存。<br>
多级：把整条链看成一个整体，优化级库存。</p>
<pre><code># 简化：两级（中央仓 + 多门店）
# 级库存 = 中央仓库存 + 在途 + 所有门店库存
# 优化目标：在级服务水准约束下最小化总成本</code></pre>
<h3>牛鞭效应</h3>
<p>需求波动沿供应链上游放大：零售 ±5% → 批发 ±10% → 制造 ±20%。<br>
原因：信息延迟、批量订货、价格波动、配给博弈。</p>
<div class="ex-box"><h4>✏️ 业务应用</h4>
<p>分享需求信息（POS 数据上传）可显著缓解牛鞭效应。</p></div>`,
  },
  {
    id: "deep-68", day: 68, week: 10, track: "deep",
    title: "(s, S) / (r, Q) 补货策略",
    description: "工业级补货算法",
    objectives: [
      "理解 (s, S) 和 (r, Q) 策略",
      "掌握参数确定方法",
      "知道在 ERP 系统里的实现",
    ],
    duration: 45,
    cues: [
      "(s, S)：库存低于 s 就补到 S",
      "(r, Q)：库存低于 r 就订 Q 单位",
      "s = 安全库存 + 提前期需求",
    ],
    content: `<h3>(s, S) 策略</h3>
<p>当库存降到 s（reorder point）时，订货补到 S（order-up-to level）。</p>
<pre><code>s = expected_demand_during_leadtime + safety_stock
S = s + EOQ  # 或其他经济批量</code></pre>
<h3>(r, Q) 策略</h3>
<p>当库存降到 r 时，订固定批量 Q。</p>
<pre><code># 选择 r, Q 的近似公式
r = mean_demand_L + z * sigma_L  # 再订货点
Q = EOQ                          # 订货量</code></pre>
<h3>策略选择</h3>
<ul>
<li><strong>固定成本：</strong>(s, S) 更优</li>
<li><strong>可变成本：</strong>(r, Q) 更优</li>
<li><strong>实际：</strong>大部分 ERP 用 (s, S) 变种</li>
</ul>`,
  },
  {
    id: "deep-69", day: 69, week: 10, track: "deep",
    title: "S&OP 销售运营计划的量化",
    description: "把预测接到财务和产能",
    objectives: [
      "理解 S&OP 流程",
      "掌握预测在 S&OP 中的角色",
      "知道和财务/产能的协调",
    ],
    duration: 45,
    cues: [
      "S&OP = Sales and Operations Planning",
      "月度滚动：需求 → 供应 → 财务对齐",
      "预测 + 库存 + 产能 = 供应计划",
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
    id: "deep-70", day: 70, week: 10, track: "deep",
    title: "Week 10 复习 + 库存仿真",
    description: "用蒙特卡洛模拟库存系统",
    objectives: [
      "完成一个库存仿真系统",
      "对比不同补货策略",
      "量化服务水准 vs 成本权衡",
    ],
    duration: 60,
    cues: [
      "仿真 = 模拟 1000 天，看库存/缺货/成本",
      "对比 (s,S) vs (r,Q) vs 其他策略",
      "成本 = 持有 + 订货 + 缺货",
    ],
    content: `<pre><code>def simulate_inventory(demand_gen, policy, days=1000):
    inventory, costs, shortages = [], 0, 0
    stock = policy['S_init']
    for d in range(days):
        demand = demand_gen()
        # 补货决策
        if stock &lt; policy['s']:
            order = policy['S'] - stock
            costs += order * policy['unit_cost'] + policy['order_cost']
            stock += order
        # 满足需求
        sold = min(stock, demand)
        shortages += max(0, demand - stock)
        stock -= sold
        costs += stock * policy['hold_cost']
        inventory.append(stock)
    return {'avg_stock': np.mean(inventory), 'shortage': shortages, 'cost': costs}</code></pre>
<div class="ex-box"><h4>✏️ 实战</h4>
<p>跑 3 种策略 × 10 种需求场景，画服务水准 vs 总成本的 Pareto 前沿。</p></div>`,
  },

  // ===== Week 11 · Day 71-77 · 概率预测 + 库存决策 =====
  {
    id: "deep-71", day: 71, week: 11, track: "deep",
    title: "概率预测：分位数 LightGBM",
    description: "不只预测值，还预测分布",
    objectives: [
      "掌握分位数回归",
      "会跑多分位数 LightGBM",
      "知道如何把概率预测接到库存决策",
    ],
    duration: 45,
    cues: [
      "P10/P50/P90 = 保守/中位/乐观",
      "Pinball Loss 训练分位数",
      "概率预测直接喂给库存决策模型",
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
概率预测：『下周销量 P50=1000，P90=1500』——直接算出该备多少货。</p>`,
  },
  {
    id: "deep-72", day: 72, week: 11, track: "deep",
    title: "DeepAR：Amazon 概率预测 SOTA",
    description: "深度学习概率预测",
    objectives: [
      "理解 DeepAR 的自回归结构",
      "会跑 GluonTS 的 DeepAR",
      "知道 DeepAR vs 分位数 LightGBM 的差异",
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
    freq='D',
    prediction_length=7,
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
    id: "deep-73", day: 73, week: 11, track: "deep",
    title: "强化学习补货入门",
    description: "Amazon RL 库存控制",
    objectives: [
      "理解 RL 的状态/动作/奖励",
      "知道 RL 在补货中的优势",
      "了解 RL 库存的论文脉络",
    ],
    duration: 45,
    cues: [
      "RL = 试错学习最优策略",
      "状态 = 当前库存 + 预测",
      "奖励 = -（持有成本 + 缺货成本）",
    ],
    content: `<h3>RL 补货建模</h3>
<ul>
<li><strong>状态 s_t：</strong>当前库存 + 预测分布 + 提前期</li>
<li><strong>动作 a_t：</strong>订多少</li>
<li><strong>奖励 r_t：</strong>-（持有 + 缺货 + 订货成本）</li>
<li><strong>转移：</strong>库存演化</li>
</ul>
<pre><code># 简化 RL 实现（Stable-Baselines3）
from stable_baselines3 import PPO
env = InventoryEnv(...)  # 自定义环境
model = PPO('MlpPolicy', env, verbose=1)
model.learn(total_timesteps=100000)</code></pre>
<div class="ex-box"><h4>✏️ 进阶论文</h4>
<p>Amazon 2021 论文 <em>Reinforcement Learning for Inventory Optimization</em>——RL 在大规模补货中的工业应用。</p></div>`,
  },
  {
    id: "deep-74", day: 74, week: 11, track: "deep",
    title: "新品冷启动：相似品迁移 + Chronos 零样本",
    description: "新品无历史数据怎么办",
    objectives: [
      "掌握相似品迁移方法",
      "会用 Chronos / TimeGPT 做零样本预测",
      "知道冷启动的不同场景",
    ],
    duration: 45,
    cues: [
      "新品冷启动：无历史数据",
      "方法 1：找相似 SKU 迁移预测",
      "方法 2：Chronos 零样本大模型",
    ],
    content: `<pre><code># 方法 1：相似品迁移
from sklearn.metrics.pairwise import cosine_similarity
sim = cosine_similarity(new_sku_features, existing_sku_features)
similar_skus = sim.argsort()[0][-5:]  # Top 5 相似
forecast = existing_forecasts[similar_skus].mean()

# 方法 2：Chronos 零样本
from chronos import ChronosPipeline
pipeline = ChronosPipeline.from_pretrained('amazon/chronos-t5-large')
forecast = pipeline.predict(context=new_sku_short_history, prediction_length=7)</code></pre>
<h3>Chronos 的革命</h3>
<p>Chronos 是 Amazon 2024 发布的时序大模型，预训练于百万级时序，可以零样本预测——给少量历史就能输出，不需要训练。</p>`,
  },
  {
    "id": "deep-75", "day": 75, "week": 11, "track": "deep",
    "title": "间断性需求：Croston / TSB 算法",
    "description": "慢销品的特殊预测",
    "objectives": [
      "理解间断性需求的特点",
      "掌握 Croston / TSB 方法",
      "知道和普通时序的差异",
    ],
    "duration": 45,
    "cues": [
      "间断性：很多天销量=0，偶尔有大单",
      "Croston：分开预测『需求间隔』和『需求大小』",
      "TSB = Teunter-Syntetos-Babai（改进版）",
    ],
    "content": `<pre><code>def croston(series, alpha=0.1):
    nonzero = series[series &gt; 0]
    intervals = np.diff(nonzero.index)
    # 指数平滑两个分量
    z = nonzero.ewm(alpha=alpha).mean()  # 需求大小
    p = pd.Series(intervals).ewm(alpha=alpha).mean()  # 间隔
    forecast = z / p  # 单期需求率
    return forecast</code></pre>
<h3>什么场景用 Croston</h3>
<ul>
<li>A 类快销品：天天有销量 → 普通 ARIMA</li>
<li>B 类中销品：偶尔缺货 → Croston</li>
<li>C 类慢销品：很多天 = 0 → TSB</li>
</ul>`,
  },
  {
    "id": "deep-76", "day": 76, "week": 11, "track": "deep",
    "title": "缺货需求还原：Censored Demand",
    "description": "卖断货 ≠ 没需求",
    "objectives": [
      "理解截断数据问题",
      "掌握需求还原方法",
      "知道在库存优化中的影响",
    ],
    "duration": 45,
    "cues": [
      "销量 = min(需求, 库存)",
      "库存=0 时观察到的销量被截断",
      "用 Tobit 模型或 survival 分析还原",
    ],
    content: `<h3>截断数据问题</h3>
<p>实际观察到的不是需求，而是销量 = min(需求, 库存)。库存=0 时的销量=0，但真实需求可能&gt;0。</p>
<pre><code># 用 Tobit 模型（截断回归）
from statsmodels.discrete.discrete_model import Tobit  # 或 censored 回归
# 或用 EM 算法：E 步估计真实需求，M 步拟合模型</code></pre>
<div class="pit-box"><h4>⚠️ 不还原需求的后果</h4>
<p>如果不还原，模型学到『缺货期销量低 → 以后少备点货』——持续缺货死循环。这是供应链预测最隐蔽的陷阱。</p></div>`,
  },
  {
    "id": "deep-77", "day": 77, "week": 11, "track": "deep",
    "title": "Week 11 复习 + 营销 MMM 入门",
    "description": "Meta Robyn 营销组合建模",
    "objectives": [
      "理解 MMM 的框架",
      "掌握 Adstock 衰减 + Hill 饱和",
      "会用 Robyn 做预算分配",
    ],
    "duration": 60,
    "cues": [
      "MMM = Marketing Mix Modeling",
      "Adstock：广告效应随时间衰减",
      "Hill：边际效应递减",
    ],
    "content": `<h3>MMM 的核心方程</h3>
<p><code>销量 = 基线 + Σ Adstock(Hill(媒体_i)) + 季节 + 价格 + ε</code></p>
<pre><code># R 实现（Robyn）
# library(Robyn)
# Robyn(InputCollect, ...) 自动调参 + 产出 Pareto 前沿</code></pre>
<h3>Adstock 衰减</h3>
<p>广告效应不会立即消失，会持续衰减。<code>adstock(t) = spend(t) + λ·adstock(t-1)</code>，λ 是留存率。</p>
<h3>Hill 饱和函数</h3>
<p>广告投入越多边际效应越小。<code>response(x) = x^γ / (x^γ + θ^γ)</code>，θ 是半饱和点，γ 是陡峭度。</p>
<div class="ex-box"><h4>✏️ 业务价值</h4>
<p>MMM 能回答老板最关心的问题：『把预算从 TV 挪到抖音，ROI 会涨多少？』</p></div>`,
  },

  // ===== Week 12-14 · Day 78-95 · 工程化 + 端到端项目 =====
  {
    "id": "deep-78", "day": 78, "week": 12, "track": "deep",
    "title": "模型服务化：Flask / FastAPI",
    "description": "把模型变成 API",
    "objectives": [
      "会写 FastAPI 服务",
      "掌握模型加载 + 预测接口",
      "知道 API 文档自动生成",
    ],
    "duration": 45,
    "cues": [
      "FastAPI 比 Flask 快、自带类型校验",
      "pickle/joblib 保存模型",
      "/docs 自动生成 Swagger",
    ],
    "content": `<pre><code>from fastapi import FastAPI
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
    "id": "deep-79", "day": 79, "week": 12, "track": "deep",
    "title": "Docker 容器化",
    "description": "一次构建处处运行",
    "objectives": [
      "会写 Dockerfile",
      "掌握镜像构建 + 容器运行",
      "知道 docker-compose 多服务编排",
    ],
    "duration": 45,
    "cues": [
      "Dockerfile：FROM + COPY + RUN + CMD",
      "构建：docker build -t name .",
      "运行：docker run -p 8000:8000 name",
    ],
    "content": `<pre><code># Dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]</code></pre>
<pre><code># 构建运行
docker build -t forecast-api .
docker run -p 8000:8000 forecast-api</code></pre>`,
  },
  {
    "id": "deep-80", "day": 80, "week": 12, "track": "deep",
    "title": "MLflow 实验追踪",
    "description": "管理上百次实验",
    "objectives": [
      "会用 MLflow 记录参数/指标/模型",
      "掌握实验对比",
      "知道模型注册中心",
    ],
    "duration": 45,
    "cues": [
      "MLflow Tracking：记录实验",
      "MLflow Models：模型版本管理",
      "MLflow Registry：上线审批",
    ],
    "content": `<pre><code>import mlflow
mlflow.set_experiment('销量预测')

with mlflow.start_run():
    mlflow.log_params({'model': 'lightgbm', 'lr': 0.05, 'num_leaves': 31})
    mlflow.log_metrics({'mae': 12.5, 'mape': 0.15})
    mlflow.lightgbm.log_model(model, 'model')</code></pre>`,
  },
  {
    "id": "deep-81", "day": 81, "week": 12, "track": "deep",
    "title": "Airflow / Prefect 流水线编排",
    "description": "定时跑批预测",
    "objectives": [
      "理解 DAG（有向无环图）",
      "会写 Airflow DAG",
      "知道定时调度",
    ],
    "duration": 45,
    "cues": [
      "DAG：任务依赖关系图",
      "Operator：BashOperator/PythonOperator",
      "Schedule：cron 表达式",
    ],
    "content": `<pre><code>from airflow import DAG
from airflow.operators.python import PythonOperator
from datetime import datetime

dag = DAG('daily_forecast', schedule_interval='0 6 * * *',
          start_date=datetime(2026, 1, 1))

def fetch_data(): ...
def train_model(): ...
def predict(): ...

t1 = PythonOperator(task_id='fetch', python_callable=fetch_data, dag=dag)
t2 = PythonOperator(task_id='train', python_callable=train_model, dag=dag)
t3 = PythonOperator(task_id='predict', python_callable=predict, dag=dag)
t1 &gt;&gt; t2 &gt;&gt; t3</code></pre>`,
  },
  {
    "id": "deep-82", "day": 82, "week": 12, "track": "deep",
    "title": "Week 12 复习 + MLOps 全景图",
    "description": "把工程化工具串起来",
    "objectives": [
      "理解 MLOps 全流程",
      "知道每个工具的位置",
      "建立工程化能力地图",
    ],
    "duration": 60,
    "cues": [
      "数据 → 实验 → 训练 → 部署 → 监控 → 再训练",
      "工具：Git/MLflow/Docker/Airflow/Prometheus",
      "MLOps = DevOps + ML",
    ],
    "content": `<h3>MLOps 全景图</h3>
<table>
<tr><th>阶段</th><th>工具</th></tr>
<tr><td>版本控制</td><td>Git + DVC（数据版本）</td></tr>
<tr><td>实验追踪</td><td>MLflow / Weights &amp; Biases</td></tr>
<tr><td>编排</td><td>Airflow / Prefect / Kubeflow</td></tr>
<tr><td>服务化</td><td>FastAPI / BentoML / Seldon</td></tr>
<tr><td>容器</td><td>Docker / Kubernetes</td></tr>
<tr><td>监控</td><td>Prometheus / Grafana / Evidently</td></tr>
</table>`,
  },

  // ===== Day 83-100 · 毕业项目 =====
  {
    "id": "deep-83", "day": 83, "week": 13, "track": "deep",
    "title": "毕业项目启动：端到端供应链决策系统",
    "description": "把所有学到的技术整合成一个系统",
    "objectives": [
      "选定业务场景（电商/快消/医药）",
      "设计系统架构",
      "制定 18 天开发计划",
    ],
    "duration": 60,
    "cues": [
      "场景：销量预测 + 库存优化 + 营销归因",
      "架构：数据 → 特征 → 模型 → 决策 → 报告",
      "产出：代码 + 报告 + Demo + 答辩 PPT",
    ],
    "content": `<h3>毕业项目目标</h3>
<p>构建一个端到端系统，涵盖：</p>
<ol>
<li><strong>数据层：</strong>多源数据整合（销售 + 库存 + 营销 + 外部）</li>
<li><strong>特征层：</strong>lag/rolling/广告衰减/节假日</li>
<li><strong>模型层：</strong>LightGBM + 概率预测</li>
<li><strong>决策层：</strong>库存优化 + 补货建议</li>
<li><strong>归因层：</strong>DID + SHAP 量化营销 ROI</li>
<li><strong>展示层：</strong>Streamlit Dashboard</li>
</ol>`,
  },
  {
    "id": "deep-84", "day": 84, "week": 13, "track": "deep",
    "title": "毕业项目 Day 2：数据 + 特征",
    "description": "数据清洗 + 特征工程",
    "objectives": [
      "完成数据整合和清洗",
      "构造完整特征集",
      "建立特征存储",
    ],
    "duration": 60,
    "cues": [
      "多源数据合并（销售 + 库存 + 营销）",
      "特征工程模板复用",
      "防泄漏检查",
    ],
    "content": `<h3>今日任务清单</h3>
<ol>
<li>加载销售数据（Kaggle M5 / Rossmann）</li>
<li>合并营销数据（广告/促销标记）</li>
<li>构造 lag/rolling/日期/营销特征</li>
<li>Target Encoding SKU/品类</li>
<li>防泄漏检查（AI 辅助 code review）</li>
<li>特征存储（parquet）</li>
</ol>`,
  },
  {
    "id": "deep-85", "day": 85, "week": 13, "track": "deep",
    "title": "毕业项目 Day 3：模型训练 + 评估",
    "description": "LightGBM + 概率预测 + Optuna",
    "objectives": [
      "训练多分位数 LightGBM",
      "Optuna 调参",
      "滚动回测评估",
    ],
    "duration": 60,
    "cues": [
      "P10/P50/P90 三分位数模型",
      "Optuna 50 次试验",
      "回测 4 周 + MAE/MAPE/Pinball",
    ],
    "content": `<h3>今日任务清单</h3>
<ol>
<li>训练 P10/P50/P90 三个 LightGBM</li>
<li>Optuna 搜索超参</li>
<li>SHAP 分析特征贡献</li>
<li>滚动回测 4 周</li>
<li>记录到 MLflow</li>
</ol>`,
  },
  {
    "id": "deep-86", "day": 86, "week": 13, "track": "deep",
    "title": "毕业项目 Day 4：库存决策模块",
    "description": "把概率预测接到补货",
    "objectives": [
      "实现 (s, S) 补货策略",
      "基于概率预测算安全库存",
      "蒙特卡洛仿真评估",
    ],
    "duration": 60,
    "cues": [
      "P90 作为再订货点",
      "服务水准 95% 的库存计算",
      "仿真 1000 次评估成本",
    ],
    "content": `<h3>今日任务清单</h3>
<ol>
<li>读取概率预测结果</li>
<li>按服务水准 95% 算目标库存</li>
<li>用 (s, S) 策略生成补货建议</li>
<li>蒙特卡洛仿真对比 P50 vs P90 决策</li>
</ol>`,
  },
  {
    "id": "deep-87", "day": 87, "week": 13, "track": "deep",
    "title": "毕业项目 Day 5：因果归因模块",
    "description": "DID + CausalImpact + SHAP",
    "objectives": [
      "评估某次促销的真实效果",
      "三角验证（DID + CausalImpact + DoubleML）",
      "产出归因报告",
    ],
    "duration": 60,
    "cues": [
      "DID：实验组 vs 对照组",
      "CausalImpact：贝叶斯反事实",
      "DoubleML：控制高维混淆",
    ],
    "content": `<h3>今日任务清单</h3>
<ol>
<li>识别一次促销活动作为处理</li>
<li>DID 估计因果效应</li>
<li>CausalImpact 构造反事实</li>
<li>DoubleML 控制混淆变量</li>
<li>三角对比，写归因报告</li>
</ol>`,
  },
  {
    "id": "deep-88", "day": 88, "week": 14, "track": "deep",
    "title": "毕业项目 Day 6：API + Dashboard",
    "description": "服务化 + 可视化",
    "objectives": [
      "FastAPI 暴露预测接口",
      "Streamlit 做 Dashboard",
      "Docker 打包",
    ],
    "duration": 60,
    "cues": [
      "API：/predict /reorder /attribution",
      "Dashboard：销量图 + 库存建议 + 归因",
      "Docker 一键部署",
    ],
    "content": `<h3>Dashboard 设计</h3>
<ul>
<li>顶部：KPI 概览（总销量/缺货率/服务水准）</li>
<li>左：时间序列图 + 预测区间</li>
<li>右：补货建议表</li>
<li>下：营销归因图（SHAP / DID 对比）</li>
</ul>`,
  },
  {
    "id": "deep-89", "day": 89, "week": 14, "track": "deep",
    "title": "毕业项目 Day 7：MLOps + 监控",
    "description": "实验追踪 + 数据漂移检测",
    "objectives": [
      "集成 MLflow",
      "实现数据漂移监控",
      "建立再训练触发器",
    ],
    "duration": 60,
    "cues": [
      "每次预测记录 MLflow",
      "PSI > 0.2 触发告警",
      "概念漂移 → 重训",
    ],
    "content": `<h3>今日任务清单</h3>
<ol>
<li>每次预测记录到 MLflow</li>
<li>计算特征 PSI（vs 训练集）</li>
<li>PSI &gt; 0.2 触发 Slack 告警</li>
<li>写再训练脚本</li>
</ol>`,
  },
  {
    "id": "deep-90", "day": 90, "week": 14, "track": "deep",
    "title": "毕业项目 Day 8：测试 + 文档",
    "description": "代码质量和可维护性",
    "objectives": [
      "写单元测试",
      "完成 README 和使用文档",
      "代码重构",
    ],
    "duration": 60,
    "cues": [
      "pytest 测试关键函数",
      "README 含架构图",
      "类型注解 + docstring",
    ],
    "content": `<h3>今日任务清单</h3>
<ol>
<li>写 pytest 测试（特征工程/模型/决策）</li>
<li>更新 README：安装/使用/架构</li>
<li>加类型注解 + docstring</li>
<li>GitHub Actions 跑 CI</li>
</ol>`,
  },
  {
    "id": "deep-91", "day": 91, "week": 14, "track": "deep",
    "title": "毕业项目 Day 9：报告写作",
    "description": "写一份能放进简历的报告",
    "objectives": [
      "写技术报告",
      "写业务报告（给老板看）",
      "整理作品集",
    ],
    "duration": 60,
    "cues": [
      "技术报告：方法 + 代码 + 结果",
      "业务报告：问题 + 方案 + ROI",
      "作品集：GitHub + Demo + PPT",
    ],
    "content": `<h3>两份报告模板</h3>
<p><strong>技术报告（10 页）</strong>：数据/方法/实验/结果/讨论</p>
<p><strong>业务报告（3 页）</strong>：业务问题/方案概述/预期 ROI/实施路径</p>
<h3>作品集要素</h3>
<ul>
<li>GitHub repo（含 README + 测试）</li>
<li>在线 Demo（HuggingFace Space / Streamlit Cloud）</li>
<li>3 分钟介绍视频</li>
</ul>`,
  },
  {
    "id": "deep-92", "day": 92, "week": 15, "track": "deep",
    "title": "毕业项目 Day 10：答辩准备",
    "description": "准备 15 分钟答辩 PPT",
    "objectives": [
      "设计答辩结构",
      "练习 15 分钟讲解",
      "准备 Q&A",
    ],
    "duration": 60,
    "cues": [
      "15 分钟：问题(2) + 方法(5) + 结果(5) + 业务(3)",
      "重点：业务价值 + 技术亮点",
      "Q&A 预演：常见刁难问题",
    ],
    "content": `<h3>答辩 PPT 结构（15 张）</h3>
<ol>
<li>封面 + 自我介绍</li>
<li>业务问题（为什么做）</li>
<li>数据描述</li>
<li>方法概述</li>
<li>特征工程亮点</li>
<li>模型对比</li>
<li>关键结果</li>
<li>库存决策效果</li>
<li>营销归因发现</li>
<li>业务 ROI 估算</li>
<li>工程化架构</li>
<li>未来改进方向</li>
<li>代码 Demo 截图</li>
<li>致谢</li>
<li>Q&amp;A</li>
</ol>`,
  },
  {
    "id": "deep-93", "day": 93, "week": 15, "track": "deep",
    "title": "毕业项目 Day 11：模拟答辩 + 迭代",
    "description": "AI 扮演面试官",
    "objectives": [
      "模拟答辩",
      "根据反馈迭代",
      "完善作品集",
    ],
    "duration": 60,
    "cues": [
      "让 AI 扮演资深数据科学家提问",
      "记录回答不好的问题",
      "迭代 PPT 和 Demo",
    ],
    "content": `<div class="ex-box"><h4>✏️ AI 模拟答辩 Prompt</h4>
<p><em>"你是一名资深数据科学家，请像面试官一样针对我的毕业项目提问。重点问：方法选择是否合理？结果是否可信？业务建议是否落地？每次问 1 个，等我回答后再深入追问。"</em></p></div>`,
  },
  {
    "id": "deep-94", "day": 94, "week": 15, "track": "deep",
    "title": "毕业项目 Day 12：最终打磨",
    "description": "把所有细节打磨到位",
    "objectives": [
      "代码清理",
      "文档完善",
      "Demo 上线",
    ],
    "duration": 60,
    "cues": [
      "代码 PEP8 合规",
      "README 完整",
      "Demo 在线可访问",
    ],
    "content": `<h3>最终检查清单</h3>
<ul>
<li>代码 lint 通过（black/flake8）</li>
<li>所有测试通过</li>
<li>README 含截图和 Demo 链接</li>
<li>报告 PDF 导出</li>
<li>Demo 部署到 HuggingFace Space</li>
<li>GitHub repo 公开 + 标星</li>
</ul>`,
  },
  {
    "id": "deep-95", "day": 95, "week": 15, "track": "deep",
    "title": "毕业答辩 Day",
    "description": "正式答辩日",
    "objectives": [
      "完成 15 分钟答辩",
      "回答 Q&A",
      "总结学习成果",
    ],
    "duration": 90,
    "cues": [
      "自信讲解",
      "Q&A 诚实回答",
      "总结 100 天成长",
    ],
    "content": `<h3>答辩日 Check-list</h3>
<ol>
<li>Demo 提前 1 小时测试</li>
<li>PPT 转为 PDF 备份</li>
<li>准备笔记（关键数字 + 业务结论）</li>
<li>15 分钟讲解 + 15 分钟 Q&A</li>
<li>结束后总结反馈</li>
</ol>`,
  },

  // ===== Day 96-100 · 总结与未来 =====
  {
    "id": "deep-96", "day": 96, "week": 15, "track": "deep",
    "title": "100 天复盘：我学到了什么",
    "description": "系统回顾 100 天的学习",
    "objectives": [
      "复盘三大阶段的核心收获",
      "识别强弱项",
      "规划下一步学习",
    ],
    "duration": 60,
    "cues": [
      "5 天：地基（数学/Python/工具）",
      "30 天：应用（时序+因果）",
      "30 天：理论（统计学深入）",
      "35 天：业务（供应链库存）",
    ],
    "content": `<h3>100 天能力地图</h3>
<table>
<tr><th>领域</th><th>入门</th><th>熟练</th><th>专家</th></tr>
<tr><td>Python / pandas</td><td></td><td>✅</td><td></td></tr>
<tr><td>统计学</td><td></td><td>✅</td><td></td></tr>
<tr><td>时序预测</td><td></td><td></td><td>✅</td></tr>
<tr><td>因果推断</td><td></td><td>✅</td><td></td></tr>
<tr><td>机器学习</td><td></td><td>✅</td><td></td></tr>
<tr><td>供应链业务</td><td></td><td>✅</td><td></td></tr>
<tr><td>工程化</td><td>✅</td><td></td><td></td></tr>
</table>`,
  },
  {
    "id": "deep-97", "day": 97, "week": 15, "track": "deep",
    "title": "作品集整理 + LinkedIn 更新",
    "description": "把成果展示给世界",
    "objectives": [
      "整理 GitHub 作品集",
      "更新 LinkedIn / 简历",
      "在社区分享经验",
    ],
    "duration": 45,
    "cues": [
      "GitHub Pinned 6 个项目",
      "LinkedIn 写项目经验",
      "知乎/博客发学习总结",
    ],
    "content": `<h3>作品集要素</h3>
<ol>
<li><strong>GitHub：</strong>毕业项目 + 日常练习 + RAG 知识库</li>
<li><strong>LinkedIn：</strong>3 个项目经验（时序/因果/供应链）</li>
<li><strong>博客：</strong>100 天学习总结 + 踩坑经验</li>
<li><strong>社区：</strong>Kaggle / 知乎 / GitHub Discussions</li>
</ol>`,
  },
  {
    "id": "deep-98", "day": 98, "week": 15, "track": "deep",
    "title": "下一步学习路径规划",
    "description": "100 天后的方向",
    "objectives": [
      "识别兴趣方向",
      "规划深度学习路径",
      "建立持续学习机制",
    ],
    "duration": 45,
    "cues": [
      "选项 A：深度学习时序（TFT/PatchTST）",
      "选项 B：Agent + 自动化",
      "选项 C：金融量化",
      "选项 D：电力市场",
    ],
    "content": `<h3>四个深化方向</h3>
<ul>
<li><strong>深度学习时序：</strong>TFT / PatchTST / Chronos / TimeGPT</li>
<li><strong>Agent 自动化：</strong>LangGraph / RD-Agent / Multi-Agent</li>
<li><strong>金融量化：</strong>因子挖掘 / 套保 / 高频</li>
<li><strong>电力市场：</strong>日前/实时价格 + 调度优化</li>
</ul>
<div class="ex-box"><h4>✏️ 持续学习机制</h4>
<ul>
<li>每周读 1 篇论文（Papers with Code）</li>
<li>每月做 1 个小项目</li>
<li>每季度更新作品集</li>
</ul></div>`,
  },
  {
    "id": "deep-99", "day": 99, "week": 15, "track": "deep",
    "title": "面试准备 + 常见问题",
    "description": "准备数据科学家面试",
    "objectives": [
      "掌握常见面试题",
      "准备项目讲解",
      "练习手撕代码",
    ],
    "duration": 60,
    "cues": [
      "项目 STAR 法讲解",
      "ML 八股文",
      "LeetCode 中等难度",
    ],
    "content": `<h3>常见面试题（举例）</h3>
<ol>
<li>解释过拟合，怎么检测和防止？</li>
<li>XGBoost 和 LightGBM 的差异？</li>
<li>ARIMA 和 Prophet 什么时候用哪个？</li>
<li>相关 vs 因果？怎么从相关推出因果？</li>
<li>SHAP 的原理？</li>
<li>怎么处理不平衡数据？</li>
<li>解释 A/B 测试和它的陷阱</li>
<li>怎么评估时序模型？</li>
</ol>`,
  },
  {
    "id": "deep-100", "day": 100, "week": 15, "track": "deep",
    "title": "Day 100：毕业总结",
    "description": "100 天的终点，新的起点",
    "objectives": [
      "正式毕业",
      "总结核心能力",
      "展望未来",
    ],
    "duration": 30,
    "cues": [
      "从『会用』到『懂为什么』到『做业务』",
      "毕业项目是简历核心",
      "持续学习是终身事业",
    ],
    "content": `<h3>🎓 100 天毕业总结</h3>
<p>恭喜你完成了 100 天的量化分析师修炼之路。回顾这 100 天：</p>
<ul>
<li><strong>Day 1-5：</strong>建立了量化分析的地基（Python / 统计 / 工具）</li>
<li><strong>Day 6-35：</strong>用 30 天做出了 2 个作品（时序预测 + 因果归因）</li>
<li><strong>Day 36-65：</strong>深入统计学，从『会用』到『懂为什么』</li>
<li><strong>Day 66-95：</strong>把所有技能整合到供应链决策系统</li>
<li><strong>Day 96-100：</strong>整理作品集，准备下一步</li>
</ul>
<p>现在你已经具备了：</p>
<ol>
<li>完整的时序预测能力（ARIMA / SARIMA / LightGBM / Prophet / 概率预测）</li>
<li>因果分析能力（DID / CausalImpact / DoubleML）</li>
<li>统计学功底（回归诊断 / 贝叶斯 / 协整）</li>
<li>供应链业务理解（库存 / 补货 / S&OP / MMM）</li>
<li>工程化能力（FastAPI / Docker / MLflow / Airflow）</li>
</ol>
<p><span class="key-pt">下一步：选一个方向（深度学习/Agent/金融/电力）继续深化，并保持每周读论文、每月做项目的节奏。</span></p>
<p>这 100 天只是开始，量化的世界很大，保持好奇心和执行力，你会走得很远。🚀</p>`,
  },
];
