import { Component } from '@angular/core';
import { GridService } from './services/grid.service';


interface columnsInterface{
    key: string,
    label:string,
    filterValue:string,
    sort: 'asc' | 'desc' | ''
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'demo-16';
  albumData:any[];
  albumGridData:any[] = [];
  columns:columnsInterface[] = [
    {
      key:'id',
      label:"Id",
      filterValue:"",
      sort:""
    },
    {
      key:'userId',
      label:"User Id",
      filterValue:"",
      sort:""
    },
    {
      key:'title',
      label:"Tile",
      filterValue:"",
      sort:""
    }
  ]

  //Pagination
  paginateUser={
      itemsPerPage: 5,
      totalPage: 0,
      totalItem: 0,
      currentPage:1
  }
  constructor(private _grid:GridService){}

  ngOnInit(){
    this._grid.getAlbums().subscribe((data:any)=>{
        this.albumData = [...data];
        this.albumGridData = this._grid.paginateGrid(this.albumData,this.paginateUser)
        //this.paginateUserGrid()
    })
  }
  onFilterUser(e){
    let albumGridData = [...this._grid.filterGrid(this.albumGridData, this.albumData, e)]
    this.paginateUser = { itemsPerPage: 5,
      totalPage: 0,
      totalItem: 0,
      currentPage:1}
    this.albumGridData = this._grid.paginateGrid(albumGridData,this.paginateUser)
  }

  paginateUserGrid(){
    let isFilterValue = this.columns.every(item=> !item.filterValue)
    console.log(isFilterValue)
    if(isFilterValue) this.albumGridData = this._grid.paginateGrid(this.albumData,this.paginateUser)
    else  this.albumGridData = this._grid.paginateGrid(this.albumGridData,this.paginateUser)
    console.log(this.paginateUser)
  }
}
