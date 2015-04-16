//
//  SingleImage.h
//  HelloCordova
//
//  Created by NKO on 15/4/10.
//
//

#import <Foundation/Foundation.h>
typedef void (^changeImageblock)(int imgIndex);
@interface SingleImage : NSObject
@property (nonatomic, retain) NSMutableArray *imageData;
@property (nonatomic,copy) changeImageblock changeImageblock;
+ (SingleImage*)sharedInstance;
@end
