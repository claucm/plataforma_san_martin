import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent, ApexChart, ApexAxisChartSeries, ApexXAxis } from 'ng-apexcharts';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { AnimationMixer, Clock } from 'three';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, ChartComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit, OnDestroy {
  users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor' }
  ];

  chartOptions: ApexChart = {
    type: 'bar',
    height: 350
  };

  chartSeries: ApexAxisChartSeries = [
    {
      name: 'Sales',
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
    }
  ];

  xAxis: ApexXAxis = {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
  };

  lineChart = {
    series: [
      {
        name: "Sales",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
      }
    ],
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
    }
  };

  chart: ApexChart = {
    type: 'line',
    height: 350
  };

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private mixer!: AnimationMixer;
  private clock = new Clock();
  private animationId: any;

  ngAfterViewInit(): void {
    this.initThreeJS();
    this.speakWelcome();
  }

  ngOnDestroy(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    if (this.renderer) {
      this.renderer.dispose();
    }
  }

  private initThreeJS(): void {
    const canvas = document.getElementById('threejs-canvas') as HTMLCanvasElement;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    this.camera.position.set(0, 1.5, 3);

    // Add lights
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
    hemiLight.position.set(0, 20, 0);
    this.scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff);
    dirLight.position.set(3, 10, 10);
    this.scene.add(dirLight);

    // Load GLTF model with morph animations
    const loader = new GLTFLoader();
    loader.load(
      'https://threejs.org/examples/models/gltf/RobotExpressive/RobotExpressive.glb',
      (gltf) => {
        const model = gltf.scene;
        this.scene.add(model);

        this.mixer = new AnimationMixer(model);
        const action = this.mixer.clipAction(gltf.animations[0]);
        action.play();

        this.animate();
      },
      undefined,
      (error) => {
        console.error('Error loading model:', error);
      }
    );

    window.addEventListener('resize', this.onWindowResize);
  }

  private animate = (): void => {
    this.animationId = requestAnimationFrame(this.animate);

    const delta = this.clock.getDelta();
    if (this.mixer) {
      this.mixer.update(delta);
    }

    this.renderer.render(this.scene, this.camera);
  }

  private onWindowResize = (): void => {
    const canvas = this.renderer.domElement;
    this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  }

  private speakWelcome(): void {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance('Bienvenido a investigación San Martín');
      window.speechSynthesis.speak(utterance);
    }
  }
}
