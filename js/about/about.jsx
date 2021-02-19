import React from "react";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";

const binarySnippet = `00101100 00000011 00000000 00000000
01000000 10000000 00000000 00101000
00111100 10000000 10000000 00111100
01111100 10100011 00000000 11010000
00111000 10000100 00000101 01011000
10000000 00000100 00011011 00000000
01111100 00000101 00000000 00000000
01000000 10000001 00000000 00010000
00111000 00000000 00000000 00000000
10010000 00000100 00011011 00000000
01001110 10000000 00000000 00100000
00111100 10100000 10000000 00111100
00111100 10000000 00000000 00000010
00111000 11000101 00000101 01011000
10000000 10100110 00011011 00000000
00111000 00000100 10000110 10011111
01111100 01100101 00011010 00010100
01111100 00000011 00000000 01000000
10010000 01100110 00011011 00000000
01001100 10000001 00000000 00100000
10010000 00000110 00011011 00000000
01001110 10000000 00000000 00100000
`;

const asmSnippet = `.global zEntPlayer_GiveShinyObject__Fi
zEntPlayer_GiveShinyObject__Fi:
	cmpwi r3, 0
	bge lbl_80076AB0
	lis r4, globals@ha
	neg r5, r3
	addi r4, r4, globals@l
	lwz r0, 0x1b00(r4)
	cmpw r5, r0
	ble lbl_80076AB0
	li r0, 0
	stw r0, 0x1b00(r4)
	blr 
lbl_80076AB0:
	lis r5, globals@ha
	lis r4, 0x0001869F@ha
	addi r6, r5, globals@l
	lwz r5, 0x1b00(r6)
	addi r0, r4, 0x0001869F@l
	add r3, r5, r3
	cmplw r3, r0
	stw r3, 0x1b00(r6)
	blelr 
	stw r0, 0x1b00(r6)
	blr `;

const cppSnippet = `void zEntPlayer_GiveShinyObject(int quantity)
{
    if (quantity < 0 && -quantity > (int)globals.player.Inv_Shiny)
    {
        globals.player.Inv_Shiny = 0;
        return;
    }

    unsigned int sum = globals.player.Inv_Shiny + quantity;
    unsigned int maxShinies = 99999;
    globals.player.Inv_Shiny = sum;

    if (sum > maxShinies)
    {
        globals.player.Inv_Shiny = maxShinies;
    }
}`;

export default class About extends React.Component {
  render() {
    return (
      <div>
        <div className="grid grid-rows-2 grid-cols-2 p-4 gap-4">
          <div className="">
            <div className="bobfont uppercase text-3xl">Binary</div>
            <div className="text-xl border-gray-500 border rounded bg-gray-700 text-green-400">
              <pre className="m-2 overflow-x-auto">{binarySnippet}</pre>
            </div>
          </div>
          <div className="col-span-1">
            <div className="bobfont uppercase text-3xl">Assembly</div>
            <div className="text-xl border-gray-500 border p-2 rounded bg-gray-200">
              <pre
                className="overflow-x-auto"
                dangerouslySetInnerHTML={{
                  __html: hljs.highlight("mips", asmSnippet).value,
                }}
              ></pre>
            </div>
          </div>
          <div className="col-span-2">
            <div className="bobfont uppercase text-3xl">C++</div>
            <div className="text-xl border-gray-500 border rounded bg-blue-50">
              <pre
                className="m-4 overflow-x-auto"
                dangerouslySetInnerHTML={{
                  __html: hljs.highlight("c++", cppSnippet).value,
                }}
              ></pre>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
