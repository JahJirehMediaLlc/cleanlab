import {Dimensions, Animator, dim} from '../../src-dom/domutils.ts';
import {TemplatePlus} from "../../src-dom/domutils.ts";
import {ServiceWorkerClient,} from "../../src-page-mvc/sw/sw-lib.ts";

export * from '../../src-web-comps/web_components.ts';

class WelcomeView{}
class WelcomeController{}
export class Welcome{}

const sw = new ServiceWorkerClient();

console.log("welcome.ts module loaded...");