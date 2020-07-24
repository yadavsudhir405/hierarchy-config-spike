import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Property} from './propery.interface';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  rootPropertyGroup: FormControl;
  unassignedProperties: Property[];
  assignedProperties: Property[];

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
    }
  }
}
