import { Component, OnInit } from '@angular/core';
import { Race } from '../../interfaces/race';
import { CustomUser } from '../../interfaces/customUser';
import { FirestoreService } from '../../core/services/firebase/firestore.service';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from '../../core/services/loader.service';
import { LegendPosition } from '@swimlane/ngx-charts';
import { BarVerticalChart } from '../../interfaces/chartData';


@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  races!: Race[];
  users!: CustomUser[];

  chartData!: BarVerticalChart[];
  view: any = [200, 200];
  groupPadding: number = 30;
  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  showLegend: boolean = true;
  legendPosition: LegendPosition = LegendPosition.Below;
  showXAxisLabel: boolean = false;
  yAxisLabel: string = '';
  showYAxisLabel: boolean = false;
  xAxisLabel = 'Position';
  colorScheme = {
    domain: ['gold', 'silver', 'coral']
  };
  schemeType: any = 'linear';

  constructor (
    private firestoreService: FirestoreService,
    private activatedRoute: ActivatedRoute,
    public loaderService: LoaderService
  ) { }

  ngOnInit (): void {
    this.loaderService.show();
    this.firestoreService.getRaces().subscribe((races) => {
      this.races = races;
      this.firestoreService.getUsersStream().subscribe((users) => {
        this.loaderService.hide();
        this.users = users;
        this.generateData();
      });
    });
  }

  generateData () {
    this.chartData = [];
    this.users.forEach((user: CustomUser) => {
      this.chartData.push({ name: 'FIRST', series: [{ name: this.getUserById(user.id), value: user.first }] });
      this.chartData.push({ name: 'SECOND', series: [{ name: this.getUserById(user.id), value: user.second }] });
      this.chartData.push({ name: 'THIRD', series: [{ name: this.getUserById(user.id), value: user.third }] });
    });
  }

  getUserById (uid: string): string {
    const user = this.users.find(user => user.id === uid);
    return user ? user.name : 'Not found';
  }

}
