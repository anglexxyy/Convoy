//
//  ImagePreviewViewController.h
//  Convoy
//
//  Created by NKO on 15/3/18.
//
//

#import <Cordova/CDVViewController.h>
#import <Foundation/Foundation.h>

@interface ImagePreviewViewController : UIViewController
@property (weak, nonatomic) IBOutlet UIImageView *imageView;
@property (strong, nonatomic) IBOutlet UIPinchGestureRecognizer *pichRecognizer;
@property (strong, nonatomic) IBOutlet UIRotationGestureRecognizer *rotationRecongnizer;
@property (strong, nonatomic) IBOutlet UIPanGestureRecognizer *panRecongnizer;
@property (strong, nonatomic) IBOutlet UITapGestureRecognizer *tapRecongnizer;

@end
