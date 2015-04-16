//
//  CollectionViewController.m
//  HelloCordova
//
//  Created by NKO on 15/4/10.
//
//

#import "CollectionViewController.h"
#import "CollectionViewCell.h"
#import "SingleImageViewController.h"
#import "SingleImage.h"

@interface CollectionViewController ()
@property (weak, nonatomic) IBOutlet UICollectionView *collectionView;
@property (strong, nonatomic) SingleImage *singleImage;
@end

@implementation CollectionViewController

static NSString * const reuseIdentifier = @"Cell";

- (void)viewDidLoad {
    [self setCellSize];
    [super viewDidLoad];
    _singleImage = [SingleImage sharedInstance];
    

    
    // Uncomment the following line to preserve selection between presentations
    // self.clearsSelectionOnViewWillAppear = NO;
    
    // Register cell classes
//    [self.collectionView registerClass:[UICollectionViewCell class] forCellWithReuseIdentifier:reuseIdentifier];
    
    // Do any additional setup after loading the view.
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (IBAction)close:(id)sender {
    [self dismissViewControllerAnimated:false completion:nil];
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

#pragma mark <UICollectionViewDataSource>

- (NSInteger)numberOfSectionsInCollectionView:(UICollectionView *)collectionView {
//#warning Incomplete method implementation -- Return the number of sections
    return 1;
}


- (NSInteger)collectionView:(UICollectionView *)collectionView numberOfItemsInSection:(NSInteger)section {
//#warning Incomplete method implementation -- Return the number of items in the section
    return _singleImage.imageData.count;
}

- (UICollectionViewCell *)collectionView:(UICollectionView *)collectionView cellForItemAtIndexPath:(NSIndexPath *)indexPath {
    CollectionViewCell *cell = [collectionView dequeueReusableCellWithReuseIdentifier:reuseIdentifier forIndexPath:indexPath];
    
    // Configure the cell
    UIImage* image = _singleImage.imageData[indexPath.row];
    cell.cellImageView.image = image;
    
    return cell;
}

#pragma mark <UICollectionViewDelegate>
-(void) collectionView:(UICollectionView *)collectionView didSelectItemAtIndexPath:(NSIndexPath *)indexPath{
    if (_singleImage.changeImageblock) {
        _singleImage.changeImageblock(indexPath.row);
    }
    
    [self performSegueWithIdentifier:@"unwinToHome" sender:self];
}

/*
// Uncomment this method to specify if the specified item should be highlighted during tracking
- (BOOL)collectionView:(UICollectionView *)collectionView shouldHighlightItemAtIndexPath:(NSIndexPath *)indexPath {
	return YES;
}
*/

/*
// Uncomment this method to specify if the specified item should be selected
- (BOOL)collectionView:(UICollectionView *)collectionView shouldSelectItemAtIndexPath:(NSIndexPath *)indexPath {
    return YES;
}
*/

/*
// Uncomment these methods to specify if an action menu should be displayed for the specified item, and react to actions performed on the item
- (BOOL)collectionView:(UICollectionView *)collectionView shouldShowMenuForItemAtIndexPath:(NSIndexPath *)indexPath {
	return NO;
}

- (BOOL)collectionView:(UICollectionView *)collectionView canPerformAction:(SEL)action forItemAtIndexPath:(NSIndexPath *)indexPath withSender:(id)sender {
	return NO;
}

- (void)collectionView:(UICollectionView *)collectionView performAction:(SEL)action forItemAtIndexPath:(NSIndexPath *)indexPath withSender:(id)sender {
	
}
*/

-(BOOL) prefersStatusBarHidden {
    return true;
}

-(void) setCellSize{
    CGFloat fwidth;
    //device is Pad
    if ([UIDevice currentDevice].userInterfaceIdiom == UIUserInterfaceIdiomPad){
        // device is lateral
        NSLog(@"%d",[UIDevice currentDevice].orientation);
//        if([UIDevice currentDevice].orientation == UIUserInterfaceLayoutDirectionLeftToRight || [UIDevice currentDevice].orientation == UIUserInterfaceLayoutDirectionRightToLeft){
//            fwidth = self.view.frame.size.width / 3;
//        }
//        else{
//            fwidth = self.view.frame.size.height / 3;
//        }
        if (self.view.frame.size.width > self.view.frame.size.height) {
            fwidth = self.view.frame.size.height / 3;
        }else {
            fwidth = self.view.frame.size.width / 3;
        }
        
        
        UICollectionViewFlowLayout *flowLayout = [[UICollectionViewFlowLayout alloc] init];
        flowLayout.minimumInteritemSpacing = 8;
        flowLayout.minimumLineSpacing = 8;
        flowLayout.sectionInset = UIEdgeInsetsMake(0, 8, 0, 8);
        CGFloat iwidth = fwidth -16;
        flowLayout.itemSize = CGSizeMake(fwidth-16, iwidth*1.5);
        self.collectionView.collectionViewLayout = flowLayout;
    }
    //device is phone
    else {
        if([UIDevice currentDevice].orientation == UIUserInterfaceLayoutDirectionLeftToRight || [UIDevice currentDevice].orientation == UIUserInterfaceLayoutDirectionRightToLeft){
            fwidth = self.view.frame.size.width / 3;
        }
        else{
            fwidth = self.view.frame.size.height / 3;
        }
        UICollectionViewFlowLayout *flowLayout = [[UICollectionViewFlowLayout alloc] init];
        flowLayout.minimumInteritemSpacing = 5;
        flowLayout.minimumLineSpacing = 5;
        flowLayout.sectionInset = UIEdgeInsetsMake(0, 5, 0, 5);
        CGFloat iwidth = fwidth -16;
        flowLayout.itemSize = CGSizeMake(iwidth, iwidth*1.5);
        self.collectionView.collectionViewLayout = flowLayout;
    }
}

@end
