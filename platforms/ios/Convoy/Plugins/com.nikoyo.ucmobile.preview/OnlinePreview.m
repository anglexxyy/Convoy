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
#import "SingleImage.h"
#import "SingleImageViewController.h"
@interface OnlinePreview () <ReaderViewControllerDelegate>
@end

@implementation OnlinePreview: CDVPlugin

ReaderViewController *readerViewController;

CDVPluginResult* pluginResult;

- (void)previewPDF:(CDVInvokedUrlCommand*)command {
    NSString* filePath = [command.arguments objectAtIndex:0];
    NSString* format = [command.arguments objectAtIndex:1];
    if ([filePath   hasPrefix:@"file://"]){
        filePath = [filePath stringByReplacingOccurrencesOfString:@"file://" withString:@""];
    }
    NSLog(@"filePath: %@,format: %@",filePath,format);
    
    NSString *phrase = nil; // Document password (for unlocking most encrypted PDF files)
    
//    NSArray *pdfs = [[NSBundle mainBundle] pathsForResourcesOfType:@"pdf" inDirectory:nil];
    
    assert(filePath != nil); // Path to first PDF file
    
    ReaderDocument *document = [ReaderDocument withDocumentFilePath:filePath password:phrase];
    
    if (document != nil) // Must have a valid ReaderDocument object in order to proceed with things
    {
        ReaderViewController *readerViewController = [[ReaderViewController alloc] initWithReaderDocument:document];
        
        readerViewController.delegate = self; // Set the ReaderViewController delegate to self
        
        [self.viewController presentViewController:readerViewController animated:true completion:nil];
        
    }
    else // Log an error so that we know that something went wrong
    {
        NSLog(@"%s [ReaderDocument withDocumentFilePath:'%@' password:'%@'] failed.", __FUNCTION__, filePath, phrase);
    }
    
}

- (void)previewIMG:(CDVInvokedUrlCommand*)command {
    NSString* filePath = [command.arguments objectAtIndex:0];
//    filePath = @"file:///Users/nko/Library/Developer/CoreSimulator/Devices/0B3A5A44-83D3-42B8-87D3-214F6ACA7AA0/data/Containers/Data/Application/E3C55664-560C-4B2E-909A-28B8363C14EC/Documents/75cb79b9-47b7-44c1-a019-10a683b34cb9/75cb79b9-47b7-44c1-a019-10a683b34cb9.jpg";
    if ([filePath   hasPrefix:@"file://"]){
        filePath = [filePath stringByReplacingOccurrencesOfString:@"file://" withString:@""];
    }
    NSString* format = [command.arguments objectAtIndex:1];
    NSLog(@"filePath: %@,format: %@",filePath,format);
    
    SingleImage *imageSingle = [SingleImage sharedInstance];
    imageSingle.imageData = [[NSMutableArray alloc] init];
    UIImage *image = [UIImage imageWithContentsOfFile:filePath];
    [imageSingle.imageData addObject:image];
    
    UIStoryboard *secondStoryboard = [UIStoryboard storyboardWithName:@"ImagesPreview" bundle:nil];
    [self.viewController presentViewController:secondStoryboard.instantiateInitialViewController animated:YES completion:nil];
}

- (void)previewTIF:(CDVInvokedUrlCommand*)command {
    NSString* filePath = [command.arguments objectAtIndex:0];
    if ([filePath   hasPrefix:@"file://"]){
        filePath = [filePath stringByReplacingOccurrencesOfString:@"file://" withString:@""];
    }
    NSString* countString = [command.arguments objectAtIndex:1];
    int count = [countString intValue];
    SingleImage *imageSingle = [SingleImage sharedInstance];
    imageSingle.imageData = [[NSMutableArray alloc] init];
    for (int i=0; i<count; i++) {
        NSString *imagePath = [filePath stringByAppendingFormat:@"%d.tif",i];
        UIImage *image = [UIImage imageWithContentsOfFile:imagePath];
        [imageSingle.imageData addObject:image];
    }
    UIStoryboard *secondStoryboard = [UIStoryboard storyboardWithName:@"ImagesPreview" bundle:nil];
    [self.viewController presentViewController:secondStoryboard.instantiateInitialViewController animated:YES completion:nil];
    NSLog(@"filePath: %@,format: %d",filePath,count);
}

- (void)dismissReaderViewController:(ReaderViewController *)viewController
{
    // Do nothing
    [viewController dismissViewControllerAnimated:false completion:nil];
}
@end


