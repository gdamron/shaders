#ifdef GL_ES
precision mediump float;
#endif

// texture coordinates from vertex shader
varying vec2 vTexCoord;

// the actual texture and screen resolution from the browser
uniform sampler2D uTexture;
uniform vec2 uResolution;

// original gameboy color palette
vec4 darker = vec4(0.0625, 0.2227, 0.0625, 1.0);
vec4 dark = vec4(0.1914, 0.3867, 0.1914, 1.0);
vec4 light = vec4(0.5469, 0.6758, 0.625, 1.0);
vec4 lighter = vec4(0.6, 0.738, 0.0625, 1.0);

// color intensity thresholds found through experiementation
float lighter_thresh = 0.625;
float light_thresh = 0.5;
float dark_thresh = 0.375;

// helper constants
const float uv_length = 4.0;
const vec4 unit_vec4 = vec4(1.0);
const vec2 pixel_size = vec2(10.0, 10.0);

void main() {
    // flip texture
    vec2 uv = (1.0 - vTexCoord);
    // adjust pixel size depending on resolution
    vec2 delta = pixel_size / uResolution.x;

    //pixelate
    uv = floor(uv / delta) * delta;
    vec4 color = texture2D(uTexture, uv);

    // set color in steps based on intensity
    float level = dot(color, unit_vec4) / uv_length;
    if (level > lighter_thresh) {
        color = lighter;
    } else if (level > light_thresh) {
        color = light;
    } else if (level > dark_thresh) {
        color = dark;
    } else {
        color = darker;
    }

    gl_FragColor = color;
}
