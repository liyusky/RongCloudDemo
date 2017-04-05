/*
 * APICloud JavaScript Library
 * Copyright (c) 2014 apicloud.com
 */

(function(window) {
	var u = {};
	var isAndroid = (/android/gi).test(navigator.appVersion);
	var uzStorage = function() {
		var ls = window.localStorage;
		if (isAndroid) {
			ls = os.localStorage();
		}
		return ls;
	};
	function parseArguments(url, data, fnSuc, dataType) {
		if ( typeof (data) == 'function') {
			dataType = fnSuc;
			fnSuc = data;
			data = undefined;
		}
		if ( typeof (fnSuc) != 'function') {
			dataType = fnSuc;
			fnSuc = undefined;
		}
		return {
			url : url,
			data : data,
			fnSuc : fnSuc,
			dataType : dataType
		};
	}


	u.trim = function(str) {
		if (String.prototype.trim) {
			return str == null ? "" : String.prototype.trim.call(str);
		} else {
			return str.replace(/(^\s*)|(\s*$)/g, "");
		}
	};
	u.trimAll = function(str) {
		return str.replace(/\s*/g, '');
	};
	u.isElement = function(obj) {
		return !!(obj && obj.nodeType == 1);
	};
	u.isArray = function(obj) {
		if (Array.isArray) {
			return Array.isArray(obj);
		} else {
			return obj instanceof Array;
		}
	};
	u.isEmptyObject = function(obj) {
		if (JSON.stringify(obj) === '{}') {
			return true;
		}
		return false;
	};
	u.addEvt = function(el, name, fn, useCapture) {
		if (!u.isElement(el)) {
			console.warn('$api.addEvt Function need el param, el param must be DOM Element');
			return;
		}
		useCapture = useCapture || false;
		if (el.addEventListener) {
			el.addEventListener(name, fn, useCapture);
		}
	};
	u.rmEvt = function(el, name, fn, useCapture) {
		if (!u.isElement(el)) {
			console.warn('$api.rmEvt Function need el param, el param must be DOM Element');
			return;
		}
		useCapture = useCapture || false;
		if (el.removeEventListener) {
			el.removeEventListener(name, fn, useCapture);
		}
	};
	u.one = function(el, name, fn, useCapture) {
		if (!u.isElement(el)) {
			console.warn('$api.one Function need el param, el param must be DOM Element');
			return;
		}
		useCapture = useCapture || false;
		var that = this;
		var cb = function() {
			fn && fn();
			that.rmEvt(el, name, cb, useCapture);
		};
		that.addEvt(el, name, cb, useCapture);
	};
	u.dom = function(el, selector) {
		if (arguments.length === 1 && typeof arguments[0] == 'string') {
			if (document.querySelector) {
				return document.querySelector(arguments[0]);
			}
		} else if (arguments.length === 2) {
			if (el.querySelector) {
				return el.querySelector(selector);
			}
		}
	};
	u.domAll = function(el, selector) {
		if (arguments.length === 1 && typeof arguments[0] == 'string') {
			if (document.querySelectorAll) {
				return document.querySelectorAll(arguments[0]);
			}
		} else if (arguments.length === 2) {
			if (el.querySelectorAll) {
				return el.querySelectorAll(selector);
			}
		}
	};
	u.byId = function(id) {
		return document.getElementById(id);
	};
	u.first = function(el, selector) {
		if (arguments.length === 1) {
			if (!u.isElement(el)) {
				console.warn('$api.first Function need el param, el param must be DOM Element');
				return;
			}
			return el.children[0];
		}
		if (arguments.length === 2) {
			return this.dom(el, selector + ':first-child');
		}
	};
	u.last = function(el, selector) {
		if (arguments.length === 1) {
			if (!u.isElement(el)) {
				console.warn('$api.last Function need el param, el param must be DOM Element');
				return;
			}
			var children = el.children;
			return children[children.length - 1];
		}
		if (arguments.length === 2) {
			return this.dom(el, selector + ':last-child');
		}
	};
	u.eq = function(el, index) {
		return this.dom(el, ':nth-child(' + index + ')');
	};
	u.not = function(el, selector) {
		return this.domAll(el, ':not(' + selector + ')');
	};
	u.prev = function(el) {
		if (!u.isElement(el)) {
			console.warn('$api.prev Function need el param, el param must be DOM Element');
			return;
		}
		var node = el.previousSibling;
		if (node.nodeType && node.nodeType === 3) {
			node = node.previousSibling;
			return node;
		}
	};
	u.next = function(el) {
		if (!u.isElement(el)) {
			console.warn('$api.next Function need el param, el param must be DOM Element');
			return;
		}
		var node = el.nextSibling;
		if (node.nodeType && node.nodeType === 3) {
			node = node.nextSibling;
			return node;
		}
	};
	u.closest = function(el, selector) {
		if (!u.isElement(el)) {
			console.warn('$api.closest Function need el param, el param must be DOM Element');
			return;
		}
		var doms, targetDom;
		var isSame = function(doms, el) {
			var i = 0, len = doms.length;
			for (i; i < len; i++) {
				if (doms[i].isEqualNode(el)) {
					return doms[i];
				}
			}
			return false;
		};
		var traversal = function(el, selector) {
			doms = u.domAll(el.parentNode, selector);
			targetDom = isSame(doms, el);
			while (!targetDom) {
				el = el.parentNode;
				if (el != null && el.nodeType == el.DOCUMENT_NODE) {
					return false;
				}
				traversal(el, selector);
			}

			return targetDom;
		};

		return traversal(el, selector);
	};
	u.contains = function(parent, el) {
		var mark = false;
		if (el === parent) {
			mark = true;
			return mark;
		} else {
			do {
				el = el.parentNode;
				if (el === parent) {
					mark = true;
					return mark;
				}
			} while(el === document.body || el === document.documentElement);

			return mark;
		}

	};
	u.remove = function(el) {
		if (el && el.parentNode) {
			el.parentNode.removeChild(el);
		}
	};
	u.attr = function(el, name, value) {
		if (!u.isElement(el)) {
			console.warn('$api.attr Function need el param, el param must be DOM Element');
			return;
		}
		if (arguments.length == 2) {
			return el.getAttribute(name);
		} else if (arguments.length == 3) {
			el.setAttribute(name, value);
			return el;
		}
	};
	u.removeAttr = function(el, name) {
		if (!u.isElement(el)) {
			console.warn('$api.removeAttr Function need el param, el param must be DOM Element');
			return;
		}
		if (arguments.length === 2) {
			el.removeAttribute(name);
		}
	};
	u.hasCls = function(el, cls) {
		if (!u.isElement(el)) {
			console.warn('$api.hasCls Function need el param, el param must be DOM Element');
			return;
		}
		if (el.className.indexOf(cls) > -1) {
			return true;
		} else {
			return false;
		}
	};
	u.addCls = function(el, cls) {
		if (!u.isElement(el)) {
			console.warn('$api.addCls Function need el param, el param must be DOM Element');
			return;
		}
		if ('classList' in el) {
			el.classList.add(cls);
		} else {
			var preCls = el.className;
			var newCls = preCls + ' ' + cls;
			el.className = newCls;
		}
		return el;
	};
	u.removeCls = function(el, cls) {
		if (!u.isElement(el)) {
			console.warn('$api.removeCls Function need el param, el param must be DOM Element');
			return;
		}
		if ('classList' in el) {
			el.classList.remove(cls);
		} else {
			var preCls = el.className;
			var newCls = preCls.replace(cls, '');
			el.className = newCls;
		}
		return el;
	};
	u.toggleCls = function(el, cls) {
		if (!u.isElement(el)) {
			console.warn('$api.toggleCls Function need el param, el param must be DOM Element');
			return;
		}
		if ('classList' in el) {
			el.classList.toggle(cls);
		} else {
			if (u.hasCls(el, cls)) {
				u.removeCls(el, cls);
			} else {
				u.addCls(el, cls);
			}
		}
		return el;
	};
	u.val = function(el, val) {
		if (!u.isElement(el)) {
			console.warn('$api.val Function need el param, el param must be DOM Element');
			return;
		}
		if (arguments.length === 1) {
			switch(el.tagName) {
				case 'SELECT':
					var value = el.options[el.selectedIndex].value;
					return value;
					break;
				case 'INPUT':
					return el.value;
					break;
				case 'TEXTAREA':
					return el.value;
					break;
			}
		}
		if (arguments.length === 2) {
			switch(el.tagName) {
				case 'SELECT':
					el.options[el.selectedIndex].value = val;
					return el;
					break;
				case 'INPUT':
					el.value = val;
					return el;
					break;
				case 'TEXTAREA':
					el.value = val;
					return el;
					break;
			}
		}

	};
	u.prepend = function(el, html) {
		if (!u.isElement(el)) {
			console.warn('$api.prepend Function need el param, el param must be DOM Element');
			return;
		}
		el.insertAdjacentHTML('afterbegin', html);
		return el;
	};
	u.append = function(el, html) {
		if (!u.isElement(el)) {
			console.warn('$api.append Function need el param, el param must be DOM Element');
			return;
		}
		el.insertAdjacentHTML('beforeend', html);
		return el;
	};
	u.before = function(el, html) {
		if (!u.isElement(el)) {
			console.warn('$api.before Function need el param, el param must be DOM Element');
			return;
		}
		el.insertAdjacentHTML('beforebegin', html);
		return el;
	};
	u.after = function(el, html) {
		if (!u.isElement(el)) {
			console.warn('$api.after Function need el param, el param must be DOM Element');
			return;
		}
		el.insertAdjacentHTML('afterend', html);
		return el;
	};
	u.html = function(el, html) {
		if (!u.isElement(el)) {
			console.warn('$api.html Function need el param, el param must be DOM Element');
			return;
		}
		if (arguments.length === 1) {
			return el.innerHTML;
		} else if (arguments.length === 2) {
			el.innerHTML = html;
			return el;
		}
	};
	u.text = function(el, txt) {
		if (!u.isElement(el)) {
			console.warn('$api.text Function need el param, el param must be DOM Element');
			return;
		}
		if (arguments.length === 1) {
			return el.textContent;
		} else if (arguments.length === 2) {
			el.textContent = txt;
			return el;
		}
	};
	u.offset = function(el) {
		if (!u.isElement(el)) {
			console.warn('$api.offset Function need el param, el param must be DOM Element');
			return;
		}
		var sl = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
		var st = Math.max(document.documentElement.scrollTop, document.body.scrollTop);

		var rect = el.getBoundingClientRect();
		return {
			l : rect.left + sl,
			t : rect.top + st,
			w : el.offsetWidth,
			h : el.offsetHeight
		};
	};
	u.css = function(el, css) {
		if (!u.isElement(el)) {
			console.warn('$api.css Function need el param, el param must be DOM Element');
			return;
		}
		if ( typeof css == 'string' && css.indexOf(':') > 0) {
			el.style && (el.style.cssText += ';' + css);
		}
	};
	u.cssVal = function(el, prop) {
		if (!u.isElement(el)) {
			console.warn('$api.cssVal Function need el param, el param must be DOM Element');
			return;
		}
		if (arguments.length === 2) {
			var computedStyle = window.getComputedStyle(el, null);
			return computedStyle.getPropertyValue(prop);
		}
	};
	u.jsonToStr = function(json) {
		if ( typeof json === 'object') {
			return JSON && JSON.stringify(json);
		}
	};
	u.strToJson = function(str) {
		if ( typeof str === 'string') {
			return JSON && JSON.parse(str);
		}
	};
	u.setStorage = function(key, value) {
		if (arguments.length === 2) {
			var v = value;
			if ( typeof v == 'object') {
				v = JSON.stringify(v);
				v = 'obj-' + v;
			} else {
				v = 'str-' + v;
			}
			var ls = uzStorage();
			if (ls) {
				ls.setItem(key, v);
			}
		}
	};
	u.getStorage = function(key) {
		var ls = uzStorage();
		if (ls) {
			var v = ls.getItem(key);
			if (!v) {
				return;
			}
			if (v.indexOf('obj-') === 0) {
				v = v.slice(4);
				return JSON.parse(v);
			} else if (v.indexOf('str-') === 0) {
				return v.slice(4);
			}
		}
	};
	u.rmStorage = function(key) {
		var ls = uzStorage();
		if (ls && key) {
			ls.removeItem(key);
		}
	};
	u.clearStorage = function() {
		var ls = uzStorage();
		if (ls) {
			ls.clear();
		}
	};

	/*by king*/
	u.fixIos7Bar = function(el) {
		if (!u.isElement(el)) {
			console.warn('$api.fixIos7Bar Function need el param, el param must be DOM Element');
			return;
		}
		var strDM = api.systemType;
		if (strDM == 'ios') {
			var strSV = api.systemVersion;
			var numSV = parseInt(strSV, 10);
			var fullScreen = api.fullScreen;
			var iOS7StatusBarAppearance = api.iOS7StatusBarAppearance;
			if (numSV >= 7 && !fullScreen && iOS7StatusBarAppearance) {
				el.style.paddingTop = '20px';
			}
		}
	};
	u.fixStatusBar = function(el) {
		if (!u.isElement(el)) {
			console.warn('$api.fixStatusBar Function need el param, el param must be DOM Element');
			return;
		}
		var sysType = api.systemType;
		if (sysType == 'ios') {
			u.fixIos7Bar(el);
		} else if (sysType == 'android') {
			var ver = api.systemVersion;
			ver = parseFloat(ver);
			if (ver >= 4.4) {
				el.style.paddingTop = '25px';
			}
		}
	};
	u.toast = function(title, text, time) {
		var opts = {};
		var show = function(opts, time) {
			api.showProgress(opts);
			setTimeout(function() {
				api.hideProgress();
			}, time);
		};
		if (arguments.length === 1) {
			var time = time || 500;
			if ( typeof title === 'number') {
				time = title;
			} else {
				opts.title = title + '';
			}
			show(opts, time);
		} else if (arguments.length === 2) {
			var time = time || 500;
			var text = text;
			if ( typeof text === "number") {
				var tmp = text;
				time = tmp;
				text = null;
			}
			if (title) {
				opts.title = title;
			}
			if (text) {
				opts.text = text;
			}
			show(opts, time);
		}
		if (title) {
			opts.title = title;
		}
		if (text) {
			opts.text = text;
		}
		time = time || 500;
		show(opts, time);
	};
	u.post = function(/*url,data,fnSuc,dataType*/) {
		var argsToJson = parseArguments.apply(null, arguments);
		var json = {};
		var fnSuc = argsToJson.fnSuc;
		argsToJson.url && (json.url = argsToJson.url);
		argsToJson.data && (json.data = argsToJson.data);
		if (argsToJson.dataType) {
			var type = argsToJson.dataType.toLowerCase();
			if (type == 'text' || type == 'json') {
				json.dataType = type;
			}
		} else {
			json.dataType = 'json';
		}
		json.method = 'post';
		api.ajax(json, function(ret, err) {
			if (ret) {
				fnSuc && fnSuc(ret);
			}
		});
	};
	u.get = function(/*url,fnSuc,dataType*/) {
		var argsToJson = parseArguments.apply(null, arguments);
		var json = {};
		var fnSuc = argsToJson.fnSuc;
		argsToJson.url && (json.url = argsToJson.url);
		//argsToJson.data && (json.data = argsToJson.data);
		if (argsToJson.dataType) {
			var type = argsToJson.dataType.toLowerCase();
			if (type == 'text' || type == 'json') {
				json.dataType = type;
			}
		} else {
			json.dataType = 'text';
		}
		json.method = 'get';
		api.ajax(json, function(ret, err) {
			if (ret) {
				fnSuc && fnSuc(ret);
			}
		});
	};

	/*end*/

	window.$api = u;

})(window);

