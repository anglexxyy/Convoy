//
//  SingleImageViewController.h
//  HelloCordova
//
//  Created by NKO on 15/4/9.
//
//

#import <UIKit/UIKit.h>
#import "MRImgShowView.h"

@interface SingleImageViewController : UIViewController<UIScrollViewDelegate>
@property (strong, nonatomic) IBOutlet UITapGestureRecognizer *tapRecognizer;
@property (weak, nonatomic) IBOutlet UIView *toolBarView;
@property (weak, nonatomic) IBOutlet UIView *view1;
@end
