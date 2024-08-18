import type { WorkingState } from '$lib/types/WorkingState';

export function createWorkingStateTracker() {
	let workingState: WorkingState = $state('idle');

	return {
		get workingState() {
			return workingState;
		},
		set workingState(newState: WorkingState) {
			workingState = newState;
		}
	};
}

export const workingStateTracker = createWorkingStateTracker();
