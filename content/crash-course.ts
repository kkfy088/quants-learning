import type { DayContent } from "@/lib/types";

/**
 * 速成轨 v5.0 — 15 天浓缩版（统计 + Python + 工具一站式打透）
 *
 * 设计哲学（v5.0）：
 * - Week 1：数学统计浓缩——只讲「不学就会踩坑」的，砍掉学术推导
 * - Week 2：Python 武器——pandas + LightGBM + 特征工程（AI 原生 + 本地 venv）
 * - Week 3：时序 + 工具链——ARIMA 只讲概念（statsforecast 一键跑），工具链分三档
 *
 * 工具链决策：
 * - 主线：AI 原生（WorkBuddy + DeepSeek V4-Pro）+ 本地 venv（M-series Mac）
 * - GPU 辅助：Google Colab 免费 T4（仅 P5 DeepAR / P6 TFT 时用）
 *
 * ARIMA 家族策略：
 * - 前 15 天只讲概念 + statsforecast.AutoARIMA 一键跑
 * - 手动选 p,q,d + SARIMA 数学严格版 → 后移到 Day 93 附录
 */

export const crashDays: DayContent[] = [
  {
    id: "crash-1",
    day: 1,
    week: 1,
    track: "crash",
    duration: 120,
    level: "L2",
    title: "分布选择决定成败",
    subtitle: "为什么我的销量预测会预测出负数？——分布选择 + IQR 识别异常值",
    description: "Day 1 地基中的地基。所有后续指标（MAE/RMSE/loss 函数）都建立在「数据是什么分布」这个前提上。今天解决一个最常见的实战问题：为什么模型会预测出负数销量。",
    objectives: [
      "理解均值、中位数、众数的区别——右偏数据看哪个",
      "理解方差和标准差的物理意义——预测稳定性从哪来",
      "区分正态分布和对数正态分布——为什么销量要用对数正态",
      "掌握百分位数和 IQR——异常值识别标准方法",
    ],
    cues: [
      "Q: 为什么销量预测用对数正态而不是正态？",
      "Q: 均值 vs 中位数——右偏数据用哪个？",
      "Q: 标准差 = 0 意味着什么？",
      "Q: MAE 和 RMSE 哪个对异常值更敏感？",
    ],
    glossary: [
      {
        term: "右偏分布（Right-skewed / Positive skew）",
        definition: "长尾在右侧的分布，少数极大值会把均值拉高。",
        analogy: "像超市收银台——90% 的人买 10-50 元，但偶尔有人买 3000 元，平均数被他们拉爆。",
        code: "skew > 0 时分布右偏；log 变换可以把它变成接近正态",
        pitfall: "右偏数据的均值 > 中位数，误用均值做决策会高估典型水平",
      },
      {
        term: "对数正态分布（Lognormal Distribution）",
        definition: "取对数后服从正态分布的分布，天然非负，长尾在右。",
        analogy: "像股价——不会跌到负数，但可以涨到天上去。",
        code: "sales = np.random.lognormal(mean=3, sigma=0.8)  # 永远 > 0",
        pitfall: "直接用正态建模销量 → 会预测出负数，这是新手最常见的 bug",
      },
      {
        term: "IQR（Interquartile Range / 四分位距）",
        definition: "第 75 百分位（Q3）与第 25 百分位（Q1）之差，衡量数据中间 50% 的离散程度。",
        analogy: "像马拉松——只看中间 50% 选手的配速差，剔除掉跑最慢和最快的人。",
        code: "iqr = np.percentile(x,[75])[0] - np.percentile(x,[25])[0]",
        pitfall: "对极端异常值不敏感，比标准差更稳健——这就是为什么箱线图用 IQR 而不用 std",
      },
      {
        term: "MAE（Mean Absolute Error / 平均绝对误差）",
        definition: "预测值与真实值之差的绝对值的平均。",
        analogy: "像导航误差——平均每次偏离目的地多少米。",
        code: "from sklearn.metrics import mean_absolute_error",
        pitfall: "对异常值不敏感，和业务直觉一致（误差就是误差，不会平方放大）",
      },
      {
        term: "RMSE（Root Mean Squared Error / 均方根误差）",
        definition: "预测误差平方求均值再开根号。",
        analogy: "像导航误差，但偏离 100 米的惩罚是偏离 10 米的 100 倍——大错罚更狠。",
        code: "from sklearn.metrics import mean_squared_error\nrmse = mean_squared_error(y_true, y_pred, squared=False)",
        pitfall: "对异常值非常敏感，一个极端预测会让 RMSE 翻几倍——训练时选 RMSE 模型会偏向大样本",
      },
    ],
    mindMap: {
      label: "Day 1 描述性统计",
      children: [
        {
          label: "核心概念",
          children: [
            { label: "均值/中位数/众数" },
            { label: "方差/标准差" },
            { label: "百分位/IQR" },
            { label: "正态 vs 对数正态" },
          ],
        },
        {
          label: "代码操作",
          children: [
            { label: "np.mean / np.median" },
            { label: "np.std / np.var" },
            { label: "np.percentile" },
            { label: "np.random.lognormal" },
          ],
        },
        {
          label: "踩坑点",
          children: [
            { label: "右偏数据误用均值" },
            { label: "销量用正态 → 预测出负数" },
            { label: "RMSE 被异常值支配" },
          ],
        },
        {
          label: "前后连接",
          children: [
            { label: "← 准备阶段：还没有前置" },
            { label: "→ Day 2 相关性 vs 因果" },
            { label: "→ Day 3 梯度下降（loss 函数依赖这些分布）" },
            { label: "→ Day 5 LightGBM（MAE/RMSE 作为 loss）" },
          ],
        },
        {
          label: "明日预告",
          children: [{ label: "Day 2：相关不等于因果——辛普森悖论 + 贝叶斯更新" }],
        },
      ],
    },
    content: `
<h3>核心问题：为什么模型会预测出负数销量？</h3>
<p>这是 Day 1 最真实的实战痛点。假设你用线性回归预测某商品的日销量，训练数据都是正数（销量不会为负），但模型在新数据上输出了 <code>-15 件</code>——这在物理上不可能。原因 99% 出在「分布选错了」。</p>

<h3>1. 均值、中位数、众数——三个「代表值」各管什么</h3>
<p><strong>一句话类比：</strong> 均值是「平均分」，中位数是「中间那个人的分」，众数是「最多人考的分」。</p>
<p><strong>踩坑点：</strong> 右偏数据（如收入、销量）的均值会被少数极大值拉高，中位数更稳健。</p>
<pre><code class="language-python">import numpy as np
sales = [10, 12, 15, 11, 13, 14, 12, 10, 11, 500]
print(f"均值: {np.mean(sales):.1f}")    # 60.8（被 500 拉爆）
print(f"中位数: {np.median(sales):.1f}") # 12.0（真实水平）</code></pre>
<p><strong>业务直觉：</strong> 向老板汇报「日均销量」时，请先画直方图看分布形状。右偏就用中位数，否则你会被 1 个双 11 异常值带偏整年的备货决策。</p>

<h3>2. 方差和标准差——数据有多散</h3>
<p><strong>一句话类比：</strong> 方差衡量「大家的销量离平均值有多远」。方差大 = 销量忽高忽低。</p>
<pre><code class="language-python">shop_a = [100, 102, 98, 101, 99, 100]   # 稳定
shop_b = [50, 200, 80, 20, 150, 100]    # 忽高忽低
print(f"店铺A 标准差: {np.std(shop_a):.1f}")  # 1.4
print(f"店铺B 标准差: {np.std(shop_b):.1f}")  # 65.0</code></pre>
<p><strong>预测含义：</strong> 标准差越大，预测越难——Day 7 学概率预测时，标准差直接决定了预测区间的宽度。</p>

<h3>3. 正态分布 vs 对数正态分布——今天最关键的概念</h3>
<p><strong>正态分布：</strong> 钟形曲线，对称（如身高、温度）。</p>
<p><strong>对数正态分布：</strong> 右偏，有长尾，<strong>取值永远 > 0</strong>（如销量、收入、股价）。</p>
<p><strong>踩坑点（核心）： </strong> 销量数据直接用正态建模会预测出负数。这是 Day 1 最致命的错误。</p>
<pre><code class="language-python">np.random.seed(42)
sales = np.random.lognormal(mean=3, sigma=0.8, size=10000)
print(f"最小值: {sales.min():.0f}")  # 2（不会是负数）</code></pre>
<p><strong>解决方案：</strong> 把销量取对数（<code>np.log1p</code>）再建模，预测完取回 <code>np.expm1</code>——这是销量预测的标准预处理。</p>

<h3>4. 百分位数和 IQR——异常值识别的标准方法</h3>
<p><strong>IQR = Q3 - Q1</strong>，异常值 = 低于 Q1-1.5×IQR 或高于 Q3+1.5×IQR（Tukey 法则）。</p>
<pre><code class="language-python">q1, q3 = np.percentile(sales, [25, 75])
iqr = q3 - q1
lower = q1 - 1.5 * iqr
upper = q3 + 1.5 * iqr</code></pre>
<p><strong>为什么不用均值±3 倍标准差？</strong> 因为标准差本身被异常值污染。IQR 是基于排名的，对极端值稳健。</p>

<h3>5. MAE vs RMSE——评估指标也有分布选择</h3>
<p><strong>MAE：</strong> 对异常值不敏感。<strong>RMSE：</strong> 对大误差惩罚更重。</p>
<pre><code class="language-python">from sklearn.metrics import mean_absolute_error, mean_squared_error
y_true = [10, 12, 11, 13, 200]  # 最后是异常值
y_pred = [10, 12, 11, 13, 20]
print(f"MAE: {mean_absolute_error(y_true, y_pred):.1f}")   # 36（稳健）
print(f"RMSE: {np.sqrt(mean_squared_error(y_true, y_pred)):.1f}")  # 80.6</code></pre>
<p><strong>决策原则：</strong> 给老板看用 MAE（直观，单位一致）；训练模型时若希望「大错不发生」用 RMSE。</p>

<h3>今日实战：自检你的销量数据是哪种分布</h3>
<pre><code class="language-python">import numpy as np
import pandas as pd

def diagnose_distribution(x):
    \"\"\"一键诊断数据分布类型\"\"\"
    skew = pd.Series(x).skew()
    print(f"偏度 skew = {skew:.2f}")
    if skew > 1:
        print("→ 强右偏，应该用对数正态建模")
    elif skew < -1:
        print("→ 强左偏，少见，检查数据采集")
    else:
        print("→ 近似对称，正态可以接受")
    print(f"最小值: {min(x):.1f}  最大值: {max(x):.1f}")
    if min(x) < 0:
        print("⚠️ 数据有负值，不能直接取 log")

# 测试
diagnose_distribution(sales)
</code></pre>

<h3>今日小结：3 个关键洞察</h3>
<ol>
<li><strong>右偏数据看中位数，不看均值</strong>——避免被极端值带偏</li>
<li><strong>销量用对数正态</strong>——这是避免预测出负数的根本方法</li>
<li><strong>异常值识别用 IQR</strong>——比 3σ 法更稳健</li>
</ol>
<p><strong>明日预告：</strong> 相关不等于因果——辛普森悖论怎么破？</p>
`,
    resources: [
      { label: "3Blue1Brown 正态分布可视化", url: "https://www.3blue1brown.com/topics/probability" },
      { label: "numpy 统计函数文档", url: "https://numpy.org/doc/stable/reference/routines.statistics.html" },
      { label: " sklearn metrics 文档", url: "https://scikit-learn.org/stable/modules/model_evaluation.html" },
    ],
  },

  {
    id: "crash-2",
    day: 2,
    week: 1,
    track: "crash",
    duration: 120,
    title: "相关性 vs 因果性：辛普森悖论——别被数据骗了",
    description: "数据分析最常见的错误是把相关当因果。这一天讲清相关系数、辛普森悖论、伪相关——因果分析的地基。",
    objectives: [
      "理解皮尔逊相关系数",
      "理解斯皮尔曼相关",
      "识别辛普森悖论",
      "理解伪相关",
    ],
    cues: [
      "Q: 相关系数 = 0.8 是强相关吗？",
      "Q: 为什么相关不等于因果？",
      "Q: 辛普森悖论怎么破？",
    ],
    content: `
<h3>1. 皮尔逊相关系数（Pearson r）</h3>
<p>衡量两个变量线性关系的强度。范围 [-1, 1]。|r| ≥ 0.7 算强相关。</p>
<pre><code class="language-python">import numpy as np
ad_spend = [100, 120, 80, 150, 200, 180]
sales = [50, 60, 40, 75, 100, 90]
r = np.corrcoef(ad_spend, sales)[0, 1]
print(f"相关系数: {r:.3f}")  # 0.99</code></pre>

<h3>2. 斯皮尔曼相关（Spearman ρ）</h3>
<p>用排名计算——适合评级数据（如商品排名 vs 销量排名）。</p>
<pre><code class="language-python">from scipy.stats import spearmanr
rho, p = spearmanr(ad_spend, sales)
print(f"斯皮尔曼: {rho:.3f}")</code></pre>

<h3>3. 辛普森悖论——整体看正相关，分组看负相关</h3>
<p><strong>经典案例：</strong> 治疗方案 A 整体治愈率高于 B，但按病情分组后 B 更好。原因是 A 接收的轻症病人多。</p>
<p><strong>为什么发生：</strong> 混淆变量同时影响两个变量。</p>
<pre><code class="language-python">import pandas as pd
data = pd.DataFrame({
    'product_type': ['高端']*50 + ['低端']*50,
    'promotion':    [10]*50 + [50]*50,
    'sales':        [500]*50 + [100]*50,
})
print(data['promotion'].corr(data['sales']))  # -0.81（伪相关）</code></pre>

<h3>4. 伪相关（Spurious Correlation）</h3>
<p>冰淇淋销量和溺水人数正相关——不是因为吃冰淇淋导致溺水，而是夏天这个第三变量。</p>

<h3>今日小结</h3>
<ol>
<li>|r| ≥ 0.7 才算强相关，但相关不等于因果</li>
<li>辛普森悖论提醒：永远检查分组后的关系</li>
<li>伪相关提醒：找隐藏的第三变量</li>
</ol>
<p><strong>明日预告：</strong> 贝叶斯思维——用新证据更新判断。</p>
`,
    resources: [
      { label: "Spurious Correlations 伪相关合集", url: "https://www.tylervigen.com/spurious-correlations" },
    ],
  },

  {
    id: "crash-3",
    day: 3,
    week: 1,
    track: "crash",
    duration: 120,
    title: "贝叶斯思维：用新证据更新判断——现代 ML 的底层",
    description: "贝叶斯不只是公式，是思维方式。Prophet、DeepAR、贝叶斯 MMM 都建立在这上面。",
    objectives: [
      "理解先验、似然、后验",
      "能用贝叶斯更新观点",
      "理解 MLE 和贝叶斯的区别",
    ],
    cues: [
      "Q: 先验、后验、似然的直觉？",
      "Q: 看到 3 个好评后怎么更新判断？",
    ],
    content: `
<h3>1. 贝叶斯定理——一句话版本</h3>
<p>贝叶斯 = 用新证据更新旧判断。</p>
<p>P(假设 | 证据) = P(证据 | 假设) × P(假设) / P(证据)</p>
<ul>
<li><strong>先验：</strong> 看到证据前你对假设的信心</li>
<li><strong>似然：</strong> 假设为真时看到这个证据的可能性</li>
<li><strong>后验：</strong> 看到证据后你对假设的信心</li>
</ul>

<h3>2. 贝叶斯更新的直觉</h3>
<p>你卖新品，先验估计日均 100 单。第 1 天卖出 150 → 后验更新为 ~120。第 2 天卖出 180 → 更新为 ~140。</p>
<p><strong>关键：</strong> 贝叶斯不会因为一天数据就推翻判断——平滑地更新。</p>

<h3>3. MLE vs 贝叶斯</h3>
<p><strong>MLE：</strong> 找让当前数据出现概率最大的参数。不考虑先验。</p>
<p><strong>贝叶斯：</strong> 用先验约束 MLE——更稳健。</p>
<pre><code class="language-python">from scipy.stats import norm
import numpy as np
sales = np.array([100, 120, 80, 95, 110, 105])
mu_mle = sales.mean()
sigma_mle = sales.std()
print(f"MLE 估计: mu={mu_mle:.1f}, sigma={sigma_mle:.1f}")</code></pre>

<h3>4. 贝叶斯在预测中的重要性</h3>
<ul>
<li>Prophet：贝叶斯估计趋势和季节性</li>
<li>DeepAR：输出销量的概率分布</li>
<li>贝叶斯 MMM：营销 ROI 估计附带置信区间</li>
</ul>

<p><strong>明日预告：</strong> 假设检验——p 值 0.049 和 0.051 到底差在哪。</p>
`,
    resources: [
      { label: "Bayesian Methods for Hackers", url: "https://github.com/CamDavidsonPilon/Probabilistic-Programming-and-Bayesian-Methods-for-Hackers" },
    ],
  },

  {
    id: "crash-4",
    day: 4,
    week: 1,
    track: "crash",
    duration: 120,
    title: "假设检验与置信区间：p 值的真实含义",
    description: "p 值是统计学最被滥用的概念。这一天讲清 p 值、置信区间、多重检验。",
    objectives: [
      "理解 p 值的真实含义",
      "理解置信区间",
      "识别 p 值的常见误用",
      "理解多重检验问题",
    ],
    cues: [
      "Q: p 值 = 0.04 意味着什么？",
      "Q: 为什么不能只看 p 值？",
    ],
    content: `
<h3>1. p 值的真实含义</h3>
<p><strong>常见误解：</strong> p 值 = 0.04 意味着假设为真的概率是 96%。<strong>错误！</strong></p>
<p><strong>正确定义：</strong> p 值 = 假设原假设为真时，看到当前数据或更极端数据的概率。</p>
<pre><code class="language-python">from scipy import stats
promo = [105, 110, 108, 112, 115, 109, 107, 113]
ctrl =  [100, 98, 102, 99, 101, 100, 103, 97]
t_stat, p_value = stats.ttest_ind(promo, ctrl)
print(f"p 值: {p_value:.4f}")</code></pre>

<h3>2. p 值 0.049 vs 0.051——没有本质区别</h3>
<p>0.05 这个阈值是 Fisher 随手定的，没有数学必然性。要看效应大小和置信区间。</p>

<h3>3. 置信区间——比 p 值更有信息量</h3>
<pre><code class="language-python">import numpy as np
diff = np.array(promo) - np.array(ctrl)
mean_diff = diff.mean()
se = diff.std() / np.sqrt(len(diff))
ci_lower = mean_diff - 1.96 * se
ci_upper = mean_diff + 1.96 * se
print(f"95% CI: [{ci_lower:.1f}, {ci_upper:.1f}]")</code></pre>

<h3>4. 多重检验问题</h3>
<p>测 100 个因子，即使都无效，平均也有 5 个假阳性。</p>
<pre><code class="language-python">from statsmodels.stats.multitest import multipletests
p_values = np.random.uniform(0, 1, 100)
rejected, p_corrected, _, _ = multipletests(p_values, method='bonferroni')
print(f"校正后显著: {rejected.sum()} 个")</code></pre>

<p><strong>明日预告：</strong> 梯度下降 + 信息熵——机器学习的两个底层引擎。</p>
`,
    resources: [
      { label: "Nature 关于 p 值误用的社论", url: "https://www.nature.com/articles/d41586-019-00857-9" },
    ],
  },

  {
    id: "crash-5",
    day: 5,
    week: 1,
    track: "crash",
    duration: 150,
    title: "梯度下降 + 信息熵：机器学习的两个底层引擎",
    description: "LightGBM 和神经网络都在用这两个概念。梯度下降是怎么找最优参数，信息熵是怎么衡量预测好坏。",
    objectives: [
      "理解梯度下降的直觉",
      "理解学习率的影响",
      "理解信息熵和交叉熵",
    ],
    cues: [
      "Q: 梯度下降为什么要小步走？",
      "Q: 学习率太大太小什么后果？",
    ],
    content: `
<h3>1. 梯度下降——下山找最低点</h3>
<p><strong>一句话类比：</strong> 蒙着眼下山，用脚探下坡方向，往下走一步。</p>
<pre><code class="language-python">import numpy as np
x = 10
learning_rate = 0.1
for i in range(50):
    grad = 2 * x  # y = x² 的导数
    x = x - learning_rate * grad
print(f"最小值在 x = {x:.4f}")  # 接近 0</code></pre>

<h3>2. 学习率的影响</h3>
<p><strong>太大：</strong> 跳过谷底，震荡甚至发散。<strong>太小：</strong> 要很久才到谷底。</p>
<p>LightGBM 里 <code>learning_rate</code> 默认 0.1。</p>

<h3>3. 信息熵——衡量不确定性</h3>
<pre><code class="language-python">import numpy as np
def entropy(p):
    p = np.array(p)
    p = p[p > 0]
    return -np.sum(p * np.log2(p))
print(f"抛硬币熵: {entropy([0.5, 0.5]):.2f}")       # 1.0
print(f"太阳升起熵: {entropy([0.99, 0.01]):.2f}")    # 0.08</code></pre>

<h3>4. 交叉熵——机器学习的损失函数</h3>
<p>LightGBM 的 loss 是负对数似然——就是交叉熵的另一种说法。</p>

<h3>Week 1 总结：统计学 5 块基石</h3>
<ol>
<li>描述性统计（均值/方差/分布）</li>
<li>相关性 vs 因果</li>
<li>贝叶斯——用新证据更新判断</li>
<li>假设检验——判断结果是否真的有效</li>
<li>梯度下降 + 熵——机器学习的引擎</li>
</ol>
<p><strong>Week 2 预告：</strong> pandas + LightGBM 实战。</p>
`,
    resources: [
      { label: "3Blue1Brown 梯度下降可视化", url: "https://www.3blue1brown.com/topics/neural-networks" },
    ],
  },

  // ============================================================
  // WEEK 2 · Python 武器（Day 6-10）
  // ============================================================

  {
    id: "crash-6",
    day: 6,
    week: 2,
    track: "crash",
    duration: 150,
    title: "pandas 十大操作：80% 工作时间都在这",
    description: "数据分析师 80% 的时间在处理数据。这一天只学 10 个最高频操作——足以应对 90% 的真实业务场景。",
    objectives: [
      "掌握 read_csv / head / info",
      "掌握 groupby + agg",
      "掌握 merge / join",
      "掌握 pivot / melt",
    ],
    cues: [
      "Q: groupby 后怎么同时算多个聚合？",
      "Q: merge 的 left/right/inner/outer 区别？",
    ],
    content: `
<h3>工具链决策：为什么用本地 venv 而不是 Colab</h3>
<p><strong>你的工具组合：</strong></p>
<ul>
<li>🧠 <strong>大脑（写代码）：</strong> WorkBuddy + DeepSeek V4-Pro</li>
<li>💪 <strong>肌肉（跑代码）：</strong> 本地 venv（M-series Mac 性能足够）</li>
<li>☁️ <strong>GPU 补位：</strong> Colab 免费 T4（仅 DeepAR/TFT 时用）</li>
</ul>

<h3>pandas 十大操作清单</h3>
<ol>
<li><code>read_csv()</code> — 导入</li>
<li><code>head() / info() / describe()</code> — 概览</li>
<li><code>groupby() + agg()</code> — 分组聚合</li>
<li><code>merge() / join()</code> — 多表关联</li>
<li><code>pivot_table() / melt()</code> — 长宽转换</li>
<li><code>apply()</code> — 自定义函数</li>
<li><code>datetime</code> — 时间处理</li>
<li><code>fillna() / dropna()</code> — 缺失值</li>
<li><code>sort_values()</code> — 排序</li>
<li><code>to_csv() / to_excel()</code> — 导出</li>
</ol>
<pre><code class="language-python">import pandas as pd
df = pd.read_csv('sales.csv', parse_dates=['date'])
df['month'] = df['date'].dt.to_period('M')
monthly = df.groupby(['product_id', 'month']).agg({
    'sales': ['sum', 'mean', 'std'],
    'price': 'mean'
}).reset_index()
products = pd.read_csv('products.csv')
merged = monthly.merge(products, on='product_id', how='left')
wide = df.pivot_table(index='product_id', columns='month', values='sales', aggfunc='sum').fillna(0)</code></pre>

<h3>踩坑点</h3>
<ul>
<li><strong>SettingWithCopyWarning：</strong> 用 <code>df.loc[...]</code></li>
<li><strong>apply 慢：</strong> 能向量化就向量化</li>
<li><strong>merge 类型：</strong> 供应链数据通常用 left</li>
</ul>
`,
    resources: [
      { label: "pandas 官方 Cheatsheet", url: "https://pandas.pydata.org/Pandas_Cheat_Sheet.pdf" },
    ],
  },

  {
    id: "crash-7",
    day: 7,
    week: 2,
    track: "crash",
    duration: 150,
    title: "特征工程 6 类：lag / rolling / target encoding",
    description: "特征工程决定模型上限。这一天学 6 类最实用的特征。",
    objectives: [
      "掌握 lag 特征",
      "掌握 rolling 特征",
      "掌握 target encoding",
      "掌握时间特征",
    ],
    cues: [
      "Q: lag 特征为什么会造成数据泄漏？",
      "Q: target encoding 为什么要 K-fold？",
    ],
    content: `
<h3>1. lag 特征——过去 N 天的销量</h3>
<pre><code class="language-python">df = df.sort_values(['product_id', 'date'])
for lag in [1, 7, 14, 30]:
    df[f'sales_lag_{lag}'] = df.groupby('product_id')['sales'].shift(lag)</code></pre>

<h3>2. rolling 特征——移动统计</h3>
<pre><code class="language-python">for window in [7, 14, 30]:
    df[f'sales_mean_{window}'] = df.groupby('product_id')['sales'].transform(
        lambda x: x.shift(1).rolling(window).mean()
    )</code></pre>

<h3>3. target encoding——类别编码</h3>
<p>商品 ID 有几千个，one-hot 维度爆炸。用历史平均销量作为特征。</p>
<pre><code class="language-python">from sklearn.model_selection import KFold
def target_encode(df, col, target, n_splits=5):
    df[col + '_encoded'] = 0
    kf = KFold(n_splits=n_splits, shuffle=True)
    for tr_idx, val_idx in kf.split(df):
        means = df.iloc[tr_idx].groupby(col)[target].mean()
        df.iloc[val_idx, df.columns.get_loc(col + '_encoded')] = df.iloc[val_idx][col].map(means)
    return df</code></pre>

<h3>4. 时间特征</h3>
<pre><code class="language-python">df['dayofweek'] = df['date'].dt.dayofweek
df['month'] = df['date'].dt.month
df['is_weekend'] = df['dayofweek'].isin([5, 6]).astype(int)</code></pre>

<h3>5. 价格/促销特征</h3>
<pre><code class="language-python">df['discount'] = 1 - df['actual_price'] / df['list_price']
df['is_promo'] = (df['discount'] > 0.1).astype(int)</code></pre>
`,
    resources: [
      { label: "Featuretools 自动特征工程", url: "https://featuretools.alteryx.com/" },
    ],
  },

  {
    id: "crash-8",
    day: 8,
    week: 2,
    track: "crash",
    duration: 150,
    title: "LightGBM + Optuna：2026 的主力模型",
    description: "LightGBM 是表格数据预测的王者——比 XGBoost 快 3-5 倍。配合 Optuna 自动调参。",
    objectives: [
      "理解为什么 LightGBM > XGBoost",
      "掌握 LightGBM 的 5 个核心超参",
      "用 Optuna 自动调参",
      "理解过拟合识别",
    ],
    cues: [
      "Q: LightGBM 为什么比 XGBoost 快？",
      "Q: 5 个核心超参是什么？",
    ],
    content: `
<h3>为什么 LightGBM > XGBoost</h3>
<ul>
<li><strong>速度：</strong> LightGBM 用 leaf-wise 增长，XGBoost 用 level-wise</li>
<li><strong>内存：</strong> LightGBM 用直方图算法，内存少 50%+</li>
<li><strong>精度：</strong> 大多数表格数据上两者相当</li>
</ul>

<h3>5 个核心超参</h3>
<ol>
<li><code>num_leaves</code>：叶子数（默认 31）</li>
<li><code>learning_rate</code>：学习率（默认 0.1）</li>
<li><code>n_estimators</code>：树的数量（配合 early stopping）</li>
<li><code>min_child_samples</code>：叶子最小样本数</li>
<li><code>feature_fraction</code>：特征采样比例</li>
</ol>

<pre><code class="language-python">import lightgbm as lgb
from sklearn.model_selection import train_test_split

X_train, X_val, y_train, y_val = train_test_split(X, y, test_size=0.2, shuffle=False)
model = lgb.LGBMRegressor(
    num_leaves=31, learning_rate=0.1, n_estimators=500,
    min_child_samples=20, feature_fraction=0.8, random_state=42
)
model.fit(X_train, y_train, eval_set=[(X_val, y_val)],
          callbacks=[lgb.early_stopping(50)])</code></pre>

<h3>Optuna 自动调参</h3>
<pre><code class="language-python">import optuna
def objective(trial):
    params = {
        'num_leaves': trial.suggest_int('num_leaves', 20, 100),
        'learning_rate': trial.suggest_float('learning_rate', 0.01, 0.3, log=True),
        'n_estimators': trial.suggest_int('n_estimators', 100, 1000),
    }
    model = lgb.LGBMRegressor(**params)
    model.fit(X_train, y_train, eval_set=[(X_val, y_val)],
              callbacks=[lgb.early_stopping(50)])
    pred = model.predict(X_val)
    return mean_absolute_error(y_val, pred)

study = optuna.create_study(direction='minimize')
study.optimize(objective, n_trials=50)</code></pre>
`,
    resources: [
      { label: "LightGBM 官方文档", url: "https://lightgbm.readthedocs.io/" },
      { label: "Optuna 教程", url: "https://optuna.readthedocs.io/" },
    ],
  },

  {
    id: "crash-9",
    day: 9,
    week: 2,
    track: "crash",
    duration: 120,
    title: "SHAP 可解释性 + 评估指标：给老板讲清模型",
    description: "训练出模型只是第一步，给老板讲清楚广告费贡献了多少销量才是真本事。",
    objectives: [
      "理解 SHAP 的直觉",
      "能用 SHAP 解释单个预测",
      "掌握 MAE/MAPE/WAPE/RMSE 的盲区",
      "理解为什么时序数据不能随机 split",
    ],
    cues: [
      "Q: SHAP 怎么解释广告费贡献多少？",
      "Q: MAPE 在小销量时为什么失效？",
    ],
    content: `
<h3>SHAP——博弈论视角的特征贡献</h3>
<p>SHAP 把一次预测的功劳公平地分配给每个特征——像分蛋糕。</p>
<pre><code class="language-python">import shap
explainer = shap.TreeExplainer(model)
shap_values = explainer.shap_values(X_val)
shap.force_plot(explainer.expected_value, shap_values[0], X_val.iloc[0])
shap.summary_plot(shap_values, X_val)</code></pre>

<h3>评估指标的盲区</h3>
<table>
<tr><th>指标</th><th>含义</th><th>盲区</th></tr>
<tr><td>MAE</td><td>平均绝对误差</td><td>对大误差惩罚不够</td></tr>
<tr><td>MAPE</td><td>平均绝对百分比误差</td><td>真实值小时会爆炸</td></tr>
<tr><td>WAPE</td><td>加权绝对百分比误差</td><td>对总量小的 SKU 偏好</td></tr>
<tr><td>RMSE</td><td>均方根误差</td><td>对异常值敏感</td></tr>
</table>

<h3>时序数据的特殊评估——TimeSeriesSplit</h3>
<pre><code class="language-python">from sklearn.model_selection import TimeSeriesSplit
tscv = TimeSeriesSplit(n_splits=5)
for tr_idx, val_idx in tscv.split(X):
    pass  # 严格按时间切分</code></pre>
`,
    resources: [
      { label: "SHAP 官方文档", url: "https://shap.readthedocs.io/" },
    ],
  },

  {
    id: "crash-10",
    day: 10,
    week: 2,
    track: "crash",
    duration: 150,
    title: "Week 2 实战：完整的销量预测 pipeline",
    description: "用 WorkBuddy + DeepSeek V4-Pro 写一个端到端的 LightGBM 销量预测 pipeline。这是你的第一个作品。",
    objectives: [
      "用 AI 对话方式构建完整 pipeline",
      "掌握特征工程模板库",
      "理解过拟合诊断",
    ],
    cues: [
      "Q: 怎么用 AI 写代码而不只是 copy-paste？",
      "Q: 过拟合的诊断标准是什么？",
    ],
    content: `
<h3>AI 原生开发工作流（核心）</h3>
<ol>
<li><strong>描述需求：</strong> 用自然语言告诉 AI 你要做什么</li>
<li><strong>AI 生成代码：</strong> DeepSeek V4-Pro 写第一版</li>
<li><strong>你审代码：</strong> 检查逻辑、问为什么</li>
<li><strong>本地运行：</strong> 在 venv 里跑，debug</li>
<li><strong>迭代改进：</strong> 让 AI 优化</li>
</ol>
<pre><code class="language-python">import pandas as pd
import lightgbm as lgb

class SalesForecaster:
    def __init__(self):
        self.model = None
        self.features = []

    def add_features(self, df):
        """添加 6 类特征"""
        # lag / rolling / target encoding / 时间 / 价格 / 交叉
        return df

    def train(self, df, target='sales'):
        X = df[self.features]
        y = df[target]
        self.model = lgb.LGBMRegressor()
        self.model.fit(X, y)

    def predict(self, df):
        return self.model.predict(df[self.features])</code></pre>
`,
    resources: [],
  },

  // ============================================================
  // WEEK 3 · 时序 + 工具链（Day 11-15）
  // ============================================================

  {
    id: "crash-11",
    day: 11,
    week: 3,
    track: "crash",
    duration: 120,
    title: "ARIMA 概念：平稳性、差分——0.5 天讲清 + 库一键跑",
    description: "ARIMA 家族的手动调参已被 statsforecast.AutoARIMA 替代。今天只学概念，然后用库一键跑。",
    objectives: [
      "理解平稳性的直觉",
      "理解差分的作用",
      "用 statsforecast.AutoARIMA 一键跑",
    ],
    cues: [
      "Q: 平稳性为什么重要？",
      "Q: 差分次数 d 怎么定？",
    ],
    content: `
<h3>ARIMA(p,d,q)——3 个参数一句话讲清</h3>
<ul>
<li><strong>p（自回归 AR）：</strong> 用过去几天的值预测今天</li>
<li><strong>d（差分）：</strong> 做几次差分让数据变平稳</li>
<li><strong>q（移动平均 MA）：</strong> 用过去几天的误差预测今天</li>
</ul>
<p><strong>关键：</strong> 让库自动选这 3 个参数。</p>

<h3>statsforecast.AutoARIMA——一键替代</h3>
<pre><code class="language-python">from statsforecast import StatsForecast
from statsforecast.models import AutoARIMA
models = [AutoARIMA(season_length=7)]
sf = StatsForecast(models=models, freq='D')
sf.fit(df=train_df)
forecast = sf.predict(h=30)</code></pre>

<h3>看懂 ARIMA 输出</h3>
<ul>
<li><strong>AIC/BIC：</strong> 越小越好</li>
<li><strong>残差白噪声：</strong> Ljung-Box 检验 p > 0.05</li>
</ul>
`,
    resources: [
      { label: "statsforecast 文档", url: "https://nixtla.github.io/statsforecast/" },
    ],
  },

  {
    id: "crash-12",
    day: 12,
    week: 3,
    track: "crash",
    duration: 120,
    title: "Chronos / TimeGPT 零样本预测：不用训练就能预测",
    description: "2024-2026 最大的变化——大模型也能做时序预测。Chronos 和 TimeGPT 让你不用训练就能预测。",
    objectives: [
      "理解零样本预测的含义",
      "用 Chronos 一行代码预测",
      "理解零样本 vs 传统模型的取舍",
    ],
    cues: [
      "Q: 零样本预测凭什么有效？",
      "Q: 什么时候用 Chronos 什么时候用 LightGBM？",
    ],
    content: `
<h3>Chronos——Amazon 的零样本预测大模型</h3>
<pre><code class="language-python">from chronos import ChronosPipeline
import torch
pipeline = ChronosPipeline.from_pretrained("amazon/chronos-t5-small")
context = torch.tensor(sales_history)
forecast = pipeline.predict(context, prediction_length=30)</code></pre>
<p><strong>何时用：</strong> 新品冷启动 / 历史数据不足 / 快速 baseline</p>
`,
    resources: [
      { label: "Chronos GitHub", url: "https://github.com/amazon-science/chronos-forecasting" },
    ],
  },

  {
    id: "crash-13",
    day: 13,
    week: 3,
    track: "crash",
    duration: 120,
    title: "Prophet + 回测：Facebook 的自动分解",
    description: "Prophet 自动处理趋势 + 季节性 + 节假日。配合滚动回测，是销量预测的快速 baseline。",
    objectives: [
      "用 Prophet 一键预测",
      "理解加性 vs 乘性季节性",
      "掌握滚动回测",
    ],
    cues: [
      "Q: Prophet 怎么自动处理节假日？",
    ],
    content: `
<pre><code class="language-python">from prophet import Prophet
m = Prophet(
    yearly_seasonality=True,
    weekly_seasonality=True,
    seasonality_mode='multiplicative'
)
m.add_country_holidays(country_name='CN')
m.fit(df)
future = m.make_future_dataframe(periods=30)
forecast = m.predict(future)</code></pre>
`,
    resources: [],
  },

  {
    id: "crash-14",
    day: 14,
    week: 3,
    track: "crash",
    duration: 120,
    title: "过拟合识别 + 模型选型决策树",
    description: "训练 MAPE=2% 但上线后 MAPE=30%——这是过拟合。今天讲过拟合的三大成因。",
    objectives: [
      "识别过拟合的信号",
      "理解过拟合三大成因",
      "掌握模型选型决策树",
    ],
    cues: [
      "Q: 训练误差低测试误差高怎么办？",
      "Q: 数据量 500 行该选什么模型？",
    ],
    content: `
<h3>过拟合三大成因</h3>
<ol>
<li>模型太复杂（参数远多于样本）</li>
<li>特征太多（100 特征 1000 样本）</li>
<li>评估方法错（用全量数据评估，或时序随机切分）</li>
</ol>

<h3>模型选型决策树</h3>
<ul>
<li>数据 < 500 行 → ARIMA / Prophet / naive baseline</li>
<li>500-100k 行 + 有外部特征 → LightGBM</li>
<li>> 100k 行 + 强非线性 → 深度学习（TFT/PatchTST）</li>
<li>新品无历史 → Chronos 零样本</li>
</ul>
`,
    resources: [],
  },

  {
    id: "crash-15",
    day: 15,
    week: 3,
    track: "crash",
    duration: 180,
    title: "Week 3 毕业：3 个模型横评（LightGBM vs ARIMA vs Prophet）",
    description: "用同一份数据跑 3 个模型，对比 MAE/MAPE/训练时间/可解释性。这是速成阶段的毕业作品。",
    objectives: [
      "用同一份销量数据跑 3 个模型",
      "产出横评报告",
      "建立工具链肌肉记忆",
    ],
    cues: [
      "Q: 哪个模型最适合你的业务？",
    ],
    content: `
<h3>毕业项目：3 模型横评</h3>
<p><strong>交付物：</strong></p>
<ul>
<li>3 个模型的预测代码（.py 文件）</li>
<li>横评报告（MAE/MAPE/训练时间/推理时间/可解释性）</li>
<li>业务建议（选哪个模型 + 为什么）</li>
</ul>
<p><strong>15 天速成结束——接下来 100 天深化轨从 Day 16 开始。</strong></p>
<p><strong>下一步：</strong> P4 因果归因（促销真的有效吗？）</p>
`,
    resources: [],
  },
];
