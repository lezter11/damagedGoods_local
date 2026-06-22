import * as THREE from 'three';
import { shaderMaterial } from '@react-three/drei';
import { portalVertexShader } from '../portal/vertex';
import { portalFragmentShader } from '../portal/fragment';

export const PortalShaderMaterial = shaderMaterial(
  {
    uTime: 0,
    uMouse: new THREE.Vector2(0, 0),
    uResolution: new THREE.Vector2(1, 1),
    uZoom: 1.0,
    uOpacity: 1.0,
  },
  portalVertexShader,
  portalFragmentShader
);
