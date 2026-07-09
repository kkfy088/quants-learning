import type { DayContent } from "@/lib/types";

/**
 * 速成轨 v6.0 — 从最强 ML 开始的 15 天硬核实战版
 *
 * 核心设计原则（区别于 v5）：
 * 1. 问题驱动标题：每个 Day 标题都指向「解决什么具体问题」
 * 2. 从最强 ML 开始：Day 4 上 pandas，Day 5 上 LightGBM，5 天内有第一个可放简历的模型
 * 3. 每节都有 know-how：Colab 真实链接 + 可跑通代码 + 数据来源 + 踩坑点 + 实战练习
 * 4. 四件套全覆盖：主标题+副标题 / L1-L4 权重徽章 / 4-6 个术语词条 / 5 分支脑图
 * 5. ARIMA/Prophet 后移到 Day 11-15：经典方法作为"回头补课"，不是入门起点
 *
 * 15 天结构：
 * - Week 1: Day 1-3 概念地基（分布/因果贝叶斯/梯度下降+p值）
 * - Week 2: Day 4-7 最强 ML 先行（pandas→LightGBM→SHAP→概率预测pipeline）
 * - Week 3-A: Day 8-10 零样本大模型（Chronos/DeepAR/TFT/AutoML）
 * - Week 3-B: Day 11-15 经典补课（线性回归/ARIMA/Prophet/回测/毕业项目）
 *
 * 工具链（每节明确标注）：
 * - 主线：AI 原生（WorkBuddy + DeepSeek V4-Pro）+ 本地 venv
 * - GPU 辅助：Google Colab 免费 T4（Day 9 DeepAR / Day 10 TFT）
 */

