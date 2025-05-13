import { P5CanvasInstance, ReactP5Wrapper, SketchProps } from '@p5-wrapper/react';
import P5 from 'p5';

export const fundLogoLength = 2;

export type ParticleGLProps = SketchProps & {
  activeAnim?: boolean;
  imageIdx: number;
  id?: string;
};
function sketch(p5: P5CanvasInstance<ParticleGLProps>) {
  // console.log('sketch 函数开始执行');
  let id = 'particle-container';
  let canvas: P5.Renderer;
  const sourceImgs: P5.Image[] = [];
  let allParticles: Particle[] = [];
  const IS_MOBILE = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const defaultConfig = {
    scaleNum: 1.25,
    loadPercentage: 0.006,
    resolution: IS_MOBILE ? 15 : 5,
  };
  const closeEnoughTarget = 100;
  const speed = 3;
  const particleSize = IS_MOBILE ? 4 : 5;
  const mouseSize = 50;
  const scaleRatio = 1;
  let activeAnim = false;
  const sourceImgInfos: {
    scaleNum?: number;
    resize?: number[];
    url: string;
    loadPercentage?: number;
    resolution?: number;
  }[] = [
    {
      url: '/img/gl/cosine-logo.png',
      resize: [477, 288],
    },
    {
      url: '/img/gl/cosine-gallery-logo.png',
      resize: [478, 276],
    },
    {
      url: '/img/gl/moe-copy-ai-favicon.png',
      resize: [251, 274],
    },
  ];

  p5.updateWithProps = (props) => {
    if (props.activeAnim) {
      activeAnim = true;
    } else activeAnim = false;
    setImageIdx(props?.imageIdx || 0);
    id = props?.id ?? 'particle-container';
    if (canvas) canvas?.parent(id);
  };

  function generateRandomPos(x: number, y: number, mag: number) {
    const pos = new P5.Vector(x, y);

    const randomDirection = new P5.Vector(p5.random(p5.width), p5.random(p5.height));

    const vel = P5.Vector.sub(randomDirection, pos);
    vel.normalize();
    vel.mult(mag);
    pos.add(vel);

    return pos;
  }

  /**
   particle.js https://openprocessing.org/sketch/2097742
   A particle that uses a seek behaviour to move to its target.
   @param {number} x
   @param {number} y
   */
  class Particle {
    pos: P5.Vector;
    vel: P5.Vector;
    acc: P5.Vector;
    target: P5.Vector;
    isKilled: boolean;

    maxSpeed: number;
    maxForce: number;

    currentColor: P5.Color;
    endColor: P5.Color;
    colorBlendRate: number;

    currentSize: number;
    distToTarget: number;

    noiseOffsetX: number;
    noiseOffsetY: number;

    constructor(x: number, y: number) {
      this.pos = new P5.Vector(x, y);
      this.vel = new P5.Vector(0, 0);
      this.acc = new P5.Vector(0, 0);
      this.target = new P5.Vector(0, 0);
      this.isKilled = false;

      this.maxSpeed = p5.random(0.25, 2); // How fast it can move per frame.
      this.maxForce = p5.random(8, 15); // Its speed limit.

      this.currentColor = p5.color(0);
      this.endColor = p5.color(0);
      this.colorBlendRate = p5.random(0.01, 0.05);

      this.currentSize = 0;

      // Saving as class const so it doesn't need to calculate twice.
      this.distToTarget = 0;

      this.noiseOffsetX = p5.random(1000); // 噪声偏移量X
      this.noiseOffsetY = p5.random(1000); // 噪声偏移量Y
      // console.log('this.pos', this.pos);
    }

    public move() {
      // 添加基于噪声的轻微扰动
      const noiseScale = 0.005; // 噪声的缩放系数
      const noiseStrength = 0.6; // 噪声的强度
      this.acc.add(
        p5.noise(this.noiseOffsetX + this.pos.x * noiseScale, this.pos.y * noiseScale) * noiseStrength - noiseStrength / 2,
        p5.noise(this.noiseOffsetY + this.pos.y * noiseScale, this.pos.x * noiseScale) * noiseStrength - noiseStrength / 2,
      );

      this.distToTarget = p5.dist(this.pos.x, this.pos.y, this.target.x, this.target.y);

      // If it's close enough to its target, the slower it'll get
      // so that it can settle.
      let proximityMult = 1;
      if (this.distToTarget < closeEnoughTarget) {
        proximityMult = this.distToTarget / closeEnoughTarget;
        this.vel.mult(0.9);
      } else {
        proximityMult = 1;
        this.vel.mult(0.95);
      }

      // Steer towards its target.
      if (this.distToTarget > 1) {
        const steer = P5.Vector.sub(this.target, this.pos);
        steer.normalize();
        steer.mult(this.maxSpeed * proximityMult * speed);
        this.acc.add(steer);
      }

      const scaledMouseX = p5.mouseX / scaleRatio;
      const scaledMouseY = p5.mouseY / scaleRatio;

      const mouseDist = p5.dist(this.pos.x, this.pos.y, scaledMouseX, scaledMouseY);

      // Interact with mouse.
      let push = new P5.Vector(0, 0);
      if (mouseDist < mouseSize) {
        if (p5.mouseIsPressed) {
          // Push towards mouse.
          push = new P5.Vector(scaledMouseX, scaledMouseY);
          push.sub(new P5.Vector(this.pos.x, this.pos.y));
        } else {
          // Push away from mouse.
          push = new P5.Vector(this.pos.x, this.pos.y);
          push.sub(new P5.Vector(scaledMouseX, scaledMouseY));
        }
        push.normalize();
        push.mult((mouseSize - mouseDist) * 0.05);
        this.acc.add(push);
      }

      // Move it.
      this.vel.add(this.acc);
      this.vel.limit(this.maxForce * speed);
      this.pos.add(this.vel);
      this.acc.mult(0);
      this.noiseOffsetX += 0.01;
      this.noiseOffsetY += 0.01;
    }

    public draw() {
      if (!activeAnim) return;
      this.currentColor = p5.lerpColor(this.currentColor, this.endColor, this.colorBlendRate);
      p5.stroke(this.currentColor);

      let targetSize = 2;
      if (!this.isKilled) {
        // Size is bigger the closer it is to its target.
        targetSize = p5.map(p5.min(this.distToTarget, closeEnoughTarget), closeEnoughTarget, 0, 0, particleSize);
      } else {
        targetSize = 2;
      }

      this.currentSize = p5.lerp(this.currentSize, targetSize, 0.1);
      p5.strokeWeight(this.currentSize);
      p5.point(this.pos.x, this.pos.y);
    }

    public kill() {
      if (!this.isKilled) {
        this.target = generateRandomPos(p5.width / 2, p5.height / 2, p5.max(p5.width, p5.height));
        this.endColor = p5.color(0);
        this.isKilled = true;
      }
    }

    public isOutOfBounds() {
      return this.pos.x < 0 || this.pos.x > p5.width || this.pos.y < 0 || this.pos.y > p5.height;
    }
  }

  p5.preload = () => {
    // console.log('p5.preload 开始执行');
    for (let i = 0; i < sourceImgInfos.length; i++) {
      const img = p5.loadImage(sourceImgInfos[i].url);
      const [width, height] = sourceImgInfos[i]?.resize ?? [0, 0];
      const scaleNum = sourceImgInfos[i]?.scaleNum ?? defaultConfig.scaleNum;
      if (width && height) img.resize(width * scaleNum, height * scaleNum);
      else img.resize(img.width * scaleNum, img.height * scaleNum);
      sourceImgs.push(img);
    }
    // console.log('p5.preload 执行完毕');
  };

  p5.setup = () => {
    // console.log('p5.setup 开始执行');
    const ratio = 1280 / 750;
    const width = IS_MOBILE ? 800 : 1280;
    const height = width / ratio;
    canvas = p5.createCanvas(width, height);
    canvas.parent(id);
    if (!IS_MOBILE) setImageIdx(0);
  };

  function setImageIdx(idx: number) {
    const {
      scaleNum = defaultConfig.scaleNum,
      loadPercentage = defaultConfig.loadPercentage,
      resolution = defaultConfig.resolution,
      resize = [0, 0],
    } = sourceImgInfos[idx] ?? {};
    const sourceImg = sourceImgs[idx];
    if (!sourceImg) return;
    const [sourceImgWidth, sourceImgHeight] = resize;
    if (sourceImgWidth) sourceImg.resize(sourceImgWidth * scaleNum, sourceImgHeight * scaleNum);
    sourceImg.loadPixels();
    // console.log(`图像尺寸: ${sourceImg.width}x${sourceImg.height}`);
    // console.log(`loadPercentage: ${loadPercentage}, resolution: ${resolution}`);

    // Create an array of indexes from particle array.
    const preParticleIndexes = allParticles.map((_, index) => index);

    let pixelIndex = 0;

    const [imgWidth, imgHeight] = [sourceImg.width, sourceImg.height];
    // console.log('imgWidth', imgWidth, 'imgHeight', imgHeight);
    // Go through each pixel of the image.
    for (let y = 0; y < imgHeight; y++) {
      for (let x = 0; x < imgWidth; x++) {
        // Get the pixel's color.
        const pixelR = sourceImg.pixels[pixelIndex++];
        const pixelG = sourceImg.pixels[pixelIndex++];
        const pixelB = sourceImg.pixels[pixelIndex++];
        const pixelA = sourceImg.pixels[pixelIndex++];
        // 检查像素是否透明
        if (pixelA < 128) {
          // 如果 alpha 值小于 128，我们认为它是透明的
          continue; // 跳过这个像素，不为其创建粒子
        }
        // Give it small odds that we'll assign a particle to this pixel.
        if (p5.random(1.0) > loadPercentage * resolution) {
          continue;
        }

        const pixelColor = p5.color(pixelR, pixelG, pixelB);
        let newParticle: Particle;
        if (preParticleIndexes.length > 0) {
          // Re-use existing particle.
          const randomIndex = p5.random(preParticleIndexes.length - 1);
          const index = preParticleIndexes.splice(randomIndex, 1)[0];
          newParticle = allParticles[index];
        } else {
          // Create a new particle.
          newParticle = new Particle(p5.width / 2, p5.height / 2);
          allParticles.push(newParticle);
          // console.log('创建了新粒子', newParticle);
        }
        newParticle.target.x = x + p5.width / 2 - sourceImg.width / 2;
        newParticle.target.y = y + p5.height / 2 - sourceImg.height / 2;
        newParticle.endColor = pixelColor;
      }
    }
    // Kill off any left over particles that aren't assigned to anything.
    const preLen = preParticleIndexes.length;
    if (preLen > 0) {
      for (let i = 0; i < preLen; i++) {
        const index = preParticleIndexes[i];
        allParticles[index].kill();
        allParticles[index].endColor = p5.color(0);
      }
    }
  }
  p5.draw = () => {
    if (!activeAnim) return;
    p5.clear();
    const len = allParticles.length;
    for (let i = len - 1; i >= 0; i--) {
      const particle = allParticles[i];
      particle.move();
      particle.draw();
    }
    allParticles = allParticles.filter((particle) => !particle.isKilled && !particle.isOutOfBounds());
  };

  return p5;
}

const DynamicParticleGL = ({ activeAnim, imageIdx, id = 'particle-container', ...props }: ParticleGLProps) => {
  return <ReactP5Wrapper sketch={sketch} activeAnim={activeAnim} imageIdx={imageIdx} id={id} {...props} />;
};

export default DynamicParticleGL;
