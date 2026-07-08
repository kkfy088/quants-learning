#!/usr/bin/env python3
"""
Quants Learning Platform → RAG 知识库构建脚本

把 content/*.ts 中的所有内容解析为结构化知识点，输出为 JSONL，
可直接喂给向量数据库（Chroma/Pinecone/Weaviate）或本地 RAG 系统。

每个知识点 = 一个独立可检索的"原子知识单元"，包含：
- title: 知识点标题（独立可理解）
- category / subcategory: 两级分类
- summary: 一句话总结（用于召回后排重/排序）
- key_points: 3-5 个核心要点
- details: 详细讲解（markdown，已从 HTML 清洗）
- code: 相关代码片段（如有）
- source: 来源（track + 章节）
- difficulty: L1/L2/L3
- related: 关联知识点 ID 列表
- common_pitfalls: 常见错误
"""

import re
import json
import hashlib
from pathlib import Path
from typing import Optional

CONTENT_DIR = Path("/Users/fy/WorkBuddy/2026-07-07-14-55-09/content")
OUT_DIR = Path("/Users/fy/WorkBuddy/2026-07-07-14-55-09/rag")
OUT_DIR.mkdir(exist_ok=True)

# ============================================================
# 分类框架（Taxonomy）
# ============================================================
# 基于实际内容设计的两级分类。每个知识点会被归入一个 category + subcategory。
TAXONOMY = {
    "methodology": {
        "label": "核心方法论",
        "subs": {
            "paradigm": "量化决策范式",
            "factor_thinking": "因子思维",
            "evaluation": "IC/ICIR 评估",
            "human_ai_boundary": "人与 AI 的边界",
            "pipeline": "四步法流水线",
        },
    },
    "theory": {
        "label": "理论",
        "subs": {
            "timeseries_fundamentals": "时序基础（平稳性/ACF/PACF）",
            "model_selection": "模型选型决策",
            "overfitting": "过拟合与正则化",
            "backtest": "回测方法论",
            "metrics": "评估指标（MAPE/WAPE/RMSE）",
            "statistics": "统计推断",
            "calibration": "校准估计与不确定性",
            "evpi": "EVPI 与决策价值",
            "bayesian": "贝叶斯方法",
        },
    },
    "tools": {
        "label": "工具与基础",
        "subs": {
            "python_env": "Python 环境",
            "pandas": "pandas 数据处理",
            "numpy": "NumPy 数值计算",
            "sklearn": "scikit-learn",
            "xgboost": "XGBoost",
            "pytorch": "PyTorch",
            "pyomo": "Pyomo 优化建模",
            "gurobi": "Gurobi 求解器",
            "qlib": "微软 Qlib 量化框架",
        },
    },
    "timeseries_models": {
        "label": "时序模型",
        "subs": {
            "arima": "ARIMA / SARIMA",
            "prophet": "Prophet",
            "exp_smoothing": "指数平滑",
            "decomposition": "时序分解",
            "stationarity_test": "平稳性检验（ADF/KPSS）",
        },
    },
    "ml_models": {
        "label": "机器学习模型",
        "subs": {
            "feature_engineering": "特征工程",
            "tree_models": "树模型（XGBoost/LightGBM）",
            "deep_learning": "深度学习（LSTM/Transformer）",
            "ensemble": "集成方法（Stacking/Blending）",
            "explainability": "可解释性（SHAP）",
            "automl": "AutoML",
        },
    },
    "supply_chain": {
        "label": "供应链应用",
        "subs": {
            "demand_forecast": "需求预测",
            "inventory": "库存优化",
            "stockout": "缺货截断处理",
            "promotions": "促销建模",
            "feature_set_scm": "供应链因子集",
        },
    },
    "power_market": {
        "label": "电力市场",
        "subs": {
            "market_structure": "市场结构（中长期/日前/实时/辅助）",
            "clearing": "出清与电价机制",
            "lmp": "节点电价 LMP",
            "renewables": "新能源参与市场",
            "bidding": "报价与竞价策略",
            "settlement": "偏差结算",
            "storage": "储能调度",
            "demand_response": "需求响应 DR",
            "risk": "风险约束（CVaR）",
        },
    },
    "quant_trading": {
        "label": "量化交易",
        "subs": {
            "factor_mining": "因子挖掘",
            "strategy_backtest": "策略回测",
            "portfolio": "投资组合",
            "risk_control": "风控",
            "nlp_sentiment": "NLP 与情绪分析",
        },
    },
    "engineering": {
        "label": "工程化",
        "subs": {
            "agent_framework": "Agent 框架（LangGraph/CrewAI/RD-Agent）",
            "pipeline_dev": "端到端流水线",
            "deployment": "部署与监控",
            "experiment_tracking": "实验管理",
            "api_design": "API 设计",
        },
    },
    "measurement": {
        "label": "测量与决策科学",
        "subs": {
            "calibrated_estimate": "校准估计",
            "sampling": "小样本抽样",
            "value_of_info": "信息价值 EVPI",
            "decision_under_uncertainty": "不确定性下的决策",
            "mcnamara_fallacy": "麦纳玛拉谬误",
        },
    },
}

