export interface IStrategicData {
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

export class StrategicData implements IStrategicData {
	id: number;
	creditorName: string;
	firstName: FirstName;
	lastName: LastName;
	minPaymentPercentage: number;
	balance: number;
	isChecked: boolean;
}
