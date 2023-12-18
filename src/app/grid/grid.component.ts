import { query } from '@angular/animations';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GridService } from '../services/grid.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent {
  @Input()
  columns:any[] = []

  @Input()
  gridData:any[] = []


  
  @Output()
  filter:EventEmitter<any> = new EventEmitter<any>()

  showFilter:boolean = false;


  @Input()
  paginate:any={};

  @Output()
  onPaginate:EventEmitter<any> = new EventEmitter<any>()

  constructor(private _grid: GridService){}

  ngOnChanges(){
   
  }

  onFilter(){
    let query:any = {}
    this.columns.forEach(element => {
      query[element.key] = element.filterValue;
    });
    this.filter.emit(query);
  }

  onSort(col){
    if(!col.sort || col.sort === 'dsc') col.sort = 'asc';
    else col.sort = 'dsc';
    this._grid.sortTable(this.gridData, col.key, col.sort);
  }

  paginatePrevPage(){
    if(this.paginate.currentPage > 1) this.paginate.currentPage--
    this.onPaginate.emit(this.paginate)
  }

  paginateNextPage(){
    if(this.paginate.currentPage < this.paginate.totalPage) this.paginate.currentPage++
    this.onPaginate.emit(this.paginate)
  }

  paginateNumberOfItemPerPage(){
    this.onPaginate.emit(this.paginate)
  }
}
