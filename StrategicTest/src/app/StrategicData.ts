export interface StrategicData {
	id: number;
	creditorName: string;
	firstName: FirstName;
	lastName: LastName;
	minPaymentPercentage: number;
	balance: number;
	isChecked: boolean;
}

export enum FirstName {
	Suman = 'Suman',
}

export enum LastName {
	Tester79 = 'Tester79',
}