/***************************************************************常用变量声明*********************************************************/
//接口远程地址
var serviceUrl = "http://114.55.130.115:90/JDBService.svc/";
//图片上传远程接口地址
var uploadUrl = "http://114.55.130.115:8090/UploadAppPicture.ashx";
//代付接口远程路径
var DFUrl = "http://114.55.130.115:8099/Ylzf/collect/";
//验证接口
var VerfiyUrl = "http://114.55.130.115:8099/Ylzf/verify/verify.c";
//代收接口
var DSUrl="http://114.55.130.115:8033/OrderH5.aspx";
//var DFUrl = "http://192.168.11.138:8080/Yzf/collect/";
//软件版本号(发布新版本的时候应该替换掉，否则跟服务器版本一直比较会不合适)
var versionNo=6; 

//错误信息定义
var ErrorMsg={
   SystemError:"系统错误，请重试或者联系客服"
}

//APP中使用到的请求路径
var postUrl = {
	SendTemplateSMS : serviceUrl + "SendTemplateSMS", //发送验证码
	UserLogin : serviceUrl + "UserLogin", //用户登录
	UserRegister : serviceUrl + "UserRegister", //用户注册
	SetTJR : serviceUrl + "SetTJR", //设置推荐人
	GetHYYHK : serviceUrl + "GetHYYHK", //会员的银行卡列表
	DeleteHYYHK : serviceUrl + "DeleteHYYHK", //删除会员的银行卡列表
	GetHYJKJL : serviceUrl + "GetHYJKJL", //获取会员的借款记录
	GetGuangGaoList : serviceUrl + "GetGuangGaoList", //获取广告列表
	GetHYXX : serviceUrl + "GetHYXX",
	AddYHK : serviceUrl + "AddYHK", //新增银行卡
	FindPass : serviceUrl + "FindPass", //找回密码
	ShenFenXinXi : serviceUrl + "ShenFenXinXi", //身份信息提交
	GongZuoXinXi : serviceUrl + "GongZuoXinXi", //工作信息提交
	LianXiRenXinXi : serviceUrl + "LianXiRenXinXi", //联系人信息提交
	ZhengXinXinXi : serviceUrl + "ZhengXinXinXi", //工作信息提交
	XinYong_XYK : serviceUrl + "XinYong_XYK", //信用卡信息设置
	ShanDianDai : serviceUrl + "ShanDianDai", //闪电贷ShanDianDai_XJHZ
	GetHYED : serviceUrl + "GetHYED", //获取会员额度
	DanPinDaiKuan : serviceUrl + "DanPinDaiKuan", //单品贷款
	ShiFouKeYiDaiKuan : serviceUrl + "ShiFouKeYiDaiKuan", //判断是否可以贷款ShiFouKeYiDaiKuan_XJHZ
	YunYingShang_STEP1 : serviceUrl + "YunYingShang_STEP1", //运营商请求第一步
	YunYingShang_STEP2 : serviceUrl + "YunYingShang_STEP2", //运营商请求第二步
	YunYingShang_STEP3 : serviceUrl + "YunYingShang_STEP3", //运营商请求第三步
	JingDong_STEP1 : serviceUrl + "JingDong_STEP1", //京东请求第一步
	JingDong_STEP2 : serviceUrl + "JingDong_STEP2", //京东请求第二步
	JingDong_STEP3 : serviceUrl + "JingDong_STEP3", //京东请求第三步
	TaoBao_STEP1 : serviceUrl + "TaoBao_STEP1", //淘宝请求第一步
	TaoBao_STEP2 : serviceUrl + "TaoBao_STEP2", //淘宝请求第二步
	YinHangKa_STEP1 : serviceUrl + "YinHangKa_STEP1", //银行卡验证第一步
	AddToken : serviceUrl + "AddToken", //保存TOKEN
	GetZXJD : serviceUrl + "GetZXJD", //获取会员最新贷款进度
	GetHYTZ : serviceUrl + "GetHYTZ", //获取会员通知
	GetYHEDLL : serviceUrl + "GetYHEDLL", //获取用户对应贷款产品的可贷款额度及利率
	GetZLWZD : serviceUrl + "GetZLWZD", //获取资料完整度
	FKYJ : serviceUrl + "FKYJ", //反馈意见
	GetWZDZT : serviceUrl + "GetWZDZT", //获取完整度及五步状态GetWZDZT_XJHZ
	GetWHDK : serviceUrl + "GetWHDK", //会员未还贷款记录
	GetFWPZ : serviceUrl + "GetFWPZ", //获取服务配置
	GetTZXX : serviceUrl + "GetTZXX", //获取通知信息
	GetZiDian : serviceUrl + "GetZiDian", //获取字典值
	TGED : serviceUrl + "TGED" ,//提高额度
	ZMFSQ: serviceUrl + "ZMFSQ", //芝麻授权
	SJHRZ: serviceUrl + "YunYingShang_VIFY_H5", //手机授权认证
	UpdateJKZT: serviceUrl + "UpdateJKZT", //更新还款状态
	DF_YZM:DFUrl+"sendMsg.c",  //代付验证码
	DF_FK:DFUrl+"gather.c",  //代付验证码
	DF_CX:DFUrl+"queryGather.c", //代付查询
	DF_RZ:DFUrl+"verify.c", //代付查询
	DF_RZCX:DFUrl+"queryVerify.c", //代付查询
	GeRenXinXi:serviceUrl+"GeRenXinXi", //个人信息
}
//下拉框的样式
var dropdownStyle = {
	bg : '#fff', //（可选项）字符串类型；主体的背景，支持 rgb，rgba，#，widget://，fs://；默认：#fff
	mask : 'rgba(0,0,0,0.3)', //（可选项）字符串类型；遮罩层的背景，支持 rgb、rgba、#、img；默认：rgba(0,0,0,0)
	title : {//（可选项）JSON 类型；标题栏样式；默认：见内部字段
		bg : '#ddd', //（可选项）字符串类型；标题栏的背景，支持 rgb、rgba、#、img；默认：#ddd
		color : '#444', //（可选项）字符串类型；标题字体颜色，支持 rgb、gba、#；默认：#444
		size : 16, //（可选项）数字类型；标题字体大小；默认：16
		h : 44 //（可选项）数字类型；标题栏的高度；默认：44
	},
	leftButton : {//（可选项）JSON 类型；左上角按钮样式；默认：见内部字段
		bg : '#fff', //（可选项）字符串类型；按钮的背景，支持 rgb、rgba、#、img；默认：#f00
		w : 80, //（可选项）数字类型；按钮的宽度；默认：80
		h : 35, //（可选项）数字类型；按钮的高度；默认：35
		marginT : 5, //（可选项）数字类型；按钮的上边距；默认：5
		marginL : 8, //（可选项）数字类型；按钮的左边距；默认：8
		color : '#444', //（可选项）字符串类型；按钮的文字颜色，支持 rgb、rgba、#；默认：#fff
		size : 14 //（可选项）数字类型；按钮的文字大小；默认：14
	},
	rightButton : {//（可选项）JSON 类型；右上角按钮样式；默认：见内部字段
		bg : '#fff', //（可选项）字符串类型；按钮的背景，支持 rgb、rgba、#、img；默认：#0f0
		w : 80, //（可选项）数字类型；按钮的宽度；默认：80
		h : 35, //（可选项）数字类型；按钮的高度；默认：35
		marginT : 5, //（可选项）数字类型；按钮的上边距；默认：5
		marginR : 8, //（可选项）数字类型；按钮的右边距；默认：8
		color : '#444', //（可选项）字符串类型；按钮的文字颜色，支持 rgb、rgba、#；默认：#fff
		size : 14 //（可选项）数字类型；按钮的文字大小；默认：14
	},
	item : {//（可选项）JSON 类型；每个选项的样式；默认：见内部字段
		h : 44, //（可选项）数字类型；按钮的高度；默认：35
		bg : '#fff', //（可选项）字符串类型；选项的背景，支持 rgb、rgba、#、img；默认：#fff
		bgActive : '#FFD39B', //（可选项）字符串类型；已选中选项的背景，支持 rgb、rgba、#、img；默认：bg
		bgHighlight : '#FFD39B', //（可选项）字符串类型；选项的高亮背景，支持 rgb、rgba、#、img；默认：bg
		color : '#444', //（可选项）字符串类型；选项的文字颜色，支持 rgb，rgba，#；默认：#444
		active : '#fff', //（可选项）字符串类型；已选中选项的文字颜色，支持 rgb、rgba、#；默认：color
		highlight : '#fff', //（可选项）字符串类型；选项的高亮文字颜色，支持 rgb、rgba、#；默认：color
		size : 14, //（可选项）数字类型；选项的文字大小；默认：14
		lineColor : '#ccc', //（可选项）字符串类型；分隔线的颜色，支持 rgb、rgba、#；默认：rgba(0,0,0,0)
		textAlign : 'left' //（可选项）字符串类型；选项文字的对齐方式，'left|center|right'，当值为 left 或 right 时文字会根据情况空留 icon 已占的位置；默认：left
	}
};
/****************************************其他共通使用函数*****************************************/

