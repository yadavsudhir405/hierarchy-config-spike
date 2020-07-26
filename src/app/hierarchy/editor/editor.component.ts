import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Property} from './propery.interface';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {MatMenuTrigger} from '@angular/material/menu';
import {CdkNestedTreeNode, CdkTree, NestedTreeControl} from '@angular/cdk/tree';
import {PropertyGroup} from './property-group.interface';
import {BehaviorSubject} from 'rxjs';


@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  rootPropertyGroup: FormControl;
  unassignedProperties: Property[];
  assignedProperties: Property[];

  contextMenuPosition = { x: '0px', y: '0px' };
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;

  @ViewChild(CdkTree) cdkTree: CdkTree<PropertyGroup>;

  hierarchyData: PropertyGroup[] = [];

  dataSubject = new BehaviorSubject<PropertyGroup[]>(this.hierarchyData);
  treeControl = new NestedTreeControl<PropertyGroup> (node => node.children);
  dataSource$ = this.dataSubject.asObservable();

  hasChild = (_: number, node: PropertyGroup) => !!node.children && node.children.length > 0;

  constructor() {
    this.rootPropertyGroup = new FormControl('', []);
    this.assignedProperties = [];
  }

  ngOnInit(): void {
    this.initializedUnAssignedProperties();
  }

  private initializedUnAssignedProperties() {
    this.unassignedProperties = [
      {
        id: 1,
        name: 'Property1'
      },
      {
        id: 2,
        name: 'Property2'
      },
      {
        id: 3,
        name: 'Property3'
      },
      {
        id: 4,
        name: 'Property4'
      },
      {
        id: 5,
        name: 'Property5'
      }
    ];
  }

  drop(event: CdkDragDrop<Property[]>) {
    if (event.previousContainer === event.container){
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      if (event.container.id === 'assignedGroup'){
        this.addPropertyGroup(event.container.data[event.currentIndex]);
      }else{
        this.removePropertyGroup(event.container.data[event.currentIndex]);
      }
    }
  }

  openMenu1(event: MouseEvent) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.openMenu();
  }

  addPropertyGroup(item: Property) {
    this.hierarchyData.push({
      name: item ? item.name : 'New PropertyGroup',
      children: [
      ]
    });
    this.dataSubject.next(this.hierarchyData);
  }

  private removePropertyGroup(property: Property) {
    this.hierarchyData = this.hierarchyData.filter(p => p.name !== property.name);
    this.dataSubject.next(this.hierarchyData);
  }

  addNewItem(node: PropertyGroup) {
    node.children.push(this.newPropertyGroup('New'));
    this.dataSubject.next([]);
    this.dataSubject.next(Array.from(this.hierarchyData));
    this.treeControl.expand(node);

  }

  private newPropertyGroup(name: string, children: PropertyGroup[]= []): PropertyGroup {
    return {
      name,
      children
    };
  }
}
