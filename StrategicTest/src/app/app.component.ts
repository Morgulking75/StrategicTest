import { Component } from '@angular/core';
import { StrategicData } from './StrategicData';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'StrategicTest';
	data: StrategicData[];
	total: number;
	totalRowCount: number;
	totalCheckRowCount: number;
	toggleChecked: boolean;

	async getStrategicData(): Promise<StrategicData[]> {
		const data = await fetch('https://raw.githubusercontent.com/StrategicFS/Recruitment/master/data.json');
		const jsonData = await data.json();

		this.data = (jsonData as StrategicData[]);
		this.updateCheckCount();
		this.updateTotalRowCount();
		this.updateTotalBalance();

		return this.data;
	}

	ngOnInit() {
		this.getStrategicData();
	}

	updateCheckCount() {
		this.totalCheckRowCount = this.data.map(d => d.isChecked).reduce((a, b) => a + (b ? 1 : 0), 0);

		this.toggleChecked = this.totalCheckRowCount === this.totalRowCount;
	}

	updateTotalRowCount() {
		this.totalRowCount = this.data.length;
	}

	updateTotalBalance() {
		this.total = this.data.map(d => d.balance).reduce((a, b) => a + b, 0);
	}

	removeRows() {
		this.data = this.data.filter(d => !d.isChecked);
		this.updateCheckCount();
		this.updateTotalRowCount();
		this.updateTotalBalance();
	}

	toggleAll() {
		this.toggleChecked = !this.toggleChecked;
		this.data.forEach(d => d.isChecked = this.toggleChecked);

		this.updateCheckCount();
	}
}
