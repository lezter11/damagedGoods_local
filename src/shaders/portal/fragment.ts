export const portalFragmentShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uResolution;
  uniform float uZoom;
  uniform float uOpacity;

  varying vec2 vUv;

  // --- Simplex Noise 3D ---
  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                        -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
          + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ; m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  // Fractional Brownian Motion (FBM)
  float fbm(vec2 x) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100.0);
    // Rotate to reduce axial bias
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
    for (int i = 0; i < 4; ++i) {
        v += a * snoise(x);
        x = rot * x * 2.0 + shift;
        a *= 0.5;
    }
    return v;
  }

  // --- SDF Primitives ---
  // Rounded Box
  float sdRoundedBox( vec2 p, vec2 b, vec4 r ) {
    r.xy = (p.x>0.0)?r.xy : r.zw;
    r.x  = (p.y>0.0)?r.x  : r.y;
    vec2 q = abs(p)-b+r.x;
    return min(max(q.x,q.y),0.0) + length(max(q,0.0)) - r.x;
  }
  
  // Circle
  float sdCircle( vec2 p, float r ) {
    return length(p) - r;
  }
  
  // Polynomial Smooth Minimum (Smooth Union)
  float smin(float a, float b, float k) {
    float h = clamp( 0.5 + 0.5*(b-a)/k, 0.0, 1.0 );
    return mix( b, a, h ) - k*h*(1.0-h);
  }

  // Main Distance Function
  float map(vec2 p, vec2 mouse) {
    // 1. Fluid Noise Deformation using FBM
    // We add time into the UV to animate the noise
    float noise = fbm(p * 2.5 + uTime * 0.15) * 0.06 * uZoom;
    vec2 distortedP = p + noise;

    // 2. Cursor Attraction Space Warping
    float distToMouse = length(p - mouse);
    float pullStrength = smoothstep(0.4, 0.0, distToMouse) * 0.15 * uZoom; 
    vec2 dirToMouse = normalize(p - mouse + 0.0001);
    distortedP -= dirToMouse * pullStrength; 

    // 3. Shape Construction
    // Main architectural window
    vec2 bMain = vec2(0.30, 0.45);
    vec4 rMain = vec4(0.40, 0.40, 0.08, 0.08);
    float dMain = sdRoundedBox(distortedP, bMain, rMain);

    // Inner Hole (subtracted)
    vec2 bHole = vec2(0.12, 0.25);
    vec4 rHole = vec4(0.20, 0.20, 0.05, 0.05);
    float dHole = sdRoundedBox(distortedP - vec2(-0.03, 0.0), bHole, rHole);
    
    // Core shape = max(outer, -inner)
    float dShape = max(dMain, -dHole);

    // Add satellite liquid droplets merging via smin
    float dDrop1 = sdCircle(distortedP - vec2(0.35, 0.2), 0.06 * uZoom);
    float dDrop2 = sdCircle(distortedP - vec2(-0.25, -0.3), 0.04 * uZoom);
    float dDrop3 = sdCircle(distortedP - vec2(0.1, 0.4), 0.03 * uZoom);
    float dDrop4 = sdCircle(distortedP - mouse * 0.8, 0.05 * uZoom * pullStrength * 10.0); // Droplet following mouse

    dShape = smin(dShape, dDrop1, 0.12 * uZoom);
    dShape = smin(dShape, dDrop2, 0.1 * uZoom);
    dShape = smin(dShape, dDrop3, 0.08 * uZoom);
    
    // Smoothly merge mouse droplet if it exists
    if (pullStrength > 0.0) {
      dShape = smin(dShape, dDrop4, 0.15 * uZoom);
    }

    return dShape;
  }

  void main() {
    // Normalize UVs to center and correct aspect ratio
    vec2 p = vUv - 0.5;
    p.x *= uResolution.x / uResolution.y;

    // Mouse normalized coordinates
    vec2 mouse = uMouse;
    mouse.x *= uResolution.x / uResolution.y;

    // 1. ZOOM SYSTEM
    // We must zoom into the solid stroke of the D (where dShape < 0), not the center hole.
    // The right stroke is around X = 0.20
    vec2 zoomCenter = vec2(0.20, 0.0); 
    p = (p - zoomCenter) * max(uZoom, 0.0001) + zoomCenter;

    // 2. GET DISTANCE
    float dShape = map(p, mouse);

    // 3. NORMAL APPROXIMATION (Gradient of SDF)
    vec2 e = vec2(0.001 * uZoom, 0.0);
    vec3 normal = normalize(vec3(
        map(p + e.xy, mouse) - map(p - e.xy, mouse),
        map(p + e.yx, mouse) - map(p - e.yx, mouse),
        0.05 * uZoom // Z depth for normal
    ));

    // 4. EDGE EFFECTS (Specular Rim & Refraction Shadow)
    // We create a rim light effect right at the boundary
    float edgeThickness = 0.03 * uZoom;
    float edgeMask = smoothstep(edgeThickness, 0.0, abs(dShape));
    
    // Light calculation based on normal
    vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0));
    float specular = pow(max(dot(normal, lightDir), 0.0), 16.0);
    float diffuse = max(dot(normal, vec3(-lightDir.x, -lightDir.y, lightDir.z)), 0.0);

    // 5. ANTI-ALIASING via fwidth
    // fwidth tells us how much dShape changes across one physical screen pixel
    float fw = fwidth(dShape);
    
    // If fw is very small (zoomed out), we clamp it to avoid division by zero.
    // The smoothstep creates a perfect 1-pixel soft edge no matter the zoom level.
    float isOutside = smoothstep(-fw, fw, dShape);

    // Base colors
    vec3 colorWhite = vec3(1.0, 1.0, 1.0);
    vec3 colorGlass = vec3(0.95, 0.95, 1.0); // Slight blue tint for the rim
    
    // Mix the rim light into the white edge
    vec3 finalRGB = colorWhite;
    finalRGB = mix(finalRGB, colorGlass + specular * 0.5 - diffuse * 0.1, edgeMask * isOutside);

    // The transparency mask. Inside the portal is 0.0, outside is 1.0.
    float finalAlpha = isOutside;

    // Global fade out
    finalAlpha *= uOpacity;

    gl_FragColor = vec4(finalRGB, finalAlpha);
  }
`;
