use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct RenderStateDescriptor {
    resolution_y: u32,
    resolution_x: u32,
    seed: u64,
}

#[wasm_bindgen]
impl RenderStateDescriptor {
    #[wasm_bindgen(constructor)]
    pub fn new(
        resolution_y: u32,
        resolution_x: u32,
        seed: u64,
    ) -> RenderStateDescriptor {
        RenderStateDescriptor {
            resolution_y,
            resolution_x,
            seed,
        }
    }
}

impl RenderStateDescriptor
{
    pub fn resolution_y(&self) -> &u32 {
        &self.resolution_y
    }
    
    pub fn resolution_x(&self) -> &u32 {
        &self.resolution_x
    }

    pub fn seed(&self) -> &u64 {
        &self.seed
    }
}