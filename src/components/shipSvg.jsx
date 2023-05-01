import * as React from "react"
import { useState } from "react";

const SvgComponent = (props) => {

const [color, setColor] = useState("black");
    return (
  <svg xmlns="http://www.w3.org/2000/svg" width={777} height={480} {...props}>
    <title>{"my vector image"}</title>
    <rect width="100%" height="100%" fill="#0DCAF0" />
    <g className="currentLayer">
      <title>{"Layer 1"}</title>
      <path
        fill="#4a90d6"
        stroke="#222"
        strokeLinejoin="round"
        strokeWidth={2}
        d="m46.106 435.624 87.043-166.01c.25.264 353.289-176.531 353.289-175.979"
        style={{
          color: "#000",
        }}
      />
      <path
        fill="#4a90d6"
        stroke="#222"
        strokeLinejoin="round"
        strokeWidth={2}
        d="m486.438 94.74 218.534-58.828-61.878 229.834L324.309 449.17l-287.292-.552 22.099-39.227"
        style={{
          color: "#000",
        }}
      />
      <path
        fill="#e98a8a"
        stroke="#222"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M148.338 259.733h46.014v38.231h-46.014z"
        onClick={()=>setColor("black")}
        style={{
          color: "#000",
        }}
        transform="rotate(-27.1 171.345 278.848)"
      />
      <path
        fill={color}
        onClick={()=>setColor(color === "black" ? "red" : "black")}
        stroke="#222"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M148.891 259.18h46.014v38.231h-46.014z"
        style={{
          color: "#000",
        }}
        transform="rotate(-27.1 171.898 278.296)"
      />
      <path
        fill="#e98a8a"
        stroke="#222"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M169.443 297.412h46.014v38.231h-46.014z"
        style={{
          color: "#000",
        }}
        transform="rotate(-27.1 192.45 316.528)"
      />
      <path
        fill="#e98a8a"
        stroke="#222"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M195.962 234.981h46.014v38.231h-46.014z"
        style={{
          color: "#000",
        }}
        transform="rotate(-27.1 218.97 254.097)"
      />
      <path
        fill="#e98a8a"
        stroke="#222"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M218.172 273.766h46.014v38.231h-46.014z"
        style={{
          color: "#000",
        }}
        transform="rotate(-27.1 241.18 292.881)"
      />
      <path
        fill="#e98a8a"
        stroke="#222"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M243.034 210.23h46.014v38.231h-46.014z"
        style={{
          color: "#000",
        }}
        transform="rotate(-27.1 266.041 229.345)"
      />
      <path
        fill="#e98a8a"
        stroke="#222"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M264.139 247.357h46.014v38.231h-46.014z"
        style={{
          color: "#000",
        }}
        transform="rotate(-27.1 287.146 266.472)"
      />
      <path
        fill="#e98a8a"
        stroke="#222"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M289.554 186.583h46.014v38.231h-46.014z"
        style={{
          color: "#000",
        }}
        transform="rotate(-27.1 312.56 205.699)"
      />
      <path
        fill="#e98a8a"
        stroke="#222"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M312.316 223.71h46.014v38.231h-46.014z"
        style={{
          color: "#000",
        }}
        transform="rotate(-27.1 335.323 242.826)"
      />
      <path
        fill="#e98a8a"
        stroke="#222"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M333.863 163.489h46.014v38.231h-46.014z"
        style={{
          color: "#000",
        }}
        transform="rotate(-27.1 356.87 182.605)"
      />
      <path
        fill="#e98a8a"
        stroke="#222"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M357.178 200.064h46.014v38.231h-46.014z"
        style={{
          color: "#000",
        }}
        transform="rotate(-27.1 380.185 219.18)"
      />
      <path
        fill="#e98a8a"
        stroke="#222"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M379.277 140.948h46.014v38.231h-46.014z"
        style={{
          color: "#000",
        }}
        transform="rotate(-27.1 402.285 160.064)"
      />
      <path
        fill="#e98a8a"
        stroke="#222"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M402.04 176.97h46.014v38.231H402.04z"
        style={{
          color: "#000",
        }}
        transform="rotate(-27.1 425.047 196.086)"
      />
      <path
        fill="#e98a8a"
        stroke="#222"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M425.244 118.407h46.014v38.231h-46.014z"
        style={{
          color: "#000",
        }}
        transform="rotate(-27.1 448.251 137.522)"
      />
      <path
        fill="#e98a8a"
        stroke="#222"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M446.902 154.429h46.014v38.231h-46.014z"
        style={{
          color: "#000",
        }}
        transform="rotate(-27.1 469.909 173.544)"
      />
      <path
        fill="#e98a8a"
        stroke="#222"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M581.266 237.412h46.014v38.231h-46.014z"
        style={{
          color: "#000",
        }}
        transform="rotate(-27.1 604.274 256.528)"
      />
      <path
        fill="#e98a8a"
        stroke="#222"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M534.636 263.71h46.014v38.231h-46.014z"
        style={{
          color: "#000",
        }}
        transform="rotate(-27.1 557.644 282.826)"
      />
      <path
        fill="#e98a8a"
        stroke="#222"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M514.305 226.252h46.014v38.231h-46.014z"
        style={{
          color: "#000",
        }}
        transform="rotate(-27.1 537.312 245.367)"
      />
      <path
        fill="#e98a8a"
        stroke="#222"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M560.272 199.843h46.014v38.231h-46.014z"
        style={{
          color: "#000",
        }}
        transform="rotate(-27.1 583.28 218.959)"
      />
      <path
        fill="#e98a8a"
        stroke="#222"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M489.112 288.351h46.014v38.231h-46.014z"
        style={{
          color: "#000",
        }}
        transform="rotate(-27.1 512.119 307.467)"
      />
      <path
        fill="#e98a8a"
        stroke="#222"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M467.675 251.445h46.014v38.231h-46.014z"
        style={{
          color: "#000",
        }}
        transform="rotate(-27.1 490.682 270.56)"
      />
      <path
        fill="#e98a8a"
        stroke="#222"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M444.692 315.202h46.014v38.231h-46.014z"
        style={{
          color: "#000",
        }}
        transform="rotate(-27.1 467.699 334.318)"
      />
      <path
        fill="#e98a8a"
        stroke="#222"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M423.255 277.191h46.014v38.231h-46.014z"
        style={{
          color: "#000",
        }}
        transform="rotate(-27.1 446.263 296.307)"
      />
      <path
        fill="#e98a8a"
        stroke="#222"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M398.614 340.396h46.014v38.231h-46.014z"
        style={{
          color: "#000",
        }}
        transform="rotate(-27.1 421.622 359.511)"
      />
      <path
        fill="#e98a8a"
        stroke="#222"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M375.52 302.937h46.014v38.231H375.52z"
        style={{
          color: "#000",
        }}
        transform="rotate(-27.1 398.528 322.052)"
      />
      <path
        fill="#e98a8a"
        stroke="#222"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M352.537 366.694h46.014v38.231h-46.014z"
        style={{
          color: "#000",
        }}
        transform="rotate(-31 375.544 385.81)"
      />
      <path
        fill="#e98a8a"
        stroke="#222"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M306.46 395.755h46.014v38.231H306.46z"
        style={{
          color: "#000",
        }}
        transform="rotate(-31.38 329.467 414.87)"
      />
      <path
        fill="#e98a8a"
        stroke="#222"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M282.261 358.296h46.014v38.231h-46.014z"
        style={{
          color: "#000",
        }}
        transform="rotate(-31.38 305.268 377.412)"
      />
      <path
        fill="#e98a8a"
        stroke="#222"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M326.018 331.335h46.014v38.231h-46.014z"
        style={{
          color: "#000",
        }}
        transform="rotate(-31.38 349.025 350.45)"
      />
      <path
        fill="#0bd50b"
        stroke="#222"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M158.221 250.993h455.055v40.406H158.221z"
        style={{
          color: "#000",
        }}
        transform="rotate(-28.024 385.749 271.196)"
      />
      <foreignObject
        width={58.927}
        height={32.239}
        x={369.103}
        y={69.842}
        fill="#0bd50b"
        fillRule="nonzero"
        stroke="#222"
        strokeLinejoin="round"
        strokeWidth={2}
        fontFamily="Georgia, serif"
        fontSize={30}
        letterSpacing={0}
        style={{
          color: "#000",
        }}
        transform="rotate(-29.415 744.465 201.66)"
        wordSpacing={0}
      >
        <p xmlns="http://www.w3.org/1999/xhtml">
          <p
            xmlns="http://www.w3.org/1999/xhtml"
            style={{
              border: 0,
              outline: 0,
              fontSize: "inherit",
              lineHeight: "1em",
              padding: 0,
              margin: 0,
            }}
          >
            {"hall"}
          </p>
        </p>
      </foreignObject>
    </g>
  </svg>);
}
export default SvgComponent
