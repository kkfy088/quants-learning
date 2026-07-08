import type { DayContent } from "@/lib/types";

// Helper to generate placeholder days 30-99
function placeholderDay(i: number): DayContent {
  const wk = Math.floor(i / 7) + 1;
  const stageNames: Record<number, string> = {
    5: "因子挖掘深化", 6: "因子挖掘深化", 7: "Agent框架实战",
    8: "Agent框架实战", 9: "高级预测方法", 10: "高级预测方法",
    11: "供应链深度应用", 12: "供应链深度应用", 13: "工程化与落地",
    14: "工程化与落地",
  };
  const dayNames = [
    "因子评估体系深入", "因子组合与合成", "因子库建设", "因子衰减分析",
    "行业因子对标", "自定义因子设计", "因子回测框架", "周复习",
    "LangGraph入门", "LangGraph状态管理", "LangGraph条件分支", "LangGraph实战流水线",
    "CrewAI多角色协作", "CrewAI+LangGraph组合", "AutoGen代码沙箱", "周复习",
    "LSTM时序预测", "Transformer时序", "时序CV深入", "概率预测与区间估计",
    "多任务学习", "时序聚类", "异常检测与预警", "周复习",
    "库存优化模型", "多级供应链预测", "促销量化评估", "S&OP流程量化",
    "需求感知与信号", "牛鞭效应量化", "补货策略优化", "周复习",
    "模型部署(Flask/FastAPI)", "Docker容器化", "MLflow实验管理", "监控与告警体系",
    "A/B测试设计", "持续训练流水线", "全栈回顾", "毕业项目",
  ];
  const title = dayNames[Math.min(i - 30, dayNames.length - 1)] || `Day ${i + 1} 深度学习`;
  const stage = stageNames[wk] || "深度学习";

  return {
    id: `deep-${i + 1}`,
    day: i + 1,
    week: wk,
    track: "deep",
    title,
    description: `${stage} — ${title}`,
    objectives: ["内容持续迭代中", "利用右侧AI可提前探索"],
    duration: 45,
    cues: ["内容持续迭代中", "利用右侧AI可提前探索"],
    content: `<blockquote>Day ${i + 1} — 将在你完成前30天后，根据学习进度持续生成详细内容。</blockquote>
<p>当前阶段：<strong>${stage}</strong></p>
<p>💡 可以先在右侧AI助手中询问：<em>"我应该怎么开始学习${title}？有哪些前置知识？"</em></p>`,
  };
}

