import vertexShaderSource from './shaders/vertex.glsl';
import fragmentShaderSource from './shaders/fragment.glsl';

window.onload = () => {
    const canvas = document.querySelector('canvas');

    const gl = canvas.getContext('webgl2');

    const vertices = [
        -0.5, -0.5, 0.0,
        0.5, -0.5, 0.0,
        0.0, 0.5, 0.0
    ];

    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);

    const vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 3 * 4, 0);
    gl.enableVertexAttribArray(0);

    const vertexShader = gl.createShader(gl.VERTEX_SHADER);

    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.compileShader(vertexShader);

    const vertexShaderLog = gl.getShaderInfoLog(vertexShader);

    if (vertexShaderLog) {
        throw vertexShaderLog;
    }

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

    gl.shaderSource(fragmentShader, fragmentShaderSource);
    gl.compileShader(fragmentShader);

    const fragmentShaderLog = gl.getShaderInfoLog(fragmentShader);

    if (fragmentShaderLog) {
        throw fragmentShaderLog;
    }

    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    const shaderProgramLog = gl.getProgramInfoLog(shaderProgram);

    if (shaderProgramLog) {
        throw shaderProgramLog;
    }

    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);

    render();

    function render() {
        window.requestAnimationFrame(() => {
            gl.useProgram(shaderProgram);

            gl.bindVertexArray(vao);
            gl.drawArrays(gl.TRIANGLES, 0, 3);

            render();
        });
    }
};
