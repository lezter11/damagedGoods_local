export const portalVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    // Push this to the absolute front (closest to camera)
    // but we will disable depthTest on the material so it overwrites everything behind it.
    gl_Position = vec4(position.xy, 0.99, 1.0);
  }
`;
