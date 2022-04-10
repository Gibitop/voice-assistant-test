// Enable source maps
import 'source-map-support/register'

// Enable path aliases
import 'module-alias/register'

// Other imports
import { config as loadEnv } from 'dotenv'
// @ts-ignore - No types :(
import mic from 'mic'

loadEnv()

// ENV aware imports
import { recognizeSpeech, initRecognition } from '@/lib/yandexSTT'
import { detectWakeWord } from '@/lib/wakeWordDetectinon'
import { IYandexSTTResponse } from './types/yandexSTT'
import { BuiltinKeyword, Porcupine } from '@picovoice/porcupine-node'

const micInstance = mic({
    rate: '16000',
    channels: '1',
    endian: 'little',
    bitwidth: 16,
    encoding: 'signed-integer',
    fileType: 'wav',
    debug: false,
    exitOnSilence: 0,
})

const wakeWordDetector = new Porcupine(
    process.env['PICOVOICE_KEY']!,
    [BuiltinKeyword.COMPUTER],
    [0.8],
)

let isRecognizing = false

const main = () => {
    micInstance.getAudioStream().on('data', (data: Buffer) => {
        if (isRecognizing) {
            recognizeSpeech(data)
        } else {
            detectWakeWord(
                wakeWordDetector,
                data,
                handleWakeWordDetected,
            )
        }
    })

    micInstance.start()
    console.log('Listening')
}


const handleWakeWordDetected = (data: Buffer, _wakeWordIndex: number) => {
    console.log('Wake word detected')
    isRecognizing = true
    initRecognition(handleRecognition)
}

const handleRecognition = (response: IYandexSTTResponse) => {
    const chunk = response.chunks[0]
    const bestGuess = chunk.alternatives[0].text
    console.log('Current guess:', bestGuess)
    if (chunk.final) {
        console.log('Stopped recognition')
        isRecognizing = false
        handleRecognized(bestGuess)
    }
}

const handleRecognized = (text: string) => {
    console.log('Final phrase:', text)
}


main()
