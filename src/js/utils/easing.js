export function easeOutBack(pos) {
    var s = 1.7;
    return (pos=pos-1)*pos*((s+1)*pos + s) + 1;
}
export function easeOutQuad(pos){
	return -(Math.pow((pos-1), 2) -1);
}