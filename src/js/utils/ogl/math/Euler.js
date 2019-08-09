import * as EulerFunc from './functions/EulerFunc.js';
import {Mat4} from './Mat4.js';

const tmpMat4 = new Mat4();

export class Euler {
    constructor(x = 0, y = x, z = x, order = 'YXZ') {
        this.obj=[x, y, z];
        this.order = order;
        this.onChange = () => {};
    }

    get x() {
        return this.obj[0];
    }

    set x(v) {
        this.obj[0] = v;
        this.onChange();
    }

    get y() {
        return this.obj[1];
    }

    set y(v) {
        this.obj[1] = v;
        this.onChange();
    }

    get z() {
        return this.obj[2];
    }

    set z(v) {
        this.obj[2] = v;
        this.onChange();
    }

    /*set(x, y = x, z = x) {
        if (x.length) return this.copy(x);
        this.obj[0] = x;
        this.obj[1] = y;
        this.obj[2] = z;
        this.onChange();
        return this;
    }

    copy(v) {
        this.obj[0] = v[0];
        this.obj[1] = v[1];
        this.obj[2] = v[2];
        return this;
    }

    reorder(order) {
        this.order = order;
        this.onChange();
        return this;
    }*/

    fromRotationMatrix(m, order = this.order) {
        EulerFunc.fromRotationMatrix(this.obj, m.obj, order);
        return this;
    }

    fromQuaternion(q, order = this.order) {
        tmpMat4.fromQuaternion(q);
        return this.fromRotationMatrix(tmpMat4, order);
    }
}