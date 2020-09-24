import { Component } from '@angular/core';
import { IStrategicData } from './StrategicData';
import { StrategicData } from './StrategicData';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'StrategicTest';
	data: IStrategicData[];
	total: number;
	totalRowCount: number;
	totalCheckRowCount: number;
	toggleChecked: boolean;

	async getStrategicData(): Promise<IStrategicData[]> {
		const data = await fetch('https://raw.githubusercontent.com/StrategicFS/Recruitment/master/data.json');
		const jsonData = await data.json();

		this.data = (jsonData as IStrategicData[])
			.map(d => {
				d.minPaymentPercentage = d.minPaymentPercentage / 100;

				return d;
			});

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

		this.updateTotalBalance();
	}

	updateTotalRowCount() {
		this.totalRowCount = this.data.length;
	}

	updateTotalBalance() {
		this.total = this.data.filter(d => d.isChecked).map(d => d.balance).reduce((a, b) => a + b, 0);
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

	addDebt() {
		const newRow = new StrategicData();

		newRow.balance = 0;
		newRow.minPaymentPercentage = 0;

		this.data.push(newRow);
	}
}
