import { format } from '@formkit/tempo';

export function runEverySeconds(fn: () => void, interval: number): void {
	setInterval(fn, interval * 1000); // interval is in seconds, converted to milliseconds
}

export function formatDateStandard(date: Date, tz: string | undefined) {
	if (date) {
		let options = {
			date: date,
			format: 'hh:mm:ss MM/DD/YYYY',
			locale: 'en',
			tz: tz
		};

		return format(options);
	}
}
