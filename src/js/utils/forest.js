/*! ContributeForest v0.0.1 | Yukimasa Funaoka <yukimasafunaoka@gmail.com> */
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Mesh,
  MeshBasicMaterial,
  HemisphereLight,
  Group,
  BoxGeometry,
  PlaneGeometry,
  Geometry,
  MeshLambertMaterial
} from "three";
import hsl2rgb from "./hsl2rgb";
import { easeOutBack, easeOutQuad } from "./easing";

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
    this.maxContributes = this.data
      .flat(1)
      .map(c => c.count - 0)
      .reduce((a, c) => Math.max(a, c));
    this.initRenderer();
    this.initScene();
    this.adjustSize();
    window.addEventListener("resize", this.adjustSize);
  }
  adjustSize() {
    this.w = Math.min(window.innerWidth, this.baseWidth);
    this.h = this.w * this.hRate;
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.w, this.h);
    this.camera.aspect = this.w / this.h;
    this.camera.updateProjectionMatrix();
    this.renderer.render(this.scene, this.camera);
  }
  initRenderer() {
    //scene
    this.scene = new Scene();
    //camera
    this.camera = new PerspectiveCamera(30, this.w / this.h, 0.1, 1000);
    this.camera.position.set(0, 0, 100);
    //renderer
    this.renderer = new WebGLRenderer({ antialias: true });
    if (window.devicePixelRatio)
      this.renderer.setPixelRatio(window.devicePixelRatio * 1);
    this.renderer.setSize(this.w, this.h);
    this.renderer.setClearColor(0xffffff, 1);
    const canvas = this.renderer.domElement;
    //canvas.style.width="100%";
    //canvas.style.height="auto";
    this.container.appendChild(canvas);
  }
  initScene() {
    // light
    this.light = new HemisphereLight(0xffffff, 0x000000, 1.2);
    this.light.position.set(0, 400, 500).normalize();
    this.scene.add(this.light);
    //group
    this.group = new Group();
    this.group.rotation.x = 0.4;
    this.group.rotation.y = -0.6;
    this.scene.add(this.group);
    //grasses
    const GRASS_GEOMETRY = new BoxGeometry(
      this.barSize,
      this.barBaseHeight,
      this.barSize
    );
    const GRASS_BASE_GEOMETRY = new PlaneGeometry(
      this.barSize,
      this.barSize,
      1,
      1
    );
    const GRASS_BASE_MATERIAL = new MeshBasicMaterial({ color: 0xeeeeee });
    const grassesBaseGeometry = new Geometry();
    const WEEK_LENGTH = this.data.length;
    this.grasses = [];
    this.data.forEach((week, weekIndex) => {
      this.grasses[weekIndex] = [];
      const x = 0 + (weekIndex - WEEK_LENGTH / 2 - 2) * this.barRepInterval;
      week.forEach((day, dayIndex) => {
        const z = dayIndex * this.barRepInterval;
        //grass
        let lightDiff =
          0.2 * (this.data[weekIndex][dayIndex].count / this.maxContributes);

        const gm = new MeshLambertMaterial({
          color: hsl2rgb((360 / WEEK_LENGTH) * weekIndex, 0.7, 0.65 - lightDiff)
        });
        const grass = new Mesh(GRASS_GEOMETRY, gm);
        grass.position.set(x, 0, z);
        grass.scale.setY(0);
        grass.visible = false;
        this.group.add(grass);
        this.grasses[weekIndex][dayIndex] = grass;
        //grassBase
        const grassBasePart = new Mesh(
          GRASS_BASE_GEOMETRY,
          GRASS_BASE_MATERIAL
        );
        grassBasePart.position.set(x, 0, z);
        grassBasePart.rotation.x = -1.5707963267948966;
        grassesBaseGeometry.mergeMesh(grassBasePart);
      });
    });
    const grassesBase = new Mesh(grassesBaseGeometry, GRASS_BASE_MATERIAL);
    this.group.add(grassesBase);
    this.renderer.render(this.scene, this.camera);
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
        grass.position.setY((this.barBaseHeight * val) / 2);
        val && grass.scale.setY(val);
        grass.visible = val ? true : false;
      }
    }
    const progPer = this.frame / duration;
    this.group.rotation.x = 0.4 + easeOutQuad(progPer) * 0.146;
    this.group.rotation.y = -0.6 + easeOutQuad(progPer) * 0.219;
    this.renderer.render(this.scene, this.camera);
  }
}
export default Forest;
