// ======== 时间相关过滤器 ========
// 所有时间戳单位精确到毫秒

import Vue from "vue";
import moment from "moment";

moment.locale("zh-cn");

/**
 * 日期过滤
 */
Vue.filter("date", (value, format = "YYYY-MM-DD HH:mm") =>
  moment(value).format(format)
);

/**
 * 时间段过滤器
 */
Vue.filter("duration", timestamp => {
  const duration = moment.duration(timestamp);
  const days = duration.days();
  const hours = duration.hours();
  const minutes = duration.minutes();
  const seconds = duration.seconds();
  const asDays = Math.floor(duration.asDays());
  // const asHours = Math.floor(duration.asHours())
  // const asMinutes = Math.floor(duration.asMinutes())
  const format = (val, length = 2) => {
    var prefix = new Array(length + 1).join(0);
    return (prefix + val).substr(val.toString().length);
  };

  // let result = 'hh:mm:ss'
  // let option = {
  //   'D+': days,
  //   'h+': hours,
  //   'm+': minutes,
  //   's+': seconds
  // }
  //
  // // 如果超过一天则显示天
  // if (asDays > 0) {
  //   result = 'D天 hh:mm:ss'
  //   option['D+'] = asDays
  // }

  let result = "D天 hh:mm:ss";
  let option = {
    "D+": asDays,
    "h+": hours,
    "m+": minutes,
    "s+": seconds
  };

  for (let key of Object.keys(option)) {
    const value = option[key];
    if (new RegExp("(" + key + ")").test(result)) {
      result = result.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? value : format(value, RegExp.$1.length)
      );
    }
  }

  return result;
});
// 返回文件的类型封面 value 是文件的后缀
Vue.filter("fileCover", value => {
  if (!value) {
    return "";
  }
  if (value === "doc" || value === "docx") {
    return "https://xplus-uploads-test.oss-cn-shenzhen.aliyuncs.com/default/word.png";
  } else if (value === "xls" || value === "xlsx") {
    return "https://xplus-uploads-test.oss-cn-shenzhen.aliyuncs.com/default/xls.png";
  } else if (value === "ppt" || value === "pptx") {
    return "https://xplus-uploads-test.oss-cn-shenzhen.aliyuncs.com/default/ppt.png";
  } else if (value === "pdf") {
    return "https://xplus-uploads-test.oss-cn-shenzhen.aliyuncs.com/default/pdf.png";
  } else {
    return "https://xplus-uploads-test.oss-cn-shenzhen.aliyuncs.com/default/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20181107163327.png";
  }
});
