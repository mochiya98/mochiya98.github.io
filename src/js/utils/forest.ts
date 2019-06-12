/*! ContributeForest v0.0.3 | Yukimasa Funaoka <yukimasafunaoka@gmail.com> */

import hsl2rgb from "./hsl2rgb";
import { easeOutBack, easeOutQuad } from "./easing";
import * as SolidShader from "./ogl-helper/SolidShader";
import * as LightShader from "./ogl-helper/LightShader";
import GrassBasePlanes from "./ogl-helper/GrassBasePlanes";
import { Renderer, Camera, Transform, Program, Mesh, Vec3 } from "ogl/src/Core";
import { Cube } from "ogl/src/Extras";
import { calcContributions } from "./math";
import { YearContributionsData } from "js/models/contributions";

class Forest {
  w: number;
  h: number;
  baseWidth: number;
  baseHeight: number;
  barBaseHeight: number;
  barSize: number;
  barMargin: number;
  hRate: number;
  barRepInterval: number;
  initialDate: number;
  maxContributes: number;
  data: any;
  renderer: Renderer;
  gl: WebGLRenderingContext;
  scene: Transform;
  camera: Camera;
  grasses: any[][];
  //constructor options
  container: HTMLElement;

  constructor(
    options?: Partial<{
      container: HTMLElement;
      data: YearContributionsData;
      baseWidth: number;
      baseHeight: number;
      barBaseHeight: number;
      barSize: number;
      barMargin: number;
    }>
  ) {
    this.container = document.body;
    this.data = [];
    this.baseWidth = 800;
    this.baseHeight = 350;
    this.barBaseHeight = 5.5;
    this.barSize = 1.8;
    this.barMargin = 0.25;
    Object.assign(this, options);

    this.w = this.baseWidth;
    this.h = this.baseHeight;
    this.hRate = this.baseHeight / this.baseWidth;
    this.animate = this.animate.bind(this);
    this.adjustSize = this.adjustSize.bind(this);
    this.barRepInterval = this.barSize + this.barMargin;
    this.initialDate = Date.now();
    this.maxContributes = calcContributions(this.data).maxContributes;
    //renderer
    this.renderer = new Renderer({ antialias: true });
    this.gl = this.renderer.gl;
    document.getElementById("forest-view")!.appendChild(this.gl.canvas);
    this.gl.clearColor(1, 1, 1, 1);

    //scene
    this.grasses = [];
    this.scene = new Transform();

    //camera
    this.camera = new Camera(this.gl, { fov: 30, far: 1000 });
    this.camera.position.set(0, 0, 100);
    this.camera.lookAt([0, 0, 0]);
    this.initScene();
    this.adjustSize();
    window.addEventListener("resize", this.adjustSize);
  }
  adjustSize() {
    this.w = Math.min(window.innerWidth, this.baseWidth);
    this.h = this.w * this.hRate;
    this.renderer.dpr = Math.max(window.devicePixelRatio, 2);
    this.renderer.setSize(this.w, this.h);
    this.camera.perspective({
      aspect: this.gl.canvas.width / this.gl.canvas.height
    });
    this.renderer.render({ scene: this.scene, camera: this.camera });
  }
  initScene() {
    //grasses
    const WEEK_LENGTH = this.data.length;

    const cubeGeometry = new Cube(this.gl, {
      width: this.barSize,
      depth: this.barSize,
      height: this.barBaseHeight
    });

    const grassBaseProgram = new Program(this.gl, {
      vertex: SolidShader.vertex,
      fragment: SolidShader.fragment()
    });
    const grassProgram = new Program(this.gl, {
      vertex: LightShader.vertex,
      fragment: LightShader.fragment,
      uniforms: {
        color: { value: null }
      }
    });

    const grassBasePositions: [number, number][] = [];

    for (let weekIndex = 0; weekIndex < this.data.length; weekIndex++) {
      const week = this.data[weekIndex];
      this.grasses[weekIndex] = [];
      const x = 0 + (weekIndex - WEEK_LENGTH / 2 - 2) * this.barRepInterval;

      for (let dayIndex = 0; dayIndex < week.length; dayIndex++) {
        const z = dayIndex * this.barRepInterval;
        //grass
        let lightDiff = 0.2 * (week[dayIndex].count / this.maxContributes);
        const color = new Vec3(
          ...hsl2rgb((360 / WEEK_LENGTH) * weekIndex, 0.7, 0.65 - lightDiff)
        );
        const onBeforeGrassRender = function() {
          grassProgram.uniforms.color.value = color;
        };
        const grass = new Mesh(this.gl, {
          geometry: cubeGeometry,
          program: grassProgram
        });
        grass.position.set(x, 5.5 * 1.5, z);
        grass.onBeforeRender = onBeforeGrassRender;
        grass.setParent(this.scene);
        this.grasses[weekIndex][dayIndex] = grass;
        //grassBase
        grassBasePositions.push([x, z]);
      }
    }
    const grassBaseGeometry = new GrassBasePlanes(this.gl, {
      width: this.barSize,
      height: this.barSize,
      positions: grassBasePositions
    });
    const grassBase = new Mesh(this.gl, {
      geometry: grassBaseGeometry,
      program: grassBaseProgram
    });
    grassBase.setParent(this.scene);

    this.scene.rotation.x = 0.32;
    this.scene.rotation.y = -0.64;
    this.scene.rotation.z = -0.22;

    this.renderer.render({ scene: this.scene, camera: this.camera });
  }
  animate() {
    const frame = (Date.now() - this.initialDate) / 16.6666;
    const duration = this.grasses.length + 20;
    if (frame < duration) requestAnimationFrame(this.animate);
    for (let weekIndex = 0; weekIndex < this.grasses.length; weekIndex++) {
      for (
        let dayIndex = 0;
        dayIndex < this.grasses[weekIndex].length;
        dayIndex++
      ) {
        const grass = this.grasses[weekIndex][dayIndex];
        const data = this.data[weekIndex][dayIndex];
        let val = 0;
        if (frame >= weekIndex) {
          val = easeOutBack((frame - weekIndex) / 20);
          if (frame - weekIndex >= 20) {
            val = 1;
          }
        }
        val *= ((data.count - 0) / this.maxContributes) * 3;
        grass.position.set(
          grass.position.x,
          (this.barBaseHeight * val) / 2,
          grass.position.z
        );
        val && (grass.scale.y = val);
        grass.visible = val ? true : false;
      }
    }
    const progPer = frame / duration;
    this.scene.rotation.x = 0.32 + easeOutQuad(progPer) * 0.18;
    this.scene.rotation.y = -0.64 + easeOutQuad(progPer) * 0.2;
    this.renderer.render({ scene: this.scene, camera: this.camera });
  }
}
export default Forest;
