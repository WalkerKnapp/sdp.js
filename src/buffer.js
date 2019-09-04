const { BitStream } = require('bit-buffer');
const { QAngle } = require('./types/QAngle');
const { Vector } = require('./types/Vector');

class SourceDemoBuffer extends BitStream {
    readVector() {
        return new Vector(this.readFloat32(), this.readFloat32(), this.readFloat32());
    }
    readQAngle() {
        return new QAngle(this.readFloat32(), this.readFloat32(), this.readFloat32());
    }
    readCoord() {
        const COORD_INTEGER_BITS = 14;
        const COORD_FRACTIONAL_BITS = 5;
        const COORD_DENOMINATOR = 1 << COORD_FRACTIONAL_BITS;
        const COORD_RESOLUTION = 1.0 / COORD_DENOMINATOR;

        let value = 0.0;
        let intval = this.readBits(1);
        let fractval = this.readBits(1);
        if (intval || fractval) {
            let signbit = this.readBits(1);
            if (intval) {
                intval = this.readBits(COORD_INTEGER_BITS) + 1;
            }
            if (fractval) {
                fractval = this.readBits(COORD_FRACTIONAL_BITS);
            }
            value = intval + fractval * COORD_RESOLUTION;
            if (signbit) value = -value;
        }

        return value;
    }
    readVectorCoord() {
        let [x, y, z] = [this.readBoolean(), this.readBoolean(), this.readBoolean()];
        return new Vector(x ? this.readCoord() : 0, y ? this.readCoord() : 0, z ? this.readCoord() : 0);
    }
    readField(bits, fallbackValue = 0) {
        return this.readBoolean() ? this.readBits(bits) : fallbackValue;
    }
    readFieldThen(bits, fallbackValue, callback) {
        return this.readBoolean() ? callback(this.readBits(bits)) : fallbackValue;
    }
    readBitStream(bitLength) {
        var slice = new SourceDemoBuffer(this._view);
        slice._startIndex = this._index;
        slice._index = this._index;
        slice.length = bitLength;
        this._index += bitLength;
        return slice;
    }
    writeArrayBuffer(buffer, byteLength) {
        this.writeBitStream(new SourceDemoBuffer(buffer), byteLength * 8);
    }
}

module.exports = {
    SourceDemoBuffer,
};
