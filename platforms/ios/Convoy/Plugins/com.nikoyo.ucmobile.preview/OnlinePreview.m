 //
//  CDVPlugin+OnlinePreview.m
//  Convoy
//
//  Created by NKO on 15/3/18.
//
//

#import "OnlinePreview.h"
#import "Cordova/CDVViewController.h"
#import "ReaderViewController.h"
@interface OnlinePreview () <ReaderViewControllerDelegate>
@end

@implementation OnlinePreview: CDVPlugin

ReaderViewController *readerViewController;

- (void)previewPDF:(CDVInvokedUrlCommand*)command {
    CDVPluginResult* pluginResult = nil;
    NSString* uri = [command.arguments objectAtIndex:0];
//    uri = @"http://dl.wenku.baidu.com/wenku11/%2Fb956bddd331563ec30704c4e4a177838?sign=MBOT:y1jXjmMD4FchJHFHIGN4z:8xdOhUd%2BtivTYXyycD1%2FREfB7eU%3D&time=1427450337&response-content-disposition=attachment;%20filename=%22%D3%C3%CA%B2%C3%B4%C8%ED%BC%FE%BF%C9%D2%D4%D0%DE%B8%C4PDF%CE%C4%BC%FE.pdf%22&response-content-type=application%2foctet-stream";
    NSString* format = [command.arguments objectAtIndex:1];
    NSLog(@"argument1: %@,argument2: %@",uri,format);
    NSData* pdfData = [self uploadData:uri];
    if (pdfData == nil) {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];
    }else{
        [self showPDFVieData:pdfData];
//        [self showPDFView];
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    }

//    [self showPDFView];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)previewIMG:(CDVInvokedUrlCommand*)command {
    NSString* uri = [command.arguments objectAtIndex:0];
    NSString* format = [command.arguments objectAtIndex:1];
    NSLog(@"argument1: %@,argument2: %@",uri,format);
    NSLog(@"i'am debuging");
    ImagePreviewViewController* controller =  [[ImagePreviewViewController alloc] init];
    
    NSData* imageData = [self uploadData:uri];
    UIImage* image = [[UIImage alloc] initWithData:imageData];
        NSLog(@"fram-y: %@",image);
//    controller.imageView.image = image;
    [[self viewController] presentViewController:controller animated:true completion:^{
        controller.imageView.image = image;
    }];
}

- (void)previewTIF:(CDVInvokedUrlCommand*)command {
    NSString* uri = [command.arguments objectAtIndex:0];
    NSString* format = [command.arguments objectAtIndex:1];
    NSLog(@"argument1: %@,argument2: %@",uri,format);
}


- (NSData*) uploadData:(NSString*)serverUri {
//    NSString *urlAsString = @"http://files.cnblogs.com/zhuqil/UIWebViewDemo.zip";
    NSURL    *url = [NSURL URLWithString:serverUri];
    NSURLRequest *request = [NSURLRequest requestWithURL:url];
    NSError *error = nil;
    NSData   *data = [NSURLConnection sendSynchronousRequest:request
                                           returningResponse:nil
                                                       error:&error];
    /* 下载的数据 */
    return data;
}
- (void) showPDFView {
    NSString *phrase = nil; // Document password (for unlocking most encrypted PDF files)
    
    NSArray *pdfs = [[NSBundle mainBundle] pathsForResourcesOfType:@"pdf" inDirectory:nil];

    NSString *filePath = [pdfs lastObject]; assert(filePath != nil); // Path to last PDF file

    NSData *pdfdata = [[NSData alloc] initWithContentsOfFile:filePath];
    
    ReaderDocument *document = [ReaderDocument withDocumentFileData:pdfdata password:phrase];
    
    if (document != nil) // Must have a valid ReaderDocument object in order to proceed
    {
        readerViewController = [[ReaderViewController alloc] initWithReaderDocument:document];
        
        readerViewController.delegate = self; // Set the ReaderViewController delegate to self
        
        [self.viewController presentViewController:readerViewController animated:false completion:nil];
    }

}

- (void) showPDFVieData:(NSData*)pdfdata {
    NSString *phrase = nil; // Document password (for unlocking most encrypted PDF files)
//
//    NSArray *pdfs = [[NSBundle mainBundle] pathsForResourcesOfType:@"pdf" inDirectory:nil];
//    
//    NSString *filePath = [pdfs lastObject]; assert(filePath != nil); // Path to last PDF file
//    
//    NSData *pdfdata = [[NSData alloc] initWithContentsOfFile:filePath];
    
    ReaderDocument *document = [ReaderDocument withDocumentFileData:pdfdata password:phrase];
    
    if (document != nil) // Must have a valid ReaderDocument object in order to proceed
    {
        readerViewController = [[ReaderViewController alloc] initWithReaderDocument:document];
        
        readerViewController.delegate = self; // Set the ReaderViewController delegate to self
        
        [self.viewController presentViewController:readerViewController animated:false completion:nil];
    }
    
}

//struct PluginArg {
//    _unsafe_unretained NSString* uri;
//    _unsafe_unretained NSString;* format;
//};
- (void)dismissReaderViewController:(ReaderViewController *)viewController
{
    // Do nothing
    [viewController dismissViewControllerAnimated:false completion:nil];
}
@end


