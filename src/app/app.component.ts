import { Component, OnInit, ViewChild } from '@angular/core';
import { XyzService } from './services/abc.services';
import { response } from 'express';
@Component({

  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  listData: any;
  // title = 'chi';
  // dataName:any
  // dataTuoi:any
  // data:any
  // listData: any;
  // totalnumber:any
  // id!:any
  // page:number=0
  // limit:number=3
  // pages:any[]=[]
  dataName: any
  dataTuoi: any
  data: any
  page: number = 0
  limit: number = 3
  totalNumber!: number
  pages: any[] = []
  searchData1: any
  id!: any;

  constructor(private demoService: XyzService) {
  }
  ngOnInit(): void {
    this.handleget()
    this.handlegetpaginate({ page: this.page, limit: this.limit })
  }
  handleget() {
    this.demoService.getData().subscribe((response) => {
      console.log(response);

      this.listData = response
      this.totalNumber = Math.ceil(response.length / this.limit)
      this.pages = Array.from({ length: this.totalNumber }, (_, i) => i + 1)
    })
  }
  handlegetpaginate(data: any) {
    this.demoService.paginate(data).subscribe((response) => {
      console.log(response);

      this.listData = response
    })
  }
  saveData() {
    console.log(this.id);
    
    if (this.id == undefined) {
      this.demoService.luu({ name: this.dataName, age: this.dataTuoi }).subscribe((response) => {
        console.log(response);

        this.handleget()
        this.dataName = ''
        this.dataTuoi = 0
      });
    }
    else {
      this.demoService.sua({ name: this.dataName, id: this.id, age: this.dataTuoi }).subscribe((response) => {
        console.log(response);

        this.handleget()
        this.dataName = '';
        this.dataTuoi = 0;
        this.id = undefined;
      })
    }
  }


  xoadulieu(id: number) {
    this.demoService.xoa(id).subscribe((response) => {
      console.log(response);

      this.handleget()
    })
  }
  chinhsua(data: any) {
    this.id= data.id
    
    this.dataName = data.name
    this.dataTuoi = data.age
  }

  changePage(i: any) {
    this.page = i
    this.handlegetpaginate({ page: this.page, limit: this.limit })

  }
  handgetsearch() {
    this.demoService.tim({ search: this.searchData1 }).subscribe((response) => {
      console.log(response);

      this.listData = response
    })
  }
  search() {
    this.handgetsearch()
  }
}





