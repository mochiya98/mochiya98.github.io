import { Geometry } from "ogl/src/Core";

export class GrassBasePlanes extends Geometry {
  constructor(
    gl: WebGLRenderingContext,
    {
      width = 1,
      height = 1,
      attributes = {},
      positions = null
    }: {
      width?: number;
      height?: number;
      attributes?: unknown;
      positions: ([number, number] | [number, number, number])[] | null;
    } = {} as any
  ) {
    if (!positions) throw new Error("need positions");

    // Determine length of arrays
    const num = 2 * 2 * positions!.length;
    const numIndices = positions!.length * 6;

    // Generate empty arrays once
    const position = new Float32Array(num * 3);
    const normal = new Float32Array(num * 3);
    const uv = new Float32Array(num * 2);
    const index =
      num > 65536 ? new Uint32Array(numIndices) : new Uint16Array(numIndices);

    let i = 0,
      ii = 0;
    for (let pos of positions) {
      GrassBasePlanes.buildPlane(
        position,
        normal,
        uv,
        index,
        width,
        height,
        0,
        2,
        1,
        i,
        ii,
        ...pos
      );
      i += 4;
      ii += 1;
    }

    Object.assign(attributes, {
      position: { size: 3, data: position },
      normal: { size: 3, data: normal },
      uv: { size: 2, data: uv },
      index: { data: index }
    });

    super(gl, attributes);
  }
  static buildPlane(
    position: Float32Array,
    normal: Float32Array,
    uv: Float32Array,
    index: Uint32Array | Uint16Array,
    width: number,
    height: number,
    u = 0,
    v = 1,
    w = 2,
    i = 0,
    ii = 0,
    xx = 0,
    yy = 0,
    zz = 0
  ) {
    const io = i;
    const depth = 0;
    const wSegs = 1;
    const hSegs = 1;

    for (let iy = 0; iy <= hSegs; iy++) {
      let y = iy * height - height / 2 - yy;
      for (let ix = 0; ix <= wSegs; ix++, i++) {
        let x = ix * width - width / 2 - xx;

        position[i * 3 + u] = -x;
        position[i * 3 + v] = -y;
        position[i * 3 + w] = zz;

        normal[i * 3 + u] = 0;
        normal[i * 3 + v] = 0;
        normal[i * 3 + w] = depth >= 0 ? 1 : -1;

        uv[i * 2] = ix;
        uv[i * 2 + 1] = 1 - iy;

        if (iy === hSegs || ix === wSegs) continue;
        let a = io + ix + iy * 2;
        let b = io + ix + (iy + 1) * 2;
        let c = io + ix + (iy + 1) * 2 + 1;
        let d = io + ix + iy * 2 + 1;

        index[ii * 6] = a;
        index[ii * 6 + 1] = b;
        index[ii * 6 + 2] = d;
        index[ii * 6 + 3] = b;
        index[ii * 6 + 4] = c;
        index[ii * 6 + 5] = d;
        ii++;
      }
    }
  }
}

export default GrassBasePlanes;
