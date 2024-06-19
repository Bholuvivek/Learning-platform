import {Router as RemixRouter } from '@remix-run/router';

export type config = {
    projectName:string,
    defaultRoutes: string,
    router:RemixRouter
}