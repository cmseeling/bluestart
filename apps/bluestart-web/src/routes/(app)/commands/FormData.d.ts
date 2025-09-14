export type FormData = {
	id?: string;
	name?: string;
	day?: number;
	time?: string;
	thresholdType?: 'above' | 'below';
	externalTemp?: number;
	hvacTemp?: number | null;
	defrost?: boolean;
	heatedSeats?: boolean;
};
