import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {RocketDataModel} from "./model/rocket.model";
import {RocketService} from "./service/http/rocket.service";
import {catchError, finalize} from "rxjs";
import {ToastService} from "./service/toast.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent  {

}
