import * as Vec4Func from './functions/Vec4Func.js';

export class Vec4 {
    constructor(x = 0, y = x, z = x, w = x) {
        this.obj=[x, y, z, w];
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

    get w() {
        return this.obj[3];
    }

    set w(v) {
        this.obj[3] = v;
    }

    set(x, y, z, w) {
        if (x.length) return this.copy(x);
        Vec4Func.set(this, x, y, z, w);
        return this;
    }

    copy(v) {
        Vec4Func.copy(this, v);
        return this;
    }

    normalize() {
        Vec4Func.normalize(this, this);
        return this;
    }

    fromArray(a, o = 0) {
		this[0] = a[o];
		this[1] = a[o + 1];
		this[2] = a[o + 2];
		this[3] = a[o + 3];
		return this;
    }
    
	toArray(a = [], o = 0) {
		a[o] = this[0];
		a[o + 1] = this[1];
		a[o + 2] = this[2];
		a[o + 3] = this[3];
		return a;
	}
}
