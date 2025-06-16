// prompt
export async function prompt(prompt?:string){

    console.log(prompt || "?");
    
    const buf = new Uint8Array(100);
    const _size = (await Deno.stdin.read(buf)) as number; 
    const rawtext = new TextDecoder().decode(buf);
    const text = rawtext.substring(0,_size);
    //return (text as string).toLowerCase().replace(/\r?\n|\r/,"");
    
    return text.toLowerCase().trim();
}
    