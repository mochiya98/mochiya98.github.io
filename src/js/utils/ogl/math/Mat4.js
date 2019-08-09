import * as Mat4Func from './functions/Mat4Func.js';

export class Mat4 {
    constructor(
        m00 = 1, m01 = 0, m02 = 0, m03 = 0, 
        m10 = 0, m11 = 1, m12 = 0, m13 = 0, 
        m20 = 0, m21 = 0, m22 = 1, m23 = 0, 
        m30 = 0, m31 = 0, m32 = 0, m33 = 1
    ) {
        this.obj=[m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33];
    }

    /*set x(v) {
        this.obj[12] = v;
    }

    get x() {
        return this.obj[12];
    }

    set y(v) {
        this.obj[13] = v;
    }

    get y() {
        return this.obj[13];
    }

    set z(v) {
        this.obj[14] = v;
    }

    get z() {
        return this.obj[14];
    }

    set w(v) {
        this.obj[15] = v;
    }

    get w() {
        return this.obj[15];
    }*/

    /*set(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
        if (m00.length) return this.copy(m00);
        Mat4Func.set(this.obj, m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33);
        return this;
    }

    translate(v, m = this) {
        Mat4Func.translate(this.obj, m, v);
        return this;
    }

    rotateX(v, m = this) {
        Mat4Func.rotateX(this.obj, m, v);
        return this;
    }

    rotateY(v, m = this) {
        Mat4Func.rotateY(this.obj, m, v);
        return this;
    }

    rotateZ(v, m = this) {
        Mat4Func.rotateZ(this.obj, m, v);
        return this;
    }

    scale(v, m = this) {
        Mat4Func.scale(this.obj, m, typeof v === "number" ? [v, v, v] : v);
        return this;
    }*/

    multiply(ma, mb) {
        if (mb) {
            Mat4Func.multiply(this.obj, ma.obj, mb.obj);
        } else {
            Mat4Func.multiply(this.obj, this.obj, ma.obj);
        }
        return this;
    }

    /*identity() {
        Mat4Func.identity(this.obj);
        return this;
    }*/

    copy(m) {
        Mat4Func.copy(this.obj, m.obj);
        return this;
    }

    fromPerspective({fov, aspect, near, far} = {}) {
        Mat4Func.perspective(this.obj, fov, aspect, near, far);
        return this;
    }

    /*fromOrthogonal({left, right, bottom, top, near, far}) {
        Mat4Func.ortho(this.obj, left, right, bottom, top, near, far);
        return this;
    }*/

    fromQuaternion(q) {
        Mat4Func.fromQuat(this.obj, q.obj);
        return this;
    }

    /*setPosition(v) {
        this.x = v[0];
        this.y = v[1];
        this.z = v[2];
        return this;
    }*/

    inverse(m = this) {
        Mat4Func.invert(this.obj, m.obj);
        return this;
    }

    compose(q, pos, scale) {
        Mat4Func.fromRotationTranslationScale(this.obj, q.obj, pos.obj, scale.obj);
        return this;
    }

    getRotation(q) {
        Mat4Func.getRotation(q.obj, this.obj);
        return this;
    }

    getTranslation(pos) {
        Mat4Func.getTranslation(pos.obj, this.obj);
        return this;
    }

    /*getScaling(scale) {
        Mat4Func.getScaling(scale, this.obj);
        return this;
    }*/

    getMaxScaleOnAxis() {
        return Mat4Func.getMaxScaleOnAxis(this.obj);
    }

    lookAt(eye, target, up) {
        Mat4Func.targetTo(this.obj, eye.obj, target, up.obj);
        return this;
    }

    determinant() {
        return Mat4Func.determinant(this.obj);
    }
}
