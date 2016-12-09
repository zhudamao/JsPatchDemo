JsPatchDemo  
====
 
项目功能介绍
--------
* 通过JsPatchPlatform，写了一个demo,工程需要pod工具
  * 1.学习jspatch 原理，及其使用方法
  * 2.包括添加方法，复写方法，添加@property，修改私有变量 联系
    * 工程已包含main.js 文件
  * 3.练习在js中调用 c 函数，协议，实现协议方法
  * 4.require('UIView') 声明 其为oc中的类
  * 5.hot fix 必要性，注意点。
###注意点
提供一种自己实现图片浏览的思路,必须实现三种方法
```js 
defineClass('JsViewController',{
	viewDidLoad:function(){
		self.super().viewDidLoad();
		self.p_initSubView();
	},
	p_initSubView:function(){
		self.view().setBackgroundColor(UIColor.whiteColor());
		var grayView = UIView.new();
		grayView.setBackgroundColor(UIColor.grayColor());
		self.view().addSubview(grayView);
		console.log(4);
		grayView.mas__makeConstraints(block("MASConstraintMaker *",function(make){
			make.center().equalTo()(self.view());
			make.size().equalTo()(NSValue.valueWithCGSize({width:100,height:200}));
		}));
	},
},
{});

