//
//  SingleImage.m
//  HelloCordova
//
//  Created by NKO on 15/4/10.
//
//

#import "SingleImage.h"

@implementation SingleImage
+ (SingleImage*)sharedInstance
{
    // 1
    static SingleImage *_sharedInstance = nil;
    
    // 2
    static dispatch_once_t oncePredicate;
    
    // 3
    dispatch_once(&oncePredicate, ^{
        _sharedInstance = [[SingleImage alloc] init];
    });
    return _sharedInstance;
}

@end
