import { NgModule } from '@angular/core';
import { UserPipe } from './user/user';
import { ThumbnailPipe } from './thumbnail/thumbnail';
import { ReversePipe } from './reverse/reverse';
@NgModule({
	declarations: [UserPipe,
    ThumbnailPipe,
    ReversePipe],
	imports: [],
	exports: [UserPipe,
    ThumbnailPipe,
    ReversePipe]
})
export class PipesModule {

}
