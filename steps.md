1. `npm init` in app dir
<!-- 2. `npm install --save-dev electron` -->
<!-- 3. package.json 
   {
    "scripts": {
        "start": "electron ."
        }
    } -->
2. `npm install -g electron`
        installs globally on pc

3. `npm link electron`
        uses global package, locally

4. `npm install --save-dev @types/electron`
        install Types for electron

5. create tsconfig.json
      1. { 
                "compilerOptions": {
                    "target": "es5",
                    "module": "commonjs",
                    "moduleResolution": "node",
                    "sourceMap": true,
                    "emitDecoratorMetadata": true,
                    "experimentalDecorators": true,
                    "removeComments": false,
                    "noImplicitAny": false,
                    "suppressImplicitAnyIndexErrors": true 
                },
                "exclude": [ "node_modules" ] 
          }

6. replace the Electron shell file (`index.js`) with typescript class - (`electron-main.ts`)
7. add to `package.json`:
   1. "build": "./node_modules/.bin/tsc",
   2. "test": "echo \"Error: no test specified\" && exit 1"