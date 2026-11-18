/**
 * कल्रा KRUTI by Vyara (Klakruti by Vyara) - Optimized Ultra-Smooth 3D Silk Simulation
 * Engineered for 60/120 FPS Lag-Free Performance
 */

(function () {
  const canvas = document.getElementById('silk-canvas');
  if (!canvas) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 22);

  // High performance WebGL renderer with powerPreference
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance',
    stencil: false,
    depth: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

  // Optimized Grid Geometry (Smooth yet lightweight, prevents CPU bottlenecks)
  const width = 42;
  const height = 28;
  const segmentsW = 38;
  const segmentsH = 26;
  const geometry = new THREE.PlaneGeometry(width, height, segmentsW, segmentsH);

  // Pure Mulberry Silk Material with antique gold sheen
  const material = new THREE.MeshPhysicalMaterial({
    color: 0xdeb887,
    roughness: 0.38,
    metalness: 0.55,
    clearcoat: 0.75,
    clearcoatRoughness: 0.3,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.78
  });

  const silkMesh = new THREE.Mesh(geometry, material);
  silkMesh.rotation.x = -0.42;
  silkMesh.rotation.y = 0.08;
  silkMesh.position.set(0, -1, -3);
  scene.add(silkMesh);

  // Compute initial normals once
  geometry.computeVertexNormals();

  // Floating micro-embers (Lightweight particle system)
  const particleCount = 80;
  const particleGeo = new THREE.BufferGeometry();
  const particlePositions = new Float32Array(particleCount * 3);
  const particleVelocities = new Float32Array(particleCount);

  for (let i = 0; i < particleCount; i++) {
    particlePositions[i * 3] = (Math.random() - 0.5) * 44;
    particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 28;
    particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 16;
    particleVelocities[i] = Math.random() * 0.015 + 0.008;
  }
  particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

  const particleMat = new THREE.PointsMaterial({
    color: 0xe5c78f,
    size: 0.16,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending
  });

  const particleSystem = new THREE.Points(particleGeo, particleMat);
  scene.add(particleSystem);

  // Lighting - Warm Golden Hue
  const ambientLight = new THREE.AmbientLight(0xfff5ea, 0.95);
  scene.add(ambientLight);

  const keyLight = new THREE.DirectionalLight(0xffecd0, 1.6);
  keyLight.position.set(12, 16, 14);
  scene.add(keyLight);

  const rimLight = new THREE.DirectionalLight(0xc89d56, 1.4);
  rimLight.position.set(-14, -8, 8);
  scene.add(rimLight);

  // Dynamic Cursor Point Light (Highlights golden weave sheen on mouse motion)
  const cursorLight = new THREE.PointLight(0xffe2a4, 2.2, 40);
  cursorLight.position.set(0, 0, 10);
  scene.add(cursorLight);

  // Interaction State
  let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
  let scrollProgress = 0;
  let targetScrollProgress = 0;
  let isTabActive = true;

  document.addEventListener('visibilitychange', () => {
    isTabActive = !document.hidden;
  });

  window.addEventListener('mousemove', (e) => {
    mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
  }, { passive: true });

  window.addEventListener('scroll', () => {
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    targetScrollProgress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
  }, { passive: true });

  // Pre-cached vertex counts & arrays
  const pos = geometry.attributes.position;
  const vertexCount = pos.count;
  const clock = new THREE.Clock();

  let isHeroVisible = true;

  // Smart Intersection Observer to pause Three.js rendering when Hero is scrolled out of view
  const heroSection = document.getElementById('home');
  if ('IntersectionObserver' in window && heroSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isHeroVisible = entry.isIntersecting;
      });
    }, { threshold: 0.05 });
    observer.observe(heroSection);
  }

  function animate() {
    requestAnimationFrame(animate);
    if (!isTabActive || !isHeroVisible) return;

    const elapsedTime = clock.getElapsedTime();

    // Smooth lerping for completely natural, lag-free fluid motion
    mouse.x += (mouse.targetX - mouse.x) * 0.04;
    mouse.y += (mouse.targetY - mouse.y) * 0.04;
    scrollProgress += (targetScrollProgress - scrollProgress) * 0.06;

    const time = elapsedTime * 0.75 + scrollProgress * 3.0;

    // Fast, optimized wave calculation (zero normal re-computation overhead)
    for (let i = 0; i < vertexCount; i++) {
      const u = (i % (segmentsW + 1)) / segmentsW;
      const v = Math.floor(i / (segmentsW + 1)) / segmentsH;

      const wave1 = Math.sin(u * 4.0 + time * 1.5) * 1.15;
      const wave2 = Math.cos(v * 3.5 + time * 1.2) * 0.9;
      const mouseDist = Math.hypot(u - 0.5 - mouse.x * 0.2, v - 0.5 - mouse.y * 0.2);
      const mouseInfluence = Math.sin(mouseDist * 7.0 - time * 2.5) * Math.max(0, 1.0 - mouseDist * 2.5) * 0.6;
      const scrollDrift = Math.sin(u * 5.0 - scrollProgress * 8.0) * 0.4;

      pos.setZ(i, wave1 + wave2 + mouseInfluence + scrollDrift);
    }
    pos.needsUpdate = true;

    // Smooth whole-mesh organic rolling
    silkMesh.rotation.z = Math.sin(elapsedTime * 0.15) * 0.03 + scrollProgress * 0.12;
    silkMesh.rotation.x = -0.42 + scrollProgress * 0.1 + mouse.y * 0.05;
    silkMesh.rotation.y = 0.08 + mouse.x * 0.08;
    silkMesh.position.y = -1 - scrollProgress * 1.8;

    // Interactive cursor lighting & subtle 3D spatial camera tracking
    cursorLight.position.x = mouse.x * 12;
    cursorLight.position.y = mouse.y * 8;
    camera.position.x = mouse.x * 0.8;
    camera.position.y = mouse.y * 0.5;
    camera.lookAt(0, 0, 0);

    // Floating particles
    const pArray = particleGeo.attributes.position.array;
    for (let i = 0; i < particleCount; i++) {
      pArray[i * 3 + 1] += particleVelocities[i];
      if (pArray[i * 3 + 1] > 14) {
        pArray[i * 3 + 1] = -14;
      }
    }
    particleGeo.attributes.position.needsUpdate = true;
    particleSystem.rotation.y = elapsedTime * 0.01;

    renderer.render(scene, camera);
  }

  animate();

  // Resize Listener
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  }, { passive: true });
})();
