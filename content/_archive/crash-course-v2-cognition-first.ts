import type { DayContent } from "@/lib/types";

/**
 * 5 天速成（v2 · 认知优先版）
 *
 * 设计哲学：成年人学复杂东西，先建立认知地图，再填技能。
 * 5 天聚焦跨场景共通的核心方法论 + 理论，不深究代码。
 * 跑通 5 天后，学习者应该：
 *   1. 看到任何"预测/决策"问题，能立刻识别它属于哪一类
 *   2. 听懂量化团队的语言（因子/回测/过拟合/不确定性）
 *   3. 知道自己缺什么、接下来 100 天该补什么
 *
 * 排序原则：方法论 → 理论 → 第一次摸键盘 → 三场景对照
 *   Day 1 方法论 ①  量化决策范式：从经验到数据
 *   Day 2 方法论 ②  因子思维：把世界翻译成可建模的语言
 *   Day 3 理论     时序/ML/不确定性 + 回测与过拟合
 *   Day 4 基础     第一次摸键盘：环境就绪 + 第一段可运行代码
 *   Day 5 综合     金融/电力/供应链三场景对照，看共同骨架
 *
 * 原 v1（实操优先版）保留在 content/_archive/crash-course-v1-practice.ts
 */
export const crashDays: DayContent[] = [
  // ════════════════════════════════════════════
  // Day 1 · 方法论 ① · 量化决策范式
  // ════════════════════════════════════════════
  {
    id: "crash-1", day: 1, week: 1, track: "crash",
    title: "方法论 ① · 量化决策范式：从经验到数据",
    description: "理解量化本质、四大环节、人与 AI 的边界——5 天里最重要的一天",
    objectives: [
      "能用一句话讲清'量化分析到底是什么'",
      "区分'传统经验决策'与'量化方法'的本质差异",
      "记住量化分析的四大环节（数据→建模→评估→决策）",
      "理解'人定方向、机器跑流程'的分工哲学",
    ],
    duration: 60,
    cues: [
      "如果我老板问'量化分析比传统经验强在哪'，我怎么 30 秒讲清？",
      "四大环节（数据/建模/评估/决策）——每个环节出错的代价不同，哪个最贵？",
      "'人定方向、机器跑流程'——哪些环节必须人来，哪些可以自动化？",
      "为什么说'AI 替代决策'是误解，'AI 加速验证假设'才是真相？",
    ],
    content: `<h3>1.1 一句话定义量化分析</h3>
<p><span class="key-pt">量化分析 = 用数据和模型，把'不确定的判断'变成'可验证、可复现、可追溯'的决策依据。</span></p>
<p>三个关键词：</p>
<ul>
<li><strong>可验证：</strong>预测对不对，事后用真实数据检验</li>
<li><strong>可复现：</strong>同一份数据 + 同一套代码，结果完全一致</li>
<li><strong>可追溯：</strong>每个数字都能追到源头，出错能定位</li>
</ul>
<p>注意：定义里没有"AI"、没有"深度学习"、没有"复杂模型"。<strong>量化是一种思维方式，不是一套工具。</strong>Excel 也能做量化，PyTorch 也可能做不出量化。</p>

<h3>1.2 传统经验 vs 量化方法——一张表看清</h3>
<table>
<tr><th>维度</th><th>传统经验决策</th><th>量化方法</th></tr>
<tr><td>判断依据</td><td>"这么多年都是这么做的"</td><td>"基于过去 5 年数据，模型预测增幅 28%±5%"</td></tr>
<tr><td>一致性</td><td>不同人拍不同数字，吵不出结果</td><td>同一份数据、同一套代码，结果一致</td></tr>
<tr><td>追溯性</td><td>出错了找不到原因</td><td>回测日志完整，每个环节可审计</td></tr>
<tr><td>更新速度</td><td>等下一次复盘会</td><td>数据更新即重新训练</td></tr>
<tr><td>适用规模</td><td>少量决策（如季度定价）</td><td>大规模决策（如每日几百个 SKU 补货）</td></tr>
</table>

<h3>1.3 量化分析的四大环节（核心地图）</h3>
<p>无论是金融、供应链还是电力市场，量化分析的骨架永远是这四步：</p>
<table>
<tr><th>环节</th><th>做什么</th><th>典型错误</th><th>出错代价</th></tr>
<tr><td><strong>① 数据</strong></td><td>收集、清洗、对齐</td><td>脏数据、口径不一致</td><td>地基塌了，后面全错</td></tr>
<tr><td><strong>② 建模</strong></td><td>选模型、训练、调参</td><td>过拟合、用错模型类型</td><td>预测不准，决策失真</td></tr>
<tr><td><strong>③ 评估</strong></td><td>回测、算误差、做对比</td><td>用全量数据评估（信息泄漏）</td><td>虚假自信，上线翻车</td></tr>
<tr><td><strong>④ 决策</strong></td><td>把模型输出变成行动</td><td>盲目相信模型、忽略业务约束</td><td>真金白银的损失</td></tr>
</table>
<div class="pit-box"><h4>⚠️ 哪个环节最贵</h4>
<p>不是建模——很多人以为建模最难最贵。<strong>实际上是数据和决策最贵。</strong></p>
<ul>
<li>数据脏了：后面所有工作都白做</li>
<li>决策错了：模型再准也亏钱</li>
<li>建模错了：可以换模型重训，损失可控</li>
</ul>
<p>这就是为什么<strong>顶尖团队把 70% 精力放在数据和决策上，建模只占 30%</strong>。</p></div>

<h3>1.4 人与 AI 的边界——'人定方向、机器跑流程'</h3>
<p><span class="key-pt">这是整个 5 天最重要的一句话，请务必记住。</span></p>
<table>
<tr><th>环节</th><th>人主导</th><th>AI/自动化主导</th></tr>
<tr><td>① 数据</td><td>判断数据可信度、识别噪声</td><td>清洗、对齐、特征构造</td></tr>
<tr><td>② 建模</td><td>提出假设（"促销拉动销量"）</td><td>代码生成、模型训练、调参</td></tr>
<tr><td>③ 评估</td><td>判断模型是否合理、防止伪相关</td><td>滚动回测、自动报告</td></tr>
<tr><td>④ 决策</td><td>风险容忍度、资金/库存配置、异常应对</td><td>执行、监控、告警</td></tr>
</table>
<p><strong>一句话总结：</strong>机器负责把假设快速验证到极致；人负责提出对的假设并守住风险底线。</p>
<p>所以："AI 替代交易员/分析师"是误解；"AI 让分析师从抄数填表中解放出来，专注判断"才是真相。</p>

<h3>1.5 为什么这个范式适用于所有'预测+决策'问题</h3>
<p>无论是：</p>
<ul>
<li><strong>金融：</strong>预测股价 → 决定买卖</li>
<li><strong>供应链：</strong>预测销量 → 决定补货</li>
<li><strong>电力市场：</strong>预测电价 → 决定报价</li>
<li><strong>医疗：</strong>预测病情 → 决定治疗方案</li>
</ul>
<p>骨架都是<strong>数据→建模→评估→决策</strong>，差异只在数据形态和决策约束。<strong>学一套方法论，迁移到任何场景。</strong></p>

<div class="ex-box"><h4>✏️ Day 1 思考练习（不写代码）</h4>
<ol>
<li>用一句话向你妈解释"量化分析是什么"——如果能讲清，说明你真懂了</li>
<li>列出你工作中 3 个"目前靠经验、其实可以量化"的决策</li>
<li>对每个决策，画出四大环节：现在数据怎么来？模型是什么（哪怕是 Excel 公式）？怎么评估？谁拍板？</li>
<li>在底部总结框写下：哪个环节最薄弱？为什么？</li>
</ol></div>
<div class="bk-box"><h4>📖 延伸阅读（不强求）</h4>
<p>《如何衡量万事万物》第 1 章（在教材精读模块）——讲"万事万物皆可衡量"，是量化思维的哲学基石。</p></div>`,
  },

  // ════════════════════════════════════════════
  // Day 2 · 方法论 ② · 因子思维
  // ════════════════════════════════════════════
  {
    id: "crash-2", day: 2, week: 1, track: "crash",
    title: "方法论 ② · 因子思维：把世界翻译成可建模的语言",
    description: "因子是量化分析的'原子'——学会用因子视角看任何业务问题",
    objectives: [
      "理解'因子'的精确定义（不是 Excel 列，是有预测力的变量）",
      "学会从业务问题反向推导因子集",
      "掌握因子好坏的评估标准（IC/相关性/稳定性）",
      "理解'因子组合'为什么比'单因子'强大",
    ],
    duration: 75,
    cues: [
      "因子和特征有什么区别？为什么金融叫因子、ML 叫特征？",
      "给你一个'预测下周销量'的任务，你能列出至少 10 个候选因子吗？",
      "IC（信息系数）是什么？为什么 IC > 0.03 就算有效？",
      "为什么'促销折扣'单看没用，但和'节假日'组合就强？",
    ],
    content: `<h3>2.1 因子是什么——精确化定义</h3>
<p><span class="key-pt">因子 = 对目标变量有预测力、且能被数值化、且能被持续观察的变量。</span></p>
<p>注意三个限定词，缺一不可：</p>
<table>
<tr><th>限定词</th><th>含义</th><th>反例（不构成因子）</th></tr>
<tr><td>有预测力</td><td>和目标有因果关系或强相关</td><td>"SKU 编号"——是数字但没预测力</td></tr>
<tr><td>能数值化</td><td>能转成数字喂给模型</td><td>"品牌调性"——除非能评分</td></tr>
<tr><td>能持续观察</td><td>未来也能获取</td><td>"去年某次促销的真实库存"——过去了</td></tr>
</table>
<p>金融叫"因子"，机器学习叫"特征"，本质相同——都是"模型的输入"。本课程两个词混用。</p>

<h3>2.2 从业务问题反向推导因子集</h3>
<p>这是量化分析师最值钱的能力。<strong>好的因子集 = 好模型的一半。</strong></p>
<p><strong>示例：预测某 SKU 下周销量</strong></p>
<table>
<tr><th>类别</th><th>候选因子</th><th>为什么可能有用</th></tr>
<tr><td rowspan="3">时间</td><td>星期几</td><td>工作日 vs 周末需求不同</td></tr>
<tr><td>月份</td><td>季节性</td></tr>
<tr><td>距大促天数</td><td>大促前会囤货/延后</td></tr>
<tr><td rowspan="4">历史</td><td>上周同期销量</td><td>惯性</td></tr>
<tr><td>过去 4 周均值</td><td>趋势</td></tr>
<tr><td>过去 4 周标准差</td><td>波动性</td></tr>
<tr><td>去年同期销量</td><td>年季节性</td></tr>
<tr><td rowspan="3">促销</td><td>折扣力度</td><td>直接拉动</td></tr>
<tr><td>是否主推</td><td>曝光加权</td></tr>
<tr><td>竞品同期折扣</td><td>替代效应</td></tr>
<tr><td rowspan="2">外部</td><td>天气（温度/降水）</td><td>影响到店/外卖</td></tr>
<tr><td>节假日哑变量</td><td>消费高峰</td></tr>
</table>
<p>12 个因子覆盖 5 大类。<strong>这就是因子思维——把"销量受什么影响"翻译成"模型能吃的数字"。</strong></p>

<div class="pit-box"><h4>⚠️ 新手最大的坑：因子越多越好？</h4>
<p><strong>不是。</strong>因子过多会带来：</p>
<ul>
<li>过拟合（噪声被当成信号）</li>
<li>多重共线性（因子之间高度相关，模型不稳定）</li>
<li>计算成本高</li>
</ul>
<p>实战中，<strong>15-30 个精选因子</strong>比 100 个粗糙因子效果好得多。</p></div>

<h3>2.3 因子好坏怎么评——IC 与相关性</h3>
<p><strong>IC（Information Coefficient，信息系数）：</strong>因子值与未来目标的 Rank 相关系数。</p>
<table>
<tr><th>|IC|</th><th>评价</th><th>行动</th></tr>
<tr><td>&gt; 0.05</td><td>强因子</td><td>必留</td></tr>
<tr><td>0.03 - 0.05</td><td>有效</td><td>保留</td></tr>
<tr><td>0.01 - 0.03</td><td>弱</td><td>看稳定性再定</td></tr>
<tr><td>&lt; 0.01</td><td>噪声</td><td>剔除</td></tr>
</table>
<p>注意：金融里 IC > 0.03 就算有效（因为市场噪声极大）；供应链里阈值可以更宽松（业务更稳定）。</p>
<p><strong>稳定性（ICIR）：</strong>IC 的均值 / IC 的标准差。一个因子 IC 平均 0.05 但波动大，不如 IC 平均 0.03 但稳定的。</p>

<h3>2.4 为什么'因子组合'远胜'单因子'</h3>
<p>单因子只看一个维度，组合因子能捕捉<strong>交互效应</strong>。</p>
<table>
<tr><th>场景</th><th>促销折扣单因子</th><th>促销×节假日组合因子</th></tr>
<tr><td>普通日 + 7 折</td><td>销量+20%</td><td>—</td></tr>
<tr><td>双 11 + 7 折</td><td>销量+20%（误判）</td><td>销量+200%（真实）</td></tr>
</table>
<p>这就是为什么树模型（XGBoost）和神经网络比线性回归强——它们<strong>自动学习因子组合</strong>。</p>

<h3>2.5 因子思维适用于所有量化问题</h3>
<table>
<tr><th>场景</th><th>目标</th><th>典型因子</th></tr>
<tr><td>金融选股</td><td>预测下周涨跌</td><td>动量/估值/质量/情绪</td></tr>
<tr><td>供应链补货</td><td>预测下周销量</td><td>历史/促销/天气/节假日</td></tr>
<tr><td>电力报价</td><td>预测次日电价</td><td>负荷预测/燃料价/新能源出力</td></tr>
<tr><td>医疗诊断</td><td>预测病情进展</td><td>年龄/病史/检验指标</td></tr>
</table>
<p><strong>方法论完全一致——这就是为什么学一套能迁移到任何场景。</strong></p>

<div class="ex-box"><h4>✏️ Day 2 思考练习（不写代码）</h4>
<ol>
<li>选一个你工作中的预测问题（销量/库存/客流量均可）</li>
<li>列出至少 10 个候选因子，按 2.2 的表格分类</li>
<li>对每个因子，凭直觉判断它的 IC 大概是高/中/低</li>
<li>找出 2 对"单独看弱、组合起来强"的因子（如促销×节假日）</li>
</ol></div>
<div class="bk-box"><h4>📖 延伸</h4>
<p>《深入浅出Python量化交易实战》第 5-6 章——讲金融因子的 IC/换手率/自相关评估，方法可直接迁移到供应链。</p></div>`,
  },

  // ════════════════════════════════════════════
  // Day 3 · 理论 · 时序/ML/不确定性 + 回测
  // ════════════════════════════════════════════
  {
    id: "crash-3", day: 3, week: 1, track: "crash",
    title: "理论 · 时序模型 vs ML 模型 + 回测与过拟合",
    description: "建立模型选型的理论框架——什么场景用什么模型，以及如何防止'训练好看、上线崩盘'",
    objectives: [
      "理解时序模型（ARIMA/Prophet）和 ML 模型（XGBoost/LSTM）的本质差异",
      "知道什么时候该用哪种——选型决策树",
      "理解过拟合的数学含义和三大成因",
      "掌握回测的正确姿势（避免信息泄漏）",
    ],
    duration: 90,
    cues: [
      "ARIMA 和 XGBoost 处理时序的方式有什么本质不同？",
      "数据量 < 1000 行时，该选 ARIMA 还是 LSTM？为什么？",
      "过拟合的三大成因是什么？怎么识别？",
      "为什么不能用 train_test_split(shuffle=True) 切时序数据？",
    ],
    content: `<h3>3.1 两类模型的本质差异</h3>
<table>
<tr><th>维度</th><th>时序模型（ARIMA/Prophet）</th><th>ML 模型（XGBoost/LSTM）</th></tr>
<tr><td>核心假设</td><td>未来是过去的延续</td><td>特征与目标有稳定映射</td></tr>
<tr><td>输入</td><td>历史值序列</td><td>特征矩阵 X</td></tr>
<tr><td>输出</td><td>未来值（带置信区间）</td><td>点预测或概率预测</td></tr>
<tr><td>强项</td><td>小样本、趋势+季节性</td><td>多因子交互、非线性</td></tr>
<tr><td>弱项</td><td>外部因子难融入</td><td>数据饥渴（需大量样本）</td></tr>
<tr><td>可解释性</td><td>强（参数有明确含义）</td><td>弱（黑盒，需 SHAP）</td></tr>
</table>

<h3>3.2 模型选型决策树</h3>
<pre><code>问：数据量多少？
├─ &lt; 500 行 → 用 ARIMA 或 Prophet（小样本友好）
├─ 500-10000 行 → 先试 XGBoost，对比 ARIMA
└─ &gt; 10000 行 → XGBoost/LightGBM，必要时上 LSTM

问：有强外部因子（促销/天气）吗？
├─ 有 → 倾向 XGBoost（外部因子易融入）
└─ 无 → ARIMA/Prophet 足够

问：需要概率预测（区间）吗？
├─ 是 → Prophet（自带区间）或分位数回归
└─ 否 → 任意模型均可

问：需要可解释性（给业务方讲）吗？
├─ 是 → ARIMA/Prophet（参数清晰）+ SHAP
└─ 否 → 黑盒模型可接受
</code></pre>
<div class="pit-box"><h4>⚠️ 新手最常见误区</h4>
<p><strong>"LSTM 一定比 ARIMA 强"</strong>——错。在数据量 &lt; 5000 行时，ARIMA/XGBoost 几乎一定胜过 LSTM。<strong>不要为了"看起来高级"硬上深度学习。</strong></p></div>

<h3>3.3 过拟合——量化分析的头号陷阱</h3>
<p><span class="key-pt">过拟合 = 模型记住了训练数据里的噪声，而不是真实的规律。</span></p>
<p><strong>三大成因：</strong></p>
<table>
<tr><th>成因</th><th>表现</th><th>对策</th></tr>
<tr><td>模型太复杂</td><td>参数远多于样本</td><td>用更简单模型 / 正则化</td></tr>
<tr><td>特征太多</td><td>100 个特征 1000 个样本</td><td>特征选择（Lasso/Boruta）</td></tr>
<tr><td>评估方法错</td><td>用全量数据训练+评估</td><td>正确切分 + 交叉验证</td></tr>
</table>
<p><strong>识别信号：</strong>训练集 MAPE = 2%，测试集 MAPE = 30%——典型过拟合。</p>

<h3>3.4 回测的正确姿势</h3>
<p>回测 = 用历史数据模拟"如果当时用这个模型，表现如何"。<strong>这是量化分析的命脉。</strong></p>
<table>
<tr><th>错误做法</th><th>后果</th><th>正确做法</th></tr>
<tr><td>随机切分（shuffle=True）</td><td>测试集混入未来信息</td><td>时序切分（TimeSeriesSplit）</td></tr>
<tr><td>用全量数据归一化</td><td>测试集信息泄漏到训练</td><td>只在训练集 fit，测试集 transform</td></tr>
<tr><td>只看整体 MAPE</td><td>忽略极端时段表现</td><td>按时段/分位分组评估</td></tr>
<tr><td>不对比 baseline</td><td>不知道模型是真的好还是数据本身平稳</td><td>必对比 persistence/naive baseline</td></tr>
</table>
<p><strong>两个最低成本的 baseline：</strong></p>
<ul>
<li><strong>Persistence：</strong>用 t-1 的值预测 t（"明天和今天一样"）</li>
<li><strong>Naive：</strong>用上周同期值（"下周和这周一样"）</li>
</ul>
<p>如果你的模型连这两个 baseline 都打不过，<strong>说明模型没价值</strong>。</p>

<h3>3.5 评估指标——为什么 MAPE 不够</h3>
<table>
<tr><th>指标</th><th>含义</th><th>陷阱</th></tr>
<tr><td>MAE</td><td>平均绝对误差</td><td>不区分大小错</td></tr>
<tr><td>RMSE</td><td>均方根误差（惩罚大错）</td><td>对异常值敏感</td></tr>
<tr><td>MAPE</td><td>平均绝对百分比误差</td><td>真实值小时爆炸（除以 0）</td></tr>
<tr><td>WAPE</td><td>加权 MAPE（分母用总和）</td><td>更稳健，推荐</td></tr>
</table>
<p><strong>实战建议：同时报 3 个指标（MAE + RMSE + WAPE），互相印证。</strong></p>

<div class="ex-box"><h4>✏️ Day 3 思考练习</h4>
<ol>
<li>对 Day 2 列出的 10+ 因子，判断：你的数据量大概多少？该选 ARIMA 还是 XGBoost？</li>
<li>回想你见过的"模型上线翻车"案例，对照 3.3 的三大成因，归因到哪一个？</li>
<li>设计你工作的"最低成本 baseline"：如果完全不用模型，最简单的预测是什么？</li>
</ol></div>
<div class="bk-box"><h4>📖 延伸</h4>
<p>《Forecasting: Principles and Practice》（免费在线 <a href="https://otexts.com/fpp3/" target="_blank">otexts.com/fpp3</a>）第 3-5 章——时序模型圣经。</p></div>`,
  },

  // ════════════════════════════════════════════
  // Day 4 · 基础 · 第一次摸键盘
  // ════════════════════════════════════════════
  {
    id: "crash-4", day: 4, week: 1, track: "crash",
    title: "基础 · 第一次摸键盘：环境就绪 + 第一段可运行代码",
    description: "理论够了，今天开始动手——装环境，跑通第一段 Python，建立'我能做'的信心",
    objectives: [
      "装好 Python + Jupyter 环境（或用 Google Colab 免安装）",
      "跑通第一段 pandas 代码，理解 DataFrame",
      "学会读 CSV、看数据基本统计",
      "为 100 天修炼的代码学习铺好地基",
    ],
    duration: 90,
    cues: [
      "为什么推荐 Google Colab 而不是本地装 Python？",
      "DataFrame 和 Excel 表的区别是什么？",
      "df.head() / df.info() / df.describe() 各自看什么？",
      "今天跑通后，下一步该补哪些 Python 基础？",
    ],
    content: `<h3>4.1 三条路径，选一条</h3>
<table>
<tr><th>路径</th><th>适合谁</th><th>优点</th><th>缺点</th></tr>
<tr><td><strong>Google Colab（推荐新手）</strong></td><td>完全零基础</td><td>免安装、免费 GPU、浏览器即用</td><td>需科学上网</td></tr>
<tr><td><strong>Anaconda 本地安装</strong></td><td>有 Python 基础</td><td>离线可用、环境独立</td><td>安装较重</td></tr>
<tr><td><strong>Docker / WSL</strong></td><td>有工程经验</td><td>环境隔离彻底</td><td>配置复杂</td></tr>
</table>
<p><strong>新手强烈推荐 Colab</strong>——5 分钟从零到跑通，避免被环境问题劝退。</p>

<h3>4.2 第一段代码（复制到 Colab 即可跑）</h3>
<pre><code># 第一步：导入工具
import pandas as pd
import numpy as np

# 第二步：造一份模拟销量数据（先不连真实数据库）
dates = pd.date_range('2024-01-01', periods=90, freq='D')
sales = np.random.randint(50, 200, size=90) + np.sin(np.arange(90)/7)*30
df = pd.DataFrame({'日期': dates, '销量': sales.astype(int)})

# 第三步：看数据长什么样
print(df.head(10))        # 前 10 行
print(df.info())          # 数据类型和缺失
print(df.describe())      # 均值/最小/最大/分位

# 第四步：画个图
import matplotlib.pyplot as plt
df.plot(x='日期', y='销量', figsize=(12,4))
plt.title('90 天销量走势')
plt.show()

print('✅ 恭喜！你的第一段量化代码跑通了')
</code></pre>

<h3>4.3 理解 DataFrame——5 个核心动作</h3>
<p>DataFrame 就是"代码版的 Excel 表"，但能处理百万行不卡。</p>
<table>
<tr><th>动作</th><th>Excel 怎么做</th><th>pandas 代码</th></tr>
<tr><td>看前几行</td><td>滚动鼠标</td><td>df.head()</td></tr>
<tr><td>筛选</td><td>自动筛选</td><td>df[df['销量'] > 100]</td></tr>
<tr><td>分组求和</td><td>数据透视表</td><td>df.groupby('月份')['销量'].sum()</td></tr>
<tr><td>排序</td><td>排序按钮</td><td>df.sort_values('销量', ascending=False)</td></tr>
<tr><td>新增列</td><td>写公式</td><td>df['是否破百'] = df['销量'] > 100</td></tr>
</table>
<p><strong>今天就掌握这 5 个</strong>，已经比 80% 的 Excel 用户强了。</p>

<h3>4.4 读真实 CSV（下一步）</h3>
<pre><code># 如果你有真实销量数据 CSV
df_real = pd.read_csv('my_sales.csv', parse_dates=['日期'])
df_real.head()

# Google Colab 上传文件
from google.colab import files
uploaded = files.upload()  # 会弹窗选文件
</code></pre>

<h3>4.5 接下来 100 天该补什么</h3>
<p>今天跑通后，你已经有了<strong>"我能写 Python"的信心</strong>。但要真正做量化，还需要补：</p>
<table>
<tr><th>技能</th><th>在 100 天修炼的哪一天</th></tr>
<tr><td>pandas 进阶（合并/透视/时序）</td><td>D8-D14</td></tr>
<tr><td>ARIMA / Prophet 实操</td><td>D15-D21</td></tr>
<tr><td>XGBoost + 回测</td><td>D22-D28</td></tr>
<tr><td>特征工程深度</td><td>D31-D40</td></tr>
<tr><td>SHAP 可解释性</td><td>D41-D45</td></tr>
</table>
<p><strong>5 天结束不是终点，是 100 天的起点。</strong>但你现在已经知道每个技能"为什么学、用在哪个环节"。</p>

<div class="ex-box"><h4>✏️ Day 4 必做（今天一定要跑通）</h4>
<ol>
<li>打开 <a href="https://colab.research.google.com/" target="_blank">Google Colab</a>，新建 Notebook</li>
<li>复制 4.2 的代码，点运行，看到图</li>
<li>把截图发朋友圈："我的第一段量化代码"——建立仪式感</li>
<li>（可选）上传你的真实销量 CSV，跑 df.describe()</li>
</ol></div>
<div class="bk-box"><h4>📖 延伸</h4>
<p>《利用Python进行数据分析》Wes McKinney 第 1-4 章——pandas 作者亲笔，最权威入门。</p></div>`,
  },

  // ════════════════════════════════════════════
  // Day 5 · 综合 · 三场景对照看共同骨架
  // ════════════════════════════════════════════
  {
    id: "crash-5", day: 5, week: 1, track: "crash",
    title: "综合 · 金融/电力/供应链三场景对照——看共同骨架",
    description: "用三个真实场景验证你学到的方法论——发现它们的骨架完全相同",
    objectives: [
      "能用同一套方法论分析金融、电力、供应链三类预测问题",
      "看清'数据→建模→评估→决策'四步在三个场景中的映射",
      "明确自己接下来要深耕哪个场景",
      "完成 5 天速成的'认知毕业测试'",
    ],
    duration: 90,
    cues: [
      "金融选股、电力报价、供应链补货——三者的'目标变量'分别是什么？",
      "三个场景的'最贵错误'分别是什么？",
      "三个场景哪个数据最干净？哪个最脏？",
      "我接下来 100 天要深耕哪个场景？为什么？",
    ],
    content: `<h3>5.1 三个场景的统一骨架</h3>
<table>
<tr><th>维度</th><th>金融（股价预测）</th><th>电力（电价预测）</th><th>供应链（销量预测）</th></tr>
<tr><td><strong>目标</strong></td><td>预测下周股价涨跌</td><td>预测次日 24 时段电价</td><td>预测下周 SKU 销量</td></tr>
<tr><td><strong>数据</strong></td><td>股价/财报/舆情</td><td>历史电价/负荷/天气</td><td>销量/促销/天气/节假日</td></tr>
<tr><td><strong>因子</strong></td><td>动量/估值/质量</td><td>负荷/燃料价/新能源出力</td><td>历史/促销/外部</td></tr>
<tr><td><strong>模型</strong></td><td>XGBoost/LSTM</td><td>XGBoost/Transformer</td><td>Prophet/XGBoost</td></tr>
<tr><td><strong>评估</strong></td><td>IC/夏普/回撤</td><td>MAPE/覆盖率</td><td>MAPE/WAPE</td></tr>
<tr><td><strong>决策</strong></td><td>买卖+仓位</td><td>报价+储能调度</td><td>补货+库存</td></tr>
<tr><td><strong>最贵错误</strong></td><td>方向错（亏钱）</td><td>尖峰预测错（巨亏）</td><td>补多了（库存积压）</td></tr>
</table>
<p><strong>骨架完全相同：数据→因子→模型→评估→决策。</strong>差异只在具体形态。</p>

<h3>5.2 三个场景的难度排序</h3>
<table>
<tr><th>维度</th><th>供应链（最易入门）</th><th>电力（中等）</th><th>金融（最难）</th></tr>
<tr><td>数据可得性</td><td>⭐⭐⭐⭐⭐（企业内部）</td><td>⭐⭐⭐⭐⭐（PJM 公开）</td><td>⭐⭐⭐（需付费）</td></tr>
<tr><td>噪声水平</td><td>⭐⭐（较稳定）</td><td>⭐⭐⭐（有尖峰）</td><td>⭐⭐⭐⭐⭐（极嘈杂）</td></tr>
<tr><td>对手博弈</td><td>无</td><td>弱</td><td>极强（零和）</td></tr>
<tr><td>反馈速度</td><td>周/月</td><td>次日</td><td>秒级</td></tr>
<tr><td>推荐入门顺序</td><td><strong>① 首选</strong></td><td>② 第二</td><td>③ 最后</td></tr>
</table>
<p><strong>结论：供应链是最佳的入门场景</strong>——数据可得、噪声小、无对手博弈、反馈周期可接受。<br>学完供应链再迁金融或电力，事半功倍。</p>

<h3>5.3 三场景的'共同陷阱'</h3>
<table>
<tr><th>陷阱</th><th>金融表现</th><th>电力表现</th><th>供应链表现</th></tr>
<tr><td>过拟合</td><td>回测夏普 3，实盘亏</td><td>训练 MAPE 5%，上线 25%</td><td>训练准，大促全错</td></tr>
<tr><td>信息泄漏</td><td>用了财报后数据</td><td>用了未来负荷</td><td>用了促销后销量</td></tr>
<tr><td>忽略极端事件</td><td>黑天鹅爆仓</td><td>寒潮价格尖峰</td><td>大促断货或积压</td></tr>
<tr><td>盲目信模型</td><td>机器交易崩盘</td><td>报价失误</td><td>补货决策脱离业务</td></tr>
</table>
<p><strong>陷阱相同，对策也相同：</strong>正确回测 + baseline 对比 + 人在环决策。</p>

<h3>5.4 认知毕业测试</h3>
<p>5 天结束了。回答以下 5 个问题，每个 20 分，60 分及格，80 分优秀：</p>
<ol>
<li>用一句话定义"量化分析"（提示：三个关键词）</li>
<li>量化分析四大环节里，哪个最贵？为什么？</li>
<li>什么是因子？它的三个必要条件是什么？</li>
<li>ARIMA 和 XGBoost 各自的强项是什么？数据量 500 行该选哪个？</li>
<li>过拟合的三大成因是什么？怎么识别？</li>
</ol>
<p>把答案写在底部总结框，对照前 4 天的内容自评。</p>

<h3>5.5 选择你的下一步</h3>
<table>
<tr><th>你的情况</th><th>推荐路径</th></tr>
<tr><td>供应链/快消从业者</td><td>100 天修炼（D1-D100）</td></tr>
<tr><td>电力/能源从业者</td><td>电力市场 90 天（D1-D90）</td></tr>
<tr><td>金融爱好者</td><td>100 天修炼 + 《PyQT》教材精读</td></tr>
<tr><td>纯好奇、未定向</td><td>先做 100 天修炼 D1-D14，再选方向</td></tr>
</table>

<div class="ex-box"><h4>🎓 Day 5 毕业</h4>
<ol>
<li>完成认知毕业测试，自评分数</li>
<li>写下"我接下来要深耕的场景 + 理由"</li>
<li>点"✅ 完成今日"——5 天速成结束</li>
</ol>
<p>恭喜！你现在拥有的认知地图，比许多工作 3 年的"经验型分析师"还清晰。<strong>认知清晰是行动有效的前提。</strong></p></div>
<div class="bk-box"><h4>📖 下一步</h4>
<p>切到 <strong>📅 100 天修炼</strong> 或 <strong>⚡ 电力市场 90 天</strong>，从 Day 1 开始系统补基础和实操。</p></div>`,
  },
];
