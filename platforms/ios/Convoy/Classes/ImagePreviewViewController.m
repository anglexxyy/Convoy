//
//  ImagePreviewViewController.m
//  Convoy
//
//  Created by NKO on 15/3/18.
//
//

#import "ImagePreviewViewController.h"

@interface ImagePreviewViewController ()

@property double lastScale;
@end

@implementation ImagePreviewViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view from its nib.
//    [self.rotationRecongnizer]
//    [self.rotationRecongnizer addTarget:self action:@selector(gestureView:)];
    [self.pichRecognizer addTarget:self action:@selector(pickView:)];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

-(void)pickView:(UIPinchGestureRecognizer*)gesture {
    if (gesture.state == UIGestureRecognizerStateBegan) {
        _lastScale = 1.0;
        return;
    }
    CGFloat scale = 1.0 - (_lastScale - [gesture scale]);
    
    CGAffineTransform currentTransform = self.imageView.transform;
    CGAffineTransform newTransform = CGAffineTransformScale(currentTransform, scale, scale);
    
    [self.imageView setTransform:newTransform];
    
    _lastScale = [gesture scale];
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/
- (IBAction)close:(id)sender {
    [self dismissViewControllerAnimated:YES completion:nil];
}

@end
