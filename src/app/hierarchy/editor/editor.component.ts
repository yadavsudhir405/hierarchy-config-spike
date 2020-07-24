import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Property} from './propery.interface';

interface Hierarchy {
  id: number;
  parentId: number;

}

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  rootPropertyGroup: FormControl;
  unassignedProperties: Property[];
  unassignedHierarchy: Hierarchy[];

  constructor() {
    this.rootPropertyGroup = new FormControl('', []);
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
}
