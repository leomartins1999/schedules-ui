import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

export const SUCCESS_STATE = "SUCCESS"
export const LOADING_STATE = "LOADING"
export const ERROR_STATE = "ERROR"

const ERROR_MESSAGE = "An error has occurred!"

export function SuccessState(value) {
    return { status: SUCCESS_STATE, value }
}

export function LoadingState() {
    return { status: LOADING_STATE }
}

export function ErrorState() {
    return { status: ERROR_STATE }
}

export function renderStatefulContent(statefulContent, onSuccess) {
    switch (statefulContent.status) {
        case ERROR_STATE: return <Alert variant="danger">{ERROR_MESSAGE}</Alert>;
        case LOADING_STATE: return <Spinner animation="border" />
        default: return onSuccess(statefulContent.value);
    }
}
