"use client";

import Cell from "./Cell";

const rows = 20;
const cols = 10;

export default function Spreadsheet() {

const grid = [];

for (let r = 0; r < rows; r++) {

const row = [];

for (let c = 0; c < cols; c++) {

const colLetter = String.fromCharCode(65 + c);
const id = `${colLetter}${r+1}`;

row.push(<Cell key={id} id={id} />);

}

grid.push(<div key={r} className="flex">{row}</div>);
}

return <div>{grid}</div>;
}