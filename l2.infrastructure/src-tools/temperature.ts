export class Temperature{
celcius_value:number = 0;
constructor(celcius?:number){
if(celcius)this.celcius_value = celcius!;
}
static toFahrenheit(celcius:number):number{
return (celcius*9)/5 + 32;
}
static toCelcius(fah:number):number{
    return (fah*5-160)/9;
}
}