let shaders;
let cam;

function preload() {
    shaders = loadShader('assets/shader.vert', 'assets/shader.frag');
}

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    noStroke();

    cam = createCapture(VIDEO);
    cam.size(windowWidth, windowHeight);
    cam.hide();
}

function draw() {
    shader(shaders);
    shaders.setUniform('resolution', [width, height])
    shaders.setUniform('tex0', cam);
    rect(0, 0, width, height);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight)
}
