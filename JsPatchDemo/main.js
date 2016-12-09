require('UIView,UIAlertView ,UIColor,UITableView,UITableViewCell,NSMutableArray, UILabel,UIButton,NSValue,UIBarButtonItem,ViewController,JsViewController,MASConstraintMaker,WKWebView')
defineClass('JsViewController:UIViewController<UIAlertViewDelegate,UITableViewDelegate,UITableViewDataSource>',['buttonBlock','totalNum','tableView'],{
	viewDidLoad:function(){
		self.super().viewDidLoad();
		self.p_initSubView();
	},
	p_initSubView:function(){
		self.navigationItem().setRightBarButtonItem(UIBarButtonItem.alloc().initWithBarButtonSystemItem_target_action(0,self,"right_item_press:"));
		
		self.view().setBackgroundColor(UIColor.whiteColor());
		var grayView = UIView.new();
		grayView.setBackgroundColor(UIColor.grayColor());
		self.view().addSubview(grayView);
		console.log(4);
		grayView.mas__makeConstraints(block("MASConstraintMaker *",function(make){
			make.center().equalTo()(self.view());
			make.size().equalTo()(NSValue.valueWithCGSize({width:100,height:100}));
		}));
	
		self.setTableView( UITableView.alloc().initWithFrame_style({x:0,y:0,width:0,height:0},0));
		self.tableView().setDataSource(self);
		self.tableView().setDelegate(self);
		self.tableView().registerClass_forCellReuseIdentifier(UITableViewCell.class(),"cell");
		self.view().addSubview(self.tableView());
		
	    self.tableView().mas__makeConstraints(block("MASConstraintMaker *",function(make){
			make.left().right().bottom().equalTo()(self.view());
			make.top().equalTo()(grayView.mas__bottom());
		}));
	
 		var button = UIButton.buttonWithType(0);
		button.setTitle_forState("你大爷",0);
		button.setTitle_forState("disable",1<<1);
		button.setTitleColor_forState(UIColor.blackColor(),0);
		button.setTitleColor_forState(UIColor.groupTableViewBackgroundColor(),1<<1);
		button.setBackgroundColor(UIColor.greenColor());
		button.addTarget_action_forControlEvents(self,"button_press:",1<<6);
		self.view().addSubview(button);
		button.mas__makeConstraints(block("MASConstraintMaker *",function(make){
			make.centerX().equalTo()(grayView);
			make.top().equalTo()(grayView.mas__bottom());
		})); 
		
		console.log(self.dataArry());
		self.setDataArry(NSMutableArray.new());
		self.setValue_forKey(['a','b','c'],'_privateArry');/*kvo 访问私有属性*/
		self.dataArry().addObject('d');
		self.setTotalNum(5);
	},
	button__press:function(item){
		item.mas__remakeConstraints(block("MASConstraintMaker *",function(make){
			make.top().equalTo()(self.mas__topLayoutGuide());
			make.centerX().equalTo(self.view());
		}));
		
		var slf = self;
		UIView.animateWithDuration_animations_completion(1,block("",function(){
			self.view().layoutIfNeeded();
		}),block("BOOL",function(finished){
			console.log(finished);
			//self.buttonBlock(finished);
			var alertView = UIAlertView.alloc().initWithTitle_message_delegate_cancelButtonTitle_otherButtonTitles('提示','动画结束',slf,"ok","cancel",null);
			alertView.show();
		}));
		console.log(self.valueForKey('_dataArry'));
		var arry = self.valueForKey('_privateArry').toJS();
		for (var temp in arry){
			console.log(temp);//js 中for_in temp 是 0,1,2 下标
		}
		console.log(self.totalNum()); // 添加property，格式为字符串数组

	},
	alertView_clickedButtonAtIndex: function(alertView, buttonIndex){
		console.log('clicked index ' + buttonIndex + NSStringFromClass( alertView.class()))
	},
	tableView_numberOfRowsInSection:function(tableView,section){
		var arry = self.valueForKey('_privateArry');
		return arry.count();
	},
	tableView_cellForRowAtIndexPath:function(tableView,indexPath){
		var cell = tableView.dequeueReusableCellWithIdentifier('cell');
		var arry = self.valueForKey('_privateArry');
		cell.textLabel().setText(arry.objectAtIndex(indexPath.row()));
		
		return cell;
	},
	tableView_didSelectRowAtIndexPath:function(tableView,indexPath){
		self.navigationController().popViewControllerAnimated(true);
		tableView.deselectRowAtIndexPath_animated(indexPath,true);
	},
},
{});

defineClass('ViewController',['webView'], {
	p__buttonPress:function(item){
		//item.setEnabled(false);
        if (!self.webView()){
            var redView = UILabel.alloc().initWithFrame({x:0,y:0,width:0,height:0});
            redView.setText('我是JSPatch');
            redView.setBackgroundColor(UIColor.orangeColor());
            redView.sizeToFit();
            self.navigationItem().setTitleView(redView);
            console.log(1);
            var webView = require('UIWebView').alloc().initWithFrame({x:0,y:0,width:0,height:0});
            webView.setScalesPageToFit(true);
            self.view().addSubview(webView);
            webView.mas__makeConstraints(block("MASConstraintMaker *",function(make){
                                               make.edges().equalTo()(self.view());
                                               }));
            
            var url = require('NSURL').URLWithString('https://www.baidu.com');
            
            var reuest = require('NSURLRequest').requestWithURL(url);
            
            webView.loadRequest(reuest);
            self.setWebView(webView);
        }
		console.log(3);
		
        var table = JsViewController.new();
	
		table.setButtonBlock(block("BOOL",function(finished){
			console.log('ViewController'+finished);
		}));/*另外不支持 JS 封装的 block 传到 OC 再传回 JS 去调用（*/
		self.navigationController().pushViewController_animated(table,true);
	},
},{});

// 添加C 函数支持
require('JPEngine').addExtensions(['JPCFunction'])
defineCFunction("NSClassFromString","Class,NSString *")
defineCFunction("NSStringFromClass","NSString *,Class")

