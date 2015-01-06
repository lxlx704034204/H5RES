
$.extend($,{
	_:function(s){if($.no(s))s=$.t();document.title=s;},
	//获取对象(不带缓存)
	$:function(o){return $.isS(o)?$('#'+o):$(o);},
	//获取对象(带缓存)
	o:function(o){if(!$.isS(o))return $(o);var obj=$.os[o];if(obj)return obj;obj=$('#'+o);if(obj.length>0)$.os[o]=obj;return obj;},os:{},
	//获取对象值
	v:function(o,v){if(v)$.$(o).val(v);else{return $.trim($.$(o).val());}},
	//返回当前时间
	t:function(){return $.d().getTime();},
	//返回当前时间对象
	d:function(t){if(t)return new Date(t);return new Date()},
	//转换成整数
	n:function(s){return parseInt(s);},
	//转换成浮点数
	f:function(s){return parseFloat(s);},
	//判断对象是否存在
	no:function(){var as=arguments;for(var i=0;i<as.length;i++)if(as[i]==null || as[i]==undefined)return true;return false;},
	//判断对象类型
	isS:function(o){return typeof o=="string"},
	isN:function(o){return typeof o=="number"},
	isB:function(o){return typeof o=="boolean"},
	isO:function(o){return typeof o=="object"},
	//是否包含指定内容
	cc:function(cs,c,n){var e=!$.no(n);for(var i=0;i<cs.length;i++)if((e && cs[i][n]==c) || (!e && cs[i]==c))return i;return -1;},
	//返回RegExp
	re:function(s,c){var r=new RegExp(s);if(c)return r.test(c);return r;},
	//是否IE浏览器
	ie:function(v){if(!$.browser.msie)return false;if(v)return $.browser.version==v || $.browser.version.indexOf(v+'.')==0;return true;},
	//创建DOC对象
	ceok:false,
	ce:function(n){return $(document.createElement(n));},
	//从字符串中获取第一个数值
	nv:function(s,sv){var si=-1,ei=-1,i=0;if(sv){i=s.indexOf(sv);if(i<0)i=0;}for(;i<s.length;i++)if(si==-1){if(s.charAt(i)>='0' && s.charAt(i)<='9')si=i;}else{if(s.charAt(i)<'0' || s.charAt(i)>'9'){ei=i;break;}}return $.n(si==-1 && ei==-1 ? -1 : (ei==-1 ? s.substr(si) : s.substring(si,ei)));},
	//数值四舍五入
	round:function(n,mantissa){if(!mantissa)mantissa=0;if(mantissa<=0)return Math.round(n);var v=1;for(var i=0;i<mantissa;i++)v*=10;return Math.round(n*v)/v;},
	//字符串替换
	replace:function(s,s1,s2){return s.replace(new RegExp(s1,'g'),s2);},
	//字符串长度(中文算2个)
	strlen:function(s){return s.replace(/[^\x00-\xff]/g,"**").length},
	//字符串是否包含中文
	strch:function(s){return /[^\x00-\xff]+/.test(s)},
	//清除字符串中的'"字符和头尾空格
	clear:function(){var as=arguments,s;if(as.length<1)return '';s=as[0];if(as.length<2)as=[s,"'",'"'];for(var i=1;i<as.length;i++)s=$.replace(s,as[i],'');return $.trim(s);},
	//cookie操作
	getCookie:function(name,dv){var d=document.cookie;var il1=d.indexOf(name+'=');if(il1==-1)return $.no(dv) ? null : dv;il1+=name.length+1;var il2=d.indexOf(';',il1);if(il2==-1)il2=d.length;return unescape(d.substring(il1,il2));},
	setCookie:function(name,value,expires,path,domain,secure){var s=new Text()._(name)._('=')._(escape(value));if(!expires || (expires && expires!='temp')){var day=60*60*24*1000;if(expires=='day')expires=$.d($.t()+day);else if(expires=='week')expires=$.d($.t()+day*7);else if(expires=='month')expires=$.d($.t()+day*30);else if(expires=='year')expires=$.d($.t()+day*365);else{expires=$.d($.t()+day*365*100);}s._(';expires=')._(expires.toGMTString());}if(path)s._(';path=')._(path);if(domain)s._(';domain=')._(domain);if(secure)s._(';secure=')._(secure);document.cookie=s;},
	delCookie:function(name,path,domain){var s=new Text()._(name)._('=null;expires=')._($.d($.t()-100000000).toGMTString());if(path)s._(';path=')._(path);if(domain!=null)s._(';domain=')._(domain);document.cookie=s;},
	clrCookie:function(path,domain){var ds=document.cookie.split(';');for(var i=0;i<ds.length;i++)$.delCookie($.trim(ds[i].split('=')[0]),path,domain);},
	//初始化对象
	init:function(o,dv){if(!o)return dv;for(i in dv)if($.no(o[i]))o[i]=dv[i];return o;}
});
function Text(){this.s;this.b=[];};Text.prototype={
	_:function(s){var t=this;t.b.push(s);t.s=null;return t;},
	clear:function(){this.b=[];this.s=null;},
	length:function(){return this.ts().length;},
	toHtml:function(o){o=$.$(o);if(o.length==0)return;o[0].innerHTML=this.ts();},
	toString:function(){var t=this;if(!t.s)t.s=t.b.join('');return t.s;},
	ts:function(){return this.toString();}
};
var X = {
	//返回当前可用z-index值
	zi:function(){return X._zi++;},_zi:10001,
	//返回页面空间
	pso:null,
	ps:function(){if(X.pso)return X.pso;X.wdb();X.pso={width:X.win.width(),height:X.win.height(),left:X.doc.scrollLeft(),top:X.doc.scrollTop()};return X.pso;},
	//初始化WinDocBody
	win:null,doc:null,body:null,
	wdb:function(){if(!X.win){X.win=$(window);X.doc=$(document);X.body=$(document.body);}}
};
X.sel={
	db:null,
	//data:[[key,value],[...],[...]]
	//dv:defaultValue
	//tv:toValue绑定返回值的ID
	//db[data,dv,tv]
	init:function(data,dv,tv){
		var t=this,bgi=X.zi(),di=X.zi(),db=[data,dv,tv],s=new Text();
		if(data)t.createList(s,data,dv);
		s._('<div class="db-sel-cancel" onClick="X.sel.close();">取消</div>');
		db[3]=$.ce('div');
		db[3].addClass('db-bg');
		db[3].css('zIndex',bgi);
		db[3].attr('id','db-select-bg');
		db[4]=$.ce('div');
		db[4].addClass('db-sel');
		db[4].attr('id','db-select');
		db[4].css('zIndex',di);
		db[4].html(s.ts());
		$("body").append(db[3],db[4]);
		t.db=db;
	},
	createList:function(s,data,dv){
		s._('<div class="db-sel-wrap"><ul>');
		for(var i in data){
			s._('<li onclick="X.sel.close(\''+data[i][1]+'\');">'+data[i][0]+'</li>');
		}
		s._('</ul></div>');
	},
	close:function(v){
		var b = this.db;
		if(v){
			$('#'+b[2]).val(v);
		}
		b[4].remove();b[3].remove();
		this.db=null;
	}
};
X.loading={
	show:function(){
		if($('#loading').length<1){
			$("body").append('<div id="loading"><div class="load-wrap"><p></p></div></div>');
		}
		$('#loading').css('zIndex','99999').show();
	},
	hide:function(){
		$('#loading').hide();
	}
};
//对话框
X.dialog={
	//打开的对话框、提示框、选择框、消息框、加载框索引
	dbs:[],
	//打开对话框 ps:topic(对话框主题名称),width,notify
	//db[索引，宽度，高度，信息层，背景层，回调]
	open:function(content,ps){
		ps=$.init(ps,{topic:'',width:280,notify:null});
		var t=this,w=ps.width,bgi=X.zi(),di=X.zi(),db=[di,w],p=X.ps(),ww=p.width,wh=p.height,dl=$.round((ww-w)/2),dt=-30,s=new Text();
		if(dl<10)dl=10;
		if(content)s._($.replace(content,'#di#',di));
		db[3]=$.ce('div');
		db[3].addClass('db-bg');
		db[3].css('zIndex',bgi);
		db[3].attr('id','dialog-bg-'+di);
		db[4]=$.ce('div');
		db[4].addClass('db-wrap');
		db[4].css('zIndex',di);
		db[4].css('width',w+'px');
		db[4].css('left',dl+'px');
		//db[4].css('display','none');
		db[4].attr('id','dialog-'+di);
		db[4].html(s.ts());
		db[5]=ps.notify;
		X.body.append(db[3],db[4]);
		db[2]=db[4].height();
		dt=$.round((wh-db[2])/2+dt);
		if(dt<10)dt=10;
		db[4].css('top',dt+'px');
		db[4].show();
		t.dbs.push(db);
	},
	//提醒对话框 ps:title,msg,icon,width,btn(按钮名称),notify
	alert:function(msg,ps){
		ps=$.init(ps,{title:'',msg:msg,width:280,btn:'确定'});
		if(ps.width<180)ps.width=180;
		var t=this,s=new Text();
		if(ps.title){
			s._('<div class="db-title">')._(ps.title)._('</div>');
		}
		s._('<div class="db-content">')._(msg)._('</div>');
		s._('<div class="db-foot">');
		if(ps.cfm)
			t.addBtn(s,ps.btn1,2);
		t.addBtn(s,ps.btn,1);
		s._('</div>');
		t.open(s.ts(),ps);
	},
	//确认对话框 ps:title,msg,icon,width,btn(按钮名称),btn1(第二个按钮名称),notify
	confirm:function(msg,ps){
		ps=$.init(ps,{msg:msg,btn1:'取消'});
		ps.cfm=true;
		this.alert(msg,ps)
	},
	tips:function(msg){
		clearTimeout(window.tipsTimer);
        var a = $('<div class="db-tip">' + msg + "</div>");
        $("body").append(a);
        window.tipsTimer = setTimeout(function() {
            $(".db-tip").remove()
        }, 2000);
	},
	//添加按钮代码(对话框按钮)
	addBtn:function(s,name,nt){
		this.addButton(s,{id:'dialog-btn-#di#',name:name,click:'X.dialog.close(#di#,'+nt+');'});
	},
	//添加按钮代码 ps:id,name,css(按钮CSS),style,click(点击事件),effects(点击效果CSS),type(是按钮或者连接样式)
	addButton:function(s,ps){
		s._('<p');
		if(ps.id)
			s._(' id="')._(ps.id)._('"');
		if(ps.css)
			s._(' class="')._(ps.css)._('"');
		if(ps.style)
			s._(' style="')._(ps.style)._('"');
		if(ps.click)
			s._(' onclick="')._(ps.click)._('"');
		s._('>'+ps.name+'</p>');
	},
	//操作通知
	notify:function(di,nt){
		var db=this.get(di);
		if(db[5])db[5]($.no(nt)?0:nt);
	},
	//关闭对话框或提示框(0不关闭,1关闭,2关闭并关闭上级对话框)
	close:function(di,nt){
		var t=this,b,l,c=1,cn,cv;
		if($.no(nt))nt=0;
		if(!$.no(di)){
			b=t.get(di);
			if(b){
				if($.isN(di)){
					if(b[5]){b[5](nt);}
					t.get(di,true);b[4].remove();b[3].remove();
				}
			}else{return;}
		}
		//关闭最后打开的对话框
		l=t.dbs.length;
		if(l>0)t.close(t.dbs[l-1][0],0);
	},
	//返回对话框
	get:function(di,del){
		var t=this,bs=t.dbs,b;
		for(var i=0;i<bs.length;i++){
			if(bs[i][0]==di){
				b=bs[i];
				if(del)
					bs.splice(i,1);
				break;
			}
		}
		return b;
	},
	//调整大小位置
	resize:function(){
		var t=this,dbs=t.dbs,pbs=t.pbs,mbs=t.mbs;
		if(dbs.length==0 && pbs.length==0 && mbs.length==0)
			return;
		var p=X.ps(),ww=p.width,wh=p.height,dl,dt,top=-30,o,obj;
		if($.ie(6))top+=p.top;
		for(var i=0;i<dbs.length;i++)
		{
			o=dbs[i];
			dl=$.round((ww-o[1])/2);
			if(dl<6)dl=6;
			dt=$.round((wh-o[2])/2+top);
			if(dt<6)dt=6;
			o[3].css('width',ww+'px');
			o[3].css('height',wh+'px');
			o[4].css('top',dt+'px');
			o[4].css('left',dl+'px');
		}
		for(var i=0;i<pbs.length;i++)
		{
			o=pbs[i];
			obj=$.$(o[4]);
			if(obj.length>0)
			{
				p=obj.offset();
				ww=p.left+obj.width()/2;
				wh=p.top+obj.height()+5;
				if(o[2]%2==1)ww-=15;else{ww-=o[1]-15;}
				o[5].css('top',wh+'px');
				o[5].css('left',ww+'px');
			}
		}
		for(var i=0;i<mbs.length;i++)
		{
			o=mbs[i];
			if(o!=null && o.length>4)
			{
				dl=$.round((ww-o[5])/2);
				o[4].css('left',dl+'px');
			}
		}
	}
};
X.address={
	p:null, c:null, dp:'', dc:'',nosel:true,
	province :[ ["1" , "北京市"],["2" , "天津市"],["3" , "河北省"],["4" , "山西省"],["5" , "内蒙古自治区"],["6" , "辽宁省"],["7" , "吉林省"],["8" , "黑龙江省"],["9" , "上海市"],["10", "江苏省"],
        ["11", "浙江省"],["12", "安徽省"],["13", "福建省"],["14", "江西省"],["15", "山东省"],["16", "河南省"],["17", "湖北省"],["18", "湖南省"],["19", "广东省"],
        ["20", "广西壮族自治区"],["21", "海南省"],["22", "重庆市"],["23", "四川省"],["24", "贵州省"],["25", "云南省"],["26", "西藏自治区"],["27", "陕西省"],["28", "甘肃省"],["29", "青海省"],
        ["30", "宁夏回族自治区"],["31", "新疆维吾尔自治区"],["32", "香港特别行政区"],["33", "澳门特别行政区"],["34", "台湾省"]],

	citys:[["1","1","北京市","100000"],["2","2","天津市","100000"],["3","3","石家庄市","050000"],["3","4","唐山市","063000"],["3","5","秦皇岛市","066000"],["3","6","邯郸市","056000"],["3","7","邢台市","054000"],["3","8","保定市","071000"],["3","9","张家口市","075000"],["3","10","承德市","067000"],["3","11","沧州市","061000"],["3","12","廊坊市","065000"],["3","13","衡水市","053000"],["4","14","太原市","030000"],["4","15","大同市","037000"],["4","16","阳泉市","045000"],["4","17","长治市","046000"],["4","18","晋城市","048000"],["4","19","朔州市","036000"],["4","20","晋中市","030600"],["4","21","运城市","044000"],["4","22","忻州市","034000"],["4","23","临汾市","041000"],["4","24","吕梁市","030500"],["5","25","呼和浩特市","010000"],["5","26","包头市","014000"],["5","27","乌海市","016000"],["5","28","赤峰市","024000"],["5","29","通辽市","028000"],["5","30","鄂尔多斯市","010300"],["5","31","呼伦贝尔市","021000"],["5","32","巴彦淖尔市","014400"],["5","33","乌兰察布市","011800"],["5","34","兴安盟","137500"],["5","35","锡林郭勒盟","011100"],["5","36","阿拉善盟","016000"],["6","37","沈阳市","110000"],["6","38","大连市","116000"],["6","39","鞍山市","114000"],["6","40","抚顺市","113000"],["6","41","本溪市","117000"],["6","42","丹东市","118000"],["6","43","锦州市","121000"],["6","44","营口市","115000"],["6","45","阜新市","123000"],["6","46","辽阳市","111000"],["6","47","盘锦市","124000"],["6","48","铁岭市","112000"],["6","49","朝阳市","122000"],["6","50","葫芦岛市","125000"],["7","51","长春市","130000"],["7","52","吉林市","132000"],["7","53","四平市","136000"],["7","54","辽源市","136200"],["7","55","通化市","134000"],["7","56","白山市","134300"],["7","57","松原市","131100"],["7","58","白城市","137000"],["7","59","延边州","133000"],["8","60","哈尔滨市","150000"],["8","61","齐齐哈尔市","161000"],["8","62","鸡西市","158100"],["8","63","鹤岗市","154100"],["8","64","双鸭山市","155100"],["8","65","大庆市","163000"],["8","66","伊春市","152300"],["8","67","佳木斯市","154000"],["8","68","七台河市","154600"],["8","69","牡丹江市","157000"],["8","70","黑河市","164300"],["8","71","绥化市","152000"],["8","72","大兴安岭地区","165000"],["9","73","上海市","200000"],["10","74","南京市","210000"],["10","75","无锡市","214000"],["10","76","徐州市","221000"],["10","77","常州市","213000"],["10","78","苏州市","215000"],["10","79","南通市","226000"],["10","80","连云港市","222000"],["10","81","淮安市","223200"],["10","82","盐城市","224000"],["10","83","扬州市","225000"],["10","84","镇江市","212000"],["10","85","泰州市","225300"],["10","86","宿迁市","223800"],["11","87","杭州市","310000"],["11","88","宁波市","315000"],["11","89","温州市","325000"],["11","90","嘉兴市","314000"],["11","91","湖州市","313000"],["11","92","绍兴市","312000"],["11","93","金华市","321000"],["11","94","衢州市","324000"],["11","95","舟山市","316000"],["11","96","台州市","318000"],["11","97","丽水市","323000"],["12","98","合肥市","230000"],["12","99","芜湖市","241000"],["12","100","蚌埠市","233000"],["12","101","淮南市","232000"],["12","102","马鞍山市","243000"],["12","103","淮北市","235000"],["12","104","铜陵市","244000"],["12","105","安庆市","246000"],["12","106","黄山市","242700"],["12","107","滁州市","239000"],["12","108","阜阳市","236100"],["12","109","宿州市","234100"],["12","110","巢湖市","238000"],["12","111","六安市","237000"],["12","112","亳州市","236800"],["12","113","池州市","247100"],["12","114","宣城市","366000"],["13","115","福州市","350000"],["13","116","厦门市","361000"],["13","117","莆田市","351100"],["13","118","三明市","365000"],["13","119","泉州市","362000"],["13","120","漳州市","363000"],["13","121","南平市","353000"],["13","122","龙岩市","364000"],["13","123","宁德市","352100"],["14","124","南昌市","330000"],["14","125","景德镇市","333000"],["14","126","萍乡市","337000"],["14","127","九江市","332000"],["14","128","新余市","338000"],["14","129","鹰潭市","335000"],["14","130","赣州市","341000"],["14","131","吉安市","343000"],["14","132","宜春市","336000"],["14","133","抚州市","332900"],["14","134","上饶市","334000"],["15","135","济南市","250000"],["15","136","青岛市","266000"],["15","137","淄博市","255000"],["15","138","枣庄市","277100"],["15","139","东营市","257000"],["15","140","烟台市","264000"],["15","141","潍坊市","261000"],["15","142","济宁市","272100"],["15","143","泰安市","271000"],["15","144","威海市","265700"],["15","145","日照市","276800"],["15","146","莱芜市","271100"],["15","147","临沂市","276000"],["15","148","德州市","253000"],["15","149","聊城市","252000"],["15","150","滨州市","256600"],["15","151","菏泽市","255000"],["16","152","郑州市","450000"],["16","153","开封市","475000"],["16","154","洛阳市","471000"],["16","155","平顶山市","467000"],["16","156","安阳市","454900"],["16","157","鹤壁市","456600"],["16","158","新乡市","453000"],["16","159","焦作市","454100"],["16","160","濮阳市","457000"],["16","161","许昌市","461000"],["16","162","漯河市","462000"],["16","163","三门峡市","472000"],["16","164","南阳市","473000"],["16","165","商丘市","476000"],["16","166","信阳市","464000"],["16","167","周口市","466000"],["16","168","驻马店市","463000"],["17","169","武汉市","430000"],["17","170","黄石市","435000"],["17","171","十堰市","442000"],["17","172","宜昌市","443000"],["17","173","襄樊市","441000"],["17","174","鄂州市","436000"],["17","175","荆门市","448000"],["17","176","孝感市","432100"],["17","177","荆州市","434000"],["17","178","黄冈市","438000"],["17","179","咸宁市","437000"],["17","180","随州市","441300"],["17","181","恩施州","445000"],["17","182","神农架","442400"],["18","183","长沙市","410000"],["18","184","株洲市","412000"],["18","185","湘潭市","411100"],["18","186","衡阳市","421000"],["18","187","邵阳市","422000"],["18","188","岳阳市","414000"],["18","189","常德市","415000"],["18","190","张家界市","427000"],["18","191","益阳市","413000"],["18","192","郴州市","423000"],["18","193","永州市","425000"],["18","194","怀化市","418000"],["18","195","娄底市","417000"],["18","196","湘西土家族苗族自治州","416000"],["19","197","广州市","510000"],["19","198","韶关市","521000"],["19","199","深圳市","518000"],["19","200","珠海市","519000"],["19","201","汕头市","515000"],["19","202","佛山市","528000"],["19","203","江门市","529000"],["19","204","湛江市","524000"],["19","205","茂名市","525000"],["19","206","肇庆市","526000"],["19","207","惠州市","516000"],["19","208","梅州市","514000"],["19","209","汕尾市","516600"],["19","210","河源市","517000"],["19","211","阳江市","529500"],["19","212","清远市","511500"],["19","213","东莞市","511700"],["19","214","中山市","528400"],["19","215","潮州市","515600"],["19","216","揭阳市","522000"],["19","217","云浮市","527300"],["20","218","南宁市","530000"],["20","219","柳州市","545000"],["20","220","桂林市","541000"],["20","221","梧州市","543000"],["20","222","北海市","536000"],["20","223","防城港市","538000"],["20","224","钦州市","535000"],["20","225","贵港市","537100"],["20","226","玉林市","537000"],["20","227","百色市","533000"],["20","228","贺州市","542800"],["20","229","河池市","547000"],["20","230","来宾市","546100"],["20","231","崇左市","532200"],["21","232","海口市","570000"],["21","233","三亚市","572000"],["22","234","重庆市","400000"],["23","235","成都市","610000"],["23","236","自贡市","643000"],["23","237","攀枝花市","617000"],["23","238","泸州市","646100"],["23","239","德阳市","618000"],["23","240","绵阳市","621000"],["23","241","广元市","628000"],["23","242","遂宁市","629000"],["23","243","内江市","641000"],["23","244","乐山市","614000"],["23","245","南充市","637000"],["23","246","眉山市","612100"],["23","247","宜宾市","644000"],["23","248","广安市","638000"],["23","249","达州市","635000"],["23","250","雅安市","625000"],["23","251","巴中市","635500"],["23","252","资阳市","641300"],["23","253","阿坝藏族羌族自治州","624600"],["23","254","甘孜藏族自治州","626000"],["23","255","凉山州","615000"],["24","256","贵阳市","55000"],["24","257","六盘水市","553000"],["24","258","遵义市","563000"],["24","259","安顺市","561000"],["24","260","铜仁地区","554300"],["24","261","黔西南州","551500"],["24","262","毕节地区","551700"],["24","263","黔东南州","551500"],["24","264","黔南州","550100"],["25","265","昆明市","650000"],["25","266","曲靖市","655000"],["25","267","玉溪市","653100"],["25","268","保山市","678000"],["25","269","昭通市","657000"],["25","270","丽江市","674100"],["25","271","思茅市","665000"],["25","272","临沧市","677000"],["25","273","楚雄州","675000"],["25","274","红河州","654400"],["25","275","文山州","663000"],["25","276","西双版纳州","666200"],["25","277","大理州","671000"],["25","278","德宏州","678400"],["25","279","怒江州","671400"],["25","280","迪庆州","674400"],["26","281","拉萨市","850000"],["26","282","昌都地区","854000"],["26","283","山南地区","856000"],["26","284","日喀则地区","857000"],["26","285","那曲地区","852000"],["26","286","阿里地区","859100"],["26","287","林芝地区","860100"],["27","288","西安市","710000"],["27","289","铜川市","727000"],["27","290","宝鸡市","721000"],["27","291","咸阳市","712000"],["27","292","渭南市","714000"],["27","293","延安市","716000"],["27","294","汉中市","723000"],["27","295","榆林市","719000"],["27","296","安康市","725000"],["27","297","商洛市","711500"],["28","298","兰州市","730000"],["28","299","嘉峪关市","735100"],["28","300","金昌市","737100"],["28","301","白银市","730900"],["28","302","天水市","741000"],["28","303","武威市","733000"],["28","304","张掖市","734000"],["28","305","平凉市","744000"],["28","306","酒泉市","735000"],["28","307","庆阳市","744500"],["28","308","定西市","743000"],["28","309","陇南市","742100"],["28","310","临夏回族自治州","731100"],["28","311","甘南藏族自治州","747000"],["29","312","西宁市","810000"],["29","313","海东地区","810600"],["29","314","海北藏族自治州","810300"],["29","315","黄南藏族自治州","811300"],["29","316","海南藏族自治州","813000"],["29","317","果洛藏族自治州","814000"],["29","318","玉树藏族自治州","815000"],["29","319","海西蒙古族藏族自治州","817000"],["30","320","银川市","750000"],["30","321","石嘴山市","753000"],["30","322","吴忠市","751100"],["30","323","固原市","756000"],["30","324","中卫市","751700"],["31","325","乌鲁木齐市","830000"],["31","326","克拉玛依市","834000"],["31","327","吐鲁番地区","838000"],["31","328","哈密地区","839000"],["31","329","昌吉回族自治州","831100"],["31","330","博尔塔拉蒙古自治州","833400"],["31","331","巴音郭楞蒙古自治州","841000"],["31","332","阿克苏地区","843000"],["31","333","克孜勒苏柯尔克孜自治州","835600"],["31","334","喀什地区","844000"],["31","335","和田地区","848000"],["31","336","伊犁哈萨克自治州","833200"],["31","337","塔城地区","834700"],["31","338","阿勒泰地区","836500"],["31","339","石河子市","832000"],["31","340","阿拉尔市","843300"],["31","341","图木舒克市","843900"],["31","342","五家渠市","831300"],["32","343","香港特别行政区","000000"],["33","344","澳门特别行政区","000000"],["34","345","台湾省","000000"]],
	//加载下拉列表
	init:function(ps){
		var t=this;
		t.p=$.$(ps.province);
		t.c=$.$(ps.city);
		t.dp=ps.dp;
		t.dc=ps.dc;

		t.getProvince();
	},
	//获取省份
	getProvince:function(){
		var t=this,so=-1,pid=1;
		if($.no(t.p))return;
		if(t.nosel){t.addOption(t.p,'请选择','0');}
		$(t.province).each(function(i,v){
			t.addOption(t.p,v[1],v[0]);
			if(t.dp==v[1]||t.dp==v[0]){so=i;pid=v[0];}
		});	
		setTimeout(function() {
			if(so!=-1){$(t.p.find('option')[t.nosel?so+1:so]).attr('selected','selected');}
		});
		t.loadCity(pid);
		t.p.change(function(){
			t.loadCity(t.p.val());
		});
	},
	//获取城市
	getCity:function(pid){
		var t=this,tem=[];
		$(t.citys).each(function(i,v){
			if(v[0]==pid){
				tem.push([v[1],v[2],v[3]]);
			}
		});	
		return tem;
	},
	//加载城市
	loadCity:function(pid){
		var t=this,so;
		if($.no(t.c))return;
		t.c.empty();
		if(pid==0){t.addOption(t.c,'请选择','0');return;}
		var cities = t.getCity(pid);
		$(cities).each(function(i,v){
			t.addOption(t.c,v[1],v[0]);
			if(t.dc==v[1]||t.dc==v[0]){so=i;}
		});	
		//if(so){$(t.c.find('option')[so]).attr('selected','selected');}

	},
	//添加选项内容
	addOption:function(se,text,value){
		var theOption=$('<option value="'+value+'">'+text+'</option>');
		se.append(theOption);
	}
};
