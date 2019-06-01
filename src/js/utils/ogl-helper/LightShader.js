export const vertex = `precision highp float;precision highp int;attribute vec3 position;attribute vec3 normal;uniform mat4 modelViewMatrix;uniform mat4 projectionMatrix;uniform mat3 normalMatrix;varying vec3 vN;void main(){vN=normalize(normalMatrix*normal);vec4 t;t.w=1.0;t.xyz=position;gl_Position=projectionMatrix*modelViewMatrix*t;}`;
export const vertex_raw = `
	 precision highp float;
	 precision highp int;
	 
	 attribute vec3 position;
	 attribute vec3 normal;
	 
	 uniform mat4 modelViewMatrix;
	 uniform mat4 projectionMatrix;
	 uniform mat3 normalMatrix;
	 
	 varying vec3 vN;
	 
	 void main() {
		  vNormal = normalize(normalMatrix * normal);
		  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
	 }
	 `;
export const fragment = `precision highp int;precision highp float;uniform vec3 color;varying vec3 vN;void main(){float t=(max(dot(vN,vec3(0.0,0.5734624,0.8192319)),0.0)*1.07);gl_FragColor.xyz=((((color-1.0)*vec3((0.666+(t/3.0))))+1.0)+(vec3((t-0.82))*0.5));gl_FragColor.w=1.0;}`;
export const fragment_raw = `
	 precision highp float;
	 precision highp int;

	 uniform vec3 color;
	 
	 varying vec3 vNormal;
 
	 const vec3 lightDirection = normalize(vec3(0.0, 0.7, 1.0));
 
	 void main() {
		 float diffuse = (max(dot(vNormal,lightDirection),0.0))*1.07;
		 vec3 c = color;
		 c = (c - 1.0) * vec3(0.666 + diffuse / 3.0) + 1.0;
		 c = c * 1.0 + vec3(diffuse - 0.82) * 0.5;
		 gl_FragColor.rgb = c;
		 gl_FragColor.a = 1.0;
	 }
	 `;
