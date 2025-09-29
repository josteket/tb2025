let cleanupRef = { fn: () => {} };
let renderer;
let animationFrame;

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function disposeThreeScene() {
  cleanupRef.fn?.();
}

export function initThreeScene({ canvas, flags }) {
  if (!canvas || prefersReducedMotion) {
    return () => {};
  }

  let disposed = false;
  cleanupRef.fn();
  cleanupRef = { fn: () => {} };

  (async () => {
    try {
      const THREE = await import('https://cdn.skypack.dev/three@0.160.0');
      const { EffectComposer } = await import(
        'https://cdn.skypack.dev/three@0.160.0/examples/jsm/postprocessing/EffectComposer.js'
      );
      const { RenderPass } = await import(
        'https://cdn.skypack.dev/three@0.160.0/examples/jsm/postprocessing/RenderPass.js'
      );
      const { UnrealBloomPass } = await import(
        'https://cdn.skypack.dev/three@0.160.0/examples/jsm/postprocessing/UnrealBloomPass.js'
      );
      const { ShaderPass } = await import(
        'https://cdn.skypack.dev/three@0.160.0/examples/jsm/postprocessing/ShaderPass.js'
      );
      const { RGBShiftShader } = await import(
        'https://cdn.skypack.dev/three@0.160.0/examples/jsm/shaders/RGBShiftShader.js'
      );

      const scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2('#02101d', 0.08);

      const camera = new THREE.PerspectiveCamera(48, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
      camera.position.set(0, 0.6, 4);

      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
      renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
      renderer.setClearColor('#000000', 0);

      const clock = new THREE.Clock();

      const helmetGroup = new THREE.Group();
      scene.add(helmetGroup);

      const glowMaterial = new THREE.MeshStandardMaterial({
        color: '#1d9eff',
        roughness: 0.3,
        metalness: 0.9,
        emissive: '#0a3e5f',
        emissiveIntensity: 1.2
      });

      const visorMaterial = new THREE.MeshStandardMaterial({
        color: '#102e45',
        roughness: 0.15,
        metalness: 1,
        emissive: '#00e5ff',
        emissiveIntensity: 0.35,
        transparent: true,
        opacity: 0.85
      });

      const baseMaterial = new THREE.MeshStandardMaterial({
        color: '#0c121d',
        roughness: 0.4,
        metalness: 0.6
      });

      function createHelmet() {
        // Заменить на реальный GLB в public/models/ при появлении финального логотипа
        const helmet = new THREE.Group();

        const headGeometry = new THREE.IcosahedronGeometry(1.1, 1);
        const headMesh = new THREE.Mesh(headGeometry, glowMaterial);
        helmet.add(headMesh);

        const visorShape = new THREE.Shape();
        visorShape.moveTo(-0.6, 0.2);
        visorShape.quadraticCurveTo(0, -0.4, 0.6, 0.2);
        visorShape.lineTo(0.6, 0.6);
        visorShape.quadraticCurveTo(0, 0.9, -0.6, 0.6);
        const visorGeometry = new THREE.ExtrudeGeometry(visorShape, { depth: 0.3, bevelEnabled: false });
        visorGeometry.translate(0, 0, 0.8);
        const visorMesh = new THREE.Mesh(visorGeometry, visorMaterial);
        visorMesh.rotation.y = Math.PI;
        helmet.add(visorMesh);

        const baseGeometry = new THREE.CylinderGeometry(0.9, 1.3, 0.6, 24, 1, true);
        const baseMesh = new THREE.Mesh(baseGeometry, baseMaterial);
        baseMesh.position.y = -0.9;
        helmet.add(baseMesh);

        return helmet;
      }

      const helmet = createHelmet();
      helmetGroup.add(helmet);

      const accentRingGeometry = new THREE.TorusGeometry(1.4, 0.02, 16, 200);
      const accentRingMaterial = new THREE.MeshBasicMaterial({ color: '#00e5ff' });
      const accentRing = new THREE.Mesh(accentRingGeometry, accentRingMaterial);
      accentRing.rotation.x = Math.PI / 2;
      helmetGroup.add(accentRing);

      const ambient = new THREE.AmbientLight('#a3c7ff', 0.8);
      scene.add(ambient);

      const keyLight = new THREE.DirectionalLight('#8acbff', 1.2);
      keyLight.position.set(3, 3, 4);
      scene.add(keyLight);

      const rimLight = new THREE.DirectionalLight('#e53935', 0.8);
      rimLight.position.set(-4, 2, -2);
      scene.add(rimLight);

      let particles;
      if (flags.enableParticles) {
        const particleGeometry = new THREE.BufferGeometry();
        const particleCount = 600;
        const positions = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount; i += 1) {
          positions[i * 3] = (Math.random() - 0.5) * 14;
          positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
          positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
        }
        particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const particleMaterial = new THREE.PointsMaterial({
          size: 0.04,
          color: '#00e5ff',
          transparent: true,
          opacity: 0.65
        });
        particles = new THREE.Points(particleGeometry, particleMaterial);
        scene.add(particles);
      }

      let composer;
      if (flags.enableBloom) {
        composer = new EffectComposer(renderer);
        const renderPass = new RenderPass(scene, camera);
        composer.addPass(renderPass);
        const bloomPass = new UnrealBloomPass(new THREE.Vector2(canvas.clientWidth, canvas.clientHeight), 0.8, 0.8, 0.01);
        composer.addPass(bloomPass);
        const chromaPass = new ShaderPass(RGBShiftShader);
        chromaPass.uniforms.amount.value = 0.0016;
        composer.addPass(chromaPass);
      }

      let pointer = { x: 0, y: 0 };
      const handlePointerMove = (event) => {
        pointer = {
          x: (event.clientX / window.innerWidth) * 2 - 1,
          y: -(event.clientY / window.innerHeight) * 2 + 1
        };
      };
      window.addEventListener('pointermove', handlePointerMove);

      function onResize() {
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height, false);
        composer?.setSize(width, height);
      }
      window.addEventListener('resize', onResize);

      function animate() {
        if (disposed) return;
        const elapsed = clock.getElapsedTime();
        helmet.rotation.y = Math.sin(elapsed * 0.35) * 0.3 + pointer.x * 0.3;
        helmet.rotation.x = Math.cos(elapsed * 0.25) * 0.1 + pointer.y * 0.15;
        helmet.scale.setScalar(0.98 + Math.sin(elapsed * 0.8) * 0.02);
        accentRing.material.color.setHSL((Math.sin(elapsed * 0.2) + 1) / 2, 0.6, 0.6);
        if (particles) {
          particles.rotation.y += 0.0008;
        }
        if (composer) {
          composer.render();
        } else {
          renderer.render(scene, camera);
        }
        animationFrame = requestAnimationFrame(animate);
      }

      animate();
      onResize();

      cleanupRef.fn = () => {
        disposed = true;
        cancelAnimationFrame(animationFrame);
        window.removeEventListener('resize', onResize);
        window.removeEventListener('pointermove', handlePointerMove);
        renderer?.dispose();
        renderer?.forceContextLoss?.();
        renderer = undefined;
        if (particles) {
          particles.geometry.dispose();
        }
        helmetGroup.clear();
        scene.traverse((obj) => {
          if (obj.isMesh) {
            obj.geometry?.dispose();
            obj.material?.dispose?.();
          }
        });
      };
    } catch (error) {
      console.error('Three.js сцену загрузить не удалось', error);
    }
  })();

  return () => cleanupRef.fn();
}
