//
//  JsViewController.m
//  JsPatchDemo
//
//  Created by 朱大茂 on 2016/12/8.
//  Copyright © 2016年 zhudm. All rights reserved.
//

#import "JsViewController.h"

@interface JsViewController ()<UIAlertViewDelegate>
{
    NSArray * _privateArry;// 私有变量  js 通过KVO setValue_forKey  valueForKey
}
@property (nonatomic, strong) NSArray *dataArry;//js 插入数据,直接操作.
@end

@implementation JsViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.

}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (void)right_item_press:(UIBarButtonItem *)item{
    NSLog(@"%@   privateArry:%@",self.dataArry,_privateArry);
    
}

- (void)dealloc{
    NSLog(@"%s %c",__FUNCTION__,__LINE__);
}

@end
