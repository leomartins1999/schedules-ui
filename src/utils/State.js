export function SuccessState(value) {
    return { status: "SUCCESS", value }
}

export function LoadingState() {
    return { status: "LOADING" }
}

export function ErrorState() {
    return { status: "ERROR" }
}
