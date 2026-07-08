#!/usr/bin/env python3
"""为 RAG 数据生成 README 文档"""
import json
from pathlib import Path

RAG_DIR = Path("/Users/fy/WorkBuddy/2026-07-07-14-55-09/rag")

with open(RAG_DIR / "knowledge_points.jsonl") as f:
    kps = [json.loads(line) for line in f]

cat_agg = {}
for kp in kps:
    cat_agg.setdefault(kp["category"], {"label": kp["category_label"], "subs": set(), "count": 0})
    cat_agg[kp["category"]]["subs"].add(kp["subcategory_label"])
    cat_agg[kp["category"]]["count"] += 1

cat_desc = {
    "methodology": "量化决策范式、因子思维、IC 评估、人机边界——跨场景通用的核心方法论",
    "theory": "时序/ML 理论、过拟合、回测、评估指标、贝叶斯",
    "tools": "Python/pandas/NumPy/sklearn/Pyomo 等工具基础",
    "timeseries_models": "ARIMA/SARIMA/Prophet 等经典时序模型",
    "ml_models": "XGBoost/LSTM/SHAP/AutoML 等 ML 模型",
    "supply_chain": "需求预测、库存、缺货、促销——供应链应用层",
    "power_market": "电力市场结构、LMP、竞价、储能、风险约束",
    "quant_trading": "因子挖掘、策略回测、组合、风控",
    "engineering": "Agent 框架、流水线、部署、实验管理",
    "measurement": "校准估计、EVPI、抽样、不确定性下的决策",
}

lines = []
lines.append("# 知识框架与 RAG 数据说明")
lines.append("")
lines.append("## 一、数据概览")
lines.append("")
lines.append(f"- **知识点总数**：{len(kps)} 个")
lines.append(f"- **分类层级**：{len(cat_agg)} 大类 / {sum(len(v['subs']) for v in cat_agg.values())} 子类")
lines.append("- **数据格式**：JSONL（每行一个 JSON 对象）")
lines.append(f"- **文件大小**：{(RAG_DIR / 'knowledge_points.jsonl').stat().st_size / 1024:.1f} KB")
lines.append("- **来源覆盖**：5 个内容文件（crash / deep / power90 / 2 本书）")
lines.append("")
lines.append("## 二、十大分类框架")
lines.append("")
lines.append("| 大类 | 子类数 | 知识点数 | 说明 |")
lines.append("|------|--------|---------|------|")
for cat, info in sorted(cat_agg.items(), key=lambda x: -x[1]["count"]):
    lines.append(f"| **{info['label']}** | {len(info['subs'])} | {info['count']} | {cat_desc.get(cat, '')} |")
lines.append("")
lines.append("## 三、RAG 数据结构（JSONL 字段说明）")
lines.append("")
lines.append("每个知识点是一个 JSON 对象，字段如下：")
lines.append("")
lines.append("| 字段 | 类型 | 说明 |")
lines.append("|------|------|------|")
lines.append("| `id` | string | 稳定哈希 ID（kp-xxxxxxxx） |")
lines.append("| `title` | string | 知识点标题（独立可理解） |")
lines.append("| `category` | string | 大类 ID（如 methodology） |")
lines.append("| `subcategory` | string | 子类 ID（如 factor_thinking） |")
lines.append("| `category_label` | string | 大类中文名 |")
lines.append("| `subcategory_label` | string | 子类中文名 |")
lines.append("| `source` | string | 来源标签（crash/deep/power90/book-*） |")
lines.append("| `source_ref` | string | 来源引用（如 power90-d1） |")
lines.append("| `difficulty` | string | L1（基础）/ L2（进阶） |")
lines.append("| `summary` | string | 一句话总结（用于召回后排重） |")
lines.append("| `key_points` | string[] | 3-5 个核心要点 |")
lines.append("| `details_md` | string | 详细讲解（Markdown 格式） |")
lines.append("| `code` | string | 相关代码片段（如有） |")
lines.append("| `related` | string[] | 关联知识点 ID 列表（3-5 个） |")
lines.append("| `common_pitfalls` | string[] | 常见错误 |")
lines.append("")
lines.append("## 四、如何使用这份数据")
lines.append("")
lines.append("### 方案 A：直接接入向量数据库（推荐）")
lines.append("")
lines.append("用 Chroma（本地）或 Pinecone（云），每个知识点的 details_md + key_points 作为 embedding 输入。")
lines.append("")
lines.append("### 方案 B：DeepSeek API 直接 RAG")
lines.append("")
lines.append("在量化学习平台的 AI 助手中，把召回的 top-K 知识点 details 注入 system prompt。")
lines.append("")
lines.append("### 方案 C：纯本地搜索（不上向量库）")
lines.append("")
lines.append("用 SQLite FTS5 或简单的关键词倒排索引，适合不想引入向量库的场景。")
lines.append("")
lines.append("## 五、迭代与扩展")
lines.append("")
lines.append("| 场景 | 操作 |")
lines.append("|------|------|")
lines.append("| 新增课程内容 | 修改 content/*.ts，重跑 python scripts/build_rag.py |")
lines.append("| 新增分类 | 编辑 build_rag.py 的 TAXONOMY 和 CATEGORY_RULES |")
lines.append("| 接入新教材 | 在 content/ 加新文件 + 在 build_rag.py 加解析器 |")
lines.append("| 质量问题 | 编辑 is_low_quality_kp() 的过滤规则 |")
lines.append("")
lines.append("---")
lines.append("")
lines.append("## 六、完整分类目录")
lines.append("")

cur_cat = None
cur_sub = None
for kp in sorted(kps, key=lambda x: (x["category"], x["subcategory"], x["source"], x.get("source_day", 0))):
    if kp["category_label"] != cur_cat:
        cur_cat = kp["category_label"]
        cur_sub = None
        lines.append(f"### {cur_cat}")
        lines.append("")
    if kp["subcategory_label"] != cur_sub:
        cur_sub = kp["subcategory_label"]
        lines.append(f"**{cur_sub}**")
        lines.append("")
    src_day = kp.get("source_day")
    src_ref = f"D{src_day}" if src_day else kp.get("source_ref", "")
    lines.append(f"- `{kp['id']}` [{kp['source']}/{src_ref}] {kp['title']}")

(RAG_DIR / "README.md").write_text("\n".join(lines))
print(f"README.md written, {len(lines)} lines")
print(f"Knowledge points: {len(kps)}")
