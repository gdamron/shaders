let shaders;
let camera;

function preload() {
    shaders = loadShader('assets/shader.vert', 'assets/shader.frag');
}

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    noStroke();

    camera = createCapture(VIDEO);
    camera.size(windowWidth, windowHeight);
    camera.hide();
}

function draw() {
    shader(shaders);
    shaders.setUniform('uResolution', [width, height])
    shaders.setUniform('uTexture', camera);
    rect(0, 0, width, height);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight)
}
