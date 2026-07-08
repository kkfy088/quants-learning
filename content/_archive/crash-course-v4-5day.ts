import type { DayContent } from "@/lib/types";

/**
 * 5 天硬核速成 v4.0 — 地基优先版
 *
 * 设计哲学（基于用户反馈迭代）：
 * - Day 1：数学统计地基——把后 4 天会用到的全部数学概念一次讲清
 * - Day 2：技术栈全景 + 量化/预测方法论 + 关键概念科普
 * - Day 3：pandas + Boosting + 机器学习（最高频技能集中爆破）
 * - Day 4：ARIMA + Prophet + 时序模型（小数据/强季节性场景）
 * - Day 5：工具课——动手跑一个端到端 pipeline
 *
 * 路径递进：地基 → 方法论 → 工具与武器 → 时序专精 → 落地实战
 * 保证傻子也能看懂：每个数学概念都配「一句话类比」+「专业定义」+「为什么用到」
 */

export const crashDays: DayContent[] = [
  // ============================================================
  // DAY 1 — 数学统计地基：5 天会用到的全部数学概念
  // ============================================================
  {
    id: "crash-1",
    day: 1,
    week: 1,
    track: "crash",
    duration: 150,
    title: "数学统计地基：5 天的全部数学弹药一次装齐",
    description:
      "后 4 天学 pandas / XGBoost / ARIMA / 回测时，所有公式都建立在这一天的概念上。把均值、方差、相关、正态分布、贝叶斯、梯度下降一次讲清——后面看任何代码不再被术语卡住。",
    objectives: [
      "掌握描述性统计 5 件套（均值/中位数/方差/标准差/分位数）",
      "理解概率分布（正态/均匀/对数正态）及其在销量/库存数据中的形态",
      "搞懂相关系数、协方差、条件概率与贝叶斯定理——特征筛选的数学根基",
      "理解线性回归 + 最小二乘 + 梯度下降——所有 ML 模型的母体",
      "建立「信息熵 / 交叉熵 / 似然」的直觉——后面所有损失函数的源头",
    ],
    cues: [
      "为什么销量数据通常用中位数比均值更稳？（极端爆款拉爆均值）",
      "正态分布 vs 对数正态分布——销量数据通常更像哪个？为什么？",
      "Pearson 相关系数 = 0，能说明两变量无关吗？（不能——只说明无线性关系）",
      "梯度下降为什么需要学习率？学习率太大会发生什么？",
      "贝叶斯定理用一句话怎么讲？（新证据修正旧认知）",
      "信息熵高 vs 低——哪个更混乱？这和决策树分裂有什么关系？",
    ],
    content: `
<h3>1.1 为什么第一天要先打地基</h3>

<p><strong>类比：</strong>盖一栋 5 层楼。pandas 是砌墙、XGBoost 是封顶、ARIMA 是装修。
但如果没有<strong>地基</strong>（数学统计），墙一推就倒。后 4 天每个公式、每个参数、每个指标背后都站着这一天的概念。</p>

<div class="quote-box">
<blockquote>
<strong>今天的目标：</strong>不是把你训练成数学家，而是让你<strong>看懂后面所有代码的注释和参数含义</strong>。
看到 <code>loss='mse'</code> 知道是最小二乘；看到 <code>learning_rate=0.05</code> 知道是梯度下降的步长；
看到 <code>corr &gt; 0.8</code> 知道是高相关——就够了。
</blockquote>
</div>

<h3>1.2 描述性统计 5 件套（用得最多）</h3>

<table>
<tr><th>概念</th><th>一句话类比</th><th>专业定义</th><th>用在哪里</th></tr>
<tr><td><strong>均值 (mean)</strong></td><td>一堆数的「平均重量中心」</td><td>Σxᵢ / n</td><td>报表、baseline</td></tr>
<tr><td><strong>中位数 (median)</strong></td><td>排序后站中间的那个</td><td>第 50 百分位</td><td>★抗异常值</td></tr>
<tr><td><strong>方差 (variance)</strong></td><td>数据有多「散」</td><td>Σ(xᵢ-μ)² / n</td><td>波动率、稳定性</td></tr>
<tr><td><strong>标准差 (std)</strong></td><td>方差的平方根（和原数据同单位）</td><td>√方差</td><td>变异系数 CV=std/mean</td></tr>
<tr><td><strong>分位数 (quantile)</strong></td><td>排在第 X% 位置的数</td><td>p=0.95 即第 95 百分位</td><td>爆款识别、阈值</td></tr>
</table>

<pre><code>import pandas as pd
import numpy as np

s = pd.Series([10, 20, 30, 40, 50, 200])  # 注意 200 是异常值

print(f"均值:   {s.mean():.1f}")      # 58.3 — 被 200 拉爆
print(f"中位数: {s.median():.1f}")     # 35.0 — 稳如老狗
print(f"标准差: {s.std():.1f}")        # 71.6
print(f"P95:    {s.quantile(0.95):.1f}")  # 找前 5% 爆款</code></pre>

<div class="pit-box">
<strong>⚠️ 最大坑：报表默认给均值，但销量数据用均值是错的。</strong>
某 SKU 月销量 [10, 12, 11, 8, 9, 800]（双 11 爆发），均值=141.7 严重高估日常需求。
正确做法：<strong>用中位数描述「典型日」，用分位数描述「爆款日」</strong>。
</div>

<h3>1.3 概率分布：销量/库存数据的真实形态</h3>

<h4>① 正态分布（钟形曲线）</h4>
<p><strong>类比：</strong>全班考试成绩。大多数人中等，极好极少的占少数。<br/>
<strong>特征：</strong>对称、均值=中位数=众数、68-95-99.7 法则（±1σ 内占 68%）。</p>

<h4>② 对数正态分布（右偏长尾）</h4>
<p><strong>类比：</strong>商品销量分布。大多数 SKU 卖得少，少数爆款卖得多。<br/>
<strong>特征：</strong>右偏（右边长尾）、取对数后变正态。<br/>
<strong>★ 这是销量数据最常见的形态</strong>——所以建模时常先 <code>np.log1p(y)</code> 转换。</p>

<h4>③ 均匀分布</h4>
<p><strong>类比：</strong>掷骰子。每个值等概率出现。建模中很少见，但<strong>随机采样</strong>时常用。</p>

<pre><code># 用 QQ 图判断是不是正态
import scipy.stats as stats
import matplotlib.pyplot as plt

stats.probplot(df["sales"], dist="norm", plot=plt)
plt.show()
# 点严重偏离对角线 → 不是正态，考虑对数变换

# 对数变换（对数正态数据的标准操作）
df["sales_log"] = np.log1p(df["sales"])  # log1p 比 log 更稳（避免 log(0)）</code></pre>

<h3>1.4 相关性：特征筛选的根基</h3>

<h4>协方差 vs 相关系数</h4>
<p><strong>协方差：</strong>两变量「同涨同跌」的程度。正值=同向，负值=反向。<br/>
<strong>相关系数 (Pearson r)：</strong>把协方差标准化到 [-1, 1]，可比较强弱。</p>

<table>
<tr><th>|r| 范围</th><th>解读</th></tr>
<tr><td>0.0 - 0.2</td><td>极弱或无关</td></tr>
<tr><td>0.2 - 0.5</td><td>弱相关</td></tr>
<tr><td>0.5 - 0.8</td><td>中等相关</td></tr>
<tr><td>0.8 - 1.0</td><td>强相关</td></tr>
</table>

<pre><code># 看哪些特征和销量相关最强
corr = df.corr()["sales"].sort_values(ascending=False)
print(corr.head(10))

# 相关性热力图（一眼看特征间多重共线性）
import seaborn as sns
sns.heatmap(df.corr(), annot=True, cmap="coolwarm")</code></pre>

<div class="pit-box">
<strong>⚠️ 最大坑：相关 ≠ 因果。</strong>
冰淇淋销量和溺水人数高度相关，但不是因果——共同原因是「夏天高温」。
相关性只能告诉你「一起变」，因果需要业务逻辑或实验验证（A/B 测试）。
</div>

<div class="tip-box">
💡 <strong>Pearson 只看线性关系。</strong>树模型能学非线性关系，所以你用 corr() 看不出来的特征，
不代表对树模型没用——这恰恰是<strong>为什么 XGBoost 强</strong>（自动学非线性）。
</div>

<h3>1.5 贝叶斯定理：用新证据修正认知</h3>

<p><strong>一句话：</strong>先验认知 + 新证据 = 后验认知。</p>

<p><strong>公式：</strong>P(A|B) = P(B|A) × P(A) / P(B)</p>

<p><strong>类比：</strong>「这个客户会不会复购？」<br/>
先验：历史复购率 30%（P(A)=0.3）。<br/>
新证据：他刚下了一笔大单（大单客户复购率 P(B|A)=0.7）。<br/>
后验：他复购的概率从 30% 调整到更高——这就是贝叶斯更新。</p>

<div class="quote-box">
<blockquote>
<strong>贝叶斯思维是量化预测的灵魂</strong>——所有概率预测（DeepAR、Prophet 的置信区间、贝叶斯优化）
本质都是「用新数据修正旧认知」。
</blockquote>
</div>

<h3>1.6 线性回归 + 最小二乘：所有 ML 的母体</h3>

<p><strong>公式：</strong>y = β₀ + β₁x₁ + β₂x₂ + ... + ε</p>

<p><strong>最小二乘法：</strong>找一组 β，让<strong>预测误差的平方和最小</strong>——这就是 MSE 损失函数的起源。</p>

<pre><code>from sklearn.linear_model import LinearRegression

X = df[["price", "is_promo", "lag_7"]]
y = df["sales"]

model = LinearRegression()
model.fit(X, y)
print(f"系数: {model.coef_}")  # 每个特征的「影响大小」
print(f"截距: {model.intercept_}")</code></pre>

<div class="tip-box">
💡 <strong>为什么先学线性回归？</strong>
因为它<strong>可解释</strong>（系数就是影响大小）、训练快、是其他模型的基准。
任何复杂模型上线前，都要先跑一版线性回归作 baseline——如果复杂模型打不过它，说明特征工程有问题。
</div>

<h3>1.7 梯度下降：理解学习率的钥匙</h3>

<p><strong>类比：</strong>蒙眼下山。每一步往最陡的方向走，直到走到谷底（最优解）。</p>

<p><strong>核心公式：</strong>θ_new = θ_old - η × ∇L<br/>
其中 η 是学习率（步长），∇L 是损失函数的梯度（坡度）。</p>

<table>
<tr><th>学习率</th><th>表现</th><th>XGBoost 中的对应</th></tr>
<tr><td>太大（如 1.0）</td><td>跨过谷底，发散</td><td>learning_rate=0.3 → 快但糙</td></tr>
<tr><td>太小（如 0.001）</td><td>走得太慢，要很久</td><td>learning_rate=0.01 → 慢但精</td></tr>
<tr><td>★ 合适（0.01-0.1）</td><td>稳稳下山</td><td>learning_rate=0.05 是黄金值</td></tr>
</table>

<div class="quote-box">
<blockquote>
<strong>黄金法则：</strong>小学习率 + 多迭代（多棵树）= 高精度。<br/>
典型组合：<code>learning_rate=0.05, n_estimators=500</code>。
</blockquote>
</div>

<h3>1.8 信息熵与交叉熵：决策树与神经网络的损失函数源头</h3>

<p><strong>信息熵：</strong>衡量「不确定性」。一堆数越乱，熵越高。<br/>
<strong>公式：</strong>H = -Σ pᵢ × log(pᵢ)</p>

<p><strong>决策树原理：</strong>每次分裂选<strong>让信息熵下降最多</strong>的特征——这就是 ID3/C4.5 的核心。
XGBoost 用的「增益 (Gain)」本质上就是熵的减少量。</p>

<p><strong>交叉熵（Cross-Entropy）：</strong>衡量「预测分布」和「真实分布」的差异。
神经网络分类任务的标准损失函数。</p>

<div class="tip-box">
💡 不需要手算熵。但理解它，你就明白：
<ul>
<li>为什么决策树分裂要选「信息增益最大」的特征</li>
<li>为什么分类任务用交叉熵损失，回归任务用 MSE</li>
</ul>
</div>

<h3>1.9 大数定律 + 中心极限定理</h3>

<p><strong>大数定律：</strong>样本越大，样本均值越接近真实均值。<br/>
<strong>实战意义：</strong>为什么销量预测<strong>需要历史数据足够多</strong>——30 天不够、90 天起步、365 天最佳。</p>

<p><strong>中心极限定理：</strong>无论原分布是什么，样本均值的分布趋近正态。<br/>
<strong>实战意义：</strong>为什么可以放心用「均值 ± 2σ」做置信区间和异常检测。</p>

<h3>1.10 假设检验与 p 值：别被「显著」骗了</h3>

<p><strong>p 值：</strong>「假设原假设为真，观测到当前结果或更极端的概率」。<br/>
<strong>实战意义：</strong>判断一个特征或一个策略是否<strong>真的有效</strong>，还是只是噪声。</p>

<pre><code>from scipy import stats

# 检验促销日和非促销日的销量差异是否显著
promo = df[df["is_promo"] == 1]["sales"]
non_promo = df[df["is_promo"] == 0]["sales"]

t_stat, p_value = stats.ttest_ind(promo, non_promo)
print(f"p-value: {p_value:.4f}")
# p < 0.05 → 促销真的有效（差异显著）
# p > 0.05 → 差异可能是噪声</code></pre>

<div class="pit-box">
<strong>⚠️ p 值的常见误用：</strong>
<ul>
<li>p &lt; 0.05 不代表「一定有效」，只代表「不太可能是巧合」</li>
<li>样本小时 p 值不稳定；数据量大时微小差异也会「显著」（要看效应量）</li>
</ul>
</div>

<h3>1.11 今天的「行话速查表」</h3>

<table>
<tr><th>术语</th><th>通俗解释</th><th>专业含义</th></tr>
<tr><td>μ / x̄</td><td>「平均」</td><td>总体均值 / 样本均值</td></tr>
<tr><td>σ / s</td><td>「散度」</td><td>总体标准差 / 样本标准差</td></tr>
<tr><td>r / ρ</td><td>「相关性」</td><td>Pearson / Spearman 相关系数</td></tr>
<tr><td>p 值</td><td>「巧合概率」</td><td>原假设为真时观测到当前结果的概率</td></tr>
<tr><td>梯度</td><td>「坡度」</td><td>损失函数对参数的偏导数</td></tr>
<tr><td>熵</td><td>「混乱度」</td><td>不确定性的信息论度量</td></tr>
<tr><td>似然</td><td>「数据出现的可能性」</td><td>给定参数下观测到数据的概率</td></tr>
</table>

<div class="ex-box">
<h4>✏️ Day 1 必做（地基不牢地动山摇）</h4>
<ol>
<li>用 pandas 跑 <code>df.describe()</code> + <code>df.median()</code>，对比均值和中位数差异</li>
<li>画销量直方图 + QQ 图，判断是正态还是右偏（对数正态）</li>
<li>算 <code>df.corr()["sales"]</code>，找出和销量相关 Top 5 的特征</li>
<li>训练一个最简单的 <code>LinearRegression</code>，看系数——哪个特征影响最大？</li>
<li>把今天学的 11 个概念，用「傻子也能听懂」的话讲给一个朋友听</li>
</ol>
</div>

<div class="tip-box">
💡 <strong>今天结束你应该能回答：</strong>
<ul>
<li>老板问「这个产品销量稳定吗？」——你能用「std/mean（变异系数）」回答，而不是「看着挺稳」</li>
<li>同事说「这两个特征高度相关」——你知道用 corr() 验证，且知道「&gt;0.8 才算高」</li>
<li>看到 XGBoost 的 <code>learning_rate</code>——你知道这是梯度下降的步长</li>
<li>看到 <code>loss='mse'</code>——你知道这是最小二乘</li>
</ul>
</div>
`,
  },

  // ============================================================
  // DAY 2 — 技术栈全景 + 量化预测方法论
  // ============================================================
  {
    id: "crash-2",
    day: 2,
    week: 1,
    track: "crash",
    duration: 150,
    title: "技术栈全景 + 量化预测方法论：地图比路标重要",
    description:
      "在动手写代码前，先有一张「全局地图」：量化是什么、供应链预测的本质、Python 生态有哪些库、模型家族有哪些、四步法骨架是什么。今天回答「我要学什么、为什么学、学到什么程度」。",
    objectives: [
      "理解「量化分析」的三个关键词和四步法骨架",
      "建立 Python 数据科学全栈的认知地图（pandas/numpy/sklearn/xgboost/statsmodels/prophet/pytorch）",
      "看清模型家族全景：线性 / 树 / 时序 / 深度学习 四大类",
      "搞懂「因子（特征）」概念——为什么它是所有预测问题的核心",
      "知道供应链预测、金融预测、电力预测的共同骨架和差异",
    ],
    cues: [
      "量化分析的三个关键词是什么？（可验证 / 可复现 / 可追溯）",
      "Python 数据科学栈：pandas 和 numpy 各自负责什么？",
      "为什么「特征工程」比「选模型」更决定成败？（garbage in = garbage out）",
      "线性模型 / 树模型 / 时序模型 / 深度学习——四大类的优劣对照？",
      "供应链预测 vs 金融预测——为什么前者更容易做出高精度？（数据更稳、规律更强）",
      "什么是「人机边界」？哪些环节交给 AI、哪些必须人来判断？",
    ],
    content: `
<h3>2.1 什么是量化分析——三个关键词</h3>

<p><strong>量化分析 ≠ 算模型。</strong>它的本质是一种<strong>思维方式</strong>，特征是三个关键词：</p>

<table>
<tr><th>关键词</th><th>含义</th><th>反例（非量化）</th></tr>
<tr><td><strong>可验证</strong></td><td>事后能检验对错</td><td>「我觉得明年会涨」——怎么验证？</td></tr>
<tr><td><strong>可复现</strong></td><td>同样输入产生同样输出</td><td>「凭经验拍脑袋」——换人就不同</td></tr>
<tr><td><strong>可追溯</strong></td><td>每个数字能追到源头</td><td>「业内传说」——源头在哪？</td></tr>
</table>

<div class="quote-box">
<blockquote>
<strong>量化的对立面是「拍脑袋」。</strong>
你的预测报告里，每个数字都应该能追溯到：数据来源 + 处理逻辑 + 模型代码 + 评估结果。
</blockquote>
</div>

<h3>2.2 量化分析四步法骨架（一切预测问题的母图）</h3>

<pre><code>┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│  ① 数据  │ →  │  ② 因子  │ →  │  ③ 模型  │ →  │  ④ 决策  │
│ 清洗与   │    │ 特征工程 │    │ 训练评估 │    │ 业务落地 │
│ 探索     │    │          │    │          │    │          │
└──────────┘    └──────────┘    └──────────┘    └──────────┘
   60%              20%             10%            10%
   时间             时间            时间           时间</code></pre>

<p><strong>关键洞察：</strong>顶级团队把 <strong>60% 时间花在数据</strong>、<strong>20% 花在特征</strong>，建模只占 10%。
新手最大的误区是「上来就调模型」——地基不牢，调到死也调不出效果。</p>

<h3>2.3 Python 数据科学全栈地图</h3>

<table>
<tr><th>层级</th><th>库</th><th>负责什么</th><th>5 天里用到</th></tr>
<tr><td>地基</td><td><strong>numpy</strong></td><td>多维数组 + 数学运算</td><td>每天都有</td></tr>
<tr><td>地基</td><td><strong>pandas</strong></td><td>表格数据操作（DataFrame）</td><td>Day 3 主线</td></tr>
<tr><td>可视化</td><td>matplotlib / seaborn / plotly</td><td>画图</td><td>每天用</td></tr>
<tr><td>传统 ML</td><td><strong>scikit-learn</strong></td><td>线性/树/聚类/评估/预处理</td><td>Day 3-5</td></tr>
<tr><td>梯度提升</td><td><strong>xgboost / lightgbm / catboost</strong></td><td>表格数据王者模型</td><td>Day 3 主线</td></tr>
<tr><td>统计时序</td><td><strong>statsmodels</strong></td><td>ARIMA / 回归诊断 / 假设检验</td><td>Day 4</td></tr>
<tr><td>自动化时序</td><td><strong>prophet / neuralprophet</strong></td><td>Facebook 时序神器</td><td>Day 4</td></tr>
<tr><td>深度学习</td><td>pytorch / tensorflow</td><td>神经网络（LSTM/Transformer）</td><td>100 天再深学</td></tr>
<tr><td>时序专用</td><td>darts / skforecast / nixtla</td><td>统一时序预测接口</td><td>100 天延伸</td></tr>
<tr><td>实验追踪</td><td>mlflow / weights-biases</td><td>记录每次训练的参数和指标</td><td>工程化必学</td></tr>
<tr><td>自动调参</td><td><strong>optuna</strong></td><td>贝叶斯优化超参数</td><td>Day 5 拓展</td></tr>
</table>

<div class="tip-box">
💡 <strong>5 天里你真正要掌握的：</strong>pandas、numpy、sklearn、xgboost、statsmodels、prophet。
其他库知道存在即可，需要时再学。不要一上来就学 10 个库——会学不完。
</div>

<h3>2.4 模型家族全景：四大类对照</h3>

<table>
<tr><th>家族</th><th>代表</th><th>核心思想</th><th>优势</th><th>劣势</th><th>何时用</th></tr>
<tr>
<td><strong>线性模型</strong></td>
<td>线性回归 / Lasso / Ridge</td>
<td>y = β₀+β₁x₁+...</td>
<td>快、可解释、是基准</td>
<td>只学线性关系</td>
<td>baseline / 特征诊断</td>
</tr>
<tr>
<td><strong>树模型</strong></td>
<td>决策树 / RF / <strong>XGBoost</strong></td>
<td>分裂节点学规则</td>
<td>★表格数据王者、自动学非线性、可解释</td>
<td>外推差、小数据易过拟合</td>
<td>★销量预测首选</td>
</tr>
<tr>
<td><strong>统计时序</strong></td>
<td>ARIMA / Prophet / ETS</td>
<td>用历史自身的规律预测</td>
<td>小样本友好、可解释</td>
<td>用不了外部特征（Prophet 除外）</td>
<td>数据&lt;1000 行</td>
</tr>
<tr>
<td><strong>深度学习</strong></td>
<td>LSTM / Transformer / TFT</td>
<td>用神经网络学时序表示</td>
<td>大数据下 SOTA</td>
<td>数据饥渴、训练慢、黑盒</td>
<td>数据&gt;100 万行</td>
</tr>
</table>

<div class="quote-box">
<blockquote>
<strong>选型口诀：</strong>
数据少 → ARIMA/Prophet；
数据中 → XGBoost；
数据多 + 有 GPU → 深度学习；
不确定 → 先 XGBoost 跑一版当基准。
</blockquote>
</div>

<h3>2.5 因子（特征）——所有预测问题的核心</h3>

<p><strong>因子 = 能用来预测目标变量的可量化信号。</strong>三个必要条件：</p>
<ol>
<li><strong>有预测力</strong>：和目标变量相关（统计上显著）</li>
<li><strong>能数值化</strong>：能变成数字喂给模型</li>
<li><strong>能持续观察</strong>：未来也能拿到这个数据（不能用「事后才能知道」的因子）</li>
</ol>

<table>
<tr><th>场景</th><th>典型因子（特征）</th></tr>
<tr><td>销量预测</td><td>lag_7、rolling_mean_7、price、is_promo、is_holiday、store_avg_sales</td></tr>
<tr><td>股价预测</td><td>动量、波动率、估值因子（PE/PB）、行业因子、情绪因子</td></tr>
<tr><td>电力预测</td><td>温度、湿度、节假日、lag_24（昨日同时段）、rolling_7</td></tr>
</table>

<div class="pit-box">
<strong>⚠️ 因子的最大陷阱——未来函数（数据泄漏）。</strong>
「用今天的销量预测今天」就是泄漏。所有 lag/rolling 必须 <code>shift(1)</code>——只用过去的数据。
新手 80% 的「模型表现突然爆好」都是数据泄漏。
</div>

<h3>2.6 评估指标体系：怎么判断模型好坏</h3>

<table>
<tr><th>指标</th><th>含义</th><th>何时用</th></tr>
<tr><td><strong>MAE</strong></td><td>平均绝对误差</td><td>常规场景</td></tr>
<tr><td><strong>MAPE</strong></td><td>平均绝对百分比误差</td><td>销量稳定时</td></tr>
<tr><td><strong>WAPE</strong></td><td>加权百分比误差</td><td>★销量数据推荐</td></tr>
<tr><td><strong>RMSE</strong></td><td>均方根误差（惩罚大误差）</td><td>关注极端错</td></tr>
<tr><td><strong>R²</strong></td><td>决定系数（0-1）</td><td>线性回归诊断</td></tr>
</table>

<p><strong>金科玉律：</strong>任何模型上线前，必须<strong>打赢 naive baseline</strong>（用昨天的值预测今天）。
打不过 baseline → 你的模型没用。</p>

<h3>2.7 供应链预测 vs 金融预测 vs 电力预测</h3>

<table>
<tr><th>维度</th><th>供应链销量</th><th>金融股价</th><th>电力负荷</th></tr>
<tr><td>数据稳定性</td><td>★高（规律强）</td><td>极低（噪声大）</td><td>高（和温度强相关）</td></tr>
<tr><td>典型精度（WAPE）</td><td>10-25%</td><td>方向预测 55% 算不错</td><td>3-8%</td></tr>
<tr><td>季节性</td><td>周/月/年</td><td>弱（市场半强有效）</td><td>日/周/年</td></tr>
<tr><td>外部因子</td><td>促销、节假日、价格</td><td>新闻、宏观、情绪</td><td>天气、节假日</td></tr>
<tr><td>数据量</td><td>通常 1 万-千万行</td><td>分钟级海量</td><td>小时级海量</td></tr>
</table>

<div class="tip-box">
💡 <strong>为什么供应链预测对新手更友好？</strong>
规律性强、噪声小、精度门槛低（WAPE 20% 就能用）、数据形态规整。
金融预测是「最难副本」——能做好金融预测的人，转供应链是降维打击。
</div>

<h3>2.8 人机边界：哪些交给 AI、哪些必须人来</h3>

<table>
<tr><th>环节</th><th>人 / AI</th><th>原因</th></tr>
<tr><td>提出业务假设</td><td>★ 人</td><td>机器不懂业务</td></tr>
<tr><td>数据清洗代码</td><td>✓ AI</td><td>规则明确</td></tr>
<tr><td>特征工程设计</td><td>★ 人</td><td>需要业务理解</td></tr>
<tr><td>特征实现代码</td><td>✓ AI</td><td>有标准模式</td></tr>
<tr><td>模型选型</td><td>人+AI</td><td>AI 给建议</td></tr>
<tr><td>模型训练代码</td><td>✓ AI</td><td>标准化</td></tr>
<tr><td>评估 + 回测</td><td>✓ AI</td><td>规则明确</td></tr>
<tr><td>业务建议</td><td>★ 人</td><td>需要业务判断</td></tr>
<tr><td>上线决策</td><td>★ 人</td><td>需要问责</td></tr>
</table>

<h3>2.9 这 5 天的学习路径地图</h3>

<pre><code>Day 1 数学统计地基 ────┐
                       ↓
Day 2 技术栈 + 方法论 ────┐
                         ↓
Day 3 pandas + Boosting ────┐
                            ↓
Day 4 ARIMA + 时序模型 ────┐
                           ↓
Day 5 端到端实战 pipeline</code></pre>

<p><strong>递进逻辑：</strong></p>
<ul>
<li>Day 1 的数学 → 解释 Day 3 所有参数（learning_rate=梯度下降、mse=最小二乘）</li>
<li>Day 2 的方法论 → 给 Day 3-5 的代码一个「为什么这样做」的框架</li>
<li>Day 3 的 ML → 是大数据场景的主力武器</li>
<li>Day 4 的时序 → 是小数据/强季节性场景的补充武器</li>
<li>Day 5 → 把所有武器串成一个可上线的 pipeline</li>
</ul>

<div class="ex-box">
<h4>✏️ Day 2 必做</h4>
<ol>
<li>画一张「Python 数据科学栈」的思维导图，标注每个库的职责</li>
<li>列一个表：「我手上的业务数据，能用哪些因子？」至少想出 10 个</li>
<li>用一句话回答：「量化分析是什么？」——讲给一个非技术朋友听</li>
<li>对照 2.8 的人机边界表，反思你目前工作中哪些环节过度依赖 AI、哪些该交给人</li>
</ol>
</div>

<div class="tip-box">
💡 <strong>今天结束你应该能回答：</strong>
<ul>
<li>拿到一个新业务预测问题，能不能 30 秒说出骨架（数据→因子→模型→评估→决策）？</li>
<li>知道为什么「先 pandas 再 XGBoost」而不是反过来？</li>
<li>知道为什么不能上来就调 LSTM？</li>
<li>知道这 5 天每天在学什么、为什么按这个顺序？</li>
</ul>
</div>
`,
  },

  // ============================================================
  // DAY 3 — pandas + Boosting + 机器学习（主力武器集中爆破）
  // ============================================================
  {
    id: "crash-3",
    day: 3,
    week: 1,
    track: "crash",
    duration: 180,
    title: "pandas + Boosting + 机器学习：主力武器集中爆破",
    description:
      "今天把顶级分析师 80% 时间在用的东西一次讲清：pandas 十大核心操作、6 类特征工程、Boosting 三剑客（XGBoost/LightGBM/CatBoost）、其他常用 ML 模型。学完今天，你能独立完成一个 ML 销量预测项目。",
    objectives: [
      "掌握 pandas 的 10 个最高频操作（读、筛、改、合、转、时序）",
      "理解特征工程的 6 大类：时间 / 滞后 / 滑动 / 编码 / 交互 / 聚合",
      "理解 Boosting 的「补错」核心思想 + 三剑客差异",
      "会用 XGBoost 调 5 个核心超参数 + early stopping",
      "知道 LightGBM / CatBoost 各自的杀手锏场景",
    ],
    cues: [
      "为什么说「数据清洗 + 特征工程」比「选模型」更重要？（garbage in = garbage out）",
      "lag_7 / lag_28 / rolling_7 各自捕捉什么业务含义？（上周同期 / 上月同期 / 近期趋势）",
      "Boosting 和 Bagging（随机森林）的核心区别？（串行补错 vs 并行投票）",
      "XGBoost vs LightGBM：哪个快？哪个对类别特征友好？",
      "为什么 rolling 必须 shift(1)？（防止信息泄漏）",
      "target encoding 为什么对商品 ID 这种高基数类别特别有效？",
    ],
    content: `
<h3>3.1 pandas 十大核心操作（顶级分析师天天在用）</h3>

<h4>① 读取 + 快速诊断</h4>
<pre><code>df = pd.read_csv("sales.csv", parse_dates=["date"])

# 诊断三连——任何新数据都先跑这三行
df.info()         # 看列名、类型、缺失
df.describe()     # 看数值列的分布
df.isnull().sum() # 看每列缺多少</code></pre>

<div class="pit-box"><strong>⚠️ 必坑：</strong><code>parse_dates</code> 一定要在 <code>read_csv</code> 时就指定，不要读进来再转——后期转慢 10 倍且容易出错。</div>

<h4>② 筛选 + 过滤</h4>
<pre><code>df_sales = df[df["category"] == "drink"]
df_big = df[df["sales"] > df["sales"].quantile(0.95)]  # 销量前 5% 爆款

# 多条件（注意 & 不能写成 and）
df_holiday = df[(df["is_holiday"] == 1) & (df["sales"] > 100)]

# query 写法（更易读）
df.query("category == 'drink' and sales > 100")</code></pre>

<h4>③ 分组聚合（groupby——pandas 灵魂）</h4>
<pre><code># 按店铺分组，算每家店的总销量
df.groupby("store_id")["sales"].sum()

# 多个聚合
df.groupby("store_id")["sales"].agg(["mean", "sum", "std", "count"])

# 按多列分组
df.groupby(["store_id", "category"])["sales"].mean()

# 自定义聚合（named aggregation）
df.groupby("store_id")["sales"].agg(
    avg_sales="mean",
    max_sales="max",
    cv=lambda x: x.std() / x.mean()  # 变异系数
)</code></pre>

<h4>④ 透视表（pivot_table）</h4>
<pre><code>pivot = df.pivot_table(
    index="store_id", columns="month",
    values="sales", aggfunc="sum", fill_value=0,
)</code></pre>

<h4>⑤ 合并（merge / join）</h4>
<pre><code>merged = sales.merge(products, on="product_id", how="left")
# how 四种：left / right / inner / outer</code></pre>

<h4>⑥ 时序专用（resample / shift / rolling）</h4>
<pre><code>df = df.set_index("date")
weekly = df["sales"].resample("W").sum()   # 日 → 周
monthly = df["sales"].resample("M").sum()  # 日 → 月

df["sales_lag_1"] = df["sales"].shift(1)   # 昨天的值
df["sales_lag_7"] = df["sales"].shift(7)   # 上周同天
df["sales_roll_7"] = df["sales"].rolling(7).mean()  # 近 7 天均值</code></pre>

<div class="tip-box">
💡 <strong>滞后特征是时序预测的灵魂</strong>——几乎所有顶级销量预测方案的「最强特征」都是 lag 和 rolling。
因为用户购买行为有强烈的「昨天影响今天」特性。
</div>

<h4>⑦ apply / map / lambda</h4>
<pre><code>df["category_code"] = df["category"].map({"drink": 0, "food": 1, "other": 2})
df["profit"] = df.apply(lambda r: r["revenue"] - r["cost"], axis=1)</code></pre>

<h4>⑧ 缺失值处理</h4>
<pre><code>df["sales"].fillna(0)       # 缺失=没卖 → 填 0
df["price"].fillna(df["price"].median())  # 数值列填中位数
df.dropna(subset=["sales"]) # 关键列缺失 → 删行</code></pre>

<div class="pit-box">
<strong>⚠️ 最大坑：缺货日的销量填 0 会害死你。</strong>
缺货 ≠ 没需求。正确做法：标记 <code>is_stockout = 1</code>，用历史同期或同类商品估算真实需求。
</div>

<h4>⑨ 类型转换 + 内存优化</h4>
<pre><code>df["store_id"] = df["store_id"].astype("category")
df["is_holiday"] = df["is_holiday"].astype("int8")
df["sales"] = df["sales"].astype("float32")  # 不用 float64</code></pre>

<h4>⑩ 导出</h4>
<pre><code>df.to_csv("cleaned.csv", index=False)   # index=False 很重要
df.to_parquet("cleaned.parquet")         # ★推荐：比 csv 小 10 倍、读快 10 倍</code></pre>

<h3>3.2 特征工程 6 大类（顶级团队标配）</h3>

<h4>① 时间特征</h4>
<pre><code>df["month"] = df["date"].dt.month
df["day_of_week"] = df["date"].dt.dayofweek  # 0=周一
df["is_weekend"] = (df["day_of_week"] >= 5).astype(int)
df["quarter"] = df["date"].dt.quarter</code></pre>

<h4>② 滞后特征（lag——捕捉过去影响现在）</h4>
<pre><code># 必做：按 store+product 分组后再 lag，否则会串味
df = df.sort_values(["store_id", "product_id", "date"])
df["sales_lag_1"] = df.groupby(["store_id", "product_id"])["sales"].shift(1)
df["sales_lag_7"] = df.groupby(["store_id", "product_id"])["sales"].shift(7)
df["sales_lag_28"] = df.groupby(["store_id", "product_id"])["sales"].shift(28)</code></pre>

<h4>③ 滑动窗口特征（rolling——捕捉近期趋势）</h4>
<pre><code>for w in [7, 14, 28]:
    df[f"sales_roll_mean_{w}"] = df.groupby(["store_id", "product_id"])["sales"].transform(
        lambda x: x.shift(1).rolling(w).mean()
    )</code></pre>

<div class="pit-box"><strong>⚠️ 必坑：</strong>rolling 必须 <code>shift(1)</code> 后再做，否则就是「用今天的均值预测今天」——信息泄漏，模型上线必崩。</div>

<h4>④ 类别编码</h4>
<table>
<tr><th>方法</th><th>适用场景</th><th>原理</th></tr>
<tr><td>Label Encoding</td><td>有序类别（低/中/高）</td><td>0/1/2 映射</td></tr>
<tr><td>One-Hot</td><td>类别少（&lt;10）</td><td>每个类别一列 0/1</td></tr>
<tr><td><strong>Target Encoding</strong></td><td>★类别多（商品 ID）</td><td>用该类别的目标均值替代</td></tr>
<tr><td>Frequency Encoding</td><td>频率有意义</td><td>用出现次数替代</td></tr>
</table>

<pre><code># Target Encoding（Kaggle 神器）——必须用 K-fold 防过拟合
from category_encoders import TargetEncoder
te = TargetEncoder(cols=["product_id"], smoothing=10)
df["product_id_encoded"] = te.fit_transform(df["product_id"], df["sales"])</code></pre>

<h4>⑤ 交互特征</h4>
<pre><code># 促销 × 节假日 = 真正的双 11 效应
df["promo_x_holiday"] = df["is_promo"] * df["is_holiday"]</code></pre>

<div class="tip-box">
💡 <strong>为什么交互特征对线性模型重要，但对树模型不那么重要？</strong>
树模型通过多次分裂天然学交互。用 XGBoost 时，不用刻意构造交互特征——让树自己做。
</div>

<h4>⑥ 聚合特征</h4>
<pre><code>df["store_avg_sales"] = df.groupby("store_id")["sales"].transform("mean")
df["product_total_sales"] = df.groupby("product_id")["sales"].transform("sum")
df["store_product_cv"] = df.groupby(["store_id", "product_id"])["sales"].transform(
    lambda x: x.std() / x.mean()
)</code></pre>

<h3>3.3 一份完整的特征工程函数</h3>

<pre><code>def build_features(df):
    # ① 时间
    df["date"] = pd.to_datetime(df["date"])
    df["month"] = df["date"].dt.month
    df["day_of_week"] = df["date"].dt.dayofweek
    df["is_weekend"] = (df["day_of_week"] >= 5).astype(int)

    # ② 聚合
    df["store_avg_sales"] = df.groupby("store_id")["sales"].transform("mean")
    df["product_total"] = df.groupby("product_id")["sales"].transform("sum")

    # ③ 滞后（按 store+product 分组）
    df = df.sort_values(["store_id", "product_id", "date"])
    for lag in [1, 7, 14, 28]:
        df[f"sales_lag_{lag}"] = df.groupby(["store_id", "product_id"])["sales"].shift(lag)

    # ④ 滑动窗口（注意 shift(1) 防泄漏）
    for w in [7, 14, 28]:
        df[f"sales_roll_{w}"] = df.groupby(["store_id", "product_id"])["sales"].transform(
            lambda x: x.shift(1).rolling(w).mean()
        )

    # ⑤ 交互
    df["promo_x_holiday"] = df.get("is_promo", 0) * df.get("is_holiday", 0)

    # ⑥ 丢缺失（lag/rolling 前几行必然缺失）
    df = df.dropna()
    return df</code></pre>

<h3>3.4 Boosting 三剑客：顶级分析师的核武器</h3>

<h4>Boosting 的核心思想（傻子也能懂）</h4>

<p><strong>类比：</strong>班级预测期末成绩。老师先让一个学渣预测，错了。
然后告诉第二个学生：「上次预测高了 10 分，你专门去补这 10 分误差。」
第二个学生只学「如何预测这 10 分的误差」……如此迭代 100 次，
100 个学渣凑在一起超越了任何单个学霸。</p>

<p><strong>专业版：</strong>Boosting = 串行训练一组弱学习器（决策树），每棵新树专门拟合前一棵的<strong>残差</strong>。
最终预测 = 所有树预测之和。这就是<strong>梯度提升</strong>——用梯度下降思想在函数空间中找最优解。</p>

<div class="quote-box">
<blockquote>
<strong>梯度提升的数学内核：</strong>
F(x) = F₀(x) + η·h₁(x) + η·h₂(x) + ... + η·h_M(x)<br/>
h_m 拟合的是 -∂L/∂F（损失函数对当前预测的负梯度），η 是学习率（Day 1 学过）。
</blockquote>
</div>

<h4>Boosting vs Bagging（Random Forest）</h4>
<table>
<tr><th>维度</th><th>Boosting（XGB）</th><th>Bagging（RF）</th></tr>
<tr><td>训练方式</td><td>串行（一棵接一棵）</td><td>并行（独立训练）</td></tr>
<tr><td>核心思想</td><td>补错</td><td>投票</td></tr>
<tr><td>精度</td><td>★高</td><td>中</td></tr>
<tr><td>过拟合风险</td><td>较高（要 early stopping）</td><td>低</td></tr>
<tr><td>Kaggle 占比</td><td>★70% 冠军用</td><td>20%</td></tr>
</table>

<h4>为什么树模型在表格数据上碾压深度学习</h4>
<ol>
<li><strong>天然处理非线性</strong>：自动学「如果 X&gt;5 且 Y&lt;3」这种规则</li>
<li><strong>对异常值鲁棒</strong>：只看排序不看绝对值</li>
<li><strong>不需要特征缩放</strong>：标准化、归一化都不用</li>
<li><strong>自动特征选择</strong>：无用特征自然被忽略</li>
</ol>

<h3>3.5 三剑客对比：XGBoost vs LightGBM vs CatBoost</h3>

<table>
<tr><th>维度</th><th>XGBoost</th><th>LightGBM</th><th>CatBoost</th></tr>
<tr><td>出生</td><td>2014（陈天奇）</td><td>2017（微软）</td><td>2017（Yandex）</td></tr>
<tr><td>核心创新</td><td>预排序 + 正则化</td><td>Leaf-wise + GOSS</td><td>Ordered Boosting</td></tr>
<tr><td>速度</td><td>中等</td><td>★最快（快 3-5 倍）</td><td>中等</td></tr>
<tr><td>类别特征</td><td>需手动编码</td><td>需手动编码</td><td>★原生支持</td></tr>
<tr><td>小数据表现</td><td>★最稳</td><td>可能过拟合</td><td>★稳</td></tr>
<tr><td>大数据表现</td><td>慢</td><td>★推荐</td><td>慢</td></tr>
</table>

<p><strong>选型口诀：</strong></p>
<ul>
<li>数据 &lt; 10 万行 → XGBoost（最稳）</li>
<li>数据 &gt; 100 万行 → LightGBM（最快）</li>
<li>大量类别特征（商品 ID）→ CatBoost（最友好）</li>
<li>不确定 → 先 XGBoost 跑一版当基准</li>
</ul>

<h3>3.6 XGBoost 五个核心超参数</h3>

<table>
<tr><th>参数</th><th>含义</th><th>类比</th><th>推荐值</th></tr>
<tr><td><code>n_estimators</code></td><td>树的数量</td><td>班级里几个学渣</td><td>100-1000</td></tr>
<tr><td><code>max_depth</code></td><td>每棵树最大深度</td><td>每个学渣考虑几个变量</td><td>3-8</td></tr>
<tr><td><code>learning_rate</code></td><td>学习率（梯度下降步长）</td><td>每次补多少</td><td>0.01-0.3</td></tr>
<tr><td><code>subsample</code></td><td>每棵树用的样本比例</td><td>每个学渣只看部分作业</td><td>0.6-0.9</td></tr>
<tr><td><code>colsample_bytree</code></td><td>每棵树用的特征比例</td><td>每个学渣只看部分科目</td><td>0.6-0.9</td></tr>
</table>

<div class="pit-box">
<strong>⚠️ 黄金法则：</strong><code>n_estimators</code> 和 <code>learning_rate</code> 必须一起调。
大学习率+少树 → 欠拟合；小学习率+多树 → 高精度（推荐）。
典型组合：<code>learning_rate=0.05, n_estimators=500</code>。
</div>

<h3>3.7 第一次跑：从 0 到一个 XGBoost 模型</h3>

<pre><code>import pandas as pd
import xgboost as xgb
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error

df = pd.read_csv("sales_data.csv")
X = df.drop("sales", axis=1)
y = df["sales"]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = xgb.XGBRegressor(
    n_estimators=500,
    max_depth=6,
    learning_rate=0.05,
    subsample=0.8,
    colsample_bytree=0.8,
    random_state=42,
)
model.fit(X_train, y_train)

pred = model.predict(X_test)
mae = mean_absolute_error(y_test, pred)
print(f"MAE: {mae:.2f}")

# 特征重要性（树模型最大优势之一）
importance = pd.DataFrame({
    "feature": X.columns,
    "importance": model.feature_importances_,
}).sort_values("importance", ascending=False)
print(importance.head(10))</code></pre>

<h3>3.8 其他常用 ML 模型（知道存在即可）</h3>

<table>
<tr><th>模型</th><th>核心思想</th><th>典型场景</th></tr>
<tr><td>Random Forest</td><td>并行训练多棵树投票</td><td>稳定 baseline、防过拟合</td></tr>
<tr><td>Lasso / Ridge</td><td>带正则化的线性回归</td><td>特征筛选（Lasso 自动归零弱特征）</td></tr>
<tr><td>KNN</td><td>找最近的 K 个邻居平均</td><td>推荐系统、简单分类</td></tr>
<tr><td>SVR（支持向量回归）</td><td>找最优超平面</td><td>小数据集回归</td></tr>
<tr><td>LightGBM / CatBoost</td><td>XGBoost 的两种变体</td><td>大数据 / 类别特征</td></tr>
</table>

<div class="ex-box">
<h4>✏️ Day 3 必做（不练等于没学）</h4>
<ol>
<li>用 <code>build_features</code> 处理你的数据，确保特征数 ≥ 20</li>
<li>训练 XGBoost，跑通 <code>MAE</code> 和特征重要性</li>
<li>把 <code>n_estimators</code> 从 100 改到 1000，观察 MAE 怎么变（边际收益递减）</li>
<li>把 <code>learning_rate</code> 改成 0.3 和 0.01 各跑一次，对比 MAE</li>
<li>打印 <code>df.corr()["sales"]</code> Top 5，截图特征重要性 Top 5</li>
</ol>
</div>

<div class="tip-box">
💡 <strong>今天结束你应该能回答：</strong>
<ul>
<li>老板问「为什么用 XGBoost 不用神经网络？」——3 句话答清</li>
<li>同事说「LightGBM 更快」——你能说出什么场景下 XGBoost 反而更好</li>
<li>面试官问「Boosting 和 Bagging 的区别？」——30 秒讲清</li>
<li>拿到一份新数据，能不能 30 分钟内构造出 20+ 个特征？</li>
</ul>
</div>
`,
  },

  // ============================================================
  // DAY 4 — ARIMA + Prophet + 时序模型
  // ============================================================
  {
    id: "crash-4",
    day: 4,
    week: 1,
    track: "crash",
    duration: 150,
    title: "ARIMA + Prophet：时序专用武器",
    description:
      "XGBoost 不是万能的——小数据集（&lt;1000 行）或强季节性场景，ARIMA/Prophet 更稳。今天学两套时序专用模型、回测的正确姿势、过拟合识别与防范——顶级分析师防被骗的三件套。",
    objectives: [
      "理解 ARIMA 的 (p,d,q) 三参数及如何用 ACF/PACF 选参",
      "会用 Prophet 自动处理节假日 + 趋势变点 + 季节性",
      "掌握时序数据为什么不能用 train_test_split——必须用滚动回测",
      "学会用训练误差 vs 测试误差的差距识别过拟合",
      "建立「naive baseline」直觉——任何模型都要先打赢它",
    ],
    cues: [
      "为什么数据 &lt;1000 行不要用 XGBoost？（参数比样本多，必过拟合）",
      "ARIMA 的 (p,d,q) 各自是什么？怎么用 ACF/PACF 图定参？",
      "Prophet 的「趋势变点」和「节假日效应」是怎么自动学的？",
      "时序数据用 train_test_split(shuffle=True) 会发生什么？（信息泄漏）",
      "训练 MAE=2，测试 MAE=30——这是什么问题？怎么解决？",
      "naive baseline（用昨天的值预测今天）——为什么所有模型都要先打赢它？",
    ],
    content: `
<h3>4.1 模型选型决策树（背下来）</h3>

<pre><code>数据量？
├─ &lt; 100 行 → 用 mean/median 当预测
├─ 100-1000 行 → ARIMA / Prophet / 指数平滑（★小样本友好）
├─ 1000-10万行 → XGBoost / LightGBM（★首选）
└─ &gt; 10万行 → LightGBM / 深度学习（LSTM/Transformer）

强季节性？
├─ 单一周期（周/月）→ SARIMA / Prophet
└─ 多重周期（周+月+年）→ Prophet（ARIMA 会爆炸）

有外部特征（促销、天气）？
├─ 有 → XGBoost / SARIMAX
└─ 无 → ARIMA / Prophet</code></pre>

<div class="tip-box">
💡 <strong>一句话决策：</strong>数据少 + 纯时序 → ARIMA/Prophet；数据多 + 有外部特征 → XGBoost。
深度学习只在数据 &gt;100 万行且有时序结构时考虑。
</div>

<h3>4.2 ARIMA：经典之王</h3>

<h4>三个参数的故事</h4>
<p>ARIMA(p, d, q)：</p>
<ul>
<li><strong>p（AR 自回归）</strong>：「今天的值 = 过去 N 天的线性组合」——N 就是 p</li>
<li><strong>d（差分次数）</strong>：「为了让数据变平稳，需要做几次差分」——通常 0 或 1</li>
<li><strong>q（MA 滑动平均）</strong>：「今天的值 = 过去 N 天噪声的线性组合」——N 就是 q</li>
</ul>

<h4>平稳性：ARIMA 的前提</h4>
<p><strong>类比：</strong>ARIMA 假设数据的「统计规律」恒定（均值、方差不随时间变）。
如果数据有趋势（销量年年涨），必须先<strong>差分</strong>——用今天减昨天，得到「变化量」序列。</p>

<pre><code>from statsmodels.tsa.stattools import adfuller

result = adfuller(df["sales"])
print(f"p-value: {result[1]}")
# p < 0.05 → 平稳，d=0
# p > 0.05 → 不平稳，需要差分 d=1
if result[1] > 0.05:
    diff = df["sales"].diff().dropna()
    print(f"差分后 p-value: {adfuller(diff)[1]}")</code></pre>

<h4>用 ACF/PACF 图定 p 和 q</h4>
<pre><code>from statsmodels.graphics.tsaplots import plot_acf, plot_pacf
import matplotlib.pyplot as plt

fig, axes = plt.subplots(1, 2, figsize=(12, 4))
plot_acf(df["sales"], ax=axes[0])   # 看 q
plot_pacf(df["sales"], ax=axes[1])  # 看 p
plt.show()</code></pre>

<table>
<tr><th>图</th><th>怎么读</th></tr>
<tr><td>ACF（自相关）</td><td>第几根柱子超出蓝色区间 → q 就是几</td></tr>
<tr><td>PACF（偏自相关）</td><td>第几根柱子超出蓝色区间 → p 就是几</td></tr>
</table>

<h4>训练 ARIMA</h4>
<pre><code>from statsmodels.tsa.arima.model import ARIMA

model = ARIMA(df["sales"], order=(2, 1, 2))
fitted = model.fit()

forecast = fitted.forecast(steps=7)
print(forecast)
print(f"AIC: {fitted.aic:.2f}")  # 越小越好</code></pre>

<h4>SARIMA（带季节）</h4>
<pre><code>from statsmodels.tsa.statespace.sarimax import SARIMAX

model = SARIMAX(
    df["sales"],
    order=(2, 1, 2),
    seasonal_order=(1, 0, 1, 7),  # 7=周季节
)
fitted = model.fit()</code></pre>

<div class="pit-box">
<strong>⚠️ ARIMA 三大坑：</strong>
<ul>
<li>不平稳就硬训 → 结果完全错（必须先检验）</li>
<li>多重季节（周+月+年）→ SARIMA 处理不了，转 Prophet</li>
<li>有外部特征（促销）→ 普通 ARIMA 忽略，必须用 SARIMAX</li>
</ul>
</div>

<h3>4.3 Prophet：Facebook 的「傻瓜式」时序神器</h3>

<p><strong>核心思想：</strong>把时序拆解成 <strong>趋势 + 季节 + 节假日 + 噪声</strong>，每部分独立建模。</p>

<pre><code>y(t) = g(t) + s(t) + h(t) + ε(t)
       ↑       ↑       ↑       ↑
     趋势    季节   节假日   残差</code></pre>

<h4>Prophet 的最大好处：自动化</h4>
<ul>
<li>✅ 自动检测趋势变点（changepoints）</li>
<li>✅ 自动学习周/月/年季节性</li>
<li>✅ 内置中国节假日（双 11、春节）</li>
<li>✅ 自动处理异常值</li>
<li>✅ 不需要手动差分</li>
</ul>

<pre><code>from prophet import Prophet

# Prophet 要求列名必须是 ds 和 y
df_prophet = df[["date", "sales"]].rename(columns={"date": "ds", "sales": "y"})

m = Prophet(
    yearly_seasonality=True,
    weekly_seasonality=True,
    changepoint_prior_scale=0.05,  # 趋势灵活度（大=敏感）
)
m.add_country_holidays(country_name="CN")

m.fit(df_prophet)
future = m.make_future_dataframe(periods=7)
forecast = m.predict(future)

fig = m.plot_components(forecast)  # ★最有价值的可视化</code></pre>

<div class="tip-box">
💡 <strong>Prophet 的 changepoint_prior_scale 是它的灵魂参数：</strong>
<ul>
<li>0.05（默认）→ 平衡</li>
<li>0.5 → 趋势非常灵活（适合突变数据，但可能过拟合）</li>
<li>0.005 → 趋势非常平滑（适合稳定增长）</li>
</ul>
</div>

<h3>4.4 回测：为什么不能用 train_test_split</h3>

<p><strong>类比：</strong>用 train_test_split 切时序 = 让学生先看期末考试答案再做练习。
练习分高，考试崩盘。</p>

<p><strong>为什么：</strong>train_test_split 默认 shuffle（随机打乱），训练集可能含 2025-12-31 的数据，
测试集是 2025-01-01——模型学到了「未来规律」去预测「过去」——这叫<strong>信息泄漏</strong>。</p>

<h4>正确做法：滚动回测</h4>
<pre><code>from sklearn.model_selection import TimeSeriesSplit

tscv = TimeSeriesSplit(n_splits=5)
for train_idx, test_idx in tscv.split(df):
    train, test = df.iloc[train_idx], df.iloc[test_idx]
    model.fit(train[features], train["sales"])
    pred = model.predict(test[features])
    print(compute_metrics(test["sales"], pred))</code></pre>

<h4>滚动窗口回测（更贴近业务）</h4>
<pre><code># 模拟真实上线：每月用过去 90 天训练，预测未来 7 天
def rolling_backtest(df, model, train_window=90, horizon=7):
    results = []
    df = df.sort_values("date").reset_index(drop=True)
    start = 0
    while start + train_window + horizon <= len(df):
        train = df.iloc[start : start + train_window]
        test = df.iloc[start + train_window : start + train_window + horizon]
        model.fit(train[features], train["sales"])
        pred = model.predict(test[features])
        results.append({
            "train_end": train["date"].max(),
            "test_start": test["date"].min(),
            "metrics": compute_metrics(test["sales"], pred)
        })
        start += horizon
    return results</code></pre>

<h3>4.5 过拟合：识别 + 防范</h3>

<h4>过拟合的症状</h4>
<table>
<tr><th>信号</th><th>含义</th></tr>
<tr><td>训练 MAE=2，测试 MAE=30</td><td>差距 15 倍 → 严重过拟合</td></tr>
<tr><td>训练损失下降，验证损失上升</td><td>学的不是规律是噪声</td></tr>
<tr><td>训练 R²=0.99，测试 R²=0.3</td><td>背下了训练数据</td></tr>
</table>

<h4>三大成因 + 对策</h4>
<table>
<tr><th>成因</th><th>对策</th><th>XGBoost 代码</th></tr>
<tr><td>模型太复杂</td><td>降低 max_depth</td><td><code>max_depth=4</code></td></tr>
<tr><td>树太多</td><td>early stopping</td><td><code>early_stopping_rounds=50</code></td></tr>
<tr><td>每棵树看太多</td><td>加正则化 + subsample</td><td><code>subsample=0.7</code></td></tr>
</table>

<h4>Early Stopping（神器）</h4>
<pre><code>model = xgb.XGBRegressor(
    n_estimators=1000,
    max_depth=6,
    learning_rate=0.05,
    early_stopping_rounds=50,
)
model.fit(
    X_train, y_train,
    eval_set=[(X_val, y_val)],
    verbose=False,
)
print(f"最佳树数: {model.best_iteration}")</code></pre>

<h3>4.6 Naive Baseline：永远要做的「傻子预测」</h3>

<p>任何模型上线前，先问一句：「如果我不做模型，用昨天的值预测今天，误差是多少？」
这个误差就是 baseline。如果你的复杂模型打不过它 → 你的模型没用。</p>

<pre><code>def compute_baselines(df, target="sales"):
    df = df.sort_values("date").reset_index(drop=True)
    y = df[target]
    return {
        "naive": np.mean(np.abs(y.diff().dropna())),
        "seasonal_naive_7": np.mean(np.abs(y - y.shift(7)).dropna()),
        "mean": np.mean(np.abs(y - y.expanding().mean().shift(1)).dropna()),
        "median": np.mean(np.abs(y - y.expanding().median().shift(1)).dropna()),
    }

baselines = compute_baselines(df)
for name, mae in baselines.items():
    print(f"{name}: MAE = {mae:.2f}")</code></pre>

<div class="quote-box">
<blockquote>
<strong>金科玉律：</strong>你的模型 MAE 必须 &lt; 最好的 baseline 的 70%，才值得上线。
否则直接用 baseline（更简单、更稳）。
</blockquote>
</div>

<h3>4.7 评估指标：5 个核心</h3>

<table>
<tr><th>指标</th><th>含义</th><th>何时用</th></tr>
<tr><td><strong>MAE</strong></td><td>平均绝对误差</td><td>常规场景</td></tr>
<tr><td><strong>MAPE</strong></td><td>平均绝对百分比误差</td><td>销量稳定时</td></tr>
<tr><td><strong>WAPE</strong></td><td>加权百分比误差</td><td>★推荐</td></tr>
<tr><td><strong>RMSE</strong></td><td>均方根误差（惩罚大误差）</td><td>关注极端错</td></tr>
<tr><td><strong>R²</strong></td><td>决定系数</td><td>线性回归诊断</td></tr>
</table>

<pre><code>def compute_metrics(y_true, y_pred):
    mae = np.mean(np.abs(y_true - y_pred))
    mape = np.mean(np.abs((y_true - y_pred) / np.clip(y_true, 1, None))) * 100
    wape = np.sum(np.abs(y_true - y_pred)) / np.sum(np.abs(y_true)) * 100
    rmse = np.sqrt(np.mean((y_true - y_pred) ** 2))
    return {"MAE": mae, "MAPE": mape, "WAPE": wape, "RMSE": rmse}</code></pre>

<div class="pit-box">
<strong>⚠️ MAPE 的大坑：</strong>真实值接近 0 时（某天销量只有 1 件），误差会爆炸（500%），拉高整体 MAPE。
这种情况一定要用 WAPE。
</div>

<div class="ex-box">
<h4>✏️ Day 4 必做</h4>
<ol>
<li>用 Day 3 的数据，先跑 4 个 baselines（必须先做！）</li>
<li>训练一个 ARIMA / Prophet 模型</li>
<li>对比：XGBoost vs ARIMA/Prophet vs baselines，谁的 MAE 最低？</li>
<li>如果 XGBoost 没打过 baseline → 检查特征工程（lag/rolling 有没有做对）</li>
<li>画 Prophet 的 components 分解图，截图保存</li>
</ol>
</div>

<div class="tip-box">
💡 <strong>今天结束你应该能回答：</strong>
<ul>
<li>知道为什么时序不能用 train_test_split？</li>
<li>知道 ARIMA 的 (p,d,q) 怎么定？</li>
<li>知道 Prophet 的灵魂参数是 changepoint_prior_scale？</li>
<li>知道为什么所有模型都要先打赢 naive baseline？</li>
<li>知道怎么用训练/测试 MAE 差距识别过拟合？</li>
</ul>
</div>
`,
  },

  // ============================================================
  // DAY 5 — 工具课：动手跑端到端 pipeline
  // ============================================================
  {
    id: "crash-5",
    day: 5,
    week: 1,
    track: "crash",
    duration: 180,
    title: "工具课：动手跑一个端到端 pipeline",
    description:
      "把前 4 天学的全部串起来：读 CSV → pandas 清洗 → 特征工程 → baseline → XGBoost + early stopping → 对比 ARIMA/Prophet → 出报告。这是你能写进简历的项目模板。",
    objectives: [
      "独立完成一个端到端的销量预测项目",
      "代码组织成可复用的 pipeline（不是面条代码）",
      "产出一份专业的预测报告（含图 + 表 + 结论）",
      "掌握工具链：venv / requirements.txt / GitHub / Colab",
    ],
    cues: [
      "为什么端到端 pipeline 比单段代码重要？（可复现 + 可迭代）",
      "baseline → 简单模型 → 复杂模型，为什么要按这个顺序？",
      "报告里最重要的不是 MAE 是多少，而是「对业务有什么意义」——你能写出来吗？",
      "怎么用 GitHub 展示你的工程化能力？",
      "哪些环节交给 AI、哪些必须人来判断？",
    ],
    content: `
<h3>5.1 工具链准备：5 分钟搭好开发环境</h3>

<h4>① 用 venv 隔离环境（不要污染全局）</h4>
<pre><code># 创建虚拟环境
python -m venv venv

# 激活（macOS/Linux）
source venv/bin/activate

# 激活（Windows）
venv\\Scripts\\activate

# 安装依赖
pip install pandas numpy scikit-learn xgboost lightgbm
pip install statsmodels prophet
pip install matplotlib seaborn plotly
pip install jupyter</code></pre>

<h4>② requirements.txt（必备）</h4>
<pre><code># 把当前环境的包列表存下来
pip freeze > requirements.txt

# 别人复现你的项目时
pip install -r requirements.txt</code></pre>

<h4>③ Google Colab（无需本地环境的Plan B）</h4>
<p>如果本地装不上 Prophet（依赖 pystan，编译慢），直接用 <a href="https://colab.research.google.com/" target="_blank">Google Colab</a>——免费云端 Jupyter，带 GPU，开箱即用。</p>

<h3>5.2 项目目标：一个能写进简历的销量预测项目</h3>

<p><strong>你要交付的：</strong></p>
<ol>
<li>一个 <code>run_pipeline.py</code> 脚本——任何人下载后能 1 分钟内复现</li>
<li>一份预测报告（Markdown / PDF）——含 5 张图 + 3 个结论 + 1 个建议</li>
<li>一个 GitHub repo——展示工程化能力</li>
</ol>

<h3>5.3 项目结构（顶级团队的标准）</h3>

<pre><code>my-forecast-project/
├── README.md              # 项目说明 + 复现步骤
├── requirements.txt       # 依赖
├── data/
│   ├── raw/               # 原始数据（不进 git）
│   └── processed/         # 清洗后数据
├── src/
│   ├── data_loader.py     # 读 + 清洗
│   ├── features.py        # 特征工程
│   ├── models.py          # 模型定义
│   ├── train.py           # 训练
│   └── evaluate.py        # 评估
├── notebooks/
│   └── exploration.ipynb  # EDA（探索性分析）
├── reports/
│   └── 2026-07-09.md      # 预测报告
└── run_pipeline.py        # 端到端入口</code></pre>

<h3>5.4 完整 pipeline 代码</h3>

<pre><code># run_pipeline.py — 端到端流水线
import pandas as pd
import numpy as np
import xgboost as xgb
from prophet import Prophet
from sklearn.metrics import mean_absolute_error
import warnings
warnings.filterwarnings("ignore")

# ============================================================
# 1. 数据加载
# ============================================================
def load_data(path="data/raw/sales.csv"):
    df = pd.read_csv(path, parse_dates=["date"])
    print(f"✅ 数据加载：{df.shape[0]} 行 × {df.shape[1]} 列")
    print(f"   时间范围：{df['date'].min()} ~ {df['date'].max()}")
    return df

# ============================================================
# 2. 特征工程（Day 3 的内容）
# ============================================================
def build_features(df):
    df = df.sort_values(["store_id", "product_id", "date"]).reset_index(drop=True)

    # 时间特征
    df["month"] = df["date"].dt.month
    df["day_of_week"] = df["date"].dt.dayofweek
    df["is_weekend"] = (df["day_of_week"] >= 5).astype(int)

    # 滞后 + 滑动（按 store + product 分组）
    grp = ["store_id", "product_id"]
    for lag in [1, 7, 14, 28]:
        df[f"lag_{lag}"] = df.groupby(grp)["sales"].shift(lag)
    for w in [7, 14, 28]:
        df[f"roll_mean_{w}"] = df.groupby(grp)["sales"].transform(
            lambda x: x.shift(1).rolling(w).mean()
        )

    # 聚合
    df["store_avg"] = df.groupby("store_id")["sales"].transform("mean")
    df["product_total"] = df.groupby("product_id")["sales"].transform("sum")

    # 交互
    df["promo_x_holiday"] = df.get("is_promo", 0) * df.get("is_holiday", 0)

    # 丢缺失
    df = df.dropna()
    print(f"✅ 特征工程：{len(df.columns)} 列")
    return df

# ============================================================
# 3. Baseline（Day 4 的内容）
# ============================================================
def compute_baselines(df):
    y = df["sales"]
    return {
        "naive": np.mean(np.abs(y.diff().dropna())),
        "seasonal_naive_7": np.mean(np.abs(y - y.shift(7)).dropna()),
        "mean": np.mean(np.abs(y - y.expanding().mean().shift(1)).dropna()),
    }

# ============================================================
# 4. XGBoost 训练（Day 3 的内容）
# ============================================================
def train_xgboost(df):
    features = [c for c in df.columns if c not in ["sales", "date"]]
    n = len(df)
    train = df.iloc[: int(n * 0.85)]
    test = df.iloc[int(n * 0.85) :]

    model = xgb.XGBRegressor(
        n_estimators=500,
        max_depth=6,
        learning_rate=0.05,
        subsample=0.8,
        colsample_bytree=0.8,
        early_stopping_rounds=50,
        random_state=42,
    )
    model.fit(
        train[features], train["sales"],
        eval_set=[(test[features], test["sales"])],
        verbose=False,
    )

    pred = model.predict(test[features])
    mae = mean_absolute_error(test["sales"], pred)
    wape = np.sum(np.abs(test["sales"] - pred)) / np.sum(test["sales"]) * 100

    print(f"✅ XGBoost：MAE={mae:.2f}, WAPE={wape:.2f}%, 最佳树数={model.best_iteration}")
    return model, mae, wape

# ============================================================
# 5. 对比 Prophet（Day 4 的内容）
# ============================================================
def train_prophet(df):
    df_p = df[["date", "sales"]].rename(columns={"date": "ds", "sales": "y"})
    n = len(df_p)
    train = df_p.iloc[: int(n * 0.85)]
    test = df_p.iloc[int(n * 0.85) :]

    m = Prophet(weekly_seasonality=True, yearly_seasonality=True)
    m.fit(train)

    future = m.make_future_dataframe(periods=len(test))
    forecast = m.predict(future)
    pred = forecast.iloc[-len(test):]["yhat"].values

    mae = mean_absolute_error(test["y"].values, pred)
    print(f"✅ Prophet：MAE={mae:.2f}")
    return mae

# ============================================================
# 6. 生成报告
# ============================================================
def generate_report(baselines, xgb_mae, xgb_wape, prophet_mae, df_shape):
    best_baseline = min(baselines.values())
    best_model = "XGBoost" if xgb_mae < prophet_mae else "Prophet"
    best_mae = min(xgb_mae, prophet_mae)
    improvement = (1 - best_mae / best_baseline) * 100

    report = f"""# 销量预测报告

**日期**：2026-07-09
**数据集**：{df_shape[0]} 行 × {df_shape[1]} 列

## 一、模型对比

| 模型 | MAE | 备注 |
|------|-----|------|
| Naive baseline | {baselines['naive']:.2f} | 用昨天的值 |
| Seasonal Naive | {baselines['seasonal_naive_7']:.2f} | 用上周同天 |
| Mean baseline | {baselines['mean']:.2f} | 用历史均值 |
| **XGBoost** | **{xgb_mae:.2f}** | WAPE={xgb_wape:.2f}% |
| Prophet | {prophet_mae:.2f} | 自动趋势+季节 |

## 二、结论

1. 最强模型：{best_model}（MAE={best_mae:.2f}）
2. 相比 baseline 提升：{improvement:.1f}%
3. 整体误差水平：WAPE={xgb_wape:.2f}%

## 三、业务建议

- 预测精度{'达标' if xgb_wape < 20 else '待优化'}（阈值 WAPE < 20%）
- {'可以用于库存决策' if xgb_wape < 15 else '建议继续优化特征工程'}
"""
    with open("reports/2026-07-09.md", "w") as f:
        f.write(report)
    print(f"✅ 报告已生成：reports/2026-07-09.md")

# ============================================================
# 主流程
# ============================================================
if __name__ == "__main__":
    df = load_data()
    df = build_features(df)
    baselines = compute_baselines(df)
    print(f"Baselines: {baselines}")
    xgb_model, xgb_mae, xgb_wape = train_xgboost(df)
    prophet_mae = train_prophet(df)
    generate_report(baselines, xgb_mae, xgb_wape, prophet_mae, df.shape)
    print("\\n🎉 全流程完成！")</code></pre>

<h3>5.5 一键运行</h3>

<pre><code># 在项目根目录
python run_pipeline.py

# 期望输出：
# ✅ 数据加载：10000 行 × 12 列
# ✅ 特征工程：25 列
# Baselines: {'naive': 50.2, 'seasonal_naive_7': 35.1, 'mean': 60.5}
# ✅ XGBoost：MAE=22.30, WAPE=12.50%, 最佳树数=247
# ✅ Prophet：MAE=28.40
# ✅ 报告已生成：reports/2026-07-09.md
# 🎉 全流程完成！</code></pre>

<h3>5.6 推到 GitHub（必备技能）</h3>

<pre><code># 初始化 git
git init
git add .
git commit -m "init: 销量预测 pipeline"

# 推到 GitHub（先在 GitHub 创建 repo）
git remote add origin https://github.com/你的用户名/sales-forecast.git
git branch -M main
git push -u origin main</code></pre>

<div class="tip-box">
💡 <strong>README.md 模板：</strong>包含项目简介、数据来源、复现步骤、结果截图。
HR和面试官<strong>只看 README</strong>——它的质量决定你简历的含金量。
</div>

<h3>5.7 报告写作原则（写报告就是写决策）</h3>

<p>顶级分析师的报告<strong>不是罗列数字</strong>，而是回答 3 个问题：</p>
<ol>
<li><strong>发生了什么</strong>（数据描述 + 关键趋势）</li>
<li><strong>为什么</strong>（归因——哪个特征贡献最大）</li>
<li><strong>所以呢</strong>（对业务的影响 + 行动建议）</li>
</ol>

<div class="quote-box">
<blockquote>
<strong>记住：</strong>老板看的不是「MAE=8.5」，而是「WAPE=15% → 可以用于补货决策，预计节省 12% 库存成本」。
</blockquote>
</div>

<h3>5.8 5 天结束你应该在哪里</h3>

<table>
<tr><th>能力</th><th>5 天前</th><th>5 天后</th></tr>
<tr><td>看数学公式</td><td>避开</td><td>看懂 learning_rate / mse / 熵的来源</td></tr>
<tr><td>选模型</td><td>「随便用一个」</td><td>按数据量+特征+季节性的决策树选</td></tr>
<tr><td>评估模型</td><td>「看着挺准」</td><td>MAE/WAPE + 多次回测 + baseline 对比</td></tr>
<tr><td>用 XGBoost</td><td>「听说过」</td><td>会调 5 个核心参数 + early stopping</td></tr>
<tr><td>写报告</td><td>「误差是 10%」</td><td>「WAPE=12%，相比 baseline 提升 35%，建议用于补货」</td></tr>
<tr><td>和 AI 协作</td><td>「完全依赖」</td><td>知道哪些环节交 AI、哪些必须自己判断</td></tr>
<tr><td>工程化</td><td>「一坨面条代码」</td><td>pipeline + GitHub + 可复现报告</td></tr>
</table>

<div class="ex-box">
<h4>✏️ Day 5 必做（毕业作业）</h4>
<ol>
<li>用上面的 pipeline 模板，跑通你自己的数据（没有就用 Rossmann）</li>
<li>写一份 Markdown 报告（按 5.7 的原则）</li>
<li>把代码推到 GitHub，README 写清复现步骤</li>
<li>把报告发给一个朋友/同事，问他「看懂了吗？」——他看懂了 = 你成功了</li>
<li>用一句话总结：「我这个模型相比 baseline 提升了 X%，对业务的价值是 Y」</li>
</ol>
</div>

<div class="quote-box">
<blockquote>
<strong>5 天让你站在顶级分析师的肩膀上。</strong><br/>
你已经有了：数学地基（Day 1）+ 方法论地图（Day 2）+ 主力武器（Day 3）+ 时序专精（Day 4）+ 落地实战（Day 5）。<br/>
下一步就是 <strong>100 天修炼</strong>——把每个主题钻深、做真实项目、写博客、教别人。
</blockquote>
</div>
`,
  },
];
