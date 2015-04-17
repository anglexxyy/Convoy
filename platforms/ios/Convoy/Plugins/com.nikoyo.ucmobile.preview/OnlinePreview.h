//
//  CDVPlugin+OnlinePreview.h
//  Convoy
//
//  Created by NKO on 15/3/18.
//
//

#import <Cordova/CDVPlugin.h>

@interface OnlinePreview: CDVPlugin
- (void)previewPDF:(CDVInvokedUrlCommand*)command;
- (void)previewIMG:(CDVInvokedUrlCommand*)command;
- (void)previewTIF:(CDVInvokedUrlCommand*)command;
@end
