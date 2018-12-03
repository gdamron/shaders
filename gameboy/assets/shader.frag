#ifdef GL_ES
precision mediump float;
#endif

// texture coordinates from vertex shader
varying vec2 vTexCoord;
uniform sampler2D tex0;
uniform vec2 resolution;

vec4 darker = vec4(0.0625, 0.2227, 0.0625, 1.0);
vec4 dark = vec4(0.1914, 0.3867, 0.1914, 1.0);
vec4 light = vec4(0.5469, 0.6758, 0.625, 1.0);
vec4 lighter = vec4(0.6, 0.738, 0.0625, 1.0);

float lighter_thresh = 0.625;
float light_thresh = 0.5;
float dark_thresh = 0.375;

float uv_length = 4.0;
vec4 unit_vec4 = vec4(1.0);

vec2 pixel_size = vec2(10.0, 10.0);

void main() {
    vec2 uv = (1.0 - vTexCoord);
    vec2 delta = pixel_size / resolution;

    uv = floor(uv / delta) * delta;
    vec4 tex = texture2D(tex0, uv);

    float level = dot(tex, unit_vec4) / uv_length;
    if (level > lighter_thresh) {
        tex = lighter;
    } else if (level > light_thresh) {
        tex = light;
    } else if (level > dark_thresh) {
        tex = dark;
    } else {
        tex = darker;
    }

    gl_FragColor = tex;
}
