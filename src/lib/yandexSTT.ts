import fs from 'fs'
import grpc from 'grpc'
import * as protoLoader from '@grpc/proto-loader'
import { IYandexSTTResponse } from '@/types/yandexSTT'

const folderId = process.env['YANDEX_CLOUD_CATALOG_ID']
const apiKey = process.env['YANDEX_CLOUD_SERVICE_ACCOUNT_KEY']

const request = {
    config: {
        specification: {
            languageCode: 'ru-RU',
            profanityFilter: false,
            model: 'general',
            partialResults: true,
            singleUtterance: true,
            audioEncoding: 'LINEAR16_PCM',
            sampleRateHertz: '16000'
        },
        folderId: folderId
    }
}

const serviceMetadata = new grpc.Metadata()
serviceMetadata.add('authorization', `Api-Key ${apiKey}`)

const packageDefinition = protoLoader.loadSync(
    'yandex/cloud/ai/stt/v2/stt_service.proto',
    {
        includeDirs: [
            'node_modules/google-proto-files',
            'grpc/yandexCloud'
        ],
    },
)
const packageObject = grpc.loadPackageDefinition(packageDefinition)

// @ts-ignore
const serviceConstructor = packageObject.yandex.cloud.ai.stt.v2.SttService
const grpcCredentials = grpc.credentials.createSsl(
    fs.readFileSync('grpc/yandexCloud.pem')
)

let call: any | null = null

export const initRecognition = (
    responseCallback: (res: IYandexSTTResponse) => void
) => {
    // Connect to the server
    const service = new serviceConstructor('stt.api.cloud.yandex.net:443', grpcCredentials)
    call = service['StreamingRecognize'](serviceMetadata)

    // Send audio config request
    call.write(request)
    call.on('data', responseCallback)
}

export const recognizeSpeech = (audioBuffer: Buffer) => {
    // Send audio data request
    call.write({ audioContent: audioBuffer })
}