# ============================================================
# 关键词 → 分类映射规则
# ============================================================
# 用于自动分类。按优先级匹配——第一个命中的分类生效。
CATEGORY_RULES = [
    # 方法论
    (r"量化分析|四步法|范式|人定方向|人机边界|认知地图|方法论", "methodology", "paradigm"),
    (r"因子思维|因子是什么|候选因子|因子集|业务问题.*因子", "methodology", "factor_thinking"),
    (r"\bIC\b|ICIR|信息系数|因子评估|因子.*相关", "methodology", "evaluation"),
    (r"人.*AI.*边界|AI.*接管|手工.*AI|机器跑流程", "methodology", "human_ai_boundary"),
    (r"流水线|pipeline|端到端.*流程", "methodology", "pipeline"),

    # 时序理论
    (r"平稳性|ADF|KPSS|白噪声|差分", "theory", "timeseries_fundamentals"),
    (r"模型选型|选.*模型|数据量.*模型|何时.*用", "theory", "model_selection"),
    (r"过拟合|正则化|偏差.*方差|泛化|train.*test.*gap", "theory", "overfitting"),
    (r"回测|滚动回测|TimeSeriesSplit|walk.forward|样本外", "theory", "backtest"),
    (r"MAPE|WAPE|RMSE|MAE|评估指标|误差", "theory", "metrics"),
    (r"贝叶斯|先验|后验|Bayes", "theory", "bayesian"),
    (r"校准估计|90%置信区间|校准.*估计", "measurement", "calibrated_estimate"),
    (r"EVPI|信息价值|期望信息价值", "measurement", "value_of_info"),
    (r"抽样|小样本|样本量", "measurement", "sampling"),
    (r"麦纳玛拉|McNamara", "measurement", "mcnamara_fallacy"),
    (r"不确定性.*决策|决策.*不确定", "measurement", "decision_under_uncertainty"),

    # 工具
    (r"python.*环境|colab|venv|conda|安装", "tools", "python_env"),
    (r"pandas|DataFrame|read_csv|groupby|resample|shift|rolling", "tools", "pandas"),
    (r"numpy|ndarray|向量化", "tools", "numpy"),
    (r"sklearn|scikit.learn|RandomForest|TimeSeriesSplit", "tools", "sklearn"),
    (r"XGBoost|LightGBM|gradient.boost", "ml_models", "tree_models"),
    (r"pytorch|torch|nn\.Module", "tools", "pytorch"),
    (r"pyomo|ConcreteModel|Variable", "tools", "pyomo"),
    (r"gurobi|gurobipy|求解器", "tools", "gurobi"),
    (r"\bQlib\b|微软.*量化", "tools", "qlib"),

    # 时序模型
    (r"\bARIMA\b|SARIMA|auto.arima|p.*d.*q", "timeseries_models", "arima"),
    (r"\bProphet\b|fbprophet", "timeseries_models", "prophet"),
    (r"指数平滑|Holt.Winters|ETS", "timeseries_models", "exp_smoothing"),
    (r"时序分解|趋势.*季节|decompose|STL", "timeseries_models", "decomposition"),

    # ML
    (r"特征工程|feature.engineering|lag.*feature|rolling.*feature", "ml_models", "feature_engineering"),
    (r"LSTM|Transformer|attention|深度学习.*时序|DeepAR|TCN", "ml_models", "deep_learning"),
    (r"集成|stacking|blending|bagging", "ml_models", "ensemble"),
    (r"SHAP|shapley|可解释|特征重要性", "ml_models", "explainability"),
    (r"AutoML|optuna|hyperopt|网格搜索|贝叶斯优化", "ml_models", "automl"),

    # 供应链
    (r"需求预测|销量预测|demand.forecast", "supply_chain", "demand_forecast"),
    (r"库存|inventory|补货|safety.stock", "supply_chain", "inventory"),
    (r"缺货|stockout|截断|censored", "supply_chain", "stockout"),
    (r"促销|promotion|elasticity|弹性", "supply_chain", "promotions"),

    # 电力市场
    (r"电力市场.*结构|中长期.*日前.*实时|四层.*市场|市场.*层级", "power_market", "market_structure"),
    (r"出清|uniform.clearing|边际机组", "power_market", "clearing"),
    (r"\bLMP\b|节点电价|locational.marginal", "power_market", "lmp"),
    (r"新能源.*市场|风电.*光伏.*参与|保障性收购", "power_market", "renewables"),
    (r"报价|竞价|bidding|报价策略", "power_market", "bidding"),
    (r"偏差结算|偏差.*电量|结算.*罚", "power_market", "settlement"),
    (r"储能|storage.*调度|battery.*schedule", "power_market", "storage"),
    (r"需求响应|\bDR\b.*需求|demand.response", "power_market", "demand_response"),
    (r"CVaR|条件.*风险.*价值|风险约束", "power_market", "risk"),

    # 量化交易
    (r"因子挖掘|factor.mining|RD.Agent", "quant_trading", "factor_mining"),
    (r"策略.*回测|量化.*策略", "quant_trading", "strategy_backtest"),
    (r"投资组合|portfolio|仓位|资金配置", "quant_trading", "portfolio"),
    (r"风控|止损|最大回撤|drawdown", "quant_trading", "risk_control"),
    (r"NLP.*情绪|情绪.*分析|舆情|sentiment", "quant_trading", "nlp_sentiment"),

    # Agent / 工程
    (r"LangGraph|CrewAI|AutoGen|Agent.*框架|多智能体|TradingAgents", "engineering", "agent_framework"),
    (r"端到端|流水线.*开发|run_pipeline|ML.*pipeline", "engineering", "pipeline_dev"),
    (r"部署|FastAPI|监控|drift|model.*serving", "engineering", "deployment"),
    (r"MLflow|实验.*追踪|experiment.*tracking|wandb", "engineering", "experiment_tracking"),
]

