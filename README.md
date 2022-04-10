# Speech to text test

An experiment with realtime speech recognition
using [Picovoice Porcupine](https://picovoice.ai/platform/porcupine/)
for wake word detection and
[Yandex SpeechKit](https://cloud.yandex.com/en-ru/services/speechkit)
for actual speech to text.

The project is in the state "it works, but needs refactoring",
so the structure is kinda inconvenient and should be reimplemented
if this project is to be used as a part of a larger system.

By default it is expecting a wake word `Computer`, then
the speech in russian. You can change the language that the
STT engine is expecting in its configuration.

Wake word detection does not require an internet connection,
but the actual speech recognition does.

## Prerequisites:

### Install [SoX](http://sox.sourceforge.net/) (MacOS / Windows) or [alsa](alsa-project.org) (Linux)
*And it make sure it is available in your `$PATH`.*

#### For Linux
```bash
sudo apt-get install alsa-base alsa-utils
```

#### For MacOS
``` bash
brew install sox
```

#### For Windows
[Download the binaries](http://sourceforge.net/projects/sox/files/latest/download)



### Clone this repository with submodules:
```bash
git clone --recurse-submodules [this repo]
```


### Get your API keys:
You'll need a [Picovoice](https://picovoice.ai) and
a [Yandex cloud](https://cloud.yandex.com/en-ru/)
accounts. \
Then you'll need 3 tokens:
1. Your Picovoice key (get it at https://console.picovoice.ai/profile)
1. Your Yandex cloud catalog ID (get it at https://console.cloud.yandex.ru/)
1. Your Yandex cloud service account API key \
    *To get this one, you'll have to create a service account with STT permission first, 
    then add an API key to it*


### Create an environment
Create a `.env` file in the root directory and fill it
according to the [example.env](./example.env) file


### Install dependencies:
```bash
npm i
```


## Build:
```bash
npm run build
```


## Run:

### Project is prebuild:
```bash
npm run start
```

### Build and run in one command:
```bash
npm run bns
```

### Run with ts-node:
```bash
npm run ts-node
```
