/*
 * data.js — 示例数据（单一数据源，轻量虚构，用于演示与测试）
 *
 * schema 与插件 treemap.js 完全兼容：
 *   { meta: { lastDate, stocksEvaluated, categories, concepts },
 *     categories: [{ name, n, up, evalN, avgPct, leader: {code,name,pct}, concepts: [...] }] }
 *
 * 数据自洽（可通过 audit/audit.js 全部 12 项检查）：
 *   大类 n/up/evalN == Σ 子概念；avgPct == Σ(子概念 avgPct×n)/Σn（两位小数舍入）；
 *   大类 leader 必为某子概念 leader；Σ n == meta.stocksEvaluated；code 全局唯一。
 *   口径：18 大类 · 180 子概念 · 1968 只个股。
 *
 * 浏览器：<script src="data.js"> → window.HEATMAP_DATA
 * Node：  require('./data.js')
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.HEATMAP_DATA = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';
  return {
  "meta": {
    "lastDate": "2026-10-23",
    "stocksEvaluated": 1968,
    "categories": 18,
    "concepts": 180,
    "note": "示例数据（虚构，仅用于演示插件与回归测试，非真实行情）"
  },
  "categories": [
    {
      "name": "软件开发",
      "n": 185,
      "up": 97,
      "evalN": 185,
      "avgPct": 0.62,
      "leader": {
        "code": "S0012",
        "name": "示例区块新材",
        "pct": 10.94
      },
      "concepts": [
        {
          "code": "BK001",
          "name": "工业软件",
          "n": 7,
          "up": 4,
          "evalN": 7,
          "avgPct": 2.27,
          "leader": {
            "code": "S0001",
            "name": "示例工业集团",
            "pct": 6.51
          }
        },
        {
          "code": "BK002",
          "name": "金融科技",
          "n": 17,
          "up": 10,
          "evalN": 17,
          "avgPct": 1.09,
          "leader": {
            "code": "S0002",
            "name": "示例金融股份",
            "pct": 6.02
          }
        },
        {
          "code": "BK003",
          "name": "信创",
          "n": 14,
          "up": 8,
          "evalN": 14,
          "avgPct": 0.77,
          "leader": {
            "code": "S0003",
            "name": "示例信创电子",
            "pct": 4.65
          }
        },
        {
          "code": "BK004",
          "name": "云计算",
          "n": 11,
          "up": 10,
          "evalN": 11,
          "avgPct": -3.15,
          "leader": {
            "code": "S0004",
            "name": "示例云计新材",
            "pct": 3.89
          }
        },
        {
          "code": "BK005",
          "name": "人工智能",
          "n": 13,
          "up": 7,
          "evalN": 13,
          "avgPct": 2.13,
          "leader": {
            "code": "S0005",
            "name": "示例人工控股",
            "pct": 7.2
          }
        },
        {
          "code": "BK006",
          "name": "网络安全",
          "n": 18,
          "up": 1,
          "evalN": 18,
          "avgPct": 0.82,
          "leader": {
            "code": "S0006",
            "name": "示例网络智造",
            "pct": 8.99
          }
        },
        {
          "code": "BK007",
          "name": "操作系统",
          "n": 12,
          "up": 5,
          "evalN": 12,
          "avgPct": -4.63,
          "leader": {
            "code": "S0007",
            "name": "示例操作实业",
            "pct": -0.4
          }
        },
        {
          "code": "BK008",
          "name": "中间件",
          "n": 10,
          "up": 7,
          "evalN": 10,
          "avgPct": 4.48,
          "leader": {
            "code": "S0008",
            "name": "示例中间科技",
            "pct": 9.61
          }
        },
        {
          "code": "BK009",
          "name": "ERP",
          "n": 16,
          "up": 15,
          "evalN": 16,
          "avgPct": -5.83,
          "leader": {
            "code": "S0009",
            "name": "示例ER集团",
            "pct": -5.04
          }
        },
        {
          "code": "BK010",
          "name": "医疗信息化",
          "n": 18,
          "up": 3,
          "evalN": 18,
          "avgPct": 4.1,
          "leader": {
            "code": "S0010",
            "name": "示例医疗股份",
            "pct": 9.67
          }
        },
        {
          "code": "BK011",
          "name": "车用软件",
          "n": 3,
          "up": 3,
          "evalN": 3,
          "avgPct": -2.69,
          "leader": {
            "code": "S0011",
            "name": "示例车用电子",
            "pct": 2.47
          }
        },
        {
          "code": "BK012",
          "name": "区块链",
          "n": 14,
          "up": 8,
          "evalN": 14,
          "avgPct": 3.59,
          "leader": {
            "code": "S0012",
            "name": "示例区块新材",
            "pct": 10.94
          }
        },
        {
          "code": "BK013",
          "name": "大数据",
          "n": 17,
          "up": 15,
          "evalN": 17,
          "avgPct": 4.92,
          "leader": {
            "code": "S0013",
            "name": "示例大数控股",
            "pct": 6.24
          }
        },
        {
          "code": "BK014",
          "name": "空间信息",
          "n": 15,
          "up": 1,
          "evalN": 15,
          "avgPct": -2.24,
          "leader": {
            "code": "S0014",
            "name": "示例空间智造",
            "pct": -1.6
          }
        }
      ]
    },
    {
      "name": "半导体",
      "n": 108,
      "up": 49,
      "evalN": 108,
      "avgPct": -0.68,
      "leader": {
        "code": "S0025",
        "name": "示例第三集团",
        "pct": 11.95
      },
      "concepts": [
        {
          "code": "BK015",
          "name": "芯片设计",
          "n": 10,
          "up": 5,
          "evalN": 10,
          "avgPct": -1.5,
          "leader": {
            "code": "S0015",
            "name": "示例芯片实业",
            "pct": 4.86
          }
        },
        {
          "code": "BK016",
          "name": "晶圆代工",
          "n": 8,
          "up": 5,
          "evalN": 8,
          "avgPct": -5.79,
          "leader": {
            "code": "S0016",
            "name": "示例晶圆科技",
            "pct": -1.1
          }
        },
        {
          "code": "BK017",
          "name": "封测",
          "n": 15,
          "up": 2,
          "evalN": 15,
          "avgPct": -1.09,
          "leader": {
            "code": "S0017",
            "name": "示例封测集团",
            "pct": 1.49
          }
        },
        {
          "code": "BK018",
          "name": "存储芯片",
          "n": 9,
          "up": 6,
          "evalN": 9,
          "avgPct": -4.03,
          "leader": {
            "code": "S0018",
            "name": "示例存储股份",
            "pct": 3.48
          }
        },
        {
          "code": "BK019",
          "name": "功率半导体",
          "n": 10,
          "up": 5,
          "evalN": 10,
          "avgPct": 5.44,
          "leader": {
            "code": "S0019",
            "name": "示例功率电子",
            "pct": 10.67
          }
        },
        {
          "code": "BK020",
          "name": "模拟芯片",
          "n": 7,
          "up": 2,
          "evalN": 7,
          "avgPct": -2.64,
          "leader": {
            "code": "S0020",
            "name": "示例模拟新材",
            "pct": 0.35
          }
        },
        {
          "code": "BK021",
          "name": "半导体设备",
          "n": 9,
          "up": 2,
          "evalN": 9,
          "avgPct": -4.44,
          "leader": {
            "code": "S0021",
            "name": "示例半导控股",
            "pct": 1.51
          }
        },
        {
          "code": "BK022",
          "name": "半导体材料",
          "n": 5,
          "up": 1,
          "evalN": 5,
          "avgPct": 4.28,
          "leader": {
            "code": "S0022",
            "name": "示例半导智造",
            "pct": 8.11
          }
        },
        {
          "code": "BK023",
          "name": "EDA",
          "n": 9,
          "up": 0,
          "evalN": 9,
          "avgPct": 1.61,
          "leader": {
            "code": "S0023",
            "name": "示例ED实业",
            "pct": 8.93
          }
        },
        {
          "code": "BK024",
          "name": "光刻胶",
          "n": 7,
          "up": 5,
          "evalN": 7,
          "avgPct": -5.46,
          "leader": {
            "code": "S0024",
            "name": "示例光刻科技",
            "pct": -3.09
          }
        },
        {
          "code": "BK025",
          "name": "第三代半导体",
          "n": 8,
          "up": 7,
          "evalN": 8,
          "avgPct": 6.37,
          "leader": {
            "code": "S0025",
            "name": "示例第三集团",
            "pct": 11.95
          }
        },
        {
          "code": "BK026",
          "name": "芯片IP",
          "n": 11,
          "up": 9,
          "evalN": 11,
          "avgPct": -0.33,
          "leader": {
            "code": "S0026",
            "name": "示例芯片股份",
            "pct": 2.65
          }
        }
      ]
    },
    {
      "name": "通用设备",
      "n": 138,
      "up": 64,
      "evalN": 138,
      "avgPct": 0.96,
      "leader": {
        "code": "S0031",
        "name": "示例激光实业",
        "pct": 12.53
      },
      "concepts": [
        {
          "code": "BK027",
          "name": "工程机械",
          "n": 18,
          "up": 5,
          "evalN": 18,
          "avgPct": 0.28,
          "leader": {
            "code": "S0027",
            "name": "示例工程电子",
            "pct": 7.21
          }
        },
        {
          "code": "BK028",
          "name": "自动化设备",
          "n": 5,
          "up": 5,
          "evalN": 5,
          "avgPct": -5.86,
          "leader": {
            "code": "S0028",
            "name": "示例自动新材",
            "pct": 1.17
          }
        },
        {
          "code": "BK029",
          "name": "机床",
          "n": 14,
          "up": 6,
          "evalN": 14,
          "avgPct": 4.35,
          "leader": {
            "code": "S0029",
            "name": "示例机床控股",
            "pct": 10.23
          }
        },
        {
          "code": "BK030",
          "name": "工业机器人",
          "n": 6,
          "up": 3,
          "evalN": 6,
          "avgPct": -0.86,
          "leader": {
            "code": "S0030",
            "name": "示例工业智造",
            "pct": 1.21
          }
        },
        {
          "code": "BK031",
          "name": "激光设备",
          "n": 17,
          "up": 16,
          "evalN": 17,
          "avgPct": 5.67,
          "leader": {
            "code": "S0031",
            "name": "示例激光实业",
            "pct": 12.53
          }
        },
        {
          "code": "BK032",
          "name": "轨交装备",
          "n": 6,
          "up": 3,
          "evalN": 6,
          "avgPct": 1.37,
          "leader": {
            "code": "S0032",
            "name": "示例轨交科技",
            "pct": 6.56
          }
        },
        {
          "code": "BK033",
          "name": "制冷设备",
          "n": 15,
          "up": 7,
          "evalN": 15,
          "avgPct": -0.52,
          "leader": {
            "code": "S0033",
            "name": "示例制冷集团",
            "pct": 2.97
          }
        },
        {
          "code": "BK034",
          "name": "楼宇设备",
          "n": 15,
          "up": 2,
          "evalN": 15,
          "avgPct": 1.34,
          "leader": {
            "code": "S0034",
            "name": "示例楼宇股份",
            "pct": 6.75
          }
        },
        {
          "code": "BK035",
          "name": "农业机械",
          "n": 3,
          "up": 2,
          "evalN": 3,
          "avgPct": -5.17,
          "leader": {
            "code": "S0035",
            "name": "示例农业电子",
            "pct": 1.82
          }
        },
        {
          "code": "BK036",
          "name": "包装机械",
          "n": 18,
          "up": 6,
          "evalN": 18,
          "avgPct": 4.76,
          "leader": {
            "code": "S0036",
            "name": "示例包装新材",
            "pct": 6.56
          }
        },
        {
          "code": "BK037",
          "name": "3C设备",
          "n": 18,
          "up": 9,
          "evalN": 18,
          "avgPct": -5.51,
          "leader": {
            "code": "S0037",
            "name": "示例3C控股",
            "pct": 2.8
          }
        },
        {
          "code": "BK038",
          "name": "锂电设备",
          "n": 3,
          "up": 0,
          "evalN": 3,
          "avgPct": 4.18,
          "leader": {
            "code": "S0038",
            "name": "示例锂电智造",
            "pct": 6.27
          }
        }
      ]
    },
    {
      "name": "医药",
      "n": 115,
      "up": 48,
      "evalN": 115,
      "avgPct": -0.07,
      "leader": {
        "code": "S0044",
        "name": "示例医疗新材",
        "pct": 8.36
      },
      "concepts": [
        {
          "code": "BK039",
          "name": "创新药",
          "n": 12,
          "up": 2,
          "evalN": 12,
          "avgPct": 1.94,
          "leader": {
            "code": "S0039",
            "name": "示例创新实业",
            "pct": 2.48
          }
        },
        {
          "code": "BK040",
          "name": "化学制药",
          "n": 15,
          "up": 6,
          "evalN": 15,
          "avgPct": -4.19,
          "leader": {
            "code": "S0040",
            "name": "示例化学科技",
            "pct": 1.27
          }
        },
        {
          "code": "BK041",
          "name": "中药",
          "n": 7,
          "up": 2,
          "evalN": 7,
          "avgPct": -0.08,
          "leader": {
            "code": "S0041",
            "name": "示例中药集团",
            "pct": 2.58
          }
        },
        {
          "code": "BK042",
          "name": "生物疫苗",
          "n": 3,
          "up": 1,
          "evalN": 3,
          "avgPct": -1.81,
          "leader": {
            "code": "S0042",
            "name": "示例生物股份",
            "pct": 1.63
          }
        },
        {
          "code": "BK043",
          "name": "CXO",
          "n": 3,
          "up": 0,
          "evalN": 3,
          "avgPct": -2.66,
          "leader": {
            "code": "S0043",
            "name": "示例CX电子",
            "pct": 5.21
          }
        },
        {
          "code": "BK044",
          "name": "医疗器械",
          "n": 15,
          "up": 1,
          "evalN": 15,
          "avgPct": 3.11,
          "leader": {
            "code": "S0044",
            "name": "示例医疗新材",
            "pct": 8.36
          }
        },
        {
          "code": "BK045",
          "name": "医疗服务",
          "n": 5,
          "up": 1,
          "evalN": 5,
          "avgPct": -1.24,
          "leader": {
            "code": "S0045",
            "name": "示例医疗控股",
            "pct": 4.76
          }
        },
        {
          "code": "BK046",
          "name": "医药商业",
          "n": 16,
          "up": 11,
          "evalN": 16,
          "avgPct": 5.97,
          "leader": {
            "code": "S0046",
            "name": "示例医药智造",
            "pct": 7.21
          }
        },
        {
          "code": "BK047",
          "name": "血制品",
          "n": 8,
          "up": 4,
          "evalN": 8,
          "avgPct": -3.5,
          "leader": {
            "code": "S0047",
            "name": "示例血制实业",
            "pct": -2.3
          }
        },
        {
          "code": "BK048",
          "name": "眼科",
          "n": 18,
          "up": 13,
          "evalN": 18,
          "avgPct": -5.97,
          "leader": {
            "code": "S0048",
            "name": "示例眼科科技",
            "pct": -4.05
          }
        },
        {
          "code": "BK049",
          "name": "口腔",
          "n": 13,
          "up": 7,
          "evalN": 13,
          "avgPct": 3.44,
          "leader": {
            "code": "S0049",
            "name": "示例口腔集团",
            "pct": 6.08
          }
        }
      ]
    },
    {
      "name": "银行",
      "n": 111,
      "up": 77,
      "evalN": 111,
      "avgPct": 0.61,
      "leader": {
        "code": "S0058",
        "name": "示例金融股份",
        "pct": 11.56
      },
      "concepts": [
        {
          "code": "BK050",
          "name": "国有大行",
          "n": 13,
          "up": 11,
          "evalN": 13,
          "avgPct": 1.03,
          "leader": {
            "code": "S0050",
            "name": "示例国有股份",
            "pct": 4.88
          }
        },
        {
          "code": "BK051",
          "name": "股份行",
          "n": 5,
          "up": 0,
          "evalN": 5,
          "avgPct": -3.74,
          "leader": {
            "code": "S0051",
            "name": "示例股份电子",
            "pct": -2.84
          }
        },
        {
          "code": "BK052",
          "name": "城商行",
          "n": 5,
          "up": 1,
          "evalN": 5,
          "avgPct": 3.13,
          "leader": {
            "code": "S0052",
            "name": "示例城商新材",
            "pct": 4
          }
        },
        {
          "code": "BK053",
          "name": "农商行",
          "n": 14,
          "up": 11,
          "evalN": 14,
          "avgPct": -3.04,
          "leader": {
            "code": "S0053",
            "name": "示例农商控股",
            "pct": -0.76
          }
        },
        {
          "code": "BK054",
          "name": "区域行",
          "n": 17,
          "up": 15,
          "evalN": 17,
          "avgPct": 1.79,
          "leader": {
            "code": "S0054",
            "name": "示例区域智造",
            "pct": 3.05
          }
        },
        {
          "code": "BK055",
          "name": "普惠金融",
          "n": 6,
          "up": 4,
          "evalN": 6,
          "avgPct": -1.03,
          "leader": {
            "code": "S0055",
            "name": "示例普惠实业",
            "pct": 0.34
          }
        },
        {
          "code": "BK056",
          "name": "财富管理",
          "n": 12,
          "up": 10,
          "evalN": 12,
          "avgPct": -1.79,
          "leader": {
            "code": "S0056",
            "name": "示例财富科技",
            "pct": 2.25
          }
        },
        {
          "code": "BK057",
          "name": "支付结算",
          "n": 18,
          "up": 10,
          "evalN": 18,
          "avgPct": 0.53,
          "leader": {
            "code": "S0057",
            "name": "示例支付集团",
            "pct": 6.8
          }
        },
        {
          "code": "BK058",
          "name": "金融租赁",
          "n": 7,
          "up": 2,
          "evalN": 7,
          "avgPct": 4.14,
          "leader": {
            "code": "S0058",
            "name": "示例金融股份",
            "pct": 11.56
          }
        },
        {
          "code": "BK059",
          "name": "资管",
          "n": 8,
          "up": 7,
          "evalN": 8,
          "avgPct": 4.55,
          "leader": {
            "code": "S0059",
            "name": "示例资管电子",
            "pct": 5.17
          }
        },
        {
          "code": "BK060",
          "name": "跨境金融",
          "n": 6,
          "up": 6,
          "evalN": 6,
          "avgPct": 3.7,
          "leader": {
            "code": "S0060",
            "name": "示例跨境新材",
            "pct": 6.91
          }
        }
      ]
    },
    {
      "name": "电力",
      "n": 94,
      "up": 37,
      "evalN": 94,
      "avgPct": 0.36,
      "leader": {
        "code": "S0063",
        "name": "示例火电实业",
        "pct": 13.98
      },
      "concepts": [
        {
          "code": "BK061",
          "name": "电网设备",
          "n": 13,
          "up": 4,
          "evalN": 13,
          "avgPct": 2.63,
          "leader": {
            "code": "S0061",
            "name": "示例电网控股",
            "pct": 6.34
          }
        },
        {
          "code": "BK062",
          "name": "水电",
          "n": 5,
          "up": 3,
          "evalN": 5,
          "avgPct": 6.89,
          "leader": {
            "code": "S0062",
            "name": "示例水电智造",
            "pct": 11.46
          }
        },
        {
          "code": "BK063",
          "name": "火电",
          "n": 5,
          "up": 4,
          "evalN": 5,
          "avgPct": 6.32,
          "leader": {
            "code": "S0063",
            "name": "示例火电实业",
            "pct": 13.98
          }
        },
        {
          "code": "BK064",
          "name": "核电",
          "n": 15,
          "up": 2,
          "evalN": 15,
          "avgPct": -0.57,
          "leader": {
            "code": "S0064",
            "name": "示例核电科技",
            "pct": 7.22
          }
        },
        {
          "code": "BK065",
          "name": "风电运营",
          "n": 14,
          "up": 2,
          "evalN": 14,
          "avgPct": -3.33,
          "leader": {
            "code": "S0065",
            "name": "示例风电集团",
            "pct": -1.93
          }
        },
        {
          "code": "BK066",
          "name": "光伏运营",
          "n": 4,
          "up": 1,
          "evalN": 4,
          "avgPct": -3.78,
          "leader": {
            "code": "S0066",
            "name": "示例光伏股份",
            "pct": 2.34
          }
        },
        {
          "code": "BK067",
          "name": "虚拟电厂",
          "n": 12,
          "up": 2,
          "evalN": 12,
          "avgPct": -3.09,
          "leader": {
            "code": "S0067",
            "name": "示例虚拟电子",
            "pct": 0.14
          }
        },
        {
          "code": "BK068",
          "name": "储能",
          "n": 7,
          "up": 6,
          "evalN": 7,
          "avgPct": 5.51,
          "leader": {
            "code": "S0068",
            "name": "示例储能新材",
            "pct": 12.42
          }
        },
        {
          "code": "BK069",
          "name": "特高压",
          "n": 5,
          "up": 3,
          "evalN": 5,
          "avgPct": -0.65,
          "leader": {
            "code": "S0069",
            "name": "示例特高控股",
            "pct": -0.1
          }
        },
        {
          "code": "BK070",
          "name": "智能电表",
          "n": 14,
          "up": 10,
          "evalN": 14,
          "avgPct": 0.42,
          "leader": {
            "code": "S0070",
            "name": "示例智能智造",
            "pct": 2.33
          }
        }
      ]
    },
    {
      "name": "汽车",
      "n": 123,
      "up": 58,
      "evalN": 123,
      "avgPct": 0.64,
      "leader": {
        "code": "S0079",
        "name": "示例充电实业",
        "pct": 14.47
      },
      "concepts": [
        {
          "code": "BK071",
          "name": "整车",
          "n": 8,
          "up": 1,
          "evalN": 8,
          "avgPct": 4.47,
          "leader": {
            "code": "S0071",
            "name": "示例整车实业",
            "pct": 11.87
          }
        },
        {
          "code": "BK072",
          "name": "乘用车",
          "n": 17,
          "up": 3,
          "evalN": 17,
          "avgPct": -5.28,
          "leader": {
            "code": "S0072",
            "name": "示例乘用科技",
            "pct": -1.47
          }
        },
        {
          "code": "BK073",
          "name": "商用车",
          "n": 17,
          "up": 7,
          "evalN": 17,
          "avgPct": 5.58,
          "leader": {
            "code": "S0073",
            "name": "示例商用集团",
            "pct": 13.29
          }
        },
        {
          "code": "BK074",
          "name": "新能源车",
          "n": 18,
          "up": 7,
          "evalN": 18,
          "avgPct": 1.42,
          "leader": {
            "code": "S0074",
            "name": "示例新能股份",
            "pct": 6.67
          }
        },
        {
          "code": "BK075",
          "name": "汽车零部件",
          "n": 6,
          "up": 3,
          "evalN": 6,
          "avgPct": -1.44,
          "leader": {
            "code": "S0075",
            "name": "示例汽车电子",
            "pct": 6.65
          }
        },
        {
          "code": "BK076",
          "name": "汽车电子",
          "n": 3,
          "up": 3,
          "evalN": 3,
          "avgPct": 6.78,
          "leader": {
            "code": "S0076",
            "name": "示例汽车新材",
            "pct": 9.26
          }
        },
        {
          "code": "BK077",
          "name": "智能驾驶",
          "n": 17,
          "up": 15,
          "evalN": 17,
          "avgPct": -3.36,
          "leader": {
            "code": "S0077",
            "name": "示例智能控股",
            "pct": 2.44
          }
        },
        {
          "code": "BK078",
          "name": "车联网",
          "n": 8,
          "up": 7,
          "evalN": 8,
          "avgPct": -3.97,
          "leader": {
            "code": "S0078",
            "name": "示例车联智造",
            "pct": 1.76
          }
        },
        {
          "code": "BK079",
          "name": "充电桩",
          "n": 17,
          "up": 9,
          "evalN": 17,
          "avgPct": 6.7,
          "leader": {
            "code": "S0079",
            "name": "示例充电实业",
            "pct": 14.47
          }
        },
        {
          "code": "BK080",
          "name": "摩托车",
          "n": 12,
          "up": 3,
          "evalN": 12,
          "avgPct": -2.08,
          "leader": {
            "code": "S0080",
            "name": "示例摩托科技",
            "pct": -0.01
          }
        }
      ]
    },
    {
      "name": "食品饮料",
      "n": 119,
      "up": 53,
      "evalN": 119,
      "avgPct": 1.68,
      "leader": {
        "code": "S0085",
        "name": "示例休闲控股",
        "pct": 8.29
      },
      "concepts": [
        {
          "code": "BK081",
          "name": "白酒",
          "n": 13,
          "up": 2,
          "evalN": 13,
          "avgPct": 1.82,
          "leader": {
            "code": "S0081",
            "name": "示例白酒集团",
            "pct": 4.71
          }
        },
        {
          "code": "BK082",
          "name": "啤酒",
          "n": 4,
          "up": 4,
          "evalN": 4,
          "avgPct": 2.58,
          "leader": {
            "code": "S0082",
            "name": "示例啤酒股份",
            "pct": 4.66
          }
        },
        {
          "code": "BK083",
          "name": "乳制品",
          "n": 3,
          "up": 3,
          "evalN": 3,
          "avgPct": -1.03,
          "leader": {
            "code": "S0083",
            "name": "示例乳制电子",
            "pct": 6.45
          }
        },
        {
          "code": "BK084",
          "name": "调味品",
          "n": 10,
          "up": 7,
          "evalN": 10,
          "avgPct": 2.65,
          "leader": {
            "code": "S0084",
            "name": "示例调味新材",
            "pct": 5.05
          }
        },
        {
          "code": "BK085",
          "name": "休闲食品",
          "n": 15,
          "up": 3,
          "evalN": 15,
          "avgPct": 2.64,
          "leader": {
            "code": "S0085",
            "name": "示例休闲控股",
            "pct": 8.29
          }
        },
        {
          "code": "BK086",
          "name": "速冻食品",
          "n": 17,
          "up": 8,
          "evalN": 17,
          "avgPct": 2.8,
          "leader": {
            "code": "S0086",
            "name": "示例速冻智造",
            "pct": 8.16
          }
        },
        {
          "code": "BK087",
          "name": "饮料",
          "n": 12,
          "up": 6,
          "evalN": 12,
          "avgPct": -1.81,
          "leader": {
            "code": "S0087",
            "name": "示例饮料实业",
            "pct": -0.95
          }
        },
        {
          "code": "BK088",
          "name": "保健品",
          "n": 12,
          "up": 3,
          "evalN": 12,
          "avgPct": 1.71,
          "leader": {
            "code": "S0088",
            "name": "示例保健科技",
            "pct": 5.17
          }
        },
        {
          "code": "BK089",
          "name": "预制菜",
          "n": 17,
          "up": 3,
          "evalN": 17,
          "avgPct": 0.1,
          "leader": {
            "code": "S0089",
            "name": "示例预制集团",
            "pct": 4.12
          }
        },
        {
          "code": "BK090",
          "name": "烘焙",
          "n": 16,
          "up": 14,
          "evalN": 16,
          "avgPct": 3.44,
          "leader": {
            "code": "S0090",
            "name": "示例烘焙股份",
            "pct": 6.27
          }
        }
      ]
    },
    {
      "name": "电子元件",
      "n": 93,
      "up": 46,
      "evalN": 93,
      "avgPct": -1.73,
      "leader": {
        "code": "S0092",
        "name": "示例消费新材",
        "pct": 7.35
      },
      "concepts": [
        {
          "code": "BK091",
          "name": "PCB",
          "n": 10,
          "up": 6,
          "evalN": 10,
          "avgPct": -5.41,
          "leader": {
            "code": "S0091",
            "name": "示例PC电子",
            "pct": -0.57
          }
        },
        {
          "code": "BK092",
          "name": "消费电子",
          "n": 14,
          "up": 1,
          "evalN": 14,
          "avgPct": 6.14,
          "leader": {
            "code": "S0092",
            "name": "示例消费新材",
            "pct": 7.35
          }
        },
        {
          "code": "BK093",
          "name": "面板",
          "n": 6,
          "up": 5,
          "evalN": 6,
          "avgPct": -5.26,
          "leader": {
            "code": "S0093",
            "name": "示例面板控股",
            "pct": -1.89
          }
        },
        {
          "code": "BK094",
          "name": "被动元件",
          "n": 4,
          "up": 4,
          "evalN": 4,
          "avgPct": 0.24,
          "leader": {
            "code": "S0094",
            "name": "示例被动智造",
            "pct": 3.21
          }
        },
        {
          "code": "BK095",
          "name": "连接器",
          "n": 8,
          "up": 3,
          "evalN": 8,
          "avgPct": -0.4,
          "leader": {
            "code": "S0095",
            "name": "示例连接实业",
            "pct": 1.71
          }
        },
        {
          "code": "BK096",
          "name": "声学",
          "n": 3,
          "up": 1,
          "evalN": 3,
          "avgPct": -3.89,
          "leader": {
            "code": "S0096",
            "name": "示例声学科技",
            "pct": 2.21
          }
        },
        {
          "code": "BK097",
          "name": "摄像模组",
          "n": 16,
          "up": 11,
          "evalN": 16,
          "avgPct": -3.4,
          "leader": {
            "code": "S0097",
            "name": "示例摄像集团",
            "pct": 4.9
          }
        },
        {
          "code": "BK098",
          "name": "LED",
          "n": 8,
          "up": 2,
          "evalN": 8,
          "avgPct": -0.22,
          "leader": {
            "code": "S0098",
            "name": "示例LE股份",
            "pct": 6.86
          }
        },
        {
          "code": "BK099",
          "name": "智能穿戴",
          "n": 14,
          "up": 10,
          "evalN": 14,
          "avgPct": -2.51,
          "leader": {
            "code": "S0099",
            "name": "示例智能电子",
            "pct": -1.62
          }
        },
        {
          "code": "BK100",
          "name": "半导体分销",
          "n": 10,
          "up": 3,
          "evalN": 10,
          "avgPct": -5.56,
          "leader": {
            "code": "S0100",
            "name": "示例半导新材",
            "pct": -0.29
          }
        }
      ]
    },
    {
      "name": "有色金属",
      "n": 108,
      "up": 49,
      "evalN": 108,
      "avgPct": 0.77,
      "leader": {
        "code": "S0108",
        "name": "示例镍新材",
        "pct": 14.27
      },
      "concepts": [
        {
          "code": "BK101",
          "name": "铜",
          "n": 14,
          "up": 7,
          "evalN": 14,
          "avgPct": -2.63,
          "leader": {
            "code": "S0101",
            "name": "示例铜控股",
            "pct": 2.55
          }
        },
        {
          "code": "BK102",
          "name": "铝",
          "n": 15,
          "up": 1,
          "evalN": 15,
          "avgPct": -4.15,
          "leader": {
            "code": "S0102",
            "name": "示例铝智造",
            "pct": -1.02
          }
        },
        {
          "code": "BK103",
          "name": "锂",
          "n": 7,
          "up": 1,
          "evalN": 7,
          "avgPct": -0.19,
          "leader": {
            "code": "S0103",
            "name": "示例锂实业",
            "pct": 7.57
          }
        },
        {
          "code": "BK104",
          "name": "钴",
          "n": 17,
          "up": 13,
          "evalN": 17,
          "avgPct": 4.44,
          "leader": {
            "code": "S0104",
            "name": "示例钴科技",
            "pct": 6.63
          }
        },
        {
          "code": "BK105",
          "name": "稀土",
          "n": 7,
          "up": 4,
          "evalN": 7,
          "avgPct": 2.86,
          "leader": {
            "code": "S0105",
            "name": "示例稀土集团",
            "pct": 4.98
          }
        },
        {
          "code": "BK106",
          "name": "黄金",
          "n": 12,
          "up": 2,
          "evalN": 12,
          "avgPct": 3.18,
          "leader": {
            "code": "S0106",
            "name": "示例黄金股份",
            "pct": 3.99
          }
        },
        {
          "code": "BK107",
          "name": "白银",
          "n": 4,
          "up": 0,
          "evalN": 4,
          "avgPct": 3.58,
          "leader": {
            "code": "S0107",
            "name": "示例白银电子",
            "pct": 5.64
          }
        },
        {
          "code": "BK108",
          "name": "镍",
          "n": 13,
          "up": 8,
          "evalN": 13,
          "avgPct": 6.2,
          "leader": {
            "code": "S0108",
            "name": "示例镍新材",
            "pct": 14.27
          }
        },
        {
          "code": "BK109",
          "name": "小金属",
          "n": 11,
          "up": 7,
          "evalN": 11,
          "avgPct": -2.31,
          "leader": {
            "code": "S0109",
            "name": "示例小金控股",
            "pct": 1.48
          }
        },
        {
          "code": "BK110",
          "name": "金属回收",
          "n": 8,
          "up": 6,
          "evalN": 8,
          "avgPct": -2.5,
          "leader": {
            "code": "S0110",
            "name": "示例金属智造",
            "pct": 0.87
          }
        }
      ]
    },
    {
      "name": "基础化工",
      "n": 121,
      "up": 62,
      "evalN": 121,
      "avgPct": 1.85,
      "leader": {
        "code": "S0112",
        "name": "示例氟化科技",
        "pct": 12.66
      },
      "concepts": [
        {
          "code": "BK111",
          "name": "磷化工",
          "n": 12,
          "up": 3,
          "evalN": 12,
          "avgPct": 6.55,
          "leader": {
            "code": "S0111",
            "name": "示例磷化实业",
            "pct": 12.09
          }
        },
        {
          "code": "BK112",
          "name": "氟化工",
          "n": 17,
          "up": 7,
          "evalN": 17,
          "avgPct": 5.07,
          "leader": {
            "code": "S0112",
            "name": "示例氟化科技",
            "pct": 12.66
          }
        },
        {
          "code": "BK113",
          "name": "聚氨酯",
          "n": 9,
          "up": 3,
          "evalN": 9,
          "avgPct": -4.13,
          "leader": {
            "code": "S0113",
            "name": "示例聚氨集团",
            "pct": 3.35
          }
        },
        {
          "code": "BK114",
          "name": "农药",
          "n": 12,
          "up": 11,
          "evalN": 12,
          "avgPct": 0.8,
          "leader": {
            "code": "S0114",
            "name": "示例农药股份",
            "pct": 3.67
          }
        },
        {
          "code": "BK115",
          "name": "化肥",
          "n": 13,
          "up": 10,
          "evalN": 13,
          "avgPct": -3.42,
          "leader": {
            "code": "S0115",
            "name": "示例化肥电子",
            "pct": 0.08
          }
        },
        {
          "code": "BK116",
          "name": "纯碱",
          "n": 10,
          "up": 3,
          "evalN": 10,
          "avgPct": 4.44,
          "leader": {
            "code": "S0116",
            "name": "示例纯碱新材",
            "pct": 7.22
          }
        },
        {
          "code": "BK117",
          "name": "橡胶助剂",
          "n": 8,
          "up": 8,
          "evalN": 8,
          "avgPct": 5.5,
          "leader": {
            "code": "S0117",
            "name": "示例橡胶控股",
            "pct": 7.33
          }
        },
        {
          "code": "BK118",
          "name": "涂料",
          "n": 16,
          "up": 7,
          "evalN": 16,
          "avgPct": 4.67,
          "leader": {
            "code": "S0118",
            "name": "示例涂料智造",
            "pct": 12.3
          }
        },
        {
          "code": "BK119",
          "name": "电子化学品",
          "n": 18,
          "up": 5,
          "evalN": 18,
          "avgPct": -0.83,
          "leader": {
            "code": "S0119",
            "name": "示例电子实业",
            "pct": 3.44
          }
        },
        {
          "code": "BK120",
          "name": "可降解塑料",
          "n": 6,
          "up": 5,
          "evalN": 6,
          "avgPct": -2.85,
          "leader": {
            "code": "S0120",
            "name": "示例可降科技",
            "pct": 2.7
          }
        }
      ]
    },
    {
      "name": "交通运输",
      "n": 115,
      "up": 65,
      "evalN": 115,
      "avgPct": -0.01,
      "leader": {
        "code": "S0127",
        "name": "示例物流实业",
        "pct": 10.83
      },
      "concepts": [
        {
          "code": "BK121",
          "name": "航空",
          "n": 12,
          "up": 7,
          "evalN": 12,
          "avgPct": 3.03,
          "leader": {
            "code": "S0121",
            "name": "示例航空集团",
            "pct": 6.61
          }
        },
        {
          "code": "BK122",
          "name": "机场",
          "n": 18,
          "up": 15,
          "evalN": 18,
          "avgPct": -1.24,
          "leader": {
            "code": "S0122",
            "name": "示例机场股份",
            "pct": 2.24
          }
        },
        {
          "code": "BK123",
          "name": "港口",
          "n": 8,
          "up": 7,
          "evalN": 8,
          "avgPct": -3.2,
          "leader": {
            "code": "S0123",
            "name": "示例港口电子",
            "pct": 5.07
          }
        },
        {
          "code": "BK124",
          "name": "航运",
          "n": 16,
          "up": 3,
          "evalN": 16,
          "avgPct": 0.2,
          "leader": {
            "code": "S0124",
            "name": "示例航运新材",
            "pct": 5.91
          }
        },
        {
          "code": "BK125",
          "name": "高速公路",
          "n": 18,
          "up": 6,
          "evalN": 18,
          "avgPct": 0.58,
          "leader": {
            "code": "S0125",
            "name": "示例高速控股",
            "pct": 8.31
          }
        },
        {
          "code": "BK126",
          "name": "铁路",
          "n": 5,
          "up": 1,
          "evalN": 5,
          "avgPct": 4.01,
          "leader": {
            "code": "S0126",
            "name": "示例铁路智造",
            "pct": 5.57
          }
        },
        {
          "code": "BK127",
          "name": "物流",
          "n": 6,
          "up": 6,
          "evalN": 6,
          "avgPct": 4.38,
          "leader": {
            "code": "S0127",
            "name": "示例物流实业",
            "pct": 10.83
          }
        },
        {
          "code": "BK128",
          "name": "快递",
          "n": 8,
          "up": 6,
          "evalN": 8,
          "avgPct": -4.66,
          "leader": {
            "code": "S0128",
            "name": "示例快递科技",
            "pct": -3.7
          }
        },
        {
          "code": "BK129",
          "name": "跨境物流",
          "n": 14,
          "up": 12,
          "evalN": 14,
          "avgPct": 1.76,
          "leader": {
            "code": "S0129",
            "name": "示例跨境集团",
            "pct": 7.77
          }
        },
        {
          "code": "BK130",
          "name": "城市公交",
          "n": 10,
          "up": 2,
          "evalN": 10,
          "avgPct": -3.73,
          "leader": {
            "code": "S0130",
            "name": "示例城市股份",
            "pct": 1.46
          }
        }
      ]
    },
    {
      "name": "传媒",
      "n": 99,
      "up": 28,
      "evalN": 99,
      "avgPct": 0.28,
      "leader": {
        "code": "S0135",
        "name": "示例数字实业",
        "pct": 14.64
      },
      "concepts": [
        {
          "code": "BK131",
          "name": "游戏",
          "n": 12,
          "up": 4,
          "evalN": 12,
          "avgPct": -4.77,
          "leader": {
            "code": "S0131",
            "name": "示例游戏电子",
            "pct": -2.13
          }
        },
        {
          "code": "BK132",
          "name": "影视",
          "n": 3,
          "up": 3,
          "evalN": 3,
          "avgPct": -3.86,
          "leader": {
            "code": "S0132",
            "name": "示例影视新材",
            "pct": -3.12
          }
        },
        {
          "code": "BK133",
          "name": "广告营销",
          "n": 12,
          "up": 1,
          "evalN": 12,
          "avgPct": 3.44,
          "leader": {
            "code": "S0133",
            "name": "示例广告控股",
            "pct": 11.11
          }
        },
        {
          "code": "BK134",
          "name": "出版",
          "n": 4,
          "up": 0,
          "evalN": 4,
          "avgPct": 2.73,
          "leader": {
            "code": "S0134",
            "name": "示例出版智造",
            "pct": 9.78
          }
        },
        {
          "code": "BK135",
          "name": "数字媒体",
          "n": 5,
          "up": 3,
          "evalN": 5,
          "avgPct": 6.56,
          "leader": {
            "code": "S0135",
            "name": "示例数字实业",
            "pct": 14.64
          }
        },
        {
          "code": "BK136",
          "name": "视频平台",
          "n": 18,
          "up": 4,
          "evalN": 18,
          "avgPct": 4.61,
          "leader": {
            "code": "S0136",
            "name": "示例视频科技",
            "pct": 9.29
          }
        },
        {
          "code": "BK137",
          "name": "直播电商",
          "n": 17,
          "up": 6,
          "evalN": 17,
          "avgPct": -2.47,
          "leader": {
            "code": "S0137",
            "name": "示例直播集团",
            "pct": 0.99
          }
        },
        {
          "code": "BK138",
          "name": "IP运营",
          "n": 9,
          "up": 1,
          "evalN": 9,
          "avgPct": 1.8,
          "leader": {
            "code": "S0138",
            "name": "示例IP股份",
            "pct": 8.84
          }
        },
        {
          "code": "BK139",
          "name": "体育产业",
          "n": 3,
          "up": 3,
          "evalN": 3,
          "avgPct": -3.39,
          "leader": {
            "code": "S0139",
            "name": "示例体育电子",
            "pct": -0.56
          }
        },
        {
          "code": "BK140",
          "name": "在线教育",
          "n": 16,
          "up": 3,
          "evalN": 16,
          "avgPct": -2.21,
          "leader": {
            "code": "S0140",
            "name": "示例在线新材",
            "pct": 4.86
          }
        }
      ]
    },
    {
      "name": "通信",
      "n": 108,
      "up": 53,
      "evalN": 108,
      "avgPct": 1.39,
      "leader": {
        "code": "S0147",
        "name": "示例5G电子",
        "pct": 10.53
      },
      "concepts": [
        {
          "code": "BK141",
          "name": "通信设备",
          "n": 16,
          "up": 7,
          "evalN": 16,
          "avgPct": 0.72,
          "leader": {
            "code": "S0141",
            "name": "示例通信控股",
            "pct": 5.91
          }
        },
        {
          "code": "BK142",
          "name": "光模块",
          "n": 18,
          "up": 7,
          "evalN": 18,
          "avgPct": 3.83,
          "leader": {
            "code": "S0142",
            "name": "示例光模智造",
            "pct": 8.18
          }
        },
        {
          "code": "BK143",
          "name": "光纤光缆",
          "n": 10,
          "up": 5,
          "evalN": 10,
          "avgPct": 2.06,
          "leader": {
            "code": "S0143",
            "name": "示例光纤实业",
            "pct": 9.09
          }
        },
        {
          "code": "BK144",
          "name": "运营商",
          "n": 8,
          "up": 3,
          "evalN": 8,
          "avgPct": 1.18,
          "leader": {
            "code": "S0144",
            "name": "示例运营科技",
            "pct": 4.81
          }
        },
        {
          "code": "BK145",
          "name": "卫星通信",
          "n": 4,
          "up": 1,
          "evalN": 4,
          "avgPct": -0.15,
          "leader": {
            "code": "S0145",
            "name": "示例卫星集团",
            "pct": 6.05
          }
        },
        {
          "code": "BK146",
          "name": "物联网",
          "n": 13,
          "up": 2,
          "evalN": 13,
          "avgPct": -4.19,
          "leader": {
            "code": "S0146",
            "name": "示例物联股份",
            "pct": 1.58
          }
        },
        {
          "code": "BK147",
          "name": "5G应用",
          "n": 17,
          "up": 9,
          "evalN": 17,
          "avgPct": 6.38,
          "leader": {
            "code": "S0147",
            "name": "示例5G电子",
            "pct": 10.53
          }
        },
        {
          "code": "BK148",
          "name": "数据中心",
          "n": 15,
          "up": 12,
          "evalN": 15,
          "avgPct": 0.2,
          "leader": {
            "code": "S0148",
            "name": "示例数据新材",
            "pct": 1.61
          }
        },
        {
          "code": "BK149",
          "name": "军工通信",
          "n": 7,
          "up": 7,
          "evalN": 7,
          "avgPct": -2.42,
          "leader": {
            "code": "S0149",
            "name": "示例军工控股",
            "pct": 0.41
          }
        }
      ]
    },
    {
      "name": "农牧饲料",
      "n": 70,
      "up": 51,
      "evalN": 70,
      "avgPct": 2.14,
      "leader": {
        "code": "S0153",
        "name": "示例饲料集团",
        "pct": 12.74
      },
      "concepts": [
        {
          "code": "BK150",
          "name": "生猪养殖",
          "n": 9,
          "up": 7,
          "evalN": 9,
          "avgPct": 0.07,
          "leader": {
            "code": "S0150",
            "name": "示例生猪智造",
            "pct": 5.07
          }
        },
        {
          "code": "BK151",
          "name": "家禽",
          "n": 3,
          "up": 3,
          "evalN": 3,
          "avgPct": -4.78,
          "leader": {
            "code": "S0151",
            "name": "示例家禽实业",
            "pct": -4.08
          }
        },
        {
          "code": "BK152",
          "name": "水产",
          "n": 6,
          "up": 4,
          "evalN": 6,
          "avgPct": 3.26,
          "leader": {
            "code": "S0152",
            "name": "示例水产科技",
            "pct": 4.53
          }
        },
        {
          "code": "BK153",
          "name": "饲料",
          "n": 17,
          "up": 10,
          "evalN": 17,
          "avgPct": 6.33,
          "leader": {
            "code": "S0153",
            "name": "示例饲料集团",
            "pct": 12.74
          }
        },
        {
          "code": "BK154",
          "name": "动物疫苗",
          "n": 13,
          "up": 12,
          "evalN": 13,
          "avgPct": 2.16,
          "leader": {
            "code": "S0154",
            "name": "示例动物股份",
            "pct": 6.87
          }
        },
        {
          "code": "BK155",
          "name": "种业",
          "n": 5,
          "up": 5,
          "evalN": 5,
          "avgPct": -4.79,
          "leader": {
            "code": "S0155",
            "name": "示例种业电子",
            "pct": -0.75
          }
        },
        {
          "code": "BK156",
          "name": "种植业",
          "n": 7,
          "up": 4,
          "evalN": 7,
          "avgPct": -1.74,
          "leader": {
            "code": "S0156",
            "name": "示例种植新材",
            "pct": 1.31
          }
        },
        {
          "code": "BK157",
          "name": "林业",
          "n": 7,
          "up": 5,
          "evalN": 7,
          "avgPct": 5.39,
          "leader": {
            "code": "S0157",
            "name": "示例林业控股",
            "pct": 6.25
          }
        },
        {
          "code": "BK158",
          "name": "宠物经济",
          "n": 3,
          "up": 1,
          "evalN": 3,
          "avgPct": 2.13,
          "leader": {
            "code": "S0158",
            "name": "示例宠物智造",
            "pct": 8.32
          }
        }
      ]
    },
    {
      "name": "煤炭",
      "n": 91,
      "up": 75,
      "evalN": 91,
      "avgPct": 0.12,
      "leader": {
        "code": "S0163",
        "name": "示例安全电子",
        "pct": 7.35
      },
      "concepts": [
        {
          "code": "BK159",
          "name": "动力煤",
          "n": 18,
          "up": 12,
          "evalN": 18,
          "avgPct": -4.44,
          "leader": {
            "code": "S0159",
            "name": "示例动力实业",
            "pct": 0.87
          }
        },
        {
          "code": "BK160",
          "name": "焦煤",
          "n": 4,
          "up": 3,
          "evalN": 4,
          "avgPct": -0.98,
          "leader": {
            "code": "S0160",
            "name": "示例焦煤科技",
            "pct": 2.24
          }
        },
        {
          "code": "BK161",
          "name": "焦炭",
          "n": 14,
          "up": 12,
          "evalN": 14,
          "avgPct": 0.01,
          "leader": {
            "code": "S0161",
            "name": "示例焦炭集团",
            "pct": 3.02
          }
        },
        {
          "code": "BK162",
          "name": "煤化工",
          "n": 15,
          "up": 14,
          "evalN": 15,
          "avgPct": 3.06,
          "leader": {
            "code": "S0162",
            "name": "示例煤化股份",
            "pct": 5.84
          }
        },
        {
          "code": "BK163",
          "name": "安全设备",
          "n": 7,
          "up": 5,
          "evalN": 7,
          "avgPct": 1.8,
          "leader": {
            "code": "S0163",
            "name": "示例安全电子",
            "pct": 7.35
          }
        },
        {
          "code": "BK164",
          "name": "洁净煤",
          "n": 12,
          "up": 9,
          "evalN": 12,
          "avgPct": 0.84,
          "leader": {
            "code": "S0164",
            "name": "示例洁净新材",
            "pct": 5.57
          }
        },
        {
          "code": "BK165",
          "name": "煤层气",
          "n": 4,
          "up": 4,
          "evalN": 4,
          "avgPct": -4.4,
          "leader": {
            "code": "S0165",
            "name": "示例煤层控股",
            "pct": -0.54
          }
        },
        {
          "code": "BK166",
          "name": "综合能源",
          "n": 17,
          "up": 16,
          "evalN": 17,
          "avgPct": 2.58,
          "leader": {
            "code": "S0166",
            "name": "示例综合智造",
            "pct": 5.31
          }
        }
      ]
    },
    {
      "name": "房地产",
      "n": 99,
      "up": 43,
      "evalN": 99,
      "avgPct": 0.29,
      "leader": {
        "code": "S0173",
        "name": "示例房地控股",
        "pct": 9.33
      },
      "concepts": [
        {
          "code": "BK167",
          "name": "房地产开发",
          "n": 9,
          "up": 5,
          "evalN": 9,
          "avgPct": -3.58,
          "leader": {
            "code": "S0167",
            "name": "示例房地实业",
            "pct": 3.88
          }
        },
        {
          "code": "BK168",
          "name": "物业管理",
          "n": 12,
          "up": 10,
          "evalN": 12,
          "avgPct": 2.17,
          "leader": {
            "code": "S0168",
            "name": "示例物业科技",
            "pct": 4.79
          }
        },
        {
          "code": "BK169",
          "name": "商业地产",
          "n": 18,
          "up": 8,
          "evalN": 18,
          "avgPct": -5.9,
          "leader": {
            "code": "S0169",
            "name": "示例商业集团",
            "pct": -0.58
          }
        },
        {
          "code": "BK170",
          "name": "园区开发",
          "n": 11,
          "up": 7,
          "evalN": 11,
          "avgPct": -2.52,
          "leader": {
            "code": "S0170",
            "name": "示例园区股份",
            "pct": 0.95
          }
        },
        {
          "code": "BK171",
          "name": "建筑建材",
          "n": 10,
          "up": 7,
          "evalN": 10,
          "avgPct": 2.99,
          "leader": {
            "code": "S0171",
            "name": "示例建筑电子",
            "pct": 6.89
          }
        },
        {
          "code": "BK172",
          "name": "装修装饰",
          "n": 13,
          "up": 3,
          "evalN": 13,
          "avgPct": 3.02,
          "leader": {
            "code": "S0172",
            "name": "示例装修新材",
            "pct": 6.17
          }
        },
        {
          "code": "BK173",
          "name": "房地产服务",
          "n": 9,
          "up": 1,
          "evalN": 9,
          "avgPct": 6.45,
          "leader": {
            "code": "S0173",
            "name": "示例房地控股",
            "pct": 9.33
          }
        },
        {
          "code": "BK174",
          "name": "租赁住房",
          "n": 17,
          "up": 2,
          "evalN": 17,
          "avgPct": 2.45,
          "leader": {
            "code": "S0174",
            "name": "示例租赁智造",
            "pct": 3.58
          }
        }
      ]
    },
    {
      "name": "钢铁",
      "n": 71,
      "up": 24,
      "evalN": 71,
      "avgPct": 2.15,
      "leader": {
        "code": "S0177",
        "name": "示例钢铁集团",
        "pct": 13.48
      },
      "concepts": [
        {
          "code": "BK175",
          "name": "特钢",
          "n": 9,
          "up": 3,
          "evalN": 9,
          "avgPct": 5.12,
          "leader": {
            "code": "S0175",
            "name": "示例特钢实业",
            "pct": 6.2
          }
        },
        {
          "code": "BK176",
          "name": "普钢",
          "n": 14,
          "up": 4,
          "evalN": 14,
          "avgPct": -4.82,
          "leader": {
            "code": "S0176",
            "name": "示例普钢科技",
            "pct": -0.69
          }
        },
        {
          "code": "BK177",
          "name": "钢铁贸易",
          "n": 8,
          "up": 1,
          "evalN": 8,
          "avgPct": 6.34,
          "leader": {
            "code": "S0177",
            "name": "示例钢铁集团",
            "pct": 13.48
          }
        },
        {
          "code": "BK178",
          "name": "冶金原料",
          "n": 12,
          "up": 9,
          "evalN": 12,
          "avgPct": -3.83,
          "leader": {
            "code": "S0178",
            "name": "示例冶金股份",
            "pct": 4.54
          }
        },
        {
          "code": "BK179",
          "name": "金属制品",
          "n": 12,
          "up": 4,
          "evalN": 12,
          "avgPct": 5.77,
          "leader": {
            "code": "S0179",
            "name": "示例金属电子",
            "pct": 13.46
          }
        },
        {
          "code": "BK180",
          "name": "绿色冶金",
          "n": 16,
          "up": 3,
          "evalN": 16,
          "avgPct": 6.24,
          "leader": {
            "code": "S0180",
            "name": "示例绿色新材",
            "pct": 9.44
          }
        }
      ]
    }
  ]
};
});
