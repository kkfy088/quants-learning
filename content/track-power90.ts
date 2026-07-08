import type { DayContent } from "@/lib/types";

/**
 * 电力市场 + 人工智能 · 90 天学习轨
 *
 * 来源：《电力市场AI学习路径_优化方案.md》
 * 核心原则：问题驱动而非通读；1 主攻+配套而非平均铺开；
 *          数据从 D1 启动；确定性优化为主线，RL 为探索。
 *
 * 四阶段：
 *   阶段一 D1-D10  以问题驱动打基础（市场结构 + AI 速览）
 *   阶段二 D11-D30 工具链 + 数据基线（提前启动）
 *   阶段三 D31-D70 核心算法突破（电价预测主攻 + 配套）
 *   阶段四 D71-D90 整合交付（不是从零开始）
 *
 * 验收标准：一个可运行的电价预测 + 竞价策略系统，含回测报告
 */
export const power90Days: DayContent[] = [
  // ════════════════════════════════════════════════
  // 阶段一 · D1-D10 · 以问题驱动打基础
  // ════════════════════════════════════════════════
  {
    id: "p90-d1", day: 1, week: 1, track: "power90",
    title: "中国电力市场全景：从发电到结算",
    description: "理解一个完整交易闭环：日前市场报价 → 集中出清 → 节点电价(LMP) → 结算",
    objectives: [
      "画出中国电力市场结构图（中长期/日前/实时/辅助服务）",
      "理解出清（uniform clearing）原理",
      "知道 LMP = 能量价 + 阻塞价 + 损耗价",
    ],
    duration: 90,
    cues: [
      "中长期合约、日前集中竞价、实时平衡、辅助服务——四个市场各自解决什么问题？",
      "出清价格（uniform clearing）是怎么形成的？为什么用同一个价？",
      "LMP 三要素是什么？什么时候阻塞价会变高？",
      "画一张完整的市场结构图，标注时间轴",
    ],
    content: `<h3>1.1 电力市场的"四层蛋糕"</h3>
<p><span class="key-pt">中国电力市场体系不是单一市场，而是四个相互衔接的市场层，按时间从长到短排列。</span></p>
<table>
<tr><th>市场层</th><th>时间尺度</th><th>解决什么</th><th>类比</th></tr>
<tr><td>中长期合约</td><td>年度/月度</td><td>锁定大部分电量价格，规避波动</td><td>期货/远期合约</td></tr>
<tr><td>日前集中竞价</td><td>提前一天</td><td>确定次日每小时的发电计划与电价</td><td>"日盘"集中撮合</td></tr>
<tr><td>实时平衡</td><td>分钟级</td><td>应对突发偏差（机组跳机、负荷突增）</td><td>"应急市场"</td></tr>
<tr><td>辅助服务</td><td>秒-分钟</td><td>调频、调压、备用容量</td><td>"保险服务"</td></tr>
</table>

<h3>1.2 出清（Uniform Clearing）原理</h3>
<p>核心思想：<strong>所有中标机组按同一个价格结算</strong>——这个价格就是满足负荷的最后一台机组的报价。</p>
<p>举例：负荷 1000MW，三台机组报价如下：</p>
<table>
<tr><th>机组</th><th>容量(MW)</th><th>报价(元/MWh)</th><th>是否中标</th></tr>
<tr><td>A (核电)</td><td>500</td><td>200</td><td>✅ 中标</td></tr>
<tr><td>B (煤电)</td><td>400</td><td>350</td><td>✅ 中标</td></tr>
<tr><td>C (气电)</td><td>200</td><td>500</td><td>✅ 部分中标(100MW)</td></tr>
<tr><td>D (油电)</td><td>200</td><td>800</td><td>❌ 落选</td></tr>
</table>
<p>→ 出清价 = 500 元/MWh（C 的报价），A/B/C <strong>都按 500 结算</strong>。</p>
<p>为什么这样设计？<strong>激励报价接近真实成本</strong>。如果按各自报价结算，机组会拼命报高价。</p>

<h3>1.3 节点电价 LMP（Locational Marginal Price）</h3>
<p>LMP = <strong>能量价 + 阻塞价 + 损耗价</strong></p>
<ul>
<li><strong>能量价：</strong>系统边际机组成本（上面讲的出清价）</li>
<li><strong>阻塞价：</strong>电网输电能力不足时，便宜电送不过去，本地只能用贵电</li>
<li><strong>损耗价：</strong>输电过程中的线损</li>
</ul>
<div class="pit-box"><h4>⚠️ 新手最易混淆</h4>
<p>"为什么同一个时刻不同节点电价差几十倍？"<br>→ 通常是<strong>阻塞</strong>导致。某条线路满了，远处的便宜电送不过来，本地只能用本地贵电。</p></div>

<h3>1.4 动手任务</h3>
<div class="ex-box"><h4>✏️ Day 1 必做</h4>
<ol>
<li>用 draw.io 或纸笔画一张"中国电力市场结构图"，包含四个市场层 + 时间轴 + 主要参与者（发电/电网/用户/交易中心）</li>
<li>在左侧线索栏写下：你所在的省份（如广东/山西）属于哪个电力现货市场试点？</li>
<li>B 站搜"电力市场基础"，1.5x 速看 30 分钟视频，抓概念不抓细节</li>
</ol></div>
<div class="bk-box"><h4>📖 字典式查阅（不通读！）</h4>
<p>《电力市场概论》曾鸣 → 只翻市场结构 + 出清 + 结算章节，遇到不懂的概念再回来查</p></div>`,
  },
  {
    id: "p90-d2", day: 2, week: 1, track: "power90",
    title: "交易闭环深挖：报价、出清与结算",
    description: "发电商如何报价（量价曲线/步梯），双边合约 vs 集中竞价，偏差结算规则",
    objectives: [
      "理解发电商报价的三种形式（量价曲线/步梯/单段）",
      "区分中长期合约与现货的结算逻辑",
      "能完成一个 3 机组的出清算例",
    ],
    duration: 90,
    cues: [
      "步梯报价（block bid）是什么？为什么比单段报价更灵活？",
      "中长期合约价 + 现货价如何组合成最终结算？",
      "偏差电量怎么考核？发电多发和少发分别怎么结算？",
      "手算 3 机组出清的收益拆解",
    ],
    content: `<h3>2.1 发电商怎么报价</h3>
<p><span class="key-pt「>电力报价不是」一个价」，而是」量价曲线」——不同出力段对应不同价。</span></p>
<table>
<tr><th>报价形式</th><th>结构</th><th>典型用途</th></tr>
<tr><td>单段报价</td><td>(P, Q) 一对</td><td>小型机组</td></tr>
<tr><td>步梯报价（block bid）</td><td>[(Q1,P1), (Q2,P2), ...]</td><td>主流：煤电/气电</td></tr>
<tr><td>连续曲线</td><td>连续函数</td><td>理论模型</td></tr>
</table>
<p>步梯报价的核心：<strong>机组可以根据出力水平报不同价</strong>。如煤电基荷段（300MW）报 300 元，调峰段（再 100MW）报 500 元——因为调峰时效率下降。</p>

<h3>2.2 双边合约 vs 集中竞价</h3>
<table>
<tr><th>维度</th><th>双边合约</th><th>集中竞价</th></tr>
<tr><td>对手方</td><td>电厂↔用户/售电公司直接签</td><td>通过交易中心撮合</td></tr>
<tr><td>价格</td><td>双方协商</td><td>市场出清</td></tr>
<tr><td>量</td><td>固定，确定性强</td><td>动态，反映实时供需</td></tr>
<tr><td>角色</td><td>"压舱石「——锁定大部分电量</td><td>」价格发现」——反映边际价值</td></tr>
</table>

<h3>2.3 偏差结算：多发少发都要罚</h3>
<p>实际发电 / 用电 ≠ 合约量 → 偏差电量，按偏差结算规则处理。</p>
<ul>
<li><strong>发电偏差：</strong>多发按现货价卖（可能赚可能亏）；少发按现货价买回（"补量"）</li>
<li><strong>用电偏差：</strong>多用电按现货价买；少用按现货价卖回</li>
</ul>
<p>所以：<strong>合约价 + 现货价 = 最终结算</strong>。现货是"边际调节「，合约是」主体锁定」。</p>

<h3>2.4 算例：3 机组出清收益拆解</h3>
<p>负荷 1000MW，A/B/C 三台机组报价如 Day 1 所示，出清价 500 元。</p>
<table>
<tr><th>机组</th><th>中标量</th><th>收入</th><th>假设成本</th><th>利润</th></tr>
<tr><td>A</td><td>500MW</td><td>500×500=250,000</td><td>200×500=100,000</td><td>150,000</td></tr>
<tr><td>B</td><td>400MW</td><td>400×500=200,000</td><td>350×400=140,000</td><td>60,000</td></tr>
<tr><td>C</td><td>100MW</td><td>100×500=50,000</td><td>500×100=50,000</td><td>0</td></tr>
</table>
<p>→ A（核电）赚最多，C（气电，边际机组）几乎不赚。这是电力市场<strong>"边际定价"</strong>的核心特征。</p>

<div class="ex-box"><h4>✏️ Day 2 算例</h4>
<p>给定负荷 800MW，机组 X(成本150/容量500)、Y(成本300/容量400)、Z(成本450/容量300)，手算：</p>
<ol>
<li>出清价是多少？</li>
<li>每台机组的中标量、收入、利润？</li>
<li>如果负荷涨到 1000MW，出清价和利润怎么变？</li>
</ol></div>`,
  },
  {
    id: "p90-d3", day: 3, week: 1, track: "power90",
    title: "市场时间轴：中长期 → 日前 → 实时 → 辅助",
    description: "理清四类市场的时间衔接关系，写一份'市场时间轴'说明",
    objectives: [
      "画出从年度到秒级的完整市场时间轴",
      "理解每层市场的开关时刻（如日前市场 D-1 10:00 截单）",
      "能向非技术同事讲清楚电力的结算瀑布",
    ],
    duration: 60,
    cues: [
      "日前市场几点截单？实时市场多久结算一次？",
      "中长期合约量和现货量加起来必须等于实际用电吗？",
      "辅助服务市场（调频/备用）和能量市场什么关系？",
      "用一张时间轴图把四层市场串起来",
    ],
    content: `<h3>3.1 电力市场时间轴（一张图说清）</h3>
<pre><code>┌─────────────┬──────────────┬──────────────┬───────────────┐
│   年度/月度   │     日前      │     实时      │    辅助服务    │
│   中长期合约   │   集中竞价    │    平衡市场   │   (调频/备用)  │
├─────────────┼──────────────┼──────────────┼───────────────┤
│ 年-月前      │ D-1 日       │ 实时-15min   │ 秒-分钟        │
│ 锁定80%电量  │ 决定次日计划  │ 处理偏差      │ 保障电网安全   │
└─────────────┴──────────────┴──────────────┴───────────────┘
        ↓                ↓              ↓                ↓
   合约价结算        现货价结算     偏差考核结算      服务费结算
</code></pre>

<h3>3.2 关键时点（以某省试点为例）</h3>
<table>
<tr><th>时点</th><th>动作</th></tr>
<tr><td>D-1 08:00</td><td>发电商提交日前报价（量价曲线）</td></tr>
<tr><td>D-1 10:00</td><td>日前市场截单</td></tr>
<tr><td>D-1 11:00</td><td>交易中心出清，发布次日 24 时段电价与机组计划</td></tr>
<tr><td>D 日 实时</td><td>实际调度，AGC 自动调整，偏差进入实时市场</td></tr>
<tr><td>D+5 日</td><td>结算发布</td></tr>
</table>

<h3>3.3 结算瀑布（重要！）</h3>
<p>最终某发电商的结算 = 中长期合约结算 + 日前市场结算 + 实时偏差结算 + 辅助服务结算</p>
<p><strong>理解关键：</strong>中长期合约"对冲"了现货波动，但<strong>不消除电量物理交付</strong>。物理电量必须在现货市场执行，合约只是财务结算。</p>

<div class="ex-box"><h4>✏️ Day 3 任务</h4>
<p>写一份 300 字的《市场时间轴说明》，向一个完全不懂电力的朋友解释："为什么电力要有这么多市场层？"</p></div>`,
  },
  {
    id: "p90-d4", day: 4, week: 1, track: "power90",
    title: "新能源如何参与市场：保障性收购到市场化",
    description: "新能源（风电/光伏）参与市场的演进路径，偏差考核，收益结构",
    objectives: [
      "理解新能源参与市场的三阶段（保障性→市场化→绿色电力交易）",
      "算清一个风电场的月度收益拆解",
      "理解新能源靠天吃饭带来的预测挑战",
    ],
    duration: 60,
    cues: [
      "新能源为什么早期享受「保障性收购」？现在为什么转向市场化？",
      "新能源出力预测不准会被偏差考核罚多少？",
      "风电场月度收益的三个组成：电量收入+补贴+偏差罚扣",
      "做一次新能源场站的收益算例",
    ],
    content: `<h3>4.1 新能源参与市场的三阶段</h3>
<table>
<tr><th>阶段</th><th>机制</th><th>风险承担方</th></tr>
<tr><td>① 保障性收购（早期）</td><td>政府定价，电网统购</td><td>电网（实际是全体用户分摊）</td></tr>
<tr><td>② 市场化交易（过渡期）</td><td>部分电量参与市场，部分仍保障</td><td>新能源+电网共担</td></tr>
<tr><td>③ 平价上网+绿电交易（未来）</td><td>完全市场定价，绿色属性单独卖</td><td>新能源企业自身</td></tr>
</table>

<h3>4.2 偏差考核：新能源最痛的环节</h3>
<p>新能源出力靠天吃饭，预测必然不准。出力 ≠ 合约量 → 偏差。</p>
<table>
<tr><th>偏差方向</th><th>典型规则</th><th>后果</th></tr>
<tr><td>实际 > 合约（多发了）</td><td>多出部分按现货低价卖</td><td>低价卖，可能亏本</td></tr>
<tr><td>实际 < 合约（少发了）</td><td>缺额按现货高价买回</td><td>高价买回，可能亏本</td></tr>
</table>
<div class="pit-box「><h4>⚠️ 这就是为什么」出力预测」对新能源企业生死攸关</h4>
<p>预测准 → 合约量接近实际 → 不被偏差考核罚<br>预测差 20% → 偏差考核可能吞掉全部利润</p>
<p>这也是 AI 在电力市场<strong>最早商业化</strong>的方向——风电/光伏功率预测。</p></div>

<h3>4.3 算例：某风电场月度收益</h3>
<p>假设条件：</p>
<ul>
<li>装机 100MW，月度合约量 30,000 MWh，合约价 350 元/MWh</li>
<li>实际发电 26,000 MWh（少了 4,000 MWh）</li>
<li>现货均价 400 元/MWh</li>
<li>偏差罚则：少发按现货价 × 1.1 买回</li>
</ul>
<p>收益拆解：</p>
<table>
<tr><th>项目</th><th>计算</th><th>金额</th></tr>
<tr><td>合约收入</td><td>30,000 × 350</td><td>10,500,000</td></tr>
<tr><td>少发买回（罚）</td><td>-4,000 × 400 × 1.1</td><td>-1,760,000</td></tr>
<tr><td>实际结算电量收入</td><td>26,000 × 350（已含在合约中）</td><td>—</td></tr>
<tr><td><strong>净收入</strong></td><td></td><td><strong>8,740,000</strong></td></tr>
</table>
<p>→ 如果预测准确、实际正好等于合约，本可收入 1,050 万。偏差让收益蒸发 17%。</p>

<div class="ex-box"><h4>✏️ Day 4 算例</h4>
<p>同上风电场，但实际发电 <strong>34,000 MWh</strong>（多发了 4,000），多出部分按现货价 × 0.9 卖。算净收入，和上面的"少发"案例对比。</p></div>`,
  },
  {
    id: "p90-d5", day: 5, week: 1, track: "power90",
    title: "AI 速览（够用即可）：监督/序列/RL 三大类",
    description: "建立AI能力地图，能口述三类模型适用场景，不深挖数学",
    objectives: [
      "区分监督学习/序列模型/强化学习的适用场景",
      "理解 LSTM/Transformer 为何适合时序",
      "知道 RL 是什么，不实现",
    ],
    duration: 60,
    cues: [
      "监督学习/无监督学习/强化学习各自解决什么问题？",
      "为什么 LSTM 适合电价预测？它的「记忆」机制是什么？",
      "Transformer 的 Attention 在时序里起什么作用？",
      "RL（Q-learning/Policy Gradient）为什么对电力竞价有吸引力？",
    ],
    content: `<h3>5.1 AI 三大类（电力视角）</h3>
<table>
<tr><th>类别</th><th>核心思想</th><th>电力应用</th><th>本章定位</th></tr>
<tr><td>监督学习</td><td>学 X→y 映射</td><td>电价预测、负荷预测、故障诊断</td><td><strong>主线</strong></td></tr>
<tr><td>序列模型</td><td>建模时间依赖</td><td>多步电价预测、新能源出力</td><td><strong>主线</strong></td></tr>
<tr><td>强化学习</td><td>学决策策略</td><td>竞价策略、储能调度</td><td>了解级</td></tr>
</table>

<h3>5.2 监督学习三剑客</h3>
<table>
<tr><th>模型</th><th>适用</th><th>优点</th><th>缺点</th></tr>
<tr><td>线性回归</td><td>baseline</td><td>快、可解释</td><td>表达能力弱</td></tr>
<tr><td>树模型（XGBoost/LightGBM）</td><td>表格特征</td><td>强、快、特征重要性</td><td>不擅长时序</td></tr>
<tr><td>神经网络（MLP）</td><td>复杂非线性</td><td>表达力强</td><td>需大量数据</td></tr>
</table>

<h3>5.3 序列模型：LSTM 和 Transformer</h3>
<p><strong>LSTM（长短期记忆网络）</strong>：通过"门"机制决定哪些历史信息该记、该忘。</p>
<pre><code>记忆单元 C_t = f_t * C_{t-1} + i_t * C̃_t
遗忘门 f_t, 输入门 i_t, 输出门 o_t
</code></pre>
<p><strong>Transformer + Self-Attention</strong>：不像 LSTM 顺序处理，而是让每个时刻"看到"所有历史时刻，自动加权。</p>
<p>电力时序中：Transformer 在长序列（>100 步）表现常优于 LSTM，但训练成本更高。</p>

<h3>5.4 强化学习（RL）速览</h3>
<p><span class="key-pt「>RL 思想：通过试错，学一个」在状态 s 下选动作 a」的策略 π(s)，使累计奖励最大。</span></p>
<table>
<tr><th>概念</th><th>电力竞价类比</th></tr>
<tr><td>状态 s</td><td>当前市场价、自身剩余合约量</td></tr>
<tr><td>动作 a</td><td>报多少量、什么价</td></tr>
<tr><td>奖励 r</td><td>结算利润</td></tr>
<tr><td>策略 π</td><td>"什么情况下报什么价"的决策表</td></tr>
</table>
<div class="pit-box"><h4>⚠️ 为什么 RL 在电力竞价很难</h4>
<ul>
<li>reward 设计极难（短期利润 vs 长期声誉）</li>
<li>对手在变，非平稳环境</li>
<li>试错成本高（真实报价错一次亏百万）</li>
</ul>
<p><strong>本课程把 RL 定位为"探索项"</strong>，主线用确定性优化（数学规划）。详见方案第六节风险表。</p></div>

<div class="ex-box"><h4>✏️ Day 5 自检</h4>
<p>用 100 字口述三类模型在电力市场的适用场景——如果你能讲清楚，就过关了。</p></div>`,
  },
  {
    id: "p90-d6", day: 6, week: 1, track: "power90",
    title: "回顾 + 第一周自检",
    description: "市场结构、出清、LMP、偏差结算、AI 地图——做一次综合复习",
    objectives: [
      "完成第一周自检清单（3 个问题）",
      "画一张综合图：四层市场 × AI 三大类的对应关系",
    ],
    duration: 45,
    cues: [
      "本周我交付了什么可运行的东西？",
      "市场结构 + 出清 + LMP + 偏差，能不能一气讲下来？",
      "AI 三大类和电力市场四个应用方向如何对应？",
    ],
    content: `<h3>6.1 每周自检清单（来自方案第七节）</h3>
<p>每周日花 30 分钟回答三个问题：</p>
<ol>
<li><strong>本周交付了什么可运行的东西？</strong>（不是"学了什么「，是」做出来了什么」）</li>
<li><strong>是否偏离主攻方向？</strong> 如果在做 RL 而电价预测 baseline 还没跑通，立即纠偏</li>
<li><strong>下周的目标是什么？</strong> 必须是具体的、可交付的</li>
</ol>

<h3>6.2 第一周综合图：四层市场 × AI 三大类</h3>
<table>
<tr><th>市场层</th><th>监督学习</th><th>序列模型</th><th>强化学习</th></tr>
<tr><td>中长期</td><td>负荷年度预测</td><td>长周期趋势</td><td>合约组合优化</td></tr>
<tr><td>日前</td><td><strong>日前电价预测（主攻）</strong></td><td>多时段联合预测</td><td>竞价策略</td></tr>
<tr><td>实时</td><td>超短期电价</td><td>波动建模</td><td>储能调度</td></tr>
<tr><td>辅助服务</td><td>调频需求预测</td><td>备用容量预测</td><td>调频策略</td></tr>
</table>
<p>→ 整个 90 天的主攻点就是"日前 × 监督/序列"。</p>

<div class="ex-box"><h4>✏️ Day 6 自检</h4>
<ol>
<li>画一张上面这样的"市场 × AI"矩阵</li>
<li>回答三个自检问题，把答案写在底部总结框</li>
<li>为下周（D7-D10）写下 3 个具体可交付目标</li>
</ol></div>`,
  },
  {
    id: "p90-d7", day: 7, week: 1, track: "power90",
    title: "整理与休整：补漏 + 看一节 PJM 实际数据",
    description: "复盘本周薄弱环节，提前看一眼真实电价数据建立感性认识",
    objectives: [
      "补齐本周还没理解的概念",
      "提前下载 PJM 数据看一眼（不深入分析）",
      "为下周数据基线建设做准备",
    ],
    duration: 60,
    cues: [
      "哪个概念这周还没消化？再翻一次",
      "PJM 是什么机构？数据长什么样？",
      "下周要开始正式的数据基线，环境准备好了吗？",
    ],
    content: `<h3>7.1 补漏清单</h3>
<p>对照 Day 1-6 的 objectives，把没达标的勾出来，重点补：</p>
<ul>
<li>LMP 三要素能不能口头讲清？</li>
<li>3 机组出清算例能不能 5 分钟内手算完？</li>
<li>偏差结算方向（多发 vs 少发）有没有混淆？</li>
</ul>

<h3>7.2 提前认识 PJM</h3>
<p>PJM Interconnection 是美国最大的区域输电组织（RTO），覆盖 13 个州 + DC，服务 6500 万用户。</p>
<p>数据地址：<a href="https://dataminer2.pjm.com/list「 target=」_blank」>dataminer2.pjm.com/list</a>（需注册免费账号）</p>
<p>关键数据集：<strong>Locational Marginal Pricing (LMP)</strong>——节点边际电价，每 5 分钟一个值。</p>

<h3>7.3 环境准备</h3>
<pre><code># Python 3.10+
pip install pandas numpy matplotlib plotly scikit-learn jupyter
</code></pre>
<p>下周要装 <code>pyomo</code> 和申请 <code>gurobi</code> 学术 license，提前准备好。</p>

<div class="ex-box"><h4>✏️ Day 7 任务</h4>
<ol>
<li>完成 PJM 账号注册</li>
<li>在 Jupyter 里跑通 <code>import pandas as pd; print('OK')</code></li>
<li>把本周的学习心得写在底部总结框</li>
</ol></div>`,
  },

  // ════════════════════════════════════════════════
  // 阶段二 · D11-D30 · 工具链 + 数据基线
  // ════════════════════════════════════════════════
  {
    id: "p90-d8", day: 8, week: 2, track: "power90",
    title: "Pandas 速成：清洗一年电价数据",
    description: "Pandas 五大核心操作，应用到电价时序数据清洗",
    objectives: [
      "掌握 pandas 读写/筛选/分组/时序操作",
      "能加载 PJM 一年 LMP 数据并清洗",
      "理解 resample / shift / rolling 三个时序杀手锏",
    ],
    duration: 90,
    cues: [
      "DataFrame 和 Excel 的区别？",
      "resample('H')/shift(1)/rolling(24) 分别干什么？",
      "电价数据常见的脏数据：缺失/重复/异常尖峰",
      "用 pandas 加载 PJM 一年数据并出统计表",
    ],
    content: `<h3>8.1 Pandas = 代码版 Excel</h3>
<p>百万行不卡、操作可复现、无缝对接模型。</p>

<h3>8.2 五大核心操作（电价数据视角）</h3>
<pre><code>import pandas as pd

# ① 读取
df = pd.read_csv('lmp_2024.csv', parse_dates=['datetime'])

# ② 检查
df.info()        # 类型+缺失
df.describe()    # 均值/分位/极值
df.head(); df.tail()

# ③ 清洗
df = df.drop_duplicates()
df = df.set_index('datetime').sort_index()
df['lmp'] = df['lmp'].clip(lower=0)  # 负价截断（按需）

# ④ 时序三大杀手锏
hourly = df['lmp'].resample('H').mean()       # 重采样到小时
df['lag_24'] = df['lmp'].shift(24)            # 24小时前的值
df['ma_24'] = df['lmp'].rolling(24).mean()    # 24小时滚动均值

# ⑤ 分组聚合
df['hour'] = df.index.hour
hourly_pattern = df.groupby('hour')['lmp'].mean()  # 一天的平均模式
</code></pre>

<h3>8.3 电价数据的"三大脏"</h3>
<table>
<tr><th>脏类型</th><th>识别</th><th>处理</th></tr>
<tr><td>缺失（检修/通讯故障）</td><td>df.isnull().sum()</td><td>前向填充或插值</td></tr>
<tr><td>重复（同时间戳多条）</td><td>df.index.duplicated().sum()</td><td>保留最后一条</td></tr>
<tr><td>异常尖峰（价格突涨10倍）</td><td>describe() 看 max/99 分位</td><td>clip 或 log 变换</td></tr>
</table>

<div class="ex-box"><h4>✏️ Day 8 必做</h4>
<ol>
<li>下载 PJM 某节点 1 年 LMP 数据</li>
<li>用 pandas 加载，完成上述清洗步骤</li>
<li>输出 <code>describe()</code>，把均值/标准差/最大值/分位数贴到总结框</li>
</ol></div>`,
  },
  {
    id: "p90-d9", day: 9, week: 2, track: "power90",
    title: "NumPy + 可视化：电价时序图",
    description: "NumPy 向量化，Plotly 画多尺度电价图（不用 Matplotlib 默认样式）",
    objectives: [
      "掌握 NumPy 向量化运算",
      "用 Plotly 画日/周/月多尺度电价图",
      "标注尖峰日，识别极端价格事件",
    ],
    duration: 90,
    cues: [
      "为什么不用 Matplotlib 默认样式？Plotly 强在哪？",
      "向量化运算 vs for 循环，速度差多少？",
      "如何标注尖峰日（spike day）？",
      "画出全年电价的「日内-周内-季节」三种模式",
    ],
    content: `<h3>9.1 NumPy 向量化（提速 100x）</h3>
<pre><code>import numpy as np

# 反例：for 循环
prices = df['lmp'].values
result = []
for p in prices:
    result.append(p ** 0.5 if p > 0 else 0)

# 正例：向量化
result = np.where(prices > 0, np.sqrt(prices), 0)
</code></pre>

<h3>9.2 Plotly 多尺度电价图</h3>
<pre><code>import plotly.graph_objects as go
from plotly.subplots import make_subplots

fig = make_subplots(rows=3, cols=1, shared_xaxes=False,
                    subplot_titles=('全年', '一周典型', '一天典型'))

# 全年：日均价
fig.add_trace(go.Scatter(x=daily.index, y=daily.values, mode='lines', name='日均'), row=1, col=1)

# 一周：168 小时
week_data = df.loc['2024-03-01':'2024-03-07']
fig.add_trace(go.Scatter(x=week_data.index, y=week_data['lmp'], name='一周'), row=2, col=1)

# 一天：24 小时均值
fig.add_trace(go.Bar(x=hourly_pattern.index, y=hourly_pattern.values, name='日内模式'), row=3, col=1)

fig.update_layout(height=800, title_text='PJM 电价多尺度分析')
fig.show()
</code></pre>

<h3>9.3 标注尖峰日</h3>
<pre><code># 找出价格 > 99 分位的时段
threshold = df['lmp'].quantile(0.99)
spikes = df[df['lmp'] > threshold]

fig.add_trace(go.Scatter(
    x=spikes.index, y=spikes['lmp'],
    mode='markers', marker=dict(size=8, color='red'),
    name='尖峰'
), row=1, col=1)
</code></pre>

<div class="ex-box"><h4>✏️ Day 9 必做</h4>
<ol>
<li>用 Plotly 画三行子图：全年/一周/一天</li>
<li>标注尖峰日（> 99 分位）</li>
<li>在图上找出：电价最高的一天是几月几号？是什么季节？</li>
</ol></div>`,
  },
  {
    id: "p90-d10", day: 10, week: 2, track: "power90",
    title: "AI 速览实操 + 阶段二启动准备",
    description: "用线性回归做 naive 电价预测 baseline，启动阶段二工具链",
    objectives: [
      "完成第一个电价预测 baseline（线性回归）",
      "装好 Pyomo + Gurobi 学术 license",
      "为 D11 数据基线做最后准备",
    ],
    duration: 120,
    cues: [
      "baseline 模型用什么特征？MAE/RMSE/MAPE 怎么算？",
      "为什么 baseline 是后续所有模型的对比基准？",
      "Gurobi 学术 license 怎么申请？",
      "把 baseline_notebook.ipynb 提交到 Git",
    ],
    content: `<h3>10.1 你的第一个电价预测 baseline</h3>
<pre><code>import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, mean_squared_error
import numpy as np

df = pd.read_csv('lmp_2024.csv', parse_dates=['datetime']).set_index('datetime').sort_index()

# 特征工程
df['hour'] = df.index.hour
df['dow'] = df.index.dayofweek
df['month'] = df.index.month
df['lag_24'] = df['lmp'].shift(24)
df = df.dropna()

X = pd.get_dummies(df[['hour', 'dow', 'month', 'lag_24']], columns=['hour', 'dow', 'month'])
y = df['lmp']

# 训练-测试切分（最后 30 天做测试）
split = df.index[-30*24]
X_tr, X_te = X[:split], X[split:]
y_tr, y_te = y[:split], y[split:]

model = LinearRegression().fit(X_tr, y_tr)
y_pred = model.predict(X_te)

mae = mean_absolute_error(y_te, y_pred)
rmse = np.sqrt(mean_squared_error(y_te, y_pred))
mape = (np.abs(y_te - y_pred) / y_te).mean() * 100

print(f'MAE: {mae:.2f}, RMSE: {rmse:.2f}, MAPE: {mape:.2f}%')
</code></pre>

<div class="ex-box"><h4>✏️ Day 10 必做</h4>
<ol>
<li>把 baseline 跑通，记录 MAE/RMSE/MAPE</li>
<li>申请 Gurobi 学术 license（<a href="https://www.gurobi.com/academia/「 target=」_blank」>gurobi.com/academia</a>）</li>
<li>把 baseline_model.ipynb 提交到 Git</li>
</ol></div>

<div class="bk-box"><h4>📖 关键里程碑</h4>
<p>阶段一结束！你已完成：<br>
✅ 市场结构图<br>
✅ 电价数据集<br>
✅ baseline 预测模型</p>
<p>这是整个 90 天最重要的"<strong>三个一</strong>"。</p></div>`,
  },
  {
    id: "p90-d11", day: 11, week: 2, track: "power90",
    title: "🚀 数据基线 Day：PJM + ERA5 全部到位",
    description: "关键日！把所有练习用的数据集准备好，建立数据基线",
    objectives: [
      "PJM 2-3 年 LMP 数据完整下载",
      "ERA5 气象数据获取（如可能）",
      "数据集目录结构规范化",
    ],
    duration: 120,
    cues: [
      "为什么数据从 D11 启动，不是 D71？",
      "PJM 数据下载到哪个目录？文件命名规范？",
      "ERA5 气象数据怎么和电价对齐？",
      "data/ 目录就位，画出文件结构树",
    ],
    content: `<div class="pit-box"><h4>⚠️ 关键改动：数据从 D11 启动</h4>
<p><strong>原方案把数据放在 D71，会导致实战阶段完全没时间迭代。</strong>从 D11 开始，所有练习围绕同一份数据展开——这是成功率从 30% 提到 75% 的最关键改动。</p></div>

<h3>11.1 数据目录结构（规范！）</h3>
<pre><code>data/
├── raw/                    # 原始数据，不动
│   ├── pjm_lmp_2022.csv
│   ├── pjm_lmp_2023.csv
│   ├── pjm_lmp_2024.csv
│   └── era5_weather.nc
├── interim/                # 中间处理
│   └── pjm_lmp_merged.parquet
├── processed/              # 模型输入
│   ├── train.parquet
│   └── test.parquet
└── external/               # 外部参考（节假日/事件）
    └── holidays.csv
</code></pre>

<h3>11.2 PJM 数据下载</h3>
<ol>
<li>登录 <a href="https://dataminer2.pjm.com/list「 target=」_blank」>dataminer2.pjm.com</a></li>
<li>选择 <strong>Locational Marginal Pricing</strong> 数据集</li>
<li>选一个节点（建议先选一个代表节点，如某大型变电站）</li>
<li>时间范围：2022-01-01 至 2024-12-31（3 年）</li>
<li>下载 CSV</li>
</ol>

<h3>11.3 ERA5 气象数据（可选，建议有）</h3>
<p>地址：<a href="https://cds.climate.copernicus.eu/「 target=」_blank」>cds.climate.copernicus.eu</a>（需注册 Copernicus 账号）</p>
<p>关键变量：</p>
<ul>
<li>2m 温度（影响负荷）</li>
<li>10m 风速（影响风电出力）</li>
<li>表面太阳辐射（影响光伏）</li>
</ul>
<div class="pit-box"><h4>⚠️ 风险预案</h4>
<p>如果 ERA5 申请/下载耗时太久（D15 还没好），<strong>果断砍掉气象</strong>，只用电价 + 时间特征。这是方案第六节明确写的"数据清洗耗太久"风险应对。</p></div>

<div class="ex-box"><h4>✏️ Day 11 必做</h4>
<ol>
<li>data/raw/ 至少有 PJM 一年 CSV</li>
<li>用 pandas 加载，跑通 Day 8-9 的清洗和可视化</li>
<li>（可选）提交 ERA5 申请</li>
</ol></div>`,
  },
  {
    id: "p90-d12", day: 12, week: 2, track: "power90",
    title: "Scikit-learn 速成 + 特征工程实战",
    description: "sklearn 训练流程，为电价预测构造 15+ 特征",
    objectives: [
      "掌握 sklearn 的 fit/predict/score 范式",
      "为电价数据构造 15+ 特征（时间/滞后/滚动/统计）",
      "理解特征重要性评估",
    ],
    duration: 90,
    cues: [
      "特征工程为什么是 ML 的「80%工作」？",
      "时间特征、滞后特征、滚动特征、统计特征分别是什么？",
      "如何用随机森林评估特征重要性？",
      "构造 15+ 特征的 DataFrame",
    ],
    content: `<h3>12.1 sklearn 三步范式</h3>
<pre><code>from sklearn.ensemble import RandomForestRegressor
model = RandomForestRegressor(n_estimators=100)
model.fit(X_train, y_train)        # ① 训练
y_pred = model.predict(X_test)     # ② 预测
model.score(X_test, y_test)        # ③ 评估（R²）
</code></pre>

<h3>12.2 电价特征工程（15+ 特征）</h3>
<table>
<tr><th>类别</th><th>特征</th><th>代码</th></tr>
<tr><td rowspan="4">时间</td><td>小时</td><td>df.index.hour</td></tr>
<tr><td>星期几</td><td>df.index.dayofweek</td></tr>
<tr><td>月份</td><td>df.index.month</td></tr>
<tr><td>是否周末</td><td>df.index.dayofweek >= 5</td></tr>
<tr><td rowspan="5">滞后</td><td>前1小时</td><td>shift(1)</td></tr>
<tr><td>前24小时（昨天同时段）</td><td>shift(24)</td></tr>
<tr><td>前168小时（上周同时段）</td><td>shift(168)</td></tr>
<tr><td>前24小时均值</td><td>shift(24).rolling(24).mean()</td></tr>
<tr><td>前24小时标准差</td><td>shift(24).rolling(24).std()</td></tr>
<tr><td rowspan="4">滚动</td><td>24小时滚动均值</td><td>rolling(24).mean()</td></tr>
<tr><td>24小时滚动最大</td><td>rolling(24).max()</td></tr>
<tr><td>7天滚动均值</td><td>rolling(168).mean()</td></tr>
<tr><td>7天滚动最大</td><td>rolling(168).max()</td></tr>
<tr><td rowspan="3">统计</td><td>同小时历史均值</td><td>groupby(hour).transform('mean')</td></tr>
<tr><td>同小时历史标准差</td><td>groupby(hour).transform('std')</td></tr>
<tr><td>价格分位（当前价格在过去30天的位置）</td><td>rolling(720).rank(pct=True)</td></tr>
</table>

<h3>12.3 特征重要性</h3>
<pre><code>rf = RandomForestRegressor().fit(X, y)
importances = pd.Series(rf.feature_importances_, index=X.columns).sort_values(ascending=False)
print(importances.head(10))
</code></pre>

<div class="ex-box"><h4>✏️ Day 12 必做</h4>
<ol>
<li>构造 15+ 特征的 DataFrame</li>
<li>训练随机森林，打印特征重要性 Top 10</li>
<li>思考：哪些特征对你来说"意外地重要/不重要"？</li>
</ol></div>`,
  },
  {
    id: "p90-d13", day: 13, week: 2, track: "power90",
    title: "时序数据切分：不要犯「信息泄漏」错误",
    description: "时序数据的正确切分方法，避免前视偏差（look-ahead bias）",
    objectives: [
      "理解时序切分和随机切分的区别",
      "会用 TimeSeriesSplit",
      "识别三类常见的信息泄漏",
    ],
    duration: 75,
    cues: [
      "为什么不能用 train_test_split(shuffle=True)？",
      "TimeSeriesSplit 怎么用？",
      "归一化（fit_transform）的顺序为什么重要？",
      "前视偏差（look-ahead bias）的三个典型陷阱",
    ],
    content: `<h3>13.1 时序切分 vs 随机切分</h3>
<div class="pit-box"><h4>⚠️ 新手最大错误</h4>
<p>用 <code>train_test_split(shuffle=True)</code> 切时序数据 → 测试集里混入了"未来"的信息，模型看起来表现好，实则完全不可用。</p></div>
<pre><code>from sklearn.model_selection import TimeSeriesSplit

tscv = TimeSeriesSplit(n_splits=5)
for train_idx, test_idx in tscv.split(X):
    X_tr, X_te = X.iloc[train_idx], X.iloc[test_idx]
    # 训练 → 评估
</code></pre>

<h3>13.2 三类信息泄漏</h3>
<table>
<tr><th>泄漏类型</th><th>表现</th><th>修正</th></tr>
<tr><td>切分泄漏</td><td>随机切分，测试集混入未来</td><td>用 TimeSeriesSplit，时间严格后移</td></tr>
<tr><td>归一化泄漏</td><td>用全量数据 fit_transform</td><td>只在训练集 fit，测试集 transform</td></tr>
<tr><td>特征泄漏</td><td>用了"事后才能算出"的特征</td><td>所有特征都用 shift 防泄漏</td></tr>
</table>

<h3>13.3 归一化正确写法</h3>
<pre><code>from sklearn.preprocessing import StandardScaler
scaler = StandardScaler()
X_tr_scaled = scaler.fit_transform(X_tr)     # 只在训练集 fit
X_te_scaled = scaler.transform(X_te)         # 测试集只 transform
</code></pre>

<div class="ex-box"><h4>✏️ Day 13 必做</h4>
<ol>
<li>把 Day 10 baseline 改用 TimeSeriesSplit 重新评估</li>
<li>对比 shuffle 切分 vs 时序切分的 MAPE，差距有多大？</li>
</ol></div>`,
  },
  {
    id: "p90-d14", day: 14, week: 2, track: "power90",
    title: "第二周自检 + 树模型升级",
    description: "用 XGBoost 升级 baseline，完成第二周自检",
    objectives: [
      "用 XGBoost 训练电价预测模型",
      "对比 XGBoost vs 线性回归 baseline",
      "完成第二周自检清单",
    ],
    duration: 90,
    cues: [
      "XGBoost 为什么在表格数据上常优于深度学习？",
      "XGBoost 的关键超参数：n_estimators / max_depth / learning_rate",
      "本周交付了什么可运行的东西？",
      "下周要进入 LSTM，环境准备好了吗？",
    ],
    content: `<h3>14.1 XGBoost 升级</h3>
<pre><code>from xgboost import XGBRegressor
from sklearn.metrics import mean_absolute_error

xgb = XGBRegressor(
    n_estimators=500,
    max_depth=6,
    learning_rate=0.05,
    n_jobs=-1
)
xgb.fit(X_tr, y_tr, eval_set=[(X_te, y_te)], early_stopping_rounds=20, verbose=False)
y_pred = xgb.predict(X_te)
mae = mean_absolute_error(y_te, y_pred)
</code></pre>

<h3>14.2 对比表（务必记录）</h3>
<table>
<tr><th>模型</th><th>MAE</th><th>RMSE</th><th>MAPE</th><th>训练时间</th></tr>
<tr><td>线性回归（baseline）</td><td>?</td><td>?</td><td>?</td><td>< 1s</td></tr>
<tr><td>随机森林</td><td>?</td><td>?</td><td>?</td><td>?</td></tr>
<tr><td>XGBoost</td><td>?</td><td>?</td><td>?</td><td>?</td></tr>
</table>
<div class="pit-box"><h4>⚠️ 风险预案</h4>
<p>方案第六节明确：<strong>"电价预测模型效果差「的应对是——先用 XGBoost，不上 LSTM。</strong>树模型常优于 LSTM，不要为了」看起来高级」硬上深度学习。</p></div>

<h3>14.3 第二周自检</h3>
<ol>
<li>本周交付了什么可运行的东西？（baseline + XGBoost）</li>
<li>是否偏离主攻方向？（电价预测是核心）</li>
<li>下周目标：跑通 LSTM demo（D15-21）</li>
</ol>

<div class="ex-box"><h4>✏️ Day 14 必做</h4>
<ol>
<li>训练 XGBoost，对比三种模型的 MAE/RMSE/MAPE</li>
<li>把对比表贴到总结框</li>
<li>提交 Git</li>
</ol></div>`,
  },

  // ════════════════════════════════════════════════
  // 阶段二后半 · D15-D30 · 深度学习框架 + 优化建模
  // ════════════════════════════════════════════════
  {
    id: "p90-d15", day: 15, week: 3, track: "power90",
    title: "PyTorch 速成：Tensor + autograd + 第一个神经网络",
    description: "PyTorch 基础三件套，搭建第一个 MLP 做电价回归",
    objectives: [
      "掌握 PyTorch Tensor 操作和 autograd",
      "搭建一个 3 层 MLP",
      "在电价数据上跑通 PyTorch 训练循环",
    ],
    duration: 120,
    cues: [
      "Tensor 和 NumPy ndarray 的关系？",
      "autograd 是什么？为什么是深度学习的核心？",
      "训练循环的 5 个标准步骤？",
      "PyTorch vs TensorFlow：为什么学术界主流是 PyTorch？",
    ],
    content: `<h3>15.1 PyTorch 三件套</h3>
<pre><code>import torch
import torch.nn as nn

# ① Tensor（类似 ndarray，但能跑 GPU）
x = torch.randn(100, 10)  # 100 样本 × 10 特征

# ② autograd（自动求导）
w = torch.randn(10, 1, requires_grad=True)
y = (x @ w).sum()
y.backward()  # 自动算 ∂y/∂w
print(w.grad)

# ③ nn.Module（神经网络层）
class MLP(nn.Module):
    def __init__(self):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(10, 64), nn.ReLU(),
            nn.Linear(64, 32), nn.ReLU(),
            nn.Linear(32, 1)
        )
    def forward(self, x):
        return self.net(x)
</code></pre>

<h3>15.2 训练循环五步</h3>
<pre><code>model = MLP()
opt = torch.optim.Adam(model.parameters(), lr=1e-3)
loss_fn = nn.MSELoss()

for epoch in range(100):
    # ① 前向
    pred = model(X_train_t)
    # ② 算 loss
    loss = loss_fn(pred, y_train_t)
    # ③ 梯度清零
    opt.zero_grad()
    # ④ 反向求导
    loss.backward()
    # ⑤ 更新参数
    opt.step()
</code></pre>

<div class="ex-box"><h4>✏️ Day 15 必做</h4>
<ol>
<li>把 Day 12 的 15+ 特征数据集改写成 PyTorch Tensor</li>
<li>训练 MLP，对比 sklearn MLPRegressor</li>
</ol></div>`,
  },
  {
    id: "p90-d16", day: 16, week: 3, track: "power90",
    title: "LSTM 入门：第一个时序模型",
    description: "LSTM 原理与 PyTorch 实现，电价时序数据 reshape",
    objectives: [
      "理解 LSTM 门控机制（输入门/遗忘门/输出门）",
      "掌握时序数据的滑窗 reshape",
      "训练一个 LSTM 电价预测模型",
    ],
    duration: 120,
    cues: [
      "时序数据为什么要滑窗 reshape？shape 是 (N, T, F)？",
      "LSTM 的「记忆单元」C_t 在干什么？",
      "为什么 LSTM 比 MLP 更适合时序？",
      "LSTM 在电价预测上的典型表现：训练慢、容易过拟合",
    ],
    content: `<h3>16.1 滑窗 reshape（关键！）</h3>
<pre><code>import numpy as np

def make_sequences(df, target_col, seq_len=24, horizon=1):
    X, y = [], []
    arr = df.values
    target_idx = list(df.columns).index(target_col)
    for i in range(len(arr) - seq_len - horizon):
        X.append(arr[i:i+seq_len])
        y.append(arr[i+seq_len+horizon-1, target_idx])
    return np.array(X), np.array(y)  # (N, T, F), (N,)

X_seq, y_seq = make_sequences(df_features, 'lmp', seq_len=24)
print(X_seq.shape)  # 比如 (8000, 24, 15)
</code></pre>

<h3>16.2 PyTorch LSTM 模型</h3>
<pre><code>class LSTMPredictor(nn.Module):
    def __init__(self, input_dim, hidden=64, layers=2):
        super().__init__()
        self.lstm = nn.LSTM(input_dim, hidden, layers, batch_first=True, dropout=0.2)
        self.head = nn.Linear(hidden, 1)
    def forward(self, x):
        out, _ = self.lstm(x)
        return self.head(out[:, -1, :])  # 取最后时刻
</code></pre>

<div class="pit-box"><h4>⚠️ LSTM 常见坑</h4>
<ul>
<li><strong>过拟合：</strong>Dropout 必加，hidden_dim 不要超过 128</li>
<li><strong>训练慢：</strong>batch_size 设 64-256，用 GPU</li>
<li><strong>归一化：</strong>LSTM 对输入 scale 极敏感，必须 StandardScaler</li>
</ul></div>

<div class="ex-box"><h4>✏️ Day 16 必做</h4>
<ol>
<li>滑窗 reshape 后 shape 检查</li>
<li>训练 LSTM，对比 XGBoost（很可能 XGBoost 仍更好，记录原因）</li>
</ol></div>`,
  },
  {
    id: "p90-d17", day: 17, week: 3, track: "power90",
    title: "Transformer 入门：Self-Attention 在时序的应用",
    description: "理解 Self-Attention 机制，搭建一个简单 Transformer 电价模型",
    objectives: [
      "理解 Self-Attention 的 Q/K/V",
      "知道 Positional Encoding 为何必要",
      "搭建一个简化版 Transformer 做电价预测",
    ],
    duration: 120,
    cues: [
      "Self-Attention 的 Q/K/V 各自什么角色？",
      "为什么 Transformer 在时序里也要 Positional Encoding？",
      "Transformer vs LSTM：长序列上谁更优？",
      "在电价数据上 Transformer 的实际表现",
    ],
    content: `<h3>17.1 Self-Attention 一句话</h3>
<p><span class="key-pt「>每个时刻」看到」所有其他时刻，自动算出」该关注哪些时刻」。</span></p>
<p>公式：Attention(Q, K, V) = softmax(QK^T / √d) · V</p>
<ul>
<li><strong>Q（Query）：</strong>"我在找什么"</li>
<li><strong>K（Key）：</strong>"我能提供什么"</li>
<li><strong>V（Value）：</strong>"我实际的内容"</li>
</ul>

<h3>17.2 简化版 Transformer（仅 Encoder）</h3>
<pre><code>class TransformerPredictor(nn.Module):
    def __init__(self, feat_dim, d_model=64, nhead=4, layers=2):
        super().__init__()
        self.proj_in = nn.Linear(feat_dim, d_model)
        self.pos_enc = PositionalEncoding(d_model)
        encoder_layer = nn.TransformerEncoderLayer(d_model, nhead, batch_first=True)
        self.encoder = nn.TransformerEncoder(encoder_layer, layers)
        self.head = nn.Linear(d_model, 1)
    def forward(self, x):
        x = self.proj_in(x)
        x = self.pos_enc(x)
        x = self.encoder(x)
        return self.head(x[:, -1])
</code></pre>

<div class="ex-box"><h4>✏️ Day 17 必做</h4>
<ol>
<li>跑通 Transformer，对比 LSTM</li>
<li>记录三种模型（XGBoost/LSTM/Transformer）的对比表</li>
</ol></div>`,
  },
  {
    id: "p90-d18", day: 18, week: 3, track: "power90",
    title: "多步预测：递归 vs 直接 vs Seq2Seq",
    description: "预测未来 24 小时电价的三种策略",
    objectives: [
      "理解多步预测的递归/直接/Seq2Seq 三种策略",
      "选择适合电价预测的策略",
      "实现 Seq2Seq 多步预测",
    ],
    duration: 90,
    cues: [
      "递归策略（recursive）为什么误差会累积？",
      "直接策略（direct）为什么要训练 24 个模型？",
      "Seq2Seq 的优势在哪？",
      "日前电价预测通常是多步（24 小时），选哪种？",
    ],
    content: `<h3>18.1 三种多步预测策略</h3>
<table>
<tr><th>策略</th><th>原理</th><th>优点</th><th>缺点</th></tr>
<tr><td>递归（Recursive）</td><td>预测 t+1，再用它当输入预测 t+2</td><td>简单</td><td>误差累积</td></tr>
<tr><td>直接（Direct）</td><td>为每个未来时刻训练独立模型</td><td>无累积误差</td><td>训练 24 个模型</td></tr>
<tr><td>Seq2Seq</td><td>编码过去序列 → 解码未来序列</td><td>端到端，最优</td><td>训练复杂</td></tr>
</table>

<h3>18.2 电价预测的实战选择</h3>
<p>日前电价需要预测 24 小时 → 推荐 <strong>Seq2Seq 或 Direct</strong>。</p>
<p>XGBoost 在多步预测中常用 <strong>Direct</strong>（24 个模型并行训练）。</p>

<div class="ex-box"><h4>✏️ Day 18 必做</h4>
<ol>
<li>选一种策略实现 24 小时多步预测</li>
<li>记录 24 小时各自的 MAPE，找出哪个时段预测最难</li>
</ol></div>`,
  },
  {
    id: "p90-d19", day: 19, week: 3, track: "power90",
    title: "概率预测：分位数回归 + Prediction Interval",
    description: "不只预测点值，还预测分布——电价波动性预测的核心",
    objectives: [
      "理解分位数回归",
      "训练一个输出 10/50/90 分位的模型",
      "计算 Prediction Interval 覆盖率",
    ],
    duration: 90,
    cues: [
      "为什么电价预测只给点值不够？",
      "分位数回归 loss 是什么？",
      "Prediction Interval 的覆盖率（coverage）怎么算？",
      "电价尖峰时段，区间应该变宽——模型能学到吗？",
    ],
    content: `<h3>19.1 为什么电价需要概率预测</h3>
<p>电价波动极大，只给点预测（如"明天 14:00 电价 350 元「）远远不够——决策者需要知道」95% 概率落在 280-450 元之间」。</p>

<h3>19.2 分位数回归（用 LightGBM）</h3>
<pre><code>import lightgbm as lgb

# 训练 3 个分位模型
quantiles = [0.1, 0.5, 0.9]
models = {}
for q in quantiles:
    m = lgb.LGBMRegressor(objective='quantile', alpha=q, n_estimators=500)
    m.fit(X_tr, y_tr)
    models[q] = m

# 预测时输出三个值
pred_low = models[0.1].predict(X_te)
pred_mid = models[0.5].predict(X_te)
pred_high = models[0.9].predict(X_te)
</code></pre>

<h3>19.3 覆盖率检查</h3>
<pre><code>coverage = ((y_te >= pred_low) & (y_te <= pred_high)).mean()
print(f'80% 区间实际覆盖率: {coverage:.2%}')
# 理论应接近 80%，过低说明区间太窄
</code></pre>

<div class="ex-box"><h4>✏️ Day 19 必做</h4>
<ol>
<li>训练分位数模型，输出 80% 区间</li>
<li>画出区间图（实际值 + 上下界）</li>
</ol></div>`,
  },
  {
    id: "p90-d20", day: 20, week: 3, track: "power90",
    title: "第三周自检 + 模型大对比",
    description: "完成 5 个模型的全面对比，选出主攻模型",
    objectives: [
      "完成 5 个模型的横向对比",
      "选出进入阶段三的主攻模型",
      "完成第三周自检",
    ],
    duration: 90,
    cues: [
      "5 个模型的 MAPE 分别是多少？",
      "训练时间 vs 精度的权衡，选哪个？",
      "本周交付了什么？下周要做什么？",
    ],
    content: `<h3>20.1 模型大对比表（务必填全）</h3>
<table>
<tr><th>模型</th><th>MAE</th><th>RMSE</th><th>MAPE</th><th>训练时间</th><th>是否概率</th></tr>
<tr><td>线性回归</td><td></td><td></td><td></td><td></td><td>❌</td></tr>
<tr><td>随机森林</td><td></td><td></td><td></td><td></td><td>❌</td></tr>
<tr><td>XGBoost</td><td></td><td></td><td></td><td></td><td>❌</td></tr>
<tr><td>LSTM</td><td></td><td></td><td></td><td></td><td>❌</td></tr>
<tr><td>Transformer</td><td></td><td></td><td></td><td></td><td>❌</td></tr>
<tr><td>LightGBM 分位数</td><td></td><td></td><td></td><td></td><td>✅</td></tr>
</table>

<div class="ex-box"><h4>✏️ Day 20 决策</h4>
<ol>
<li>对比表填全，选出主攻模型（很可能是 XGBoost 或 LightGBM）</li>
<li>把对比表 + 决策理由贴到总结框</li>
</ol></div>`,
  },
  {
    id: "p90-d21", day: 21, week: 3, track: "power90",
    title: "优化建模入门：Pyomo + 一个简单 LP",
    description: "Pyomo 语法，求解一个简单的资源分配 LP",
    objectives: [
      "掌握 Pyomo 建模三件套（变量/约束/目标）",
      "用 GLPK 求解器跑通第一个 LP",
      "为后面 DC-OPF 和竞价优化打基础",
    ],
    duration: 90,
    cues: [
      "LP / MILP / NLP 的区别？",
      "Pyomo 的 ConcreteModel vs AbstractModel？",
      "决策变量、约束、目标函数三件套怎么写？",
      "电价预测 → 竞价优化的衔接逻辑是什么？",
    ],
    content: `<h3>21.1 Pyomo 三件套</h3>
<pre><code>from pyomo.environ import *

model = ConcreteModel()

# ① 决策变量
model.x = Var(within=NonNegativeReals)
model.y = Var(within=NonNegativeReals)

# ② 约束
model.con1 = Constraint(expr=2*model.x + model.y >= 20)
model.con2 = Constraint(expr=model.x + 3*model.y >= 15)

# ③ 目标函数
model.obj = Objective(expr=3*model.x + 5*model.y, sense=minimize)

# 求解
SolverFactory('glpk').solve(model)
print(f'x={model.x()}, y={model.y()}, obj={model.obj()}')
</code></pre>

<div class="ex-box"><h4>✏️ Day 21 必做</h4>
<ol>
<li>pip install pyomo</li>
<li>brew install glpk（macOS）或 apt install glpk-utils</li>
<li>跑通上面的简单 LP</li>
</ol></div>`,
  },
  {
    id: "p90-d22", day: 22, week: 4, track: "power90",
    title: "DC-OPF：3 节点直流最优潮流",
    description: "用 Pyomo 建一个 3 节点 DC-OPF 模型，理解电力市场的物理底座",
    objectives: [
      "理解 DC-OPF（直流最优潮流）的含义",
      "建一个 3 节点 + 2 发电机 + 3 负荷的 OPF",
      "看懂 LMP 从 OPF 中如何导出",
    ],
    duration: 120,
    cues: [
      "DC-OPF 和交流 OPF 的简化在哪？",
      "节点功率平衡、线路潮流、发电机出力上下限——三类约束",
      "LMP 怎么从 OPF 的对偶变量得到？",
      "为什么「理解 OPF」对理解电力市场至关重要？",
    ],
    content: `<h3>22.1 DC-OPF 是什么</h3>
<p><strong>直流最优潮流</strong>（DC Optimal Power Flow）：在简化假设下（电压幅值=1、忽略电阻、相角小），求满足电网物理约束的最低成本发电方案。</p>

<h3>22.2 3 节点 OPF 模型</h3>
<pre><code>from pyomo.environ import *

m = ConcreteModel()
# 3 个节点，节点 1 为平衡节点
m.nodes = RangeSet(0, 2)
# 2 台发电机（在节点 0 和 1）
m.gens = Set(initialize=[0, 1])
# 发电机成本和容量
cost = {0: 30, 1: 50}      # 元/MWh
cap = {0: 100, 1: 80}      # MW
# 节点负荷
load = {0: 40, 1: 60, 2: 50}

# 决策变量
m.P = Var(m.gens, bounds=lambda m, i: (0, cap[i]))
m.theta = Var(m.nodes)  # 相角

# 约束：节点功率平衡（DC 潮流近似）
def balance(m, n):
    gen = m.P[n] if n in m.gens else 0
    flow_in = sum((m.theta[k] - m.theta[n]) for k in m.nodes if k != n)
    return gen + flow_in == load[n]
m.balance_con = Constraint(m.nodes, rule=balance)

# 目标：总成本最小
m.obj = Objective(expr=sum(cost[i]*m.P[i] for i in m.gens), sense=minimize)

# 平衡节点相角 = 0
m.ref = Constraint(expr=m.theta[0] == 0)

SolverFactory('glpk').solve(m)
</code></pre>

<div class="ex-box"><h4>✏️ Day 22 必做</h4>
<ol>
<li>跑通 3 节点 OPF，记录各发电机出力和节点相角</li>
<li>尝试增加负荷看成本怎么变</li>
</ol></div>`,
  },
  {
    id: "p90-d23", day: 23, week: 4, track: "power90",
    title: "从 OPF 到 LMP：节点电价的物理推导",
    description: "从 OPF 对偶变量导出 LMP，理解电价的本质",
    objectives: [
      "理解 LMP = ∂(总成本) / ∂(节点负荷)",
      "用 Pyomo 提取对偶变量",
      "对比 LMP 推导值和市场实际值",
    ],
    duration: 90,
    cues: [
      "LMP 的物理含义是什么？",
      "对偶变量（dual variable / shadow price）怎么提取？",
      "阻塞如何让不同节点 LMP 不同？",
    ],
    content: `<h3>23.1 LMP 的对偶变量推导</h3>
<pre><code># 在求解后提取对偶
m.dual = Suffix(direction=Suffix.IMPORT)
SolverFactory('glpk').solve(m)

for n in m.nodes:
    print(f'节点 {n} LMP = {m.dual[m.balance_con[n]]}')
</code></pre>

<div class="ex-box"><h4>✏️ Day 23 必做</h4>
<ol>
<li>从 3 节点 OPF 提取 LMP</li>
<li>人为制造阻塞（限制某条线容量），看 LMP 怎么分化</li>
</ol></div>`,
  },
  {
    id: "p90-d24", day: 24, week: 4, track: "power90",
    title: "Gurobi 学术 license + 大规模 OPF",
    description: "切换到 Gurobi 求解器，跑一个 30+ 节点的 OPF",
    objectives: [
      "完成 Gurobi 学术 license 配置",
      "对比 Gurobi vs GLPK 求解速度",
      "在更大规模电网上验证 OPF",
    ],
    duration: 90,
    cues: [
      "Gurobi 比 GLPK 快多少？",
      "学术 license 怎么激活？",
      "30 节点 OPF 跑通需要多久？",
    ],
    content: `<h3>24.1 Gurobi 学术 license</h3>
<ol>
<li>注册 <a href="https://www.gurobi.com/academia/「 target=」_blank」>gurobi.com/academia</a></li>
<li>下载并安装</li>
<li>运行 <code>grbgetkey xxxxxxx</code> 激活</li>
</ol>
<pre><code>SolverFactory('gurobi').solve(m)
</code></pre>

<div class="ex-box"><h4>✏️ Day 24 必做</h4>
<ol>
<li>切换到 Gurobi，跑 3 节点 OPF 验证</li>
<li>下载 IEEE 30 节点测试系统，跑大规模 OPF</li>
</ol></div>`,
  },
  {
    id: "p90-d25", day: 25, week: 4, track: "power90",
    title: "_plotting 标准化 + 数据基线文档化",
    description: "把可视化标准化，data/ 目录文档化，为阶段三做准备",
    objectives: [
      "封装一个 plotting 工具模块",
      "为 data/ 目录写 README",
      "完成阶段二的基础设施清单",
    ],
    duration: 75,
    cues: [
      "为什么要把 plot 代码封装？",
      "data/ 目录的 README 应该写什么？",
      "阶段三开始前，「基础设施清单」是什么？",
    ],
    content: `<h3>25.1 Plotting 工具封装</h3>
<pre><code># utils/plotting.py
import plotly.graph_objects as go

def plot_lmp(df, title='电价时序'):
    fig = go.Figure(go.Scatter(x=df.index, y=df['lmp']))
    fig.update_layout(title=title, xaxis_title='时间', yaxis_title='LMP (元/MWh)')
    return fig

def plot_forecast(actual, pred, title='预测对比'):
    fig = go.Figure()
    fig.add_trace(go.Scatter(x=actual.index, y=actual.values, name='实际'))
    fig.add_trace(go.Scatter(x=pred.index, y=pred.values, name='预测'))
    return fig
</code></pre>

<h3>25.2 阶段二基础设施清单</h3>
<ul>
<li>✅ data/raw/ 有 PJM 3 年数据</li>
<li>✅ baseline + XGBoost + LSTM + Transformer + LightGBM 分位数</li>
<li>✅ Pyomo + Gurobi</li>
<li>✅ utils/plotting.py</li>
<li>✅ Git 提交规范（每个模型一个 commit）</li>
</ul>

<div class="ex-box"><h4>✏️ Day 25 必做</h4>
<ol>
<li>把所有 plot 代码重构到 utils/plotting.py</li>
<li>data/ 写 README.md 说明数据来源、字段、时间范围</li>
</ol></div>`,
  },
  {
    id: "p90-d26", day: 26, week: 4, track: "power90",
    title: "主攻方向决策：电价预测 vs 其他",
    description: "对照决策矩阵，正式确认主攻方向",
    objectives: [
      "完成主攻方向决策矩阵评分",
      "为阶段三写下主攻契约",
    ],
    duration: 60,
    cues: [
      "电价预测 vs 竞价策略 vs 新能源 vs 需求响应——各自评分？",
      "为什么推荐电价预测？三个理由",
      "我的「主攻契约」是什么？",
    ],
    content: `<h3>26.1 决策矩阵（方案第三节）</h3>
<table>
<tr><th>方向</th><th>数据可得性</th><th>技术门槛</th><th>可验证性</th><th>产业价值</th><th>综合</th></tr>
<tr><td>电价预测</td><td>⭐⭐⭐⭐⭐</td><td>⭐⭐⭐</td><td>⭐⭐⭐⭐⭐</td><td>⭐⭐⭐⭐⭐</td><td><strong>✅ 首选</strong></td></tr>
<tr><td>竞价策略</td><td>⭐⭐⭐</td><td>⭐⭐⭐⭐</td><td>⭐⭐⭐</td><td>⭐⭐⭐⭐⭐</td><td>次选</td></tr>
<tr><td>新能源收益</td><td>⭐⭐⭐</td><td>⭐⭐⭐</td><td>⭐⭐⭐⭐</td><td>⭐⭐⭐⭐</td><td>第三</td></tr>
<tr><td>需求响应</td><td>⭐⭐</td><td>⭐⭐⭐⭐</td><td>⭐⭐</td><td>⭐⭐⭐</td><td>不建议</td></tr>
</table>
<p><strong>三个理由：</strong>数据公开、技术成熟、是其他方向的"上游能力"。</p>

<div class="ex-box"><h4>✏️ Day 26 主攻契约</h4>
<p>在总结框写下："<strong>我选择电价预测作为主攻方向，目标是在 D70 前交付一个可用的日前电价预测模型 + 回测报告</strong>"</p></div>`,
  },
  {
    id: "p90-d27", day: 27, week: 4, track: "power90",
    title: "特征工程深挖：节假日 + 极端事件",
    description: "为电价预测增加节假日、极端天气、突发事件特征",
    objectives: [
      "增加节假日哑变量",
      "标记历史极端事件（寒潮/热浪/检修）",
      "评估新特征对模型的提升",
    ],
    duration: 90,
    cues: [
      "节假日特征怎么编码？",
      "极端事件怎么标记？事后还是事前？",
      "新特征对 MAPE 提升多少？",
    ],
    content: `<h3>27.1 节假日特征</h3>
<pre><code>from pandas.tseries.holiday import USFederalHolidayCalendar
cal = USFederalHolidayCalendar()
holidays = cal.holidays(start='2022-01-01', end='2024-12-31')
df['is_holiday'] = df.index.normalize().isin(holidays).astype(int)
df['days_to_holiday'] = ...  # 距最近节日的天数
</code></pre>

<h3>27.2 极端事件标记</h3>
<pre><code># 寒潮：温度 < 5°C 持续 3 天
# 热浪：温度 > 35°C 持续 3 天
df['is_cold_wave'] = (df['temp'] < 5).rolling(72).sum() >= 72
df['is_heat_wave'] = (df['temp'] > 35).rolling(72).sum() >= 72
</code></pre>

<div class="ex-box"><h4>✏️ Day 27 必做</h4>
<ol>
<li>加入节假日和极端事件特征</li>
<li>重训 XGBoost，对比 MAPE 提升</li>
</ol></div>`,
  },
  {
    id: "p90-d28", day: 28, week: 4, track: "power90",
    title: "超参数调优：Optuna 实战",
    description: "用 Optuna 做 XGBoost 超参搜索",
    objectives: [
      "掌握 Optuna 框架",
      "为 XGBoost 做完整超参搜索",
      "理解过拟合检测",
    ],
    duration: 90,
    cues: [
      "Optuna vs GridSearch vs RandomSearch？",
      "搜索空间怎么定义？",
      "如何用 early_stopping 防过拟合？",
    ],
    content: `<h3>28.1 Optuna 基础</h3>
<pre><code>import optuna

def objective(trial):
    params = {
        'n_estimators': trial.suggest_int('n_estimators', 100, 1000),
        'max_depth': trial.suggest_int('max_depth', 3, 10),
        'learning_rate': trial.suggest_float('learning_rate', 0.01, 0.3, log=True),
        'subsample': trial.suggest_float('subsample', 0.6, 1.0),
    }
    model = XGBRegressor(**params)
    model.fit(X_tr, y_tr)
    pred = model.predict(X_val)
    return mean_absolute_error(y_val, pred)

study = optuna.create_study(direction='minimize')
study.optimize(objective, n_trials=50)
print(study.best_params)
</code></pre>

<div class="ex-box"><h4>✏️ Day 28 必做</h4>
<ol>
<li>用 Optuna 调 50 次，记录 best_params</li>
<li>用 best_params 在测试集上验证</li>
</ol></div>`,
  },
  {
    id: "p90-d29", day: 29, week: 4, track: "power90",
    title: "滚动回测：TimeSeriesSplit + 滑动窗口",
    description: "用滚动窗口回测，得到稳定的性能估计",
    objectives: [
      "实现滚动窗口回测",
      "理解 walk-forward validation",
      "输出稳定的 MAPE 区间",
    ],
    duration: 90,
    cues: [
      "滚动窗口回测和 K-fold 的本质区别？",
      "训练窗口固定 vs 扩展，怎么选？",
      "回测结果如何报告？均值 ± 标准差",
    ],
    content: `<h3>29.1 滚动窗口回测</h3>
<pre><code>from sklearn.metrics import mean_absolute_error

window_train = 180 * 24  # 180 天训练
window_test = 30 * 24    # 30 天测试
step = 30 * 24

results = []
for start in range(0, len(df) - window_train - window_test, step):
    train = df.iloc[start : start + window_train]
    test = df.iloc[start + window_train : start + window_train + window_test]
    model.fit(train[features], train['lmp'])
    pred = model.predict(test[features])
    mape = (np.abs(test['lmp'] - pred) / test['lmp']).mean() * 100
    results.append(mape)

print(f'滚动 MAPE: {np.mean(results):.2f}% ± {np.std(results):.2f}')
</code></pre>

<div class="ex-box"><h4>✏️ Day 29 必做</h4>
<ol>
<li>用主攻模型跑 5 折滚动回测</li>
<li>记录每个窗口的 MAPE，画 boxplot</li>
</ol></div>`,
  },
  {
    id: "p90-d30", day: 30, week: 4, track: "power90",
    title: "阶段二总结：交付物清单 + 阶段三启动",
    description: "总结阶段二，启动阶段三主攻电价预测",
    objectives: [
      "完成阶段二所有交付物清单",
      "正式进入阶段三",
      "为 D31-D50 主攻写下计划",
    ],
    duration: 60,
    cues: [
      "阶段二都交付了什么？",
      "进入阶段三，主攻模型选哪个？",
      "D31-D50 的具体计划是什么？",
    ],
    content: `<h3>30.1 阶段二交付物清单</h3>
<ul>
<li>✅ data/ 目录完整（PJM 3 年 + 可选 ERA5）</li>
<li>✅ 5 个模型对比表</li>
<li>✅ Pyomo + Gurobi + 3 节点 OPF</li>
<li>✅ 主攻方向决策：电价预测</li>
<li>✅ Optuna 调参</li>
<li>✅ 滚动回测框架</li>
</ul>

<h3>30.2 阶段三计划（D31-D70）</h3>
<table>
<tr><th>区间</th><th>内容</th></tr>
<tr><td>D31-D50</td><td>主攻电价预测：模型迭代、特征深挖、回测完善</td></tr>
<tr><td>D51-D60</td><td>竞价策略（基于预测做优化）</td></tr>
<tr><td>D61-D65</td><td>SHAP 可解释性</td></tr>
<tr><td>D66-D70</td><td>新能源/需求响应（了解级）</td></tr>
</table>

<div class="ex-box"><h4>✏️ Day 30 必做</h4>
<ol>
<li>把阶段二所有交付物整理到 Git release</li>
<li>写下阶段三的 20 天计划，每天一个可交付目标</li>
</ol></div>`,
  },

  // ════════════════════════════════════════════════
  // 阶段三 · D31-D70 · 核心算法突破
  // ════════════════════════════════════════════════
  {
    id: "p90-d31", day: 31, week: 5, track: "power90",
    title: "🚀 阶段三启动：主攻电价预测 20 天计划",
    description: "正式启动主攻方向，部署完整的预测实验框架",
    objectives: [
      "搭建实验管理框架（MLflow 或简单日志）",
      "写下 20 天每日可交付目标",
      "跑通端到端实验流水线",
    ],
    duration: 90,
    cues: [
      "实验管理为什么必要？跑 100 次实验怎么追踪？",
      "20 天的主攻计划，每天交付什么？",
      "什么算「日前电价预测模型可用」？验收标准？",
    ],
    content: `<h3>31.1 实验管理（轻量版）</h3>
<pre><code># experiments/log.py
import json, datetime, hashlib

def log_experiment(model_name, params, metrics, notes=''):
    record = {
        'timestamp': datetime.datetime.now().isoformat(),
        'model': model_name,
        'params': params,
        'metrics': metrics,
        'notes': notes,
        'id': hashlib.md5(str(params).encode()).hexdigest()[:8]
    }
    with open('experiments/log.jsonl', 'a') as f:
        f.write(json.dumps(record) + '\\n')
    return record['id']
</code></pre>

<h3>31.2 验收标准（必须量化）</h3>
<table>
<tr><th>指标</th><th>目标</th></tr>
<tr><td>MAPE</td><td>≤ 15%（取决于市场波动性）</td></tr>
<tr><td>尖峰日（>P99）命中率</td><td>≥ 60%</td></tr>
<tr><td>预测延迟</td><td>次日 24 小时 < 5 秒</td></tr>
<tr><td>覆盖率（80% 区间）</td><td>78%-82%</td></tr>
</table>

<div class="ex-box"><h4>✏️ Day 31 必做</h4>
<ol>
<li>搭建实验日志框架</li>
<li>写下 D32-D50 每天的可交付目标</li>
</ol></div>`,
  },
  {
    id: "p90-d32", day: 32, week: 5, track: "power90",
    title: "特征深挖 1/3：日历特征 + 时间编码",
    description: "深入日历特征工程，cyclical encoding",
    objectives: ["掌握 sin/cos cyclical 编码", "对比 one-hot vs cyclical"],
    duration: 60,
    cues: ["hour 用 sin/cos 编码 vs one-hot 哪个好？", "周/月/年的周期分别怎么编码？"],
    content: `<h3>cyclical encoding</h3>
<pre><code>df['hour_sin'] = np.sin(2*np.pi*df.index.hour/24)
df['hour_cos'] = np.cos(2*np.pi*df.index.hour/24)
df['dow_sin'] = np.sin(2*np.pi*df.index.dayofweek/7)
df['dow_cos'] = np.cos(2*np.pi*df.index.dayofweek/7)
</code></pre>
<div class="ex-box"><h4>✏️ 必做</h4><p>对比 cyclical vs one-hot 对 XGBoost MAPE 的影响</p></div>`,
  },
  {
    id: "p90-d33", day: 33, week: 5, track: "power90",
    title: "特征深挖 2/3：交叉特征 + 业务知识",
    description: "把领域知识编码成特征（如工作日×小时、季节×时段）",
    objectives: ["设计 5+ 交叉特征", "理解领域知识在 ML 中的价值"],
    duration: 60,
    cues: ["为什么'工作日×小时'比单独用更强？", "如何把'某月为高峰季'编码进去？"],
    content: `<h3>交叉特征示例</h3>
<pre><code>df['weekday_hour'] = df['is_weekend'].astype(str) + '_' + df['hour'].astype(str)
df['summer_peak'] = ((df.index.month.isin([6,7,8])) & (df.index.hour.isin([13,14,15]))).astype(int)
</code></pre>
<div class="ex-box"><h4>✏️ 必做</h4><p>设计 5 个交叉特征，记录对 MAPE 的影响</p></div>`,
  },
  {
    id: "p90-d34", day: 34, week: 5, track: "power90",
    title: "特征深挖 3/3：外部数据融合",
    description: "融合天气、宏观经济、燃料价格等外部数据",
    objectives: ["尝试融合 ERA5 天气数据", "评估外部数据对预测的提升"],
    duration: 60,
    cues: ["天然气价格对电价影响有多大？", "ERA5 温度对负荷的影响？"],
    content: `<p>外部数据候选：天然气价格（影响气电成本）、煤炭价格、温度（影响负荷）、降水（影响水电）。</p>
<div class="ex-box"><h4>✏️ 必做</h4><p>融合 1 种外部数据，记录 MAPE 提升</p></div>`,
  },
  {
    id: "p90-d35", day: 35, week: 5, track: "power90",
    title: "模型集成：Stacking + Blending",
    description: "用 XGBoost + LightGBM + LSTM 做集成",
    objectives: [
      "理解 Stacking 和 Blending",
      "实现三模型集成",
      "评估集成 vs 单模型的提升",
    ],
    duration: 90,
    cues: [
      "集成为什么常比单模型好？",
      "Stacking 和 Blending 的区别？",
      "集成后 MAPE 提升多少？",
    ],
    content: `<h3>35.1 三模型集成</h3>
<pre><code>from sklearn.linear_model import Ridge

# 第一层：三个基模型
preds_xgb = model_xgb.predict(X_val)
preds_lgb = model_lgb.predict(X_val)
preds_lstm = model_lstm.predict(X_val_seq).flatten()

# 第二层：用 Ridge 学习权重
stack_X = np.column_stack([preds_xgb, preds_lgb, preds_lstm])
meta_model = Ridge(alpha=1.0).fit(stack_X, y_val)

# 最终预测
final_pred = meta_model.predict(np.column_stack([
    model_xgb.predict(X_te),
    model_lgb.predict(X_te),
    model_lstm.predict(X_te_seq).flatten()
]))
</code></pre>

<div class="ex-box"><h4>✏️ Day 35 必做</h4>
<ol>
<li>实现三模型 stacking</li>
<li>对比集成 vs 最佳单模型的 MAPE</li>
</ol></div>`,
  },
  {
    id: "p90-d36", day: 36, week: 6, track: "power90",
    title: "模型诊断：误差分解（系统/随机）",
    description: "把误差分解为可解释和不可解释部分",
    objectives: ["理解 bias-variance 分解", "用残差图诊断模型"],
    duration: 60,
    cues: ["残差图怎么读？", "什么误差是模型问题，什么误差是数据噪声？"],
    content: `<p>残差 = y_true - y_pred。画残差 vs 预测值散点图，看是否有系统性偏移。</p>
<div class="ex-box"><h4>✏️ 必做</h4><p>画残差图，识别模型系统性低估/高估的区间</p></div>`,
  },
  {
    id: "p90-d37", day: 37, week: 6, track: "power90",
    title: "模型诊断：时段误差分析",
    description: "找出哪个时段预测最难",
    objectives: ["按小时/星期/季节分组分析 MAPE"],
    duration: 60,
    cues: ["哪个小时 MAPE 最高？", "周末 vs 工作日哪个难？"],
    content: `<pre><code>df_te['mape'] = np.abs(df_te['lmp'] - y_pred) / df_te['lmp']
hourly_mape = df_te.groupby(df_te.index.hour)['mape'].mean()
</code></pre>
<div class="ex-box"><h4>✏️ 必做</h4><p>画 24 小时的 MAPE 曲线，找出最难预测的时段</p></div>`,
  },
  {
    id: "p90-d38", day: 38, week: 6, track: "power90",
    title: "模型诊断：跨年泛化",
    description: "训练在 2022-2023，测试在 2024，看泛化能力",
    objectives: ["理解跨年泛化的难点", "评估模型的稳定性"],
    duration: 60,
    cues: ["跨年 MAPE 比同年高多少？", "市场结构变化如何影响模型？"],
    content: `<p>2024 年的市场可能和 2022 不同（政策、燃料价格）。模型必须有跨年鲁棒性。</p>
<div class="ex-box"><h4>✏️ 必做</h4><p>用 2022-2023 训练，2024 测试，记录 MAPE 衰减</p></div>`,
  },
  {
    id: "p90-d39", day: 39, week: 6, track: "power90",
    title: "深度学习重训：用最优超参",
    description: "基于 Day 28 的最优超参，重训 LSTM/Transformer",
    objectives: ["重训深度模型", "更新对比表"],
    duration: 90,
    cues: ["LSTM 用最优超参后 MAPE 提升多少？", "深度模型在电价上的真实定位？"],
    content: `<p>用 Optuna 找到的最优超参重训 LSTM 和 Transformer。</p>
<div class="ex-box"><h4>✏️ 必做</h4><p>更新 5+ 模型对比表</p></div>`,
  },
  {
    id: "p90-d40", day: 40, week: 6, track: "power90",
    title: "第六周自检 + 中期评审",
    description: "完成中期评审",
    objectives: ["中期交付物清单", "调整后半程计划"],
    duration: 60,
    cues: ["D31-D40 完成了什么？", "需要调整吗？"],
    content: `<p>对照 D31 写的 20 天计划，检查实际进度。</p>
<div class="ex-box"><h4>✏️ 必做</h4><p>如果偏离计划 > 30%，调整 D41-D50 的目标</p></div>`,
  },
  {
    id: "p90-d41", day: 41, week: 6, track: "power90",
    title: "SHAP 可解释性：理解模型为什么这么预测",
    description: "用 SHAP 解释特征重要性和单样本预测",
    objectives: [
      "掌握 SHAP TreeExplainer",
      "画出全局特征重要性 + 单样本力图",
      "用 SHAP 做误差归因",
    ],
    duration: 90,
    cues: [
      "为什么需要可解释性？监管和业务都需要",
      "SHAP value 的数学含义？",
      "全局重要性 vs 单样本解释",
      "如何用 SHAP 找出「模型预测错误的原因」？",
    ],
    content: `<h3>41.1 SHAP TreeExplainer</h3>
<pre><code>import shap

explainer = shap.TreeExplainer(model_xgb)
shap_values = explainer.shap_values(X_te)

# 全局：特征重要性条形图
shap.summary_plot(shap_values, X_te, plot_type='bar')

# 单样本：力图（为什么这一天的预测是这个值）
shap.force_plot(explainer.expected_value, shap_values[0], X_te.iloc[0])
</code></pre>

<h3>41.2 误差归因</h3>
<pre><code># 找出预测误差最大的样本
errors = np.abs(y_te - y_pred)
worst_idx = errors.argsort()[-20:]

# 看这些样本的 SHAP 值，找出驱动模型出错的特征
shap.summary_plot(shap_values[worst_idx], X_te.iloc[worst_idx])
</code></pre>

<div class="ex-box"><h4>✏️ Day 41 必做</h4>
<ol>
<li>跑通 SHAP，导出全局重要性图</li>
<li>分析误差最大的 20 个样本的 SHAP</li>
</ol></div>`,
  },
  {
    id: "p90-d42", day: 42, week: 6, track: "power90",
    title: "SHAP 进阶：依赖图 + 交互效应",
    description: "SHAP 依赖图、特征交互值",
    objectives: ["画 SHAP 依赖图", "识别特征交互"],
    duration: 60,
    cues: ["SHAP 依赖图能告诉我们什么？", "两个特征如何交互影响预测？"],
    content: `<pre><code>shap.dependence_plot('lag_24', shap_values, X_te, interaction_index='hour')
</code></pre>
<div class="ex-box"><h4>✏️ 必做</h4><p>画 3 张依赖图，识别非线性关系</p></div>`,
  },
  {
    id: "p90-d43", day: 43, week: 7, track: "power90",
    title: "误差归因实战：找 Top-N 误差源",
    description: "系统化分析预测误差的来源",
    objectives: ["实现误差归因流水线", "找出可改进的误差源"],
    duration: 75,
    cues: ["误差归因的框架？", "哪些误差可以通过加特征改善？哪些不能？"],
    content: `<p>误差归因表：按特征分位分段统计 MAPE，找出误差最大的特征段。</p>
<div class="ex-box"><h4>✏️ 必做</h4><p>导出误差归因报告</p></div>`,
  },
  {
    id: "p90-d44", day: 44, week: 7, track: "power90",
    title: "特征选择：Boruta + 递归消除",
    description: "用 Boruta 和 RFE 做特征选择",
    objectives: ["掌握 Boruta 算法", "实现 RFE"],
    duration: 75,
    cues: ["Boruta 比 feature_importances_ 强在哪？", "多少特征是「恰好」？"],
    content: `<pre><code>from boruta import BorutaPy
feat_selector = BorutaPy(model_xgb, n_estimators='auto', verbose=0)
feat_selector.fit(X_tr.values, y_tr.values)
print(feat_selector.support_)  # True = 重要
</code></pre>
<div class="ex-box"><h4>✏️ 必做</h4><p>用 Boruta 选特征，记录保留/剔除的特征</p></div>`,
  },
  {
    id: "p90-d45", day: 45, week: 7, track: "power90",
    title: "第七周自检：模型锁定",
    description: "锁定最终模型版本",
    objectives: ["锁定 v1.0 模型", "生成 model_card.md"],
    duration: 60,
    cues: ["v1.0 模型是什么？", "model_card 写什么？"],
    content: `<p>写 model_card.md：模型版本、训练数据、性能指标、已知局限。</p>
<div class="ex-box"><h4>✏️ 必做</h4><p>锁定 v1.0，写 model_card.md</p></div>`,
  },
  {
    id: "p90-d46", day: 46, week: 7, track: "power90",
    title: "尖峰预测专题：分类 + 回归两阶段",
    description: "电价尖峰（>P99）的预测难点和两阶段方案",
    objectives: [
      "理解尖峰预测的难点（样本少、损失大）",
      "实现「先分类后回归」两阶段方案",
      "评估尖峰命中率",
    ],
    duration: 90,
    cues: [
      "尖峰预测为什么比常规预测难？",
      "分类+回归两阶段方案的逻辑？",
      "如何处理样本不平衡？",
    ],
    content: `<h3>46.1 两阶段方案</h3>
<pre><code># 阶段 1：分类——明天会不会有尖峰
df['is_spike'] = (df['lmp'] > df['lmp'].rolling(720).quantile(0.99)).astype(int)
clf = XGBClassifier(scale_pos_weight=20)  # 处理不平衡
clf.fit(X_tr, df.loc[X_tr.index, 'is_spike'])

# 阶段 2：对预测为尖峰的样本，用回归模型给具体值
spike_mask = clf.predict(X_te) == 1
y_pred[spike_mask] = model_spike.predict(X_te[spike_mask])
</code></pre>

<div class="ex-box"><h4>✏️ Day 46 必做</h4>
<ol>
<li>实现两阶段尖峰预测</li>
<li>评估尖峰命中率（recall）</li>
</ol></div>`,
  },
  {
    id: "p90-d47", day: 47, week: 7, track: "power90",
    title: "尖峰预测：代价敏感学习",
    description: "用代价敏感学习处理样本不平衡",
    objectives: ["掌握 class_weight / scale_pos_weight"],
    duration: 60,
    cues: ["为什么普通分类器对尖峰召回低？", "调整阈值 vs 调整样本权重？"],
    content: `<p>调整 scale_pos_weight 或分类阈值。</p>
<div class="ex-box"><h4>✏️ 必做</h4><p>画 PR 曲线，选最优阈值</p></div>`,
  },
  {
    id: "p90-d48", day: 48, week: 7, track: "power90",
    title: "概率预测深化：全分布输出",
    description: "从分位数到完整分布",
    objectives: ["理解 CRPS 评估指标", "实现 NGBoost 或分位数集成"],
    duration: 75,
    cues: ["CRPS 比 MAE 在概率预测上好在哪？", "NGBoost 是什么？"],
    content: `<p>NGBoost：自然梯度的概率预测。或用 9 个分位数（0.1-0.9）拼成完整分布。</p>
<div class="ex-box"><h4>✏️ 必做</h4><p>实现完整分布预测，画概率密度图</p></div>`,
  },
  {
    id: "p90-d49", day: 49, week: 7, track: "power90",
    title: "预测延迟优化",
    description: "把推理时间从秒级压到毫秒级",
    objectives: ["模型蒸馏", "ONNX 导出"],
    duration: 60,
    cues: ["为什么需要低延迟？", "如何把 XGBoost 转 ONNX？"],
    content: `<pre><code>import onnxmltools
onnx_model = onnxmltools.convert_xgboost(model_xgb, initial_types=[('input', FloatTensorType(shape=[None, X.shape[1]]))])
</code></pre>
<div class="ex-box"><h4>✏️ 必做</h4><p>导出 ONNX，对比推理时间</p></div>`,
  },
  {
    id: "p90-d50", day: 50, week: 7, track: "power90",
    title: "主攻里程碑：v2.0 模型冻结",
    description: "冻结 v2.0 主攻模型，进入配套阶段",
    objectives: ["v2.0 模型冻结", "对比 v1.0 的提升"],
    duration: 60,
    cues: ["v2.0 比 v1.0 MAPE 提升多少？", "还剩什么问题没解决？"],
    content: `<p>v2.0 应该包含：集成模型、尖峰两阶段、概率预测。</p>
<div class="ex-box"><h4>✏️ 必做</h4><p>Git tag v2.0，写 release notes</p></div>`,
  },
  {
    id: "p90-d51", day: 51, week: 8, track: "power90",
    title: "🎯 竞价策略（配套 10 天）：基于预测做优化",
    description: "用电价预测 + Pyomo 建一个简单报价优化模型",
    objectives: [
      "理解「预测→决策」的衔接",
      "建一个发电商的报价优化模型",
      "评估策略在历史数据上的回测收益",
    ],
    duration: 120,
    cues: [
      "报价优化的目标函数是什么？",
      "如何把电价预测的「不确定性」加入优化？",
      "回测收益 vs 真实市场表现的差距？",
    ],
    content: `<h3>51.1 发电商报价优化</h3>
<pre><code>from pyomo.environ import *

m = ConcreteModel()
# 决策：每段（共 10 段）报价量
m.segments = RangeSet(0, 9)
m.qty = Var(m.segments, bounds=(0, 10))  # 每段最多 10MW
m.price = Var(m.segments, bounds=(0, 1000))

# 预测电价（从电价预测模型来）
forecast_price = {...}  # 24 小时预测价

# 目标：最大化预期收益
def revenue(m, h):
    cleared = sum(m.qty[s] for s in m.segments if m.price[s] <= forecast_price[h])
    return forecast_price[h] * cleared - cost * sum(m.qty[s] for s in m.segments)

m.obj = Objective(expr=sum(revenue(m, h) for h in range(24)), sense=maximize)
</code></pre>

<div class="ex-box"><h4>✏️ Day 51 必做</h4>
<ol>
<li>建一个简化的报价优化模型</li>
<li>在 PJM 历史数据上回测收益</li>
</ol></div>`,
  },
  {
    id: "p90-d52", day: 52, week: 8, track: "power90",
    title: "竞价 2：随机优化（处理预测不确定性）",
    description: "用场景法处理电价预测的不确定性",
    objectives: ["理解场景生成", "两阶段随机规划"],
    duration: 90,
    cues: ["如何把概率预测转成场景？", "两阶段随机规划的意义？"],
    content: `<p>从分位数预测生成 10 个场景，用期望目标优化。</p>
<div class="ex-box"><h4>✏️ 必做</h4><p>对比确定性 vs 随机策略的收益方差</p></div>`,
  },
  {
    id: "p90-d53", day: 53, week: 8, track: "power90",
    title: "竞价 3：储能调度",
    description: "把报价优化扩展到发电+储能",
    objectives: ["建储能优化模型", "理解储能套利"],
    duration: 90,
    cues: ["储能充放电的物理约束？", "套利逻辑：低买高卖"],
    content: `<p>储能 SOC（荷电状态）约束：0 ≤ SOC ≤ 容量。</p>
<div class="ex-box"><h4>✏️ 必做</h4><p>加入储能，看收益提升多少</p></div>`,
  },
  {
    id: "p90-d54", day: 54, week: 8, track: "power90",
    title: "竞价 4：风险约束（CVaR）",
    description: "用 CVaR 约束极端损失",
    objectives: ["理解 CVaR", "实现 CVaR 约束优化"],
    duration: 75,
    cues: ["VaR vs CVaR？", "CVaR 优化如何降低尾部风险？"],
    content: `<p>CVaR_α = 最差 α% 情景的平均损失。把 CVaR 加入约束。</p>
<div class="ex-box"><h4>✏️ 必做</h4><p>对比有无 CVaR 约束的回测收益曲线</p></div>`,
  },
  {
    id: "p90-d55", day: 55, week: 8, track: "power90",
    title: "竞价 5：策略回测 + 风险评估",
    description: "完整回测策略在 3 年历史数据上的表现",
    objectives: ["完整回测", "风险指标"],
    duration: 90,
    cues: ["3 年累计收益？", "最大回撤？Sharpe？"],
    content: `<p>策略评估指标：累计收益、年化、最大回撤、Sharpe、Calmar。</p>
<div class="ex-box"><h4>✏️ 必做</h4><p>导出完整策略回测报告</p></div>`,
  },
  {
    id: "p90-d56", day: 56, week: 8, track: "power90",
    title: "RL 探索（可选）：小型 Q-learning 竞价 demo",
    description: "如果主线顺利，做一个简单的 RL 竞价 demo；否则跳过",
    objectives: [
      "评估是否进入 RL 探索（主线必须已完成）",
      "实现一个 Q-learning 简化版",
      "理解 RL 在电力市场的真实挑战",
    ],
    duration: 120,
    cues: [
      "主线（电价预测）完成了吗？没完成就跳过 RL",
      "Q-learning 的状态/动作/奖励怎么定义？",
      "为什么 RL 在真实电力市场几乎不可用？",
    ],
    content: `<div class="pit-box"><h4>⚠️ RL 触发条件</h4>
<p>方案第六节明确：<strong>RL 是"探索项"，仅当 D55 前主线顺利且有余力才做。</strong>否则果断跳过。</p></div>

<h3>56.1 Q-learning 简化版</h3>
<pre><code>import numpy as np

Q = np.zeros((n_states, n_actions))
for episode in range(1000):
    s = env.reset()
    while not done:
        a = epsilon_greedy(Q[s])
        s_next, r, done = env.step(a)
        Q[s, a] += lr * (r + gamma * np.max(Q[s_next]) - Q[s, a])
        s = s_next
</code></pre>

<div class="ex-box"><h4>✏️ Day 56 决策</h4>
<p>如果主线 OK：实现一个简化 RL demo，<strong>记录 reward 曲线不收敛的过程</strong>——这就是为什么方案建议主线用确定性优化。</p>
<p>如果主线未完成：<strong>跳过 RL</strong>，回到主线打磨。</p></div>`,
  },
  {
    id: "p90-d57", day: 57, week: 9, track: "power90",
    title: "RL 探索 2：策略梯度（Policy Gradient）",
    description: "尝试 REINFORCE 或 PPO",
    objectives: ["理解策略梯度", "实现 REINFORCE"],
    duration: 90,
    cues: ["策略梯度比 Q-learning 优势在哪？", "PPO 为什么更稳定？"],
    content: `<pre><code># REINFORCE 核心
loss = -torch.mean(log_prob * advantage)
</code></pre>
<div class="ex-box"><h4>✏️ 必做</h4><p>跑 REINFORCE，记录收敛情况</p></div>`,
  },
  {
    id: "p90-d58", day: 58, week: 9, track: "power90",
    title: "RL 探索 3：Multi-Agent（多机博弈）",
    description: "理解多智能体强化学习（MARL）",
    objectives: ["理解 MARL 在电力市场的应用", "知道其挑战"],
    duration: 75,
    cues: ["多机博弈为什么比单机难？", "Nash 均衡在电力竞价的意义？"],
    content: `<p>读 1 篇 MARL 电力竞价论文（2022+）。</p>
<div class="ex-box"><h4>✏️ 必做</h4><p>写 200 字读后感</p></div>`,
  },
  {
    id: "p90-d59", day: 59, week: 9, track: "power90",
    title: "RL vs 确定性优化：对比实验",
    description: "把 RL 和 Pyomo 确定性优化对比",
    objectives: ["量化对比", "理解两者各自适用场景"],
    duration: 75,
    cues: ["哪个更稳定？", "哪个更适合真实场景？"],
    content: `<p>对比表：收益、稳定性、训练时间、可解释性。</p>
<div class="ex-box"><h4>✏️ 必做</h4><p>完成对比报告</p></div>`,
  },
  {
    id: "p90-d60", day: 60, week: 9, track: "power90",
    title: "第八周自检 + RL 总结",
    description: "总结 RL 探索，进入了解级环节",
    objectives: ["总结 RL 经验教训", "为新能源/DR 学习做准备"],
    duration: 60,
    cues: ["RL 真实价值是什么？", "什么场景下值得用 RL？"],
    content: `<p>RL 总结：理论吸引人，但工业落地极难。</p>
<div class="ex-box"><h4>✏️ 必做</h4><p>写 500 字 RL 实战心得</p></div>`,
  },
  {
    id: "p90-d61", day: 61, week: 9, track: "power90",
    title: "新能源出力（了解级 3 天）：风电/光伏预测特点",
    description: "理解新能源出力预测的特殊性，不深入实现",
    objectives: [
      "理解风电/光伏预测的关键特征",
      "知道新能源预测和电价预测的差异",
      "理解新能源如何「反推」影响电价",
    ],
    duration: 60,
    cues: [
      "风电/光伏预测的「自然上限」是什么？",
      "为什么新能源出力会影响电价（供给端）？",
      "新能源出力预测常用什么模型？",
    ],
    content: `<h3>61.1 风电 vs 光伏</h3>
<table>
<tr><th>维度</th><th>风电</th><th>光伏</th></tr>
<tr><td>关键驱动</td><td>风速（立方关系！）</td><td>辐照度（线性）</td></tr>
<tr><td>日周期</td><td>弱</td><td>强（白天才有）</td></tr>
<tr><td>预测难点</td><td>风速突变（锋面）</td><td>云遮挡（极难预测）</td></tr>
<tr><td>常用模型</td><td>NWP + ML</td><td>NWP + ML + 图像识别（云图）</td></tr>
</table>

<div class="ex-box"><h4>✏️ Day 61</h4>
<p>读 1 篇 wind power forecasting review 综述，记下 3 个关键洞察。</p></div>`,
  },
  {
    id: "p90-d62", day: 62, week: 9, track: "power90",
    title: "新能源出力 2：光伏预测",
    description: "光伏预测的特点和云遮挡难题",
    objectives: ["理解光伏预测的几何特征", "云遮挡预测方法"],
    duration: 45,
    cues: ["太阳位置怎么算？", "云图识别如何提升短临预测？"],
    content: `<p>太阳高度角公式 + 全天空成像仪。</p>
<div class="ex-box"><h4>✏️ 必做</h4><p>理解即可</p></div>`,
  },
  {
    id: "p90-d63", day: 63, week: 9, track: "power90",
    title: "新能源出力 3：出力→电价的影响链",
    description: "理解新能源高渗透率如何压低电价（merit order 效应）",
    objectives: ["理解 merit order 效应", "新能源对电价的非线性影响"],
    duration: 45,
    cues: ["merit order 效应是什么？", "新能源渗透率到多少会显著压价？"],
    content: `<p>新能源边际成本≈0，挤掉贵机组 → 电价下降。德国"EEG 时代"案例。</p>
<div class="ex-box"><h4>✏️ 必做</h4><p>理解 + 1 句话总结</p></div>`,
  },
  {
    id: "p90-d64", day: 64, week: 9, track: "power90",
    title: "需求响应（了解级 2 天）：可调负荷聚合",
    description: "理解需求响应的商业逻辑，不深入实现",
    objectives: [
      "理解需求响应（DR）的含义",
      "知道可调负荷聚合的难点",
      "理解为什么本课程不主攻 DR",
    ],
    duration: 45,
    cues: [
      "需求响应是什么？发用电方角色如何变？",
      "聚合商（aggregator）做什么？",
      "为什么 DR 的数据可得性最低？",
    ],
    content: `<h3>64.1 需求响应分类</h3>
<table>
<tr><th>类型</th><th>机制</th><th>典型用户</th></tr>
<tr><td>削峰（peak shaving）</td><td>高峰时降负荷</td><td>大工业</td></tr>
<tr><td>填谷（valley filling）</td><td>低谷时升负荷</td><td>电动车充电</td></tr>
<tr><td>转移（load shifting）</td><td>把高峰负荷挪到低谷</td><td>储能、空调</td></tr>
</table>
<p><strong>为什么本课程不主攻 DR：</strong>用户侧行为数据获取困难、隐私敏感，方案决策矩阵得分最低。</p>

<div class="ex-box"><h4>✏️ Day 64</h4>
<p>了解即可，不实现。在总结框写下：DR 商业化的最大障碍是什么？</p></div>`,
  },
  {
    id: "p90-d65", day: 65, week: 9, track: "power90",
    title: "需求响应 2：虚拟电厂（VPP）",
    description: "VPP 的商业逻辑和技术栈",
    objectives: ["理解 VPP", "知道 VPP 的关键技术"],
    duration: 45,
    cues: ["VPP 怎么聚合分布式资源？", "VPP 商业模式？"],
    content: `<p>VPP = 软件层聚合 DER（分布式能源）。</p>
<div class="ex-box"><h4>✏️ 必做</h4><p>读 1 篇 VPP 综述</p></div>`,
  },
  {
    id: "p90-d66", day: 66, week: 10, track: "power90",
    title: "可解释性贯穿：LIME + Counterfactual",
    description: "补充 LIME 和反事实解释",
    objectives: ["掌握 LIME", "实现 Counterfactual"],
    duration: 60,
    cues: ["LIME vs SHAP 的差异？", "Counterfactual 解释适合什么场景？"],
    content: `<pre><code>import lime.lime_tabular
explainer = lime.lime_tabular.LimeTabularExplainer(X_tr.values, feature_names=X_tr.columns)
exp = explainer.explain_instance(X_te.iloc[0].values, model_xgb.predict, num_features=5)
</code></pre>
<div class="ex-box"><h4>✏️ 必做</h4><p>对比 SHAP vs LIME 在同一样本的解释</p></div>`,
  },
  {
    id: "p90-d67", day: 67, week: 10, track: "power90",
    title: "模型监控：上线后的健康度",
    description: "上线后的数据漂移、性能衰减",
    objectives: ["理解 data drift", "实现简单的监控"],
    duration: 60,
    cues: ["data drift 怎么检测？", "性能衰减阈值怎么设？"],
    content: `<p>用 PSI（Population Stability Index）或 KS 检验检测特征分布漂移。</p>
<div class="ex-box"><h4>✏️ 必做</h4><p>实现 PSI 监控</p></div>`,
  },
  {
    id: "p90-d68", day: 68, week: 10, track: "power90",
    title: "再训练策略：何时重训",
    description: "定义模型重训的触发条件",
    objectives: ["定义重训触发规则", "实现自动重训"],
    duration: 60,
    cues: ["按时间 vs 按性能，哪个更好？", "增量学习 vs 全量重训？"],
    content: `<p>触发规则：MAPE 衰减 > 20% 或 PSI > 0.2。</p>
<div class="ex-box"><h4>✏️ 必做</h4><p>实现重训触发器</p></div>`,
  },
  {
    id: "p90-d69", day: 69, week: 10, track: "power90",
    title: "代码审查 + 最后一轮打磨",
    description: "对全项目代码做一次 review",
    objectives: ["完成代码审查", "修复明显问题"],
    duration: 90,
    cues: ["代码质量怎么样？", "哪些函数可以重构？"],
    content: `<p>用 black + flake8 + mypy 检查代码质量。</p>
<div class="ex-box"><h4>✏️ 必做</h4><p>跑通 linting，修复关键问题</p></div>`,
  },
  {
    id: "p90-d70", day: 70, week: 10, track: "power90",
    title: "阶段三总结：交付物 + 进入整合",
    description: "完成阶段三所有交付物，准备进入阶段四整合交付",
    objectives: [
      "完成阶段三交付物清单",
      "主攻模型最终确定",
      "为阶段四整合写下计划",
    ],
    duration: 60,
    cues: [
      "阶段三都交付了什么？",
      "主攻模型最终 MAPE 是多少？达标了吗？",
      "D71-D90 整合阶段，每天做什么？",
    ],
    content: `<h3>70.1 阶段三交付物清单</h3>
<ul>
<li>✅ 电价预测主模型（MAPE ≤ 15%）</li>
<li>✅ 集成模型（XGBoost + LightGBM + LSTM）</li>
<li>✅ SHAP 可解释性分析</li>
<li>✅ 尖峰预测两阶段方案</li>
<li>✅ 竞价策略 + 历史回测</li>
<li>✅ RL 探索（可选，记录教训）</li>
<li>✅ 滚动回测报告（5 折）</li>
</ul>

<h3>70.2 阶段四计划（D71-D90）</h3>
<table>
<tr><th>区间</th><th>任务</th></tr>
<tr><td>D71-D75</td><td>端到端串联：数据→预测→策略→回测</td></tr>
<tr><td>D76-D80</td><td>回测验证（对比 baseline）</td></tr>
<tr><td>D81-D85</td><td>风险分析（极端日表现）</td></tr>
<tr><td>D86-D90</td><td>成文 + Git 整理 + 复盘</td></tr>
</table>

<div class="ex-box"><h4>✏️ Day 70 必做</h4>
<ol>
<li>把阶段三所有交付物整理到 Git release v0.3</li>
<li>写下阶段四的 20 天计划</li>
</ol></div>`,
  },

  // ════════════════════════════════════════════════
  // 阶段四 · D71-D90 · 整合交付
  // ════════════════════════════════════════════════
  {
    id: "p90-d71", day: 71, week: 11, track: "power90",
    title: "🚀 阶段四启动：端到端流水线",
    description: "把数据→预测→策略→回测串成一条流水线",
    objectives: [
      "搭建端到端 pipeline",
      "每个环节用模块化代码",
      "跑通一次完整流程",
    ],
    duration: 120,
    cues: [
      "为什么「整合」是最难的阶段？",
      "pipeline 每个环节的输入输出？",
      "如何用 DAG（有向无环图）管理依赖？",
    ],
    content: `<h3>71.1 Pipeline 架构</h3>
<pre><code># pipeline/run.py
def run_pipeline(start_date, end_date):
    # ① 数据加载
    df = load_data(start_date, end_date)
    # ② 特征工程
    features = build_features(df)
    # ③ 预测
    forecast = model.predict(features)
    # ④ 策略
    bids = strategy.generate(forecast)
    # ⑤ 回测
    result = backtest.evaluate(bids, actual_prices)
    return result
</code></pre>

<h3>71.2 用 Prefect 或 Airflow 编排（可选）</h3>
<p>简单版用 Python 函数链即可，复杂场景可上 <a href="https://www.prefect.io/「 target=」_blank」>Prefect</a>。</p>

<div class="ex-box"><h4>✏️ Day 71 必做</h4>
<ol>
<li>写 run_pipeline.py，跑通一次完整流程</li>
<li>记录端到端耗时</li>
</ol></div>`,
  },
  {
    id: "p90-d72", day: 72, week: 11, track: "power90",
    title: "Pipeline 2：异常处理与降级",
    description: "处理数据缺失、模型失败的降级",
    objectives: ["设计 fallback 策略", "异常日志"],
    duration: 75,
    cues: ["模型失败时用什么代替？", "异常如何告警？"],
    content: `<p>降级链：主模型失败 → 备用模型 → naive persistence。</p>
<div class="ex-box"><h4>✏️ 必做</h4><p>实现降级机制</p></div>`,
  },
  {
    id: "p90-d73", day: 73, week: 11, track: "power90",
    title: "Pipeline 3：自动化调度",
    description: "用 cron 或 Prefect 自动化",
    objectives: ["设置 cron", "或跑 Prefect flow"],
    duration: 75,
    cues: ["cron 表达式怎么写？", "如何监控调度健康？"],
    content: `<pre><code># crontab: 每天 11:00 跑预测
0 11 * * * /usr/bin/python /path/to/run.py >> /var/log/power.log 2>&1
</code></pre>
<div class="ex-box"><h4>✏️ 必做</h4><p>设置 cron</p></div>`,
  },
  {
    id: "p90-d74", day: 74, week: 11, track: "power90",
    title: "Pipeline 4：结果可视化仪表盘",
    description: "用 Streamlit 或 Plotly Dash 做仪表盘",
    objectives: ["搭建可视化仪表盘", "实时展示预测和误差"],
    duration: 90,
    cues: ["Streamlit vs Dash？", "仪表盘应展示什么？"],
    content: `<pre><code>import streamlit as st
st.title('电价预测仪表盘')
st.plotly_chart(fig_forecast)
st.metric('今日 MAPE', f'{mape:.2f}%')
</code></pre>
<div class="ex-box"><h4>✏️ 必做</h4><p>搭一个 Streamlit 仪表盘</p></div>`,
  },
  {
    id: "p90-d75", day: 75, week: 11, track: "power90",
    title: "Pipeline 5：API 服务化",
    description: "把预测模型封装成 API",
    objectives: ["用 FastAPI 封装", "实现 /predict 端点"],
    duration: 90,
    cues: ["FastAPI 为什么快？", "如何处理并发？"],
    content: `<pre><code>from fastapi import FastAPI
app = FastAPI()

@app.post('/predict')
def predict(data: PredictRequest):
    features = build_features(data)
    return {'forecast': model.predict(features).tolist()}
</code></pre>
<div class="ex-box"><h4>✏️ 必做</h4><p>实现 /predict 端点，跑通请求</p></div>`,
  },
  {
    id: "p90-d76", day: 76, week: 11, track: "power90",
    title: "回测验证：对比 baseline（naive / persistence）",
    description: "用 persistence 和 naive 做基线，验证主模型的相对优势",
    objectives: [
      "实现 persistence 和 naive baseline",
      "在多个时段对比主模型 vs baseline",
      "画出对比图",
    ],
    duration: 90,
    cues: [
      "persistence baseline 是什么？为什么时序里是强基线？",
      "naive（昨天同时段）baseline 怎么实现？",
      "主模型比 baseline 好多少？",
    ],
    content: `<h3>76.1 两个 baseline</h3>
<pre><code># Persistence：用 t-1 的值预测 t
pred_persistence = df['lmp'].shift(1)

# Naive：用昨天同时段
pred_naive = df['lmp'].shift(24)

# 对比
from sklearn.metrics import mean_absolute_error
mae_persistence = mean_absolute_error(y_te, pred_persistence.loc[y_te.index])
mae_naive = mean_absolute_error(y_te, pred_naive.loc[y_te.index])
mae_model = mean_absolute_error(y_te, y_pred)

print(f'Persistence MAE: {mae_persistence:.2f}')
print(f'Naive MAE: {mae_naive:.2f}')
print(f'Model MAE: {mae_model:.2f}')
</code></pre>

<div class="ex-box"><h4>✏️ Day 76 必做</h4>
<ol>
<li>实现两个 baseline</li>
<li>画对比柱状图</li>
<li>如果主模型没明显优于 baseline，回去调模型</li>
</ol></div>`,
  },
  {
    id: "p90-d77", day: 77, week: 12, track: "power90",
    title: "回测 2：按季节分组",
    description: "按春夏秋冬分别评估",
    objectives: ["季节分组 MAPE", "识别季节性弱点"],
    duration: 75,
    cues: ["哪个季节预测最难？", "为什么？"],
    content: `<p>春（温和）、夏（空调尖峰）、秋（平）、冬（采暖尖峰）。</p>
<div class="ex-box"><h4>✏️ 必做</h4><p>按季节分组回测</p></div>`,
  },
  {
    id: "p90-d78", day: 78, week: 12, track: "power90",
    title: "回测 3：策略收益归因",
    description: "把收益分解到预测精度和策略本身",
    objectives: ["收益归因框架", "区分模型贡献 vs 策略贡献"],
    duration: 75,
    cues: ["收益多少来自预测准？多少来自策略好？", "如何做敏感性分析？"],
    content: `<p>对比：好预测+坏策略 vs 坏预测+好策略 vs 好预测+好策略。</p>
<div class="ex-box"><h4>✏️ 必做</h4><p>做 2x2 归因实验</p></div>`,
  },
  {
    id: "p90-d79", day: 79, week: 12, track: "power90",
    title: "回测 4：交易成本敏感性",
    description: "回测中加入交易成本",
    objectives: ["加交易成本", "评估对收益的影响"],
    duration: 60,
    cues: ["电力市场的「交易成本」是什么？", "对收益影响多大？"],
    content: `<p>成本：偏差考核、辅助服务分摊、网损。</p>
<div class="ex-box"><h4>✏️ 必做</h4><p>加入成本后的净收益</p></div>`,
  },
  {
    id: "p90-d80", day: 80, week: 12, track: "power90",
    title: "第十一周自检 + 回测收尾",
    description: "完成回测阶段",
    objectives: ["完整回测报告", "为风险分析做准备"],
    duration: 60,
    cues: ["回测阶段都完成了什么？", "下一步风险分析怎么做？"],
    content: `<p>回测报告应包含：MAPE 表、对比 baseline、季节分组、收益归因、敏感性。</p>
<div class="ex-box"><h4>✏️ 必做</h4><p>回测报告 v1.0</p></div>`,
  },
  {
    id: "p90-d81", day: 81, week: 12, track: "power90",
    title: "风险分析：极端价格日的策略表现",
    description: "重点分析模型在极端事件（寒潮/热浪/检修）下的表现",
    objectives: [
      "识别历史极端事件日",
      "评估模型在这些日的表现",
      "设计应急模式",
    ],
    duration: 90,
    cues: [
      "极端日的 MAPE 比平均高多少？",
      "策略在极端日的收益/亏损？",
      "如何设计「应急模式」——预测置信度低时降低仓位？",
    ],
    content: `<h3>81.1 极端日识别</h3>
<pre><code># 价格 > P99 的日子
spike_days = df[df['lmp'] > df['lmp'].quantile(0.99)].index.normalize().unique()
# 寒潮/热浪日
extreme_weather_days = df[df['is_cold_wave'] | df['is_heat_wave']].index.normalize().unique()
</code></pre>

<h3>81.2 应急模式设计</h3>
<table>
<tr><th>信号</th><th>动作</th></tr>
<tr><td>预测区间过宽（不确定性高）</td><td>降低报价量</td></tr>
<tr><td>预测为尖峰日</td><td>启动备用策略</td></tr>
<tr><td>NWP 预警极端天气</td><td>提前调整</td></tr>
</table>

<div class="ex-box"><h4>✏️ Day 81 必做</h4>
<ol>
<li>分析极端日模型表现</li>
<li>设计并实现简单的应急模式</li>
</ol></div>`,
  },
  {
    id: "p90-d82", day: 82, week: 12, track: "power90",
    title: "风险 2：黑天鹅事件回测",
    description: "回顾 2021 德州大停电、2022 欧洲能源危机",
    objectives: ["理解黑天鹅", "评估模型在这些事件的表现"],
    duration: 75,
    cues: ["2021 ERCOT 事件中电价涨到多少？", "模型能预测这种事件吗？"],
    content: `<p>2021 年 2 月 ERCOT 电价飙到 9000 美元/MWh 上限。任何模型都难以预测。</p>
<div class="ex-box"><h4>✏️ 必做</h4><p>评估模型在 ERCOT 极端时段的表现</p></div>`,
  },
  {
    id: "p90-d83", day: 83, week: 12, track: "power90",
    title: "风险 3：模型外推风险",
    description: "模型在训练分布外的表现",
    objectives: ["理解 OOD（out-of-distribution）风险", "评估模型外推能力"],
    duration: 75,
    cues: ["电价超过历史最高时模型表现如何？", "如何检测 OOD？"],
    content: `<p>检测：特征值落在训练分布外（如 z-score > 3）。</p>
<div class="ex-box"><h4>✏️ 必做</h4><p>实现 OOD 检测</p></div>`,
  },
  {
    id: "p90-d84", day: 84, week: 12, track: "power90",
    title: "风险 4：对手博弈",
    description: "如果大家都用类似模型，市场会怎么变？",
    objectives: ["理解策略同质化风险", "讨论多元化"],
    duration: 60,
    cues: ["如果 50% 的市场参与者用同一类模型，电价会怎么变？", "如何差异化？"],
    content: `<p>策略同质化 → 反向削弱 alpha。差异化来自：独特数据、独特特征、独特时间尺度。</p>
<div class="ex-box"><h4>✏️ 必做</h4><p>写下你的差异化策略</p></div>`,
  },
  {
    id: "p90-d85", day: 85, week: 12, track: "power90",
    title: "风险 5：合规与监管",
    description: "电力市场的合规要求",
    objectives: ["理解市场规则", "知道操纵市场的红线"],
    duration: 60,
    cues: ["什么是市场操纵？", "AI 策略是否合规？"],
    content: `<p>禁止：虚假报价、虚拟交易、套利操纵。FERC 监管严格。</p>
<div class="ex-box"><h4>✏️ 必做</h4><p>读 1 份 PJM 市场规则摘要</p></div>`,
  },
  {
    id: "p90-d86", day: 86, week: 13, track: "power90",
    title: "成文：策略报告（10-15 页）",
    description: "把整个项目写成一份可读的策略报告",
    objectives: [
      "撰写项目策略报告",
      "包含：背景、数据、方法、结果、风险、未来工作",
      "用图表说话",
    ],
    duration: 120,
    cues: [
      "策略报告的结构？",
      "如何用一张图说清核心结论？",
      "未来工作部分写什么？",
    ],
    content: `<h3>86.1 报告结构（10-15 页）</h3>
<ol>
<li><strong>摘要（1 页）</strong>：核心结论 + 主要数字</li>
<li><strong>背景（1 页）</strong>：电力市场 + 研究问题</li>
<li><strong>数据（2 页）</strong>：来源、时间范围、清洗</li>
<li><strong>方法（3 页）</strong>：模型选型、特征工程、回测框架</li>
<li><strong>结果（3 页）</strong>：MAPE 表、对比图、SHAP</li>
<li><strong>风险分析（2 页）</strong>：极端日、覆盖率、敏感性</li>
<li><strong>未来工作（1 页）</strong>：RL、更细粒度、多市场</li>
</ol>

<div class="ex-box"><h4>✏️ Day 86 必做</h4>
<ol>
<li>写完报告初稿（建议用 Markdown 或 LaTeX）</li>
<li>至少 5 张图（数据、对比、SHAP、回测、风险）</li>
</ol></div>`,
  },
  {
    id: "p90-d87", day: 87, week: 13, track: "power90",
    title: "报告 2：同行评审",
    description: "找同学或社区朋友评审报告",
    objectives: ["完成外部评审", "修改报告"],
    duration: 90,
    cues: ["评审反馈如何？", "哪些需要修改？"],
    content: `<p>找 1-2 个朋友读报告，记录反馈。</p>
<div class="ex-box"><h4>✏️ 必做</h4><p>根据反馈修改</p></div>`,
  },
  {
    id: "p90-d88", day: 88, week: 13, track: "power90",
    title: "代码整理：Git + README + 复现说明",
    description: "整理代码仓库，写复现说明",
    objectives: [
      "整理 Git 仓库结构",
      "写 README.md（数据获取/环境/复现步骤）",
      "清理实验性代码",
    ],
    duration: 90,
    cues: [
      "仓库目录结构怎么组织？",
      "README 应该包含什么？",
      "如何让别人 30 分钟内复现你的结果？",
    ],
    content: `<h3>88.1 仓库结构</h3>
<pre><code>power-market-ai/
├── README.md
├── data/
│   ├── raw/
│   └── processed/
├── src/
│   ├── data_loader.py
│   ├── features.py
│   ├── models/
│   │   ├── xgb_model.py
│   │   ├── lstm_model.py
│   │   └── ensemble.py
│   ├── strategy/
│   └── backtest/
├── notebooks/
│   ├── 01_eda.ipynb
│   ├── 02_baseline.ipynb
│   └── 03_final_report.ipynb
├── reports/
│   └── final_report.pdf
├── requirements.txt
└── pipeline/
    └── run.py
</code></pre>

<div class="ex-box"><h4>✏️ Day 88 必做</h4>
<ol>
<li>整理仓库结构</li>
<li>写 README，确保别人能复现</li>
</ol></div>`,
  },
  {
    id: "p90-d89", day: 89, week: 13, track: "power90",
    title: "终极准备：演示 + 复盘草稿",
    description: "准备一份 10 分钟演示，写复盘草稿",
    objectives: ["准备演示 PPT", "写复盘草稿"],
    duration: 90,
    cues: ["演示的核心三句话？", "复盘要包含什么？"],
    content: `<p>演示结构：问题 → 方法 → 结果 → 反思（10 分钟）。</p>
<div class="ex-box"><h4>✏️ 必做</h4><p>5-8 页 PPT + 500 字复盘草稿</p></div>`,
  },
  {
    id: "p90-d90", day: 90, week: 13, track: "power90",
    title: "🏆 90 天终极交付：复盘 + 下一步",
    description: "完成 90 天学习，做一次深度复盘",
    objectives: [
      "完成 90 天终极交付物",
      "深度复盘：哪些做对了，哪些可以更好",
      "规划下一步学习方向",
    ],
    duration: 120,
    cues: [
      "90 天的验收标准达到了吗？",
      "最大收获是什么？最大教训是什么？",
      "下一步：实盘？读博？换工作？",
    ],
    content: `<h3>90.1 终极交付物（验收标准）</h3>
<div class="bk-box"><h4>🏆 90 天交付清单</h4>
<ul>
<li>✅ <strong>可运行的电价预测系统</strong>（MAPE ≤ 15%，含置信区间）</li>
<li>✅ <strong>竞价策略模块</strong>（基于预测的 Pyomo 优化）</li>
<li>✅ <strong>端到端回测报告</strong>（5 折滚动 + 极端日分析）</li>
<li>✅ <strong>策略报告</strong>（10-15 页 PDF）</li>
<li>✅ <strong>Git 仓库</strong>（README + 复现说明）</li>
</ul></div>

<h3>90.2 复盘模板</h3>
<ol>
<li><strong>做对了什么？</strong>（3-5 条）</li>
<li><strong>如果重来会怎么做？</strong>（3 条）</li>
<li><strong>最大收获？</strong></li>
<li><strong>最大教训？</strong></li>
</ol>

<h3>90.3 下一步选项</h3>
<table>
<tr><th>方向</th><th>适合人群</th></tr>
<tr><td>实盘部署（小型虚拟电厂）</td><td>有产业资源</td></tr>
<tr><td>读顶会论文（IEEE TSG、Applied Energy）</td><td>想读博</td></tr>
<tr><td>参加 Kaggle 能源类比赛</td><td>想刷简历</td></tr>
<tr><td>切入绿电交易/碳市场</td><td>看政策风口</td></tr>
</table>

<div class="ex-box"><h4>🎉 Day 90 终极任务</h4>
<ol>
<li>把终极交付物推到 GitHub Public</li>
<li>写一篇 500 字复盘（可发知乎/公众号）</li>
<li>庆祝 🍾</li>
</ol></div>

<div class="bk-box"><h4>📖 90 天的真正价值</h4>
<p>方案开篇那句话最值得回味：</p>
<p><strong>"90 天后你的验收标准不是'学完了什么'，而是'一个可运行的电价预测 + 竞价策略系统，含回测报告'。倒推每一天该做什么。"</strong></p>
<p>你做到了。</p></div>`,
  },
];

