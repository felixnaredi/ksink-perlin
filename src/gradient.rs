use wasm_bindgen::prelude::wasm_bindgen;

// TODO:
//   Currently the math is performed by converting between integers and floats. If there are good
//   ways to only work with integers that would be nice. Otherwise it could be better to just work
//   with floats.

#[wasm_bindgen]
#[derive(Clone)]
pub struct Color {
    r: u8,
    g: u8,
    b: u8,
    a: u8,
}

impl Color {
    pub fn as_tuple(&self) -> (&u8, &u8, &u8, &u8) {
        (&self.r, &self.g, &self.b, &self.a)
    }

    pub fn to_tuple(self) -> (u8, u8, u8, u8) {
        (self.r, self.g, self.b, self.a)
    }
}

#[wasm_bindgen]
#[allow(non_snake_case)]
impl Color {
    #[wasm_bindgen(constructor)]
    pub fn new(r: u8, g: u8, b: u8, a: u8) -> Color {
        Color { r, g, b, a }
    }

    #[wasm_bindgen]
    pub fn hex(&self) -> String {
        format!("#{:02x}{:02x}{:02x}", self.r, self.g, self.b)
    }
}

#[derive(Clone)]
pub struct Gradient {
    color0: Color,
    color1: Color,
    steps: u8,
}

fn linear_approx(u: u8, v: u8, i: u8) -> u8 {
    let u = f32::from(u) / 255.0;
    let v = f32::from(v) / 255.0;
    let i = f32::from(i) / 255.0;
    (((u * (1.0 - i)) + (v * i)) * 255.0) as u8
}

impl Gradient {
    pub fn color_at(&self, i: u8) -> Color {
        let i = (i as u32 * self.steps as u32) / 256;
        let i = f64::from(i) * (255.0 / f64::from(self.steps - 1));
        let i = i as u8;
        Color {
            r: linear_approx(self.color0.r, self.color1.r, i),
            g: linear_approx(self.color0.g, self.color1.g, i),
            b: linear_approx(self.color0.b, self.color1.b, i),
            a: linear_approx(self.color0.a, self.color1.a, i),
        }
    }
}

#[wasm_bindgen]
pub struct WasmGradient(Gradient);

impl WasmGradient {
    pub fn inner(&self) -> &Gradient {
        &self.0
    }
}

#[wasm_bindgen]
#[allow(non_snake_case)]
impl WasmGradient {
    #[wasm_bindgen(constructor)]
    pub fn new(color0: Color, color1: Color, steps: u8) -> WasmGradient {
        WasmGradient(Gradient {
            color0,
            color1,
            steps,
        })
    }

    pub fn getColor0(&self) -> Color {
        self.0.color0.clone()
    }

    pub fn getColor1(&self) -> Color {
        self.0.color1.clone()
    }

    pub fn getSteps(&self) -> u8 {
        self.0.steps
    }

    pub fn setColor0(&mut self, color: Color) {
        self.0.color0 = color;
    }

    pub fn setColor1(&mut self, color: Color) {
        self.0.color1 = color;
    }

    pub fn setSteps(&mut self, steps: u8) {
        self.0.steps = steps;
    }
}
