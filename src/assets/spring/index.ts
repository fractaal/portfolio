export class Spring {
  stiffness: number;
  damping: number;
  mass: number;
  position: number;
  velocity: number;
  target: number;

  constructor(stiffness = 100, damping = 5, mass = 1) {
    this.stiffness = stiffness; // How "tight" the spring is (spring constant)
    this.damping = damping; // Resistance to oscillation (higher value means more damping)
    this.mass = mass; // How heavy the object attached to the spring is
    this.position = 0; // Current position of the spring
    this.velocity = 0; // Current velocity of the spring
    this.target = 0; // Target position the spring is trying to reach
  }

  // Call this on every frame with delta (time since last frame)
  update(deltaTime: number) {
    // Calculate the force applied by the spring (Hooke's Law)
    const force = -this.stiffness * (this.position - this.target);

    // Calculate the damping force (opposes the velocity)
    const dampingForce = -this.damping * this.velocity;

    // Calculate the acceleration based on the force and the mass (F = ma => a = F / m)
    const acceleration = (force + dampingForce) / this.mass;

    // Update the velocity (v = v0 + a * dt)
    this.velocity += acceleration * deltaTime;

    // Update the position (x = x0 + v * dt)
    this.position += this.velocity * deltaTime;
  }

  // Set a new target position for the spring to move towards
  setTarget(newTarget: number) {
    this.target = newTarget;
  }

  // Optional: Reset spring to a specific state
  reset(position = 0, velocity = 0) {
    this.position = position;
    this.velocity = velocity;
  }
}

export class SpringRGB {
  stiffness: number;
  damping: number;
  mass: number;
  position: { r: number; g: number; b: number };
  velocity: { r: number; g: number; b: number };
  target: { r: number; g: number; b: number };

  constructor(stiffness = 5, damping = 5, mass = 1) {
    this.stiffness = stiffness;
    this.damping = damping;
    this.mass = mass;
    this.position = { r: 0, g: 0, b: 0 };
    this.velocity = { r: 0, g: 0, b: 0 };
    this.target = { r: 0, g: 0, b: 0 };
  }

  update(deltaTime: number) {
    const force = {
      r: -this.stiffness * (this.position.r - this.target.r),
      g: -this.stiffness * (this.position.g - this.target.g),
      b: -this.stiffness * (this.position.b - this.target.b),
    };

    const dampingForce = {
      r: -this.damping * this.velocity.r,
      g: -this.damping * this.velocity.g,
      b: -this.damping * this.velocity.b,
    };

    const acceleration = {
      r: (force.r + dampingForce.r) / this.mass,
      g: (force.g + dampingForce.g) / this.mass,
      b: (force.b + dampingForce.b) / this.mass,
    };

    this.velocity.r += acceleration.r * deltaTime;
    this.velocity.g += acceleration.g * deltaTime;
    this.velocity.b += acceleration.b * deltaTime;

    this.position.r += this.velocity.r * deltaTime;
    this.position.g += this.velocity.g * deltaTime;
    this.position.b += this.velocity.b * deltaTime;
  }

  setTarget(newTarget: { r: number; g: number; b: number }) {
    this.target = newTarget;
  }

  reset(position = { r: 0, g: 0, b: 0 }, velocity = { r: 0, g: 0, b: 0 }) {
    this.position = position;
    this.velocity = velocity;
  }
}