# ============================================================
# HTML → Markdown 清洗
# ============================================================
def html_to_markdown(html: str) -> str:
    """把简单 HTML 转成 markdown，便于向量化和阅读"""
    if not html:
        return ""
    s = html
    # 代码块
    s = re.sub(r'<pre><code>(.*?)</code></pre>', lambda m: f"\n```\n{m.group(1)}\n```\n", s, flags=re.DOTALL)
    s = re.sub(r'<code>(.*?)</code>', lambda m: f"`{m.group(1)}`", s)
    # 标题
    s = re.sub(r'<h3>(.*?)</h3>', r'### \1', s)
    s = re.sub(r'<h4>(.*?)</h4>', r'#### \1', s)
    # 引用框
    s = re.sub(r'<div class="(?:quote-box|warn-box|pit-box|tip-box|ex-box)".*?>(.*?)</div>',
               lambda m: f"\n> {m.group(1).strip()}\n", s, flags=re.DOTALL)
    # 列表
    s = re.sub(r'<ol>(.*?)</ol>', lambda m: re.sub(r'<li>', '1. ', m.group(1)), s, flags=re.DOTALL)
    s = re.sub(r'<ul>(.*?)</ul>', lambda m: re.sub(r'<li>', '- ', m.group(1)), s, flags=re.DOTALL)
    s = re.sub(r'</?[uo]l>', '', s)
    s = re.sub(r'</?li>', '', s)
    # 段落和 br
    s = re.sub(r'<br\s*/?>', '\n', s)
    s = re.sub(r'</?p>', '\n', s)
    s = re.sub(r'</?div>', '\n', s)
    s = re.sub(r'</?strong>', '**', s)
    s = re.sub(r'</?em>', '*', s)
    # 链接
    s = re.sub(r'<a[^>]*href="([^"]+)"[^>]*>(.*?)</a>', r'[\2](\1)', s)
    # 清剩余标签
    s = re.sub(r'<[^>]+>', '', s)
    # HTML 实体
    s = s.replace('&nbsp;', ' ').replace('&lt;', '<').replace('&gt;', '>').replace('&amp;', '&').replace('&quot;', '"')
    # 压缩空行
    s = re.sub(r'\n{3,}', '\n\n', s)
    return s.strip()


