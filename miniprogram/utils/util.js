const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
const add0=(m)=>{return m<10?'0'+m:m }
const formatTimeStamp = shijianchuo => {
  //shijianchuo是整数，否则要parseInt转换
  var time = new Date(shijianchuo);
  var y = time.getFullYear();
  var m = time.getMonth()+1;
  var d = time.getDate();
  var h = time.getHours();
  var mm = time.getMinutes();
  var s = time.getSeconds();
  return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
}
const getNewDate = data => {
	const date = new Date(data)
	const year = date.getFullYear()
	const month = date.getMonth()
	const day = date.getDate()
	return { year, month, day }
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
/**
 * 省份证/银行卡 密文显示
 */
const setIdCard =(idNumber)=> {
	var getCard = String(idNumber)
		.replace(/\s/g, '')
		.replace(/^(\w{2})\d+(\w{2})$/, '$1 ****** $2')
	return getCard
}
const token = function () {//token封装
  if (wx.getStorageSync('_USERINFO')) {
    return wx.getStorageSync('_USERINFO').accessToken
  } else {
    return '';
  }
}
const request = (url, options) => { //请求封装
  return new Promise((resolve, reject) => {
    // if (token()) {
    //   var header = {
    //     'Authorization': 'Bearer ' + token(),
    //   }
    // } else {
      var header = {
        'Content-Type': 'application/json'
      }
    // }
   
    wx.request({
      url:url.url,
      method: options.method,
      data: url.data,
      header: header,
      success(request) {
        console.log('request',request)
        resolve(request)
      },
      fail(error) {
        reject(error)
      }
    })
  })
}
const gets = (url, options) => {//get请求
  return request(url, {
    method: 'GET'
  })
}
const post = (url, options, token) => {//post请求
  return request(url, {
    method: 'POST'
  })
}
const numFormat = (amount, place) => {
	// 千分位加逗号
	const places = place || 2
	let defaultAmount = ''
	const setAmount = amount

	if (setAmount !== null && setAmount !== '' && setAmount !== undefined && setAmount !== '--') {
		defaultAmount = Number(setAmount)
			.toFixed(places)
			.replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
		return defaultAmount
	} else {
		return defaultAmount
	}
}
/**
   * 证件号码
   */
  const setIdCardText = (value) => {
    /* 身份证 */
    const idCard = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
    console.log('idCard', idCard.test(value))
    if (idCard.test(value)) {
      return true
    }
    return false
  }
// 手势密码的标识，1 需要 0 不需要
// const handPwdFlag = (flag) => {
//   var flag = flag || 0
//   wx.setStorageSync('handPwdFlag',flag)
// }
module.exports = {
  formatTime: formatTime,
  formatTimeStamp,
  request,
  gets,
  post,
  getNewDate,
  setIdCard,
  numFormat,
  setIdCardText
}
