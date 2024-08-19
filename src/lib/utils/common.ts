import { format } from '@formkit/tempo';

export function runEverySeconds(fn: () => void, interval: number): void {
	setInterval(fn, interval * 1000); // interval is in seconds, converted to milliseconds
}

export function formatDateStandard(date: Date, tz: string | undefined) {
	if (date) {
		let options = {
			date: date,
			format: 'hh:mm:ss A MM/DD/YYYY',
			locale: 'en',
			tz: tz
		};

		return format(options);
	}
}

export function roundTo2Decimals(num: number | string) {
	if (typeof num === 'string') {
		num = parseFloat(num);
	}
	return Math.round(num * 100) / 100;
}

export function isBreakTime(currentTime: Date) {
	// Define break time start and end
	const breakStart = new Date();
	breakStart.setHours(12, 0, 0, 0);

	const breakEnd = new Date();
	breakEnd.setHours(13, 0, 0, 0);

	// Check if current time is during break time
	if (breakStart.getTime() <= currentTime.getTime() && currentTime.getTime() < breakEnd.getTime()) {
		return true;
	} else {
		return false;
	}
}

export function checkIfHalfPercentage(timeUsed: string, originalETAHours: string) {
	const timePercentage = (parseFloat(timeUsed) / parseFloat(originalETAHours)) * 100;

	console.log('test time percentage', timePercentage);

	if (timePercentage >= 50) {
		return true;
	}
	return false;
}
