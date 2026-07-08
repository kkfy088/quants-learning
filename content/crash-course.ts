import type { DayContent } from "@/lib/types";

/**
 * 5 天硬核速成 v3.0
 *
 * 设计哲学：
 * - 内核优先：Boosting 家族 / pandas 核心 / 评估与回测——这些是顶级 ML+量化分析师 80% 时间在用的东西
 * - 通俗类比：每个概念用"傻子也能懂"的类比讲一遍，再用专业术语讲一遍
 * - 代码可跑：每天有 10-30 行能跑的 Python
 * - 反过来教：用"如果你老板问..."的句式，逼学习者真正理解
 *
 * Day 1: Boosting 三剑客 + 树模型内核（最强武器库）
 * Day 2: pandas 十大核心操作 + 特征工程（最高频技能）
 * Day 3: 评估指标 + 回测 + 过拟合（防被骗）
 * Day 4: 时序模型 + 正则化基线（ARIMA/Prophet + 防过拟合）
 * Day 5: 端到端实战——从 CSV 到预测报告
 */

export const crashDays: DayContent[] = [
  // ============================================================
  // DAY 1 — Boosting 三剑客：顶级分析师的"核武器"
  // ============================================================
  {
    id: "crash-1",
    day: 1,
    week: 1,
    track: "crash",
    duration: 120,
    title: "Boosting 三剑客：顶级分析师的核武器",
    description:
      "XGBoost / LightGBM / CatBoost 占据了 Kaggle 70% 的表格数据冠军。搞懂它们就搞懂了现代 ML 的半壁江山。",
    objectives: [
      "理解 Boosting 的核心思想：前一棵树犯的错，后一棵树来补",
      "搞懂 XGBoost / LightGBM / CatBoost 三者的差异（哪个场景用哪个）",
      "理解树模型为什么在表格数据上碾压深度学习",
      "亲手训练第一个 XGBoost 模型",
    ],
    cues: [
      "为什么 Boosting 比 Random Forest 强？（一个补错，一个并行投票）",
      "梯度提升=用梯度下降找'下一棵树应该预测什么'。这句话你能给老板讲清吗？",
      "XGBoost vs LightGBM：哪个快？哪个对类别特征友好？",
      "学习率（learning_rate）和树的数量（n_estimators）是怎么相互制衡的？",
      "为什么表格数据上 XGBoost 还是碾压 Transformer？",
    ],
    content: `
<h3>1.1 一句话搞懂 Boosting：补错大师</h3>

<p><strong>类比版（傻子也能懂）：</strong>想象一个班级预测期末考试成绩。老师先让一个学渣预测，他预测错了。
然后告诉第二个学生："上次预测高了 10 分，你专门去补这 10 分的误差。"
第二个学生只学"如何预测这 10 分的误差"，然后再传给第三个学生继续补……
如此迭代 100 次，100 个学渣凑在一起，预测能力超越了任何单个学霸。</p>

<p><strong>专业版：</strong>Boosting = 串行训练一组弱学习器（通常是决策树），每一棵新树专门拟合前一棵树的<strong>残差</strong>（residual = 真实值 - 当前预测值）。
最终预测 = 所有树的预测之和。这就是"梯度提升"——用梯度下降思想在函数空间中找最优解。</p>

<div class="quote-box">
<blockquote>
<strong>梯度提升的数学内核（一句话）：</strong>
F(x) = F<sub>0</sub>(x) + η·h<sub>1</sub>(x) + η·h<sub>2</sub>(x) + ... + η·h<sub>M</sub>(x)
<br/>其中 h<sub>m</sub> 拟合的是 -∂L/∂F（损失函数对当前预测的负梯度），η 是学习率。
</blockquote>
</div>

<h3>1.2 为什么 Boosting 碾压深度学习（在表格数据上）</h3>

<p>2024 年 <strong>Kaggle 表格数据比赛</strong>的统计：Top 10 解决方案中，<strong>100% 使用了 Boosting</strong>，只有 12% 用了深度学习（且都不是主力）。</p>

<table>
<tr><th>维度</th><th>Boosting（树模型）</th><th>深度学习</th></tr>
<tr><td>表格数据</td><td>★ ★ ★ ★ ★</td><td>★ ★</td></tr>
<tr><td>图像/音频</td><td>★</td><td>★ ★ ★ ★ ★</td></tr>
<tr><td>文本/NLP</td><td>★</td><td>★ ★ ★ ★ ★</td></tr>
<tr><td>小数据集（&lt;1万行）</td><td>★ ★ ★ ★ ★</td><td>★ ★</td></tr>
<tr><td>可解释性</td><td>★ ★ ★ ★</td><td>★</td></tr>
<tr><td>训练速度</td><td>★ ★ ★ ★</td><td>★ ★</td></tr>
</table>

<p><strong>为什么树模型在表格数据上强？</strong>三个原因：</p>
<ol>
<li><strong>天然处理非线性</strong>：树通过分裂节点自动学"如果 X>5 且 Y<3"这种规则，不用手动构造交互特征</li>
<li><strong>对异常值鲁棒</strong>：树只看排序不看绝对值，一个极端值不会像在线性回归里那样把模型带偏</li>
<li><strong>不需要特征缩放</strong>：标准化、归一化都不用做，省心</li>
<li><strong>自动特征选择</strong>：树每次分裂选最重要的特征，无用的特征自然被忽略</li>
</ol>

<h3>1.3 三剑客对比：XGBoost vs LightGBM vs CatBoost</h3>

<table>
<tr><th>维度</th><th>XGBoost</th><th>LightGBM</th><th>CatBoost</th></tr>
<tr><td>出生</td><td>2014（陈天奇）</td><td>2017（微软）</td><td>2017（Yandex）</td></tr>
<tr><td>核心创新</td><td>预排序 + 正则化</td><td>Leaf-wise + GOSS</td><td>Ordered Boosting + 类别原生支持</td></tr>
<tr><td>速度</td><td>中等</td><td>★最快（比 XGB 快 3-5 倍）</td><td>中等</td></tr>
<tr><td>类别特征</td><td>需手动编码</td><td>需手动编码</td><td>★原生支持（不用 OneHot）</td></tr>
<tr><td>小数据集表现</td><td>★最稳</td><td>可能过拟合</td><td>★稳</td></tr>
<tr><td>大数据集（&gt;1000万行）</td><td>慢</td><td>★推荐</td><td>慢</td></tr>
<tr><td>GPU 加速</td><td>有</td><td>有</td><td>有</td></tr>
</table>

<p><strong>选型口诀（背下来）：</strong></p>
<ul>
<li>**数据量 &lt; 10 万行 → XGBoost**（最稳）</li>
<li>**数据量 &gt; 100 万行 → LightGBM**（最快）</li>
<li>**有大量类别特征（如商品 ID、用户 ID）→ CatBoost**（最友好）</li>
<li>**不确定 → 先 XGBoost 跑一版，再试 LightGBM 看能不能更快**</li>
</ul>

<h3>1.4 XGBoost 的核心超参数（必须懂的 5 个）</h3>

<p>顶级调参选手只调这 5 个参数，不要乱调其他的：</p>

<table>
<tr><th>参数</th><th>含义</th><th>类比</th><th>推荐值</th></tr>
<tr><td><code>n_estimators</code></td><td>树的数量</td><td>班级里有多少个学渣</td><td>100-1000</td></tr>
<tr><td><code>max_depth</code></td><td>每棵树最大深度</td><td>每个学渣最多考虑几个变量</td><td>3-8</td></tr>
<tr><td><code>learning_rate</code></td><td>学习率（步长）</td><td>每次补错补多大比例</td><td>0.01-0.3</td></tr>
<tr><td><code>subsample</code></td><td>每棵树用的样本比例</td><td>每个学渣只看部分作业</td><td>0.6-0.9</td></tr>
<tr><td><code>colsample_bytree</code></td><td>每棵树用的特征比例</td><td>每个学渣只看部分科目</td><td>0.6-0.9</td></tr>
</table>

<div class="pit-box">
<strong>⚠️ 黄金法则：</strong><code>n_estimators</code> 和 <code>learning_rate</code> 必须一起调。
<ul>
<li>大 learning_rate + 少树：训练快，但欠拟合</li>
<li>小 learning_rate + 多树：训练慢，但精度高（推荐）</li>
<li>典型组合：learning_rate=0.05, n_estimators=500</li>
</ul>
</div>

<h3>1.5 第一次跑：从 0 到一个 XGBoost 模型</h3>

<pre><code>import pandas as pd
import xgboost as xgb
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error

# 1. 读数据（任何 CSV 都行）
df = pd.read_csv("sales_data.csv")
X = df.drop("sales", axis=1)  # 特征
y = df["sales"]               # 目标

# 2. 划分训练/测试（注意：时序要用 TimeSeriesSplit，这里先简化）
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 3. 训练（5 个核心参数）
model = xgb.XGBRegressor(
    n_estimators=500,       # 500 棵树
    max_depth=6,            # 每棵树最多深度 6
    learning_rate=0.05,     # 学习率 0.05
    subsample=0.8,          # 每棵树用 80% 样本
    colsample_bytree=0.8,   # 每棵树用 80% 特征
    random_state=42,
)
model.fit(X_train, y_train)

# 4. 预测 + 评估
pred = model.predict(X_test)
mae = mean_absolute_error(y_test, pred)
print(f"MAE: {mae:.2f}")  # 平均绝对误差

# 5. 看特征重要性（树模型的最大优势之一）
importance = pd.DataFrame({
    "feature": X.columns,
    "importance": model.feature_importances_,
}).sort_values("importance", ascending=False)
print(importance.head(10))
</code></pre>

<p><strong>这段代码能干什么：</strong>读完一个 CSV，训练一个 XGBoost 模型，输出预测误差和特征重要性排行。
这就是 70% Kaggle 冠军方案的雏形——你已经站在巨人的肩膀上了。</p>

<div class="ex-box">
<h4>✏️ Day 1 必做（不写就白学了）</h4>
<ol>
<li>用上面的代码跑通你自己的数据（没有就用 <a href="https://www.kaggle.com/c/rossmann-store-sales" target="_blank">Rossmann 销量数据</a>）</li>
<li>把 <code>n_estimators</code> 从 100 改到 1000，观察 MAE 怎么变（会先降后稳——这就是"边际收益递减"）</li>
<li>把 <code>learning_rate</code> 改成 0.3 和 0.01 各跑一次，对比 MAE（直观感受学习率的作用）</li>
<li>把特征重要性 Top 5 截图，写一句话总结："这个数据集中，影响销量最大的三个因素是___"</li>
</ol>
</div>

<h3>1.6 那些你必须记住的"行话"</h3>

<table>
<tr><th>术语</th><th>通俗解释</th><th>专业含义</th></tr>
<tr><td>Boosting</td><td>补错大师</td><td>串行训练，每棵树拟合前一棵的残差</td></tr>
<tr><td>Bagging（RF）</td><td>投票小队</td><td>并行训练，多数投票</td></tr>
<tr><td>残差 (Residual)</td><td>上次错的量</td><td>真实值 - 当前预测值</td></tr>
<tr><td>学习率 (Learning Rate)</td><td>每次补多少</td><td>梯度下降的步长 η</td></tr>
<tr><td>Leaf-wise 生长</td><td>挑最肥的叶子长</td><td>LightGBM 的策略，可能过拟合</td></tr>
<tr><td>Level-wise 生长</td><td>按层均衡长</td><td>XGBoost 的策略，更稳定</td></tr>
<tr><td>Gain</td><td>这次分裂赚了多少</td><td>分裂前后损失的减少量</td></tr>
<tr><td>Cover</td><td>这个特征管了多少样本</td><td>经过该节点的样本数</td></tr>
</table>

<div class="tip-box">
💡 <strong>今天学完后你应该能回答：</strong>
<ul>
<li>老板问"为什么用 XGBoost 不用神经网络？"——你能不能用 3 句话答清？</li>
<li>同事说"LightGBM 更快"——你能不能说出在什么场景下他是对的，什么场景下 XGBoost 反而更好？</li>
<li>面试官问"Boosting 和 Bagging 的区别？"——能不能 30 秒讲清？</li>
</ul>
</div>
`,
  },

  // ============================================================
  // DAY 2 — pandas 十大核心 + 特征工程：分析师 80% 时间在做的事
  // ============================================================
  {
    id: "crash-2",
    day: 2,
    week: 1,
    track: "crash",
    duration: 150,
    title: "pandas 十大核心 + 特征工程：高频技能清单",
    description:
      "顶级分析师 80% 的时间在做两件事：清洗数据、构造特征。掌握这 10 个 pandas 操作 + 6 类特征工程，你就超过了 90% 的'会用 Excel'的人。",
    objectives: [
      "掌握 pandas 的 10 个最高频操作（读、筛、改、合、转、时序）",
      "理解特征工程的 6 大类：时间 / 滞后 / 滑动 / 编码 / 交互 / 聚合",
      "能独立从一份原始 CSV 构造 30+ 个特征",
      "知道哪些特征对树模型有用、哪些是噪声",
    ],
    cues: [
      "为什么说'数据清洗 + 特征工程'比'选模型'更重要？（garbage in = garbage out）",
      "lag_7 / lag_28 / rolling_7 各自捕捉什么业务含义？（上周同期 / 上月同期 / 近 7 天趋势）",
      "target encoding 是什么？为什么对类别特征（如商品 ID）特别有效？",
      "你知道怎么把'促销 + 节假日 + 价格'三个特征合成一个交互特征吗？",
      "什么情况下该用 fillna(0)、什么情况下该用 fillna(median)、什么情况下该 dropna？",
    ],
    content: `
<h3>2.1 pandas 十大核心操作（顶级分析师天天在用）</h3>

<h4>① 读取 + 快速诊断</h4>
<pre><code>df = pd.read_csv("sales.csv", parse_dates=["date"])

# 诊断三连——任何新数据都先跑这三行
df.info()         # 看列名、类型、缺失
df.describe()     # 看数值列的分布
df.isnull().sum() # 看每列缺多少</code></pre>

<div class="pit-box"><strong>⚠️ 必坑：</strong><code>parse_dates</code> 一定要在 <code>read_csv</code> 时就指定，不要读进来再转——后期转慢 10 倍且容易出错。</div>

<h4>② 筛选 + 过滤</h4>
<pre><code># 按 condition 筛选
df_sales = df[df["category"] == "drink"]
df_big = df[df["sales"] > df["sales"].quantile(0.95)]  # 销量前 5% 的爆款

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

# 自定义聚合
df.groupby("store_id")["sales"].agg(
    avg_sales="mean",
    max_sales="max",
    cv=lambda x: x.std() / x.mean()  # 变异系数
)</code></pre>

<h4>④ 透视表（pivot_table）</h4>
<pre><code># 店铺 × 月份 的销量矩阵（适合做报表）
pivot = df.pivot_table(
    index="store_id",
    columns="month",
    values="sales",
    aggfunc="sum",
    fill_value=0,
)</code></pre>

<h4>⑤ 合并（merge / join）</h4>
<pre><code># 按某列合并两张表（像 SQL JOIN）
merged = sales.merge(products, on="product_id", how="left")

# how 的四种类型（必须懂）：
# left   - 保留左表所有行（最常用）
# right  - 保留右表所有行
# inner  - 只保留两表都有的
# outer  - 全部保留，没有的填 NaN</code></pre>

<h4>⑥ 时序专用（resample / shift / rolling）</h4>
<pre><code># 确保 datetime 索引
df = df.set_index("date")

# 重采样：日 → 周/月（自动聚合）
weekly = df["sales"].resample("W").sum()
monthly = df["sales"].resample("M").sum()

# 滞后特征：上一行的值
df["sales_lag_1"] = df["sales"].shift(1)   # 昨天的销量
df["sales_lag_7"] = df["sales"].shift(7)   # 上周同天的销量

# 滑动窗口：最近 N 天的均值
df["sales_roll_7"] = df["sales"].rolling(7).mean()
df["sales_roll_28"] = df["sales"].rolling(28).mean()</code></pre>

<div class="tip-box">
💡 <strong>滞后特征是时序预测的灵魂</strong>——
几乎所有顶级销量预测方案的"最强特征"都是 lag 和 rolling。
原因：用户的购买行为有强烈的"昨天影响今天"特性。
</div>

<h4>⑦ apply / map / lambda</h4>
<pre><code># 对一列做映射
df["category_code"] = df["category"].map({"drink": 0, "food": 1, "other": 2})

# 对多列做自定义计算
df["profit"] = df.apply(lambda r: r["revenue"] - r["cost"], axis=1)</code></pre>

<h4>⑧ 缺失值处理</h4>
<pre><code># 三种策略（必须知道何时用哪个）
df["sales"].fillna(0)       # 缺失 = 没卖 → 填 0
df["price"].fillna(df["price"].median())  # 数值列填中位数（抗异常值）
df.dropna(subset=["sales"]) # 关键列缺失 → 直接删行</code></pre>

<div class="pit-box">
<strong>⚠️ 最大坑：缺货日的销量填 0 会害死你。</strong>
缺货 ≠ 没需求。如果某天缺货，销量是 0 但真实需求可能是 50。
正确做法：标记 <code>is_stockout = 1</code>，然后用历史同期或同类商品估算反事实需求。
</div>

<h4>⑨ 类型转换 + 内存优化</h4>
<pre><code># 大数据集必做：节省 70% 内存
df["store_id"] = df["store_id"].astype("category")  # 类别型
df["is_holiday"] = df["is_holiday"].astype("int8")  # 0/1 用 int8
df["sales"] = df["sales"].astype("float32")         # 不用 float64</code></pre>

<h4>⑩ 导出</h4>
<pre><code>df.to_csv("cleaned.csv", index=False)  # index=False 很重要
df.to_parquet("cleaned.parquet")       # 推荐用 parquet（比 csv 小 10 倍、读快 10 倍）
df.to_pickle("cleaned.pkl")            # 临时中转用 pickle（最快）</code></pre>

<h3>2.2 特征工程：6 大类（顶级团队的标配）</h3>

<h4>① 时间特征（从日期拆出来）</h4>
<pre><code>df["year"] = df["date"].dt.year
df["month"] = df["date"].dt.month
df["day_of_week"] = df["date"].dt.dayofweek  # 0=周一
df["day_of_month"] = df["date"].dt.day
df["week_of_year"] = df["date"].dt.isocalendar().week
df["is_weekend"] = (df["day_of_week"] >= 5).astype(int)
df["quarter"] = df["date"].dt.quarter</code></pre>

<h4>② 滞后特征（lag——捕捉"过去的影响现在"）</h4>
<pre><code># 必做：按"店铺+商品"分组后再 lag，否则会串味
df = df.sort_values(["store_id", "product_id", "date"])
df["sales_lag_1"] = df.groupby(["store_id", "product_id"])["sales"].shift(1)
df["sales_lag_7"] = df.groupby(["store_id", "product_id"])["sales"].shift(7)
df["sales_lag_28"] = df.groupby(["store_id", "product_id"])["sales"].shift(28)</code></pre>

<h4>③ 滑动窗口特征（rolling——捕捉近期趋势）</h4>
<pre><code>for w in [7, 14, 28]:
    df[f"sales_roll_mean_{w}"] = df.groupby(["store_id", "product_id"])["sales"].transform(
        lambda x: x.shift(1).rolling(w).mean()
    )
    df[f"sales_roll_std_{w}"] = df.groupby(["store_id", "product_id"])["sales"].transform(
        lambda x: x.shift(1).rolling(w).std()
    )</code></pre>

<div class="pit-box"><strong>⚠️ 必坑：</strong>rolling 必须 <code>shift(1)</code> 后再做，否则就是"用今天的均值预测今天"——信息泄漏，模型上线必崩。</div>

<h4>④ 类别编码（encoding——把文字变成数字）</h4>

<table>
<tr><th>方法</th><th>适用场景</th><th>一句话原理</th></tr>
<tr><td><strong>Label Encoding</strong></td><td>有序类别（低/中/高）</td><td>直接 0/1/2 映射</td></tr>
<tr><td><strong>One-Hot</strong></td><td>类别少（&lt;10）</td><td>每个类别一列 0/1</td></tr>
<tr><td><strong>Target Encoding</strong></td><td>★类别多（商品 ID）</td><td>用该类别的目标均值替代</td></tr>
<tr><td><strong>Frequency Encoding</strong></td><td>类别出现频率有意义</td><td>用该类别出现次数替代</td></tr>
</table>

<pre><code># Target Encoding（Kaggle 神器）——小心过拟合，必须用 K-fold
from category_encoders import TargetEncoder
te = TargetEncoder(cols=["product_id"], smoothing=10)
df["product_id_encoded"] = te.fit_transform(df["product_id"], df["sales"])</code></pre>

<h4>⑤ 交互特征（interaction——捕捉组合效应）</h4>
<pre><code># 促销 × 节假日 = 真正的双 11 效应
df["promo_x_holiday"] = df["is_promo"] * df["is_holiday"]

# 价格 × 销量类别 = 不同价格敏感性
df["price_x_cat"] = df["price"] * df["category_code"]</code></pre>

<div class="tip-box">
💡 <strong>为什么交互特征对线性模型重要，但对树模型不那么重要？</strong>
树模型通过多次分裂天然学交互（先按 promo 分，再按 holiday 分，等价于学了 promo×holiday）。
所以用 XGBoost 时，不用刻意构造交互特征——让树自己做。
</div>

<h4>⑥ 聚合特征（aggregation——把"行级"信息升维到"组级"）</h4>
<pre><code># 每个店铺的历史平均销量（店铺热度）
df["store_avg_sales"] = df.groupby("store_id")["sales"].transform("mean")

# 每个商品在所有店铺的总销量（商品热度）
df["product_total_sales"] = df.groupby("product_id")["sales"].transform("sum")

# 每个店铺-商品组合的销量标准差（稳定性）
df["store_product_cv"] = df.groupby(["store_id", "product_id"])["sales"].transform(
    lambda x: x.std() / x.mean()
)</code></pre>

<h3>2.3 实战：从原始 CSV 到 30+ 特征</h3>

<pre><code># 一份完整的特征工程脚本
def build_features(df):
    # ① 时间
    df["date"] = pd.to_datetime(df["date"])
    df["month"] = df["date"].dt.month
    df["day_of_week"] = df["date"].dt.dayofweek
    df["is_weekend"] = (df["day_of_week"] >= 5).astype(int)

    # ② 类别 + 聚合
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
    df["promo_x_holiday"] = df["is_promo"] * df["is_holiday"]

    # ⑥ 缺失值（lag/rolling 前几行必然缺失）
    df = df.dropna()
    return df

# 用法
df = pd.read_csv("sales.csv")
df_featured = build_features(df)
print(f"原始列数: {len(df.columns)}, 特征工程后: {len(df_featured.columns)}")
</code></pre>

<div class="ex-box">
<h4>✏️ Day 2 必做（不练等于没学）</h4>
<ol>
<li>用上面的 <code>build_features</code> 函数处理你的数据</li>
<li>统计：<strong>最终的特征数 ≥ 20</strong>？如果没有，检查是不是漏了某个类别</li>
<li>打印 <code>df.corr()["sales"].sort_values(ascending=False).head(10)</code>——看哪些特征和销量相关性最强</li>
<li>把 Top 5 相关特征截图，写一句话总结："我的数据中预测销量最强的是___"</li>
</ol>
</div>

<h3>2.4 特征工程的"潜规则"</h3>

<table>
<tr><th>规则</th><th>原因</th></tr>
<tr><td>所有 lag/rolling 必须 shift(1)</td><td>否则信息泄漏，模型上线崩盘</td></tr>
<tr><td>聚合特征不能用未来信息</td><td>store_avg_sales 应该用历史均值，不是全期均值</td></tr>
<tr><td>类别编码必须 fit 在训练集</td><td>不能 fit 在全集，否则就是"考试看了答案"</td></tr>
<tr><td>稀疏类别要合并</td><td>出现次数 &lt; 10 的商品 ID 应该归为 "other"</td></tr>
<tr><td>用 parquet 不要用 csv</td><td>parquet 保留 dtype，速度快 10 倍</td></tr>
</table>

<div class="tip-box">
💡 <strong>今天结束你应该能回答：</strong>
<ul>
<li>拿到一份新的销量数据，能不能 30 分钟内构造出 20+ 个特征？</li>
<li>知道为什么 lag_7 通常比 lag_1 更重要？（周季节性）</li>
<li>知道为什么 target encoding 对商品 ID 特别有效？（捕捉"这个商品天生就卖得多"的先验）</li>
</ul>
</div>
`,
  },

  // ============================================================
  // DAY 3 — 评估指标 + 回测 + 过拟合：防被骗的三件套
  // ============================================================
  {
    id: "crash-3",
    day: 3,
    week: 1,
    track: "crash",
    duration: 120,
    title: "评估 + 回测 + 过拟合：防被骗的三件套",
    description:
      "顶级分析师的标志不是会用多少模型，而是能判断模型好坏。今天教你三个核心技能：选对评估指标、做严格的回测、识别过拟合。",
    objectives: [
      "掌握 5 个核心评估指标（MAE/MAPE/WAPE/RMSE/R²）及何时用哪个",
      "理解为什么时序数据不能用 train_test_split——必须用滚动回测",
      "学会用训练误差 vs 测试误差的差距识别过拟合",
      "掌握 3 个防过拟合的核心技巧",
    ],
    cues: [
      "为什么 MAPE 会'欺骗'你？（低销量日的误差被放大）",
      "WAPE 和 MAPE 的区别是什么？什么时候该用 WAPE？",
      "TimeSeriesSplit 为什么不能 shuffle？'信息泄漏'是什么意思？",
      "训练 MAE=2，测试 MAE=30——这是什么问题？怎么解决？",
      "正则化、early stopping、降低复杂度——三个防过拟合手段的适用场景？",
    ],
    content: `
<h3>3.1 评估指标：5 个核心，一个不能少</h3>

<table>
<tr><th>指标</th><th>公式（一句话）</th><th>优点</th><th>缺点</th><th>何时用</th></tr>
<tr><td><strong>MAE</strong></td><td>平均绝对误差</td><td>直观、抗异常值</td><td>不分大小</td><td>常规场景</td></tr>
<tr><td><strong>MAPE</strong></td><td>平均绝对百分比误差</td><td>可解释（误差 5%）</td><td>低销量时爆炸</td><td>销量稳定</td></tr>
<tr><td><strong>WAPE</strong></td><td>加权百分比误差</td><td>抗低销量</td><td>偏重大销量</td><td>★推荐</td></tr>
<tr><td><strong>RMSE</strong></td><td>均方根误差</td><td>惩罚大误差</td><td>对异常值敏感</td><td>关注极端错</td></tr>
<tr><td><strong>R²</strong></td><td>决定系数</td><td>0-1 直观</td><td>时序场景误导</td><td>线性回归</td></tr>
</table>

<h4>通俗类比：每种指标在回答什么问题</h4>

<p><strong>MAE</strong> = "平均每次预测差多少？"<br/>
→ 老板问"销量预测准不准？" → 答："MAE = 50 件"</p>

<p><strong>MAPE</strong> = "平均每次预测差百分之几？"<br/>
→ 老板问"误差比例？" → 答："MAPE = 15%"</p>

<p><strong>WAPE</strong> = "总误差占总销量的百分之几？"<br/>
→ 老板问"整体表现？" → 答："WAPE = 8%"（比 MAPE 稳）</p>

<p><strong>RMSE</strong> = "最坏情况差多少？"<br/>
→ 老板问"有没有预测离谱的时候？" → 答："RMSE = 200，远大于 MAE=50，说明有极端错"</p>

<h4>代码实现</h4>
<pre><code>import numpy as np

def compute_metrics(y_true, y_pred):
    mae = np.mean(np.abs(y_true - y_pred))
    mape = np.mean(np.abs((y_true - y_pred) / np.clip(y_true, 1, None))) * 100
    wape = np.sum(np.abs(y_true - y_pred)) / np.sum(np.abs(y_true)) * 100
    rmse = np.sqrt(np.mean((y_true - y_pred) ** 2))
    return {"MAE": mae, "MAPE": mape, "WAPE": wape, "RMSE": rmse}

# 用法
metrics = compute_metrics(y_test, y_pred)
for k, v in metrics.items():
    print(f"{k}: {v:.2f}")
</code></pre>

<div class="pit-box">
<strong>⚠️ MAPE 的大坑：</strong>当真实值接近 0 时（比如某天销量只有 1 件），预测误差会爆炸（500%），
拉高整个 MAPE。这种情况一定要用 WAPE。
</div>

<h3>3.2 回测：为什么不能用 train_test_split</h3>

<p><strong>类比：</strong>用 train_test_split 切时序数据 = 让学生先看期末考试的答案，再去做练习。
他练习分数一定很高，但考试时崩盘。</p>

<p><strong>为什么：</strong>train_test_split 默认 shuffle（随机打乱），所以"训练集"里可能包含 2025-12-31 的数据，
而"测试集"里是 2025-01-01。模型学到了"未来的规律"，去预测"过去"——这叫<strong>信息泄漏</strong>。</p>

<h4>正确做法：滚动回测（TimeSeriesSplit 或自定义）</h4>

<pre><code>from sklearn.model_selection import TimeSeriesSplit

# 标准的时序交叉验证
tscv = TimeSeriesSplit(n_splits=5)
for train_idx, test_idx in tscv.split(df):
    train, test = df.iloc[train_idx], df.iloc[test_idx]
    # 训练 → 预测 → 评估
    model.fit(train[features], train["sales"])
    pred = model.predict(test[features])
    print(compute_metrics(test["sales"], pred))</code></pre>

<h4>滚动窗口回测（更贴近业务）</h4>

<pre><code># 模拟真实业务：每个月用过去 90 天训练，预测未来 7 天
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
        start += horizon  # 滑动窗口
    return results</code></pre>

<div class="tip-box">
💡 <strong>顶级团队的回测原则：</strong>
<ul>
<li>训练集必须严格在测试集之前（时间上）</li>
<li>滚动窗口 = 模拟真实上线场景</li>
<li>报告时给"多次回测的平均误差"，不要只给一次</li>
<li>报告时给"最差的一次"——告诉老板"最坏情况误差是 X%"</li>
</ul>
</div>

<h3>3.3 过拟合：识别 + 防范</h3>

<h4>过拟合的症状</h4>
<table>
<tr><th>信号</th><th>含义</th></tr>
<tr><td>训练 MAE=2，测试 MAE=30</td><td>差距 15 倍 → 严重过拟合</td></tr>
<tr><td>训练损失持续下降，验证损失开始上升</td><td>学的不是规律是噪声</td></tr>
<tr><td>训练集 R²=0.99，测试集 R²=0.3</td><td>背下了训练数据</td></tr>
<tr><td>特征重要性 Top 5 是噪声特征</td><td>模型学错方向了</td></tr>
</table>

<h4>过拟合的三大成因 + 对策</h4>

<table>
<tr><th>成因</th><th>对策</th><th>XGBoost 代码</th></tr>
<tr><td>模型太复杂（树太深）</td><td>降低 max_depth</td><td><code>max_depth=4</code></td></tr>
<tr><td>树太多（学得太细）</td><td>用 early stopping</td><td><code>early_stopping_rounds=50</code></td></tr>
<tr><td>每棵树看到太多</td><td>加正则化 + subsample</td><td><code>subsample=0.7, colsample_bytree=0.7</code></td></tr>
</table>

<h4>Early Stopping（神器）</h4>

<pre><code># XGBoost 的 early stopping：验证集不再改善就停
model.fit(
    X_train, y_train,
    eval_set=[(X_val, y_val)],
    verbose=False,
)
# XGBoost 2.0+ 自动启用 early stopping
# 老 API: early_stopping_rounds=50</code></pre>

<div class="quote-box">
<blockquote><strong>早期停止 = 自动找最佳树数量。</strong>
不停止 → 1000 棵树全用 → 过拟合；
早停 → 验证误差不再下降时（比如第 247 棵）→ 自动停 → 最佳模型。
</blockquote>
</div>

<h3>3.4 完整训练流程（顶级团队的标准动作）</h3>

<pre><code># 一个完整的训练 + 评估 + 防过拟合 pipeline
def train_and_evaluate(df, target="sales"):
    df = df.sort_values("date").reset_index(drop=True)
    features = [c for c in df.columns if c not in [target, "date"]]

    # ① 三段式切分：训练 / 验证 / 测试
    n = len(df)
    train = df.iloc[: int(n * 0.7)]
    val = df.iloc[int(n * 0.7) : int(n * 0.85)]
    test = df.iloc[int(n * 0.85) :]

    # ② 训练（带 early stopping）
    model = xgb.XGBRegressor(
        n_estimators=1000,
        max_depth=6,
        learning_rate=0.05,
        subsample=0.8,
        colsample_bytree=0.8,
        early_stopping_rounds=50,  # ★核心
        random_state=42,
    )
    model.fit(
        train[features], train[target],
        eval_set=[(val[features], val[target])],
        verbose=False,
    )

    # ③ 评估
    pred_test = model.predict(test[features])
    pred_train = model.predict(train[features])

    train_mae = mean_absolute_error(train[target], pred_train)
    test_mae = mean_absolute_error(test[target], pred_test)
    test_metrics = compute_metrics(test[target], pred_test)

    print(f"训练 MAE: {train_mae:.2f}")
    print(f"测试 MAE: {test_mae:.2f}")
    print(f"过拟合比: {test_mae / train_mae:.1f}x （&gt;3x 表示严重过拟合）")
    print(f"测试指标:")
    for k, v in test_metrics.items():
        print(f"  {k}: {v:.2f}")

    return model</code></pre>

<div class="ex-box">
<h4>✏️ Day 3 必做</h4>
<ol>
<li>用 Day 1 的 XGBoost + Day 2 的特征，跑完整训练流程</li>
<li>打印"训练 MAE / 测试 MAE / 过拟合比"</li>
<li>如果过拟合比 &gt; 3x：把 max_depth 从 6 降到 4，重新跑</li>
<li>开启 early stopping，记录"最佳树数量"（model.best_iteration）</li>
<li>写一句话总结："我的模型在测试集上 WAPE = X%，过拟合比 = Yx"</li>
</ol>
</div>

<h3>3.5 那些"行话"</h3>

<table>
<tr><th>术语</th><th>通俗解释</th></tr>
<tr><td>训练误差</td><td>模型在练习题上的得分</td></tr>
<tr><td>测试误差</td><td>模型在考试时的得分</td></tr>
<tr><td>泛化能力</td><td>面对新题的表现</td></tr>
<tr><td>过拟合</td><td>背下了练习题，考试崩盘</td></tr>
<tr><td>欠拟合</td><td>练习题都没学好</td></tr>
<tr><td>正则化</td><td>给模型戴"紧箍咒"，防止它太较真</td></tr>
<tr><td>Early Stopping</td><td>考试前停止刷题，避免过度记忆</td></tr>
<tr><td>信息泄漏</td><td>训练时偷看了答案</td></tr>
</table>
`,
  },

  // ============================================================
  // DAY 4 — 时序模型 + 正则化基线
  // ============================================================
  {
    id: "crash-4",
    day: 4,
    week: 1,
    track: "crash",
    duration: 120,
    title: "时序模型：ARIMA / Prophet + 正则化基线",
    description:
      "XGBoost 不是万能的——小数据集（&lt;1000 行）或强季节性场景，ARIMA/Prophet 更稳。今天学两套时序专用模型 + 一个永远要做的 baseline。",
    objectives: [
      "理解 ARIMA 的 (p,d,q) 三参数及如何用 ACF/PACF 选参",
      "会用 Prophet 自动处理节假日 + 趋势变点 + 异常值",
      "理解什么时候该用时序模型，什么时候该用 ML 模型",
      "学会用'naive baseline'防被骗——任何模型都要先打赢它",
    ],
    cues: [
      "为什么数据 &lt;1000 行不要用 XGBoost？（参数比样本还多，必过拟合）",
      "ARIMA 的 (p,d,q) 各自是什么？怎么用 ACF/PACF 图定参？",
      "Prophet 的'趋势变点'和'节假日效应'是怎么自动学的？",
      "naive baseline（用昨天的值预测今天）——为什么所有模型都要先打赢它？",
      "ARIMA 适合什么数据？Prophet 适合什么数据？",
    ],
    content: `
<h3>4.1 模型选型决策树（背下来）</h3>

<pre><code>数据量？
├─ &lt; 100 行 → 用 mean/median 当预测（别折腾模型了）
├─ 100-1000 行 → ARIMA / Prophet / 指数平滑（小样本友好）
├─ 1000-10万行 → XGBoost / LightGBM（★首选）
└─ &gt; 10万行 → LightGBM / 深度学习（LSTM/Transformer）

强季节性？
├─ 单一周期（周/月）→ SARIMA / Prophet
└─ 多重周期（周+月+年）→ Prophet / TBATS（ARIMA 会爆炸）

有外部特征（促销、天气）？
├─ 有 → XGBoost / SARIMAX（ARIMA + 外生变量）
└─ 无 → ARIMA / Prophet
</code></pre>

<div class="tip-box">
💡 <strong>一句话决策：</strong>数据少 + 纯时序 → ARIMA/Prophet；数据多 + 有外部特征 → XGBoost。
深度学习只在数据 &gt;100 万行且有时序结构时考虑。
</div>

<h3>4.2 ARIMA：经典之王</h3>

<h4>三个参数的故事（傻子也能懂）</h4>

<p>ARIMA(p, d, q)：</p>
<ul>
<li><strong>p（AR 自回归）</strong>："今天的值 = 过去 N 天的值的线性组合"——N 就是 p</li>
<li><strong>d（差分次数）</strong>："为了让数据变平稳，需要做几次差分"——通常 0 或 1</li>
<li><strong>q（MA 滑动平均）</strong>："今天的值 = 过去 N 天的噪声的线性组合"——N 就是 q</li>
</ul>

<h4>平稳性：ARIMA 的前提</h4>

<p><strong>类比：</strong>ARIMA 假设数据的"统计规律"是恒定的（均值、方差不随时间变）。
如果数据有上升或下降趋势（比如销量年年涨），就必须先<strong>差分</strong>——用今天的值减昨天的值，得到"变化量"序列，这个序列通常就平稳了。</p>

<pre><code>from statsmodels.tsa.stattools import adfuller

# ADF 检验：p &lt; 0.05 表示平稳
result = adfuller(df["sales"])
print(f"p-value: {result[1]}")
if result[1] &lt; 0.05:
    print("✅ 平稳，d=0")
else:
    print("❌ 不平稳，需要差分 d=1")
    diff = df["sales"].diff().dropna()
    result2 = adfuller(diff)
    print(f"差分后 p-value: {result2[1]}")</code></pre>

<h4>用 ACF/PACF 图定 p 和 q</h4>

<pre><code>from statsmodels.graphics.tsaplots import plot_acf, plot_pacf
import matplotlib.pyplot as plt

fig, axes = plt.subplots(1, 2, figsize=(12, 4))
plot_acf(df["sales"], ax=axes[0])   # 看 q
plot_pacf(df["sales"], ax=axes[1])  # 看 p
plt.show()
</code></pre>

<table>
<tr><th>图</th><th>怎么读</th></tr>
<tr><td>ACF（自相关）</td><td>第几根柱子超出蓝色区间 → q 就是几</td></tr>
<tr><td>PACF（偏自相关）</td><td>第几根柱子超出蓝色区间 → p 就是几</td></tr>
</table>

<h4>训练 ARIMA</h4>

<pre><code>from statsmodels.tsa.arima.model import ARIMA

# 训练（参数 p=2, d=1, q=2）
model = ARIMA(df["sales"], order=(2, 1, 2))
fitted = model.fit()

# 预测未来 7 天
forecast = fitted.forecast(steps=7)
print(forecast)

# 看 AIC（越小越好，用于对比不同参数）
print(f"AIC: {fitted.aic:.2f}")</code></pre>

<h4>SARIMA（带季节）</h4>

<pre><code>from statsmodels.tsa.statespace.sarimax import SARIMAX

# 季节周期 m=7（周）
model = SARIMAX(
    df["sales"],
    order=(2, 1, 2),
    seasonal_order=(1, 0, 1, 7),
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

<h3>4.3 Prophet：Facebook 的"傻瓜式"时序神器</h3>

<p><strong>Prophet 的核心思想：</strong>把时序拆解成 <strong>趋势 + 季节 + 节假日 + 噪声</strong>，每部分独立建模，自动拟合。</p>

<pre><code>y(t) = g(t) + s(t) + h(t) + ε(t)
      ↑       ↑       ↑       ↑
    趋势    季节   节假日   残差</code></pre>

<h4>用 Prophet 的最大好处：自动化</h4>
<ul>
<li>✅ 自动检测趋势变点（changepoints）</li>
<li>✅ 自动学习周/月/年季节性</li>
<li>✅ 内置中国节假日（diwali、双 11、春节）</li>
<li>✅ 自动处理异常值（用鲁棒回归）</li>
<li>✅ 不需要手动差分</li>
</ul>

<pre><code>from prophet import Prophet

# Prophet 要求列名必须是 ds 和 y
df_prophet = df[["date", "sales"]].rename(columns={"date": "ds", "sales": "y"})

# 创建模型 + 加中国节假日
m = Prophet(
    yearly_seasonality=True,
    weekly_seasonality=True,
    daily_seasonality=False,
    changepoint_prior_scale=0.05,  # 趋势灵活度（大=敏感）
)
m.add_country_holidays(country_name="CN")  # 加中国节假日

# 训练 + 预测
m.fit(df_prophet)
future = m.make_future_dataframe(periods=7)
forecast = m.predict(future)

# 看分解图（趋势 + 季节 + 节假日）——Prophet 最有价值的可视化
fig = m.plot_components(forecast)
</code></pre>

<div class="tip-box">
💡 <strong>Prophet 的"changepoint_prior_scale"</strong>是它的灵魂参数：
<ul>
<li>默认 0.05 → 平衡</li>
<li>调到 0.5 → 趋势非常灵活（适合突变数据，但可能过拟合）</li>
<li>调到 0.005 → 趋势非常平滑（适合稳定增长）</li>
</ul>
</div>

<h3>4.4 Naive Baseline：永远要做的"傻子预测"</h3>

<p><strong>类比：</strong>任何模型上线前，先问一句："如果我不做模型，就用'昨天的值'预测今天，误差是多少？"
这个误差就是 naive baseline。如果你的复杂模型打不过它 → 你的模型没用。</p>

<pre><code># 4 个 baseline，任何项目都要先跑
def compute_baselines(df, target="sales"):
    df = df.sort_values("date").reset_index(drop=True)
    y = df[target]
    results = {}

    # ① Naive: 用昨天的值
    results["naive"] = np.mean(np.abs(y.diff().dropna()))

    # ② Seasonal naive: 用上周同天的值
    results["seasonal_naive_7"] = np.mean(np.abs(y - y.shift(7)).dropna())

    # ③ Mean: 用历史均值
    results["mean"] = np.mean(np.abs(y - y.expanding().mean().shift(1)).dropna())

    # ④ Median: 用历史中位数
    results["median"] = np.mean(np.abs(y - y.expanding().median().shift(1)).dropna())

    return results

baselines = compute_baselines(df)
print("=== Baselines ===")
for name, mae in baselines.items():
    print(f"{name}: MAE = {mae:.2f}")
</code></pre>

<div class="quote-box">
<blockquote><strong>金科玉律：</strong>你的模型 MAE 必须 &lt; 最好的 baseline 的 70%，才值得上线。
否则直接用 baseline（更简单、更稳）。
</blockquote>
</div>

<h3>4.5 何时用什么模型（终极对照表）</h3>

<table>
<tr><th>场景</th><th>推荐模型</th><th>原因</th></tr>
<tr><td>数据 &lt; 500 行，纯时序</td><td>ARIMA / Prophet</td><td>小样本友好</td></tr>
<tr><td>数据 1万+，有外部特征</td><td>XGBoost</td><td>特征多就强</td></tr>
<tr><td>强多重季节（周+月+年）</td><td>Prophet</td><td>ARIMA 处理不了多重</td></tr>
<tr><td>需要可解释性</td><td>Prophet / XGBoost+SHAP</td><td>能拆解</td></tr>
<tr><td>实时性要求高</td><td>XGBoost</td><td>推理快</td></tr>
<tr><td>新商品冷启动</td><td>用相似商品的历史均值</td><td>无数据可学</td></tr>
</table>

<div class="ex-box">
<h4>✏️ Day 4 必做</h4>
<ol>
<li>用 Day 1 的数据，先跑 4 个 baselines（必须先做！）</li>
<li>训练一个 ARIMA / Prophet 模型</li>
<li>对比：你的 XGBoost（Day 1）vs ARIMA/Prophet vs baselines，谁的 MAE 最低？</li>
<li>如果 XGBoost 没打过 baseline → 检查特征工程（Day 2 的 lag/rolling 有没有做对）</li>
<li>画 Prophet 的 components 分解图，截图保存</li>
</ol>
</div>
`,
  },

  // ============================================================
  // DAY 5 — 端到端实战：把所有东西串起来
  // ============================================================
  {
    id: "crash-5",
    day: 5,
    week: 1,
    track: "crash",
    duration: 180,
    title: "端到端实战：从 CSV 到预测报告",
    description:
      "把前 4 天学的全部串起来：读 CSV → pandas 清洗 → 特征工程 → baseline → XGBoost 训练 + early stopping → 对比 ARIMA → 出报告。这是你能写进简历的项目。",
    objectives: [
      "独立完成一个端到端的销量预测项目",
      "代码组织成可复用的 pipeline（不是一坨面条代码）",
      "产出一份专业的预测报告（含图 + 表 + 结论）",
      "知道哪些环节交给 AI、哪些必须人来判断",
    ],
    cues: [
      "为什么端到端 pipeline 比单段代码重要？（可复现 + 可迭代）",
      "baseline → 简单模型 → 复杂模型，为什么要按这个顺序？（防止'用大炮打蚊子'）",
      "报告里最重要的不是 MAE 是多少，而是'对业务有什么意义'——你能写出吗？",
      "哪些环节交给 AI？（数据清洗、代码生成、报告草稿）哪些必须人来判断？（业务假设、风控）",
    ],
    content: `
<h3>5.1 项目目标：一个能写进简历的销量预测项目</h3>

<p><strong>你要交付的：</strong></p>
<ol>
<li>一个 <code>run_pipeline.py</code> 脚本——任何人下载后能 1 分钟内复现</li>
<li>一份预测报告（Markdown / PDF）——含 5 张图 + 3 个结论 + 1 个建议</li>
<li>一个 GitHub repo——展示工程化能力</li>
</ol>

<h3>5.2 项目结构（顶级团队的标准）</h3>

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
└── run_pipeline.py        # 端到端入口
</code></pre>

<h3>5.3 完整 pipeline 代码</h3>

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
# 2. 特征工程（Day 2 的内容）
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
# 4. XGBoost 训练（Day 1+3 的内容）
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
    return model, mae, wape, test, pred

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
def generate_report(baselines, xgb_result, prophet_mae):
    xgb_mae, xgb_wape = xgb_result[1], xgb_result[2]
    best_baseline = min(baselines.values())

    report = f"""# 销量预测报告

**日期**：2026-07-09
**数据集**：{df.shape[0]} 行 × {df.shape[1]} 列

## 一、模型对比

| 模型 | MAE | 备注 |
|------|-----|------|
| Naive baseline | {baselines['naive']:.2f} | 用昨天的值 |
| Seasonal Naive | {baselines['seasonal_naive_7']:.2f} | 用上周同天 |
| Mean baseline | {baselines['mean']:.2f} | 用历史均值 |
| **XGBoost** | **{xgb_mae:.2f}** | WAPE={xgb_wape:.2f}% |
| Prophet | {prophet_mae:.2f} | 自动趋势+季节 |

## 二、结论

1. 最强模型：{'XGBoost' if xgb_mae &lt; prophet_mae else 'Prophet'}（MAE={min(xgb_mae, prophet_mae):.2f}）
2. 相比 baseline 提升：{(1 - min(xgb_mae, prophet_mae) / best_baseline) * 100:.1f}%
3. 整体误差水平：WAPE={xgb_wape:.2f}%

## 三、业务建议

- 预测精度{'达标' if xgb_wape &lt; 20 else '待优化'}（阈值 WAPE &lt; 20%）
- {'可以用于库存决策' if xgb_wape &lt; 15 else '建议继续优化特征工程'}
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
    xgb_result = train_xgboost(df)
    prophet_mae = train_prophet(df)
    generate_report(baselines, xgb_result, prophet_mae)
    print("\\n🎉 全流程完成！")
</code></pre>

<h3>5.4 报告模板（写报告就是写"决策"）</h3>

<p>顶级分析师的报告<strong>不是罗列数字</strong>，而是回答 3 个问题：</p>

<ol>
<li><strong>发生了什么</strong>（数据描述 + 关键趋势）</li>
<li><strong>为什么</strong>（归因——哪个特征贡献最大）</li>
<li><strong>所以呢</strong>（对业务的影响 + 行动建议）</li>
</ol>

<div class="quote-box">
<blockquote><strong>记住：</strong>老板看的不是 MAE=8.5，而是"WAPE=15% → 可以用于补货决策，预计节省 12% 库存成本"。
</blockquote>
</div>

<h3>5.5 人机边界：哪些交给 AI、哪些必须人来</h3>

<table>
<tr><th>环节</th><th>人 / AI</th><th>原因</th></tr>
<tr><td>提出业务假设</td><td>★ 人</td><td>机器不懂业务，人定方向</td></tr>
<tr><td>数据清洗代码</td><td>✓ AI</td><td>规则明确，AI 写得又快又对</td></tr>
<tr><td>特征工程设计</td><td>★ 人</td><td>需要业务理解</td></tr>
<tr><td>特征实现代码</td><td>✓ AI</td><td>有 lag/rolling 标准模式</td></tr>
<tr><td>模型选型</td><td>人+AI</td><td>AI 给建议，人定方向</td></tr>
<tr><td>模型训练代码</td><td>✓ AI</td><td>标准化</td></tr>
<tr><td>评估 + 回测</td><td>✓ AI</td><td>规则明确</td></tr>
<tr><td>结果解释</td><td>人+AI</td><td>AI 给数据，人解读</td></tr>
<tr><td>业务建议</td><td>★ 人</td><td>需要业务判断</td></tr>
<tr><td>上线决策</td><td>★ 人</td><td>需要问责</td></tr>
</table>

<div class="tip-box">
💡 <strong>今天的核心：</strong>
<ul>
<li>pipeline 化——可复现、可迭代</li>
<li>baseline 优先——防"用大炮打蚊子"</li>
<li>报告 = 决策建议，不是数字罗列</li>
<li>人定方向、机器跑流程——这是顶级分析师的工作方式</li>
</ul>
</div>

<div class="ex-box">
<h4>✏️ Day 5 必做（毕业作业）</h4>
<ol>
<li>用上面的 pipeline 模板，跑通你的数据</li>
<li>写一份 Markdown 报告（按 5.4 的模板）</li>
<li>把代码推到 GitHub（README 写清复现步骤）</li>
<li>把报告发到一个朋友/同事，问他"看懂了吗？"——他看懂了 = 你成功了</li>
</ol>
</div>

<h3>5.6 5 天结束你应该在哪里</h3>

<table>
<tr><th>能力</th><th>5 天前</th><th>5 天后</th></tr>
<tr><td>看到销量数据</td><td>打开 Excel 看图</td><td>读 CSV → 特征工程 → 训模型 → 出报告</td></tr>
<tr><td>选模型</td><td>"随便用一个"</td><td>看数据量 + 特征数 + 季节性，按决策树选</td></tr>
<tr><td>评估模型</td><td>"看着挺准"</td><td>用 MAE/WAPE + 多次回测 + baseline 对比</td></tr>
<tr><td>用 XGBoost</td><td>"听说过"</td><td>会调 5 个核心参数 + early stopping</td></tr>
<tr><td>写报告</td><td>"误差是 10%"</td><td>"WAPE=12%，相比 naive baseline 提升 35%，建议用于补货"</td></tr>
<tr><td>和 AI 协作</td><td>"完全依赖"</td><td>知道哪些环节交给 AI、哪些必须自己判断</td></tr>
</table>

<div class="quote-box">
<blockquote><strong>5 天让你站在顶级分析师的肩膀上。</strong>
你已经知道内核武器（Boosting）、最高频技能（pandas+特征）、防骗三件套（评估+回测+过拟合）、时序经典（ARIMA+Prophet）和端到端工程化。
下一步就是 100 天修炼——把每个主题钻深、做项目、写博客、教别人。
</blockquote>
</div>
`,
  },
];
