import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common'
import { FilterPipe } from '../pipe/filter.pipe';
import { SearchPipe } from '../pipe/search.pipe';

@NgModule({
    declarations: [FilterPipe, SearchPipe],
    imports: [
        CommonModule
    ],
    exports: [
        FilterPipe,
        SearchPipe
    ]
})
export class SharedPipeModule {}