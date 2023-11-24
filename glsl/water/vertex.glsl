varying vec2 vUv;
uniform float uTime;

void main() {
    float wave = abs(sin(uTime + vUv.x * 15.0)) * 0.05;  
    
    vec4 modelPosition = modelMatrix * vec4(position.x, position.y + wave, position.z, 1.0);
    
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;
    
    gl_Position = projectionPosition;
    vUv = uv;
}
