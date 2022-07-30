import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'WabiChallenge';
  data = [
    {
      name: 'Bebidas',
      id: 1,
      parentId: null,
    },
    {
      name: 'Comidas',
      id: 2,
      parentId: null,
    },
    {
      name: 'Limpieza',
      id: 3,
      parentId: null,
    },
    {
      name: 'Gaseosas',
      id: 100,
      parentId: 1,
    },
    {
      name: 'Con Alcohol',
      id: 1010,
      parentId: 100,
    },
    {
      name: 'Sin Alcohol',
      id: 1009,
      parentId: 100,
    },
    {
      name: 'Con Azúcar',
      id: 101,
      parentId: 1009,
    },
    {
      name: 'Sin Azucar',
      id: 103,
      parentId: 1009,
    },
    {
      name: 'Jugos',
      id: 189,
      parentId: 103,
    },
    {
      name: 'Energizantes',
      id: 1222,
      parentId: 103,
    },
    {
      name: 'Fruta',
      id: 1223,
      parentId: 1222,
    },
    {
      name: 'Sin grasa',
      id: 12231231,
      parentId: 1223,
    },
  ];
  parents: any;
  sons: any;
  sanitizedData: any;
  loaded: boolean = false;
  constructor() {}

  ngOnInit(): void {
    this.getParentsAndSons();
  }

  getParentsAndSons() {
    this.parents = this.data.filter((x) => x.parentId == null);
    this.sons = this.data.filter((x) => x.parentId);
    console.log('parents: ', this.parents);
    console.log('sons: ', this.sons);
    this.sanitizedData = this.parents;
    this.sanitizedData.length > 0 &&
      this.sanitizedData.forEach((element: { sons: Array<any>; id: any }) => {
        element.sons = this.sons.filter(
          (x: { parentId: any }) => x.parentId == element.id
        );
        element.sons.length > 0 && this.iterate(element.sons);
      });
    this.loaded = true;
    console.log('sanitizedData: ', this.sanitizedData);
  }

  iterate(sanitizedData: any) {
    sanitizedData.forEach((element: { sons: Array<any>; id: any }) => {
      element.sons = this.sons.filter(
        (x: { parentId: any }) => x.parentId == element.id
      );
      element.sons?.length > 0 && this.iterate(element.sons);
    });
  }
}
