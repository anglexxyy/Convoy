//
//  SingleImageViewController.m
//  HelloCordova
//
//  Created by NKO on 15/4/9.
//
//

#import "SingleImageViewController.h"
#import "CollectionViewController.h"
#import "SingleImage.h"
@interface SingleImageViewController ()

@property (strong, nonatomic) MRImgShowView *scrollView;
@property (strong, nonatomic) SingleImage* singleImage;

@end

@implementation SingleImageViewController


- (void)viewDidLoad {
//    [SingleImage sharedInstance].changeCurrentIndex = @selector(didReceiveMemoryWarning:);
    _singleImage =[SingleImage sharedInstance];
    _singleImage.changeImageblock = ^(int imgIndex){
        [_scrollView setCurIndex:imgIndex];
    };

//    [self _requestData];
    
//    NSLog(@"width:%f----heigit:%f",self.scrollView.contentSize.width,self.scrollView.contentSize.height);

    [super viewDidLoad];
    CGFloat width = [UIScreen mainScreen].bounds.size.width;
    CGFloat height = [UIScreen mainScreen].bounds.size.height;
    NSLog(@"width:%f----heigit:%f",width,height);
    NSLog(@"contentwidth:%f----contentheigit:%f",self.scrollView.contentSize.width,self.scrollView.contentSize.height);
    self.scrollView = [[MRImgShowView alloc] initWithFrame:CGRectMake(0, 0, width, height)];
    //    self.scrollView.contentSize = CGSizeMake(self.scrollView.frame.size.width * 3, self.scrollView.frame.size.height);
    //    [self.scrollView setContentOffset:CGPointMake(self.scrollView.frame.size.width, 0)];
    [self.scrollView initScrollView];
    [self.scrollView setImgSource:_singleImage.imageData];
    [self.scrollView setCurIndex:0];
//    [self.scrollView updateMRView: width deviceHeight: height];
    [self.view1 addSubview:self.scrollView];
    // Do any additional setup after loading the view.
    
}

-(void)viewDidLayoutSubviews{
//    [super viewDidLayoutSubviews];
//    NSLog(@"width:%f----heigit:%f",self.view1.frame.size.width,self.view1.frame.size.height);
//    [self.scrollView updateMRView:self.view.frame.size.width deviceHeight:self.view.frame.size.height];
//    NSLog(@"contentwidth:%f----contentheigit:%f",self.scrollView.contentSize.width,self.scrollView.contentSize.height);
    NSLog(@"width:%f----heigit:%f",self.view1.frame.size.width,self.view1.frame.size.height);
    [self.scrollView updateMRView:self.view1.frame.size.width deviceHeight:self.view1.frame.size.height];
    NSLog(@"contentwidth:%f----contentheigit:%f",self.scrollView.contentSize.width,self.scrollView.contentSize.height);
}

-(void)viewDidAppear:(BOOL)animated {
    [super viewDidAppear:animated];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (IBAction)close:(id)sender {
    [self dismissViewControllerAnimated:false completion:nil];
}

- (IBAction)thumber:(id)sender {
    CollectionViewController *thumberController = [[CollectionViewController alloc]init];
    [self presentViewController:thumberController animated:true completion:nil];
}

- (IBAction)unwinToHome:(UIStoryboardSegue*)segue {
}
- (IBAction)handleSingleTap:(id)sender {
    if (self.toolBarView.hidden) {
        [self showToolbar:self.toolBarView];
    }else {
        [self hideToolbar:self.toolBarView];
    }
}

- (void)hideToolbar: (UIView*) toolBarView
{

        [UIView animateWithDuration:0.25 delay:0.0
                            options:UIViewAnimationOptionCurveLinear | UIViewAnimationOptionAllowUserInteraction
                         animations:^(void)
         {
             toolBarView.alpha = 0.0f;
         }
                         completion:^(BOOL finished)
         {
             toolBarView.hidden = YES;
         }
         ];
}

- (void)showToolbar: (UIView*) toolBarView
{
        
        [UIView animateWithDuration:0.25 delay:0.0
                            options:UIViewAnimationOptionCurveLinear | UIViewAnimationOptionAllowUserInteraction
                         animations:^(void)
         {
             toolBarView.hidden = NO;
             toolBarView.alpha = 1.0f;
         }
                         completion:NULL
         ];
}
- (BOOL) prefersStatusBarHidden {
    return true;
}

#pragma mark -UIScrollViewDelegate
- (void)scrollViewDidScroll:(UIScrollView *)scrollView {
    NSLog(@"scroll");
}
- (void)scrollViewDidEndDecelerating:(UIScrollView *)scrollView
{
    NSLog(@"dscroll ecelerating");
}


/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

#pragma mark -屏幕旋转
-(BOOL) shouldAutorotate {
    return true;
}


- (void)willAnimateRotationToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation duration:(NSTimeInterval)duration{
    NSLog(@"width:%f----heigit:%f",self.view1.frame.size.width,self.view1.frame.size.height);
    [self.scrollView updateMRView:self.view1.frame.size.width deviceHeight:self.view1.frame.size.height];
    NSLog(@"contentwidth:%f----contentheigit:%f",self.scrollView.contentSize.width,self.scrollView.contentSize.height);
}

#pragma mark -请求数据
- (void)_requestData{
    
    _singleImage.imageData = [[NSMutableArray alloc] init];
    
    for (int i = 0; i < 12; i++) {
        NSString *imgName = [NSString stringWithFormat:@"%d.jpg",i];
        UIImage *img = [UIImage imageNamed:imgName];
        [_singleImage.imageData addObject:img];
    }
    
}

@end
