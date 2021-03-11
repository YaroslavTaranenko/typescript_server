import App from './App';

try {
    new App({
        port: 8080,
        applicationName: 'Typescript Server'
    }).run();
} catch (e: any) {
    console.log(e.message);
}