/**
 * 控制按钮短时间内禁用
 * @param {Object} second 倒计时秒数
 * @param {Object} dom    元素
 * @param {Object} formalText 倒计时结束后显示文字
 * @param {Object} clickFunc  倒计时结束重新引用的按钮事件函数
 */
function countDown(second, dom, formalText, clickFunc) {
	// 如果秒数还是大于0，则表示倒计时还没结束
	if (second > 0) {
		$api.text(dom, second + '秒后重试');
		// 按钮里的内容呈现倒计时状态，移除按钮事件
		$api.removeAttr(dom, "onclick");
		$api.css(dom, "background:#c3c3c3");
		// 时间减一
		second--;
		// 一秒后重复执行
		setTimeout(function() {
			countDown(second, dom, formalText, clickFunc);
		}, 1000);
	} else {
		// 按钮里的内容恢复初始状态文字
		$api.text(dom, formalText);
		// 按钮置未可点击状态样式及绑定按钮事件
		$api.css(dom, "background:#de424f");
		$api.attr(dom, "onclick", clickFunc);
	}
}

/**
 * 检测用户是否已经登录
 */
function CheckLogin() {
	var user = $api.getStorage("user");
	//如果未登录，则重新登录
	if (user == "" || user == null || user == undefined || typeof user == "undefined") {
		return false;
	}
	return true;
}

