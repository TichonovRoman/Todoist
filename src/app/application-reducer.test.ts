import {appReducer, initialStateType, setAppErrorAC, setAppIsInitializedAC, setAppStatusAC} from './app-reducer'

let startState: initialStateType;

beforeEach(() => {
    startState = {
        error: null,
        status: 'idle',
        isInitialized: false
    }
})

test('correct error message should be set', () => {

    const endState = appReducer(startState, setAppErrorAC({error: 'some error'}))

    expect(endState.error).toBe('some error');
})

test('correct status should be set', () => {

    const endState = appReducer(startState, setAppStatusAC({status: 'loading'}))

    expect(endState.status).toBe('loading');
})

test(`the status should change correctly`, () => {

    const endState = appReducer(startState, setAppIsInitializedAC({isInitialized: true}))

    expect(endState.isInitialized).toBe(true);
})

