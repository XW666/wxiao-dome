Component({
  properties: {
    // touxiang | yitian | weitian | yinhangkaxinxi | morenyiji | morenerji | tubiao04 | 79 | leasingcloud_xinzizuchengguanli | shengban | jiagou | tiaogangtiaoxin | jinshenglixiang | geshuijisuan | drxx21 | tijianbaogao | rencaipeixun | fujian1 | fujianguanli | hetong | bianji | A | qita | qita1 | gerenzhongxin-on | shezhi | peizhi | xieyi1 | xieyi | laodonghetong | yanjingguanbi-01 | yanjing-01 | mizifuhao_huaban | qian | youxiang | shouji | yonghuming | mima | huanyingye-quxiantu | huanyingye-xiaolian | huanyingye-zhuzhuangtu | huanyingye-xiaoxi | huanyingye-wenjian | huanyingye-wenjianjia | jiahao | biji | zizhuruzhi-mingwen | zizhuruzhi-miwen | logo-lan | logo-hui | logo-bai | jingshi | cuowu-copy | rili | icon-test | xiazai | xiangzuo | you | gongzuojingli | peixunjingli | zhichengxinxi | yuyan | fujian | jinengzhuanchang | jiaoyujingli | jibenxinxi | shehuijingli | xianshi | yincang | yincang1 | daochu-01 | sousuo-01 | fangda-01 | chakanliebiao-mian | liwu
    name: {
      type: String,
    },
    // string | string[]
    color: {
      type: null,
      observer: function(color) {
        this.setData({
          colors: this.fixColor(),
          isStr: typeof color === 'string',
        });
      }
    },
    size: {
      type: Number,
      value: 18,
      observer: function(size) {
        this.setData({
          svgSize: size,
        });
      },
    },
  },
  data: {
    colors: '',
    svgSize: 18,
    quot: '"',
    isStr: true,
  },
  methods: {
    fixColor: function() {
      var color = this.data.color;
      var hex2rgb = this.hex2rgb;

      if (typeof color === 'string') {
        return color.indexOf('#') === 0 ? hex2rgb(color) : color;
      }

      return color.map(function (item) {
        return item.indexOf('#') === 0 ? hex2rgb(item) : item;
      });
    },
    hex2rgb: function(hex) {
      var rgb = [];

      hex = hex.substr(1);

      if (hex.length === 3) {
        hex = hex.replace(/(.)/g, '$1$1');
      }

      hex.replace(/../g, function(color) {
        rgb.push(parseInt(color, 0x10));
        return color;
      });

      return 'rgb(' + rgb.join(',') + ')';
    }
  }
});
