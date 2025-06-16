import path from 'npm:path';
//import fs from 'npm:fs';
//import _fss from "npm:fs@0.0.1-security";

/* 
function DirectoryExists(dirPath:string):Promise<boolean> 
{
const promise = new Promise((resolve, reject) => {
    // deno-lint-ignore no-explicit-any
    fs.stat(dirPpath, (err:any, stats:any) => {
    if (err) {
        reject(err);
    } else {
        resolve(stats.isDirectory());
    }
    });
});

return promise;
}

function DirectoryExistsSync(path: string):boolean {
        try {
          const stats = fs.statSync(path);
          return stats.isDirectory();
        } catch (err) {
          console.log(err);
          return false;
        }
    }

 */

/**
 * a proxy for accessing the disk.
 * @class
 */
export class File{
/**
 * Checks ifa file exist.  
 * @param {string} name the name of the file.
 * @return {boolean} - true if file exist, false otherwise.
 */
    static async fileExist(name:string):Promise<boolean>{
        try{
            const _f = await Deno.lstat(name);
            return true;
        }
        catch(err){
            if( !(err instanceof Deno.errors.NotFound) )throw err;

            return false;
        }
    }
/**
 * Checks if a directory exist.  
 * @param {string} name the name of the file.
 * @return {boolean} - true if directory exist, false otherwise.
 */
    static async dirExist(dirname:string):Promise<boolean>{
        try{
            const _fileList =  await this.listFiles(dirname);
         
            return true;
        }
        catch(err){

            if( !(err instanceof Deno.errors.NotFound) )throw err;

            return false;
        }
    }
/**
 * Returns a list of files is a directory.  
 * @param {string} dirname the name of the file.
 * @param {string} recursive include files in sub directories.
 * @return {string[]} - an array of file names.
 */
    static async listFiles(dirname:string, recursive:boolean = false):Promise<string[]>{
        const   filenames:string[] = [];
        let     marker:string = "/";

        try{
            for await(const dirEntry of Deno.readDir(dirname) ){

                const filename = path.join(dirname,dirEntry.name);

                (dirEntry.isDirectory) ? marker = ">>>" : marker = "";

                filenames.push(filename+marker);

                if(recursive && dirEntry.isDirectory){

                    const fnames:string[] = await this.listFiles(filename,recursive);

                    fnames.forEach((n)=>filenames.push(path.join(filename,n)));
                }
            }
        }
        catch(err){
            throw err;
        }

        return filenames;
    }
/**
 * Reads the content of a file.  
 * @param {string} name the name of the file.
 * @return {string} contents of file.
 */
    static async read(name:string):Promise<string>{
        try{
            const _s = await Deno.readTextFile(name);
            return _s;
        }
        catch(err){
            if( !(err instanceof Deno.errors.NotFound) )throw err;

            return "";
        }
    }
/**
 * Creat a file.  
 * @param {string} name the name of the file.
 * @return {Deno.FsFile} a file pointer.
 */
    static async create(name:string):Promise<Deno.FsFile | null>{
        try{
        using file = await Deno.open(name, { read: true, write: true });

        return file;
        }
        catch(err){
            if( !(err instanceof Deno.errors.NotFound) )throw err;

            return null;
        }
    }
/**
 * Creat a directory.  
 * @param {string} name the name of the directory.
 * @return {void} void.
 */
    static async mkDir(dirname:string){
        try{
            await Deno.mkdir(dirname);
        }
        catch(err){
            if( !(err instanceof Deno.errors.AlreadyExists) )throw err;
        }
    }
/**
 * Creat a file.  
 * @param {string} filename the name of the file.
 * @param {string} text the text content to write.
 * @return {void} void
 */
    static async write(filename:string, text:string ){
        await Deno.writeTextFile(filename,text);
    }
/**
 * Delete a file.  
 * @param {string} name the name of the file.
 * @return {void} void.
 */
    static async remove(filename:string){
        await Deno.remove(filename);
    }

}
