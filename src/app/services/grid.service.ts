import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GridService {
  
  constructor(private _http:HttpClient) { }

  getAlbums(){
    return this._http.get('https://jsonplaceholder.typicode.com/albums')
  }

  //FilterData
  filterGrid(filteredArr:any[], dataArr:any[], query:any){
    filteredArr = [...dataArr]
    for(let key in query){
      let keyVal = query[key].toString().toLowerCase();
      filteredArr = filteredArr.filter((el:any)=> el[key].toString().toLowerCase().includes(keyVal))
    }
    return filteredArr
  }

  //sorting
  sortTable(filteredArr:any[],sortBy:string,sortType:string){
    if(sortType === 'asc') filteredArr = filteredArr.sort(this.sortByPropertyAsc(sortBy))
    else if(sortType === 'dsc') filteredArr = filteredArr.sort(this.sortByPropertyDsc(sortBy))
  }

  private sortByPropertyAsc(property){  
    return function(a,b){  
      if(a[property] > b[property])  
          return 1;  
      else if(a[property] < b[property])  
          return -1;  

      return 0;  
    }  
  }

  private sortByPropertyDsc(property){  
    return function(a,b){  
      if(a[property] < b[property])  
          return 1;  
      else if(a[property] > b[property])  
          return -1;  
  
      return 0;  
    }
  }

  //Pagination
  paginateGrid(dataArr:any[], paginateDtl){
    paginateDtl.totalPage =  Math.ceil(dataArr.length / paginateDtl.itemsPerPage) || 1;
    paginateDtl.totalItem = dataArr.length
    paginateDtl.offSet =  paginateDtl.itemsPerPage  * (paginateDtl.currentPage - 1);
    let from = ((paginateDtl.currentPage * paginateDtl.itemsPerPage) + 1) - paginateDtl.itemsPerPage;
    let to = paginateDtl.currentPage * paginateDtl.itemsPerPage
    paginateDtl.from = from > 0 ? from : 0
    paginateDtl.to = paginateDtl.itemsPerPage >= paginateDtl.itemsPerPage ? to : paginateDtl.itemsPerPage 
    paginateDtl.currentPage = paginateDtl.currentPage > paginateDtl.totalPage ? paginateDtl.totalPage : paginateDtl.currentPage 
    return dataArr.slice(paginateDtl.offSet, paginateDtl.itemsPerPage * paginateDtl.currentPage)
  }
}
