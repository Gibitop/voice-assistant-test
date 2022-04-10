import { Porcupine } from "@picovoice/porcupine-node"

export const detectWakeWord = (
    wakeWordDetector: Porcupine,
    data: Buffer,
    onDetected: (data: Buffer, wakeWordIndex: number) => void
) => {
    const wakeWordFrameLength = wakeWordDetector.frameLength

    // Split the data buffer into smaller slices, that wake word detector expects
    for (let i = 0; i < data.length / wakeWordFrameLength; i++) {
        // Convert the buffer slice to Int16Array for wake word detector
        const arr = new Int16Array(wakeWordFrameLength)
        for (let j = 0; j < wakeWordFrameLength; j += 2) {
            const val = data.readInt16LE(wakeWordFrameLength * i + j)
            arr[j / 2] = val
        }

        const keywordIndex = wakeWordDetector.process(arr)
        if (keywordIndex !== -1) {
            onDetected(data, keywordIndex)
        }
    }
}