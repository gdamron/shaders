#ifdef GL_ES
precision mediump float;
#endif

// texture coordinates from vertex shader
varying vec2 vTexCoord;

// the actual texture and screen resolution from the browser
uniform sampler2D uTexture;
uniform vec2 uResolution;

// app level parameters
uniform float uThresh0;
uniform float uThresh1;
uniform float uThresh2;

uniform float uMultiplier0;
uniform float uMultiplier1;
uniform float uMultiplier2;
uniform float uMultiplier3;

uniform float uEdgeStrength;
uniform float uEdgeSensitivity;
uniform float uEdgeGreyThresh;

// helper constants
const float uv_length = 4.0;

// Sobel edge detection
void sobel_kernel(inout vec4 g[9], sampler2D tex, vec2 crd, vec2 res) {

    float w = 1.0 / res.x;
    float h = 1.0 / res.y;

    g[0] = texture2D(tex, crd + vec2( -w, -h));
    g[1] = texture2D(tex, crd + vec2(0.0, -h));
    g[2] = texture2D(tex, crd + vec2(  w, -h));
    g[3] = texture2D(tex, crd + vec2( -w, 0.0));
    g[4] = texture2D(tex, crd);
    g[5] = texture2D(tex, crd + vec2(  w, 0.0));
    g[6] = texture2D(tex, crd + vec2( -w, h));
    g[7] = texture2D(tex, crd + vec2(0.0, h));
    g[8] = texture2D(tex, crd + vec2(  w, h));
}

vec4 edge_color(vec4 g[9]) {
    vec4 sobel_edge_h = g[2] + (uEdgeStrength*g[5]) + g[8] - (g[0] + (uEdgeStrength*g[3]) + g[6]);
    vec4 sobel_edge_v = g[0] + (uEdgeStrength*g[1]) + g[2] - (g[6] + (uEdgeStrength*g[7]) + g[8]);
    vec4 sobel = sqrt((sobel_edge_h * sobel_edge_h) + (sobel_edge_v * sobel_edge_v));
    sobel.xyz = min(sobel.xyz, vec3(1));
    vec4 sobelColor = vec4(vec3(dot(sobel.xyz, vec3(uEdgeSensitivity))), 1.0);
    sobelColor.rgb = 1. - sobelColor.rgb;

    return sobelColor;
}

void main() {
    // flip texture
    vec2 uv = (1.0 - vTexCoord);

    // check for outline
    vec4 g[9];
    sobel_kernel(g, uTexture, uv.st, uResolution);
    vec4 color = edge_color(g);

    if (color.r > uEdgeGreyThresh && color.g > uEdgeGreyThresh && color.b > uEdgeGreyThresh) {
        color = texture2D(uTexture, uv);
    }

    // multiply color iin steps based on intensity
    float mult = uMultiplier3;
    float level = dot(color, vec4(1.)) / uv_length;
    if (level > uThresh0) {
        mult = uMultiplier0;
        color = vec4(1.);
    } else if (level > uThresh1) {
        mult = uMultiplier1;
    } else if (level > uThresh2) {
        mult = uMultiplier2;
    }

    color.rbg *= mult;
    gl_FragColor = color;
}
