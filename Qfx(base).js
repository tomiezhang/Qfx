(function(win,doc){
		var Easing = {
			// 匀速运动
			linear : function(t){
				return t;
			},

			easeIn : function (t) {
				return t * t;
			},

			easeOut : function (t) {
				return ( 2 - t) * t;
			},

			easeBoth : function (t) {
				return (t *= 2) < 1 ?
					.5 * t * t :
					.5 * (1 - (--t) * (t - 2));
			},

			easeInStrong : function (t) {
				return t * t * t * t;
			},

			easeOutStrong : function (t) {
				return 1 - (--t) * t * t * t;
			},

			easeBothStrong: function (t) {
				return (t *= 2) < 1 ?
					.5 * t * t * t * t :
					.5 * (2 - (t -= 2) * t * t * t);
			},
			
			easeOutQuart : function(t){
			  return -(pow((t-1), 4) -1)
			},
			
			easeInOutExpo: function(t){
			  if(t===0) return 0;
			  if(t===1) return 1;
			  if((t/=0.5) < 1) return 0.5 * pow(2,10 * (t-1));
			  return 0.5 * (-pow(2, -10 * --t) + 2);
			},
			
			easeOutExpo: function(t){
			  return (t===1) ? 1 : -pow(2, -10 * t) + 1;
			},
			
			swingFrom: function(t) {
			  return t*t*((BACK_CONST+1)*t - BACK_CONST);
			},
			
			swingTo: function(t) {
			  return (t-=1)*t*((BACK_CONST+1)*t + BACK_CONST) + 1;
			},

			backIn : function (t) {
				if (t === 1) t -= .001;
				return t * t * ((BACK_CONST + 1) * t - BACK_CONST);
			},

			backOut : function (t) {
				return (t -= 1) * t * ((BACK_CONST + 1) * t + BACK_CONST) + 1;
			},

			bounce : function (t) {
				var s = 7.5625, r;

				if (t < (1 / 2.75)) {
					r = s * t * t;
				}
				else if (t < (2 / 2.75)) {
					r = s * (t -= (1.5 / 2.75)) * t + .75;
				}
				else if (t < (2.5 / 2.75)) {
					r = s * (t -= (2.25 / 2.75)) * t + .9375;
				}
				else {
					r = s * (t -= (2.625 / 2.75)) * t + .984375;
				}

				return r;
			}	
		};
		var Qfx=win.Qfx = function(obj){
			var elem=null;
			if(typeof obj === 'string'){
				if(obj.indexOf('.')!==-1){
					var index = parseInt(obj.match(/\((.*?)\)/i)[1]),classN =obj.match(/(.*?)\(/i)[1],quke=doc.querySelectorAll?true:false;
					elem=quke? doc.querySelectorAll(classN)[index]:Qtool.getByclass(classN,index);
				}else{
					elem = doc.getElementById(obj);
				}
			}else{
				Q.debug("您设置的查询条件不正确!");
			}
			if(elem===undefined){
				Q.debug("没有找到匹配元素");
			}else{
				if(elem!==null){
					return new _Qfx(elem);
				}
			}
		},_Qfx=function(elem){
			this.elem = elem;
		},uid=0,rondKey='QfxData' + ( +new Date() + "" ).slice( -8 ),/*随机key*/
		cacheData={};
		/*
			cacheData = {
				1:{
					"myname":"tomie"
				}
			}
		*/
		_Qfx.prototype = {/*静态方法*/
			/**
			 * 自定义动画
			 * @param { function/null } 函数或者空值，函数为快速动画准备
			 * @param { String/Number } 动画持续时间
			 * @param { String & Function  } tween算法
			 * @param { Function } 动画完成的回调
			 */
			go:function( props, duration, easing, callback){
				var elem = this.elem,options = Q.setOptions( elem, duration, easing, callback ),type = typeof props === 'function' ? props().type : null;
				props = Q.setProps( elem, props, type );
				/*
					开始动画队列
				*/
				//Q.data(elem, 'myName', 'chen');
				//Q.debug(Q.data(elem, 'myName'));
				Q.queue(elem,function(){
					var source = {},
						target = {},
						p;
					for(p in props){
					//遍历CSS动画属性和属性值
					source[p] = Q.parseStyle( Q.getStyle(elem, p) );	// 动画开始时的CSS样式
					target[p] = Q.parseStyle( props[p] );				// 动画结束时的CSS样式
					}
				})
			}
		};
		var Qtool=Q= {
			$:function(elem){return typeof elem === 'string' ? doc.getElementById( elem ) : elem},
			getByclass:function(objName,index){
				var regTagClass=/\w+\.\w+/;
				if(regTagClass.test(objName)){
					var nameArray=objName.split(".");
					var tagName=nameArray[0];
					var className=nameArray[1];
					var tagArray=new Array();
					tagArray=document.getElementsByTagName(tagName);
					var elementArray=new Array();
					var j=0;
					for(var i=0;i<tagArray.length;i++){
						if(tagArray[i].className==className){
							elementArray[j]=tagArray[i];
							j++;
						}
					}
					return elementArray[index];
				}
				else{
					return false;
				}
			},
			/*获取元素计算的样式
			* @param { Object } DOM对象
			* @param { String } 要获取的CSS属性
			* @return { String } 
			*/
			getStyle:function( elem, p ){
				if('getComputedStyle' in win){
					var val = getComputedStyle( elem, null )[p];
					if( (p === 'left' || p === 'right' || p === 'top' || p === 'bottom') && val === 'auto' ){
						return '0px';
					}
					return val;
				}else{
					/*
						下面这个正则将形如margin-left变为marginLeft以方便js操作
					*/
					var newP = p.replace( /\-(\w)/g, function( $, $1 ){
						return $1.toUpperCase();
					});
					var val =  elem.currentStyle[newP];
					// 获取元素在IE6/7/8中的宽度和高度
					if( (newP === "width" || newP === "height") && val === 'auto' ){
						var rect =  elem.getBoundingClientRect();				
						return ( newP === 'width' ? rect.right - rect.left : rect.bottom - rect.top ) + 'px';
					}
					// 获取元素在IE6/7/8中的透明度
					if( newP === 'opacity' ){
						var filter = elem.currentStyle.filter;
						if( /opacity/.test(filter) ){
							val = filter.match( /\d+/ )[0] / 100;
							return (val === 1 || val === 0) ? val.toFixed(0) : val.toFixed(1);
						}
						else if( val === undefined ){
							return '1';
						}
					}
					if( (p === 'left' || p === 'right' || p === 'top' || p === 'bottom') && val === 'auto' ){
						return '0px';
					}
					return val;
				}
			},
			/**解析CSS属性值
			* @param { String } CSS属性
			* @return { Object } object.val为CSS属性值 object.unit为CSS属性单位
			* object.fn 为计算普通的属性值和颜色值的方法
			*/
			parseStyle:function(prop){
				
			},
			debug:function(value){
				if(!Qtool.$("debug_Qfx")){
					var elem = doc.createElement("div"),css="width:300px;height:200px;padding:15px 0px;position:absolute;right:0;top:0;border:3px solid #00FF00;background:#000;text-align:left;font-size:12px;color:#fff;line-height:22px;overflow-x:hidden;overflow:auto;SCROLLBAR-ARROW-COLOR:#FFFFFF;SCROLLBAR-FACE-COLOR:#00FF00;SCROLLBAR-DARKSHADOW-COLOR:#00FF00;SCROLLBAR-HIGHLIGHT-COLOR:#00FF00;SCROLLBAR-3DLIGHT-COLOR:#00FF00;SCROLLBAR-SHADOW-COLOR:#00FF00;SCROLLBAR-TRACK-COLOR:#CCCCCC;",inner = "";
					elem.id="debug_Qfx_wrap";
					elem.style.cssText = css;
					inner+="<li style='text-align:left;padding-left:0px;border-bottom:1px dashed #ccc'><span style='color:#33FF00'>"+value+"</span></li>";
					elem.innerHTML="<ol style='list-style-type:decimal;padding-left:0px;margin:0 auto;' id='debug_Qfx'>"+inner+"</ol>";
					elem.scrollTop = 200;
					doc.body.appendChild(elem);
				
				}else{
					Qtool.$("debug_Qfx").innerHTML+="<li style='text-align:left;padding-left:0px;border-bottom:1px dashed #ccc'><span style='color:#33FF00'>"+value+"</span></li>";
					Qtool.$("debug_Qfx_wrap").scrollTop = Qtool.$("debug_Qfx_wrap").scrollHeight;
				}
			},
			/*
			内置速度
			*/
			speed:{
				slow : 600,
				fast : 200,
				defaults : 400
			},
			/**将动画参数存储到一个新对象中*
			* @param { Object } DOM对象
			* @param { String & Number } 动画持续时间
			* @param { String & Function } tween算法
			* @param { Function } 回调函数
			* @return { Object } 参数的集合对象*/
			setOptions:function( elem, duration, easing, callback ){
				var _this = this,o={};
				o.duration= (function(d){//返回动画速度
					if( typeof d === 'number' ){
						return d;
					}
					else if( typeof d === 'string' && _this.speed[d] ){
						return self._this[d];
					}
					else if( !d ){
						return _this.speed.defaults;
					}
				})(duration);
				o.easing = (function(e){
					if(typeof e === "srtring"){
						return Easing[e];
					}else if(typeof e === "function"){
						return e;
					}else{
						return Easing.easeBoth;//默认缓动公式
					}
				})(easing);
				o.callback = function(){
					if(typeof callback === "function"){
						callback();
					}
					_this.dequeue( elem );//从队列中取出
				};
				return o;//返回集合
			},
			/**初始化动画属性
			*@param { Object } DOM对象
			*@param { Object } CSS动画属性和属性值
			*@param { String } 动画类型
			*@return { Object } 处理好的CSS动画属性和属性值
			*/
			setProps:function( elem, props, type ){
				if(type){//如果是快速模式
					
				}else if( props && typeof props === 'object' ){
					return props;
				}
			},
			/*队列管理
			
			*/
			queue:function( elem, data ){
				var animQueue = this.data( elem, 'animQueue' ) || this.data( elem, 'animQueue', [] );
				if( data ){
					animQueue.push( data );
				}
				if( animQueue[0] !== 'runing' ){
					this.dequeue( elem );
				}
			},
			/*
				取出队列并执行
			*/
			dequeue:function(elem){
			
			},
			/** 缓存系统
			 * 设置并返回缓存的数据 关于缓存系统详见：http://stylechen.com/cachedata.html
			 * @param { String / Object } 任意字符串或DOM元素
			 * @param { String } 缓存属性名
			 * @param { Anything } 缓存属性值
			 * @return { Object } 
			 */
			data:function( elem, key, val ){
				Q.debug("key:"+rondKey);
				Q.debug("val:"+val);
				var index = null,thisCache=null;
				if(elem===win){
					index=0;
				}else{
					if(elem.nodeType===9){
						index=1;
					}else{
						if(elem[rondKey]){
							index = elem[rondKey];
						}else{
							index = elem[rondKey] =++uid;
						}
					}
				}
				Q.debug("index:"+index);
				thisCache = cacheData[index] ? cacheData[index] : ( cacheData[index] = {} );
				if(val!== undefined){
					// 将数据存入缓存中
					thisCache[key] = val;
				}
				// 返回DOM元素存储的数据
				return thisCache[key];
			},
			/**
			 * 删除缓存
			 * @param { String / Object } 任意字符串或DOM元素
			 * @param { String } 要删除的缓存属性名
			 */	
			removeData:function( elem, key){
				var index = null;
				if(elem===win){
					index=0;
				}else{
					if(elem.nodeType === 9){
						index = 1;
					}else{
						index = elem[rondKey];
					}
				}
				if( index === undefined ) return;
				// 检测对象是否为空
				var isEmptyObject = function( obj ) {
					var name;
					for ( name in obj ) {
						return false;
					}
					return true;
				},// 删除DOM元素所有的缓存数据
				delteProp = function(){
					delete cacheData[index];
					if( index <= 1 ) return;
					try{
						// IE8及标准浏览器可以直接使用delete来删除属性
						delete elem[rondKey];
					}
					catch ( e ) {
						// IE6/IE7使用removeAttribute方法来删除属性(document会报错)
						elem.removeAttribute( rondKey );
					}
				};
				if(key){
					//只删除指定的缓存
					delete cacheData[index][key];
					if( isEmptyObject( cacheData[index] ) ){
						delteProp();
					}
				}else{
					delteProp();
				}
			}
		};
		
	})(window,document);