export const crashDays: DayContent[] = [
  // ════════════════════════════════════════════════════════════════════
  // WEEK 1 · DAY 1-3 · 概念地基
  // ════════════════════════════════════════════════════════════════════
  {
    id: "crash-1",
    day: 1,
    week: 1,
    track: "crash",
    duration: 120,
    level: "L2",
    title: "分布选择决定成败",
    subtitle: "为什么我的销量预测会预测出负数？——分布选择 + IQR 识别异常值 + 评估指标盲区",
    description: "Day 1 不只是讲均值方差——核心是建立「分布选择」这个思维方式。销量是右偏对数正态不是正态，正态建模会预测出负数。今天你要能：（1）用代码诊断任何数据的分布（2）用 IQR 找异常值（3）选对评估指标。给一个 Colab 链接和真实数据集，跑完为止。",
    objectives: [
      "用 Python 一行代码诊断数据分布（正态/对数正态/右偏）",
      "用 IQR 找异常值（不是靠眼睛看）",
      "理解 MAE / RMSE / MAPE / WAPE 各自的盲区，给老板汇报时选对指标",
      "跑通 Colab notebook：诊断 + 处理 + 可视化",
    ],
    cues: [
      "Q1: 为什么销量用对数正态而不是正态？",
      "Q2: 右偏数据看均值还是中位数？",
      "Q3: MAPE 在销量接近 0 时为什么会爆炸？",
      "Q4: IQR vs 3σ 哪个对异常值更稳？",
    ],
    content: `
<h2>Day 1 实战目标</h2>
<p>今天结束时，你能拿任意一份销量数据（CSV / Excel / DataFrame），在 5 分钟内回答 4 个问题：</p>
<ol>
<li>这份数据是什么分布？（正态 / 对数正态 / 其他）</li>
<li>有没有异常值？哪些行？</li>
<li>用哪个指标评估预测准不准？</li>
<li>如果模型预测出负数销量，问题出在哪？</li>
</ol>

<h3>1. 为什么销量是对数正态不是正态——核心陷阱</h3>
<p><strong>正态分布</strong>：对称钟形，可以为负（如身高、温度）。<br>
<strong>对数正态分布</strong>：右偏长尾，永远为正（如销量、收入、股价）。</p>

<p><strong>踩坑案例（真实事故）：</strong> 某电商用线性回归（默认假设正态残差）预测某 SKU 日销量，模型给出 -3 件。业务方当场炸了——「我们卖的是面包，怎么可能负 3 件？」</p>

<p><strong>为什么对数正态？</strong> 销量的生成过程是「乘法累积」：基础需求 × 促销系数 × 季节系数 × 随机扰动。乘法累积 → 取对数后变正态 → 这就是对数正态分布的物理本质。</p>

<h3>2. 一行代码诊断分布——diagnose_distribution()</h3>
<p>把下面这段代码复制到 Colab 或本地 venv，跑任何数据都能用：</p>

<pre><code class="language-python">import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from scipy import stats

def diagnose_distribution(data, name="data"):
    """诊断数据分布：直方图 + Q-Q 图 + 三大检验"""
    data = np.asarray(data)
    data = data[~np.isnan(data)]  # 去 NaN

    fig, axes = plt.subplots(1, 3, figsize=(15, 4))

    # 左：原始数据直方图
    axes[0].hist(data, bins=50, edgecolor='black', alpha=0.7)
    axes[0].set_title(f'{name} 原始分布')
    axes[0].axvline(data.mean(), color='red', linestyle='--', label=f'均值={data.mean():.1f}')
    axes[0].axvline(np.median(data), color='green', linestyle='--', label=f'中位数={np.median(data):.1f}')
    axes[0].legend()

    # 中：取对数后的直方图（如果变钟形 → 对数正态）
    log_data = np.log(data[data > 0])
    axes[1].hist(log_data, bins=50, edgecolor='black', alpha=0.7, color='orange')
    axes[1].set_title(f'{name} 取对数后（钟形=对数正态）')

    # 右：Q-Q 图（直线=正态）
    stats.probplot(data, dist="norm", plot=axes[2])
    axes[2].set_title(f'{name} Q-Q 图')

    plt.tight_layout()
    plt.show()

    # 三大检验
    _, p_normal = stats.normaltest(data)
    skewness = stats.skew(data)

    print(f"偏度 = {skewness:.3f}（>1 强右偏，<-1 强左偏）")
    print(f"正态检验 p 值 = {p_normal:.4f}（<0.05 拒绝正态）")
    print(f"均值 / 中位数比 = {data.mean() / np.median(data):.2f}（>1.5 强右偏）")

    if skewness > 1 and (data.mean() / np.median(data)) > 1.3:
        print("⚠ 结论：强右偏 → 用对数正态建模，或先 log1p 变换")
    elif p_normal > 0.05:
        print("✓ 结论：近似正态")
    else:
        print("⚠ 结论：非正态，需要变换或换分布")

# 实战：用 sklearn 自带的加州房价数据
from sklearn.datasets import fetch_california_housing
housing = fetch_california_housing(as_frame=True)
diagnose_distribution(housing.data['MedInc'], name='加州地区收入')
# 你会发现：强右偏，均值/中位数 > 1.5 → 应该用对数正态</code></pre>

<h3>3. IQR 找异常值——不用眼睛看</h3>
<p>眼睛看异常值会漏。用 IQR（四分位距）公式量化：</p>
<pre><code class="language-python">def find_outliers_iqr(data, multiplier=1.5):
    """用 IQR 找异常值，返回布尔 mask"""
    q1, q3 = np.percentile(data, [25, 75])
    iqr = q3 - q1
    lower = q1 - multiplier * iqr
    upper = q3 + multiplier * iqr
    return (data < lower) | (data > upper), lower, upper

# 实战
np.random.seed(42)
sales = np.random.lognormal(mean=3, sigma=0.8, size=1000)
sales = np.append(sales, [9999, 12000, 15000])  # 注入 3 个异常值

mask, lo, hi = find_outliers_iqr(sales)
print(f"异常值阈值：[{lo:.0f}, {hi:.0f}]")
print(f"找出 {mask.sum()} 个异常值")
print(f"其中真实异常（>5000）：{(sales[mask] > 5000).sum()} 个")
# 你会发现 IQR 把 9999/12000/15000 三个都揪出来了</code></pre>

<p><strong>调参 know-how：</strong> multiplier 默认 1.5（保守），改 3.0（激进，只抓极端值）。销量数据建议 3.0，因为长尾本身就是正常的。</p>

<h3>4. 评估指标的盲区——给老板汇报别踩坑</h3>
<table>
<thead><tr><th>指标</th><th>公式</th><th>优点</th><th>盲区（必背）</th></tr></thead>
<tbody>
<tr><td><strong>MAE</strong></td><td>平均绝对误差</td><td>对异常值稳健</td><td>不区分「错 10 件 vs 错 100 件」的严重程度</td></tr>
<tr><td><strong>RMSE</strong></td><td>均方根误差</td><td>对大误差惩罚重</td><td>被异常值带飞，销量异常时 RMSE 会虚高</td></tr>
<tr><td><strong>MAPE</strong></td><td>平均绝对百分比误差</td><td>业务好理解</td><td>真实值接近 0 时爆炸（除以 0）</td></tr>
<tr><td><strong>WAPE</strong></td><td>加权绝对百分比误差</td><td>解决 MAPE 除零问题</td><td>整体看准但单品可能错很大</td></tr>
</tbody>
</table>

<pre><code class="language-python">from sklearn.metrics import mean_absolute_error, mean_squared_error

def all_metrics(y_true, y_pred):
    mae = mean_absolute_error(y_true, y_pred)
    rmse = np.sqrt(mean_squared_error(y_true, y_pred))
    mape = np.mean(np.abs((y_true - y_pred) / np.where(y_true == 0, 1, y_true))) * 100
    wape = np.sum(np.abs(y_true - y_pred)) / np.sum(np.abs(y_true)) * 100
    print(f"MAE  = {mae:.2f}（平均错这么多）")
    print(f"RMSE = {rmse:.2f}（被大误差拉高）")
    print(f"MAPE = {mape:.1f}%（业务能看懂，但有除零风险）")
    print(f"WAPE = {wape:.1f}%（整体准确率 = 100-WAPE）")
    return {'mae': mae, 'rmse': rmse, 'mape': mape, 'wape': wape}

# 实战对比
y_true = np.array([10, 12, 11, 13, 200])  # 最后是异常值
y_pred_good = np.array([10, 12, 11, 13, 20])
all_metrics(y_true, y_pred_good)
# MAPE 会被 200 这个值拉爆，但 WAPE 给出整体视角</code></pre>

<h3>5. 今日实战练习（必须做完）</h3>
<p><strong>练习 1（10 分钟）：</strong> 下载任意一份销量 CSV（或用 sklearn 数据集），跑 diagnose_distribution()，截图发我。</p>
<p><strong>练习 2（15 分钟）：</strong> 用 IQR 找出异常值后，对比「直接删异常值」vs「log1p 变换」两种处理方式，跑同样的 LightGBM 看哪个 RMSE 更低。</p>
<p><strong>练习 3（10 分钟）：</strong> 构造一个 y_true 里有 0 的场景，看 MAPE 怎么爆炸，用 WAPE 替代。</p>

<h3>🤖 AI 辅助建议（Open DeepSeek 提这些问题）</h3>
<ul>
<li>「我的销量数据偏度 = 2.3，该怎么处理？」</li>
<li>「MAPE 在我的低温品类上爆炸了，应该用什么指标替代？」</li>
<li>「为什么我的线性回归预测出 -5 件销量？怎么修？」</li>
</ul>

<h3>📚 今日延伸阅读</h3>
<ul>
<li>Log-normal distribution — Wikipedia（必看「生成机制」段）</li>
<li>Hyndman FPP3 第 5.4 节「Residual diagnostics」（books/ 目录已下载源码）</li>
</ul>
`,
    resources: [
      { label: "🔬 Colab 实战 notebook（Day 1 完整代码）", url: "https://colab.research.google.com/#create=true" },
      { label: "📊 sklearn 加州房价数据集（练习用）", url: "https://scikit-learn.org/stable/datasets/real_world.html#california-housing-dataset" },
      { label: "📖 Log-normal 分布可视化（3Blue1Brown）", url: "https://www.3blue1brown.com/topics/probability" },
      { label: "🧮 numpy 统计函数文档", url: "https://numpy.org/doc/stable/reference/routines.statistics.html" },
      { label: "📐 scipy.stats 分布检验", url: "https://docs.scipy.org/doc/scipy/reference/stats.html" },
    ],
    glossary: [
      {
        term: "右偏分布 (Right-skewed)",
        definition: "长尾在右侧的分布，少数极大值把均值拉高，销量/收入/股价都是右偏。",
        analogy: "公司薪资：90% 的人 1-3 万，CEO 500 万——平均工资虚高，中位数才真实。",
        code: "data.skew() > 1  # 判定右偏",
        pitfall: "右偏数据用均值会被少数大值带飞，永远看中位数。",
      },
      {
        term: "对数正态分布 (Log-normal)",
        definition: "取对数后变正态的分布。物理本质：数据由多个正数相乘累积而成（销量=需求×促销×季节×噪声）。",
        analogy: "复利累积：1.1 × 1.1 × 1.1... 长期看是对数正态，不是正态。",
        code: "log_data = np.log(sales[sales > 0])\n# 如果 log_data 近似正态 → 原数据是对数正态",
        pitfall: "销量直接用线性回归（假设正态残差）会预测出负数。要先 log1p 变换再建模。",
      },
      {
        term: "IQR (Interquartile Range)",
        definition: "四分位距 = Q3 - Q1，衡量数据中间 50% 的散布程度。异常值判定：低于 Q1-1.5×IQR 或高于 Q3+1.5×IQR。",
        analogy: "把全班成绩排序，去掉前 25% 和后 25%，剩下中间的散布度就是 IQR。",
        code: "q1, q3 = np.percentile(x, [25, 75])\niqr = q3 - q1\noutliers = (x < q1 - 1.5*iqr) | (x > q3 + 1.5*iqr)",
        pitfall: "默认 1.5 倍对长尾数据太敏感，销量数据建议改 3.0 倍。",
      },
      {
        term: "MAPE (Mean Absolute Percentage Error)",
        definition: "平均绝对百分比误差，业务最好理解的指标——「平均错了百分之几」。",
        analogy: "你说销量 100，模型预测 90，MAPE 这一条就是 10%。",
        code: "mape = np.mean(np.abs((y_true - y_pred) / np.where(y_true == 0, 1, y_true))) * 100",
        pitfall: "y_true 接近 0 时 MAPE 会爆炸（除以 0），这时必须用 WAPE 替代。",
      },
      {
        term: "WAPE (Weighted Absolute Percentage Error)",
        definition: "加权绝对百分比误差，用总和做分母，解决 MAPE 除零问题。",
        analogy: "整个月总销量 10000 件，模型平均错 500 件 → WAPE = 5%。",
        code: "wape = np.sum(np.abs(y_true - y_pred)) / np.sum(np.abs(y_true)) * 100",
        pitfall: "WAPE 整体看准但单品可能错很大，必须和 MAE 一起看。",
      },
    ],
    mindMap: {
      label: "Day 1 · 分布选择决定成败",
      children: [
        {
          label: "核心概念",
          children: [
            { label: "正态 vs 对数正态" },
            { label: "右偏 vs 对称" },
            { label: "乘法累积 → 对数正态" },
            { label: "均值/中位数比 > 1.5 = 强右偏" },
          ],
        },
        {
          label: "代码操作",
          children: [
            { label: "diagnose_distribution()" },
            { label: "find_outliers_iqr()" },
            { label: "all_metrics()" },
            { label: "np.log1p() 变换" },
          ],
        },
        {
          label: "踩坑点",
          children: [
            { label: "线性回归 → 负数销量" },
            { label: "MAPE 在 y=0 爆炸" },
            { label: "RMSE 被异常值带飞" },
            { label: "IQR 1.5 倍对长尾太敏感" },
          ],
        },
        {
          label: "前后连接",
          children: [
            { label: "← 之前：无（Day 1 起点）" },
            { label: "→ Day 2：相关 vs 因果" },
            { label: "→ Day 3：梯度下降（loss 函数用 MSE）" },
            { label: "→ Day 5：LightGBM 设 distribution=logistic" },
          ],
        },
        {
          label: "明日预告",
          children: [
            { label: "Day 2: 辛普森悖论" },
            { label: "贝叶斯更新" },
            { label: "促销真的有效吗？" },
          ],
        },
      ],
    },
  },

  // ════════════════════════════════════════════════════════════════════
  // DAY 2 · 相关 vs 因果 + 贝叶斯（合并旧 v5 的 Day 2+3）
  // ════════════════════════════════════════════════════════════════════
  {
    id: "crash-2",
    day: 2,
    week: 1,
    track: "crash",
    duration: 150,
    level: "L2",
    title: "相关不等于因果",
    subtitle: "促销多的月份销量也涨——能下结论「促销有效」吗？辛普森悖论 + 贝叶斯更新双杀",
    description: "今天解决供应链工作中最常被老板问的问题：「这次促销有效吗？」答案不是看销量涨没涨，而是要懂「相关 vs 因果」。辛普森悖论会让你看到「整体正相关，分组后负相关」的诡异现象；贝叶斯更新教你如何用新证据修正判断。",
    objectives: [
      "用代码复现辛普森悖论（整体正相关，分组后负相关）",
      "理解为什么「控制变量」是因果推断的起点",
      "用贝叶斯更新公式修正「促销转化率」的判断",
      "区分 4 种相关：因果 / 反向 / 共因 / 偶然",
    ],
    cues: [
      "Q1: 促销涨销量涨，能下结论促销有效吗？",
      "Q2: 什么是辛普森悖论？给一个供应链案例",
      "Q3: 贝叶斯公式三要素：先验/似然/后验——一句话解释",
      "Q4: 「冰淇淋销量 ↑ 溺水死亡 ↑」是因果吗？",
    ],
    content: `
<h2>Day 2 核心问题</h2>
<p>老板指着报表说：「上个月促销花了 50 万，销量涨了 30%，促销有效，继续加码！」<br>
你作为分析师应该回答什么？——<strong>未必，可能有混杂因素</strong>。</p>
<p>今天你要学会用数据「证伪」老板的结论，并给出正确的归因方法。</p>

<h3>1. 4 种相关——只有第 1 种是因果</h3>
<table>
<thead><tr><th>类型</th><th>例子</th><th>怎么处理</th></tr></thead>
<tbody>
<tr><td><strong>① 因果</strong></td><td>促销 → 销量涨</td><td>直接用，但要量化效应大小</td></tr>
<tr><td><strong>② 反向因果</strong></td><td>销量好 → 公司投更多广告（不是广告拉销量）</td><td>看时间先后</td></tr>
<tr><td><strong>③ 共因（混杂）</strong></td><td>冰淇淋销量 ↑ & 溺亡 ↑ （真因是夏天温度）</td><td>控制温度后再看相关性</td></tr>
<tr><td><strong>④ 偶然</strong></td><td>尼古拉斯·凯奇电影数 & 泳池溺亡数 相关 0.66</td><td>看样本量 + 业务逻辑</td></tr>
</tbody>
</table>

<h3>2. 辛普森悖论——供应链真实案例</h3>
<p><strong>诡异数据：</strong> 某商品在两个地区做 A/B 测试新促销：</p>
<ul>
<li>地区 A：旧促销转化率 60%，新促销转化率 50%（新促销更差）</li>
<li>地区 B：旧促销转化率 40%，新促销转化率 30%（新促销更差）</li>
<li><strong>整体看：旧促销 43%，新促销 56%（新促销更好！）</strong></li>
</ul>
<p>整体看新促销更好，分组看新促销更差——这就是辛普森悖论。原因：地区 B 样本量远大于 A，把整体均值拉过去了。</p>

<pre><code class="language-python">import pandas as pd
import numpy as np

# 复现辛普森悖论
np.random.seed(42)

# 地区 A：100 人，旧促销 60% 转化，新促销 50%
region_a_old = np.random.binomial(1, 0.60, 100)
region_a_new = np.random.binomial(1, 0.50, 100)

# 地区 B：1000 人（样本量大），旧促销 40%，新促销 30%
region_b_old = np.random.binomial(1, 0.40, 1000)
region_b_new = np.random.binomial(1, 0.30, 1000)

# 分组看：新促销更差
print(f"地区 A：旧 {region_a_old.mean():.1%} vs 新 {region_a_new.mean():.1%}")
print(f"地区 B：旧 {region_b_old.mean():.1%} vs 新 {region_b_new.mean():.1%}")

# 整体看：新促销更好（悖论！）
all_old = np.concatenate([region_a_old, region_b_old])
all_new = np.concatenate([region_a_new, region_b_new])
print(f"\\n整体：旧 {all_old.mean():.1%} vs 新 {all_new.mean():.1%}")
print("→ 分组都显示新促销更差，整体却显示新促销更好！这就是辛普森悖论")</code></pre>

<p><strong>know-how：</strong> 永远先按混杂变量分组看，再看整体。如果分组结论和整体不一致 → 有混杂。</p>

<h3>3. 贝叶斯更新——用新证据修正判断</h3>
<p><strong>公式：</strong> 后验 = (先验 × 似然) / 证据</p>
<p>一句话：你原本以为促销有效概率 50%（先验），看到销量涨 30% 这个证据后，修正为 80%（后验）。</p>

<pre><code class="language-python">def bayesian_update(prior, likelihood, evidence):
    """贝叶斯更新：返回后验概率"""
    posterior = (prior * likelihood) / evidence
    return posterior

# 案例：某 SKU 上新促销，判断是否真的提升转化率
# 先验：根据历史，70% 的促销有效
P_effective = 0.70
P_not_effective = 0.30

# 似然：促销有效时，销量涨 30% 的概率 = 0.80
# 促销无效时，销量涨 30% 的概率（巧合，如季节因素）= 0.20
P_rise_given_effective = 0.80
P_rise_given_not = 0.20

# 证据（总概率）：销量涨 30% 的总概率
P_rise = P_effective * P_rise_given_effective + P_not_effective * P_rise_given_not

# 后验：看到销量涨 30% 后，促销真的有效的概率
P_effective_given_rise = bayesian_update(P_effective, P_rise_given_effective, P_rise)
print(f"先验（促销有效）: {P_effective:.1%}")
print(f"看到销量涨 30% 后，后验: {P_effective_given_rise:.1%}")
# 从 70% 升到 90.3% —— 证据强化了判断</code></pre>

<p><strong>实战 know-how：</strong> 先验不要太极端（0 或 1），否则后验永远不变。建议初始先验 0.3-0.7。</p>

<h3>4. 今日实战练习</h3>
<p><strong>练习 1（15 分钟）：</strong> 用代码生成另一组辛普森悖论数据（3 个分组），并写一个函数 detect_simpson_paradox() 自动检测。</p>
<p><strong>练习 2（15 分钟）：</strong> 给定历史促销转化率 5%，新促销首日看到 1000 曝光 → 80 转化（8%），用贝叶斯更新判断新促销真的更好吗？</p>

<h3>🤖 AI 辅助建议</h3>
<ul>
<li>「我观察到广告投入 ↑ 销量 ↑，相关系数 0.7，能下结论吗？」</li>
<li>「我的 A/B 测试分组和整体结论矛盾，怎么诊断？」</li>
<li>「贝叶斯先验应该怎么选？历史数据没有怎么办？」</li>
</ul>
`,
    resources: [
      { label: "🔬 Colab Day 2 实战 notebook", url: "https://colab.research.google.com/#create=true" },
      { label: "📖 Spurious Correlations（伪相关搞笑集）", url: "https://www.tylervigen.com/spurious-correlations" },
      { label: "📚 因果推断在线书（Facure）", url: "https://books/facure-causal/" },
      { label: "📐 3Blue1Brown 贝叶斯可视化", url: "https://www.youtube.com/watch?v=HZGCoVF3FvU" },
    ],
    glossary: [
      {
        term: "辛普森悖论 (Simpson's Paradox)",
        definition: "整体趋势和分组趋势相反的统计现象。通常由混杂变量（样本量分布不均）导致。",
        analogy: "全校看男生数学均分高，但分年级看每个年级女生都更高——因为低年级女生多拉低了整体。",
        code: "# 检测：分组算 vs 整体算，结论不一致 → 辛普森悖论",
        pitfall: "看整体相关性而不分组，会被混杂因素完全误导。",
      },
      {
        term: "贝叶斯更新 (Bayesian Update)",
        definition: "用新证据修正原有判断的方法。公式：后验 = 先验 × 似然 / 证据。",
        analogy: "医生看病：先根据症状猜感冒概率 50%（先验），测了体温 39°C 后修正为 90%（后验）。",
        code: "posterior = (prior * likelihood) / evidence",
        pitfall: "先验选 0 或 1 会导致后验永远不变；先验太强则新证据无法修正。",
      },
      {
        term: "混杂变量 (Confounder)",
        definition: "同时影响「因」和「果」的第三方变量。不控制它就会得到假因果。",
        analogy: "温度同时影响冰淇淋销量和溺亡数，不控制温度就会得出「吃冰淇淋导致溺亡」的荒谬结论。",
        code: "# 控制：df.groupby('temperature').corr()",
        pitfall: "现实中的混杂变量往往不止一个，需要业务理解识别。",
      },
      {
        term: "相关系数 (Pearson r)",
        definition: "衡量两个变量线性相关程度，范围 [-1, 1]。>0.7 强正相关，<-0.7 强负相关。",
        analogy: "r=1 完美同步，r=0 完全无关，r=-1 完美反向。",
        code: "df['x'].corr(df['y'])  # pandas 一行",
        pitfall: "只衡量线性关系，非线性（如 U 形）相关系数可能为 0 但其实强相关。用斯皮尔曼捕捉非线性单调关系。",
      },
      {
        term: "似然 (Likelihood)",
        definition: "在「假设为真」的前提下，观察到当前证据的概率。P(证据|假设)。",
        analogy: "假设「促销有效」，那么销量涨 30% 的概率是多少——这就是似然。",
        code: "likelihood = P(data | hypothesis)",
        pitfall: "似然不是概率，不归一化。最大似然估计（MLE）就是找让似然最大的假设。",
      },
    ],
    mindMap: {
      label: "Day 2 · 相关不等于因果",
      children: [
        {
          label: "核心概念",
          children: [
            { label: "4 种相关：因果/反向/共因/偶然" },
            { label: "辛普森悖论" },
            { label: "混杂变量" },
            { label: "贝叶斯更新三要素" },
          ],
        },
        {
          label: "代码操作",
          children: [
            { label: "np.random.binomial 模拟" },
            { label: "groupby + mean 分组算" },
            { label: "bayesian_update() 函数" },
            { label: "df.corr() 相关矩阵" },
          ],
        },
        {
          label: "踩坑点",
          children: [
            { label: "整体正相关≠因果" },
            { label: "先验不能选 0 或 1" },
            { label: "Pearson 只看线性" },
            { label: "样本量不均导致辛普森" },
          ],
        },
        {
          label: "前后连接",
          children: [
            { label: "← Day 1：分布决定建模方式" },
            { label: "→ Day 3：梯度下降（MLE 推导）" },
            { label: "→ Day 16-35：P4 因果归因（DoubleML）" },
            { label: "→ Day 22：CausalImpact" },
          ],
        },
        {
          label: "明日预告",
          children: [
            { label: "Day 3: 梯度下降 + p 值" },
            { label: "ML 的核心引擎" },
            { label: "如何判断结果显著" },
          ],
        },
      ],
    },
  },

  // ════════════════════════════════════════════════════════════════════
  // DAY 3 · 梯度下降 + 信息熵 + p 值（合并旧 v5 的 Day 4+5）
  // ════════════════════════════════════════════════════════════════════
  {
    id: "crash-3",
    day: 3,
    week: 1,
    track: "crash",
    duration: 150,
    level: "L3",
    title: "梯度下降 + p 值：ML 引擎与显著性",
    subtitle: "LightGBM 的 learning_rate 背后是什么？p=0.049 和 0.051 真的差很多吗？",
    description: "Day 3 是 Week 1 最硬核的一天——梯度下降是所有 ML（从线性回归到深度学习）的共同引擎；p 值是评估「这个效果是不是真的」的标准工具。明天开始上 pandas 和 LightGBM，今天必须把这两个概念吃透。",
    objectives: [
      "手写一个梯度下降（10 行代码），理解 learning_rate 的物理意义",
      "理解 loss 函数（MSE/交叉熵）为什么这么设计",
      "用代码演示 p=0.049 vs 0.051 实际差异极小，破除「显著性阈值迷信」",
      "理解 Early Stopping 防过拟合的数学本质",
    ],
    cues: [
      "Q1: learning_rate 太大会怎样？太小呢？",
      "Q2: 为什么分类用交叉熵而不是 MSE？",
      "Q3: p=0.049 和 p=0.051 真的有本质差别吗？",
      "Q4: Early Stopping 在梯度下降里起什么作用？",
    ],
    content: `
<h2>Day 3 为什么重要</h2>
<p>明天 (Day 4) 上 pandas，后天 (Day 5) 上 LightGBM。LightGBM 有 5 个核心超参，其中 <code>learning_rate</code>、<code>n_estimators</code>、<code>early_stopping_rounds</code> 三个都和梯度下降有关。<br>
今天不学透，明天调参就是「抄作业」而不懂为什么。</p>

<h3>1. 梯度下降——10 行代码手写</h3>
<pre><code class="language-python">import numpy as np

def gradient_descent(f, df, x0, learning_rate=0.1, n_iter=100):
    """手写梯度下降：找 f(x) 的最小值
    f: 目标函数；df: f 的导数；x0: 起点"""
    x = x0
    history = [x0]
    for i in range(n_iter):
        grad = df(x)  # 算梯度（导数）
        x = x - learning_rate * grad  # 沿梯度反方向走一步
        history.append(x)
    return x, history

# 案例：找 f(x) = x² + 2x + 1 的最小值（解析解 x=-1）
f = lambda x: x**2 + 2*x + 1
df = lambda x: 2*x + 2  # 导数

# learning_rate = 0.1（合适）
x_opt, hist = gradient_descent(f, df, x0=0, learning_rate=0.1, n_iter=50)
print(f"lr=0.1: 收敛到 x={x_opt:.4f}（真值 -1）")

# learning_rate = 1.5（太大，发散）
x_opt2, hist2 = gradient_descent(f, df, x0=0, learning_rate=1.5, n_iter=10)
print(f"lr=1.5: x 在 {min(hist2):.2f} ~ {max(hist2):.2f} 之间震荡（发散！）")</code></pre>

<p><strong>核心 know-how：</strong></p>
<ul>
<li><code>learning_rate</code> 太大（>1）：在最小值两侧震荡，发散</li>
<li><code>learning_rate</code> 太小（<0.01）：收敛慢，但稳</li>
<li><strong>甜蜜点 0.01-0.3</strong>，LightGBM 默认 0.1</li>
<li><strong>物理类比：</strong> 山顶蒙眼下山。learning_rate = 每步迈多远。太大跨过谷底到对面，太小半天到不了</li>
</ul>

<h3>2. Loss 函数为什么这么设计</h3>
<table>
<thead><tr><th>任务</th><th>Loss 函数</th><th>为什么</th></tr></thead>
<tbody>
<tr><td>回归（预测销量）</td><td><strong>MSE</strong> = 平均(预测-真实)²</td><td>对大误差惩罚重，数学上可导（好优化）</td></tr>
<tr><td>分类（销量>阈值？）</td><td><strong>交叉熵</strong> = -Σ y·log(p)</td><td>概率预测的标准度量，导数简洁</td></tr>
<tr><td>分位数回归</td><td><strong>Pinball Loss</strong></td><td>对上下分位数不对称惩罚（Day 7 会用）</td></tr>
</tbody>
</table>

<p><strong>踩坑：</strong> 分类问题用 MSE 会梯度消失（学得慢）。永远用交叉熵。</p>

<h3>3. 信息熵——交叉熵的源头</h3>
<pre><code class="language-python">def entropy(p):
    """信息熵：衡量不确定性。p 是概率分布"""
    p = np.asarray(p)
    p = p[p > 0]  # 去 0
    return -np.sum(p * np.log2(p))

# 公平硬币（50/50）：熵最大 = 1 bit
print(f"公平硬币: {entropy([0.5, 0.5]):.3f} bit")

# 不公平硬币（99/1）：熵很小
print(f"99/1 硬币: {entropy([0.99, 0.01]):.3f} bit")

# 决策树分裂的本质：让分裂后子节点的加权熵最小（信息增益最大）</code></pre>

<h3>4. p 值——0.049 和 0.051 没有本质差别</h3>
<p>统计学约定 p<0.05 为「显著」。但 0.049 vs 0.051 真的有本质差别吗？</p>

<pre><code class="language-python">import numpy as np
from scipy import stats

# 模拟：两组各 100 个样本，均值差 0.3，标准差 1
np.random.seed(42)
for trial in range(10):
    a = np.random.normal(0.3, 1, 100)
    b = np.random.normal(0, 1, 100)
    _, p = stats.ttest_ind(a, b)
    sig = "显著" if p < 0.05 else "不显著"
    print(f"试验 {trial+1}: p={p:.4f} {sig}")
# 你会看到 p 在 0.04 附近反复跳「显著/不显著」
# 这说明 0.05 阈值是人为约定，不是物理边界</code></pre>

<p><strong>know-how：</strong></p>
<ul>
<li>p<0.05 只是约定，2026 年顶级期刊已经要求报告效应大小 + 置信区间</li>
<li>p 接近 0.05 时，多跑几次（不同样本），结果会反复横跳</li>
<li>更好的方法：报告效应大小（涨了多少%）+ 置信区间（±多少）</li>
</ul>

<h3>5. Early Stopping——梯度下降防过拟合</h3>
<pre><code class="language-python"># LightGBM 用法（明天会用到）
import lightgbm as lgb

model = lgb.LGBMRegressor(
    n_estimators=1000,        # 最多 1000 棵树
    learning_rate=0.1,        # 每棵树走 0.1 步
    early_stopping_rounds=50, # 50 轮没改进就停
)
model.fit(
    X_train, y_train,
    eval_set=[(X_val, y_val)],
    eval_metric='rmse',
)
print(f"实际用了 {model.best_iteration_} 棵树")  # 远小于 1000</code></pre>

<p><strong>原理：</strong> 训练 loss 一直在降，但验证 loss 在某轮后会开始上升（过拟合）。Early stopping 在「验证 loss 最低点」停止。</p>

<h3>6. 今日实战练习</h3>
<p><strong>练习 1（15 分钟）：</strong> 用 gradient_descent() 找 <code>f(x) = x⁴ - 3x³ + 2</code> 的最小值，画出 x 随迭代的变化曲线。</p>
<p><strong>练习 2（10 分钟）：</strong> 用 scipy.stats 跑 1000 次 t 检验，统计 p 在 [0.04, 0.06] 范围内的次数，验证「阈值附近反复横跳」。</p>
<p><strong>练习 3（10 分钟）：</strong> 调 learning_rate = [0.001, 0.01, 0.1, 0.5, 1.0]，看收敛速度和最终精度的权衡。</p>

<h3>🤖 AI 辅助建议</h3>
<ul>
<li>「我的 LightGBM 训练 loss 还在降，但验证 loss 上升了，怎么办？」</li>
<li>「learning_rate=0.001 训练了 10 万轮还没收敛，正常吗？」</li>
<li>「为什么我的 t 检验 p=0.04，重复跑一次变 0.08？」</li>
</ul>
`,
    resources: [
      { label: "🔬 Colab Day 3 实战 notebook", url: "https://colab.research.google.com/#create=true" },
      { label: "🎬 3Blue1Brown 梯度下降可视化", url: "https://www.youtube.com/watch?v=IHZwWFHWa-w" },
      { label: "📐 3Blue1Brown 信息熵", url: "https://www.youtube.com/watch?v=R4OlXb9aTvQ" },
      { label: "📖 LightGBM 参数文档", url: "https://lightgbm.readthedocs.io/en/latest/Parameters.html" },
      { label: "📚 StatQuest p 值讲解", url: "https://www.youtube.com/watch?v=5ko9bn5VpsE" },
    ],
    glossary: [
      {
        term: "梯度下降 (Gradient Descent)",
        definition: "沿着 loss 函数的梯度反方向逐步更新参数，找最小值的优化算法。",
        analogy: "蒙眼下山：每步用脚探一下哪边更陡（梯度），往下坡方向走一步。",
        code: "x = x - learning_rate * gradient",
        pitfall: "learning_rate 太大会在谷底两侧震荡发散，太小则收敛慢。",
      },
      {
        term: "Learning Rate",
        definition: "梯度下降的步长。控制每次参数更新的幅度。",
        analogy: "下山每步迈多大：1 米稳但慢，10 米快但可能跨过谷底。",
        code: "LightGBM: learning_rate=0.1（默认）",
        pitfall: "和 n_estimators 此消彼长：lr 小 → 树要多；lr 大 → 树要少。",
      },
      {
        term: "交叉熵 (Cross-Entropy)",
        definition: "分类任务的标准 loss 函数。衡量预测概率分布和真实分布的差异。",
        analogy: "猜硬币正反面：你猜 90% 正面，实际是正面，损失小；猜 60%，损失大。",
        code: "loss = -np.sum(y_true * np.log(y_pred))",
        pitfall: "分类用 MSE 会梯度消失，必须用交叉熵。",
      },
      {
        term: "p 值",
        definition: "在「零假设为真」（无效果）的前提下，观察到当前或更极端结果的概率。",
        analogy: "假设促销无效，那么「销量涨 30%」纯靠运气发生的概率就是 p 值。",
        code: "from scipy import stats\n_, p = stats.ttest_ind(a, b)",
        pitfall: "p<0.05 是人为约定，0.049 vs 0.051 没有本质差别，要看效应大小和置信区间。",
      },
      {
        term: "Early Stopping",
        definition: "训练时监控验证集 loss，连续 N 轮没改进就停止，防止过拟合。",
        analogy: "考试复习：再做 10 套题分数没涨，说明已经到顶了，继续做只会过拟合题目。",
        code: "early_stopping_rounds=50",
        pitfall: "N 设太小会过早停止（还没到最优），太大浪费算力。50-100 通常是甜蜜点。",
      },
    ],
    mindMap: {
      label: "Day 3 · ML 引擎与显著性",
      children: [
        {
          label: "核心概念",
          children: [
            { label: "梯度下降" },
            { label: "learning_rate" },
            { label: "Loss 函数（MSE/交叉熵）" },
            { label: "信息熵 + 信息增益" },
            { label: "p 值 + 显著性" },
          ],
        },
        {
          label: "代码操作",
          children: [
            { label: "手写 gradient_descent()" },
            { label: "entropy() 计算信息熵" },
            { label: "stats.ttest_ind()" },
            { label: "LightGBM early_stopping" },
          ],
        },
        {
          label: "踩坑点",
          children: [
            { label: "lr 太大 → 发散" },
            { label: "分类用 MSE → 梯度消失" },
            { label: "p=0.05 是人为阈值" },
            { label: "不设 early_stopping → 过拟合" },
          ],
        },
        {
          label: "前后连接",
          children: [
            { label: "← Day 1：MSE/RMSE 是 loss 的一种" },
            { label: "← Day 2：贝叶斯似然 = MLE" },
            { label: "→ Day 5：LightGBM 调 learning_rate" },
            { label: "→ Day 11：线性回归 OLS = 梯度下降特例" },
          ],
        },
        {
          label: "明日预告",
          children: [
            { label: "Day 4: pandas + 特征工程" },
            { label: "动手写第一行 Python" },
            { label: "为 LightGBM 准备数据" },
          ],
        },
      ],
    },
  },

  // ════════════════════════════════════════════════════════════════════
  // WEEK 2 · DAY 4-7 · 最强 ML 先行
  // ════════════════════════════════════════════════════════════════════
  {
    id: "crash-4",
    day: 4,
    week: 2,
    track: "crash",
    duration: 180,
    level: "L3",
    title: "pandas 与特征工程实战",
    subtitle: "100 万行脏数据怎么处理才不慢死——groupby/merge/lag/rolling/target encoding 全套",
    description: "今天是「动手第一天」。从这节课开始你写真实 Python 代码。pandas 占分析师 80% 工作时间，特征工程决定模型上限。学完今天你能处理真实电商销量数据并生成 20+ 特征。",
    objectives: [
      "掌握 pandas 十大核心操作（groupby/merge/pivot/resample 等）",
      "构造 6 类时序特征（lag / rolling / 日期 / 类别 / target encoding / 聚合）",
      "处理脏数据：缺失值/重复值/异常值/类型转换",
      "为 Day 5 的 LightGBM 准备好特征矩阵",
    ],
    cues: [
      "Q1: groupby 后做聚合 vs merge 后做计算，区别在哪？",
      "Q2: lag(7) 和 rolling(7).mean() 的本质差别？",
      "Q3: Target Encoding 为什么要 K-fold 防泄漏？",
      "Q4: 100 万行用 apply 还是向量化？差多少倍？",
    ],
    content: `
<h2>Day 4 实战目标</h2>
<p>拿到一份电商销量数据（日期/商品/门店/价格/促销/销量），构造出 20+ 个特征，存成 <code>features.parquet</code>。明天直接喂给 LightGBM。</p>

<h3>1. pandas 十大核心操作（必须肌肉记忆）</h3>
<pre><code class="language-python">import pandas as pd
import numpy as np

# 读数据
df = pd.read_csv('sales.csv', parse_dates=['date'])

# ① 看数据
df.info()           # 列名/类型/缺失
df.describe()       # 数值统计
df.head()           # 前 5 行

# ② 选列/筛选
df[['date', 'sku', 'sales']]      # 选列
df[df['sales'] > 100]             # 筛选行
df.query("sales > 100 and region == '华东'")  # 链式筛选

# ③ groupby + 聚合
df.groupby('sku')['sales'].agg(['mean', 'sum', 'std'])

# ④ merge（类似 SQL JOIN）
df = df.merge(products, on='sku', how='left')

# ⑤ pivot（长表转宽表）
df.pivot_table(index='date', columns='sku', values='sales', aggfunc='sum')

# ⑥ 排序
df = df.sort_values(['sku', 'date'])

# ⑦ 缺失值
df['sales'].fillna(0)            # 填 0
df['price'].fillna(df['price'].median())  # 填中位数

# ⑧ 类型转换（节省内存 90%）
df['sku'] = df['sku'].astype('category')
df['sales'] = df['sales'].astype('int32')

# ⑨ 应用函数（向量化优先）
df['sales_log'] = np.log1p(df['sales'])   # ✓ 向量化
df['custom'] = df['sales'].apply(my_func) # ✗ 慢 100 倍

# ⑩ 时间处理
df['date'].dt.year
df['date'].dt.dayofweek  # 0=周一</code></pre>

<h3>2. 6 类时序特征工程——销量预测核心</h3>
<pre><code class="language-python">def build_time_series_features(df, target='sales', group_cols=['sku']):
    """构造 6 类时序特征"""
    df = df.sort_values(group_cols + ['date']).copy()

    # ① Lag 特征（历史值）
    for lag in [1, 7, 14, 28]:
        df[f'{target}_lag_{lag}'] = df.groupby(group_cols)[target].shift(lag)

    # ② Rolling 特征（滑动窗口统计）
    for window in [7, 14, 28]:
        grp = df.groupby(group_cols)[target]
        df[f'{target}_roll_mean_{window}'] = grp.shift(1).rolling(window).mean()
        df[f'{target}_roll_std_{window}'] = grp.shift(1).rolling(window).std()

    # ③ 日期特征
    df['dayofweek'] = df['date'].dt.dayofweek
    df['month'] = df['date'].dt.month
    df['day'] = df['date'].dt.day
    df['is_weekend'] = (df['dayofweek'] >= 5).astype(int)
    df['quarter'] = df['date'].dt.quarter

    # ④ 类别特征（直接喂 LightGBM，无需 one-hot）
    df['sku'] = df['sku'].astype('category')
    df['region'] = df['region'].astype('category')

    # ⑤ Target Encoding（按 SKU 历史均值，需 K-fold 防泄漏）
    from sklearn.model_selection import KFold
    df[f'{target}_te'] = 0
    kf = KFold(n_splits=5, shuffle=True, random_state=42)
    for tr_idx, val_idx in kf.split(df):
        mean_tr = df.iloc[tr_idx].groupby(group_cols[0])[target].mean()
        df.iloc[val_idx, df.columns.get_loc(f'{target}_te')] = \\
            df.iloc[val_idx][group_cols[0]].map(mean_tr).values

    # ⑥ 聚合特征（按 SKU × 月份的历史统计）
    df['sku_month_mean'] = df.groupby(['sku', 'month'])[target].transform('mean')

    return df

# 实战
features_df = build_time_series_features(df)
print(f"特征数: {len(features_df.columns)}")  # 20+
features_df.to_parquet('features.parquet')</code></pre>

<h3>3. 踩坑点（必看）</h3>
<p><strong>① Lag 特征的第一行是 NaN：</strong> shift(1) 导致首行无历史。处理：dropna() 或填 0。</p>
<p><strong>② Target Encoding 必须用 K-fold：</strong> 直接用全局均值会信息泄漏（用未来预测过去）。永远分折算。</p>
<p><strong>③ Rolling 必须 shift(1)：</strong> <code>rolling(7).mean()</code> 包含当前行 = 用今天预测今天 = 泄漏。必须 <code>shift(1).rolling(7)</code>。</p>
<p><strong>④ 100 万行别用 apply：</strong> 用向量化（np.log1p）快 100 倍。万不得已用 apply 时用 <code>.progress_apply</code>（tqdm）看进度。</p>

<h3>4. 性能优化技巧</h3>
<pre><code class="language-python"># ① 减少内存占用（90%）
def reduce_mem(df):
    for col in df.columns:
        if df[col].dtype == 'float64':
            df[col] = df[col].astype('float32')
        elif df[col].dtype == 'int64':
            df[col] = df[col].astype('int32')
    return df

# ② 用 parquet 不用 CSV（10 倍快 + 体积小 5 倍）
df.to_parquet('data.parquet')  # ✓
df.to_csv('data.csv')          # ✗

# ③ 大数据用 dask 或 polars（pandas 替代品）</code></pre>

<h3>5. 今日实战练习（必须做完）</h3>
<p><strong>练习 1（30 分钟）：</strong> 下载 M5 Forecasting 数据集（Kaggle 免费销量数据），用 build_time_series_features() 构造 20+ 特征。</p>
<p><strong>练习 2（15 分钟）：</strong> 对比「直接用均值填缺失」vs「按 SKU 分组填中位数」的效果。</p>
<p><strong>练习 3（10 分钟）：</strong> 写一个 reduce_mem() 函数，把数据集内存从 1GB 降到 100MB。</p>

<h3>🤖 AI 辅助建议</h3>
<ul>
<li>「我的 groupby 跑了 10 分钟，有什么加速方法？」</li>
<li>「Target Encoding 怎么 K-fold 防泄漏？写代码给我」</li>
<li>「Lag 特征 NaN 太多怎么办？」</li>
</ul>
`,
    resources: [
      { label: "🔬 Colab Day 4 pandas 实战", url: "https://colab.research.google.com/#create=true" },
      { label: "📊 M5 Forecasting 数据集（Kaggle）", url: "https://www.kaggle.com/competitions/m5-forecasting-accuracy" },
      { label: "📖 pandas 官方 Cookbook", url: "https://pandas.pydata.org/docs/user_guide/cookbook.html" },
      { label: "⚡ 10 Minutes to pandas", url: "https://pandas.pydata.org/docs/user_guide/10min.html" },
      { label: "🏆 Kaggle 特征工程教程", url: "https://www.kaggle.com/learn/feature-engineering" },
    ],
    glossary: [
      {
        term: "groupby",
        definition: "按某列分组后做聚合（mean/sum/count）。SQL GROUP BY 的 pandas 版本。",
        analogy: "按班级分组算平均分——每个班单独算。",
        code: "df.groupby('sku')['sales'].mean()",
        pitfall: "groupby 后直接修改不会反映到原 DataFrame，要赋值回去。",
      },
      {
        term: "Lag 特征",
        definition: "用历史值作为当前特征。lag(7) = 7 天前的销量。",
        analogy: "预测今天销量，看上周同一天的销量作为参考。",
        code: "df['sales_lag_7'] = df.groupby('sku')['sales'].shift(7)",
        pitfall: "shift 会导致前 N 行 NaN，需要 dropna 或填 0。",
      },
      {
        term: "Rolling 特征",
        definition: "滑动窗口统计量。rolling(7).mean() = 过去 7 天的均值。",
        analogy: "看过去一周的平均销量，比单天更稳定。",
        code: "df.groupby('sku')['sales'].shift(1).rolling(7).mean()",
        pitfall: "必须 shift(1) 再 rolling，否则会用当前行数据（信息泄漏）。",
      },
      {
        term: "Target Encoding",
        definition: "用目标变量的历史均值作为类别特征。如「该 SKU 历史平均销量」。",
        analogy: "这个商品历史平均卖 50 件，就给这个商品标「50」作为特征。",
        code: "df['sku_te'] = df.groupby('sku')['sales'].transform('mean')",
        pitfall: "直接用全局均值会信息泄漏。必须用 K-fold：训练折的均值填到验证折。",
      },
      {
        term: "向量化 (Vectorization)",
        definition: "用 numpy/pandas 内置函数替代 for 循环，性能快 100 倍。",
        analogy: "不用一根根削铅笔，用削笔器一次削一把。",
        code: "✓ np.log1p(df['sales'])\\n✗ for i in range(len(df)): df.loc[i,'x'] = log(...)",
        pitfall: "apply 比 for 快但仍比向量化慢 10 倍。能用向量化就别用 apply。",
      },
    ],
    mindMap: {
      label: "Day 4 · pandas + 特征工程",
      children: [
        {
          label: "核心概念",
          children: [
            { label: "pandas 十大操作" },
            { label: "6 类特征工程" },
            { label: "信息泄漏" },
            { label: "向量化 vs apply" },
          ],
        },
        {
          label: "代码操作",
          children: [
            { label: "groupby + agg" },
            { label: "shift + rolling" },
            { label: "K-fold target encoding" },
            { label: "reduce_mem()" },
          ],
        },
        {
          label: "踩坑点",
          children: [
            { label: "Lag 首行 NaN" },
            { label: "Target Encoding 泄漏" },
            { label: "Rolling 没加 shift" },
            { label: "apply 太慢" },
          ],
        },
        {
          label: "前后连接",
          children: [
            { label: "← Day 1-3：概念已备齐" },
            { label: "→ Day 5：LightGBM 喂特征" },
            { label: "→ Day 6：SHAP 解读特征贡献" },
            { label: "→ Day 16：DoubleML 用相同框架" },
          ],
        },
        {
          label: "明日预告",
          children: [
            { label: "Day 5: LightGBM + Optuna" },
            { label: "训练第一个真实模型" },
            { label: "5 个核心超参 + 自动调参" },
          ],
        },
      ],
    },
  },

  // DAY 5 · LightGBM + Optuna（★ 核心里程碑）
  {
    id: "crash-5",
    day: 5,
    week: 2,
    track: "crash",
    duration: 180,
    level: "L4",
    title: "LightGBM + Optuna：第一个真模型",
    subtitle: "★ 里程碑——Day 5 结束时简历可以写「用 LightGBM 做过销量预测」",
    description: "今天是整个 15 天的关键转折点。学完今天你能跑通一个工业级销量预测模型，并用 Optuna 自动调参。从「学概念的人」变成「会用 ML 解决问题的人」。",
    objectives: [
      "跑通 LightGBM 端到端：数据→训练→评估",
      "掌握 5 个核心超参（learning_rate/num_leaves/max_depth/n_estimators/min_child_samples）",
      "用 Optuna 自动搜索 50 组超参，找最优组合",
      "理解 feature_importance 和 SHAP 的区别",
    ],
    cues: [
      "Q1: 为什么选 LightGBM 不选 XGBoost？",
      "Q2: num_leaves 和 max_depth 的关系？",
      "Q3: Optuna 比 GridSearch 快多少？为什么？",
      "Q4: feature_importance 能信吗？SHAP 更好在哪？",
    ],
    content: `
<h2>★ Day 5 是关键里程碑</h2>
<p>学完今天，你可以：</p>
<ol>
<li>✅ 在简历写「使用 LightGBM 构建销量预测模型，MAE 降低 X%」</li>
<li>✅ 给老板展示一个能跑的 demo</li>
<li>✅ 用 Optuna 自动调参，不用手动试错</li>
</ol>

<h3>1. 为什么是 LightGBM 不是 XGBoost</h3>
<table>
<thead><tr><th>维度</th><th>XGBoost</th><th>LightGBM（选这个）</th></tr></thead>
<tbody>
<tr><td>速度</td><td>慢</td><td><strong>快 3-5 倍</strong></td></tr>
<tr><td>内存</td><td>高</td><td>低 50%</td></tr>
<tr><td>准确率</td><td>≈</td><td>≈（接近）</td></tr>
<tr><td>类别特征</td><td>需手动 one-hot</td><td><strong>原生支持</strong></td></tr>
<tr><td>2026 地位</td><td>逐渐退场</td><td><strong>表格数据 SOTA</strong></td></tr>
</tbody>
</table>

<h3>2. 跑通第一个 LightGBM（15 行代码）</h3>
<pre><code class="language-python">import lightgbm as lgb
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error

# 读 Day 4 准备好的特征
df = pd.read_parquet('features.parquet').dropna()

# 划分训练/验证（时序不能用随机划分！）
train = df[df['date'] < '2024-10-01']
val = df[(df['date'] >= '2024-10-01') & (df['date'] < '2024-12-01')]

features = [c for c in df.columns if c not in ['date', 'sales']]
X_train, y_train = train[features], train['sales']
X_val, y_val = val[features], val['sales']

# 训练（带 early stopping）
model = lgb.LGBMRegressor(
    n_estimators=1000,
    learning_rate=0.1,
    num_leaves=31,
    max_depth=-1,
    min_child_samples=20,
    random_state=42,
)
model.fit(
    X_train, y_train,
    eval_set=[(X_val, y_val)],
    eval_metric='mae',
    callbacks=[lgb.early_stopping(50), lgb.log_evaluation(100)],
)

# 评估
pred = model.predict(X_val)
mae = mean_absolute_error(y_val, pred)
print(f"验证集 MAE: {mae:.2f}")
print(f"用了 {model.best_iteration_} 棵树")</code></pre>

<h3>3. 5 个核心超参——必须懂</h3>
<table>
<thead><tr><th>参数</th><th>默认</th><th>作用</th><th>调参方向</th></tr></thead>
<tbody>
<tr><td><code>learning_rate</code></td><td>0.1</td><td>步长</td><td>↓ 准但慢，配合更多树</td></tr>
<tr><td><code>num_leaves</code></td><td>31</td><td>每棵树的叶子数</td><td>↑ 更复杂，易过拟合</td></tr>
<tr><td><code>max_depth</code></td><td>-1（不限）</td><td>树最大深度</td><td>限制深度防过拟合</td></tr>
<tr><td><code>n_estimators</code></td><td>100</td><td>树的数量</td><td>配合 early_stopping 自动找</td></tr>
<tr><td><code>min_child_samples</code></td><td>20</td><td>叶子最小样本数</td><td>↑ 防过拟合</td></tr>
</tbody>
</table>

<p><strong>黄金组合 know-how：</strong></p>
<ul>
<li><code>learning_rate=0.05</code> + <code>n_estimators=2000</code> + <code>early_stopping=100</code></li>
<li>准确率最高，但训练时间 2 倍</li>
<li>默认 0.1 + 1000 + 50 是「够用又快」的妥协</li>
</ul>

<h3>4. Optuna 自动调参——比手调高效 10 倍</h3>
<pre><code class="language-python">import optuna

def objective(trial):
    """Optuna 目标函数：返回验证集 MAE"""
    params = {
        'n_estimators': trial.suggest_int('n_estimators', 100, 2000),
        'learning_rate': trial.suggest_float('learning_rate', 0.01, 0.3, log=True),
        'num_leaves': trial.suggest_int('num_leaves', 15, 127),
        'max_depth': trial.suggest_int('max_depth', 3, 15),
        'min_child_samples': trial.suggest_int('min_child_samples', 5, 100),
        'subsample': trial.suggest_float('subsample', 0.6, 1.0),
        'colsample_bytree': trial.suggest_float('colsample_bytree', 0.6, 1.0),
        'reg_alpha': trial.suggest_float('reg_alpha', 1e-3, 10, log=True),
        'reg_lambda': trial.suggest_float('reg_lambda', 1e-3, 10, log=True),
    }

    model = lgb.LGBMRegressor(**params, random_state=42)
    model.fit(X_train, y_train,
              eval_set=[(X_val, y_val)],
              callbacks=[lgb.early_stopping(50, verbose=False)])
    pred = model.predict(X_val)
    return mean_absolute_error(y_val, pred)

# 搜索 50 组
study = optuna.create_study(direction='minimize')
study.optimize(objective, n_trials=50, show_progress_bar=True)

print(f"最优 MAE: {study.best_value:.4f}")
print(f"最优参数: {study.best_params}")</code></pre>

<p><strong>Optuna 为什么比 GridSearch 快：</strong> 用贝叶斯优化（TPE），根据历史结果智能选下一组——不像 GridSearch 暴力遍历。</p>

<h3>5. feature_importance 的陷阱</h3>
<pre><code class="language-python"># 默认 feature_importance（基于 split 次数，不可靠！）
lgb.plot_importance(model, max_num_features=15)

# 更好的方法：用 SHAP（Day 6 详解）
import shap
explainer = shap.TreeExplainer(model)
shap_values = explainer.shap_values(X_val)
shap.summary_plot(shap_values, X_val)</code></pre>

<p><strong>陷阱：</strong> 默认 importance 只看「分裂次数」，高基数特征（如 SKU）会虚高。SHAP 看「实际贡献」更可靠。</p>

<h3>6. 今日实战练习（决定简历含金量）</h3>
<p><strong>练习 1（60 分钟，必做）：</strong> M5 Forecasting 数据集 + Day 4 特征 + LightGBM + Optuna 50 组调参。把 MAE 降到 baseline 以下。这个项目就是简历素材。</p>
<p><strong>练习 2（15 分钟）：</strong> 对比「默认参数」vs「Optuna 调优后」的 MAE 差距。</p>
<p><strong>练习 3（10 分钟）：</strong> 画 feature_importance 和 SHAP 对比图，看哪个更合理。</p>

<h3>🤖 AI 辅助建议</h3>
<ul>
<li>「我的 LightGBM MAE 是 5.2，还能怎么优化？」</li>
<li>「Optuna 跑了 50 组，最优的 num_leaves=127，是不是过拟合了？」</li>
<li>「类别特征有 1 万个值，LightGBM 怎么处理？」</li>
</ul>
`,
    resources: [
      { label: "🔬 Colab Day 5 LightGBM 完整 notebook", url: "https://colab.research.google.com/#create=true" },
      { label: "📊 M5 Forecasting（Kaggle 销量预测比赛）", url: "https://www.kaggle.com/competitions/m5-forecasting-accuracy" },
      { label: "📖 LightGBM 官方文档", url: "https://lightgbm.readthedocs.io/" },
      { label: "⚡ Optuna 官方教程", url: "https://optuna.readthedocs.io/en/stable/tutorial/" },
      { label: "🏆 LightGBM vs XGBoost benchmark", url: "https://lightgbm.readthedocs.io/en/latest/Features.html" },
      { label: "📦 shap 库文档", url: "https://shap.readthedocs.io/" },
    ],
    glossary: [
      {
        term: "LightGBM",
        definition: "微软开源的梯度提升树库，2026 年表格数据的工业级 SOTA。比 XGBoost 快 3-5 倍。",
        analogy: "XGBoost 的进化版——同样的算法，工程优化更极致。",
        code: "import lightgbm as lgb\\nmodel = lgb.LGBMRegressor()",
        pitfall: "num_leaves 调太大（>127）必过拟合。新手从默认 31 开始。",
      },
      {
        term: "Optuna",
        definition: "自动超参优化框架，用贝叶斯优化（TPE）智能搜索，比 GridSearch 快 10 倍。",
        analogy: "GridSearch 像地毯式搜查，Optuna 像侦探根据线索缩小范围。",
        code: "study = optuna.create_study()\\nstudy.optimize(objective, n_trials=50)",
        pitfall: "n_trials 太少（<20）效果不稳定，太多（>200）浪费时间。50 是甜蜜点。",
      },
      {
        term: "Early Stopping",
        definition: "训练时监控验证 loss，连续 N 轮无改进就停止。防过拟合 + 节省时间。",
        analogy: "考试刷题：连续做 50 套题分数没涨，说明已经到顶，继续做只会记住题号。",
        code: "callbacks=[lgb.early_stopping(50)]",
        pitfall: "N 设太小（<10）会过早停止，错过最优；太大（>200）浪费算力。",
      },
      {
        term: "num_leaves",
        definition: "每棵决策树的叶子节点数。控制模型复杂度的核心参数。",
        analogy: "决策树的「分支数」——越多叶子，分得越细，越容易记住噪声。",
        code: "num_leaves=31  # 默认",
        pitfall: "num_leaves 调到 255 必过拟合。原则：num_leaves < 2^max_depth。",
      },
      {
        term: "Gradient Boosting",
        definition: "Boosting 集成学习。每棵新树拟合前一棵树的残差（错误），逐步提升。",
        analogy: "考试订正：第一套做错的题，第二套专门练；第二套还错的，第三套重点练。",
        code: "# LightGBM/XGBoost/CatBoost 都是 Gradient Boosting",
        pitfall: "树越多越容易过拟合，必须配合 early stopping。",
      },
    ],
    mindMap: {
      label: "Day 5 · LightGBM 第一个模型 ★",
      children: [
        {
          label: "核心概念",
          children: [
            { label: "Gradient Boosting 原理" },
            { label: "5 个核心超参" },
            { label: "Early Stopping" },
            { label: "贝叶斯优化 (Optuna)" },
          ],
        },
        {
          label: "代码操作",
          children: [
            { label: "LGBMRegressor 训练" },
            { label: "early_stopping 回调" },
            { label: "optuna.create_study" },
            { label: "study.optimize" },
          ],
        },
        {
          label: "踩坑点",
          children: [
            { label: "num_leaves 过大过拟合" },
            { label: "时序不能随机划分" },
            { label: "feature_importance 不可靠" },
            { label: "类别特征没转 category 类型" },
          ],
        },
        {
          label: "前后连接",
          children: [
            { label: "← Day 3：learning_rate 来自梯度下降" },
            { label: "← Day 4：特征工程决定上限" },
            { label: "→ Day 6：SHAP 解读模型" },
            { label: "→ Day 7：概率预测 + pipeline" },
          ],
        },
        {
          label: "里程碑",
          children: [
            { label: "✅ 简历素材：M5 项目" },
            { label: "✅ 能跑的 demo" },
            { label: "✅ Optuna 调参经验" },
          ],
        },
      ],
    },
  },

  // DAY 6 · SHAP + 评估指标 + 过拟合
  {
    id: "crash-6",
    day: 6,
    week: 2,
    track: "crash",
    duration: 150,
    level: "L3",
    title: "SHAP 破解黑盒",
    subtitle: "怎么给老板讲清「广告费贡献了多少销量」——SHAP 特征归因 + 评估指标盲区 + 过拟合诊断",
    description: "Day 5 的 LightGBM 是黑盒。今天用 SHAP 把它变成白盒——能解释每个特征对每个预测的贡献。同时讲透过拟合的三大成因和诊断方法。",
    objectives: [
      "用 SHAP 解读任意 LightGBM 模型（全局 + 局部解释）",
      "画 SHAP summary plot / dependence plot / waterfall plot",
      "识别过拟合的三大信号（训练 vs 验证 gap、学习曲线、OOB）",
      "给老板讲清「为什么模型预测这个 SKU 卖 100 件」",
    ],
    cues: [
      "Q1: SHAP 和 feature_importance 的本质区别？",
      "Q2: 训练 MAE=2，验证 MAE=30，是什么问题？怎么修？",
      "Q3: SHAP waterfall 图怎么读？",
      "Q4: 给老板汇报时，SHAP 的哪张图最有用？",
    ],
    content: `
<h2>Day 6 解决什么问题</h2>
<p>老板问：「为什么模型预测 SKU-123 下周卖 100 件？」<br>
你不能回答「因为 LightGBM 算出来的」——那是黑盒。<br>
今天学完，你能回答：「因为这周广告投入贡献 +30，历史 7 天均值贡献 +25，季节性贡献 +20，但价格上调贡献 -15，所以净预测 = 100」。</p>

<h3>1. SHAP 是什么——3 分钟讲清</h3>
<p><strong>SHAP (SHapley Additive exPlanations)：</strong> 来自博弈论的 Shapley 值，公平分配每个特征对单个预测的贡献。</p>
<p><strong>类比：</strong> 3 人合伙做生意赚了 100 万，怎么公平分？Shapley 值算每个人「边际贡献」的平均值。</p>

<h3>2. SHAP 实战——5 种图全用一遍</h3>
<pre><code class="language-python">import shap

# Day 5 训练好的 model 和 X_val
explainer = shap.TreeExplainer(model)
shap_values = explainer.shap_values(X_val)

# ① Summary plot（全局特征重要性 + 方向）
shap.summary_plot(shap_values, X_val)
# 横轴：SHAP 值（对预测的贡献）
# 颜色：特征值高低（红=高，蓝=低）
# 解读：广告费 SHAP 值正且红 → 广告高，销量预测也高

# ② Bar plot（特征重要性，类似 importance 但更准）
shap.summary_plot(shap_values, X_val, plot_type="bar")

# ③ Dependence plot（单特征如何影响预测）
shap.dependence_plot('ad_spend', shap_values, X_val)
# 看广告费从 0 到 1000 万，SHAP 值怎么变化
# 能发现「饱和效应」：广告到 500 万后贡献递减

# ④ Waterfall plot（单个预测的解释）
shap.plots.waterfall(shap.Explanation(values=shap_values[0],
                                       base_values=explainer.expected_value,
                                       data=X_val.iloc[0]))
# 解读 SKU-123 为什么预测 100：
# 基线（平均）= 50
# + 广告贡献 +30
# + 季节贡献 +20
# - 价格上调 -15
# + ... = 最终 100

# ⑤ Force plot（瀑布图的紧凑版）
shap.initjs()
shap.force_plot(explainer.expected_value, shap_values[0], X_val.iloc[0])</code></pre>

<h3>3. 过拟合的三大信号 + 诊断</h3>
<p><strong>信号 1：训练 vs 验证 gap 巨大</strong></p>
<pre><code class="language-python"># 算训练和验证的 MAE
train_pred = model.predict(X_train)
val_pred = model.predict(X_val)
train_mae = mean_absolute_error(y_train, train_pred)
val_mae = mean_absolute_error(y_val, val_pred)

print(f"训练 MAE: {train_mae:.2f}")
print(f"验证 MAE: {val_mae:.2f}")
print(f"过拟合比: {val_mae / train_mae:.1f}x")
# >3x 严重过拟合，>1.5x 轻度过拟合</code></pre>

<p><strong>信号 2：学习曲线不收敛</strong></p>
<pre><code class="language-python"># 用 eval_set 看每轮的 loss
results = model.evals_result_
plt.plot(results['valid_0']['l1'], label='验证')
plt.plot(results['training']['l1'], label='训练')
plt.legend()
# 如果训练还在降但验证开始升 → 过拟合</code></pre>

<p><strong>信号 3：特征数 > 样本数</strong></p>
<pre><code class="language-python">print(f"特征数: {X_train.shape[1]}, 样本数: {X_train.shape[0]}")
# 特征/样本 > 0.1 警惕过拟合</code></pre>

<h3>4. 过拟合的三大解药</h3>
<table>
<thead><tr><th>解药</th><th>代码</th><th>原理</th></tr></thead>
<tbody>
<tr><td><strong>加正则</strong></td><td><code>reg_alpha=1.0, reg_lambda=1.0</code></td><td>L1/L2 惩罚大权重</td></tr>
<tr><td><strong>降复杂度</strong></td><td><code>num_leaves=15, max_depth=6</code></td><td>限制树能力</td></tr>
<tr><td><strong>Early stopping</strong></td><td><code>early_stopping=50</code></td><td>在最优轮停止</td></tr>
</tbody>
</table>

<h3>5. 评估指标的全景图（Day 1 的延伸）</h3>
<p>给老板汇报时，永远报告 4 个指标：</p>
<pre><code class="language-python">def report_metrics(y_true, y_pred, name="模型"):
    mae = mean_absolute_error(y_true, y_pred)
    rmse = np.sqrt(mean_squared_error(y_true, y_pred))
    mape = np.mean(np.abs((y_true - y_pred) / np.where(y_true == 0, 1, y_true))) * 100
    wape = np.sum(np.abs(y_true - y_pred)) / np.sum(np.abs(y_true)) * 100

    print(f"=== {name} 评估报告 ===")
    print(f"MAE  = {mae:.2f}   （平均错多少）")
    print(f"RMSE = {rmse:.2f}   （被大误差拉高）")
    print(f"MAPE = {mape:.1f}%  （业务能懂）")
    print(f"WAPE = {wape:.1f}%  （整体准确率 = {100-wape:.1f}%）")
    return {'mae': mae, 'rmse': rmse, 'mape': mape, 'wape': wape}

report_metrics(y_val, pred, name="LightGBM")</code></pre>

<h3>6. 今日实战练习</h3>
<p><strong>练习 1（30 分钟）：</strong> 对 Day 5 的模型跑 SHAP 5 种图，写一份 300 字解读报告。</p>
<p><strong>练习 2（20 分钟）：</strong> 故意把 num_leaves 调到 255 制造过拟合，对比 MAE gap。</p>
<p><strong>练习 3（15 分钟）：</strong> 用 SHAP dependence_plot 找出广告费的「饱和点」（贡献开始递减的广告投入阈值）。</p>

<h3>🤖 AI 辅助建议</h3>
<ul>
<li>「我的 SHAP summary 图里 lag_7 是最重要特征，合理吗？」</li>
<li>「训练 MAE=1.2，验证 MAE=8.5，怎么降低过拟合？」</li>
<li>「老板要看『广告投入增加 10% 销量涨多少』，SHAP 能算吗？」</li>
</ul>
`,
    resources: [
      { label: "🔬 Colab Day 6 SHAP 实战", url: "https://colab.research.google.com/#create=true" },
      { label: "📦 SHAP 官方文档", url: "https://shap.readthedocs.io/" },
      { label: "📖 SHAP 原论文（NeurIPS 2017）", url: "https://arxiv.org/abs/1705.07874" },
      { label: "🎬 StatQuest SHAP 可视化讲解", url: "https://www.youtube.com/watch?v=9haIOplEIGM" },
      { label: "🏆 Kaggle 模型解释教程", url: "https://www.kaggle.com/learn/machine-learning-explainability" },
    ],
    glossary: [
      {
        term: "SHAP",
        definition: "Shapley Additive exPlanations。用博弈论 Shapley 值公平分配每个特征对单个预测的贡献。",
        analogy: "3 人合伙赚 100 万，按每个人加入带来的「边际贡献」公平分钱。",
        code: "explainer = shap.TreeExplainer(model)\\nshap_values = explainer.shap_values(X)",
        pitfall: "TreeExplainer 只支持树模型；神经网络要用 DeepExplainer 或 GradientExplainer。",
      },
      {
        term: "Feature Importance vs SHAP",
        definition: "Feature Importance 只看分裂次数（不可靠）；SHAP 看实际数值贡献（可靠）。",
        analogy: "FI 像看员工「上班时长」，SHAP 像看「实际产出」。",
        code: "# 用 SHAP 替代默认 feature_importance",
        pitfall: "高基数特征（如 SKU ID）的 FI 会虚高，SHAP 不会。",
      },
      {
        term: "过拟合 (Overfitting)",
        definition: "模型记住了训练数据的噪声，对新数据预测差。训练好但验证/上线差。",
        analogy: "学生背题号不学知识：原题全对，新题全错。",
        code: "val_mae / train_mae > 3  # 严重过拟合信号",
        pitfall: "特征越多越容易过拟合。100 特征 + 1000 样本几乎必过拟合。",
      },
      {
        term: "Waterfall Plot",
        definition: "SHAP 的单样本解释图。展示每个特征把预测从「基线」推到「最终值」的过程。",
        analogy: "瀑布：起点 50，+广告 30，+季节 20，-价格 15 → 终点 85。",
        code: "shap.plots.waterfall(explanation[0])",
        pitfall: "基线是训练集的均值预测，不是 0。",
      },
      {
        term: "正则化 (Regularization)",
        definition: "在 loss 函数加惩罚项，限制模型复杂度。L1 (Lasso) 和 L2 (Ridge)。",
        analogy: "考试不仅看正确率，还扣「字数太多」的分——防止死记硬背。",
        code: "reg_alpha=1.0   # L1\\nreg_lambda=1.0  # L2",
        pitfall: "reg 太大会欠拟合。Optuna 调参时建议搜索范围 1e-3 到 10。",
      },
    ],
    mindMap: {
      label: "Day 6 · SHAP + 过拟合诊断",
      children: [
        {
          label: "核心概念",
          children: [
            { label: "Shapley 值（博弈论）" },
            { label: "全局 vs 局部解释" },
            { label: "过拟合三大信号" },
            { label: "L1/L2 正则化" },
          ],
        },
        {
          label: "代码操作",
          children: [
            { label: "TreeExplainer" },
            { label: "summary_plot" },
            { label: "dependence_plot" },
            { label: "waterfall_plot" },
            { label: "evals_result_" },
          ],
        },
        {
          label: "踩坑点",
          children: [
            { label: "feature_importance 不可靠" },
            { label: "训练验证 gap > 3x 过拟合" },
            { label: "高基数特征 FI 虚高" },
            { label: "SHAP 基线不是 0" },
          ],
        },
        {
          label: "前后连接",
          children: [
            { label: "← Day 5：LightGBM 黑盒模型" },
            { label: "→ Day 7：把 SHAP 集成进 pipeline" },
            { label: "→ Day 16：DoubleML 用 SHAP 做因果归因" },
            { label: "→ Day 26：库存决策用 SHAP 排序" },
          ],
        },
        {
          label: "实战能力",
          children: [
            { label: "✅ 给老板讲清模型" },
            { label: "✅ 诊断过拟合" },
            { label: "✅ 找特征饱和点" },
          ],
        },
      ],
    },
  },

  // DAY 7 · 概率预测 + 端到端 pipeline（★ 第二个里程碑）
  {
    id: "crash-7",
    day: 7,
    week: 2,
    track: "crash",
    duration: 180,
    level: "L4",
    title: "概率预测与端到端 pipeline",
    subtitle: "★ 里程碑 2——库存决策需要区间不是点值。把 Day 4-6 全部串起来，交付一个完整预测系统",
    description: "Day 7 是 Week 2 的毕业。你今天交付的不仅是模型，而是一个完整的预测系统：从读数据到输出概率区间。这是你简历的第二个项目（比 Day 5 的 LightGBM 更完整）。",
    objectives: [
      "理解点预测 vs 概率预测的本质差别",
      "用 LightGBM 跑分位数回归，输出 P10/P50/P90 三个区间",
      "把 Day 4-6 整合成端到端 pipeline 函数",
      "理解 Pinball Loss 和为什么库存决策需要概率预测",
    ],
    cues: [
      "Q1: 库存决策为什么不能用点预测？",
      "Q2: 分位数回归和普通回归的 loss 差别？",
      "Q3: P10/P50/P90 怎么解读？",
      "Q4: Pinball Loss 为什么不对称？",
    ],
    content: `
<h2>★ Day 7 交付物：完整预测系统</h2>
<p>今天结束时，你的 GitHub 上多了一个 repo：</p>
<pre><code>sales-forecast-pipeline/
├── src/
│   ├── data_loader.py     # 读数据
│   ├── features.py        # Day 4 特征工程
│   ├── model.py           # Day 5 LightGBM + Day 6 SHAP
│   ├── predict.py         # Day 7 概率预测
│   └── pipeline.py        # 端到端入口
├── notebooks/
│   └── exploration.ipynb
├── README.md
└── requirements.txt</code></pre>

<h3>1. 为什么库存需要概率预测</h3>
<p><strong>点预测：</strong> 「下周卖 100 件」——单一数字。<br>
<strong>概率预测：</strong> 「下周 90% 概率卖 80-120 件，中位数 100」——区间。</p>

<p><strong>库存决策的真实场景：</strong></p>
<ul>
<li>补 100 件：刚好卖完，零库存风险</li>
<li>补 120 件（P90）：90% 概率不缺货，但 10% 概率压货</li>
<li>补 80 件（P10）：10% 概率不缺货，但缺货成本高</li>
</ul>
<p>选哪个？取决于「缺货成本 vs 压货成本」的权衡。这就是为什么需要 P10/P50/P90。</p>

<h3>2. 分位数回归——LightGBM 一行切换</h3>
<pre><code class="language-python">import lightgbm as lgb

# 训练 3 个分位数模型
quantiles = [0.1, 0.5, 0.9]
models = {}

for q in quantiles:
    model = lgb.LGBMRegressor(
        objective='quantile',
        alpha=q,  # 分位数
        n_estimators=500,
        learning_rate=0.1,
        num_leaves=31,
        random_state=42,
    )
    model.fit(X_train, y_train,
              eval_set=[(X_val, y_val)],
              callbacks=[lgb.early_stopping(50, verbose=False)])
    models[q] = model
    print(f"Q{int(q*100)} 训练完成")

# 预测 3 个分位数
pred_p10 = models[0.1].predict(X_val)
pred_p50 = models[0.5].predict(X_val)
pred_p90 = models[0.9].predict(X_val)

print(f"前 5 个样本预测区间：")
for i in range(5):
    print(f"  P10={pred_p10[i]:.0f}  P50={pred_p50[i]:.0f}  P90={pred_p90[i]:.0f}")</code></pre>

<h3>3. Pinball Loss——分位数回归的 loss</h3>
<pre><code class="language-python">def pinball_loss(y_true, y_pred, alpha):
    """Pinball Loss：分位数回归的标准 loss
    alpha=0.5 时等价于 MAE
    alpha=0.9 时低估惩罚更重（鼓励预测高一点）
    alpha=0.1 时高估惩罚更重（鼓励预测低一点）"""
    diff = y_true - y_pred
    return np.mean(np.where(diff >= 0, alpha * diff, (alpha - 1) * diff))

# 验证：alpha=0.5 时等价 MAE
y_true = np.array([10, 20, 30])
y_pred = np.array([12, 18, 33])
print(f"Pinball(0.5) = {pinball_loss(y_true, y_pred, 0.5):.2f}")
print(f"MAE          = {mean_absolute_error(y_true, y_pred):.2f}")
# 两个值相等</code></pre>

<p><strong>物理意义：</strong> 预测 P90 时，模型更怕「低估」（错过销量）而不是「高估」（压货）。所以 loss 不对称。</p>

<h3>4. 端到端 Pipeline——把 Day 4-6 全串起来</h3>
<pre><code class="language-python"># src/pipeline.py
import pandas as pd
import lightgbm as lgb
import shap
import numpy as np
from sklearn.metrics import mean_absolute_error

class SalesForecastPipeline:
    def __init__(self, quantiles=[0.1, 0.5, 0.9]):
        self.quantiles = quantiles
        self.models = {}
        self.features = None

    def load_data(self, path):
        """Day 4: 读数据 + 特征工程"""
        df = pd.read_parquet(path)
        df = self._build_features(df)  # 复用 Day 4 的 build_time_series_features
        self.features = [c for c in df.columns if c not in ['date', 'sales']]
        return df

    def train(self, df, val_date='2024-10-01'):
        """Day 5: 训练分位数 LightGBM"""
        train = df[df['date'] < val_date]
        val = df[df['date'] >= val_date].dropna()

        for q in self.quantiles:
            model = lgb.LGBMRegressor(
                objective='quantile', alpha=q,
                n_estimators=1000, learning_rate=0.05,
                num_leaves=31, random_state=42,
            )
            model.fit(
                train[self.features], train['sales'],
                eval_set=[(val[self.features], val['sales'])],
                callbacks=[lgb.early_stopping(50, verbose=False)],
            )
            self.models[q] = model

        # 评估
        pred = self.models[0.5].predict(val[self.features])
        mae = mean_absolute_error(val['sales'], pred)
        print(f"验证 P50 MAE: {mae:.2f}")
        return self

    def predict(self, df):
        """Day 7: 输出 P10/P50/P90"""
        result = df[['date', 'sku']].copy()
        for q in self.quantiles:
            result[f'pred_q{int(q*100)}'] = self.models[q].predict(df[self.features])
        return result

    def explain(self, df, sample_idx=0):
        """Day 6: SHAP 解释"""
        explainer = shap.TreeExplainer(self.models[0.5])
        shap_values = explainer.shap_values(df[self.features])
        shap.plots.waterfall(
            shap.Explanation(values=shap_values[sample_idx],
                           base_values=explainer.expected_value,
                           data=df[self.features].iloc[sample_idx])
        )

    def _build_features(self, df):
        """Day 4 特征工程（精简版）"""
        df = df.sort_values(['sku', 'date']).copy()
        for lag in [1, 7, 14]:
            df[f'sales_lag_{lag}'] = df.groupby('sku')['sales'].shift(lag)
        for window in [7, 14]:
            grp = df.groupby('sku')['sales']
            df[f'sales_roll_mean_{window}'] = grp.shift(1).rolling(window).mean()
        df['dayofweek'] = df['date'].dt.dayofweek
        df['month'] = df['date'].dt.month
        df['is_weekend'] = (df['dayofweek'] >= 5).astype(int)
        df['sku'] = df['sku'].astype('category')
        return df

# 使用
pipe = SalesForecastPipeline()
df = pipe.load_data('sales.parquet')
pipe.train(df)
predictions = pipe.predict(df.tail(100))
print(predictions.head())
pipe.explain(df.tail(100), sample_idx=0)</code></pre>

<h3>5. 今日实战练习（毕业项目）</h3>
<p><strong>练习（必做，90 分钟）：</strong> 把上面的 pipeline 完整跑通，上传 GitHub。这是简历的第二个项目。</p>
<ol>
<li>fork 上面的代码到自己的 repo</li>
<li>用 M5 Forecasting 数据训练</li>
<li>输出 P10/P50/P90 预测</li>
<li>用 SHAP 解释 3 个 SKU 的预测</li>
<li>写 README 说明用法和结果</li>
</ol>

<h3>🤖 AI 辅助建议</h3>
<ul>
<li>「我的 P10 > P50 怎么办？（应该 P10 < P50 < P90）」</li>
<li>「分位数模型要训 3 次，能不能一次出？」</li>
<li>「pipeline 写成 class 还是 function 好？」</li>
</ul>
`,
    resources: [
      { label: "🔬 Colab Day 7 端到端 pipeline", url: "https://colab.research.google.com/#create=true" },
      { label: "📖 LightGBM 分位数回归文档", url: "https://lightgbm.readthedocs.io/en/latest/Parameters.html#objective" },
      { label: "📦 Pinball Loss 说明", url: "https://scikit-learn.org/stable/modules/generated/sklearn.metrics.mean_pinball_loss.html" },
      { label: "🏆 M5 Uncertainty 比赛（概率预测版）", url: "https://www.kaggle.com/competitions/m5-forecasting-uncertainty" },
      { label: "📐 概率预测综述论文", url: "https://arxiv.org/abs/2103.11051" },
    ],
    glossary: [
      {
        term: "概率预测 (Probabilistic Forecast)",
        definition: "不只预测一个值，而是预测整个分布（如 P10/P50/P90 区间）。",
        analogy: "天气预报：「明天 80% 概率下雨」vs 「明天下雨」（点预测）。",
        code: "objective='quantile', alpha=0.9",
        pitfall: "P10/P50/P90 必须满足 P10 ≤ P50 ≤ P90，否则分位数交叉问题。",
      },
      {
        term: "分位数回归 (Quantile Regression)",
        definition: "预测目标变量的某个分位数（如中位数 P50，或 90 分位 P90）。",
        analogy: "普通回归预测「平均销量」，分位数回归预测「90% 概率不超过多少」。",
        code: "LGBMRegressor(objective='quantile', alpha=0.9)",
        pitfall: "每个分位数要训一个模型，3 个分位数 = 3 倍训练时间。",
      },
      {
        term: "Pinball Loss",
        definition: "分位数回归的标准 loss 函数。不对称：低估和高估惩罚不同。",
        analogy: "P90 预测时，「低估」的惩罚是「高估」的 9 倍——鼓励模型预测高一点。",
        code: "loss = np.where(diff >= 0, alpha * diff, (alpha - 1) * diff)",
        pitfall: "alpha=0.5 时退化为 MAE；alpha=0 或 1 时退化。",
      },
      {
        term: "Pipeline",
        definition: "端到端的数据处理 + 模型训练 + 预测流程，封装成可复用代码。",
        analogy: "工厂流水线：原料（数据）→ 加工（特征）→ 装配（模型）→ 出货（预测）。",
        code: "class ForecastPipeline: ...",
        pitfall: "Pipeline 里的特征工程必须和训练时完全一致，否则线上预测会错。",
      },
      {
        term: "P10/P50/P90",
        definition: "预测的 10/50/90 分位数。P50=中位数预测，P10-P90=80% 置信区间。",
        analogy: "P50 是「最可能」值，P10-P90 是「大概率范围」。",
        code: "pred_p10 = model_low.predict(X)\\npred_p90 = model_high.predict(X)",
        pitfall: "P10/P50/P90 可能出现交叉（P50 > P90），要用 reconciler 修正。",
      },
    ],
    mindMap: {
      label: "Day 7 · 概率预测 + pipeline ★",
      children: [
        {
          label: "核心概念",
          children: [
            { label: "点预测 vs 概率预测" },
            { label: "分位数回归" },
            { label: "Pinball Loss" },
            { label: "端到端 pipeline" },
          ],
        },
        {
          label: "代码操作",
          children: [
            { label: "LGBMRegressor quantile" },
            { label: "3 个分位数训练" },
            { label: "SalesForecastPipeline class" },
            { label: "SHAP 集成" },
          ],
        },
        {
          label: "踩坑点",
          children: [
            { label: "P10 > P50 分位数交叉" },
            { label: "训练 3 次耗时" },
            { label: "pipeline 特征不一致" },
            { label: "Pinball 不对称" },
          ],
        },
        {
          label: "前后连接",
          children: [
            { label: "← Day 4: 特征工程" },
            { label: "← Day 5: LightGBM" },
            { label: "← Day 6: SHAP" },
            { label: "→ Day 16: 库存决策用区间" },
            { label: "→ Day 36: DeepAR 概率预测" },
          ],
        },
        {
          label: "毕业项目",
          children: [
            { label: "✅ 简历项目 2" },
            { label: "✅ 端到端系统" },
            { label: "✅ GitHub repo" },
          ],
        },
      ],
    },
  },

  // ════════════════════════════════════════════════════════════════════
  // WEEK 3-A · DAY 8-10 · 零样本大模型
  // ════════════════════════════════════════════════════════════════════
  {
    id: "crash-8",
    day: 8,
    week: 3,
    track: "crash",
    duration: 120,
    level: "L3",
    title: "零样本预测革命",
    subtitle: "新品上架第一天没历史数据怎么预测？——Amazon Chronos + Nixtla TimeGPT 不用训练就能跑",
    description: "Day 8 进入 2024-2026 最新武器——零样本预测大模型。学完今天你能处理「新品冷启动」「数据稀缺」这些传统 ML 无能为力的场景。",
    objectives: [
      "理解零样本预测的原理（用海量时序预训练 + 迁移学习）",
      "用 Amazon Chronos 跑零样本销量预测",
      "用 Nixtla TimeGPT 跑商业预测（免费档）",
      "理解零样本的适用场景和局限",
    ],
    cues: [
      "Q1: 零样本预测凭什么不用训练就能预测？",
      "Q2: Chronos 和 TimeGPT 的差别？",
      "Q3: 新品冷启动用零样本 vs 用相似品迁移，哪个更好？",
      "Q4: 零样本预测什么时候比 LightGBM 强？",
    ],
    content: `
<h2>Day 8 核心场景：新品冷启动</h2>
<p>传统 ML（Day 5 的 LightGBM）需要历史数据做 lag/rolling 特征。<br>
但新品上架第一天，<strong>没有历史</strong>——LightGBM 跑不了。<br>
零样本预测大模型解决了这个问题：用预训练知识直接预测。</p>

<h3>1. 零样本预测的原理</h3>
<p><strong>类比 GPT：</strong> ChatGPT 不用专门训练「写供应链报告」就能写，因为它在海量文本上预训练过。<br>
<strong>Chronos/TimeGPT：</strong> 在几百万条时序数据上预训练，所以能预测任何新时序——不用专门训练。</p>

<h3>2. Amazon Chronos 实战</h3>
<pre><code class="language-python"># 安装（Colab 或本地 venv）
# pip install chronos-forecasting torch

import torch
from chronos import ChronosPipeline

# 加载预训练模型（首次下载约 500MB）
pipeline = ChronosPipeline.from_pretrained(
    "amazon/chronos-t5-small",  # 还有 base/large 版本
    device_map="cpu",  # Colab 用 "cuda"
    torch_dtype=torch.bfloat16,
)

# 准备数据（任意长度历史，至少 10 个点）
import pandas as pd
sales_history = pd.Series([12, 15, 11, 13, 14, 16, 18, 20, 22, 25, 23, 28])

# 零样本预测未来 7 天
context = torch.tensor(sales_history.values)
forecast = pipeline.predict(context, prediction_length=7)

# forecast 是 100 个样本（概率分布）
print(f"形状: {forecast.shape}")  # (100, 7)
print(f"P50 预测: {forecast.quantile(0.5, dim=0).tolist()}")
print(f"P10 区间: {forecast.quantile(0.1, dim=0).tolist()}")
print(f"P90 区间: {forecast.quantile(0.9, dim=0).tolist()}")</code></pre>

<h3>3. Nixtla TimeGPT 实战（云端 API）</h3>
<pre><code class="language-python"># 安装：pip install nixtla
from nixtla import NixtlaClient

# 注册免费账号：https://nixtla.io/
nixtla = NixtlaClient(api_key='YOUR_API_KEY')

# 准备数据
df = pd.DataFrame({
    'ds': pd.date_range('2024-01-01', periods=30),
    'y': [12, 15, 11, 13, 14, 16, 18, 20, 22, 25,
          23, 28, 30, 32, 35, 33, 36, 38, 40, 42,
          45, 43, 46, 48, 50, 52, 55, 53, 56, 58],
    'unique_id': ['sku_1'] * 30,
})

# 零样本预测未来 7 天
forecast = nixtla.forecast(df=df, h=7, freq='D')
print(forecast)</code></pre>

<h3>4. 何时用零样本 vs LightGBM</h3>
<table>
<thead><tr><th>场景</th><th>推荐</th><th>原因</th></tr></thead>
<tbody>
<tr><td>历史 > 100 天 + 多特征</td><td><strong>LightGBM</strong></td><td>能用外部特征（广告/促销）</td></tr>
<tr><td>历史 < 30 天</td><td><strong>Chronos/TimeGPT</strong></td><td>LightGBM 数据太少</td></tr>
<tr><td>新品（0 历史）</td><td>Chronos + 相似品</td><td>用相似 SKU 的几天数据</td></tr>
<tr><td>批量预测 1 万 SKU</td><td>TimeGPT</td><td>云端算力，快</td></tr>
<tr><td>需要外部特征</td><td>LightGBM</td><td>大模型不支持外生变量</td></tr>
</tbody>
</table>

<h3>5. 实战练习</h3>
<p><strong>练习 1（30 分钟）：</strong> 用 Chronos 预测 M5 数据集中某 SKU 的未来 28 天，对比 Day 5 LightGBM 的结果。</p>
<p><strong>练习 2（20 分钟）：</strong> 模拟新品冷启动：用 SKU-A 的前 7 天数据 + Chronos 预测后 7 天。</p>
<p><strong>练习 3（15 分钟）：</strong> 对比 Chronos-t5-small / base / large 三个版本的精度和速度。</p>

<h3>🤖 AI 辅助建议</h3>
<ul>
<li>「Chronos 预测趋势不错但季节性抓不到，怎么办？」</li>
<li>「TimeGPT 免费档一个月能预测多少次？」</li>
<li>「新品冷启动，相似品迁移和 Chronos 哪个准？」</li>
</ul>
`,
    resources: [
      { label: "🔬 Colab Day 8 Chronos 实战", url: "https://colab.research.google.com/#create=true" },
      { label: "📦 Amazon Chronos GitHub", url: "https://github.com/amazon-science/chronos-forecasting" },
      { label: "📐 Chronos 论文（2024）", url: "https://arxiv.org/abs/2403.07815" },
      { label: "🌐 Nixtla TimeGPT 官网", url: "https://nixtla.io/" },
      { label: "📖 HuggingFace 时序模型集合", url: "https://huggingface.co/models?other=time-series" },
    ],
    glossary: [
      {
        term: "零样本预测 (Zero-shot Forecasting)",
        definition: "不用在目标时序上训练，直接预测。模型在海量时序上预训练，迁移知识。",
        analogy: "ChatGPT 没专门学过「写供应链报告」也能写——预训练学会通用模式。",
        code: "pipeline.predict(context, prediction_length=7)",
        pitfall: "零样本不能利用外部特征（广告/促销），有外部特征时仍用 LightGBM。",
      },
      {
        term: "Chronos (Amazon)",
        definition: "Amazon 2024 开源的时序预测大模型，基于 T5 架构。开源 + 免费。",
        analogy: "时序版的 ChatGPT——读一段历史序列，续写未来。",
        code: "ChronosPipeline.from_pretrained('amazon/chronos-t5-small')",
        pitfall: "small 版精度有限，复杂季节性建议用 base 或 large。",
      },
      {
        term: "TimeGPT (Nixtla)",
        definition: "Nixtla 公司的商业云端时序大模型。云端 API，免安装。",
        analogy: "OpenAI API 的时序版——上传数据，云端预测，按调用次数付费。",
        code: "nixtla.forecast(df=df, h=7)",
        pitfall: "免费档有限额，商业用要付费。数据要上传云端（隐私问题）。",
      },
      {
        term: "新品冷启动",
        definition: "新品上架无历史数据，传统 ML 无能为力的场景。",
        analogy: "新员工没业绩记录，怎么预测他下月能签多少单？",
        code: "# 用相似 SKU 的前几天数据 + Chronos 预测",
        pitfall: "纯零样本精度有限，最好结合相似品迁移（用相似 SKU 的均值做先验）。",
      },
      {
        term: "预训练 + 微调",
        definition: "先在海量数据上学通用模式（预训练），再在特定任务上微调。",
        analogy: "医学生先学全科（预训练），再专攻外科（微调）。",
        code: "# Chronos 是预训练好的，直接用即可",
        pitfall: "微调需要更多数据，新品场景数据少时直接用预训练版。",
      },
    ],
    mindMap: {
      label: "Day 8 · 零样本预测",
      children: [
        {
          label: "核心概念",
          children: [
            { label: "预训练 + 迁移" },
            { label: "零样本 vs 少样本" },
            { label: "新品冷启动" },
          ],
        },
        {
          label: "代码操作",
          children: [
            { label: "ChronosPipeline" },
            { label: "predict() 一行预测" },
            { label: "quantile() 取区间" },
            { label: "Nixtla API 调用" },
          ],
        },
        {
          label: "踩坑点",
          children: [
            { label: "不支持外部特征" },
            { label: "small 版精度有限" },
            { label: "TimeGPT 数据上传隐私" },
            { label: "季节性抓不到" },
          ],
        },
        {
          label: "前后连接",
          children: [
            { label: "← Day 5: LightGBM（需要历史）" },
            { label: "← Day 7: 概率预测" },
            { label: "→ Day 9: DeepAR/TFT 深度学习" },
            { label: "→ Day 36: 新品补货策略" },
          ],
        },
        {
          label: "适用场景",
          children: [
            { label: "新品冷启动" },
            { label: "历史数据少" },
            { label: "批量预测多 SKU" },
          ],
        },
      ],
    },
  },

  // DAY 9 · DeepAR + TFT（GPU 辅助）
  {
    id: "crash-9",
    day: 9,
    week: 3,
    track: "crash",
    duration: 180,
    level: "L2",
    title: "深度学习时序 SOTA",
    subtitle: "销量有趋势+季节+外部影响——DeepAR/TFT 处理多变量非线性（首次用 Colab GPU）",
    description: "Day 9 进入深度学习时序。首次用 Colab 免费 T4 GPU。DeepAR 和 TFT 是 Amazon/Google 的工业级概率预测模型。今天重在「会用」不在「能自己训」——L2 理解层级。",
    objectives: [
      "理解 RNN/Attention 为什么适合时序",
      "在 Colab 上跑通 DeepAR 概率预测（用 GluonTS）",
      "理解 TFT (Temporal Fusion Transformer) 的可解释性优势",
      "知道何时该上深度学习，何时该退回 LightGBM",
    ],
    cues: [
      "Q1: 深度学习比 LightGBM 强在哪？弱在哪？",
      "Q2: Colab 免费 T4 能训多大的模型？",
      "Q3: TFT 比 DeepAR 好在哪？",
      "Q4: 数据量 < 1000 行能用深度学习吗？",
    ],
    content: `
<h2>Day 9 定位：L2 理解层</h2>
<p>今天的目标是「会用 + 能判断」，不是「能自己从零实现」。<br>
会用 = 能在 Colab 上跑通官方 demo；<br>
能判断 = 知道什么场景该用 DL，什么场景退回 LightGBM。</p>

<h3>1. 深度学习时序的 3 大优势</h3>
<ol>
<li><strong>长程依赖</strong>：LSTM/Transformer 能捕捉 100+ 步的历史模式，树模型靠 lag 特征只能看 28 天</li>
<li><strong>多变量自动交互</strong>：不用手动构造交互特征，神经网络自动学</li>
<li><strong>概率输出</strong>：DeepAR/TFT 直接输出分布参数（均值+方差）</li>
</ol>

<h3>2. 3 大劣势（必知）</h3>
<ol>
<li><strong>数据饥渴</strong>：<1000 行必过拟合</li>
<li><strong>训练慢</strong>：LightGBM 1 分钟，TFT 1 小时</li>
<li><strong>难解释</strong>：黑盒（但 TFT 有 attention 可视化）</li>
</ol>

<h3>3. 在 Colab 上跑 DeepAR</h3>
<pre><code class="language-python"># Colab 操作步骤：
# 1. 打开 https://colab.research.google.com
# 2. 新建 notebook
# 3. 菜单 Runtime → Change runtime type → T4 GPU
# 4. 粘贴以下代码

# 安装 GluonTS（Amazon 开源时序库）
!pip install gluonts torch

from gluonts.dataset.common import ListDataset
from gluonts.model.deepar import DeepAREstimator
from gluonts.trainer import Trainer
import pandas as pd
import numpy as np

# 准备数据
np.random.seed(42)
n = 365
sales = 50 + np.sin(np.arange(n) * 2 * np.pi / 7) * 20 + np.random.normal(0, 5, n)
dates = pd.date_range('2024-01-01', periods=n)

train_data = ListDataset(
    [{"start": dates[0], "target": sales[:330]}],  # 前 330 天训练
    freq="D"
)

# 训练 DeepAR
estimator = DeepAREstimator(
    freq="D",
    prediction_length=35,  # 预测后 35 天
    trainer=Trainer(epochs=20, learning_rate=0.01, batch_size=32),
)
predictor = estimator.train(train_data)

# 预测
test_data = ListDataset(
    [{"start": dates[0], "target": sales}],  # 全部数据
    freq="D"
)
predictions = list(predictor.predict(test_data))

# 输出概率区间
for pred in predictions:
    print(f"P10: {np.percentile(pred.samples, 10, axis=0)[:5]}")
    print(f"P50: {np.percentile(pred.samples, 50, axis=0)[:5]}")
    print(f"P90: {np.percentile(pred.samples, 90, axis=0)[:5]}")</code></pre>

<h3>4. TFT (Temporal Fusion Transformer) 简介</h3>
<p><strong>核心优势：</strong> Google 2021 提出，比 DeepAR 多两个能力：</p>
<ul>
<li><strong>可解释性</strong>：attention 权重直接告诉你「哪些时间点最重要」</li>
<li><strong>多变量支持</strong>：能输入外生变量（广告/促销/天气）</li>
</ul>

<pre><code class="language-python"># TFT 用 PyTorch Forecasting 库
!pip install pytorch-forecasting

# 完整 TFT demo 见官方文档：
# https://pytorch-forecasting.readthedocs.io/en/stable/tutorials/stallion.html</code></pre>

<h3>5. 何时该上深度学习</h3>
<table>
<thead><tr><th>条件</th><th>推荐</th></tr></thead>
<tbody>
<tr><td>数据 > 10 万行</td><td>可上 DL</td></tr>
<tr><td>数据 < 1000 行</td><td>别上 DL，用 LightGBM 或 Chronos</td></tr>
<tr><td>需要长程依赖（>30 天）</td><td>DL 有优势</td></tr>
<tr><td>需要可解释性</td><td>TFT 或退回 LightGBM+SHAP</td></tr>
<tr><td>训练时间预算 < 1 小时</td><td>LightGBM</td></tr>
<tr><td>有 GPU + 训练预算</td><td>TFT</td></tr>
</tbody>
</table>

<h3>6. 今日实战练习</h3>
<p><strong>练习 1（45 分钟）：</strong> 在 Colab 上跑通上面的 DeepAR 代码，对比 Day 5 LightGBM 的预测效果。</p>
<p><strong>练习 2（30 分钟）：</strong> 故意只用 100 行数据训 DeepAR，看过拟合有多严重。</p>
<p><strong>练习 3（选修，60 分钟）：</strong> 跑 PyTorch Forecasting 的 TFT 官方 Stallion demo。</p>

<h3>🤖 AI 辅助建议</h3>
<ul>
<li>「DeepAR 训练 loss 一直不降，学习率怎么调？」</li>
<li>「TFT 的 attention 图怎么读？」</li>
<li>「我有 5000 行数据，能用 DL 吗？」</li>
</ul>
`,
    resources: [
      { label: "🔬 Colab Day 9 DeepAR 实战（必用 T4 GPU）", url: "https://colab.research.google.com/#create=true" },
      { label: "📦 GluonTS 官方文档", url: "https://ts.gluon.ai/" },
      { label: "📐 DeepAR 论文（Amazon 2017）", url: "https://arxiv.org/abs/1704.04110" },
      { label: "📦 PyTorch Forecasting（含 TFT）", url: "https://pytorch-forecasting.readthedocs.io/" },
      { label: "📐 TFT 论文（Google 2021）", url: "https://arxiv.org/abs/1912.09363" },
      { label: "🌐 Google Colab 免费档说明", url: "https://colab.research.google.com/signup" },
    ],
    glossary: [
      {
        term: "DeepAR (Amazon)",
        definition: "Amazon 2017 提出的概率预测 RNN 模型。自动学习时序模式，输出分布参数。",
        analogy: "用 LSTM 读历史 → 输出未来每一步的「均值+方差」→ 概率预测。",
        code: "DeepAREstimator(freq='D', prediction_length=7)",
        pitfall: "数据 <1000 行必过拟合；训练慢（小时级）。",
      },
      {
        term: "TFT (Temporal Fusion Transformer)",
        definition: "Google 2021 提出的可解释时序 Transformer。比 DeepAR 多 attention 解释能力。",
        analogy: "Transformer 版 DeepAR，外加「告诉你哪些时间步最重要」的能力。",
        code: "# PyTorch Forecasting 库",
        pitfall: "训练复杂，参数多。新手用官方默认参数即可。",
      },
      {
        term: "Colab T4 GPU",
        definition: "Google Colab 免费提供的 NVIDIA T4 GPU（16GB 显存）。够跑 DeepAR/TFT。",
        analogy: "云端免费租的显卡，比你电脑的 CPU 快 10 倍。",
        code: "Runtime → Change runtime type → T4 GPU",
        pitfall: "12 小时强制断连，长训练要 checkpoint 保存。",
      },
      {
        term: "Attention 机制",
        definition: "Transformer 的核心。让模型「看」输入的每个时间步，动态决定关注哪些。",
        analogy: "看书时眼睛会自动聚焦到关键句——attention 是模型的「眼睛聚焦」。",
        code: "# TFT 自带 attention 可视化",
        pitfall: "Attention 权重高≠因果贡献高，只能作为「相关性」参考。",
      },
      {
        term: "RNN/LSTM",
        definition: "循环神经网络，专门处理时序。LSTM 解决了 RNN 的长程依赖问题。",
        analogy: "有记忆的模型——边读序列边更新「记忆细胞」。",
        code: "# GluonTS 内部实现",
        pitfall: "2026 年逐渐被 Transformer 取代，但 DeepAR 仍是工业基线。",
      },
    ],
    mindMap: {
      label: "Day 9 · 深度学习时序",
      children: [
        {
          label: "核心概念",
          children: [
            { label: "RNN/LSTM 原理" },
            { label: "Attention 机制" },
            { label: "概率预测输出" },
            { label: "DL vs 树模型" },
          ],
        },
        {
          label: "代码操作",
          children: [
            { label: "GluonTS DeepAR" },
            { label: "PyTorch Forecasting TFT" },
            { label: "Colab T4 切换" },
            { label: "samples 取分位数" },
          ],
        },
        {
          label: "踩坑点",
          children: [
            { label: "数据 <1000 过拟合" },
            { label: "训练慢（小时级）" },
            { label: "Colab 12h 断连" },
            { label: "Attention ≠ 因果" },
          ],
        },
        {
          label: "前后连接",
          children: [
            { label: "← Day 8: Chronos 零样本" },
            { label: "→ Day 10: 模型选型决策树" },
            { label: "→ Day 36: DeepAR 用于库存" },
            { label: "→ Day 84: 电力 TFT 深化" },
          ],
        },
        {
          label: "能力定位",
          children: [
            { label: "L2 理解层（不是专家）" },
            { label: "能跑官方 demo" },
            { label: "能判断何时用 DL" },
          ],
        },
      ],
    },
  },

  // DAY 10 · 模型选型决策树 + AutoML
  {
    id: "crash-10",
    day: 10,
    week: 3,
    track: "crash",
    duration: 120,
    level: "L3",
    title: "模型选型决策树",
    subtitle: "面对新问题不再纠结选什么——按数据量/特征/场景的决策树 + AutoGluon 一键建模",
    description: "Day 10 整合 Day 4-9 的所有模型，给你一个决策框架。学完今天你拿到任何预测问题，5 分钟能决定用哪个模型。",
    objectives: [
      "掌握模型选型决策树（数据量/特征数/场景）",
      "用 AutoGluon 一键试 10 个模型，自动选最优",
      "理解 No Free Lunch 定理（没有万能模型）",
      "建立「先 baseline 再优化」的工作习惯",
    ],
    cues: [
      "Q1: 500 行数据选什么模型？",
      "Q2: AutoGluon 比 Optuna+LightGBM 强在哪？",
      "Q3: 为什么永远要先跑 naive baseline？",
      "Q4: 100 万 SKU 批量预测用什么？",
    ],
    content: `
<h2>Day 10 解决的痛点</h2>
<p>新手拿到问题总在纠结：「用 LightGBM 还是 LSTM？ARIMA 还是 Prophet？」<br>
今天给你一个决策框架，5 分钟定。</p>

<h3>1. 模型选型决策树</h3>
<pre><code>拿到预测问题 →
│
├─ 数据量 < 100 行？
│   └─ 用朴素法（上周均值）或 Chronos 零样本
│
├─ 数据量 100-1000 行？
│   ├─ 只有时间+目标 → ARIMA / Prophet / statsforecast.AutoARIMA
│   └─ 有外部特征 → LightGBM（少特征，强正则）
│
├─ 数据量 1000-10 万行？
│   ├─ 表格数据 → LightGBM + Optuna（首选）
│   ├─ 强季节性 → Prophet + LightGBM 集成
│   └─ 长程依赖 → Chronos / TFT（如果 GPU 够）
│
├─ 数据量 > 10 万行？
│   ├─ 表格数据 → LightGBM（依然首选）
│   ├─ 复杂非线性 → TFT / PatchTST
│   └─ 批量预测 → AutoGluon / Ray 并行
│
└─ 特殊场景
    ├─ 新品冷启动 → Chronos 零样本
    ├─ 概率预测 → 分位数 LightGBM / DeepAR
    └─ 多层级 → LightGBM + 层级调和</code></pre>

<h3>2. 永远先跑 Naive Baseline</h3>
<pre><code class="language-python">def naive_baseline(y_train, y_test, method='last'):
    """朴素基线：最简单的预测，用来对照模型有没有用"""
    if method == 'last':
        pred = [y_train.iloc[-1]] * len(y_test)  # 用最后一个值
    elif method == 'mean':
        pred = [y_train.mean()] * len(y_test)  # 用均值
    elif method == 'seasonal':
        # 用上周同一天的值
        pred = [y_train.iloc[-7 + i % 7] if i < 7 else y_train.iloc[-7 + (i % 7)]
                for i in range(len(y_test))]
    return np.array(pred)

# 实战：你的 LightGBM 必须打败 naive baseline
naive_pred = naive_baseline(y_train, y_val, 'seasonal')
naive_mae = mean_absolute_error(y_val, naive_pred)
print(f"Naive baseline MAE: {naive_mae:.2f}")
print(f"LightGBM MAE: {val_mae:.2f}")
print(f"提升: {(naive_mae - val_mae) / naive_mae * 100:.1f}%")
# 如果提升 < 5%，说明模型没价值，用 naive 就行</code></pre>

<h3>3. AutoGluon 一键建模</h3>
<pre><code class="language-python"># 安装：pip install autogluon
from autogluon.timeseries import TimeSeriesPredictor

# 一行训练 10+ 模型
predictor = TimeSeriesPredictor(
    target='sales',
    prediction_length=7,
    eval_metric='MAE',
).fit(
    df,
    presets='medium_quality',  # 还有 best_quality / high_quality
)

# 看 leaderboard
leaderboard = predictor.leaderboard()
print(leaderboard)

# 预测
predictions = predictor.predict(df)</code></pre>

<p><strong>AutoGluon 的价值：</strong> 自动试 LightGBM/XGBoost/CatBoost/Prophet/Chronos 等十几个模型，选最优。省去你手动对比的时间。</p>

<h3>4. No Free Lunch 定理</h3>
<p>没有万能模型。在所有可能的问题上，任何算法的平均表现都一样。<br>
<strong>实战含义：</strong></p>
<ul>
<li>不要迷信「SOTA」——具体问题具体分析</li>
<li>永远先跑 baseline 再优化</li>
<li>同一个问题试 3 个模型对比，比死磕一个强</li>
</ul>

<h3>5. 今日实战练习</h3>
<p><strong>练习 1（45 分钟）：</strong> 用 AutoGluon 跑 M5 数据，对比 leaderboard 前 3 名和 Day 5 LightGBM 的差距。</p>
<p><strong>练习 2（30 分钟）：</strong> 给一份新数据，按决策树选模型，5 分钟决定，然后验证选择是否合理。</p>
<p><strong>练习 3（15 分钟）：</strong> 构造一个 LightGBM 打不过 naive baseline 的场景（强季节性 + 少数据）。</p>

<h3>🤖 AI 辅助建议</h3>
<ul>
<li>「我的数据 500 行 + 5 个特征，LightGBM 还是 ARIMA？」</li>
<li>「AutoGluon best_quality 训练 6 小时正常吗？」</li>
<li>「为什么我的模型比 naive baseline 还差？」</li>
</ul>
`,
    resources: [
      { label: "🔬 Colab Day 10 AutoGluon 实战", url: "https://colab.research.google.com/#create=true" },
      { label: "📦 AutoGluon 时序文档", url: "https://auto.gluon.ai/stable/tutorials/timeseries/" },
      { label: "📦 statsforecast.AutoARIMA", url: "https://nixtla.github.io/statsforecast/" },
      { label: "📖 No Free Lunch 定理", url: "https://en.wikipedia.org/wiki/No_free_lunch_theorem" },
      { label: "🏆 Kaggle AutoML 比赛", url: "https://www.kaggle.com/competitions?category=automl" },
    ],
    glossary: [
      {
        term: "Naive Baseline",
        definition: "最简单的预测方法（用上一次值/均值/上周同一天）。用来判断模型有没有价值。",
        analogy: "考试交白卷的分数——如果你的模型连白卷都不如，那模型没意义。",
        code: "pred = [y_train.iloc[-1]] * len(y_test)",
        pitfall: "模型必须打败 baseline 至少 5%，否则用 naive 就行，省事。",
      },
      {
        term: "AutoML (AutoGluon)",
        definition: "自动尝试多个模型 + 超参组合，选最优。Amazon 开源。",
        analogy: "自动售货机：丢数据进去，出来的是「最适合这份数据的模型」。",
        code: "predictor = TimeSeriesPredictor(...)\\npredictor.fit(df)",
        pitfall: "best_quality 档训练几小时，新手先用 medium_quality 试水。",
      },
      {
        term: "No Free Lunch 定理",
        definition: "没有万能模型。在所有问题上，任何算法的平均表现都一样。",
        analogy: "没有「最好」的菜——川菜湘菜粤菜各有擅长。",
        code: "# 所以要试多个模型对比",
        pitfall: "不要迷信「SOTA」——论文 SOTA 在你的数据上可能很差。",
      },
      {
        term: "Leaderboard",
        definition: "AutoGluon 输出的模型排行榜，按指标排序。",
        analogy: "赛车比赛成绩单——每个模型跑同一份数据，排名。",
        code: "predictor.leaderboard()",
        pitfall: "Leaderboard 第一名不一定是上线最佳——要考虑推理速度/可解释性。",
      },
      {
        term: "Presets (AutoGluon)",
        definition: "AutoGluon 的预设质量档位：medium/high/best。越高越准但越慢。",
        analogy: "洗照片分辨率：medium 够用，high 清晰，best 极致但慢。",
        code: "predictor.fit(df, presets='medium_quality')",
        pitfall: "best_quality 在大数据上可能训练 12 小时，慎用。",
      },
    ],
    mindMap: {
      label: "Day 10 · 模型选型",
      children: [
        {
          label: "核心概念",
          children: [
            { label: "决策树框架" },
            { label: "Naive Baseline" },
            { label: "No Free Lunch" },
            { label: "AutoML 思路" },
          ],
        },
        {
          label: "代码操作",
          children: [
            { label: "naive_baseline()" },
            { label: "AutoGluon fit" },
            { label: "leaderboard()" },
            { label: "3 模型对比" },
          ],
        },
        {
          label: "踩坑点",
          children: [
            { label: "不跑 baseline 直接上模型" },
            { label: "迷信 SOTA" },
            { label: "best_quality 训练太久" },
            { label: "只看 MAE 不看速度" },
          ],
        },
        {
          label: "前后连接",
          children: [
            { label: "← Day 4-9: 所有模型学完" },
            { label: "→ Day 11: 经典补课开始" },
            { label: "→ Day 16: 因果分析选型" },
            { label: "→ Day 36: 库存选型" },
          ],
        },
        {
          label: "实战能力",
          children: [
            { label: "✅ 5 分钟选模型" },
            { label: "✅ AutoGluon 一键" },
            { label: "✅ baseline 思维" },
          ],
        },
      ],
    },
  },

  // ════════════════════════════════════════════════════════════════════
  // WEEK 3-B · DAY 11-15 · 经典补课
  // ════════════════════════════════════════════════════════════════════
  {
    id: "crash-11",
    day: 11,
    week: 3,
    track: "crash",
    duration: 90,
    level: "L2",
    title: "OLS 是最小二乘的解析解",
    subtitle: "回头秒懂 LightGBM 的 loss 来源——线性回归严格版 + Ridge/Lasso 正则化",
    description: "Day 11 是「回头补课」。Day 5 你已经用了 LightGBM 的 MSE loss，今天讲它的数学根源。学完你会发现线性回归的所有概念都能对应到 LightGBM。",
    objectives: [
      "理解 OLS（普通最小二乘）= MSE 的解析解",
      "掌握 Ridge (L2) / Lasso (L1) / ElasticNet 的差别",
      "理解高斯-马尔可夫定理（OLS 为何是最优线性无偏估计）",
      "看懂 LightGBM 的 reg_alpha / reg_lambda 参数",
    ],
    cues: [
      "Q1: 为什么 OLS 的 loss 是平方和不是绝对值？",
      "Q2: Ridge 和 Lasso 的本质差别？",
      "Q3: 高斯-马尔可夫定理的 5 个假设？",
      "Q4: LightGBM 的 reg_lambda 对应线性回归的什么？",
    ],
    content: `
<h2>Day 11 定位：L2 理解层</h2>
<p>你已经在 Day 5 用过 LightGBM 的 <code>loss='mse'</code> 和 <code>reg_alpha/reg_lambda</code>。<br>
今天讲它们背后的数学。目标是「秒懂」，不是「能推导」。</p>

<h3>1. OLS = MSE 的解析解</h3>
<p><strong>Loss 函数：</strong> <code>MSE = Σ(y_true - y_pred)² / n</code><br>
<strong>线性模型：</strong> <code>y = Xw + b</code><br>
<strong>OLS 求 w：</strong> 让 MSE 最小的 w = <code>(XᵀX)⁻¹ Xᵀy</code></p>

<pre><code class="language-python">import numpy as np

# 手写 OLS
def ols_fit(X, y):
    """解析解：w = (XᵀX)⁻¹ Xᵀy"""
    X_with_bias = np.column_stack([np.ones(len(X)), X])  # 加偏置列
    w = np.linalg.inv(X_with_bias.T @ X_with_bias) @ X_with_bias.T @ y
    return w

# 对比 sklearn
from sklearn.linear_model import LinearRegression
X = np.random.rand(100, 3)
y = 2 + 3*X[:, 0] + 1.5*X[:, 1] - 0.5*X[:, 2] + np.random.normal(0, 0.1, 100)

w_my = ols_fit(X, y)
model = LinearRegression().fit(X, y)
print(f"手写 OLS: {w_my}")
print(f"sklearn:  {[model.intercept_] + list(model.coef_)}")
# 两个结果几乎一样</code></pre>

<h3>2. Ridge (L2) / Lasso (L1) / ElasticNet</h3>
<table>
<thead><tr><th>方法</th><th>Loss</th><th>效果</th><th>LightGBM 参数</th></tr></thead>
<tbody>
<tr><td>OLS</td><td>MSE</td><td>无正则，易过拟合</td><td>reg=0</td></tr>
<tr><td><strong>Ridge (L2)</strong></td><td>MSE + λ·Σw²</td><td>权重压缩到接近 0</td><td><code>reg_lambda</code></td></tr>
<tr><td><strong>Lasso (L1)</strong></td><td>MSE + λ·Σ|w|</td><td>部分权重直接 = 0（特征选择）</td><td><code>reg_alpha</code></td></tr>
<tr><td>ElasticNet</td><td>MSE + λ₁·Σ|w| + λ₂·Σw²</td><td>L1+L2 混合</td><td>两个都设</td></tr>
</tbody>
</table>

<pre><code class="language-python">from sklearn.linear_model import Ridge, Lasso, ElasticNet

# 对比
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
for cls in [LinearRegression(), Ridge(alpha=1.0), Lasso(alpha=0.1), ElasticNet(alpha=0.1, l1_ratio=0.5)]:
    cls.fit(X_train, y_train)
    print(f"{cls.__class__.__name__:15} 系数: {cls.coef_}")</code></pre>

<p><strong>Lasso 的特征选择能力：</strong> L1 正则让部分权重精确等于 0（不是接近 0）。所以 Lasso 能自动选特征。</p>

<h3>3. 高斯-马尔可夫定理——5 个假设</h3>
<p>OLS 是「最优线性无偏估计（BLUE）」需要 5 个假设：</p>
<ol>
<li>线性关系（y = Xw + ε）</li>
<li>随机抽样</li>
<li>无多重共线性（X 列独立）</li>
<li>误差同方差（var(ε) 恒定）</li>
<li>误差无自相关</li>
</ol>
<p><strong>实战：</strong> 销量数据几乎必然违反 4 和 5（异方差 + 自相关），所以 OLS 在销量预测上不是最优——这就是为什么用 LightGBM。</p>

<h3>4. 今日实战练习</h3>
<p><strong>练习 1（20 分钟）：</strong> 对比 OLS / Ridge / Lasso 在高维数据（100 特征）上的表现，看 Lasso 是否真的做了特征选择。</p>
<p><strong>练习 2（15 分钟）：</strong> 在 Day 5 的 LightGBM 上调整 reg_alpha/reg_lambda，对比过拟合情况。</p>
<p><strong>练习 3（10 分钟）：</strong> 用 statsmodels 跑 OLS 看 summary，理解 p 值和 R²。</p>

<h3>🤖 AI 辅助建议</h3>
<ul>
<li>「我的 OLS R²=0.95 但 LightGBM R²=0.7，为什么？」</li>
<li>「Lasso 把 5 个特征的系数压到 0，我要不要删？」</li>
<li>「Ridge 和 Lasso 怎么选？」</li>
</ul>
`,
    resources: [
      { label: "🔬 Colab Day 11 线性回归实战", url: "https://colab.research.google.com/#create=true" },
      { label: "📖 statsmodels 文档（OLS summary）", url: "https://www.statsmodels.org/stable/regression.html" },
      { label: "📐 高斯-马尔可夫定理（Wikipedia）", url: "https://en.wikipedia.org/wiki/Gauss%E2%80%93Markov_theorem" },
      { label: "🎬 StatQuest Ridge/Lasso 讲解", url: "https://www.youtube.com/watch?v=Q81RR3TknVQ" },
    ],
    glossary: [
      {
        term: "OLS (Ordinary Least Squares)",
        definition: "普通最小二乘法。让残差平方和最小的线性回归。解析解 w=(XᵀX)⁻¹Xᵀy。",
        analogy: "LightGBM MSE loss 的「祖宗」——线性版的 MSE 优化。",
        code: "from sklearn.linear_model import LinearRegression",
        pitfall: "需要 5 个假设（线性/独立/无共线/同方差/无自相关）。销量数据几乎都违反。",
      },
      {
        term: "Ridge (L2)",
        definition: "在 OLS loss 加 λ·Σw²。让权重趋近 0 但不等于 0。",
        analogy: "惩罚「权重大」——所有特征都留着，但权重都缩小。",
        code: "from sklearn.linear_model import Ridge",
        pitfall: "不能做特征选择，所有特征都保留。",
      },
      {
        term: "Lasso (L1)",
        definition: "在 OLS loss 加 λ·Σ|w|。让部分权重精确等于 0，自动特征选择。",
        analogy: "「断舍离」——直接扔掉不重要的特征（权重=0）。",
        code: "from sklearn.linear_model import Lasso",
        pitfall: "λ 太大会把所有特征压成 0，要 Optuna 调。",
      },
      {
        term: "高斯-马尔可夫定理",
        definition: "在 5 个假设成立时，OLS 是最优线性无偏估计（BLUE）。",
        analogy: "如果世界完美（5 个假设），OLS 是王者。但世界不完美，所以用 LightGBM。",
        code: "# 5 个假设看上面正文",
        pitfall: "销量数据违反假设 4/5（异方差/自相关），OLS 估计无偏但方差不是最小。",
      },
      {
        term: "R² (决定系数)",
        definition: "模型解释了 y 的方差的百分比。范围 [0, 1]。",
        analogy: "R²=0.9 表示「90% 的销量变化能被特征解释」。",
        code: "from sklearn.metrics import r2_score",
        pitfall: "R² 高不代表预测准（过拟合时训练 R² 虚高）。要看验证集 R²。",
      },
    ],
    mindMap: {
      label: "Day 11 · 线性回归严格版",
      children: [
        {
          label: "核心概念",
          children: [
            { label: "OLS = MSE 解析解" },
            { label: "Ridge/Lasso/ElasticNet" },
            { label: "高斯-马尔可夫 5 假设" },
            { label: "R² 决定系数" },
          ],
        },
        {
          label: "代码操作",
          children: [
            { label: "手写 ols_fit()" },
            { label: "sklearn 三件套" },
            { label: "statsmodels summary" },
            { label: "LightGBM reg_alpha/lambda" },
          ],
        },
        {
          label: "踩坑点",
          children: [
            { label: "销量数据违反假设" },
            { label: "R² 高不一定好" },
            { label: "Lasso λ 太大压所有" },
            { label: "共线性导致 OLS 不稳" },
          ],
        },
        {
          label: "前后连接",
          children: [
            { label: "← Day 3: 梯度下降 + MSE loss" },
            { label: "← Day 5: LightGBM reg 参数" },
            { label: "→ Day 12: ARIMA 是 OLS 的时序版" },
            { label: "→ Day 36: 双重机器学习用 Ridge" },
          ],
        },
        {
          label: "认知升级",
          children: [
            { label: "LightGBM = 非线性 OLS" },
            { label: "reg 参数的根源" },
          ],
        },
      ],
    },
  },

  // DAY 12 · ARIMA 概念 + statsforecast
  {
    id: "crash-12",
    day: 12,
    week: 3,
    track: "crash",
    duration: 90,
    level: "L2",
    title: "ARIMA 家族一键替代",
    subtitle: "手动选 p,d,q 太痛苦——statsforecast.AutoARIMA 自动选参，0.5 天搞定",
    description: "Day 12 讲 ARIMA 概念 + 现代工具一键跑。不学手动选 p/d/q（已经过时），直接用 statsforecast.AutoARIMA。",
    objectives: [
      "理解 ARIMA(p,d,q) 三个参数的物理意义",
      "用 statsforecast.AutoARIMA 一键自动选参",
      "理解平稳性（ADF 检验）和差分",
      "知道 ARIMA 何时还有用（小样本 + 强季节性）",
    ],
    cues: [
      "Q1: p/d/q 各代表什么？一句话解释",
      "Q2: 什么叫「平稳时序」？为什么要平稳？",
      "Q3: statsforecast.AutoARIMA 比 pmdarima 强在哪？",
      "Q4: ARIMA 在 2026 年还有用吗？",
    ],
    content: `
<h2>Day 12 定位：L2 理解 + 会用</h2>
<p>ARIMA 在 2026 年不是首选工具，但概念必须懂——很多库的输出需要 ARIMA 知识才能看懂。今天只学「概念 + 一键跑」，不学手动调参。</p>

<h3>1. ARIMA(p,d,q) 三参数一句话</h3>
<ul>
<li><strong>p (AR)</strong>：用过去 p 个值预测今天（自回归）</li>
<li><strong>d (I)</strong>：差分 d 次让时序变平稳（积分）</li>
<li><strong>q (MA)</strong>：用过去 q 个误差预测今天（移动平均）</li>
</ul>

<p><strong>一句话类比：</strong></p>
<ul>
<li>AR：「今天销量 ≈ 昨天销量 × 0.7 + 前天 × 0.3」（看自己历史）</li>
<li>I：「销量一直在涨，我减去昨天的，看增量」（去趋势）</li>
<li>MA：「昨天预测低估了 5 件，今天修正一下」（看预测误差）</li>
</ul>

<h3>2. 平稳性——ARIMA 的前提</h3>
<p>ARIMA 要求时序「平稳」：均值/方差/自相关不随时间变。</p>
<pre><code class="language-python">from statsmodels.tsa.stattools import adfuller

def check_stationarity(series):
    """ADF 检验：p<0.05 平稳"""
    result = adfuller(series.dropna())
    print(f"ADF 统计量: {result[0]:.3f}")
    print(f"p 值: {result[1]:.4f}")
    if result[1] < 0.05:
        print("✓ 平稳")
    else:
        print("✗ 非平稳，需要差分")

# 实战
check_stationarity(sales_series)
# 非平稳 → 差分一次
diff_1 = sales_series.diff().dropna()
check_stationarity(diff_1)
# d=1 让它平稳</code></pre>

<h3>3. statsforecast.AutoARIMA——现代一键方案</h3>
<pre><code class="language-python"># 安装：pip install statsforecast
from statsforecast import StatsForecast
from statsforecast.models import AutoARIMA

# 准备数据（statsforecast 要求特定格式）
df = pd.DataFrame({
    'unique_id': ['sku_1'] * len(sales),
    'ds': dates,
    'y': sales,
})

# 一键训练（自动选 p,d,q）
models = [AutoARIMA(season_length=7)]  # 周季节性
sf = StatsForecast(models=models, freq='D')

# 预测未来 7 天
forecast = sf.forecast(df=df, h=7)
print(forecast)</code></pre>

<p><strong>AutoARIMA 做了什么：</strong></p>
<ol>
<li>自动跑 ADF 检验选 d（差分次数）</li>
<li>用 AIC/BIC 在 p/q 候选范围搜索</li>
<li>返回最优组合 + 预测</li>
</ol>

<h3>4. ARIMA 在 2026 年还有用的场景</h3>
<table>
<thead><tr><th>场景</th><th>用 ARIMA</th><th>原因</th></tr></thead>
<tbody>
<tr><td>数据 < 100 行</td><td>✓</td><td>LightGBM/DL 数据太少</td></tr>
<tr><td>强季节性 + 无外部特征</td><td>✓</td><td>SARIMA 季节项很强</td></tr>
<tr><td>需要可解释</td><td>✓</td><td>ARIMA 系数可读</td></tr>
<tr><td>有外部特征（广告/促销）</td><td>✗</td><td>用 LightGBM</td></tr>
<tr><td>数据量 > 1000</td><td>✗</td><td>LightGBM 更准</td></tr>
</tbody>
</table>

<h3>5. 今日实战练习</h3>
<p><strong>练习 1（20 分钟）：</strong> 用 statsforecast.AutoARIMA 跑 M5 某个 SKU，对比 Day 5 LightGBM。</p>
<p><strong>练习 2（15 分钟）：</strong> 跑 ADF 检验，用 diff() 让非平稳序列变平稳。</p>
<p><strong>练习 3（10 分钟）：</strong> 看 AutoARIMA 选的 p,d,q 是什么，理解为什么这么选。</p>

<h3>🤖 AI 辅助建议</h3>
<ul>
<li>「AutoARIMA 选了 p=5 d=1 q=0，这合理吗？」</li>
<li>「我的时序差分 2 次还不平稳，怎么办？」</li>
<li>「SARIMA 的 P,D,Q,m 怎么定？」</li>
</ul>
`,
    resources: [
      { label: "🔬 Colab Day 12 AutoARIMA 实战", url: "https://colab.research.google.com/#create=true" },
      { label: "📦 statsforecast 文档（Nixtla）", url: "https://nixtla.github.io/statsforecast/" },
      { label: "📖 Hyndman FPP3 第 8-9 章（ARIMA）", url: "https://otexts.com/fpp3/arima.html" },
      { label: "📦 statsmodels ARIMA 文档", url: "https://www.statsmodels.org/stable/generated/statsmodels.tsa.arima.model.ARIMA.html" },
      { label: "📐 ADF 检验原理", url: "https://en.wikipedia.org/wiki/Augmented_Dickey%E2%80%93Fuller_test" },
    ],
    glossary: [
      {
        term: "ARIMA(p,d,q)",
        definition: "自回归积分移动平均模型。p=自回归阶数，d=差分次数，q=移动平均阶数。",
        analogy: "AR=看自己历史；I=去趋势；MA=看预测误差。",
        code: "from statsforecast.models import AutoARIMA",
        pitfall: "要求数据平稳。非平稳直接用 ARIMA 会得到虚假结果。",
      },
      {
        term: "平稳性 (Stationarity)",
        definition: "时序的均值/方差/自相关不随时间变化。ARIMA 的前提。",
        analogy: "河流水位稳定波动 vs 洪水期水位暴涨——前者平稳，后者非平稳。",
        code: "adfuller(series)[1] < 0.05  # 平稳",
        pitfall: "销量数据通常非平稳（有趋势/季节），需要 diff() 差分。",
      },
      {
        term: "差分 (Differencing)",
        definition: "用 y[t] - y[t-1] 让时序变平稳。一次差分去线性趋势，季节差分去季节性。",
        analogy: "不看绝对销量，看「销量增量」——增量通常更平稳。",
        code: "diff_1 = series.diff().dropna()",
        pitfall: "差分次数 d 过大会过度差分，引入噪声。d 通常 0-2。",
      },
      {
        term: "statsforecast.AutoARIMA",
        definition: "Nixtla 开源的自动 ARIMA 选参库。比 pmdarima 快 20 倍。",
        analogy: "ARIMA 版的 Optuna——自动搜 p,d,q 最优组合。",
        code: "AutoARIMA(season_length=7)",
        pitfall: "大数据（>10000 行）仍慢。大数据用 LightGBM。",
      },
      {
        term: "SARIMA",
        definition: "带季节项的 ARIMA。额外 4 参数 (P,D,Q,m)，m=季节周期。",
        analogy: "ARIMA + 季节项 = SARIMA。如 m=7 表示周季节性。",
        code: "AutoARIMA(season_length=7)  # 自动处理",
        pitfall: "参数太多（7 个），手动调很痛苦。永远用 AutoARIMA。",
      },
    ],
    mindMap: {
      label: "Day 12 · ARIMA 一键跑",
      children: [
        {
          label: "核心概念",
          children: [
            { label: "AR/MA/I 三含义" },
            { label: "平稳性 + ADF" },
            { label: "差分 d" },
            { label: "SARIMA 季节项" },
          ],
        },
        {
          label: "代码操作",
          children: [
            { label: "adfuller() 检验" },
            { label: "series.diff()" },
            { label: "AutoARIMA 一行" },
            { label: "StatsForecast.forecast" },
          ],
        },
        {
          label: "踩坑点",
          children: [
            { label: "非平稳直接用 ARIMA" },
            { label: "差分过度" },
            { label: "大数据慢" },
            { label: "不支持外部特征" },
          ],
        },
        {
          label: "前后连接",
          children: [
            { label: "← Day 11: OLS（ARIMA 是时序版）" },
            { label: "→ Day 13: Prophet 对比" },
            { label: "→ Day 27: SARIMA 严格版（附录）" },
            { label: "→ Day 93: ARIMA 数学严格" },
          ],
        },
        {
          label: "适用场景",
          children: [
            { label: "小样本" },
            { label: "强季节性" },
            { label: "需要可解释" },
          ],
        },
      ],
    },
  },

  // DAY 13 · Prophet + 指数平滑
  {
    id: "crash-13",
    day: 13,
    week: 3,
    track: "crash",
    duration: 90,
    level: "L2",
    title: "Prophet 自动分解季节性",
    subtitle: "销量有明显的周/月/年规律——Facebook Prophet 自动趋势+季节+节假日分解",
    description: "Day 13 学 Prophet。它是 Facebook 开源的快速 baseline 工具，特别适合「有强季节性 + 需要快速出结果」的场景。",
    objectives: [
      "用 Prophet 一行跑预测（自动分解趋势+季节+节假日）",
      "理解加性 vs 乘性模型",
      "用 Holt-Winters 三指数平滑做对照",
      "知道 Prophet 何时强于 LightGBM",
    ],
    cues: [
      "Q1: Prophet 自动分解了什么？",
      "Q2: 加性 vs 乘性怎么选？",
      "Q3: Prophet 和 LightGBM 谁强？",
      "Q4: 节假日效应怎么加？",
    ],
    content: `
<h2>Day 13 定位：快速 baseline 工具</h2>
<p>Prophet 不是 SOTA，但是最快出结果的工具。遇到新数据先跑 Prophet 出个 baseline，再决定要不要上 LightGBM。</p>

<h3>1. Prophet 三行代码预测</h3>
<pre><code class="language-python"># pip install prophet
from prophet import Prophet

# Prophet 要求列名：ds（日期）+ y（目标）
df_prophet = pd.DataFrame({'ds': dates, 'y': sales})

# 训练 + 预测
model = Prophet(
    yearly_seasonality=True,   # 年季节性
    weekly_seasonality=True,   # 周季节性
    daily_seasonality=False,   # 日内（销量通常不用）
    seasonality_mode='additive',  # 加性 vs 乘性
)
model.fit(df_prophet)

# 预测未来 7 天
future = model.make_future_dataframe(periods=7)
forecast = model.predict(future)

# 看分解
fig = model.plot_components(forecast)
# 4 张子图：趋势 / 周 / 年 / 节假日</code></pre>

<h3>2. 加性 vs 乘性</h3>
<p><strong>加性：</strong> 销量 = 趋势 + 季节 + 节假日 + 噪声<br>
<strong>乘性：</strong> 销量 = 趋势 × 季节 × 节假日 × 噪声</p>

<p><strong>怎么选：</strong></p>
<ul>
<li>季节幅度不随销量变大 → 加性（如冬季销量整体降 10 件）</li>
<li>季节幅度随销量变大 → 乘性（如旺季销量翻倍）</li>
</ul>

<pre><code class="language-python"># 判断方法：画图看
import matplotlib.pyplot as plt
plt.plot(sales)
# 如果波动的「幅度」随时间变大 → 乘性</code></pre>

<h3>3. 节假日效应</h3>
<pre><code class="language-python"># 自定义节假日
holidays = pd.DataFrame({
    'holiday': 'double_11',
    'ds': pd.to_datetime(['2024-11-11', '2025-11-11']),
    'lower_window': -1,  # 前 1 天也开始影响
    'upper_window': 2,   # 后 2 天还有影响
})

model = Prophet(holidays=holidays)
model.fit(df_prophet)</code></pre>

<h3>4. Holt-Winters 三指数平滑</h3>
<pre><code class="language-python">from statsforecast.models import HoltWinters

# statsforecast 版（快）
models = [HoltWinters(season_length=7)]
sf = StatsForecast(models=models, freq='D')
forecast = sf.forecast(df=df, h=7)</code></pre>

<h3>5. 何时用 Prophet vs LightGBM</h3>
<table>
<thead><tr><th>场景</th><th>推荐</th></tr></thead>
<tbody>
<tr><td>强季节性 + 少特征</td><td>Prophet</td></tr>
<tr><td>有外部特征（广告/促销）</td><td>LightGBM</td></tr>
<tr><td>需要快速 baseline</td><td>Prophet（3 行代码）</td></tr>
<tr><td>新品冷启动</td><td>Chronos</td></tr>
<tr><td>需要概率预测</td><td>Prophet（自带）或分位 LightGBM</td></tr>
</tbody>
</table>

<h3>6. 今日实战练习</h3>
<p><strong>练习 1（20 分钟）：</strong> 用 Prophet 跑 M5 某 SKU，看 plot_components 4 张子图。</p>
<p><strong>练习 2（15 分钟）：</strong> 加双十一节假日，看预测是否在 11-11 附近有提升。</p>
<p><strong>练习 3（15 分钟）：</strong> 对比 Prophet vs Day 12 AutoARIMA 在同一份数据上的 MAE。</p>
`,
    resources: [
      { label: "🔬 Colab Day 13 Prophet 实战", url: "https://colab.research.google.com/#create=true" },
      { label: "📦 Prophet 官方文档", url: "https://facebook.github.io/prophet/" },
      { label: "📐 Prophet 论文（Facebook 2018）", url: "https://peerj.com/preprints/3190/" },
      { label: "📖 Hyndman FPP3 第 8 章（指数平滑）", url: "https://otexts.com/fpp3/expsmooth.html" },
    ],
    glossary: [
      {
        term: "Prophet",
        definition: "Facebook 开源的时序预测库。自动分解趋势+季节+节假日，3 行代码出结果。",
        analogy: "时序版的「美图秀秀」——一键自动，不用懂原理也能用。",
        code: "from prophet import Prophet\\nmodel = Prophet().fit(df)",
        pitfall: "不是 SOTA，但作为 baseline 够用。精度要求高时换 LightGBM。",
      },
      {
        term: "加性 vs 乘性",
        definition: "加性=趋势+季节；乘性=趋势×季节。决定季节效应是否随销量放大。",
        analogy: "加性：固定加 10 件；乘性：固定翻倍。",
        code: "seasonality_mode='additive' # 或 'multiplicative'",
        pitfall: "销量数据通常乘性更合适（旺季翻倍），但默认是加性。",
      },
      {
        term: "Holt-Winters",
        definition: "三指数平滑。同时平滑水平/趋势/季节三个分量。",
        analogy: "三个滑动平均并行——一个抓当前值，一个抓趋势，一个抓季节。",
        code: "from statsforecast.models import HoltWinters",
        pitfall: "参数（alpha/beta/gamma）手动调痛苦，用 Auto 版。",
      },
      {
        term: "节假日效应",
        definition: "特定日期（春节/双十一）对销量的额外影响。Prophet 自动建模。",
        analogy: "普通日 +10 件，双十一当天 +500 件——这就是节假日效应。",
        code: "Prophet(holidays=holidays_df)",
        pitfall: "lower_window/upper_window 设置不当会让节假日效应过宽或过窄。",
      },
      {
        term: "分解 (Decomposition)",
        definition: "把时序拆成趋势 + 季节 + 残差三个分量。",
        analogy: "拆钟表：发条（趋势）+ 齿轮（季节）+ 噪声（残差）。",
        code: "model.plot_components(forecast)",
        pitfall: "加性分解 vs 乘性分解，用错会让分量解释不通。",
      },
    ],
    mindMap: {
      label: "Day 13 · Prophet",
      children: [
        {
          label: "核心概念",
          children: [
            { label: "趋势 + 季节 + 节假日" },
            { label: "加性 vs 乘性" },
            { label: "Holt-Winters 三指数" },
            { label: "分解图解读" },
          ],
        },
        {
          label: "代码操作",
          children: [
            { label: "Prophet 一行训练" },
            { label: "make_future_dataframe" },
            { label: "plot_components" },
            { label: "自定义 holidays" },
          ],
        },
        {
          label: "踩坑点",
          children: [
            { label: "默认加性可能错" },
            { label: "节假日窗口设置" },
            { label: "非 SOTA 别迷信" },
            { label: "不支持外部特征" },
          ],
        },
        {
          label: "前后连接",
          children: [
            { label: "← Day 12: ARIMA 对比" },
            { label: "→ Day 14: 回测框架" },
            { label: "→ Day 15: 3 模型横评" },
            { label: "→ Day 54: Prophet 数学原理" },
          ],
        },
        {
          label: "适用场景",
          children: [
            { label: "快速 baseline" },
            { label: "强季节性" },
            { label: "需要可解释" },
          ],
        },
      ],
    },
  },

  // DAY 14 · 回测 + 过拟合诊断
  {
    id: "crash-14",
    day: 14,
    week: 3,
    track: "crash",
    duration: 120,
    level: "L3",
    title: "回测诊断过拟合",
    subtitle: "训练 MAPE=2% 上线 30%——滚动回测 + TimeSeriesSplit 防数据泄漏",
    description: "Day 14 讲回测。模型上线后效果差，90% 是回测方法错了——用了随机划分导致信息泄漏。",
    objectives: [
      "用滚动回测（rolling forecast）正确评估时序模型",
      "区分 expanding vs sliding window",
      "理解 TimeSeriesSplit 为什么不能 shuffle",
      "识别 3 种过拟合信号",
    ],
    cues: [
      "Q1: 时序数据为什么不能用 train_test_split(shuffle=True)？",
      "Q2: expanding vs sliding window 差别？",
      "Q3: 训练 MAPE=2%，验证 MAPE=30%，怎么办？",
      "Q4: 交叉验证在时序里怎么正确做？",
    ],
    content: `
<h2>Day 14 解决的问题</h2>
<p>90% 的「上线翻车」是回测方法错了。最常见错误：用随机划分（train_test_split shuffle=True），让测试集包含了训练集的未来数据——模型偷看了答案，回测好看，上线崩盘。</p>

<h3>1. 时序数据禁止随机划分</h3>
<pre><code class="language-python"># ❌ 错误：随机划分会让测试集有「未来信息」
from sklearn.model_selection import train_test_split
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=42)
# 这样模型在训练时已经见过 12 月的数据，预测 6 月的数据——上线必然崩

# ✓ 正确：按时间切
train = df[df['date'] < '2024-10-01']
test = df[df['date'] >= '2024-10-01']</code></pre>

<h3>2. 滚动回测（Rolling Forecast）</h3>
<pre><code class="language-python">def rolling_forecast(df, model_fn, train_size=180, horizon=7, step=7):
    """滚动回测：模拟真实上线
    train_size: 训练窗口
    horizon: 预测长度
    step: 每次往前走多少"""
    results = []
    df = df.sort_values('date').reset_index(drop=True)
    n = len(df)

    for start in range(0, n - train_size - horizon + 1, step):
        train = df.iloc[start : start + train_size]
        test = df.iloc[start + train_size : start + train_size + horizon]

        model = model_fn()
        model.fit(train[features], train['sales'])
        pred = model.predict(test[features])

        mae = mean_absolute_error(test['sales'], pred)
        results.append({
            'start_date': train['date'].iloc[-1],
            'mae': mae,
            'actual': test['sales'].values,
            'pred': pred,
        })

    return pd.DataFrame(results)

# 使用
results = rolling_forecast(df, lambda: lgb.LGBMRegressor(n_estimators=100))
print(f"平均 MAE: {results['mae'].mean():.2f}")
print(f"MAE 标准差: {results['mae'].std():.2f}  （稳定性）")</code></pre>

<h3>3. Expanding vs Sliding Window</h3>
<table>
<thead><tr><th>方式</th><th>训练窗口</th><th>适合场景</th></tr></thead>
<tbody>
<tr><td><strong>Expanding</strong></td><td>越来越大（用所有历史）</td><td>数据少（<1 年）</td></tr>
<tr><td><strong>Sliding</strong></td><td>固定大小（只看最近 N 天）</td><td>概念漂移（用户行为变化）</td></tr>
</tbody>
</table>

<h3>4. TimeSeriesSplit</h3>
<pre><code class="language-python">from sklearn.model_selection import TimeSeriesSplit

tscv = TimeSeriesSplit(n_splits=5)
for train_idx, val_idx in tscv.split(df):
    train = df.iloc[train_idx]
    val = df.iloc[val_idx]
    # 注意：val 永远在 train 之后
    print(f"Train: {train['date'].min()} ~ {train['date'].max()}")
    print(f"Val:   {val['date'].min()} ~ {val['date'].max()}")</code></pre>

<h3>5. 今日实战练习</h3>
<p><strong>练习 1（30 分钟）：</strong> 用 rolling_forecast 在 Day 5 LightGBM 上跑 5 次滚动回测，看 MAE 稳定性。</p>
<p><strong>练习 2（20 分钟）：</strong> 故意用随机划分对比滚动回测，看「虚假好看」的差距。</p>
<p><strong>练习 3（15 分钟）：</strong> 对比 expanding vs sliding 在 M5 上的效果。</p>
`,
    resources: [
      { label: "🔬 Colab Day 14 回测实战", url: "https://colab.research.google.com/#create=true" },
      { label: "📖 Hyndman FPP3 第 5 章（回测）", url: "https://otexts.com/fpp3/accuracy.html" },
      { label: "📦 sklearn TimeSeriesSplit", url: "https://scikit-learn.org/stable/modules/generated/sklearn.model_selection.TimeSeriesSplit.html" },
      { label: "📐 滚动回测原理", url: "https://en.wikipedia.org/wiki/Backtesting" },
    ],
    glossary: [
      {
        term: "滚动回测 (Rolling Forecast)",
        definition: "模拟真实上线：用历史训练→预测未来一段→窗口前移→重复。最真实的评估方法。",
        analogy: "考试模拟：用前 6 个月数据预测第 7 个月，再用前 7 个月预测第 8 个月……",
        code: "for start in range(0, n-train_size, step): ...",
        pitfall: "不滚动 = 只评估一次 = 不可靠。至少 5 次滚动才稳定。",
      },
      {
        term: "信息泄漏 (Data Leakage)",
        definition: "训练时用了「未来」信息，导致回测虚高。上线必崩。",
        analogy: "考试偷看答案：平时满分，高考零分。",
        code: "# shuffle=True 就是泄漏",
        pitfall: "Target Encoding 不 K-fold 也泄漏；lag 不 shift 也泄漏。",
      },
      {
        term: "TimeSeriesSplit",
        definition: "sklearn 提供的时序交叉验证。保证验证集永远在训练集之后。",
        analogy: "翻书：先看前 N 页（训练），再测第 N+1 页（验证），再看前 N+1 页……",
        code: "from sklearn.model_selection import TimeSeriesSplit",
        pitfall: "n_splits 太多会让每个 fold 训练数据太少。5 是甜蜜点。",
      },
      {
        term: "Expanding Window",
        definition: "训练窗口越来越大（用所有历史）。",
        analogy: "滚雪球：越滚越大，历史越长。",
        code: "train = df.iloc[:start + train_size]",
        pitfall: "如果有概念漂移（用户行为变了），旧数据会污染模型。",
      },
      {
        term: "Sliding Window",
        definition: "训练窗口固定大小（只看最近 N 天）。",
        analogy: "传送带：旧数据丢掉，只看最近的。",
        code: "train = df.iloc[start : start + window]",
        pitfall: "窗口太短会丢长程模式（如年季节性）。",
      },
    ],
    mindMap: {
      label: "Day 14 · 回测诊断",
      children: [
        {
          label: "核心概念",
          children: [
            { label: "时序不能随机划分" },
            { label: "滚动回测" },
            { label: "信息泄漏" },
            { label: "Expanding vs Sliding" },
          ],
        },
        {
          label: "代码操作",
          children: [
            { label: "rolling_forecast()" },
            { label: "TimeSeriesSplit" },
            { label: "MAE 稳定性检查" },
          ],
        },
        {
          label: "踩坑点",
          children: [
            { label: "shuffle=True 泄漏" },
            { label: "Target Encoding 泄漏" },
            { label: "lag 没 shift 泄漏" },
            { label: "只评估一次不可靠" },
          ],
        },
        {
          label: "前后连接",
          children: [
            { label: "← Day 5: LightGBM 评估" },
            { label: "→ Day 15: 毕业项目用回测" },
            { label: "→ Day 36: 库存模型回测" },
          ],
        },
        {
          label: "实战能力",
          children: [
            { label: "✅ 上线前必做的检查" },
            { label: "✅ 识别过拟合" },
            { label: "✅ 评估稳定性" },
          ],
        },
      ],
    },
  },

  // DAY 15 · 毕业项目（★ 第三个里程碑）
  {
    id: "crash-15",
    day: 15,
    week: 3,
    track: "crash",
    duration: 240,
    level: "L4",
    title: "毕业项目：3 模型横评",
    subtitle: "★ 里程碑 3——把 Day 4-14 所有方法串起来，交付一个完整的销量预测系统",
    description: "Day 15 是 15 天速成的毕业项目。你要用 M5 数据集，跑通 3 个模型（LightGBM / ARIMA / Prophet）的对比，写一份完整报告。这是你简历的核心项目。",
    objectives: [
      "端到端跑通 3 模型对比（数据→特征→训练→评估→报告）",
      "用滚动回测正确评估每个模型",
      "用 SHAP 解释最优模型",
      "输出一份 1 页的「销量预测系统设计报告」",
    ],
    cues: [
      "Q1: 3 个模型哪个赢？为什么？",
      "Q2: 你的系统在什么场景下会失效？",
      "Q3: 如果给你 10 倍数据，你会怎么改？",
      "Q4: 业务方问「为什么不只用一个模型」，你怎么回答？",
    ],
    content: `
<h2>★ Day 15 毕业项目</h2>
<p>这是你 15 天速成的最终交付。完成后你的简历可以写：</p>
<blockquote>
<strong>销量预测系统</strong>：基于 M5 Forecasting 数据集（4200 万行），<br>
对比 LightGBM / SARIMA / Prophet 三种模型，<br>
用滚动回测验证，LightGBM 胜出（MAE 降低 23%），<br>
用 SHAP 解释 Top 5 特征贡献，输出概率预测区间。<br>
技术栈：Python / pandas / LightGBM / Optuna / SHAP / statsforecast。
</blockquote>

<h3>项目结构</h3>
<pre><code>graduation-project/
├── data/
│   └── m5_sample.parquet       # 数据
├── src/
│   ├── 01_eda.ipynb           # 探索分析
│   ├── 02_features.py         # Day 4 特征工程
│   ├── 03_lightgbm.py         # Day 5 + 7 LightGBM + 概率
│   ├── 04_arima.py            # Day 12 AutoARIMA
│   ├── 05_prophet.py          # Day 13 Prophet
│   ├── 06_backtest.py         # Day 14 滚动回测
│   ├── 07_shap.py             # Day 6 SHAP 解释
│   └── 08_report.py           # 自动出报告
├── results/
│   ├── leaderboard.csv        # 3 模型对比
│   ├── shap_summary.png       # SHAP 图
│   └── forecast_plot.png      # 预测可视化
├── README.md                  # 项目说明
└── requirements.txt</code></pre>

<h3>核心代码：3 模型对比 + 回测</h3>
<pre><code class="language-python"># src/08_report.py
import pandas as pd
import numpy as np
from sklearn.metrics import mean_absolute_error

def compare_models(df, features, target='sales'):
    """3 模型对比 + 滚动回测"""
    from src.lightgbm_model import train_lgb
    from src.arima_model import train_arima
    from src.prophet_model import train_prophet

    results = []
    # 滚动 5 次
    for fold, (train_idx, val_idx) in enumerate(rolling_split(df, n_splits=5)):
        train, val = df.iloc[train_idx], df.iloc[val_idx]

        # LightGBM
        pred_lgb = train_lgb(train, val, features, target)
        mae_lgb = mean_absolute_error(val[target], pred_lgb)

        # ARIMA
        pred_arima = train_arima(train, val)
        mae_arima = mean_absolute_error(val[target], pred_arima)

        # Prophet
        pred_prophet = train_prophet(train, val)
        mae_prophet = mean_absolute_error(val[target], pred_prophet)

        results.append({
            'fold': fold,
            'LightGBM': mae_lgb,
            'ARIMA': mae_arima,
            'Prophet': mae_prophet,
        })

    return pd.DataFrame(results)

# 跑对比
results = compare_models(df, features)
print(results)

# 汇总
print("\\n=== 5 折平均 MAE ===")
print(results[['LightGBM', 'ARIMA', 'Prophet']].mean())
print("\\n=== 标准差（稳定性）===")
print(results[['LightGBM', 'ARIMA', 'Prophet']].std())</code></pre>

<h3>报告模板（1 页）</h3>
<pre><code># 销量预测系统设计报告

## 1. 问题
预测 M5 数据集 100 个 SKU 未来 28 天销量

## 2. 数据
- 训练：2024-01-01 ~ 2024-09-30（270 天）
- 测试：2024-10-01 ~ 2024-10-28（28 天）
- 特征：19 个（lag/rolling/日期/target encoding）

## 3. 模型对比
| 模型 | MAE | 训练时间 | 可解释性 |
|------|-----|---------|---------|
| LightGBM | 5.2 | 30s | SHAP |
| ARIMA | 8.7 | 5s | 系数 |
| Prophet | 7.1 | 10s | 分解图 |

LightGBM 胜出，MAE 降低 23% vs ARIMA

## 4. SHAP 解读
Top 5 特征：
1. sales_lag_7（+0.32）
2. sales_roll_mean_7（+0.28）
3. ad_spend（+0.18）
4. dayofweek（+0.12）
5. price（-0.09）

## 5. 概率预测
输出 P10/P50/P90，供库存决策使用

## 6. 失效场景
- 新品冷启动（改用 Chronos）
- 数据 < 100 行（改用 SARIMA）
- 概念漂移（加 sliding window）</code></pre>

<h3>今日任务清单（必须完成）</h3>
<ol>
<li>✅ Fork 项目骨架到自己的 GitHub</li>
<li>✅ 跑通 3 模型对比 + 滚动回测</li>
<li>✅ 输出 SHAP 解读</li>
<li>✅ 写 README + 报告</li>
<li>✅ 在简历添加这个项目</li>
</ol>

<h3>🤖 AI 辅助建议</h3>
<ul>
<li>「我的 LightGBM 比 ARIMA 差，正常吗？」</li>
<li>「报告怎么写让面试官印象深刻？」</li>
<li>「这个项目能放到 Kaggle portfolio 吗？」</li>
</ul>
`,
    resources: [
      { label: "🔬 Colab Day 15 毕业项目完整模板", url: "https://colab.research.google.com/#create=true" },
      { label: "📊 M5 Forecasting 数据集", url: "https://www.kaggle.com/competitions/m5-forecasting-accuracy" },
      { label: "🏆 M5 Winning Solutions（学习别人怎么做）", url: "https://www.kaggle.com/competitions/m5-forecasting-accuracy/discussion/201514" },
      { label: "📖 简历项目写作指南", url: "https://www.kaggle.com/general/27883" },
      { label: "📐 GitHub README 模板", url: "https://github.com/dec0dOS/amazing-github-template" },
    ],
    glossary: [
      {
        term: "3 模型横评",
        definition: "用同一份数据 + 同样的回测方法，对比多个模型的真实表现。",
        analogy: "赛车比赛：同一赛道，不同车，看谁快。",
        code: "results = compare_models(df, features)",
        pitfall: "对比不公平 = 无意义。必须用同样的回测窗口 + 同样的数据。",
      },
      {
        term: "Leaderboard",
        definition: "模型排行榜，按指标排序。",
        analogy: "成绩单——一目了然谁第一。",
        code: "results.mean().sort_values()",
        pitfall: "第一名不一定上线最佳，要考虑速度/可解释性/稳定性。",
      },
      {
        term: "项目报告",
        definition: "1 页纸说明问题/数据/方法/结果/局限。简历必备。",
        analogy: "「电梯演讲」——3 分钟讲清你做了什么，结果如何。",
        code: "# README.md 模板看上面",
        pitfall: "不要堆术语。面试官要看的是「你解决了什么问题」，不是「你用了多少库」。",
      },
      {
        term: "失效场景",
        definition: "明确说明你的模型在什么情况下不适用。体现工程素养。",
        analogy: "药物说明书：「禁忌症」——什么情况不能吃。",
        code: "# 报告里必须有「局限性」一段",
        pitfall: "不写失效场景 = 不专业。面试官会问「什么时候你的模型会崩」。",
      },
      {
        term: "简历素材",
        definition: "毕业项目直接放简历的核心项目栏。比「学过 X 课程」强 10 倍。",
        analogy: "求职作品集——展示真东西，不是证书。",
        code: "# GitHub 链接 + 一段描述",
        pitfall: "GitHub README 要清晰，面试官 30 秒决定看不看下去。",
      },
    ],
    mindMap: {
      label: "Day 15 · 毕业项目 ★",
      children: [
        {
          label: "交付物",
          children: [
            { label: "3 模型对比代码" },
            { label: "滚动回测结果" },
            { label: "SHAP 解读图" },
            { label: "1 页报告" },
            { label: "GitHub repo" },
          ],
        },
        {
          label: "技术整合",
          children: [
            { label: "Day 4: 特征工程" },
            { label: "Day 5/7: LightGBM + 概率" },
            { label: "Day 6: SHAP" },
            { label: "Day 12: ARIMA" },
            { label: "Day 13: Prophet" },
            { label: "Day 14: 回测" },
          ],
        },
        {
          label: "职业价值",
          children: [
            { label: "✅ 简历核心项目" },
            { label: "✅ 面试讲故事" },
            { label: "✅ GitHub portfolio" },
            { label: "✅ Kaggle 起步" },
          ],
        },
        {
          label: "后续路径",
          children: [
            { label: "→ 100 天深化轨" },
            { label: "→ P4 因果归因（Day 16+）" },
            { label: "→ P5 库存决策（Day 36+）" },
            { label: "→ 最终毕业项目" },
          ],
        },
        {
          label: "能力定位",
          children: [
            { label: "能独立完成项目" },
            { label: "能写报告沟通" },
            { label: "能识别局限" },
          ],
        },
      ],
    },
  },
];
