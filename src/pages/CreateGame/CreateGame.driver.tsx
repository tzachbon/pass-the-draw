import { Driver, RenderResult, testUtils } from '@test-utils'
import { selectSubjectTestkit } from '@components/SelectSubject/SelectSubject.driver'
import {
	CreateGame,
	CreateGameProps,
	LOGGED_IN_MESSAGE_TEST_ID,
	OPEN_MODAL_BUTTON_TEST_ID,
	SUBJECT_ERROR_TEST_ID,
	SUBMIT_BUTTON_TEST_ID,
	SUBMIT_ERROR_TEST_ID,
} from './CreateGame'
import { authModalTestkit } from '@components/AuthModal/AuthModal.driver'

interface Params {
	props?: CreateGameProps
}

export function createGameDriver({ props }: Params = {}) {
	return new CreateGameDriver(props || {}, CreateGame)
}

export class CreateGameDriver extends Driver<CreateGameProps> {
	testkit() {
		return createGameTestkit(this.wrapper.container)
	}
}

export function createGameTestkit(container: RenderResult) {
	return {
		selectSubject: () => {
			return {
				...selectSubjectTestkit(container),
				error: () => testUtils(SUBJECT_ERROR_TEST_ID, container, { keys: [ 'text' ] }),
			}
		},
		submit: () => ({
			button: () => testUtils(SUBMIT_BUTTON_TEST_ID, container, { keys: [ 'click', 'disabled' ] }),
			error: () => testUtils(SUBMIT_ERROR_TEST_ID, container, { keys: [] }),
		}),
		login: () => ({
			message: () => testUtils(LOGGED_IN_MESSAGE_TEST_ID, container, { keys: [] }),
			modal: () => {
				const { click, ...modalUtils } = testUtils(OPEN_MODAL_BUTTON_TEST_ID, container, { keys: [ 'click' ] })

				return {
					open: click,
					...modalUtils,
					...authModalTestkit(container),
				}
			},
		}),
	}
}
