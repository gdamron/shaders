attribute vec3 aPosition;
attribute vec2 aTexCoord;

// variables for passing texture coordinates to fragment shader
varying vec2 vTexCoord;

void main() {
    // copy for passthrough
    vTexCoord = aTexCoord;
    vec4 positionVec4 = vec4(aPosition, 1.0);
    // adjust to browser window
    positionVec4.xy = positionVec4.xy * 2.0 - 1.0;
    gl_Position = positionVec4;
}
