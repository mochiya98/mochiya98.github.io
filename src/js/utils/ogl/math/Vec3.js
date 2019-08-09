import * as Vec3Func from './functions/Vec3Func.js';

export class Vec3 {
    constructor(x = 0, y = x, z = x) {
        this.obj=[x, y, z];
    }

    get x() {
        return this.obj[0];
    }

    set x(v) {
        this.obj[0] = v;
    }

    get y() {
        return this.obj[1];
    }

    set y(v) {
        this.obj[1] = v;
    }

    get z() {
        return this.obj[2];
    }

    set z(v) {
        this.obj[2] = v;
    }

    set(x, y = x, z = x) {
        if (x.length) return this.copy(x);
        Vec3Func.set(this.obj, x, y, z);
        return this;
    }

    copy(v) {
        Vec3Func.copy(this.obj, v.obj);
        return this;
    }

    add(va, vb) {
        if (vb) Vec3Func.add(this.obj, va.obj, vb.obj);
        else Vec3Func.add(this.obj, this.obj, va.obj);
        return this;
    }

    sub(va, vb) {
        if (vb) Vec3Func.subtract(this.obj, va.obj, vb.obj);
        else Vec3Func.subtract(this.obj, this.obj, va.obj);
        return this;
    }

    multiply(v) {
        if (v.length) Vec3Func.multiply(this.obj, this.obj, v);
        else Vec3Func.scale(this.obj, this.obj, v);
        return this;
    }

    divide(v) {
        if (v.length) Vec3Func.divide(this.obj, this.obj, v);
        else Vec3Func.scale(this.obj, this.obj, 1 / v);
        return this;
    }

    /*inverse(v = this) {
        Vec3Func.inverse(this, v);
        return this;
    }*/

    // Can't use 'length' as Array.prototype uses it
    /*len() {
        return Vec3Func.length(this);
    }*/

    distance(v) {
        if (v) return Vec3Func.distance(this.obj, v.obj);
        else return Vec3Func.length(this.obj);
    }

    /*squaredLen() {
        return this.squaredDistance();
    }*/
    
    squaredDistance(v) {
        if (v) return Vec3Func.squaredDistance(this.obj, v.obj);
        else return Vec3Func.squaredLength(this.obj);
    }

    /*negate(v = this) {
        Vec3Func.negate(this, v);
        return this;
    }

    cross(va, vb) {
        Vec3Func.cross(this, va, vb);
        return this;
    }

    scale(v) {
        Vec3Func.scale(this, this, v);
        return this;
    }

    normalize() {
        Vec3Func.normalize(this, this);
        return this;
    }*/

    dot(v) {
        return Vec3Func.dot(this.obj, v.obj);
    }

    /*equals(v) {
        return Vec3Func.exactEquals(this, v);
    }*/

    applyMatrix4(mat4) {
        Vec3Func.transformMat4(this.obj, this.obj, mat4.obj);
        return this;
    }

    /*applyQuaternion(q) {
        Vec3Func.transformQuat(this, this, q);
        return this;
    }

    angle(v) {
        return Vec3Func.angle(this, v);
    }

    lerp(v, t) {
        Vec3Func.lerp(this, this, v, t);
        return this;
    }

    clone() {
        return new Vec3(this[0], this[1], this[2]);
    }*/

    fromArray(a, o = 0) {
		this.obj[0] = a[o];
		this.obj[1] = a[o + 1];
		this.obj[2] = a[o + 2];
		return this;
    }

	/*toArray(a = [], o = 0) {
		a[o] = this[0];
		a[o + 1] = this[1];
		a[o + 2] = this[2];
		return a;
	}
    
    transformDirection(mat4) {
        const x = this[0];
        const y = this[1];
        const z = this[2];

        this[0] = mat4[0] * x + mat4[4] * y + mat4[8] * z;
        this[1] = mat4[1] * x + mat4[5] * y + mat4[9] * z;
        this[2] = mat4[2] * x + mat4[6] * y + mat4[10] * z;
        
        return this.normalize();
    }*/
}