/**
 * 弹出消息
 * @param {Object} msg 消息内容
 */
function AlertMsg(msg) {
	api.toast({
		msg : msg,
		duration : 2000,
		location : 'middle'
	});
}

/**
 * 打开窗体
 * @param {Object} 窗体名称
 */
function openW(name) {

	api.openWin({
		name : name,
		url : './' + name + '.html',
		vScrollBarEnabled:false,
		hScrollBarEnabled:false
	});
}

/**
 * 打开Frame
 */
function OpenF(name) {
	api.openFrame({
		name : name,
		url : './' + name + '.html',
		rect : {
			x : 0,
			y : 0,
			w : 'auto'

		},
		bounces : false,
		vScrollBarEnabled:false,
		hScrollBarEnabled:false,
		delay : 200,
		animation : {
			type : "movein", //动画类型（详见动画类型常量）
			subType : "from_left", //动画子类型（详见动画子类型常量）
			duration : 300
		}
	});
}

function RedirctIndex() {
	api.openWin({
		name : 'templat',
		url : '../templat.html',
		vScrollBarEnabled:false,
		hScrollBarEnabled:false,
		slidBackEnabled : false
		
	});
}

/**
 * 检查长度
 * @param {Object} 指定字符串
 * @param {Object} 最小长度
 * @param {Object} 最大长度
 */
function checkLength(str, min, max) {
	min = min || 6;
	max = max || 20;
	var pat = new RegExp("^.{" + min + "," + max + "}$", "i");

	if (!pat.test(str)) {
		return "长度为" + min + "~" + max + "位字符";
	}
	return '';
}

/**
 * 检查手机格式是否合法
 * @param {Object} str 手机号码字符串
 */
function checkMobile(str) {
	var pat = new RegExp("^(?:13|14|15|17|18)[0-9]{9}$", "i");
	if (!pat.test(str)) {
		return '手机号格式错误';
	}
	return '';
}

/**
 * 弹出等待框
 * @param {Object} msg 等待消息
 */
function showLoading(msg) {
	api.showProgress({
		title : msg,
		modal : true
	});
}

/**
 * 关闭等待框
 */
function hideLoading() {
	api.hideProgress();
}

function AlertBox(msg)
{
  api.alert({
    title: '提示信息',
    msg: msg,
	}, function(ret, err) {
	
	});
}


