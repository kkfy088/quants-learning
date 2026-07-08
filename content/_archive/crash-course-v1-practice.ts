import type { DayContent } from "@/lib/types";

export const crashDays: DayContent[] = [
  {
    id: "crash-1", day: 1, week: 1, track: "crash",
    title: "量化思维重塑 + 工具链搭建",
    description: "理解量化本质，搭建Python环境，掌握核心概念",
    objectives: ["理解量化分析的四大环节", "区分传统经验决策与量化方法", "搭建Python开发环境", "掌握因子/回测/过拟合核心概念"],
    duration: 60,
    cues: ["量化到底是什么？和传统经验决策的本质区别？", "供应链预测为什么必须量化？", "核心概念：因子、回测、特征工程、过拟合", "我需要装哪些软件？"],
    content: `<h3>1.1 量化 = 数据 + 模型 + 代码 + 业务判断</h3>
<p><span class="key-pt">量化分析不是"用AI替代人"，而是把可重复的部分自动化，把人释放到需要判断力的地方。</span></p>
<table><tr><th>传统经验决策</th><th>量化方法</th></tr>
<tr><td>"春节前多备30%，这么多年都是这么做的"</td><td>"基于过去5年春节前4周数据，模型预测增幅28%±5%"</td></tr>
<tr><td>不同人拍不同数字，吵不出结果</td><td>同一份数据、同一套代码，结果完全一致</td></tr>
<tr><td>出错了追溯困难</td><td>回测日志完整，每个环节可审计</td></tr></table>

<h3>1.2 为什么供应链预测必须量化</h3>
<ul><li><strong>多因素叠加：</strong>促销+天气+竞品+节假日同时作用，人脑算不过来</li>
<li><strong>SKU规模：</strong>几百个SKU，人工预测完全不现实</li>
<li><strong>不确定性量化：</strong>"大概1000件" vs "95%概率800-1200件"，对备货决策完全不同</li>
<li><strong>量化金融→供应链的技术迁移：</strong>时间序列模型(ARIMA)、因子挖掘(IC评估)、回测框架——可直接迁移</li></ul>

<div class="pit-box"><h4>⚠️ 常见误区</h4><p><strong>误区：</strong>"量化就是要用最复杂的模型。"<br><strong>真相：</strong>简单移动平均在数据量少时可能比深度学习更准。<br><strong>误区：</strong>"AI可以完全替代我的判断。"<br><strong>真相：</strong>模型给出预测，你判断是否合理。</p></div>

<h3>1.3 核心概念</h3>
<table><tr><th>概念</th><th>一句话</th><th>供应链对应</th></tr>
<tr><td>因子</td><td>对目标有预测力的变量</td><td>促销折扣/天气/节假日/库存水位</td></tr>
<tr><td>回测</td><td>用历史数据模拟预测效果</td><td>"如果上个月用这个模型，误差多少？"</td></tr>
<tr><td>特征工程</td><td>把原始数据变成模型能用的</td><td>从日期→星期几/是否周末/距大促天数</td></tr>
<tr><td>过拟合</td><td>记住了噪声而非规律</td><td>训练集MAPE=2%，上线后MAPE=30%</td></tr></table>

<h3>1.4 工具链（现在就装）</h3>
<pre><code># Python 3.10+ → <a href="https://www.python.org/downloads/" target="_blank">python.org</a>
# VS Code → <a href="https://code.visualstudio.com/" target="_blank">code.visualstudio.com</a>

pip install pandas numpy matplotlib scikit-learn statsmodels plotly prophet xgboost jupyter</code></pre>
<p><strong>💡 推荐在 <a href="https://colab.research.google.com/" target="_blank">Google Colab</a> 上开始</strong>——无需安装，免费GPU，浏览器直接写代码。</p>

<div class="ex-box"><h4>✏️ 练习</h4><ol><li>安装 Python + VS Code 或打开 Google Colab</li><li>运行 <code>import pandas as pd; print("环境OK")</code></li><li>在左侧栏写下：你做供应链预测时最大的痛点是什么？</li></ol></div>
<div class="bk-box"><h4>📖 推荐</h4><p>《利用Python进行数据分析》Wes McKinney（前5章） | <a href="https://otexts.com/fpp3/" target="_blank">Forecasting: Principles and Practice</a>（免费，第1章）</p></div>`,
  },
  {
    id: "crash-2", day: 2, week: 1, track: "crash",
    title: "数据兵器 — pandas 极速掌握",
    description: "pandas核心操作：读写/筛选/分组/时序/实战",
    objectives: ["掌握pandas五大核心操作", "理解groupby+agg组合", "学会时序操作：resample/shift/rolling", "独立完成销售数据清洗和特征构造"],
    duration: 90,
    cues: ["DataFrame和Excel的区别？", "筛选/分组/聚合的核心操作", "时间序列：重采样/滚动/滞后/差分", "供应链场景：多SKU分组、促销标记、库存周转"],
    content: `<h3>2.1 pandas = 代码版Excel</h3>
<p><span class="key-pt">Excel能做的pandas都能做，而且：百万行不卡、操作可复现、无缝对接模型。</span></p>

<h3>2.2 五个必须会的操作</h3>
<pre><code>import pandas as pd; import numpy as np

# ① 读取+检查
df = pd.read_csv('sales.csv', parse_dates=['日期'])
df.info(); df.describe(); df.head(10); df.sample(5)

# ② 筛选
high = df[df['销量']>100]
promo_big = df[(df['促销']) & (df['销量']>150)]

# ③ 分组聚合（最重要！）
df.groupby('促销')['销量'].agg(['mean','sum','count','std'])
df.groupby('SKU').agg({'销量':'mean','价格':'mean'})

# ④ 时间序列
df.set_index('日期', inplace=True)
df['MA7'] = df['销量'].rolling(7).mean()
df['lag1'] = df['销量'].shift(1)
df['lag7'] = df['销量'].shift(7)
weekly = df['销量'].resample('W').sum()

# ⑤ 缺失值
df['销量'].fillna(df['销量'].median(), inplace=True)
df['销量'].fillna(method='ffill', inplace=True)</code></pre>

<h3>2.3 供应链场景实战三连</h3>
<pre><code># 促销力度
df['折扣'] = (df['原价']-df['促销价'])/df['原价']

# 库存周转天数
df['周转天数'] = df['库存'] / df.groupby('SKU')['销量'].transform('mean')

# 多SKU批量处理
for sku in df['SKU'].unique():
    sku_df = df[df['SKU']==sku]
    # ... train/predict for this SKU</code></pre>

<div class="pit-box"><h4>⚠️ 3个最常见的pandas坑</h4>
<p><strong>坑1：</strong><code>df[df['col']>100]</code> 遇到NaN会静默失败——先用 <code>dropna()</code><br>
<strong>坑2：</strong>groupby之后索引变了——加 <code>.reset_index()</code><br>
<strong>坑3：</strong><code>.shift()</code> 产生的NaN忘了处理——滞后特征首行必然是NaN</p></div>

<div class="ex-box"><h4>✏️ 练习：生成模拟数据并清洗</h4>
<pre><code>dates = pd.date_range('2025-01-01', periods=180, freq='D')
np.random.seed(42)
df = pd.DataFrame({
    '日期': np.tile(dates, 3),
    'SKU': np.repeat(['A','B','C'], 180),
    '销量': np.concatenate([100+10*np.sin(np.arange(180)/7)+np.random.randn(180)*15,
                           80+5*np.sin(np.arange(180)/7)+np.random.randn(180)*10,
                           120+15*np.sin(np.arange(180)/7)+np.random.randn(180)*20]),
    '促销': np.random.choice([True,False], 540, p=[0.2,0.8])
})
df.loc[df['促销'], '销量'] *= 1.3+np.random.rand(df['促销'].sum())*0.5</code></pre>
<p>用上面代码生成数据，完成：计算MA7→按SKU+促销分组统计→找销量最高的5天→构造lag1/lag7特征。</p></div>
<div class="bk-box"><h4>📖 推荐</h4><p><a href="https://pandas.pydata.org/docs/user_guide/10min.html" target="_blank">pandas官方10分钟入门</a></p></div>`,
  },
  {
    id: "crash-3", day: 3, week: 1, track: "crash",
    title: "预测引擎 — ARIMA + Prophet 双模型",
    description: "ARIMA三步走 + Prophet快速建模 + 模型选型对比",
    objectives: ["理解平稳性和ADF检验", "会看ACF/PACF图定p,d,q", "掌握Prophet快速建模", "会做模型选型和对比"],
    duration: 90,
    cues: ["平稳性是什么？ADF检验怎么看？", "ACF/PACF图怎么确定p,d,q？", "Prophet和ARIMA各适合什么场景？", "怎么对比模型：AIC/BIC/MAPE"],
    content: `<h3>3.1 时间序列 ≠ 普通数据</h3>
<p><span class="key-pt">时序数据的核心特点：今天的数据和昨天、上周、去年同期都有关联。</span></p>

<h3>3.2 ARIMA 三步走</h3>
<pre><code>from statsmodels.tsa.stattools import adfuller
from statsmodels.tsa.arima.model import ARIMA

# Step 1: 平稳性检验（p<0.05才平稳）
p = adfuller(df['销量'].dropna())[1]
# Step 1b: 不平稳就差分
df['销量_d1'] = df['销量'].diff(1)
# Step 2: 画ACF/PACF确定p,q
# Step 3: 建模+预测
model = ARIMA(df['销量'].dropna(), order=(2,1,2)).fit()
fc = model.forecast(steps=14)
print(model.summary())</code></pre>

<h3>3.3 Prophet：傻瓜式但出活快</h3>
<pre><code>from prophet import Prophet
df_p = df.reset_index()[['日期','销量']]
df_p.columns = ['ds','y']
m = Prophet(weekly_seasonality=True, yearly_seasonality=True)
m.add_country_holidays(country_name='CN')
m.fit(df_p)
fc = m.predict(m.make_future_dataframe(periods=30))
m.plot(fc); m.plot_components(fc)</code></pre>

<h3>3.4 什么时候用哪个？</h3>
<table><tr><th>场景</th><th>推荐</th></tr>
<tr><td>数据<1年，无明显季节</td><td>ARIMA</td></tr>
<tr><td>数据>1年，有周/年周期</td><td>Prophet</td></tr>
<tr><td>有促销/价格/天气等外部变量</td><td>XGBoost（Day 4）</td></tr></table>

<div class="pit-box"><h4>⚠️ 常见坑</h4><p><strong>ARIMA预测变成一条直线？</strong>→ 可能d设错了，或数据过差分<br>
<strong>Prophet预测完全离谱？</strong>→ 检查ds列名对不对</p></div>

<div class="ex-box"><h4>✏️ 练习</h4><ol><li>用模拟数据训练ARIMA和Prophet</li><li>计算MAPE对比两个模型</li><li>残差诊断：ARIMA的残差是白噪声吗？</li><li>看Prophet的季节性分量：一周中哪天销量最高？</li></ol></div>
<div class="bk-box"><h4>📖 推荐</h4><p><a href="https://otexts.com/fpp3/" target="_blank">FPP3 第8-9章</a> | <a href="https://facebook.github.io/prophet/" target="_blank">Prophet官方文档</a></p></div>`,
  },
  {
    id: "crash-4", day: 4, week: 1, track: "crash",
    title: "机器学习预测 + 回测体系",
    description: "时序→监督学习转换、XGBoost实战、回测框架、评估指标",
    objectives: ["掌握时序→监督学习特征构造", "用XGBoost做销量预测", "实现滚动窗口回测", "会选评估指标(MAPE/WAPE/RMSE)"],
    duration: 90,
    cues: ["时序→监督学习怎么转换？", "XGBoost为什么是表格数据之王？", "回测=用历史模拟未来", "MAPE/WAPE/RMSE各适合什么场景？"],
    content: `<h3>4.1 关键转换：时序→监督学习</h3>
<p>机器学习模型不理解时间顺序。<span class="key-pt">你需要手动把历史信息编码成特征。</span></p>
<pre><code>def make_features(df, col):
    data = df.copy()
    for lag in [1,2,3,7,14,28]:
        data[f'lag_{lag}'] = data[col].shift(lag)
    for w in [7,14,30]:
        data[f'rmean_{w}'] = data[col].rolling(w).mean()
        data[f'rstd_{w}'] = data[col].rolling(w).std()
    data['dow'] = data.index.dayofweek
    data['month'] = data.index.month
    data['is_weekend'] = data['dow'].isin([5,6]).astype(int)
    return data.dropna()</code></pre>

<h3>4.2 XGBoost：表格数据王者</h3>
<pre><code>from xgboost import XGBRegressor
from sklearn.model_selection import TimeSeriesSplit

tscv = TimeSeriesSplit(n_splits=5)  # 时序CV，不能用随机KFold！
model = XGBRegressor(n_estimators=200, max_depth=5, learning_rate=0.1,
                     subsample=0.8, reg_alpha=0.1)
for tr_i, te_i in tscv.split(X):
    model.fit(X.iloc[tr_i], y.iloc[tr_i])
    pred = model.predict(X.iloc[te_i])
    mape = np.mean(np.abs((y.iloc[te_i]-pred)/y.iloc[te_i]))*100
    print(f'MAPE: {mape:.1f}%')

# 特征重要性
imp = pd.DataFrame({'f':X.columns,'imp':model.feature_importances_})
print(imp.sort_values('imp',ascending=False).head(10))</code></pre>

<h3>4.3 回测 = 用历史模拟未来</h3>
<table><tr><th>方式</th><th>训练窗口</th><th>适用</th></tr>
<tr><td>滚动窗口</td><td>固定长度（最近90天）→ 预测7天 → 前移7天</td><td>数据模式变化快</td></tr>
<tr><td>扩展窗口</td><td>从始累积 → 预测7天 → 训练集增长</td><td>数据少、模式稳定</td></tr></table>

<h3>4.4 评估指标选哪个？</h3>
<table><tr><th>指标</th><th>适用</th><th>注意</th></tr>
<tr><td>MAPE</td><td>销量>0的常规预测</td><td>销量=0时炸</td></tr>
<tr><td>WAPE</td><td>含零销量SKU</td><td>∑|误差|/∑|实际|</td></tr>
<tr><td>RMSE</td><td>关注大误差</td><td>对大误差惩罚重</td></tr></table>
<blockquote>业务经验：MAPE<15%合格，<10%优秀。大促期间MAPE天然偏高——这是业务规律不是模型问题。</blockquote>

<div class="pit-box"><h4>⚠️ 回测3大坑</h4><p><strong>坑1：用随机KFold</strong>→未来信息泄露<br><strong>坑2：忘了扣交易成本/促销成本</strong>→回测收益虚高<br><strong>坑3：只看MAPE不看偏差</strong>→系统性高估10%最后库存积压</p></div>

<div class="ex-box"><h4>✏️ 练习</h4><ol><li>实现make_features，构造20+特征</li><li>TimeSeriesSplit做5折CV，每折记录MAPE</li><li>实现滚动窗口回测函数</li><li>和Day3的ARIMA/Prophet做MAPE对比表</li></ol></div>
<div class="bk-box"><h4>📖 推荐</h4><p><a href="https://www.statlearning.com/" target="_blank">ISLR 第8章（树模型）</a> | <a href="https://xgboost.readthedocs.io/" target="_blank">XGBoost文档</a></p></div>`,
  },
  {
    id: "crash-5", day: 5, week: 1, track: "crash",
    title: "供应链端到端实战 + 工具链升级",
    description: "完整流水线、AI vs 手工边界、Agent框架、毕业项目",
    objectives: ["搭建完整的预测流水线", "清晰划分AI和人的决策边界", "了解LangGraph/CrewAI/RD-Agent选型", "完成端到端毕业项目"],
    duration: 120,
    cues: ["完整流水线：数据→特征→模型→回测→报告", "手工vs AI的边界在哪里？", "Agent框架能帮我做什么？", "毕业项目要求"],
    content: `<h3>5.1 完整流水线</h3>
<div class="mini-d">原始数据→清洗(pandas)→特征工程(20+因子)→因子筛选(IC)→多模型(ARIMA+Prophet+XGBoost)→滚动回测→最优模型→预测表+可视化报告</div>

<h3>5.2 手工 vs AI：你必须知道的边界</h3>
<table><tr><th>环节</th><th>人主导</th><th>AI/自动化</th></tr>
<tr><td>策略假设（促销弹性方向）</td><td>✅ 核心</td><td>❌ 辅助</td></tr>
<tr><td>数据清洗+因子代码生成</td><td>⚠️ 监督</td><td>✅ 自动</td></tr>
<tr><td>回测执行+报告生成</td><td>❌</td><td>✅ 完全自动</td></tr>
<tr><td>模型合理性审查</td><td>✅ 核心</td><td>⚠️ 提示</td></tr>
<tr><td>库存/补货最终决策</td><td>✅ 拍板</td><td>⚠️ 提供依据</td></tr></table>
<blockquote><strong>核心原则：人定方向、机器跑流程。</strong></blockquote>

<h3>5.3 真实案例</h3>
<p><strong>Walmart：</strong>Prophet + 自定义节假日效应做 45,000+ SKU 周度预测，缺货率从 8% 降至 3%。<strong>关键动作：</strong>基于不确定性区间而非点预测做安全库存。</p>
<p><strong>Amazon：</strong>DeepAR 概率预测模型直接输出需求分布。论文：<a href="https://arxiv.org/abs/1704.04110" target="_blank">DeepAR (2019)</a></p>

<h3>5.4 Agent工具链</h3>
<table><tr><th>框架</th><th>一句话</th><th>推荐场景</th></tr>
<tr><td>LangGraph</td><td>图式状态机，精细编排全流程</td><td>工程化落地</td></tr>
<tr><td>CrewAI</td><td>"数据工程师+建模师+报告分析师"角色分工</td><td>快速原型</td></tr>
<tr><td>RD-Agent</td><td>"假设→代码→回测→改进"自动闭环</td><td>因子挖掘</td></tr></table>

<div class="ex-box"><h4>✏️ 毕业项目</h4>
<ol><li>找(或生成)≥6个月的销售数据</li><li>构造20+因子，筛选Top10</li><li>训练ARIMA+Prophet+XGBoost，滚动回测对比</li><li>自动生成预测报告</li><li>写300字反思：哪些AI做得好，哪些必须你判断</li></ol>
<p>🎯 WAPE<18%合格，<12%优秀。</p></div>

<h3>5.5 你将具备的能力</h3>
<ul><li>✅ 独立用Python清洗分析供应链数据</li><li>✅ 构建时序+ML预测模型并对比</li><li>✅ 设计回测框架评估效果</li><li>✅ 清楚AI和人的决策边界</li><li>✅ 产出可写进简历的端到端项目</li></ul>

<div class="rs-box"><h4>🔗 从这里继续</h4><p>速成是建立"能做什么"的全局认知。切换到<strong>"100天修炼"</strong>，系统深入每一个模块——从"会用"到"精通"。</p></div>`,
  },
];
