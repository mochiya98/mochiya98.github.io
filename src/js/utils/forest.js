/*! ContributeForest v0.0.1 | Yukimasa Funaoka <yukimasafunaoka@gmail.com> */

import hsl2rgb from "./hsl2rgb";
import { easeOutBack, easeOutQuad } from "./easing";
import * as SolidShader from "./ogl-helper/SolidShader";
import * as LightShader from "./ogl-helper/LightShader";
import { Renderer, Camera, Transform, Program, Mesh, Vec3 } from "ogl/src/Core";
import { Plane, Sphere, Cube } from "ogl/src/Extras";

class Forest {
  constructor(options) {
    Object.assign(
      this,
      {
        container: document.body,
        baseWidth: 800,
        baseHeight: 350,
        barBaseHeight: 5.5,
        barSize: 1.8,
        barMargin: 0.25
      },
      options
    );
    this.w = this.baseWidth;
    this.h = this.baseHeight;
    this.hRate = this.baseHeight / this.baseWidth;
    this.animate = this.animate.bind(this);
    this.adjustSize = this.adjustSize.bind(this);
    this.barRepInterval = this.barSize + this.barMargin;
    this.frame = 0;
    this.maxContributes = 0;
    for (let i = 0; i < this.data.length; i++) {
      for (let j = 0; j < this.data[i].length; j++) {
        const n = this.data[i][j].count - 0;
        if (this.maxContributes < n) this.maxContributes = n;
      }
    }
    this.initRenderer();
    this.initScene();
    this.adjustSize();
    window.addEventListener("resize", this.adjustSize);
  }
  adjustSize() {
    console.log(0);
    this.w = Math.min(window.innerWidth, this.baseWidth);
    this.h = this.w * this.hRate;
    this.renderer.dpr = Math.max(window.devicePixelRatio, 2);
    this.renderer.setSize(this.w, this.h);
    this.camera.perspective({
      aspect: this.gl.canvas.width / this.gl.canvas.height
    });
    this.renderer.render({ scene: this.scene, camera: this.camera });
  }
  initRenderer() {
    //renderer
    this.renderer = new Renderer({ antialias: true });
    this.gl = this.renderer.gl;
    document.getElementById("forest-view").appendChild(this.gl.canvas);
    this.gl.clearColor(1, 1, 1, 1);

    //scene
    this.scene = new Transform();

    //camera
    this.camera = new Camera(this.gl, { fov: 30, far: 1000 });
    this.camera.position.set(0, 0, 100);
    this.camera.lookAt([0, 0, 0]);
    window.camera = this.camera;
  }
  initScene() {
    //grasses
    const WEEK_LENGTH = this.data.length;
    this.grasses = [];

    const cubeGeometry = new Cube(this.gl, {
      width: this.barSize,
      depth: this.barSize,
      height: this.barBaseHeight
    });
    const planeGeometry = new Plane(this.gl, {
      width: this.barSize,
      height: this.barSize
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
    this.data.forEach((week, weekIndex) => {
      this.grasses[weekIndex] = [];
      const x = 0 + (weekIndex - WEEK_LENGTH / 2 - 2) * this.barRepInterval;

      week.forEach((day, dayIndex) => {
        const z = dayIndex * this.barRepInterval;
        //grass
        let lightDiff =
          0.2 * (this.data[weekIndex][dayIndex].count / this.maxContributes);
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
        const grassBasePart = new Mesh(this.gl, {
          geometry: planeGeometry,
          program: grassBaseProgram
        });
        grassBasePart.position.set(x, 0, z);
        grassBasePart.setParent(this.scene);
        grassBasePart.rotation.x = -1.5707963267948966;
      });
    });

    this.scene.rotation.x = 0.32;
    this.scene.rotation.y = -0.64;
    this.scene.rotation.z = -0.22;

    this.renderer.render({ scene: this.scene, camera: this.camera });
  }
  animate() {
    this.frame++;
    const duration = this.grasses.length + 20;
    if (this.frame < duration) requestAnimationFrame(this.animate);
    for (let weekIndex = 0; weekIndex < this.grasses.length; weekIndex++) {
      for (
        let dayIndex = 0;
        dayIndex < this.grasses[weekIndex].length;
        dayIndex++
      ) {
        const grass = this.grasses[weekIndex][dayIndex];
        const data = this.data[weekIndex][dayIndex];
        let val = 0;
        if (this.frame >= weekIndex) {
          val = easeOutBack((this.frame - weekIndex) / 20);
          if (this.frame - weekIndex >= 20) {
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
    const progPer = this.frame / duration;
    this.scene.rotation.x = 0.32 + easeOutQuad(progPer) * 0.18;
    this.scene.rotation.y = -0.64 + easeOutQuad(progPer) * 0.2;
    this.renderer.render({ scene: this.scene, camera: this.camera });
  }
}
export default Forest;