def extract_code_blocks(html: str) -> str:
    """提取所有 <pre><code> 块，合并返回"""
    blocks = re.findall(r'<pre><code>(.*?)</code></pre>', html, re.DOTALL)
    return "\n\n".join(blocks) if blocks else ""


def classify(title: str, content: str = "") -> tuple[str, str]:
    """根据标题和正文关键词，返回 (category, subcategory)"""
    text = f"{title} {content[:500]}"
    for pattern, cat, sub in CATEGORY_RULES:
        if re.search(pattern, text, re.IGNORECASE):
            return cat, sub
    # 默认归类
    return "methodology", "paradigm"


def make_kp_id(title: str, source: str) -> str:
    """生成稳定的知识点 ID"""
    raw = f"{source}:{title}"
    h = hashlib.md5(raw.encode()).hexdigest()[:8]
    return f"kp-{h}"


def html_to_summary(html: str, max_len: int = 120) -> str:
    """从 HTML 提取纯文本，取前 N 字作为 summary"""
    txt = re.sub(r'<[^>]+>', ' ', html)
    txt = re.sub(r'\s+', ' ', txt).strip()
    if len(txt) <= max_len:
        return txt
    # 在句末截断
    cut = txt[:max_len]
    last_punct = max(cut.rfind('。'), cut.rfind('.'), cut.rfind('；'), cut.rfind(';'))
    if last_punct > max_len // 2:
        return cut[:last_punct + 1]
    return cut + "..."


def split_by_h3_h4(html: str) -> list[tuple[str, int, str]]:
    """
    把一个 day/chapter 的 content 按 h3/h4 拆成独立小节。
    返回 [(title, level, body_html), ...]
    level: 3 或 4
    """
    # 找所有 h3/h4 的位置
    pattern = re.compile(r'<(h[34])>(.*?)</\1>', re.DOTALL)
    matches = list(pattern.finditer(html))
    if not matches:
        return [(title_or_fallback(html), 3, html)]
    sections = []
    for i, m in enumerate(matches):
        level = 3 if m.group(1) == 'h3' else 4
        title = re.sub(r'<[^>]+>', '', m.group(2)).strip()
        start = m.end()
        end = matches[i + 1].start() if i + 1 < len(matches) else len(html)
        body = html[start:end].strip()
        sections.append((title, level, body))
    return sections


def title_or_fallback(html: str) -> str:
    """从 html 提取第一个非空文本作为标题"""
    m = re.search(r'<(?:p|h[1-6]|strong|b)>([^<]+)', html)
    if m:
        return m.group(1).strip()[:60]
    txt = re.sub(r'<[^>]+>', '', html).strip()
    return txt[:60] if txt else "未命名"