export const deepDays: DayContent[] = [
  // ========== W1: Fundamentals ==========
  {
    id: "deep-1", day: 1, week: 1, track: "deep",
    title: "什么是量化分析？供应链为什么需要它？",
    description: "量化思维建立，供应链预测特殊挑战",
    objectives: ["理解量化的本质", "认识供应链预测的六大挑战", "建立数据驱动思维"],
    duration: 30,
    cues: ["量化的本质", "供应链预测的特殊挑战（层级/间断/促销/牛鞭/缺货截断）", "量化vs传统：一个例子"],
    content: `<h3>量化=数据+模型+代码+判断</h3>
<p><span class="key-pt">量化不是"用AI替代人"，而是把可重复的执行自动化，把人释放到需要判断力的环节。</span></p>
<h3>供应链预测的特殊挑战</h3>
<ul><li><strong>层级性：</strong>SKU→品类→仓库→区域，各层预测需自洽</li>
<li><strong>间断性：</strong>很多SKU不是天天有销量，传统模型直接失效</li>
<li><strong>促销扰动：</strong>大促暴涨5-10倍，是信号还是噪声？</li>
<li><strong>缺货截断：</strong>卖断货=你只看到部分需求，历史数据本身有偏</li>
<li><strong>牛鞭效应：</strong>需求波动沿供应链逐级放大</li></ul>
<div class="pit-box"><h4>⚠️ 最容易被忽视的问题</h4><p><strong>缺货截断（Censored Demand）：</strong>销量=0可能不是真的没人买，而是没货可卖。如果你用缺货期间的数据训练模型，模型会学到"以后也少备点货"——然后持续缺货。这是供应链预测中最隐蔽也最致命的陷阱。</p></div>
<div class="ex-box"><h4>✏️ 练习</h4><ol><li>写下你工作中最头疼的3个预测难题</li><li>标注：数据问题还是判断问题？</li><li>想想如果有AI助手，最希望它帮你解决哪个？</li></ol></div>`,
  },
  {
    id: "deep-2", day: 2, week: 1, track: "deep",
    title: "Python环境搭建 + 第一个量化脚本",
    description: "工具链安装，Hello World级别的量化脚本",
    objectives: ["搭建Python开发环境", "运行第一个数据分析脚本", "理解数据生成→统计→绘图流程"],
    duration: 45,
    cues: ["Python版本选哪个？虚拟环境是什么？", "Jupyter Notebook有什么用？", "第一个脚本：生成数据→统计→画图"],
    content: `<pre><code># 1. Python 3.10+ <a href="https://www.python.org/downloads/" target="_blank">python.org</a>
# 2. VS Code <a href="https://code.visualstudio.com/" target="_blank">code.visualstudio.com</a>
# 3. 或直接用 <a href="https://colab.research.google.com/" target="_blank">Google Colab</a>（零安装）

pip install pandas numpy matplotlib scikit-learn statsmodels plotly prophet xgboost jupyter</code></pre>
<pre><code># first_script.py — 第一个量化脚本
import pandas as pd; import numpy as np; import matplotlib.pyplot as plt
dates = pd.date_range('2025-01-01', periods=365, freq='D')
sales = 100 + 10*np.sin(np.arange(365)*2*np.pi/7) + 20*np.sin(np.arange(365)*2*np.pi/365) + np.random.randn(365)*15
sales = np.maximum(sales, 0)
df = pd.DataFrame({'日期':dates,'销量':sales}).set_index('日期')
print(f"日均:{df['销量'].mean():.0f} 波动:{df['销量'].std():.0f}")
df['MA30'] = df['销量'].rolling(30).mean()
df[['销量','MA30']].plot(figsize=(12,4)); plt.show()</code></pre>
<div class="ex-box"><h4>✏️ 练习</h4><ol><li>完成环境搭建或打开Colab</li><li>运行脚本，观察图表</li><li>改参数：周周期改30天、噪声放大3倍，看图表变化</li></ol></div>`,
  },
  {
    id: "deep-3", day: 3, week: 1, track: "deep",
    title: "Python基础语法速通",
    description: "列表推导式、字典、函数、条件、循环",
    objectives: ["掌握列表推导式", "熟练使用字典和DataFrame互转", "会写安全库存计算函数"],
    duration: 60,
    cues: ["列表/字典/DataFrame互转", "列表推导式——Python的灵魂", "函数定义+lambda", "条件判断+循环"],
    content: `<p>量化分析90%的Python只用这些：列表推导式、字典、条件、循环、函数。</p>
<pre><code># 列表推导式（Python最优雅的特性）
skus = ['A','B','C']; sales = [100,150,120]
sales_x2 = [s*2 for s in sales]
avg_by_sku = {s:df[df['SKU']==s]['销量'].mean() for s in skus}

# 函数 + 安全库存计算
from scipy import stats
def safety_stock(demand, lead_time, service=0.95):
    z = stats.norm.ppf(service)
    return z * demand.std() * np.sqrt(lead_time)</code></pre>
<div class="ex-box"><h4>✏️ 练习</h4><ol><li>列表推导式生成1-100中7的倍数</li><li>写safety_stock函数，算90%/95%/99%服务水平的安全库存</li><li>用字典存5个SKU信息，转DataFrame</li></ol></div>
<div class="rs-box"><h4>🔗 资源</h4><p><a href="https://docs.python.org/zh-cn/3/tutorial/" target="_blank">Python官方中文教程</a></p></div>`,
  },
  {
    id: "deep-4", day: 4, week: 1, track: "deep",
    title: "NumPy — 数值计算基石",
    description: "ndarray向量化运算、统计函数",
    objectives: ["理解ndarray vs list的性能差异", "掌握向量化运算", "会做安全库存的NumPy实现"],
    duration: 45,
    cues: ["ndarray vs list：为什么快100倍", "向量化运算", "常用统计函数", "安全库存的NumPy实现"],
    content: `<pre><code>import numpy as np
a = np.array([1,2,3,4,5]); b = np.random.randn(100)
sales = np.array([100,150,120,180,160])
revenue = sales * np.array([9.9,9.9,8.8,8.8,8.8])
growth = np.diff(sales) / sales[:-1]
sales.mean(); sales.std(); np.percentile(sales,[25,50,75])
np.corrcoef(sales, revenue)  # 相关系数矩阵</code></pre>
<div class="ex-box"><h4>✏️ 练习</h4><ol><li>生成365天需求（均值100，std20）</li><li>算90%/95%/99%安全库存（Z值:1.28/1.645/2.33）</li><li>验证：Z=1.645，正态尾部概率是否≈5%？</li></ol></div>`,
  },
  {
    id: "deep-5", day: 5, week: 1, track: "deep",
    title: "pandas核心操作（上）读写+筛选",
    description: "read_csv、loc/iloc、多条件筛选",
    objectives: ["掌握文件读写", "区分loc和iloc", "会多条件筛选"],
    duration: 60,
    cues: ["read_csv参数", "loc vs iloc", "多条件筛选", "按值列表筛选"],
    content: `<pre><code>df = pd.read_csv('sales.csv', encoding='utf-8', parse_dates=['日期'])
df.info(); df.describe(); df.sample(10)
high = df[df['销量']>100]
promo = df[(df['促销'])&(df['销量']>150)]
target = df[df['SKU'].isin(['A','B','C'])]
df.iloc[:10]; df.iloc[:, [0,2,4]]
df.loc[df['销量']>100, ['SKU','销量']]</code></pre>
<div class="ex-box"><h4>✏️ 练习</h4><ol><li>下载数据: <a href="https://raw.githubusercontent.com/jbrownlee/Datasets/master/daily-total-female-births.csv" target="_blank">daily-births.csv</a></li><li>筛选值>45的行，统计天数</li><li>练习loc/iloc的5种常见用法</li></ol></div>`,
  },
  {
    id: "deep-6", day: 6, week: 1, track: "deep",
    title: "pandas核心操作（下）分组+时序",
    description: "groupby+agg、resample、shift、rolling",
    objectives: ["掌握groupby+agg组合拳", "理解transform vs apply", "会resample/shift/rolling"],
    duration: 60,
    cues: ["groupby+agg组合拳", "transform vs apply", "resample重采样", "shift+rolling时序操作"],
    content: `<pre><code># 分组聚合
df.groupby('SKU').agg({'销量':['mean','std','sum'],'价格':'mean'})
df['sku_avg'] = df.groupby('SKU')['销量'].transform('mean')
# 时间序列
df.set_index('日期',inplace=True); df.sort_index(inplace=True)
df['MA7']=df['销量'].rolling(7).mean(); df['vol']=df['销量'].rolling(30).std()
df['lag1']=df['销量'].shift(1); df['lag7']=df['销量'].shift(7)
weekly=df['销量'].resample('W').sum()</code></pre>
<div class="bk-box"><h4>📖 W1完成✅</h4><p>核心能力：环境搭建、pandas/NumPy、数据读写、分组统计、时序操作、可视化。</p></div>`,
  },
  {
    id: "deep-7", day: 7, week: 1, track: "deep",
    title: "数据可视化—matplotlib+plotly双修",
    description: "出版级matplotlib + 交互式plotly",
    objectives: ["用matplotlib画出版级图表", "用plotly做交互探索", "会季节分解可视化"],
    duration: 45,
    cues: ["matplotlib出版级", "plotly交互探索", "双Y轴图", "季节性分解可视化"],
    content: `<pre><code>import matplotlib.pyplot as plt
plt.rcParams['font.sans-serif']=['PingFang SC']
fig,ax=plt.subplots(2,2,figsize=(12,8))
ax[0,0].plot(df.index,df['销量']); ax[0,1].hist(df['销量'],bins=30)

import plotly.express as px
px.line(df.reset_index(),x='日期',y='销量',color='SKU',title='多SKU对比').show()</code></pre>
<div class="ex-box"><h4>✏️ 练习</h4><ol><li>2×2子图面板（时序+直方图+箱线+ACF）</li><li>plotly交互多SKU对比线图</li></ol></div>`,
  },

  // ========== W2: Statistics & Data Cleaning ==========
  {
    id: "deep-8", day: 8, week: 2, track: "deep",
    title: "描述性统计—读懂数据的第一步",
    description: "均值vs中位数、CV、偏度、峰度、ABC分类",
    objectives: ["理解均值vs中位数选择", "会用CV做跨SKU比较", "实现ABC分类"],
    duration: 45,
    cues: ["均值vs中位数", "标准差vs变异系数", "偏度+峰度", "分位数→ABC分类"],
    content: `<table><tr><th>统计量</th><th>供应链意义</th></tr>
<tr><td>CV=std/mean</td><td>不同SKU可比的不稳定性</td></tr>
<tr><td>偏度>0</td><td>偶尔爆发（促销日）</td></tr>
<tr><td>峰度>3</td><td>极端值频繁（缺货/爆仓风险）</td></tr></table>
<pre><code>df['销量'].describe(); df['销量'].skew(); df['销量'].kurtosis()
# ABC分类
total=df.groupby('SKU')['销量'].sum().sort_values(ascending=False)
total['cum']=total.cumsum()/total.sum()
total['cls']=pd.cut(total['cum'],[0,.7,.95,1],labels=['A','B','C'])</code></pre>
<div class="ex-box"><h4>✏️ 练习</h4><ol><li>全部描述性统计</li><li>CV最大SKU分析</li><li>ABC分类</li></ol></div>`,
  },
  {
    id: "deep-9", day: 9, week: 2, track: "deep",
    title: "概率分布+假设检验入门",
    description: "正态分布、p值、t检验、统计显著≠业务显著",
    objectives: ["理解正态分布的重要性", "会做t检验", "区分统计显著和业务显著"],
    duration: 60,
    cues: ["正态分布为什么重要", "p值<0.05到底什么意思", "t检验在供应链中的应用", "统计显著≠业务显著"],
    content: `<pre><code>from scipy import stats
stat,p=stats.normaltest(df['销量'].dropna())
# 促销vs非促销 t检验
t,p=stats.ttest_ind(df[df['促销']]['销量'],df[~df['促销']]['销量'])
# p<0.05→促销显著提升销量（统计显著）
# 但提升量是否值得？（业务显著）</code></pre>
<blockquote><strong>记住：</strong>p<0.001但销量只差2件——对业务没意义。永远结合业务量级判断。</blockquote>
<div class="ex-box"><h4>✏️ 练习</h4><ol><li>正态检验+log变换</li><li>周末vs工作日t检验</li></ol></div>
<div class="bk-box"><h4>📖</h4><p>《赤裸裸的统计学》Charles Wheelan — 零基础可读</p></div>`,
  },
  {
    id: "deep-10", day: 10, week: 2, track: "deep",
    title: "相关性分析—谁在影响销量？",
    description: "Pearson/Spearman、相关性≠因果、混淆变量",
    objectives: ["会算Pearson/Spearman相关", "理解相关性≠因果性", "识别混淆变量"],
    duration: 45,
    cues: ["Pearson vs Spearman", "相关性≠因果性", "混淆变量陷阱", "偏相关分析"],
    content: `<pre><code>df.corr(numeric_only=True)['销量'].sort_values(ascending=False)
df.corr(method='spearman',numeric_only=True)['销量']
px.imshow(df.corr(numeric_only=True),text_auto='.2f')</code></pre>
<div class="pit-box"><h4>⚠️ 最大陷阱</h4><p>冰淇淋销量↗溺水死亡↗——不是因为冰淇淋导致溺水，而是"夏天"同时导致两者。这叫<strong>混淆变量</strong>。供应链中极常见：促销同时导致高销量和高退货率。</p></div>
<div class="ex-box"><h4>✏️ 练习</h4><ol><li>Pearson+Spearman相关矩阵</li><li>Top3相关特征——是原因还是混淆？</li></ol></div>`,
  },
  // Deep days 11-17 (W2 continued + W2 review)
  {
    id: "deep-11", day: 11, week: 2, track: "deep",
    title: "数据清洗（上）缺失值+异常值",
    description: "MCAR/MAR/MNAR、填充策略、IQR法",
    objectives: ["识别三种缺失类型", "选择合适的填充策略", "用IQR识别异常值但不盲目删除"],
    duration: 60,
    cues: ["MCAR/MAR/MNAR三种缺失", "填充策略选择", "IQR法识别异常值", "供应链异常值≠错误"],
    content: `<pre><code>df.isnull().sum()/len(df)*100
df['销量'].fillna(df['销量'].median(),inplace=True)
df['销量'].fillna(method='ffill',inplace=True)
df['销量'].interpolate(method='linear',inplace=True)
# IQR异常值
Q1,Q3=df['销量'].quantile([.25,.75]); IQR=Q3-Q1
outliers=df[(df['销量']<Q1-1.5*IQR)|(df['销量']>Q3+1.5*IQR)]</code></pre>
<blockquote><strong>供应链警示：</strong>大促日销量是平时10倍——看起来像异常值，但实际是业务规律。标注而非删除！</blockquote>`,
  },
  {
    id: "deep-12", day: 12, week: 2, track: "deep",
    title: "数据清洗（下）重复值+质量检查",
    description: "去重策略、数据质量检查清单",
    objectives: ["掌握去重方法", "建立数据质量检查清单", "会检查时序连续性"],
    duration: 45,
    cues: ["重复行定义+去重", "数据质量检查清单", "时间序列连续检查"],
    content: `<pre><code>df.duplicated().sum(); df.drop_duplicates(inplace=True)
df.drop_duplicates(subset=['日期','SKU'],keep='last',inplace=True)
# 检查时序连续性
full=pd.date_range(df.index.min(),df.index.max(),freq='D')
missing=full.difference(df.index); print(f'缺失{len(missing)}天')</code></pre>
<h3>数据质量检查清单（每次分析前）</h3><ol><li>列名有无空格/特殊字符</li><li>日期是否datetime类型</li><li>时序是否连续</li><li>数值列有无负数</li><li>分类列有无意外值</li><li>SKU级数据是否自洽</li></ol>`,
  },
  {
    id: "deep-13", day: 13, week: 2, track: "deep",
    title: "EDA六步法",
    description: "概览→单变量→时间模式→变量关系→异常→假设",
    objectives: ["建立EDA六步法框架", "会季节分解", "能回答供应链EDA黄金问题"],
    duration: 60,
    cues: ["概览→单变量→时间模式→变量关系→异常→假设", "季节性分解", "供应链EDA黄金问题"],
    content: `<pre><code>from statsmodels.tsa.seasonal import seasonal_decompose
r=seasonal_decompose(df['销量'],model='additive',period=7); r.plot()</code></pre>
<h3>供应链EDA黄金问题</h3><ul><li>哪类SKU销量最高/最波动？</li><li>一周哪天最好？一月哪段？</li><li>促销提升效果稳定吗？</li><li>有无SKU模式完全不同？</li><li>库存周转趋势改善还是恶化？</li></ul>`,
  },
  {
    id: "deep-14", day: 14, week: 2, track: "deep",
    title: "周复习：从数据到洞察",
    description: "本周核心概念回顾、自检清单",
    objectives: ["回顾本周5个最重要概念", "完成自检清单", "独立写数据清洗脚本"],
    duration: 60,
    cues: ["本周5个最重要概念", "自检清单", "不看代码写数据清洗流程"],
    content: `<div class="mini-d">描述统计→概率分布→相关性→数据清洗→EDA六步法</div>
<h3>自检</h3><ul><li>□ 均值vs中位数，知道何时用哪个</li><li>□ 看懂p值判断显著性</li><li>□ 计算+解释相关系数</li><li>□ 选择合适的缺失值填充</li><li>□ IQR找异常值但不盲目删除</li><li>□ 建立数据质量检查清单</li></ul>
<div class="ex-box"><h4>✏️ 复习</h4><ol><li>从零写完整数据清洗脚本</li><li>找Kaggle零售数据做EDA</li><li>200字：这两周最大收获</li></ol></div>
<div class="bk-box"><h4>📖 W2完成✅</h4><p>核心能力：读懂数据、假设检验、数据清洗、EDA系统性框架。</p></div>`,
  },

  // ========== W3: Time Series Modeling ==========
  {
    id: "deep-15", day: 15, week: 3, track: "deep",
    title: "时间序列基础概念",
    description: "趋势/季节/周期/噪声、加性vs乘性分解",
    objectives: ["理解时序四大分量", "区分加性和乘性分解", "知道为什么时序顺序就是信息"],
    duration: 45,
    cues: ["趋势/季节/周期/噪声", "加性vs乘性分解", "为什么时序的顺序就是信息"],
    content: `<table><tr><th>成分</th><th>定义</th><th>供应链例子</th></tr>
<tr><td>趋势</td><td>长期方向</td><td>品类连续2年增长20%</td></tr>
<tr><td>季节性</td><td>固定周期规律</td><td>每周一销量高</td></tr>
<tr><td>周期</td><td>非固定周期波动</td><td>经济周期2-3年</td></tr>
<tr><td>噪声</td><td>随机不可预测</td><td>天气突变/竞品临时促销</td></tr></table>
<p><strong>加性：</strong>波动幅度稳定<br><strong>乘性：</strong>波动随趋势变大（高增长品类常见）</p>`,
  },
  {
    id: "deep-16", day: 16, week: 3, track: "deep",
    title: "平稳性与ADF检验",
    description: "平稳性定义、ADF检验、差分",
    objectives: ["理解平稳性严格定义", "会做ADF检验", "掌握差分让不平稳变平稳"],
    duration: 45,
    cues: ["平稳性严格定义", "为什么ARIMA要求平稳", "差分让不平稳变平稳"],
    content: `<pre><code>from statsmodels.tsa.stattools import adfuller
p=adfuller(df['销量'].dropna())[1]  # p<0.05→平稳
df['销量_d1']=df['销量'].diff(1)     # 不平稳就差分</code></pre>
<blockquote>d=0平稳,d=1一阶差分,d=2极少需要。d≥2还不平稳→数据有结构性问题。</blockquote>`,
  },
  {
    id: "deep-17", day: 17, week: 3, track: "deep",
    title: "ACF和PACF—选参法宝",
    description: "ACF vs PACF、怎么看图定p和q",
    objectives: ["理解ACF和PACF的核心区别", "会看图确定p和q", "记住选参口诀"],
    duration: 50,
    cues: ["ACF vs PACF核心区别", "怎么看图确定p和q", "选参口诀"],
    content: `<pre><code>from statsmodels.graphics.tsaplots import plot_acf,plot_pacf
fig,ax=plt.subplots(1,2,figsize=(12,4))
plot_acf(df['销量'].dropna(),lags=40,ax=ax[0])
plot_pacf(df['销量'].dropna(),lags=40,ax=ax[1])</code></pre>
<table><tr><th>模式</th><th>ACF</th><th>PACF</th><th>结论</th></tr>
<tr><td>AR(p)</td><td>拖尾</td><td>p阶后截尾</td><td>p=截尾位置</td></tr>
<tr><td>MA(q)</td><td>q阶后截尾</td><td>拖尾</td><td>q=截尾位置</td></tr>
<tr><td>ARMA</td><td>拖尾</td><td>拖尾</td><td>需ARIMA</td></tr></table>`,
  },
  {
    id: "deep-18", day: 18, week: 3, track: "deep",
    title: "ARIMA模型实战",
    description: "完整建模流程、summary解读、残差诊断",
    objectives: ["跑通ARIMA完整建模流程", "读懂model.summary()", "做残差诊断四图"],
    duration: 60,
    cues: ["ARIMA建模完整流程", "summary解读", "残差诊断四图"],
    content: `<pre><code>model=ARIMA(ts,order=(2,1,2)).fit()
print(model.summary())
resid=model.resid
model.plot_diagnostics(figsize=(12,8))
fc=model.forecast(steps=14)</code></pre>
<h3>残差诊断必看</h3><ol><li>标准化残差→围绕0随机</li><li>直方图→近似正态</li><li>Q-Q图→贴对角线</li><li>残差ACF→无显著自相关</li></ol>`,
  },
  {
    id: "deep-19", day: 19, week: 3, track: "deep",
    title: "SARIMA季节性模型",
    description: "SARIMA的(P,D,Q,m)参数、季节周期确定",
    objectives: ["理解SARIMA多了哪四个参数", "会定季节周期m", "处理供应链多重季节"],
    duration: 45,
    cues: ["SARIMA多了(P,D,Q,m)", "季节周期m怎么定", "供应链中的多重季节"],
    content: `<pre><code>from statsmodels.tsa.statespace.sarimax import SARIMAX
m=SARIMAX(ts,order=(2,1,2),seasonal_order=(1,0,1,7)).fit()</code></pre>
<p>供应链季节性：周(m=7)/月(m≈30)/年(m=365)。多重季节→考虑Prophet或TBATS。</p>`,
  },
  {
    id: "deep-20", day: 20, week: 3, track: "deep",
    title: "Prophet傻瓜式预测",
    description: "Prophet原理、节假日+自定义事件、变点检测",
    objectives: ["掌握Prophet快速建模", "会添加中国节假日和自定义大促事件", "了解Prophet的优势和局限"],
    duration: 50,
    cues: ["Prophet原理", "节假日+自定义事件", "变点检测", "优势与局限"],
    content: `<pre><code>m=Prophet(yearly_seasonality=True,weekly_seasonality=True)
m.add_country_holidays(country_name='CN')
# 自定义大促事件
promos=pd.DataFrame({'holiday':'大促','ds':pd.to_datetime(['2025-06-18','2025-11-11']),'lower_window':-3,'upper_window':1})
m.fit(df_p); fc=m.predict(m.make_future_dataframe(60)); m.plot(fc)</code></pre>
<table><tr><th>✅优势</th><th>❌局限</th></tr><tr><td>自动趋势+季节+节假日</td><td>不能直接加外部变量</td></tr><tr><td>对缺失值鲁棒</td><td>低频数据效果差</td></tr></table>`,
  },
  {
    id: "deep-21", day: 21, week: 3, track: "deep",
    title: "模型对比与选择",
    description: "AIC/BIC/MAPE对比、供应链选模型决策树",
    objectives: ["会做多模型指标对比", "理解供应链模型选择决策树", "知道何时选哪个模型"],
    duration: 45,
    cues: ["AIC vs BIC", "MAPE/WAPE/RMSE", "供应链选模型决策树"],
    content: `<h3>供应链模型选择决策树</h3>
<div class="mini-d">数据<3月？→简单移动平均/naive
3-12月？→ARIMA/Prophet
>1年+年季节？→SARIMA/Prophet
有外部变量(促销/价格)？→XGBoost
SKU>100？→先聚类再分组建模</div>
<div class="bk-box"><h4>📖 W3完成✅</h4><p>核心：平稳性→ACF/PACF→ARIMA/SARIMA/Prophet→模型对比。</p></div>`,
  },

  // ========== W4: ML Forecasting ==========
  {
    id: "deep-22", day: 22, week: 4, track: "deep",
    title: "时序→监督学习转换",
    description: "为什么转换、滞后特征+窗口特征",
    objectives: ["理解时序→监督学习的转换原理", "掌握特征构造函数", "知道「特征>算法」的道理"],
    duration: 50,
    cues: ["为什么转换", "滞后特征+窗口特征", "特征>算法"],
    content: `<pre><code>def make_ts_features(df,target,lags=[1,2,3,7,14,28]):
    d=df.copy()
    for l in lags: d[f'lag_{l}']=d[target].shift(l)
    for w in [7,14,30]:
        d[f'rmean_{w}']=d[target].rolling(w).mean()
        d[f'rstd_{w}']=d[target].rolling(w).std()
    d['dow']=d.index.dayofweek; d['month']=d.index.month
    d['is_weekend']=d['dow'].isin([5,6]).astype(int)
    return d.dropna()</code></pre>
<blockquote>在结构化数据上，<strong>好的特征比好的算法更重要。</strong></blockquote>`,
  },
  {
    id: "deep-23", day: 23, week: 4, track: "deep",
    title: "特征工程进阶—从特征到因子",
    description: "因子≠特征、IC/ICIR评估、供应链因子分类",
    objectives: ["区分因子和特征", "会算IC和ICIR", "掌握六类供应链因子"],
    duration: 60,
    cues: ["因子≠特征", "好因子三标准:IC>0.03/ICIR>0.5/单调性", "供应链特有因子类别"],
    content: `<pre><code>from scipy.stats import spearmanr
ic,p=spearmanr(df['lag_7'],df['销量'])
ics=[spearmanr(df['lag_7'].iloc[i-30:i],df['销量'].iloc[i-30:i])[0] for i in range(30,len(df))]
icir=np.mean(ics)/np.std(ics)  # ICIR>0.5才稳定</code></pre>
<h3>供应链因子类别</h3><table><tr><th>类别</th><th>示例</th></tr>
<tr><td>趋势</td><td>短期MA/长期MA、环比增速</td></tr><tr><td>波动</td><td>CV、振幅、极端值频率</td></tr>
<tr><td>价格</td><td>折扣力度、价格vs品类均值</td></tr><tr><td>时间</td><td>星期几、月初末、距节假日天数</td></tr>
<tr><td>竞品</td><td>同类SKU均销量、市场份额变化</td></tr><tr><td>库存</td><td>库存天数、缺货频率、库销比</td></tr></table>`,
  },
  {
    id: "deep-24", day: 24, week: 4, track: "deep",
    title: "XGBoost实战",
    description: "核心参数、时序CV、特征重要性",
    objectives: ["掌握XGBoost核心参数", "会用TimeSeriesSplit", "读懂特征重要性"],
    duration: 60,
    cues: ["核心参数含义", "时序CV", "特征重要性", "防过拟合"],
    content: `<pre><code>from xgboost import XGBRegressor
from sklearn.model_selection import TimeSeriesSplit
tscv=TimeSeriesSplit(n_splits=5)
model=XGBRegressor(n_estimators=200,max_depth=5,learning_rate=0.1,subsample=0.8,reg_alpha=0.1)
for tr,te in tscv.split(X):
    model.fit(X.iloc[tr],y.iloc[tr])
    pred=model.predict(X.iloc[te])
    print(f'MAPE:{np.mean(np.abs((y.iloc[te]-pred)/y.iloc[te]))*100:.1f}%')
imp=pd.DataFrame({'f':X.columns,'imp':model.feature_importances_}).sort_values('imp',ascending=False)</code></pre>`,
  },
  {
    id: "deep-25", day: 25, week: 4, track: "deep",
    title: "LightGBM对比+Ensemble",
    description: "XGBoost vs LightGBM、简单平均Ensemble",
    objectives: ["理解XGBoost和LightGBM的差异", "会用LightGBM", "实现简单Ensemble"],
    duration: 50,
    cues: ["XGBoost vs LightGBM", "什么时候用LightGBM", "简单平均Ensemble"],
    content: `<pre><code>from lightgbm import LGBMRegressor
models={'xgb':XGBRegressor(n_estimators=200),'lgb':LGBMRegressor(n_estimators=200,verbose=-1)}
preds={n:m.fit(X_train,y_train).predict(X_test) for n,m in models.items()}
ensemble=np.mean(list(preds.values()),axis=0)</code></pre>
<table><tr><th></th><th>XGBoost</th><th>LightGBM</th></tr>
<tr><td>速度</td><td>中等</td><td>3-10倍快</td></tr><tr><td>大数据</td><td>内存大</td><td>内存效率高</td></tr><tr><td>小数据</td><td>不易过拟合</td><td>需调参</td></tr></table>`,
  },
  {
    id: "deep-26", day: 26, week: 4, track: "deep",
    title: "回测框架设计",
    description: "滚动窗口vs扩展窗口、回测频率、报告结构",
    objectives: ["设计滚动窗口回测函数", "理解两种窗口的适用场景", "会写回测报告"],
    duration: 60,
    cues: ["滚动窗口vs扩展窗口", "回测频率设定", "回测报告结构"],
    content: `<pre><code>def walk_forward_cv(df,feat,target,train_days=90,test_days=7):
    results=[]
    for i in range(train_days,len(df)-test_days,test_days):
        train=df.iloc[i-train_days:i]; test=df.iloc[i:i+test_days]
        m=XGBRegressor(n_estimators=200,max_depth=5)
        m.fit(train[feat],train[target]); pred=m.predict(test[feat])
        results.append({'start':str(test.index[0].date()),
            'mape':np.mean(np.abs((test[target]-pred)/test[target]))*100})
    return pd.DataFrame(results)</code></pre>
<p>回测报告应包括：每轮MAPE、误差时间分布、SKU维度误差、系统性偏差检查。</p>`,
  },
  {
    id: "deep-27", day: 27, week: 4, track: "deep",
    title: "评估指标深入",
    description: "MAPE/WAPE/MASE、偏差检测",
    objectives: ["了解MAPE缺陷", "会选WAPE/MASE", "做预测偏差检测"],
    duration: 45,
    cues: ["MAPE缺陷", "WAPE/MASE适用场景", "预测偏差检测"],
    content: `<table><tr><th>指标</th><th>适用</th><th>注意</th></tr>
<tr><td>MAPE</td><td>销量>0</td><td>销量=0时炸</td></tr>
<tr><td>WAPE</td><td>含零销量</td><td>∑|误差|/∑|实际|</td></tr>
<tr><td>MASE</td><td>跨品类对比</td><td>需基准模型</td></tr></table>`,
  },
  {
    id: "deep-28", day: 28, week: 4, track: "deep",
    title: "过拟合诊断+调参策略",
    description: "过拟合信号、学习曲线、调参顺序",
    objectives: ["识别过拟合信号", "会看学习曲线", "掌握XGBoost调参顺序"],
    duration: 50,
    cues: ["过拟合信号", "学习曲线", "调参顺序"],
    content: `<h3>过拟合信号</h3><ul><li>训练误差<<验证误差</li><li>max_depth>10</li><li>特征数≈样本数</li><li>回测MAPE波动剧烈</li></ul>
<h3>调参顺序</h3><ol><li>n_estimators (early_stopping)</li><li>max_depth+min_child_weight</li><li>subsample+colsample</li><li>learning_rate（小lr+大n_estimators）</li></ol>
<div class="bk-box"><h4>📖 W4完成✅</h4><p>核心：特征工程→XGBoost/LightGBM→回测→多指标评估。</p></div>`,
  },

  // ========== W5: Capstone ==========
  {
    id: "deep-29", day: 29, week: 5, track: "deep",
    title: "端到端流水线搭建",
    description: "完整流程设计、多SKU批量处理",
    objectives: ["设计完整的端到端流水线", "实现多SKU批量预测", "生成可复现流水线"],
    duration: 90,
    cues: ["完整流程设计", "多SKU批量", "可复现流水线"],
    content: `<div class="mini-d">load→clean→features→factors→models→backtest→best→forecast→report</div>
<pre><code>def run_pipeline(data_path,sku_list,h=14):
    results={}
    for sku in sku_list:
        df=load_clean(data_path,sku); feats=engineer_features(df)
        models=train_all(feats); best,metrics=backtest_select(models,feats)
        results[sku]={'fc':best.predict(h),'metrics':metrics}
    return generate_report(results)</code></pre>
<div class="ex-box"><h4>✏️ 毕业项目</h4><ol><li>≥6个月销售数据</li><li>完整流水线：20+因子→3模型对比→回测→报告</li><li>≥5个SKU批量预测</li></ol><p>🎯 WAPE<18%合格，<12%优秀。</p></div>`,
  },
  {
    id: "deep-30", day: 30, week: 5, track: "deep",
    title: "月度总结+能力自评+下一步",
    description: "30天能力地图、31-100天规划",
    objectives: ["回顾30天学习成果", "完成能力自评", "了解31-100天学习路径"],
    duration: 60,
    cues: ["30天能力地图", "自评1-5分", "31-100天规划"],
    content: `<table><tr><th>周</th><th>主题</th><th>核心</th></tr>
<tr><td>W1</td><td>量化思维+Python</td><td>pandas/NumPy/可视化</td></tr>
<tr><td>W2</td><td>统计+清洗</td><td>假设检验/缺失/EDA</td></tr>
<tr><td>W3</td><td>时序建模</td><td>ARIMA/SARIMA/Prophet</td></tr>
<tr><td>W4</td><td>ML预测</td><td>特征/XGBoost/回测</td></tr>
<tr><td>W5</td><td>实战</td><td>端到端流水线</td></tr></table>
<h3>31-100天预告</h3>
<table><tr><th>阶段</th><th>天数</th><th>内容</th></tr>
<tr><td>因子深化</td><td>31-45</td><td>IC体系/因子库/RD-Agent闭环</td></tr>
<tr><td>Agent框架</td><td>46-60</td><td>LangGraph/CrewAI/AutoGen实战</td></tr>
<tr><td>高级预测</td><td>61-75</td><td>LSTM/Transformer/概率预测</td></tr>
<tr><td>供应链深度</td><td>76-90</td><td>库存优化/多级预测/S&OP</td></tr>
<tr><td>工程化</td><td>91-100</td><td>部署/监控/A/B测试</td></tr></table>
<blockquote><strong>🎉 恭喜前30天！</strong>已建立量化分析完整能力栈。切换到<strong>右侧AI助手</strong>随时提问。</blockquote>`,
  },
];

// Append placeholder days 31-100
for (let i = 30; i < 100; i++) {
  deepDays.push(placeholderDay(i));
}
