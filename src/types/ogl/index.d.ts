declare module "ogl/src/Extras";
declare module "ogl/src/Core" {
  export class Vec3 {
    x: number;
    y: number;
    z: number;
    constructor(x: number, y: number, z: number);
    set(x: number, y?: number, z?: number);
    static fromArray(arr: number[]);
  }
  export class Geometry {
    constructor(gl: WebGLRenderingContext, attributes: unknown);
  }
  export class Program {
    constructor(
      gl: WebGLRenderingContext,
      options: {
        vertex: string;
        fragment: string;
        uniforms?: { [key: string]: { value: any } };

        transparent?: boolean;
        cullFace?: any;
        frontFace?: any;
        depthTest?: boolean;
        depthWrite?: boolean;
        depthFunc?: any;
      }
    );
    uniforms: any;
  }
  export class Renderer {
    constructor(obj: { antialias: boolean });
    gl: WebGLRenderingContext;
    dpr: number;
    setSize(width: number, height: number);
    render(options: {
      scene: Scene;
      camera: Camera;
      target?: any;
      update?: boolean;
      sort?: boolean;
      frustumCull?: boolean;
      clear?: any;
    });
  }
  export class Camera extends Transform {
    constructor(
      gl: WebGLRenderingContext,
      options: {
        near?: number;
        far?: number;
        fov?: number;
        aspect?: number;
        left?: number;
        right?: number;
        bottom?: number;
        top?: number;
      }
    );
    lookAt(lookAt: [number, number, number]);
    perspective(options: {
      near?: number;
      far?: number;
      fov?: number;
      aspect?: number;
    });
  }

  class Euler extends Array {
    x: number;
    y: number;
    z: number;
    constructor(x: number, y: number, z: number, order: "YXZ");
    set(x: number, y?: number, z?: number);
  }
  export class Transform {
    position: Vec3;
    scale: Vec3;
    rotation: Euler;
    setParent(parent: Transform, notifyParent?: any);
  }
  export class Mesh extends Transform {
    constructor(
      gl: WebGLRenderingContext,
      options: {
        geometry: Geometry;
        program: Program;
      }
    );
    lookAt(lookAt: [number, number, number]);
    perspective(options: {
      near?: number;
      far?: number;
      fov?: number;
      aspect?: number;
    });
    onBeforeRender: Function;
  }
  export class Texture {}
  export const RenderTarget: any;
}