# ============================================================
# 解析各内容文件
# ============================================================
def parse_day_based_file(path: Path, source_tag: str) -> list[dict]:
    """
    解析 crash-course.ts / deep-track.ts / track-power90.ts 这类
    按天（day）组织的文件。每个 day 有 cues + content（HTML）。
    """
    txt = path.read_text()
    # 按 day 对象切分（粗略）
    # 匹配 { id: "...", day: N, ..., content: `...`, }
    # 用更宽松的方式：找到所有 "id: " 开头的对象
    day_pattern = re.compile(
        r'\{\s*id:\s*"(?P<id>[^"]+)"[^}]*?'
        r'day:\s*(?P<day>\d+)[^}]*?'
        r'title:\s*"(?P<title>[^"]+)"[^}]*?'
        r'(?:description:\s*"(?P<desc>[^"]*)"[^}]*?)?'
        r'cues:\s*\[(?P<cues>.*?)\][^}]*?'
        r'content:\s*`(?P<content>.*?)`',
        re.DOTALL
    )
    kps = []
    for m in day_pattern.finditer(txt):
        day_id = m.group('id')
        day_num = int(m.group('day'))
        day_title = m.group('title')
        desc = m.group('desc') or ''
        cues_raw = m.group('cues')
        content_html = m.group('content')

        cues = re.findall(r'"([^"]+)"', cues_raw)

        # 把 day 整体作为一个"大知识点"
        # 然后再按 h3/h4 拆成小知识点
        sections = split_by_h3_h4(content_html)

        for sec_title, level, sec_body in sections:
            cat, sub = classify(sec_title, sec_body)
            kp = {
                "id": make_kp_id(sec_title, day_id),
                "title": sec_title,
                "category": cat,
                "subcategory": sub,
                "category_label": TAXONOMY[cat]["label"],
                "subcategory_label": TAXONOMY[cat]["subs"][sub],
                "source": source_tag,
                "source_ref": f"{source_tag}-d{day_num}",
                "source_day": day_num,
                "source_day_title": day_title,
                "difficulty": "L1" if level == 3 else "L2",
                "summary": html_to_summary(sec_body, max_len=140),
                "key_points": extract_key_points(sec_body, cues),
                "details_md": html_to_markdown(sec_body),
                "code": extract_code_blocks(sec_body),
                "related": [],  # 后处理填充
                "common_pitfalls": extract_pitfalls(sec_body),
            }
            kps.append(kp)
    return kps


def extract_key_points(html: str, day_cues: list[str]) -> list[str]:
    """从内容中提取关键要点：优先用 day 的 cues，再用 strong 标签"""
    points = []
    # strong 标签里的内容通常是重点
    strongs = re.findall(r'<strong>(.*?)</strong>', html)
    for s in strongs[:5]:
        clean = re.sub(r'<[^>]+>', '', s).strip()
        if 4 < len(clean) < 80:
            points.append(clean)
    # 如果 strong 不够，用 cues 补
    if len(points) < 3 and day_cues:
        for c in day_cues[:5]:
            if c not in points:
                points.append(c)
    return points[:5] if points else (day_cues[:3] if day_cues else [])


def extract_pitfalls(html: str) -> list[str]:
    """提取 pit-box / warn-box 内容作为常见错误"""
    pitfalls = []
    for cls in ['pit-box', 'warn-box']:
        blocks = re.findall(rf'<div class="{cls}"[^>]*>(.*?)</div>', html, re.DOTALL)
        for b in blocks:
            txt = re.sub(r'<[^>]+>', ' ', b).strip()
            txt = re.sub(r'\s+', ' ', txt)
            if txt:
                pitfalls.append(txt[:200])
    return pitfalls


