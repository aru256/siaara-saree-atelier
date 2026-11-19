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

  // Pure Mulberry Silk Material with antique gold sheen and liquid satin drape
  const material = new THREE.MeshPhysicalMaterial({
    color: 0xdfb987,
    roughness: 0.28,
    metalness: 0.46,
    clearcoat: 0.92,
    clearcoatRoughness: 0.24,
    reflectivity: 0.88,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.84
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

  // Mobile Touch Support: Touch drag moves cursor lighting & silk ripples
  function handleTouch(e) {
    if (e.touches && e.touches.length > 0) {
      const touch = e.touches[0];
      mouse.targetX = (touch.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(touch.clientY / window.innerHeight) * 2 + 1;
    }
  }
  window.addEventListener('touchmove', handleTouch, { passive: true });
  window.addEventListener('touchstart', handleTouch, { passive: true });

  // Mobile Device Tilt / Gyroscope (Silky gentle motion when tilting phone)
  if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', (e) => {
      if (e.gamma !== null && e.beta !== null) {
        mouse.targetX = Math.min(1, Math.max(-1, e.gamma / 25));
        mouse.targetY = Math.min(1, Math.max(-1, (e.beta - 40) / 25));
      }
    }, { passive: true });
  }

  // Cross-Platform Scroll Calculation (Works with native touch scroll & Lenis)
  function updateScrollProgress() {
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    targetScrollProgress = Math.min(1, Math.max(0, (window.pageYOffset || window.scrollY) / maxScroll));
  }
  window.addEventListener('scroll', updateScrollProgress, { passive: true });

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

    // Multi-harmonic satin silk cloth folds (simulates realistic pleats and fluid drape)
    for (let i = 0; i < vertexCount; i++) {
      const u = (i % (segmentsW + 1)) / segmentsW;
      const v = Math.floor(i / (segmentsW + 1)) / segmentsH;

      // Primary diagonal cascade fold (mimics heavy pallu draping)
      const primaryFold = Math.sin((u * 2.4 + v * 3.6) + time * 0.85) * 1.45;
      // Secondary transverse wave
      const secondaryWave = Math.cos(v * 4.2 - u * 1.8 + time * 1.1) * 0.75;
      // Micro satin ripples
      const microRipple = Math.sin(u * 8.5 + v * 6.2 + time * 1.7) * 0.28;
      // Center sag (natural gravity drape)
      const gravitySag = Math.sin(u * Math.PI) * Math.sin(v * Math.PI) * 0.55;
      // Interactive pointer ripple
      const mouseDist = Math.hypot(u - 0.5 - mouse.x * 0.22, v - 0.5 - mouse.y * 0.22);
      const mouseInfluence = Math.sin(mouseDist * 8.0 - time * 2.8) * Math.max(0, 1.0 - mouseDist * 2.8) * 0.7;
      // Natural scroll velocity glide
      const scrollDrift = Math.sin(u * 4.5 - scrollProgress * 7.5) * 0.45;

      pos.setZ(i, primaryFold + secondaryWave + microRipple + gravitySag + mouseInfluence + scrollDrift);
    }
    pos.needsUpdate = true;

    // Smooth whole-mesh organic rolling
    silkMesh.rotation.z = Math.sin(elapsedTime * 0.15) * 0.03 + scrollProgress * 0.12;
    silkMesh.rotation.x = -0.42 + scrollProgress * 0.1 + mouse.y * 0.05;
    silkMesh.rotation.y = 0.08 + mouse.x * 0.08;
    silkMesh.position.y = -1 - scrollProgress * 1.8;

    // Interactive cursor lighting & camera depth choreography
    cursorLight.position.x = mouse.x * 12;
    cursorLight.position.y = mouse.y * 8;
    camera.position.x = mouse.x * 0.9;
    camera.position.y = mouse.y * 0.6 - scrollProgress * 3.5;
    camera.position.z = 22 + scrollProgress * 4.5;
    camera.lookAt(0, -scrollProgress * 1.5, 0);

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
