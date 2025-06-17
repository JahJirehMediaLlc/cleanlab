export async function fetchJson<T=object>(name:string):Promise<T[]>{
    const response = await fetch(`http://localhost:3000/data/${name}`);

    return  await response.json();
}

export async function fetchHtml<T=object>(name:string):Promise<DocumentFragment>{
    const response = await fetch(`http://localhost:3000/data/${name}`);
     const dp = new DOMParser();

    return dp.parseFromString(await response.text(), "text/html") as unknown as DocumentFragment;
}