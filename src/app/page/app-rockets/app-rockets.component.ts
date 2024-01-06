import {AfterViewInit, ChangeDetectorRef, Component} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {RocketDataModel} from "../../model/rocket.model";
import {RocketService} from "../../service/http/rocket.service";
import {ToastService} from "../../service/toast.service";
import {catchError, finalize} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-app-rockets',
  templateUrl: './app-rockets.component.html',
  styleUrl: './app-rockets.component.scss'
})
export class AppRocketsComponent implements AfterViewInit {
  isLoading: boolean = false;

  dataSource: MatTableDataSource<RocketDataModel>;

  displayedColumns: string[] = ['id', 'model', 'status', 'actions'];

  constructor(private cd: ChangeDetectorRef,
              private route: Router,
              private rocketService: RocketService,
              private toastService: ToastService) {
    this.dataSource = new MatTableDataSource<RocketDataModel>([]);
  }

  ngAfterViewInit(): void {
    this.getRocketsDataFromAPI()
  }

  getRocketsDataFromAPI() {
    this.isLoading = true;

    this.rocketService.getRockets()
      .pipe(
        // @ts-ignore
        catchError((error) => {
          this.toastService.showError(error.message)
        }),
        finalize(() => {
          this.isLoading = false;
          this.cd.detectChanges();
        })
      )
      .subscribe((rockets: RocketDataModel[]) => {
        this.dataSource = new MatTableDataSource<RocketDataModel>(rockets);
      });
  }

  showDetail(data: RocketDataModel) {
    // @ts-ignore
    this.route.navigate(['rockets', data.id]);
  }


}
