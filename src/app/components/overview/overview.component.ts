import { Component, OnInit } from '@angular/core';
import { Race } from '../../interfaces/race';
import { CustomUser } from '../../interfaces/customUser';
import { FirestoreService } from '../../core/services/firebase/firestore.service';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from '../../core/services/loader.service';
import { LegendPosition } from '@swimlane/ngx-charts';
import { BarVerticalChartData, PieChartData } from '../../interfaces/chartData';


@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  races!: Race[];
  users!: CustomUser[];

  verticalChartData!: BarVerticalChartData[];
  pieChartData!: PieChartData[];
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
    domain: ['gold', 'silver', 'coral', '#84c9d2']
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
        this.generateVerticalChartData();
        this.generatePieChartData();
      });
    });
  }

  generateVerticalChartData () {
    this.verticalChartData = [];
    this.users.forEach((user: CustomUser) => {
      this.verticalChartData.push({ name: 'FIRST', series: [{ name: this.getUserById(user.id), value: user.first }] });
      this.verticalChartData.push(
        { name: 'SECOND', series: [{ name: this.getUserById(user.id), value: user.second }] });
      this.verticalChartData.push({ name: 'THIRD', series: [{ name: this.getUserById(user.id), value: user.third }] });
    });
  }

  generatePieChartData () {
    this.pieChartData = [];
    this.users.forEach((user: CustomUser) => {
      this.pieChartData.push({ name: user.name, value: user.first, extra: { code: 'es' } });
    });
  }

  getUserById (uid: string): string {
    const user = this.users.find(user => user.id === uid);
    return user ? user.name : 'Not found';
  }

}
