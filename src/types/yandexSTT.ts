export interface IYandexSTTResponse {
    chunks: {
        alternatives: {
            text: string
        }[]
        final: boolean
        endOfUtterance: boolean
    }[]
}
