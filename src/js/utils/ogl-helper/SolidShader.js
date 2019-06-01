export const vertex = `precision highp float;precision highp int;attribute vec3 position;uniform mat4 modelViewMatrix;uniform mat4 projectionMatrix;void main(){vec4 t;t.xyz=position;t.w=1.0;gl_Position=projectionMatrix*modelViewMatrix*t;}`;
export const vertex_raw = `
 precision highp float;
 precision highp int;
 
 attribute vec3 position;
 
 uniform mat4 modelViewMatrix;
 uniform mat4 projectionMatrix;
 
 void main() {
	  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
 }
 `;

export const fragment = () =>
  `precision highp float;precision highp int;void main(){gl_FragColor.xyz=vec3(0.9333,0.9333,0.9333);gl_FragColor.w=1.0;}`;
export const fragment_raw = () => `
 precision highp float;
 precision highp int;
 
 void main() {
	  gl_FragColor.rgb = vec3(0.9333, 0.9333, 0.9333);
	  gl_FragColor.a = 1.0;
 }
 `;
