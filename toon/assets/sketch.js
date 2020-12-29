let shaders;
let camera;
let sliders;

function preload() {
    shaders = loadShader('assets/shader.vert', 'assets/shader.frag');
}

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    noStroke();

    camera = createCapture(VIDEO);
    camera.size(windowWidth, windowHeight);
    camera.hide();

    sliders = {
        'uThresh0': createParameterSlider('Bright Threshold', 0.0, 1.0, 0.8, 0),
        'uThresh1': createParameterSlider('Mid Threshold', 0.0, 1.0, 0.6, 1),
        'uThresh2': createParameterSlider('Dark Threshold', 0.0, 1.0, 0.4, 2),

        'uMultiplier0': createParameterSlider('Bright Multiplier', 0.0, 1.0, 0.9, 3),
        'uMultiplier1': createParameterSlider('Mid Multiplier', 0.0, 1.0, 0.5, 4),
        'uMultiplier2': createParameterSlider('Dark Multiplier', 0.0, 1.0, 0.5, 5),
        'uMultiplier3': createParameterSlider('Black Multiplier', 0.0, 1.0, 0.0, 6),

        'uEdgeStrength': createParameterSlider('Edge Strength', 0.0, 16.0, 10.0, 7),
        'uEdgeSensitivity': createParameterSlider('Edge Sensitivity', 0.0, 4.0, 1.0, 8),
        'uEdgeGreyThresh': createParameterSlider('Edge Grey Thresh', 0.0, 1.0, 0.2, 9)
    }
}

function draw() {
    shader(shaders);

    // app level parameters
    shaders.setUniform('uThresh0', sliders['uThresh0'].value());
    shaders.setUniform('uThresh1', sliders['uThresh1'].value());
    shaders.setUniform('uThresh2', sliders['uThresh2'].value());

    shaders.setUniform('uMultiplier0', sliders['uMultiplier0'].value());
    shaders.setUniform('uMultiplier1', sliders['uMultiplier1'].value());
    shaders.setUniform('uMultiplier2', sliders['uMultiplier2'].value());
    shaders.setUniform('uMultiplier3', sliders['uMultiplier3'].value());

    shaders.setUniform('uEdgeStrength', sliders['uEdgeStrength'].value());
    shaders.setUniform('uEdgeSensitivity', sliders['uEdgeSensitivity'].value());
    shaders.setUniform('uEdgeGreyThresh', sliders['uEdgeGreyThresh'].value());

    // canvas uniforms
    shaders.setUniform('uResolution', [width, height])
    shaders.setUniform('uTexture', camera);

    rect(0, 0, width, height);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight)
}

function createParameterSlider(name, min, max, val, index, step=0.01) {
    const slider = createSlider(min, max, val, step);
    slider.position(windowWidth - 88,  16 * index + 8);
    slider.style('width', '80px');

    const label = createDiv(name);
    label.position(windowWidth - 88 - 120, 16 * index + 8);
    return slider;
}