def parse_book_file(path: Path, source_tag: str) -> list[dict]:
    """解析 book-measure.ts / book-pyqt.ts 的章节结构"""
    txt = path.read_text()
    # book 文件结构：{ id, number, title, keyPoints: [...], excerpt, scm_transfer, exercise, ... }
    ch_pattern = re.compile(
        r'\{\s*id:\s*"(?P<id>[^"]+)"[^}]*?'
        r'number:\s*(?P<num>\d+)[^}]*?'
        r'title:\s*"(?P<title>[^"]+)"[^}]*?'
        r'summary:\s*"(?P<summary>[^"]*)"[^}]*?'
        r'keyPoints:\s*\[(?P<kp>.*?)\][^}]*?'
        r'excerpt:\s*"(?P<excerpt>[^"]*)"[^}]*?'
        r'scmInsight:\s*"(?P<scm>[^"]*)"[^}]*?'
        r'practice:\s*"(?P<ex>[^"]*)"',
        re.DOTALL
    )
    kps = []
    for m in ch_pattern.finditer(txt):
        ch_id = m.group('id')
        ch_num = int(m.group('num'))
        title = m.group('title')
        summary = m.group('summary') or ''
        kp_raw = m.group('kp')
        excerpt = m.group('excerpt')
        scm = m.group('scm')
        exercise = m.group('ex')

        key_points = re.findall(r'"([^"]+)"', kp_raw)

        cat, sub = classify(title, excerpt + scm)

        details = f"**章节摘要**：{summary}\n\n**原文金句**：{excerpt}\n\n**供应链迁移**：{scm}\n\n**练习**：{exercise}"

        kp = {
            "id": make_kp_id(title, ch_id),
            "title": title,
            "category": cat,
            "subcategory": sub,
            "category_label": TAXONOMY[cat]["label"],
            "subcategory_label": TAXONOMY[cat]["subs"][sub],
            "source": source_tag,
            "source_ref": f"{source_tag}-ch{ch_num}",
            "source_chapter": ch_num,
            "difficulty": "L2",
            "summary": summary[:140] if summary else (scm[:140] if scm else excerpt[:140]),
            "key_points": key_points[:5],
            "details_md": details,
            "code": "",
            "related": [],
            "common_pitfalls": [],
            "excerpt": excerpt,
            "scm_transfer": scm,
            "exercise": exercise,
        }
        kps.append(kp)
    return kps


# ============================================================
# 去重 + 关联
# ============================================================
def is_low_quality_kp(kp: dict) -> bool:
    """过滤低质量知识点——这些不值得作为独立 RAG 检索单元"""
    title = kp["title"]
    # 1. 纯练习/思考题（没有独立知识价值）
    if re.match(r'^✏️\s*(Day\s*\d+\s*(必做|思考|决策))', title):
        return True
    if title.startswith(('✏️ ', '📝 ')) and len(title) < 30:
        return True
    # 2. 标题过短（信息量不足）
    if len(title) < 6:
        return True
    # 3. 内容为空或太短
    if len(kp["details_md"]) < 30:
        return True
    # 4. 纯导航/前言
    if title in ('动手任务', '自检', '必做', '今日目标', '今日交付', '阶段总结'):
        return True
    return False


def dedupe(kps: list[dict]) -> list[dict]:
    """标题完全相同的合并（保留信息最全的）"""
    seen = {}
    for kp in kps:
        key = kp["title"]
        if key not in seen:
            seen[key] = kp
        else:
            # 合并：保留更长的 details
            if len(kp["details_md"]) > len(seen[key]["details_md"]):
                kp["source"] = kp["source"] + "+" + seen[key]["source"]
                seen[key] = kp
            else:
                seen[key]["source"] = seen[key]["source"] + "+" + kp["source"]
    return list(seen.values())


def build_relations(kps: list[dict]) -> None:
    """
    给每个知识点找 3-5 个关联：
    - 同 category 同 subcategory 的（强相关）
    - 同 category 不同 subcategory 的（弱相关）
    """
    by_cat_sub = {}
    for kp in kps:
        key = (kp["category"], kp["subcategory"])
        by_cat_sub.setdefault(key, []).append(kp["id"])

    by_cat = {}
    for kp in kps:
        by_cat.setdefault(kp["category"], []).append(kp["id"])

    for kp in kps:
        strong_key = (kp["category"], kp["subcategory"])
        strong = [kid for kid in by_cat_sub.get(strong_key, []) if kid != kp["id"]]
        weak = [kid for kid in by_cat.get(kp["category"], []) if kid != kp["id"] and kid not in strong]
        kp["related"] = (strong[:3] + weak[:2])[:5]


