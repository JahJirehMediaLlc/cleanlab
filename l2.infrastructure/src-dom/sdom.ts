export class sdom{
  id:string;
  element:HTMLElement;
  constructor(id:string, root:ShadowRoot){
    this.id = id;
    this.element = root.querySelector(`[id=${id}`)!;
  }
}