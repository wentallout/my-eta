export function createTimeDateTracker() {
	let timeDate: Date = $state(new Date());

	return {
		get timeDate() {
			return timeDate;
		},
		set timeDate(newTime) {
			timeDate = newTime;
		}
	};
}

export const timeDateTracker = createTimeDateTracker();