# ============================================================
# 主流程
# ============================================================
def main():
    all_kps = []

    # Day-based 文件
    for fname, tag in [
        ("crash-course.ts", "crash"),
        ("deep-track.ts", "deep"),
        ("track-power90.ts", "power90"),
    ]:
        path = CONTENT_DIR / fname
        if path.exists():
            kps = parse_day_based_file(path, tag)
            print(f"  {fname}: {len(kps)} 知识点")
            all_kps.extend(kps)

    # Book 文件
    for fname, tag in [
        ("book-measure.ts", "book-measure"),
        ("book-pyqt.ts", "book-pyqt"),
    ]:
        path = CONTENT_DIR / fname
        if path.exists():
            kps = parse_book_file(path, tag)
            print(f"  {fname}: {len(kps)} 知识点")
            all_kps.extend(kps)

    print(f"\n解析完成：{len(all_kps)} 个原始知识点")

    # 质量过滤
    before_filter = len(all_kps)
    all_kps = [kp for kp in all_kps if not is_low_quality_kp(kp)]
    print(f"质量过滤：{before_filter} → {len(all_kps)}（剔除 {before_filter - len(all_kps)} 个低质量）")

    # 去重
    before = len(all_kps)
    all_kps = dedupe(all_kps)
    print(f"去重后：{len(all_kps)}（合并 {before - len(all_kps)} 个重复）")

    # 建立关联
    build_relations(all_kps)

    # 统计分类分布
    cat_stats = {}
    for kp in all_kps:
        key = f"{kp['category_label']} / {kp['subcategory_label']}"
        cat_stats[key] = cat_stats.get(key, 0) + 1

    print(f"\n=== 分类分布（{len(cat_stats)} 个子类） ===")
    for k, v in sorted(cat_stats.items(), key=lambda x: -x[1]):
        print(f"  {v:>3}  {k}")

    # 写 JSONL（主输出，每行一个知识点）
    jsonl_path = OUT_DIR / "knowledge_points.jsonl"
    with open(jsonl_path, 'w', encoding='utf-8') as f:
        for kp in all_kps:
            f.write(json.dumps(kp, ensure_ascii=False) + '\n')
    print(f"\n✅ JSONL 已写入：{jsonl_path} ({jsonl_path.stat().st_size / 1024:.1f} KB)")

    # 写 taxonomy 元数据
    tax_path = OUT_DIR / "taxonomy.json"
    tax_data = {
        "version": "1.0",
        "total_kps": len(all_kps),
        "categories": {cat: {"label": v["label"], "subs": v["subs"]}
                       for cat, v in TAXONOMY.items()},
        "distribution": cat_stats,
    }
    with open(tax_path, 'w', encoding='utf-8') as f:
        json.dump(tax_data, f, ensure_ascii=False, indent=2)
    print(f"✅ Taxonomy 已写入：{tax_path}")

    # 写按分类组织的索引（便于人工 review）
    idx_path = OUT_DIR / "index_by_category.md"
    with open(idx_path, 'w', encoding='utf-8') as f:
        f.write("# 知识点索引（按分类）\n\n")
        f.write(f"总计 **{len(all_kps)}** 个知识点\n\n")
        cur_cat = None
        for kp in sorted(all_kps, key=lambda x: (x['category'], x['subcategory'], x['source'])):
            if kp['category_label'] != cur_cat:
                cur_cat = kp['category_label']
                f.write(f"\n## {cur_cat}\n\n")
            f.write(f"- [{kp['title']}]({kp['source_ref']}) `{{cat}}` `{kp['id']}`\n")
            if kp['summary']:
                f.write(f"  - {kp['summary'][:100]}\n")
    print(f"✅ 索引已写入：{idx_path}")


if __name__ == "__main__":
    main()
