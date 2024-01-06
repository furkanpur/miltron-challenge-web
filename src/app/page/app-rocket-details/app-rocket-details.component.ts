import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {RocketDataModel} from "../../model/rocket.model";
import {catchError, finalize} from "rxjs";
import {RocketService} from "../../service/http/rocket.service";
import {ToastService} from "../../service/toast.service";
import {WeatherService} from "../../service/http/weather.service";
import {WeatherDataModel} from "../../model/weather.model";
import {TelemetryService} from "../../service/telemetry.service";
import {TelemetryDataModel} from "../../model/telemetry.model";

@Component({
  selector: 'app-app-rocket-details',
  templateUrl: './app-rocket-details.component.html',
  styleUrl: './app-rocket-details.component.scss'
})
export class AppRocketDetailsComponent implements OnInit, OnDestroy {
  isRocketLoading: boolean = false;
  isWeatherLoading: boolean = false;
  isControlLoading: boolean = false;

  rocketId: string | null;

  rocketData: RocketDataModel | undefined;
  weatherData: WeatherDataModel | undefined;

  public socket: WebSocket | undefined;

  telemetryData: TelemetryDataModel | undefined;

  constructor(private route: ActivatedRoute,
              private cd: ChangeDetectorRef,
              private rocketService: RocketService,
              private weatherService: WeatherService,
              private toastService: ToastService,
              private websocketService: TelemetryService) {
    this.rocketId = route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.getRocketDataFromAPI();
    this.getWeatherDataFromAPI();

    this.socket = new WebSocket('ws://localhost:8765');

    this.socket.onopen = () => {
      // @ts-ignore
      this.socket.send(this.rocketId!);
    };

    this.socket.onmessage = (event) => {
      this.telemetryData = JSON.parse(event.data) as TelemetryDataModel;
    }
  }

  ngOnDestroy() {
    this.socket?.close();
  }

  getRocketDataFromAPI() {
    this.isRocketLoading = true;

    this.rocketService.getRockets()
      .pipe(
        // @ts-ignore
        catchError((error) => {
          this.toastService.showError(error.message)
        }),
        finalize(() => {
          this.isRocketLoading = false;
          this.cd.detectChanges();
        })
      )
      .subscribe((rockets: RocketDataModel[]) => {
        this.rocketData = rockets.filter(item => item.id === this.rocketId)[0];
      });
  }

  getWeatherDataFromAPI() {
    this.isWeatherLoading = true;

    this.weatherService.getWeather()
      .pipe(
        // @ts-ignore
        catchError((error) => {
          this.toastService.showError(error.message)
        }),
        finalize(() => {
          this.isWeatherLoading = false;
          this.cd.detectChanges();
        })
      )
      .subscribe((weather: WeatherDataModel) => {
        this.weatherData = weather;
      });
  }

  launchRocket() {
    this.isControlLoading = true;

    this.rocketService.launchRocket(this.rocketId!)
      .pipe(
        // @ts-ignore
        catchError((error) => {
          this.toastService.showError(error.message)
        }),
        finalize(() => {
          this.isControlLoading = false;
          this.cd.detectChanges();
        })
      )
      .subscribe((data: any) => {
        this.toastService.showSuccess("Rocket launched successfully!");

        this.getRocketDataFromAPI();
        this.getWeatherDataFromAPI();
      });
  }

  deployRocket() {
    this.isControlLoading = true;

    this.rocketService.deployRocket(this.rocketId!)
      .pipe(
        // @ts-ignore
        catchError((error) => {
          this.toastService.showError(error.message)
        }),
        finalize(() => {
          this.isControlLoading = false;

          this.cd.detectChanges();
        })
      )
      .subscribe((data: any) => {
        this.toastService.showSuccess("Rocket deployed successfully!");

        this.getRocketDataFromAPI();
        this.getWeatherDataFromAPI();
      });
  }

  cancelRocket() {
    this.isControlLoading = true;

    this.rocketService.cancelRocket(this.rocketId!)
      .pipe(
        // @ts-ignore
        catchError((error) => {
          this.toastService.showError(error.message)
        }),
        finalize(() => {
          this.isControlLoading = false;

          this.cd.detectChanges();
        })
      )
      .subscribe((data: any) => {
        this.toastService.showSuccess("Rocket canceled successfully!");

        this.getRocketDataFromAPI();
        this.getWeatherDataFromAPI();
      });
  }
}
