/*
 * demo/data.js — fixture for the demo page and the data-integrity test suite.
 *
 * Real A-share market data exported from heatmap-periods.json (2026-10-28):
 *   { meta: { lastDate, exportedAt, stocksEvaluated, categories, concepts, note },
 *     categories: [{ name, n, up, evalN, avgPct, leader: {code,name,pct}, concepts: [...] }] }
 *
 * Each period (day / week / month / year) is a REAL range aggregate; categories
 * are regrouped from flat concept rows (n/up/evalN = Σ concepts; avgPct =
 * n-weighted mean; leader = strongest concept leader). All invariants verified
 * by test/data.test.js hold by construction.
 *   Scope: 31 categories · 144 concepts · 4405 stocks (one stock, one concept).
 *
 * Browser: <script src="data.js"> -> window.HEATMAP_DATA
 * Node (test fixture loader): evaluated as a classic script, reads globalThis.HEATMAP_DATA
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.HEATMAP_DATA = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';
  var DAY = {
  meta: {
    "lastDate": "2026-10-28",
    "exportedAt": "2026-10-28T11:15:15.782Z",
    "stocksEvaluated": 4405,
    "categories": 31,
    "concepts": 144,
    "note": "两级概念热力（大类 → 子概念，一股一概念）：面积=涨股比 up/n ×1000+1，颜色=平均涨幅 avgPct（±10% 封顶），leader=区间涨幅第一；日/周/月/年均为真实区间统计，与 heatmap-periods.json 同步（导出 meta：stocks 4414 · filtered 814 · leaderStocks 4196 · leaderDays 6288）",
    "period": "day",
    "periodName": "日",
    "periodRange": "当日"
  },
  categories: [
    {
      "name": "芯片",
      "n": 87,
      "up": 84,
      "evalN": 87,
      "avgPct": 4.67,
      "leader": {
        "code": "300613",
        "name": "富瀚微",
        "pct": 20
      },
      "concepts": [
        {
          "code": "存储芯片",
          "name": "存储芯片",
          "n": 10,
          "up": 10,
          "evalN": 10,
          "avgPct": 6.94,
          "leader": {
            "code": "300223",
            "name": "君正股份",
            "pct": 18.37
          }
        },
        {
          "code": "芯片",
          "name": "芯片",
          "n": 22,
          "up": 20,
          "evalN": 22,
          "avgPct": 4.5,
          "leader": {
            "code": "300613",
            "name": "富瀚微",
            "pct": 20
          }
        },
        {
          "code": "PCB",
          "name": "PCB",
          "n": 55,
          "up": 54,
          "evalN": 55,
          "avgPct": 4.32,
          "leader": {
            "code": "301366",
            "name": "一博科技",
            "pct": 13.29
          }
        }
      ]
    },
    {
      "name": "半导体",
      "n": 72,
      "up": 70,
      "evalN": 72,
      "avgPct": 4.11,
      "leader": {
        "code": "301369",
        "name": "联动科技",
        "pct": 14.04
      },
      "concepts": [
        {
          "code": "半导体设备",
          "name": "半导体设备",
          "n": 16,
          "up": 16,
          "evalN": 16,
          "avgPct": 5.55,
          "leader": {
            "code": "301369",
            "name": "联动科技",
            "pct": 14.04
          }
        },
        {
          "code": "第三代半导体",
          "name": "第三代半导体",
          "n": 6,
          "up": 6,
          "evalN": 6,
          "avgPct": 4.07,
          "leader": {
            "code": "002156",
            "name": "通富微电",
            "pct": 5.82
          }
        },
        {
          "code": "半导体",
          "name": "半导体",
          "n": 50,
          "up": 48,
          "evalN": 50,
          "avgPct": 3.66,
          "leader": {
            "code": "300666",
            "name": "江丰电子",
            "pct": 10.35
          }
        }
      ]
    },
    {
      "name": "智能制造",
      "n": 204,
      "up": 181,
      "evalN": 204,
      "avgPct": 3.4,
      "leader": {
        "code": "301488",
        "name": "豪恩汽电",
        "pct": 20
      },
      "concepts": [
        {
          "code": "机床与激光",
          "name": "机床与激光",
          "n": 26,
          "up": 26,
          "evalN": 26,
          "avgPct": 4.97,
          "leader": {
            "code": "301603",
            "name": "乔锋智能",
            "pct": 13.92
          }
        },
        {
          "code": "工业机器人",
          "name": "工业机器人",
          "n": 54,
          "up": 51,
          "evalN": 54,
          "avgPct": 4.18,
          "leader": {
            "code": "301525",
            "name": "儒竞科技",
            "pct": 19.99
          }
        },
        {
          "code": "智能装备",
          "name": "智能装备",
          "n": 59,
          "up": 55,
          "evalN": 59,
          "avgPct": 3.81,
          "leader": {
            "code": "300461",
            "name": "田中精机",
            "pct": 19.05
          }
        },
        {
          "code": "智能交通",
          "name": "智能交通",
          "n": 45,
          "up": 36,
          "evalN": 45,
          "avgPct": 1.77,
          "leader": {
            "code": "301488",
            "name": "豪恩汽电",
            "pct": 20
          }
        },
        {
          "code": "重型装备",
          "name": "重型装备",
          "n": 20,
          "up": 13,
          "evalN": 20,
          "avgPct": 1.69,
          "leader": {
            "code": "603135",
            "name": "中重科技",
            "pct": 10.06
          }
        }
      ]
    },
    {
      "name": "创新药",
      "n": 179,
      "up": 129,
      "evalN": 179,
      "avgPct": 1.76,
      "leader": {
        "code": "301080",
        "name": "百普赛斯",
        "pct": 20
      },
      "concepts": [
        {
          "code": "创新药产业链",
          "name": "创新药产业链",
          "n": 24,
          "up": 21,
          "evalN": 24,
          "avgPct": 4.76,
          "leader": {
            "code": "301230",
            "name": "泓博医药",
            "pct": 9.61
          }
        },
        {
          "code": "创新药",
          "name": "创新药",
          "n": 26,
          "up": 20,
          "evalN": 26,
          "avgPct": 2.98,
          "leader": {
            "code": "301080",
            "name": "百普赛斯",
            "pct": 20
          }
        },
        {
          "code": "原料药",
          "name": "原料药",
          "n": 44,
          "up": 38,
          "evalN": 44,
          "avgPct": 1.67,
          "leader": {
            "code": "301246",
            "name": "宏源药业",
            "pct": 8.06
          }
        },
        {
          "code": "化学制药",
          "name": "化学制药",
          "n": 59,
          "up": 36,
          "evalN": 59,
          "avgPct": 0.89,
          "leader": {
            "code": "300006",
            "name": "莱美药业",
            "pct": 19.95
          }
        },
        {
          "code": "生物制品",
          "name": "生物制品",
          "n": 26,
          "up": 14,
          "evalN": 26,
          "avgPct": -0.1,
          "leader": {
            "code": "300119",
            "name": "瑞普生物",
            "pct": 8.01
          }
        }
      ]
    },
    {
      "name": "消费电子",
      "n": 175,
      "up": 158,
      "evalN": 175,
      "avgPct": 3,
      "leader": {
        "code": "300806",
        "name": "斯迪克",
        "pct": 20
      },
      "concepts": [
        {
          "code": "消费电子零部件",
          "name": "消费电子零部件",
          "n": 65,
          "up": 62,
          "evalN": 65,
          "avgPct": 4.57,
          "leader": {
            "code": "300806",
            "name": "斯迪克",
            "pct": 20
          }
        },
        {
          "code": "显示与LED",
          "name": "显示与LED",
          "n": 65,
          "up": 59,
          "evalN": 65,
          "avgPct": 2.23,
          "leader": {
            "code": "603516",
            "name": "淳中科技",
            "pct": 8.35
          }
        },
        {
          "code": "整机与品牌",
          "name": "整机与品牌",
          "n": 45,
          "up": 37,
          "evalN": 45,
          "avgPct": 1.86,
          "leader": {
            "code": "301189",
            "name": "奥尼电子",
            "pct": 10.19
          }
        }
      ]
    },
    {
      "name": "通用制造",
      "n": 349,
      "up": 294,
      "evalN": 349,
      "avgPct": 2.45,
      "leader": {
        "code": "301261",
        "name": "恒工精密",
        "pct": 20
      },
      "concepts": [
        {
          "code": "机械零部件",
          "name": "机械零部件",
          "n": 53,
          "up": 49,
          "evalN": 53,
          "avgPct": 4.48,
          "leader": {
            "code": "301261",
            "name": "恒工精密",
            "pct": 20
          }
        },
        {
          "code": "电子元器件",
          "name": "电子元器件",
          "n": 46,
          "up": 43,
          "evalN": 46,
          "avgPct": 3.91,
          "leader": {
            "code": "301359",
            "name": "东南电子",
            "pct": 20
          }
        },
        {
          "code": "通用设备",
          "name": "通用设备",
          "n": 104,
          "up": 86,
          "evalN": 104,
          "avgPct": 2.14,
          "leader": {
            "code": "605288",
            "name": "凯迪股份",
            "pct": 10.01
          }
        },
        {
          "code": "电工器材",
          "name": "电工器材",
          "n": 49,
          "up": 44,
          "evalN": 49,
          "avgPct": 2.12,
          "leader": {
            "code": "603109",
            "name": "神驰机电",
            "pct": 10
          }
        },
        {
          "code": "轨道交通",
          "name": "轨道交通",
          "n": 14,
          "up": 9,
          "evalN": 14,
          "avgPct": 1.56,
          "leader": {
            "code": "603680",
            "name": "今创集团",
            "pct": 10
          }
        },
        {
          "code": "电力设备",
          "name": "电力设备",
          "n": 83,
          "up": 63,
          "evalN": 83,
          "avgPct": 1.07,
          "leader": {
            "code": "002879",
            "name": "长缆科技",
            "pct": 10.01
          }
        }
      ]
    },
    {
      "name": "制造",
      "n": 353,
      "up": 300,
      "evalN": 353,
      "avgPct": 2.94,
      "leader": {
        "code": "301529",
        "name": "福赛科技",
        "pct": 14.82
      },
      "concepts": [
        {
          "code": "汽车传动",
          "name": "汽车传动",
          "n": 47,
          "up": 41,
          "evalN": 47,
          "avgPct": 4.35,
          "leader": {
            "code": "301550",
            "name": "斯菱智驱",
            "pct": 13.81
          }
        },
        {
          "code": "汽车电子",
          "name": "汽车电子",
          "n": 40,
          "up": 37,
          "evalN": 40,
          "avgPct": 4.09,
          "leader": {
            "code": "301413",
            "name": "安培龙",
            "pct": 14.19
          }
        },
        {
          "code": "汽车内饰",
          "name": "汽车内饰",
          "n": 18,
          "up": 15,
          "evalN": 18,
          "avgPct": 3.6,
          "leader": {
            "code": "301529",
            "name": "福赛科技",
            "pct": 14.82
          }
        },
        {
          "code": "车身结构",
          "name": "车身结构",
          "n": 38,
          "up": 36,
          "evalN": 38,
          "avgPct": 3.38,
          "leader": {
            "code": "603006",
            "name": "联明股份",
            "pct": 10.04
          }
        },
        {
          "code": "汽车配件",
          "name": "汽车配件",
          "n": 77,
          "up": 72,
          "evalN": 77,
          "avgPct": 3.34,
          "leader": {
            "code": "301005",
            "name": "超捷股份",
            "pct": 13.7
          }
        },
        {
          "code": "电机电控",
          "name": "电机电控",
          "n": 26,
          "up": 22,
          "evalN": 26,
          "avgPct": 2.47,
          "leader": {
            "code": "301210",
            "name": "金杨精密",
            "pct": 8.09
          }
        },
        {
          "code": "动力电池",
          "name": "动力电池",
          "n": 61,
          "up": 51,
          "evalN": 61,
          "avgPct": 2.06,
          "leader": {
            "code": "300953",
            "name": "震裕科技",
            "pct": 8.31
          }
        },
        {
          "code": "智能机器人",
          "name": "智能机器人",
          "n": 25,
          "up": 13,
          "evalN": 25,
          "avgPct": 0.71,
          "leader": {
            "code": "301107",
            "name": "瑜欣电子",
            "pct": 5.27
          }
        },
        {
          "code": "汽车整车",
          "name": "汽车整车",
          "n": 21,
          "up": 13,
          "evalN": 21,
          "avgPct": 0.53,
          "leader": {
            "code": "301322",
            "name": "绿通科技",
            "pct": 6.14
          }
        }
      ]
    },
    {
      "name": "文化娱乐",
      "n": 120,
      "up": 100,
      "evalN": 120,
      "avgPct": 2.54,
      "leader": {
        "code": "300291",
        "name": "百纳千成",
        "pct": 20
      },
      "concepts": [
        {
          "code": "影视",
          "name": "影视",
          "n": 19,
          "up": 17,
          "evalN": 19,
          "avgPct": 3.95,
          "leader": {
            "code": "300291",
            "name": "百纳千成",
            "pct": 20
          }
        },
        {
          "code": "文化传媒",
          "name": "文化传媒",
          "n": 77,
          "up": 65,
          "evalN": 77,
          "avgPct": 2.3,
          "leader": {
            "code": "301052",
            "name": "果麦文化",
            "pct": 17.2
          }
        },
        {
          "code": "游戏",
          "name": "游戏",
          "n": 24,
          "up": 18,
          "evalN": 24,
          "avgPct": 2.19,
          "leader": {
            "code": "300315",
            "name": "掌趣科技",
            "pct": 7.41
          }
        }
      ]
    },
    {
      "name": "光伏",
      "n": 53,
      "up": 40,
      "evalN": 53,
      "avgPct": 1.96,
      "leader": {
        "code": "002943",
        "name": "宇晶股份",
        "pct": 9.99
      },
      "concepts": [
        {
          "code": "光伏设备",
          "name": "光伏设备",
          "n": 13,
          "up": 11,
          "evalN": 13,
          "avgPct": 3.54,
          "leader": {
            "code": "002943",
            "name": "宇晶股份",
            "pct": 9.99
          }
        },
        {
          "code": "光伏材料",
          "name": "光伏材料",
          "n": 17,
          "up": 15,
          "evalN": 17,
          "avgPct": 2.17,
          "leader": {
            "code": "300700",
            "name": "岱勒新材",
            "pct": 6.54
          }
        },
        {
          "code": "光伏制造",
          "name": "光伏制造",
          "n": 23,
          "up": 14,
          "evalN": 23,
          "avgPct": 0.92,
          "leader": {
            "code": "002129",
            "name": "TCL中环",
            "pct": 5.81
          }
        }
      ]
    },
    {
      "name": "军工",
      "n": 104,
      "up": 82,
      "evalN": 104,
      "avgPct": 2.1,
      "leader": {
        "code": "301682",
        "name": "宏明电子",
        "pct": 15.55
      },
      "concepts": [
        {
          "code": "卫星火箭",
          "name": "卫星火箭",
          "n": 15,
          "up": 14,
          "evalN": 15,
          "avgPct": 3.1,
          "leader": {
            "code": "300342",
            "name": "天银机电",
            "pct": 9.62
          }
        },
        {
          "code": "军工电子",
          "name": "军工电子",
          "n": 29,
          "up": 25,
          "evalN": 29,
          "avgPct": 2.82,
          "leader": {
            "code": "301682",
            "name": "宏明电子",
            "pct": 15.55
          }
        },
        {
          "code": "兵器火工",
          "name": "兵器火工",
          "n": 16,
          "up": 12,
          "evalN": 16,
          "avgPct": 2.41,
          "leader": {
            "code": "002265",
            "name": "建设工业",
            "pct": 9.99
          }
        },
        {
          "code": "雷达",
          "name": "雷达",
          "n": 11,
          "up": 10,
          "evalN": 11,
          "avgPct": 2.11,
          "leader": {
            "code": "001270",
            "name": "铖昌科技",
            "pct": 10
          }
        },
        {
          "code": "军工材料",
          "name": "军工材料",
          "n": 14,
          "up": 11,
          "evalN": 14,
          "avgPct": 2.01,
          "leader": {
            "code": "300900",
            "name": "广联航空",
            "pct": 9.19
          }
        },
        {
          "code": "军工整机",
          "name": "军工整机",
          "n": 19,
          "up": 10,
          "evalN": 19,
          "avgPct": -0.01,
          "leader": {
            "code": "300855",
            "name": "图南股份",
            "pct": 4.83
          }
        }
      ]
    },
    {
      "name": "基础化工",
      "n": 323,
      "up": 230,
      "evalN": 323,
      "avgPct": 1.55,
      "leader": {
        "code": "301076",
        "name": "新瀚新材",
        "pct": 13.06
      },
      "concepts": [
        {
          "code": "氟化工",
          "name": "氟化工",
          "n": 29,
          "up": 25,
          "evalN": 29,
          "avgPct": 3.05,
          "leader": {
            "code": "301076",
            "name": "新瀚新材",
            "pct": 13.06
          }
        },
        {
          "code": "复合材料",
          "name": "复合材料",
          "n": 20,
          "up": 15,
          "evalN": 20,
          "avgPct": 2.68,
          "leader": {
            "code": "300920",
            "name": "润阳科技",
            "pct": 9.53
          }
        },
        {
          "code": "精细中间体",
          "name": "精细中间体",
          "n": 69,
          "up": 61,
          "evalN": 69,
          "avgPct": 2.64,
          "leader": {
            "code": "301373",
            "name": "凌玮科技",
            "pct": 10.7
          }
        },
        {
          "code": "涂料油墨",
          "name": "涂料油墨",
          "n": 29,
          "up": 27,
          "evalN": 29,
          "avgPct": 2.56,
          "leader": {
            "code": "603110",
            "name": "东方材料",
            "pct": 5.19
          }
        },
        {
          "code": "橡塑材料",
          "name": "橡塑材料",
          "n": 30,
          "up": 20,
          "evalN": 30,
          "avgPct": 1.66,
          "leader": {
            "code": "301196",
            "name": "唯科科技",
            "pct": 7.79
          }
        },
        {
          "code": "化学纤维",
          "name": "化学纤维",
          "n": 19,
          "up": 15,
          "evalN": 19,
          "avgPct": 0.74,
          "leader": {
            "code": "603382",
            "name": "海阳科技",
            "pct": 3.61
          }
        },
        {
          "code": "化工原料",
          "name": "化工原料",
          "n": 80,
          "up": 44,
          "evalN": 80,
          "avgPct": 0.56,
          "leader": {
            "code": "600078",
            "name": "澄星股份",
            "pct": 10.05
          }
        },
        {
          "code": "农药化肥",
          "name": "农药化肥",
          "n": 47,
          "up": 23,
          "evalN": 47,
          "avgPct": -0.12,
          "leader": {
            "code": "002734",
            "name": "利民股份",
            "pct": 4.6
          }
        }
      ]
    },
    {
      "name": "人工智能",
      "n": 83,
      "up": 68,
      "evalN": 83,
      "avgPct": 2.28,
      "leader": {
        "code": "300990",
        "name": "同飞股份",
        "pct": 12.8
      },
      "concepts": [
        {
          "code": "光通信",
          "name": "光通信",
          "n": 19,
          "up": 18,
          "evalN": 19,
          "avgPct": 2.84,
          "leader": {
            "code": "603083",
            "name": "剑桥科技",
            "pct": 4.91
          }
        },
        {
          "code": "算力",
          "name": "算力",
          "n": 21,
          "up": 16,
          "evalN": 21,
          "avgPct": 2.8,
          "leader": {
            "code": "300308",
            "name": "中际旭创",
            "pct": 10.28
          }
        },
        {
          "code": "数据中心",
          "name": "数据中心",
          "n": 32,
          "up": 28,
          "evalN": 32,
          "avgPct": 2.34,
          "leader": {
            "code": "300990",
            "name": "同飞股份",
            "pct": 12.8
          }
        },
        {
          "code": "人工智能",
          "name": "人工智能",
          "n": 11,
          "up": 6,
          "evalN": 11,
          "avgPct": 0.14,
          "leader": {
            "code": "300306",
            "name": "远方信息",
            "pct": 2.24
          }
        }
      ]
    },
    {
      "name": "医疗",
      "n": 190,
      "up": 132,
      "evalN": 190,
      "avgPct": 1.24,
      "leader": {
        "code": "300439",
        "name": "美康生物",
        "pct": 10.33
      },
      "concepts": [
        {
          "code": "体外诊断",
          "name": "体外诊断",
          "n": 22,
          "up": 19,
          "evalN": 22,
          "avgPct": 2.57,
          "leader": {
            "code": "300439",
            "name": "美康生物",
            "pct": 10.33
          }
        },
        {
          "code": "医疗耗材",
          "name": "医疗耗材",
          "n": 28,
          "up": 22,
          "evalN": 28,
          "avgPct": 1.76,
          "leader": {
            "code": "300529",
            "name": "健帆生物",
            "pct": 9.15
          }
        },
        {
          "code": "医疗器械",
          "name": "医疗器械",
          "n": 27,
          "up": 21,
          "evalN": 27,
          "avgPct": 1.28,
          "leader": {
            "code": "300206",
            "name": "理邦仪器",
            "pct": 5.45
          }
        },
        {
          "code": "AI医疗",
          "name": "AI医疗",
          "n": 11,
          "up": 7,
          "evalN": 11,
          "avgPct": 1.24,
          "leader": {
            "code": "301337",
            "name": "亚华电子",
            "pct": 7.66
          }
        },
        {
          "code": "中药",
          "name": "中药",
          "n": 59,
          "up": 34,
          "evalN": 59,
          "avgPct": 0.85,
          "leader": {
            "code": "600252",
            "name": "中恒集团",
            "pct": 9.52
          }
        },
        {
          "code": "医药商业",
          "name": "医药商业",
          "n": 30,
          "up": 19,
          "evalN": 30,
          "avgPct": 0.76,
          "leader": {
            "code": "002172",
            "name": "澳洋健康",
            "pct": 9.91
          }
        },
        {
          "code": "医疗服务",
          "name": "医疗服务",
          "n": 13,
          "up": 10,
          "evalN": 13,
          "avgPct": 0.73,
          "leader": {
            "code": "301293",
            "name": "三博脑科",
            "pct": 3.72
          }
        }
      ]
    },
    {
      "name": "资源",
      "n": 67,
      "up": 45,
      "evalN": 67,
      "avgPct": 1.02,
      "leader": {
        "code": "301160",
        "name": "翔楼新材",
        "pct": 8.94
      },
      "concepts": [
        {
          "code": "稀土永磁",
          "name": "稀土永磁",
          "n": 19,
          "up": 19,
          "evalN": 19,
          "avgPct": 2.4,
          "leader": {
            "code": "300224",
            "name": "正海磁材",
            "pct": 8.03
          }
        },
        {
          "code": "锂",
          "name": "锂",
          "n": 15,
          "up": 11,
          "evalN": 15,
          "avgPct": 0.88,
          "leader": {
            "code": "300487",
            "name": "蓝晓科技",
            "pct": 6.11
          }
        },
        {
          "code": "特种钢",
          "name": "特种钢",
          "n": 15,
          "up": 7,
          "evalN": 15,
          "avgPct": 0.72,
          "leader": {
            "code": "301160",
            "name": "翔楼新材",
            "pct": 8.94
          }
        },
        {
          "code": "白银",
          "name": "白银",
          "n": 6,
          "up": 4,
          "evalN": 6,
          "avgPct": 0.58,
          "leader": {
            "code": "603045",
            "name": "福达合金",
            "pct": 2.18
          }
        },
        {
          "code": "黄金",
          "name": "黄金",
          "n": 12,
          "up": 4,
          "evalN": 12,
          "avgPct": -0.38,
          "leader": {
            "code": "000506",
            "name": "招金黄金",
            "pct": 0.82
          }
        }
      ]
    },
    {
      "name": "轻工制造",
      "n": 131,
      "up": 100,
      "evalN": 131,
      "avgPct": 1.7,
      "leader": {
        "code": "605488",
        "name": "福莱新材",
        "pct": 10
      },
      "concepts": [
        {
          "code": "包装印刷",
          "name": "包装印刷",
          "n": 46,
          "up": 36,
          "evalN": 46,
          "avgPct": 2.3,
          "leader": {
            "code": "605488",
            "name": "福莱新材",
            "pct": 10
          }
        },
        {
          "code": "其他轻工",
          "name": "其他轻工",
          "n": 18,
          "up": 15,
          "evalN": 18,
          "avgPct": 2,
          "leader": {
            "code": "300329",
            "name": "海伦钢琴",
            "pct": 4.06
          }
        },
        {
          "code": "家居用品",
          "name": "家居用品",
          "n": 45,
          "up": 36,
          "evalN": 45,
          "avgPct": 1.43,
          "leader": {
            "code": "603992",
            "name": "松霖科技",
            "pct": 10
          }
        },
        {
          "code": "造纸",
          "name": "造纸",
          "n": 22,
          "up": 13,
          "evalN": 22,
          "avgPct": 0.73,
          "leader": {
            "code": "002511",
            "name": "中顺洁柔",
            "pct": 6.9
          }
        }
      ]
    },
    {
      "name": "国产替代",
      "n": 48,
      "up": 38,
      "evalN": 48,
      "avgPct": 1.95,
      "leader": {
        "code": "300050",
        "name": "世纪鼎利",
        "pct": 6.98
      },
      "concepts": [
        {
          "code": "5G概念",
          "name": "5G概念",
          "n": 41,
          "up": 34,
          "evalN": 41,
          "avgPct": 2.15,
          "leader": {
            "code": "300050",
            "name": "世纪鼎利",
            "pct": 6.98
          }
        },
        {
          "code": "华为概念",
          "name": "华为概念",
          "n": 7,
          "up": 4,
          "evalN": 7,
          "avgPct": 0.75,
          "leader": {
            "code": "301128",
            "name": "强瑞技术",
            "pct": 4.68
          }
        }
      ]
    },
    {
      "name": "环保",
      "n": 123,
      "up": 99,
      "evalN": 123,
      "avgPct": 1.69,
      "leader": {
        "code": "002534",
        "name": "西子洁能",
        "pct": 10
      },
      "concepts": [
        {
          "code": "环保装备",
          "name": "环保装备",
          "n": 29,
          "up": 24,
          "evalN": 29,
          "avgPct": 2.11,
          "leader": {
            "code": "002534",
            "name": "西子洁能",
            "pct": 10
          }
        },
        {
          "code": "环保运营",
          "name": "环保运营",
          "n": 42,
          "up": 34,
          "evalN": 42,
          "avgPct": 1.92,
          "leader": {
            "code": "002616",
            "name": "长青集团",
            "pct": 6.84
          }
        },
        {
          "code": "再生资源",
          "name": "再生资源",
          "n": 20,
          "up": 15,
          "evalN": 20,
          "avgPct": 1.29,
          "leader": {
            "code": "603091",
            "name": "众鑫股份",
            "pct": 5.71
          }
        },
        {
          "code": "污水处理",
          "name": "污水处理",
          "n": 32,
          "up": 26,
          "evalN": 32,
          "avgPct": 1.25,
          "leader": {
            "code": "301148",
            "name": "嘉戎技术",
            "pct": 5.18
          }
        }
      ]
    },
    {
      "name": "消费",
      "n": 423,
      "up": 233,
      "evalN": 423,
      "avgPct": 0.52,
      "leader": {
        "code": "600828",
        "name": "茂业商业",
        "pct": 10.07
      },
      "concepts": [
        {
          "code": "家电",
          "name": "家电",
          "n": 91,
          "up": 74,
          "evalN": 91,
          "avgPct": 2.06,
          "leader": {
            "code": "603303",
            "name": "得邦照明",
            "pct": 10.02
          }
        },
        {
          "code": "新零售",
          "name": "新零售",
          "n": 71,
          "up": 44,
          "evalN": 71,
          "avgPct": 0.79,
          "leader": {
            "code": "600828",
            "name": "茂业商业",
            "pct": 10.07
          }
        },
        {
          "code": "乳业/饮料",
          "name": "乳业/饮料",
          "n": 29,
          "up": 15,
          "evalN": 29,
          "avgPct": 0.63,
          "leader": {
            "code": "605198",
            "name": "安德利",
            "pct": 8.73
          }
        },
        {
          "code": "体育户外",
          "name": "体育户外",
          "n": 16,
          "up": 11,
          "evalN": 16,
          "avgPct": 0.56,
          "leader": {
            "code": "603307",
            "name": "扬州金泉",
            "pct": 3.09
          }
        },
        {
          "code": "水产养殖",
          "name": "水产养殖",
          "n": 12,
          "up": 3,
          "evalN": 12,
          "avgPct": 0.48,
          "leader": {
            "code": "002696",
            "name": "百洋股份",
            "pct": 10
          }
        },
        {
          "code": "食品加工",
          "name": "食品加工",
          "n": 64,
          "up": 34,
          "evalN": 64,
          "avgPct": 0.35,
          "leader": {
            "code": "603886",
            "name": "元祖股份",
            "pct": 7.95
          }
        },
        {
          "code": "啤酒",
          "name": "啤酒",
          "n": 7,
          "up": 3,
          "evalN": 7,
          "avgPct": 0.28,
          "leader": {
            "code": "000729",
            "name": "燕京啤酒",
            "pct": 4.08
          }
        },
        {
          "code": "跨境/免税",
          "name": "跨境/免税",
          "n": 17,
          "up": 11,
          "evalN": 17,
          "avgPct": 0.21,
          "leader": {
            "code": "300209",
            "name": "行云科技",
            "pct": 4
          }
        },
        {
          "code": "珠宝首饰",
          "name": "珠宝首饰",
          "n": 13,
          "up": 7,
          "evalN": 13,
          "avgPct": 0.04,
          "leader": {
            "code": "002867",
            "name": "周大生",
            "pct": 2.15
          }
        },
        {
          "code": "休闲食品",
          "name": "休闲食品",
          "n": 13,
          "up": 6,
          "evalN": 13,
          "avgPct": 0.03,
          "leader": {
            "code": "001219",
            "name": "青岛食品",
            "pct": 10.01
          }
        },
        {
          "code": "猪肉",
          "name": "猪肉",
          "n": 25,
          "up": 8,
          "evalN": 25,
          "avgPct": -0.39,
          "leader": {
            "code": "000048",
            "name": "京基智农",
            "pct": 1.84
          }
        },
        {
          "code": "鸡肉",
          "name": "鸡肉",
          "n": 10,
          "up": 2,
          "evalN": 10,
          "avgPct": -0.43,
          "leader": {
            "code": "002746",
            "name": "仙坛股份",
            "pct": 2.33
          }
        },
        {
          "code": "美妆个护",
          "name": "美妆个护",
          "n": 20,
          "up": 9,
          "evalN": 20,
          "avgPct": -0.53,
          "leader": {
            "code": "301009",
            "name": "可靠股份",
            "pct": 2.18
          }
        },
        {
          "code": "调味品",
          "name": "调味品",
          "n": 15,
          "up": 5,
          "evalN": 15,
          "avgPct": -1.12,
          "leader": {
            "code": "600872",
            "name": "中炬高新",
            "pct": 3.99
          }
        },
        {
          "code": "白酒",
          "name": "白酒",
          "n": 20,
          "up": 1,
          "evalN": 20,
          "avgPct": -2.22,
          "leader": {
            "code": "300755",
            "name": "华致酒行",
            "pct": 0.19
          }
        }
      ]
    },
    {
      "name": "专业服务",
      "n": 65,
      "up": 50,
      "evalN": 65,
      "avgPct": 1.21,
      "leader": {
        "code": "301306",
        "name": "西测测试",
        "pct": 8.04
      },
      "concepts": [
        {
          "code": "检测认证",
          "name": "检测认证",
          "n": 20,
          "up": 19,
          "evalN": 20,
          "avgPct": 1.9,
          "leader": {
            "code": "301306",
            "name": "西测测试",
            "pct": 8.04
          }
        },
        {
          "code": "工程咨询",
          "name": "工程咨询",
          "n": 45,
          "up": 31,
          "evalN": 45,
          "avgPct": 0.91,
          "leader": {
            "code": "300826",
            "name": "测绘股份",
            "pct": 5.57
          }
        }
      ]
    },
    {
      "name": "房地产建筑",
      "n": 148,
      "up": 102,
      "evalN": 148,
      "avgPct": 0.96,
      "leader": {
        "code": "605287",
        "name": "德才股份",
        "pct": 8.02
      },
      "concepts": [
        {
          "code": "园林生态",
          "name": "园林生态",
          "n": 13,
          "up": 13,
          "evalN": 13,
          "avgPct": 1.85,
          "leader": {
            "code": "605303",
            "name": "园林股份",
            "pct": 5.06
          }
        },
        {
          "code": "物业服务",
          "name": "物业服务",
          "n": 14,
          "up": 12,
          "evalN": 14,
          "avgPct": 1.26,
          "leader": {
            "code": "000058",
            "name": "深 赛 格",
            "pct": 4.07
          }
        },
        {
          "code": "建筑装饰",
          "name": "建筑装饰",
          "n": 52,
          "up": 36,
          "evalN": 52,
          "avgPct": 1.26,
          "leader": {
            "code": "605287",
            "name": "德才股份",
            "pct": 8.02
          }
        },
        {
          "code": "房地产开发",
          "name": "房地产开发",
          "n": 69,
          "up": 41,
          "evalN": 69,
          "avgPct": 0.51,
          "leader": {
            "code": "600162",
            "name": "香江控股",
            "pct": 3.13
          }
        }
      ]
    },
    {
      "name": "有色金属",
      "n": 70,
      "up": 50,
      "evalN": 70,
      "avgPct": 0.91,
      "leader": {
        "code": "603612",
        "name": "索通发展",
        "pct": 9.97
      },
      "concepts": [
        {
          "code": "小金属",
          "name": "小金属",
          "n": 20,
          "up": 18,
          "evalN": 20,
          "avgPct": 1.82,
          "leader": {
            "code": "002149",
            "name": "西部材料",
            "pct": 7.9
          }
        },
        {
          "code": "工业金属",
          "name": "工业金属",
          "n": 50,
          "up": 32,
          "evalN": 50,
          "avgPct": 0.55,
          "leader": {
            "code": "603612",
            "name": "索通发展",
            "pct": 9.97
          }
        }
      ]
    },
    {
      "name": "软件",
      "n": 175,
      "up": 123,
      "evalN": 175,
      "avgPct": 1.12,
      "leader": {
        "code": "301218",
        "name": "华是科技",
        "pct": 15.84
      },
      "concepts": [
        {
          "code": "互联网",
          "name": "互联网",
          "n": 19,
          "up": 17,
          "evalN": 19,
          "avgPct": 1.73,
          "leader": {
            "code": "301428",
            "name": "世纪恒通",
            "pct": 14.01
          }
        },
        {
          "code": "大数据",
          "name": "大数据",
          "n": 13,
          "up": 9,
          "evalN": 13,
          "avgPct": 1.7,
          "leader": {
            "code": "300588",
            "name": "熙菱信息",
            "pct": 6.09
          }
        },
        {
          "code": "物联网",
          "name": "物联网",
          "n": 37,
          "up": 30,
          "evalN": 37,
          "avgPct": 1.38,
          "leader": {
            "code": "300007",
            "name": "汉威科技",
            "pct": 7.2
          }
        },
        {
          "code": "垂直行业IT",
          "name": "垂直行业IT",
          "n": 30,
          "up": 18,
          "evalN": 30,
          "avgPct": 1.25,
          "leader": {
            "code": "301218",
            "name": "华是科技",
            "pct": 15.84
          }
        },
        {
          "code": "IT服务与外包",
          "name": "IT服务与外包",
          "n": 24,
          "up": 17,
          "evalN": 24,
          "avgPct": 1.11,
          "leader": {
            "code": "300264",
            "name": "佳创视讯",
            "pct": 4.72
          }
        },
        {
          "code": "工业软件",
          "name": "工业软件",
          "n": 13,
          "up": 9,
          "evalN": 13,
          "avgPct": 0.81,
          "leader": {
            "code": "300017",
            "name": "网宿科技",
            "pct": 3.59
          }
        },
        {
          "code": "网络安全",
          "name": "网络安全",
          "n": 11,
          "up": 7,
          "evalN": 11,
          "avgPct": 0.59,
          "leader": {
            "code": "300369",
            "name": "绿盟科技",
            "pct": 6.85
          }
        },
        {
          "code": "智慧城市",
          "name": "智慧城市",
          "n": 18,
          "up": 10,
          "evalN": 18,
          "avgPct": 0.51,
          "leader": {
            "code": "301178",
            "name": "天亿马",
            "pct": 4.63
          }
        },
        {
          "code": "企业管理软件",
          "name": "企业管理软件",
          "n": 10,
          "up": 6,
          "evalN": 10,
          "avgPct": 0,
          "leader": {
            "code": "002530",
            "name": "金财互联",
            "pct": 3.39
          }
        }
      ]
    },
    {
      "name": "纺织服饰",
      "n": 83,
      "up": 56,
      "evalN": 83,
      "avgPct": 1.1,
      "leader": {
        "code": "300918",
        "name": "南山智尚",
        "pct": 7.75
      },
      "concepts": [
        {
          "code": "纺织制造",
          "name": "纺织制造",
          "n": 36,
          "up": 27,
          "evalN": 36,
          "avgPct": 1.69,
          "leader": {
            "code": "300918",
            "name": "南山智尚",
            "pct": 7.75
          }
        },
        {
          "code": "服装家纺",
          "name": "服装家纺",
          "n": 47,
          "up": 29,
          "evalN": 47,
          "avgPct": 0.64,
          "leader": {
            "code": "002875",
            "name": "安奈儿",
            "pct": 5.36
          }
        }
      ]
    },
    {
      "name": "能源",
      "n": 193,
      "up": 135,
      "evalN": 193,
      "avgPct": 1.14,
      "leader": {
        "code": "301232",
        "name": "飞沃科技",
        "pct": 11.91
      },
      "concepts": [
        {
          "code": "石油石化",
          "name": "石油石化",
          "n": 43,
          "up": 29,
          "evalN": 43,
          "avgPct": 1.59,
          "leader": {
            "code": "000554",
            "name": "泰山石油",
            "pct": 9.95
          }
        },
        {
          "code": "绿电运营",
          "name": "绿电运营",
          "n": 15,
          "up": 12,
          "evalN": 15,
          "avgPct": 1.54,
          "leader": {
            "code": "600173",
            "name": "卧龙新能",
            "pct": 10.1
          }
        },
        {
          "code": "风能发电",
          "name": "风能发电",
          "n": 51,
          "up": 37,
          "evalN": 51,
          "avgPct": 1.25,
          "leader": {
            "code": "301232",
            "name": "飞沃科技",
            "pct": 11.91
          }
        },
        {
          "code": "煤炭",
          "name": "煤炭",
          "n": 41,
          "up": 29,
          "evalN": 41,
          "avgPct": 0.82,
          "leader": {
            "code": "002526",
            "name": "山东矿机",
            "pct": 9.96
          }
        },
        {
          "code": "火电",
          "name": "火电",
          "n": 27,
          "up": 18,
          "evalN": 27,
          "avgPct": 0.77,
          "leader": {
            "code": "600863",
            "name": "华能蒙电",
            "pct": 3.64
          }
        },
        {
          "code": "水电核电",
          "name": "水电核电",
          "n": 16,
          "up": 10,
          "evalN": 16,
          "avgPct": 0.64,
          "leader": {
            "code": "600769",
            "name": "祥龙电业",
            "pct": 2.86
          }
        }
      ]
    },
    {
      "name": "基建",
      "n": 163,
      "up": 93,
      "evalN": 163,
      "avgPct": 0.79,
      "leader": {
        "code": "300715",
        "name": "凯伦股份",
        "pct": 10.82
      },
      "concepts": [
        {
          "code": "建筑材料",
          "name": "建筑材料",
          "n": 53,
          "up": 39,
          "evalN": 53,
          "avgPct": 1.55,
          "leader": {
            "code": "300715",
            "name": "凯伦股份",
            "pct": 10.82
          }
        },
        {
          "code": "玻璃",
          "name": "玻璃",
          "n": 15,
          "up": 11,
          "evalN": 15,
          "avgPct": 1.5,
          "leader": {
            "code": "301526",
            "name": "国际复材",
            "pct": 7.14
          }
        },
        {
          "code": "水泥",
          "name": "水泥",
          "n": 18,
          "up": 10,
          "evalN": 18,
          "avgPct": 0.8,
          "leader": {
            "code": "600802",
            "name": "福建水泥",
            "pct": 6.3
          }
        },
        {
          "code": "钢铁",
          "name": "钢铁",
          "n": 38,
          "up": 19,
          "evalN": 38,
          "avgPct": 0.22,
          "leader": {
            "code": "002443",
            "name": "金洲管道",
            "pct": 4.58
          }
        },
        {
          "code": "港口",
          "name": "港口",
          "n": 15,
          "up": 8,
          "evalN": 15,
          "avgPct": 0.03,
          "leader": {
            "code": "600279",
            "name": "重庆港",
            "pct": 1.49
          }
        },
        {
          "code": "国家工程",
          "name": "国家工程",
          "n": 24,
          "up": 6,
          "evalN": 24,
          "avgPct": 0.01,
          "leader": {
            "code": "000928",
            "name": "中钢国际",
            "pct": 2.05
          }
        }
      ]
    },
    {
      "name": "生活服务",
      "n": 16,
      "up": 11,
      "evalN": 16,
      "avgPct": 1.13,
      "leader": {
        "code": "300192",
        "name": "科德教育",
        "pct": 6.98
      },
      "concepts": [
        {
          "code": "教育",
          "name": "教育",
          "n": 16,
          "up": 11,
          "evalN": 16,
          "avgPct": 1.13,
          "leader": {
            "code": "300192",
            "name": "科德教育",
            "pct": 6.98
          }
        }
      ]
    },
    {
      "name": "社会服务",
      "n": 80,
      "up": 58,
      "evalN": 80,
      "avgPct": 0.85,
      "leader": {
        "code": "300943",
        "name": "春晖智控",
        "pct": 6.65
      },
      "concepts": [
        {
          "code": "燃气",
          "name": "燃气",
          "n": 35,
          "up": 26,
          "evalN": 35,
          "avgPct": 1.03,
          "leader": {
            "code": "300943",
            "name": "春晖智控",
            "pct": 6.65
          }
        },
        {
          "code": "供热",
          "name": "供热",
          "n": 17,
          "up": 11,
          "evalN": 17,
          "avgPct": 0.76,
          "leader": {
            "code": "603391",
            "name": "力聚热能",
            "pct": 3.19
          }
        },
        {
          "code": "供电",
          "name": "供电",
          "n": 9,
          "up": 7,
          "evalN": 9,
          "avgPct": 0.69,
          "leader": {
            "code": "600101",
            "name": "明星电力",
            "pct": 2.39
          }
        },
        {
          "code": "水务",
          "name": "水务",
          "n": 19,
          "up": 14,
          "evalN": 19,
          "avgPct": 0.67,
          "leader": {
            "code": "300897",
            "name": "山科智能",
            "pct": 3.47
          }
        }
      ]
    },
    {
      "name": "交运物流",
      "n": 120,
      "up": 67,
      "evalN": 120,
      "avgPct": 0.51,
      "leader": {
        "code": "002889",
        "name": "东方嘉盛",
        "pct": 9.97
      },
      "concepts": [
        {
          "code": "快递物流",
          "name": "快递物流",
          "n": 56,
          "up": 35,
          "evalN": 56,
          "avgPct": 0.91,
          "leader": {
            "code": "002889",
            "name": "东方嘉盛",
            "pct": 9.97
          }
        },
        {
          "code": "铁路公路",
          "name": "铁路公路",
          "n": 34,
          "up": 18,
          "evalN": 34,
          "avgPct": 0.5,
          "leader": {
            "code": "000755",
            "name": "山西高速",
            "pct": 7.59
          }
        },
        {
          "code": "航空机场",
          "name": "航空机场",
          "n": 13,
          "up": 6,
          "evalN": 13,
          "avgPct": -0.06,
          "leader": {
            "code": "000089",
            "name": "深圳机场",
            "pct": 1.69
          }
        },
        {
          "code": "航运",
          "name": "航运",
          "n": 17,
          "up": 8,
          "evalN": 17,
          "avgPct": -0.36,
          "leader": {
            "code": "600751",
            "name": "海航科技",
            "pct": 1.5
          }
        }
      ]
    },
    {
      "name": "金融类",
      "n": 154,
      "up": 60,
      "evalN": 154,
      "avgPct": -0.19,
      "leader": {
        "code": "002647",
        "name": "仁东控股",
        "pct": 3.45
      },
      "concepts": [
        {
          "code": "金融科技",
          "name": "金融科技",
          "n": 36,
          "up": 25,
          "evalN": 36,
          "avgPct": 0.39,
          "leader": {
            "code": "002647",
            "name": "仁东控股",
            "pct": 3.45
          }
        },
        {
          "code": "多元金融",
          "name": "多元金融",
          "n": 24,
          "up": 12,
          "evalN": 24,
          "avgPct": -0.21,
          "leader": {
            "code": "600783",
            "name": "鲁信创投",
            "pct": 3.31
          }
        },
        {
          "code": "保险",
          "name": "保险",
          "n": 6,
          "up": 1,
          "evalN": 6,
          "avgPct": -0.28,
          "leader": {
            "code": "601601",
            "name": "中国太保",
            "pct": 0.14
          }
        },
        {
          "code": "银行",
          "name": "银行",
          "n": 42,
          "up": 12,
          "evalN": 42,
          "avgPct": -0.35,
          "leader": {
            "code": "002807",
            "name": "江阴银行",
            "pct": 1.21
          }
        },
        {
          "code": "券商概念",
          "name": "券商概念",
          "n": 46,
          "up": 10,
          "evalN": 46,
          "avgPct": -0.46,
          "leader": {
            "code": "000712",
            "name": "锦龙股份",
            "pct": 2.66
          }
        }
      ]
    },
    {
      "name": "农业",
      "n": 22,
      "up": 12,
      "evalN": 22,
      "avgPct": 0.15,
      "leader": {
        "code": "603336",
        "name": "宏辉果蔬",
        "pct": 2.98
      },
      "concepts": [
        {
          "code": "林业",
          "name": "林业",
          "n": 5,
          "up": 4,
          "evalN": 5,
          "avgPct": 0.3,
          "leader": {
            "code": "002679",
            "name": "福建金森",
            "pct": 0.73
          }
        },
        {
          "code": "农业种植",
          "name": "农业种植",
          "n": 17,
          "up": 8,
          "evalN": 17,
          "avgPct": 0.1,
          "leader": {
            "code": "603336",
            "name": "宏辉果蔬",
            "pct": 2.98
          }
        }
      ]
    },
    {
      "name": "旅游酒店餐饮",
      "n": 32,
      "up": 8,
      "evalN": 32,
      "avgPct": -0.45,
      "leader": {
        "code": "600576",
        "name": "祥源文旅",
        "pct": 2.73
      },
      "concepts": [
        {
          "code": "旅游景区",
          "name": "旅游景区",
          "n": 24,
          "up": 7,
          "evalN": 24,
          "avgPct": -0.41,
          "leader": {
            "code": "600576",
            "name": "祥源文旅",
            "pct": 2.73
          }
        },
        {
          "code": "酒店餐饮",
          "name": "酒店餐饮",
          "n": 8,
          "up": 1,
          "evalN": 8,
          "avgPct": -0.59,
          "leader": {
            "code": "301073",
            "name": "君亭酒店",
            "pct": 0.25
          }
        }
      ]
    }
  ]
  };

  var WEEK = {
  meta: {
    "lastDate": "2026-10-28",
    "exportedAt": "2026-10-28T11:15:15.782Z",
    "stocksEvaluated": 4405,
    "categories": 31,
    "concepts": 144,
    "note": "两级概念热力（大类 → 子概念，一股一概念）：面积=涨股比 up/n ×1000+1，颜色=平均涨幅 avgPct（±10% 封顶），leader=区间涨幅第一；日/周/月/年均为真实区间统计，与 heatmap-periods.json 同步（导出 meta：stocks 4414 · filtered 814 · leaderStocks 4196 · leaderDays 6288）",
    "period": "week",
    "periodName": "周",
    "periodRange": "近 5 个交易日"
  },
  categories: [
    {
      "name": "制造",
      "n": 353,
      "up": 188,
      "evalN": 353,
      "avgPct": 1.84,
      "leader": {
        "code": "000678",
        "name": "襄阳轴承",
        "pct": 60.97
      },
      "concepts": [
        {
          "code": "汽车传动",
          "name": "汽车传动",
          "n": 47,
          "up": 33,
          "evalN": 47,
          "avgPct": 6.22,
          "leader": {
            "code": "000678",
            "name": "襄阳轴承",
            "pct": 60.97
          }
        },
        {
          "code": "汽车电子",
          "name": "汽车电子",
          "n": 40,
          "up": 24,
          "evalN": 40,
          "avgPct": 3.87,
          "leader": {
            "code": "605333",
            "name": "沪光股份",
            "pct": 33.06
          }
        },
        {
          "code": "汽车内饰",
          "name": "汽车内饰",
          "n": 18,
          "up": 10,
          "evalN": 18,
          "avgPct": 3.37,
          "leader": {
            "code": "603179",
            "name": "新泉股份",
            "pct": 19.79
          }
        },
        {
          "code": "汽车配件",
          "name": "汽车配件",
          "n": 77,
          "up": 46,
          "evalN": 77,
          "avgPct": 2.31,
          "leader": {
            "code": "603037",
            "name": "凯众股份",
            "pct": 22.17
          }
        },
        {
          "code": "车身结构",
          "name": "车身结构",
          "n": 38,
          "up": 20,
          "evalN": 38,
          "avgPct": 1.28,
          "leader": {
            "code": "603370",
            "name": "华新精科",
            "pct": 19.92
          }
        },
        {
          "code": "电机电控",
          "name": "电机电控",
          "n": 26,
          "up": 14,
          "evalN": 26,
          "avgPct": 0.73,
          "leader": {
            "code": "603350",
            "name": "安乃达",
            "pct": 14.93
          }
        },
        {
          "code": "动力电池",
          "name": "动力电池",
          "n": 61,
          "up": 22,
          "evalN": 61,
          "avgPct": -0.24,
          "leader": {
            "code": "000700",
            "name": "模塑科技",
            "pct": 30.66
          }
        },
        {
          "code": "汽车整车",
          "name": "汽车整车",
          "n": 21,
          "up": 10,
          "evalN": 21,
          "avgPct": -0.88,
          "leader": {
            "code": "600104",
            "name": "上汽集团",
            "pct": 3.22
          }
        },
        {
          "code": "智能机器人",
          "name": "智能机器人",
          "n": 25,
          "up": 9,
          "evalN": 25,
          "avgPct": -2.87,
          "leader": {
            "code": "603489",
            "name": "八方股份",
            "pct": 6.82
          }
        }
      ]
    },
    {
      "name": "智能制造",
      "n": 203,
      "up": 112,
      "evalN": 203,
      "avgPct": 1.5,
      "leader": {
        "code": "603528",
        "name": "多伦科技",
        "pct": 31.8
      },
      "concepts": [
        {
          "code": "工业机器人",
          "name": "工业机器人",
          "n": 54,
          "up": 42,
          "evalN": 54,
          "avgPct": 4.79,
          "leader": {
            "code": "003021",
            "name": "兆威机电",
            "pct": 28.49
          }
        },
        {
          "code": "重型装备",
          "name": "重型装备",
          "n": 20,
          "up": 12,
          "evalN": 20,
          "avgPct": 1.44,
          "leader": {
            "code": "603298",
            "name": "杭叉集团",
            "pct": 15.71
          }
        },
        {
          "code": "机床与激光",
          "name": "机床与激光",
          "n": 26,
          "up": 14,
          "evalN": 26,
          "avgPct": 0.77,
          "leader": {
            "code": "300503",
            "name": "昊志机电",
            "pct": 18.43
          }
        },
        {
          "code": "智能装备",
          "name": "智能装备",
          "n": 58,
          "up": 27,
          "evalN": 58,
          "avgPct": 0.77,
          "leader": {
            "code": "603337",
            "name": "杰克科技",
            "pct": 31.55
          }
        },
        {
          "code": "智能交通",
          "name": "智能交通",
          "n": 45,
          "up": 17,
          "evalN": 45,
          "avgPct": -1.06,
          "leader": {
            "code": "603528",
            "name": "多伦科技",
            "pct": 31.8
          }
        }
      ]
    },
    {
      "name": "消费",
      "n": 423,
      "up": 120,
      "evalN": 423,
      "avgPct": -1.7,
      "leader": {
        "code": "301502",
        "name": "华阳智能",
        "pct": 65.29
      },
      "concepts": [
        {
          "code": "休闲食品",
          "name": "休闲食品",
          "n": 13,
          "up": 7,
          "evalN": 13,
          "avgPct": 3.29,
          "leader": {
            "code": "001219",
            "name": "青岛食品",
            "pct": 32.16
          }
        },
        {
          "code": "新零售",
          "name": "新零售",
          "n": 71,
          "up": 34,
          "evalN": 71,
          "avgPct": 1.64,
          "leader": {
            "code": "600838",
            "name": "上海九百",
            "pct": 53.91
          }
        },
        {
          "code": "家电",
          "name": "家电",
          "n": 91,
          "up": 29,
          "evalN": 91,
          "avgPct": -0.24,
          "leader": {
            "code": "301502",
            "name": "华阳智能",
            "pct": 65.29
          }
        },
        {
          "code": "白酒",
          "name": "白酒",
          "n": 20,
          "up": 7,
          "evalN": 20,
          "avgPct": -1.44,
          "leader": {
            "code": "603369",
            "name": "今世缘",
            "pct": 3.42
          }
        },
        {
          "code": "美妆个护",
          "name": "美妆个护",
          "n": 20,
          "up": 3,
          "evalN": 20,
          "avgPct": -2.64,
          "leader": {
            "code": "001328",
            "name": "登康口腔",
            "pct": 8.71
          }
        },
        {
          "code": "乳业/饮料",
          "name": "乳业/饮料",
          "n": 29,
          "up": 11,
          "evalN": 29,
          "avgPct": -2.78,
          "leader": {
            "code": "300997",
            "name": "欢乐家",
            "pct": 4.76
          }
        },
        {
          "code": "珠宝首饰",
          "name": "珠宝首饰",
          "n": 13,
          "up": 2,
          "evalN": 13,
          "avgPct": -3.21,
          "leader": {
            "code": "002867",
            "name": "周大生",
            "pct": 2.55
          }
        },
        {
          "code": "鸡肉",
          "name": "鸡肉",
          "n": 10,
          "up": 1,
          "evalN": 10,
          "avgPct": -3.53,
          "leader": {
            "code": "002982",
            "name": "湘佳股份",
            "pct": 9.79
          }
        },
        {
          "code": "水产养殖",
          "name": "水产养殖",
          "n": 12,
          "up": 2,
          "evalN": 12,
          "avgPct": -3.65,
          "leader": {
            "code": "002696",
            "name": "百洋股份",
            "pct": 11.88
          }
        },
        {
          "code": "猪肉",
          "name": "猪肉",
          "n": 25,
          "up": 1,
          "evalN": 25,
          "avgPct": -3.7,
          "leader": {
            "code": "000895",
            "name": "双汇发展",
            "pct": 0.85
          }
        },
        {
          "code": "食品加工",
          "name": "食品加工",
          "n": 64,
          "up": 12,
          "evalN": 64,
          "avgPct": -3.92,
          "leader": {
            "code": "603886",
            "name": "元祖股份",
            "pct": 12.19
          }
        },
        {
          "code": "体育户外",
          "name": "体育户外",
          "n": 16,
          "up": 3,
          "evalN": 16,
          "avgPct": -3.93,
          "leader": {
            "code": "605080",
            "name": "浙江自然",
            "pct": 10.33
          }
        },
        {
          "code": "调味品",
          "name": "调味品",
          "n": 15,
          "up": 2,
          "evalN": 15,
          "avgPct": -3.94,
          "leader": {
            "code": "600872",
            "name": "中炬高新",
            "pct": 4.98
          }
        },
        {
          "code": "跨境/免税",
          "name": "跨境/免税",
          "n": 17,
          "up": 6,
          "evalN": 17,
          "avgPct": -4.31,
          "leader": {
            "code": "002315",
            "name": "焦点科技",
            "pct": 9.64
          }
        },
        {
          "code": "啤酒",
          "name": "啤酒",
          "n": 7,
          "up": 0,
          "evalN": 7,
          "avgPct": -4.9,
          "leader": {
            "code": "600132",
            "name": "重庆啤酒",
            "pct": -0.27
          }
        }
      ]
    },
    {
      "name": "医疗",
      "n": 190,
      "up": 63,
      "evalN": 190,
      "avgPct": -1.48,
      "leader": {
        "code": "301101",
        "name": "明月镜片",
        "pct": 16.54
      },
      "concepts": [
        {
          "code": "医疗服务",
          "name": "医疗服务",
          "n": 13,
          "up": 9,
          "evalN": 13,
          "avgPct": 1.59,
          "leader": {
            "code": "002612",
            "name": "朗姿股份",
            "pct": 15.75
          }
        },
        {
          "code": "医疗器械",
          "name": "医疗器械",
          "n": 27,
          "up": 14,
          "evalN": 27,
          "avgPct": 1.54,
          "leader": {
            "code": "301101",
            "name": "明月镜片",
            "pct": 16.54
          }
        },
        {
          "code": "体外诊断",
          "name": "体外诊断",
          "n": 22,
          "up": 7,
          "evalN": 22,
          "avgPct": -0.98,
          "leader": {
            "code": "300298",
            "name": "三诺生物",
            "pct": 12.21
          }
        },
        {
          "code": "医药商业",
          "name": "医药商业",
          "n": 30,
          "up": 8,
          "evalN": 30,
          "avgPct": -1.59,
          "leader": {
            "code": "301015",
            "name": "百洋医药",
            "pct": 6.96
          }
        },
        {
          "code": "医疗耗材",
          "name": "医疗耗材",
          "n": 28,
          "up": 9,
          "evalN": 28,
          "avgPct": -1.82,
          "leader": {
            "code": "300529",
            "name": "健帆生物",
            "pct": 10.38
          }
        },
        {
          "code": "中药",
          "name": "中药",
          "n": 59,
          "up": 13,
          "evalN": 59,
          "avgPct": -3.11,
          "leader": {
            "code": "301331",
            "name": "恩威医药",
            "pct": 4.7
          }
        },
        {
          "code": "AI医疗",
          "name": "AI医疗",
          "n": 11,
          "up": 3,
          "evalN": 11,
          "avgPct": -3.62,
          "leader": {
            "code": "603716",
            "name": "塞力医疗",
            "pct": 7.98
          }
        }
      ]
    },
    {
      "name": "金融类",
      "n": 155,
      "up": 48,
      "evalN": 155,
      "avgPct": -2.09,
      "leader": {
        "code": "600901",
        "name": "江苏金租",
        "pct": 5.76
      },
      "concepts": [
        {
          "code": "保险",
          "name": "保险",
          "n": 6,
          "up": 4,
          "evalN": 6,
          "avgPct": 1.05,
          "leader": {
            "code": "601628",
            "name": "中国人寿",
            "pct": 3.15
          }
        },
        {
          "code": "银行",
          "name": "银行",
          "n": 42,
          "up": 31,
          "evalN": 42,
          "avgPct": 0.93,
          "leader": {
            "code": "601825",
            "name": "沪农商行",
            "pct": 4.56
          }
        },
        {
          "code": "券商概念",
          "name": "券商概念",
          "n": 47,
          "up": 4,
          "evalN": 47,
          "avgPct": -2.55,
          "leader": {
            "code": "002945",
            "name": "华林证券",
            "pct": 2.04
          }
        },
        {
          "code": "金融科技",
          "name": "金融科技",
          "n": 36,
          "up": 6,
          "evalN": 36,
          "avgPct": -3.8,
          "leader": {
            "code": "300561",
            "name": "汇金科技",
            "pct": 4.62
          }
        },
        {
          "code": "多元金融",
          "name": "多元金融",
          "n": 24,
          "up": 3,
          "evalN": 24,
          "avgPct": -4.68,
          "leader": {
            "code": "600901",
            "name": "江苏金租",
            "pct": 5.76
          }
        }
      ]
    },
    {
      "name": "交运物流",
      "n": 120,
      "up": 34,
      "evalN": 120,
      "avgPct": -1.13,
      "leader": {
        "code": "002889",
        "name": "东方嘉盛",
        "pct": 11.64
      },
      "concepts": [
        {
          "code": "航空机场",
          "name": "航空机场",
          "n": 13,
          "up": 7,
          "evalN": 13,
          "avgPct": 0.87,
          "leader": {
            "code": "600009",
            "name": "上海机场",
            "pct": 5.26
          }
        },
        {
          "code": "铁路公路",
          "name": "铁路公路",
          "n": 34,
          "up": 9,
          "evalN": 34,
          "avgPct": -1.24,
          "leader": {
            "code": "000755",
            "name": "山西高速",
            "pct": 5.93
          }
        },
        {
          "code": "快递物流",
          "name": "快递物流",
          "n": 56,
          "up": 17,
          "evalN": 56,
          "avgPct": -1.27,
          "leader": {
            "code": "002889",
            "name": "东方嘉盛",
            "pct": 11.64
          }
        },
        {
          "code": "航运",
          "name": "航运",
          "n": 17,
          "up": 1,
          "evalN": 17,
          "avgPct": -1.99,
          "leader": {
            "code": "603565",
            "name": "中谷物流",
            "pct": 5.49
          }
        }
      ]
    },
    {
      "name": "文化娱乐",
      "n": 120,
      "up": 36,
      "evalN": 120,
      "avgPct": -2.46,
      "leader": {
        "code": "300494",
        "name": "盛天网络",
        "pct": 16.27
      },
      "concepts": [
        {
          "code": "游戏",
          "name": "游戏",
          "n": 24,
          "up": 12,
          "evalN": 24,
          "avgPct": 0.79,
          "leader": {
            "code": "300494",
            "name": "盛天网络",
            "pct": 16.27
          }
        },
        {
          "code": "影视",
          "name": "影视",
          "n": 19,
          "up": 7,
          "evalN": 19,
          "avgPct": -2.34,
          "leader": {
            "code": "300291",
            "name": "百纳千成",
            "pct": 14.5
          }
        },
        {
          "code": "文化传媒",
          "name": "文化传媒",
          "n": 77,
          "up": 17,
          "evalN": 77,
          "avgPct": -3.5,
          "leader": {
            "code": "300860",
            "name": "锋尚文化",
            "pct": 15.32
          }
        }
      ]
    },
    {
      "name": "通用制造",
      "n": 349,
      "up": 87,
      "evalN": 349,
      "avgPct": -2.64,
      "leader": {
        "code": "300307",
        "name": "慈星股份",
        "pct": 40.24
      },
      "concepts": [
        {
          "code": "机械零部件",
          "name": "机械零部件",
          "n": 53,
          "up": 20,
          "evalN": 53,
          "avgPct": 0.49,
          "leader": {
            "code": "301261",
            "name": "恒工精密",
            "pct": 25.55
          }
        },
        {
          "code": "轨道交通",
          "name": "轨道交通",
          "n": 14,
          "up": 4,
          "evalN": 14,
          "avgPct": -1.67,
          "leader": {
            "code": "603680",
            "name": "今创集团",
            "pct": 11.19
          }
        },
        {
          "code": "通用设备",
          "name": "通用设备",
          "n": 104,
          "up": 30,
          "evalN": 104,
          "avgPct": -2.63,
          "leader": {
            "code": "300307",
            "name": "慈星股份",
            "pct": 40.24
          }
        },
        {
          "code": "电工器材",
          "name": "电工器材",
          "n": 49,
          "up": 11,
          "evalN": 49,
          "avgPct": -2.73,
          "leader": {
            "code": "002724",
            "name": "海洋王",
            "pct": 31.5
          }
        },
        {
          "code": "电力设备",
          "name": "电力设备",
          "n": 83,
          "up": 15,
          "evalN": 83,
          "avgPct": -3.6,
          "leader": {
            "code": "301023",
            "name": "奕帆传动",
            "pct": 25.49
          }
        },
        {
          "code": "电子元器件",
          "name": "电子元器件",
          "n": 46,
          "up": 7,
          "evalN": 46,
          "avgPct": -4.71,
          "leader": {
            "code": "301359",
            "name": "东南电子",
            "pct": 12.9
          }
        }
      ]
    },
    {
      "name": "房地产建筑",
      "n": 148,
      "up": 19,
      "evalN": 148,
      "avgPct": -3.45,
      "leader": {
        "code": "300949",
        "name": "奥雅股份",
        "pct": 65.68
      },
      "concepts": [
        {
          "code": "园林生态",
          "name": "园林生态",
          "n": 13,
          "up": 2,
          "evalN": 13,
          "avgPct": -0.03,
          "leader": {
            "code": "300949",
            "name": "奥雅股份",
            "pct": 65.68
          }
        },
        {
          "code": "物业服务",
          "name": "物业服务",
          "n": 14,
          "up": 1,
          "evalN": 14,
          "avgPct": -2.79,
          "leader": {
            "code": "000058",
            "name": "深 赛 格",
            "pct": 15.03
          }
        },
        {
          "code": "房地产开发",
          "name": "房地产开发",
          "n": 69,
          "up": 9,
          "evalN": 69,
          "avgPct": -3.47,
          "leader": {
            "code": "600094",
            "name": "大名城",
            "pct": 19.7
          }
        },
        {
          "code": "建筑装饰",
          "name": "建筑装饰",
          "n": 52,
          "up": 7,
          "evalN": 52,
          "avgPct": -4.45,
          "leader": {
            "code": "002941",
            "name": "新疆交建",
            "pct": 5.21
          }
        }
      ]
    },
    {
      "name": "芯片",
      "n": 87,
      "up": 13,
      "evalN": 87,
      "avgPct": -7.73,
      "leader": {
        "code": "603160",
        "name": "汇顶科技",
        "pct": 15.99
      },
      "concepts": [
        {
          "code": "存储芯片",
          "name": "存储芯片",
          "n": 10,
          "up": 4,
          "evalN": 10,
          "avgPct": -0.48,
          "leader": {
            "code": "300223",
            "name": "君正股份",
            "pct": 7.18
          }
        },
        {
          "code": "芯片",
          "name": "芯片",
          "n": 22,
          "up": 7,
          "evalN": 22,
          "avgPct": -1.37,
          "leader": {
            "code": "603160",
            "name": "汇顶科技",
            "pct": 15.99
          }
        },
        {
          "code": "PCB",
          "name": "PCB",
          "n": 55,
          "up": 2,
          "evalN": 55,
          "avgPct": -11.6,
          "leader": {
            "code": "002741",
            "name": "光华科技",
            "pct": 7.03
          }
        }
      ]
    },
    {
      "name": "能源",
      "n": 193,
      "up": 49,
      "evalN": 193,
      "avgPct": -2.66,
      "leader": {
        "code": "600506",
        "name": "统一股份",
        "pct": 17.68
      },
      "concepts": [
        {
          "code": "石油石化",
          "name": "石油石化",
          "n": 43,
          "up": 20,
          "evalN": 43,
          "avgPct": -0.5,
          "leader": {
            "code": "600506",
            "name": "统一股份",
            "pct": 17.68
          }
        },
        {
          "code": "煤炭",
          "name": "煤炭",
          "n": 41,
          "up": 9,
          "evalN": 41,
          "avgPct": -2.19,
          "leader": {
            "code": "002526",
            "name": "山东矿机",
            "pct": 13.31
          }
        },
        {
          "code": "火电",
          "name": "火电",
          "n": 27,
          "up": 5,
          "evalN": 27,
          "avgPct": -3.16,
          "leader": {
            "code": "600795",
            "name": "国电电力",
            "pct": 2.33
          }
        },
        {
          "code": "风能发电",
          "name": "风能发电",
          "n": 51,
          "up": 8,
          "evalN": 51,
          "avgPct": -3.76,
          "leader": {
            "code": "603606",
            "name": "东方电缆",
            "pct": 4.47
          }
        },
        {
          "code": "绿电运营",
          "name": "绿电运营",
          "n": 15,
          "up": 3,
          "evalN": 15,
          "avgPct": -3.77,
          "leader": {
            "code": "000958",
            "name": "电投产融",
            "pct": 2.23
          }
        },
        {
          "code": "水电核电",
          "name": "水电核电",
          "n": 16,
          "up": 4,
          "evalN": 16,
          "avgPct": -4.33,
          "leader": {
            "code": "600674",
            "name": "川投能源",
            "pct": 3.5
          }
        }
      ]
    },
    {
      "name": "资源",
      "n": 67,
      "up": 15,
      "evalN": 67,
      "avgPct": -3.97,
      "leader": {
        "code": "300224",
        "name": "正海磁材",
        "pct": 10.07
      },
      "concepts": [
        {
          "code": "锂",
          "name": "锂",
          "n": 15,
          "up": 5,
          "evalN": 15,
          "avgPct": -0.82,
          "leader": {
            "code": "300631",
            "name": "久吾高科",
            "pct": 9.27
          }
        },
        {
          "code": "稀土永磁",
          "name": "稀土永磁",
          "n": 19,
          "up": 8,
          "evalN": 19,
          "avgPct": -0.9,
          "leader": {
            "code": "300224",
            "name": "正海磁材",
            "pct": 10.07
          }
        },
        {
          "code": "特种钢",
          "name": "特种钢",
          "n": 15,
          "up": 2,
          "evalN": 15,
          "avgPct": -5.07,
          "leader": {
            "code": "301160",
            "name": "翔楼新材",
            "pct": 3.46
          }
        },
        {
          "code": "白银",
          "name": "白银",
          "n": 6,
          "up": 0,
          "evalN": 6,
          "avgPct": -8.87,
          "leader": {
            "code": "600531",
            "name": "豫光金铅",
            "pct": -4.13
          }
        },
        {
          "code": "黄金",
          "name": "黄金",
          "n": 12,
          "up": 0,
          "evalN": 12,
          "avgPct": -8.95,
          "leader": {
            "code": "601899",
            "name": "紫金矿业",
            "pct": -3.19
          }
        }
      ]
    },
    {
      "name": "轻工制造",
      "n": 131,
      "up": 22,
      "evalN": 131,
      "avgPct": -3.38,
      "leader": {
        "code": "605488",
        "name": "福莱新材",
        "pct": 47.71
      },
      "concepts": [
        {
          "code": "其他轻工",
          "name": "其他轻工",
          "n": 18,
          "up": 4,
          "evalN": 18,
          "avgPct": -0.83,
          "leader": {
            "code": "002779",
            "name": "中坚科技",
            "pct": 16.18
          }
        },
        {
          "code": "包装印刷",
          "name": "包装印刷",
          "n": 46,
          "up": 9,
          "evalN": 46,
          "avgPct": -2.96,
          "leader": {
            "code": "605488",
            "name": "福莱新材",
            "pct": 47.71
          }
        },
        {
          "code": "造纸",
          "name": "造纸",
          "n": 22,
          "up": 2,
          "evalN": 22,
          "avgPct": -3.63,
          "leader": {
            "code": "600963",
            "name": "岳阳林纸",
            "pct": 14.37
          }
        },
        {
          "code": "家居用品",
          "name": "家居用品",
          "n": 45,
          "up": 7,
          "evalN": 45,
          "avgPct": -4.72,
          "leader": {
            "code": "301595",
            "name": "太力科技",
            "pct": 13.14
          }
        }
      ]
    },
    {
      "name": "软件",
      "n": 175,
      "up": 35,
      "evalN": 175,
      "avgPct": -3.42,
      "leader": {
        "code": "301428",
        "name": "世纪恒通",
        "pct": 51.03
      },
      "concepts": [
        {
          "code": "互联网",
          "name": "互联网",
          "n": 19,
          "up": 3,
          "evalN": 19,
          "avgPct": -0.88,
          "leader": {
            "code": "301428",
            "name": "世纪恒通",
            "pct": 51.03
          }
        },
        {
          "code": "工业软件",
          "name": "工业软件",
          "n": 13,
          "up": 4,
          "evalN": 13,
          "avgPct": -2.14,
          "leader": {
            "code": "300017",
            "name": "网宿科技",
            "pct": 15.95
          }
        },
        {
          "code": "IT服务与外包",
          "name": "IT服务与外包",
          "n": 24,
          "up": 3,
          "evalN": 24,
          "avgPct": -2.15,
          "leader": {
            "code": "301313",
            "name": "凡拓数创",
            "pct": 20.69
          }
        },
        {
          "code": "企业管理软件",
          "name": "企业管理软件",
          "n": 10,
          "up": 2,
          "evalN": 10,
          "avgPct": -2.59,
          "leader": {
            "code": "603171",
            "name": "税友股份",
            "pct": 2.23
          }
        },
        {
          "code": "垂直行业IT",
          "name": "垂直行业IT",
          "n": 30,
          "up": 8,
          "evalN": 30,
          "avgPct": -3.54,
          "leader": {
            "code": "300496",
            "name": "中科创达",
            "pct": 6.19
          }
        },
        {
          "code": "网络安全",
          "name": "网络安全",
          "n": 11,
          "up": 4,
          "evalN": 11,
          "avgPct": -3.61,
          "leader": {
            "code": "300369",
            "name": "绿盟科技",
            "pct": 16.96
          }
        },
        {
          "code": "物联网",
          "name": "物联网",
          "n": 37,
          "up": 8,
          "evalN": 37,
          "avgPct": -3.9,
          "leader": {
            "code": "300007",
            "name": "汉威科技",
            "pct": 15.49
          }
        },
        {
          "code": "大数据",
          "name": "大数据",
          "n": 13,
          "up": 2,
          "evalN": 13,
          "avgPct": -3.99,
          "leader": {
            "code": "603138",
            "name": "海量数据",
            "pct": 5.33
          }
        },
        {
          "code": "智慧城市",
          "name": "智慧城市",
          "n": 18,
          "up": 1,
          "evalN": 18,
          "avgPct": -7.45,
          "leader": {
            "code": "301178",
            "name": "天亿马",
            "pct": 0.12
          }
        }
      ]
    },
    {
      "name": "创新药",
      "n": 179,
      "up": 29,
      "evalN": 179,
      "avgPct": -3.97,
      "leader": {
        "code": "300584",
        "name": "海辰药业",
        "pct": 21.09
      },
      "concepts": [
        {
          "code": "创新药",
          "name": "创新药",
          "n": 26,
          "up": 8,
          "evalN": 26,
          "avgPct": -0.89,
          "leader": {
            "code": "300584",
            "name": "海辰药业",
            "pct": 21.09
          }
        },
        {
          "code": "生物制品",
          "name": "生物制品",
          "n": 26,
          "up": 6,
          "evalN": 26,
          "avgPct": -3.78,
          "leader": {
            "code": "300357",
            "name": "我武生物",
            "pct": 9.38
          }
        },
        {
          "code": "创新药产业链",
          "name": "创新药产业链",
          "n": 24,
          "up": 6,
          "evalN": 24,
          "avgPct": -4.06,
          "leader": {
            "code": "300358",
            "name": "楚天科技",
            "pct": 5.23
          }
        },
        {
          "code": "原料药",
          "name": "原料药",
          "n": 44,
          "up": 3,
          "evalN": 44,
          "avgPct": -4.52,
          "leader": {
            "code": "301246",
            "name": "宏源药业",
            "pct": 3.09
          }
        },
        {
          "code": "化学制药",
          "name": "化学制药",
          "n": 59,
          "up": 6,
          "evalN": 59,
          "avgPct": -4.96,
          "leader": {
            "code": "300006",
            "name": "莱美药业",
            "pct": 6.67
          }
        }
      ]
    },
    {
      "name": "基建",
      "n": 163,
      "up": 24,
      "evalN": 163,
      "avgPct": -2.66,
      "leader": {
        "code": "603028",
        "name": "赛福天",
        "pct": 47.52
      },
      "concepts": [
        {
          "code": "国家工程",
          "name": "国家工程",
          "n": 24,
          "up": 7,
          "evalN": 24,
          "avgPct": -0.99,
          "leader": {
            "code": "002140",
            "name": "东华科技",
            "pct": 5.3
          }
        },
        {
          "code": "钢铁",
          "name": "钢铁",
          "n": 38,
          "up": 4,
          "evalN": 38,
          "avgPct": -1.2,
          "leader": {
            "code": "603028",
            "name": "赛福天",
            "pct": 47.52
          }
        },
        {
          "code": "港口",
          "name": "港口",
          "n": 15,
          "up": 2,
          "evalN": 15,
          "avgPct": -1.57,
          "leader": {
            "code": "000088",
            "name": "盐 田 港",
            "pct": 2
          }
        },
        {
          "code": "水泥",
          "name": "水泥",
          "n": 18,
          "up": 1,
          "evalN": 18,
          "avgPct": -2.63,
          "leader": {
            "code": "600802",
            "name": "福建水泥",
            "pct": 3.12
          }
        },
        {
          "code": "玻璃",
          "name": "玻璃",
          "n": 15,
          "up": 2,
          "evalN": 15,
          "avgPct": -3.46,
          "leader": {
            "code": "600819",
            "name": "耀皮玻璃",
            "pct": 0.38
          }
        },
        {
          "code": "建筑材料",
          "name": "建筑材料",
          "n": 53,
          "up": 8,
          "evalN": 53,
          "avgPct": -4.56,
          "leader": {
            "code": "001386",
            "name": "马可波罗",
            "pct": 4.02
          }
        }
      ]
    },
    {
      "name": "消费电子",
      "n": 175,
      "up": 45,
      "evalN": 175,
      "avgPct": -2.28,
      "leader": {
        "code": "301479",
        "name": "弘景光电",
        "pct": 25.4
      },
      "concepts": [
        {
          "code": "整机与品牌",
          "name": "整机与品牌",
          "n": 45,
          "up": 13,
          "evalN": 45,
          "avgPct": -1.4,
          "leader": {
            "code": "000810",
            "name": "创维数字",
            "pct": 20.52
          }
        },
        {
          "code": "消费电子零部件",
          "name": "消费电子零部件",
          "n": 65,
          "up": 22,
          "evalN": 65,
          "avgPct": -1.59,
          "leader": {
            "code": "301479",
            "name": "弘景光电",
            "pct": 25.4
          }
        },
        {
          "code": "显示与LED",
          "name": "显示与LED",
          "n": 65,
          "up": 10,
          "evalN": 65,
          "avgPct": -3.59,
          "leader": {
            "code": "300296",
            "name": "利亚德",
            "pct": 10.48
          }
        }
      ]
    },
    {
      "name": "环保",
      "n": 123,
      "up": 27,
      "evalN": 123,
      "avgPct": -3.28,
      "leader": {
        "code": "300961",
        "name": "深水海纳",
        "pct": 11.92
      },
      "concepts": [
        {
          "code": "环保运营",
          "name": "环保运营",
          "n": 42,
          "up": 14,
          "evalN": 42,
          "avgPct": -1.62,
          "leader": {
            "code": "300815",
            "name": "玉禾田",
            "pct": 10.3
          }
        },
        {
          "code": "污水处理",
          "name": "污水处理",
          "n": 32,
          "up": 5,
          "evalN": 32,
          "avgPct": -3.01,
          "leader": {
            "code": "300961",
            "name": "深水海纳",
            "pct": 11.92
          }
        },
        {
          "code": "再生资源",
          "name": "再生资源",
          "n": 20,
          "up": 2,
          "evalN": 20,
          "avgPct": -4.79,
          "leader": {
            "code": "301265",
            "name": "华新科技",
            "pct": 3.46
          }
        },
        {
          "code": "环保装备",
          "name": "环保装备",
          "n": 29,
          "up": 6,
          "evalN": 29,
          "avgPct": -4.95,
          "leader": {
            "code": "603126",
            "name": "中材节能",
            "pct": 6.58
          }
        }
      ]
    },
    {
      "name": "纺织服饰",
      "n": 83,
      "up": 18,
      "evalN": 83,
      "avgPct": -2.47,
      "leader": {
        "code": "605003",
        "name": "众望布艺",
        "pct": 13.5
      },
      "concepts": [
        {
          "code": "纺织制造",
          "name": "纺织制造",
          "n": 36,
          "up": 9,
          "evalN": 36,
          "avgPct": -1.68,
          "leader": {
            "code": "605003",
            "name": "众望布艺",
            "pct": 13.5
          }
        },
        {
          "code": "服装家纺",
          "name": "服装家纺",
          "n": 47,
          "up": 9,
          "evalN": 47,
          "avgPct": -3.07,
          "leader": {
            "code": "300979",
            "name": "华利集团",
            "pct": 6.79
          }
        }
      ]
    },
    {
      "name": "专业服务",
      "n": 65,
      "up": 12,
      "evalN": 65,
      "avgPct": -4.65,
      "leader": {
        "code": "600826",
        "name": "兰生股份",
        "pct": 12.29
      },
      "concepts": [
        {
          "code": "检测认证",
          "name": "检测认证",
          "n": 20,
          "up": 6,
          "evalN": 20,
          "avgPct": -1.89,
          "leader": {
            "code": "300962",
            "name": "中金辐照",
            "pct": 8
          }
        },
        {
          "code": "工程咨询",
          "name": "工程咨询",
          "n": 45,
          "up": 6,
          "evalN": 45,
          "avgPct": -5.87,
          "leader": {
            "code": "600826",
            "name": "兰生股份",
            "pct": 12.29
          }
        }
      ]
    },
    {
      "name": "光伏",
      "n": 53,
      "up": 16,
      "evalN": 53,
      "avgPct": -2.43,
      "leader": {
        "code": "002129",
        "name": "TCL中环",
        "pct": 9.16
      },
      "concepts": [
        {
          "code": "光伏设备",
          "name": "光伏设备",
          "n": 13,
          "up": 5,
          "evalN": 13,
          "avgPct": -2.13,
          "leader": {
            "code": "002943",
            "name": "宇晶股份",
            "pct": 6.4
          }
        },
        {
          "code": "光伏材料",
          "name": "光伏材料",
          "n": 17,
          "up": 5,
          "evalN": 17,
          "avgPct": -2.23,
          "leader": {
            "code": "603051",
            "name": "鹿山新材",
            "pct": 8.41
          }
        },
        {
          "code": "光伏制造",
          "name": "光伏制造",
          "n": 23,
          "up": 6,
          "evalN": 23,
          "avgPct": -2.74,
          "leader": {
            "code": "002129",
            "name": "TCL中环",
            "pct": 9.16
          }
        }
      ]
    },
    {
      "name": "社会服务",
      "n": 80,
      "up": 15,
      "evalN": 80,
      "avgPct": -3.42,
      "leader": {
        "code": "001331",
        "name": "胜通能源",
        "pct": 15.37
      },
      "concepts": [
        {
          "code": "燃气",
          "name": "燃气",
          "n": 35,
          "up": 9,
          "evalN": 35,
          "avgPct": -2.2,
          "leader": {
            "code": "001331",
            "name": "胜通能源",
            "pct": 15.37
          }
        },
        {
          "code": "水务",
          "name": "水务",
          "n": 19,
          "up": 5,
          "evalN": 19,
          "avgPct": -2.43,
          "leader": {
            "code": "603700",
            "name": "宁水集团",
            "pct": 6.74
          }
        },
        {
          "code": "供电",
          "name": "供电",
          "n": 9,
          "up": 0,
          "evalN": 9,
          "avgPct": -4.38,
          "leader": {
            "code": "600995",
            "name": "南网储能",
            "pct": -0.35
          }
        },
        {
          "code": "供热",
          "name": "供热",
          "n": 17,
          "up": 1,
          "evalN": 17,
          "avgPct": -6.51,
          "leader": {
            "code": "603391",
            "name": "力聚热能",
            "pct": 1.65
          }
        }
      ]
    },
    {
      "name": "旅游酒店餐饮",
      "n": 32,
      "up": 4,
      "evalN": 32,
      "avgPct": -2.74,
      "leader": {
        "code": "000888",
        "name": "峨眉山Ａ",
        "pct": 5.54
      },
      "concepts": [
        {
          "code": "酒店餐饮",
          "name": "酒店餐饮",
          "n": 8,
          "up": 0,
          "evalN": 8,
          "avgPct": -2.34,
          "leader": {
            "code": "600258",
            "name": "首旅酒店",
            "pct": -0.18
          }
        },
        {
          "code": "旅游景区",
          "name": "旅游景区",
          "n": 24,
          "up": 4,
          "evalN": 24,
          "avgPct": -2.87,
          "leader": {
            "code": "000888",
            "name": "峨眉山Ａ",
            "pct": 5.54
          }
        }
      ]
    },
    {
      "name": "军工",
      "n": 104,
      "up": 10,
      "evalN": 104,
      "avgPct": -4.63,
      "leader": {
        "code": "301682",
        "name": "宏明电子",
        "pct": 29.95
      },
      "concepts": [
        {
          "code": "兵器火工",
          "name": "兵器火工",
          "n": 16,
          "up": 4,
          "evalN": 16,
          "avgPct": -2.84,
          "leader": {
            "code": "002265",
            "name": "建设工业",
            "pct": 7.89
          }
        },
        {
          "code": "卫星火箭",
          "name": "卫星火箭",
          "n": 15,
          "up": 1,
          "evalN": 15,
          "avgPct": -4.13,
          "leader": {
            "code": "003009",
            "name": "中天火箭",
            "pct": 1.03
          }
        },
        {
          "code": "军工电子",
          "name": "军工电子",
          "n": 29,
          "up": 3,
          "evalN": 29,
          "avgPct": -4.47,
          "leader": {
            "code": "301682",
            "name": "宏明电子",
            "pct": 29.95
          }
        },
        {
          "code": "军工整机",
          "name": "军工整机",
          "n": 19,
          "up": 2,
          "evalN": 19,
          "avgPct": -4.52,
          "leader": {
            "code": "600482",
            "name": "中国动力",
            "pct": 0.95
          }
        },
        {
          "code": "雷达",
          "name": "雷达",
          "n": 11,
          "up": 0,
          "evalN": 11,
          "avgPct": -5.96,
          "leader": {
            "code": "300629",
            "name": "新劲刚",
            "pct": -1.7
          }
        },
        {
          "code": "军工材料",
          "name": "军工材料",
          "n": 14,
          "up": 0,
          "evalN": 14,
          "avgPct": -6.67,
          "leader": {
            "code": "002625",
            "name": "光启技术",
            "pct": -2.24
          }
        }
      ]
    },
    {
      "name": "国产替代",
      "n": 48,
      "up": 10,
      "evalN": 48,
      "avgPct": -3.16,
      "leader": {
        "code": "002093",
        "name": "国脉科技",
        "pct": 21.67
      },
      "concepts": [
        {
          "code": "华为概念",
          "name": "华为概念",
          "n": 7,
          "up": 1,
          "evalN": 7,
          "avgPct": -3.14,
          "leader": {
            "code": "002180",
            "name": "奔图科技",
            "pct": 1.28
          }
        },
        {
          "code": "5G概念",
          "name": "5G概念",
          "n": 41,
          "up": 9,
          "evalN": 41,
          "avgPct": -3.16,
          "leader": {
            "code": "002093",
            "name": "国脉科技",
            "pct": 21.67
          }
        }
      ]
    },
    {
      "name": "基础化工",
      "n": 323,
      "up": 46,
      "evalN": 323,
      "avgPct": -4.46,
      "leader": {
        "code": "300839",
        "name": "博汇股份",
        "pct": 20.78
      },
      "concepts": [
        {
          "code": "橡塑材料",
          "name": "橡塑材料",
          "n": 30,
          "up": 6,
          "evalN": 30,
          "avgPct": -3.28,
          "leader": {
            "code": "001233",
            "name": "海安集团",
            "pct": 15.01
          }
        },
        {
          "code": "化学纤维",
          "name": "化学纤维",
          "n": 19,
          "up": 1,
          "evalN": 19,
          "avgPct": -3.36,
          "leader": {
            "code": "002206",
            "name": "海 利 得",
            "pct": 2.08
          }
        },
        {
          "code": "氟化工",
          "name": "氟化工",
          "n": 29,
          "up": 8,
          "evalN": 29,
          "avgPct": -3.92,
          "leader": {
            "code": "301076",
            "name": "新瀚新材",
            "pct": 9.35
          }
        },
        {
          "code": "精细中间体",
          "name": "精细中间体",
          "n": 69,
          "up": 12,
          "evalN": 69,
          "avgPct": -3.98,
          "leader": {
            "code": "300839",
            "name": "博汇股份",
            "pct": 20.78
          }
        },
        {
          "code": "复合材料",
          "name": "复合材料",
          "n": 20,
          "up": 6,
          "evalN": 20,
          "avgPct": -4.19,
          "leader": {
            "code": "301683",
            "name": "慧谷新材",
            "pct": 7.84
          }
        },
        {
          "code": "涂料油墨",
          "name": "涂料油墨",
          "n": 29,
          "up": 2,
          "evalN": 29,
          "avgPct": -4.22,
          "leader": {
            "code": "603683",
            "name": "晶华新材",
            "pct": 20.35
          }
        },
        {
          "code": "化工原料",
          "name": "化工原料",
          "n": 80,
          "up": 10,
          "evalN": 80,
          "avgPct": -5.03,
          "leader": {
            "code": "301216",
            "name": "万凯新材",
            "pct": 13.05
          }
        },
        {
          "code": "农药化肥",
          "name": "农药化肥",
          "n": 47,
          "up": 1,
          "evalN": 47,
          "avgPct": -5.97,
          "leader": {
            "code": "000902",
            "name": "新洋丰",
            "pct": 2.88
          }
        }
      ]
    },
    {
      "name": "人工智能",
      "n": 83,
      "up": 10,
      "evalN": 83,
      "avgPct": -6.51,
      "leader": {
        "code": "002415",
        "name": "海康威视",
        "pct": 5.6
      },
      "concepts": [
        {
          "code": "人工智能",
          "name": "人工智能",
          "n": 11,
          "up": 4,
          "evalN": 11,
          "avgPct": -3.38,
          "leader": {
            "code": "002415",
            "name": "海康威视",
            "pct": 5.6
          }
        },
        {
          "code": "数据中心",
          "name": "数据中心",
          "n": 32,
          "up": 2,
          "evalN": 32,
          "avgPct": -5.91,
          "leader": {
            "code": "301202",
            "name": "朗威股份",
            "pct": 2.48
          }
        },
        {
          "code": "算力",
          "name": "算力",
          "n": 21,
          "up": 3,
          "evalN": 21,
          "avgPct": -6.04,
          "leader": {
            "code": "002354",
            "name": "天娱数科",
            "pct": 3.41
          }
        },
        {
          "code": "光通信",
          "name": "光通信",
          "n": 19,
          "up": 1,
          "evalN": 19,
          "avgPct": -9.86,
          "leader": {
            "code": "300620",
            "name": "光库科技",
            "pct": 1.48
          }
        }
      ]
    },
    {
      "name": "半导体",
      "n": 72,
      "up": 12,
      "evalN": 72,
      "avgPct": -4.23,
      "leader": {
        "code": "002185",
        "name": "华天科技",
        "pct": 14.25
      },
      "concepts": [
        {
          "code": "半导体",
          "name": "半导体",
          "n": 50,
          "up": 12,
          "evalN": 50,
          "avgPct": -3.43,
          "leader": {
            "code": "002185",
            "name": "华天科技",
            "pct": 14.25
          }
        },
        {
          "code": "第三代半导体",
          "name": "第三代半导体",
          "n": 6,
          "up": 0,
          "evalN": 6,
          "avgPct": -5.16,
          "leader": {
            "code": "603005",
            "name": "晶方科技",
            "pct": -1.71
          }
        },
        {
          "code": "半导体设备",
          "name": "半导体设备",
          "n": 16,
          "up": 0,
          "evalN": 16,
          "avgPct": -6.38,
          "leader": {
            "code": "301717",
            "name": "超纯应材",
            "pct": -1.3
          }
        }
      ]
    },
    {
      "name": "有色金属",
      "n": 70,
      "up": 10,
      "evalN": 70,
      "avgPct": -4.02,
      "leader": {
        "code": "603612",
        "name": "索通发展",
        "pct": 5.94
      },
      "concepts": [
        {
          "code": "工业金属",
          "name": "工业金属",
          "n": 50,
          "up": 7,
          "evalN": 50,
          "avgPct": -3.83,
          "leader": {
            "code": "603612",
            "name": "索通发展",
            "pct": 5.94
          }
        },
        {
          "code": "小金属",
          "name": "小金属",
          "n": 20,
          "up": 3,
          "evalN": 20,
          "avgPct": -4.51,
          "leader": {
            "code": "002167",
            "name": "东方锆业",
            "pct": 1.15
          }
        }
      ]
    },
    {
      "name": "生活服务",
      "n": 16,
      "up": 0,
      "evalN": 16,
      "avgPct": -6.07,
      "leader": {
        "code": "605098",
        "name": "行动教育",
        "pct": -0.11
      },
      "concepts": [
        {
          "code": "教育",
          "name": "教育",
          "n": 16,
          "up": 0,
          "evalN": 16,
          "avgPct": -6.07,
          "leader": {
            "code": "605098",
            "name": "行动教育",
            "pct": -0.11
          }
        }
      ]
    },
    {
      "name": "农业",
      "n": 22,
      "up": 0,
      "evalN": 22,
      "avgPct": -9.78,
      "leader": {
        "code": "600598",
        "name": "北大荒",
        "pct": -1.46
      },
      "concepts": [
        {
          "code": "林业",
          "name": "林业",
          "n": 5,
          "up": 0,
          "evalN": 5,
          "avgPct": -7.87,
          "leader": {
            "code": "600076",
            "name": "康欣新材",
            "pct": -4.35
          }
        },
        {
          "code": "农业种植",
          "name": "农业种植",
          "n": 17,
          "up": 0,
          "evalN": 17,
          "avgPct": -10.34,
          "leader": {
            "code": "600598",
            "name": "北大荒",
            "pct": -1.46
          }
        }
      ]
    }
  ]
  };

  var MONTH = {
  meta: {
    "lastDate": "2026-10-28",
    "exportedAt": "2026-10-28T11:15:15.782Z",
    "stocksEvaluated": 4405,
    "categories": 31,
    "concepts": 144,
    "note": "两级概念热力（大类 → 子概念，一股一概念）：面积=涨股比 up/n ×1000+1，颜色=平均涨幅 avgPct（±10% 封顶），leader=区间涨幅第一；日/周/月/年均为真实区间统计，与 heatmap-periods.json 同步（导出 meta：stocks 4414 · filtered 814 · leaderStocks 4196 · leaderDays 6288）",
    "period": "month",
    "periodName": "月",
    "periodRange": "近 21 个交易日"
  },
  categories: [
    {
      "name": "文化娱乐",
      "n": 120,
      "up": 79,
      "evalN": 120,
      "avgPct": 5.33,
      "leader": {
        "code": "600825",
        "name": "新华传媒",
        "pct": 73.22
      },
      "concepts": [
        {
          "code": "影视",
          "name": "影视",
          "n": 19,
          "up": 14,
          "evalN": 19,
          "avgPct": 9.02,
          "leader": {
            "code": "002343",
            "name": "慈文传媒",
            "pct": 55.81
          }
        },
        {
          "code": "文化传媒",
          "name": "文化传媒",
          "n": 77,
          "up": 50,
          "evalN": 77,
          "avgPct": 4.68,
          "leader": {
            "code": "600825",
            "name": "新华传媒",
            "pct": 73.22
          }
        },
        {
          "code": "游戏",
          "name": "游戏",
          "n": 24,
          "up": 15,
          "evalN": 24,
          "avgPct": 4.51,
          "leader": {
            "code": "300494",
            "name": "盛天网络",
            "pct": 30.13
          }
        }
      ]
    },
    {
      "name": "智能制造",
      "n": 204,
      "up": 89,
      "evalN": 204,
      "avgPct": -2.2,
      "leader": {
        "code": "301314",
        "name": "科瑞思",
        "pct": 44.34
      },
      "concepts": [
        {
          "code": "工业机器人",
          "name": "工业机器人",
          "n": 54,
          "up": 35,
          "evalN": 54,
          "avgPct": 3.49,
          "leader": {
            "code": "003021",
            "name": "兆威机电",
            "pct": 41.36
          }
        },
        {
          "code": "重型装备",
          "name": "重型装备",
          "n": 20,
          "up": 10,
          "evalN": 20,
          "avgPct": -1.41,
          "leader": {
            "code": "603298",
            "name": "杭叉集团",
            "pct": 14.38
          }
        },
        {
          "code": "智能交通",
          "name": "智能交通",
          "n": 45,
          "up": 21,
          "evalN": 45,
          "avgPct": -2.01,
          "leader": {
            "code": "603528",
            "name": "多伦科技",
            "pct": 37.95
          }
        },
        {
          "code": "智能装备",
          "name": "智能装备",
          "n": 59,
          "up": 19,
          "evalN": 59,
          "avgPct": -5.21,
          "leader": {
            "code": "301314",
            "name": "科瑞思",
            "pct": 44.34
          }
        },
        {
          "code": "机床与激光",
          "name": "机床与激光",
          "n": 26,
          "up": 4,
          "evalN": 26,
          "avgPct": -8.11,
          "leader": {
            "code": "300747",
            "name": "锐科激光",
            "pct": 14.55
          }
        }
      ]
    },
    {
      "name": "制造",
      "n": 352,
      "up": 109,
      "evalN": 352,
      "avgPct": -3.92,
      "leader": {
        "code": "000678",
        "name": "襄阳轴承",
        "pct": 65.35
      },
      "concepts": [
        {
          "code": "汽车传动",
          "name": "汽车传动",
          "n": 47,
          "up": 27,
          "evalN": 47,
          "avgPct": 3.44,
          "leader": {
            "code": "000678",
            "name": "襄阳轴承",
            "pct": 65.35
          }
        },
        {
          "code": "汽车内饰",
          "name": "汽车内饰",
          "n": 18,
          "up": 7,
          "evalN": 18,
          "avgPct": -1.03,
          "leader": {
            "code": "301529",
            "name": "福赛科技",
            "pct": 27.67
          }
        },
        {
          "code": "车身结构",
          "name": "车身结构",
          "n": 38,
          "up": 15,
          "evalN": 38,
          "avgPct": -2.63,
          "leader": {
            "code": "300893",
            "name": "松原安全",
            "pct": 21.24
          }
        },
        {
          "code": "汽车配件",
          "name": "汽车配件",
          "n": 77,
          "up": 25,
          "evalN": 77,
          "avgPct": -3.1,
          "leader": {
            "code": "603037",
            "name": "凯众股份",
            "pct": 30.34
          }
        },
        {
          "code": "汽车电子",
          "name": "汽车电子",
          "n": 40,
          "up": 15,
          "evalN": 40,
          "avgPct": -3.1,
          "leader": {
            "code": "301413",
            "name": "安培龙",
            "pct": 31.35
          }
        },
        {
          "code": "汽车整车",
          "name": "汽车整车",
          "n": 20,
          "up": 4,
          "evalN": 20,
          "avgPct": -6.74,
          "leader": {
            "code": "600066",
            "name": "宇通客车",
            "pct": 9.8
          }
        },
        {
          "code": "电机电控",
          "name": "电机电控",
          "n": 26,
          "up": 4,
          "evalN": 26,
          "avgPct": -8.18,
          "leader": {
            "code": "300484",
            "name": "蓝海华腾",
            "pct": 10.71
          }
        },
        {
          "code": "动力电池",
          "name": "动力电池",
          "n": 61,
          "up": 9,
          "evalN": 61,
          "avgPct": -8.22,
          "leader": {
            "code": "301487",
            "name": "盟固利",
            "pct": 31.82
          }
        },
        {
          "code": "智能机器人",
          "name": "智能机器人",
          "n": 25,
          "up": 3,
          "evalN": 25,
          "avgPct": -8.48,
          "leader": {
            "code": "000913",
            "name": "钱江摩托",
            "pct": 5.22
          }
        }
      ]
    },
    {
      "name": "软件",
      "n": 175,
      "up": 60,
      "evalN": 175,
      "avgPct": -2.21,
      "leader": {
        "code": "301313",
        "name": "凡拓数创",
        "pct": 114.58
      },
      "concepts": [
        {
          "code": "企业管理软件",
          "name": "企业管理软件",
          "n": 10,
          "up": 6,
          "evalN": 10,
          "avgPct": 3.38,
          "leader": {
            "code": "603171",
            "name": "税友股份",
            "pct": 18.01
          }
        },
        {
          "code": "IT服务与外包",
          "name": "IT服务与外包",
          "n": 24,
          "up": 10,
          "evalN": 24,
          "avgPct": 1.34,
          "leader": {
            "code": "301313",
            "name": "凡拓数创",
            "pct": 114.58
          }
        },
        {
          "code": "垂直行业IT",
          "name": "垂直行业IT",
          "n": 30,
          "up": 14,
          "evalN": 30,
          "avgPct": -0.15,
          "leader": {
            "code": "301218",
            "name": "华是科技",
            "pct": 21.94
          }
        },
        {
          "code": "网络安全",
          "name": "网络安全",
          "n": 11,
          "up": 4,
          "evalN": 11,
          "avgPct": -0.17,
          "leader": {
            "code": "300369",
            "name": "绿盟科技",
            "pct": 32.51
          }
        },
        {
          "code": "互联网",
          "name": "互联网",
          "n": 19,
          "up": 4,
          "evalN": 19,
          "avgPct": -2.28,
          "leader": {
            "code": "301428",
            "name": "世纪恒通",
            "pct": 61.23
          }
        },
        {
          "code": "大数据",
          "name": "大数据",
          "n": 13,
          "up": 4,
          "evalN": 13,
          "avgPct": -3.14,
          "leader": {
            "code": "603138",
            "name": "海量数据",
            "pct": 5.19
          }
        },
        {
          "code": "智慧城市",
          "name": "智慧城市",
          "n": 18,
          "up": 3,
          "evalN": 18,
          "avgPct": -4.55,
          "leader": {
            "code": "603636",
            "name": "南威软件",
            "pct": 14.41
          }
        },
        {
          "code": "工业软件",
          "name": "工业软件",
          "n": 13,
          "up": 4,
          "evalN": 13,
          "avgPct": -5.58,
          "leader": {
            "code": "300378",
            "name": "鼎捷数智",
            "pct": 7.57
          }
        },
        {
          "code": "物联网",
          "name": "物联网",
          "n": 37,
          "up": 11,
          "evalN": 37,
          "avgPct": -5.61,
          "leader": {
            "code": "300007",
            "name": "汉威科技",
            "pct": 28.93
          }
        }
      ]
    },
    {
      "name": "金融类",
      "n": 155,
      "up": 49,
      "evalN": 155,
      "avgPct": -2.55,
      "leader": {
        "code": "600901",
        "name": "江苏金租",
        "pct": 10.09
      },
      "concepts": [
        {
          "code": "银行",
          "name": "银行",
          "n": 42,
          "up": 32,
          "evalN": 42,
          "avgPct": 2.3,
          "leader": {
            "code": "601328",
            "name": "交通银行",
            "pct": 8.83
          }
        },
        {
          "code": "金融科技",
          "name": "金融科技",
          "n": 36,
          "up": 12,
          "evalN": 36,
          "avgPct": -3.58,
          "leader": {
            "code": "000948",
            "name": "南天信息",
            "pct": 8.48
          }
        },
        {
          "code": "券商概念",
          "name": "券商概念",
          "n": 47,
          "up": 2,
          "evalN": 47,
          "avgPct": -4.35,
          "leader": {
            "code": "002945",
            "name": "华林证券",
            "pct": 3.06
          }
        },
        {
          "code": "保险",
          "name": "保险",
          "n": 6,
          "up": 0,
          "evalN": 6,
          "avgPct": -4.76,
          "leader": {
            "code": "601318",
            "name": "中国平安",
            "pct": -0.17
          }
        },
        {
          "code": "多元金融",
          "name": "多元金融",
          "n": 24,
          "up": 3,
          "evalN": 24,
          "avgPct": -5.4,
          "leader": {
            "code": "600901",
            "name": "江苏金租",
            "pct": 10.09
          }
        }
      ]
    },
    {
      "name": "消费",
      "n": 423,
      "up": 109,
      "evalN": 423,
      "avgPct": -3.99,
      "leader": {
        "code": "002242",
        "name": "九阳股份",
        "pct": 116.65
      },
      "concepts": [
        {
          "code": "白酒",
          "name": "白酒",
          "n": 20,
          "up": 9,
          "evalN": 20,
          "avgPct": 1.65,
          "leader": {
            "code": "000995",
            "name": "皇台酒业",
            "pct": 20.12
          }
        },
        {
          "code": "休闲食品",
          "name": "休闲食品",
          "n": 13,
          "up": 6,
          "evalN": 13,
          "avgPct": 0.79,
          "leader": {
            "code": "001219",
            "name": "青岛食品",
            "pct": 27.46
          }
        },
        {
          "code": "新零售",
          "name": "新零售",
          "n": 71,
          "up": 25,
          "evalN": 71,
          "avgPct": -0.82,
          "leader": {
            "code": "600838",
            "name": "上海九百",
            "pct": 71.87
          }
        },
        {
          "code": "水产养殖",
          "name": "水产养殖",
          "n": 12,
          "up": 3,
          "evalN": 12,
          "avgPct": -1.49,
          "leader": {
            "code": "002696",
            "name": "百洋股份",
            "pct": 81.36
          }
        },
        {
          "code": "啤酒",
          "name": "啤酒",
          "n": 7,
          "up": 1,
          "evalN": 7,
          "avgPct": -2.54,
          "leader": {
            "code": "600573",
            "name": "惠泉啤酒",
            "pct": 15.01
          }
        },
        {
          "code": "调味品",
          "name": "调味品",
          "n": 15,
          "up": 7,
          "evalN": 15,
          "avgPct": -3.46,
          "leader": {
            "code": "600872",
            "name": "中炬高新",
            "pct": 9.57
          }
        },
        {
          "code": "家电",
          "name": "家电",
          "n": 91,
          "up": 25,
          "evalN": 91,
          "avgPct": -3.67,
          "leader": {
            "code": "002242",
            "name": "九阳股份",
            "pct": 116.65
          }
        },
        {
          "code": "乳业/饮料",
          "name": "乳业/饮料",
          "n": 29,
          "up": 7,
          "evalN": 29,
          "avgPct": -4.92,
          "leader": {
            "code": "001318",
            "name": "阳光乳业",
            "pct": 12.7
          }
        },
        {
          "code": "鸡肉",
          "name": "鸡肉",
          "n": 10,
          "up": 2,
          "evalN": 10,
          "avgPct": -5.17,
          "leader": {
            "code": "002982",
            "name": "湘佳股份",
            "pct": 6.68
          }
        },
        {
          "code": "跨境/免税",
          "name": "跨境/免税",
          "n": 17,
          "up": 4,
          "evalN": 17,
          "avgPct": -5.19,
          "leader": {
            "code": "002315",
            "name": "焦点科技",
            "pct": 13.55
          }
        },
        {
          "code": "珠宝首饰",
          "name": "珠宝首饰",
          "n": 13,
          "up": 2,
          "evalN": 13,
          "avgPct": -5.78,
          "leader": {
            "code": "600612",
            "name": "老凤祥",
            "pct": 4.36
          }
        },
        {
          "code": "猪肉",
          "name": "猪肉",
          "n": 25,
          "up": 2,
          "evalN": 25,
          "avgPct": -6.29,
          "leader": {
            "code": "300498",
            "name": "温氏股份",
            "pct": 4.29
          }
        },
        {
          "code": "美妆个护",
          "name": "美妆个护",
          "n": 20,
          "up": 4,
          "evalN": 20,
          "avgPct": -6.81,
          "leader": {
            "code": "001328",
            "name": "登康口腔",
            "pct": 5.87
          }
        },
        {
          "code": "食品加工",
          "name": "食品加工",
          "n": 64,
          "up": 11,
          "evalN": 64,
          "avgPct": -6.93,
          "leader": {
            "code": "300138",
            "name": "晨光生物",
            "pct": 12.34
          }
        },
        {
          "code": "体育户外",
          "name": "体育户外",
          "n": 16,
          "up": 1,
          "evalN": 16,
          "avgPct": -9.72,
          "leader": {
            "code": "605080",
            "name": "浙江自然",
            "pct": 0.17
          }
        }
      ]
    },
    {
      "name": "交运物流",
      "n": 120,
      "up": 36,
      "evalN": 120,
      "avgPct": -2.93,
      "leader": {
        "code": "002889",
        "name": "东方嘉盛",
        "pct": 29.1
      },
      "concepts": [
        {
          "code": "铁路公路",
          "name": "铁路公路",
          "n": 34,
          "up": 20,
          "evalN": 34,
          "avgPct": 1.08,
          "leader": {
            "code": "600012",
            "name": "皖通高速",
            "pct": 13.48
          }
        },
        {
          "code": "航空机场",
          "name": "航空机场",
          "n": 13,
          "up": 4,
          "evalN": 13,
          "avgPct": -1.66,
          "leader": {
            "code": "600009",
            "name": "上海机场",
            "pct": 6.44
          }
        },
        {
          "code": "快递物流",
          "name": "快递物流",
          "n": 56,
          "up": 11,
          "evalN": 56,
          "avgPct": -4.54,
          "leader": {
            "code": "002889",
            "name": "东方嘉盛",
            "pct": 29.1
          }
        },
        {
          "code": "航运",
          "name": "航运",
          "n": 17,
          "up": 1,
          "evalN": 17,
          "avgPct": -6.62,
          "leader": {
            "code": "603565",
            "name": "中谷物流",
            "pct": 10.54
          }
        }
      ]
    },
    {
      "name": "医疗",
      "n": 190,
      "up": 68,
      "evalN": 190,
      "avgPct": -3.14,
      "leader": {
        "code": "301101",
        "name": "明月镜片",
        "pct": 18.06
      },
      "concepts": [
        {
          "code": "医疗服务",
          "name": "医疗服务",
          "n": 13,
          "up": 8,
          "evalN": 13,
          "avgPct": -0.32,
          "leader": {
            "code": "002044",
            "name": "美年健康",
            "pct": 11.79
          }
        },
        {
          "code": "医疗器械",
          "name": "医疗器械",
          "n": 27,
          "up": 13,
          "evalN": 27,
          "avgPct": -1.62,
          "leader": {
            "code": "301101",
            "name": "明月镜片",
            "pct": 18.06
          }
        },
        {
          "code": "医药商业",
          "name": "医药商业",
          "n": 30,
          "up": 11,
          "evalN": 30,
          "avgPct": -1.83,
          "leader": {
            "code": "002727",
            "name": "一心堂",
            "pct": 17.79
          }
        },
        {
          "code": "AI医疗",
          "name": "AI医疗",
          "n": 11,
          "up": 5,
          "evalN": 11,
          "avgPct": -2.59,
          "leader": {
            "code": "300168",
            "name": "万达信息",
            "pct": 4.93
          }
        },
        {
          "code": "体外诊断",
          "name": "体外诊断",
          "n": 22,
          "up": 6,
          "evalN": 22,
          "avgPct": -3.19,
          "leader": {
            "code": "300832",
            "name": "新产业",
            "pct": 17.38
          }
        },
        {
          "code": "中药",
          "name": "中药",
          "n": 59,
          "up": 20,
          "evalN": 59,
          "avgPct": -4.28,
          "leader": {
            "code": "600329",
            "name": "达仁堂",
            "pct": 15.09
          }
        },
        {
          "code": "医疗耗材",
          "name": "医疗耗材",
          "n": 28,
          "up": 5,
          "evalN": 28,
          "avgPct": -5.06,
          "leader": {
            "code": "300529",
            "name": "健帆生物",
            "pct": 11.33
          }
        }
      ]
    },
    {
      "name": "人工智能",
      "n": 83,
      "up": 9,
      "evalN": 83,
      "avgPct": -14.17,
      "leader": {
        "code": "002354",
        "name": "天娱数科",
        "pct": 14.41
      },
      "concepts": [
        {
          "code": "人工智能",
          "name": "人工智能",
          "n": 11,
          "up": 6,
          "evalN": 11,
          "avgPct": -0.59,
          "leader": {
            "code": "002362",
            "name": "汉王科技",
            "pct": 6.56
          }
        },
        {
          "code": "算力",
          "name": "算力",
          "n": 21,
          "up": 2,
          "evalN": 21,
          "avgPct": -13.8,
          "leader": {
            "code": "002354",
            "name": "天娱数科",
            "pct": 14.41
          }
        },
        {
          "code": "数据中心",
          "name": "数据中心",
          "n": 32,
          "up": 0,
          "evalN": 32,
          "avgPct": -15.26,
          "leader": {
            "code": "301157",
            "name": "华塑科技",
            "pct": -2.87
          }
        },
        {
          "code": "光通信",
          "name": "光通信",
          "n": 19,
          "up": 1,
          "evalN": 19,
          "avgPct": -20.61,
          "leader": {
            "code": "300620",
            "name": "光库科技",
            "pct": 3.71
          }
        }
      ]
    },
    {
      "name": "基建",
      "n": 163,
      "up": 36,
      "evalN": 163,
      "avgPct": -4.5,
      "leader": {
        "code": "603278",
        "name": "大业股份",
        "pct": 66.23
      },
      "concepts": [
        {
          "code": "国家工程",
          "name": "国家工程",
          "n": 24,
          "up": 10,
          "evalN": 24,
          "avgPct": -0.87,
          "leader": {
            "code": "601668",
            "name": "中国建筑",
            "pct": 8.53
          }
        },
        {
          "code": "钢铁",
          "name": "钢铁",
          "n": 38,
          "up": 6,
          "evalN": 38,
          "avgPct": -1.75,
          "leader": {
            "code": "603278",
            "name": "大业股份",
            "pct": 66.23
          }
        },
        {
          "code": "港口",
          "name": "港口",
          "n": 15,
          "up": 8,
          "evalN": 15,
          "avgPct": -1.81,
          "leader": {
            "code": "601000",
            "name": "唐山港",
            "pct": 7.3
          }
        },
        {
          "code": "水泥",
          "name": "水泥",
          "n": 18,
          "up": 3,
          "evalN": 18,
          "avgPct": -3.11,
          "leader": {
            "code": "002233",
            "name": "塔牌集团",
            "pct": 14.09
          }
        },
        {
          "code": "建筑材料",
          "name": "建筑材料",
          "n": 53,
          "up": 8,
          "evalN": 53,
          "avgPct": -7.62,
          "leader": {
            "code": "002043",
            "name": "兔 宝 宝",
            "pct": 9.78
          }
        },
        {
          "code": "玻璃",
          "name": "玻璃",
          "n": 15,
          "up": 1,
          "evalN": 15,
          "avgPct": -10.62,
          "leader": {
            "code": "002623",
            "name": "亚玛顿",
            "pct": 0.05
          }
        }
      ]
    },
    {
      "name": "军工",
      "n": 104,
      "up": 20,
      "evalN": 104,
      "avgPct": -6.14,
      "leader": {
        "code": "002683",
        "name": "广东宏大",
        "pct": 18.55
      },
      "concepts": [
        {
          "code": "兵器火工",
          "name": "兵器火工",
          "n": 16,
          "up": 6,
          "evalN": 16,
          "avgPct": -1.29,
          "leader": {
            "code": "002683",
            "name": "广东宏大",
            "pct": 18.55
          }
        },
        {
          "code": "军工整机",
          "name": "军工整机",
          "n": 19,
          "up": 5,
          "evalN": 19,
          "avgPct": -4.26,
          "leader": {
            "code": "600760",
            "name": "中航沈飞",
            "pct": 9.37
          }
        },
        {
          "code": "军工电子",
          "name": "军工电子",
          "n": 29,
          "up": 5,
          "evalN": 29,
          "avgPct": -7.22,
          "leader": {
            "code": "301682",
            "name": "宏明电子",
            "pct": 13.96
          }
        },
        {
          "code": "军工材料",
          "name": "军工材料",
          "n": 14,
          "up": 1,
          "evalN": 14,
          "avgPct": -7.71,
          "leader": {
            "code": "002625",
            "name": "光启技术",
            "pct": 2.71
          }
        },
        {
          "code": "卫星火箭",
          "name": "卫星火箭",
          "n": 15,
          "up": 1,
          "evalN": 15,
          "avgPct": -7.82,
          "leader": {
            "code": "300045",
            "name": "华力创通",
            "pct": 17.59
          }
        },
        {
          "code": "雷达",
          "name": "雷达",
          "n": 11,
          "up": 2,
          "evalN": 11,
          "avgPct": -9.35,
          "leader": {
            "code": "600562",
            "name": "国睿科技",
            "pct": 3.33
          }
        }
      ]
    },
    {
      "name": "通用制造",
      "n": 348,
      "up": 59,
      "evalN": 348,
      "avgPct": -8.53,
      "leader": {
        "code": "002724",
        "name": "海洋王",
        "pct": 91.43
      },
      "concepts": [
        {
          "code": "轨道交通",
          "name": "轨道交通",
          "n": 14,
          "up": 4,
          "evalN": 14,
          "avgPct": -3.45,
          "leader": {
            "code": "603680",
            "name": "今创集团",
            "pct": 14.44
          }
        },
        {
          "code": "电工器材",
          "name": "电工器材",
          "n": 48,
          "up": 6,
          "evalN": 48,
          "avgPct": -7.19,
          "leader": {
            "code": "002724",
            "name": "海洋王",
            "pct": 91.43
          }
        },
        {
          "code": "机械零部件",
          "name": "机械零部件",
          "n": 53,
          "up": 14,
          "evalN": 53,
          "avgPct": -7.22,
          "leader": {
            "code": "300984",
            "name": "金沃股份",
            "pct": 24.7
          }
        },
        {
          "code": "电力设备",
          "name": "电力设备",
          "n": 83,
          "up": 15,
          "evalN": 83,
          "avgPct": -7.44,
          "leader": {
            "code": "301023",
            "name": "奕帆传动",
            "pct": 17.38
          }
        },
        {
          "code": "通用设备",
          "name": "通用设备",
          "n": 104,
          "up": 19,
          "evalN": 104,
          "avgPct": -8.14,
          "leader": {
            "code": "300307",
            "name": "慈星股份",
            "pct": 48.49
          }
        },
        {
          "code": "电子元器件",
          "name": "电子元器件",
          "n": 46,
          "up": 1,
          "evalN": 46,
          "avgPct": -15.83,
          "leader": {
            "code": "300354",
            "name": "东华测试",
            "pct": 4.24
          }
        }
      ]
    },
    {
      "name": "能源",
      "n": 193,
      "up": 43,
      "evalN": 193,
      "avgPct": -6.48,
      "leader": {
        "code": "600408",
        "name": "安泰集团",
        "pct": 19.21
      },
      "concepts": [
        {
          "code": "火电",
          "name": "火电",
          "n": 27,
          "up": 8,
          "evalN": 27,
          "avgPct": -3.82,
          "leader": {
            "code": "600863",
            "name": "华能蒙电",
            "pct": 8.23
          }
        },
        {
          "code": "石油石化",
          "name": "石油石化",
          "n": 43,
          "up": 14,
          "evalN": 43,
          "avgPct": -3.88,
          "leader": {
            "code": "601857",
            "name": "中国石油",
            "pct": 18.5
          }
        },
        {
          "code": "水电核电",
          "name": "水电核电",
          "n": 16,
          "up": 6,
          "evalN": 16,
          "avgPct": -3.97,
          "leader": {
            "code": "601985",
            "name": "中国核电",
            "pct": 7.33
          }
        },
        {
          "code": "煤炭",
          "name": "煤炭",
          "n": 41,
          "up": 10,
          "evalN": 41,
          "avgPct": -5.33,
          "leader": {
            "code": "600408",
            "name": "安泰集团",
            "pct": 19.21
          }
        },
        {
          "code": "绿电运营",
          "name": "绿电运营",
          "n": 15,
          "up": 2,
          "evalN": 15,
          "avgPct": -5.83,
          "leader": {
            "code": "601778",
            "name": "晶科科技",
            "pct": 2.69
          }
        },
        {
          "code": "风能发电",
          "name": "风能发电",
          "n": 51,
          "up": 3,
          "evalN": 51,
          "avgPct": -12,
          "leader": {
            "code": "001239",
            "name": "永达股份",
            "pct": 6.46
          }
        }
      ]
    },
    {
      "name": "房地产建筑",
      "n": 147,
      "up": 20,
      "evalN": 147,
      "avgPct": -8.13,
      "leader": {
        "code": "300949",
        "name": "奥雅股份",
        "pct": 72.24
      },
      "concepts": [
        {
          "code": "园林生态",
          "name": "园林生态",
          "n": 12,
          "up": 2,
          "evalN": 12,
          "avgPct": -4.11,
          "leader": {
            "code": "300949",
            "name": "奥雅股份",
            "pct": 72.24
          }
        },
        {
          "code": "建筑装饰",
          "name": "建筑装饰",
          "n": 52,
          "up": 10,
          "evalN": 52,
          "avgPct": -8.08,
          "leader": {
            "code": "605287",
            "name": "德才股份",
            "pct": 44.56
          }
        },
        {
          "code": "房地产开发",
          "name": "房地产开发",
          "n": 69,
          "up": 7,
          "evalN": 69,
          "avgPct": -8.41,
          "leader": {
            "code": "600094",
            "name": "大名城",
            "pct": 20.91
          }
        },
        {
          "code": "物业服务",
          "name": "物业服务",
          "n": 14,
          "up": 1,
          "evalN": 14,
          "avgPct": -10.4,
          "leader": {
            "code": "000058",
            "name": "深 赛 格",
            "pct": 15.03
          }
        }
      ]
    },
    {
      "name": "旅游酒店餐饮",
      "n": 32,
      "up": 2,
      "evalN": 32,
      "avgPct": -6.8,
      "leader": {
        "code": "000888",
        "name": "峨眉山Ａ",
        "pct": 4.16
      },
      "concepts": [
        {
          "code": "酒店餐饮",
          "name": "酒店餐饮",
          "n": 8,
          "up": 1,
          "evalN": 8,
          "avgPct": -4.52,
          "leader": {
            "code": "600258",
            "name": "首旅酒店",
            "pct": 1.46
          }
        },
        {
          "code": "旅游景区",
          "name": "旅游景区",
          "n": 24,
          "up": 1,
          "evalN": 24,
          "avgPct": -7.56,
          "leader": {
            "code": "000888",
            "name": "峨眉山Ａ",
            "pct": 4.16
          }
        }
      ]
    },
    {
      "name": "创新药",
      "n": 179,
      "up": 28,
      "evalN": 179,
      "avgPct": -7.65,
      "leader": {
        "code": "300006",
        "name": "莱美药业",
        "pct": 85.77
      },
      "concepts": [
        {
          "code": "化学制药",
          "name": "化学制药",
          "n": 59,
          "up": 11,
          "evalN": 59,
          "avgPct": -5.01,
          "leader": {
            "code": "300006",
            "name": "莱美药业",
            "pct": 85.77
          }
        },
        {
          "code": "生物制品",
          "name": "生物制品",
          "n": 26,
          "up": 5,
          "evalN": 26,
          "avgPct": -6.55,
          "leader": {
            "code": "600201",
            "name": "生物股份",
            "pct": 11.39
          }
        },
        {
          "code": "创新药",
          "name": "创新药",
          "n": 26,
          "up": 4,
          "evalN": 26,
          "avgPct": -6.83,
          "leader": {
            "code": "300584",
            "name": "海辰药业",
            "pct": 12.66
          }
        },
        {
          "code": "原料药",
          "name": "原料药",
          "n": 44,
          "up": 7,
          "evalN": 44,
          "avgPct": -9.34,
          "leader": {
            "code": "300111",
            "name": "向日葵",
            "pct": 14.58
          }
        },
        {
          "code": "创新药产业链",
          "name": "创新药产业链",
          "n": 24,
          "up": 1,
          "evalN": 24,
          "avgPct": -13.15,
          "leader": {
            "code": "603127",
            "name": "昭衍新药",
            "pct": 3.1
          }
        }
      ]
    },
    {
      "name": "纺织服饰",
      "n": 83,
      "up": 21,
      "evalN": 83,
      "avgPct": -5.87,
      "leader": {
        "code": "605189",
        "name": "富春染织",
        "pct": 15.88
      },
      "concepts": [
        {
          "code": "纺织制造",
          "name": "纺织制造",
          "n": 36,
          "up": 12,
          "evalN": 36,
          "avgPct": -5.42,
          "leader": {
            "code": "605189",
            "name": "富春染织",
            "pct": 15.88
          }
        },
        {
          "code": "服装家纺",
          "name": "服装家纺",
          "n": 47,
          "up": 9,
          "evalN": 47,
          "avgPct": -6.21,
          "leader": {
            "code": "002687",
            "name": "乔治白",
            "pct": 14.04
          }
        }
      ]
    },
    {
      "name": "社会服务",
      "n": 80,
      "up": 9,
      "evalN": 80,
      "avgPct": -7.32,
      "leader": {
        "code": "600803",
        "name": "新奥股份",
        "pct": 9.12
      },
      "concepts": [
        {
          "code": "水务",
          "name": "水务",
          "n": 19,
          "up": 3,
          "evalN": 19,
          "avgPct": -5.93,
          "leader": {
            "code": "603700",
            "name": "宁水集团",
            "pct": 3.13
          }
        },
        {
          "code": "燃气",
          "name": "燃气",
          "n": 35,
          "up": 4,
          "evalN": 35,
          "avgPct": -6.12,
          "leader": {
            "code": "600803",
            "name": "新奥股份",
            "pct": 9.12
          }
        },
        {
          "code": "供电",
          "name": "供电",
          "n": 9,
          "up": 0,
          "evalN": 9,
          "avgPct": -7.81,
          "leader": {
            "code": "600452",
            "name": "涪陵电力",
            "pct": -3.68
          }
        },
        {
          "code": "供热",
          "name": "供热",
          "n": 17,
          "up": 2,
          "evalN": 17,
          "avgPct": -11.09,
          "leader": {
            "code": "603391",
            "name": "力聚热能",
            "pct": 7.46
          }
        }
      ]
    },
    {
      "name": "轻工制造",
      "n": 131,
      "up": 18,
      "evalN": 131,
      "avgPct": -7.65,
      "leader": {
        "code": "605488",
        "name": "福莱新材",
        "pct": 63.78
      },
      "concepts": [
        {
          "code": "其他轻工",
          "name": "其他轻工",
          "n": 18,
          "up": 2,
          "evalN": 18,
          "avgPct": -6.09,
          "leader": {
            "code": "002779",
            "name": "中坚科技",
            "pct": 18.06
          }
        },
        {
          "code": "造纸",
          "name": "造纸",
          "n": 22,
          "up": 3,
          "evalN": 22,
          "avgPct": -7.73,
          "leader": {
            "code": "600963",
            "name": "岳阳林纸",
            "pct": 18.18
          }
        },
        {
          "code": "包装印刷",
          "name": "包装印刷",
          "n": 46,
          "up": 5,
          "evalN": 46,
          "avgPct": -7.8,
          "leader": {
            "code": "605488",
            "name": "福莱新材",
            "pct": 63.78
          }
        },
        {
          "code": "家居用品",
          "name": "家居用品",
          "n": 45,
          "up": 8,
          "evalN": 45,
          "avgPct": -8.09,
          "leader": {
            "code": "603992",
            "name": "松霖科技",
            "pct": 17.04
          }
        }
      ]
    },
    {
      "name": "消费电子",
      "n": 174,
      "up": 20,
      "evalN": 174,
      "avgPct": -9.9,
      "leader": {
        "code": "300296",
        "name": "利亚德",
        "pct": 31.78
      },
      "concepts": [
        {
          "code": "整机与品牌",
          "name": "整机与品牌",
          "n": 45,
          "up": 6,
          "evalN": 45,
          "avgPct": -6.19,
          "leader": {
            "code": "000810",
            "name": "创维数字",
            "pct": 22.39
          }
        },
        {
          "code": "消费电子零部件",
          "name": "消费电子零部件",
          "n": 64,
          "up": 7,
          "evalN": 64,
          "avgPct": -10.55,
          "leader": {
            "code": "300115",
            "name": "长盈精密",
            "pct": 30.27
          }
        },
        {
          "code": "显示与LED",
          "name": "显示与LED",
          "n": 65,
          "up": 7,
          "evalN": 65,
          "avgPct": -11.83,
          "leader": {
            "code": "300296",
            "name": "利亚德",
            "pct": 31.78
          }
        }
      ]
    },
    {
      "name": "专业服务",
      "n": 65,
      "up": 10,
      "evalN": 65,
      "avgPct": -8.52,
      "leader": {
        "code": "300012",
        "name": "华测检测",
        "pct": 12.77
      },
      "concepts": [
        {
          "code": "检测认证",
          "name": "检测认证",
          "n": 20,
          "up": 4,
          "evalN": 20,
          "avgPct": -6.35,
          "leader": {
            "code": "300012",
            "name": "华测检测",
            "pct": 12.77
          }
        },
        {
          "code": "工程咨询",
          "name": "工程咨询",
          "n": 45,
          "up": 6,
          "evalN": 45,
          "avgPct": -9.48,
          "leader": {
            "code": "600826",
            "name": "兰生股份",
            "pct": 7.51
          }
        }
      ]
    },
    {
      "name": "基础化工",
      "n": 323,
      "up": 29,
      "evalN": 323,
      "avgPct": -8.85,
      "leader": {
        "code": "300839",
        "name": "博汇股份",
        "pct": 59.51
      },
      "concepts": [
        {
          "code": "化学纤维",
          "name": "化学纤维",
          "n": 19,
          "up": 3,
          "evalN": 19,
          "avgPct": -6.52,
          "leader": {
            "code": "000420",
            "name": "吉林化纤",
            "pct": 10.09
          }
        },
        {
          "code": "橡塑材料",
          "name": "橡塑材料",
          "n": 30,
          "up": 2,
          "evalN": 30,
          "avgPct": -7.63,
          "leader": {
            "code": "001233",
            "name": "海安集团",
            "pct": 40.15
          }
        },
        {
          "code": "精细中间体",
          "name": "精细中间体",
          "n": 69,
          "up": 7,
          "evalN": 69,
          "avgPct": -8.01,
          "leader": {
            "code": "300839",
            "name": "博汇股份",
            "pct": 59.51
          }
        },
        {
          "code": "化工原料",
          "name": "化工原料",
          "n": 80,
          "up": 8,
          "evalN": 80,
          "avgPct": -8.64,
          "leader": {
            "code": "301286",
            "name": "侨源股份",
            "pct": 12.85
          }
        },
        {
          "code": "氟化工",
          "name": "氟化工",
          "n": 29,
          "up": 4,
          "evalN": 29,
          "avgPct": -9.35,
          "leader": {
            "code": "600281",
            "name": "华阳新材",
            "pct": 16.16
          }
        },
        {
          "code": "农药化肥",
          "name": "农药化肥",
          "n": 47,
          "up": 2,
          "evalN": 47,
          "avgPct": -9.82,
          "leader": {
            "code": "000902",
            "name": "新洋丰",
            "pct": 4.93
          }
        },
        {
          "code": "涂料油墨",
          "name": "涂料油墨",
          "n": 29,
          "up": 2,
          "evalN": 29,
          "avgPct": -10.57,
          "leader": {
            "code": "603683",
            "name": "晶华新材",
            "pct": 18.53
          }
        },
        {
          "code": "复合材料",
          "name": "复合材料",
          "n": 20,
          "up": 1,
          "evalN": 20,
          "avgPct": -11.17,
          "leader": {
            "code": "300920",
            "name": "润阳科技",
            "pct": 0.45
          }
        }
      ]
    },
    {
      "name": "环保",
      "n": 123,
      "up": 16,
      "evalN": 123,
      "avgPct": -7.62,
      "leader": {
        "code": "603200",
        "name": "上海洗霸",
        "pct": 33.49
      },
      "concepts": [
        {
          "code": "环保运营",
          "name": "环保运营",
          "n": 42,
          "up": 8,
          "evalN": 42,
          "avgPct": -7.05,
          "leader": {
            "code": "300815",
            "name": "玉禾田",
            "pct": 11.62
          }
        },
        {
          "code": "环保装备",
          "name": "环保装备",
          "n": 29,
          "up": 3,
          "evalN": 29,
          "avgPct": -7.07,
          "leader": {
            "code": "301273",
            "name": "瑞晨环保",
            "pct": 32.26
          }
        },
        {
          "code": "污水处理",
          "name": "污水处理",
          "n": 32,
          "up": 4,
          "evalN": 32,
          "avgPct": -7.3,
          "leader": {
            "code": "603200",
            "name": "上海洗霸",
            "pct": 33.49
          }
        },
        {
          "code": "再生资源",
          "name": "再生资源",
          "n": 20,
          "up": 1,
          "evalN": 20,
          "avgPct": -10.13,
          "leader": {
            "code": "000573",
            "name": "粤宏远Ａ",
            "pct": 1.05
          }
        }
      ]
    },
    {
      "name": "光伏",
      "n": 53,
      "up": 7,
      "evalN": 53,
      "avgPct": -9.63,
      "leader": {
        "code": "600732",
        "name": "爱旭股份",
        "pct": 10.45
      },
      "concepts": [
        {
          "code": "光伏制造",
          "name": "光伏制造",
          "n": 23,
          "up": 4,
          "evalN": 23,
          "avgPct": -7.47,
          "leader": {
            "code": "600732",
            "name": "爱旭股份",
            "pct": 10.45
          }
        },
        {
          "code": "光伏材料",
          "name": "光伏材料",
          "n": 17,
          "up": 2,
          "evalN": 17,
          "avgPct": -9.04,
          "leader": {
            "code": "301168",
            "name": "通灵股份",
            "pct": 5.13
          }
        },
        {
          "code": "光伏设备",
          "name": "光伏设备",
          "n": 13,
          "up": 1,
          "evalN": 13,
          "avgPct": -14.21,
          "leader": {
            "code": "300827",
            "name": "上能电气",
            "pct": 1.34
          }
        }
      ]
    },
    {
      "name": "资源",
      "n": 67,
      "up": 5,
      "evalN": 67,
      "avgPct": -9.37,
      "leader": {
        "code": "300224",
        "name": "正海磁材",
        "pct": 5.34
      },
      "concepts": [
        {
          "code": "特种钢",
          "name": "特种钢",
          "n": 15,
          "up": 1,
          "evalN": 15,
          "avgPct": -7.96,
          "leader": {
            "code": "600507",
            "name": "方大特钢",
            "pct": 2.53
          }
        },
        {
          "code": "稀土永磁",
          "name": "稀土永磁",
          "n": 19,
          "up": 3,
          "evalN": 19,
          "avgPct": -8.01,
          "leader": {
            "code": "300224",
            "name": "正海磁材",
            "pct": 5.34
          }
        },
        {
          "code": "锂",
          "name": "锂",
          "n": 15,
          "up": 1,
          "evalN": 15,
          "avgPct": -9.18,
          "leader": {
            "code": "300631",
            "name": "久吾高科",
            "pct": 5.18
          }
        },
        {
          "code": "黄金",
          "name": "黄金",
          "n": 12,
          "up": 0,
          "evalN": 12,
          "avgPct": -9.78,
          "leader": {
            "code": "000975",
            "name": "山金国际",
            "pct": -0.45
          }
        },
        {
          "code": "白银",
          "name": "白银",
          "n": 6,
          "up": 0,
          "evalN": 6,
          "avgPct": -16.83,
          "leader": {
            "code": "600531",
            "name": "豫光金铅",
            "pct": -11.6
          }
        }
      ]
    },
    {
      "name": "国产替代",
      "n": 47,
      "up": 7,
      "evalN": 47,
      "avgPct": -8.74,
      "leader": {
        "code": "601728",
        "name": "中国电信",
        "pct": 10.08
      },
      "concepts": [
        {
          "code": "5G概念",
          "name": "5G概念",
          "n": 40,
          "up": 7,
          "evalN": 40,
          "avgPct": -8.56,
          "leader": {
            "code": "601728",
            "name": "中国电信",
            "pct": 10.08
          }
        },
        {
          "code": "华为概念",
          "name": "华为概念",
          "n": 7,
          "up": 0,
          "evalN": 7,
          "avgPct": -9.74,
          "leader": {
            "code": "002180",
            "name": "奔图科技",
            "pct": -1.43
          }
        }
      ]
    },
    {
      "name": "生活服务",
      "n": 16,
      "up": 0,
      "evalN": 16,
      "avgPct": -9.44,
      "leader": {
        "code": "605098",
        "name": "行动教育",
        "pct": -1.66
      },
      "concepts": [
        {
          "code": "教育",
          "name": "教育",
          "n": 16,
          "up": 0,
          "evalN": 16,
          "avgPct": -9.44,
          "leader": {
            "code": "605098",
            "name": "行动教育",
            "pct": -1.66
          }
        }
      ]
    },
    {
      "name": "有色金属",
      "n": 69,
      "up": 4,
      "evalN": 69,
      "avgPct": -10.76,
      "leader": {
        "code": "000807",
        "name": "云铝股份",
        "pct": 2.13
      },
      "concepts": [
        {
          "code": "工业金属",
          "name": "工业金属",
          "n": 49,
          "up": 4,
          "evalN": 49,
          "avgPct": -10.11,
          "leader": {
            "code": "000807",
            "name": "云铝股份",
            "pct": 2.13
          }
        },
        {
          "code": "小金属",
          "name": "小金属",
          "n": 20,
          "up": 0,
          "evalN": 20,
          "avgPct": -12.34,
          "leader": {
            "code": "002978",
            "name": "安宁股份",
            "pct": -1.44
          }
        }
      ]
    },
    {
      "name": "芯片",
      "n": 87,
      "up": 2,
      "evalN": 87,
      "avgPct": -17.91,
      "leader": {
        "code": "603160",
        "name": "汇顶科技",
        "pct": 14.26
      },
      "concepts": [
        {
          "code": "芯片",
          "name": "芯片",
          "n": 22,
          "up": 2,
          "evalN": 22,
          "avgPct": -11.94,
          "leader": {
            "code": "603160",
            "name": "汇顶科技",
            "pct": 14.26
          }
        },
        {
          "code": "存储芯片",
          "name": "存储芯片",
          "n": 10,
          "up": 0,
          "evalN": 10,
          "avgPct": -18.38,
          "leader": {
            "code": "301666",
            "name": "大普微",
            "pct": -3.3
          }
        },
        {
          "code": "PCB",
          "name": "PCB",
          "n": 55,
          "up": 0,
          "evalN": 55,
          "avgPct": -20.22,
          "leader": {
            "code": "002544",
            "name": "普天科技",
            "pct": -2.29
          }
        }
      ]
    },
    {
      "name": "农业",
      "n": 22,
      "up": 1,
      "evalN": 22,
      "avgPct": -16.05,
      "leader": {
        "code": "600598",
        "name": "北大荒",
        "pct": 8.9
      },
      "concepts": [
        {
          "code": "农业种植",
          "name": "农业种植",
          "n": 17,
          "up": 1,
          "evalN": 17,
          "avgPct": -15.72,
          "leader": {
            "code": "600598",
            "name": "北大荒",
            "pct": 8.9
          }
        },
        {
          "code": "林业",
          "name": "林业",
          "n": 5,
          "up": 0,
          "evalN": 5,
          "avgPct": -17.15,
          "leader": {
            "code": "600076",
            "name": "康欣新材",
            "pct": -5.71
          }
        }
      ]
    },
    {
      "name": "半导体",
      "n": 72,
      "up": 2,
      "evalN": 72,
      "avgPct": -17.81,
      "leader": {
        "code": "301269",
        "name": "华大九天",
        "pct": 17.89
      },
      "concepts": [
        {
          "code": "半导体",
          "name": "半导体",
          "n": 50,
          "up": 2,
          "evalN": 50,
          "avgPct": -15.72,
          "leader": {
            "code": "301269",
            "name": "华大九天",
            "pct": 17.89
          }
        },
        {
          "code": "第三代半导体",
          "name": "第三代半导体",
          "n": 6,
          "up": 0,
          "evalN": 6,
          "avgPct": -21.47,
          "leader": {
            "code": "600584",
            "name": "长电科技",
            "pct": -15.31
          }
        },
        {
          "code": "半导体设备",
          "name": "半导体设备",
          "n": 16,
          "up": 0,
          "evalN": 16,
          "avgPct": -22.99,
          "leader": {
            "code": "300480",
            "name": "光力科技",
            "pct": -10.06
          }
        }
      ]
    }
  ]
  };

  var YEAR = {
  meta: {
    "lastDate": "2026-10-28",
    "exportedAt": "2026-10-28T11:15:15.782Z",
    "stocksEvaluated": 4405,
    "categories": 31,
    "concepts": 144,
    "note": "两级概念热力（大类 → 子概念，一股一概念）：面积=涨股比 up/n ×1000+1，颜色=平均涨幅 avgPct（±10% 封顶），leader=区间涨幅第一；日/周/月/年均为真实区间统计，与 heatmap-periods.json 同步（导出 meta：stocks 4414 · filtered 814 · leaderStocks 4196 · leaderDays 6288）",
    "period": "year",
    "periodName": "年",
    "periodRange": "近 244 个交易日"
  },
  categories: [
    {
      "name": "人工智能",
      "n": 83,
      "up": 32,
      "evalN": 83,
      "avgPct": 5.01,
      "leader": {
        "code": "601869",
        "name": "长飞光纤",
        "pct": 229.08
      },
      "concepts": [
        {
          "code": "光通信",
          "name": "光通信",
          "n": 19,
          "up": 16,
          "evalN": 19,
          "avgPct": 58.82,
          "leader": {
            "code": "601869",
            "name": "长飞光纤",
            "pct": 229.08
          }
        },
        {
          "code": "人工智能",
          "name": "人工智能",
          "n": 11,
          "up": 3,
          "evalN": 11,
          "avgPct": -0.43,
          "leader": {
            "code": "003004",
            "name": "声迅股份",
            "pct": 178.5
          }
        },
        {
          "code": "算力",
          "name": "算力",
          "n": 21,
          "up": 7,
          "evalN": 21,
          "avgPct": -2.83,
          "leader": {
            "code": "603629",
            "name": "利通电子",
            "pct": 218.31
          }
        },
        {
          "code": "数据中心",
          "name": "数据中心",
          "n": 32,
          "up": 6,
          "evalN": 32,
          "avgPct": -19.93,
          "leader": {
            "code": "300990",
            "name": "同飞股份",
            "pct": 30.27
          }
        }
      ]
    },
    {
      "name": "芯片",
      "n": 83,
      "up": 46,
      "evalN": 83,
      "avgPct": 20.53,
      "leader": {
        "code": "300903",
        "name": "科翔股份",
        "pct": 337.71
      },
      "concepts": [
        {
          "code": "PCB",
          "name": "PCB",
          "n": 53,
          "up": 34,
          "evalN": 53,
          "avgPct": 33.96,
          "leader": {
            "code": "300903",
            "name": "科翔股份",
            "pct": 337.71
          }
        },
        {
          "code": "存储芯片",
          "name": "存储芯片",
          "n": 9,
          "up": 4,
          "evalN": 9,
          "avgPct": 5.65,
          "leader": {
            "code": "300672",
            "name": "国科微",
            "pct": 47.24
          }
        },
        {
          "code": "芯片",
          "name": "芯片",
          "n": 21,
          "up": 8,
          "evalN": 21,
          "avgPct": -7,
          "leader": {
            "code": "301536",
            "name": "星宸科技",
            "pct": 62.67
          }
        }
      ]
    },
    {
      "name": "半导体",
      "n": 69,
      "up": 29,
      "evalN": 69,
      "avgPct": 6.98,
      "leader": {
        "code": "300489",
        "name": "光智科技",
        "pct": 393.2
      },
      "concepts": [
        {
          "code": "半导体设备",
          "name": "半导体设备",
          "n": 14,
          "up": 8,
          "evalN": 14,
          "avgPct": 21.06,
          "leader": {
            "code": "300604",
            "name": "长川科技",
            "pct": 116.35
          }
        },
        {
          "code": "第三代半导体",
          "name": "第三代半导体",
          "n": 6,
          "up": 5,
          "evalN": 6,
          "avgPct": 20.8,
          "leader": {
            "code": "003031",
            "name": "中瓷电子",
            "pct": 54.61
          }
        },
        {
          "code": "半导体",
          "name": "半导体",
          "n": 49,
          "up": 16,
          "evalN": 49,
          "avgPct": 1.27,
          "leader": {
            "code": "300489",
            "name": "光智科技",
            "pct": 393.2
          }
        }
      ]
    },
    {
      "name": "有色金属",
      "n": 66,
      "up": 25,
      "evalN": 66,
      "avgPct": -1.16,
      "leader": {
        "code": "002428",
        "name": "云南锗业",
        "pct": 166.99
      },
      "concepts": [
        {
          "code": "小金属",
          "name": "小金属",
          "n": 17,
          "up": 10,
          "evalN": 17,
          "avgPct": 19.58,
          "leader": {
            "code": "002428",
            "name": "云南锗业",
            "pct": 166.99
          }
        },
        {
          "code": "工业金属",
          "name": "工业金属",
          "n": 49,
          "up": 15,
          "evalN": 49,
          "avgPct": -8.35,
          "leader": {
            "code": "600301",
            "name": "华锡有色",
            "pct": 59.01
          }
        }
      ]
    },
    {
      "name": "资源",
      "n": 67,
      "up": 17,
      "evalN": 67,
      "avgPct": -12.7,
      "leader": {
        "code": "600330",
        "name": "天通股份",
        "pct": 105.96
      },
      "concepts": [
        {
          "code": "白银",
          "name": "白银",
          "n": 6,
          "up": 4,
          "evalN": 6,
          "avgPct": 15.74,
          "leader": {
            "code": "603045",
            "name": "福达合金",
            "pct": 77.35
          }
        },
        {
          "code": "黄金",
          "name": "黄金",
          "n": 12,
          "up": 4,
          "evalN": 12,
          "avgPct": -4.32,
          "leader": {
            "code": "001337",
            "name": "四川黄金",
            "pct": 37.46
          }
        },
        {
          "code": "锂",
          "name": "锂",
          "n": 15,
          "up": 4,
          "evalN": 15,
          "avgPct": -10.58,
          "leader": {
            "code": "300390",
            "name": "天华新能",
            "pct": 38.88
          }
        },
        {
          "code": "稀土永磁",
          "name": "稀土永磁",
          "n": 19,
          "up": 4,
          "evalN": 19,
          "avgPct": -15.56,
          "leader": {
            "code": "600330",
            "name": "天通股份",
            "pct": 105.96
          }
        },
        {
          "code": "特种钢",
          "name": "特种钢",
          "n": 15,
          "up": 1,
          "evalN": 15,
          "avgPct": -29.29,
          "leader": {
            "code": "603995",
            "name": "甬金股份",
            "pct": 23.82
          }
        }
      ]
    },
    {
      "name": "通用制造",
      "n": 345,
      "up": 81,
      "evalN": 345,
      "avgPct": -9.7,
      "leader": {
        "code": "002980",
        "name": "华盛昌",
        "pct": 257.98
      },
      "concepts": [
        {
          "code": "电子元器件",
          "name": "电子元器件",
          "n": 45,
          "up": 20,
          "evalN": 45,
          "avgPct": 14.39,
          "leader": {
            "code": "002980",
            "name": "华盛昌",
            "pct": 257.98
          }
        },
        {
          "code": "机械零部件",
          "name": "机械零部件",
          "n": 51,
          "up": 13,
          "evalN": 51,
          "avgPct": -9.13,
          "leader": {
            "code": "300179",
            "name": "四方达",
            "pct": 107.21
          }
        },
        {
          "code": "电力设备",
          "name": "电力设备",
          "n": 82,
          "up": 19,
          "evalN": 82,
          "avgPct": -11.41,
          "leader": {
            "code": "603618",
            "name": "杭电股份",
            "pct": 216.07
          }
        },
        {
          "code": "电工器材",
          "name": "电工器材",
          "n": 49,
          "up": 12,
          "evalN": 49,
          "avgPct": -12.1,
          "leader": {
            "code": "600869",
            "name": "远东股份",
            "pct": 83.52
          }
        },
        {
          "code": "通用设备",
          "name": "通用设备",
          "n": 104,
          "up": 17,
          "evalN": 104,
          "avgPct": -15.99,
          "leader": {
            "code": "000811",
            "name": "冰轮环境",
            "pct": 95.93
          }
        },
        {
          "code": "轨道交通",
          "name": "轨道交通",
          "n": 14,
          "up": 0,
          "evalN": 14,
          "avgPct": -24.13,
          "leader": {
            "code": "603680",
            "name": "今创集团",
            "pct": -5.74
          }
        }
      ]
    },
    {
      "name": "基建",
      "n": 161,
      "up": 24,
      "evalN": 161,
      "avgPct": -13.98,
      "leader": {
        "code": "002718",
        "name": "友邦吊顶",
        "pct": 243.5
      },
      "concepts": [
        {
          "code": "玻璃",
          "name": "玻璃",
          "n": 14,
          "up": 4,
          "evalN": 14,
          "avgPct": 10.4,
          "leader": {
            "code": "301526",
            "name": "国际复材",
            "pct": 207.23
          }
        },
        {
          "code": "港口",
          "name": "港口",
          "n": 15,
          "up": 4,
          "evalN": 15,
          "avgPct": -10.31,
          "leader": {
            "code": "601000",
            "name": "唐山港",
            "pct": 20.95
          }
        },
        {
          "code": "建筑材料",
          "name": "建筑材料",
          "n": 53,
          "up": 8,
          "evalN": 53,
          "avgPct": -12.42,
          "leader": {
            "code": "002718",
            "name": "友邦吊顶",
            "pct": 243.5
          }
        },
        {
          "code": "钢铁",
          "name": "钢铁",
          "n": 37,
          "up": 6,
          "evalN": 37,
          "avgPct": -17.99,
          "leader": {
            "code": "603278",
            "name": "大业股份",
            "pct": 70.67
          }
        },
        {
          "code": "水泥",
          "name": "水泥",
          "n": 18,
          "up": 2,
          "evalN": 18,
          "avgPct": -19.75,
          "leader": {
            "code": "000672",
            "name": "上峰材料",
            "pct": 24.78
          }
        },
        {
          "code": "国家工程",
          "name": "国家工程",
          "n": 24,
          "up": 0,
          "evalN": 24,
          "avgPct": -23.45,
          "leader": {
            "code": "002051",
            "name": "中工国际",
            "pct": -1.65
          }
        }
      ]
    },
    {
      "name": "军工",
      "n": 102,
      "up": 20,
      "evalN": 102,
      "avgPct": -13.51,
      "leader": {
        "code": "603268",
        "name": "松发股份",
        "pct": 202.04
      },
      "concepts": [
        {
          "code": "军工整机",
          "name": "军工整机",
          "n": 19,
          "up": 6,
          "evalN": 19,
          "avgPct": 9.44,
          "leader": {
            "code": "603268",
            "name": "松发股份",
            "pct": 202.04
          }
        },
        {
          "code": "雷达",
          "name": "雷达",
          "n": 11,
          "up": 3,
          "evalN": 11,
          "avgPct": -7.76,
          "leader": {
            "code": "001270",
            "name": "铖昌科技",
            "pct": 73.39
          }
        },
        {
          "code": "卫星火箭",
          "name": "卫星火箭",
          "n": 15,
          "up": 4,
          "evalN": 15,
          "avgPct": -11.87,
          "leader": {
            "code": "300342",
            "name": "天银机电",
            "pct": 44.11
          }
        },
        {
          "code": "军工材料",
          "name": "军工材料",
          "n": 14,
          "up": 3,
          "evalN": 14,
          "avgPct": -18.8,
          "leader": {
            "code": "002297",
            "name": "博云新材",
            "pct": 68.24
          }
        },
        {
          "code": "军工电子",
          "name": "军工电子",
          "n": 27,
          "up": 3,
          "evalN": 27,
          "avgPct": -21.3,
          "leader": {
            "code": "301571",
            "name": "国科天成",
            "pct": 43.08
          }
        },
        {
          "code": "兵器火工",
          "name": "兵器火工",
          "n": 16,
          "up": 1,
          "evalN": 16,
          "avgPct": -28.46,
          "leader": {
            "code": "002246",
            "name": "北化股份",
            "pct": 5.17
          }
        }
      ]
    },
    {
      "name": "能源",
      "n": 190,
      "up": 57,
      "evalN": 190,
      "avgPct": -8.19,
      "leader": {
        "code": "600396",
        "name": "华电辽能",
        "pct": 207.27
      },
      "concepts": [
        {
          "code": "火电",
          "name": "火电",
          "n": 27,
          "up": 11,
          "evalN": 27,
          "avgPct": 5.99,
          "leader": {
            "code": "600396",
            "name": "华电辽能",
            "pct": 207.27
          }
        },
        {
          "code": "水电核电",
          "name": "水电核电",
          "n": 16,
          "up": 10,
          "evalN": 16,
          "avgPct": 0.75,
          "leader": {
            "code": "600236",
            "name": "桂冠电力",
            "pct": 20.38
          }
        },
        {
          "code": "石油石化",
          "name": "石油石化",
          "n": 43,
          "up": 16,
          "evalN": 43,
          "avgPct": -1.4,
          "leader": {
            "code": "000703",
            "name": "恒逸石化",
            "pct": 91.47
          }
        },
        {
          "code": "煤炭",
          "name": "煤炭",
          "n": 41,
          "up": 14,
          "evalN": 41,
          "avgPct": -7.68,
          "leader": {
            "code": "601101",
            "name": "昊华能源",
            "pct": 46.52
          }
        },
        {
          "code": "绿电运营",
          "name": "绿电运营",
          "n": 15,
          "up": 2,
          "evalN": 15,
          "avgPct": -16,
          "leader": {
            "code": "000690",
            "name": "宝新能源",
            "pct": 7.07
          }
        },
        {
          "code": "风能发电",
          "name": "风能发电",
          "n": 48,
          "up": 4,
          "evalN": 48,
          "avgPct": -23.24,
          "leader": {
            "code": "301232",
            "name": "飞沃科技",
            "pct": 64.86
          }
        }
      ]
    },
    {
      "name": "消费",
      "n": 421,
      "up": 61,
      "evalN": 421,
      "avgPct": -16.68,
      "leader": {
        "code": "300209",
        "name": "行云科技",
        "pct": 305.68
      },
      "concepts": [
        {
          "code": "跨境/免税",
          "name": "跨境/免税",
          "n": 17,
          "up": 5,
          "evalN": 17,
          "avgPct": 3.06,
          "leader": {
            "code": "300209",
            "name": "行云科技",
            "pct": 305.68
          }
        },
        {
          "code": "调味品",
          "name": "调味品",
          "n": 15,
          "up": 4,
          "evalN": 15,
          "avgPct": -7.84,
          "leader": {
            "code": "600186",
            "name": "莲花控股",
            "pct": 61.69
          }
        },
        {
          "code": "水产养殖",
          "name": "水产养殖",
          "n": 12,
          "up": 2,
          "evalN": 12,
          "avgPct": -8.85,
          "leader": {
            "code": "002696",
            "name": "百洋股份",
            "pct": 76.46
          }
        },
        {
          "code": "乳业/饮料",
          "name": "乳业/饮料",
          "n": 29,
          "up": 7,
          "evalN": 29,
          "avgPct": -13.6,
          "leader": {
            "code": "605198",
            "name": "安德利",
            "pct": 24.74
          }
        },
        {
          "code": "家电",
          "name": "家电",
          "n": 89,
          "up": 17,
          "evalN": 89,
          "avgPct": -14.89,
          "leader": {
            "code": "002242",
            "name": "九阳股份",
            "pct": 131.2
          }
        },
        {
          "code": "食品加工",
          "name": "食品加工",
          "n": 64,
          "up": 10,
          "evalN": 64,
          "avgPct": -15.86,
          "leader": {
            "code": "600127",
            "name": "金健米业",
            "pct": 50.58
          }
        },
        {
          "code": "体育户外",
          "name": "体育户外",
          "n": 16,
          "up": 2,
          "evalN": 16,
          "avgPct": -17.05,
          "leader": {
            "code": "605299",
            "name": "舒华体育",
            "pct": 19.18
          }
        },
        {
          "code": "新零售",
          "name": "新零售",
          "n": 71,
          "up": 10,
          "evalN": 71,
          "avgPct": -17.58,
          "leader": {
            "code": "002348",
            "name": "高乐股份",
            "pct": 92.26
          }
        },
        {
          "code": "鸡肉",
          "name": "鸡肉",
          "n": 10,
          "up": 0,
          "evalN": 10,
          "avgPct": -17.65,
          "leader": {
            "code": "002746",
            "name": "仙坛股份",
            "pct": -1.12
          }
        },
        {
          "code": "啤酒",
          "name": "啤酒",
          "n": 7,
          "up": 0,
          "evalN": 7,
          "avgPct": -17.65,
          "leader": {
            "code": "600573",
            "name": "惠泉啤酒",
            "pct": -0.17
          }
        },
        {
          "code": "休闲食品",
          "name": "休闲食品",
          "n": 13,
          "up": 2,
          "evalN": 13,
          "avgPct": -18.01,
          "leader": {
            "code": "001219",
            "name": "青岛食品",
            "pct": 12.65
          }
        },
        {
          "code": "猪肉",
          "name": "猪肉",
          "n": 25,
          "up": 0,
          "evalN": 25,
          "avgPct": -22.35,
          "leader": {
            "code": "002100",
            "name": "天康生物",
            "pct": -1.02
          }
        },
        {
          "code": "美妆个护",
          "name": "美妆个护",
          "n": 20,
          "up": 1,
          "evalN": 20,
          "avgPct": -23.73,
          "leader": {
            "code": "301108",
            "name": "洁雅股份",
            "pct": 39.82
          }
        },
        {
          "code": "珠宝首饰",
          "name": "珠宝首饰",
          "n": 13,
          "up": 0,
          "evalN": 13,
          "avgPct": -27.77,
          "leader": {
            "code": "605599",
            "name": "菜百股份",
            "pct": -10.5
          }
        },
        {
          "code": "白酒",
          "name": "白酒",
          "n": 20,
          "up": 1,
          "evalN": 20,
          "avgPct": -33.33,
          "leader": {
            "code": "603198",
            "name": "迎驾贡酒",
            "pct": 1.34
          }
        }
      ]
    },
    {
      "name": "房地产建筑",
      "n": 148,
      "up": 25,
      "evalN": 148,
      "avgPct": -14.89,
      "leader": {
        "code": "000608",
        "name": "阳光股份",
        "pct": 197.01
      },
      "concepts": [
        {
          "code": "物业服务",
          "name": "物业服务",
          "n": 14,
          "up": 5,
          "evalN": 14,
          "avgPct": 1.93,
          "leader": {
            "code": "000608",
            "name": "阳光股份",
            "pct": 197.01
          }
        },
        {
          "code": "建筑装饰",
          "name": "建筑装饰",
          "n": 52,
          "up": 14,
          "evalN": 52,
          "avgPct": -8.6,
          "leader": {
            "code": "603929",
            "name": "亚翔集成",
            "pct": 160.58
          }
        },
        {
          "code": "园林生态",
          "name": "园林生态",
          "n": 13,
          "up": 2,
          "evalN": 13,
          "avgPct": -14.88,
          "leader": {
            "code": "300649",
            "name": "杭州园林",
            "pct": 45.29
          }
        },
        {
          "code": "房地产开发",
          "name": "房地产开发",
          "n": 69,
          "up": 4,
          "evalN": 69,
          "avgPct": -23.05,
          "leader": {
            "code": "600683",
            "name": "京投发展",
            "pct": 64.54
          }
        }
      ]
    },
    {
      "name": "交运物流",
      "n": 118,
      "up": 19,
      "evalN": 118,
      "avgPct": -15.16,
      "leader": {
        "code": "601872",
        "name": "招商轮船",
        "pct": 106.9
      },
      "concepts": [
        {
          "code": "航运",
          "name": "航运",
          "n": 17,
          "up": 6,
          "evalN": 17,
          "avgPct": 0.66,
          "leader": {
            "code": "601872",
            "name": "招商轮船",
            "pct": 106.9
          }
        },
        {
          "code": "铁路公路",
          "name": "铁路公路",
          "n": 33,
          "up": 6,
          "evalN": 33,
          "avgPct": -13.86,
          "leader": {
            "code": "600350",
            "name": "山东高速",
            "pct": 17.44
          }
        },
        {
          "code": "快递物流",
          "name": "快递物流",
          "n": 55,
          "up": 7,
          "evalN": 55,
          "avgPct": -17.42,
          "leader": {
            "code": "001228",
            "name": "永泰运",
            "pct": 26.84
          }
        },
        {
          "code": "航空机场",
          "name": "航空机场",
          "n": 13,
          "up": 0,
          "evalN": 13,
          "avgPct": -29.55,
          "leader": {
            "code": "000089",
            "name": "深圳机场",
            "pct": -8.8
          }
        }
      ]
    },
    {
      "name": "智能制造",
      "n": 200,
      "up": 44,
      "evalN": 200,
      "avgPct": -14.59,
      "leader": {
        "code": "300503",
        "name": "昊志机电",
        "pct": 122.34
      },
      "concepts": [
        {
          "code": "机床与激光",
          "name": "机床与激光",
          "n": 26,
          "up": 12,
          "evalN": 26,
          "avgPct": -0.66,
          "leader": {
            "code": "300503",
            "name": "昊志机电",
            "pct": 122.34
          }
        },
        {
          "code": "智能装备",
          "name": "智能装备",
          "n": 57,
          "up": 14,
          "evalN": 57,
          "avgPct": -13.55,
          "leader": {
            "code": "300461",
            "name": "田中精机",
            "pct": 87
          }
        },
        {
          "code": "工业机器人",
          "name": "工业机器人",
          "n": 53,
          "up": 10,
          "evalN": 53,
          "avgPct": -15.24,
          "leader": {
            "code": "300720",
            "name": "海川智能",
            "pct": 107.23
          }
        },
        {
          "code": "重型装备",
          "name": "重型装备",
          "n": 19,
          "up": 1,
          "evalN": 19,
          "avgPct": -19.73,
          "leader": {
            "code": "600343",
            "name": "航天动力",
            "pct": 5.83
          }
        },
        {
          "code": "智能交通",
          "name": "智能交通",
          "n": 45,
          "up": 7,
          "evalN": 45,
          "avgPct": -21.01,
          "leader": {
            "code": "300420",
            "name": "五洋自控",
            "pct": 51.48
          }
        }
      ]
    },
    {
      "name": "金融类",
      "n": 155,
      "up": 22,
      "evalN": 155,
      "avgPct": -21.44,
      "leader": {
        "code": "601988",
        "name": "中国银行",
        "pct": 25.36
      },
      "concepts": [
        {
          "code": "银行",
          "name": "银行",
          "n": 42,
          "up": 18,
          "evalN": 42,
          "avgPct": -0.91,
          "leader": {
            "code": "601988",
            "name": "中国银行",
            "pct": 25.36
          }
        },
        {
          "code": "保险",
          "name": "保险",
          "n": 6,
          "up": 0,
          "evalN": 6,
          "avgPct": -21.18,
          "leader": {
            "code": "601318",
            "name": "中国平安",
            "pct": -9.44
          }
        },
        {
          "code": "券商概念",
          "name": "券商概念",
          "n": 47,
          "up": 1,
          "evalN": 47,
          "avgPct": -24.29,
          "leader": {
            "code": "600909",
            "name": "华安证券",
            "pct": 6.44
          }
        },
        {
          "code": "多元金融",
          "name": "多元金融",
          "n": 24,
          "up": 2,
          "evalN": 24,
          "avgPct": -28.3,
          "leader": {
            "code": "600901",
            "name": "江苏金租",
            "pct": 23.85
          }
        },
        {
          "code": "金融科技",
          "name": "金融科技",
          "n": 36,
          "up": 1,
          "evalN": 36,
          "avgPct": -37.14,
          "leader": {
            "code": "002647",
            "name": "仁东控股",
            "pct": 11.94
          }
        }
      ]
    },
    {
      "name": "轻工制造",
      "n": 130,
      "up": 27,
      "evalN": 130,
      "avgPct": -11.84,
      "leader": {
        "code": "003018",
        "name": "金富科技",
        "pct": 209.5
      },
      "concepts": [
        {
          "code": "包装印刷",
          "name": "包装印刷",
          "n": 46,
          "up": 14,
          "evalN": 46,
          "avgPct": -1.12,
          "leader": {
            "code": "003018",
            "name": "金富科技",
            "pct": 209.5
          }
        },
        {
          "code": "家居用品",
          "name": "家居用品",
          "n": 45,
          "up": 9,
          "evalN": 45,
          "avgPct": -14.99,
          "leader": {
            "code": "300749",
            "name": "顶固集创",
            "pct": 108.21
          }
        },
        {
          "code": "造纸",
          "name": "造纸",
          "n": 21,
          "up": 1,
          "evalN": 21,
          "avgPct": -18.84,
          "leader": {
            "code": "605007",
            "name": "五洲特纸",
            "pct": 8.8
          }
        },
        {
          "code": "其他轻工",
          "name": "其他轻工",
          "n": 18,
          "up": 3,
          "evalN": 18,
          "avgPct": -23.23,
          "leader": {
            "code": "300907",
            "name": "康平科技",
            "pct": 35.85
          }
        }
      ]
    },
    {
      "name": "医疗",
      "n": 189,
      "up": 35,
      "evalN": 189,
      "avgPct": -13.2,
      "leader": {
        "code": "301234",
        "name": "五洲医疗",
        "pct": 205.96
      },
      "concepts": [
        {
          "code": "医疗耗材",
          "name": "医疗耗材",
          "n": 27,
          "up": 8,
          "evalN": 27,
          "avgPct": -2.62,
          "leader": {
            "code": "301234",
            "name": "五洲医疗",
            "pct": 205.96
          }
        },
        {
          "code": "医药商业",
          "name": "医药商业",
          "n": 30,
          "up": 8,
          "evalN": 30,
          "avgPct": -7.21,
          "leader": {
            "code": "603122",
            "name": "合富中国",
            "pct": 52.79
          }
        },
        {
          "code": "中药",
          "name": "中药",
          "n": 59,
          "up": 8,
          "evalN": 59,
          "avgPct": -15.47,
          "leader": {
            "code": "603139",
            "name": "康惠股份",
            "pct": 42.72
          }
        },
        {
          "code": "体外诊断",
          "name": "体外诊断",
          "n": 22,
          "up": 3,
          "evalN": 22,
          "avgPct": -15.83,
          "leader": {
            "code": "300244",
            "name": "迪安诊断",
            "pct": 35.78
          }
        },
        {
          "code": "医疗器械",
          "name": "医疗器械",
          "n": 27,
          "up": 6,
          "evalN": 27,
          "avgPct": -18.26,
          "leader": {
            "code": "300246",
            "name": "宝莱特",
            "pct": 43.35
          }
        },
        {
          "code": "AI医疗",
          "name": "AI医疗",
          "n": 11,
          "up": 2,
          "evalN": 11,
          "avgPct": -18.69,
          "leader": {
            "code": "603990",
            "name": "麦迪科技",
            "pct": 17.33
          }
        },
        {
          "code": "医疗服务",
          "name": "医疗服务",
          "n": 13,
          "up": 0,
          "evalN": 13,
          "avgPct": -19.13,
          "leader": {
            "code": "002612",
            "name": "朗姿股份",
            "pct": -2.45
          }
        }
      ]
    },
    {
      "name": "基础化工",
      "n": 315,
      "up": 67,
      "evalN": 315,
      "avgPct": -12.24,
      "leader": {
        "code": "603580",
        "name": "艾艾精工",
        "pct": 322.11
      },
      "concepts": [
        {
          "code": "复合材料",
          "name": "复合材料",
          "n": 19,
          "up": 5,
          "evalN": 19,
          "avgPct": -4.84,
          "leader": {
            "code": "601208",
            "name": "东材科技",
            "pct": 85.36
          }
        },
        {
          "code": "化工原料",
          "name": "化工原料",
          "n": 79,
          "up": 17,
          "evalN": 79,
          "avgPct": -7.84,
          "leader": {
            "code": "000510",
            "name": "新金路",
            "pct": 95.71
          }
        },
        {
          "code": "氟化工",
          "name": "氟化工",
          "n": 29,
          "up": 9,
          "evalN": 29,
          "avgPct": -10.01,
          "leader": {
            "code": "603938",
            "name": "三孚股份",
            "pct": 69.57
          }
        },
        {
          "code": "精细中间体",
          "name": "精细中间体",
          "n": 66,
          "up": 17,
          "evalN": 66,
          "avgPct": -11.41,
          "leader": {
            "code": "301373",
            "name": "凌玮科技",
            "pct": 169.39
          }
        },
        {
          "code": "橡塑材料",
          "name": "橡塑材料",
          "n": 27,
          "up": 4,
          "evalN": 27,
          "avgPct": -13.11,
          "leader": {
            "code": "603580",
            "name": "艾艾精工",
            "pct": 322.11
          }
        },
        {
          "code": "化学纤维",
          "name": "化学纤维",
          "n": 19,
          "up": 4,
          "evalN": 19,
          "avgPct": -13.85,
          "leader": {
            "code": "601233",
            "name": "桐昆股份",
            "pct": 41.83
          }
        },
        {
          "code": "涂料油墨",
          "name": "涂料油墨",
          "n": 29,
          "up": 5,
          "evalN": 29,
          "avgPct": -16.52,
          "leader": {
            "code": "603823",
            "name": "百合花",
            "pct": 115.51
          }
        },
        {
          "code": "农药化肥",
          "name": "农药化肥",
          "n": 47,
          "up": 6,
          "evalN": 47,
          "avgPct": -21.38,
          "leader": {
            "code": "600227",
            "name": "赤天化",
            "pct": 32.24
          }
        }
      ]
    },
    {
      "name": "消费电子",
      "n": 172,
      "up": 42,
      "evalN": 172,
      "avgPct": -10.67,
      "leader": {
        "code": "002655",
        "name": "共达电声",
        "pct": 121.95
      },
      "concepts": [
        {
          "code": "消费电子零部件",
          "name": "消费电子零部件",
          "n": 63,
          "up": 17,
          "evalN": 63,
          "avgPct": -5.11,
          "leader": {
            "code": "002655",
            "name": "共达电声",
            "pct": 121.95
          }
        },
        {
          "code": "显示与LED",
          "name": "显示与LED",
          "n": 64,
          "up": 17,
          "evalN": 64,
          "avgPct": -9.94,
          "leader": {
            "code": "301321",
            "name": "翰博高新",
            "pct": 119.52
          }
        },
        {
          "code": "整机与品牌",
          "name": "整机与品牌",
          "n": 45,
          "up": 8,
          "evalN": 45,
          "avgPct": -19.5,
          "leader": {
            "code": "300736",
            "name": "百邦科技",
            "pct": 96.43
          }
        }
      ]
    },
    {
      "name": "纺织服饰",
      "n": 82,
      "up": 23,
      "evalN": 82,
      "avgPct": -8.12,
      "leader": {
        "code": "603608",
        "name": "天创时尚",
        "pct": 139.43
      },
      "concepts": [
        {
          "code": "服装家纺",
          "name": "服装家纺",
          "n": 47,
          "up": 15,
          "evalN": 47,
          "avgPct": -5.53,
          "leader": {
            "code": "603608",
            "name": "天创时尚",
            "pct": 139.43
          }
        },
        {
          "code": "纺织制造",
          "name": "纺织制造",
          "n": 35,
          "up": 8,
          "evalN": 35,
          "avgPct": -11.59,
          "leader": {
            "code": "300819",
            "name": "聚杰微纤",
            "pct": 44.63
          }
        }
      ]
    },
    {
      "name": "创新药",
      "n": 179,
      "up": 35,
      "evalN": 179,
      "avgPct": -16.83,
      "leader": {
        "code": "300006",
        "name": "莱美药业",
        "pct": 114.25
      },
      "concepts": [
        {
          "code": "创新药产业链",
          "name": "创新药产业链",
          "n": 24,
          "up": 9,
          "evalN": 24,
          "avgPct": -6.13,
          "leader": {
            "code": "603127",
            "name": "昭衍新药",
            "pct": 40.27
          }
        },
        {
          "code": "原料药",
          "name": "原料药",
          "n": 44,
          "up": 9,
          "evalN": 44,
          "avgPct": -16.66,
          "leader": {
            "code": "300497",
            "name": "富祥股份",
            "pct": 31.86
          }
        },
        {
          "code": "化学制药",
          "name": "化学制药",
          "n": 59,
          "up": 10,
          "evalN": 59,
          "avgPct": -17.31,
          "leader": {
            "code": "300006",
            "name": "莱美药业",
            "pct": 114.25
          }
        },
        {
          "code": "创新药",
          "name": "创新药",
          "n": 26,
          "up": 4,
          "evalN": 26,
          "avgPct": -18.79,
          "leader": {
            "code": "301047",
            "name": "义翘神州",
            "pct": 59.31
          }
        },
        {
          "code": "生物制品",
          "name": "生物制品",
          "n": 26,
          "up": 3,
          "evalN": 26,
          "avgPct": -23.95,
          "leader": {
            "code": "000518",
            "name": "四环生物",
            "pct": 29.32
          }
        }
      ]
    },
    {
      "name": "社会服务",
      "n": 78,
      "up": 15,
      "evalN": 78,
      "avgPct": -11.99,
      "leader": {
        "code": "001331",
        "name": "胜通能源",
        "pct": 176.88
      },
      "concepts": [
        {
          "code": "燃气",
          "name": "燃气",
          "n": 33,
          "up": 6,
          "evalN": 33,
          "avgPct": -6.63,
          "leader": {
            "code": "001331",
            "name": "胜通能源",
            "pct": 176.88
          }
        },
        {
          "code": "供热",
          "name": "供热",
          "n": 17,
          "up": 5,
          "evalN": 17,
          "avgPct": -12.44,
          "leader": {
            "code": "603391",
            "name": "力聚热能",
            "pct": 37.36
          }
        },
        {
          "code": "供电",
          "name": "供电",
          "n": 9,
          "up": 2,
          "evalN": 9,
          "avgPct": -15.07,
          "leader": {
            "code": "600310",
            "name": "广西能源",
            "pct": 7.52
          }
        },
        {
          "code": "水务",
          "name": "水务",
          "n": 19,
          "up": 2,
          "evalN": 19,
          "avgPct": -19.43,
          "leader": {
            "code": "601199",
            "name": "江南水务",
            "pct": 10.92
          }
        }
      ]
    },
    {
      "name": "环保",
      "n": 121,
      "up": 21,
      "evalN": 121,
      "avgPct": -13.4,
      "leader": {
        "code": "000711",
        "name": "京蓝科技",
        "pct": 99.44
      },
      "concepts": [
        {
          "code": "环保装备",
          "name": "环保装备",
          "n": 29,
          "up": 7,
          "evalN": 29,
          "avgPct": -8,
          "leader": {
            "code": "301273",
            "name": "瑞晨环保",
            "pct": 71.94
          }
        },
        {
          "code": "再生资源",
          "name": "再生资源",
          "n": 19,
          "up": 3,
          "evalN": 19,
          "avgPct": -9.78,
          "leader": {
            "code": "000711",
            "name": "京蓝科技",
            "pct": 99.44
          }
        },
        {
          "code": "环保运营",
          "name": "环保运营",
          "n": 42,
          "up": 8,
          "evalN": 42,
          "avgPct": -14.9,
          "leader": {
            "code": "603588",
            "name": "高能环境",
            "pct": 56.8
          }
        },
        {
          "code": "污水处理",
          "name": "污水处理",
          "n": 31,
          "up": 3,
          "evalN": 31,
          "avgPct": -18.64,
          "leader": {
            "code": "301148",
            "name": "嘉戎技术",
            "pct": 42.57
          }
        }
      ]
    },
    {
      "name": "文化娱乐",
      "n": 120,
      "up": 26,
      "evalN": 120,
      "avgPct": -11.41,
      "leader": {
        "code": "600825",
        "name": "新华传媒",
        "pct": 117.79
      },
      "concepts": [
        {
          "code": "文化传媒",
          "name": "文化传媒",
          "n": 77,
          "up": 17,
          "evalN": 77,
          "avgPct": -8.23,
          "leader": {
            "code": "600825",
            "name": "新华传媒",
            "pct": 117.79
          }
        },
        {
          "code": "影视",
          "name": "影视",
          "n": 19,
          "up": 6,
          "evalN": 19,
          "avgPct": -11.38,
          "leader": {
            "code": "300133",
            "name": "华策影视",
            "pct": 23.28
          }
        },
        {
          "code": "游戏",
          "name": "游戏",
          "n": 24,
          "up": 3,
          "evalN": 24,
          "avgPct": -21.64,
          "leader": {
            "code": "300467",
            "name": "迅游科技",
            "pct": 21.23
          }
        }
      ]
    },
    {
      "name": "农业",
      "n": 22,
      "up": 7,
      "evalN": 22,
      "avgPct": -9.92,
      "leader": {
        "code": "000592",
        "name": "平潭发展",
        "pct": 22.04
      },
      "concepts": [
        {
          "code": "农业种植",
          "name": "农业种植",
          "n": 17,
          "up": 6,
          "evalN": 17,
          "avgPct": -8.88,
          "leader": {
            "code": "300313",
            "name": "天山生物",
            "pct": 18.89
          }
        },
        {
          "code": "林业",
          "name": "林业",
          "n": 5,
          "up": 1,
          "evalN": 5,
          "avgPct": -13.44,
          "leader": {
            "code": "000592",
            "name": "平潭发展",
            "pct": 22.04
          }
        }
      ]
    },
    {
      "name": "专业服务",
      "n": 64,
      "up": 11,
      "evalN": 64,
      "avgPct": -18,
      "leader": {
        "code": "301228",
        "name": "实朴检测",
        "pct": 64.83
      },
      "concepts": [
        {
          "code": "检测认证",
          "name": "检测认证",
          "n": 19,
          "up": 4,
          "evalN": 19,
          "avgPct": -10.06,
          "leader": {
            "code": "301228",
            "name": "实朴检测",
            "pct": 64.83
          }
        },
        {
          "code": "工程咨询",
          "name": "工程咨询",
          "n": 45,
          "up": 7,
          "evalN": 45,
          "avgPct": -21.35,
          "leader": {
            "code": "300983",
            "name": "尤安设计",
            "pct": 44.43
          }
        }
      ]
    },
    {
      "name": "软件",
      "n": 174,
      "up": 22,
      "evalN": 174,
      "avgPct": -19.94,
      "leader": {
        "code": "301218",
        "name": "华是科技",
        "pct": 199.08
      },
      "concepts": [
        {
          "code": "网络安全",
          "name": "网络安全",
          "n": 11,
          "up": 3,
          "evalN": 11,
          "avgPct": -12.1,
          "leader": {
            "code": "300369",
            "name": "绿盟科技",
            "pct": 50.32
          }
        },
        {
          "code": "互联网",
          "name": "互联网",
          "n": 19,
          "up": 3,
          "evalN": 19,
          "avgPct": -14.11,
          "leader": {
            "code": "600228",
            "name": "返利科技",
            "pct": 41.13
          }
        },
        {
          "code": "IT服务与外包",
          "name": "IT服务与外包",
          "n": 24,
          "up": 4,
          "evalN": 24,
          "avgPct": -16.82,
          "leader": {
            "code": "301313",
            "name": "凡拓数创",
            "pct": 117.17
          }
        },
        {
          "code": "垂直行业IT",
          "name": "垂直行业IT",
          "n": 29,
          "up": 3,
          "evalN": 29,
          "avgPct": -18.07,
          "leader": {
            "code": "301218",
            "name": "华是科技",
            "pct": 199.08
          }
        },
        {
          "code": "工业软件",
          "name": "工业软件",
          "n": 13,
          "up": 2,
          "evalN": 13,
          "avgPct": -19.98,
          "leader": {
            "code": "300017",
            "name": "网宿科技",
            "pct": 37.83
          }
        },
        {
          "code": "智慧城市",
          "name": "智慧城市",
          "n": 18,
          "up": 2,
          "evalN": 18,
          "avgPct": -21.83,
          "leader": {
            "code": "301248",
            "name": "杰创智能",
            "pct": 83.68
          }
        },
        {
          "code": "物联网",
          "name": "物联网",
          "n": 37,
          "up": 2,
          "evalN": 37,
          "avgPct": -24.54,
          "leader": {
            "code": "002849",
            "name": "威星智能",
            "pct": 4.58
          }
        },
        {
          "code": "大数据",
          "name": "大数据",
          "n": 13,
          "up": 3,
          "evalN": 13,
          "avgPct": -24.78,
          "leader": {
            "code": "300166",
            "name": "东方国信",
            "pct": 6
          }
        },
        {
          "code": "企业管理软件",
          "name": "企业管理软件",
          "n": 10,
          "up": 0,
          "evalN": 10,
          "avgPct": -25.87,
          "leader": {
            "code": "603171",
            "name": "税友股份",
            "pct": -6.88
          }
        }
      ]
    },
    {
      "name": "制造",
      "n": 342,
      "up": 55,
      "evalN": 342,
      "avgPct": -20.63,
      "leader": {
        "code": "301529",
        "name": "福赛科技",
        "pct": 154.9
      },
      "concepts": [
        {
          "code": "汽车内饰",
          "name": "汽车内饰",
          "n": 18,
          "up": 2,
          "evalN": 18,
          "avgPct": -14.46,
          "leader": {
            "code": "301529",
            "name": "福赛科技",
            "pct": 154.9
          }
        },
        {
          "code": "动力电池",
          "name": "动力电池",
          "n": 59,
          "up": 13,
          "evalN": 59,
          "avgPct": -15.42,
          "leader": {
            "code": "301217",
            "name": "铜冠铜箔",
            "pct": 134.42
          }
        },
        {
          "code": "汽车配件",
          "name": "汽车配件",
          "n": 76,
          "up": 13,
          "evalN": 76,
          "avgPct": -17.49,
          "leader": {
            "code": "002931",
            "name": "锋龙股份",
            "pct": 135.92
          }
        },
        {
          "code": "汽车传动",
          "name": "汽车传动",
          "n": 47,
          "up": 9,
          "evalN": 47,
          "avgPct": -20,
          "leader": {
            "code": "000338",
            "name": "潍柴动力",
            "pct": 51.1
          }
        },
        {
          "code": "车身结构",
          "name": "车身结构",
          "n": 38,
          "up": 5,
          "evalN": 38,
          "avgPct": -22.02,
          "leader": {
            "code": "301307",
            "name": "美利信",
            "pct": 28.25
          }
        },
        {
          "code": "汽车整车",
          "name": "汽车整车",
          "n": 21,
          "up": 3,
          "evalN": 21,
          "avgPct": -22.92,
          "leader": {
            "code": "300201",
            "name": "海伦哲",
            "pct": 87.68
          }
        },
        {
          "code": "汽车电子",
          "name": "汽车电子",
          "n": 36,
          "up": 4,
          "evalN": 36,
          "avgPct": -25.83,
          "leader": {
            "code": "002536",
            "name": "飞龙股份",
            "pct": 71.4
          }
        },
        {
          "code": "智能机器人",
          "name": "智能机器人",
          "n": 23,
          "up": 3,
          "evalN": 23,
          "avgPct": -29.01,
          "leader": {
            "code": "603489",
            "name": "八方股份",
            "pct": 14.47
          }
        },
        {
          "code": "电机电控",
          "name": "电机电控",
          "n": 24,
          "up": 3,
          "evalN": 24,
          "avgPct": -29.25,
          "leader": {
            "code": "301310",
            "name": "鑫宏业",
            "pct": 30.26
          }
        }
      ]
    },
    {
      "name": "光伏",
      "n": 52,
      "up": 10,
      "evalN": 52,
      "avgPct": -17.45,
      "leader": {
        "code": "603778",
        "name": "国晟科技",
        "pct": 58.39
      },
      "concepts": [
        {
          "code": "光伏制造",
          "name": "光伏制造",
          "n": 23,
          "up": 5,
          "evalN": 23,
          "avgPct": -14.54,
          "leader": {
            "code": "603778",
            "name": "国晟科技",
            "pct": 58.39
          }
        },
        {
          "code": "光伏设备",
          "name": "光伏设备",
          "n": 12,
          "up": 3,
          "evalN": 12,
          "avgPct": -17.71,
          "leader": {
            "code": "300776",
            "name": "帝尔激光",
            "pct": 25.03
          }
        },
        {
          "code": "光伏材料",
          "name": "光伏材料",
          "n": 17,
          "up": 2,
          "evalN": 17,
          "avgPct": -21.2,
          "leader": {
            "code": "300700",
            "name": "岱勒新材",
            "pct": 22.46
          }
        }
      ]
    },
    {
      "name": "国产替代",
      "n": 47,
      "up": 6,
      "evalN": 47,
      "avgPct": -18.21,
      "leader": {
        "code": "002792",
        "name": "通宇通讯",
        "pct": 51.15
      },
      "concepts": [
        {
          "code": "5G概念",
          "name": "5G概念",
          "n": 40,
          "up": 6,
          "evalN": 40,
          "avgPct": -15.66,
          "leader": {
            "code": "002792",
            "name": "通宇通讯",
            "pct": 51.15
          }
        },
        {
          "code": "华为概念",
          "name": "华为概念",
          "n": 7,
          "up": 0,
          "evalN": 7,
          "avgPct": -32.75,
          "leader": {
            "code": "301128",
            "name": "强瑞技术",
            "pct": -14.25
          }
        }
      ]
    },
    {
      "name": "生活服务",
      "n": 16,
      "up": 5,
      "evalN": 16,
      "avgPct": -17.48,
      "leader": {
        "code": "605098",
        "name": "行动教育",
        "pct": 28.18
      },
      "concepts": [
        {
          "code": "教育",
          "name": "教育",
          "n": 16,
          "up": 5,
          "evalN": 16,
          "avgPct": -17.48,
          "leader": {
            "code": "605098",
            "name": "行动教育",
            "pct": 28.18
          }
        }
      ]
    },
    {
      "name": "旅游酒店餐饮",
      "n": 31,
      "up": 2,
      "evalN": 31,
      "avgPct": -24.58,
      "leader": {
        "code": "000428",
        "name": "华天酒店",
        "pct": 4.62
      },
      "concepts": [
        {
          "code": "酒店餐饮",
          "name": "酒店餐饮",
          "n": 8,
          "up": 1,
          "evalN": 8,
          "avgPct": -21.31,
          "leader": {
            "code": "000428",
            "name": "华天酒店",
            "pct": 4.62
          }
        },
        {
          "code": "旅游景区",
          "name": "旅游景区",
          "n": 23,
          "up": 1,
          "evalN": 23,
          "avgPct": -25.72,
          "leader": {
            "code": "002627",
            "name": "三峡旅游",
            "pct": 2.2
          }
        }
      ]
    }
  ]
  };

  DAY.periods = { day: DAY, week: WEEK, month: MONTH, year: YEAR };
  return DAY;
});
