export function evaluateFormula(
formula:string,
cells:Record<string,number>
){

if(!formula.startsWith("=")) return formula;

if(formula.startsWith("=SUM")){

const range = formula.match(/\((.*)\)/)?.[1];

if(!range) return 0;

const [start,end] = range.split(":");

let sum=0;

for(let key in cells){

sum += Number(cells[key]);

}

return sum;

}

return formula;
}